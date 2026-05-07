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
  title: 'Event Portfolio | Lumina Events',
  description: 'View our gallery of luxury events, weddings, and corporate summits.',
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero Carousel (Teaser) */}
      <div className="pt-24 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-4 block">Curated Excellence</span>
            <h1 className="text-4xl md:text-6xl font-display text-[#041E42]">Portfolio <span className="text-shimmer italic">Showcase</span></h1>
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
      <section className="py-24 bg-[#041E42] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/hero_bg.png')] bg-cover bg-center" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display text-white mb-8">Ready to Start Your <span className="text-champagne-500 italic">Legacy?</span></h2>
          <p className="text-gray-300 text-lg mb-12 font-light">Let&apos;s discuss your vision and create something truly extraordinary together.</p>
          <Link 
            href="/#contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-champagne-500 text-[#041E42] font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all duration-700 shadow-2xl"
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
