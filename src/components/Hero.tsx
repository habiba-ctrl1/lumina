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





// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
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
      className="relative min-h-screen lg:h-screen w-full flex items-center justify-center bg-white pt-32 md:pt-48 pb-12"
    >


      {/* Image Slideshow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
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
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays — restored navy blue theme for consistency */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(4, 30, 66, 0.65)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#041E42]/70 via-transparent to-[#041E42]/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#041E42]/40 via-transparent to-[#041E42]/40"
        aria-hidden="true"
      />
      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-12 md:mt-16"
      >
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-8"
        >
          <span className="text-primary text-[10px] md:text-[11px] uppercase tracking-[0.6em] font-bold mb-3 block">
            Saudi Event Management
          </span>
          <div className="w-10 h-px bg-primary/30 mx-auto" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white font-bold uppercase tracking-tight leading-[1.1] mb-8"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.6rem)" }}
        >
          Masterpieces of <br />
          <span className="text-primary">Luxury</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base text-gray-300 max-w-xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Curating exquisite weddings, corporate galas, and private celebrations.
          We bring world-class elegance to <span className="text-white font-bold tracking-tight">Riyadh</span>, 
          <span className="text-white font-bold tracking-tight"> Jeddah</span>, <span className="text-white font-bold tracking-tight">Makkah</span>, 
          <span className="text-white font-bold tracking-tight"> Madinah</span>, and <span className="text-white font-bold tracking-tight">AlUla</span>.
        </motion.p>

        {/* Quick Booking Form — refined and concise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 p-1 md:p-1.5 max-w-2xl mx-auto mb-10 relative z-20"
        >
          <div className="bg-[#041E42]/40 backdrop-blur-md border border-white/5 rounded-[1.8rem] p-4 md:p-5">
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                window.open(`https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services.`, '_blank'); 
              }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end"
            >
              <div className="flex flex-col text-left">
                <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2 ml-1">Event Type</label>
                <div className="relative">
                  <select className="w-full bg-white/[0.05] border border-white/10 text-white rounded-lg px-3 py-2 text-[10px] font-semibold tracking-wide focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:bg-white/[0.08] transition-all">
                    <option className="bg-charcoal-900">Luxury Wedding</option>
                    <option className="bg-charcoal-900">Corporate Gala</option>
                    <option className="bg-charcoal-900">VIP Reception</option>
                    <option className="bg-charcoal-900">Private Concert</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col text-left">
                <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2 ml-1">Location</label>
                <div className="relative">
                  <select className="w-full bg-white/[0.05] border border-white/10 text-white rounded-lg px-3 py-2 text-[10px] font-semibold tracking-wide focus:outline-none focus:border-primary/50 appearance-none cursor-pointer hover:bg-white/[0.08] transition-all">
                    <option className="bg-charcoal-900">Riyadh</option>
                    <option className="bg-charcoal-900">Jeddah</option>
                    <option className="bg-charcoal-900">Makkah</option>
                    <option className="bg-charcoal-900">AlUla</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col text-left">
                <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2 ml-1">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full bg-white/[0.05] border border-white/10 text-white rounded-lg px-3 py-2 text-[10px] font-semibold tracking-wide focus:outline-none focus:border-primary/50 [color-scheme:dark] hover:bg-white/[0.08] transition-all" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2.5 rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Inquiry
              </button>
            </form>
            
            <div className="mt-8 flex justify-center">
              <Link 
                href="/#contact"
                className="text-[9px] text-white/30 hover:text-primary uppercase tracking-[0.4em] font-bold flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-px bg-white/10 group-hover:bg-primary transition-all" />
                Download Portfolio
                <div className="w-10 h-px bg-white/10 group-hover:bg-primary transition-all" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6"
        >
          {[
            { label: "100+ EVENTS" },
            { label: "100% SATISFACTION" },
            { label: "AWARD-WINNING" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-primary text-[9px] font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </span>
              <div className="w-6 h-px bg-primary/20 mt-1" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-gray-300" />
        </motion.div>
      </motion.div>
    </div>
  );
}
