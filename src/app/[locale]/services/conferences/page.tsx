import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Mic, Users, Monitor, Globe, Headphones, Video,
  ClipboardList, Shield, ChevronRight, Award,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/conferences`;

  return {
    title: "Conference Management Services Riyadh | B2B Summit Planning Saudi Arabia",
    description:
      "Expert conference management company in Riyadh, Saudi Arabia. We handle B2B summits, scientific conferences, hybrid events, speaker management, and stage production for 50–5,000 delegates.",
    keywords: [
      "Conference management Riyadh",
      "Conference organizer Saudi Arabia",
      "B2B summit planning KSA",
      "Hybrid conference services Saudi Arabia",
      "PCO services Riyadh",
      "Speaker management Saudi Arabia",
      "Scientific conference organizer KSA",
      "إدارة مؤتمرات الرياض",
      "تنظيم مؤتمرات السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/conferences",
        "ar-SA": "https://saudieventmanagement.com/ar/services/conferences",
      },
    },
    openGraph: {
      title: "Conference Management Services Riyadh | Saudi Event Management",
      description:
        "Premier conference management in Riyadh and across Saudi Arabia — B2B summits, hybrid streaming, VIP protocol, and full AV production.",
      url: canonicalUrl,
      images: [{ url: "/gallery_2.webp", width: 1200, height: 630, alt: "Conference Management Riyadh" }],
    },
  };
}

const services = [
  {
    icon: ClipboardList,
    title: "B2B Summit Planning",
    desc: "End-to-end management for ministerial-level and commercial summits — agenda design, delegate acquisition, registration systems, and on-site logistics at KAFD and KAICC.",
  },
  {
    icon: Mic,
    title: "Stage & AV Production",
    desc: "Concert-grade line-array sound, high-resolution LED walls, multi-camera live switching, and intelligent lighting for audiences of 50 to 5,000+ delegates.",
  },
  {
    icon: Users,
    title: "Speaker Management",
    desc: "International and regional speaker sourcing, green room coordination, technical rider fulfillment, rehearsal scheduling, and on-day handler support.",
  },
  {
    icon: Monitor,
    title: "Hybrid & Live Streaming",
    desc: "Seamless hybrid event production with multi-platform live streaming, real-time polling, virtual networking rooms, and on-demand content archives.",
  },
  {
    icon: Headphones,
    title: "Simultaneous Translation",
    desc: "ISO-standard simultaneous interpretation booths for Arabic-English and multilingual sessions, serving diplomatic and international delegations.",
  },
  {
    icon: ClipboardList,
    title: "Delegate Registration",
    desc: "Custom-branded delegate portals, RFID badge printing, access-controlled session ticketing, and real-time attendance analytics dashboards.",
  },
  {
    icon: Shield,
    title: "VIP & Diplomatic Protocol",
    desc: "Motorcade coordination, close-protection liaison, secure perimeter management, and Ministry-level dignitary reception with full protocol briefings.",
  },
  {
    icon: Video,
    title: "Post-Conference Media",
    desc: "Cinematic highlight reels, verbatim transcription, press release distribution, social media content packages, and executive summary reports.",
  },
];

const resources = [
  {
    title: "Top conference venues in Riyadh: KAFD, KAICC, and Al Faisaliah compared",
    desc: "An expert breakdown of the Kingdom's premier conference spaces, capacities, and AV capabilities.",
  },
  {
    title: "Hybrid conference technology guide for Saudi Arabia 2025",
    desc: "Choosing the right streaming platform, translation tech, and delegate management system.",
  },
  {
    title: "Conference cost breakdown: What does event management cost in KSA?",
    desc: "Transparent pricing analysis for PCO services, AV production, and venue rental across Riyadh.",
  },
  {
    title: "How to secure GEA permits for conferences in Saudi Arabia",
    desc: "Step-by-step guide to regulatory compliance, speaker visa facilitation, and security clearances.",
  },
];

const faqs = [
  {
    q: "What is included in professional conference management?",
    a: "Professional conference management (PCO services) covers venue sourcing and negotiation, registration system setup, speaker coordination, AV production, simultaneous translation, VIP protocol management, on-site staffing, catering coordination, and post-event reporting. Saudi Event Management provides all of these under one roof.",
  },
  {
    q: "What are the best conference venues in Riyadh?",
    a: "The top conference venues in Riyadh include the King Abdullah Financial District (KAFD) Conference Center — ideal for large ministerial summits — the King Abdul Aziz International Conference Center (KAICC), Al Faisaliah Hotel, Ritz-Carlton Riyadh, and JW Marriott Hotel Riyadh. We hold preferred partnerships with all major venues.",
  },
  {
    q: "How much does conference management cost in Saudi Arabia?",
    a: "Conference management costs in Saudi Arabia start from approximately SAR 55,000 for a single-day summit for 100 delegates and scale significantly for multi-day events with international speakers and hybrid broadcasting. Contact us for a bespoke proposal tailored to your delegate count and technical requirements.",
  },
  {
    q: "Can you manage hybrid and virtual conferences in Saudi Arabia?",
    a: "Yes. Saudi Event Management deploys professional broadcast-grade hybrid conference solutions including multi-camera production, enterprise streaming platforms (Zoom Webinar, Hopin, custom RTMP), simultaneous translation feeds, and interactive delegate features for both in-room and online participants.",
  },
  {
    q: "How many delegates can you manage at one conference?",
    a: "We have experience managing conferences from 50 to over 5,000 delegates. Our delegate management systems are scalable, and we have executed government-level summits with multiple breakout tracks and VIP ministerial streams running simultaneously.",
  },
  {
    q: "Do you provide simultaneous translation at conferences?",
    a: "Yes. We provide ISO-standard simultaneous interpretation booths with professional interpreter teams for Arabic-English, French, Mandarin, and other languages. We also offer RSI (Remote Simultaneous Interpretation) for hybrid events.",
  },
  {
    q: "What AV setup do I need for a 1,000-person conference in Riyadh?",
    a: "A 1,000-person conference typically requires a main line-array sound system, dual LED confidence monitors, a central projection or ultra-wide LED wall, 3–5 camera positions for live switching, lavalier and podium microphones, wireless audience response systems, and a dedicated technical director. Our AV team will design a full technical rider for your venue.",
  },
  {
    q: "conference organizer near me Riyadh",
    a: "Saudi Event Management is headquartered in Riyadh with a full-time conference production team on call. We provide on-site walkthroughs, venue inspections, and rapid response logistics for any conference requirement across the capital.",
  },
  {
    q: "best conference management company Saudi Arabia",
    a: "Saudi Event Management is widely regarded as one of the best conference management companies in Saudi Arabia, having organized events for Saudi Aramco, HRDF, SABIC, and multiple ministerial bodies. Our IAPCO-aligned methodologies and ISO-certified AV partners ensure world-class execution.",
  },
  {
    q: "How early should I book a conference organizer in Riyadh?",
    a: "For a conference of 200+ delegates with international speakers, we recommend engaging a PCO at least 4–6 months in advance. This allows time for venue negotiation, GEA permitting, speaker visa facilitation, and the build-out of registration systems and event branding.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Conference Management Services Riyadh",
      "description":
        "End-to-end conference management services in Riyadh, Saudi Arabia — B2B summits, PCO services, hybrid streaming, speaker management, and VIP protocol.",
      "provider": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com",
      },
      "areaServed": ["Riyadh", "Jeddah", "Dammam", "Saudi Arabia"],
      "serviceType": "Conference Management",
      "url": "https://saudieventmanagement.com/services/conferences",
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
      "@type": "HowTo",
      "name": "How to organise a conference in Saudi Arabia",
      "step": [
        { "@type": "HowToStep", "text": "Define objectives, delegate profile, and budget range for your KSA conference." },
        { "@type": "HowToStep", "text": "Select and book a venue (KAFD, KAICC, or hotel conference centre) 4–6 months in advance." },
        { "@type": "HowToStep", "text": "Engage Saudi Event Management as your PCO for permit applications, speaker management, and AV production." },
        { "@type": "HowToStep", "text": "Launch delegate registration portal and build event agenda with simultaneous translation if required." },
        { "@type": "HowToStep", "text": "Execute the event with our on-site team and capture post-event media for distribution." },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Conference Management", "item": "https://saudieventmanagement.com/services/conferences" },
      ],
    },
    {
      "@type": "Organization",
      "name": "Saudi Event Management — Conference Division",
      "description": "IAPCO-aligned professional conference organiser (PCO) for government, corporate, and scientific summits in Saudi Arabia.",
      "memberOf": { "@type": "Organization", "name": "GEA Certified Event Organizers" },
    },
  ],
};

export default function ConferencesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-emerald-950 overflow-hidden pt-20">
        <ScrollProgress />
        <WhatsAppButton />
        <Navbar />

        <InternalPageHero
          title="Conference Management"
          titleHighlight="Saudi Arabia"
          subtitle="Leading Professional Conference Organiser (PCO) in Saudi Arabia — government summits, B2B conferences, and scientific congresses for entities including Saudi Aramco, HRDF, and SABIC."
          backgroundImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"
          imageAlt="Conference management company Riyadh Saudi Arabia"
          badge="Conferences & Summits"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Conferences" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-[var(--primary)] text-emerald-900 font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              Request a PCO Proposal
            </Link>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-12 border-y border-white/5 bg-emerald-900/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-widest">IAPCO-Aligned</p>
                  <p className="text-[10px] text-gray-500 uppercase">PCO Best Practices</p>
                </div>
              </div>
              <div className="flex gap-10 grayscale opacity-50 text-[10px] font-bold tracking-widest text-white">
                <span>SAUDI ARAMCO</span>
                <span>HRDF</span>
                <span>SABIC</span>
                <span>KAFD</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-widest uppercase">
                &quot;Trusted PCO for Vision 2030 Summits&quot;
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white font-bold">
              Our Conference <span className="text-[var(--primary)]">Capabilities</span>
            </h2>
            <div className="w-16 h-px bg-[var(--primary)]/50 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-emerald-900 border border-white/5 p-8 rounded-2xl hover:border-[var(--primary)]/30 transition-all duration-500 group"
              >
                <s.icon
                  size={32}
                  className="text-[var(--primary)] mb-6 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-lg font-bold text-white mb-4">{s.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-32 bg-emerald-900/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-white">
                  Conference <br />
                  <span className="text-[var(--primary)]">Intelligence</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Expert resources for navigating the conference and summit landscape in the Kingdom.
                </p>
                <Link href="/blog" className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">
                  View All Articles
                </Link>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">Dr. Nadia Al-Rashidi</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Conference Strategy Director</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((r, i) => (
                  <div
                    key={i}
                    className="p-6 bg-emerald-950 rounded-2xl hover:bg-[var(--primary)]/5 transition-colors cursor-pointer group"
                  >
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {r.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-32 bg-white text-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-sans font-bold leading-tight">
                  الريادة في <br />
                  <span className="text-[var(--primary)]">إدارة المؤتمرات</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  تُعدّ إدارة الفعاليات السعودية من أبرز{" "}
                  <strong>شركات إدارة المؤتمرات في الرياض</strong>، حيث نقدم حلولاً شاملة
                  لتنظيم المؤتمرات الحكومية والتجارية والعلمية. نتولى جميع جوانب التخطيط من
                  إدارة المتحدثين وأنظمة التسجيل إلى الإنتاج التقني المتكامل.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  {[
                    { label: "مؤتمرات منفذة", value: "200+" },
                    { label: "مندوب مُدار", value: "50K+" },
                    { label: "سنوات خبرة", value: "15+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-[var(--primary)]">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { ar: "إدارة مؤتمرات الرياض", en: "Conference Management Riyadh" },
                  { ar: "تنظيم مؤتمرات جدة", en: "Conference Organizer Jeddah" },
                  { ar: "مؤتمرات الأعمال السعودية", en: "B2B Summits KSA" },
                  { ar: "خدمات المؤتمرات الهجينة", en: "Hybrid Conference Services" },
                ].map((item) => (
                  <div key={item.en} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <p className="text-[var(--primary)] font-bold text-sm mb-1">{item.ar}</p>
                    <p className="text-gray-500 text-xs">{item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-emerald-900/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">
                Conference Management <span className="text-[var(--primary)]">FAQ</span>
              </h2>
              <p className="text-gray-500 mt-3 text-xs uppercase tracking-widest">
                Everything you need to know about organising a conference in Saudi Arabia
              </p>
            </div>

            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-emerald-950 border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-base font-bold text-[var(--primary)] mb-3">{faq.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-emerald-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-widest">
              Related Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Corporate Events", slug: "corporate-events", desc: "AGMs, gala dinners, and executive retreats for Saudi corporates." },
                { title: "Exhibitions & Trade Shows", slug: "exhibitions", desc: "Booth design, stand building, and full trade show management." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and technical production for any scale." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-emerald-900 border border-white/5 rounded-2xl p-6 hover:border-[var(--primary)]/30 transition-all"
                >
                  <h4 className="text-white font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                    Learn More <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conference Locations ── */}
        <section className="py-16 bg-emerald-900/20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Conference Management by City</h3>
            <p className="text-white/40 text-xs mb-8">PCO services and conference management across Saudi Arabia&apos;s major convention cities.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Conference Management Riyadh", href: "/locations/riyadh" },
                { name: "Conference Management Jeddah", href: "/locations/jeddah" },
                { name: "Conference Management Dammam", href: "/locations/dammam" },
              ].map((loc) => (
                <Link
                  key={loc.href}
                  href={loc.href}
                  className="px-5 py-2.5 bg-emerald-900 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conference Insights ── */}
        <section className="py-20 bg-emerald-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-widest">Conference Planning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", slug: "mice-tourism-saudi-arabia-complete-guide-2026", desc: "Everything you need to know about Saudi Arabia's booming MICE industry — market size, key venues, and Vision 2030 strategy." },
                { title: "State of the MICE Industry in Saudi Arabia 2026", slug: "state-of-mice-industry-saudi-arabia-2026", desc: "Exclusive analysis of the MICE sector — explosive growth metrics, super-venues, and sustainability requirements." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-emerald-900 border border-white/5 rounded-2xl p-6 hover:border-[var(--primary)]/30 transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Industry Insight</span>
                  <h4 className="text-white font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                    Read Article <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
