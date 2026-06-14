import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { Crown, Heart, Sparkles, Flower2, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Luxury Wedding Planners Saudi Arabia | Royal Weddings',
    description: 'Saudi Event Management crafts the most exclusive luxury weddings and royal ceremonies in Riyadh, Jeddah, and AlUla. Complete VIP bridal services and kosha design.',
    keywords: 'Luxury wedding planners Riyadh, Royal weddings Saudi Arabia, VIP wedding organizer KSA, Kosha design Riyadh, Destination weddings AlUla',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/luxury-weddings`,
      languages: { "en-US": `${base}/portfolio/luxury-weddings`, "ar-SA": `${base}/ar/portfolio/luxury-weddings` },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Luxury Wedding Portfolio",
      "description": "Showcase of elite royal weddings and VIP luxury ceremonies produced by Saudi Event Management.",
      "url": "https://saudieventmanagement.com/portfolio/luxury-weddings",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Royal Wedding in Riyadh",
            "url": "https://saudieventmanagement.com/portfolio/royal-riyadh-wedding"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Riyadh Luxury Soiree",
            "url": "https://saudieventmanagement.com/portfolio/riyadh-luxury-soiree"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Luxury Weddings", "item": "https://saudieventmanagement.com/portfolio/luxury-weddings" }
      ]
    }
  ]
};

export default function LuxuryWeddingsPortfolio() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      
      <InternalPageHero
        title="Royal Wedding Portfolio"
        subtitle="We orchestrate the Kingdom's most magnificent weddings, blending breathtaking floral architecture with absolute discretion and flawless execution."
        backgroundImage="/luxury_wedding_couple_guests.webp"
        imageAlt="Luxury royal weddings Saudi Arabia portfolio"
        badge="Luxury Weddings Portfolio"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Luxury Weddings" },
        ]}
        minHeight="standard"
      />

      {/* NLP / GEO Methodology Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Crown className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Royal Protocol</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Absolute privacy, high-security clearance, and seamless protocol management for royal family members and VVIP guests.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Flower2 className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Kosha Design</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Architectural stage building and ceiling-to-floor floral installations crafted by world-renowned designers.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Sparkles className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Zaffah Choreography</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Orchestration of grand entrances featuring top-tier regional performers and synchronized ambient lighting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">Featured Wedding Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Royal Wedding", loc: "Riyadh", img: "/gallery_2.webp", slug: "royal-riyadh-wedding" },
              { title: "Luxury Soiree", loc: "Riyadh", img: "/gallery_destination_wedding.webp", slug: "riyadh-luxury-soiree" }
            ].map((item, i) => (
              <Link href={`/portfolio/${item.slug}`} key={i} className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:shadow-lg transition-all">
                <div className="h-80 overflow-hidden relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 text-center">
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">{item.loc}</p>
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/weddings" className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury Wedding Planning
            </Link>
            <Link href="/services/royal-weddings" className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Royal Weddings &amp; Ceremonies
            </Link>
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury &amp; VIP Events
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/gallery_destination_wedding.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to Plan Your <span className="text-emerald-400">Royal Wedding?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Speak with our senior bridal consultants to design a magnificent celebration.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] group"
            >
              Book Your Bridal Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
