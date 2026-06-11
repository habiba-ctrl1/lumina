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
  Trophy,
  Users,
  Calendar,
  Star,
  CheckCircle2,
  ChevronRight,
  User,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/locations/riyadh`;
  return {
    title: "Event Management Company in Riyadh | Saudi Event Management",
    description:
      "Saudi Event Management is Riyadh's premier event planning company. Corporate conferences at RICEC, KAICC & KAFD, luxury weddings at Four Seasons & Ritz-Carlton, brand activations during Riyadh Season. Vision 2030-aligned. GEA & SECB permitted.",
    keywords:
      "event management company Riyadh, corporate event organizer Riyadh, conference management Riyadh RICEC, luxury wedding planner Riyadh, KAFD events, KAICC conference, Riyadh Season brand activation, Vision 2030 events, تنظيم فعاليات الرياض",
    alternates: {
      canonical: path,
      languages: {
        "en-US": `${base}/locations/riyadh`,
        "ar-SA": `${base}/ar/locations/riyadh`,
      },
    },
    openGraph: {
      title: "Event Management Company in Riyadh | Saudi Event Management",
      description:
        "Riyadh's premier event management company — corporate conferences, government summits, exhibitions at RICEC, and luxury weddings at Four Seasons & Ritz-Carlton.",
      url: path,
      siteName: "Saudi Event Management",
      images: [
        {
          url: "https://saudieventmanagement.com/riyadh_summit_people.webp",
          width: 1200,
          height: 630,
          alt: "Corporate event management in Riyadh Saudi Arabia",
        },
      ],
      locale: "en_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Management Company in Riyadh | Saudi Event Management",
      description:
        "Riyadh's premier event management company for corporate conferences, exhibitions, luxury weddings & Vision 2030 brand activations.",
      images: ["https://saudieventmanagement.com/riyadh_summit_people.webp"],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EventPlanner"],
      "@id":
        "https://saudieventmanagement.com/locations/riyadh#business",
      "name": "Saudi Event Management — Riyadh",
      "url": "https://saudieventmanagement.com/locations/riyadh",
      "description":
        "Saudi Event Management is Riyadh's premier event planning company, specializing in corporate conferences, government summits, exhibitions at RICEC, luxury weddings at Four Seasons and Ritz-Carlton, and Vision 2030-aligned brand activations across KAFD, Diriyah, and the Diplomatic Quarter.",
      "image":
        "https://saudieventmanagement.com/riyadh_summit_people.webp",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh Province",
        "addressCountry": "SA",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "24.7136",
        "longitude": "46.6753",
      },
      "areaServed": [
        { "@type": "City", "name": "Riyadh" },
        { "@type": "AdministrativeArea", "name": "Riyadh Province" },
        { "@type": "Place", "name": "King Abdullah Financial District (KAFD)" },
        { "@type": "Place", "name": "Diplomatic Quarter" },
        { "@type": "Place", "name": "Diriyah" },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Riyadh Event Management Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Event Management Riyadh",
              "url": "https://saudieventmanagement.com/locations/riyadh/corporate-event-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Exhibition Management Riyadh RICEC",
              "url": "https://saudieventmanagement.com/locations/riyadh/exhibition-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Wedding Planning Riyadh",
              "url": "https://saudieventmanagement.com/locations/riyadh/luxury-wedding-planning",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Government & Vision 2030 Event Management Riyadh",
              "url": "https://saudieventmanagement.com/locations/riyadh/corporate-event-management",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Activation Riyadh Season",
              "url": "https://saudieventmanagement.com/locations/riyadh/brand-activation",
            },
          },
        ],
      },
      "telephone": "+966501234567",
      "knowsAbout": [
        "Riyadh International Convention & Exhibition Center (RICEC)",
        "King Abdulaziz International Conference Center (KAICC)",
        "KAFD Conference Centre",
        "Future Investment Initiative (FII)",
        "LEAP Technology Conference",
        "World Defense Show",
        "Riyadh Season",
        "Ritz-Carlton Riyadh",
        "Four Seasons Hotel Riyadh at Kingdom Centre",
        "Waldorf Astoria Riyadh",
        "Diriyah Gate Development Authority",
        "General Entertainment Authority (GEA)",
        "Saudi Exhibitions & Conventions Bureau (SECB)",
        "Vision 2030 corporate events",
        "Public Investment Fund (PIF) events",
      ],
      "sameAs": ["https://www.wikidata.org/wiki/Q3692"],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the largest event venue in Riyadh for exhibitions and trade shows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Riyadh International Convention & Exhibition Center (RICEC) in northern Riyadh is Saudi Arabia's largest event venue, with over 200,000 sqm of space and capacity for 30,000+ attendees. RICEC hosts the LEAP Technology Conference, World Defense Show, Cityscape Saudi, and Saudi BUILD. For conferences under 3,500 delegates, the KAFD Conference Centre and King Abdulaziz International Conference Center (KAICC) in the Diplomatic Quarter are preferred.",
          },
        },
        {
          "@type": "Question",
          "name": "Which event management companies in Riyadh specialize in Vision 2030 corporate events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management specializes in Vision 2030-aligned corporate events in Riyadh, operating across KAFD, RICEC, KAICC, and premium hotel venues including Four Seasons, Ritz-Carlton, and Waldorf Astoria Riyadh. We coordinate with SECB, GEA, and Amanah Ar-Riyad for full compliance on all engagements.",
          },
        },
        {
          "@type": "Question",
          "name": "What permits are required to host a corporate event or exhibition in Riyadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Corporate events in Riyadh require an Amanah Ar-Riyad municipal permit (2–3 weeks). Exhibitions at RICEC use the SECB fast-track pathway. Entertainment-category brand activations need a GEA license (4–6 weeks). Events at Diriyah require Diriyah Gate Development Authority (DGDA) approval. Saudi Event Management manages the complete permitting process.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the best hotel for a luxury wedding in Riyadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The top luxury wedding venues in Riyadh are the Ritz-Carlton Riyadh in the Diplomatic Quarter (capacity up to 2,000), Four Seasons Hotel Riyadh at Kingdom Centre (up to 1,500), Waldorf Astoria Riyadh (up to 1,200), and the St. Regis Riyadh. For heritage-style weddings, Tuwaiq Palace and Diriyah offer unique settings.",
          },
        },
        {
          "@type": "Question",
          "name": "How do brands participate in Riyadh Season events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Riyadh Season, organized by the General Entertainment Authority (GEA), offers brand activation zones at Boulevard Riyadh City, Riyadh Front, MDL Beast, and Diriyah. Corporate participation requires GEA licensing and, for large activations, RCRC coordination. Saudi Event Management manages the full GEA permit process and production for Riyadh Season brand activations.",
          },
        },
      ],
    },
    {
      "@type": "Place",
      "@id": "https://saudieventmanagement.com/locations/riyadh#place",
      "name": "Riyadh",
      "alternateName": "Ar-Riyad",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "24.7136",
        "longitude": "46.6753",
      },
      "sameAs": "https://en.wikipedia.org/wiki/Riyadh",
      "containsPlace": [
        {
          "@type": "CivicStructure",
          "name": "Riyadh International Convention & Exhibition Center (RICEC)",
        },
        {
          "@type": "CivicStructure",
          "name": "King Abdulaziz International Conference Center (KAICC)",
        },
        {
          "@type": "Place",
          "name": "King Abdullah Financial District (KAFD)",
        },
        { "@type": "LodgingBusiness", "name": "Four Seasons Hotel Riyadh at Kingdom Centre" },
        { "@type": "LodgingBusiness", "name": "Ritz-Carlton Riyadh" },
        { "@type": "LodgingBusiness", "name": "Waldorf Astoria Riyadh" },
        { "@type": "LodgingBusiness", "name": "Fairmont Riyadh" },
        {
          "@type": "LandmarksOrHistoricalBuildings",
          "name": "Diriyah",
        },
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
          "name": "Riyadh Event Management",
          "item": "https://saudieventmanagement.com/locations/riyadh",
        },
      ],
    },
  ],
};

const venues = [
  {
    name: "Riyadh International Convention & Exhibition Center",
    abbr: "RICEC",
    capacity: "30,000+",
    district: "Northern Riyadh",
    type: "Exhibitions & Large Conferences",
    description:
      "Saudi Arabia's largest event venue with 200,000+ sqm. Home to LEAP, World Defense Show, Cityscape Saudi, and Saudi BUILD. The anchor venue for all large-scale MICE operations in Riyadh.",
  },
  {
    name: "King Abdulaziz International Conference Center",
    abbr: "KAICC",
    capacity: "Up to 3,500",
    district: "Diplomatic Quarter",
    type: "Government & Diplomatic Conferences",
    description:
      "Riyadh's premier government and diplomatic conference facility, located within the Diplomatic Quarter. The venue of choice for ministerial summits, intergovernmental events, and high-security conferences.",
  },
  {
    name: "KAFD Conference Centre",
    abbr: "King Abdullah Financial District",
    capacity: "Up to 2,000",
    district: "KAFD",
    type: "Financial & Corporate Events",
    description:
      "Embedded within Saudi Arabia's financial command centre, this is the primary venue for investment forums, fintech summits, PIF-related events, and executive corporate conferences.",
  },
  {
    name: "Four Seasons Hotel Riyadh",
    abbr: "at Kingdom Centre",
    capacity: "Up to 1,500",
    district: "Kingdom Centre, Olaya",
    type: "Luxury Weddings & Galas",
    description:
      "Anchored beneath the Kingdom Centre tower on Olaya Road. Riyadh's benchmark for luxury weddings, VIP state dinners, and high-net-worth corporate galas.",
  },
  {
    name: "Ritz-Carlton Riyadh",
    abbr: "Diplomatic Quarter",
    capacity: "Up to 2,000",
    district: "Diplomatic Quarter",
    type: "Government Galas & Royal Functions",
    description:
      "Set within a palatial complex in Riyadh's Diplomatic Quarter. The preferred venue for royal-adjacent functions, diplomatic receptions, FII private dinners, and ultra-luxury weddings.",
  },
  {
    name: "Diriyah Arena & Heritage District",
    abbr: "UNESCO-candidate site",
    capacity: "Up to 15,000",
    district: "Diriyah",
    type: "Heritage Events & Season Activations",
    description:
      "At-Turaif district in Diriyah is Riyadh's most architecturally distinctive event setting. Managed by the Diriyah Gate Development Authority (DGDA) for cultural galas, Diriyah Season activations, and government heritage events.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Corporate Events & Conferences",
    text: "End-to-end management of corporate conferences, investment summits, and product launches at RICEC, KAICC, and the KAFD Conference Centre.",
    href: "/locations/riyadh/corporate-event-management",
  },
  {
    icon: Trophy,
    title: "Exhibitions & Trade Shows",
    text: "Full exhibition management at RICEC — stand design, logistics, bilingual floor operations, and SECB compliance for LEAP, World Defense Show, and sector exhibitions.",
    href: "/locations/riyadh/exhibition-management",
  },
  {
    icon: Star,
    title: "Luxury Weddings",
    text: "Bespoke wedding planning at Four Seasons, Ritz-Carlton, Waldorf Astoria, and St. Regis Riyadh. Full Najdi cultural expertise and bilingual Arabic-English coordination.",
    href: "/locations/riyadh/luxury-wedding-planning",
  },
  {
    icon: MapPin,
    title: "Government & Vision 2030 Events",
    text: "Ministerial launches, national program events, and Vision 2030 corporate milestones. Direct relationships with GEA, SECB, MISA, and RCRC.",
    href: "/locations/riyadh/corporate-event-management",
  },
  {
    icon: Users,
    title: "Brand Activations — Riyadh Season",
    text: "GEA-licensed brand activations at Boulevard Riyadh City, Riyadh Front, and MDL Beast zones during Riyadh Season and national celebrations.",
    href: "/locations/riyadh/brand-activation",
  },
  {
    icon: Calendar,
    title: "Gala Dinners & Award Ceremonies",
    text: "Turnkey production of corporate gala dinners, award nights, and Diriyah heritage galas combining Najdi architecture with contemporary luxury.",
    href: "/locations/riyadh/gala-dinners",
  },
];

const faqs = [
  {
    q: "What is the largest event venue in Riyadh for exhibitions and trade shows?",
    a: "The Riyadh International Convention & Exhibition Center (RICEC) in northern Riyadh is Saudi Arabia's largest event venue, with over 200,000 sqm of space and capacity for 30,000+ attendees. RICEC is home to LEAP, World Defense Show, Cityscape Saudi, and Saudi BUILD. For conferences under 3,500 delegates, the KAFD Conference Centre and KAICC in the Diplomatic Quarter are the preferred alternatives.",
  },
  {
    q: "Which event management company in Riyadh handles Vision 2030-aligned corporate events?",
    a: "Saudi Event Management specializes in Vision 2030-aligned corporate events in Riyadh, operating across KAFD, RICEC, KAICC, and premium hotel venues including Four Seasons, Ritz-Carlton, and Waldorf Astoria. We coordinate directly with SECB, GEA, and Amanah Ar-Riyad for full compliance and permitting on every engagement.",
  },
  {
    q: "What permits are required to host a corporate event in Riyadh?",
    a: "Corporate events in Riyadh require an Amanah Ar-Riyad municipal permit (2–3 weeks processing). Exhibitions at RICEC follow the SECB fast-track pathway. Entertainment-category brand activations require a GEA license (4–6 weeks). Events at Diriyah need Diriyah Gate Development Authority (DGDA) approval. Saudi Event Management manages the complete permitting process.",
  },
  {
    q: "What is the best luxury wedding venue in Riyadh?",
    a: "The top luxury wedding venues in Riyadh are the Ritz-Carlton Riyadh in the Diplomatic Quarter (up to 2,000 guests), Four Seasons Hotel at Kingdom Centre (up to 1,500), Waldorf Astoria Riyadh (up to 1,200), and the St. Regis Riyadh. For heritage-style Saudi weddings, Diriyah and Tuwaiq Palace offer unmatched settings.",
  },
  {
    q: "How do companies participate in Riyadh Season brand activations?",
    a: "Riyadh Season activation zones — including Boulevard Riyadh City, Riyadh Front, and MDL Beast — are managed by the General Entertainment Authority (GEA). Participation requires a GEA brand activation license, with lead times of 4–6 weeks. Saudi Event Management handles the full GEA application, production, and on-ground management for Riyadh Season campaigns.",
  },
];

const eventCalendar = [
  {
    period: "Jan – Mar",
    season: "Conference Season — LEAP, FII, Future Minerals",
    events: "RICEC expos, KAFD investment forums, tech conferences, government summits",
    demand: "Peak",
  },
  {
    period: "Mar – Apr",
    season: "Ramadan & Eid Al-Fitr",
    events: "Corporate Iftar programs, charity galas, Eid luxury celebrations",
    demand: "Very High",
  },
  {
    period: "Jun – Sep",
    season: "Riyadh Season (Summer)",
    events: "GEA brand activations, Boulevard events, MDL Beast, entertainment shows",
    demand: "Peak",
  },
  {
    period: "Sep – Dec",
    season: "National Day & Q4 Gala Season",
    events: "Saudi National Day (23 Sep) events, year-end corporate galas, World Defense Show (biennial)",
    demand: "High",
  },
];

export default function RiyadhPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Elevating Riyadh's Most"
        titleHighlight="Iconic Events"
        subtitle="From RICEC exhibitions to FII investment summits, Diriyah heritage galas to Four Seasons luxury weddings — Riyadh's premier event management company delivering Vision 2030-aligned events at the highest standard."
        backgroundImage="/riyadh_summit_people.webp"
        imageAlt="Corporate event management in Riyadh Saudi Arabia — premium conference production at KAFD"
        badge="Saudi Arabia's Capital | Riyadh"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Riyadh" },
        ]}
        minHeight="large"
      />

      {/* CTA Bar */}
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
          >
            Request a Proposal
          </Link>
          <Link
            href="/portfolio"
            className="btn-outline hover:scale-105 transition-all rounded-sm"
          >
            View Our Riyadh Work
          </Link>
        </div>
      </div>

      {/* Riyadh at a Glance — Entity Density Strip */}
      <section className="py-10 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { label: "City Population", val: "7.5M+" },
              { label: "RICEC Capacity", val: "30,000" },
              { label: "5-Star Hotel Venues", val: "12+" },
              { label: "Peak Conference Season", val: "Jan–Mar" },
              { label: "Annual Mega-Events", val: "6+" },
              { label: "Expo 2030 Host", val: "Riyadh" },
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

      {/* Why Riyadh — Authority Section */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="section-label">Why Riyadh for Events</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">
              Saudi Arabia&apos;s{" "}
              <span className="text-[var(--primary)]">Corporate Event Capital</span>
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4 mb-8">
              <p>
                Riyadh concentrates Saudi Arabia&apos;s political authority,
                financial infrastructure, and Vision 2030 decision-making in one
                city. The{" "}
                <strong>
                  Riyadh International Convention &amp; Exhibition Center
                  (RICEC)
                </strong>{" "}
                — with 200,000+ sqm and 30,000 capacity — hosts the world&apos;s
                top MENA events including <strong>LEAP</strong>,{" "}
                <strong>World Defense Show</strong>, and{" "}
                <strong>Cityscape Saudi</strong>. The{" "}
                <strong>King Abdullah Financial District (KAFD)</strong> and its
                conference centre serve as the nerve centre of every investment
                forum and fintech summit.
              </p>
              <p>
                For government-level events, the{" "}
                <strong>
                  King Abdulaziz International Conference Center (KAICC)
                </strong>{" "}
                in the Diplomatic Quarter handles ministerial summits and the{" "}
                <strong>Future Investment Initiative (FII)</strong>. Saudi Event
                Management&apos;s Riyadh team is fully accredited with{" "}
                <strong>GEA</strong>, <strong>SECB</strong>, and{" "}
                <strong>Amanah Ar-Riyad</strong> — the three permit authorities
                governing all Riyadh event categories.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Direct SECB accreditation for RICEC exhibition management",
                "GEA-licensed for Riyadh Season brand activations",
                "Diplomatic Quarter clearance for KAICC government events",
                "Diriyah Gate Development Authority (DGDA) approved partner",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-700 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image
              src="/riyadh_summit_people.webp"
              alt="Corporate conference management at KAFD Riyadh Saudi Arabia"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
              <div className="glass p-6 rounded-sm">
                <p className="text-white text-sm font-display font-light">
                  &quot;Riyadh demands the highest standard. We deliver it — from RICEC
                  exhibitions to Diriyah heritage galas.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Services in Riyadh</span>
            <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
              Full-Service Event Management{" "}
              <span className="text-[var(--primary)]">in Riyadh</span>
            </h2>
            <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
              From RICEC mega-exhibitions to intimate Diplomatic Quarter dinners
              — our Riyadh team covers every event format with Vision 2030
              compliance built in.
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

      {/* Top Venues in Riyadh */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Venue Network</span>
          <h2 className="font-display font-medium text-slate-900 text-2xl md:text-3xl mt-4">
            Top Event Venues in{" "}
            <span className="text-[var(--primary)]">Riyadh</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
            From RICEC — Saudi Arabia&apos;s largest exhibition centre — to the
            Ritz-Carlton&apos;s Diplomatic Quarter ballrooms, our Riyadh venue
            network covers every event scale and category.
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
              { label: "Events Delivered in Riyadh", val: "200+" },
              { label: "Venue Partnerships", val: "45+" },
              { label: "Riyadh-Based Specialists", val: "15" },
              { label: "Avg. Guest Satisfaction", val: "99%" },
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
            Riyadh Event{" "}
            <span className="text-[var(--primary)]">Season Calendar</span>
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-2xl mx-auto">
            Riyadh&apos;s event calendar is the densest in Saudi Arabia.
            Venue availability at RICEC and KAFD fills 6–12 months in advance
            during peak conference season.
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
                <p className="text-xs font-semibold text-slate-600 mb-1">{row.season}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{row.events}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section — E-E-A-T Signal */}
      <section className="py-32 relative overflow-hidden bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="section-label">Riyadh Leadership</span>
              <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">
                Our Riyadh{" "}
                <span className="text-[var(--primary)]">Event Specialists</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Our Riyadh team combines deep knowledge of Saudi corporate
                protocol, government event compliance, and the cultural
                precision required to operate at the highest levels of the
                Kingdom&apos;s event landscape.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Fahad Al-Saud",
                    role: "Riyadh Managing Director",
                    desc: "15+ years delivering corporate events across KAFD, KAICC, and Diriyah.",
                  },
                  {
                    name: "Layla Mansour",
                    role: "Head of Design & Production",
                    desc: "Specializing in Najdi-modern event aesthetics and large-scale AV production.",
                  },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-white border border-slate-300 rounded-sm shadow-2xs"
                  >
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-emerald-800 shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium mb-1 font-display text-sm">
                        {member.name}
                      </h3>
                      <p className="text-[var(--primary)] text-[10px] uppercase tracking-wider mb-2 font-semibold">
                        {member.role}
                      </p>
                      <p className="text-slate-500 text-xs font-light">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/luxury_wedding_couple_guests.webp"
                    alt="Luxury wedding guests at premium event in Riyadh Saudi Arabia"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/riyadh_summit_people.webp"
                    alt="Corporate summit event production Riyadh KAFD"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/gallery_destination_wedding.webp"
                    alt="Destination wedding venue Riyadh Saudi Arabia luxury event"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src="/wedding_hall_grand_entrance.webp"
                    alt="Grand wedding hall entrance decoration Riyadh luxury venue"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO Citation Block */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            Riyadh Event Management Authority
          </span>
          <h2 className="font-display font-medium text-white text-2xl md:text-3xl mt-4 mb-12">
            Why Corporations Choose{" "}
            <span className="text-emerald-400">Saudi Event Management</span> in
            Riyadh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "GEA, SECB & Amanah Accredited",
                body: "We hold active accreditations with all three Riyadh permit authorities — GEA for entertainment events, SECB for MICE exhibitions, and Amanah Ar-Riyad for municipal permits. No delays, no compliance gaps.",
              },
              {
                title: "RICEC Preferred Partner",
                body: "As a preferred logistics and event management partner at RICEC, we have operational priority access for LEAP, World Defense Show, and Cityscape Saudi — the three largest annual events in Saudi Arabia.",
              },
              {
                title: "Vision 2030 Delivery Infrastructure",
                body: "Every event we manage in Riyadh is structured to meet Vision 2030 reporting and compliance standards. We have delivered corporate events for PIF portfolio companies, MISA forums, and national program launches.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 bg-slate-900 border border-slate-800 rounded-sm"
              >
                <h3 className="font-display font-semibold text-white text-sm mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{card.body}</p>
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
            Event Management in Riyadh —{" "}
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
              Event Management in Riyadh, Saudi Arabia
            </h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p>
                <strong>Saudi Event Management</strong> is a full-service event
                management company operating across Riyadh — Saudi Arabia&apos;s
                capital and largest city. Our Riyadh operations span corporate
                conferences at the{" "}
                <strong>
                  Riyadh International Convention &amp; Exhibition Center
                  (RICEC)
                </strong>
                , government summits at the{" "}
                <strong>
                  King Abdulaziz International Conference Center (KAICC)
                </strong>
                , investment forums at the{" "}
                <strong>King Abdullah Financial District (KAFD)</strong>, and
                luxury weddings at the{" "}
                <strong>Ritz-Carlton</strong>,{" "}
                <strong>Four Seasons</strong>, and{" "}
                <strong>Waldorf Astoria Riyadh</strong>.
              </p>
              <p>
                We are fully accredited with the{" "}
                <strong>
                  Saudi Exhibitions &amp; Conventions Bureau (SECB)
                </strong>
                , the{" "}
                <strong>General Entertainment Authority (GEA)</strong>, and
                Amanah Ar-Riyad. Our Riyadh portfolio includes{" "}
                <strong>Vision 2030</strong> program events, PIF portfolio
                company launches, Riyadh Season brand activations, and
                heritage galas in <strong>Diriyah</strong>. As the host city
                of <strong>World Expo 2030</strong>, Riyadh&apos;s event
                infrastructure continues to expand — positioning our Riyadh
                team for the largest event market in MENA.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                All Services Available in Riyadh:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Corporate Events", slug: "corporate-event-management" },
                  { name: "Exhibitions", slug: "exhibition-management" },
                  { name: "Luxury Weddings", slug: "luxury-wedding-planning" },
                  { name: "Brand Activations", slug: "brand-activation" },
                  { name: "Gala Dinners", slug: "gala-dinners" },
                  { name: "Government Events", slug: "corporate-event-management" },
                  { name: "Conference Planning", slug: "conference-planning" },
                ].map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/locations/riyadh/${svc.slug}`}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {svc.name}
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

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">
                Other Locations:
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Jeddah", href: "/locations/jeddah" },
                  { name: "Makkah", href: "/locations/makkah" },
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
