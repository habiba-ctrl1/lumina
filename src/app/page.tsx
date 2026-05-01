import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RecentEvents from "@/components/RecentEvents";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
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
      <Navbar />
      <Hero />
      <Services />
      <RecentEvents />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
