import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Map, Tent, Anchor, Mountain, Compass, Trees, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/services/destination-events`;
  return {
    title: "Destination Events Saudi Arabia | AlUla, NEOM, Red Sea & Diriyah",
    description:
      "Plan breathtaking destination events in Saudi Arabia. From desert glamping and ancient heritage experiences in AlUla, to luxury yacht events on the Red Sea and futuristic summits in NEOM.",
    keywords: [
      "Destination events Saudi Arabia",
      "AlUla event planning",
      "NEOM event management",
      "Red Sea destination events",
      "Desert safari events KSA",
      "Diriyah heritage events",
      "Luxury glamping Saudi Arabia",
      "Corporate retreat AlUla",
      "فعاليات وجهة السعودية",
      "تنظيم فعاليات العُلا",
    ],
    alternates: {
      canonical: path,
      languages: {
        "en-US": `${base}/services/destination-events`,
        "ar-SA": `${base}/ar/services/destination-events`,
      },
    },
    openGraph: {
      title: "Destination Events Saudi Arabia | AlUla, NEOM & Red Sea",
      description:
        "Breathtaking destination events across Saudi Arabia's most iconic landscapes — AlUla, NEOM, Red Sea, and Diriyah.",
      url: path,
      images: [{ url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000", width: 1200, height: 630, alt: "Destination Events Saudi Arabia" }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Destination Events Saudi Arabia",
      "description":
        "Breathtaking destination event planning across Saudi Arabia's most iconic landscapes — AlUla's ancient heritage, NEOM's futuristic skyline, Red Sea coastal retreats, and Diriyah's mud-brick heritage city.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
      },
      "areaServed": ["AlUla", "NEOM", "Red Sea", "Diriyah", "Jeddah Waterfront", "Saudi Arabia"],
      "serviceType": "Destination Event Management",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you handle travel logistics for destination events in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide complete end-to-end destination event logistics including charter flights, VIP ground transportation, luxury accommodation buyouts, resort co-ordination, and on-the-ground support teams at all remote locations including AlUla, NEOM, and Red Sea resorts.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you build event infrastructure in remote desert locations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our production team specialises in remote event logistics, bringing climate-controlled structural tents, generator power, lighting rigs, catering facilities, and luxury amenities to pristine desert environments while ensuring zero environmental impact and full compliance with RCU or heritage authority regulations.",
          },
        },
        {
          "@type": "Question",
          "name": "How far in advance should we plan a destination event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For major events and weddings in AlUla, we recommend starting planning 6 to 12 months in advance. High-demand periods at luxury resorts (particularly winter months October–March) book quickly, and Royal Commission for AlUla (RCU) site access permits require lead time.",
          },
        },
        {
          "@type": "Question",
          "name": "What are the most scenic event venues in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AlUla's most spectacular event venues include the Maraya concert hall — the world's largest mirrored building, set among ancient Hejaz mountains — the Hegra UNESCO heritage site, Dadan archaeological ruins, and bespoke desert wadi settings. Saudi Event Management holds preferred access to all premium AlUla venues through our RCU partner status.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you organise events at NEOM for international delegates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Saudi Event Management manages corporate retreats, innovation summits, and exclusive brand experiences within the NEOM development. We handle all permitting, delegate travel, accommodation, and on-site logistics for this futuristic destination.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you manage logistics for remote desert events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We deploy a dedicated remote logistics team that manages all production delivery, power generation, water supply, climate control, waste management, and on-site catering. Our teams have executed events in AlUla, Tabuk, and the Empty Quarter with full luxury standards maintained throughout.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the cost of a destination wedding or event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Destination events in AlUla typically start from SAR 250,000 for an intimate gathering and can exceed SAR 2,000,000 for large-scale productions incorporating custom infrastructure, international talent, and luxury resort accommodation buyouts. Contact us for a tailored proposal.",
          },
        },
        {
          "@type": "Question",
          "name": "destination event planner near me Saudi Arabia",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is headquartered in Riyadh with dedicated destination event teams operating year-round across AlUla, NEOM, the Red Sea coast, and Diriyah. We are Saudi Arabia's most experienced destination event management company.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Destination Events", "item": "https://saudieventmanagement.com/services/destination-events" },
      ],
    },
  ],
};

const services = [
  { icon: Mountain, title: "AlUla Events", desc: "Breathtaking events set against the majestic sandstone mountains and ancient Nabataean heritage sites of AlUla — from Maraya to private Hegra dinners." },
  { icon: Compass, title: "NEOM Summits", desc: "Cutting-edge event planning in the futuristic landscape of NEOM — perfect for technology summits, innovation retreats, and visionary corporate gatherings." },
  { icon: Anchor, title: "Red Sea Coastal", desc: "Exclusive beachfront galas, luxury superyacht events, and coastal retreats along the pristine emerald waters of the Saudi Red Sea coast." },
  { icon: Map, title: "Diriyah Heritage", desc: "Immersive cultural events in the historic mud-brick city of Diriyah — blending UNESCO World Heritage authenticity with modern luxury production." },
  { icon: Tent, title: "Desert Glamping", desc: "Bespoke luxury glamping in the Arabian desert — climate-controlled tents, stargazing dinners, falconry, camel rides, and traditional Saudi hospitality." },
  { icon: Trees, title: "Jeddah Waterfront", desc: "High-end corporate and social events on the Jeddah Corniche — rooftop galas, beachfront dinners, and exclusive waterfront venue sourcing." },
];

const destinations = [
  {
    name: "AlUla",
    arabic: "العُلا",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000",
    highlight: "Maraya Hall & Hegra UNESCO Site",
    tags: ["Heritage Events", "Desert Glamping", "Luxury Weddings"],
    desc: "Saudi Arabia's most spectacular destination — 200,000-year-old landscape, ancient Nabataean cities, and the world-famous Maraya mirrored concert hall.",
  },
  {
    name: "NEOM",
    arabic: "نيوم",
    image: "/gallery_corporate_gala.webp",
    highlight: "The Line & Sindalah Island",
    tags: ["Innovation Summits", "Corporate Retreats", "Brand Activations"],
    desc: "The $500B giga-project offering unparalleled backdrop for forward-thinking corporate events, technology conferences, and visionary brand experiences.",
  },
  {
    name: "Red Sea",
    arabic: "البحر الأحمر",
    image: "/gallery_wedding_reception.webp",
    highlight: "Yacht Charters & Coastal Resorts",
    tags: ["Yacht Events", "Beachfront Galas", "Coastal Retreats"],
    desc: "Pristine turquoise waters, untouched coral reefs, and world-class beach resorts — perfect for luxury yacht events and exclusive coastal celebrations.",
  },
  {
    name: "Diriyah",
    arabic: "الدرعية",
    image: "/private_party.webp",
    highlight: "At-Turaif UNESCO District",
    tags: ["Heritage Events", "National Day", "Cultural Activations"],
    desc: "The birthplace of the Kingdom — UNESCO-listed mud-brick architecture providing an authentically Saudi backdrop for cultural events and immersive heritage experiences.",
  },
];

const resources = [
  { title: "AlUla Events Guide: Maraya, Hegra & Desert Experience Planning", desc: "Everything you need to know to plan a flawless event in Saudi Arabia's most spectacular destination.", href: "/blog/alula-events-guide-maraya-hegra-desert" },
  { title: "VIP Executive Retreats in NEOM: A 2026 Guide", desc: "Navigating permits, accommodation, and production logistics inside Saudi Arabia's giga-project.", href: "/blog/vip-executive-retreats-neom-2026" },
  { title: "Event Production Cost Guide Saudi Arabia 2026", desc: "Transparent breakdown of transport, infrastructure, accommodation, and production costs.", href: "/blog/event-production-cost-guide-saudi-arabia-2026" },
  { title: "Destination Weddings in AlUla & The Red Sea", desc: "Crafting breathtaking desert ceremonies and Red Sea beachfront weddings in Saudi Arabia.", href: "/blog/destination-weddings-alula-red-sea" },
];

export default function DestinationEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-sand-50 text-ink-950 overflow-hidden pt-20">
        <Navbar darkHero={false} />

        <InternalPageHero
          title="Destination Event Planning"
          titleHighlight="in Saudi Arabia"
          subtitle="Specialist destination event management across the Kingdom's most breathtaking landscapes — AlUla, NEOM, the Red Sea, and Diriyah — with seamless logistics and extraordinary experiences."
          backgroundImage="/alula_gala_people.webp"
          imageAlt="Destination events Saudi Arabia — AlUla, NEOM, Red Sea"
          badge="Destination Events"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Destination Events" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-10 bg-ink-900 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-white text-xs font-bold tracking-widest">RCU PARTNER — AlUla</span>
              <span className="text-white text-xs font-bold tracking-widest">DGDA — DIRIYAH</span>
              <span className="text-white text-xs font-bold tracking-widest">RED SEA PROJECT</span>
              <span className="text-white text-xs font-bold tracking-widest">NEOM APPROVED</span>
            </div>
          </div>
        </section>

        {/* ── Destination Showcase ── */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-display text-ink-950 mb-4">
                Extraordinary <span className="text-gold-600 italic">Settings</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                Each destination in the Kingdom offers a unique story, an unforgettable backdrop, and a logistical challenge only we can master.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destinations.map((dest, i) => (
                <div key={i} className="group border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={`${dest.name} destination events Saudi Arabia`}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                      <span className="text-gold-400 text-xs">{dest.arabic}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-3">{dest.highlight}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{dest.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {dest.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-gold-50 text-gold-700 px-3 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 bg-sand-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-display text-ink-950 mb-4">
                What We <span className="text-gold-600 italic">Deliver</span>
              </h2>
              <div className="w-16 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 p-8 rounded-sm hover:border-gold-400/50 hover:shadow-xl transition-all duration-500 group"
                >
                  <s.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-display text-ink-950 mb-4 uppercase tracking-wider">{s.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-display font-bold text-ink-950">
                  Destination <br />
                  <span className="text-gold-600 italic">Planning Guide</span>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Expert knowledge for planning extraordinary events at Saudi Arabia&apos;s most iconic locations.
                </p>
                <Link href="/blog" className="inline-block text-gold-600 text-xs font-bold uppercase tracking-widest border-b border-gold-600 pb-1">
                  View All Guides
                </Link>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-ink-950 font-bold text-sm">Khalid Al-Zahrani</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest">Head of Destination Events</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="p-6 bg-sand-50 border border-slate-200 rounded-sm hover:bg-gold-50 transition-colors cursor-pointer group block"
                  >
                    <h4 className="text-ink-950 font-bold text-sm mb-3 group-hover:text-gold-600 transition-colors">{r.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-32 bg-ink-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">
                  فعاليات في <br />
                  <span className="text-gold-400 italic">قلب المملكة</span>
                </h2>
                <p className="text-sand-400 text-lg leading-relaxed">
                  نتخصص في تنظيم{" "}
                  <strong className="text-white">فعاليات وجهة في المملكة العربية السعودية</strong>{" "}
                  بأجمل المواقع الطبيعية والتراثية. من أبهى وجهاتنا: منطقة{" "}
                  <strong className="text-white">العُلا</strong> بتراثها النبطي،
                  ومشروع <strong className="text-white">نيوم</strong> المستقبلي،
                  وشواطئ <strong className="text-white">البحر الأحمر</strong>،
                  وأحياء <strong className="text-white">الدرعية</strong> التراثية.
                </p>
                <div className="space-y-3">
                  {[
                    { ar: "تنظيم فعاليات العُلا السعودية", en: "AlUla Event Planning KSA" },
                    { ar: "فعاليات نيوم والمشاريع الكبرى", en: "NEOM & Giga-Project Events" },
                    { ar: "فعاليات شاطئية البحر الأحمر", en: "Red Sea Coastal Events" },
                    { ar: "فعاليات التراث الدرعية", en: "Diriyah Heritage Events" },
                  ].map((item) => (
                    <div key={item.en} className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                      <span className="text-gold-400 font-bold text-sm">{item.ar}</span>
                      <span className="text-sand-600 text-xs">— {item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/gallery_1.webp"
                  alt="فعاليات وجهة السعودية - العُلا والبحر الأحمر ونيوم"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-ink-950 mb-4">
                Destination Events <span className="text-gold-600 italic">FAQ</span>
              </h2>
              <div className="w-12 h-px bg-gold-500/50 mx-auto" />
            </div>
            <div className="space-y-6">
              {[
                { q: "Do you handle travel logistics for destination events in Saudi Arabia?", a: "Yes. We provide complete end-to-end destination event logistics including charter flights, VIP ground transportation, luxury accommodation buyouts, and on-the-ground support teams at all remote locations including AlUla, NEOM, and Red Sea resorts." },
                { q: "Can you build event infrastructure in remote desert locations?", a: "Absolutely. Our production team specialises in remote event logistics — bringing climate-controlled structural tents, generator power, lighting, catering facilities, and luxury amenities to pristine desert environments with zero environmental impact." },
                { q: "How far in advance should we plan a destination event in AlUla?", a: "For major events and weddings in AlUla, we recommend starting planning 6 to 12 months in advance. High-demand seasons at luxury resorts book quickly, and RCU site access permits require considerable lead time." },
                { q: "What are the most scenic event venues in AlUla?", a: "AlUla's most spectacular venues include the Maraya concert hall (world's largest mirrored building), the Hegra UNESCO heritage site, Dadan archaeological ruins, and private desert wadi settings. We hold preferred access through our RCU partner status." },
                { q: "Can you organise events at NEOM for international delegates?", a: "Yes. Saudi Event Management manages corporate retreats, innovation summits, and brand experiences within the NEOM development, handling all permitting, delegate travel, accommodation, and on-site logistics." },
                { q: "How do you manage logistics for remote desert events?", a: "Our remote logistics team manages all production delivery, power generation, water supply, climate control, waste management, and catering. We have executed events in AlUla, Tabuk, and the Empty Quarter with full luxury standards maintained throughout." },
                { q: "What is the cost of a destination event in AlUla?", a: "Destination events in AlUla start from SAR 250,000 for intimate gatherings and can exceed SAR 2,000,000 for large-scale productions with custom infrastructure, international talent, and luxury resort accommodation buyouts. Contact us for a tailored proposal." },
                { q: "destination event planner near me Saudi Arabia", a: "Saudi Event Management is headquartered in Riyadh with dedicated destination event teams operating year-round across AlUla, NEOM, the Red Sea coast, and Diriyah — Saudi Arabia's most experienced destination event management company." },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 p-8 border border-slate-200 rounded-sm">
                  <h3 className="text-lg font-medium text-ink-950 mb-3">{faq.q}</h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-sand-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-ink-950 mb-8 uppercase tracking-widest">
              Related Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Royal family events, HNWI concierge, and ultra-luxury private experiences." },
                { title: "Luxury Weddings", slug: "weddings", desc: "Destination weddings at AlUla, NEOM, and the Red Sea with full planning support." },
                { title: "Event Production", slug: "event-production", desc: "Custom stage, AV, and lighting production for remote and destination events." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-sm p-6 hover:border-gold-400/50 hover:shadow-md transition-all"
                >
                  <h4 className="text-ink-950 font-bold mb-2 group-hover:text-gold-600 transition-colors">{rel.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-600 text-xs font-bold flex items-center gap-1">
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
