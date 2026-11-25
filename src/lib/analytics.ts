// Site-wide GA4 conversion events, sent through the gtag loaded in the locale layout.
// Only categorical, non-personal parameters are sent: never names, emails,
// phone numbers or free-text form content.

type Params = Record<string, string | number | boolean | undefined>;

function gtagEvent(name: string, params: Params): void {
  if (typeof window === "undefined") return;
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.("event", name, { business_unit: "SEM", ...params });
  } catch {
    /* analytics must never break the page */
  }
}

/** A client inquiry form was submitted successfully (GA4 recommended event). */
export function trackLead(formSource: string, params: Params = {}): void {
  gtagEvent("generate_lead", { form_source: formSource, ...params });
}

export type ContactChannel = "whatsapp" | "phone" | "email";

/** A visitor clicked a WhatsApp, phone or email link. */
export function trackContactClick(channel: ContactChannel, params: Params = {}): void {
  gtagEvent(`${channel}_click`, { contact_channel: channel, ...params });
}
