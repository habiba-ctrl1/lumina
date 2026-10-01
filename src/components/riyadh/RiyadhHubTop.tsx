import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, MessageCircle, ShieldCheck, Sofa, UserCheck } from "lucide-react";
import ServiceExplorer from "./ServiceExplorer";
import RequirementBuilder from "@/components/services/RequirementBuilder";
import { EVENT_BUILD_STEPS, HUB_GROUPS, RIYADH_HUB_SERVICES, type HubService } from "@/lib/service-categories";

/**
 * Commercial top half of /locations/riyadh: hero → priority service grid →
 * interactive explorer → "build your event" chain. Everything below this on
 * the page (venues, calendar, FAQ, authority copy) is the existing indexed
 * content, kept intact.
 */

const WA = "https://wa.me/966539388072?text=" + encodeURIComponent("Hi SEM, I have an event in Riyadh and need service options.");
const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const ARROW = "transition-transform duration-300 group-hover:translate-x-1";

function FeaturedCard({ s, prefix, tall = false }: { s: HubService; prefix: string; tall?: boolean }) {
  const label = HUB_GROUPS.find((g) => g.id === s.groups[0])?.label;
  return (
    <Link
      href={`${prefix}${s.href}`}
      className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 ${tall ? "min-h-[420px] lg:min-h-full" : "min-h-[320px]"} transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.6)]`}
    >
      {s.image && (
        <Image src={s.image} alt={s.imageAlt || s.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/95 via-neutral-950/55 to-neutral-950/5 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="p-6 md:p-8">
        <span className="inline-flex rounded-full bg-[#C5A880] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-neutral-950">{label}</span>
        <h3 className="mt-3 !text-[1.6rem] md:!text-[1.9rem] text-white">{s.title}</h3>
        <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-white/80">{s.desc}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {s.keyServices.map((k) => (
            <li key={k} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[12px] text-white/90 backdrop-blur">{k}</li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
          Explore service <ArrowRight size={16} className={ARROW} />
        </span>
      </div>
    </Link>
  );
}

function StandardCard({ s, prefix }: { s: HubService; prefix: string }) {
  return (
    <Link
      href={`${prefix}${s.href}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-[3px] hover:border-[var(--primary)]/30 hover:shadow-[0_20px_50px_-22px_rgba(15,23,42,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[#064e3b]">
        {s.image ? (
          <Image src={s.image} alt={s.imageAlt || s.title} fill loading="lazy" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
        ) : (
          <div aria-hidden className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "18px 18px" }} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="!text-[17px] text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{s.title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-neutral-600">{s.desc}</p>
        <p className="mt-3 text-[12.5px] text-neutral-500">{s.keyServices.join(" · ")}</p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)]">
          Explore service <ArrowRight size={14} className={ARROW} />
        </span>
      </div>
    </Link>
  );
}

