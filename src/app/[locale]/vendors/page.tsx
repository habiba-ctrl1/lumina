import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Utensils, Tv2, Flower2, Camera, Music2, Car, Building2, Tent,
  Printer, Lightbulb, ShieldCheck, MoreHorizontal, Star, Clock,
  TrendingUp, BadgeCheck, Globe, MapPin, ChevronRight, MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import VendorForm from "./VendorForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Become a Vendor — Saudi Event Management",
  description:
    "Join Saudi Arabia's premier event vendor network. Partner with Saudi Event Management for royal weddings, corporate summits, and Vision 2030 events across Riyadh, Jeddah, and AlUla.",
  keywords: [
    "event vendor Saudi Arabia",
    "vendor registration KSA",
    "event supplier Riyadh",
    "Saudi Event Management vendor",
    "vendor partnership Saudi Arabia",
    "event industry supplier KSA",
  ],
  openGraph: {
    title: "Become a Vendor — Saudi Event Management",
    description:
      "Partner with Saudi Arabia's leading luxury event management company.",
    url: "https://saudieventmanagement.com/vendors",
  },
  alternates: {
    canonical: "https://saudieventmanagement.com/vendors",
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "200+", label: "Active Vendors" },
  { value: "250+", label: "Events Yearly" },
  { value: "SAR 50M+", label: "Vendor Payouts" },
];

const CATEGORIES = [
  { icon: Utensils,       label: "Catering & F&B" },
  { icon: Tv2,            label: "AV & Production" },
  { icon: Flower2,        label: "Floral & Décor" },
  { icon: Camera,         label: "Photography & Videography" },
  { icon: Music2,         label: "Entertainment" },
  { icon: Car,            label: "VIP Transport" },
  { icon: Building2,      label: "Venues & Spaces" },
  { icon: Tent,           label: "Tents & Structures" },
  { icon: Printer,        label: "Print & Branding" },
  { icon: Lightbulb,      label: "Lighting Design" },
  { icon: ShieldCheck,    label: "Security & Protocol" },
  { icon: MoreHorizontal, label: "Other Services" },
];

