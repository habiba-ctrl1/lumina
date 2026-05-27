import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import WhatsAppButton from "@/components/WhatsAppButton";
import RecentEvents from "@/components/RecentEvents";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Portfolio',
  description: 'View our gallery of luxury events, weddings, and corporate summits.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio' },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <Navbar />
      
      {/* Hero Carousel (Teaser) */}
      <div className="pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-[var(--primary)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Curated Excellence</span>
            </div>
            <h1 className="font-display font-bold text-slate-900 text-3xl md:text-5xl uppercase tracking-tight">Portfolio <span className="text-[var(--primary)] font-bold">Showcase</span></h1>
          </div>
        </div>
        <RecentEvents hideHeader={true} />
      </div>

      {/* Stats Section (Trust Signal) */}
      <StatsSection />

      {/* Main Filterable Grid */}
      <FilterablePortfolio />

      {/* Testimonials (Social Proof) */}
      <Testimonials />

      {/* Final CTA Section */}
      <section className="py-32 bg-[var(--primary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.22] bg-[url('/hero_bg.webp')] bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display font-bold text-white mb-8 text-2xl md:text-4xl uppercase tracking-tight">Ready to Start Your <span className="font-bold text-teal-200">Legacy?</span></h2>
          <p className="text-slate-200 text-sm md:text-base mb-12">Let&apos;s discuss your vision and create something truly extraordinary together.</p>
          <Link 
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white text-[var(--primary)] hover:bg-slate-50 px-8 py-4 text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm rounded-md"
          >
            <span>Book Your Discovery Call</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
