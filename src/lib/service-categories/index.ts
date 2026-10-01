import type { ServiceCategory, ServiceCategoryContent } from "./types";
import { eventCatering } from "./event-catering";
import { ledScreens } from "./led-screens";
import { soundAudio } from "./sound-audio";
import { eventLighting } from "./event-lighting";
import { eventDecoration } from "./event-decoration";
import { valetParking } from "./valet-parking";
import { vipTransportation } from "./vip-transportation";
import { entertainment } from "./entertainment";

export type { ServiceCategory, ServiceCategoryContent } from "./types";

export const SERVICE_CATEGORIES: Record<string, ServiceCategory> = Object.fromEntries(
  [eventCatering, ledScreens, soundAudio, eventLighting, eventDecoration, valetParking, vipTransportation, entertainment].map((c) => [c.slug, c]),
);

export function getServiceCategory(slug: string): ServiceCategory {
  const c = SERVICE_CATEGORIES[slug];
  if (!c) throw new Error(`Unknown service category: ${slug}`);
  return c;
}

/** Locale-resolved content: Arabic when the category has it, otherwise English. */
export function contentFor(c: ServiceCategory, locale: string): { content: ServiceCategoryContent; isAr: boolean } {
  if (locale === "ar" && c.ar) return { content: c.ar, isAr: true };
  return { content: c.en, isAr: false };
}

/* ─────────────────────────── Riyadh commercial hub ─────────────────────────── */

export type HubGroup = "technical" | "hospitality" | "guest" | "entertainment" | "exhibitions" | "transport";

export interface HubService {
  title: string;
  href: string;
  desc: string;
  keyServices: string[];
  image?: string;
  imageAlt?: string;
  /** "featured" cards render larger on the hub — the highest-conversion services. */
  tier: "featured" | "standard";
  groups: HubGroup[];
}

