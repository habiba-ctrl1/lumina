import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import { Star, Crown, Gem, MapPin, Music, Shield, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/services/luxury-vip-events`;
  return {
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
      canonical: path,
      languages: {
        "en-US": `${base}/services/luxury-vip-events`,
        "ar-SA": `${base}/ar/services/luxury-vip-events`,
      },
    },
    openGraph: {
      title: "Luxury VIP Event Planning Saudi Arabia | Saudi Event Management",
      description: "Ultra-discreet luxury event planning for royal families, HNWIs, and diplomatic guests across Saudi Arabia.",
      url: path,
      images: [{ url: "/services/gallery_charity_gala.webp", width: 1200, height: 630, alt: "Luxury VIP Events Saudi Arabia" }],
    },
  };
}

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
        "image": "https://www.saudieventmanagement.com/services/gallery_charity_gala.webp",
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
  { title: "AlUla Events Guide: Maraya, Hegra & Desert Experience Planning", desc: "How to access Maraya for private events, plan Hegra heritage dinners, and navigate RCU permits.", href: "/blog/alula-events-guide-maraya-hegra-desert" },
  { title: "The Golden Thread: Weaving Luxury Lifestyle into Saudi Arabia's Top-tier Events", desc: "From bespoke concierge services to invitation-only galas — the Saudi VIP lifestyle guide.", href: "/blog/weaving-exceptional-lifestyle-saudi-arabia-top-tier-events" },
  { title: "VIP Executive Retreats in NEOM: A 2026 Guide", desc: "Strategies for hosting unforgettable VIP executive retreats in NEOM's cutting-edge developments.", href: "/blog/vip-executive-retreats-neom-2026" },
  { title: "Best Corporate Event Venues in Riyadh 2026", desc: "An exclusive guide to the Kingdom's premier venues — KAFD, Ritz-Carlton, and five-star hotel ballrooms.", href: "/blog/best-corporate-event-venues-riyadh-2026" },
];

const faqs = [
  { q: "How do you ensure confidentiality for VIP and Royal family events?", a: "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous background vetting and digital security training. We implement stringent access controls, encrypted communications, and secure perimeter management." },
  { q: "Can you arrange private concerts with international artists in Saudi Arabia?", a: "Yes. Through our global talent agency networks, we negotiate and manage private appearances by A-list international musicians and performers, handling all rider requirements, private aviation, and technical production." },
  { q: "Do you provide close protection and security for VIP events?", a: "We co-ordinate with top-tier private security firms and government protocol offices for seamless close-protection, secure perimeter management, motorcade co-ordination, and discreet crowd management." },
  { q: "What venues do you use for luxury VIP events in Saudi Arabia?", a: "We secure exclusive access to Saudi Arabia's most prestigious venues including the Ritz-Carlton Riyadh, Four Seasons, Rosewood Jeddah, Maraya Concert Hall in AlUla, and bespoke private estates across the Kingdom." },
  { q: "Can you organise ultra-luxury desert experiences in AlUla?", a: "Yes. AlUla is one of our signature VIP destinations. We design private desert dinners, glamping experiences, and heritage site activations in full collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact operations." },
  { q: "Do you offer event planning for HNWI private residences?", a: "Yes. We regularly plan and execute private events at royal palaces, luxury compounds, and private estates across the Kingdom — bringing our full production capability directly to the client's private property." },
  { q: "What is the most exclusive experience you can offer?", a: "Our most exclusive offerings include private concerts with international artists at custom-built stages in AlUla's Hejaz mountains, superyacht events along the Red Sea coastline, and invitation-only brand unveilings with bespoke 360° immersive environments." },
  { q: "luxury event planner near me Riyadh", a: "Saudi Event Management's VIP division is headquartered in Riyadh, providing white-glove event planning services for high-profile clients across the capital with immediate on-site availability." },
  { q: "VIP concierge service Saudi Arabia", a: "Our VIP concierge services cover every detail — private chef arrangements, luxury fleet transportation, helicopter transfers, hotel suite buyouts, bespoke gifting, and a 24/7 dedicated event manager for every VIP guest." },
];

export default function LuxuryVIPEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white overflow-hidden">
        <Navbar />

        <InternalPageHero
          title="Luxury VIP Event Management"
          titleHighlight="Saudi Arabia"
          subtitle="The leading luxury event planner for VIPs, Royal Families, and High-Net-Worth Individuals — strictly confidential, ultra-luxury experiences from private concerts and yacht parties to bespoke desert events in AlUla."
          backgroundImage="/services/vip_private_event_saudi.webp"
          imageAlt="Luxury VIP event planning Saudi Arabia — private majlis reception with Arabic coffee service for royal and HNWI guests"
          badge="VIP & Luxury Events"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Luxury VIP Events" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "100%", label: "Confidential · NDA Protected" },
            { value: "24/7", label: "Dedicated VIP Concierge" },
            { value: "A-List", label: "International Talent Access" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#private-consultation"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-gold-700 text-white font-semibold uppercase tracking-widest hover:bg-gold-800 transition-all shadow-[0_4px_14px_rgba(127,102,66,0.3)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              Request Private Consultation
            </Link>
            <a
              href="https://wa.me/966501234567?text=Hi%2C%20I%27d%20like%20a%20private%20VIP%20event%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-gold-700 hover:text-gold-700 transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> Discreet WhatsApp
            </a>
          </div>
        </div>

        {/* ── Credentials Bar ── */}
        <section className="py-9 border-b border-neutral-200/80 bg-[var(--surface-warm)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[11px] font-bold tracking-[0.18em] text-neutral-400">
              <span className="hover:text-gold-700 transition-colors">RITZ-CARLTON</span>
              <span className="hover:text-gold-700 transition-colors">FOUR SEASONS</span>
              <span className="hover:text-gold-700 transition-colors">ROSEWOOD JEDDAH</span>
              <span className="hover:text-gold-700 transition-colors">MARAYA — ALULA</span>
              <span className="hover:text-gold-700 transition-colors">RCU PARTNER</span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700 mb-4">
                <span className="w-5 h-px bg-gold-400" /> The VIP Division
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Bespoke <span className="text-gold-700">experiences</span>
              </h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                Discreet, white-glove planning for the Kingdom&apos;s most discerning clients — every detail
                anticipated, every confidence kept.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200/80 p-8 rounded-2xl hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.18)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5 group-hover:bg-gold-700 transition-colors">
                    <s.icon size={22} className="text-gold-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GEO Highlights ── */}
        <section className="py-24 md:py-28 bg-[var(--surface-warm)] border-y border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700 mb-4">
                <span className="w-5 h-px bg-gold-400" /> Where We Create
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Iconic <span className="text-gold-700">destinations</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-sm max-w-2xl mx-auto">
                Each location in the Kingdom presents a unique canvas for ultra-luxury experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {geoHighlights.map((geo, i) => (
                <div key={i} className="bg-white border border-neutral-200/80 rounded-2xl p-7 hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all">
                  <span className="text-[10px] text-gold-700 uppercase tracking-widest font-bold block mb-3">{geo.tag}</span>
                  <h3 className="text-neutral-900 font-bold text-lg mb-3">{geo.location}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{geo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRIVATE CONSULTATION / LEAD FORM (exclusive obsidian band) ── */}
        <section id="private-consultation" className="py-24 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #131310 0%, #1c1a14 55%, #2a251a 100%)" }}>
          <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-gold-400/[0.06] pointer-events-none" />
          <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-gold-400/[0.04] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gold-300">
                  <span className="w-6 h-px bg-gold-400" /> By Invitation · Strictly Private
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  Begin a confidential<br />
                  <span className="text-gold-300">conversation.</span>
                </h2>
                <p className="text-white/65 text-base leading-relaxed max-w-md">
                  Share a few discreet details and the Director of our VIP Division will personally reach out
                  within two hours. Every enquiry is protected under NDA from first contact.
                </p>
                <ul className="space-y-3.5 pt-2">
                  {[
                    "NDA-protected from the very first message",
                    "Dedicated 24/7 VIP event director",
                    "Exclusive access to Maraya, Ritz-Carlton & private estates",
                    "A-list talent, private aviation & close protection",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-gold-300 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-bold text-sm">H.H. Protocol Affairs Team</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">Diplomatic &amp; VIP Events Division</p>
                </div>
              </div>
              <ServiceLeadForm
                source="luxury_vip_events_page"
                defaultEventType="Luxury & VIP Event"
                eyebrow="Private Enquiry"
                heading="Request a private consultation"
                subheading="Confidential and discreet. The Director of our VIP Division will respond personally within 2 hours."
                submitLabel="Request Private Consultation"
                eventTypeOptions={[
                  "Royal Family Event",
                  "HNWI Private Celebration",
                  "Private Concert",
                  "Yacht / Desert Experience",
                  "Exclusive Brand Launch",
                  "Diplomatic / Protocol Event",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-24 md:py-28 bg-white border-b border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700">
                  <span className="w-5 h-px bg-gold-400" /> Insider Knowledge
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">
                  VIP planning <br />
                  <span className="text-gold-700">resources</span>
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  Insider knowledge for the Kingdom&apos;s most discerning event clients.
                </p>
                <Link href="/blog" className="inline-block text-gold-700 text-xs font-bold uppercase tracking-widest border-b border-gold-400 pb-1">
                  View All Guides
                </Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="p-6 bg-[var(--surface-warm)] border border-gold-200/50 rounded-2xl hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all cursor-pointer group block"
                  >
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-gold-700 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-24 md:py-28 bg-[var(--surface-warm)] border-b border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-16">
              تجارب <span className="text-gold-700">لا تُنسى</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { ar: "مخطط فعاليات كبار الشخصيات الرياض", en: "VIP Event Planner Riyadh", desc: "خدمات تنظيم فعاليات خاصة بأعلى معايير الفخامة والخصوصية في العاصمة." },
                { ar: "فعاليات فاخرة العُلا والبحر الأحمر", en: "Luxury Events AlUla & Red Sea", desc: "تجارب فريدة من نوعها في أجمل وجهات المملكة الطبيعية والتراثية." },
                { ar: "خدمة كونسيرج خاصة السعودية", en: "Private Concierge Service KSA", desc: "رعاية شاملة لكل تفصيل في حفلاتكم الخاصة بسرية ودقة مطلقة." },
              ].map((item) => (
                <div key={item.en} className="bg-white border border-neutral-200/80 rounded-2xl p-8 hover:border-gold-400 transition-all">
                  <h3 className="text-gold-700 font-bold text-xl mb-3">{item.ar}</h3>
                  <p className="text-neutral-400 text-xs mb-4">{item.en}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                VIP events <span className="text-gold-700">FAQ</span>
              </h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[var(--surface-warm)] border border-gold-200/50 p-7 rounded-2xl">
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">Real-World Considerations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">VIP event challenges — <span className="text-[var(--primary)]">handled with discretion</span></h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">Private events for royal families and high-net-worth clients demand a different standard. Here is how our team manages the considerations that matter most.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { c: "Absolute privacy & discretion", s: "Strict NDAs, vetted crew, controlled media, and need-to-know guest lists protect high-profile clients before, during, and after the event." },
                { c: "Security & close-protection coordination", s: "We liaise with private security and authorities on motorcades, access control, and secure perimeters — without making guests feel policed." },
                { c: "Last-minute, bespoke requests", s: "A dedicated concierge and a deep vendor network make rare requests — private performers, charter logistics, rare provisions — happen quietly and quickly." },
                { c: "Flawless, no-rehearsal execution", s: "Senior planners and built-in contingencies mean a one-off private event runs perfectly the first time, because there is no second take." },
              ].map((item) => (
                <div key={item.c} className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Challenge</span>
                  <h3 className="font-bold text-neutral-900 text-base mt-1 mb-3">{item.c}</h3>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-neutral-600 text-sm leading-relaxed">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">Private Events — Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Riyadh Luxury Soirée", slug: "riyadh-luxury-soiree", desc: "An invitation-only private soirée with bespoke styling and complete discretion." },
                { title: "Makkah VIP Retreat", slug: "makkah-vip-retreat", desc: "A discreet VIP retreat with concierge hospitality and close-protection coordination." },
                { title: "Riyadh Elite Majlis", slug: "riyadh-elite-majlis", desc: "An exclusive majlis gathering blending traditional hospitality with private-event polish." },
              ].map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
                  <h4 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">View Project <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-2xl p-8">
              <div>
                <h3 className="text-neutral-900 font-bold text-lg">Planning a private VIP event?</h3>
                <p className="text-neutral-500 text-sm mt-1">Arrange a confidential consultation or speak with our private events team — we reply discreetly within two hours.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/consultation" className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">Private Consultation</Link>
                <Link href="/contact" className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">Contact Us</Link>
              </div>
            </div>
            <p className="text-neutral-500 text-sm mt-6">Explore our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or discover our <Link href="/services/destination-events" className="text-[var(--primary)] font-semibold hover:underline">destination events</Link> service.</p>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-[var(--surface-warm)] border-t border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-8 uppercase tracking-widest">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Destination Events", slug: "destination-events", desc: "AlUla, NEOM, Red Sea coastal — breathtaking locations for extraordinary events." },
                { title: "Luxury Weddings", slug: "weddings", desc: "Royal weddings and bespoke social celebrations at Saudi Arabia's finest venues." },
                { title: "Corporate Events", slug: "corporate-events", desc: "Executive retreats and high-level board events with full VIP protocol management." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 group-hover:text-gold-700 transition-colors">{rel.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-700 text-xs font-bold flex items-center gap-1">
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
