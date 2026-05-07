"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <GoldParticles />

      {/* Video Background */}
      {/* CHANGE 4: aria-hidden="true" on the video wrapper — the video is
          decorative background footage, not content. Screen readers should
          skip it entirely. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          // CHANGE 5: poster gives the video a fallback image frame while
          // it loads. Without this, the background flashes black on slow
          // connections before the video starts. Replace the src with your
          // own hosted poster image for production.
          poster="/images/hero-poster.jpg"
          className="w-full h-full object-cover scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-wedding-reception-with-elegant-decor-and-flowers-43362-large.mp4"
            type="video/mp4"
          />
        </video>
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
        className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 md:pt-36"
      >
        {/* Top Tagline with Lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-6"
          aria-hidden="true"
        >
          <div className="w-8 md:w-16 h-px bg-champagne-500/40" />
          <span className="text-champagne-300 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-medium whitespace-nowrap">
            Luxury Event Management
          </span>
          <div className="w-8 md:w-16 h-px bg-champagne-500/40" />
        </motion.div>

        {/* Main Title — word-by-word animation */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 },
            },
          }}
          className="font-display text-white tracking-tight uppercase mb-6 leading-[1.1] flex flex-wrap justify-center gap-x-4 md:gap-x-6"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
        >
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 },
                },
              }}
              className={
                word === "Luxury" ? "text-champagne-500 italic font-medium" : ""
              }
            >
              {word}
            </motion.span>
          ))}
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
          We bring world-class elegance to{" "}
          <span className="text-champagne-500">Riyadh</span>,{" "}
          <span className="text-champagne-500">Jeddah</span>,{" "}
          <span className="text-champagne-500">Dubai</span>, and beyond.
        </motion.p>

        {/* CTA Buttons */}
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
          {/* CHANGE 6: href was "/#contact" which causes a full-page
              navigation in Next.js App Router. Changed to "/consultation"
              to match your existing consultation page route. If you want
              to scroll to a contact section on the homepage, use:
              href="/#contact" AND make sure that section has id="contact". */}
          <Link
            href="/consultation"
            className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-500"
          >
            Book Consultation
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {/* CHANGE 7: aria-hidden="true" — the bouncing chevron is a visual
          hint only. It carries no information for screen reader users. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        aria-hidden="true"
      >
        <span className="text-gray-400 text-[9px] uppercase tracking-[0.4em] mb-2">
          Discover
        </span>
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