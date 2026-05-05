import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Trophy, Building2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Management Riyadh | Kingdom Centre & Diriyah Events',
  description: 'The premier luxury event planner in Riyadh. From royal weddings near the Kingdom Centre to exclusive corporate galas in historical Diriyah.',
  keywords: 'event management Riyadh, luxury weddings Riyadh, corporate events Riyadh, Kingdom Centre events, Diriyah event planning, Al Faisaliyah Center events',
};

export default function RiyadhPage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/locations/riyadh-hero.jpg" 
            alt="Luxury Event Management Riyadh - Kingdom Centre Skyline" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Capital of Luxury | Riyadh
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
            Elevating Riyadh&apos;s Most <br/><span className="hero-subtitle-shimmer italic font-semibold">Iconic Celebrations</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            From the soaring heights of the <span className="text-white font-medium">Kingdom Centre</span> to the majestic heritage of <span className="text-white font-medium">Diriyah</span>, we curate experiences that define the Riyadh skyline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-10 py-4 bg-white text-[#1e2653] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg"
            >
              Request a Proposal
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View Our Riyadh Work
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Event Venues Riyadh</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">Where Heritage Meets <span className="italic text-shimmer">Modernity</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Riyadh is a city of grand contrasts. We specialize in transforming the most prestigious locations into bespoke event spaces. Whether it&apos;s a high-profile corporate summit at the <span className="text-white">Al Faisaliyah Center</span> or a private desert oasis gala, our local expertise ensures flawless execution.
            </p>
            <ul className="space-y-4">
              {[
                "Exclusive access to Royal Palaces and Private Estates",
                "Logistics management for grand scales near King Abdullah Financial District (KAFD)",
                "Bespoke decor inspired by Najdi architecture and modern minimalism",
                "World-class catering partnerships with Riyadh's elite chefs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Star size={16} className="text-gold-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <Image src="/locations/riyadh-landmark.jpg" alt="Kingdom Centre Riyadh Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light italic">&quot;Creating masterpieces in the heart of the Kingdom.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* Riyadh Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: "Riyadh Events", val: "150+" },
            { label: "Elite Venues", val: "45+" },
            { label: "Expert Planners", val: "12" },
            { label: "Guest Concierge", val: "24/7" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display text-white mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-gold-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for Riyadh */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Signature Riyadh <span className="hero-subtitle-shimmer italic">Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">Customized event solutions for the capital&apos;s most discerning clientele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Building2, title: "KAFD Corporate Summits", desc: "Professional management for executive conferences and brand launches in the financial district." },
               { icon: Trophy, title: "Diriyah Heritage Galas", desc: "Combining historical majesty with modern luxury for unforgettable evening celebrations." },
               { icon: MapPin, title: "Private Riyadh Villas", desc: "Transforming exclusive residential estates into bespoke party venues with full concierge." }
             ].map((service, i) => (
               <div key={i} className="bg-[#1e2653] border border-white/10 p-10 rounded-3xl hover:border-gold-500/30 transition-all">
                 <service.icon size={32} className="text-gold-500 mb-6" />
                 <h3 className="text-xl font-display text-white mb-4">{service.title}</h3>
                 <p className="text-gray-400 text-sm font-light leading-relaxed">{service.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
