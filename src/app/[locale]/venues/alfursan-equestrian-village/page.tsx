import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin, Users, Maximize2, Music, Presentation, Armchair,
  Tent, TreePine, Eye, Shield, Star, ArrowRight, CheckCircle2,
  Building2, Fence, MountainSnow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AlFursan Equestrian Village — Official RCU Venue",
  description:
    "AlFursan Equestrian Village in AlUla — a premier equestrian destination by the Royal Commission for AlUla. Host events amidst heritage and natural beauty. Request a quote through Saudi Event Management.",
  robots: { index: false, follow: false },
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const highlights = [
  { icon: MapPin,       label: "Located in AlUla",                desc: "Set within the UNESCO heritage landscape of AlUla" },
  { icon: Users,        label: "Up to 1,000 Guests",             desc: "Endurance Terrace and Polo Grandstand each seat 1,000" },
  { icon: Armchair,     label: "5 Premium Lounges",              desc: "Intimate spaces from 70 to 120 guests" },
  { icon: MountainSnow, label: "Captivating Views",              desc: "Stunning panoramic views of the AlUla landscape" },
  { icon: Shield,       label: "Heritage Preservation",          desc: "Honouring local environment and cultural heritage" },
  { icon: Music,        label: "Stage-Ready Venues",             desc: "Multiple areas support stage construction for performances" },
];

const facilities = [
  {
    name: "Endurance Terrace",
    capacity: "1,000 guests",
    icon: Tent,
    desc: "An inviting and versatile space with natural wooden flooring, ideal for gatherings, ceremonies, and community activities. Shaded and suitable for air conditioning. Stage construction space available.",
  },
  {
    name: "Polo Grandstand",
    capacity: "1,000 guests",
    icon: Eye,
    desc: "A seating area offering stunning and captivating views of AlUla. Suitable for concerts, gatherings, and show events. The polo field can accommodate a stage for performances with additional seating options.",
  },
  {
    name: "Shuwayma Lounge",
    capacity: "70 guests",
    icon: Armchair,
    desc: "High-quality furniture with traditional decorative lights and carpets showcasing the colour themes of AlUla. Equipped with a large screen for presentations and training sessions.",
  },
  {
    name: "Dahma Lounge",
    capacity: "100 guests",
    icon: Armchair,
    desc: "Comfortable seating adorned with traditional decor and carpets. Features a large screen suitable for presentations. Additional furniture and modifications available on request.",
  },
  {
    name: "Saqlawiya Lounge",
    capacity: "100 guests",
    icon: Armchair,
    desc: "Traditional decorative lights and carpets celebrating AlUla's palette. Equipped with a large screen. Flexible furniture arrangements for bespoke event setups.",
  },
  {
    name: "Kahilah Lounge",
    capacity: "100 guests",
    icon: Armchair,
    desc: "A refined lounge featuring two large screens for presentations and training. Adorned with traditional carpets and decor inspired by AlUla's heritage.",
  },
  {
    name: "Obaya Lounge",
    capacity: "120 guests",
    icon: Armchair,
    desc: "The largest lounge in the village, featuring two large screens and premium furniture. Traditional decorative elements with flexible layout options.",
  },
  {
    name: "Indoor Gathering Area",
    capacity: "[Awaiting RCU Approval]",
    icon: Building2,
    desc: "Designed for small gatherings and parties. Can operate independently or combine with a main lounge for larger corporate events, community functions, or celebrations.",
  },
  {
    name: "Polo Field",
    capacity: "[Awaiting RCU Approval]",
    icon: Fence,
    desc: "A professional polo field that can also serve as a stage venue for event performances, with necessary protections applied to preserve the sports flooring.",
  },
  {
    name: "Horse Tracks & Stables",
    capacity: "[Awaiting RCU Approval]",
    icon: TreePine,
    desc: "Operational equestrian facilities supporting horse training and events, with plans for further development as a central hub for equestrian sports.",
  },
];

