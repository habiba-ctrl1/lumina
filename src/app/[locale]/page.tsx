import type { Metadata } from "next";
import { hreflangAlternates, robotsForRoute } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import StatsSection from "@/components/StatsSection";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    // AR title already carries the Arabic brand, so use `absolute` to bypass the
    // layout's "%s | Saudi Event Management" template (avoids a doubled brand).
    // EN stays a plain string so the template appends the brand once.
    title: isAr
      ? { absolute: "شركة تنظيم معارض ومؤتمرات وفعاليات في السعودية | إدارة الفعاليات السعودية" }
      : "Event Management Company in Saudi Arabia",
    description: isAr
      ? "شركة إدارة الفعاليات السعودية هي الشركة الرائدة في تنظيم المعارض والمؤتمرات وحفلات الزفاف الفاخرة والفعاليات في الرياض وجدة ومكة والعلا."
      : "Saudi Event Management is a leading event management company in Saudi Arabia. We deliver corporate events, exhibitions, luxury weddings and conferences in Riyadh, Jeddah, Makkah, and AlUla.",
    keywords: isAr
      ? [
          "تنظيم معارض ومؤتمرات",
          "شركة تنظيم معارض ومؤتمرات",
          "شركة تنظيم فعاليات في السعودية",
          "تنظيم فعاليات الرياض",
          "إدارة فعاليات السعودية"
        ]
      : [
          "Event Management Company in Saudi Arabia",
          "Event management",
          "شركات تنظيم",
          "Event companies in Saudi Arabia",
          "Saudi event organizer",
          "Event Management Riyadh",
          "Corporate Events Saudi Arabia",
          "Exhibition Management Saudi Arabia",
          "Luxury Event Management KSA",
          "Conference Management Riyadh",
        ],
    alternates: {
      canonical: `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}`,
      languages: hreflangAlternates("/"),
    },
    // index,follow on EN and the (now-translated) /ar homepage; matches middleware.
    robots: robotsForRoute(locale, "/"),
  };
}
import HowItWorks from "@/components/HowItWorks";
import ContactSection from "@/components/ContactSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";
import MapClient from "@/components/MapClient";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import FilterablePortfolio from "@/components/FilterablePortfolio";
import PartnersSection from "@/components/PartnersSection";
import InstagramFeed from "@/components/InstagramFeed";
import EngagementHub from "@/components/EngagementHub";
import Services from "@/components/Services";
import GeoDefinitionBlock from "@/components/GeoDefinitionBlock";
import CityPresence from "@/components/CityPresence";
import VendorCTA from "@/components/VendorCTA";
import Link from "next/link";
import {
  Building2, ShieldCheck, Languages, Sparkles, Users, MapPin, ArrowRight, ChevronDown,
} from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

// ─────────────────────────────────────────────────────────────────────────────
// Homepage SEO content sections (server-rendered, premium light theme)
// ─────────────────────────────────────────────────────────────────────────────
const whyChoose = [
  { icon: Building2, title: "In-House Event Production", desc: "Stage, AV, lighting and LED delivered by our own team — not subcontracted — for one accountable point of delivery." },
  { icon: ShieldCheck, title: "GEA Permits & Compliance", desc: "We secure General Entertainment Authority permits, municipality approvals, and civil-defense clearances end-to-end." },
  { icon: Languages, title: "Bilingual Arabic–English Team", desc: "Project managers, hosts, and event collateral in both languages for domestic and international audiences." },
  { icon: Sparkles, title: "Vision 2030 Experience", desc: "Delivering cultural, government, and corporate events aligned with the Kingdom's transformation agenda." },
  { icon: Users, title: "One Accountable Team", desc: "A single integrated team from first brief to on-day execution — no multi-vendor friction or finger-pointing." },
  { icon: MapPin, title: "Kingdom-Wide Venue Network", desc: "Preferred access to leading venues in Riyadh, Jeddah, Dammam, AlUla, and NEOM." },
];

