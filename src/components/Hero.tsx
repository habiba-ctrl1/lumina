"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const slideshowImages = [
  "/hero_bg.webp",
  "/gallery_wedding_reception.webp",
  "/gallery_destination_wedding.webp",
  "/corporate.webp"
];

export default function Hero() {
  const t = useTranslations("hero");
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = t.raw("stats") as string[];

  return (
    <div
      id="home"
      className="relative min-h-screen w-full flex overflow-hidden bg-white"
    >
      {/* SEO H1 */}
      <h1 className="sr-only">{t("h1En")}</h1>

      {/* ── LEFT — Content ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-8 md:px-14 xl:px-20 pt-28 pb-24">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-[var(--primary)]" />
          <span className="text-[11px] font-bold text-[var(--primary)] tracking-[0.18em] uppercase">
            {t("label")}
          </span>
        </motion.div>

        {/* Headline — mixed weight editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
          aria-hidden="true"
        >
          <p
            className="leading-[1.05] text-[2.6rem] md:text-[3.25rem] lg:text-[3.5rem] font-light text-neutral-400"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("title")}
          </p>
          <p
            className="leading-[1.05] text-[2.6rem] md:text-[3.25rem] lg:text-[3.5rem] font-black text-neutral-900"
            style={{ letterSpacing: "-0.04em" }}
          >
            {t("titleHighlight")}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15px] text-neutral-500 leading-relaxed max-w-md mb-12"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-14"
        >
          <Link
            href="https://wa.me/966501234567"
            target="_blank"
            className="inline-flex items-center gap-2.5 bg-[var(--primary)] text-white px-7 py-3.5 rounded-full font-semibold text-[14px] transition-all duration-200 hover:bg-[var(--primary-dark)] group"
            style={{ boxShadow: "0 4px 20px rgba(13,107,78,0.22), inset 0 1px 0 rgba(255,255,255,0.12)" }}
          >
            {t("requestQuote")}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors group"
          >
            <span className="border-b border-neutral-300 group-hover:border-neutral-700 pb-px transition-colors">
              {t("viewPortfolio")}
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform opacity-60 group-hover:opacity-100" />
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-wrap items-center gap-6 pt-8 border-t border-neutral-100"
        >
          {/* Avatar initials stack */}
          <div className="flex -space-x-2.5 shrink-0">
            {["A", "M", "F", "K"].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-[10px] font-bold text-[var(--primary)] shadow-sm"
              >
                {letter}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-[12px] font-semibold text-neutral-700 ml-1.5">4.9</span>
            </div>
            <p className="text-[12px] text-neutral-400">
              {stats[0]} &middot; {stats[1]}
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-8 md:left-14 xl:left-20 flex items-center gap-3"
        >
          <motion.span
            animate={{ scaleX: [0.6, 1.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="block h-px w-8 bg-neutral-300 origin-left"
          />
          <span className="text-[10px] text-neutral-400 font-medium tracking-[0.2em] uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* ── RIGHT — Full-bleed image panel (desktop only) ── */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[52%]">

        {/* White gradient fade on left edge — blends into content */}
        <div
          className="absolute inset-y-0 left-0 w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white 0%, rgba(255,255,255,0.65) 45%, transparent 100%)" }}
        />

        {/* Slideshow */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slideshowImages[currentIdx]}
              alt="Event Management Company in Saudi Arabia"
              fill
              className="object-cover"
              sizes="52vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom vignette for card/indicator legibility */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none" />

        {/* Floating stats card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 left-12 z-20 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-0 divide-x divide-neutral-200">
            {[
              { num: "250+", label: "Elite Events" },
              { num: "10+",  label: "Years" },
              { num: "4.9★", label: "Rating" },
            ].map((s, i) => (
              <div key={i} className="px-5 first:pl-0 last:pr-0 text-center">
                <p className="text-[22px] font-black text-neutral-900 leading-none mb-0.5" style={{ letterSpacing: "-0.03em" }}>
                  {s.num}
                </p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 right-8 flex gap-1.5 z-20">
          {slideshowImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                i === currentIdx ? "w-7 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Vertical editorial text */}
        <div className="absolute top-1/2 right-5 -translate-y-1/2 z-20">
          <span
            className="text-white/25 text-[9px] font-bold tracking-[0.4em] uppercase select-none"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Est. 2010
          </span>
        </div>
      </div>
    </div>
  );
}
