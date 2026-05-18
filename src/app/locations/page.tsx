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
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-[0.03] bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="section-label">
            Global Presence
          </span>
          <h1 className="font-display font-medium text-slate-900 mb-6 leading-tight text-3xl md:text-4xl">
            Our <span className="text-shimmer italic font-medium">Destinations</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Saudi Event Management curates extraordinary experiences across premier locations. Select a destination to explore our local expertise and exclusive venues.
          </p>
        </div>
      </section>

      <SaudiMap />
      
      {/* Descriptive SEO Section */}
      <section className="py-20 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display font-medium text-slate-900 mb-8 uppercase tracking-tight text-2xl md:text-3xl">
          Kingdom-wide <span className="text-shimmer italic">Excellence</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6 font-light">
          <p>
            Saudi Event Management operates at the intersection of local heritage and global luxury standards. Our presence across the Kingdom is not just about having offices; it&apos;s about our deep-rooted relationships with the finest venues, government authorities, and specialized artisans in each region. Whether you are planning a high-stakes corporate summit in the heart of Riyadh&apos;s financial district or a soulful wedding in the historic streets of Jeddah, our regional teams provide the logistical precision and cultural nuance required for world-class execution.
          </p>
          <p>
            In AlUla, we navigate the complex requirements of UNESCO-protected sites to deliver breathtaking desert experiences, while in Dammam, we support the industrial and energy giants of the Eastern Province with sophisticated corporate galas and seminars. Our expansion strategy is aligned with Saudi Vision 2030, ensuring that every event we manage contributes to the Kingdom&apos;s growing reputation as a global hub for elite gatherings and cultural celebrations.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {locations.map((loc) => (
            <Link 
              key={loc.slug} 
              href={`/locations/${loc.slug}`}
              className="group block relative rounded-sm overflow-hidden border border-slate-200/80 bg-white hover:border-gold-400 transition-all duration-500 shadow-sm hover:shadow-md"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={loc.image} 
                  alt={loc.city} 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-gold-400" />
                  <span className="text-gold-400 text-xs uppercase tracking-widest">{loc.country}</span>
                </div>
                <h3 className="font-display font-medium text-2xl text-white mb-3">{loc.city}</h3>
                <p className="text-slate-200 text-xs leading-relaxed mb-6 line-clamp-2">
                  {loc.description}
                </p>
                <div className="flex items-center text-white text-xs font-bold uppercase tracking-wider group-hover:text-gold-400 transition-colors">
                  Explore Location <ArrowRight size={16} className="ml-2" />
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
