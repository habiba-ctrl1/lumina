import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Star, Crown, Gem, MapPin, Music, Shield, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury VIP Event Planning Saudi Arabia | Royal & HNWI Experiences",
  description:
    "Exclusive luxury event planning and VIP concierge services in Riyadh, Jeddah, and AlUla. We specialise in private parties, royal family events, HNWI experiences, and ultra-luxury desert and yacht events.",
  keywords: [
    "VIP event planning Saudi Arabia",
    "Luxury events Riyadh",
    "Private party planner Jeddah",
    "Royal family event management KSA",
    "HNWI event concierge Saudi Arabia",
    "Luxury yacht events Red Sea",
    "Exclusive launch events KSA",
    "AlUla private event planner",
    "فعاليات كبار الشخصيات السعودية",
  ],
  alternates: {
    canonical: "https://saudieventmanagement.com/services/luxury-vip-events",
    languages: {
      "en-US": "https://saudieventmanagement.com/services/luxury-vip-events",
      "ar-SA": "https://saudieventmanagement.com/ar/services/luxury-vip-events",
    },
  },
  openGraph: {
    title: "Luxury VIP Event Planning Saudi Arabia | Saudi Event Management",
    description:
      "Ultra-discreet luxury event planning for royal families, HNWIs, and diplomatic guests across Saudi Arabia.",
    url: "https://saudieventmanagement.com/services/luxury-vip-events",
    images: [{ url: "/gallery_charity_gala.webp", width: 1200, height: 630, alt: "Luxury VIP Events Saudi Arabia" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Luxury VIP Event Experiences Saudi Arabia",
      "description":
        "Exclusive luxury event planning and VIP concierge services for royal families, HNWIs, and diplomatic guests across Riyadh, Jeddah, AlUla, and the Red Sea.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "image": "https://www.saudieventmanagement.com/gallery_charity_gala.webp",
        "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
        "telephone": "+966501234567",
      },
      "areaServed": ["Riyadh", "Jeddah", "AlUla", "Red Sea", "NEOM", "Saudi Arabia"],
      "serviceType": "Luxury Event Management",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you ensure confidentiality for VIP and Royal family events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous background vetting and digital security training. We implement stringent access controls, encrypted communications, and secure perimeter management to ensure absolute privacy for all VIP and royal family events.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you arrange private concerts with international artists in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Through our global talent agency networks, we negotiate and manage private appearances by A-list international musicians, speakers, and performers. We handle all technical riders, artist hospitality, private aviation, and production requirements.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you provide close protection and security for VIP events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We co-ordinate with top-tier private security firms and government protocol offices to provide seamless close-protection, secure perimeter management, motorcade co-ordination, and discreet crowd management for HNWI and diplomatic events.",
          },
        },
        {
          "@type": "Question",
          "name": "What venues do you use for luxury VIP events in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We secure exclusive access to Saudi Arabia's most prestigious private venues — including the Ritz-Carlton Riyadh (used for high-level state events), Four Seasons Riyadh, Rosewood Jeddah, the Maraya concert hall in AlUla, and bespoke private estates and desert locations across the Kingdom.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you organise ultra-luxury desert experiences in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AlUla is one of our signature destinations for luxury events. We design bespoke glamping experiences, private desert dinners beneath the stars, heritage site activations, and high-end corporate retreats — all in collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact protocols.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you offer event planning for HNWI private residences?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Saudi Event Management regularly plans and executes private events at royal palaces, luxury residential compounds, and private estates. We bring our full production capability — catering, staging, entertainment, floral, and decor — directly to the client's private property.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the most exclusive experience you can offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our most exclusive offerings include private concerts with international artists at custom-built stages in AlUla's Hejaz mountains, superyacht events along the Red Sea, and invitation-only brand unveilings with bespoke 360° LED immersive environments — all managed with absolute discretion.",
          },
        },
        {
          "@type": "Question",
          "name": "luxury event planner near me Riyadh",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is based in Riyadh with a dedicated luxury events division. We are the premier luxury event planner for high-profile clients across the capital, offering white-glove service from initial consultation to on-day execution.",
          },
        },
        {
          "@type": "Question",
          "name": "VIP concierge service Saudi Arabia",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our VIP concierge services cover every detail — private chef arrangements, luxury fleet transportation, helicopter transfers, hotel suite buyouts, bespoke gifting, and 24/7 dedicated event manager support for every VIP guest.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Luxury & VIP Events", "item": "https://saudieventmanagement.com/services/luxury-vip-events" },
      ],
    },
  ],
};

