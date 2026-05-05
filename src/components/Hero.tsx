"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const heroImages = ["/hero_bg.png", "/wedding.png", "/corporate.png", "/private_party.png"];

/* Floating golden particles */
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 3,
            height: 1 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(212,175,55,${0.3 + Math.random() * 0.4}), transparent)`,
          }}
          animate={{
            y: [0, -120 - Math.random() * 180],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Ken Burns Background Slideshow */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "linear" } }}
        >
          <Image
            src={heroImages[currentImage]}
            alt={`Bespoke Luxury Event Management and Premium Planning - View ${currentImage + 1}`}
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]" style={{ backgroundColor: 'rgba(0, 15, 50, 0.65)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041E42] via-transparent to-[#041E42]/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041E42]/30 via-transparent to-[#041E42]/30 z-[1]" />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 md:pt-36">
        {/* Top Tagline with Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-8 md:w-16 h-px bg-champagne-500/40" />
          <span className="text-champagne-300 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-medium whitespace-nowrap">
            Luxury Event Management
          </span>
          <div className="w-8 md:w-16 h-px bg-champagne-500/40" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-display text-white tracking-tight uppercase mb-6 leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
        >
          Masterpieces of <span className="text-champagne-500 italic font-medium">Luxury</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide"
        >
          Curating exquisite weddings, corporate galas, and private celebrations.
          <br className="hidden md:block" />
          We bring world-class elegance to <span className="text-champagne-500">Riyadh</span>, <span className="text-champagne-500">Jeddah</span>, <span className="text-champagne-500">Dubai</span>, and beyond.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/services"
            className="w-full sm:w-auto px-10 py-4 bg-champagne-500 text-[#041E42] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-2xl"
          >
            Explore Services
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-500"
          >
            Book Consultation
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-gray-400 text-[9px] uppercase tracking-[0.4em] mb-2">Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-champagne-500/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
