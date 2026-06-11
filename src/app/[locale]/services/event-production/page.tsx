import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Zap, Music, Monitor, Camera, Layers, PenTool,
  Cpu, Lightbulb, ChevronRight, Award,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/event-production`;

  return {
    title: "Event Production Company Saudi Arabia | Stage, Sound & Lighting Riyadh",
    description:
      "Premier event production company in Saudi Arabia. Custom stage fabrication, concert-grade sound engineering, intelligent lighting design, LED & projection mapping for corporate and luxury events in Riyadh & Jeddah.",
    keywords: [
      "Event production company Saudi Arabia",
      "Stage design Riyadh",
      "AV production KSA",
      "Sound system rental Riyadh",
      "LED projection mapping Saudi Arabia",
      "Lighting design events Riyadh",
      "Event production Jeddah",
      "إنتاج فعاليات الرياض",
      "شركة إنتاج أحداث السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/event-production",
        "ar-SA": "https://saudieventmanagement.com/ar/services/event-production",
      },
    },
    openGraph: {
      title: "Event Production Company Saudi Arabia | Saudi Event Management",
      description:
        "Custom stage design, concert-grade AV, intelligent lighting, and immersive projection mapping for events across Saudi Arabia.",
      url: canonicalUrl,
      images: [{ url: "/gallery_vip_party.webp", width: 1200, height: 630, alt: "Event Production Saudi Arabia" }],
    },
  };
}

const services = [
  {
    icon: Layers,
    title: "Stage Design & Fabrication",
    desc: "Custom architectural stage builds from 10m to 100m wide — bespoke structures, multi-level platforms, and scenic set fabrication using structural steel, acrylic, and timber.",
  },
  {
    icon: Lightbulb,
    title: "Intelligent Lighting Design",
    desc: "Dynamic RGBW moving-head fixtures, atmospheric haze, architectural wash, gobo projection, and pixel-mapped LED strips creating immersive environments at any scale.",
  },
  {
    icon: Music,
    title: "Concert-Grade Sound Engineering",
    desc: "Line-array speaker systems, RF wireless management, acoustic room tuning, in-ear monitor systems, and professional FOH and monitor mixing for flawless clarity.",
  },
  {
    icon: Monitor,
    title: "LED & Projection Mapping",
    desc: "Ultra-high-resolution LED walls, curved and cylindrical LED installations, 3D architectural projection mapping, and real-time generative content for immersive experiences.",
  },
  {
    icon: Zap,
    title: "Power & Structural Rigging",
    desc: "Site-rated generator supply, clean power distribution systems, certified structural rigging, point load calculations, and roof truss engineering.",
  },
  {
    icon: Camera,
    title: "Live Content & Broadcasting",
    desc: "Multi-camera live switching, broadcast-quality graphics playback, real-time video compositing, IMAG screens, and simultaneous streaming infrastructure.",
  },
  {
    icon: PenTool,
    title: "Themed Environment Design",
    desc: "Custom scenic elements, bespoke floral installations, branded experiential design, entrance activation builds, and full-scale themed decor concepts.",
  },
  {
    icon: Cpu,
    title: "Specialist Crew & Management",
    desc: "Expert on-site technical directors, stage managers, riggers, AV operators, lighting programmers, and RF coordinators — certified and experienced in KSA environments.",
  },
];

const priceGuide = [
  { category: "AV Production (full-day event)", from: "SAR 18,000", inclusions: "Sound, screens, lighting, 2 techs" },
  { category: "Stage Design & Build", from: "SAR 35,000", inclusions: "3D render, fabrication, install, strike" },
  { category: "LED Wall Rental", from: "SAR 12,000", inclusions: "P2.6 pixel pitch, rigging, operator" },
  { category: "Projection Mapping", from: "SAR 25,000", inclusions: "Content creation, mapping, show operation" },
  { category: "Lighting Design Package", from: "SAR 15,000", inclusions: "Intelligent fixtures, programmer, dimmer racks" },
  { category: "Live Broadcast Setup", from: "SAR 20,000", inclusions: "Cameras, vision mixer, graphics, stream" },
];

const resources = [
  {
    title: "Event Production Cost Guide Saudi Arabia 2026",
    desc: "Transparent pricing for AV systems, stage design, LED walls, lighting rigs, and projection mapping.",
    href: "/blog/event-production-cost-guide-saudi-arabia-2026",
  },
  {
    title: "Best Corporate Event Venues in Riyadh 2026",
    desc: "KAFD Conference Center, Ritz-Carlton, and Four Seasons compared for AV specs and booking timelines.",
    href: "/blog/best-corporate-event-venues-riyadh-2026",
  },
  {
    title: "2026 Event Decor Trends Redefining Saudi Arabia",
    desc: "Futuristic minimalism, cultural fusion, and immersive 360° environments dominating the Saudi market.",
    href: "/blog/2026-exceptional-event-decor-trends-saudi-arabia",
  },
  {
    title: "The Future of Event Production in Saudi Arabia",
    desc: "How cutting-edge technology and sustainable practices are transforming event production under Vision 2030.",
    href: "/blog/future-event-production-saudi-arabia-technology-sustainability",
  },
];

const faqs = [
  {
    q: "What is event production?",
    a: "Event production encompasses all the technical elements that bring an event to life: stage design, sound engineering, lighting, visual displays (LED and projection), structural rigging, power supply, and live broadcasting. Saudi Event Management provides all disciplines in-house for seamless co-ordination.",
  },
  {
    q: "How much does event production cost in Saudi Arabia?",
    a: "Event production costs in Saudi Arabia vary significantly by scale and complexity. A single-day corporate event AV package starts from around SAR 18,000. A full-scale stage fabrication and production for a 1,000-person gala or concert may range from SAR 150,000 to SAR 500,000+. Contact us for a detailed itemised quote.",
  },
  {
    q: "Can you provide sound systems for outdoor events in Saudi Arabia?",
    a: "Yes. We supply weather-rated line-array systems, delay towers, and subwoofer arrays designed for outdoor environments, including desert locations in AlUla and beachfront venues along the Red Sea. All systems include on-site sound engineers and RF co-ordination.",
  },
  {
    q: "Can you handle projection mapping at AlUla or Diriyah heritage sites?",
    a: "Yes. Saudi Event Management has delivered projection mapping activations at heritage venues. We work closely with Royal Commission for AlUla (RCU) and Diriyah Gate Development Authority (DGDA) for site permissions and zero-impact production protocols.",
  },
  {
    q: "Do you work on National Day and Riyadh Season shows?",
    a: "Yes. We have contributed to National Day (September 23) and Riyadh Season productions, providing stage fabrication, LED walls, intelligent lighting, and full AV production for large-scale public events and brand activations.",
  },
  {
    q: "What is the largest stage you have built in Saudi Arabia?",
    a: "Our largest stage builds have included main stages spanning 60 metres wide for concert-scale productions. Our fabrication team uses certified structural steel and provides full engineering drawings and load calculations for venue approval.",
  },
  {
    q: "event production company near me Riyadh",
    a: "Saudi Event Management's production warehouse and team are based in Riyadh, making us the ideal choice for any event production requirement in the capital — from a corporate theatre setup to a concert-scale festival production.",
  },
  {
    q: "sound system rental Riyadh",
    a: "We provide concert-grade sound system rental in Riyadh including line-array systems (L-Acoustics, d&b audiotechnik), wireless microphone packages, in-ear monitor systems, and full AV operator support for events of any size.",
  },
  {
    q: "How far in advance should I book an event production company?",
    a: "For complex productions with custom stage builds, we recommend 8–12 weeks' lead time minimum. For standard AV packages, 3–4 weeks is usually sufficient. For large-scale concerts or National Day activations, 3–6 months is ideal to allow for design, permitting, and fabrication.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Event Production Company Saudi Arabia",
      "description":
        "Bespoke event production services including custom stage fabrication, concert-grade sound systems, intelligent lighting design, and 360° LED projection mapping across Saudi Arabia.",
      "provider": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com",
      },
      "areaServed": ["Riyadh", "Jeddah", "Dammam", "AlUla", "Saudi Arabia"],
      "serviceType": "Event Production",
      "url": "https://saudieventmanagement.com/services/event-production",
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
      "name": "How to book event production services in Saudi Arabia",
      "step": [
        { "@type": "HowToStep", "text": "Define your event scale, expected guest count, venue, and key technical requirements." },
        { "@type": "HowToStep", "text": "Share your event brief with Saudi Event Management for a technical rider and itemised quote." },
        { "@type": "HowToStep", "text": "Approve 3D stage renders and technical drawings. Confirm rigging loads with the venue." },
        { "@type": "HowToStep", "text": "Our fabrication team begins stage construction. AV equipment is pre-rigged and tested in our warehouse." },
        { "@type": "HowToStep", "text": "On-site build, full technical rehearsal, show day execution, and post-event de-rig." },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Event Production", "item": "https://saudieventmanagement.com/services/event-production" },
      ],
    },
  ],
};

export default function EventProductionPage() {
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
          title="Event Production Services"
          titleHighlight="Saudi Arabia"
          subtitle="Technical powerhouse for custom stage fabrication, concert-grade sound systems, LED projection mapping, and National Day show productions — transforming any venue into an extraordinary experience."
          backgroundImage="/riyadh_summit_people.webp"
          imageAlt="Grand event production setup inside luxury chandelier ballroom in Saudi Arabia"
          badge="Event Production"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Event Production" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-[var(--primary)] text-emerald-900 font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              Get a Production Quote
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
                  <p className="text-white font-bold text-sm tracking-widest">ISO 9001 Certified</p>
                  <p className="text-[10px] text-gray-500 uppercase">Technical Production Standards</p>
                </div>
              </div>
              <div className="flex gap-10 grayscale opacity-50 text-[10px] font-bold tracking-widest text-white">
                <span>L-ACOUSTICS</span>
                <span>ROBE LIGHTING</span>
                <span>SAMSUNG LED</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-widest uppercase">
                &quot;Technical Partner — Riyadh Season Activations&quot;
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white font-bold">
              Production <span className="text-[var(--primary)]">Capabilities</span>
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

        {/* ── Price Guide ── */}
        <section className="py-32 bg-emerald-900/40 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">
                Investment <span className="text-[var(--primary)]">Guide</span>
              </h2>
              <p className="text-gray-500 mt-3 text-xs uppercase tracking-widest">
                Indicative 2025 production rates — Saudi Arabia
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-emerald-950 shadow-2xl">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left">Service</th>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left">Starting From</th>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left hidden md:table-cell">Key Inclusions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {priceGuide.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-5 text-white font-medium text-sm">{row.category}</td>
                      <td className="px-6 py-5 text-[var(--primary)] font-bold text-sm">{row.from}</td>
                      <td className="px-6 py-5 text-gray-500 text-xs hidden md:table-cell">{row.inclusions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-32 bg-emerald-950 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-white">
                  Production <br />
                  <span className="text-[var(--primary)]">Knowledge Hub</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Technical guides for event producers, venue operators, and brand teams planning events in the Kingdom.
                </p>
                <Link href="/blog" className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">
                  View All Articles
                </Link>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">Fahad Al-Sulaiman</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Head of Technical Production</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="p-6 bg-emerald-900 rounded-2xl hover:bg-[var(--primary)]/5 transition-colors cursor-pointer group block"
                  >
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {r.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
                  </Link>
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
                  التميز في <br />
                  <span className="text-[var(--primary)]">الإنتاج التقني</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  نُعدّ إدارة الفعاليات السعودية من الشركات الرائدة في{" "}
                  <strong>إنتاج الفعاليات التقني في المملكة العربية السعودية</strong>. نقدم خدمات
                  تصميم وتركيب المسارح، وهندسة الصوت عالي الجودة، والإضاءة الاحترافية، وإسقاط الصور
                  على الأبنية، لكل أنواع الفعاليات من المؤتمرات الحكومية إلى الحفلات الموسيقية
                  الكبرى.
                </p>
                <div className="space-y-3">
                  {[
                    { ar: "شركة إنتاج صوت وصورة الرياض", en: "AV Production Company Riyadh" },
                    { ar: "تصميم مسارح الفعاليات السعودية", en: "Stage Design Saudi Arabia" },
                    { ar: "تأجير إضاءة فعاليات جدة", en: "Event Lighting Rental Jeddah" },
                    { ar: "إسقاط الصور على المباني KSA", en: "Projection Mapping KSA" },
                  ].map((item) => (
                    <div key={item.en} className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                      <span className="text-[var(--primary)] font-bold text-sm">{item.ar}</span>
                      <span className="text-gray-400 text-xs">— {item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/gallery_corporate_gala.webp"
                  alt="شركة إنتاج فعاليات السعودية - تصميم مسارح وإنتاج صوت وصورة"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-emerald-900/50">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">
                Event Production <span className="text-[var(--primary)]">FAQ</span>
              </h2>
              <p className="text-gray-500 mt-3 text-xs uppercase tracking-widest">
                Technical questions answered by our production experts
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
                { title: "Corporate Events", slug: "corporate-events", desc: "End-to-end corporate event planning with our production team embedded." },
                { title: "Conference Management", slug: "conferences", desc: "PCO services integrating our AV production division for seamless delivery." },
                { title: "Event Services & Venues", slug: "production-venues", desc: "Venue sourcing, catering, decoration, and full hospitality management." },
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

        <Footer />
      </main>
    </>
  );
}
