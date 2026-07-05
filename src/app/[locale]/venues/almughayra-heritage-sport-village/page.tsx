import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin, Users, Maximize2, Music, Presentation, Armchair,
  Tent, TreePine, Star, ArrowRight, CheckCircle2,
  Building2, Landmark, MountainSnow, Footprints, Home,
  Utensils, Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AlMughayra Heritage Sport Village — Official RCU Venue",
  description:
    "AlMughayra Heritage Sport Village in AlUla — a world-class complex for traditional sports, camel racing, and cultural events by the Royal Commission for AlUla. Request a quote through Saudi Event Management.",
  robots: { index: false, follow: false },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const highlights = [
  { icon: MapPin,        label: "40 km from AlUla Centre",       desc: "Located in a breathtaking desert landscape southeast of AlUla city centre" },
  { icon: Users,         label: "800-Seat Royal Venue",          desc: "Premium indoor seating with all necessary facilities" },
  { icon: Maximize2,     label: "17,500 sqm Heritage Village",   desc: "An immersive outdoor experience celebrating AlUla's cultural richness" },
  { icon: Footprints,    label: "8 km Competition Racetrack",    desc: "Premier camel racing facility for local and international competitions" },
  { icon: Home,          label: "250 Camel Shelters",            desc: "Dedicated resting and accommodation spaces for camels" },
  { icon: Music,         label: "Stage-Ready Spaces",            desc: "Dedicated areas for concerts, gatherings, and performances" },
];

const facilities = [
  {
    name: "Royal Venue",
    capacity: "800 guests",
    area: "4,500 sqm",
    icon: Landmark,
    desc: "An inviting space ideal for gatherings, ceremonies, and community activities. Features high-quality furniture and comfortable seating adorned with traditional decorations and carpets showcasing the colour themes of AlUla. Space available for stage construction.",
  },
  {
    name: "Heritage Village",
    capacity: "[Awaiting RCU Approval]",
    area: "17,500 sqm",
    icon: Palette,
    desc: "An immersive experience celebrating the cultural richness of AlUla. Architecture reflects traditional styles with modern functionality. Features food and beverage outlets offering local flavours, customer centres, and opportunities for local artists to showcase their work.",
  },
  {
    name: "8 km Competition Racetrack",
    capacity: "International events",
    area: "8 km",
    icon: Footprints,
    desc: "A premier main track designed for local and international camel racing competitions. Part of the Heritage Sport Village's exceptional camel racing amenities.",
  },
  {
    name: "6 km Training Racetrack",
    capacity: "Year-round access",
    area: "6 km",
    icon: Footprints,
    desc: "Available year-round for camel training and local events. Supports the development of camel racing traditions and community engagement.",
  },
  {
    name: "Camel Shelters (Ezabs)",
    capacity: "250 shelters",
    area: "[Awaiting RCU Approval]",
    icon: Home,
    desc: "Dedicated resting and accommodation spaces for camels during events and throughout the year for the local community. Essential infrastructure supporting racing and heritage activities.",
  },
  {
    name: "Parking & Access",
    capacity: "Ample capacity",
    area: "[Awaiting RCU Approval]",
    icon: Building2,
    desc: "Both the Royal Venue and Heritage Village offer ample parking and dedicated entrances for seamless access during events.",
  },
];

const experiences = [
  "Camel racing — local & international competitions",
  "Camel shows & riding activities",
  "Heritage & cultural celebrations",
  "Concerts & live performances",
  "Corporate gatherings & ceremonies",
  "Conferences & community events",
  "Art exhibitions & cultural showcases",
  "Festivals & entertainment events",
  "Falconry experiences",
  "Camel-related sports & heritage activities",
];

