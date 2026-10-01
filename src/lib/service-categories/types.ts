// Content model for the main commercial service-category pages
// (/services/<slug>) rendered by the shared ServiceCategoryPage template.
//
// Content rules (founder-approved, 2026-10):
//  • SEM is a remote coordination platform — partners deliver. Never claim SEM
//    owns equipment, warehouses, fleets, staff, kitchens or a Saudi office.
//  • No invented prices, capacities, brands, reviews, partnerships or statistics.
//  • Never name vendors publicly — the backend manages vendors, the page sells the service.
//  • Sub-services live as sections; separate micro-pages only with
//    search-demand + vendor + conversion evidence.
//  • Images are "representative" — never captioned as SEM's own projects.
import type { ServiceLeadField } from "@/components/ServiceLeadForm";

/** Icon keys resolved to lucide icons inside ServiceCategoryPage (keeps data serialisable). */
export type IconKey =
  | "utensils" | "coffee" | "chef" | "users" | "clock" | "leaf" | "sparkles" | "monitor" | "sun"
  | "layers" | "play" | "wrench" | "truck" | "speaker" | "mic" | "sliders" | "headphones" | "radio"
  | "lightbulb" | "spotlight" | "palette" | "flower" | "sofa" | "frame" | "door" | "key" | "car"
  | "plane" | "shield" | "route" | "crown" | "music" | "disc" | "star" | "map" | "clipboard"
  | "accessibility" | "building" | "calendar" | "zap";

export interface Card {
  title: string;
  desc: string;
  icon?: IconKey;
  image?: string;
  imageAlt?: string;
  /** Short "typical use" line shown under the description. */
  useCase?: string;
  href?: string;
}

export interface ServiceCategoryContent {
  /** Short service name (breadcrumbs, schema name, headings). */
  name: string;
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  /** Quick snapshot strip under the hero — no numerical claims. */
  snapshot: { label: string; value: string }[];
  /** Concise, quotable definition for search/AI answers. */
  answer: { question: string; answer: string };
  intro: string[];
  capabilities: { heading: string; lead: string; items: Card[] };
  subServices: { heading: string; lead: string; items: Card[] };
  /** Lightweight decision-flow infographic (how a requirement turns into a setup). */
  flow: { heading: string; lead: string; steps: { label: string; detail: string }[] };
  idealFor: { heading: string; items: Card[] };
  process: { heading: string; items: Card[] };
  quoteFactors: { heading: string; lead: string; items: Card[] };
  clientChecklist: { heading: string; items: string[] };
  coordination: { heading: string; paragraphs: string[] };
  quality: { heading: string; items: Card[] };
  useCases: { heading: string; items: Card[] };
  /** Optional gallery — only when ≥3 genuinely relevant images exist. */
  gallery?: { heading: string; items: { image: string; alt: string; caption: string }[] };
  feature: { image: string; alt: string; caption: string };
  riyadh: { heading: string; paragraphs: string[]; links: { label: string; href: string }[] };
  faqs: { q: string; a: string }[];
  related: { title: string; href: string; desc: string; image?: string }[];
  form: {
    heading: string;
    subheading: string;
    submitLabel: string;
    /** Option VALUES (English) — what reaches the CRM. */
    serviceOptions: string[];
    eventTypeOptions: string[];
    /** On-screen labels (e.g. Arabic), same order as the values. */
    serviceOptionLabels?: string[];
    eventTypeOptionLabels?: string[];
    guestCountLabel?: string;
    messageLabel?: string;
    messagePlaceholder: string;
    fields: ServiceLeadField[];
    whatsappText: string;
  };
}

export interface ServiceCategory {
  slug: string;
  /** CRM source tag sent with every enquiry from this page. */
  source: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  /**
   * Metadata. Omitted for pages whose route layout.tsx already owns their
   * (indexed, bilingual) metadata — e.g. valet-parking.
   */
  meta?: { title: string; description: string; keywords: string[]; ogImageAlt: string };
  en: ServiceCategoryContent;
  /** Full Arabic content. When absent, /ar renders English and stays noindex. */
  ar?: ServiceCategoryContent;
}
