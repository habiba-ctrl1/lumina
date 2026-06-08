import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import {
  Building2, Heart, Sun, Crown, Tent, Zap, Mic, Globe, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Event Management Services Saudi Arabia | Luxury & Corporate Events",
  description:
    "Comprehensive event management services across Saudi Arabia — luxury weddings, corporate summits, exhibitions, conferences, destination events & VIP experiences in Riyadh, Jeddah, Dammam & AlUla.",
  keywords: [
    "Event Management Services Saudi Arabia",
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
    canonical: "https://saudieventmanagement.com/services",
    languages: {
      "en-US": "https://saudieventmanagement.com/services",
      "ar-SA": "https://saudieventmanagement.com/ar/services",
    },
  },
  openGraph: {
    title: "Event Management Services Saudi Arabia | Luxury & Corporate Events",
    description:
      "Comprehensive event management services across Saudi Arabia. Luxury weddings, corporate summits, exhibitions, conferences, destination events & VIP experiences.",
    url: "https://saudieventmanagement.com/services",
    images: [{ url: "/hero_bg.webp", width: 1200, height: 630, alt: "Event Management Services Saudi Arabia" }],
  },
};

const serviceCategories = [
  {
    icon: Heart,
    slug: "weddings",
    title: "Luxury Weddings",
    arabic: "حفلات الزفاف",
    desc: "Bespoke luxury wedding planning across Riyadh, Jeddah, and Dammam — from royal Nikah ceremonies to contemporary receptions at premier venues.",
    tags: ["Wedding Planner Riyadh", "Social Events", "Bridal Management"],
  },
  {
    icon: Building2,
    slug: "corporate-events",
    title: "Corporate Events",
    arabic: "فعاليات الشركات",
    desc: "End-to-end corporate event planning for AGMs, gala dinners, and executive summits at KAFD, Ritz-Carlton, and JW Marriott.",
    tags: ["AGM Planning", "Executive Summits", "Gala Dinners"],
  },
  {
    icon: Globe,
    slug: "exhibitions",
    title: "Exhibitions & Trade Shows",
    arabic: "المعارض والملتقيات",
    desc: "Premier exhibition management and trade show organizing for LEAP, Big 5 Saudi, Index Saudi, and global B2B expos at RICEC and RECC.",
    tags: ["Booth Design", "Trade Shows", "B2B Expos"],
  },
  {
    icon: Mic,
    slug: "conferences",
    title: "Conference Management",
    arabic: "إدارة المؤتمرات",
    desc: "Professional conference organizing for 50 to 5,000+ delegates, including hybrid streaming, simultaneous translation, and VIP protocol.",
    tags: ["PCO Services", "Hybrid Events", "Speaker Management"],
  },
  {
    icon: Sun,
    slug: "cultural-events",
    title: "Cultural & Religious Events",
    arabic: "الفعاليات الثقافية والدينية",
    desc: "Authentic planning for Ramadan iftars, National Day galas, Eid celebrations, Founding Day festivals, and Riyadh Season activations.",
    tags: ["Ramadan Events", "National Day", "Eid Celebrations"],
  },
  {
    icon: Crown,
    slug: "luxury-vip-events",
    title: "Luxury & VIP Experiences",
    arabic: "فعاليات كبار الشخصيات",
    desc: "Ultra-discreet, bespoke events for royal families, HNWIs, and diplomatic guests — private concerts, yacht parties, and exclusive brand launches.",
    tags: ["Royal Events", "HNWI Concierge", "Private Parties"],
  },
  {
    icon: Tent,
    slug: "destination-events",
    title: "Destination Events",
    arabic: "الفعاليات الوجهاتية",
    desc: "Breathtaking events in AlUla's ancient landscapes, NEOM's futuristic skyline, the Red Sea coast, and Diriyah's heritage mud-brick city.",
    tags: ["AlUla Events", "NEOM Summits", "Desert Glamping"],
  },
  {
    icon: Zap,
    slug: "event-production",
    title: "Event Production",
    arabic: "الإنتاج التقني",
    desc: "Technical powerhouse for stage fabrication, intelligent lighting, concert-grade sound engineering, and immersive 360° LED projection mapping.",
    tags: ["Stage Design", "AV Production", "Projection Mapping"],
  },
];

