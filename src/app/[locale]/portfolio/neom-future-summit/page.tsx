import Navbar from "@/components/Navbar";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, Cpu, Zap, Building2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("neom-future-summit", locale);
}

export default function NeomFutureSummitCaseStudy() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="neom-future-summit" />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/neom-summit.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-medium">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/20">
            Corporate Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
            The NEOM <span className="text-[var(--primary)] font-bold">Future Summit</span>
          </h1>
          <p className="text-neutral-300 text-lg font-light">Architecting the future of global investment in the heart of the desert.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border border-neutral-200/80 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Globe, label: "Reach", val: "Global Investors" },
            { icon: Cpu, label: "Tech", val: "AI-Integrated" },
            { icon: Zap, label: "Scale", val: "500+ VVIPs" },
            { icon: Building2, label: "Venue", val: "NEOM Tech-Hub" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-neutral-600 mb-1">{stat.label}</div>
              <div className="text-lg font-sans font-bold text-neutral-900">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-lg leading-relaxed space-y-16">
        
        {/* The Challenge */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8">The <span className="text-[var(--primary)]">Brief</span></h2>
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
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8">The <span className="text-[var(--primary)]">Execution</span></h2>
            <p className="mb-8">
              We designed a 360-degree immersive "Living Boardroom" featuring kinetic LED walls that responded to real-time data visualizations. Our team managed every aspect from private jet charters to bespoke biometric check-ins.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "AI-driven guest experience apps",
                "Holographic keynote presentations",
                "Sustainable 'Earth-to-Table' catering",
                "End-to-end encryption for all comms"
              ].map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-1" />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xl">
            <div className="absolute inset-0 bg-[var(--primary)]/10 animate-pulse" />
            <Image src="/gallery_corporate_gala.webp" alt="NEOM Tech Hub Setup" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        {/* The Result */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8">The <span className="text-[var(--primary)]">Impact</span></h2>
          <p className="mb-8 text-justify">
            The summit was hailed as a benchmark for the future of international diplomacy and corporate gathering. Post-event surveys showed a 98% satisfaction rate, with over $40B in investment pledges announced during the closing gala. Saudi Event Management's ability to blend high-tech infrastructure with the warmth of Saudi hospitality was cited as the key factor in the event's success.
          </p>
          
          {/* Testimonial */}
          <div className="bg-white border border-neutral-200/80 p-10 rounded-3xl text-center relative">
            <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[var(--primary)] text-4xl font-serif">&quot;</div>
            <p className="text-xl md:text-2xl font-sans font-bold text-neutral-800 mb-8 leading-snug">
              &quot;Saudi Event Management redefined what is possible in corporate event management. They didn&apos;t just host a summit; they created a gateway to the future.&quot;
            </p>
            <div className="text-[var(--primary)] font-medium uppercase tracking-widest text-sm">— Director of Investment, NEOM</div>
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
            <Link href="/services/destination-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Destination Event Management
            </Link>
            <Link href="/services/conferences" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Conference Management
            </Link>
            <Link href="/services/event-production" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Event Production
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8">Host Your <span className="text-[var(--primary)]">Global Milestone</span></h2>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-neutral-900 text-white font-bold uppercase tracking-widest hover:bg-[var(--primary)] transition-colors rounded-lg shadow-xl"
        >
          Request a Corporate Deck
        </Link>
      </section>

      <CaseStudyCTA slug="neom-future-summit" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
