import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";
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
        "Saudi Arabia's premier event management agency specializing in bespoke luxury weddings and high-end corporate galas across Riyadh, Jeddah, and AlUla.",
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
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://saudieventmanagement.com/#website",
      url: "https://saudieventmanagement.com",
      name: "Saudi Event Management",
      description: "Luxury Event Management Services",
      publisher: { "@id": "https://saudieventmanagement.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    /*
      bg-ink-950  → deep black base (from tailwind.config)
      text-sand-100 → warm near-white body text

      REMOVED: bg-white — this was overriding the dark theme set in layout.tsx
    */
    <main className="min-h-screen bg-ink-950 text-sand-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Utility overlays ─────────────────────────────────────────────── */}
      <ScrollProgress />
      <WhatsAppButton />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <Navbar darkHero />

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
      <MarqueeStrip />
      <ContactSection />
      <StatsSection />
      <FilterablePortfolio />
      <HowItWorks />
      <MapClient />
      <BlogPreview />
      <PartnersSection />
      <InstagramFeed />
      <EngagementHub />
      <Footer />
    </main>
  );
}