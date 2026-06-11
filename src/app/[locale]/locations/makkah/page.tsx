import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Star,
  Users,
  Calendar,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/locations/makkah`;
  return {
    title: "Event Management in Makkah Al-Mukarramah | Saudi Event Management",
    description:
      "Saudi Event Management delivers corporate conferences, halal exhibitions, luxury weddings, and Haj corporate hospitality in Makkah Al-Mukarramah. Muslim-only staffing. Permitted by Amanah Makkah, RCMC, and Ministry of Haj. Venues: Hilton Makkah Convention Hotel, Fairmont, Raffles, Abraj Al-Bait.",
    keywords:
      "event management Makkah, corporate events Makkah Al-Mukarramah, conference organizer Makkah, Hilton Makkah Convention Hotel, Fairmont Makkah wedding, Haj corporate hospitality, halal exhibition management, تنظيم فعاليات مكة المكرمة",
    alternates: {
      canonical: path,
      languages: {
        "en-US": `${base}/locations/makkah`,
        "ar-SA": `${base}/ar/locations/makkah`,
      },
    },
    openGraph: {
      title: "Event Management in Makkah Al-Mukarramah | Saudi Event Management",
      description:
        "Corporate conferences, halal exhibitions, luxury weddings and Haj corporate hospitality in Makkah Al-Mukarramah. Muslim-only operations. RCMC and Amanah Makkah permitted.",
      url: path,
      siteName: "Saudi Event Management",
      images: [
        {
          url: "https://saudieventmanagement.com/gallery_corporate_gala.webp",
          width: 1200,
          height: 630,
          alt: "Corporate event management in Makkah Al-Mukarramah Saudi Arabia",
        },
      ],
      locale: "en_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Management in Makkah Al-Mukarramah | Saudi Event Management",
      description:
        "Corporate conferences, halal exhibitions, luxury weddings & Haj hospitality in Makkah. Muslim-only staffing. RCMC permitted.",
      images: ["https://saudieventmanagement.com/gallery_corporate_gala.webp"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EventPlanner"],
      "@id": "https://saudieventmanagement.com/locations/makkah#business",
      "name": "Saudi Event Management — Makkah Al-Mukarramah",
      "url": "https://saudieventmanagement.com/locations/makkah",
      "description":
        "Saudi Event Management provides full-service event management in Makkah Al-Mukarramah, including corporate conferences at the Hilton Makkah Convention Hotel, luxury weddings at Fairmont and Raffles Makkah, halal exhibitions, and Haj corporate hospitality. All operations are Muslim-staffed and permitted by Amanah Makkah and the Royal Commission for Makkah City and Holy Sites (RCMC).",
      "image":
        "https://saudieventmanagement.com/gallery_corporate_gala.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Makkah Al-Mukarramah",
        "addressRegion": "Makkah Province",
        "addressCountry": "SA",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.3891",
        "longitude": "39.8579",
      },
      "areaServed": [
        { "@type": "City", "name": "Makkah Al-Mukarramah" },
        { "@type": "AdministrativeArea", "name": "Makkah Province" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Makkah Event Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Event Management Makkah",
              "url": "https://saudieventmanagement.com/locations/makkah/corporate-event-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Exhibition Management Makkah — Halal Expos",
              "url": "https://saudieventmanagement.com/locations/makkah/exhibition-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Wedding Planning Makkah",
              "url": "https://saudieventmanagement.com/locations/makkah/luxury-wedding-planning",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Haj Corporate Hospitality Management",
              "url": "https://saudieventmanagement.com/locations/makkah/corporate-event-management",
            },
          },
        ],
      },
      "telephone": "+966501234567",
      "knowsAbout": [
        "Hilton Makkah Convention Hotel",
        "Fairmont Makkah Clock Royal Tower",
        "Raffles Makkah Palace",
        "Abraj Al-Bait Complex",
        "Jabal Omar Development",
        "Conrad Makkah",
        "Swissotel Al Maqam Makkah",
        "Amanah Makkah event permits",
        "Royal Commission for Makkah City and Holy Sites (RCMC)",
        "Ministry of Haj and Umrah",
        "Muslim World League events",
        "Islamic Development Bank conferences",
        "Haj corporate hospitality",
        "Halal exhibition management",
        "Ramadan corporate Iftar events Makkah",
        "Muslim-only event staffing",
      ],
      "sameAs": ["https://www.wikidata.org/wiki/Q5806"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What permits are required to host a corporate event in Makkah Al-Mukarramah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Corporate events in Makkah require a standard event permit from Amanah Makkah Al-Mukarramah (3–6 week lead time) and, for venues within 500 meters of Masjid Al-Haram, an additional RCMC overlay permit from the Royal Commission for Makkah City and Holy Sites. All attendees, vendors, and event staff must be Muslim with documented verification. Saudi Event Management manages the complete permitting process.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the best conference venue in Makkah Al-Mukarramah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Hilton Makkah Convention Hotel in Ajyad District is Makkah's largest dedicated conference facility, accommodating up to 3,500 attendees with a purpose-built convention wing. For Haram-proximate conferences, the Fairmont Makkah Clock Royal Tower and Swissotel Al Maqam Makkah, both within the Abraj Al-Bait complex, offer premium meeting suites with direct Grand Mosque views.",
          },
        },
        {
          "@type": "Question",
          "name": "Can non-Muslim staff or vendors work at events in Makkah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Makkah Al-Mukarramah is exclusively accessible to Muslims under Saudi Arabian law enforced by the Royal Commission for Makkah City and Holy Sites. All event staff, AV technicians, caterers, security, décor crews, and photographers must be Muslim with valid documentation. Saudi Event Management maintains a fully verified Muslim-only vendor and crew network in Makkah.",
          },
        },
        {
          "@type": "Question",
          "name": "What is Haj corporate hospitality and who provides it in Makkah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Haj corporate hospitality refers to the professional management of VIP pilgrim delegation logistics during Haj season — including accommodation coordination at Abraj Al-Bait hotels, private transport, Arafat day arrangements, and post-Haj corporate receptions. Saudi Event Management is one of the few event companies in Makkah that provides end-to-end Haj corporate hospitality for Islamic banks, OIC delegations, and Muslim-majority multinational corporations.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the peak event season in Makkah?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Makkah's peak event periods are Ramadan (corporate Iftar dinners and evening receptions), Haj season (Dhul Hijjah — corporate hospitality and VIP delegation management), and Eid Al-Fitr and Eid Al-Adha (luxury private celebrations). October to February is the best period for outdoor and non-pilgrimage corporate events due to cooler temperatures.",
          },
        },
      ],
    },
    {
      "@type": "Place",
      "@id": "https://saudieventmanagement.com/locations/makkah#place",
      "name": "Makkah Al-Mukarramah",
      "alternateName": "Mecca",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.3891",
        "longitude": "39.8579",
      },
      "sameAs": "https://en.wikipedia.org/wiki/Mecca",
      "containsPlace": [
        {
          "@type": "LodgingBusiness",
          "name": "Hilton Makkah Convention Hotel",
        },
        {
          "@type": "LodgingBusiness",
          "name": "Fairmont Makkah Clock Royal Tower",
        },
        { "@type": "LodgingBusiness", "name": "Raffles Makkah Palace" },
        { "@type": "LodgingBusiness", "name": "Conrad Makkah" },
        { "@type": "LodgingBusiness", "name": "Swissotel Al Maqam Makkah" },
        {
          "@type": "LodgingBusiness",
          "name": "Hyatt Regency Makkah Jabal Omar",
        },
        { "@type": "LodgingBusiness", "name": "Pullman ZamZam Makkah" },
        {
          "@type": "LandmarksOrHistoricalBuildings",
          "name": "Abraj Al-Bait (Makkah Clock Tower)",
        },
        { "@type": "Place", "name": "Jabal Omar Development" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://saudieventmanagement.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Locations",
          "item": "https://saudieventmanagement.com/locations",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Makkah Event Management",
          "item": "https://saudieventmanagement.com/locations/makkah",
        },
      ],
    },
  ],
};

const venues = [
  {
    name: "Hilton Makkah Convention Hotel",
    abbr: "Ajyad District",
    capacity: "Up to 3,500",
    district: "Ajyad District",
    type: "Conferences & MICE",
    description:
      "Makkah's largest dedicated conference facility with a purpose-built convention wing. The primary venue for Islamic economy summits, organizational conferences, and large corporate gatherings in the Western Region.",
  },
  {
    name: "Fairmont Makkah Clock Royal Tower",
    abbr: "Abraj Al-Bait Complex",
    capacity: "Up to 2,000",
    district: "Al-Masaa District",
    type: "Corporate Galas & Luxury Weddings",
    description:
      "Anchored within the iconic Abraj Al-Bait complex adjacent to Masjid Al-Haram. Makkah's benchmark luxury event venue for VIP corporate receptions, government delegations, and high-profile weddings.",
  },
  {
    name: "Raffles Makkah Palace",
    abbr: "Abraj Al-Bait Complex",
    capacity: "Up to 800",
    district: "Al-Masaa District",
    type: "Ultra-Luxury & VIP Events",
    description:
      "The ultra-luxury tier of the Abraj Al-Bait complex. Preferred by royal family-adjacent events, diplomatic delegations, and the highest-net-worth private celebrations in Makkah.",
  },
  {
    name: "Conrad Makkah",
    abbr: "Ajyad District",
    capacity: "Up to 1,200",
    district: "Ajyad District",
    type: "Corporate Conferences & Dinners",
    description:
      "A premium corporate event venue in the heart of Makkah's hotel district, offering flexible meeting facilities for mid-to-large corporate conferences, Ramadan corporate programs, and Islamic finance events.",
  },
  {
    name: "Swissotel Al Maqam Makkah",
    abbr: "Abraj Al-Bait Complex",
    capacity: "Up to 1,000",
    district: "Al-Masaa District",
    type: "Summits & Iftar Programs",
    description:
      "Located within the Abraj Al-Bait cluster with direct Masjid Al-Haram proximity. Frequently chosen for Islamic economy summits, OIC-adjacent organizational events, and Ramadan corporate Iftar programs.",
  },
  {
    name: "Hyatt Regency Makkah Jabal Omar",
    abbr: "Jabal Omar Development",
    capacity: "Up to 1,500",
    district: "Jabal Omar",
    type: "Luxury Weddings & Receptions",
    description:
      "Part of the expanding Jabal Omar luxury hotel cluster, offering Makkah's most contemporary ballroom settings for weddings, Walima receptions, and premium corporate events in a newer, less congested district.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Corporate Events & Conferences",
    text: "Islamic economy summits, OIC-adjacent organizational conferences, and corporate sessions at the Hilton Makkah Convention Hotel and RCMC-approved venues.",
    href: "/locations/makkah/corporate-event-management",
  },
  {
    icon: Star,
    title: "Luxury Weddings & Walima Events",
    text: "Bespoke Nikah, Walima, and Zafaf wedding planning at Fairmont, Raffles, and Hyatt Regency Jabal Omar with full Islamic protocol and gender compliance expertise.",
    href: "/locations/makkah/luxury-wedding-planning",
  },
  {
    icon: Users,
    title: "Haj Corporate Hospitality",
    text: "End-to-end VIP pilgrim delegation management for Islamic banks, OIC member states, and Muslim-majority MNCs — accommodation, transport, and Arafat day coordination.",
    href: "/locations/makkah/corporate-event-management",
  },
  {
    icon: MapPin,
    title: "Halal Exhibitions & Trade Shows",
    text: "Halal industry exhibitions, Islamic economy trade shows, and SECB-registered MICE events across Makkah's convention facilities.",
    href: "/locations/makkah/exhibition-management",
  },
  {
    icon: Calendar,
    title: "Ramadan Corporate Programs",
    text: "Corporate Iftar dinner programs, Ramadan tent events, and evening receptions designed for Makkah's unique Ramadan atmosphere and prayer time scheduling.",
    href: "/locations/makkah/corporate-event-management",
  },
  {
    icon: ShieldCheck,
    title: "Government & Ministerial Events",
    text: "Ministry of Haj and Umrah coordinated events, Muslim World League gatherings, and OIC delegation management with full RCMC compliance.",
    href: "/locations/makkah/corporate-event-management",
  },
];

const faqs = [
  {
    q: "What permits are required to host a corporate event in Makkah Al-Mukarramah?",
    a: "Corporate events in Makkah require a standard event permit from Amanah Makkah Al-Mukarramah (3–6 week lead time) and, for venues within 500 meters of Masjid Al-Haram, an additional RCMC overlay permit. All attendees, vendors, and staff must be Muslim with documented verification. Saudi Event Management manages the complete permitting process.",
  },
  {
    q: "What is the best conference venue in Makkah?",
    a: "The Hilton Makkah Convention Hotel in Ajyad District is Makkah's largest dedicated conference facility (up to 3,500 capacity). For Haram-proximate conferences, the Fairmont Makkah Clock Royal Tower and Swissotel Al Maqam — both within the Abraj Al-Bait complex — offer premium meeting suites with direct Grand Mosque views.",
  },
  {
    q: "Can non-Muslim staff or vendors work at events in Makkah?",
    a: "No. Makkah Al-Mukarramah is exclusively accessible to Muslims under Saudi Arabian law. All event staff, AV technicians, caterers, security personnel, and vendors must be Muslim with valid documentation. Saudi Event Management maintains a fully verified Muslim-only operational network in Makkah.",
  },
  {
    q: "What is Haj corporate hospitality and who provides it in Makkah?",
    a: "Haj corporate hospitality is the professional management of VIP pilgrim delegations during Haj season — covering accommodation at Abraj Al-Bait hotels, private transport, Arafat day coordination, and post-Haj corporate receptions. Saudi Event Management provides this service for Islamic banks, OIC delegations, and Muslim-majority multinational corporations.",
  },
  {
    q: "What is the peak event season in Makkah?",
    a: "Makkah's peak event periods are Ramadan (corporate Iftar dinners), Haj season in Dhul Hijjah (corporate delegation hospitality), and Eid Al-Fitr/Eid Al-Adha (private celebrations). October–February offers the best conditions for non-pilgrimage corporate events with cooler temperatures.",
  },
];

const eventCalendar = [
  {
    period: "Oct – Feb",
    season: "Peak Corporate Season",
    events: "Corporate conferences, Islamic economy summits, luxury weddings, outdoor events",
    demand: "High",
  },
  {
    period: "Ramadan (variable)",
    season: "Ramadan Iftar Season",
    events: "Corporate Iftar dinners, charity galas, evening receptions, Tarawih events",
    demand: "Very High",
  },
  {
    period: "Dhul Hijjah — Haj Season",
    season: "Haj Corporate Hospitality Peak",
    events: "VIP pilgrim delegation management, Arafat coordination, post-Haj receptions",
    demand: "Peak",
  },
  {
    period: "Eid Al-Fitr & Eid Al-Adha",
    season: "Eid Celebrations",
    events: "Luxury private celebrations, family gatherings, hotel gala packages",
    demand: "High",
  },
];

export default function MakkahPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Event Management in"
        titleHighlight="Makkah Al-Mukarramah"
        subtitle="Corporate conferences, halal exhibitions, luxury Islamic weddings, and Haj corporate hospitality — delivered across Makkah's finest venues by a fully Muslim-staffed team. Permitted by Amanah Makkah and RCMC."
        backgroundImage="/makkah_kaaba_heritage.webp"
        imageAlt="Masjid al-Haram and the Kaaba at sunset in Makkah Al-Mukarramah, Saudi Arabia"
        badge="Islam's Holiest City | Makkah Al-Mukarramah"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Makkah" },
        ]}
        minHeight="large"
      />

      {/* Compliance Notice — Critical Legal Signal */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-700 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-xs leading-relaxed">
            <strong>Access Compliance:</strong> Makkah Al-Mukarramah is
            accessible exclusively to Muslims under Saudi law enforced by the
            Royal Commission for Makkah City and Holy Sites (RCMC). All event
            attendees, vendors, staff, and contractors must be Muslim.{" "}
            <Link
              href="/locations/makkah/corporate-event-management"
              className="underline hover:text-amber-900"
            >
              Our Muslim-only vendor network ensures full compliance.
            </Link>
          </p>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
          >
            Consult Our Makkah Team
          </Link>
          <Link
            href="/portfolio"
            className="btn-outline hover:scale-105 transition-all rounded-sm"
          >
            Makkah Portfolio
          </Link>
        </div>
      </div>

      {/* Makkah at a Glance — Entity Density Strip */}
      <section className="py-10 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "Annual Visitors", val: "30M+" },
              { label: "Largest Venue", val: "3,500" },
              { label: "Haj Season", val: "Dhul Hijjah" },
              { label: "Permit Authority", val: "RCMC" },
              { label: "Hotel Cluster", val: "Abraj Al-Bait" },
              { label: "Access", val: "Muslims Only" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-display font-semibold text-white">
                  {item.val}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Makkah — Authority Section */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image
              src="/gallery_corporate_gala.webp"
              alt="Corporate gala event management in Makkah Al-Mukarramah Saudi Arabia"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
              <div className="glass p-6 rounded-sm">
                <p className="text-white text-sm font-display font-light">
                  &quot;Makkah is not just a location — it is the world&apos;s most
                  significant destination. Every event here carries spiritual
                  weight and demands extraordinary precision.&quot;
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">Why Makkah for Events</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">
              The World&apos;s Most{" "}
              <span className="text-[var(--primary)]">
                Distinctive Event City
              </span>
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4 mb-8">
              <p>
                Makkah Al-Mukarramah receives over{" "}
                <strong>30 million visitors annually</strong> — a built-in
                audience for corporate events that no other city on earth can
                match. The{" "}
                <strong>Abraj Al-Bait complex</strong> — housing Fairmont,
                Raffles, Swissotel, and Pullman — forms the world&apos;s most
                concentrated luxury venue cluster adjacent to a single
                landmark. The{" "}
                <strong>Hilton Makkah Convention Hotel</strong> in Ajyad
                District provides the Western Region&apos;s most capable
                dedicated MICE facility outside of Jeddah.
              </p>
              <p>
                For organizations in the Islamic economy — from{" "}
                <strong>Islamic Development Bank</strong> and{" "}
                <strong>OIC</strong> delegations to halal industry leaders and{" "}
                <strong>Muslim World League</strong> programs — Makkah is the
                only city that carries the full weight of Islamic authority and
                institutional credibility. Saudi Event Management is the only
                full-service event company in the Western Region maintaining a
                verified <strong>Muslim-only vendor and crew network</strong>{" "}
                that meets{" "}
                <strong>RCMC and Amanah Makkah</strong> legal requirements for
                every event format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Services in Makkah</span>
            <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
              Event Management Services{" "}
              <span className="text-[var(--primary)]">
                in Makkah Al-Mukarramah
              </span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
              From Haj corporate hospitality to Islamic economy conferences —
              our Makkah team operates with the cultural precision and legal
              compliance that this city demands.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group flex flex-col gap-3 p-6 bg-white border border-slate-200 rounded-sm shadow-sm hover:border-emerald-500 hover:-translate-y-1 transition-all"
              >
                <item.icon size={22} className="text-emerald-800" />
                <h3 className="font-display font-semibold text-slate-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">
                  {item.text}
                </p>
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Venue Network</span>
          <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
            Top Event Venues in{" "}
            <span className="text-[var(--primary)]">Makkah</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
            From the Hilton Makkah Convention Hotel to the Abraj Al-Bait luxury
            cluster — our Makkah venue partnerships cover every event scale with
            full RCMC compliance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue, i) => (
            <div
              key={i}
              className="flex flex-col p-6 bg-white border border-slate-200 rounded-sm shadow-sm hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-slate-900 text-sm leading-snug">
                    {venue.name}
                  </h3>
                  <span className="text-xs text-slate-400">{venue.abbr}</span>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-sm font-medium whitespace-nowrap ml-2">
                  {venue.capacity}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin size={11} className="text-slate-400" />
                <span className="text-xs text-slate-400">{venue.district}</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed flex-1">
                {venue.description}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                  {venue.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-24 bg-slate-50/50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Events Delivered in Makkah", val: "60+" },
              { label: "Venue Partnerships", val: "15+" },
              { label: "Muslim-Verified Vendors", val: "100%" },
              { label: "RCMC Compliance Rate", val: "100%" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">
                  {stat.val}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Planning Your Event</span>
          <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
            Makkah Event{" "}
            <span className="text-[var(--primary)]">Season Calendar</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
            Makkah&apos;s event calendar is governed by the Islamic lunar
            calendar. Venue availability during Haj season and Ramadan requires
            planning 6–12 months in advance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventCalendar.map((row, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 bg-white border border-slate-200 rounded-sm shadow-sm hover:border-emerald-300 transition-all"
            >
              <Calendar size={20} className="text-emerald-800 mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-display font-semibold text-slate-900 text-sm">
                    {row.period}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      row.demand === "Peak"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : row.demand === "Very High"
                          ? "bg-orange-50 text-orange-700 border border-orange-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {row.demand} Demand
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 mb-1">
                  {row.season}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {row.events}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Deep-Dive Section */}
      <section className="py-24 bg-amber-50/40 border-y border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Makkah Event Compliance</span>
            <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
              Operating in Makkah —{" "}
              <span className="text-[var(--primary)]">
                Legal Requirements & Protocols
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Muslim-Only Access",
                body: "All attendees, vendors, staff, and contractors must be Muslim. Saudi Event Management maintains RCMC-compliant documentation for every crew member and supplier in our Makkah network.",
              },
              {
                icon: Calendar,
                title: "Prayer Time Scheduling",
                body: "All Makkah events must incorporate the five daily prayer breaks (Salah). Our event timelines are built around the Haram prayer schedule, including Azan broadcast overlap management for AV productions.",
              },
              {
                icon: ShieldCheck,
                title: "Dual-Authority Permits",
                body: "Events require Amanah Makkah municipal permits (3–6 weeks) plus an RCMC overlay permit for any venue within 500m of Masjid Al-Haram. We manage both permit tracks simultaneously.",
              },
              {
                icon: Users,
                title: "Gender Protocol Options",
                body: "Traditional Saudi events maintain male/female separation. We manage both gender-segregated and mixed-setting events in Makkah, with the latter requiring advance governmental approval under Vision 2030 guidelines.",
              },
              {
                icon: ShieldCheck,
                title: "Dress Code Enforcement",
                body: "Islamic modesty standards (Hijab and appropriate attire) are mandatory for all event participants in Makkah. Our event coordinators brief all attendees and enforce compliance on-site.",
              },
              {
                icon: Building2,
                title: "Haram-Zone Restrictions",
                body: "Venues within 500m of Masjid Al-Haram require RCMC overlay permits with additional security vetting. We navigate the Haram-zone permit process as a standard service for all Abraj Al-Bait venue bookings.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-amber-200 rounded-sm shadow-sm"
              >
                <item.icon size={20} className="text-amber-700 mb-3" />
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Citation Block */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            Makkah Event Management Authority
          </span>
          <h2 className="font-display font-medium text-white text-2xl md:text-3xl mt-4 mb-12">
            Why Organizations Choose{" "}
            <span className="text-emerald-400">Saudi Event Management</span> in
            Makkah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "The Only Full-Service Muslim-Only Event Network",
                body: "We maintain Makkah's only fully verified Muslim-staffed event crew — AV technicians, caterers, security, décor, and photographers — all RCMC-compliant. No other agency offers this at full-service scale.",
              },
              {
                title: "Haj Corporate Hospitality Specialists",
                body: "We are one of the few event management companies in Saudi Arabia that specializes in VIP pilgrim delegation logistics for Islamic banks, OIC member states, and Muslim-majority MNCs during Haj season.",
              },
              {
                title: "Dual-Authority Permit Experts",
                body: "We simultaneously manage Amanah Makkah municipal permits and RCMC Haram-zone overlay permits — the two-tier system that blocks most international event organizers from operating in Makkah.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 bg-slate-900 border border-slate-800 rounded-sm"
              >
                <h3 className="font-display font-semibold text-white text-sm mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Common Questions</span>
          <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
            Event Management in Makkah —{" "}
            <span className="text-[var(--primary)]">FAQ</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-sm overflow-hidden"
            >
              <div className="p-6">
                <h3 className="font-display font-semibold text-slate-900 text-sm mb-3">
                  {faq.q}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entity Architecture & SEO Block */}
      <section className="py-20 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Event Management in Makkah Al-Mukarramah, Saudi Arabia
            </h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p>
                <strong>Saudi Event Management</strong> is a full-service event
                management company operating in{" "}
                <strong>Makkah Al-Mukarramah</strong> — Islam&apos;s holiest
                city and one of the world&apos;s most visited destinations. Our
                Makkah operations span corporate conferences at the{" "}
                <strong>Hilton Makkah Convention Hotel</strong>, luxury weddings
                at{" "}
                <strong>Fairmont Makkah Clock Royal Tower</strong> and{" "}
                <strong>Raffles Makkah Palace</strong>, and Haj corporate
                hospitality for institutional delegations.
              </p>
              <p>
                All operations are conducted by a{" "}
                <strong>verified Muslim-only team</strong> in compliance with{" "}
                <strong>RCMC (Royal Commission for Makkah City)</strong> and{" "}
                <strong>Amanah Makkah</strong> regulations. We serve{" "}
                <strong>Islamic Development Bank</strong> partner events,{" "}
                <strong>Muslim World League</strong> gatherings,{" "}
                <strong>OIC</strong> delegations, and corporate organizations
                managing Muslim pilgrim groups during{" "}
                <strong>Haj</strong> and{" "}
                <strong>Umrah seasons</strong>. Makkah&apos;s unique position
                as the global centre of Islamic economy and religious tourism
                aligns directly with Saudi{" "}
                <strong>Vision 2030</strong>&apos;s religious tourism growth
                target of SAR 150 billion.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                All Services Available in Makkah:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Corporate Events", slug: "corporate-event-management" },
                  { name: "Luxury Weddings", slug: "luxury-wedding-planning" },
                  { name: "Halal Exhibitions", slug: "exhibition-management" },
                  { name: "Haj Hospitality", slug: "corporate-event-management" },
                  { name: "Ramadan Programs", slug: "corporate-event-management" },
                  { name: "Government Events", slug: "corporate-event-management" },
                ].map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/locations/makkah/${svc.slug}`}
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
                  { name: "Jeddah", href: "/locations/jeddah" },
                  { name: "Riyadh", href: "/locations/riyadh" },
                  { name: "Dammam", href: "/locations/dammam" },
                  { name: "AlUla", href: "/locations/alula" },
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
