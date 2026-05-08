"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const backgroundImages = [
  "/gallery_wedding_reception.png",
  "/gallery_corporate_gala.png",
  "/gallery_destination_wedding.png",
  "/gallery_charity_gala.png",
  "/gallery_vip_party.png",
  "/gallery_garden_party.png",
];

const titleWords = ["Masterpieces", "of", "Luxury"];

// ─── Particle type ────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  width: number;
  height: number;
  left: string;
  top: string;
  opacityPeak: number;
  yEnd: number;
  xEnd: number;
  duration: number;
  delay: number;
}

// ─── Gold Particles ───────────────────────────────────────────────────────────
//
// CHANGE 1 (Critical — bug fix):
// Previously, Math.random() was called directly inside JSX during render.
// In Next.js (SSR), the server generates one set of random values and the
// client generates a completely different set, causing a React hydration
// mismatch error: "Prop did not match. Server: X Client: Y".
// Fix: generate all random values once inside useEffect (client-only),
// store them in state, and render nothing until they are ready.
//
function GoldParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      width: 1 + Math.random() * 3,
      height: 1 + Math.random() * 3,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacityPeak: 0.3 + Math.random() * 0.4,
      yEnd: -(120 + Math.random() * 180),
      xEnd: (Math.random() - 0.5) * 80,
      duration: 5 + Math.random() * 7,
      delay: Math.random() * 6,
    }));
    setParticles(generated);
  }, []);

  // CHANGE 2: aria-hidden="true" — these dots are purely decorative.
  // Screen readers should not announce them.
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-[1]"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
            // CHANGE 3: opacityPeak is now a stable value from state,
            // not a new random number on every render.
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacityPeak}), transparent)`,
          }}
          animate={{
            y: [0, p.yEnd],
            x: [0, p.xEnd],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

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
      className="relative min-h-[90vh] w-full flex items-center justify-center bg-white pt-20"
    >
      <GoldParticles />

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
            <img
              src={backgroundImages[currentImageIndex]}
              alt="Event Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlays — also decorative, so aria-hidden */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(0, 15, 50, 0.65)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#041E42] via-transparent to-[#041E42]/40 z-[1]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#041E42]/30 via-transparent to-[#041E42]/30 z-[1]"
        aria-hidden="true"
      />
      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-primary/30" />
          <span className="text-primary text-[11px] uppercase tracking-[0.4em] font-bold">
            Bespoke Event Management
          </span>
          <div className="w-12 h-px bg-primary/30" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white font-bold uppercase tracking-tight leading-[1.1] mb-8"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          Masterpieces of <br />
          <span className="text-primary">Luxury</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Curating exquisite weddings, corporate galas, and private celebrations.
          We bring world-class elegance to <span className="text-white font-bold">Riyadh</span>, 
          <span className="text-white font-bold"> Jeddah</span>, <span className="text-white font-bold">Makkah</span>, 
          <span className="text-white font-bold"> Madinah</span>, and <span className="text-white font-bold">AlUla</span>.
        </motion.p>

        {/* Quick Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/20 p-6 md:p-8 max-w-4xl mx-auto mb-8 relative z-20"
        >
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              window.open(`https://wa.me/966501234567?text=Hi%20Lumina!%20I%20am%20interested%20in%20your%20event%20management%20services.`, '_blank'); 
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Event Type</label>
              <select className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                <option>Luxury Wedding</option>
                <option>Corporate Gala</option>
                <option>VIP Reception</option>
                <option>Private Concert</option>
              </select>
            </div>
            
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Location</label>
              <select className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
                <option>Riyadh</option>
                <option>Jeddah</option>
                <option>Makkah</option>
                <option>Madinah</option>
                <option>AlUla</option>
                <option>Dammam</option>
              </select>
            </div>

            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">Date</label>
              <input type="date" className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            </div>

            <div className="flex items-end">
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-bold uppercase tracking-widest text-[11px] rounded-xl px-4 py-4 hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30"
              >
                Book via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8"
        >
          {[
            { label: "100+ EVENTS DELIVERED" },
            { label: "100% CLIENT SATISFACTION" },
            { label: "AWARD-WINNING TEAM" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </span>
              <div className="w-8 h-px bg-primary/20 mt-1" />
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