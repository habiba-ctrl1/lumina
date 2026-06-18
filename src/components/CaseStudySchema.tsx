// Server component — injects per-case-study structured data (CreativeWork +
// ImageObject + BreadcrumbList) so each portfolio project is independently
// understood by search engines and AI answer engines (GEO/AIO), and matches
// the ItemList referenced from /portfolio.
//
// Usage:  <CaseStudySchema slug="makkah-vip-retreat" />

const BASE = "https://saudieventmanagement.com";

type CaseStudy = {
  name: string;
  description: string;
  category: string;
  location: string;
  image: string;
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  "makkah-vip-retreat": {
    name: "Makkah VIP Retreat",
    description:
      "A 10-day ultra-luxury private retreat in Makkah with multi-tier security, bespoke private dining, and zero-wait Haram transport logistics for a high-profile VIP delegation.",
    category: "VIP & Private Events",
    location: "Makkah",
    image: "/portfolio/makkah-vip-retreat.webp",
  },
  "madinah-spiritual-event": {
    name: "Madinah Spiritual Event",
    description:
      "A dignified spiritual gathering in Madinah Al-Munawwarah, designed around tranquility, prayer-time flow, and traditional craftsmanship with discreet five-star hospitality.",
    category: "Cultural & Spiritual Events",
    location: "Madinah",
    image: "/portfolio/madinah-spiritual.webp",
  },
  "alula-desert-festival": {
    name: "AlUla Desert Festival",
    description:
      "A heritage desert festival production in AlUla's Ashar Valley blending Nabataean landscapes with contemporary staging, lighting, and seated-audience experience.",
    category: "Cultural Events",
    location: "AlUla",
    image: "/portfolio/alula-festival.webp",
  },
  "dammam-corporate-seminar": {
    name: "Dammam Corporate Seminar",
    description:
      "An energy-sector corporate seminar in Dammam / Al-Khobar with full conference production, delegate management, and networking program on the Arabian Gulf coast.",
    category: "Corporate Events",
    location: "Dammam",
    image: "/portfolio/dammam-seminar.webp",
  },
  "executive-summit-jeddah": {
    name: "Jeddah Executive Summit",
    description:
      "A 300-guest high-security diplomatic corporate summit at a prominent Jeddah venue, with protocol management, stage production, and Red Sea hospitality.",
    category: "Corporate Events",
    location: "Jeddah",
    image: "/portfolio/jeddah-summit.webp",
  },
  "global-tech-summit": {
    name: "Global Tech Summit",
    description:
      "A large-scale technology conference in Riyadh with an LED keynote stage, immersive production, and full delegate and speaker management.",
    category: "Conferences & Summits",
    location: "Riyadh",
    image: "/portfolio/tech-summit.webp",
  },
  "neom-future-summit": {
    name: "NEOM Future Summit",
    description:
      "A 250-VIP zero-waste luxury conference production for a leading Saudi giga-project, delivered inside NEOM's contemporary venue infrastructure.",
    category: "Conferences & Summits",
    location: "NEOM",
    image: "/portfolio/neom-summit.webp",
  },
  "riyadh-elite-majlis": {
    name: "Riyadh Elite Majlis",
    description:
      "An opulent traditional Saudi majlis gathering in Riyadh with Najdi-inspired décor, gold-and-cream seating, and refined VIP hospitality.",
    category: "VIP & Private Events",
    location: "Riyadh",
    image: "/portfolio/riyadh-majlis.webp",
  },
  "riyadh-luxury-soiree": {
    name: "Riyadh Luxury Soirée",
    description:
      "A glamorous evening luxury soirée in Riyadh featuring candle-lit tablescapes, floral architecture, and full event production for a sophisticated guest list.",
    category: "Luxury Events",
    location: "Riyadh",
    image: "/portfolio/riyadh-soiree.webp",
  },
  "alkhobar-corporate-retreat": {
    name: "Al Khobar Corporate Retreat",
    description:
      "A 120-delegate executive team-building and branding retreat in the Eastern Province, with full logistics, facilitation, and corporate hospitality.",
    category: "Corporate Events",
    location: "Al Khobar",
    image: "/alkhobar_corporate_people.webp",
  },
  "grand-wedding-ceremony": {
    name: "Grand Wedding Ceremony",
    description:
      "A 600+ guest grand wedding in Riyadh with traditional VIP entrance protocol, bespoke staging, floral architecture, and full production.",
    category: "Luxury Weddings",
    location: "Riyadh",
    image: "/wedding_hall_grand_entrance.webp",
  },
  "jeddah-beach-wedding": {
    name: "Jeddah Seaside Wedding",
    description:
      "A 450-guest luxury Red Sea coastal wedding production on the Jeddah seafront, with waterfront staging, lighting, and bespoke design.",
    category: "Luxury Weddings",
    location: "Jeddah",
    image: "/jeddah_beach_wedding_setup.webp",
  },
  "riyadh-government-summit": {
    name: "Riyadh Government Summit",
    description:
      "A 1,200+ delegate government summit in Riyadh with immersive multi-screen production, protocol management, and high-security delegate operations.",
    category: "Conferences & Summits",
    location: "Riyadh",
    image: "/riyadh_summit_people.webp",
  },
};

export default function CaseStudySchema({ slug }: { slug: string }) {
  const cs = CASE_STUDIES[slug];
  if (!cs) return null;

  const url = `${BASE}/portfolio/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: cs.name,
        headline: `${cs.name} — Event Management Case Study`,
        description: cs.description,
        about: cs.category,
        url,
        image: {
          "@type": "ImageObject",
          url: `${BASE}${cs.image}`,
          caption: `${cs.name} — ${cs.category} in ${cs.location}, Saudi Arabia`,
        },
        locationCreated: {
          "@type": "Place",
          name: `${cs.location}, Saudi Arabia`,
        },
        creator: { "@id": `${BASE}/#organization` },
        provider: { "@id": `${BASE}/#organization` },
        isPartOf: { "@id": `${BASE}/#website` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE}/portfolio` },
          { "@type": "ListItem", position: 3, name: cs.name, item: url },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
