import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Building2, Globe } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Management Dubai | Palm Jumeirah & Burj Khalifa Events',
  description: 'The ultimate luxury event planner in Dubai. High-profile celebrations on the Palm Jumeirah, skyscraper galas near Burj Khalifa, and desert resort weddings.',
  keywords: 'event management Dubai, luxury weddings Dubai, Palm Jumeirah events, Burj Khalifa event planning, Burj Al Arab celebrations, Dubai desert luxury events',
};

export default function DubaiPage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_vip_party.png" 
            alt="Luxury Event Management Dubai - Palm Jumeirah View" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Global Hub of Opulence | Dubai
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
            Infinite Luxury & <br/><span className="hero-subtitle-shimmer italic font-semibold">Sky-High Galas</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            From the pinnacle of the <span className="text-white font-medium">Burj Khalifa</span> to the ultra-exclusive estates of <span className="text-white font-medium">Palm Jumeirah</span>, we set the global benchmark for Dubai events.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-10 py-4 bg-white text-[#1e2653] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg"
            >
              Start Your Dubai Event
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Global Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Event Venues Dubai</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">The Peak of <span className="italic text-shimmer">Prestige</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              In a city that defines the future, we deliver events that make history. We specialize in high-stakes corporate launches in the <span className="text-white">DIFC</span>, royal weddings at the <span className="text-white">Burj Al Arab</span>, and world-class destination weddings across Dubai&apos;s most iconic five-star resorts.
            </p>
            <div className="space-y-6">
              {[
                { icon: Globe, title: "Destination Excellence", text: "End-to-end management for international guests and VIP logistics." },
                { icon: Building2, title: "Skyscraper Venues", text: "Utilizing the world's highest event spaces for unmatched impact." },
                { icon: Sparkles, title: "Palm Jumeirah Estates", text: "Bespoke private celebrations in Dubai's most exclusive villas." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-gold-500/30 transition-all">
                  <div className="text-gold-500 mt-1"><item.icon size={24} /></div>
                  <div>
                    <h4 className="text-white font-display text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-light">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/gallery_1.png" alt="Burj Al Arab Event Dubai" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light italic">&quot;Redefining the standard of luxury in the world&apos;s most ambitious city.&quot;</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Stats */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Dubai Galas", val: "200+" },
              { label: "Partner Hotels", val: "60+" },
              { label: "Global Team", val: "25" },
              { label: "VIP Handled", val: "1000+" }
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