// Ordered by conversion priority (founder brief, 2026-10). Every href is an
// existing, authoritative service URL — no new URLs are implied by this list.
export const RIYADH_HUB_SERVICES: HubService[] = [
  { title: "VIP Transportation", href: "/services/vip-transportation", desc: "Airport transfers, chauffeured luxury vehicles and delegate transport coordinated around your programme.", keyServices: ["Airport transfers", "Luxury SUVs & sedans", "Delegate shuttles", "Secure transport"], image: "/services/vip_airport_chauffeur_riyadh.webp", imageAlt: "Chauffeur opening an SUV door for a guest outside a hotel", tier: "featured", groups: ["transport", "guest"] },
  { title: "Valet Parking", href: "/services/valet-parking", desc: "Uniformed valet teams, key handling and smooth arrivals for weddings, galas and corporate events.", keyServices: ["Guest arrival", "Key management", "VIP arrival", "Golf carts"], image: "/services/valet_golf_cart_guest_mobility.webp", imageAlt: "Golf cart moving a guest to a lit venue entrance", tier: "featured", groups: ["guest", "transport"] },
  { title: "Event Catering", href: "/services/event-catering", desc: "Corporate, wedding and private catering from suitable Riyadh caterers — buffets, plated dinners and receptions.", keyServices: ["Corporate catering", "Wedding catering", "Coffee breaks", "Majlis hospitality"], image: "/services/saudi_gala_table_alcohol_free.webp", imageAlt: "Formal dinner table with gold tableware and florals", tier: "featured", groups: ["hospitality"] },
  { title: "LED Screens", href: "/services/led-screens", desc: "LED walls, stage displays and exhibition screens specified for your venue and audience.", keyServices: ["LED walls", "Stage backdrops", "Outdoor screens", "Exhibition screens"], image: "/services/gallery_corporate_gala.webp", imageAlt: "LED video wall behind a conference stage", tier: "standard", groups: ["technical", "exhibitions"] },
  { title: "Sound & Audio", href: "/services/sound-audio", desc: "Sound systems, wireless microphones and engineers for speech and live music.", keyServices: ["PA systems", "Wireless mics", "Line arrays", "Technicians"], image: "/services/event_production_stage_riyadh.webp", imageAlt: "Line-array speakers and mixing desk at an event stage", tier: "standard", groups: ["technical", "entertainment"] },
  { title: "Event Lighting", href: "/services/event-lighting", desc: "Stage, ambient and decorative lighting that sets the mood and lights the programme.", keyServices: ["Stage lighting", "Uplighting", "Moving heads", "Outdoor lighting"], image: "/riyadh_luxury_reception_people.webp", imageAlt: "Ballroom with warm stage lighting and chandeliers", tier: "standard", groups: ["technical"] },
  { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage builds, truss and rigging, AV integration and technical crews for the full show.", keyServices: ["Stage design", "Truss & rigging", "AV production", "Technical crew"], image: "/services/premium_corporate_summit_hero.webp", imageAlt: "Corporate summit stage with LED backdrop", tier: "standard", groups: ["technical", "exhibitions"] },
  { title: "Entertainment", href: "/services/entertainment", desc: "Live bands, DJs, cultural performances and interactive acts, subject to date and availability.", keyServices: ["Live bands", "DJs", "Cultural performances", "Family entertainment"], image: "/services/live_band_musicians_saudi.webp", imageAlt: "Live oud, violin and keyboard trio on stage", tier: "standard", groups: ["entertainment"] },
  { title: "Exhibitions & Booths", href: "/services/exhibitions", desc: "Exhibition and stand coordination — booth builds, AV, furniture, graphics and staffing.", keyServices: ["Booth design & build", "Exhibition AV", "Furniture", "Graphics"], tier: "standard", groups: ["exhibitions"] },
  { title: "Event Decoration", href: "/services/event-decoration", desc: "Stages, florals, table styling and event furniture for weddings, galas and private events.", keyServices: ["Wedding décor", "Floral styling", "Table styling", "Event furniture"], image: "/saudi_event_decor_2026.webp", imageAlt: "Styled lounge with sofas, florals and lanterns", tier: "standard", groups: ["hospitality", "guest"] },
];

export const HUB_GROUPS: { id: HubGroup; label: string; blurb: string }[] = [
  { id: "technical", label: "Technical", blurb: "Screens, sound, lighting and the stage that holds them together." },
  { id: "hospitality", label: "Hospitality", blurb: "Food, drink and the styled spaces guests spend time in." },
  { id: "guest", label: "Guest Experience", blurb: "How guests arrive, move and are looked after." },
  { id: "entertainment", label: "Entertainment", blurb: "Performers and the audio that carries them." },
  { id: "exhibitions", label: "Exhibitions", blurb: "Stands, screens and production for show floors." },
  { id: "transport", label: "Transportation", blurb: "Airport, hotel and venue movement for guests." },
];

/** "Build your event" sequence — each node links to the service that covers it. */
export const EVENT_BUILD_STEPS: { label: string; note: string; href: string }[] = [
  { label: "Venue", note: "Hall, hotel or outdoor site", href: "/services/production-venues" },
  { label: "Guest Arrival & Valet", note: "Drop-off, keys, parking", href: "/services/valet-parking" },
  { label: "VIP Transportation", note: "Airport, hotel, convoys", href: "/services/vip-transportation" },
  { label: "Stage", note: "Structure, truss, backdrop", href: "/services/event-production" },
  { label: "LED", note: "Screens and video walls", href: "/services/led-screens" },
  { label: "Sound", note: "Speakers and microphones", href: "/services/sound-audio" },
  { label: "Lighting", note: "Stage and ambient light", href: "/services/event-lighting" },
  { label: "Décor", note: "Florals, styling, furniture", href: "/services/event-decoration" },
  { label: "Catering", note: "Food and hospitality", href: "/services/event-catering" },
  { label: "Entertainment", note: "Music and performers", href: "/services/entertainment" },
];
