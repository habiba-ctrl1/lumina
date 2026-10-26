import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Briefcase, ChevronDown, ClipboardList, Compass, FileCheck2, Globe2,
  MessageCircle, Route, UserCheck, Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TransportEnquiryForm from "@/components/transportation/TransportEnquiryForm";
import Reveal from "@/components/transportation/Reveal";
import RouteSelector from "@/components/transportation/RouteSelector";
import TransportTracker from "@/components/transportation/TransportTracker";
import { SITE_URL } from "@/lib/seo";
import {
  COUNTRIES, ROUTE_ELIGIBILITY, VEHICLE_CLASSES, buildTransportWhatsAppUrl,
} from "@/lib/transportation/config";

// English only for now. /ar/transportation renders the same content but is
// noindex via middleware (not in TRANSLATED_AR_ROUTES) — canonical points to EN.
const PATH = "/transportation";
const PAGE_URL = `${SITE_URL}${PATH}`;
const HERO_IMG = "/services/transport/vip-chauffeur-arrival-riyadh-exhibition-centre.webp";

export const metadata: Metadata = {
  title: { absolute: "Executive Chauffeur & Private Transfers in Saudi Arabia | Saudi Event Management" },
  description:
    "Pre-arranged executive chauffeur service in Saudi Arabia and private cross-border transfer enquiries for corporate travel, VIP guests, hotels and delegations. Request a tailored quotation.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Executive Chauffeur & Private Transfers | Saudi Event Management",
    description:
      "Coordinated private journeys, premium vehicle classes and tailored quotations for corporate travel and VIP guests.",
    url: PAGE_URL,
    images: [{ url: HERO_IMG, width: 1200, height: 630, alt: "Chauffeur opening the door of a luxury vehicle outside a Riyadh exhibition centre" }],
  },
};

