import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Moon, Star, MapPin, Users } from "lucide-react";

export const metadata = {
  title: 'Makkah VIP Retreat Case Study',
  description: 'Bespoke event management for spiritual and high-profile retreats in the Holy City of Makkah.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/makkah-vip-retreat' },
};

export default function MakkahVipRetreat() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/locations/riyadh-hero.webp" 
            alt="Makkah VIP Retreat" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-primary hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="text-black text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block bg-primary/10 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-primary/20">
            Private Spiritual Retreat
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-6 leading-tight uppercase tracking-tight">
            Makkah <span className="text-primary italic">VIP Retreat</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">A sanctuary of serenity and absolute luxury for distinguished guests during the holy month.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-gray-50 border-y border-gray-100 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { icon: Moon, label: "Duration", val: "10 Days" },
            { icon: Star, label: "Service", val: "Ultra-Luxury" },
            { icon: Users, label: "Guests", val: "VIP Delegation" },
            { icon: MapPin, label: "Venue", val: "Exclusive Villa" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-black uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 font-light text-base leading-relaxed space-y-24">
        
        {/* The Brief */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">The <span className="text-primary italic">Vision</span></h2>
            <p className="mb-6">
              Our client required a completely private, highly secure, and spiritually resonant environment for a high-profile delegation visiting Makkah. The objective was to blend the sanctity of the location with the world-class hospitality and logistical precision of a five-star international retreat.
            </p>
            <p>
              Every detail, from the scent of the linens to the timing of the private transport, had to be orchestrated with surgical precision to allow guests to focus entirely on their spiritual journey.
            </p>
          </div>
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_1.webp" alt="Makkah Retreat Interior" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight text-center">Masterful <span className="text-primary italic">Execution</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Privacy & Security", desc: "Implemented a multi-tier security protocol with discreet personnel and advanced surveillance." },
              { title: "Bespoke Dining", desc: "Private chefs providing customized menu rotations focusing on local heritage and international nutrition." },
              { title: "Logistical Flow", desc: "Seamless private transport to and from the Haram with zero-wait protocols." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-black text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-black text-white p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-8 uppercase tracking-tight">The <span className="text-primary italic">Result</span></h2>
            <p className="text-gray-300 text-lg mb-12 max-w-3xl font-light">
              The retreat was described by the delegation as the most seamless and spiritually enriching experience they had encountered. Saudi Event Management handled every complexity, allowing the guests to experience Makkah with unprecedented peace and luxury.
            </p>
            <div className="flex items-center gap-6 border-t border-white/10 pt-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest italic">"Unmatched attention to detail in the holiest of cities."</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">— Chief of Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gray-50 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Plan Your <span className="text-primary italic">Elite Experience</span></h2>
        <Link 
          href="/#contact" 
          className="inline-block px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all rounded-xl shadow-2xl text-xs"
        >
          Request Private Consultation
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
