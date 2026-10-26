import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logActivity } from "@/lib/logger";
import { SERVICE_CATEGORIES } from "@/lib/transportation/config";
import { SEM_SERVER_FIELDS, sanitizeAttribution } from "@/lib/transportation/attribution";
import { normalizeEnquiry, validateEnquiry, countryName, vehicleLabel } from "@/lib/transportation/enquiry";
import { composeSummary, sendTransportNotifications } from "@/lib/transportation/notify";
import { clientIp, rateLimit } from "@/lib/transportation/rate-limit";

// POST /api/transportation/enquiry
//
// Public endpoint for the transportation enquiry form. Writes the same four
// records /api/contact does (Inquiry, Client, Lead, QuoteRequest) so the lead
// lands in the existing pipeline, plus the transportation fields. The business
// unit, department and source website are stamped HERE — anything the client
// sends for them is ignored. Customers only ever see a reference or a generic
// error; internals are never returned.

const GENERIC_ERROR = "We couldn't save your enquiry. Please try again, or message us on WhatsApp.";
const MAX_BODY = 20_000;
const MIN_FILL_MS = 3_000;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

const isMissingColumn = (err: unknown) => {
  const e = err as { code?: string; message?: string };
  return e?.code === "P2022" || /does not exist in the current database/i.test(e?.message ?? "");
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return NextResponse.json({ error: "Request too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Anti-spam. Bots get a silent "success" with no reference and no write.
  const botSignal =
    (typeof body.website === "string" && body.website.trim() !== "") ||
    (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS);
  if (botSignal) return NextResponse.json({ ok: true, reference: null });

  if (!rateLimit(`tx-enquiry:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Please wait a few minutes and try again." }, { status: 429 });
  }

  const enquiry = normalizeEnquiry(body);
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields.", fields: errors }, { status: 400 });
  }

  const attribution = sanitizeAttribution(body.attribution);
  const touch = attribution.last_touch ?? attribution.first_touch;
  const category = SERVICE_CATEGORIES[enquiry.serviceCategory];
  const summary = composeSummary(enquiry);
  const fullPhone = `${enquiry.phoneCountryCode}${enquiry.phone}`;
  const source = enquiry.formId;

  try {
    // Duplicate-submission guard: same person, same form, identical request.
    const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);
    const existing = await prisma.inquiry.findFirst({
      where: { email: enquiry.email, source, message: summary, createdAt: { gte: since } },
      select: { refNumber: true },
    });
    if (existing?.refNumber) return NextResponse.json({ ok: true, reference: existing.refNumber, duplicate: true });

    const year = new Date().getFullYear();
    const window = { gte: new Date(`${year}-01-01`), lt: new Date(`${year + 1}-01-01`) };
    const assignee = "Habiba Asghar";

    const transportCols = {
      business: SEM_SERVER_FIELDS.business_unit,
      leadDepartment: SEM_SERVER_FIELDS.lead_department,
      serviceCategory: enquiry.serviceCategory,
      journeyType: enquiry.journeyType,
      originCountry: countryName(enquiry.originCountry),
      originCity: enquiry.originCity,
      destinationCountry: countryName(enquiry.destinationCountry),
      destinationCity: enquiry.destinationCity,
      vehiclePreference: enquiry.vehicles.map(vehicleLabel).join(", "),
      sourceWebsite: SEM_SERVER_FIELDS.source_website,
      landingPage: touch?.landing_page ?? null,
      referrer: touch?.referrer ?? null,
      utmSource: touch?.utm_source ?? null,
      utmMedium: touch?.utm_medium ?? null,
      utmCampaign: touch?.utm_campaign ?? null,
      utmContent: touch?.utm_content ?? null,
      utmTerm: touch?.utm_term ?? null,
      attribution: attribution as object,
      details: {
        ...enquiry,
        privacyConsent: undefined,
        marketingConsent: enquiry.marketingConsent,
        consentAt: new Date().toISOString(),
      } as object,
      notifyStatus: "pending",
    };

    const create = (withTransportCols: boolean) =>
      prisma.$transaction(async (tx) => {
        const count = await tx.inquiry.count({ where: { createdAt: window } });
        const reference = `SEM-${year}-${String(count + 1).padStart(6, "0")}`;

        await tx.inquiry.create({
          data: {
            refNumber: reference,
            name: enquiry.name,
            email: enquiry.email,
            phone: fullPhone,
            company: enquiry.company || null,
            eventType: `Transportation — ${category.label}`,
            budget: enquiry.budget || null,
            eventDate: enquiry.travelDate,
            guestCount: String(enquiry.passengers),
            venueCity: enquiry.originCity,
            message: summary,
            assignedTo: assignee,
            source,
          },
        });
        await tx.client.upsert({
          where: { email: enquiry.email },
          update: { phone: fullPhone, company: enquiry.company || undefined },
          create: {
            name: enquiry.name,
            email: enquiry.email,
            phone: fullPhone,
            company: enquiry.company || null,
            status: "Lead",
            notes: `Created from SEM transportation form (${reference})`,
          },
        });
        await tx.lead.create({
          data: {
            name: enquiry.name,
            email: enquiry.email,
            phone: fullPhone,
            company: enquiry.company || null,
            eventType: `Transportation — ${category.label}`,
            budget: enquiry.budget || null,
            eventDate: enquiry.travelDate,
            source: "website",
            status: "New",
            notes: `${reference} · ${enquiry.originCity} → ${enquiry.destinationCity} · ${source}`,
          },
        });
        const qr = await tx.quoteRequest.create({
          data: {
            clientName: enquiry.name,
            clientPhone: fullPhone,
            clientEmail: enquiry.email,
            clientCompany: enquiry.company || null,
            eventType: `Transportation — ${category.label}`,
            eventDate: new Date(`${enquiry.travelDate}T00:00:00Z`),
            eventCity: enquiry.originCity,
            guestCount: enquiry.passengers,
            budgetRange: enquiry.budget || null,
            requirements: summary,
            source,
            status: "pending",
            channel: "website",
            business: SEM_SERVER_FIELDS.business_unit,
            track: "broker",
            stage: "new",
            nextAction:
              enquiry.serviceCategory === "cross_border"
                ? "Route feasibility review, then confirm operator and vehicle"
                : "Check vehicle availability and prepare quotation",
            nextActionAt: new Date(),
            ...(withTransportCols ? { ...transportCols, leadRef: reference } : {}),
          },
          select: { id: true },
        });
        return { reference, requestId: qr.id };
      });

    let created: { reference: string; requestId: string };
    let degraded = false;
    try {
      created = await create(true);
    } catch (err) {
      if (!isMissingColumn(err)) throw err;
      // Migration not applied yet: keep the lead (everything is in the summary).
      console.error("[transportation] QuoteRequest transport columns missing — run scripts/phase2-transport-columns.sql");
      degraded = true;
      created = await create(false);
    }

    // Notifications: awaited so the outcome is recorded, but a failure never
    // fails the request — the lead is already persisted.
    let notify = { status: "failed", error: "not attempted" } as { status: string; error: string | null };
    try {
      notify = await sendTransportNotifications({ reference: created.reference, enquiry });
    } catch (err) {
      notify = { status: "failed", error: String((err as Error)?.message ?? "error").slice(0, 120) };
    }
    if (!degraded) {
      await prisma.quoteRequest
        .update({
          where: { id: created.requestId },
          data: { notifyStatus: notify.status, notifyAttempts: 1, notifyError: notify.error },
        })
        .catch((e) => console.error("[transportation] could not record notify status", e?.code));
    }
    if (notify.status === "failed" || notify.status === "partial") {
      console.error(`[transportation] ${created.reference} notification ${notify.status}: ${notify.error}`);
    }

    await logActivity(
      "New Transportation Lead",
      `${created.reference} · ${category.label} · ${enquiry.originCity} → ${enquiry.destinationCity} · ${enquiry.travelDate}`,
    );

    return NextResponse.json({ ok: true, reference: created.reference });
  } catch (err) {
    console.error("[transportation] enquiry failed:", (err as { code?: string })?.code ?? (err as Error)?.name);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
