import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import {
  ArrowRight, CheckCircle2, ChevronDown, ChevronRight, MessageCircle, ShieldCheck, ClipboardList, Handshake,
  UtensilsCrossed, Coffee, ChefHat, Users, Clock, Leaf, Sparkles, Monitor, Sun, Layers, Play, Wrench, Truck,
  Speaker, Mic, SlidersHorizontal, Headphones, Radio, Lightbulb, Flashlight, Palette, Flower2, Sofa, Frame,
  DoorOpen, KeyRound, Car, PlaneLanding, Shield, Route, Crown, Music, Disc3, Star, MapPin, Accessibility,
  Building2, CalendarDays, Zap, type LucideIcon,
} from "lucide-react";
import { hreflangAlternates } from "@/lib/seo";
import { contentFor, type ServiceCategory } from "@/lib/service-categories";
import type { Card, IconKey } from "@/lib/service-categories/types";

/**
 * Shared template for the main commercial service pages. Content lives in
 * src/lib/service-categories/* — one entry per page (EN, plus AR where the
 * route is indexed in Arabic). Server-rendered, CSS-only motion (no JS
 * animation cost), and the enquiry form sits early on the page.
 */

const SITE = "https://saudieventmanagement.com";
const WHATSAPP = "966539388072";

const ICONS: Record<IconKey, LucideIcon> = {
  utensils: UtensilsCrossed, coffee: Coffee, chef: ChefHat, users: Users, clock: Clock, leaf: Leaf, sparkles: Sparkles,
  monitor: Monitor, sun: Sun, layers: Layers, play: Play, wrench: Wrench, truck: Truck, speaker: Speaker, mic: Mic,
  sliders: SlidersHorizontal, headphones: Headphones, radio: Radio, lightbulb: Lightbulb, spotlight: Flashlight,
  palette: Palette, flower: Flower2, sofa: Sofa, frame: Frame, door: DoorOpen, key: KeyRound, car: Car,
  plane: PlaneLanding, shield: Shield, route: Route, crown: Crown, music: Music, disc: Disc3, star: Star, map: MapPin,
  clipboard: ClipboardList, accessibility: Accessibility, building: Building2, calendar: CalendarDays, zap: Zap,
};