function WhyChooseSection() {
  return (
    <section
      className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden"
      style={{ backgroundImage: "url('/locations/riyadh-hero.webp')" }}
      aria-label="Why choose our event management company"
    >
      {/* Elegant dark overlay so the white text + glass cards read clearly */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.78) 0%, rgba(15,23,42,0.68) 50%, rgba(15,23,42,0.82) 100%)" }}
      />
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="section-label mx-auto mb-4 !text-amber-300">
            <span className="w-6 h-0.5 rounded-full bg-amber-300 opacity-60" />
            Why Choose Us
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-semibold mt-4" style={{ letterSpacing: "-0.025em" }}>
            Why Choose Our <span className="text-amber-300">Event Management Company in Saudi Arabia</span>
          </h2>
          <p className="text-white/70 mt-4 text-[15px] leading-relaxed">
            A full-service event management company trusted for corporate events, conferences, exhibitions, and weddings across the Kingdom.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.map((r) => (
            <div
              key={r.title}
              className="bg-white/[0.07] border border-white/15 rounded-2xl p-7 backdrop-blur-md hover:bg-white/[0.12] hover:border-amber-300/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-300/15 border border-amber-300/20 flex items-center justify-center mb-5">
                <r.icon size={22} className="text-amber-300" />
              </div>
              <h3 className="font-semibold text-white text-[17px] mb-2" style={{ letterSpacing: "-0.01em" }}>{r.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const industries = [
  "Government & Ministries", "Energy, Oil & Gas", "Banking & Finance", "Healthcare & Pharma",
  "Technology & Telecom", "Weddings & Social Events", "Exhibitions & Trade Shows",
  "Conferences & Summits", "Cultural & Seasonal Events", "Luxury & VIP Hospitality",
];

function IndustriesSection() {
  return (
    <section className="bg-[var(--surface-raised)] py-24 border-t border-neutral-100" aria-label="Industries and event types we serve">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center">
        <span className="section-label mx-auto mb-4">
          <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
          Who We Serve
        </span>
        <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold mt-4" style={{ letterSpacing: "-0.025em" }}>
          Industries & <span className="text-[var(--primary)]">Event Types We Serve</span>
        </h2>
        <p className="text-neutral-500 mt-4 mb-10 text-[15px] leading-relaxed max-w-2xl mx-auto">
          From government conferences and energy-sector summits to royal weddings and trade exhibitions, we plan and produce events for every major sector in Saudi Arabia.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((i) => (
            <span key={i} className="bg-white border border-neutral-200/80 text-neutral-700 text-sm font-medium px-5 py-2.5 rounded-full">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const linkHub = {
  services: [
    { label: "Corporate Event Management", href: "/services/corporate-events" },
    { label: "Wedding Planning in Saudi Arabia", href: "/services/weddings" },
    { label: "Conference Management", href: "/services/conferences" },
    { label: "Exhibition Management Company", href: "/services/exhibitions" },
    { label: "Event Production Services", href: "/services/event-production" },
    { label: "Destination Events in AlUla & NEOM", href: "/services/destination-events" },
    { label: "VIP & Private Event Planning", href: "/services/luxury-vip-events" },
    { label: "Cultural & Seasonal Events", href: "/services/cultural-events" },
    { label: "Royal Wedding Planning", href: "/services/royal-weddings" },
  ],
  locations: [
    { label: "Event Management in Riyadh", href: "/locations/riyadh" },
    { label: "Event Planning in Jeddah", href: "/locations/jeddah" },
    { label: "Events in Dammam", href: "/locations/dammam" },
    { label: "Destination Events in AlUla", href: "/locations/alula" },
    { label: "All Locations We Serve", href: "/locations" },
  ],
  company: [
    { label: "Our Event Portfolio", href: "/portfolio" },
    { label: "About Our Team", href: "/about" },
    { label: "Client Testimonials", href: "/testimonials" },
    { label: "Contact Our Event Planners", href: "/contact" },
    { label: "Book a Free Consultation", href: "/consultation" },
  ],
};

const homeFaqs = [
  {
    q: "Which cities in Saudi Arabia do you cover?",
    a: "We operate Kingdom-wide — with dedicated teams in Riyadh, Jeddah, Dammam and AlUla, plus coverage of Makkah, Madinah, NEOM and the Red Sea coast for destination events.",
  },
  {
    q: "How much does event management cost in Saudi Arabia?",
    a: "It depends on event type and scale. As a guide, corporate events start from SAR 75,000, weddings from SAR 50,000, conferences from SAR 45,000, and exhibitions from SAR 80,000. We provide a bespoke proposal after a free consultation.",
  },
  {
    q: "Do you handle event permits and GEA compliance?",
    a: "Yes. We manage General Entertainment Authority (GEA) permits, municipality approvals, and civil-defense and police clearances end-to-end, so your event is fully licensed.",
  },
  {
    q: "How early should I book an event management company?",
    a: "For large corporate events and galas we recommend 4–6 months; for weddings and destination events in AlUla or NEOM, 6–12 months to secure premium venues and talent.",
  },
  {
    q: "Do you manage both Arabic and English events?",
    a: "Yes — our project teams are fully bilingual, with simultaneous Arabic-English interpretation and bilingual collateral for domestic and international audiences.",
  },
];

function FaqPreview() {
  return (
    <section className="bg-[var(--surface-raised)] py-24 border-t border-neutral-100" aria-label="Frequently asked questions">
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <span className="section-label mx-auto mb-4">
            <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            FAQ
          </span>
          <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold mt-4" style={{ letterSpacing: "-0.025em" }}>
            Event Management in Saudi Arabia — <span className="text-[var(--primary)]">FAQs</span>
          </h2>
        </div>
        <div className="space-y-3">
          {homeFaqs.map((f) => (
            <details key={f.q} className="group bg-white border border-neutral-200/80 rounded-2xl px-6 py-5 transition-colors hover:border-[var(--primary)]/30 open:border-[var(--primary)]/30">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-neutral-900 text-[15px]">{f.q}</span>
                <ChevronDown size={18} className="text-[var(--primary)] shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-neutral-500 text-sm leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/faq" className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm border border-[var(--primary)]/30 rounded-full px-6 py-3 hover:bg-[var(--primary)]/5 transition-colors">
            View All FAQs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InternalLinkHub() {
  const col = (title: string, items: { label: string; href: string }[]) => (
    <div>
      <p className="font-semibold text-neutral-900 mb-4 uppercase tracking-wider text-xs">{title}</p>
      <ul className="space-y-2.5">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-[14px] text-neutral-600 hover:text-[var(--primary)] transition-colors">
              <span>{l.label}</span>
              <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="bg-white py-24 border-t border-neutral-100" aria-label="Explore Saudi Event Management">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.025em" }}>
            Explore <span className="text-[var(--primary)]">Saudi Event Management</span>
          </h2>
          <p className="text-neutral-500 mt-4 text-[15px] leading-relaxed">
            Browse our event management services, the Saudi cities we operate in, and the work behind 250+ delivered events.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {col("Event Management Services", linkHub.services)}
          {col("Locations We Serve", linkHub.locations)}
          {col("Company", linkHub.company)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-level schema (supplements layout.tsx global schema)
// ─────────────────────────────────────────────────────────────────────────────
// Page-level schema only. Organization (#organization) and WebSite (#website)
// are defined once in layout.tsx — re-declaring them here created two nodes with
// the same @id but different properties, which confuses entity resolution. The
// homepage now contributes only page-specific nodes: the hero VideoObject, the
// FAQ (synced 1:1 with the visible FAQ section), and high-level Service entities.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Makes the hero background video eligible for Google video indexing.
      // (Update uploadDate when the showreel is replaced.)
      "@type": "VideoObject",
      "@id": "https://saudieventmanagement.com/#hero-video",
      name: "Saudi Event Management — Luxury Event Production in Saudi Arabia",
      description:
        "Showreel of luxury weddings, royal ceremonies, corporate galas, and exhibitions produced by Saudi Event Management across Riyadh, Jeddah, Dammam, and AlUla.",
      thumbnailUrl: ["https://saudieventmanagement.com/hero_bg.webp"],
      uploadDate: "2026-06-01T09:00:00+03:00",
      duration: "PT5S",
      contentUrl: "https://saudieventmanagement.com/hero-video1.mp4",
      url: "https://saudieventmanagement.com/",
      isFamilyFriendly: true,
      inLanguage: "en",
      publisher: { "@id": "https://saudieventmanagement.com/#organization" },
    },
    {
      // Synced 1:1 with the visible FAQ section (homeFaqs) so the structured
      // data always matches on-page content — a Google rich-results requirement.
      "@type": "FAQPage",
      mainEntity: homeFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "Service",
      serviceType: "Corporate Event Planning",
      provider: {
        "@id": "https://saudieventmanagement.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "Saudi Arabia"
      }
    },
    {
      "@type": "Service",
      serviceType: "Luxury Wedding Production",
      provider: {
        "@id": "https://saudieventmanagement.com/#organization"
      },
      areaServed: {
        "@type": "Country",
        name: "Saudi Arabia"
      }
    }
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function Home({ params }: PageProps) {
  // Locale comes from the route segment (the single source of truth) — not a
  // cookie, which can desync from the URL and breaks static rendering.
  const { locale } = await params;

  return (
    /*
      bg-ink-950  → deep black base (from tailwind.config)
      text-sand-100 → warm near-white body text

      REMOVED: bg-ink-800 — this was overriding the dark theme set in layout.tsx
    */
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Utility overlays ─────────────────────────────────────────────── */}
      <ScrollProgress />
      <WhatsAppButton />

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <Navbar darkHero locale={locale} />

      {/* ── Sections — ordered by conversion priority ─────────────────────
          Hero          → First impression, booking form
          MarqueeStrip  → Social proof ticker
          ContactSection→ Direct inquiry (high intent visitors)
          StatsSection  → Trust numbers
          FilterablePortfolio → Work showcase
          HowItWorks    → Process transparency
          MapClient     → Location presence
          BlogPreview   → Content / SEO
          PartnersSection → Authority / credibility
          InstagramFeed → Social proof
          EngagementHub → Community + reviews
          Footer        → Navigation + newsletter
      ──────────────────────────────────────────────────────────────────── */}
      <Hero />
      <GeoDefinitionBlock />
      <MarqueeStrip />

      {/* ── Premium parallax band — Get in Touch form over a fixed Saudi backdrop ── */}
      <div
        className="relative isolate bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/homepage/form.jpg')" }}
      >
        <div aria-hidden className="absolute inset-0 bg-slate-900/70" />
        <ContactSection />
      </div>

      <StatsSection />
      <Services />
      <WhyChooseSection />
      <FilterablePortfolio />

      {/* ── Premium parallax band — Our Methodology over a fixed process backdrop ── */}
      <div
        className="relative isolate bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/process-parallax.webp')" }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.72) 50%, rgba(15,23,42,0.85) 100%)" }}
        />
        <HowItWorks />
      </div>

      <IndustriesSection />
      <CityPresence />
      <MapClient />
      <BlogPreview />

      {/* ── All Articles Index — ensures every blog post is linked from homepage ── */}
      <section className="bg-white border-t border-neutral-100 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>
              All <span className="text-[var(--primary)]">Articles</span>
            </h2>
            <Link href="/blog" className="text-[13px] font-medium text-[var(--primary)] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-neutral-100 hover:border-[var(--primary)]/30 hover:bg-neutral-50 transition-all"
              >
                <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-60" />
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[var(--primary)] uppercase tracking-wider mb-1">{post.category}</p>
                  <p className="text-[13px] font-medium text-neutral-800 group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">{post.title}</p>
                  <p className="text-[11px] text-neutral-400 mt-1">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />
      <InstagramFeed />
      <EngagementHub />
      <VendorCTA />
      <FaqPreview />
      <InternalLinkHub />
      <Footer />
    </main>
  );
}