import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import { ArrowRight, Star, Quote, Shield } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Client Testimonials & Reviews | Saudi Event Management',
    description: 'Client testimonials for Saudi Event Management — a Riyadh-based platform connecting clients with a personally vetted vendor network for weddings, corporate events, and VIP experiences across Saudi Arabia.',
    keywords: [
      "Saudi Event Management Reviews",
      "Event Planner Testimonials KSA",
      "Best Event Company Reviews Riyadh",
      "Luxury Wedding Reviews Saudi Arabia"
    ],
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/testimonials`,
      languages: hreflangAlternates("/testimonials"),
    },
  };
}

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://saudieventmanagement.com/testimonials" }
      ]
    }
  ]
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Verified Client Feedback
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            What Our <span className="text-[var(--primary)]">Clients</span> Say
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] md:text-lg leading-relaxed">
            Every event is delivered through a personally vetted vendor network — here&apos;s what clients say about working with us.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Shield size={16} className="text-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">20+ Vetted Vendors</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Star size={16} className="text-[var(--primary)] fill-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">100% Vendor Vetting</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Quote size={16} className="text-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">10+ Saudi Cities Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Testimonials Carousel */}
      <section className="py-24 md:py-32 px-6 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Live <span className="text-[var(--primary)]">Feedback</span>
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to Become Our Next <span className="text-emerald-400">Success Story?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Every event starts with a personal consultation and a vetted vendor shortlist matched to your vision.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              Start Planning Your Event
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