const UI = {
  en: {
    home: "Home", services: "Services", quote: "Request a Quote", whatsapp: "WhatsApp SEM", discuss: "Discuss Your Requirements",
    trust: "Availability and pricing are confirmed according to your event date, venue and requirements.",
    howSem: "How SEM works", step1: "You share the brief", step1d: "Event type, date, venue, guest count and requirements.",
    step2: "We match local partners", step2d: "Suitable Saudi-based providers with availability for your date.",
    step3: "One quotation, one contact", step3d: "Options presented clearly; SEM coordinates through to the event.",
    scope: "Capabilities", services2: "Services", typical: "Typical use", explore: "Get options",
    midTitle: "Have a date and venue in mind?", midText: "Send the basics now — we'll ask for anything else we need.",
    flowLabel: "How it's specified", enquiry: "Check Availability", enquiryLead: "The more detail you share, the more accurate the options. Send what you have — we'll ask for the rest.",
    prefer: "Prefer WhatsApp? Message SEM directly", idealLabel: "Use Cases", processLabel: "Process", pricing: "Pricing",
    infoLabel: "Quote checklist", model: "Our Model", quality: "Quality", useCases: "Examples", galleryNote: "Representative service setups — not SEM project photos.",
    riyadh: "Riyadh", faq: "Frequently asked questions", related: "Related services", all: "All services",
    finalTitle: "Ready to check options for your event?", finalText: "Availability and pricing depend on the service, date, venue and supplier. Send your requirements and SEM will come back with suitable options.",
    eventDate: "Event Date", requirements: "Specific Requirements", eyebrow: "Request a Quote",
  },
  ar: {
    home: "الرئيسية", services: "الخدمات", quote: "اطلب عرض سعر", whatsapp: "راسلنا واتساب", discuss: "ناقش متطلباتك",
    trust: "يُؤكَّد التوفّر والسعر وفق تاريخ فعاليتك وموقعها ومتطلباتها.",
    howSem: "كيف نعمل", step1: "تشاركنا طلبك", step1d: "نوع الفعالية والتاريخ والموقع وعدد الضيوف والمتطلبات.",
    step2: "نختار شركاء محليين", step2d: "مزوّدون سعوديون مناسبون ومتاحون في تاريخك.",
    step3: "عرض سعر واحد ونقطة تواصل واحدة", step3d: "خيارات واضحة، ونتابع التنسيق حتى يوم الفعالية.",
    scope: "القدرات", services2: "الخدمات", typical: "الاستخدام المعتاد", explore: "اطلب الخيارات",
    midTitle: "هل لديك تاريخ وموقع؟", midText: "أرسل الأساسيات الآن — وسنطلب أي تفاصيل أخرى نحتاجها.",
    flowLabel: "كيف تُحدَّد المواصفات", enquiry: "تحقّق من التوفّر", enquiryLead: "كلما شاركت تفاصيل أكثر كانت الخيارات أدق. أرسل ما لديك — وسنطلب الباقي.",
    prefer: "تفضّل واتساب؟ راسلنا مباشرة", idealLabel: "الاستخدامات", processLabel: "خطوات العمل", pricing: "التسعير",
    infoLabel: "قائمة عرض السعر", model: "نموذج عملنا", quality: "الجودة", useCases: "أمثلة", galleryNote: "إعدادات خدمة نموذجية — وليست صورًا لمشاريعنا.",
    riyadh: "الرياض", faq: "الأسئلة الشائعة", related: "خدمات ذات صلة", all: "جميع الخدمات",
    finalTitle: "جاهز للتحقق من الخيارات لفعاليتك؟", finalText: "يعتمد التوفّر والسعر على الخدمة والتاريخ والموقع والمزوّد. أرسل متطلباتك وسنعود إليك بخيارات مناسبة.",
    eventDate: "تاريخ الفعالية", requirements: "متطلبات إضافية", eyebrow: "اطلب عرض سعر",
  },
} as const;

export function buildServiceCategoryMetadata(c: ServiceCategory, locale: string): Metadata {
  const meta = c.meta!;
  const path = `/services/${c.slug}`;
  const url = `${SITE}${locale === "en" ? "" : "/ar"}${path}`;
  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Saudi Event Management",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: `${SITE}${c.en.hero.image}`, width: 1200, height: 630, alt: meta.ogImageAlt }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [`${SITE}${c.en.hero.image}`] },
  };
}

/* ── Small building blocks ──────────────────────────────────────────────── */

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const ARROW = "transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1";
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-[var(--primary)] text-white hover:text-white hover:bg-[var(--primary-dark)] font-semibold text-[14px] tracking-wide shadow-[0_6px_20px_rgba(13,107,78,0.28)] transition-colors w-full sm:w-auto";
const BTN_GLASS =
  "inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/30 bg-white/10 backdrop-blur text-white hover:text-white hover:bg-white/20 font-semibold text-[14px] tracking-wide transition-colors w-full sm:w-auto";
