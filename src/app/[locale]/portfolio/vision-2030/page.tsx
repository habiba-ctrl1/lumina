import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { Compass, Landmark, ShieldCheck } from "lucide-react";

export const metadata = {
  title: 'Vision 2030 & Cultural Events Management KSA',
  description: 'Specialized in government-level cultural activations, Riyadh Season events, and heritage tourism festivals in AlUla. Full GEA permit management.',
  keywords: 'Saudi Vision 2030 events, Riyadh Season event management, AlUla festival planner, GEA event permits KSA, Government event management Saudi Arabia',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/vision-2030' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Vision 2030 Cultural Activations Portfolio",
      "description": "Showcase of government and cultural activations aligned with Saudi Vision 2030, managed by Saudi Event Management.",
      "url": "https://saudieventmanagement.com/portfolio/vision-2030",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AlUla Desert Festival",
            "url": "https://saudieventmanagement.com/portfolio/alula-desert-festival"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "NEOM Future Summit",
            "url": "https://saudieventmanagement.com/portfolio/neom-future-summit"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Vision 2030", "item": "https://saudieventmanagement.com/portfolio/vision-2030" }
      ]
    }
  ]
};

export default function Vision2030Portfolio() {
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
              Cultural Portfolio
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            Vision 2030 <span className="text-[var(--primary)]">Activations</span>
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Supporting the Kingdom's cultural renaissance by executing mega-events, heritage festivals, and tourism initiatives with flawless precision.
          </p>
        </div>
      </div>

      {/* NLP / GEO Methodology Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <ShieldCheck className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">GEA Compliance</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">End-to-end management of General Entertainment Authority permits, safety protocols, and crowd control for public festivals.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Landmark className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Heritage Sites</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Specialized logistics for operating in UNESCO World Heritage sites like AlUla and Diriyah without environmental impact.</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Compass className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Mega Projects</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">Dedicated production teams for NEOM, Red Sea Global, and Qiddiya launches and milestone celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">Featured Cultural Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "AlUla Desert Festival", loc: "AlUla", img: "/gallery_destination_wedding.webp", slug: "alula-desert-festival" },
              { title: "NEOM Future Summit", loc: "NEOM", img: "/gallery_corporate_gala.webp", slug: "neom-future-summit" }
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

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
