"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const backgroundImages = [
  "/gallery_wedding_reception.webp",
  "/gallery_corporate_gala.webp",
  "/gallery_destination_wedding.webp",
  "/gallery_charity_gala.webp",
  "/gallery_vip_party.webp",
  "/gallery_garden_party.webp",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-ink-950"
    >
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt={`Luxury Event Scene ${currentImageIndex + 1}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays — dark charcoal (not navy blue) */}
      <div className="absolute inset-0 z-[1] bg-ink-950/60"                                                  aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/30" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink-950/30 via-transparent to-ink-950/30" aria-hidden="true" />

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
          <span className="section-label tracking-[0.5em]">Saudi Event Management</span>
          <span className="block w-8 h-px bg-gold-400/40 mx-auto mt-2" />
        </motion.div>

        {/* Main heading — max text-4xl (36px) per design rules */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display font-medium text-sand-50 uppercase tracking-wide leading-[1.2] mb-5"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)" }}
        >
          Masterpieces of{" "}
          <span className="text-shimmer italic">Luxury</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-sm text-sand-300 max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Curating exquisite weddings, corporate galas, and private celebrations
          across{" "}
          <span className="text-sand-100 font-medium">Riyadh</span>,{" "}
          <span className="text-sand-100 font-medium">Jeddah</span>,{" "}
          <span className="text-sand-100 font-medium">Makkah</span>,{" "}
          <span className="text-sand-100 font-medium">Madinah</span>, and{" "}
          <span className="text-sand-100 font-medium">AlUla</span>.
        </motion.p>

        {/* Quick Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-ink-950/50 backdrop-blur-xl border border-ink-600/60 rounded-lg p-4 md:p-5">
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
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-sand-400 ml-0.5">Event Type</label>
                <div className="relative">
                  <select className="w-full bg-ink-800/80 border border-ink-500 text-sand-200 rounded-md px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-gold-400/50 appearance-none cursor-pointer hover:border-ink-400 transition-colors">
                    <option className="bg-ink-900">Luxury Wedding</option>
                    <option className="bg-ink-900">Corporate Gala</option>
                    <option className="bg-ink-900">VIP Reception</option>
                    <option className="bg-ink-900">Private Concert</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col text-left gap-1.5">
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-sand-400 ml-0.5">Location</label>
                <div className="relative">
                  <select className="w-full bg-ink-800/80 border border-ink-500 text-sand-200 rounded-md px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-gold-400/50 appearance-none cursor-pointer hover:border-ink-400 transition-colors">
                    <option className="bg-ink-900">Riyadh</option>
                    <option className="bg-ink-900">Jeddah</option>
                    <option className="bg-ink-900">Makkah</option>
                    <option className="bg-ink-900">AlUla</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col text-left gap-1.5">
                <label className="text-[9px] font-medium uppercase tracking-[0.25em] text-sand-400 ml-0.5">Preferred Date</label>
                <input
                  type="date"
                  className="w-full bg-ink-800/80 border border-ink-500 text-sand-200 rounded-md px-3 py-2.5 text-[11px] font-medium focus:outline-none focus:border-gold-400/50 [color-scheme:dark] hover:border-ink-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-400 text-ink-950 text-[10px] font-medium uppercase tracking-[0.2em] py-2.5 rounded-md hover:bg-gold-500 transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              >
                Inquiry
              </button>
            </form>

            <div className="mt-4 flex justify-center">
              <Link
                href="/#contact"
                className="text-[9px] text-sand-500 hover:text-gold-400 uppercase tracking-[0.3em] font-medium flex items-center gap-3 transition-colors group"
              >
                <span className="w-6 h-px bg-ink-500 group-hover:bg-gold-400/40 transition-colors" />
                Download Portfolio
                <span className="w-6 h-px bg-ink-500 group-hover:bg-gold-400/40 transition-colors" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {["250+ Elite Events", "100% Retention", "Saudi Business Awards 2025"].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-gold-400 text-[9px] font-medium uppercase tracking-[0.22em]">{label}</span>
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
        <span className="text-[8px] uppercase tracking-[0.3em] text-sand-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-sand-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}