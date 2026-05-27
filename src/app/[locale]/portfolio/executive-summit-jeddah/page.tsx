import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Building, Ship, Anchor, Waves } from "lucide-react";

export const metadata = {
  title: 'Executive Summit Jeddah Case Study',
  description: 'A high-level executive summit held in the coastal city of Jeddah, featuring coastal elegance and corporate precision by Saudi Event Management.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/executive-summit-jeddah' },
};

export default function ExecutiveSummitJeddah() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-blue-50">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Jeddah Executive Summit" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-primary hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="text-black text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-white/50 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-primary/20">
            Coastal Corporate Strategy
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Executive <span className="text-primary ">Summit</span> Jeddah
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">Blending the maritime heritage of the Red Sea with the future of Saudi industry. An elite gathering at the edge of the world.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Ship, label: "Venue", val: "Private Yacht Club" },
            { icon: Building, label: "Scale", val: "C-Suite Exclusive" },
            { icon: Waves, label: "Setting", val: "Red Sea Front" },
            { icon: Anchor, label: "Theme", val: "Maritime Future" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-black uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 font-light text-base leading-relaxed space-y-24">
        
        {/* Coastal Elegance */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_2.webp" alt="Jeddah Coastal Event" width={800} height={800} className="w-full h-full object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Coastal <span className="text-primary ">Elegance</span></h2>
            <p className="mb-8">
              For the Jeddah Executive Summit, we curated an environment that leveraged the city&apos;s unique relationship with the Red Sea. The challenge was to create a space that felt expansive and inspiring, yet secure and private enough for sensitive policy discussions.
            </p>
            <p>
              We designed a custom-built glass pavilion on the water's edge, allowing the sunset to serve as the backdrop for the closing gala without compromising on acoustic privacy or climate control.
            </p>
          </div>
        </div>

        {/* Operational Pillars */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-12 uppercase tracking-tight text-center">Summit <span className="text-primary ">Pillars</span></h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "White-Glove Concierge", desc: "End-to-end travel and stay management for international CEOs, including private jet terminal handling." },
              { title: "Bespoke Environment", desc: "Custom-designed furniture using sustainable materials that reflected the Red Sea's coral ecosystems." },
              { title: "Security Excellence", desc: "A seamless, 'invisible' security net that protected VIPs while maintaining a relaxed atmosphere." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white rounded-3xl border border-slate-200 hover:border-primary transition-all group">
                <h3 className="text-black text-xs font-bold uppercase tracking-widest mb-8 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-black text-white p-12 md:p-24 rounded-[4rem] text-center">
          <p className="text-xl md:text-3xl font-sans font-light  mb-10 leading-relaxed">
            "The executive summit in Jeddah was a masterclass in balance. Saudi Event Management delivered professional precision with the soul of a coastal retreat."
          </p>
          <div className="w-12 h-px bg-primary mx-auto mb-8" />
          <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">CEO, Global Logistics Forum</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Elevate Your <span className="text-primary ">Corporate Voice</span></h2>
        <Link 
          href="/#contact" 
          className="inline-block px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all rounded-xl shadow-2xl text-xs"
        >
          Partner with Our Corporate Team
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
