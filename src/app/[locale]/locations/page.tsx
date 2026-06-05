import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SaudiMap from "@/components/SaudiMap";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: 'Our Locations',
  description: 'Discover Saudi Event Management across the Kingdom of Saudi Arabia. Premier luxury event management in Riyadh, Jeddah, AlUla, and Dammam.',
  keywords: 'event management locations, Saudi Event Management Riyadh, Saudi Event Management Jeddah, Saudi Event Management AlUla, Saudi Event Management Dammam, Saudi luxury events',
  alternates: { canonical: 'https://saudieventmanagement.com/locations' },
};

const locations = [
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    image: "/gallery_2.webp",
    slug: "riyadh",
    description: "The capital of luxury, elevating Riyadh's most iconic celebrations from the Kingdom Centre to Diriyah.",
  },
  {
    city: "Jeddah",
    country: "Saudi Arabia",
    image: "/gallery_corporate_gala.webp",
    slug: "jeddah",
    description: "Spectacular seaside celebrations and exclusive Red Sea coastal events.",
  },
  {
    city: "AlUla",
    country: "Saudi Arabia",
    image: "/gallery_destination_wedding.webp",
    slug: "alula",
    description: "Saudi Arabia's most breathtaking destination — ancient desert landscapes, UNESCO heritage, and ultra-luxury resorts.",
  },
  {
    city: "Dammam",
    country: "Saudi Arabia",
    image: "/gallery_vip_party.webp",
    slug: "dammam",
    description: "The Eastern Province gateway to luxury — elite corporate galas, Aramco-tier celebrations, and spectacular family weddings.",
  }
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden relative border-t border-neutral-100">
      <ScrollProgress />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Global Presence
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.025em" }}>
            Our <span className="text-[var(--primary)]">Destinations</span>
          </h1>
          <p className="text-neutral-500 text-[16px] md:text-lg max-w-2xl mx-auto leading-relaxed">
            Saudi Event Management curates extraordinary experiences across premier locations. Select a destination to explore our local expertise and exclusive venues.
          </p>
        </div>
      </section>

      <SaudiMap />
      
      {/* Descriptive SEO Section */}
      <section className="py-24 md:py-32 relative max-w-4xl mx-auto px-6 text-center border-t border-neutral-100">
        <h2 className="font-semibold text-neutral-900 mb-8 text-3xl" style={{ letterSpacing: "-0.025em" }}>
          Kingdom-wide <span className="text-[var(--primary)]">Excellence</span>
        </h2>
        <div className="prose prose-slate max-w-none text-neutral-500 text-[15px] leading-relaxed space-y-6 text-justify sm:text-center">
          <p>
            Saudi Event Management operates at the intersection of local heritage and global luxury standards. Our presence across the Kingdom is not just about having offices; it&apos;s about our deep-rooted relationships with the finest venues, government authorities, and specialized artisans in each region. Whether you are planning a high-stakes corporate summit in the heart of Riyadh&apos;s financial district or a soulful wedding in the historic streets of Jeddah, our regional teams provide the logistical precision and cultural nuance required for world-class execution.
          </p>
          <p>
            In AlUla, we navigate the complex requirements of UNESCO-protected sites to deliver breathtaking desert experiences, while in Dammam, we support the industrial and energy giants of the Eastern Province with sophisticated corporate galas and seminars. Our expansion strategy is aligned with Saudi Vision 2030, ensuring that every event we manage contributes to the Kingdom&apos;s growing reputation as a global hub for elite gatherings and cultural celebrations.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 relative max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc: any) => (
            <Link 
              key={loc.slug} 
              href={`/locations/${loc.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-neutral-200/80 bg-white hover:border-neutral-300 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]"
            >
              <div className="relative h-80 w-full overflow-hidden bg-neutral-100">
                <Image 
                  src={loc.image} 
                  alt={loc.city} 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-[var(--primary)]" />
                  <span className="text-white/80 text-[12px] font-medium tracking-wider">{loc.country}</span>
                </div>
                <h3 className="font-semibold text-3xl text-white mb-3" style={{ letterSpacing: "-0.01em" }}>{loc.city}</h3>
                <p className="text-neutral-300 text-[14px] leading-relaxed mb-6 line-clamp-2">
                  {loc.description}
                </p>
                <div className="flex items-center text-[var(--primary)] text-[13px] font-medium group-hover:gap-3 transition-all duration-300">
                  Explore Location <ArrowRight size={15} className="ms-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
