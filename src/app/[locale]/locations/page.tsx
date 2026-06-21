import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { hreflangAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, TrendingUp, Building2, Star } from "lucide-react";
import SaudiMap from "@/components/SaudiMap";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/locations`;
  return {
    title: isAr
      ? { absolute: "شركة إدارة فعاليات في عموم السعودية | 12 مدينة | إدارة الفعاليات السعودية" }
      : "Event Management Company Across Saudi Arabia | 12 Cities",
    description: isAr
      ? "تبحث عن شركة إدارة فعاليات في السعودية؟ لدينا منظّمو فعاليات ميدانيون في 12 مدينة — الرياض وجدة ومكة والدمام والعلا والمدينة والخبر ونيوم والطائف وأبها والدرعية وتبوك — بعلاقات محلية مع القاعات وتنفيذ متوافق مع هيئة الترفيه في عموم المملكة."
      : "Looking for an event management company in Saudi Arabia? We have on-the-ground event planners in 12 cities — Riyadh, Jeddah, Makkah, Dammam, AlUla, Madinah, Al Khobar, NEOM, Taif, Abha, Diriyah & Tabuk — with local venue relationships and GEA-compliant execution Kingdom-wide.",
    keywords: [
      "event management company Saudi Arabia",
      "event planner Saudi Arabia",
      "event management company in Riyadh",
      "event planner in Jeddah",
      "corporate event organizer Saudi Arabia",
      "wedding planner Saudi Arabia",
      "event management company in Dammam",
      "event management AlUla",
      "event management Madinah",
      "event management Al Khobar",
      "event management NEOM",
      "Vision 2030 events",
      "Saudi event company locations",
    ],
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/locations"),
    },
  };
}

// ── Featured city cards — ordered by lead-gen volume (2026 market strategy) ──
const locations = [
  {
    city: "Riyadh",
    badge: "Primary Headquarters",
    country: "Saudi Arabia",
    image: "/riyadh_luxury_reception_people.webp",
    slug: "riyadh",
    focus: "Royal Weddings & Giga-Summits",
    description:
      "The administrative and financial capital of Saudi Arabia — and the undisputed heart of Vision 2030. From high-security diplomatic summits at KAFD to royal wedding productions in Diriyah and Riyadh Season mega-activations, our Riyadh team handles the Kingdom's most elite and protocol-sensitive events.",
    tags: ["KAFD", "Riyadh Season", "Diriyah", "Vision 2030"],
    stat: "150+ events",
  },
  {
    city: "Jeddah",
    badge: "Commercial Hub",
    country: "Saudi Arabia",
    image: "/jeddah_luxury_people.webp",
    slug: "jeddah",
    focus: "Luxury Soirees & Global Expos",
    description:
      "Saudi Arabia's cosmopolitan gateway to the world. Jeddah's vibrant waterfront and international character attract luxury seaside weddings, global brand exhibitions at JECC, and avant-garde corporate galas that push creative boundaries — making it our premier showcase for innovative event design.",
    tags: ["JCEC", "Red Sea Global", "Corniche", "International Expos"],
    stat: "80+ events",
  },
  {
    city: "Al Khobar",
    badge: "Eastern Province Hub",
    country: "Saudi Arabia",
    image: "/alkhobar_corporate_people.webp",
    slug: "khobar",
    focus: "Private Majlis & Corporate Retreats",
    description:
      "Often overlooked by boutique agencies — but a goldmine for high-volume, high-loyalty events. Al Khobar sits at the centre of Saudi Arabia's energy and industrial sector, with Saudi Aramco, SABIC, and hundreds of multinational corporations generating consistent demand for premium Majlis gatherings, executive retreats, and supplier conferences.",
    tags: ["Saudi Aramco", "SABIC", "Dhahran Expo", "Jubail IC"],
    stat: "35+ events",
  },
  {
    city: "Makkah",
    badge: "Spiritual Capital",
    country: "Saudi Arabia",
    image: "/majlis_gathering_people.webp",
    slug: "makkah",
    focus: "VIP Hospitality & Spiritual Retreats",
    description:
      "Constant, year-round demand for high-end concierge services, exclusive private gatherings, and premium Hajj & Umrah season hospitality programmes for international delegations. We operate under Ministry of Hajj guidelines with absolute cultural discretion for royal households and government bodies.",
    tags: ["VIP Concierge", "Ministry of Hajj", "International Delegations"],
    stat: "30+ events",
  },
  {
    city: "Dammam",
    badge: "Eastern Province Capital",
    country: "Saudi Arabia",
    image: "/riyadh_summit_people.webp",
    slug: "dammam",
    focus: "Elite Corporate Galas & Family Weddings",
    description:
      "The administrative capital of the Eastern Province — a natural complement to Al Khobar for corporate-tier events. Dammam hosts government summits, Aramco contractor events, and lavish family weddings for Saudi Arabia's most established Eastern Province clans.",
    tags: ["Government Events", "Eastern Province", "Aramco Contractors", "Family Weddings"],
    stat: "25+ events",
  },
];

// ── Strategic breakdown data (matches the recommendation framework) ──────────
const strategicCities = [
  {
    city: "Riyadh",
    focus: "Royal Weddings & Giga-Summits",
    advantage:
      "The capital is the heart of Vision 2030, hosting the most elite private and government events. Riyadh-based projects signal to clients that you handle high-security, high-protocol events involving VIPs and government officials.",
    icon: "🏛️",
  },
  {
    city: "Jeddah",
    focus: "Luxury Soirees & Global Expos",
    advantage:
      "Known as the commercial hub, Jeddah attracts international corporate summits and lavish seaside weddings. The cosmopolitan vibe allows for avant-garde event designs that make your portfolio stand out visually.",
    icon: "🌊",
  },
  {
    city: "Al Khobar",
    focus: "Private Majlis & Corporate Retreats",
    advantage:
      "The Eastern Province is home to Saudi Aramco and numerous multinationals who host frequent private gatherings. Clients here value long-term relationships and consistent quality for family functions and corporate events.",
    icon: "🏭",
  },
  {
    city: "Makkah",
    focus: "VIP Hospitality & Spiritual Retreats",
    advantage:
      "Constant demand for high-end concierge and VIP event services for international delegations visiting the Holy City year-round across all seasons.",
    icon: "⭐",
  },
  {
    city: "Dammam",
    focus: "Elite Corporate Galas & Family Weddings",
    advantage:
      "As the Eastern Province's administrative capital, Dammam complements Al Khobar with government events, large-scale contractor conferences, and prestigious family weddings from the region's oldest and most prominent clans.",
    icon: "🏙️",
  },
];

export default async function LocationsPage() {
  const isAr = (await getLocale()) === "ar";
  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden relative border-t border-neutral-100">
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title={isAr ? "إدارة الفعاليات في عموم" : "Event Management Across"}
        titleHighlight={isAr ? "السعودية" : "Saudi Arabia"}
        subtitle={
          isAr
            ? "فرق ميدانية في 12 مدينة سعودية — الرياض وجدة ومكة والدمام والعلا والمدينة والخبر ونيوم والطائف وأبها والدرعية وتبوك. شبكات موردين محلية مخصّصة وخبرة في الامتثال لهيئة الترفيه في كل سوق."
            : "On-the-ground teams across 12 Saudi cities — Riyadh, Jeddah, Makkah, Dammam, AlUla, Madinah, Al Khobar, NEOM, Taif, Abha, Diriyah & Tabuk. Dedicated local vendor networks and GEA compliance expertise in every market."
        }
        backgroundImage="/locations/riyadh-hero.webp"
        badge={isAr ? "عمليات في عموم المملكة" : "Kingdom-Wide Operations"}
        breadcrumbs={[{ label: isAr ? "الرئيسية" : "Home", href: isAr ? "/ar" : "/" }, { label: isAr ? "المواقع" : "Locations" }]}
        enableParallax
        minHeight="large"
        trustElements={[
          { value: "12", label: "Cities Covered" },
          { value: "13+", label: "Saudi Regions Served" },
          { value: "250+", label: "Events Delivered" },
          { value: "100%", label: "GEA Compliant" },
        ]}
      />

      <SaudiMap />

      {/* ── Strategic City Breakdown (the recommendation framework) ─────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100 bg-[var(--surface-raised)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label justify-center mb-4 flex">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              2026 Market Strategy
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4"
              style={{ letterSpacing: "-0.025em" }}
            >
              Find an Event Planner in{" "}
              <span className="text-[var(--primary)]">Your City</span>
            </h2>
            <p className="text-neutral-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
              Whether you need an event management company in Riyadh for a corporate summit, a wedding planner in Jeddah, or a destination event team in AlUla, each city below has its own dedicated planners, venue partnerships, and local permit expertise. Choose your location to see venues, services, and seasonal planning guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategicCities.map((c) => (
              <div
                key={c.city}
                className="bg-white border border-neutral-200/80 rounded-2xl p-7 hover:border-[var(--primary)]/30 transition-all duration-300 group"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0 mt-0.5">{c.icon}</span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[17px] font-bold text-neutral-900" style={{ letterSpacing: "-0.01em" }}>
                        {c.city}
                      </h3>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--primary)] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                        {c.focus}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-[14px] leading-relaxed">{c.advantage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why each city — editorial content block ─────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="section-label justify-center mb-4 flex">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              City Intelligence
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Why <span className="text-[var(--primary)]">These Cities?</span>
            </h2>
            <p className="text-neutral-500 text-[15px] max-w-xl mx-auto leading-relaxed">
              Each market has a distinct client profile, demand pattern, and competitive advantage — here&apos;s why we prioritise them.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Riyadh */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  Why Riyadh is the #1 Priority
                </h3>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-3">
                Riyadh remains the undisputed leader in Saudi Arabia&apos;s events industry. As the administrative and financial center, it hosts the majority of <strong className="text-neutral-700">Vision 2030 activations</strong> and high-stakes corporate summits. Executing Riyadh-based projects signals to all clients that you can handle high-security, high-protocol events involving VIPs, government officials, and royal families.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                From KAFD to Riyadh Season entertainment zones and private royal compounds in Diriyah — the capital offers an unmatched density of premier event opportunities year-round.
              </p>
            </div>

            {/* Jeddah */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Star size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  Why Jeddah Differentiates Your Portfolio
                </h3>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-3">
                Jeddah offers a different but equally lucrative market. Its status as a &quot;Gateway to the World&quot; makes it Saudi Arabia&apos;s prime location for <strong className="text-neutral-700">international exhibitions and luxury seaside weddings</strong>. The cosmopolitan vibe allows for more creative and avant-garde event designs that make your portfolio stand out visually.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                With JECC, Red Sea Global developments, and an increasingly international business community — Jeddah is where global brands choose to enter the Saudi market.
              </p>
            </div>

            {/* Al Khobar */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  The Untapped Potential of Al Khobar
                </h3>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-3">
                Often overlooked by boutique agencies, the <strong className="text-neutral-700">Eastern Province — Dammam, Khobar, and Dhahran</strong> — is a goldmine for private Majlis gatherings and corporate events. With Saudi Aramco, SABIC, and numerous multinationals, demand for professional event production is steady and consistent.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                Al Khobar attracts a demographic that values long-term relationships and consistent quality — generating reliable, recurring revenue.
              </p>
            </div>

            {/* Makkah */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  Makkah — Year-Round VIP Demand
                </h3>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-3">
                Makkah generates <strong className="text-neutral-700">constant, year-round demand</strong> for high-end concierge and VIP event services — from international delegations during Hajj and Umrah seasons to private royal gatherings and exclusive hospitality programmes.
              </p>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                Operating in Makkah requires deep cultural understanding and Ministry of Hajj compliance — a high barrier to entry that means fewer competitors and stronger client loyalty.
              </p>
            </div>

            {/* Dammam — spans full width */}
            <div className="lg:col-span-2 bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                  Dammam — Eastern Province Capital
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <p className="text-neutral-500 text-[14px] leading-relaxed">
                  As the <strong className="text-neutral-700">administrative capital of the Eastern Province</strong>, Dammam pairs naturally with Al Khobar to create full Eastern Province coverage — a combined market rivalling Jeddah in event volume. Government agency events, large contractor conferences, and generational family celebrations are core to Dammam&apos;s event landscape.
                </p>
                <p className="text-neutral-500 text-[14px] leading-relaxed">
                  Clients in Dammam tend to be deeply loyal to agencies that understand Eastern Province culture and logistics. Establishing a presence here creates compounding returns as referrals move between Dammam, Khobar, and Dhahran&apos;s interconnected social circles.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Featured City Cards ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label justify-center mb-4 flex">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Our Primary Markets
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-neutral-900"
              style={{ letterSpacing: "-0.025em" }}
            >
              Primary Markets. One Standard of{" "}
              <span className="text-[var(--primary)]">Excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {locations.map((loc, idx) => (
              <Link
                key={loc.slug + loc.city}
                href={`/locations/${loc.slug}`}
                className={`group block relative rounded-3xl overflow-hidden border border-neutral-200/80 bg-white hover:border-neutral-300 transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] ${
                  idx < 2 ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className={`relative w-full overflow-hidden bg-neutral-100 ${idx < 2 ? "h-96" : "h-72"}`}>
                  <Image
                    src={loc.image}
                    alt={`Event management in ${loc.city}, Saudi Arabia — ${loc.focus}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-900/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Badge */}
                  <div className="absolute top-4 start-4">
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-emerald-400 bg-black/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                      {loc.badge}
                    </span>
                  </div>

                  {/* Stat */}
                  <div className="absolute top-4 end-4">
                    <span className="text-[11px] font-semibold text-white/80 bg-black/25 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                      {loc.stat}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 start-0 end-0 p-7 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={13} className="text-[var(--primary)]" />
                    <span className="text-white/60 text-[11px] font-medium tracking-wider uppercase">{loc.country}</span>
                  </div>
                  <h3 className="font-bold text-[1.65rem] text-white mb-1" style={{ letterSpacing: "-0.025em" }}>
                    {loc.city}
                  </h3>
                  <p className="text-emerald-400 text-[12px] font-semibold tracking-wide uppercase mb-3 opacity-90">
                    {loc.focus}
                  </p>
                  <p className="text-neutral-300 text-[13.5px] leading-relaxed mb-5 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {loc.description}
                  </p>

                  {/* Entity tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {loc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold text-white/70 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[var(--primary)] text-[13px] font-semibold">
                    Explore {loc.city} Events
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── National Operations (GEO / AIO authority block) ─────────────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4 flex">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Complete Coverage
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4"
              style={{ letterSpacing: "-0.025em" }}
            >
              Kingdom-Wide{" "}
              <span className="text-[var(--primary)]">Operations</span>
            </h2>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 p-8 rounded-2xl mb-10 shadow-sm">
            <p className="text-neutral-700 font-semibold mb-3 text-[15px]">National Geographic Footprint — 12 Cities:</p>
            <p className="text-neutral-600 text-[14.5px] leading-relaxed mb-6">
              <strong>Saudi Event Management</strong> is a national event production agency operating across all major provinces of the Kingdom. Our infrastructure supports simultaneous mega-events, royal weddings, and corporate summits across a highly diversified geographic portfolio — from Riyadh&apos;s giga-summits to AlUla&apos;s UNESCO heritage galas and NEOM&apos;s innovation conferences.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[13.5px] text-neutral-600">
              {[
                { name: "Riyadh",    slug: "riyadh"  },
                { name: "Jeddah",    slug: "jeddah"  },
                { name: "Makkah",    slug: "makkah"  },
                { name: "Dammam",    slug: "dammam"  },
                { name: "AlUla",     slug: "alula"   },
                { name: "Madinah",   slug: "madinah" },
                { name: "Al Khobar", slug: "khobar"  },
                { name: "NEOM",      slug: "neom"    },
                { name: "Taif",      slug: "taif"    },
                { name: "Abha",      slug: "abha"    },
                { name: "Diriyah",   slug: "diriyah" },
                { name: "Tabuk",     slug: "tabuk"   },
              ].map((city) => (
                <li key={city.name}>
                  <Link
                    href={`/locations/${city.slug}`}
                    className="hover:text-[var(--primary)] underline decoration-neutral-300 underline-offset-4 transition-colors font-medium"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="prose prose-slate max-w-none text-neutral-500 text-[14.5px] leading-relaxed space-y-4">
            <p>
              Saudi Event Management&apos;s expansion strategy is intrinsically linked to <strong className="text-neutral-700">Saudi Vision 2030</strong>, ensuring every event we manage contributes to the Kingdom&apos;s growing reputation as the global hub for elite gatherings. Whether navigating GEA permit requirements for large-scale entertainment activations, executing high-security protocol for government summits in Riyadh&apos;s financial district, managing seamless international logistics in Jeddah, or providing culturally sensitive VIP concierge in Makkah — our regional teams deliver absolute precision.
            </p>
            <p>
              Across the <strong className="text-neutral-700">Eastern Province (Al Khobar, Dammam, Dhahran)</strong>, the presence of Saudi Aramco, SABIC, and the broader industrial ecosystem creates year-round demand for professional event production — a market our regional teams know intimately.
            </p>
          </div>
        </div>
      </section>

      {/* ── Explore Services & Get in Touch ─────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100 bg-[var(--surface-raised)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label justify-center mb-4 flex">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Our <span className="text-[var(--primary)]">Event Services</span>
            </h2>
            <p className="text-neutral-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
              Every city team delivers our full range of services. Explore what we offer, then{" "}
              <Link href="/contact" className="text-[var(--primary)] underline underline-offset-4 font-medium">talk to our team</Link>{" "}
              or{" "}
              <Link href="/consultation" className="text-[var(--primary)] underline underline-offset-4 font-medium">book a free consultation</Link>.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { name: "Corporate Event Management", href: "/services/corporate-events" },
              { name: "Conference Management", href: "/services/conferences" },
              { name: "Exhibition Management", href: "/services/exhibitions" },
              { name: "Wedding Planning", href: "/services/weddings" },
              { name: "Luxury & VIP Events", href: "/services/luxury-vip-events" },
              { name: "Destination Events", href: "/services/destination-events" },
              { name: "Event Production", href: "/services/event-production" },
            ].map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                {svc.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services" className="btn-outline hover:scale-105 transition-all rounded-sm">
              View All Services
            </Link>
            <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">
              See Our Work
            </Link>
            <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">
              Request a Proposal
            </Link>
            <a
              href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#25D366] text-white text-sm font-semibold hover:scale-105 transition-transform"
              style={{ boxShadow: "0 6px 18px rgba(37,211,102,0.30), inset 0 1px 0 rgba(255,255,255,0.18)" }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
