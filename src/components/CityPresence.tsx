"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, BarChart3 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

// Images re-use existing gallery assets — each maps to a Saudi city atmosphere
const CITY_IMAGES = [
  "/corporate.webp",                    // Riyadh — corporate skyline feel
  "/gallery_wedding_reception.webp",    // Jeddah — elegant coastal event
  "/gallery_destination_wedding.webp",  // AlUla  — desert luxury
  "/gallery_charity_gala.webp",         // Makkah — formal/ceremonial gala
  "/gallery_garden_party.webp",         // Madinah — serene garden atmosphere
  "/gallery_corporate_gala.webp",       // Dammam  — corporate expo gala
];

// Dedicated location pages where they exist, /locations otherwise
const CITY_HREFS = [
  "/locations/riyadh",
  "/locations/jeddah",
  "/locations/alula",
  "/locations",
  "/locations",
  "/locations/dammam",
];

export default function CityPresence() {
  const t = useTranslations("cityPresence");
  const cities = t.raw("cities") as any[];
  const [activeIdx, setActiveIdx] = useState(0);
  const city = cities[activeIdx];

  return (
    <SectionWrapper
      id="locations-overview"
      className="bg-[var(--surface-warm)] bg-stripe-diagonal relative overflow-hidden"
    >
      <div className="relative z-10 py-10">

        {/* Section header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {t("label")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-900 text-3xl md:text-4xl font-semibold mb-4"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 text-[16px] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* City tab bar — segmented control style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex gap-1 p-1.5 bg-white border border-neutral-200/80 rounded-xl overflow-x-auto max-w-full"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            {cities.map((c: any, i: number) => (
              <button
                key={c.id}
                onClick={() => setActiveIdx(i)}
                className={`relative flex-shrink-0 px-4 md:px-5 py-2.5 text-[12px] md:text-[13px] font-semibold rounded-lg transition-colors duration-200 ${
                  activeIdx === i ? "text-white" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {activeIdx === i && (
                  <motion.span
                    layoutId="city-tab-pill"
                    className="absolute inset-0 bg-[var(--primary)] rounded-lg"
                    transition={{ type: "spring", stiffness: 420, damping: 35 }}
                    style={{ boxShadow: "0 2px 8px rgba(13,107,78,0.28)" }}
                  />
                )}
                <span className="relative z-10">{c.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* City content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-neutral-200/80 bg-white"
            style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)" }}
          >
            {/* LEFT — City image with overlay */}
            <div className="relative h-64 md:h-80 lg:h-auto min-h-[340px] overflow-hidden">
              <Image
                src={CITY_IMAGES[activeIdx]}
                alt={`Event management in ${city.name}, Saudi Arabia — ${city.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/25 to-transparent" />
              {/* Right-side fade for lg layout */}
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/5 to-transparent hidden lg:block" />

              {/* City name overlay */}
              <div className="absolute bottom-0 inset-x-0 p-7 md:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={13} className="text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 text-[10px] font-bold tracking-[0.18em] uppercase">
                    {city.badge}
                  </span>
                </div>
                <p
                  className="text-white font-black leading-none text-[2rem] md:text-[2.6rem]"
                  style={{
                    letterSpacing: "-0.03em",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {city.name}
                </p>
              </div>
            </div>

            {/* RIGHT — City detail */}
            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">

              {/* Events stat badge */}
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border border-[var(--primary)]/30 bg-[var(--primary-surface)] text-[var(--primary)] px-3 py-1.5 rounded-md mb-5 self-start">
                <BarChart3 size={10} />
                {city.stat}
              </span>

              {/* City service title */}
              <h3
                className="text-[1.3rem] md:text-[1.55rem] font-bold text-neutral-900 mb-4 leading-tight"
                style={{ letterSpacing: "-0.025em" }}
              >
                {city.title}
              </h3>

              {/* Rich description with semantic entities */}
              <p className="text-[14px] md:text-[14.5px] text-neutral-500 leading-relaxed mb-6">
                {city.description}
              </p>

              {/* Entity / venue tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(city.tags as string[]).map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[11px] font-semibold text-neutral-600 bg-neutral-50 border border-neutral-200/80 px-3 py-1.5 rounded-full tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Descriptive CTA */}
              <Link
                href={CITY_HREFS[activeIdx]}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--primary)] self-start group"
              >
                <span className="border-b border-[var(--primary)]/30 group-hover:border-[var(--primary)] pb-px transition-colors duration-200">
                  {t("exploreBtn")} {city.name}
                </span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}