const services = [
  { icon: Crown, title: "Royal Family Events", desc: "Discreet and flawless execution of private gatherings for royal family members — complete confidentiality, military-grade security co-ordination, and protocol compliance." },
  { icon: Gem, title: "HNWI Concierge", desc: "End-to-end event concierge for High-Net-Worth Individuals: international talent booking, private chef arrangements, luxury fleet, and 24/7 dedicated manager support." },
  { icon: MapPin, title: "Yacht & Desert Experiences", desc: "Curated ultra-luxury events aboard private superyachts on the Red Sea, or bespoke glamping and stargazing dinners in AlUla's pristine desert landscape." },
  { icon: Star, title: "Exclusive Brand Launches", desc: "High-impact, invitation-only brand unveilings for luxury automotive, haute couture, fine jewellery, and prestige spirits — crafted for social and media amplification." },
  { icon: Music, title: "Private Concerts", desc: "Securing A-list international and regional artists for intimate private performances — full rider management, private aviation, stage production, and broadcast rights." },
  { icon: Shield, title: "VIP Protocol & Security", desc: "Expert diplomatic protocol management, close-protection co-ordination with certified security firms, secure transport, and perimeter access control." },
];

const geoHighlights = [
  { location: "Riyadh", desc: "Ritz-Carlton Royal Suite, Al Murabba Palace, and exclusive penthouses at Al Faisaliah Tower.", tag: "Capital VIP Events" },
  { location: "Jeddah", desc: "Superyacht charters on the Red Sea, Rosewood beachfront events, and rooftop galas above the Corniche.", tag: "Coastal Luxury" },
  { location: "AlUla", desc: "Private dinners at Maraya, desert glamping in Hegra, and bespoke experiences in the Hejaz mountains.", tag: "Heritage Destinations" },
  { location: "NEOM", desc: "Forward-thinking luxury summits and private retreats inside Saudi Arabia's $500B giga-project.", tag: "Innovation Retreats" },
];

const resources = [
  { title: "The Saudi VIP event planning guide: venues, protocols & NDAs", desc: "How to navigate privacy, security, and protocol for high-profile private events in the Kingdom." },
  { title: "Luxury event trends in Saudi Arabia 2025", desc: "From ultra-luxury desert glamping to superyacht experiences — what HNWI clients are requesting." },
  { title: "How to book international artists for private events in Saudi Arabia", desc: "Talent rider requirements, GEA permits, visa facilitation, and fee expectations." },
  { title: "Saudi Arabia's finest venues for ultra-luxury private events", desc: "An exclusive guide to palace estates, heritage sites, and bespoke desert venues." },
];

