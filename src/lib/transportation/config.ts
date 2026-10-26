// Central configuration for the /transportation division.
//
// Business basis (2026-10): SEM is a coordination broker. The only verified
// supply is a Riyadh transport partner (airport/hotel transfers, executive
// sedans/SUVs/limousines with chauffeurs, vans, group vehicles). Nothing here
// states that a route, city or vehicle is guaranteed — everything is
// "subject to availability", and every cross-border route is enquiry-only
// until a licensed operator is confirmed and `status` is changed by a human.

export const TRANSPORT_BASE_PATH = "/transportation";

/** SEM's WhatsApp number — same value already used across the site (contact route, blog CTA). */
export const SEM_WHATSAPP_NUMBER = "966539388072";

export type ServiceCategoryKey = "cross_border" | "vip_chauffeur" | "corporate_transportation";

export const SERVICE_CATEGORIES: Record<ServiceCategoryKey, { label: string; formSource: string }> = {
  cross_border: { label: "Cross-border transfer", formSource: "transport_cross_border" },
  vip_chauffeur: { label: "VIP chauffeur (Saudi Arabia)", formSource: "transport_vip_chauffeur" },
  corporate_transportation: { label: "Corporate transportation", formSource: "transport_corporate" },
};

/* ── Vehicle classes ─────────────────────────────────────────────────────────
 * Categories only (no brand/model claims). Capacity is a typical range for the
 * class; exact vehicle, passengers and luggage are confirmed per quotation. */
export type VehicleClassKey = "executive_sedan" | "premium_suv" | "premium_van" | "group_vehicle";

export interface VehicleClass {
  key: VehicleClassKey;
  name: string;
  typicalPassengers: string;
  bestFor: string;
  image: string;
  imageAlt: string;
}

export const VEHICLE_CLASSES: VehicleClass[] = [
  {
    key: "executive_sedan",
    name: "Executive sedan",
    typicalPassengers: "Typically 1–3 passengers",
    bestFor: "Individual executives, airport and hotel transfers, board-meeting arrivals.",
    image: "/services/transport/luxury-sedan-rear-cabin.webp",
    imageAlt: "Rear cabin of a luxury executive sedan",
  },
  {
    key: "premium_suv",
    name: "Premium SUV",
    typicalPassengers: "Typically 1–5 passengers",
    bestFor: "Small delegations, families, longer road journeys with more luggage.",
    image: "/services/transport/vip-chauffeur-arrival-riyadh-exhibition-centre.webp",
    imageAlt: "Chauffeur opening the door of a luxury vehicle outside a Riyadh exhibition centre",
  },
  {
    key: "premium_van",
    name: "Premium van / people carrier",
    typicalPassengers: "Typically 4–7 passengers",
    bestFor: "Delegations, group transfers, guests travelling with luggage.",
    image: "/services/transport/vip-van-fleet-lineup.webp",
    imageAlt: "Line-up of premium passenger vans",
  },
  {
    key: "group_vehicle",
    name: "Minibus / group vehicle",
    typicalPassengers: "Larger groups, confirmed per vehicle",
    bestFor: "Conference delegates, event shuttles, wedding and gala guest movements.",
    image: "/services/transport/delegate-shuttle-riyadh-convention-centre.webp",
    imageAlt: "Delegate shuttle outside a Riyadh convention centre",
  },
];

/* ── Countries and cities ────────────────────────────────────────────────────
 * Selector options only — presence here does NOT mean a route is served. */
export interface CountryOption {
  key: string;
  name: string;
  cities: string[];
}

export const COUNTRIES: CountryOption[] = [
  { key: "SA", name: "Saudi Arabia", cities: ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Al Khobar", "Al Ahsa", "AlUla", "Taif"] },
  { key: "AE", name: "United Arab Emirates", cities: ["Dubai", "Abu Dhabi"] },
  { key: "BH", name: "Bahrain", cities: ["Manama"] },
  { key: "QA", name: "Qatar", cities: ["Doha"] },
  { key: "KW", name: "Kuwait", cities: ["Kuwait City"] },
  { key: "JO", name: "Jordan", cities: ["Amman"] },
];

/* ── Route eligibility ───────────────────────────────────────────────────────
 * Single source of truth for what the site may claim about a route.
 * Only a human reviewer should change a status away from "enquiry_only", and
 * only after confirming a licensed operator, vehicle and document requirements. */
export type RouteStatus = "operationally_verified" | "enquiry_only" | "temporarily_unavailable";

export interface RouteEligibility {
  fromCountry: string;
  toCountry: string;
  status: RouteStatus;
  /** Licensed operator / arrangement. Null until confirmed. */
  operatingArrangement: string | null;
  /** ISO date of last verification. Null = never verified. */
  lastVerified: string | null;
  reviewer: string | null;
  /** Public-facing limitation shown to customers. */
  publicNote: string;
}

const ENQUIRY_NOTE =
  "Cross-border journeys are arranged on request. We review feasibility, operator permits, vehicle and travel-document requirements before confirming anything.";

const crossBorderPairs: [string, string][] = [
  ["SA", "AE"], ["AE", "SA"],
  ["SA", "BH"], ["BH", "SA"],
  ["SA", "QA"], ["QA", "SA"],
  ["SA", "KW"], ["KW", "SA"],
  ["SA", "JO"], ["JO", "SA"],
];

export const ROUTE_ELIGIBILITY: RouteEligibility[] = crossBorderPairs.map(([fromCountry, toCountry]) => ({
  fromCountry,
  toCountry,
  status: "enquiry_only",
  operatingArrangement: null,
  lastVerified: null,
  reviewer: null,
  publicNote: ENQUIRY_NOTE,
}));

export function getRouteEligibility(fromCountry: string, toCountry: string): RouteEligibility | null {
  if (fromCountry === toCountry) return null; // domestic — handled as chauffeur enquiry
  return (
    ROUTE_ELIGIBILITY.find((r) => r.fromCountry === fromCountry && r.toCountry === toCountry) ?? {
      fromCountry,
      toCountry,
      status: "enquiry_only",
      operatingArrangement: null,
      lastVerified: null,
      reviewer: null,
      publicNote: ENQUIRY_NOTE,
    }
  );
}

/* ── WhatsApp ────────────────────────────────────────────────────────────────
 * Prefilled message holds only non-sensitive journey facts. `reference` is
 * included only when a real lead reference exists — never invented. */
export interface WhatsAppContext {
  category?: ServiceCategoryKey;
  origin?: string;
  destination?: string;
  date?: string;
  vehicle?: string;
  reference?: string;
}

export function buildTransportWhatsAppUrl(ctx: WhatsAppContext = {}): string {
  const parts = ["Hello Saudi Event Management, I would like a quotation for a private transportation service."];
  if (ctx.category) parts.push(`Service: ${SERVICE_CATEGORIES[ctx.category].label}.`);
  if (ctx.origin && ctx.destination) parts.push(`Route: ${ctx.origin} to ${ctx.destination}.`);
  else if (ctx.origin) parts.push(`Pickup: ${ctx.origin}.`);
  if (ctx.date) parts.push(`Date: ${ctx.date}.`);
  if (ctx.vehicle) parts.push(`Preferred vehicle: ${ctx.vehicle}.`);
  if (ctx.reference) parts.push(`Reference: ${ctx.reference}.`);
  return `https://wa.me/${SEM_WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(" "))}`;
}
