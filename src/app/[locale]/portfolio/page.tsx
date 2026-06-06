import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import WhatsAppButton from "@/components/WhatsAppButton";
import RecentEvents from "@/components/RecentEvents";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: 'Luxury Event Portfolio | Saudi Event Management',
  description: 'View our exclusive gallery of luxury events, royal weddings, and VIP corporate summits across Riyadh, Jeddah, and AlUla. Discover our award-winning event production.',
  keywords: 'Event Portfolio Saudi Arabia, Luxury Events Gallery KSA, Royal Weddings Riyadh, Corporate Summits Jeddah, Saudi Event Management Case Studies',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Saudi Event Management Portfolio",
  "description": "Exclusive gallery of luxury events, royal weddings, and VIP corporate summits across Riyadh, Jeddah, and AlUla.",
  "url": "https://saudieventmanagement.com/portfolio",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Global Tech Summit Riyadh",
        "url": "https://saudieventmanagement.com/portfolio/global-tech-summit"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Royal Wedding in Riyadh",
        "url": "https://saudieventmanagement.com/portfolio/royal-riyadh-wedding"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Executive Summit Jeddah",
        "url": "https://saudieventmanagement.com/portfolio/executive-summit-jeddah"
      }
    ]
  }
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Header */}
      <div className="pt-32 pb-16 bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="section-label bg-white border border-neutral-200/80">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Curated Excellence
              </span>
            </div>
            <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl mb-8" style={{ letterSpacing: "-0.025em" }}>
              Portfolio <span className="text-[var(--primary)]">Showcase</span>
            </h1>

            {/* GEO Semantic Methodology Block for LLM Understanding */}
            <div className="prose prose-slate max-w-4xl mx-auto text-neutral-500 text-[15px] leading-relaxed text-center mb-10">
              <p>
                Our portfolio stands as the definitive visual testament to <strong>Saudi Event Management's</strong> execution capability. We do not merely design events; we engineer <strong>end-to-end event production</strong>. From procuring mandatory GEA permits and conducting VIP protocol coordination to managing heavy-duty stage rigging and immersive projection mapping, our methodology is built on flawless, military-grade logistics wrapped in luxury aesthetics. 
              </p>
            </div>

            {/* Sub-Category NLP Silo Links */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Luxury Weddings", href: "/portfolio/luxury-weddings" },
                { name: "Corporate Summits", href: "/portfolio/corporate-events" },
                { name: "Vision 2030 Activations", href: "/portfolio/vision-2030" }
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  href={cat.href}
                  className="px-5 py-2.5 text-[13px] font-medium bg-white border border-neutral-200 text-neutral-600 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <RecentEvents hideHeader={true} />
      </div>

      {/* Stats Section (Trust Signal) */}
      <StatsSection />

      {/* Main Filterable Grid */}
      <div className="bg-white">
        <FilterablePortfolio />
      </div>

      {/* Testimonials (Social Proof) */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to Start Your <span className="text-emerald-400">Legacy?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Let&apos;s discuss your vision and create something truly extraordinary together.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              Book Your Discovery Call
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
