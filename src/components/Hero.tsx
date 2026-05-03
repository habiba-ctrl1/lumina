"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
            alt="Luxury Event"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-charcoal-900/55 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-charcoal-900/30 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/40 via-transparent to-charcoal-900/40 z-[1]" />

      {/* Gold Particles */}
      <GoldParticles />

      {/* Image Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-[3px] rounded-full transition-all duration-500 ${
              i === currentImage ? "h-10 bg-gold-500" : "h-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-gold-500 text-xs uppercase tracking-[0.4em] font-medium">
            <span className="w-12 h-px bg-gold-500/50" />
            Luxury Event Management
            <span className="w-12 h-px bg-gold-500/50" />
          </span>
        </motion.div>

        {/* Main Title with Character Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-white tracking-tight mb-6 leading-[1.1]"
        >
          Royal Events{" "}
          <span className="text-shimmer font-semibold italic">Redefined</span>
          <br />
          Across KSA & PK
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.9 }}
          className="text-lg md:text-xl text-gray-300/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Exquisite luxury weddings, grand royal ballrooms, and elite private
          celebrations — bringing world-class elegance to Riyadh, Jeddah, and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="#services"
            className="group relative px-10 py-4 bg-gold-500 text-charcoal-900 font-semibold uppercase tracking-wider text-sm btn-glow w-full sm:w-auto text-center overflow-hidden"
          >
            <span className="relative z-10">Explore Services</span>
          </a>
          <a
            href="#contact"
            className="group px-10 py-4 border border-white/20 hover:border-gold-500/60 text-white font-semibold uppercase tracking-wider text-sm transition-all duration-500 w-full sm:w-auto text-center hover:bg-white/5 backdrop-blur-sm"
          >
            Book Consultation
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-3">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-gold-500/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
