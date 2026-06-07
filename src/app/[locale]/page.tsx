import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { cookies } from "next/headers";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "شركة تنظيم معارض ومؤتمرات وفعاليات في السعودية | إدارة الفعاليات السعودية"
      : "Event Management Company in Saudi Arabia",
    description: isAr
      ? "شركة إدارة الفعاليات السعودية هي الشركة الرائدة في تنظيم المعارض والمؤتمرات وحفلات الزفاف الفاخرة والفعاليات في الرياض وجدة ومكة والعلا."
      : "Saudi Event Management is a leading event management company in Saudi Arabia. We deliver corporate events, exhibitions, luxury weddings and conferences in Riyadh, Jeddah, Makkah, and AlUla.",
    keywords: isAr
      ? [
          "تنظيم معارض ومؤتمرات",
          "شركة تنظيم معارض ومؤتمرات",
          "شركة تنظيم فعاليات في السعودية",
          "تنظيم فعاليات الرياض",
          "إدارة فعاليات السعودية"
        ]
      : [
          "Event Management Company in Saudi Arabia",
          "Event management",
          "شركات تنظيم",
          "Event companies in Saudi Arabia",
          "Saudi event organizer",
          "Event Management Riyadh",
          "Corporate Events Saudi Arabia",
          "Exhibition Management Saudi Arabia",
          "Luxury Event Management KSA",
          "Conference Management Riyadh",
        ],
    alternates: {
      canonical: `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}`,
      languages: {
        "en-US": "https://saudieventmanagement.com",
        "ar-SA": "https://saudieventmanagement.com/ar",
      },
    },
  };
}
import HowItWorks from "@/components/HowItWorks";
import ContactSection from "@/components/ContactSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";
import MapClient from "@/components/MapClient";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import PartnersSection from "@/components/PartnersSection";
import InstagramFeed from "@/components/InstagramFeed";
import EngagementHub from "@/components/EngagementHub";
import Services from "@/components/Services";
import GeoDefinitionBlock from "@/components/GeoDefinitionBlock";
import CityPresence from "@/components/CityPresence";
import VendorCTA from "@/components/VendorCTA";

// ─────────────────────────────────────────────────────────────────────────────
// Page-level schema (supplements layout.tsx global schema)
// ─────────────────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://saudieventmanagement.com/#organization",
      name: "Saudi Event Management",
      image: "https://saudieventmanagement.com/hero_bg.webp",
      url: "https://saudieventmanagement.com",
      telephone: "+966501234567",
      priceRange: "$$$$",
      description:
        "Saudi Arabia's premier event management agency specializing in custom-made luxury weddings and high-end corporate galas across Riyadh, Jeddah, and AlUla.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Olaya District",
        addressLocality: "Riyadh",
        addressRegion: "Riyadh Province",
        postalCode: "12211",
        addressCountry: "SA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 24.7136,   // ← fixed: was New York coords (40.7128, -74.0060)
        longitude: 46.6753,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "184",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      sameAs: [
        "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn",
        "https://www.twitter.com/saudieventmgmt",
        "https://linkedin.com/company/saudieventmanagement",
        "https://www.facebook.com/saudieventmanagement",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Event Management Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Management", url: "https://saudieventmanagement.com/services/corporate-events" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Wedding Planning", url: "https://saudieventmanagement.com/services/weddings" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conference Management", url: "https://saudieventmanagement.com/services/conferences" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exhibition Management", url: "https://saudieventmanagement.com/services/exhibitions" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Destination Events", url: "https://saudieventmanagement.com/services/destination-events" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury VIP Events", url: "https://saudieventmanagement.com/services/luxury-vip-events" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Production", url: "https://saudieventmanagement.com/services/event-production" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cultural Events", url: "https://saudieventmanagement.com/services/cultural-events" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://saudieventmanagement.com/#website",
      url: "https://saudieventmanagement.com",
      name: "Saudi Event Management",
      description: "Saudi Arabia's premier luxury and corporate event management company — Riyadh, Jeddah, Dammam, AlUla, NEOM.",
      publisher: { "@id": "https://saudieventmanagement.com/#organization" },
      inLanguage: ["en-US", "ar-SA"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://saudieventmanagement.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What areas in KSA do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Saudi Event Management provides premium event services across Riyadh, Jeddah, Dammam, and AlUla, specializing in corporate, government, and luxury private events."
          }
        },
        {
          "@type": "Question",
          name: "Why choose Saudi Event Management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We are Saudi Arabia's premier event management agency with a network of over 200 premium vendors and a track record of producing over 500 successful luxury and corporate events."
          }
        }
      ]
    },
    {
      "@type": "Service",
      serviceType: "Corporate Event Planning",
      provider: {
        "@id": "https://saudieventmanagement.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "Saudi Arabia"
      }
    },
    {
      "@type": "Service",
      serviceType: "Luxury Wedding Production",
      provider: {
        "@id": "https://saudieventmanagement.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "Saudi Arabia"
      }
    }
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    /*
      bg-ink-950  → deep black base (from tailwind.config)
      text-sand-100 → warm near-white body text

      REMOVED: bg-ink-800 — this was overriding the dark theme set in layout.tsx
    */
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Utility overlays ─────────────────────────────────────────────── */}
      <ScrollProgress />
      <WhatsAppButton />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <Navbar darkHero locale={locale} />

      {/* ── Sections — ordered by conversion priority ─────────────────────
          Hero          → First impression, booking form
          MarqueeStrip  → Social proof ticker
          ContactSection→ Direct inquiry (high intent visitors)
          StatsSection  → Trust numbers
          FilterablePortfolio → Work showcase
          HowItWorks    → Process transparency
          MapClient     → Location presence
          BlogPreview   → Content / SEO
          PartnersSection → Authority / credibility
          InstagramFeed → Social proof
          EngagementHub → Community + reviews
          Footer        → Navigation + newsletter
      ──────────────────────────────────────────────────────────────────── */}
      <Hero />
      <GeoDefinitionBlock />
      <MarqueeStrip />
      <ContactSection />
      <StatsSection />
      <Services />
      <FilterablePortfolio />
      <HowItWorks />
      <CityPresence />
      <MapClient />
      <BlogPreview />
      <PartnersSection />
      <InstagramFeed />
      <EngagementHub />
      <VendorCTA />
      <Footer />
    </main>
  );
}