const faqs = [
  {
    q: "Which vehicle classes can I request?",
    a: "Executive sedans, premium SUVs, premium vans and larger group vehicles. We work in vehicle categories and confirm the exact vehicle, passenger capacity and luggage allowance in your quotation. All vehicles are subject to availability.",
  },
  {
    q: "Do you operate your own fleet?",
    a: "No. Saudi Event Management coordinates journeys through vetted transport partners. You deal with one point of contact for the itinerary and quotation.",
  },
  {
    q: "Can you arrange journeys between Saudi Arabia and neighbouring countries?",
    a: "Cross-border journeys are handled as enquiries. Before anything is confirmed we review feasibility, operator permits, vehicle requirements and travel-document needs for the specific route. Submitting an enquiry is not a confirmation that a route is available.",
  },
  {
    q: "Which Saudi cities do you cover?",
    a: "Riyadh is our primary area. Requests for Jeddah, Makkah, Madinah, the Eastern Province and other cities are checked per enquiry, based on date and partner availability.",
  },
  {
    q: "Do you publish prices?",
    a: "No. Pricing depends on route, vehicle class, duration, waiting time and date. You receive a written quotation, including inclusions, exclusions and validity, before any booking is confirmed.",
  },
  {
    q: "What are the cancellation, waiting-time and payment terms?",
    a: "These are stated in your written quotation, because they vary by journey and partner. Ask us about them before you confirm.",
  },
  {
    q: "How far ahead should I request?",
    a: "As early as possible, particularly for cross-border journeys, groups and peak event dates. We will tell you plainly if the date you need cannot be supported.",
  },
  {
    q: "Can you handle airport pickups and hourly chauffeur hire?",
    a: "Yes, as enquiries: airport and hotel transfers, hourly and full-day chauffeur arrangements and multi-stop itineraries, subject to availability in the requested city.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Executive chauffeur and private transfer coordination",
      serviceType: "Chauffeur and private transfer coordination",
      description:
        "Pre-arranged executive chauffeur service in Saudi Arabia and private cross-border transfer enquiries, coordinated through vetted transport partners.",
      provider: { "@type": "Organization", name: "Saudi Event Management", url: SITE_URL },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
      url: PAGE_URL,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Transportation", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]";

export default function TransportationPage() {
  const wa = buildTransportWhatsAppUrl({});
  const verified = ROUTE_ELIGIBILITY.filter((r) => r.status === "operationally_verified").length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TransportTracker page="hub" />
      <main className="min-h-screen overflow-hidden bg-[#faf7f1] text-[#1c2430]">
        <Navbar darkHero />

        {/* HERO */}
        <section className="relative isolate bg-[#0b1623] text-white">
          <Image
            src={HERO_IMG}
            alt="Chauffeur opening the rear door of a black luxury sedan outside a Riyadh exhibition centre at dusk"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-45 motion-safe:animate-[txHeroIn_1.6s_ease-out_both]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1623] via-[#0b1623]/80 to-[#0b1623]/30" aria-hidden />
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/60">
              <Link href="/" className="text-white/70 hover:text-white">Home</Link> <span aria-hidden>/</span> <span className="text-white/90">Transportation</span>
            </nav>
            <p className={eyebrow}>Executive Mobility · Saudi Event Management</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.1] !text-white md:text-5xl lg:text-6xl">
              Executive Chauffeur &amp; Private Transfers Across Saudi Arabia and Beyond
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              Professionally coordinated private journeys, premium vehicle classes and tailored transportation for corporate travel, VIP guests, hotels and international road transfers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#enquiry" className="inline-flex items-center gap-2 rounded-md bg-[#c5a059] px-6 py-3.5 text-sm font-semibold text-[#0b1623] transition hover:bg-[#d6b574] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]">
                Request a Private Transfer Quote <ArrowRight size={16} aria-hidden />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Explore Chauffeur Services
              </a>
              <a href="#corporate" className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
                Corporate Travel Enquiries
              </a>
            </div>
            <p className="mt-6 max-w-xl text-xs text-white/55">
              All journeys are pre-arranged and subject to availability. Routes and vehicles are confirmed in writing before booking.
            </p>
          </div>
        </section>

        {/* SERVICE SELECTOR */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
          <Reveal>
            <p className={eyebrow}>Two ways to travel</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold md:text-4xl">Choose the journey you need arranged</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Globe2,
                title: "Cross-border transfers",
                lead: "Private international road journeys between Saudi Arabia and neighbouring countries, handled as feasibility-reviewed enquiries.",
                points: ["Corporate and executive travel", "Pre-arranged point-to-point transportation", "Route feasibility and vehicle confirmation before quotation"],
                cta: "Enquire about a cross-border transfer",
                href: "/transportation/cross-border-transfers",
              },
              {
                icon: Route,
                title: "VIP chauffeur in Saudi Arabia",
                lead: "Chauffeured travel for executives, guests and delegations, with Riyadh as our primary area.",
                points: ["Airport and hotel transfers", "City-to-city, hourly and full-day arrangements", "Conference, event and delegation mobility"],
                cta: "Enquire about a chauffeur",
                href: "/transportation/vip-chauffeur",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <article className="group h-full rounded-xl border border-[#1c2430]/10 bg-white p-7 transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a059]/60 hover:shadow-lg md:p-9">
                  <s.icon className="text-[#c5a059]" size={28} aria-hidden />
                  <h3 className="mt-5 font-serif text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#1c2430]/75">{s.lead}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[#1c2430]/80">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]" aria-hidden />{p}</li>
                    ))}
                  </ul>
                  <Link href={s.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0b1623] underline-offset-4 hover:underline">
                    {s.cta} <ArrowRight size={15} aria-hidden className="transition group-hover:translate-x-0.5" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#1c2430]/65">
            Looking for event or tourist transport? See our{" "}
            <Link href="/services/vip-transportation" className="font-medium underline underline-offset-4 hover:text-[#0b1623]">VIP event transportation</Link>{" "}
            and{" "}
            <Link href="/travel" className="font-medium underline underline-offset-4 hover:text-[#0b1623]">luxury travel &amp; private tours</Link>{" "}
            pages.
          </p>
        </section>

        {/* VEHICLE CLASSES */}
        <section className="bg-[#f1ebdf] py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className={eyebrow}>Vehicle classes</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold md:text-4xl">The right vehicle for the passengers and luggage</h2>
              <p className="mt-4 max-w-2xl text-[#1c2430]/75">
                We work in vehicle classes. The exact vehicle, passenger capacity and luggage allowance are confirmed in your quotation, and all vehicles are subject to availability.
                {" "}<Link href="/transportation/luxury-vehicles" className="font-medium underline underline-offset-4 hover:text-[#0b1623]">Compare the vehicle classes</Link>.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VEHICLE_CLASSES.map((v, i) => (
                <Reveal key={v.key} delay={i * 70}>
                  <article className="group h-full overflow-hidden rounded-xl border border-[#1c2430]/10 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-[#c5a059]/60 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={v.image} alt={v.imageAlt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold">{v.name}</h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#8a6d2f]">{v.typicalPassengers}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#1c2430]/75">{v.bestFor}</p>
                      <p className="mt-3 text-xs text-[#1c2430]/55">Subject to availability. Luggage suitability confirmed per vehicle.</p>
                      <a href="#enquiry" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b1623] underline-offset-4 hover:underline">
                        Request this class <ArrowRight size={14} aria-hidden />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CORPORATE */}
        <section id="corporate" className="scroll-mt-24 bg-[#0b1623] py-16 text-white md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
            <Reveal>
              <p className={eyebrow}>Corporate mobility</p>
              <h2 className="mt-3 font-serif text-3xl font-bold !text-white md:text-4xl">Arrange Executive Transportation for Your Team or Guests</h2>
              <p className="mt-5 leading-relaxed text-white/75">
                One point of contact, a structured itinerary, vehicle-class planning, coordinated pickups and a clear written quotation, for the people you are responsible for moving.
              </p>
              <a href="#enquiry" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#c5a059] px-6 py-3.5 text-sm font-semibold text-[#0b1623] transition hover:bg-[#d6b574] active:scale-[0.98]">
                Corporate Transportation Enquiry <ArrowRight size={16} aria-hidden />
              </a>
            </Reveal>
            <Reveal delay={100}>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  [Briefcase, "Executive transfers"],
                  [Users, "Business delegations"],
                  [ClipboardList, "Conferences and exhibitions"],
                  [UserCheck, "Hotel and hospitality guests"],
                  [Compass, "Multi-stop roadshows"],
                  [FileCheck2, "Recurring corporate service"],
                ].map(([Icon, text]) => {
                  const I = Icon as typeof Briefcase;
                  return (
                    <li key={text as string} className="flex items-center gap-3 border-b border-white/10 pb-4 text-sm text-white/85">
                      <I size={18} className="shrink-0 text-[#c5a059]" aria-hidden /> {text as string}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ROUTE DISCOVERY */}
        <section className="bg-[#0e1c2d] pb-16 pt-4 md:pb-24">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className={`${eyebrow} pt-12`}>Route discovery</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold !text-white md:text-4xl">Tell us the journey</h2>
              <p className="mt-4 mb-8 max-w-2xl text-white/70">
                Select your pickup and destination. If a route isn&apos;t yet confirmed we&apos;ll say so, and offer a feasibility enquiry rather than a promise.
              </p>
            </Reveal>
            <RouteSelector />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className={eyebrow}>How it works</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">From enquiry to pickup instructions</h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              ["Share your requirements", "Route, dates, passengers, luggage and vehicle preference."],
              ["Receive a tailored proposal", "A vehicle and route proposal based on what can be supported."],
              ["Confirm availability and quotation", "Availability, travel arrangements and a written quotation."],
              ["Booking coordination", "Once confirmed, you receive pickup coordination and instructions."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <li className="relative border-t-2 border-[#c5a059] pt-5">
                  <span className="font-serif text-3xl font-bold text-[#c5a059]/80">0{i + 1}</span>
                  <h3 className="mt-2 text-base font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1c2430]/70">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* STANDARDS */}
        <section className="bg-[#f1ebdf] py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal>
              <p className={eyebrow}>Service standards</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold md:text-4xl">What you can expect</h2>
            </Reveal>
            <ul className="mt-8 grid gap-x-10 gap-y-3 text-sm text-[#1c2430]/80 sm:grid-cols-2">
              {[
                "Pre-arranged transportation, not on-demand ride-hailing",
                "Vehicle class confirmed in your quotation",
                "Clear pickup coordination",
                "Professional, responsive communication",
                "Route and timing planning",
                "Travel-document reminders for international journeys",
                "A written quotation before any booking is confirmed",
                "One point of contact at Saudi Event Management",
              ].map((s) => (
                <li key={s} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]" aria-hidden />{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* COVERAGE (crawlable text; no map yet) */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <p className={eyebrow}>Coverage</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-bold md:text-4xl">Where we can arrange journeys</h2>
            <p className="mt-4 max-w-2xl text-[#1c2430]/75">
              This list shows where we take enquiries. It is not a guarantee of availability.
              {verified === 0 && " No cross-border route is yet operationally verified, so each is handled as a feasibility-reviewed enquiry."}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-serif text-xl font-bold">Saudi Arabia — chauffeur enquiries</h3>
              <p className="mt-2 text-sm text-[#1c2430]/70">
                Primary area: <Link href="/transportation/vip-chauffeur/riyadh" className="font-medium underline underline-offset-4">Riyadh</Link>. Also taken as enquiries, with availability checked per request: {COUNTRIES[0].cities.filter((c) => c !== "Riyadh").join(", ")}.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold"><Link href="/transportation/cross-border-transfers" className="hover:underline">Cross-border — enquiry only</Link></h3>
              <ul className="mt-2 space-y-1 text-sm text-[#1c2430]/75">
                {COUNTRIES.filter((c) => c.key !== "SA").map((c) => (
                  <li key={c.key}>Saudi Arabia ⇄ {c.name} <span className="text-[#1c2430]/50">· feasibility review</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ENQUIRY */}
        <section id="enquiry" className="scroll-mt-24 bg-[#0b1623] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12">
            <div className="text-white lg:col-span-5">
              <p className={eyebrow}>Request a quote</p>
              <h2 className="mt-3 font-serif text-3xl font-bold !text-white md:text-4xl">Planning Executive Travel or a Private Cross-Border Journey?</h2>
              <p className="mt-5 leading-relaxed text-white/75">
                Our team reviews the route, passenger requirements, vehicle preference and timing before preparing a tailored quotation. Submitting an enquiry does not confirm availability or a booking.
              </p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white hover:bg-white/10">
                <MessageCircle size={16} aria-hidden /> Or message us on WhatsApp
              </a>
            </div>
            <div className="lg:col-span-7">
              <TransportEnquiryForm formId="transportation_hub" heading="Tell us about the journey" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c5a059]">
                  {f.q}
                  <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#1c2430]/75">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
