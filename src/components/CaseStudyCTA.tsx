"use client";

// Conversion + cross-linking block for portfolio case studies.
// Renders related projects (internal linking + crawl depth), then a premium
// CTA band with consultation + WhatsApp. Bilingual via next-intl locale.

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { CASE_STUDIES, relatedCaseStudies } from "@/lib/case-studies";

const LOCATION_HREFS: Record<string, string> = {
  Riyadh: "/locations/riyadh",
  Jeddah: "/locations/jeddah",
  Makkah: "/locations/makkah",
  Madinah: "/locations/madinah",
  Dammam: "/locations/dammam",
  "Al Khobar": "/locations/khobar",
  AlUla: "/locations/alula",
  NEOM: "/locations/neom",
};

export default function CaseStudyCTA({ slug }: { slug: string }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const cs = CASE_STUDIES[slug];
  const related = relatedCaseStudies(slug, 3);
  const locationHref = cs ? LOCATION_HREFS[cs.location] : undefined;
  const csName = cs ? (isAr ? cs.ar.name : cs.name) : "";
  const csLocation = cs ? (isAr ? cs.ar.location : cs.location) : "";
  const arrow = isAr ? "←" : "→";

  const t = isAr
    ? {
        more: "استكشف المزيد من",
        projects: "المشاريع",
        all: "جميع المشاريع",
        planning: cs ? `هل تخطط لفعالية مماثلة في ${csLocation}؟` : "هل تخطط لفعالية مماثلة؟",
        desc: "أخبرنا عن فعاليتك وسيتواصل مخططونا خلال يوم عمل واحد باقتراح مخصص.",
        consult: "احجز استشارة مجانية",
        whatsapp: "تواصل عبر واتساب",
        eventsIn: (l: string) => `فعاليات في ${l} ${arrow}`,
        fullPortfolio: `عرض كامل الأعمال ${arrow}`,
        contact: `تواصل مع مخططينا ${arrow}`,
      }
    : {
        more: "Explore More",
        projects: "Projects",
        all: "All projects",
        planning: cs ? `Planning something similar in ${csLocation}?` : "Planning something similar?",
        desc: "Tell us about your event and our planners will respond within one business day with a tailored proposal.",
        consult: "Book a Free Consultation",
        whatsapp: "WhatsApp Us",
        eventsIn: (l: string) => `Events in ${l} ${arrow}`,
        fullPortfolio: `View full portfolio ${arrow}`,
        contact: `Contact our planners ${arrow}`,
      };

  const waText = encodeURIComponent(
    isAr
      ? `مرحبًا إدارة الفعاليات السعودية! شاهدت مشروع ${csName} وأود مناقشة فعالية مماثلة.`
      : `Hi Saudi Event Management! I saw the ${csName || "portfolio"} project and would like to discuss a similar event.`
  );

  return (
    <section className="bg-[var(--surface-raised)] border-t border-neutral-200/80 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.025em" }}>
                {t.more} <span className="text-[var(--primary)]">{t.projects}</span>
              </h2>
              <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)] hover:gap-2.5 transition-all">
                {t.all} <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-neutral-200/80 bg-white aspect-[4/3]"
                >
                  <Image
                    src={p.image}
                    alt={`${isAr ? p.ar.name : p.name} — ${isAr ? p.ar.category : p.category}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300 mb-1">{isAr ? p.ar.category : p.category}</p>
                    <p className="text-white font-semibold text-[15px] leading-snug flex items-center gap-1">
                      {isAr ? p.ar.name : p.name}
                      <ArrowUpRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-10 md:p-14 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)]/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4" style={{ letterSpacing: "-0.025em" }}>
              {t.planning}
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-9 text-[15px] leading-relaxed">
              {t.desc}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-neutral-900 font-semibold rounded-xl text-[14px] hover:bg-neutral-100 transition-colors"
              >
                {t.consult} <ArrowRight size={15} className={isAr ? "rotate-180" : ""} />
              </Link>
              <a
                href={`https://wa.me/966501234567?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl text-[14px] hover:bg-[#1fb855] transition-colors"
                aria-label={t.whatsapp}
              >
                <MessageCircle size={16} fill="currentColor" /> {t.whatsapp}
              </a>
            </div>
            {/* Contextual internal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[13px]">
              {locationHref && (
                <Link href={locationHref} className="text-amber-300/90 hover:text-amber-300 transition-colors">
                  {t.eventsIn(csLocation)}
                </Link>
              )}
              <Link href="/portfolio" className="text-amber-300/90 hover:text-amber-300 transition-colors">
                {t.fullPortfolio}
              </Link>
              <Link href="/contact" className="text-amber-300/90 hover:text-amber-300 transition-colors">
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
