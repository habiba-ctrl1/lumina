import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationCTA from "@/components/LocationCTA";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Waves,
  Anchor,
  Users,
  Calendar,
  Star,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/locations/dammam`;
  return {
    title: "Event Management Company in Dammam & Eastern Province",
    description:
      "Your event management company in Dammam and the Eastern Province. Corporate conferences at DCEC & Sheraton Dammam, energy sector events near Saudi Aramco Dhahran, weddings at Kempinski Al Khobar & Half Moon Bay, and cross-border Dammam–Bahrain event management.",
    keywords:
      "event management company in Dammam, event planner in Dammam, corporate event organizer in Dammam, wedding planner in Dammam, conference organizer Al-Khobar, Saudi Aramco event management Dhahran, Half Moon Bay events, DCEC Dammam Convention Center, تنظيم فعاليات الدمام",
    alternates: {
      canonical: path,
      languages: {
        "en-US": `${base}/locations/dammam`,
        "ar-SA": `${base}/ar/locations/dammam`,
      },
    },
    openGraph: {
      title: "Event Management Company in Dammam & Eastern Province | Saudi Event Management",
      description:
        "Eastern Province's premier event company — energy sector conferences, corporate events near Saudi Aramco, Gulf waterfront weddings and cross-border Dammam–Bahrain MICE.",
      url: path,
      siteName: "Saudi Event Management",
      images: [
        {
          url: "https://saudieventmanagement.com/dammam-coast-og.webp",
          width: 1200,
          height: 630,
          alt: "Corporate event management in Dammam, Eastern Province, Saudi Arabia",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Management in Dammam & Eastern Province | Saudi Event Management",
      description:
        "Energy sector conferences, corporate events, Gulf waterfront weddings & cross-border Bahrain MICE in Dammam.",
      images: ["https://saudieventmanagement.com/dammam-coast-og.webp"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EventPlanner"],
      "@id": "https://saudieventmanagement.com/locations/dammam#business",
      "name": "Saudi Event Management — Dammam & Eastern Province",
      "url": "https://saudieventmanagement.com/locations/dammam",
      "description":
        "Saudi Event Management is the Eastern Province's premier event management company, specializing in corporate conferences at the Dammam Convention & Exhibition Center (DCEC), energy sector events near Saudi Aramco Dhahran, luxury weddings at Kempinski Al Othman Hotel and Half Moon Bay, and cross-border event management via the King Fahd Causeway corridor.",
      "image": "https://saudieventmanagement.com/dammam-coast.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dammam",
        "addressRegion": "Eastern Province",
        "addressCountry": "SA",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.4207",
        "longitude": "50.0888",
      },
      "areaServed": [
        { "@type": "City", "name": "Dammam" },
        { "@type": "City", "name": "Al-Khobar" },
        { "@type": "City", "name": "Dhahran" },
        { "@type": "City", "name": "Jubail" },
        { "@type": "AdministrativeArea", "name": "Eastern Province" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dammam & Eastern Province Event Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Event Management Dammam",
              "url": "https://saudieventmanagement.com/locations/dammam/corporate-event-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Oil & Gas Sector Conference Management Eastern Province",
              "url": "https://saudieventmanagement.com/locations/dammam/corporate-event-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Exhibition Management Dammam DCEC",
              "url": "https://saudieventmanagement.com/locations/dammam/exhibition-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Wedding Planning Dammam Al-Khobar",
              "url": "https://saudieventmanagement.com/locations/dammam/luxury-wedding-planning",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Half Moon Bay Outdoor Event Management",
              "url": "https://saudieventmanagement.com/locations/dammam/luxury-wedding-planning",
            },
          },
        ],
      },
      "telephone": "+966501234567",
      "knowsAbout": [
        "Dammam Convention & Exhibition Center (DCEC)",
        "Sheraton Dammam Hotel & Convention Centre",
        "Kempinski Al Othman Hotel Al Khobar",
        "InterContinental Al Khobar",
        "Half Moon Bay Resort",
        "Saudi Aramco Dhahran corporate events",
        "SABIC corporate events Eastern Province",
        "King Fahd University of Petroleum & Minerals (KFUPM) conferences",
        "King Fahd Causeway cross-border event management",
        "Al-Khobar Corniche waterfront events",
        "Jubail Industrial City events",
        "Eastern Province Chamber of Commerce",
        "Oil and gas sector conferences Saudi Arabia",
        "Al-Ahsa UNESCO heritage events",
      ],
      "sameAs": ["https://www.wikidata.org/wiki/Q193912"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best conference venue in Dammam for a large corporate event?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Sheraton Dammam Hotel & Convention Centre is Dammam's largest dedicated convention facility (up to 2,000 attendees), followed by the Dammam Convention & Exhibition Center (DCEC) for exhibitions up to 5,000. For executive-level corporate conferences in Al-Khobar, the Kempinski Al Othman Hotel (1,500 capacity) and InterContinental Al Khobar are the premier choices.",
          },
        },
        {
          "@type": "Question",
          "name": "Which event management companies in Dammam specialize in oil and gas sector corporate events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is the Eastern Province's specialist for energy sector corporate events, with expertise in Saudi Aramco supplier and partner events in Dhahran, SABIC corporate programs, oil and gas conference management at DCEC and Sheraton Dammam, and KFUPM academic conference coordination.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you manage a cross-border event across Dammam and Bahrain?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Saudi Event Management manages cross-border corporate events via the King Fahd Causeway corridor, coordinating venues in Dammam and Al-Khobar with the Bahrain International Exhibition & Convention Centre (BIECC) and Gulf Hotel Bahrain. This capability serves Gulf-wide regional conferences and multinational corporate events.",
          },
        },
        {
          "@type": "Question",
          "name": "What outdoor event venues are available in Dammam and Al-Khobar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Eastern Province's premier outdoor venues are Half Moon Bay Resort (40km south of Dammam) for beach weddings and corporate retreats, the Al-Khobar Corniche waterfront for Gulf-view events and brand activations, and the Dammam Corniche along King Fahd Road. October to March is the optimal season for all outdoor events due to the Gulf climate.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the peak season for events in Dammam and the Eastern Province?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Eastern Province's peak event season is October to March when the Arabian Gulf climate is ideal for outdoor and waterfront events. Ramadan (variable) is high-demand for corporate Iftar programs. Q1 aligns with Saudi Aramco's annual conference and partner event cycle, making January to March the busiest period for energy sector corporate events.",
          },
        },
      ],
    },
    {
      "@type": "Place",
      "@id": "https://saudieventmanagement.com/locations/dammam#place",
      "name": "Dammam",
      "alternateName": "Al-Dammam",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.4207",
        "longitude": "50.0888",
      },
      "sameAs": "https://en.wikipedia.org/wiki/Dammam",
      "containsPlace": [
        { "@type": "CivicStructure", "name": "Dammam Convention & Exhibition Center (DCEC)" },
        { "@type": "LodgingBusiness", "name": "Kempinski Al Othman Hotel Al Khobar" },
        { "@type": "LodgingBusiness", "name": "Sheraton Dammam Hotel & Convention Centre" },
        { "@type": "LodgingBusiness", "name": "InterContinental Al Khobar" },
        { "@type": "LodgingBusiness", "name": "Le Méridien Al Khobar" },
        { "@type": "Resort", "name": "Half Moon Bay Resort" },
        { "@type": "CorporateHeadquarters", "name": "Saudi Aramco Headquarters, Dhahran" },
        { "@type": "EducationalOrganization", "name": "King Fahd University of Petroleum & Minerals (KFUPM)" },
        { "@type": "LandmarksOrHistoricalBuildings", "name": "King Fahd Causeway" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "Dammam Event Management", "item": "https://saudieventmanagement.com/locations/dammam" },
      ],
    },
  ],
};

const venues = [
  {
    name: "Dammam Convention & Exhibition Center",
    abbr: "DCEC",
    capacity: "Up to 5,000",
    district: "Northern Dammam",
    type: "Exhibitions & Large Conferences",
    description:
      "The Eastern Province's primary MICE facility and the anchor venue for industrial exhibitions, energy sector conferences, and government-organized trade shows. The SECB-registered hub for all large-scale Eastern Province events.",
  },
  {
    name: "Sheraton Dammam Hotel & Convention Centre",
    abbr: "Convention Centre",
    capacity: "Up to 2,000",
    district: "Dammam City Centre",
    type: "Corporate Conferences & Galas",
    description:
      "Dammam's largest hotel-based convention facility offering dedicated convention wings, flexible breakout rooms, and full AV infrastructure. The default choice for mid-to-large corporate conferences and energy sector award ceremonies.",
  },
  {
    name: "Kempinski Al Othman Hotel Al Khobar",
    abbr: "Al Khobar",
    capacity: "Up to 1,500",
    district: "Al Khobar",
    type: "Luxury Weddings & Executive Events",
    description:
      "The Eastern Province's benchmark luxury event venue. Preferred for high-net-worth weddings, executive corporate dinners, VIP receptions, and events serving the Aramco executive and diplomatic community in Al-Khobar.",
  },
  {
    name: "InterContinental Al Khobar",
    abbr: "Al Khobar Corniche",
    capacity: "Up to 1,200",
    district: "Al Khobar Corniche",
    type: "Corporate MICE & Waterfront Events",
    description:
      "Waterfront corporate event venue on the Al-Khobar Corniche offering Gulf views for premium conferences, oil and gas sector networking events, and luxury wedding receptions with Arabian Gulf backdrops.",
  },
  {
    name: "Le Méridien Al Khobar",
    abbr: "King Fahd Road",
    capacity: "Up to 1,000",
    district: "Al Khobar",
    type: "Corporate Events & Aramco Partner Days",
    description:
      "Strategically located minutes from Saudi Aramco's Dhahran campus. Frequently chosen for Aramco supplier qualification days, SABIC partner events, and regional energy sector corporate gatherings.",
  },
  {
    name: "Half Moon Bay Resort",
    abbr: "40km south of Dammam",
    capacity: "Custom outdoor",
    district: "Half Moon Bay, Al Khobar",
    type: "Beach Weddings & Corporate Retreats",
    description:
      "The Eastern Province's premier outdoor beach venue. Offers pristine Arabian Gulf shoreline for luxury beach weddings, corporate retreat programming, and exclusive outdoor events October through March.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Energy Sector Corporate Events",
    text: "Saudi Aramco supplier days, SABIC partner events, oil & gas conferences, and energy transition summits at DCEC, Sheraton Dammam, and Dhahran Exhibition Center.",
    href: "/locations/dammam/corporate-event-management",
  },
  {
    icon: Users,
    title: "Exhibitions & Trade Shows",
    text: "Full exhibition management at DCEC — stand design, logistics, bilingual floor operations for industrial expos, petrochemical trade shows, and SECB-registered events.",
    href: "/locations/dammam/exhibition-management",
  },
  {
    icon: Star,
    title: "Luxury Weddings & Celebrations",
    text: "Bespoke Gulf waterfront weddings at Kempinski Al Othman, InterContinental Al Khobar, and Half Moon Bay Resort with full Eastern Province cultural expertise.",
    href: "/locations/dammam/luxury-wedding-planning",
  },
  {
    icon: Waves,
    title: "Outdoor & Coastal Events",
    text: "Half Moon Bay beach events, Al-Khobar Corniche activations, and Dammam waterfront outdoor productions — optimal October to March.",
    href: "/locations/dammam/luxury-wedding-planning",
  },
  {
    icon: Anchor,
    title: "Cross-Border Dammam–Bahrain Events",
    text: "Multi-destination corporate events coordinated across the King Fahd Causeway corridor, spanning Dammam venues and the Bahrain International Exhibition & Convention Centre (BIECC).",
    href: "/locations/dammam/corporate-event-management",
  },
  {
    icon: MapPin,
    title: "KFUPM & Academic Conferences",
    text: "Academic conference management at King Fahd University of Petroleum & Minerals — technology summits, energy research conferences, and institutional events in Dhahran.",
    href: "/locations/dammam/corporate-event-management",
  },
];

const faqs = [
  {
    q: "What is the best conference venue in Dammam for a large corporate event?",
    a: "The Sheraton Dammam Hotel & Convention Centre is Dammam's largest dedicated convention facility (up to 2,000 attendees), followed by DCEC for exhibitions up to 5,000. For executive-level Al-Khobar conferences, Kempinski Al Othman Hotel (1,500 capacity) and InterContinental Al Khobar are the premier choices, both offering Aramco-adjacent access and Gulf views.",
  },
  {
    q: "Which event management company in Dammam specializes in oil and gas sector events?",
    a: "Saudi Event Management is the Eastern Province's specialist for energy sector corporate events, with expertise in Saudi Aramco supplier and partner events in Dhahran, SABIC corporate programs, oil & gas conference management at DCEC and Sheraton Dammam, and KFUPM academic conference coordination.",
  },
  {
    q: "Can you manage a cross-border event across Dammam and Bahrain?",
    a: "Yes. Saudi Event Management manages cross-border corporate events via the King Fahd Causeway corridor, coordinating venues in Dammam and Al-Khobar with the Bahrain International Exhibition & Convention Centre (BIECC). This serves Gulf-wide regional conferences, multinational roadshows, and multi-day corporate events that draw attendees from both countries.",
  },
  {
    q: "What outdoor event venues are available in Dammam and Al-Khobar?",
    a: "The top outdoor venues are Half Moon Bay Resort (40km south of Dammam) for beach weddings and corporate retreats, the Al-Khobar Corniche for Gulf-view waterfront events, and the Dammam Corniche along King Fahd Road. October to March is the optimal season for all outdoor and coastal events.",
  },
  {
    q: "What is the peak event season in Dammam and the Eastern Province?",
    a: "Peak corporate event season is October to March when the Arabian Gulf climate is ideal. Q1 (January–March) aligns with Saudi Aramco's annual conference and partner event cycle, making it the busiest period for energy sector events. Ramadan is high-demand for corporate Iftar programs, and the Eastern Province Season drives summer brand activations.",
  },
];

const eventCalendar = [
  {
    period: "Oct – Mar",
    season: "Peak Outdoor & Corporate Season",
    events: "Coastal weddings, outdoor events, energy sector conferences, Aramco partner days",
    demand: "Peak",
  },
  {
    period: "Jan – Mar",
    season: "Aramco & Energy Conference Cycle",
    events: "Saudi Aramco supplier days, SABIC forums, oil & gas conferences, KFUPM summits",
    demand: "Very High",
  },
  {
    period: "Ramadan (variable)",
    season: "Corporate Iftar Season",
    events: "Corporate Iftar programs at Kempinski, Sheraton, InterContinental Al Khobar",
    demand: "High",
  },
  {
    period: "Sep – Dec",
    season: "National Day & Eastern Province Season",
    events: "Saudi National Day events, Dammam Corniche activations, Eastern Province Season",
    demand: "High",
  },
];

export default function DammamPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Event Management Company in "
        titleHighlight="Dammam"
        subtitle="Elite corporate events and coastal celebrations — from Saudi Aramco-tier energy conferences in Dhahran to Gulf waterfront weddings at Kempinski Al Khobar and Half Moon Bay. Your event planner across the Eastern Province."
        backgroundImage="/dammam-coast.webp"
        imageAlt="Dammam waterfront cityscape — event management company in Dammam, Eastern Province Saudi Arabia"
        badge="Saudi Arabia's Energy Capital | Eastern Province"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Dammam" },
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
            Explore Our Work
          </Link>
        </div>
      </div>

      {/* At a Glance Strip */}
      <section className="py-12 bg-[var(--surface-raised)] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "Metro Population", val: "4.9M+" },
              { label: "DCEC Capacity", val: "5,000" },
              { label: "Peak Season", val: "Oct–Mar" },
              { label: "Anchor Entity", val: "Saudi Aramco" },
              { label: "Bahrain Distance", val: "30km" },
              { label: "Gulf Venues", val: "25+" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-display font-semibold text-neutral-900">{item.val}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dammam Section */}
      <section className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200/80 shadow-md">
            <Image
              src="/luxury_lifestyle_event_saudi.webp"
              alt="Elegant luxury event on the Arabian Gulf coast — premium event management in Dammam & Al-Khobar, Eastern Province"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
              <div className="glass p-6 rounded-2xl">
                <p className="text-white text-sm font-display font-light">
                  &quot;Where the world&apos;s energy capital meets Arabian Gulf elegance — the Eastern Province demands a different standard of event management.&quot;
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">Why Dammam & Eastern Province</span>
            <h2 className="font-display font-semibold text-neutral-900 mb-8 text-2xl md:text-3xl">
              Saudi Arabia&apos;s{" "}
              <span className="text-[var(--primary)]">Energy Event Capital</span>
            </h2>
            <div className="prose prose-slate max-w-none text-neutral-600 text-sm leading-relaxed space-y-4 mb-8">
              <p>
                The Eastern Province is home to{" "}
                <strong>Saudi Aramco</strong> — the world&apos;s most
                profitable company — headquartered in{" "}
                <strong>Dhahran</strong>, 15km from Dammam city centre. This
                single fact drives an event calendar unlike any other Saudi
                city: supplier qualification days, energy transition summits,
                investor briefings, SABIC partner conferences, and{" "}
                <strong>KFUPM</strong> academic events operate year-round at{" "}
                <strong>DCEC</strong>, the{" "}
                <strong>Sheraton Dammam Convention Centre</strong>, and the
                Dhahran Exhibition Center.
              </p>
              <p>
                Beyond energy, Dammam and{" "}
                <strong>Al-Khobar</strong> offer the Gulf coast&apos;s finest
                luxury event venues — from the{" "}
                <strong>Kempinski Al Othman Hotel</strong>&apos;s ballrooms to
                bespoke beach weddings at{" "}
                <strong>Half Moon Bay</strong>. And the{" "}
                <strong>King Fahd Causeway</strong> creates a unique
                cross-border event corridor with Bahrain&apos;s{" "}
                <strong>BIECC</strong> that no other Saudi city can replicate.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Saudi Aramco supplier & partner event expertise (Dhahran)",
                "DCEC and Sheraton Dammam preferred event partner",
                "King Fahd Causeway cross-border Dammam–Bahrain management",
                "Half Moon Bay & Al-Khobar Corniche outdoor event specialists",
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
            <span className="section-label">Services in Dammam</span>
            <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
              Event Management Services in{" "}
              <span className="text-[var(--primary)]">Dammam & Al-Khobar</span>
            </h2>
            <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
              From Aramco-tier energy conferences to Gulf waterfront weddings and
              cross-border Bahrain MICE — the full Eastern Province event spectrum.
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

      <LocationCTA city="Dammam" />

      {/* Venues Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Venue Network</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            Top Event Venues in{" "}
            <span className="text-[var(--primary)]">Dammam & Al-Khobar</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
            From DCEC exhibitions to Half Moon Bay beach weddings — our Eastern
            Province venue network spans every event category and scale.
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
                <span className="text-xs bg-emerald-50 text-[var(--primary)] border border-emerald-200 px-2.5 py-1 rounded-md font-medium whitespace-nowrap ml-2">
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
              { label: "Events Delivered", val: "130+" },
              { label: "Venue Partnerships", val: "25+" },
              { label: "Eastern Province Specialists", val: "10" },
              { label: "Cross-Border Events", val: "Dammam + Bahrain" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-medium text-neutral-900 mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Planning Your Event</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            Eastern Province{" "}
            <span className="text-[var(--primary)]">Event Calendar</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-4 max-w-2xl mx-auto">
            Dammam&apos;s corporate event calendar is anchored by the Aramco
            conference cycle in Q1. Outdoor and coastal venues book 4–6 months
            ahead during the October–March peak season.
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
      </section>

      {/* Cross-Border Moat Section */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-label">Unique Capability</span>
              <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4 mb-6">
                The Dammam–Bahrain{" "}
                <span className="text-[var(--primary)]">Event Corridor</span>
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                The <strong>King Fahd Causeway</strong> connects Dammam to
                Bahrain in 30 minutes — creating the Gulf&apos;s only land-based
                cross-border event corridor. Saudi Event Management is the only
                event company in the region that manages multi-destination
                corporate events spanning both sides of the causeway,
                coordinating with the{" "}
                <strong>
                  Bahrain International Exhibition &amp; Convention Centre
                  (BIECC)
                </strong>{" "}
                and Gulf Hotel Bahrain for seamless Gulf-wide events.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-venue events: Dammam + Al-Khobar + Manama in one program",
                  "Dual-country delegate management (Saudi & Bahraini participants)",
                  "BIECC coordination for overflow exhibition capacity",
                  "Bahrain airport access for international delegates",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { city: "Dammam", venues: "DCEC, Sheraton, Radisson Blu" },
                { city: "Al-Khobar", venues: "Kempinski, InterContinental, Le Méridien" },
                { city: "Dhahran", venues: "Aramco Exhibition Center, KFUPM, Le Méridien" },
                { city: "Bahrain (via Causeway)", venues: "BIECC, Gulf Hotel, Ritz-Carlton Bahrain" },
              ].map((node, i) => (
                <div key={i} className="p-4 bg-white border border-neutral-200/80 rounded-2xl shadow-sm">
                  <p className="font-display font-semibold text-neutral-900 text-xs mb-2">{node.city}</p>
                  <p className="text-neutral-500 text-xs leading-relaxed">{node.venues}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GEO Citation Block */}
      <section className="py-20 md:py-28 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
            Eastern Province Event Authority
          </span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4 mb-12">
            Why the Energy Sector Chooses{" "}
            <span className="text-[var(--primary)]">Saudi Event Management</span> in
            Dammam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Saudi Aramco Ecosystem Expertise",
                body: "Deep operational knowledge of Aramco's supplier protocols, security clearance requirements, and the Dhahran campus event infrastructure. We manage events within and adjacent to the world's most valuable corporate campus.",
              },
              {
                title: "Only Cross-Border Gulf Event Manager",
                body: "Saudi Event Management is the only event company in the region actively managing cross-border events via the King Fahd Causeway corridor, combining Saudi and Bahraini venue capacity for Gulf-wide corporate programs.",
              },
              {
                title: "Full Eastern Province Coverage",
                body: "Dammam, Al-Khobar, Dhahran, Jubail Industrial City, Al-Ahsa UNESCO district, and Half Moon Bay — our Eastern Province network is the most comprehensive of any event management company in the region.",
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
            Event Management in Dammam —{" "}
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
              Event Management in Dammam & the Eastern Province, Saudi Arabia
            </h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p>
                <strong>Saudi Event Management</strong> is the Eastern
                Province&apos;s premier full-service event management company,
                operating across <strong>Dammam</strong>,{" "}
                <strong>Al-Khobar</strong>, and{" "}
                <strong>Dhahran</strong> — the tri-city metro anchored by{" "}
                <strong>Saudi Aramco</strong>&apos;s global headquarters. Our
                Eastern Province operations cover corporate conferences at the{" "}
                <strong>Dammam Convention &amp; Exhibition Center (DCEC)</strong>
                , energy sector events near the{" "}
                <strong>Dhahran Exhibition Center</strong>, executive events at{" "}
                <strong>Kempinski Al Othman Hotel</strong> and{" "}
                <strong>InterContinental Al Khobar</strong>, and outdoor beach
                events at <strong>Half Moon Bay</strong>.
              </p>
              <p>
                As the only Saudi event management company actively managing
                cross-border programs via the{" "}
                <strong>King Fahd Causeway</strong>, we extend our Eastern
                Province capability into Bahrain&apos;s{" "}
                <strong>BIECC</strong> for Gulf-wide corporate events. We serve{" "}
                <strong>Saudi Aramco</strong> ecosystem clients,{" "}
                <strong>SABIC</strong> regional partners,{" "}
                <strong>KFUPM</strong> institutional events, and{" "}
                <strong>Royal Commission for Jubail &amp; Yanbu</strong>{" "}
                industrial exhibitions — the most specialized B2B event portfolio
                in Saudi Arabia.
              </p>
              <p>
                Need a corporate event organizer in Dammam or a wedding planner
                for a Gulf-coast celebration?{" "}
                <Link href="/contact" className="text-[var(--primary)] underline underline-offset-4 font-medium">Contact our Eastern Province team</Link>{" "}
                or{" "}
                <Link href="/consultation" className="text-[var(--primary)] underline underline-offset-4 font-medium">book a free consultation</Link>.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                All Services Available in Dammam:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Corporate & Energy Sector Events in Dammam", slug: "corporate-event-management" },
                  { name: "Exhibition Management in Dammam", slug: "exhibition-management" },
                  { name: "Wedding Planner in Dammam", slug: "luxury-wedding-planning" },
                  { name: "Conference Organizer in Dammam", slug: "conference-planning" },
                  { name: "VIP Event Planning in Dammam", slug: "vip-event-planning" },
                ].map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/locations/dammam/${svc.slug}`}
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
                  { name: "Makkah", href: "/locations/makkah" },
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

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Explore Service Pages:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Corporate Event Management", href: "/services/corporate-events" },
                  { name: "Conference Management", href: "/services/conferences" },
                  { name: "Exhibition Management", href: "/services/exhibitions" },
                  { name: "Luxury Wedding Planning", href: "/services/weddings" },
                  { name: "Luxury & VIP Events", href: "/services/luxury-vip-events" },
                  { name: "Event Production", href: "/services/event-production" },
                ].map((svc) => (
                  <Link
                    key={svc.href}
                    href={svc.href}
                    className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded text-xs font-semibold text-neutral-700 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-white transition-colors flex items-center justify-between group"
                  >
                    {svc.name}
                    <ChevronRight size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />
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
