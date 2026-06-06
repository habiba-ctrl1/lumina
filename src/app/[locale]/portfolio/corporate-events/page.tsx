import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { ArrowRight, Briefcase, Building2, Presentation } from "lucide-react";

export const metadata = {
  title: 'Corporate Event Management Saudi Arabia | Executive Summits',
  description: 'Elite corporate event management in Saudi Arabia. We specialize in executive summits, AGMs, trade shows, and B2B matchmaking across Riyadh, Jeddah, and the GCC.',
  keywords: 'Corporate event management Saudi Arabia, Executive summits Riyadh, AGM planner KSA, B2B event management Jeddah, Trade show organizer',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/corporate-events' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Corporate Event Management Portfolio",
      "description": "Showcase of elite corporate events, executive summits, and AGMs produced by Saudi Event Management.",
      "url": "https://saudieventmanagement.com/portfolio/corporate-events",
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
            "name": "Executive Summit Jeddah",
            "url": "https://saudieventmanagement.com/portfolio/executive-summit-jeddah"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Dammam Corporate Seminar",
            "url": "https://saudieventmanagement.com/portfolio/dammam-corporate-seminar"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Corporate Events", "item": "https://saudieventmanagement.com/portfolio/corporate-events" }
      ]
    }
  ]
};

export default function CorporateEventsPortfolio() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Corporate Portfolio
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            Corporate & <span className="text-[var(--primary)]">Executive</span> Summits
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            From high-stakes board meetings to massive international trade shows, we provide military-grade logistics and unparalleled production quality for the corporate sector.
          </p>
        </div>
      </div>

      {/* NLP / GEO Methodology Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Briefcase className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Executive Summits</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">End-to-end management of AGMs, C-suite retreats, and shareholder meetings with strict confidentiality protocols.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Presentation className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">AV & Rigging</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">State-of-the-art projection mapping, LED screens, and professional stage rigging for maximum audience impact.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Building2 className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">B2B Matchmaking</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Advanced networking technologies and protocol coordination for international delegations and corporate giants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">Featured Corporate Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Global Tech Summit", loc: "Riyadh", img: "/gallery_2.webp", slug: "global-tech-summit" },
              { title: "Executive Summit", loc: "Jeddah", img: "/gallery_corporate_gala.webp", slug: "executive-summit-jeddah" },
              { title: "Corporate Seminar", loc: "Dammam", img: "/gallery_vip_party.webp", slug: "dammam-corporate-seminar" }
            ].map((item, i) => (
              <Link href={`/portfolio/${item.slug}`} key={i} className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:shadow-lg transition-all">
                <div className="h-64 overflow-hidden relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">{item.loc}</p>
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