const experiences = [
  "Concerts & live performances",
  "Corporate gatherings & ceremonies",
  "Community engagement events",
  "Equestrian activities & shows",
  "Training sessions & presentations",
  "Intimate celebrations & parties",
  "Cultural heritage experiences",
  "Show events with panoramic AlUla views",
];

const whyChoose = [
  "Official venue managed by the Royal Commission for AlUla",
  "Multiple venue configurations from 70 to 1,000+ guests",
  "Stunning natural AlUla landscape as your backdrop",
  "Traditional decor and heritage-inspired ambiance",
  "Flexible seating — supplied by village or arranged externally",
  "Stage-ready spaces for concerts and performances",
  "Dedicated equestrian facilities on-site",
  "Seamless booking through Saudi Event Management",
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function AlFursanPage() {
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
        {/* Placeholder hero image overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/venues/alfursan_p2_1.jpeg"
            alt="AlFursan Equestrian Village — AlUla"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/50 to-neutral-900/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Partner badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-amber-300 bg-amber-500/10 border border-amber-400/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Star size={12} className="fill-amber-300" />
              Official RCU Venue Partner
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]" style={{ letterSpacing: "-0.03em" }}>
            AlFursan{" "}
            <span className="text-emerald-400">Equestrian Village</span>
          </h1>
          <p className="text-neutral-300 text-[16px] md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A distinctive destination honouring AlUla&apos;s cultural heritage and natural beauty — blending equestrian tradition with world-class event spaces.
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

          {/* Location tag */}
          <div className="mt-10 inline-flex items-center gap-2 text-neutral-400 text-[13px]">
            <MapPin size={14} className="text-emerald-400" />
            AlUla, Kingdom of Saudi Arabia
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
            Where Heritage Meets <span className="text-[var(--primary)]">Equestrian Excellence</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              AlFursan Equestrian Village seeks to offer visitors a distinctive and immersive experience, all while honouring the local environment and safeguarding cultural heritage.
            </p>
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              The primary objective is to enhance the lives of AlUla&apos;s residents and the visitors who come to appreciate its rich history, natural beauty, art, and vibrant spirit.
            </p>
            <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed text-center">
              Currently, the Village features operational facilities, with plans for further development to establish it as a central hub for equestrian sports and community involvement in the near future.
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
            Spaces Designed for <span className="text-[var(--primary)]">Every Occasion</span>
          </h2>
          <p className="text-neutral-500 text-center max-w-2xl mx-auto text-[15px] mb-14 leading-relaxed">
            From grand terraces to intimate lounges — each space is adorned with traditional AlUla-inspired decor and flexible configurations.
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
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    {f.capacity}
                  </span>
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-900 mb-3" style={{ letterSpacing: "-0.01em" }}>{f.name}</h3>
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
              { src: "/venues/alfursan_p2_1.jpeg", alt: "AlFursan Village — Landscape" },
              { src: "/venues/alfursan_p4_3.jpeg", alt: "Endurance Terrace" },
              { src: "/venues/alfursan_p7_6.jpeg", alt: "Polo Grandstand" },
              { src: "/venues/alfursan_p10_9.jpeg", alt: "Premium Lounge Setup" },
              { src: "/venues/alfursan_p13_12.jpeg", alt: "Lounge Interior" },
              { src: "/venues/alfursan_p15_14.jpeg", alt: "Indoor Gathering Area" },
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
            Why Choose <span className="text-[var(--primary)]">AlFursan EQV</span>
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
          <div className="absolute inset-0 opacity-10 bg-[url('/venues/alfursan_p7_6.jpeg')] bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-amber-300 mb-6">
              <Star size={12} className="fill-amber-300" />
              Official RCU Venue
            </span>
            <h2 className="font-semibold mb-6 text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.025em" }}>
              Interested in <span className="text-emerald-400">AlFursan EQV?</span>
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
                href="https://wa.me/966539388072?text=Hi%20SEM!%20I%20am%20interested%20in%20AlFursan%20Equestrian%20Village%20in%20AlUla."
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