const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-neutral-300 bg-white text-neutral-800 hover:text-[var(--primary)] hover:border-[var(--primary)] font-semibold text-[14px] tracking-wide transition-colors w-full sm:w-auto";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] ${light ? "text-[#C5A880]" : "text-[var(--primary)]"}`}>
      <span className={`h-px w-6 ${light ? "bg-[#C5A880]" : "bg-[var(--primary)]/60"}`} />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, lead, center = false }: { eyebrow: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={`mb-10 md:mb-14 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-neutral-900">{title}</h2>
      {lead && <p className="mt-4 text-[16px] text-neutral-600 leading-relaxed">{lead}</p>}
    </div>
  );
}

function IconBadge({ icon }: { icon?: IconKey }) {
  const Icon = icon ? ICONS[icon] : CheckCircle2;
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/[0.07] ring-1 ring-[var(--primary)]/15 text-[var(--primary)] transition-colors duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
      <Icon size={20} strokeWidth={1.75} />
    </span>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ServiceCategoryPage({ category: c, locale }: { category: ServiceCategory; locale: string }) {
  const { content: x, isAr } = contentFor(c, locale);
  const t = isAr ? UI.ar : UI.en;
  const prefix = locale === "ar" ? "/ar" : "";
  const href = (p: string) => (p.startsWith("/") ? `${prefix}${p}` : p);
  const pageUrl = `${SITE}${prefix}/services/${c.slug}`;
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(x.form.whatsappText)}`;
  const featuredSubs = x.subServices.items.filter((s) => s.image);
  const compactSubs = x.subServices.items.filter((s) => !s.image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${x.hero.title} ${x.hero.highlight}`,
        serviceType: c.serviceType,
        description: x.answer.answer,
        url: pageUrl,
        inLanguage: isAr ? "ar" : "en",
        provider: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Saudi Event Management", url: SITE },
        areaServed: [{ "@type": "City", name: "Riyadh" }, { "@type": "Country", name: "Saudi Arabia" }],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: x.subServices.heading,
          itemListElement: x.subServices.items.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: x.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: `${SITE}${prefix}` || SITE },
          { "@type": "ListItem", position: 2, name: t.services, item: `${SITE}${prefix}/services` },
          { "@type": "ListItem", position: 3, name: x.name, item: pageUrl },
        ],
      },
    ],
  };

  const renderLinkOrDiv = (item: Card, className: string, children: React.ReactNode) =>
    item.href ? (
      <Link key={item.title} href={href(item.href)} className={`group ${className}`}>{children}</Link>
    ) : (
      <div key={item.title} className={`group ${className}`}>{children}</div>
    );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white text-neutral-900">
        <WhatsAppButton />
        <Navbar />

        {/* 1 ── HERO */}
        <section className="relative isolate flex min-h-[600px] md:min-h-[min(78vh,820px)] items-end overflow-hidden bg-neutral-950 pt-28">
          <Image src={x.hero.image} alt={x.hero.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r rtl:bg-gradient-to-l from-neutral-950/80 via-neutral-950/30 to-transparent" />
          <div className={`${CONTAINER} w-full pb-24 md:pb-28`}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/70">
                <li><Link href={prefix || "/"} className="text-white/70 hover:text-white">{t.home}</Link></li>
                <li aria-hidden><ChevronRight size={13} className="rtl:rotate-180" /></li>
                <li><Link href={`${prefix}/services`} className="text-white/70 hover:text-white">{t.services}</Link></li>
                <li aria-hidden><ChevronRight size={13} className="rtl:rotate-180" /></li>
                <li aria-current="page" className="text-white">{x.name}</li>
              </ol>
            </nav>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur">
              {x.hero.badge}
            </span>
            <h1 className="mt-5 max-w-3xl !text-[2.4rem] sm:!text-5xl lg:!text-6xl !leading-[1.05] text-white">
              {x.hero.title} <span className="text-[#C5A880]">{x.hero.highlight}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] md:text-[18px] leading-relaxed text-white/85">{x.hero.subtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#enquiry" className={BTN_PRIMARY}>{t.quote} <ArrowRight size={16} className="rtl:rotate-180" /></a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={BTN_GLASS}><MessageCircle size={16} /> {t.whatsapp}</a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[13px] text-white/65">
              <ShieldCheck size={15} className="shrink-0 text-[#C5A880]" /> {t.trust}
            </p>
          </div>
        </section>

        {/* 2 ── QUICK SNAPSHOT */}
        <div className={`${CONTAINER} relative z-10 -mt-12`}>
          <dl className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_18px_50px_-20px_rgba(15,23,42,0.25)]">
            {x.snapshot.map((s, i) => (
              <div key={s.label} className={`p-5 md:p-6 ${i % 2 === 1 ? "border-s border-neutral-100" : ""} ${i > 1 ? "border-t lg:border-t-0 border-neutral-100" : ""} ${i > 0 ? "lg:border-s" : ""}`}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{s.label}</dt>
                <dd className="mt-1.5 text-[15px] md:text-[16px] font-semibold text-neutral-900">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3 ── ANSWER BLOCK + HOW SEM WORKS */}
        <section className="py-16 md:py-24">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14`}>
            <div className="lg:col-span-7">
              <h2 className="!text-2xl md:!text-[2rem] text-neutral-900">{x.answer.question}</h2>
              <p className="mt-5 text-[17px] leading-relaxed text-neutral-800">{x.answer.answer}</p>
              {x.intro.map((p, i) => (
                <p key={i} className="mt-4 text-[16px] leading-relaxed text-neutral-600">{p}</p>
              ))}
            </div>
            <aside className="lg:col-span-5 self-start rounded-2xl bg-neutral-50 border border-neutral-200/70 p-6 md:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">{t.howSem}</p>
              <ol className="mt-5 space-y-5">
                {[
                  { icon: ClipboardList, a: t.step1, b: t.step1d },
                  { icon: Handshake, a: t.step2, b: t.step2d },
                  { icon: ShieldCheck, a: t.step3, b: t.step3d },
                ].map(({ icon: Icon, a, b }, i) => (
                  <li key={a} className="flex gap-4">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-neutral-200 text-[var(--primary)]">
                      <Icon size={18} />
                      <span className="absolute -top-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-white">{i + 1}</span>
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-neutral-900">{a}</p>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-neutral-500">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* 4 ── CAPABILITIES */}
        <section className="py-16 md:py-24 bg-neutral-50/80 border-y border-neutral-200/70">
          <div className={CONTAINER}>
            <SectionHead eyebrow={t.scope} title={x.capabilities.heading} lead={x.capabilities.lead} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {x.capabilities.items.map((s) => (
                <div key={s.title} className="group rounded-2xl border border-neutral-200/80 bg-white p-6 md:p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-[var(--primary)]/30 hover:shadow-[0_16px_40px_-18px_rgba(13,107,78,0.35)]">
                  <IconBadge icon={s.icon} />
                  <h3 className="mt-5 !text-[17px] text-neutral-900">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-neutral-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 ── SUB-SERVICES: image-led featured cards + compact grid */}
        <section className="py-16 md:py-24">
          <div className={CONTAINER}>
            <SectionHead eyebrow={t.services2} title={x.subServices.heading} lead={x.subServices.lead} />
            {featuredSubs.length > 0 && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${featuredSubs.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-5`}>
                {featuredSubs.map((s) =>
                  renderLinkOrDiv(
                    s,
                    "flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)]",
                    <>
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                        <Image src={s.image!} alt={s.imageAlt || s.title} fill loading="lazy" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                      </div>
                      <div className="flex flex-1 flex-col p-5 md:p-6">
                        <h3 className="!text-[17px] text-neutral-900">{s.title}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{s.desc}</p>
                        {s.useCase && (
                          <p className="mt-3 text-[12.5px] text-neutral-500"><span className="font-semibold text-neutral-700">{t.typical}:</span> {s.useCase}</p>
                        )}
                        {s.href && (
                          <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)]">
                            {t.explore} <ArrowRight size={14} className={ARROW} />
                          </span>
                        )}
                      </div>
                    </>,
                  ),
                )}
              </div>
            )}
            {compactSubs.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {compactSubs.map((s) =>
                  renderLinkOrDiv(
                    s,
                    "flex items-start gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 md:p-5 transition-all duration-300 hover:border-[var(--primary)]/30 hover:bg-neutral-50/60",
                    <>
                      <IconBadge icon={s.icon} />
                      <div className="min-w-0 flex-1">
                        <h3 className="!text-[15px] text-neutral-900 flex items-center gap-1.5">
                          {s.title}
                          {s.href && <ArrowRight size={13} className={`text-[var(--primary)] ${ARROW}`} />}
                        </h3>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-500">{s.desc}</p>
                      </div>
                    </>,
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="pb-16 md:pb-24">
          <div className={CONTAINER}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl bg-neutral-900 px-6 py-8 md:px-10 md:py-10">
              <div>
                <p className="text-[20px] md:text-[22px] font-semibold text-white">{t.midTitle}</p>
                <p className="mt-1.5 text-[15px] text-white/65">{t.midText}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="#enquiry" className={BTN_PRIMARY}>{t.discuss}</a>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={BTN_GLASS}><MessageCircle size={16} /> {t.whatsapp}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 6 ── DECISION-FLOW INFOGRAPHIC */}
        <section className="py-16 md:py-20 bg-[var(--primary)]/[0.04] border-y border-[var(--primary)]/10">
          <div className={CONTAINER}>
            <SectionHead eyebrow={t.flowLabel} title={x.flow.heading} lead={x.flow.lead} />
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-0">
              {x.flow.steps.map((s, i) => (
                <li key={s.label} className="relative flex md:flex-col items-center md:items-stretch gap-4 md:gap-0">
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 w-full rounded-2xl md:rounded-none md:first:rounded-s-2xl md:last:rounded-e-2xl border border-[var(--primary)]/15 md:border-e-0 md:last:border-e bg-white p-4 md:p-6 h-full">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${i === x.flow.steps.length - 1 ? "bg-[#C5A880] text-white" : "bg-[var(--primary)] text-white"}`}>{i + 1}</span>
                    <div>
                      <p className="text-[15px] font-semibold text-neutral-900">{s.label}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-neutral-500">{s.detail}</p>
                    </div>
                  </div>
                  {i < x.flow.steps.length - 1 && (
                    <span aria-hidden className="hidden md:flex absolute top-1/2 -end-3 z-10 h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white ring-1 ring-[var(--primary)]/20 text-[var(--primary)]">
                      <ChevronRight size={14} className="rtl:rotate-180" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 ── ENQUIRY FORM */}
        <section id="enquiry" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a3d2c 0%, #064e3b 55%, #0d6b4e 100%)" }} />
          <div className={`${CONTAINER} relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start`}>
            <div className="lg:col-span-5 space-y-6 text-white">
              <Eyebrow light>{t.enquiry}</Eyebrow>
              <h2 className="text-white">{x.form.heading}</h2>
              <p className="text-[16px] leading-relaxed text-white/75">{t.enquiryLead}</p>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#C5A880] mb-3">{x.clientChecklist.heading}</p>
                <ul className="space-y-2.5">
                  {x.clientChecklist.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#C5A880]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[14px] font-semibold text-white hover:text-[#C5A880] hover:border-[#C5A880]">
                <MessageCircle size={15} /> {t.prefer}
              </a>
            </div>
            <div className="lg:col-span-7">
              <ServiceLeadForm
                locale={isAr ? "ar" : "en"}
                source={c.source}
                eyebrow={t.eyebrow}
                heading={x.form.heading}
                subheading={x.form.subheading}
                submitLabel={x.form.submitLabel}
                serviceOptions={x.form.serviceOptions}
                serviceOptionLabels={x.form.serviceOptionLabels}
                serviceFields={x.form.fields}
                eventTypeOptions={x.form.eventTypeOptions}
                eventTypeOptionLabels={x.form.eventTypeOptionLabels}
                eventTypeLabel={isAr ? "نوع الفعالية" : "Event Type"}
                guestCountLabel={x.form.guestCountLabel}
                dateLabel={t.eventDate}
                companyLabel={isAr ? "الشركة / الجهة" : "Company / Organisation"}
                messageLabel={x.form.messageLabel ?? t.requirements}
                messagePlaceholder={x.form.messagePlaceholder}
              />
            </div>
          </div>
        </section>

        {/* 8 ── IDEAL FOR */}
        <section className="py-16 md:py-24">
          <div className={CONTAINER}>
            <SectionHead eyebrow={t.idealLabel} title={x.idealFor.heading} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {x.idealFor.items.map((it) =>
                renderLinkOrDiv(
                  it,
                  "flex items-center justify-between gap-4 rounded-xl border border-neutral-200/80 bg-white px-5 py-4 transition-all duration-300 hover:border-[var(--primary)]/35 hover:shadow-[0_10px_30px_-16px_rgba(15,23,42,0.3)]",
                  <>
                    <div>
                      <h3 className="!text-[15.5px] text-neutral-900">{it.title}</h3>
                      <p className="mt-0.5 text-[13.5px] text-neutral-500">{it.desc}</p>
                    </div>
                    {it.href && <ArrowRight size={16} className={`shrink-0 text-[var(--primary)] ${ARROW}`} />}
                  </>,
                ),
              )}
            </div>
          </div>
        </section>

        {/* 9 ── PROCESS TIMELINE */}
        <section className="py-16 md:py-24 bg-neutral-50/80 border-y border-neutral-200/70">
          <div className={CONTAINER}>
            <SectionHead eyebrow={t.processLabel} title={x.process.heading} />
            <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
              <span aria-hidden className="hidden md:block absolute top-5 start-[10%] end-[10%] h-px bg-neutral-300" />
              {x.process.items.map((step, i) => (
                <li key={step.title} className="relative flex md:flex-col gap-4 md:gap-0 md:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[14px] font-bold text-white ring-4 ring-neutral-50 md:mx-auto">{i + 1}</span>
                  <div className="md:mt-4">
                    <h3 className="!text-[15.5px] text-neutral-900">{step.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-500">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 10 ── PRICING FACTORS + QUOTE CHECKLIST (answer-ready) */}
        <section className="py-16 md:py-24">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14`}>
            <div className="lg:col-span-7">
              <Eyebrow>{t.pricing}</Eyebrow>
              <h2 className="mt-3 text-neutral-900">{x.quoteFactors.heading}</h2>
              <p className="mt-4 text-[16px] text-neutral-600">{x.quoteFactors.lead}</p>
              <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
                {x.quoteFactors.items.map((f) => (
                  <li key={f.title} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-4">
                    <span className="text-[15px] font-semibold text-neutral-900">{f.title}</span>
                    <span className="text-[14.5px] leading-relaxed text-neutral-600">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="lg:col-span-5 self-start rounded-2xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)]">
              <Eyebrow>{t.infoLabel}</Eyebrow>
              <h2 className="mt-3 !text-[1.35rem] text-neutral-900">{x.clientChecklist.heading}</h2>
              <ul className="mt-5 space-y-3">
                {x.clientChecklist.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] text-neutral-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--primary)]" /> {item}
                  </li>
                ))}
              </ul>
              <a href="#enquiry" className={`${BTN_PRIMARY} mt-7 !w-full`}>{t.quote}</a>
            </aside>
          </div>
        </section>

        {/* 11 ── PARTNER MODEL + QUALITY */}
        <section className="py-16 md:py-24 bg-neutral-50/80 border-y border-neutral-200/70">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16`}>
            <div>
              <Eyebrow>{t.model}</Eyebrow>
              <h2 className="mt-3 text-neutral-900">{x.coordination.heading}</h2>
              {x.coordination.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-[16px] leading-relaxed text-neutral-600">{p}</p>
              ))}
            </div>
            <div>
              <Eyebrow>{t.quality}</Eyebrow>
              <h2 className="mt-3 text-neutral-900">{x.quality.heading}</h2>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {x.quality.items.map((q) => (
                  <li key={q.title} className="rounded-xl border border-neutral-200/80 bg-white p-5">
                    <ShieldCheck size={18} className="text-[var(--primary)]" />
                    <h3 className="mt-3 !text-[15px] text-neutral-900">{q.title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-neutral-500">{q.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 12 ── USE CASES + FEATURE VISUAL */}
        <section className="py-16 md:py-24">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
            <div>
              <Eyebrow>{t.useCases}</Eyebrow>
              <h2 className="mt-3 text-neutral-900">{x.useCases.heading}</h2>
              <div className="mt-8 space-y-6">
                {x.useCases.items.map((u) => (
                  <div key={u.title} className="border-s-2 border-[var(--primary)]/40 ps-5">
                    <h3 className="!text-[16px] text-neutral-900">{u.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-neutral-600">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-100">
                <Image src={x.feature.image} alt={x.feature.alt} fill loading="lazy" sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-center text-[12px] text-neutral-500">{x.feature.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* Optional gallery */}
        {x.gallery && x.gallery.items.length >= 3 && (
          <section className="pb-16 md:pb-24">
            <div className={CONTAINER}>
              <h2 className="!text-2xl text-neutral-900">{x.gallery.heading}</h2>
              <p className="mt-2 text-[13px] text-neutral-500">{t.galleryNote}</p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {x.gallery.items.map((g) => (
                  <figure key={g.image} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                      <Image src={g.image} alt={g.alt} fill loading="lazy" sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <figcaption className="mt-2 text-[12.5px] text-neutral-500">{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 13 ── RIYADH RELEVANCE */}
        <section className="py-16 md:py-20 bg-neutral-900 text-white">
          <div className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}>
            <div className="lg:col-span-8">
              <Eyebrow light>{t.riyadh}</Eyebrow>
              <h2 className="mt-3 text-white">{x.riyadh.heading}</h2>
              {x.riyadh.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-[16px] leading-relaxed text-white/70">{p}</p>
              ))}
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              {x.riyadh.links.map((l) => (
                <Link key={l.href} href={href(l.href)} className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-[14.5px] font-semibold text-white hover:text-white hover:bg-white/10 transition-colors">
                  {l.label} <ArrowRight size={16} className={`text-[#C5A880] ${ARROW}`} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 14 ── FAQ */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-center text-neutral-900">{t.faq}</h2>
            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {x.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="!text-[16px] md:!text-[17px] text-neutral-900">{f.q}</h3>
                    <ChevronDown size={19} className="mt-1 shrink-0 text-[var(--primary)] transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15 ── RELATED SERVICES */}
        <section className="py-16 md:py-20 bg-neutral-50/80 border-t border-neutral-200/70">
          <div className={CONTAINER}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="!text-2xl md:!text-3xl text-neutral-900">{t.related}</h2>
              <Link href={`${prefix}/services`} className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)]">
                {t.all} <ArrowRight size={14} className={ARROW} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {x.related.map((r) => (
                <Link key={r.href} href={href(r.href)} className="group overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[var(--primary)]/15 to-[#C5A880]/20">
                    {r.image && (
                      <Image src={r.image} alt="" fill loading="lazy" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="!text-[16px] text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{r.title}</h3>
                    <p className="mt-1 text-[13.5px] text-neutral-500">{r.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)]">
                      {t.explore} <ArrowRight size={14} className={ARROW} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 16 ── FINAL CTA */}
        <section className="py-16 md:py-20 pb-28 lg:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-neutral-900">{t.finalTitle}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">{t.finalText}</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#enquiry" className={BTN_PRIMARY}>{t.quote}</a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}><MessageCircle size={16} /> {t.whatsapp}</a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
