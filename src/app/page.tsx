import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import RecentEvents from "@/components/RecentEvents";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import BusinessLiveFeed from "@/components/BusinessLiveFeed";
import BlogPreview from "@/components/BlogPreview";
import VendorMarketplace from "@/components/VendorMarketplace";
import LiveEventTracker from "@/components/LiveEventTracker";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lumina Events",
    "image": "https://luminaevents.com/hero_bg.png",
    "@id": "https://luminaevents.com",
    "url": "https://luminaevents.com",
    "telephone": "+1-555-0198",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Luxury Avenue",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.facebook.com/luminaevents",
      "https://www.instagram.com/luminaevents",
      "https://www.twitter.com/luminaevents"
    ]
  };

  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Services />
      <WhyChooseUs />
      <StatsSection />
      <HowItWorks />
      <RecentEvents />
      <VendorMarketplace />
      <LiveEventTracker />
      <BlogPreview />
      <BusinessLiveFeed />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
