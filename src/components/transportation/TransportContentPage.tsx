import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/transportation/Reveal";
import TransportTracker from "@/components/transportation/TransportTracker";
import { SITE_URL } from "@/lib/seo";
import { TRANSPORT_PAGES, type TransportPage } from "@/lib/transportation/pages";

export function getTransportPage(key: string): TransportPage {
  const page = TRANSPORT_PAGES[key];
  if (!page) throw new Error(`Unknown transportation page: ${key}`);
  return page;
}

export function transportMetadata(p: TransportPage): Metadata {
  const url = `${SITE_URL}${p.path}`;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url },
    robots: p.indexable ? undefined : { index: false, follow: true },
    openGraph: { title: p.title, description: p.description, url, images: [{ url: p.image, width: 1200, height: 630, alt: p.imageAlt }] },
  };
}

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]";

export default function TransportContentPage({ page: p }: { page: TransportPage }) {
  const url = `${SITE_URL}${p.path}`;
  const quoteHref = `/transportation/request-a-quote${Object.keys(p.quote.query).length ? `?${new URLSearchParams(p.quote.query)}` : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: p.serviceName,
        description: p.description,
        provider: { "@type": "Organization", name: "Saudi Event Management", url: SITE_URL },
        areaServed: p.areaServed,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: p.breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          ...(b.href ? { item: `${SITE_URL}${b.href === "/" ? "" : b.href}` } : { item: url }),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TransportTracker page={p.path} />
      <main className="tx-root min-h-screen overflow-hidden bg-[#faf7f1] text-[#1c2430]">
        <Navbar darkHero />

        <section className="relative isolate bg-[#0b1623] text-white">
          <Image src={p.image} alt={p.imageAlt} fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1623] via-[#0b1623]/85 to-[#0b1623]/40" aria-hidden />
          <div className="mx-auto max-w-5xl px-5 pb-16 pt-32 md:pb-24 md:pt-40">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-x-2 text-xs text-white/60">
              {p.breadcrumbs.map((b, i) => (
                <span key={b.name}>
                  {b.href ? <Link href={b.href} className="text-white/70 hover:text-white">{b.name}</Link> : <span className="text-white/90">{b.name}</span>}
                  {i < p.breadcrumbs.length - 1 && <span aria-hidden className="ms-2">/</span>}
                </span>
              ))}
            </nav>
            <p className={eyebrow}>{p.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.1] !text-white md:text-5xl">{p.h1}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{p.intro}</p>
            <Link href={quoteHref} className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#c5a059] px-6 py-3.5 text-sm font-semibold text-[#0b1623] transition hover:bg-[#d6b574] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]">
              {p.quote.label} <ArrowRight size={16} aria-hidden />
            </Link>
            {!p.indexable && <p className="mt-4 text-xs text-white/50">Availability for this city is confirmed per request.</p>}
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:py-20 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {p.sections.map((s) => (
              <Reveal key={s.h2}>
                <section>
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">{s.h2}</h2>
                  {s.paragraphs?.map((t) => <p key={t} className="mt-4 leading-relaxed text-[#1c2430]/80">{t}</p>)}
                  {s.bullets && (
                    <ul className="mt-4 space-y-2 text-[#1c2430]/80">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#c5a059]" aria-hidden />{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-[#1c2430]/10 bg-white p-5">
              <h2 className="font-serif text-lg font-bold">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {p.glance.map(([k, v]) => (
                  <div key={k}><dt className="text-[11px] font-semibold uppercase tracking-wider text-[#8a6d2f]">{k}</dt><dd className="mt-0.5 text-[#1c2430]/80">{v}</dd></div>
                ))}
              </dl>
              <Link href={quoteHref} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0b1623] px-4 py-3 text-sm font-semibold text-white hover:bg-[#16293f]">
                {p.quote.label}
              </Link>
            </div>
          </aside>
        </div>

        <section className="mx-auto max-w-3xl px-5 pb-16">
          <h2 className="font-serif text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-[#1c2430]/10 border-y border-[#1c2430]/10">
            {p.faqs.map((f) => (
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

        <section className="bg-[#f1ebdf] py-14">
          <div className="mx-auto max-w-5xl px-5">
            <h2 className="font-serif text-xl font-bold md:text-2xl">Related</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="block h-full rounded-lg border border-[#1c2430]/10 bg-white p-4 transition hover:border-[#c5a059]/60 hover:shadow-md">
                    <span className="font-semibold">{r.label}</span>
                    <span className="mt-1 block text-sm text-[#1c2430]/65">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
