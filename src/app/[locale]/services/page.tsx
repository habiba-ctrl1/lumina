import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { hreflangAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import Image from "next/image";
import {
  Building2, Heart, Sun, Crown, Tent, Zap, Mic, Globe, ChevronRight, Gem,
  Phone, CheckCircle2, ShieldCheck, Clock, Languages, Award, TrendingUp,
  Layers, Landmark, Briefcase,
} from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/services`;
  return {
    title: isAr
      ? { absolute: "خدمات إدارة الفعاليات في السعودية | حفلات الزفاف والشركات والمعارض | إدارة الفعاليات السعودية" }
      : "Event Management Services in Saudi Arabia | Weddings, Corporate & Exhibitions",
    description: isAr
      ? "شركة إدارة فعاليات حائزة على جوائز في السعودية. أكثر من 15 عامًا و500 فعالية منفّذة — حفلات زفاف فاخرة، وقمم مؤسسية، ومعارض، ومؤتمرات، وفعاليات كبار الشخصيات والوجهات في الرياض وجدة والدمام والعلا ونيوم. عرض مجاني خلال 24 ساعة."
      : "Award-winning event management company in Saudi Arabia. 15+ years and 500+ events delivered — luxury weddings, corporate summits, exhibitions, conferences, VIP & destination events in Riyadh, Jeddah, Dammam, AlUla & NEOM. Free proposal in 24 hours.",
    keywords: [
      "Event Management Services Saudi Arabia",
      "Event management company Saudi Arabia",
      "Corporate event planning Saudi Arabia",
      "Exhibition management company Riyadh",
      "Luxury wedding planner Saudi Arabia",
      "Conference management Riyadh",
      "Destination events AlUla NEOM",
      "VIP event planning KSA",
      "Cultural events Saudi Arabia",
      "Event production company Riyadh",
      "شركة تنظيم فعاليات السعودية",
    ],
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/services"),
    },
    openGraph: {
      title: isAr
        ? "خدمات إدارة الفعاليات في السعودية | إدارة الفعاليات السعودية"
        : "Event Management Services in Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "أكثر من 15 عامًا و500 فعالية. حفلات زفاف فاخرة، وقمم مؤسسية، ومعارض، ومؤتمرات، وتجارب الوجهات وكبار الشخصيات في الرياض وجدة والدمام والعلا ونيوم."
        : "15+ years and 500+ events. Luxury weddings, corporate summits, exhibitions, conferences, destination & VIP experiences across Riyadh, Jeddah, Dammam, AlUla & NEOM.",
      url: path,
      type: "website",
      images: [{ url: "/services/hero_bg.webp", width: 1200, height: 630, alt: "Luxury event management services in Saudi Arabia by Saudi Event Management" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Management Services in Saudi Arabia | Saudi Event Management",
      description:
        "Luxury weddings, corporate summits, exhibitions, conferences, destination & VIP events across the Kingdom. 15+ years · 500+ events.",
      images: ["/services/hero_bg.webp"],
    },
  };
}

const serviceCategories = [
  {
    icon: Heart,
    slug: "weddings",
    title: "Luxury Weddings",
    arabic: "حفلات الزفاف",
    desc: "Bespoke luxury wedding planning across Riyadh, Jeddah, and Dammam — from royal Nikah ceremonies to contemporary receptions at premier venues.",
    tags: ["Wedding Planner Riyadh", "Social Events", "Bridal Management"],
    img: "/services/luxury_wedding_couple_guests.webp",
    imgAlt: "Luxury wedding reception with the couple and guests at a premium venue in Saudi Arabia",
  },
  {
    icon: Gem,
    slug: "royal-weddings",
    title: "Royal Weddings",
    arabic: "الأعراس الملكية",
    desc: "Ceremonial excellence for the Kingdom's most distinguished families — Nikah, Walima, Zaffa, Laylat al-Henna, and Milka across Riyadh, Jeddah, AlUla, and NEOM.",
    tags: ["Royal Protocol", "Nikah & Walima", "VIP Guest Management"],
    img: "/services/wedding_hall_grand_entrance.webp",
    imgAlt: "Grand royal wedding hall entrance with luxury floral décor in Riyadh Saudi Arabia",
  },
  {
    icon: Building2,
    slug: "corporate-events",
    title: "Corporate Events",
    arabic: "فعاليات الشركات",
    desc: "End-to-end corporate event planning for AGMs, gala dinners, and executive summits at KAFD, Ritz-Carlton, and JW Marriott.",
    tags: ["AGM Planning", "Executive Summits", "Gala Dinners"],
    img: "/services/riyadh_summit_people.webp",
    imgAlt: "Corporate executive summit with delegates at a conference in Riyadh Saudi Arabia",
  },
  {
    icon: Globe,
    slug: "exhibitions",
    title: "Exhibitions & Trade Shows",
    arabic: "المعارض والملتقيات",
    desc: "Premier exhibition management and trade show organizing for LEAP, Big 5 Saudi, Index Saudi, and global B2B expos at RICEC and RECC.",
    tags: ["Booth Design", "Trade Shows", "B2B Expos"],
    img: "/services/exhibition_hall_riyadh.webp",
    imgAlt: "Large exhibition hall with branded trade show stands in Riyadh Saudi Arabia",
  },
  {
    icon: Mic,
    slug: "conferences",
    title: "Conference Management",
    arabic: "إدارة المؤتمرات",
    desc: "Professional conference organizing for 50 to 5,000+ delegates, including hybrid streaming, simultaneous translation, and VIP protocol.",
    tags: ["PCO Services", "Hybrid Events", "Speaker Management"],
    img: "/services/corporate.webp",
    imgAlt: "Conference delegates seated at a professional business summit in Saudi Arabia",
  },
  {
    icon: Sun,
    slug: "cultural-events",
    title: "Cultural & Religious Events",
    arabic: "الفعاليات الثقافية والدينية",
    desc: "Authentic planning for Ramadan iftars, National Day galas, Eid celebrations, Founding Day festivals, and Riyadh Season activations.",
    tags: ["Ramadan Events", "National Day", "Eid Celebrations"],
    img: "/services/gala_decor_saudi.webp",
    imgAlt: "Cultural gala décor with traditional Saudi styling for a National Day celebration",
  },
  {
    icon: Crown,
    slug: "luxury-vip-events",
    title: "Luxury & VIP Experiences",
    arabic: "فعاليات كبار الشخصيات",
    desc: "Ultra-discreet, bespoke events for royal families, HNWIs, and diplomatic guests — private concerts, yacht parties, and exclusive brand launches.",
    tags: ["Royal Events", "HNWI Concierge", "Private Parties"],
    img: "/services/luxury_vip_majlis.webp",
    imgAlt: "Luxury VIP majlis lounge setup for an exclusive private event in Saudi Arabia",
  },
  {
    icon: Tent,
    slug: "destination-events",
    title: "Destination Events",
    arabic: "الفعاليات الوجهاتية",
    desc: "Breathtaking events in AlUla's ancient landscapes, NEOM's futuristic skyline, the Red Sea coast, and Diriyah's heritage mud-brick city.",
    tags: ["AlUla Events", "NEOM Summits", "Desert Glamping"],
    img: "/services/alula_gala_people.webp",
    imgAlt: "Destination gala dinner set in AlUla's desert landscape in Saudi Arabia",
  },
  {
    icon: Zap,
    slug: "event-production",
    title: "Event Production",
    arabic: "الإنتاج التقني",
    desc: "Technical powerhouse for stage fabrication, intelligent lighting, concert-grade sound engineering, and immersive 360° LED projection mapping.",
    tags: ["Stage Design", "AV Production", "Projection Mapping"],
    img: "/services/event_production_stage_riyadh.webp",
    imgAlt: "Concert-grade event production stage with LED screens and intelligent lighting in Riyadh",
  },
];

const whyChooseUs = [
  { icon: Layers, title: "One Accountable Team", desc: "Creative, technical AV, catering coordination, permits, and logistics owned in-house — no multi-vendor finger-pointing, one point of accountability." },
  { icon: Award, title: "15+ Years, 500+ Events", desc: "A 12-year operating track record across the Kingdom — from intimate royal majlis gatherings to 5,000-delegate national summits." },
  { icon: ShieldCheck, title: "Permits & Compliance In-House", desc: "GEA entertainment licenses, municipality approvals, and civil-defense clearances managed end-to-end, so approvals never threaten your date." },
  { icon: Languages, title: "Fully Bilingual Delivery", desc: "Arabic–English simultaneous interpretation, bilingual collateral, and culturally fluent programming for domestic and international audiences." },
  { icon: Crown, title: "Discretion & VIP Protocol", desc: "Bilateral NDAs, secure venue management, and royal-grade protocol for HNWI, diplomatic, and government guests." },
  { icon: Clock, title: "24-Hour Proposal Turnaround", desc: "Share a brief and a senior consultant returns a tailored, itemised proposal within one business day — venues, production, and budget." },
];

const processSteps = [
  { step: "01", title: "Consultation & Brief", desc: "We map your objectives, audience, guest count, budget, preferred cities, and any regulatory requirements in a detailed discovery session." },
  { step: "02", title: "Concept & Design", desc: "Our creative team develops the event concept — theme, stage design, branding, programme flow, and bilingual content architecture." },
  { step: "03", title: "Planning & Permits", desc: "GEA permits, municipality approvals, and civil-defense clearances are sequenced early and handled in-house with zero client friction." },
  { step: "04", title: "Venue & Vendor Sourcing", desc: "A curated venue shortlist with site inspections, plus a vetted network of 50+ trusted vendors at preferred-partner negotiated rates." },
  { step: "05", title: "Production & Execution", desc: "Full AV, staging, lighting, and rehearsals, followed by an on-day operations team that manages every minute of delivery." },
  { step: "06", title: "Post-Event Reporting", desc: "Guest feedback, media coverage, recordings, and ROI metrics delivered after the event, plus media distribution where required." },
];

const industries = [
  { icon: Landmark, title: "Government & Public Sector", desc: "Ministerial conferences, national protocol, and Vision 2030 forums." },
  { icon: Zap, title: "Energy & Petrochemicals", desc: "Summits and galas for Aramco-corridor and SABIC-scale organisations." },
  { icon: TrendingUp, title: "Banking & Finance", desc: "AGMs, investor forums, and FII-calibre events at KAFD and beyond." },
  { icon: Globe, title: "Technology & Telecom", desc: "Product launches, hybrid conferences, and LEAP-scale tech activations." },
  { icon: Gem, title: "Luxury, Retail & Fashion", desc: "Brand launches, runway shows, and experiential VIP activations." },
  { icon: Briefcase, title: "Real Estate & Giga-Projects", desc: "Milestone events for NEOM, Red Sea, Diriyah, and Qiddiya developers." },
  { icon: Heart, title: "Private & Royal Clients", desc: "Royal weddings, HNWI celebrations, and ultra-discreet private events." },
  { icon: Sun, title: "Culture, Tourism & Sport", desc: "Seasonal festivals, Riyadh Season activations, and heritage events." },
];

const geoData = [
  { city: "Riyadh", arabic: "الرياض", slug: "riyadh", desc: "The capital hub — KAFD, KAICC, Ritz-Carlton, and Al Faisaliah.", tag: "Corporate & Government Events" },
  { city: "Jeddah", arabic: "جدة", slug: "jeddah", desc: "Red Sea elegance — Ritz-Carlton, Waldorf Astoria, and beachfront venues.", tag: "Weddings & Social Events" },
  { city: "Dammam", arabic: "الدمام", slug: "dammam", desc: "Eastern Province's commercial heartbeat — exhibitions and corporate galas.", tag: "Trade Shows & Conferences" },
  { city: "AlUla", arabic: "العُلا", slug: "alula", desc: "UNESCO heritage landscapes and Maraya concert hall in the desert.", tag: "Destination & Heritage Events" },
  { city: "NEOM", arabic: "نيوم", slug: "neom", desc: "Futuristic summits and tech retreats inside the $500B giga-project.", tag: "Innovation Summits" },
  { city: "Makkah & Madinah", arabic: "مكة والمدينة", slug: "makkah", desc: "Hajj/Umrah season hospitality and ministerial-level religious events.", tag: "Religious & VIP Events" },
];

const featuredProjects = [
  { title: "Royal Riyadh Wedding", slug: "royal-riyadh-wedding", desc: "A multi-day royal wedding with Zaffa procession, full protocol, and bespoke production.", img: "/services/wedding_stage_backdrop_decor.webp", alt: "Royal wedding stage backdrop and floral décor at a luxury wedding in Riyadh" },
  { title: "Vision 2030 Showcase", slug: "vision-2030", desc: "A flagship government-aligned activation aligned with Saudi Vision 2030 objectives.", img: "/services/gallery_corporate_gala.webp", alt: "Vision 2030 corporate gala showcase event in Saudi Arabia" },
  { title: "NEOM Future Summit", slug: "neom-future-summit", desc: "A high-tech executive summit with broadcast production inside the NEOM giga-project.", img: "/services/neom_summit_people.webp", alt: "Executive summit delegates at a NEOM future summit in Saudi Arabia" },
  { title: "AlUla Desert Festival", slug: "alula-desert-festival", desc: "A destination cultural festival staged in AlUla's ancient desert landscape.", img: "/services/alula_gala_people.webp", alt: "Destination cultural festival gala dinner in AlUla Saudi Arabia" },
];

const insights = [
  { title: "The Ultimate Guide to Exceptional Event Planning", slug: "ultimate-guide-exceptional-event-planning", desc: "Our complete framework for planning a flawless event in Saudi Arabia — from brief to execution." },
  { title: "MICE Tourism Saudi Arabia 2026: The Complete Guide", slug: "mice-tourism-saudi-arabia-complete-guide-2026", desc: "How Saudi Arabia's booming MICE sector and Vision 2030 are reshaping events in the Kingdom." },
  { title: "How Vision 2030 is Redefining the Saudi Event Landscape", slug: "vision-2030-redefining-saudi-event-landscape", desc: "The cultural and economic forces driving the most dynamic events market in the region." },
  { title: "How to Get a GEA Event Permit in Saudi Arabia", slug: "gea-event-permit-guide-saudi-arabia", desc: "A step-by-step guide to GEA entertainment permits — requirements, costs, and timelines." },
  { title: "Best Corporate Event Venues in Riyadh 2026", slug: "best-corporate-event-venues-riyadh-2026", desc: "A rank-ordered guide to Riyadh's top venues — capacity, AV specs, and booking lead times." },
  { title: "Event Production Cost Guide — Saudi Arabia 2026", slug: "event-production-cost-guide-saudi-arabia-2026", desc: "What stage, AV, lighting, and full technical production actually cost across the Kingdom." },
];

const faqs = [
  {
    q: "What event management services does Saudi Event Management offer?",
    a: "Saudi Event Management offers a full spectrum of services: luxury wedding planning, corporate event management, exhibition and trade show organizing, conference management, cultural and religious event planning, VIP and royal family events, destination events across AlUla and NEOM, and complete technical event production including stage design, AV, and lighting.",
  },
  {
    q: "Which cities in Saudi Arabia do you cover?",
    a: "We operate across all major Saudi cities including Riyadh, Jeddah, Dammam, Khobar, AlUla, Tabuk, Abha, and the futuristic NEOM development. For destination events we also manage logistics for remote desert and Red Sea coastal venues.",
  },
  {
    q: "How much does event management cost in Saudi Arabia?",
    a: "Event management costs in Saudi Arabia vary by event type and scale. Corporate events typically start from SAR 75,000; luxury weddings from SAR 150,000; exhibitions from SAR 40,000 for booth design; and conference management from SAR 55,000 for a full-day summit. Contact us for a detailed bespoke proposal.",
  },
  {
    q: "Can you manage both English and Arabic-language events?",
    a: "Yes. Saudi Event Management is fully bilingual. We manage simultaneous Arabic-English interpretation, bilingual event collateral, and culturally appropriate programs that serve both domestic Saudi audiences and international delegations.",
  },
  {
    q: "Are you aligned with Saudi Vision 2030 event initiatives?",
    a: "Absolutely. We are an active partner in Vision 2030 cultural and economic event initiatives, working alongside the General Entertainment Authority (GEA), the Ministry of Culture, Saudi Tourism Authority, and numerous giga-project developers to deliver world-class events that align with the Kingdom's transformation goals.",
  },
  {
    q: "Do you handle event permits and regulatory compliance in Saudi Arabia?",
    a: "Yes. We manage all GEA entertainment permits, municipality approvals, police and civil defense clearances, and Ministry of Culture participation licenses required for events across the Kingdom.",
  },
  {
    q: "Is there an event management company near me in Riyadh?",
    a: "Yes. Saudi Event Management is headquartered in Riyadh with a dedicated operations team available 24/7 for any event requirement — from initial consultation to on-day execution — and active teams serving Jeddah, Dammam, AlUla, and NEOM.",
  },
  {
    q: "What is the difference between an event planner and an event manager in Saudi Arabia?",
    a: "An event planner focuses on conceptualizing and designing the event experience, while an event manager handles logistics, vendor coordination, and on-day execution. Saudi Event Management provides both disciplines under one roof as a fully integrated event management company.",
  },
  {
    q: "How early should I book an event management company in Saudi Arabia?",
    a: "For large-scale corporate or gala events, we recommend booking 4–6 months in advance. For luxury weddings and destination events in AlUla or NEOM, 6–12 months is ideal to secure premium venues and talent.",
  },
  {
    q: "Do you provide event management for government entities in Saudi Arabia?",
    a: "Yes. Saudi Event Management has an extensive track record managing government-aligned events for entities including HRDF, Saudi Aramco, SABIC, and ministerial conferences. We are fully equipped to handle GEA compliance, national protocol, and secure VIP management.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://saudieventmanagement.com#organization",
      "name": "Saudi Event Management",
      "url": "https://saudieventmanagement.com",
      "logo": "https://saudieventmanagement.com/services/logo.png",
      "image": "https://saudieventmanagement.com/services/hero_bg.webp",
      "foundingDate": "2012",
      "slogan": "Luxury event management across Saudi Arabia.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "King Fahd Road",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh",
        "postalCode": "11564",
        "addressCountry": "SA",
      },
      "telephone": "+966539388072",
      "knowsAbout": [
        "Event management", "Corporate event planning", "Luxury wedding planning",
        "Exhibition management", "Conference organizing", "Event production",
        "Saudi Vision 2030", "VIP event management",
      ],
      "areaServed": [
        { "@type": "City", "name": "Riyadh", "sameAs": "https://en.wikipedia.org/wiki/Riyadh" },
        { "@type": "City", "name": "Jeddah", "sameAs": "https://en.wikipedia.org/wiki/Jeddah" },
        { "@type": "City", "name": "Dammam", "sameAs": "https://en.wikipedia.org/wiki/Dammam" },
        { "@type": "City", "name": "AlUla", "sameAs": "https://en.wikipedia.org/wiki/Al-Ula" },
        { "@type": "Place", "name": "NEOM", "sameAs": "https://en.wikipedia.org/wiki/NEOM" },
        { "@type": "City", "name": "Makkah", "sameAs": "https://en.wikipedia.org/wiki/Mecca" },
        { "@type": "City", "name": "Madinah", "sameAs": "https://en.wikipedia.org/wiki/Medina" },
        { "@type": "Country", "name": "Saudi Arabia", "sameAs": "https://en.wikipedia.org/wiki/Saudi_Arabia" },
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "148",
        "bestRating": "5",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Event Management Services Saudi Arabia",
        "itemListElement": serviceCategories.map((s) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": s.title,
            "serviceType": s.title,
            "url": `https://saudieventmanagement.com/services/${s.slug}`,
            "provider": { "@id": "https://saudieventmanagement.com#organization" },
            "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
          },
        })),
      },
    },
    {
      "@type": "ItemList",
      "name": "Event Management Services in Saudi Arabia",
      "description": "The full catalogue of event management services offered by Saudi Event Management across the Kingdom.",
      "itemListElement": serviceCategories.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": s.title,
        "url": `https://saudieventmanagement.com/services/${s.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://saudieventmanagement.com/services",
      "name": "Event Management Services Saudi Arabia",
      "description": "Complete topical hub for all event management services offered by Saudi Event Management across Saudi Arabia.",
      "url": "https://saudieventmanagement.com/services",
      "inLanguage": ["en", "ar"],
      "isPartOf": { "@id": "https://saudieventmanagement.com#organization" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://saudieventmanagement.com/services/hero_bg.webp",
        "caption": "Luxury event management services in Saudi Arabia",
      },
      "about": {
        "@type": "Thing",
        "name": "Event Management",
        "sameAs": "https://en.wikipedia.org/wiki/Event_management",
      },
    },
  ],
};

export default async function ServicesPage() {
  const isAr = (await getLocale()) === "ar";
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title={isAr ? "خدمات إدارة الفعاليات" : "Event Management Services"}
        titleHighlight={isAr ? "في السعودية" : "in Saudi Arabia"}
        subtitle={
          isAr
            ? "من القمم المؤسسية عالية الأهمية إلى الأعراس الملكية الكبرى — استكشف باقة المملكة الكاملة من خدمات إدارة الفعاليات الفاخرة في الرياض وجدة والدمام والعلا ونيوم."
            : "From high-stakes corporate summits to grand royal weddings — explore the Kingdom's full suite of luxury event management services across Riyadh, Jeddah, Dammam, AlUla, and NEOM."
        }
        backgroundImage="/services/wedding_stage_backdrop_decor.webp"
        imageAlt="Luxury wedding stage backdrop and floral décor at a premium event in Saudi Arabia"
        badge={isAr ? "خبرتنا" : "Our Expertise"}
        breadcrumbs={[{ label: isAr ? "الرئيسية" : "Home", href: isAr ? "/ar" : "/" }, { label: isAr ? "الخدمات" : "Services" }]}
        enableParallax
        disableZoom
        minHeight="large"
        trustElements={[
          { value: "250+", label: "Events Managed" },
          { value: "15+", label: "Years of Saudi Expertise" },
          { value: "24 Hours", label: "Quote Response" },
        ]}
      />

      {/* ── CTA BAR ── */}
      <div className="bg-white border-b border-neutral-200/80 py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#proposal"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
          >
            Request a Free Proposal
          </Link>
          <a
            href="tel:+966539388072"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
          >
            <Phone size={15} /> Speak to Our Team
          </a>
        </div>
      </div>

      {/* ── TRUST / CREDENTIALS BAR ── */}
      <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <div className="text-xs text-neutral-500 font-light italic max-w-xs">
              &quot;A trusted partner for Vision 2030 events across the Kingdom since 2012.&quot;
            </div>
            <div className="h-8 w-px bg-neutral-200 hidden md:block" />
            <div className="flex flex-wrap gap-6 text-[10px] font-bold tracking-widest text-neutral-400">
              <span>SAUDI ARAMCO</span>
              <span>SABIC</span>
              <span>HRDF</span>
              <span>PIF</span>
              <span>NEOM</span>
              <span>GEA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--primary)] font-bold text-sm">4.9★</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest">148 Client Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Component ── */}
      <Services showAllServicesLink={false} />

      {/* ── Topical Cluster Hub (image-backed) ── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Service Categories
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              Explore Our <span className="text-[var(--primary)]">Service Clusters</span>
            </h2>
            <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Nine specialised disciplines, one integrated team. Each practice area is led by a dedicated expert team and backed by a deep Saudi-market vendor network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-[var(--primary)]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.imgAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                    <cat.icon size={20} className="text-[var(--primary)]" />
                  </div>
                  <span className="absolute bottom-3 right-4 text-[11px] text-white/85 font-medium">{cat.arabic}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-neutral-900 text-base mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[var(--primary)] text-xs font-semibold">
                    Explore {cat.title} <ChevronRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us / E-E-A-T ── */}
      <section className="py-24 md:py-32 border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Why Saudi Event Management
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              The Kingdom&apos;s most <span className="text-[var(--primary)]">trusted event partner</span>
            </h2>
            <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              Six reasons leading Saudi organisations and families choose us to deliver their most important events.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-[var(--surface-raised)] border border-neutral-200/80 rounded-2xl p-7 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-base mb-2">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Entity-Rich Context Section ── */}
      <section className="py-24 md:py-32 relative max-w-4xl mx-auto px-6 text-center border-t border-neutral-100">
        <h2 className="font-semibold text-neutral-900 mb-8 text-2xl md:text-3xl" style={{ letterSpacing: "-0.025em" }}>
          Smart Event Planning &{" "}
          <span className="text-[var(--primary)]">Luxury Capabilities</span>
        </h2>
        <div className="prose prose-slate max-w-none text-neutral-500 text-[15px] leading-relaxed space-y-6 text-left">
          <p>
            At Saudi Event Management, our event management services are defined by a commitment to
            perfect planning and design that makes people feel special. We do not simply manage
            events — we create experiences that leave a lasting impact on your guests and
            stakeholders. Our comprehensive suite covers every aspect of event management, from
            initial site inspections and venue sourcing across{" "}
            <Link href="/locations/riyadh" className="text-[var(--primary)] font-medium hover:underline">Riyadh</Link>,{" "}
            <Link href="/locations/jeddah" className="text-[var(--primary)] font-medium hover:underline">Jeddah</Link>,
            and <Link href="/locations/dammam" className="text-[var(--primary)] font-medium hover:underline">Dammam</Link>,
            through to post-event media distribution and analytics.
          </p>
          <p>
            Our expertise spans multiple sectors including high-stakes{" "}
            <Link href="/services/corporate-events" className="text-[var(--primary)] font-medium hover:underline">corporate event planning</Link>,
            spectacular{" "}
            <Link href="/services/royal-weddings" className="text-[var(--primary)] font-medium hover:underline">royal weddings</Link>,
            large-scale cultural events aligned with <strong>Saudi Vision 2030</strong>, and technically
            complex{" "}
            <Link href="/services/exhibitions" className="text-[var(--primary)] font-medium hover:underline">exhibition management</Link>{" "}
            at RICEC, RECC, and Jeddah Center for Forums. We understand the complexities of the Saudi
            market — GEA permits, government protocols, bilateral NDAs for VIP events, and the
            meticulous hospitality standards demanded by luxury clients.
          </p>
          <p>
            As a fully integrated event management company, Saudi Event Management provides in-house
            capabilities across creative production, technical{" "}
            <Link href="/services/event-production" className="text-[var(--primary)] font-medium hover:underline">AV and event production</Link>,
            catering coordination, vendor management, digital streaming, and logistics. This singular
            ownership of the end-to-end experience eliminates the friction of multi-vendor management
            and ensures complete accountability. Explore our{" "}
            <Link href="/portfolio" className="text-[var(--primary)] font-medium hover:underline">event portfolio</Link>{" "}
            or read genuine{" "}
            <Link href="/testimonials" className="text-[var(--primary)] font-medium hover:underline">client testimonials</Link>{" "}
            to see our standard of delivery.
          </p>
        </div>
      </section>

      {/* ── Process / Methodology ── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Our Process
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              How we deliver a <span className="text-[var(--primary)]">flawless event</span>
            </h2>
            <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A six-stage methodology refined across 500+ events — from the first brief to post-event ROI reporting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((s) => (
              <div key={s.step} className="bg-white border border-neutral-200/80 rounded-2xl p-8 hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                <div className="text-4xl font-bold text-[var(--primary)]/25 mb-4">{s.step}</div>
                <h3 className="font-semibold text-neutral-900 text-base mb-2">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="py-24 md:py-32 border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Industries We Serve
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              Trusted across the <span className="text-[var(--primary)]">Kingdom&apos;s key sectors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-[var(--surface-raised)] border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/30 transition-all">
                <ind.icon size={22} className="text-[var(--primary)] mb-4" />
                <h3 className="font-semibold text-neutral-900 text-sm mb-2">{ind.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GEO Section ── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Where We Operate
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              Event Management Across{" "}
              <span className="text-[var(--primary)]">Saudi Arabia</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geoData.map((geo) => (
              <Link
                key={geo.city}
                href={`/locations/${geo.slug}`}
                className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg group-hover:text-[var(--primary)] transition-colors">{geo.city}</h3>
                    <span className="text-neutral-400 text-sm">{geo.arabic}</span>
                  </div>
                  <span className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap">
                    {geo.tag}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed mb-3">{geo.desc}</p>
                <span className="text-[var(--primary)] text-xs font-semibold flex items-center gap-1">
                  Events in {geo.city} <ChevronRight size={12} />
                </span>
              </Link>
            ))}
          </div>

          {/* Arabic GEO Block */}
          <div className="mt-12 bg-emerald-950 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              نقدم خدماتنا في <span className="text-[var(--primary)]">كل مناطق المملكة</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                { ar: "إدارة فعاليات الرياض", en: "Event Management Riyadh" },
                { ar: "تنظيم مناسبات جدة", en: "Event Organizer Jeddah" },
                { ar: "شركة فعاليات الدمام", en: "Event Company Dammam" },
                { ar: "فعاليات العُلا ونيوم", en: "AlUla & NEOM Events" },
              ].map((item) => (
                <div key={item.en} className="border border-white/10 rounded-xl p-4">
                  <p className="text-[var(--primary)] font-bold text-sm mb-1">{item.ar}</p>
                  <p className="text-slate-400 text-xs">{item.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Work / Portfolio ── */}
      <section className="py-24 md:py-32 border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Featured Work
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              Events we&apos;ve <span className="text-[var(--primary)]">brought to life</span>
            </h2>
            <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A glimpse of recent projects across weddings, corporate summits, and destination events.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-[var(--primary)]/40 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2 group-hover:text-[var(--primary)] transition-colors">{p.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-semibold flex items-center gap-1">View Project <ChevronRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm border border-[var(--primary)]/30 rounded-full px-6 py-3 hover:bg-[var(--primary)]/5 transition-colors"
            >
              View Full Portfolio <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lead Form / Proposal ── */}
      <section id="proposal" className="py-24 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a3d2c 0%, #064E3B 55%, #0D6B4E 100%)" }}>
        <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-white/[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-white space-y-7">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                <span className="w-6 h-px bg-[#C5A880]" /> Request a Proposal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Let&apos;s plan your next<br />
                <span className="text-[#C5A880]">unforgettable event.</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed max-w-md">
                Share your brief and a senior consultant will return a tailored, itemised proposal within
                24 hours — venues, production, budget, and a clear delivery timeline.
              </p>
              <ul className="space-y-3.5 pt-2">
                {[
                  "Dedicated senior account director",
                  "Preferred-partner venue rates Kingdom-wide",
                  "Full GEA permit & compliance handled in-house",
                  "Transparent, itemised pricing — no hidden fees",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                    <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20discuss%20an%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> Or message us on WhatsApp
                </a>
              </div>
            </div>
            <ServiceLeadForm
              source="services_hub_page"
              eyebrow="Free Proposal"
              heading="Tell us about your event"
              subheading="A senior consultant will respond within 24 hours with a tailored plan and indicative budget."
              submitLabel="Request My Proposal"
              eventTypeOptions={[
                "Luxury Wedding",
                "Royal Wedding",
                "Corporate Summit / Conference",
                "Exhibition / Trade Show",
                "Cultural / Religious Event",
                "Luxury & VIP Event",
                "Destination Event (AlUla / NEOM)",
                "Event Production / Technical",
                "Other",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-24 md:py-32 border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl" style={{ letterSpacing: "-0.025em" }}>
              Frequently Asked{" "}
              <span className="text-[var(--primary)]">Questions</span>
            </h2>
            <p className="text-neutral-500 mt-4 text-sm">Everything you need to know about event management in Saudi Arabia.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[var(--surface-raised)] border border-neutral-200/80 rounded-2xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3 text-base">{faq.q}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm border border-[var(--primary)]/30 rounded-full px-6 py-3 hover:bg-[var(--primary)]/5 transition-colors"
            >
              View Full FAQ <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Insights / From Our Blog ── */}
      <section className="py-24 md:py-28 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label bg-white border border-neutral-200/80 mx-auto mb-4">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Event Planning Insights
            </span>
            <h2 className="font-semibold text-neutral-900 text-3xl md:text-4xl mt-4" style={{ letterSpacing: "-0.025em" }}>
              Guides from our <span className="text-[var(--primary)]">expert team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
              >
                <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Guide</span>
                <h3 className="text-neutral-900 font-semibold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed mb-3">{post.desc}</p>
                <span className="text-[var(--primary)] text-xs font-semibold flex items-center gap-1">Read Article <ChevronRight size={12} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Linking Footer ── */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-xs">Our Services</p>
              <ul className="space-y-2 text-neutral-500">
                {serviceCategories.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="hover:text-[var(--primary)] transition-colors">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-xs">Cities We Serve</p>
              <ul className="space-y-2 text-neutral-500">
                {[
                  { name: "Riyadh", slug: "riyadh" },
                  { name: "Jeddah", slug: "jeddah" },
                  { name: "Dammam", slug: "dammam" },
                  { name: "Khobar", slug: "khobar" },
                  { name: "AlUla", slug: "alula" },
                  { name: "NEOM", slug: "neom" },
                  { name: "Makkah", slug: "makkah" },
                  { name: "Madinah", slug: "madinah" },
                ].map((c) => (
                  <li key={c.slug}>
                    <Link href={`/locations/${c.slug}`} className="hover:text-[var(--primary)] transition-colors">
                      Events in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-xs">Resources</p>
              <ul className="space-y-2 text-neutral-500">
                <li><Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Event Planning Blog</Link></li>
                <li><Link href="/portfolio" className="hover:text-[var(--primary)] transition-colors">Our Portfolio</Link></li>
                <li><Link href="/testimonials" className="hover:text-[var(--primary)] transition-colors">Client Testimonials</Link></li>
                <li><Link href="/glossary" className="hover:text-[var(--primary)] transition-colors">Event Glossary</Link></li>
                <li><Link href="/faq" className="hover:text-[var(--primary)] transition-colors">FAQ</Link></li>
                <li><Link href="/vendors" className="hover:text-[var(--primary)] transition-colors">Vendor Directory</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-neutral-900 mb-3 uppercase tracking-wider text-xs">Get Started</p>
              <ul className="space-y-2 text-neutral-500">
                <li><Link href="/consultation" className="hover:text-[var(--primary)] transition-colors">Free Consultation</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-[var(--primary)] transition-colors">About Our Team</Link></li>
                <li><Link href="/partners" className="hover:text-[var(--primary)] transition-colors">Our Partners</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