export default function RiyadhHubTop({ isAr, prefix }: { isAr: boolean; prefix: string }) {
  const featured = RIYADH_HUB_SERVICES.filter((s) => s.tier === "featured");
  const standard = RIYADH_HUB_SERVICES.filter((s) => s.tier === "standard");

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate flex min-h-[600px] md:min-h-[min(82vh,860px)] items-end overflow-hidden bg-neutral-950 pt-28">
        <Image src="/locations/riyadh-hero.webp" alt="Riyadh skyline at dusk with Kingdom Centre and Al Faisaliah Tower lit up" fill priority sizes="100vw" className="-z-10 object-cover object-[center_35%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/25" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r rtl:bg-gradient-to-l from-neutral-950/75 via-transparent to-transparent" />
        <div className={`${CONTAINER} w-full pb-16 md:pb-24`}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/70">
              <li><Link href={prefix || "/"} className="text-white/70 hover:text-white">{isAr ? "الرئيسية" : "Home"}</Link></li>
              <li aria-hidden><ChevronRight size={13} className="rtl:rotate-180" /></li>
              <li><Link href={`${prefix}/locations`} className="text-white/70 hover:text-white">{isAr ? "المواقع" : "Locations"}</Link></li>
              <li aria-hidden><ChevronRight size={13} className="rtl:rotate-180" /></li>
              <li aria-current="page" className="text-white">{isAr ? "الرياض" : "Riyadh"}</li>
            </ol>
          </nav>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur">
            {isAr ? "إدارة الفعاليات وخدماتها · الرياض" : "Event Management & Event Services · Riyadh"}
          </span>
          <h1 className="mt-5 max-w-3xl !text-[2.5rem] sm:!text-5xl lg:!text-[4.25rem] !leading-[1.03] text-white">
            {isAr ? <>خدمات الفعاليات <span className="text-[#C5A880]">في الرياض</span></> : <>Event Services <span className="text-[#C5A880]">in Riyadh</span></>}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] md:text-[19px] leading-relaxed text-white/85">
            {isAr
              ? "من الإنتاج التقني والضيافة إلى النقل الفاخر والترفيه ودعم الفعاليات، تنسّق إدارة الفعاليات السعودية مزوّدين سعوديين مناسبين وفق متطلبات فعاليتك."
              : "From technical production and catering to VIP transportation, entertainment and event support, SEM coordinates suitable Saudi-based providers around your event requirements."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href={`${prefix}/contact`} className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[var(--primary)] text-white hover:text-white hover:bg-[var(--primary-dark)] font-semibold text-[14px] shadow-[0_6px_20px_rgba(13,107,78,0.35)] transition-colors w-full sm:w-auto">
              {isAr ? "اطلب عرض سعر" : "Request a Quote"} <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white hover:text-white hover:bg-white/20 font-semibold text-[14px] transition-colors w-full sm:w-auto">
              <MessageCircle size={16} /> {isAr ? "راسلنا واتساب" : "WhatsApp SEM"}
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-white/65">
            <ShieldCheck size={15} className="shrink-0 text-[#C5A880]" />
            {isAr
              ? "يُؤكَّد توفّر الخدمة وسعرها وفق تاريخ فعاليتك وموقعها ومتطلباتها."
              : "Service availability and pricing are confirmed according to your event date, venue and requirements."}
          </p>
        </div>
      </section>

      {/* ── SERVICE GRID (priority-weighted) ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className={CONTAINER}>
          <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                <span className="h-px w-6 bg-[var(--primary)]/60" /> Event services
              </span>
              <h2 className="mt-3 text-neutral-900">What can SEM coordinate in Riyadh?</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
                SEM coordinates event-service requirements in Riyadh through suitable Saudi-based vendors and partners. Pick the service you need — each page explains what&apos;s included and lets you request a quote.
              </p>
            </div>
            <Link href={`${prefix}/services`} className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--primary)]">
              All services <ArrowRight size={15} className={ARROW} />
            </Link>
          </div>

          {/* Featured: highest-conversion services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FeaturedCard s={featured[0]} prefix={prefix} tall />
            <div className="grid grid-cols-1 gap-5">
              {featured.slice(1).map((s) => <FeaturedCard key={s.href} s={s} prefix={prefix} />)}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {standard.map((s) => <StandardCard key={s.href} s={s} prefix={prefix} />)}
            {/* Deferred categories — offered within parent services, no thin URLs */}
            <div className="flex flex-col justify-between rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-5 sm:col-span-2 lg:col-span-1">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Also on request</p>
                <ul className="mt-4 space-y-3">
                  <li className="flex gap-3">
                    <Sofa size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                    <p className="text-[14px] text-neutral-700"><span className="font-semibold text-neutral-900">Event furniture & rentals</span> — lounges, majlis seating, tables, chairs and counters, through our <Link href={`${prefix}/services/event-decoration`} className="font-semibold text-[var(--primary)] hover:underline">décor partners</Link>.</p>
                  </li>
                  <li className="flex gap-3">
                    <UserCheck size={18} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                    <p className="text-[14px] text-neutral-700"><span className="font-semibold text-neutral-900">Event staffing & guest services</span> — hostesses, registration and ushers can be checked as part of an <Link href={`${prefix}/services/exhibitions`} className="font-semibold text-[var(--primary)] hover:underline">exhibition</Link> or event enquiry.</p>
                  </li>
                </ul>
              </div>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--primary)]">
                Ask about availability <ArrowRight size={14} className={ARROW} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE EXPLORER ── */}
      <section className="py-16 md:py-24 bg-neutral-50/80 border-y border-neutral-200/70">
        <div className={CONTAINER}>
          <div className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              <span className="h-px w-6 bg-[var(--primary)]/60" /> Browse by area
            </span>
            <h2 className="mt-3 text-neutral-900">Explore services by area</h2>
            <p className="mt-4 text-[16px] text-neutral-600">Choose an area to see the services SEM can coordinate for it.</p>
          </div>
          <ServiceExplorer groups={HUB_GROUPS} services={RIYADH_HUB_SERVICES} prefix={prefix} />
        </div>
      </section>

      {/* ── REQUIREMENT BUILDER ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start`}>
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              <span className="h-px w-6 bg-[var(--primary)]/60" /> Requirement builder
            </span>
            <h2 className="mt-3 text-neutral-900">What do you need for your event?</h2>
            <p className="mt-4 text-[16px] text-neutral-600">Pick the event, what you need and the city — we&apos;ll take you to the right enquiry form with your answers filled in.</p>
          </div>
          <div className="lg:col-span-8">
            <RequirementBuilder locale={isAr ? "ar" : "en"} prefix={prefix} />
          </div>
        </div>
      </section>

      {/* ── BUILD YOUR EVENT ── */}
      <section className="py-16 md:py-24 bg-neutral-950 text-white">
        <div className={CONTAINER}>
          <div className="mb-10 md:mb-14 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#C5A880]">
              <span className="h-px w-6 bg-[#C5A880]" /> Build your event
            </span>
            <h2 className="mt-3 text-white">How the pieces of a Riyadh event fit together</h2>
            <p className="mt-4 text-[16px] text-white/65">
              Most events are built in this order — from the venue to the moment guests arrive. Each step links to the service that covers it, and SEM can coordinate any combination in one enquiry.
            </p>
          </div>
          <ol className="flex snap-x overflow-x-auto pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-y-4 lg:overflow-visible">
            {EVENT_BUILD_STEPS.map((s, i) => (
              <li key={s.label} className="flex shrink-0 snap-start items-stretch">
                <Link href={`${prefix}${s.href}`} className="group flex w-44 lg:w-auto lg:flex-1 flex-col rounded-xl border border-white/10 bg-white/[0.04] p-4 text-white hover:text-white hover:border-[#C5A880]/60 hover:bg-white/[0.08] transition-colors">
                  <span className="text-[11px] font-bold text-[#C5A880]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-2 text-[15px] font-semibold">{s.label}</span>
                  <span className="mt-1 text-[12px] leading-snug text-white/55">{s.note}</span>
                  <ArrowRight size={14} className={`mt-auto pt-3 box-content text-white/40 group-hover:text-[#C5A880] ${ARROW}`} />
                </Link>
                {i < EVENT_BUILD_STEPS.length - 1 && (
                  <span aria-hidden className={`flex w-7 shrink-0 items-center justify-center text-white/30 ${(i + 1) % 5 === 0 ? "lg:hidden" : ""}`}>
                    <ChevronRight size={16} />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href={`${prefix}/contact`} className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[var(--primary)] text-white hover:text-white hover:bg-[var(--primary-dark)] font-semibold text-[14px] transition-colors">
              Discuss Your Requirements
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/25 text-white hover:text-white hover:bg-white/10 font-semibold text-[14px] transition-colors">
              <MessageCircle size={16} /> WhatsApp SEM
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
