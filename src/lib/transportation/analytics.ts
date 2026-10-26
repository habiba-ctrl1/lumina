// Thin wrapper over the existing GA4 gtag (loaded in the locale layout).
// Only non-personal, categorical parameters are ever sent — never names,
// emails, phone numbers or free-text form content.

type TransportEvent =
  | "transport_page_view"
  | "transport_service_select"
  | "transport_vehicle_select"
  | "transport_route_check"
  | "transport_whatsapp_click"
  | "transport_email_click";

type Params = Record<string, string | number | boolean | undefined>;

export function trackTransportEvent(name: TransportEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.("event", name, { business_unit: "SEM", lead_department: "transportation", ...params });
  } catch {
    /* analytics must never break the page */
  }
}
