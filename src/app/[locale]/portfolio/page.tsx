import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import WhatsAppButton from "@/components/WhatsAppButton";
import RecentEvents from "@/components/RecentEvents";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Briefcase, Building2, Mic2, Sparkles, Layers, PartyPopper } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    // NOTE: the root layout title template appends " | Saudi Event Management",
    // so the brand is intentionally omitted here to avoid duplicating it.
    title: 'Event Portfolio — Luxury Events & Productions in Saudi Arabia',
    description: 'Explore Saudi Event Management\'s portfolio of completed corporate events, conferences, exhibitions, product launches, luxury weddings, and Vision 2030 productions across Riyadh, Jeddah, AlUla, and NEOM.',
    keywords: 'Event Portfolio Saudi Arabia, Luxury Events Gallery KSA, Corporate Events Riyadh, Exhibitions Jeddah, Conference Production, Royal Weddings, Saudi Event Management Case Studies',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio`,
      languages: hreflangAlternates("/portfolio"),
    },
  };
}

// Single source of truth for the featured projects — also powers the JSON-LD
// ItemList below so the structured data always matches the visible portfolio.
const featuredProjects = [
  { name: "Al-Saud Royal Wedding", slug: "royal-riyadh-wedding", category: "Luxury Wedding", location: "Riyadh", description: "An 800-guest royal wedding with a bespoke architectural desert oasis build and full VIP protocol." },
  { name: "NEOM Future Summit", slug: "neom-future-summit", category: "Conference", location: "NEOM", description: "A 250-VIP zero-waste luxury conference production for a leading Saudi giga-project." },
  { name: "Makkah VIP Retreat", slug: "makkah-vip-retreat", category: "VIP & Private", location: "Makkah", description: "A 10-day ultra-luxury private retreat with full security, bespoke dining, and zero-wait Haram logistics for a VIP delegation." },
  { name: "Riyadh Government Summit", slug: "riyadh-government-summit", category: "Conference", location: "Riyadh", description: "A 1,200+ delegate government summit with immersive multi-screen production and protocol management." },
  { name: "AlUla Desert Festival", slug: "alula-desert-festival", category: "Cultural Event", location: "AlUla", description: "A heritage desert festival production in AlUla blending Nabataean landscapes with contemporary staging." },
  { name: "Jeddah Executive Summit", slug: "executive-summit-jeddah", category: "Corporate Event", location: "Jeddah", description: "A 300-guest high-security diplomatic corporate summit at a prominent Jeddah venue." },
  { name: "Jeddah Seaside Wedding", slug: "jeddah-beach-wedding", category: "Luxury Wedding", location: "Jeddah", description: "A 450-guest luxury Red Sea coastal wedding production on the Jeddah seafront." },
  { name: "Al Khobar Corporate Retreat", slug: "alkhobar-corporate-retreat", category: "Corporate Event", location: "Al Khobar", description: "A 120-delegate executive team-building and branding retreat in the Eastern Province." },
  { name: "Grand Wedding Ceremony", slug: "grand-wedding-ceremony", category: "Luxury Wedding", location: "Riyadh", description: "A 600+ guest grand wedding with traditional VIP entrance protocol and full production." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Saudi Event Management Portfolio",
      "description": "Portfolio of completed corporate events, conferences, exhibitions, product launches, luxury weddings, and Vision 2030 event productions across Saudi Arabia.",
      "url": "https://saudieventmanagement.com/portfolio",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://saudieventmanagement.com/#website" },
      "about": { "@id": "https://saudieventmanagement.com/#organization" },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": featuredProjects.length,
        "itemListElement": featuredProjects.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://saudieventmanagement.com/portfolio/${p.slug}`,
          "item": {
            "@type": "CreativeWork",
            "name": p.name,
            "about": p.category,
            "description": p.description,
            "locationCreated": { "@type": "Place", "name": `${p.location}, Saudi Arabia` },
            "creator": { "@id": "https://saudieventmanagement.com/#organization" }
          }
        }))
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" }
      ]
    }
  ]
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

      {/* Introduction — AI-friendly overview of expertise & track record */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-3xl">
            <span className="section-label mb-6">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mt-5 mb-6" style={{ letterSpacing: "-0.025em" }}>
              A Portfolio Built on <span className="text-[var(--primary)]">Flawless Execution</span>
            </h2>
            <div className="space-y-5 text-neutral-600 text-[16px] leading-relaxed">
              <p>
                Saudi Event Management is a full-service event management company that has delivered 250+ events across the Kingdom since 2010. This portfolio brings together completed corporate events, government summits, conferences, exhibitions, product launches, and luxury weddings — each produced end-to-end by our in-house team.
              </p>
              <p>
                Our projects span <Link href="/locations/riyadh" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">Riyadh</Link>, Jeddah, Dammam, AlUla, and NEOM, ranging from intimate 120-guest executive retreats to 5,000-capacity Riyadh Season productions. Every event is GEA-licensed, protocol-led, and aligned with the cultural ambitions of Saudi Vision 2030.
              </p>
            </div>
          </div>

          {/* What every project includes — concise capability list in a soft card */}
          <div className="mt-12 rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-[var(--surface-raised)] to-white p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-7">What every project includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {[
                "GEA permits, licensing, and full regulatory compliance",
                "VIP protocol, security, and guest experience management",
                "Stage, AV, lighting, and immersive projection production",
                "Bespoke design, fabrication, and floral architecture",
                "Venue sourcing across Riyadh, Jeddah, AlUla, and NEOM",
                "End-to-end logistics, vendor, and budget management",
              ].map((cap) => (
                <div key={cap} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
                  <p className="text-neutral-700 text-[15px] leading-relaxed">{cap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* Event Categories We Deliver — semantic depth + internal links to services */}
      <section className="py-20 md:py-28 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5" style={{ letterSpacing: "-0.025em" }}>
              Event Categories We <span className="text-[var(--primary)]">Deliver</span>
            </h2>
            <p className="text-neutral-500 text-[16px] leading-relaxed">
              Every project in this portfolio is produced by a dedicated specialist team. Explore the full service behind each category:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Corporate Events", desc: "Galas, summits, and brand activations for leading Saudi and global organisations.", href: "/services/corporate-events" },
              { icon: Layers, title: "Exhibitions", desc: "Custom pavilion design, stand fabrication, and full-show exhibition management.", href: "/services/exhibitions" },
              { icon: Mic2, title: "Conferences & Summits", desc: "Government and executive conferences with delegate and protocol management.", href: "/services/conferences" },
              { icon: PartyPopper, title: "Luxury Weddings", desc: "Royal and high-net-worth wedding planning, design, and production.", href: "/services/weddings" },
              { icon: Sparkles, title: "Event Production", desc: "Stage, AV, lighting, and immersive show production at any scale.", href: "/services/event-production" },
              { icon: Briefcase, title: "Cultural & Vision 2030", desc: "GEA-licensed cultural activations and National Day productions.", href: "/services/cultural-events" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col p-7 rounded-2xl border border-neutral-200/80 bg-white hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 mb-5">
                  <cat.icon size={22} />
                </div>
                <h3 className="font-semibold text-neutral-900 text-[17px] mb-2 group-hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                  {cat.title}
                  <ArrowRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
              Let&apos;s discuss your vision and create something truly extraordinary together. Tell us about your event and our planners will respond within one business day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
              >
                Book Your Discovery Call
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20my%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-medium hover:bg-[#1fb855] transition-colors rounded-xl text-[14px] shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
                aria-label="Chat with Saudi Event Management on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