const whyChoose = [
  "Official venue managed by the Royal Commission for AlUla",
  "World-class complex blending heritage and modernity",
  "Premier camel racing facility with international-grade tracks",
  "17,500 sqm Heritage Village for outdoor cultural events",
  "Royal Venue with 800 guests capacity and 4,500 sqm",
  "Breathtaking desert landscape as natural backdrop",
  "Traditional architecture with modern functionality",
  "Food & beverage outlets with local flavours on-site",
  "Seamless booking through Saudi Event Management",
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AlMughayraPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />

      {/* ── DRAFT BANNER ──────────────────────────────────────────────── */}
      <div className="fixed top-0 inset-x-0 z-[200] bg-amber-500 text-white text-center text-[12px] sm:text-[13px] font-bold tracking-widest uppercase py-2 select-none pointer-events-none">
        DRAFT — Pending RCU Approval
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 md:pt-56 md:pb-40 flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/venues/almughayra_p2_1.jpeg"
            alt="AlMughayra Heritage Sport Village — AlUla"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-neutral-900/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-amber-300 bg-amber-500/10 border border-amber-400/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star size={12} className="fill-amber-300" />
              Official RCU Venue Partner
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]" style={{ letterSpacing: "-0.03em" }}>
            AlMughayra{" "}
            <span className="text-emerald-400">Heritage Sport Village</span>
          </h1>
          <p className="text-neutral-300 text-[16px] md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A world-class complex blending heritage and modernity — the perfect hub for traditional sports, cultural events, and community engagement in AlUla&apos;s breathtaking desert landscape.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 text-white text-[14px] font-medium rounded-xl transition-all flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                boxShadow: "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <Link
              href="/partners"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-[14px] font-medium rounded-xl border border-white/20 hover:bg-white/15 transition-all"
            >
              View All Partners
            </Link>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 text-neutral-400 text-[13px]">
            <MapPin size={14} className="text-emerald-400" />
            40 km southeast of AlUla, Kingdom of Saudi Arabia
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              About the Venue
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-8" style={{ letterSpacing: "-0.025em" }}>
            Where Tradition Meets <span className="text-[var(--primary)]">World-Class Facilities</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              Discover AlMughayra Heritage Sport Village (HSV), a premier destination for traditional sports like camel racing and falconry, located 40 km southeast of AlUla city centre.
            </p>
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              This world-class complex blends heritage and modernity, making it the perfect hub for sports, events, and community engagement. Located in a breathtaking desert landscape, HSV offers a unique setting for gatherings, conferences, and entertainment.
            </p>
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              The venue features a Royal Stage with premium indoor seating and all necessary facilities, camel race tracks, and camel shelters. Additionally, it includes a Heritage Village perfect for outdoor events. Both venues offer ample parking and dedicated entrances for seamless access during events.
            </p>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Key Highlights
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-14" style={{ letterSpacing: "-0.025em" }}>
            What Sets This <span className="text-[var(--primary)]">Venue Apart</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white border border-neutral-200/80 rounded-2xl p-7 group hover:border-neutral-300 transition-all duration-300"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
              >
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-xl mb-5">
                  <h.icon size={22} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-900 mb-2" style={{ letterSpacing: "-0.01em" }}>{h.label}</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Venue Facilities
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-6" style={{ letterSpacing: "-0.025em" }}>
            Facilities & <span className="text-[var(--primary)]">Infrastructure</span>
          </h2>
          <p className="text-neutral-500 text-center max-w-2xl mx-auto text-[15px] mb-14 leading-relaxed">
            From the majestic Royal Venue to the vast Heritage Village and world-class camel racing tracks — purpose-built for heritage, sport, and celebration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <div
                key={i}
                className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-7 hover:border-neutral-300 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 bg-white border border-neutral-100 flex items-center justify-center rounded-xl group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                    <f.icon size={20} className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                      {f.capacity}
                    </span>
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-900 mb-1.5" style={{ letterSpacing: "-0.01em" }}>{f.name}</h3>
                {f.area && (
                  <span className="text-[12px] font-medium text-[var(--primary)] mb-3 block">{f.area}</span>
                )}
                <p className="text-neutral-500 text-[13px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Experiences
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-14" style={{ letterSpacing: "-0.025em" }}>
            Activities & <span className="text-[var(--primary)]">Experiences</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {experiences.map((exp, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-neutral-200/80 rounded-xl px-5 py-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" />
                <span className="text-neutral-700 text-[14px] font-medium">{exp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Gallery
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-14" style={{ letterSpacing: "-0.025em" }}>
            Visual <span className="text-[var(--primary)]">Impressions</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: "/venues/almughayra_p2_1.jpeg", alt: "AlMughayra HSV — Desert Landscape" },
              { src: "/venues/almughayra_p4_3.jpeg", alt: "Royal Venue Structure" },
              { src: "/venues/almughayra_p8_7.jpeg", alt: "Heritage Village View" },
              { src: "/venues/almughayra_p9_8.jpeg", alt: "Heritage Village Entrance" },
              { src: "/venues/almughayra_p11_10.jpeg", alt: "Camel Tracks Facility" },
              { src: "/venues/almughayra_p13_12.jpeg", alt: "Camel Racing View" },
            ].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200/80 group">
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[13px] font-medium">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-neutral-400 text-[13px] mt-8 italic">
            Images sourced directly from the Royal Commission for AlUla.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Why This Venue
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-14" style={{ letterSpacing: "-0.025em" }}>
            Why Choose <span className="text-[var(--primary)]">AlMughayra HSV</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyChoose.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-neutral-200/80 rounded-xl px-5 py-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.02)" }}>
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-1.5 shrink-0" />
                <span className="text-neutral-600 text-[14px] font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY / CTA ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-neutral-100">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('/venues/almughayra_p4_3.jpeg')] bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-amber-300 mb-6">
              <Star size={12} className="fill-amber-300" />
              Official RCU Venue
            </span>
            <h2 className="font-semibold mb-6 text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.025em" }}>
              Interested in <span className="text-emerald-400">AlMughayra HSV?</span>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-4 text-[15px] leading-relaxed">
              Submit your event inquiry through Saudi Event Management. We coordinate directly with RCU to provide you with tailored venue proposals.
            </p>
            <p className="text-neutral-500 text-[13px] mb-10">
              No direct venue contact required — we handle everything for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-white text-[14px] font-medium rounded-xl transition-all inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link
                href="https://wa.me/966539388072?text=Hi%20SEM!%20I%20am%20interested%20in%20AlMughayra%20Heritage%20Sport%20Village%20in%20AlUla."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-[14px] font-medium rounded-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DRAFT FOOTER NOTICE ───────────────────────────────────────── */}
      <div className="bg-amber-50 border-t border-amber-200 px-6 py-6 text-center">
        <p className="text-amber-800 text-[13px] font-semibold tracking-wide uppercase mb-1">
          ⚠ Draft Document — Pending RCU Approval
        </p>
        <p className="text-amber-700/70 text-[12px] max-w-xl mx-auto">
          This page is a draft prepared for review by the Royal Commission for AlUla. Content will not be published until written approval is received from RCU.
        </p>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
