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

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export default function Hero() {
  const t = useTranslations("hero");
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-screen w-full flex items-center bg-[var(--background)] overflow-hidden"
    >
      {/* ── Background — subtle grain texture ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Background Image — very subtle ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slideshowImages[currentIdx]}
              alt="Background"
              fill
              className="object-cover grayscale"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/95 to-[var(--background)]/80" />
      </div>

      {/* ── H1 — SEO ── */}
      <h1 className="sr-only">
        {t("h1En")}
      </h1>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50/60 border border-emerald-100/60"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[13px] font-medium text-[var(--primary)]">
                {t("label")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
              aria-hidden="true"
            >
              <h2 className="text-neutral-900 leading-[1.1] text-4xl md:text-5xl lg:text-[3.5rem]" style={{ letterSpacing: "-0.035em", fontWeight: 700 }}>
                {t("title")}
                <br />
                <span className="text-[var(--primary)]">
                  {t("titleHighlight")}
                </span>
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] text-neutral-500 mb-10 max-w-lg leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="https://wa.me/966501234567"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-7 py-3.5 rounded-xl font-medium text-[15px] transition-all duration-200 hover:bg-[var(--primary-dark)] group"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px rgba(13, 107, 78, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {t("requestQuote")}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-white text-neutral-700 px-7 py-3.5 rounded-xl font-medium text-[15px] border border-neutral-200 transition-all duration-200 hover:border-neutral-300 hover:bg-neutral-50"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {t("viewPortfolio")}
              </Link>
            </motion.div>

            {/* Stats / Trust */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-neutral-200/60"
            >
              {t.raw("stats").map((label: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[var(--primary)] opacity-40" />
                  <span className="text-[13px] font-medium text-neutral-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] lg:h-[580px] w-full hidden md:block"
          >
            {/* Main Image */}
            <div className="absolute top-0 end-0 w-[85%] h-[80%] rounded-2xl overflow-hidden bg-neutral-100"
              style={{
                boxShadow: "0 24px 48px -12px rgba(0,0,0,0.12), 0 8px 16px -4px rgba(0,0,0,0.04)",
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slideshowImages[currentIdx]}
                    alt="Event Management Company in Saudi Arabia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Secondary Image */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-0 start-0 w-[55%] h-[55%] rounded-2xl overflow-hidden bg-neutral-100 border-[6px] border-[var(--background)]"
              style={{
                boxShadow: "0 16px 32px -8px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.04)",
              }}
            >
              <Image
                src="/gallery_corporate_gala.webp"
                alt="Corporate event planning Saudi Arabia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, ...spring }}
              className="absolute top-1/2 start-0 -translate-x-4 -translate-y-1/2 bg-white p-4 rounded-xl flex items-center gap-4"
              style={{
                boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08), 0 2px 6px -1px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
              }}
            >
              <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center">
                <span className="text-[var(--primary)] font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>10+</span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-900">{t("yearsOf")}</p>
                <p className="text-[12px] text-neutral-400">{t("excellence")}</p>
              </div>
            </motion.div>

            {/* Slide indicators */}
            <div className="absolute bottom-4 end-[15%] flex gap-1.5">
              {slideshowImages.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIdx ? "w-6 bg-[var(--primary)]" : "w-1.5 bg-neutral-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}