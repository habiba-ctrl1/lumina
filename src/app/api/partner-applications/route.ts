import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';
import { resolveCategories } from '@/lib/vendor-categories';
import { matchCandidates, type DedupeRow } from '@/lib/vendor-dedupe';
import { OPEN_APPLICATION_STATUSES } from '@/lib/vendor-application-status';

// ─────────────────────────────────────────────────────────────────────────────
// /api/partner-applications
// POST — PUBLIC: vendors submit the /partner-onboarding form (their own info).
// GET  — ADMIN ONLY: applications contain private contact info; never expose
//        them on public routes (same hard rule as the Vendor table).
// ─────────────────────────────────────────────────────────────────────────────

// Best-effort rate limit (per serverless instance): max 3 submissions/hour/IP.
const submissionLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 3;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return true;
  recent.push(now);
  submissionLog.set(ip, recent);
  return false;
}

const str = (v: unknown, max = 500) =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

const strArr = (v: unknown, max = 20) =>
  Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()).slice(0, max) : [];

/** Next sequential application number, e.g. "SEM-P-0007". */
async function nextAppNumber(): Promise<string> {
  const last = await prisma.vendorApplication.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { appNumber: true },
  });
  const lastNum = last ? parseInt(last.appNumber.replace(/\D/g, ''), 10) || 0 : 0;
  return `SEM-P-${String(lastNum + 1).padStart(4, '0')}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — hidden field real vendors never see. Bots that fill it get a
    // fake success so they don't retry.
    if (body.companyUrl) {
      return NextResponse.json({ ok: true, appNumber: 'SEM-P-0000' }, { status: 201 });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Required: only the bare minimum so small vendors can still register.
    const companyName = str(body.companyName, 200);
    const contactPerson = str(body.contactPerson, 200);
    const whatsapp = str(body.whatsapp, 50);
    const city = str(body.city, 100);
    const categories = strArr(body.categories);
    if (!companyName || !contactPerson || !whatsapp || !city || categories.length === 0) {
      return NextResponse.json(
        { error: 'Please fill company name, contact person, WhatsApp, city and at least one service.' },
        { status: 400 }
      );
    }
    if (body.permAccurate !== true) {
      return NextResponse.json(
        { error: 'Please confirm the information provided is accurate.' },
        { status: 400 }
      );
    }
    if (body.permNonCircumvention !== true) {
      return NextResponse.json(
        { error: 'Please accept the non-circumvention agreement.' },
        { status: 400 }
      );
    }

    // Canonical category link. The new onboarding form sends categoryIds; the three
    // legacy forms (/vendors, /vendor-registration, /partners/become-one) only send
    // free-text labels, so map those onto the canonical taxonomy here — every
    // application then lands categorised, whichever form it came from.
    let categoryIds: string[] = Array.isArray(body.categoryIds) ? body.categoryIds.filter((x: unknown) => typeof x === 'string') : [];
    if (categoryIds.length === 0) {
      try {
        categoryIds = (await resolveCategories(prisma, categories)).map((c) => c.id);
      } catch (e) {
        console.error('Category mapping failed (non-fatal):', e);
      }
    }

    // appNumber has a unique constraint — retry once on a rare collision.
    let application;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        application = await prisma.vendorApplication.create({
          data: {
            appNumber: await nextAppNumber(),
            companyName,
            businessType: str(body.businessType, 200),
            contactPerson,
            jobTitle: str(body.jobTitle, 200),
            whatsapp,
            email: str(body.email, 200),
            phone: str(body.phone, 50),
            city,
            regionCoverage: strArr(body.regionCoverage),
            website: str(body.website),
            instagram: str(body.instagram),
            linkedin: str(body.linkedin),
            facebook: str(body.facebook),
            tiktok: str(body.tiktok),
            youtube: str(body.youtube),
            googleMaps: str(body.googleMaps),
            categories,
            servicesDesc: str(body.servicesDesc, 2000),
            yearsInBusiness: str(body.yearsInBusiness, 50),
            teamSize: str(body.teamSize, 50),
            languages: str(body.languages, 200),
            crNumber: str(body.crNumber, 100),
            vatNumber: str(body.vatNumber, 100),
            logoLink: str(body.logoLink),
            profileLink: str(body.profileLink),
            portfolioLink: str(body.portfolioLink),
            videoLink: str(body.videoLink),
            rateCardLink: str(body.rateCardLink),
            pricingType: str(body.pricingType, 50),
            majorClients: str(body.majorClients, 1000),
            certifications: str(body.certifications, 1000),
            permLogoUse: body.permLogoUse === true,
            permMediaUse: body.permMediaUse === true,
            permAccurate: true,
            permNonCircumvention: true,
            featureOnSem: body.featureOnSem === true,
            backlinkAnswer: str(body.backlinkAnswer, 50),
            extraNotes: str(body.extraNotes, 2000),
            ...(categoryIds.length ? { categoryLinks: { connect: categoryIds.map((id) => ({ id })) } } : {}),
          },
        });
        break;
      } catch (e: any) {
        if (e?.code !== 'P2002' || attempt === 1) throw e;
      }
    }

    await logActivity(
      'Partner Application',
      `New onboarding submission ${application!.appNumber}: ${companyName} (${categories.join(', ')}) — ${city}`,
      'partner-onboarding'
    );

    return NextResponse.json(
      { ok: true, appNumber: application!.appNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error('Partner Application Create Error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const where =
      status === 'open'
        ? { status: { in: [...OPEN_APPLICATION_STATUSES] } }
        : status && status !== 'all'
        ? { status }
        : {};

    // One pass over vendors + all applications, matched in memory (hundreds of rows),
    // so the list can show duplicate flags without a query per application.
    const [applications, vendors, everyApp] = await Promise.all([
      prisma.vendorApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { categoryLinks: { select: { id: true, name: true } } },
      }),
      prisma.vendor.findMany({
        select: { id: true, name: true, email: true, phone: true, whatsapp: true, city: true, category: true },
      }),
      prisma.vendorApplication.findMany({
        select: { id: true, appNumber: true, companyName: true, email: true, phone: true, whatsapp: true, status: true, createdAt: true },
      }),
    ]);

    const appRows: (DedupeRow & { appNumber: string; status: string; createdAt: Date })[] = everyApp.map((o) => ({
      id: o.id, name: o.companyName, email: o.email, phone: o.phone, whatsapp: o.whatsapp, city: null, category: '',
      appNumber: o.appNumber, status: o.status, createdAt: o.createdAt,
    }));

    const enriched = applications.map((app) => {
      const input = { name: app.companyName, email: app.email, phone: app.phone, whatsapp: app.whatsapp };
      // Possible duplicate = matches a vendor that is NOT the one this application already became.
      const existingVendors = matchCandidates(vendors.filter((v) => v.id !== app.vendorId), input).map((c) => ({
        id: c.vendor.id, name: c.vendor.name, matchedOn: c.matchedOn, confidence: c.confidence,
      }));
      // Repeat submission = other applications from the same company (same email/phone/near-identical name).
      const repeats = matchCandidates(appRows.filter((o) => o.id !== app.id), input).map((c) => {
        const o = appRows.find((r) => r.id === c.vendor.id)!;
        return { appNumber: o.appNumber, status: o.status, createdAt: o.createdAt, matchedOn: c.matchedOn };
      });
      return { ...app, flags: { existingVendors, repeats } };
    });

    const uncategorised = await prisma.vendorApplication.count({ where: { categoryLinks: { none: {} } } });
    const n = (st: string) => everyApp.filter((a) => a.status === st).length;
    const counts = {
      pending: n('Pending'),
      underReview: n('Under Review'),
      needInfo: n('Need More Information'),
      approved: n('Approved'),
      rejected: n('Rejected'),
      duplicate: n('Duplicate'),
      open: everyApp.filter((a) => (OPEN_APPLICATION_STATUSES as string[]).includes(a.status)).length,
      total: everyApp.length,
      uncategorised,
    };

    return NextResponse.json({ applications: enriched, counts });
  } catch (error) {
    console.error('Partner Applications Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
