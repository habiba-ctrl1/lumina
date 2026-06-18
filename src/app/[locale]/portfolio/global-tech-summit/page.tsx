import Navbar from "@/components/Navbar";
import CaseStudySchema from "@/components/CaseStudySchema";
import { hreflangAlternates } from "@/lib/seo";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Cpu, Globe, Zap, Network } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Global Tech Summit',
    description: 'Executing a massive international technology summit in Saudi Arabia with cutting-edge production by Saudi Event Management.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/global-tech-summit`,
      languages: hreflangAlternates("/portfolio/global-tech-summit"),
    },
  };
}

export default function GlobalTechSummit() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="global-tech-summit" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/tech-summit.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/20 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/30">
            Technology & Innovation
          </span>
          <h1 className="text-4xl md:text-7xl font-sans font-bold text-white mb-8 leading-tight uppercase tracking-tight">
            Global <span className="text-[var(--primary)] ">Tech</span> Summit
          </h1>
          <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">The intersection of venture capital, silicon, and Saudi Vision. A high-production benchmark for the digital age.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border-y border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Globe, label: "Delegations", val: "40+ Countries" },
            { icon: Cpu, label: "Tech Hubs", val: "12 Interactive" },
            { icon: Network, label: "Broadcasting", val: "Global Live" },
            { icon: Zap, label: "Production", val: "8K Immersive" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-base leading-relaxed space-y-24">
        
        {/* The Brief */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">The <span className="text-[var(--primary)] ">Mandate</span></h2>
            <p className="mb-8">
              Saudi Event Management was appointed to design and execute a three-day summit that would host the world&apos;s most influential tech leaders. The requirement was a "Zero-Failure" environment where infrastructure, connectivity, and hospitality merged into a single, seamless digital experience.
            </p>
            <p>
              We built a temporary smart-venue featuring biometric registration, AI-driven networking lounges, and holographic stages that allowed speakers from San Francisco to appear live in Riyadh.
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80">
            <Image src="/gallery_corporate_gala.webp" alt="Tech Summit Stage" width={800} height={450} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Solution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-12 uppercase tracking-tight">Hyper-Scale <span className="text-[var(--primary)] ">Production</span></h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Smart Networking", desc: "Using NFC-enabled badges to facilitate instant contact exchange and meeting scheduling." },
              { title: "Immersive Stage", desc: "A 360-degree LED wrap-around stage providing real-time data visualizations for keynotes." },
              { title: "Hybrid Connectivity", desc: "Ultra-low latency streaming to over 1 million viewers worldwide simultaneously." }
            ].map((item: any, i: number) => (
              <div key={i} className="bg-neutral-900 p-10 rounded-3xl text-white group hover:bg-[var(--primary)] transition-colors duration-500">
                <h4 className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest mb-8 group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-neutral-600 text-xs leading-relaxed group-hover:text-white transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-white border border-neutral-200/80 p-12 md:p-24 rounded-[4rem] flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-10">
            <CheckCircle2 size={40} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">Operational <span className="text-[var(--primary)] ">Perfection</span></h2>
          <p className="text-neutral-500 max-w-2xl font-light mb-12">
            The Global Tech Summit was lauded as the most technologically advanced event in the region's history. 100% uptime for all digital services and a 99% guest satisfaction rate solidified our position as the leaders in complex corporate production.
          </p>
          <div className="flex gap-12">
            <div>
              <div className="text-2xl font-bold text-neutral-900">1.2M</div>
              <div className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Live Viewers</div>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div>
              <div className="text-2xl font-bold text-neutral-900">500+</div>
              <div className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Startups Present</div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/corporate-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Corporate Event Management
            </Link>
            <Link href="/services/conferences" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Conference Management
            </Link>
            <Link href="/services/event-production" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Event Production
            </Link>
            <Link href="/locations/riyadh" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Corporate Events in Riyadh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">Ready to <span className="text-[var(--primary)] ">Innovate?</span></h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          Request Technical Deck
        </Link>
      </section>

      <CaseStudyCTA slug="global-tech-summit" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
