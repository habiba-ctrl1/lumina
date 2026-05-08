import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Our Locations | Lumina Events',
  description: 'Discover Lumina Events across the Kingdom of Saudi Arabia. Premier luxury event management in Riyadh, Jeddah, AlUla, and Dammam.',
  keywords: 'event management locations, Lumina Riyadh, Lumina Jeddah, Lumina AlUla, Lumina Dammam, Saudi luxury events',
};

const locations = [
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    image: "/gallery_2.png",
    slug: "riyadh",
    description: "The capital of luxury, elevating Riyadh's most iconic celebrations from the Kingdom Centre to Diriyah.",
  },
  {
    city: "Jeddah",
    country: "Saudi Arabia",
    image: "/gallery_corporate_gala.png",
    slug: "jeddah",
    description: "Spectacular seaside celebrations and exclusive Red Sea coastal events.",
  },
  {
    city: "AlUla",
    country: "Saudi Arabia",
    image: "/gallery_destination_wedding.png",
    slug: "alula",
    description: "Saudi Arabia's most breathtaking destination — ancient desert landscapes, UNESCO heritage, and ultra-luxury resorts.",
  },
  {
    city: "Dammam",
    country: "Saudi Arabia",
    image: "/gallery_vip_party.png",
    slug: "dammam",
    description: "The Eastern Province gateway to luxury — elite corporate galas, Aramco-tier celebrations, and spectacular family weddings.",
  }
];

export default function LocationsPage() {
  return (
    <main className="min-h-screen bg-navy-950 overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/hero_bg.png')] opacity-5 bg-cover bg-center" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Global Presence
          </span>
          <h1 className="text-3xl md:text-5xl font-sans text-white mb-6 leading-tight font-bold">
            Our <span className="hero-subtitle-shimmer font-bold">Destinations</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Lumina Events curates extraordinary experiences across premier locations. Select a destination to explore our local expertise and exclusive venues.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {locations.map((loc) => (
            <Link 
              key={loc.slug} 
              href={`/locations/${loc.slug}`}
              className="group block relative rounded-md overflow-hidden border border-white/10 bg-white/5 hover:border-gold-500/50 transition-all duration-500"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image 
                  src={loc.image} 
                  alt={loc.city} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-gold-500" />
                  <span className="text-gold-500 text-xs uppercase tracking-widest">{loc.country}</span>
                </div>
                <h2 className="text-2xl font-sans text-white mb-3 font-bold">{loc.city}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {loc.description}
                </p>
                <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider group-hover:text-gold-500 transition-colors">
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
