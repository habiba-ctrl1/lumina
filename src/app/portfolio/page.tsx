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
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />
      
      {/* Hero Carousel (Teaser) */}
      <div className="pt-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Curated Excellence</span>
            <h1 className="font-display font-medium text-slate-900 text-3xl md:text-5xl">Portfolio <span className="text-shimmer italic font-semibold">Showcase</span></h1>
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
      <section className="py-24 bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/hero_bg.webp')] bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display font-medium text-white mb-8 text-2xl md:text-4xl">Ready to Start Your <span className="text-shimmer italic font-semibold text-white">Legacy?</span></h2>
          <p className="text-slate-200 text-sm md:text-base mb-12">Let&apos;s discuss your vision and create something truly extraordinary together.</p>
          <Link 
            href="/#contact"
            className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
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
