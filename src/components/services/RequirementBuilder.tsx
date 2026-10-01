"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

/**
 * "What do you need for your event?" — a 3-step requirement builder.
 * Event type → need → city, then sends the visitor to the most relevant
 * service page's enquiry form with the selections prefilled (?event=&need=&city=),
 * so the lead keeps that page's own source attribution. No backend of its own.
 */

const EVENTS = ["Wedding", "Corporate Event", "Conference", "Exhibition", "Gala / VIP", "Private Event"] as const;
const NEEDS = [
  { id: "vip", en: "VIP Transportation", ar: "النقل الفاخر لكبار الشخصيات", href: "/services/vip-transportation" },
  { id: "valet", en: "Valet Parking", ar: "خدمة الفاليه", href: "/services/valet-parking" },
  { id: "both", en: "Transportation + Valet", ar: "النقل + الفاليه", href: "/services/vip-transportation" },
  { id: "catering", en: "Transportation + Catering", ar: "النقل + الضيافة", href: "/services/event-catering" },
  { id: "full", en: "Full Event Support", ar: "دعم متكامل للفعالية", href: "/locations/riyadh" },
] as const;
// Only cities SEM already covers on the site. Outside Riyadh, availability is checked per enquiry.
const CITIES = ["Riyadh", "Jeddah", "Dammam", "Other"] as const;

const EVENT_AR: Record<string, string> = { Wedding: "زفاف", "Corporate Event": "فعالية شركة", Conference: "مؤتمر", Exhibition: "معرض", "Gala / VIP": "حفل / كبار الشخصيات", "Private Event": "مناسبة خاصة" };
const CITY_AR: Record<string, string> = { Riyadh: "الرياض", Jeddah: "جدة", Dammam: "الدمام", Other: "مدينة أخرى" };

// Map builder event labels onto each form's own event-type values where they exist.
const EVENT_TO_FORM: Record<string, string> = { Wedding: "Wedding", "Corporate Event": "Corporate Event", Conference: "Conference / Exhibition", Exhibition: "Conference / Exhibition", "Gala / VIP": "Gala / Awards", "Private Event": "Private Event" };

export default function RequirementBuilder({ locale = "en", prefix = "" }: { locale?: string; prefix?: string }) {
  const isAr = locale === "ar";
  const [event, setEvent] = useState<string>("");
  const [need, setNeed] = useState<string>("");
  const [city, setCity] = useState<string>("Riyadh");

  const selectedNeed = NEEDS.find((n) => n.id === need);
  const ready = Boolean(event && selectedNeed);
  const target = selectedNeed
    ? `${prefix}${selectedNeed.href}?${new URLSearchParams({ event: EVENT_TO_FORM[event] ?? event, need: selectedNeed.en, city }).toString()}${selectedNeed.href.startsWith("/services") ? "#enquiry" : ""}`
    : "#";
  const wa = `https://wa.me/966539388072?text=${encodeURIComponent(
    `Hi SEM, I'm planning a ${event || "event"} in ${city} and need: ${selectedNeed?.en ?? "event services"}.`,
  )}`;

  const chip = (selected: boolean) =>
    `rounded-full border px-4 h-11 text-[14px] font-semibold transition-colors ${
      selected ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-[var(--primary)]/50"
    }`;

  const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <fieldset className="border-0 p-0 m-0">
      <legend className="mb-3 flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] text-white">{n}</span>
        {title}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );

  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 md:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
      <div className="space-y-6">
        <Step n={1} title={isAr ? "نوع الفعالية" : "Event type"}>
          {EVENTS.map((e) => (
            <button key={e} type="button" aria-pressed={event === e} onClick={() => setEvent(e)} className={chip(event === e)}>
              {isAr ? EVENT_AR[e] : e}
            </button>
          ))}
        </Step>
        <Step n={2} title={isAr ? "ما الذي تحتاجه؟" : "What do you need?"}>
          {NEEDS.map((n) => (
            <button key={n.id} type="button" aria-pressed={need === n.id} onClick={() => setNeed(n.id)} className={chip(need === n.id)}>
              {isAr ? n.ar : n.en}
            </button>
          ))}
        </Step>
        <Step n={3} title={isAr ? "المدينة" : "City"}>
          {CITIES.map((c) => (
            <button key={c} type="button" aria-pressed={city === c} onClick={() => setCity(c)} className={chip(city === c)}>
              {isAr ? CITY_AR[c] : c}
            </button>
          ))}
        </Step>
      </div>
      {city !== "Riyadh" && (
        <p className="mt-4 text-[13px] text-neutral-500">
          {isAr ? "خارج الرياض، يُتحقَّق من توفّر الشركاء لكل طلب على حدة." : "Outside Riyadh, partner availability is checked for each enquiry."}
        </p>
      )}
      <div className="mt-7 flex flex-col sm:flex-row gap-3">
        <a
          href={target}
          aria-disabled={!ready}
          onClick={(e) => { if (!ready) e.preventDefault(); }}
          className={`inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl font-semibold text-[14px] transition-colors w-full sm:w-auto ${
            ready ? "bg-[var(--primary)] text-white hover:text-white hover:bg-[var(--primary-dark)]" : "bg-neutral-200 text-neutral-500 hover:text-neutral-500 cursor-not-allowed"
          }`}
        >
          {isAr ? "ابنِ متطلبات فعاليتي" : "Build My Event Requirement"} <ArrowRight size={16} className="rtl:rotate-180" />
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-neutral-300 bg-white text-neutral-800 hover:text-[var(--primary)] hover:border-[var(--primary)] font-semibold text-[14px] transition-colors w-full sm:w-auto">
          <MessageCircle size={16} /> {isAr ? "أو أرسلها عبر واتساب" : "Or send it on WhatsApp"}
        </a>
      </div>
    </div>
  );
}
