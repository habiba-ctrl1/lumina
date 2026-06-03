"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="home"
      className="relative min-h-[90vh] w-full flex items-center bg-white overflow-hidden pt-24"
    >
      {/* ── Background Aesthetic ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
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
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      {/* ── TASK 1: H1 — SEO KEYWORD ───────────────────── */}
      <h1 className="sr-only">
        {t("h1En")}
      </h1>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[var(--primary)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                {t("label")}
              </span>
            </div>

            {/* Visual headline */}
            <div className="font-display font-bold text-slate-900 leading-[1.1] mb-6 text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight" aria-hidden="true">
              <div className="mb-2">
                {t("title")}
              </div>
              <div className="text-[var(--primary)] font-bold">
                {t("titleHighlight")}
              </div>
            </div>

            <p className="text-base md:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://wa.me/966501234567"
                target="_blank"
                className="bg-[var(--primary)] text-white px-8 py-3.5 rounded-md font-medium text-sm transition-all hover:bg-[var(--primary-dark)] hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-widest"
              >
                {t("requestQuote")}
              </Link>
              <Link
                href="/portfolio"
                className="bg-transparent border border-slate-300 text-slate-700 px-8 py-3.5 rounded-md font-medium text-sm transition-all hover:border-slate-400 hover:bg-slate-50 uppercase tracking-widest"
              >
                {t("viewPortfolio")}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-12">
              {t.raw("stats").map((label: string, i: number) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.22em]">{label}</span>
                  <span className="w-8 h-[2px] bg-[var(--primary)]/20" />
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Side: Image Grid Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[600px] w-full hidden md:block"
          >
            {/* Main Image Slideshow */}
            <div className="absolute top-0 end-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
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
            
            {/* Secondary Image Overlapping */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-0 start-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-slate-100"
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
              initial={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-1/2 start-0 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                <span className="text-[var(--primary)] font-bold text-xl">10+</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">{t("yearsOf")}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t("excellence")}</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}