export default function LuxuryVIPEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-ink-950 overflow-hidden pt-20">
        <Navbar />

        <InternalPageHero
          title="Luxury VIP Event Management"
          titleHighlight="Saudi Arabia"
          subtitle="The leading luxury event planner for VIPs, Royal Families, and High-Net-Worth Individuals — strictly confidential, ultra-luxury experiences from private concerts and yacht parties to bespoke desert events in AlUla."
          backgroundImage="/jeddah_luxury_people.webp"
          imageAlt="Luxury VIP event planning Saudi Arabia — royal and HNWI experiences"
          badge="VIP & Luxury Events"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Luxury VIP Events" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg"
            >
              Request Private Consultation
            </Link>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-10 border-y border-white/5 bg-ink-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-white text-xs font-bold tracking-widest">RITZ-CARLTON</span>
              <span className="text-white text-xs font-bold tracking-widest">FOUR SEASONS</span>
              <span className="text-white text-xs font-bold tracking-widest">ROSEWOOD JEDDAH</span>
              <span className="text-white text-xs font-bold tracking-widest">MARAYA — ALULA</span>
              <span className="text-white text-xs font-bold tracking-widest">RCU PARTNER</span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-display text-white mb-4">
              Bespoke <span className="text-gold-400 italic">Experiences</span>
            </h2>
            <div className="w-16 h-px bg-gold-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-ink-900/50 border border-white/5 p-8 rounded-sm hover:border-gold-400/30 transition-all duration-500 group"
              >
                <s.icon size={32} className="text-gold-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4 uppercase tracking-wider">{s.title}</h3>
                <p className="text-sand-400 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── GEO Highlights ── */}
        <section className="py-32 bg-ink-900 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-display text-white mb-4">
                Iconic <span className="text-gold-400 italic">Destinations</span>
              </h2>
              <p className="text-sand-400 text-sm max-w-2xl mx-auto">
                Each location in the Kingdom presents a unique canvas for ultra-luxury experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {geoHighlights.map((geo, i) => (
                <div key={i} className="border border-white/5 rounded-sm p-6 hover:border-gold-400/20 transition-all">
                  <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold block mb-3">{geo.tag}</span>
                  <h3 className="text-white font-bold text-lg mb-3">{geo.location}</h3>
                  <p className="text-sand-500 text-xs leading-relaxed">{geo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-32 bg-ink-950 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-display font-bold text-white">
                  VIP Planning <br />
                  <span className="text-gold-400 italic">Resources</span>
                </h3>
                <p className="text-sand-500 text-sm leading-relaxed">
                  Insider knowledge for the Kingdom's most discerning event clients.
                </p>
                <Link href="/blog" className="inline-block text-gold-400 text-xs font-bold uppercase tracking-widest border-b border-gold-400 pb-1">
                  View All Guides
                </Link>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">H.H. Protocol Affairs Team</p>
                  <p className="text-sand-500 text-[10px] uppercase tracking-widest">Diplomatic & VIP Events Division</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((r, i) => (
                  <div
                    key={i}
                    className="p-6 bg-ink-900 rounded-sm hover:bg-gold-400/5 transition-colors cursor-pointer group border border-white/5"
                  >
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-gold-400 transition-colors">
                      {r.title}
                    </h4>
                    <p className="text-sand-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-32 bg-ink-900 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl md:text-4xl font-display text-white mb-16">
              تجارب <span className="text-gold-400 italic">لا تُنسى</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { ar: "مخطط فعاليات كبار الشخصيات الرياض", en: "VIP Event Planner Riyadh", desc: "خدمات تنظيم فعاليات خاصة بأعلى معايير الفخامة والخصوصية في العاصمة." },
                { ar: "فعاليات فاخرة العُلا والبحر الأحمر", en: "Luxury Events AlUla & Red Sea", desc: "تجارب فريدة من نوعها في أجمل وجهات المملكة الطبيعية والتراثية." },
                { ar: "خدمة كونسيرج خاصة السعودية", en: "Private Concierge Service KSA", desc: "رعاية شاملة لكل تفصيل في حفلاتكم الخاصة بسرية ودقة مطلقة." },
              ].map((item) => (
                <div key={item.en} className="border border-white/5 rounded-sm p-8 hover:border-gold-400/20 transition-all">
                  <h3 className="text-gold-400 font-bold text-xl mb-3">{item.ar}</h3>
                  <p className="text-sand-500 text-xs mb-4">{item.en}</p>
                  <p className="text-sand-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-ink-950 border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-white mb-4">
                VIP Events <span className="text-gold-400 italic">FAQ</span>
              </h2>
              <div className="w-12 h-px bg-gold-400/50 mx-auto" />
            </div>
            <div className="space-y-6">
              {[
                { q: "How do you ensure confidentiality for VIP and Royal family events?", a: "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous background vetting and digital security training. We implement stringent access controls, encrypted communications, and secure perimeter management." },
                { q: "Can you arrange private concerts with international artists in Saudi Arabia?", a: "Yes. Through our global talent agency networks, we negotiate and manage private appearances by A-list international musicians and performers, handling all rider requirements, private aviation, and technical production." },
                { q: "Do you provide close protection and security for VIP events?", a: "We co-ordinate with top-tier private security firms and government protocol offices for seamless close-protection, secure perimeter management, motorcade co-ordination, and discreet crowd management." },
                { q: "What venues do you use for luxury VIP events in Saudi Arabia?", a: "We secure exclusive access to Saudi Arabia's most prestigious venues including the Ritz-Carlton Riyadh, Four Seasons, Rosewood Jeddah, Maraya Concert Hall in AlUla, and bespoke private estates across the Kingdom." },
                { q: "Can you organise ultra-luxury desert experiences in AlUla?", a: "Yes. AlUla is one of our signature VIP destinations. We design private desert dinners, glamping experiences, and heritage site activations in full collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact operations." },
                { q: "Do you offer event planning for HNWI private residences?", a: "Yes. We regularly plan and execute private events at royal palaces, luxury compounds, and private estates across the Kingdom — bringing our full production capability directly to the client's private property." },
                { q: "What is the most exclusive experience you can offer?", a: "Our most exclusive offerings include private concerts with international artists at custom-built stages in AlUla's Hejaz mountains, superyacht events along the Red Sea coastline, and invitation-only brand unveilings with bespoke 360° immersive environments." },
                { q: "luxury event planner near me Riyadh", a: "Saudi Event Management's VIP division is headquartered in Riyadh, providing white-glove event planning services for high-profile clients across the capital with immediate on-site availability." },
                { q: "VIP concierge service Saudi Arabia", a: "Our VIP concierge services cover every detail — private chef arrangements, luxury fleet transportation, helicopter transfers, hotel suite buyouts, bespoke gifting, and a 24/7 dedicated event manager for every VIP guest." },
              ].map((faq, i) => (
                <div key={i} className="bg-ink-950 p-8 border border-white/5 rounded-sm">
                  <h3 className="text-lg font-medium text-white mb-3">{faq.q}</h3>
                  <p className="text-sand-400 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-ink-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-widest">
              Related Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Destination Events", slug: "destination-events", desc: "AlUla, NEOM, Red Sea coastal — breathtaking locations for extraordinary events." },
                { title: "Luxury Weddings", slug: "weddings", desc: "Royal weddings and bespoke social celebrations at Saudi Arabia's finest venues." },
                { title: "Corporate Events", slug: "corporate-events", desc: "Executive retreats and high-level board events with full VIP protocol management." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-ink-900 border border-white/5 rounded-sm p-6 hover:border-gold-400/30 transition-all"
                >
                  <h4 className="text-white font-bold mb-2 group-hover:text-gold-400 transition-colors">{rel.title}</h4>
                  <p className="text-sand-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-400 text-xs font-bold flex items-center gap-1">
                    Learn More <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
