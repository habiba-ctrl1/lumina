import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, Cpu, Zap, Building2 } from "lucide-react";

export const metadata = {
  title: 'NEOM Future Summit Case Study',
  description: 'How Saudi Event Management executed the NEOM Future Summit, a high-stakes corporate event in the heart of the future.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/neom-future-summit' },
};

export default function NeomFutureSummitCaseStudy() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="NEOM Future Summit" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/20">
            Corporate Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
            The NEOM <span className="text-[var(--primary)] font-bold">Future Summit</span>
          </h1>
          <p className="text-slate-600 text-lg font-light">Architecting the future of global investment in the heart of the desert.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Globe, label: "Reach", val: "Global Investors" },
            { icon: Cpu, label: "Tech", val: "AI-Integrated" },
            { icon: Zap, label: "Scale", val: "500+ VVIPs" },
            { icon: Building2, label: "Venue", val: "NEOM Tech-Hub" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-slate-600 mb-1">{stat.label}</div>
              <div className="text-lg font-sans font-bold text-slate-900">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-600 font-light text-lg leading-relaxed space-y-16">
        
        {/* The Challenge */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mb-8">The <span className="text-[var(--primary)]">Brief</span></h2>
          <p className="mb-8">
            Saudi Event Management was commissioned by the NEOM Investment Authority to execute a two-day high-level summit for 500 global CEOs, tech pioneers, and sovereign wealth fund managers. The challenge was to create an environment that felt both hyper-futuristic and deeply hospitable, reflecting NEOM's identity as the intersection of nature and technology.
          </p>
          <p>
            The project required a zero-latency AV setup, multi-language simultaneous translation for 12 languages, and a carbon-neutral footprint in accordance with NEOM's sustainability protocols.
          </p>
        </div>

        {/* The Solution */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mb-8">The <span className="text-[var(--primary)]">Execution</span></h2>
            <p className="mb-8">
              We designed a 360-degree immersive "Living Boardroom" featuring kinetic LED walls that responded to real-time data visualizations. Our team managed every aspect from private jet charters to bespoke biometric check-ins.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "AI-driven guest experience apps",
                "Holographic keynote presentations",
                "Sustainable 'Earth-to-Table' catering",
                "End-to-end encryption for all comms"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-1" />
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <div className="absolute inset-0 bg-[var(--primary)]/10 animate-pulse" />
            <Image src="/gallery_corporate_gala.webp" alt="NEOM Tech Hub Setup" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Result */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mb-8">The <span className="text-[var(--primary)]">Impact</span></h2>
          <p className="mb-8 text-justify">
            The summit was hailed as a benchmark for the future of international diplomacy and corporate gathering. Post-event surveys showed a 98% satisfaction rate, with over $40B in investment pledges announced during the closing gala. Saudi Event Management's ability to blend high-tech infrastructure with the warmth of Saudi hospitality was cited as the key factor in the event's success.
          </p>
          
          {/* Testimonial */}
          <div className="bg-white border border-slate-200 p-10 rounded-3xl text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[var(--primary)] text-4xl font-serif">&quot;</div>
            <p className="text-xl md:text-2xl font-sans font-bold text-slate-800 mb-8 leading-snug">
              &quot;Saudi Event Management redefined what is possible in corporate event management. They didn&apos;t just host a summit; they created a gateway to the future.&quot;
            </p>
            <div className="text-[var(--primary)] font-medium uppercase tracking-widest text-sm">— Director of Investment, NEOM</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mb-8">Host Your <span className="text-[var(--primary)]">Global Milestone</span></h2>
        <Link 
          href="/#contact" 
          className="inline-block px-10 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[var(--primary)] transition-colors rounded-lg shadow-xl"
        >
          Request a Corporate Deck
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
