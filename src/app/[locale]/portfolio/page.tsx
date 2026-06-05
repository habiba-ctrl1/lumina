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
  title: 'Luxury Event Portfolio',
  description: 'View our gallery of luxury events, weddings, and corporate summits.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio' },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
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
            <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl" style={{ letterSpacing: "-0.025em" }}>
              Portfolio <span className="text-[var(--primary)]">Showcase</span>
            </h1>
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