const geoData = [
  { city: "Riyadh", arabic: "الرياض", desc: "The capital hub — KAFD, KAICC, Ritz-Carlton, and Al Faisaliah.", tag: "Corporate & Government Events" },
  { city: "Jeddah", arabic: "جدة", desc: "Red Sea elegance — Ritz-Carlton, Waldorf Astoria, and beachfront venues.", tag: "Weddings & Social Events" },
  { city: "Dammam", arabic: "الدمام", desc: "Eastern Province's commercial heartbeat — exhibitions and corporate galas.", tag: "Trade Shows & Conferences" },
  { city: "AlUla", arabic: "العُلا", desc: "UNESCO heritage landscapes and Maraya concert hall in the desert.", tag: "Destination & Heritage Events" },
  { city: "NEOM", arabic: "نيوم", desc: "Futuristic summits and tech retreats inside the $500B giga-project.", tag: "Innovation Summits" },
  { city: "Makkah & Madinah", arabic: "مكة والمدينة", desc: "Hajj/Umrah season hospitality and ministerial-level religious events.", tag: "Religious & VIP Events" },
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
    q: "event management company near me Riyadh",
    a: "Saudi Event Management is headquartered in Riyadh with a dedicated operations team available 24/7 for any event requirement — from initial consultation to on-day execution.",
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
      "name": "Saudi Event Management",
      "url": "https://saudieventmanagement.com",
      "logo": "https://saudieventmanagement.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh",
        "addressCountry": "SA",
      },
      "telephone": "+966501234567",
      "areaServed": ["Riyadh", "Jeddah", "Dammam", "AlUla", "NEOM", "Makkah", "Madinah", "Saudi Arabia"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Event Management Services Saudi Arabia",
        "itemListElement": serviceCategories.map((s) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": s.title,
            "url": `https://saudieventmanagement.com/services/${s.slug}`,
          },
        })),
      },
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
      "name": "Event Management Services Saudi Arabia",
      "description": "Complete topical hub for all event management services offered by Saudi Event Management across Saudi Arabia.",
      "url": "https://saudieventmanagement.com/services",
      "inLanguage": ["en", "ar"],
      "about": {
        "@type": "Thing",
        "name": "Event Management",
        "sameAs": "https://en.wikipedia.org/wiki/Event_management",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title="Event Management Services"
        titleHighlight="in Saudi Arabia"
        subtitle="From high-stakes corporate summits to breathtaking luxury weddings — discover our comprehensive suite of elite event management capabilities across the Kingdom."
        backgroundImage="/wedding_stage_backdrop_decor.webp"
        imageAlt="Luxury wedding stage backdrop decor at a premium event in Saudi Arabia"
        badge="Our Expertise"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        enableParallax
        disableZoom
        minHeight="large"
        trustElements={[
          { value: "500+", label: "Events Managed" },
          { value: "50+", label: "Trusted Vendors Across Saudi Arabia" },
          { value: "24 Hours", label: "Quote Response" },
        ]}
      />

      {/* ── Services Component ── */}
      <Services />

      {/* ── Topical Cluster Hub ── */}
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
              Eight specialised disciplines, one integrated team. Each practice area is led by a dedicated expert team and backed by a deep Saudi-market network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/${cat.slug}`}
                className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/8 flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] transition-colors">
                  <cat.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                </div>
                <div className="mb-1">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{cat.arabic}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-base mb-3 group-hover:text-[var(--primary)] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed mb-4">{cat.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-[var(--primary)] text-xs font-semibold">
                  Explore <ChevronRight size={12} />
                </div>
              </Link>
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
            stakeholders. Our comprehensive suite of services covers every aspect of event
            management, from initial site inspections and venue sourcing across Riyadh, Jeddah,
            and Dammam, through to post-event media distribution and analytics.
          </p>
          <p>
            Our expertise spans multiple sectors including high-stakes corporate event planning,
            spectacular royal weddings, large-scale cultural events aligned with{" "}
            <strong>Saudi Vision 2030</strong>, and technically complex{" "}
            <strong>exhibition management</strong> at RICEC, RECC, and Jeddah Center for Forums.
            We understand the complexities of the Saudi market — GEA permits, government protocols,
            bilateral NDAs for VIP events, and the meticulous hospitality standards demanded by
            luxury clients.
          </p>
          <p>
            As a fully integrated event management company, Saudi Event Management provides
            in-house capabilities across creative production, technical AV, catering coordination,
            vendor management, digital streaming, and logistics. This singular ownership of the
            end-to-end experience eliminates the friction of multi-vendor management and ensures
            complete accountability.
          </p>
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
              <div
                key={geo.city}
                className="bg-white border border-neutral-200/80 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg">{geo.city}</h3>
                    <span className="text-neutral-400 text-sm">{geo.arabic}</span>
                  </div>
                  <span className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full font-semibold uppercase tracking-wider whitespace-nowrap">
                    {geo.tag}
                  </span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed">{geo.desc}</p>
              </div>
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
                  <p className="text-slate-500 text-xs">{item.en}</p>
                </div>
              ))}
            </div>
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
                {["Riyadh", "Jeddah", "Dammam", "Khobar", "AlUla", "NEOM", "Makkah", "Madinah"].map((c) => (
                  <li key={c}>
                    <Link href="/locations" className="hover:text-[var(--primary)] transition-colors">
                      Events in {c}
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
