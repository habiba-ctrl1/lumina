import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InternalPageHero from "@/components/InternalPageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import { CheckCircle2, ChevronRight, MessageCircle, ClipboardList, Handshake, ShieldCheck, ArrowRight } from "lucide-react";
import { hreflangAlternates } from "@/lib/seo";
import type { ServiceCategory } from "@/lib/service-categories";

/**
 * Shared template for the main commercial service-category pages
 * (/services/event-catering, /services/led-screens, /services/sound-audio, …).
 * Content lives in src/lib/service-categories.ts — one data entry per page —
 * so every category gets the same conversion structure without duplicated
 * page code. The enquiry form sits early (section 5), not at the bottom.
 */

const SITE = "https://saudieventmanagement.com";
const WHATSAPP = "966539388072";

export function buildServiceCategoryMetadata(c: ServiceCategory, locale: string): Metadata {
  const path = `/services/${c.slug}`;
  const url = `${SITE}${locale === "en" ? "" : "/ar"}${path}`;
  return {
    title: { absolute: c.meta.title },
    description: c.meta.description,
    keywords: c.meta.keywords,
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url,
      siteName: "Saudi Event Management",
      type: "website",
      images: [{ url: `${SITE}${c.hero.image}`, width: 1200, height: 630, alt: c.meta.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
      images: [`${SITE}${c.hero.image}`],
    },
  };
}

function SectionHeading({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <div className="max-w-3xl mb-10 md:mb-12">
      <span className="section-label mb-3 flex">
        <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block me-1" />
        {label}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h2>
      {lead && <p className="text-neutral-500 text-[15px] leading-relaxed mt-4">{lead}</p>}
    </div>
  );
}

export default function ServiceCategoryPage({ category: c, locale }: { category: ServiceCategory; locale: string }) {
  const prefix = locale === "ar" ? "/ar" : "";
  const href = (p: string) => (p.startsWith("/") ? `${prefix}${p}` : p);
  const pageUrl = `${SITE}/services/${c.slug}`;
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(c.form.whatsappText)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: c.hero.title + " " + c.hero.highlight,
        serviceType: c.serviceType,
        description: c.answer.answer,
        url: pageUrl,
        provider: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Saudi Event Management", url: SITE },
        areaServed: [
          { "@type": "City", name: "Riyadh" },
          { "@type": "Country", name: "Saudi Arabia" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: c.subServices.heading,
          itemListElement: c.subServices.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.desc },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
          { "@type": "ListItem", position: 3, name: c.name, item: pageUrl },
        ],
      },
    ],
  };

  const primaryBtn =
    "inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto";
  const secondaryBtn =
    "inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto bg-white";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white text-neutral-900">
        <WhatsAppButton />
        <Navbar />

        {/* 1 ── Hero */}
        <InternalPageHero
          title={c.hero.title}
          titleHighlight={c.hero.highlight}
          subtitle={c.hero.subtitle}
          backgroundImage={c.hero.image}
          imageAlt={c.hero.imageAlt}
          badge={c.hero.badge}
          breadcrumbs={[
            { label: "Home", href: prefix || "/" },
            { label: "Services", href: `${prefix}/services` },
            { label: c.name },
          ]}
          minHeight="standard"
        />

        {/* Primary CTAs directly under the hero */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#enquiry" className={primaryBtn}>Request a Quote</a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
              <MessageCircle size={15} /> WhatsApp SEM
            </a>
          </div>
        </div>

        {/* 2 ── Answer block + commercial intro */}
        <section className="py-16 md:py-20 bg-neutral-50/70 border-b border-neutral-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-3 space-y-5">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>
                {c.answer.question}
              </h2>
              <p className="text-neutral-700 text-[15px] leading-relaxed">{c.answer.answer}</p>
              {c.intro.map((p, i) => (
                <p key={i} className="text-neutral-500 text-[15px] leading-relaxed">{p}</p>
              ))}
            </div>
            <aside className="lg:col-span-2 bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-7 self-start">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--primary)] mb-4">How SEM works</p>
              <ul className="space-y-4">
                {[
                  { icon: ClipboardList, t: "You share the brief", d: "Event type, date, venue, guest count and requirements." },
                  { icon: Handshake, t: "We match local partners", d: "Suitable Saudi-based providers with availability for your date." },
                  { icon: ShieldCheck, t: "One quotation, one contact", d: "Options presented clearly; SEM coordinates through to the event." },
                ].map(({ icon: Icon, t, d }) => (
                  <li key={t} className="flex gap-3">
                    <Icon size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{t}</p>
                      <p className="text-[13px] text-neutral-500 leading-relaxed">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* 3 ── What we can coordinate */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Scope" title={c.scope.heading} lead={c.scope.lead} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.scope.items.map((s) => (
                <div key={s.title} className="bg-white border border-neutral-200/80 p-6 rounded-2xl">
                  <h3 className="text-[15px] font-bold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 ── Sub-services */}
        <section className="py-16 md:py-24 bg-neutral-50/70 border-y border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Services" title={c.subServices.heading} lead={c.subServices.lead} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.subServices.items.map((s) => (
                <div key={s.title} className="flex gap-3 bg-white border border-neutral-200/80 rounded-xl p-5">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-bold text-neutral-900">{s.title}</h3>
                    <p className="text-neutral-500 text-[13px] leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 + 8 ── Enquiry form with "what to provide" checklist */}
        <section id="enquiry" className="py-16 md:py-24 relative overflow-hidden scroll-mt-24">
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a3d2c 0%, #064e3b 55%, #0d6b4e 100%)" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2 text-white space-y-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                <span className="w-6 h-px bg-[#C5A880]" /> Check Availability
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                Discuss your {c.name.toLowerCase()} requirements
              </h2>
              <p className="text-white/75 text-[15px] leading-relaxed">
                The more detail you share, the more accurate the options. If you don&apos;t have everything yet, send what you have — we&apos;ll ask for the rest.
              </p>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#C5A880] mb-3">Helpful to include</p>
                <ul className="space-y-2.5">
                  {c.clientChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-white/85 text-sm">
                      <CheckCircle2 size={16} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              >
                <MessageCircle size={15} /> Prefer WhatsApp? Message SEM directly
              </a>
            </div>
            <div className="lg:col-span-3">
              <ServiceLeadForm
                source={c.source}
                eyebrow="Request a Quote"
                heading={c.form.heading}
                subheading={c.form.subheading}
                submitLabel={c.form.submitLabel}
                serviceOptions={c.form.serviceOptions}
                serviceFields={c.form.fields}
                eventTypeOptions={c.form.eventTypeOptions}
                guestCountLabel={c.form.guestCountLabel}
                dateLabel="Event Date"
                messageLabel="Specific Requirements"
                messagePlaceholder={c.form.messagePlaceholder}
              />
            </div>
          </div>
        </section>

        {/* 6 ── Event types served */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Event Types" title={c.eventTypes.heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.eventTypes.items.map((et) => {
                const body = (
                  <>
                    <h3 className="text-[15px] font-bold text-neutral-900 mb-2 flex items-center gap-2">
                      {et.title}
                      {et.href && <ChevronRight size={14} className="text-[var(--primary)]" />}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{et.desc}</p>
                  </>
                );
                return et.href ? (
                  <Link key={et.title} href={href(et.href)} className="block border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
                    {body}
                  </Link>
                ) : (
                  <div key={et.title} className="border border-neutral-200/80 rounded-2xl p-6">{body}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7 ── How it works */}
        <section className="py-16 md:py-24 bg-neutral-50/70 border-y border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Process" title={`How ${c.name.toLowerCase()} coordination works`} />
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {c.process.map((step, i) => (
                <li key={step.title} className="bg-white border border-neutral-200/80 rounded-2xl p-5">
                  <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-white text-sm font-bold flex items-center justify-center mb-3">{i + 1}</span>
                  <h3 className="text-[14px] font-bold text-neutral-900 mb-1.5">{step.title}</h3>
                  <p className="text-neutral-500 text-[13px] leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 ── What affects the quotation */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Pricing" title={c.quoteFactors.heading} lead={c.quoteFactors.lead} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.quoteFactors.items.map((f) => (
                <div key={f.title} className="border border-neutral-200/80 rounded-xl p-5">
                  <h3 className="text-[14px] font-bold text-neutral-900 mb-1.5">{f.title}</h3>
                  <p className="text-neutral-500 text-[13px] leading-relaxed">{f.desc}</p>
                </div>
              ))}
              <a href="#enquiry" className="rounded-xl p-5 bg-[var(--primary)] text-white flex flex-col justify-between gap-3 hover:bg-[var(--primary-dark)] transition-colors">
                <span className="text-[14px] font-bold">Get a quotation for your event</span>
                <span className="text-[13px] text-white/80 flex items-center gap-1">Request a Quote <ArrowRight size={14} /></span>
              </a>
            </div>
          </div>
        </section>

        {/* 9 + 10 ── Partner coordination + quality/control */}
        <section className="py-16 md:py-24 bg-neutral-50/70 border-y border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <SectionHeading label="Our Model" title={c.coordination.heading} />
              <div className="space-y-4 -mt-4">
                {c.coordination.paragraphs.map((p, i) => (
                  <p key={i} className="text-neutral-600 text-[15px] leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading label="Quality" title={c.quality.heading} />
              <ul className="space-y-4 -mt-4">
                {c.quality.items.map((q) => (
                  <li key={q.title} className="flex gap-3 bg-white border border-neutral-200/80 rounded-xl p-5">
                    <ShieldCheck size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-[14px] font-bold text-neutral-900">{q.title}</h3>
                      <p className="text-neutral-500 text-[13px] leading-relaxed mt-1">{q.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 11 ── Typical use cases + visual */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <SectionHeading label="Use Cases" title={c.useCases.heading} />
              <div className="space-y-4 -mt-4">
                {c.useCases.items.map((u) => (
                  <div key={u.title} className="border-s-2 border-[var(--primary)]/40 ps-4">
                    <h3 className="text-[15px] font-bold text-neutral-900">{u.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed mt-1">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200/80">
                <Image src={c.feature.image} alt={c.feature.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="text-center text-neutral-400 text-[11px] uppercase tracking-widest mt-3">{c.feature.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* 14 ── Riyadh relevance */}
        <section className="py-16 md:py-20 bg-neutral-50/70 border-y border-neutral-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading label="Riyadh" title={c.riyadh.heading} />
            <div className="space-y-4 -mt-4">
              {c.riyadh.paragraphs.map((p, i) => (
                <p key={i} className="text-neutral-600 text-[15px] leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {c.riyadh.links.map((l) => (
                <Link key={l.href} href={href(l.href)} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)] bg-white border border-neutral-200/80 rounded-full px-4 py-2 hover:border-[var(--primary)]/40">
                  {l.label} <ChevronRight size={13} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 12 ── FAQ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {c.name} <span className="text-[var(--primary)]">FAQ</span>
              </h2>
            </div>
            <div className="space-y-3">
              {c.faqs.map((f) => (
                <details key={f.q} className="group bg-white border border-neutral-200/80 rounded-2xl p-5 md:p-6 open:shadow-sm">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <h3 className="text-[15px] md:text-base font-bold text-neutral-900">{f.q}</h3>
                    <ChevronRight size={18} className="text-[var(--primary)] shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-neutral-600 text-sm leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 13 ── Related services */}
        <section className="py-16 md:py-20 bg-neutral-50/60 border-t border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-widest">Related Services</h2>
              <Link href={`${prefix}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">
                All services <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.related.map((r) => (
                <Link key={r.href} href={href(r.href)} className="group bg-white border border-neutral-200/80 rounded-2xl p-5 hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                  <h3 className="text-neutral-900 font-bold mb-1.5 text-sm group-hover:text-[var(--primary)] transition-colors">{r.title}</h3>
                  <p className="text-neutral-500 text-[13px] leading-relaxed mb-2">{r.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Get service options <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 17 ── Final CTA */}
        <section className="py-16 md:py-20 bg-white border-t border-neutral-200/80 pb-28 lg:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>
              Ready to check options for your event?
            </h2>
            <p className="text-neutral-500 text-[15px] leading-relaxed mt-4">
              Availability and pricing depend on the service, date, venue and supplier. Send your requirements and SEM will come back with suitable options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
              <a href="#enquiry" className={primaryBtn}>Request a Quote</a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                <MessageCircle size={15} /> WhatsApp SEM
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
