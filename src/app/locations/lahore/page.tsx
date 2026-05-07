import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Flower2, Landmark, Users, Camera } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Management Lahore | Cultural Heritage & Modern Elegance',
  description: 'The premier luxury event planner in Lahore. Blending rich cultural heritage with modern luxury for unforgettable South Asian weddings and corporate galas.',
  keywords: 'event management Lahore, luxury weddings Lahore, Lahore event planning, cultural weddings Pakistan, corporate events Lahore',
};

export default function LahorePage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_wedding_reception.png" 
            alt="Luxury Event Management Lahore - Heritage Architecture" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Heart of Culture | Lahore
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
            Timeless Traditions & <br/><span className="hero-subtitle-shimmer italic font-semibold">Bespoke Elegance</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            Blending the rich architectural heritage of <span className="text-white font-medium">Lahore</span> with contemporary luxury to create extraordinary celebrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-10 py-4 bg-white text-[#1e2653] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg"
            >
              Start Planning
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Event Venues Lahore</span>
            <h2 className="text-3xl md:text-5xl font-display text-white mb-8">A Tapestry of <span className="italic text-shimmer">Grandeur</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Lahore is a city that breathes history. From grand royal-themed weddings to modern corporate launches, we specialize in creating events that honor the city&apos;s cultural depth while delivering a world-class luxury experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Flower2, title: "Heritage Weddings", text: "Traditional ceremonies with a modern luxury twist." },
                { icon: Landmark, title: "Iconic Venues", text: "Partnerships with the city's most prestigious locations." },
                { icon: Users, title: "Elite Guest Mgmt", text: "Handling high-profile guest lists with absolute discretion." },
                { icon: Camera, title: "Cinematic Media", text: "Capturing the soul of your event through world-class lens." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-gold-500 shrink-0"><item.icon size={24} /></div>
                  <div>
                    <h4 className="text-white font-display text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/gallery_destination_wedding.png" alt="Luxury Wedding Lahore" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light italic">&quot;Crafting the future of luxury in the heart of Pakistan.&quot;</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
