import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationCTA from "@/components/LocationCTA";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Sparkles,
  Mountain,
  Calendar,
  Users,
  CheckCircle2,
  ChevronRight,
  Camera,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/locations/alula`;
  return {
    title: "Event Management & Destination Weddings in AlUla",
    description:
      "Your event planner in AlUla for destination weddings, corporate retreats, and heritage events. RCU-permitted access to Maraya Concert Hall, Banyan Tree AlUla, Habitas, Hegra UNESCO site, and Ashar Valley. Peak season: November–April.",
    keywords:
      "event management company in AlUla, destination wedding planner AlUla, event planner in AlUla, corporate retreat AlUla, Maraya Concert Hall events, Banyan Tree AlUla wedding, Hegra UNESCO event, Ashar Valley wedding, RCU event permit AlUla",
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/locations/alula"),
    },
    openGraph: {
      title: "Event Management in AlUla — Maraya, Hegra & Luxury Desert Events",
      description:
        "Ultra-luxury destination weddings, corporate retreats & heritage brand activations in AlUla. RCU-permitted. Maraya, Hegra, Banyan Tree & Habitas AlUla.",
      url: path,
      siteName: "Saudi Event Management",
      images: [
        {
          url: "https://saudieventmanagement.com/locations/alula-og.webp",
          width: 1200,
          height: 630,
          alt: "Luxury heritage event in AlUla Saudi Arabia — Ashar Valley gala",
        },
      ],
      locale: "en_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Management in AlUla — Maraya, Hegra & Luxury Desert Events",
      description:
        "Ultra-luxury destination weddings, corporate retreats & heritage activations. RCU-permitted. Maraya, Hegra, Banyan Tree & Habitas AlUla.",
      images: ["https://saudieventmanagement.com/locations/alula-og.webp"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EventPlanner"],
      "@id": "https://saudieventmanagement.com/locations/alula#business",
      "name": "Saudi Event Management — AlUla",
      "url": "https://saudieventmanagement.com/locations/alula",
      "description":
        "Saudi Event Management delivers ultra-luxury destination weddings, corporate retreats, and heritage brand activations in AlUla, Saudi Arabia. We hold RCU-permitted access to Maraya Concert Hall, Banyan Tree AlUla, Habitas AlUla, Hegra UNESCO World Heritage Site, and Ashar Valley. All events are managed in full compliance with Royal Commission for AlUla (RCU) regulations.",
      "image": "https://saudieventmanagement.com/locations/alula-hero.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "AlUla",
        "addressRegion": "Al Madinah Province",
        "addressCountry": "SA",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.6179",
        "longitude": "37.9213",
      },
      "areaServed": [
        { "@type": "City", "name": "AlUla" },
        { "@type": "AdministrativeArea", "name": "Al Madinah Province" },
        { "@type": "Place", "name": "Ashar Valley" },
        { "@type": "Place", "name": "Hegra" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AlUla Event Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Destination Wedding Planning AlUla",
              "url": "https://saudieventmanagement.com/services/destination-events",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Retreat Management AlUla",
              "url": "https://saudieventmanagement.com/services/corporate-events",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Heritage Cultural Event Production AlUla",
              "url": "https://saudieventmanagement.com/services/cultural-events",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Brand Activation AlUla",
              "url": "https://saudieventmanagement.com/services/event-production",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Maraya Concert Hall Event Production",
              "url": "https://saudieventmanagement.com/services/event-production",
            },
          },
        ],
      },
      "telephone": "+966501234567",
      "knowsAbout": [
        "Maraya Concert Hall AlUla (world's largest mirrored building)",
        "Hegra (Mada'in Saleh) UNESCO World Heritage Site",
        "Banyan Tree AlUla resort",
        "Habitas AlUla resort",
        "Ashar Valley outdoor events",
        "Jabal Al-Fil (Elephant Rock) sunset ceremonies",
        "Royal Commission for AlUla (RCU) event permits",
        "Winter at Tantora festival",
        "Desert X AlUla brand activation",
        "AlUla Arts Festival",
        "Dadan archaeological site events",
        "Jabal Ikmah open-air inscriptions site",
        "AlUla Old Town heritage events",
        "Shaden Resort AlUla",
        "Dar Tantora boutique hotel events",
      ],
      "sameAs": ["https://www.wikidata.org/wiki/Q697499"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best event venue in AlUla for a luxury celebration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maraya Concert Hall is AlUla's premier event venue — the world's largest mirrored building at 9,740 sqm (Guinness World Record) with capacity for up to 500 seated guests in Ashar Valley. For intimate events under 150 guests, Banyan Tree AlUla and Habitas AlUla offer full resort buyout programs. Heritage site ceremonies at Hegra, Elephant Rock (Jabal Al-Fil), and Ashar Valley are available through RCU-permitted specialist event partners.",
          },
        },
        {
          "@type": "Question",
          "name": "Who approves events in AlUla and how long do permits take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Royal Commission for AlUla (RCU) is the sole governing authority for all events in AlUla — there is no Amanah or GEA equivalent. Standard event permits take 4–8 weeks; heritage site access permits for Hegra, Dadan, and Jabal Ikmah require 8–16 weeks with archaeological impact review. Saudi Event Management operates as an RCU-experienced partner with direct relationships in the commission's event licensing division.",
          },
        },
        {
          "@type": "Question",
          "name": "When is the best time of year to hold an event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The optimal event season in AlUla is November to April, when desert temperatures range from 10–25°C — ideal for outdoor ceremonies at Hegra, Elephant Rock, and Ashar Valley. This period aligns with Winter at Tantora (AlUla's flagship cultural festival) and Hegra Season. May to September is extreme summer heat — outdoor events are not viable, though Maraya Concert Hall operates year-round with full climate control.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you hold a destination wedding at Hegra or Elephant Rock in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but both require RCU heritage site access permits with 8–16 week lead times and environmental impact assessments. Hegra (Mada'in Saleh), Saudi Arabia's first UNESCO World Heritage Site, permits small, carefully managed private ceremonies among its Nabataean rock-cut tombs. Elephant Rock (Jabal Al-Fil) is more accessible for sunset ceremonies. Saudi Event Management holds the RCU relationships and experience required to secure and execute these permits.",
          },
        },
        {
          "@type": "Question",
          "name": "What luxury brands have activated events in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AlUla has hosted luxury brand activations by international fashion, jewelry, and automotive houses leveraging the UNESCO heritage landscape backdrop. The Royal Commission for AlUla (RCU) manages a brand partnership program that allows approved luxury brands to stage activations at Maraya, Ashar Valley, and Hegra-adjacent sites. Saudi Event Management coordinates RCU-approved luxury brand production from concept to execution.",
          },
        },
      ],
    },
    {
      "@type": "TouristDestination",
      "@id": "https://saudieventmanagement.com/locations/alula#destination",
      "name": "AlUla",
      "description": "AlUla is Saudi Arabia's premier luxury cultural tourism destination, home to Hegra (the country's first UNESCO World Heritage Site), Maraya Concert Hall, and the ancient Nabataean and Lihyanite archaeological landscapes of northwestern Saudi Arabia.",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.6179",
        "longitude": "37.9213",
      },
      "sameAs": "https://en.wikipedia.org/wiki/Al-Ula",
    },
    {
      "@type": "Place",
      "@id": "https://saudieventmanagement.com/locations/alula#place",
      "name": "AlUla",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.6179",
        "longitude": "37.9213",
      },
      "containsPlace": [
        { "@type": "EventVenue", "name": "Maraya Concert Hall", "description": "World's largest mirrored building, 9,740 sqm, Guinness World Record, AlUla" },
        { "@type": "LodgingBusiness", "name": "Banyan Tree AlUla" },
        { "@type": "LodgingBusiness", "name": "Habitas AlUla" },
        { "@type": "LodgingBusiness", "name": "Shaden Resort AlUla" },
        { "@type": "LodgingBusiness", "name": "Dar Tantora by The House Hotel" },
        { "@type": "LandmarksOrHistoricalBuildings", "name": "Hegra (Mada'in Saleh)", "sameAs": "https://en.wikipedia.org/wiki/Hegra" },
        { "@type": "NaturalFeature", "name": "Ashar Valley" },
        { "@type": "NaturalFeature", "name": "Jabal Al-Fil (Elephant Rock)" },
        { "@type": "LandmarksOrHistoricalBuildings", "name": "Dadan Archaeological Site" },
        { "@type": "LandmarksOrHistoricalBuildings", "name": "AlUla Old Town" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "AlUla Event Management", "item": "https://saudieventmanagement.com/locations/alula" },
      ],
    },
  ],
};

const venues = [
  {
    name: "Maraya Concert Hall",
    abbr: "World's Largest Mirrored Building",
    capacity: "Up to 500 seated",
    district: "Ashar Valley",
    type: "Galas, Concerts & Corporate Events",
    description:
      "A Guinness World Record holder at 9,740 sqm — Maraya's mirror-clad exterior reflects the Ashar Valley sandstone cliffs in an infinite visual spectacle. AlUla's primary large-scale event venue, hosting Andrea Bocelli, diplomatic galas, and luxury brand launches.",
  },
  {
    name: "Banyan Tree AlUla",
    abbr: "Full Resort Buyout Available",
    capacity: "Up to 120",
    district: "Ashar Valley",
    type: "Destination Weddings & Executive Retreats",
    description:
      "Ultra-luxury desert resort nestled in the Ashar Valley sandstone landscape. AlUla's benchmark for intimate destination weddings and executive corporate retreat buyouts, with dedicated event production infrastructure.",
  },
  {
    name: "Habitas AlUla",
    abbr: "Desert Camp Aesthetic",
    capacity: "Up to 96",
    district: "Ashar Valley",
    type: "Intimate Weddings & Brand Activations",
    description:
      "A luxury desert camp with a raw, architectural aesthetic embedded in the valley floor. Preferred by luxury brands, creative corporate retreats, and intimate destination weddings seeking an unconventional AlUla experience.",
  },
  {
    name: "Hegra (Mada'in Saleh)",
    abbr: "UNESCO World Heritage Site",
    capacity: "Intimate — RCU controlled",
    district: "Hegra Plateau",
    type: "Heritage Ceremonies & Private Dinners",
    description:
      "Saudi Arabia's first UNESCO World Heritage Site — 111 Nabataean rock-cut tombs carved into sandstone, dating to the 1st century BCE. Strictly controlled RCU access. Available for intimate private ceremonies and sunset dinners through permitted event partners.",
  },
  {
    name: "Jabal Al-Fil (Elephant Rock)",
    abbr: "Natural Arch Landmark",
    capacity: "Outdoor — custom",
    district: "AlUla Valley",
    type: "Sunset Ceremonies & Outdoor Events",
    description:
      "A 52-million-year-old naturally sculpted sandstone arch standing 52 meters tall — one of the world's most photographed geological landmarks. The defining backdrop for sunset wedding ceremonies and outdoor brand activations in AlUla.",
  },
  {
    name: "Ashar Valley & Dar Tantora",
    abbr: "AlUla Old Town",
    capacity: "Up to 60",
    district: "AlUla Old Town",
    type: "Heritage Dinners & Intimate Galas",
    description:
      "A 900-year-old mud-brick village and adjacent canyon valley, restored under RCU stewardship. Dar Tantora by The House Hotel offers the most historically immersive event setting in AlUla — intimate dinners in restored ancient merchant houses.",
  },
];

const services = [
  {
    icon: Star,
    title: "Destination Weddings",
    text: "Full-service destination wedding planning at Banyan Tree, Habitas, and heritage sites including Hegra and Elephant Rock. RCU permit management included.",
    href: "/services/destination-events",
  },
  {
    icon: Users,
    title: "Corporate Retreats & Executive Off-Sites",
    text: "Full resort buyout corporate programs at Habitas and Banyan Tree AlUla — leadership off-sites, strategy retreats, and incentive travel in the world's greatest living museum.",
    href: "/services/corporate-events",
  },
  {
    icon: Sparkles,
    title: "Luxury Brand Activations",
    text: "RCU-approved luxury brand activations at Maraya, Ashar Valley, and Hegra-adjacent landscapes. Fashion, automotive, jewelry, and hospitality brand productions.",
    href: "/services/event-production",
  },
  {
    icon: Mountain,
    title: "Heritage Cultural Events",
    text: "Private heritage site dinners among Nabataean tombs at Hegra, sunset ceremonies at Elephant Rock, and cultural galas at Maraya Concert Hall.",
    href: "/services/cultural-events",
  },
  {
    icon: Camera,
    title: "Maraya Concert Hall Production",
    text: "Corporate gala dinners, award ceremonies, and brand launches at the world's largest mirrored building — full technical production and RCU coordination.",
    href: "/services/event-production",
  },
  {
    icon: MapPin,
    title: "Winter at Tantora Integration",
    text: "Corporate sponsorship event management and brand hospitality programs integrated into AlUla's flagship annual cultural festival.",
    href: "/services/cultural-events",
  },
];

const faqs = [
  {
    q: "What is the best event venue in AlUla for a luxury celebration?",
    a: "Maraya Concert Hall is AlUla's premier event venue — the world's largest mirrored building (9,740 sqm, Guinness World Record) with capacity for 500 seated guests in Ashar Valley. For intimate events under 150 guests, Banyan Tree AlUla and Habitas AlUla offer full resort buyouts. Heritage ceremonies at Hegra, Elephant Rock, and Ashar Valley are available through RCU-permitted specialist partners.",
  },
  {
    q: "Who approves events in AlUla and how long do permits take?",
    a: "The Royal Commission for AlUla (RCU) is the sole governing authority — there is no Amanah or GEA equivalent. Standard event permits take 4–8 weeks. Heritage site access permits for Hegra, Dadan, and Jabal Ikmah require 8–16 weeks with archaeological impact review. Saudi Event Management holds direct RCU relationships and manages the full permitting process.",
  },
  {
    q: "When is the best season to hold an event in AlUla?",
    a: "November to April — desert temperatures of 10–25°C, ideal for outdoor heritage ceremonies. This aligns with Winter at Tantora and Hegra Season. May to September is extreme heat — outdoor events are not viable. Maraya Concert Hall operates year-round with full climate control.",
  },
  {
    q: "Can you hold a destination wedding at Hegra or Elephant Rock?",
    a: "Yes. Hegra (Saudi Arabia's first UNESCO World Heritage Site) permits small, carefully managed private ceremonies among its Nabataean rock-cut tombs with RCU heritage access permits (8–16 weeks lead time). Elephant Rock (Jabal Al-Fil) is more accessible for sunset ceremonies. Saudi Event Management secures and manages both permit tracks.",
  },
  {
    q: "How are luxury brand activations managed in AlUla?",
    a: "The Royal Commission for AlUla (RCU) manages a brand partnership program allowing approved luxury brands to activate at Maraya, Ashar Valley, and Hegra-adjacent sites. Saudi Event Management coordinates the full RCU brand activation approval process, production design, and on-ground management for fashion, automotive, jewelry, and hospitality brand events.",
  },
];

const eventCalendar = [
  {
    period: "Nov – Apr",
    season: "Peak Desert Season",
    events: "Destination weddings, heritage ceremonies, corporate retreats, outdoor activations",
    demand: "Peak",
  },
  {
    period: "Jan – Mar",
    season: "Winter at Tantora",
    events: "Maraya concerts, arts festival, Hegra Season, brand activations, corporate sponsorships",
    demand: "Very High",
  },
  {
    period: "Sep – Oct",
    season: "Season Opening & National Day",
    events: "Season launch events, National Day cultural programming, resort re-openings",
    demand: "High",
  },
  {
    period: "May – Aug",
    season: "Summer Off-Season",
    events: "Indoor Maraya events only — climate-controlled productions; strategic planning period",
    demand: "Low",
  },
];

export default function AlUlaPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Event Management & Destination Weddings in "
        titleHighlight="AlUla"
        subtitle="In the world's greatest living museum — destination weddings, corporate retreats, and heritage events from Maraya Concert Hall to Hegra's Nabataean tombs and Elephant Rock at sunset. RCU-permitted."
        backgroundImage="/locations/alula-hero.webp"
        imageAlt="AlUla heritage landscape — event management and destination weddings in AlUla, Saudi Arabia"
        badge="Saudi Arabia's UNESCO Destination | AlUla"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "AlUla" },
        ]}
        minHeight="large"
      />

      {/* CTA Bar */}
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">
            Request a Proposal
          </Link>
          <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">
            View Destination Work
          </Link>
        </div>
      </div>

      {/* At a Glance Strip */}
      <section className="py-12 bg-[var(--surface-raised)] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "UNESCO Heritage Site", val: "Hegra" },
              { label: "Maraya Capacity", val: "500" },
              { label: "Peak Season", val: "Nov–Apr" },
              { label: "Permit Authority", val: "RCU" },
              { label: "Guinness Record", val: "Maraya" },
              { label: "Event Style", val: "Ultra-Luxury" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-display font-semibold text-neutral-900">{item.val}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AlUla — Authority + Landscape Section */}
      <section className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-md">
            <Image
              src="/alula_maraya_hegra_guide.webp"
              alt="Maraya Concert Hall and Hegra Nabataean heritage in AlUla — where events transform into history"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
              <div className="glass p-6 rounded-2xl">
                <p className="text-white text-sm font-display font-light">
                  &quot;There is nowhere on earth like this. AlUla doesn&apos;t
                  host events — it transforms them into history.&quot;
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">The AlUla Difference</span>
            <h2 className="font-display font-semibold text-neutral-900 mb-8 text-2xl md:text-3xl">
              Ancient Landscapes,{" "}
              <span className="text-[var(--primary)]">Modern Luxury</span>
            </h2>
            <div className="prose prose-slate max-w-none text-neutral-600 text-sm leading-relaxed space-y-4 mb-8">
              <p>
                AlUla is Saudi Arabia&apos;s most extraordinary destination —
                a 200,000-year-old landscape of sandstone canyons, palm oases,
                and Nabataean heritage that the{" "}
                <strong>Royal Commission for AlUla (RCU)</strong> has branded
                "The World&apos;s Greatest Living Museum." Events here operate
                at a category above: intimate, meticulously produced, and
                entirely irreplaceable.
              </p>
              <p>
                <strong>Maraya Concert Hall</strong> — the world&apos;s largest
                mirrored building at 9,740 sqm (Guinness World Record) — sits
                at the foot of <strong>Ashar Valley</strong>&apos;s rose-red
                cliffs. <strong>Hegra</strong> (Mada'in Saleh), Saudi
                Arabia&apos;s first <strong>UNESCO World Heritage Site</strong>
                , offers 111 Nabataean tombs as ceremony backdrops under
                strict <strong>RCU heritage access permits</strong>.{" "}
                <strong>Banyan Tree AlUla</strong> and{" "}
                <strong>Habitas AlUla</strong> host full resort buyout programs
                for destination weddings and executive retreats that no other
                Saudi city can replicate.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "RCU-permitted access to Hegra UNESCO site and Ashar Valley",
                "Maraya Concert Hall preferred production partner",
                "Full resort buyout management — Banyan Tree & Habitas AlUla",
                "Exclusive Elephant Rock (Jabal Al-Fil) sunset ceremony access",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                  <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Services in AlUla</span>
            <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
              What We Deliver{" "}
              <span className="text-[var(--primary)]">in AlUla</span>
            </h2>
            <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
              From Maraya gala production to private Hegra dinners at dusk —
              every AlUla event we manage is a once-in-a-lifetime experience
              engineered to that standard.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group flex flex-col gap-3 p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-[var(--primary)]/40 hover:-translate-y-1 transition-all"
              >
                <item.icon size={22} className="text-[var(--primary)]" />
                <h3 className="font-display font-semibold text-neutral-900 text-sm">{item.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed flex-1">{item.text}</p>
                <span className="text-xs text-[var(--primary)] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LocationCTA city="AlUla" />

      {/* Venues Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Venue Network</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            AlUla&apos;s{" "}
            <span className="text-[var(--primary)]">Extraordinary Venues</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
            From Maraya&apos;s mirrored Guinness Record walls to the UNESCO
            tombs of Hegra — AlUla&apos;s event venues exist nowhere else
            on earth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, i) => (
            <div
              key={i}
              className="flex flex-col p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-neutral-900 text-sm leading-snug">{venue.name}</h3>
                  <span className="text-xs text-neutral-400">{venue.abbr}</span>
                </div>
                <span className="text-xs bg-emerald-50 text-[var(--primary)] border border-emerald-200 px-2 py-1 rounded-sm font-medium whitespace-nowrap ml-2">
                  {venue.capacity}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin size={11} className="text-neutral-400" />
                <span className="text-xs text-neutral-400">{venue.district}</span>
              </div>
              <p className="text-neutral-500 text-xs leading-relaxed flex-1">{venue.description}</p>
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">{venue.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 md:py-28 bg-[var(--surface-raised)] border-t border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Events in AlUla", val: "40+" },
              { label: "Venue Partnerships", val: "8" },
              { label: "RCU Permit Success", val: "100%" },
              { label: "UNESCO Heritage Events", val: "Specialist" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RCU Permit Section — Critical Moat Content */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-label">Navigating AlUla</span>
            <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4 mb-6">
              The RCU Permit Process —{" "}
              <span className="text-[var(--primary)]">
                Why It Matters
              </span>
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              The <strong>Royal Commission for AlUla (RCU)</strong> is the
              sole governing authority for every event in AlUla — from private
              weddings to international brand activations. Unlike every other
              Saudi city, there is no Amanah, GEA, or SECB pathway. All permits
              flow through RCU&apos;s event licensing division, which operates
              distinct tracks for commercial events, cultural programming,
              heritage site access, and sustainability compliance.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed mb-8">
              Working with an event partner that already holds RCU relationships
              is not optional — it is the difference between an event that
              happens and one that doesn&apos;t. Saudi Event Management has
              delivered events in AlUla through full RCU compliance on every
              engagement.
            </p>
            <Link
              href="/contact"
              className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm inline-block"
            >
              Discuss Your AlUla Event
            </Link>
          </div>
          <div className="space-y-4">
            {[
              {
                track: "Standard Event Permit",
                timeline: "4–8 weeks",
                scope: "Hotels, resorts, Maraya Concert Hall, non-heritage outdoor spaces",
              },
              {
                track: "Heritage Site Access Permit",
                timeline: "8–16 weeks",
                scope: "Hegra, Dadan, Jabal Ikmah, AlUla Old Town — archaeological impact review required",
              },
              {
                track: "Brand Activation Permit",
                timeline: "6–12 weeks",
                scope: "Commercial brand events at RCU-managed sites — landscape and visual impact assessment",
              },
              {
                track: "Sustainability Compliance",
                timeline: "Concurrent",
                scope: "All events — waste management, ecological footprint, and desert conservation protocols",
              },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-white border border-neutral-200/80 rounded-2xl shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-neutral-900 text-sm">{item.track}</h3>
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium ml-2 whitespace-nowrap">
                    {item.timeline}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">{item.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Planning Your Event</span>
            <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
              AlUla Event{" "}
              <span className="text-[var(--primary)]">Season Calendar</span>
            </h2>
            <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
              AlUla&apos;s event season is the most compressed in Saudi Arabia.
              Banyan Tree and Habitas book out 9–12 months ahead for the
              November–April peak. Plan accordingly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventCalendar.map((row, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-[var(--primary)]/30 transition-all">
                <Calendar size={20} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-semibold text-neutral-900 text-sm">{row.period}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      row.demand === "Peak"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : row.demand === "Very High"
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : row.demand === "Low"
                            ? "bg-[var(--surface-raised)] text-neutral-500 border border-neutral-200/80"
                            : "bg-emerald-50 text-[var(--primary)] border border-emerald-200"
                    }`}>
                      {row.demand} Demand
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-600 mb-1">{row.season}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{row.events}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Citation Block */}
      <section className="py-20 md:py-28 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
            AlUla Event Authority
          </span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4 mb-12">
            Why the World&apos;s Most Discerning Clients Choose{" "}
            <span className="text-[var(--primary)]">Saudi Event Management</span> in AlUla
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "The Only RCU-Experienced Event Partner",
                body: "We hold direct Royal Commission for AlUla relationships built across multiple event cycles — the non-negotiable requirement for accessing Hegra, Maraya, and the full heritage landscape for private events.",
              },
              {
                title: "Guinness-Record Venue Specialists",
                body: "Maraya Concert Hall's 9,740 sqm mirrored exterior requires specialist production knowledge. We have delivered corporate galas and luxury brand events inside the world's largest mirrored building.",
              },
              {
                title: "Destination Event Logistics Mastery",
                body: "International destination guests, private jet coordination at AlUla Airport (ULH), desert climate logistics, and sustainable event infrastructure — the full operational complexity of AlUla, solved.",
              },
            ].map((card, i) => (
              <div key={i} className="p-7 bg-white border border-neutral-200/80 rounded-2xl shadow-sm">
                <h3 className="font-display font-semibold text-neutral-900 text-sm mb-3">{card.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Common Questions</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            Event Management in AlUla —{" "}
            <span className="text-[var(--primary)]">FAQ</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-200/80 rounded-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="font-display font-semibold text-neutral-900 text-sm mb-3">{faq.q}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entity Architecture Block */}
      <section className="py-20 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Event Management in AlUla, Saudi Arabia
            </h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p>
                <strong>Saudi Event Management</strong> is AlUla&apos;s
                specialist event management partner — delivering ultra-luxury
                destination weddings, corporate retreats, and heritage brand
                activations in Saudi Arabia&apos;s most extraordinary
                destination. AlUla, governed by the{" "}
                <strong>Royal Commission for AlUla (RCU)</strong>, is home to{" "}
                <strong>Hegra</strong> — the Kingdom&apos;s first{" "}
                <strong>UNESCO World Heritage Site</strong> — and{" "}
                <strong>Maraya Concert Hall</strong>, the{" "}
                <strong>Guinness World Record</strong> holder for the
                world&apos;s largest mirrored building.
              </p>
              <p>
                Our AlUla portfolio spans full resort buyout programs at{" "}
                <strong>Banyan Tree AlUla</strong> and{" "}
                <strong>Habitas AlUla</strong>, private heritage dinners at{" "}
                <strong>Hegra</strong>, sunset ceremonies at{" "}
                <strong>Jabal Al-Fil (Elephant Rock)</strong>, and luxury brand
                activations integrated with{" "}
                <strong>Winter at Tantora</strong> and{" "}
                <strong>Desert X AlUla</strong>. As an{" "}
                <strong>RCU-experienced event partner</strong>, we manage the
                full permitting process — the non-negotiable gateway to
                operating in AlUla&apos;s heritage landscape. AlUla&apos;s
                position as the centrepiece of Saudi{" "}
                <strong>Vision 2030</strong>&apos;s cultural tourism strategy
                will make it one of the world&apos;s most cited luxury event
                destinations by 2030.
              </p>
              <p>
                Planning a destination wedding in AlUla or a corporate retreat at
                Banyan Tree or Habitas?{" "}
                <Link href="/contact" className="text-[var(--primary)] underline underline-offset-4 font-medium">Contact our AlUla team</Link>{" "}
                or{" "}
                <Link href="/consultation" className="text-[var(--primary)] underline underline-offset-4 font-medium">book a free consultation</Link>{" "}
                — and explore our{" "}
                <Link href="/portfolio" className="text-[var(--primary)] underline underline-offset-4 font-medium">destination event portfolio</Link>.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                All Services Available in AlUla:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Destination Wedding Planner in AlUla", href: "/services/destination-events" },
                  { name: "Corporate Retreats", href: "/services/corporate-events" },
                  { name: "Heritage & Cultural Events", href: "/services/cultural-events" },
                  { name: "Brand Activations", href: "/services/event-production" },
                  { name: "Maraya Productions", href: "/services/event-production" },
                  { name: "Luxury & VIP Events", href: "/services/luxury-vip-events" },
                ].map((svc) => (
                  <Link
                    key={svc.name}
                    href={svc.href}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Other Locations:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Riyadh", href: "/locations/riyadh" },
                  { name: "Jeddah", href: "/locations/jeddah" },
                  { name: "Dammam", href: "/locations/dammam" },
                  { name: "Makkah", href: "/locations/makkah" },
                ].map((loc) => (
                  <Link
                    key={loc.href}
                    href={loc.href}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    Events in {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
