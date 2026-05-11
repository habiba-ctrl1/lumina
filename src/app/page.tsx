import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import ContactSection from "@/components/ContactSection";
import BusinessLiveFeed from "@/components/BusinessLiveFeed";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

import MapClient from "@/components/MapClient";

import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import PartnersSection from "@/components/PartnersSection";
import InstagramFeed from "@/components/InstagramFeed";
import EngagementHub from "@/components/EngagementHub";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "image": "https://saudieventmanagement.com/hero_bg.webp",
        "@id": "https://saudieventmanagement.com/#organization",
        "url": "https://saudieventmanagement.com",
        "telephone": "+966501234567",
        "priceRange": "$$$$",
        "description": "Saudi Arabia's premier event management agency specializing in bespoke luxury weddings and high-end corporate galas across Riyadh, Jeddah, and AlUla.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Olaya District",
          "addressLocality": "Riyadh",
          "addressRegion": "Riyadh Province",
          "postalCode": "12211",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.7128,
          "longitude": -74.0060
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "184"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "sameAs": [
          "https://www.facebook.com/saudieventmanagement",
          "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn",
          "https://www.twitter.com/saudieventmanagement"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://saudieventmanagement.com/#website",
        "url": "https://saudieventmanagement.com",
        "name": "Saudi Event Management",
        "description": "Luxury Event Management Services",
        "publisher": {
          "@id": "https://saudieventmanagement.com/#organization"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollProgress />
      <Navbar />
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
      <WhatsAppButton />
    </main>
  );
}
