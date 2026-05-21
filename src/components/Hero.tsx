"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Hero slideshow images — luxury event photography
const heroImages = [
  { src: "/hero_bg.webp", alt: "Luxury event management in Saudi Arabia" },
  { src: "/gallery_corporate_gala.webp", alt: "Corporate gala dinner event in Riyadh" },
  { src: "/gallery_wedding_reception.webp", alt: "Grand wedding reception in Saudi Arabia" },
  { src: "/gallery_charity_gala.webp", alt: "Charity gala event organized by Saudi Event Management" },
  { src: "/corporate.webp", alt: "Corporate event planning Saudi Arabia" },
];

export default function Hero({ dict }: { dict?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Auto-sliding image carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-ink-950"
    >
      {/* Full-Screen Slideshow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays — dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/40" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-ink-950" aria-hidden="true" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28 md:pt-32 pb-16"
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-8"
        >
          <span className="section-label tracking-[0.5em] !text-gold-400">{dict ? dict.label : "Saudi Event Management"}</span>
          <span className="block w-8 h-px bg-gold-400/40 mx-auto mt-2" />
        </motion.div>

        {/* ── TASK 1: H1 — SEO KEYWORD ───────────────────── */}
        <h1 className="sr-only">
          {dict && dict.label === "إدارة الفعاليات السعودية" 
            ? "شركة تنظيم فعاليات في السعودية | تنظيم مؤتمرات الرياض" 
            : "Event Management Company in Saudi Arabia | Saudi Event Management"}
        </h1>

        {/* Visual headline — shown on screen, not an H1 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display font-bold text-white uppercase tracking-wider leading-[1.2] mb-5 max-w-5xl mx-auto whitespace-normal"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3.8rem)" }}
          aria-hidden="true"
        >
          {dict && dict.label === "إدارة الفعاليات السعودية" ? "شركة تنظيم فعاليات في " : "Event Management Company in "}{" "}
          <span className="text-gold-400">
            {dict && dict.label === "إدارة الفعاليات السعودية" ? "السعودية" : "Saudi Arabia"}
          </span>
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-sm text-sand-100 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          {dict ? dict.subtitle : "Saudi Event Management is a leading event management company in Saudi Arabia offering corporate events, exhibitions, luxury weddings and premium brand experiences across Riyadh, Jeddah, Makkah, Madinah, and AlUla."}
        </motion.p>

        {/* Quick Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-sm p-4 md:p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  "https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services.",
                  "_blank"
                );
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end"
            >
              <div className="flex flex-col text-left gap-1.5">
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/70 ml-0.5">{dict ? dict.eventType : "Event Type"}</label>
                <div className="relative">
                  <select className="w-full bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-sm px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-white/30 appearance-none cursor-pointer transition-all hover:bg-black/60">
                    {(dict ? dict.types : ["Luxury Wedding", "Corporate Gala", "VIP Reception", "Private Concert"]).map((t: string) => (
                      <option key={t} className="bg-ink-900">{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute rtl:left-3 ltr:right-3 right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col text-left gap-1.5">
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/70 ml-0.5">{dict ? dict.location : "Location"}</label>
                <div className="relative">
                  <select className="w-full bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-sm px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-white/30 appearance-none cursor-pointer transition-all hover:bg-black/60">
                    {(dict ? dict.locations : ["Riyadh", "Jeddah", "Makkah", "AlUla"]).map((l: string) => (
                      <option key={l} className="bg-ink-900">{l}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute rtl:left-3 ltr:right-3 right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col text-left gap-1.5">
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/70 ml-0.5">{dict ? dict.date : "Preferred Date"}</label>
                <input
                  type="date"
                  className="w-full bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-sm px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-white/30 [color-scheme:dark] transition-all hover:bg-black/60"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-ink-950 text-[10px] font-bold uppercase tracking-[0.2em] py-2.5 rounded-sm hover:scale-105 transition-all duration-300 shadow-sm"
              >
                {dict ? dict.inquiry : "Inquiry"}
              </button>
            </form>

            <div className="mt-4 flex justify-center">
              <Link
                href="/#contact"
                className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm transition-all duration-300 backdrop-blur-sm"
              >
                {dict ? dict.download : "Download Portfolio"}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-10 md:gap-12"
        >
          {(dict ? dict.stats : ["250+ Elite Events", "100% Retention", "Saudi Business Awards 2025"]).map((label: string, i: number) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-gold-400 text-[9px] font-medium uppercase tracking-[0.22em] text-center">{label}</span>
              <span className="w-4 h-px bg-gold-400/25" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">{dict ? dict.scroll : "Scroll"}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>
    </div>
  );
}