const BENEFITS = [
  {
    icon: Star,
    title: "Premium Event Access",
    desc: "Gain exposure to royal weddings, government summits, and Vision 2030 flagship events — the most prestigious engagements in the Kingdom.",
  },
  {
    icon: Clock,
    title: "Guaranteed On-Time Payments",
    desc: "Structured invoicing cycles and prompt settlements. No chasing invoices — our finance team runs a disciplined vendor payment process.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Partnership",
    desc: "Preferred vendor status with early project briefings, priority selection, and co-branding opportunities on major events.",
  },
  {
    icon: BadgeCheck,
    title: "GEA Compliance Support",
    desc: "We assist partners in navigating Ministry of Culture and General Entertainment Authority permit requirements for compliant event delivery.",
  },
  {
    icon: Globe,
    title: "Brand Credibility",
    desc: "Carry the Saudi Event Management partnership badge — a recognised mark of excellence in the Kingdom's luxury event sector.",
  },
  {
    icon: MapPin,
    title: "Multi-City Opportunities",
    desc: "Work across Riyadh, Jeddah, Dammam, AlUla, Makkah, and Madinah — expanding your footprint across Saudi Arabia's key markets.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Submit Application",
    desc: "Complete the registration form with your company details and service portfolio.",
  },
  {
    num: "02",
    title: "Review & Screening",
    desc: "Our partnerships team evaluates each application within 5 business days.",
  },
  {
    num: "03",
    title: "Briefing Call",
    desc: "A dedicated account manager schedules an onboarding call to align on scope and expectations.",
  },
  {
    num: "04",
    title: "Partner Activation",
    desc: "Receive your vendor ID, be added to our preferred vendor directory, and start receiving event briefs.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function VendorsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden">
      <ScrollProgress />
      <WhatsAppButton />
      <Navbar locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-neutral-950 overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
        {/* Background image */}
        <Image
  src="/alkhobar_corporate_people.webp"
  alt="Premium event vendor partnership opportunity at luxury Saudi Arabia gala"
  fill
  className="object-cover opacity-40"
  sizes="100vw"
  priority
/>
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[320px] h-[320px] rounded-full bg-white/[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-1.5 text-[12px] text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Vendor Partnership</span>
          </nav>

          <span className="inline-block text-[12px] font-semibold tracking-[0.12em] uppercase text-emerald-300 mb-5">
            Vendor Partnership Programme
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Join the Kingdom&apos;s Elite Event Network
          </h1>
          <p className="text-white/70 text-[16px] md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Partner with Saudi Arabia&apos;s leading luxury event management company and gain access to royal commissions, Fortune 500 delegations, and Vision 2030 flagship projects.
          </p>

          {/* Stats row */}
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-16 bg-white/10 border border-white/20 rounded-2xl px-10 py-6 backdrop-blur-sm mb-10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </div>
                <div className="text-[13px] text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#vendor-form"
              className="inline-flex items-center gap-2 bg-white text-[var(--primary)] font-semibold px-8 py-4 rounded-xl text-[15px] hover:bg-neutral-50 transition-all duration-200"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
            >
              Apply Now
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Vendor Categories ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">
              <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40 inline-block mr-2" />
              We Work With
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              style={{ letterSpacing: "-0.02em" }}
            >
              Vendor Categories We Source
            </h2>
            <p className="text-neutral-500 text-[15px] mt-4 max-w-xl mx-auto leading-relaxed">
              From world-class catering to state-of-the-art AV production — our vendor network spans every discipline required to deliver extraordinary events.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white border border-neutral-200/80 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[var(--primary)]/40 hover:shadow-[0_4px_16px_rgba(13,107,78,0.08)] transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-200">
                  <Icon
                    size={20}
                    className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors"
                  />
                </div>
                <span className="text-[13px] font-medium text-neutral-700 leading-snug">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">
              <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40 inline-block mr-2" />
              Partnership Benefits
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              style={{ letterSpacing: "-0.02em" }}
            >
              Why Partner With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-neutral-200/80 rounded-2xl p-7 hover:shadow-[0_8px_32px_rgba(13,107,78,0.07)] hover:border-[var(--primary)]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-all duration-300">
                  <Icon
                    size={20}
                    className="text-[var(--primary)] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3
                  className="text-[15px] font-semibold text-neutral-900 mb-2"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Form ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-neutral-50/60">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left info column */}
            <div className="lg:col-span-4">
              <span className="section-label mb-3 block">
                <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40 inline-block mr-2" />
                Apply Now
              </span>
              <h2
                className="text-3xl font-bold text-neutral-900 mb-5"
                style={{ letterSpacing: "-0.02em" }}
              >
                Register Your Company
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed mb-8">
                Complete the form to begin your application to Saudi Event Management&apos;s curated vendor network. Our partnerships team reviews every submission personally.
              </p>

              <ul className="space-y-4">
                {[
                  "Application reviewed within 5 business days",
                  "Dedicated account manager assigned on approval",
                  "No onboarding fees — zero cost to apply",
                  "First event brief sent within 30 days of activation",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] text-neutral-600"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="#0D6B4E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right form column */}
            <div className="lg:col-span-8">
              <VendorForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Onboarding Steps ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label mb-3 block">
              <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40 inline-block mr-2" />
              Onboarding
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-neutral-900"
              style={{ letterSpacing: "-0.02em" }}
            >
              From Application to Activation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+36px)] right-[-36px] h-px bg-neutral-200" />
                )}
                <div className="bg-white border border-neutral-200/80 rounded-2xl p-7">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-5">
                    <span className="text-white text-[15px] font-bold">{step.num}</span>
                  </div>
                  <h3
                    className="text-[15px] font-semibold text-neutral-900 mb-2"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 text-[14px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-neutral-50/60 border-t border-neutral-200/80">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h3
            className="text-xl font-semibold text-neutral-900 mb-2"
            style={{ letterSpacing: "-0.01em" }}
          >
            Prefer to connect directly?
          </h3>
          <p className="text-neutral-500 text-[15px] mb-8">
            Our partnerships team is available on WhatsApp for a quick conversation before you apply.
          </p>
          <a
            href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20becoming%20a%20vendor%20partner."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-xl text-[15px] font-medium transition-all duration-200"
            style={{ boxShadow: "0 4px 16px rgba(37,211,102,0.25)" }}
          >
            <MessageCircle size={20} />
            Chat with Partnerships Team
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
