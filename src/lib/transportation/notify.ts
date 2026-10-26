// Summary text + email notifications for transportation enquiries.
// Every interpolated value is HTML-escaped. The customer acknowledgement only
// confirms receipt — never availability, price or a booking.

import { resend, isResendConfigured, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend";
import { SERVICE_CATEGORIES } from "./config";
import { countryName, journeyLabel, purposeLabel, vehicleLabel, type EnquiryInput } from "./enquiry";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com";

export const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const place = (city: string, country: string, address: string) =>
  [address, city, countryName(country)].filter(Boolean).join(", ");

/** Plain-text summary stored in Inquiry.message / QuoteRequest.requirements. */
export function composeSummary(e: EnquiryInput): string {
  const lines = [
    `TRANSPORTATION ENQUIRY — ${SERVICE_CATEGORIES[e.serviceCategory].label}`,
    `Journey: ${journeyLabel(e.journeyType)}`,
    `Pickup: ${place(e.originCity, e.originCountry, e.pickupAddress)}`,
    `Destination: ${place(e.destinationCity, e.destinationCountry, e.destinationAddress)}`,
    `Date: ${e.travelDate}${e.pickupTime ? ` ${e.pickupTime} (Riyadh time)` : ""}${e.flexibleSchedule ? " — flexible" : ""}`,
    e.returnDate ? `Return: ${e.returnDate}${e.returnTime ? ` ${e.returnTime}` : ""}` : "",
    `Passengers: ${e.passengers}${e.luggage ? ` · Luggage: ${e.luggage}` : ""}`,
    `Vehicle: ${e.vehicles.map(vehicleLabel).join(", ")}${e.vehicles.includes("recommend") ? "" : e.vehicleMandatory === "this_class" ? " (class mandatory)" : " (equivalent acceptable)"}`,
    `Customer type: ${purposeLabel(e.bookingPurpose)}${e.company ? ` · ${e.company}` : ""}`,
    `Itinerary: ${e.itineraryStatus === "confirmed" ? "confirmed" : "initial enquiry"} · ${e.recurrence === "recurring" ? "recurring" : "one-time"}`,
    e.quoteDeadline ? `Quotation needed by: ${e.quoteDeadline}` : "",
    e.invoiceRequested ? "Formal quotation / invoice requested" : "",
    e.procurementNotes ? `Procurement: ${e.procurementNotes}` : "",
    e.budget ? `Budget: ${e.budget}` : "",
    e.serviceRequirements ? `Service requirements: ${e.serviceRequirements}` : "",
    e.notes ? `Notes: ${e.notes}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export interface NotifyLead {
  reference: string;
  enquiry: EnquiryInput;
}

export interface NotifyResult {
  status: "sent" | "partial" | "failed" | "skipped";
  error: string | null;
}

const row = (k: string, v: string) =>
  v ? `<tr><td style="padding:7px 0;color:#888;width:150px;vertical-align:top">${esc(k)}</td><td style="padding:7px 0;font-weight:500">${esc(v)}</td></tr>` : "";

function internalHtml({ reference, enquiry: e }: NotifyLead): string {
  const crossBorder = e.serviceCategory === "cross_border";
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #eaeaea;border-radius:12px;overflow:hidden">
  <div style="background:#0b1623;padding:26px 30px">
    <p style="color:#c5a059;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px">SEM Transportation · ${esc(reference)}</p>
    <h1 style="color:#fff;font-size:19px;font-weight:500;margin:0">${esc(SERVICE_CATEGORIES[e.serviceCategory].label)} enquiry</h1>
    ${crossBorder ? '<p style="color:#e5c98a;font-size:12px;margin:10px 0 0">Cross-border: run a route feasibility review before replying with availability.</p>' : ""}
  </div>
  <div style="padding:24px 30px;font-size:14px;color:#333">
    <table style="width:100%;border-collapse:collapse">
      ${row("Route", `${place(e.originCity, e.originCountry, "")} → ${place(e.destinationCity, e.destinationCountry, "")}`)}
      ${row("Pickup", e.pickupAddress)}
      ${row("Destination", e.destinationAddress)}
      ${row("Journey", journeyLabel(e.journeyType))}
      ${row("Date / time", `${e.travelDate}${e.pickupTime ? " " + e.pickupTime : ""}${e.flexibleSchedule ? " (flexible)" : ""}`)}
      ${row("Return", e.returnDate ? `${e.returnDate} ${e.returnTime}` : "")}
      ${row("Passengers", String(e.passengers))}
      ${row("Luggage", e.luggage)}
      ${row("Vehicle", e.vehicles.map(vehicleLabel).join(", "))}
      ${row("Customer type", purposeLabel(e.bookingPurpose))}
      ${row("Itinerary", e.itineraryStatus === "confirmed" ? "Confirmed" : "Initial enquiry")}
      ${row("Quote needed by", e.quoteDeadline)}
      ${row("Budget", e.budget)}
    </table>
    <h3 style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin:22px 0 8px">Customer</h3>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", e.name)}
      ${row("Company", e.company)}
      <tr><td style="padding:7px 0;color:#888;width:150px">Email</td><td style="padding:7px 0"><a href="mailto:${esc(e.email)}" style="color:#8a6d2f">${esc(e.email)}</a></td></tr>
      ${row("Phone", `${e.phoneCountryCode} ${e.phone}${e.whatsappPreferred ? " (WhatsApp)" : ""}`)}
    </table>
    ${e.serviceRequirements || e.notes || e.procurementNotes ? `<div style="margin-top:20px;background:#faf9f7;border-left:3px solid #c5a059;padding:14px 18px;white-space:pre-wrap;font-size:13px">${esc([e.serviceRequirements, e.procurementNotes, e.notes].filter(Boolean).join("\n\n"))}</div>` : ""}
    <p style="margin:26px 0 0"><a href="${SITE}/admin/pipeline" style="background:#0b1623;color:#fff;text-decoration:none;padding:12px 22px;border-radius:6px;font-size:14px">Open pipeline</a></p>
  </div>
</div>`;
}

function ackHtml({ reference, enquiry: e }: NotifyLead): string {
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:36px 30px;border:1px solid #eaeaea;border-radius:8px;color:#4a4a4a;line-height:1.7;font-size:15px">
  <h1 style="color:#000;font-size:21px;font-weight:300;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px;text-align:center">Saudi Event Management</h1>
  <div style="width:40px;height:2px;background:#c5a059;margin:16px auto 28px"></div>
  <p>Dear ${esc(e.name)},</p>
  <p>Thank you for your transportation enquiry. We have received it and our team will review the route, passenger requirements, vehicle preference and timing before replying.</p>
  <p style="background:#faf9f7;border-left:3px solid #c5a059;padding:12px 16px"><strong>Your reference: ${esc(reference)}</strong><br>${esc(place(e.originCity, e.originCountry, ""))} → ${esc(place(e.destinationCity, e.destinationCountry, ""))} · ${esc(e.travelDate)}</p>
  <p>Please note that this message confirms receipt of your enquiry only. Vehicle availability, route feasibility and pricing are confirmed in a written quotation, and nothing is booked until you accept it.</p>
  <p>To add details, simply reply to this email or message us on <a href="https://wa.me/966539388072" style="color:#8a6d2f">WhatsApp</a> quoting your reference.</p>
  <p style="margin-top:28px">Kind regards,<br><span style="color:#8a6d2f">Saudi Event Management</span></p>
</div>`;
}

/** `only` limits a retry to the email(s) that previously failed. */
export async function sendTransportNotifications(
  lead: NotifyLead,
  only: { internal: boolean; customer: boolean } = { internal: true, customer: true },
): Promise<NotifyResult> {
  if (!isResendConfigured) return { status: "skipped", error: "SMTP not configured" };
  const { reference, enquiry: e } = lead;
  const errors: string[] = [];
  let sent = 0;
  let attempted = 0;

  let internal: { error: unknown } = { error: null };
  if (only.internal) {
  attempted++;
  internal = await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    replyTo: e.email,
    subject: `🚘 ${SERVICE_CATEGORIES[e.serviceCategory].label}: ${e.originCity} → ${e.destinationCity} · ${e.travelDate} · ${reference}`,
    html: internalHtml(lead),
  });
  if (internal.error) errors.push(`internal: ${String((internal.error as Error)?.message ?? "send failed").slice(0, 120)}`);
  else sent++;
  }

  if (only.customer && process.env.TRANSPORT_CUSTOMER_ACK !== "off") {
    attempted++;
    const ack = await resend.emails.send({
      from: FROM_EMAIL,
      to: [e.email],
      replyTo: ADMIN_EMAIL,
      subject: `We received your transportation enquiry — ${reference}`,
      html: ackHtml(lead),
    });
    if (ack.error) errors.push(`customer: ${String((ack.error as Error)?.message ?? "send failed").slice(0, 120)}`);
    else sent++;
  }

  return {
    status: sent === attempted ? "sent" : sent > 0 ? "partial" : "failed",
    error: errors.length ? errors.join("; ") : null,
  };
}
