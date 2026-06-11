import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import WhatsAppButton from "@/components/WhatsAppButton";
import RecentEvents from "@/components/RecentEvents";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Luxury Event Portfolio | Saudi Event Management',
    description: 'View our exclusive gallery of luxury events, royal weddings, and VIP corporate summits across Riyadh, Jeddah, and AlUla. Discover our award-winning event production.',
    keywords: 'Event Portfolio Saudi Arabia, Luxury Events Gallery KSA, Royal Weddings Riyadh, Corporate Summits Jeddah, Saudi Event Management Case Studies',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio`,
      languages: { "en-US": `${base}/portfolio`, "ar-SA": `${base}/ar/portfolio` },
    },
  };
}

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
      
      <InternalPageHero
        title="Portfolio"
        titleHighlight="Showcase"
        subtitle="The definitive visual testament to Saudi Event Management's execution excellence — from GEA-licensed gala productions to high-security royal wedding logistics across the Kingdom."
        backgroundImage="/luxury_wedding_couple_guests.webp"
        imageAlt="Luxury wedding guests celebrating at a grand Saudi Arabia event"
        badge="Curated Excellence"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        enableParallax
        minHeight="large"
      />

      {/* Sub-category links + carousel */}
      <div className="bg-[var(--surface-raised)] border-b border-neutral-200/80 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="prose prose-slate max-w-3xl mx-auto text-neutral-500 text-[14.5px] leading-relaxed mb-6">
              <p>
                From procuring mandatory GEA permits and VIP protocol coordination to heavy-duty stage rigging and immersive projection mapping — our methodology is built on flawless logistics wrapped in luxury aesthetics.
              </p>
            </div>
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
