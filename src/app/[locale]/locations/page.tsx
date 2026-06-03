import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SaudiMap from "@/components/SaudiMap";

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
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 flex items-center justify-center bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-30 bg-cover bg-center" />
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[var(--primary)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Global Presence</span>
          </div>
          <h1 className="font-display font-bold text-slate-900 mb-6 leading-tight text-4xl md:text-5xl uppercase tracking-tight">
            Our <span className="text-[var(--primary)] font-bold">Destinations</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Saudi Event Management curates extraordinary experiences across premier locations. Select a destination to explore our local expertise and exclusive venues.
          </p>
        </div>
      </section>

      <SaudiMap />
      
      {/* Descriptive SEO Section */}
      <section className="py-28 relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-tight text-3xl">
          Kingdom-wide <span className="text-[var(--primary)]">Excellence</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-6">
          <p>
            Saudi Event Management operates at the intersection of local heritage and global luxury standards. Our presence across the Kingdom is not just about having offices; it&apos;s about our deep-rooted relationships with the finest venues, government authorities, and specialized artisans in each region. Whether you are planning a high-stakes corporate summit in the heart of Riyadh&apos;s financial district or a soulful wedding in the historic streets of Jeddah, our regional teams provide the logistical precision and cultural nuance required for world-class execution.
          </p>
          <p>
            In AlUla, we navigate the complex requirements of UNESCO-protected sites to deliver breathtaking desert experiences, while in Dammam, we support the industrial and energy giants of the Eastern Province with sophisticated corporate galas and seminars. Our expansion strategy is aligned with Saudi Vision 2030, ensuring that every event we manage contributes to the Kingdom&apos;s growing reputation as a global hub for elite gatherings and cultural celebrations.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 relative max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {locations.map((loc: any) => (
            <Link 
              key={loc.slug} 
              href={`/locations/${loc.slug}`}
              className="group block relative rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-[var(--primary)] transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="relative h-80 w-full overflow-hidden bg-slate-100">
                <Image 
                  src={loc.image} 
                  alt={loc.city} 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 start-0 end-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-[var(--primary)]" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">{loc.country}</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-white mb-4 uppercase tracking-tight">{loc.city}</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-6 line-clamp-2">
                  {loc.description}
                </p>
                <div className="flex items-center text-[var(--primary)] text-[11px] font-bold uppercase tracking-widest">
                  Explore Location <ArrowRight size={16} className="ms-2 group-hover:translate-x-1 transition-transform" />
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
