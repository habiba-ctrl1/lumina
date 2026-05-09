import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Trophy, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Destination Weddings AlUla | UNESCO Heritage Events',
  description: 'Experience the magic of AlUla with Saudi Event Management. From ancient Hegra backdrops to ultra-luxury desert resorts, we curate breathtaking destination weddings.',
  keywords: 'event management AlUla, destination weddings AlUla, Hegra events, Banyan Tree AlUla weddings, Habitas AlUla events, Saudi desert luxury events',
};

export default function AlUlaPage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_destination_wedding.png" 
            alt="Luxury Event Management AlUla - Desert Landscapes" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            Saudi Arabia&apos;s Breathtaking Destination | AlUla
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans text-white mb-6 leading-tight font-bold">
          Unforgettable <br/><span className="hero-subtitle-shimmer font-semibold uppercase tracking-widest text-xl md:text-2xl">Intimate Celebrations</span>
        </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            Amidst ancient <span className="text-white font-medium">UNESCO heritage</span> and ultra-luxury desert resorts, we weave stories that echo through time.
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
              View Destination Work
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Exclusive Venues AlUla</span>
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-8 font-bold">Ancient Landscapes, <span className="text-shimmer">Modern Luxury</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              AlUla is a living museum of human history. We specialize in creating high-end destination weddings that respect the sanctity of the landscape while providing the pinnacle of luxury service. From the sandstone canyons to the mirrored walls of Maraya, your event will be legendary.
            </p>
            <ul className="space-y-4">
              {[
                "Bespoke setups at Banyan Tree and Habitas AlUla",
                "Historical backdrops near Hegra for exclusive gatherings",
                "Sustainable event logistics for desert environments",
                "Luxury guest concierge for international destination travelers"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Star size={16} className="text-gold-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <Image src="/gallery_destination_wedding.png" alt="AlUla Desert Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light ">&quot;Where history meets the future of luxury.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* AlUla Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: "Guest Capacity", val: "50–300" },
            { label: "Peak Season", val: "Nov–Apr" },
            { label: "Elite Resorts", val: "5+" },
            { label: "Event Style", val: "Intimate" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-sans font-bold text-white mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-gold-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for AlUla */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">Signature AlUla <span className="hero-subtitle-shimmer">Experiences</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">Tailored solutions for the world&apos;s most ambitious destination events.</p>
            <h2 className="text-2xl md:text-3xl font-sans text-white mb-6 font-bold">Signature AlUla <span className="hero-subtitle-shimmer">Experiences</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Tailored solutions for the world&apos;s most ambitious destination events.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Sparkles, title: "Hegra Background Weddings", desc: "Unprecedented access to ancient heritage sites for your ceremony backdrop." },
               { icon: Trophy, title: "Desert Resort Takeovers", desc: "Full buyout management for resorts like Habitas or Banyan Tree for your guests." },
               { icon: MapPin, title: "Wadi Ashar Private Galas", desc: "Immersive dining experiences set deep within the hidden canyons of AlUla." }
             ].map((service, i) => (
               <div key={i} className="bg-[#1e2653] border border-white/10 p-10 rounded-3xl hover:border-gold-500/30 transition-all">
                 <service.icon size={32} className="text-gold-500 mb-6" />
                 <h3 className="text-xl font-sans font-bold text-white mb-4">{service.title}</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">AlUla Venue <span className="hero-subtitle-shimmer">Network</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">We maintain direct relationships with AlUla&apos;s most exclusive management entities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Banyan Tree AlUla",
              "Habitas AlUla",
              "Shaden Resort",
              "Maraya Concert Hall",
              "Hegra Heritage Site",
              "Old Town AlUla",
              "Ashar Valley Resorts",
              "Cloud7 Residence"
            ].map((venue, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
                <span className="text-white text-sm font-light">{venue}</span>
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
