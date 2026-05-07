import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Waves, Camera, Building } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Management Jeddah | Corniche & Al-Balad Events',
  description: 'The premier luxury event planner in Jeddah. Exquisite weddings by the Red Sea, corporate events near the King Fahd Fountain, and heritage galas in Al-Balad.',
  keywords: 'event management Jeddah, luxury weddings Jeddah, Jeddah Corniche events, King Fahd Fountain events, Al-Balad event planning, Red Sea luxury events',
};

export default function JeddahPage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_corporate_gala.png" 
            alt="Luxury Event Management Jeddah - Red Sea Coastline" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Bride of the Red Sea | Jeddah
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
            Coastal Elegance & <br/><span className="hero-subtitle-shimmer italic font-semibold">Bespoke Galas</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            From the mesmerizing spray of <span className="text-white font-medium">King Fahd&apos;s Fountain</span> to the historic soul of <span className="text-white font-medium">Al-Balad</span>, we design events that breathe with the spirit of Jeddah.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-10 py-4 bg-white text-[#1e2653] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg"
            >
              Consult Our Jeddah Team
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Jeddah Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/gallery_garden_party.png" alt="Al-Balad Jeddah Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light italic">&quot;Where the heritage of the past meets the luxury of the future.&quot;</p>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Event Venues Jeddah</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">Red Sea <span className="italic text-shimmer">Grandeur</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Jeddah&apos;s vibrant energy is matched only by its stunning coastal backdrop. We excel in planning high-end waterfront weddings on the <span className="text-white">Jeddah Corniche</span> and intimate, soulful gatherings within the coral-stone walls of <span className="text-white">Al-Balad</span>. Our team understands the unique rhythm of the Hijaz region.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Waves, title: "Waterfront Galas", text: "Luxury yacht parties and seaside ballroom celebrations." },
                { icon: Building, title: "Historic Heritage", text: "Exclusive events in Al-Balad's meticulously restored mansions." },
                { icon: Anchor, title: "Yacht Concierge", text: "Bespoke private celebrations on the Red Sea's elite vessels." },
                { icon: Camera, title: "Cinematic Vibe", text: "Leveraging Jeddah's unique golden hour for perfect events." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <item.icon size={20} className="text-gold-500" />
                  <h4 className="text-white font-display text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jeddah Stats */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Jeddah Weddings", val: "85+" },
              { label: "Waterfront Venues", val: "30+" },
              { label: "Hijazi Experts", val: "8" },
              { label: "Logistics Fleet", val: "Premium" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-display text-white mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-gold-500">{stat.label}</div>
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
