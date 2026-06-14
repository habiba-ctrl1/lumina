"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface TrustElement {
  value: string;
  label: string;
}

export interface InternalPageHeroProps {
  title: string;
  titleHighlight?: string;          // text after the main title, rendered in brand green
  subtitle?: string;
  backgroundImage: string;
  backgroundVideo?: string;         // optional video src — backgroundImage used as poster
  imageAlt?: string;
  badge?: string;
  breadcrumbs?: Breadcrumb[];
  enableParallax?: boolean;
  disableZoom?: boolean;
  minHeight?: "compact" | "standard" | "large";
  align?: "center" | "start";
  trustElements?: TrustElement[];
}

const HEIGHT: Record<string, string> = {
  compact:  "min-h-[55vh]",
  standard: "min-h-[65vh]",
  large:    "min-h-[75vh]",
};

export default function InternalPageHero({
  title,
  titleHighlight,
  subtitle,
  backgroundImage,
  backgroundVideo,
  imageAlt = "Saudi Event Management luxury event",
  badge,
  breadcrumbs,
  enableParallax = false,
  disableZoom = false,
  minHeight = "standard",
  align = "center",
  trustElements,
}: InternalPageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  // Performance-safe parallax: only active on desktop pointers and when the
  // user has NOT requested reduced motion. Defaults off (SSR-safe) so mobile
  // never pays the scroll-listener / layout cost and there is no hydration shift.
  const [parallaxOn, setParallaxOn] = useState(false);
  useEffect(() => {
    if (!enableParallax) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setParallaxOn(desktop.matches && !reduce.matches);
    update();
    desktop.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, [enableParallax]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // parallax: image moves up at ~40% scroll speed (desktop only)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -130]);

  const centered = align === "center";

  return (
    <div
      ref={heroRef}
      className={`relative ${HEIGHT[minHeight]} flex flex-col overflow-hidden`}
    >
      {/* ── Background (parallax outer) ── */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 z-0"
        style={
          parallaxOn
            ? { top: -120, bottom: -120, y: bgY }
            : { top: 0, bottom: 0 }
        }
      >
        {backgroundVideo ? (
          /* Video background — image used as poster while video loads */
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage}
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          /* Static image with optional zoom-in animation */
          <motion.div
            className="w-full h-full"
            initial={{ scale: disableZoom ? 1 : 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: disableZoom ? 0 : 7, ease: "easeOut" }}
          >
            <Image
              src={backgroundImage}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        )}
      </motion.div>

      {/* ── Dark overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.58) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        className={`
          relative z-10 flex-1 flex flex-col justify-center
          ${centered ? "items-center text-center" : "items-start text-start"}
          max-w-[800px] w-full mx-auto px-6
          pt-36 pb-14 md:pt-44 md:pb-16
        `}
      >
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-[12px] font-medium text-white/55 mb-5 ${centered ? "justify-center" : ""}`}
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/25 select-none">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white/85 transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className={`mb-5 ${centered ? "flex justify-center" : ""}`}
          >
            <span
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[10.5px] font-bold tracking-[0.15em] uppercase text-white/85 border border-white/20 backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <span className="w-5 h-px rounded-full bg-[#E5A100] opacity-90" />
              {badge}
              <span className="w-5 h-px rounded-full bg-[#E5A100] opacity-90" />
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] mb-5"
          style={{
            letterSpacing: "-0.03em",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
        >
          {title}
          {titleHighlight && (
            <>
              {" "}
              <span style={{ color: "#0E7A66" }}>{titleHighlight}</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[rgba(255,255,255,0.88)] text-[15.5px] md:text-[17px] leading-relaxed max-w-[680px]"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.18)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* ── Trust strip ── */}
      {trustElements && trustElements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="relative z-10 w-full border-t border-white/10"
          style={{
            background: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-12 gap-y-3">
            {trustElements.map((el) => (
              <div key={el.label} className="text-center">
                <p
                  className="text-white text-[1.25rem] font-black leading-tight"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {el.value}
                </p>
                <p className="text-white/55 text-[10.5px] font-semibold uppercase tracking-[0.1em] mt-0.5">
                  {el.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
