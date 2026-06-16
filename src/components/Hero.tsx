"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

// ── Input micro-interaction helpers ─────────────────────────────────────────
const focusStyle  = { border: "1px solid rgba(245,158,11,0.55)", background: "rgba(255,255,255,0.10)" };
const blurStyle   = { border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.06)" };
const inputBase   = "w-full px-4 py-3 rounded-xl text-[13px] text-white placeholder-white/35 outline-none transition-all duration-200";

// ── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const t      = useTranslations("hero");
  const params = useParams();
  const isRtl  = (params?.locale as string) === "ar";

  const [form, setForm]     = useState({ name: "", email: "", eventType: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Scroll parallax — video moves at ~20% of scroll speed
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      form.name,
          email:     form.email,
          phone:     "To be confirmed",
          eventType: form.eventType,
          budget:    "To be discussed",
          message:   "Quick quote request submitted via hero section.",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const stats        = t.raw("stats") as string[];
  const eventTypes   = t.raw("formEventTypes") as string[];
  const contentAlign = isRtl ? "items-end text-right" : "items-start text-left";
  const rowReverse   = isRtl ? "flex-row-reverse" : "";

  return (
    <div ref={heroRef} id="home" className="relative min-h-screen w-full flex overflow-hidden">
      {/* ── SEO H1 ── */}
      <h1 className="sr-only">{t("h1En")}</h1>

      {/* ══════════════════════════════════════════════════════════════════════
          BACKGROUND — Parallax video
          Video layer moves at ~20% scroll speed. Extended 160px top+bottom
          so parallax movement never shows a gap at edges.
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 z-0 overflow-hidden"
        style={{ top: -160, bottom: -160, y: bgY }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero_bg.webp"
          className="pointer-events-none"
          style={{ 
            width: "100vw", 
            height: "56.25vw", 
            minHeight: "100%", 
            minWidth: "177.77vh", 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        >
          <source src="/hero-video1.mp4" type="video/mp4" />
          <source src="https://tawnmqiqbtbdiimvjrez.supabase.co/storage/v1/object/public/Videos/hero-video1.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════
          OVERLAY STACK — lighter to let the video breathe,
          fading to white at the bottom to merge with the light-theme site.
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Side gradient — text-side darker for legibility, video-side nearly open */}
        <div
          className="absolute inset-0"
          style={{
            background: isRtl
              ? "linear-gradient(250deg, rgba(2,8,14,0.68) 0%, rgba(4,8,16,0.25) 50%, rgba(6,10,18,0.00) 100%)"
              : "linear-gradient(115deg, rgba(2,8,14,0.68) 0%, rgba(4,8,16,0.25) 50%, rgba(6,10,18,0.00) 100%)",
          }}
        />
        {/* Top vignette — nav legibility */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/25 to-transparent" />
        {/* Bottom fade-to-white — blends seamlessly into the light site below */}
        <div
          className="absolute bottom-0 inset-x-0 h-64"
          style={{
            background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.65) 35%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT GRID — Left text + Right form
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className={`relative z-20 w-full flex flex-col lg:flex-row ${rowReverse} items-center
                    min-h-screen px-6 md:px-12 xl:px-20 pt-28 pb-32 gap-10 lg:gap-14`}
      >
        {/* ── LEFT / MAIN — Text content ──────────────────────────────────── */}
        <div className={`flex-1 flex flex-col justify-center ${contentAlign} min-w-0`}>

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-3 mb-8 ${rowReverse}`}
          >
            <span className="h-px w-7 bg-amber-400 shrink-0" />
            <span className="text-[10px] font-bold text-amber-400 tracking-[0.22em] uppercase">
              {t("label")}
            </span>
          </motion.div>

          {/* Headline — mixed weight editorial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
            aria-hidden="true"
          >
            <p
              className="leading-[1.05] text-[2.3rem] md:text-[3.1rem] lg:text-[3.6rem] font-light text-white/70"
              style={{ letterSpacing: "-0.025em" }}
            >
              {t("title")}
            </p>
            <p
              className="leading-[1.05] text-[2.3rem] md:text-[3.1rem] lg:text-[3.6rem] font-black text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              {t("titleHighlight")}
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14px] md:text-[15px] text-white/60 leading-relaxed max-w-[460px] mb-10"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA cluster — Free Consultation + WhatsApp + Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className={`flex flex-wrap items-center gap-3 ${rowReverse} mb-12`}
          >
            {/* Primary — Free Consultation */}
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13px] font-bold text-ink-950 transition-transform duration-200 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                boxShadow: "0 4px 22px rgba(245,158,11,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
                letterSpacing: "0.02em",
              }}
            >
              {isRtl ? "استشارة مجانية" : "Free Consultation"}
              <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
            </Link>

            {/* Secondary — WhatsApp */}
            <a
              href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20discuss%20my%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "rgba(37,211,102,0.16)", border: "1px solid rgba(37,211,102,0.55)" }}
              aria-label={isRtl ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
            >
              <MessageCircle size={15} className="text-[#25D366]" fill="#25D366" />
              {isRtl ? "واتساب" : "WhatsApp Us"}
            </a>

            {/* Tertiary — Portfolio */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/65 hover:text-white transition-colors group ms-1"
            >
              <span className="border-b border-white/25 group-hover:border-white pb-px transition-colors">
                {t("viewPortfolio")}
              </span>
              <ArrowRight
                size={13}
                className={`transition-transform opacity-50 group-hover:opacity-100 ${
                  isRtl ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
                }`}
              />
            </Link>
          </motion.div>

          {/* Social proof / trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className={`flex flex-wrap items-center gap-5 pt-7 border-t border-white/10 ${rowReverse}`}
          >
            {/* Avatar initials stack */}
            <div className={`flex -space-x-2.5 shrink-0 ${isRtl ? "flex-row-reverse" : ""}`}>
              {["A", "M", "F", "K"].map((letter, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white/15 bg-white/10 flex items-center
                             justify-center text-[10px] font-bold text-white/80 backdrop-blur-sm"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className={`flex items-center gap-1 mb-0.5 ${rowReverse}`}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#F59E0B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-[11px] font-semibold text-white/75 ml-1.5">4.9</span>
              </div>
              <p className="text-[11px] text-white/40">
                {stats[0]} &middot; {stats[1]}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT — Glassmorphism quick-quote form ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[380px] xl:w-[420px] shrink-0"
        >
          {/* Form card */}
          <div
            className="rounded-2xl p-7 md:p-8"
            style={{
              background:           "rgba(7, 9, 17, 0.75)",
              backdropFilter:       "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border:               "1px solid rgba(255,255,255,0.09)",
              boxShadow:            "0 28px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* ── Success state ── */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle className="text-amber-400 w-14 h-14" strokeWidth={1.5} />
                </motion.div>
                <p className="text-white font-semibold text-[1.15rem]">{t("formSuccess")}</p>
                <p className="text-white/50 text-[13px] leading-relaxed max-w-[260px]">
                  {t("formSuccessMsg")}
                </p>
              </motion.div>
            ) : (
              <>
                {/* Form header */}
                <div className={`mb-6 ${isRtl ? "text-right" : "text-left"}`}>
                  <p className="text-[10px] font-bold text-amber-400 tracking-[0.22em] uppercase mb-2">
                    {t("formLabel")}
                  </p>
                  <h3 className="text-white font-semibold text-[1.2rem] leading-tight">
                    {t("formTitle")}
                  </h3>
                  <p className="text-white/40 text-[12px] mt-1.5">{t("formResponseTime")}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  {/* Name */}
                  <input
                    type="text"
                    placeholder={t("formName")}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                    dir={isRtl ? "rtl" : "ltr"}
                    className={inputBase}
                    style={blurStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                  />

                  {/* Email */}
                  <input
                    type="email"
                    placeholder={t("formEmail")}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    required
                    dir="ltr"
                    className={inputBase}
                    style={blurStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e)  => Object.assign(e.target.style, blurStyle)}
                  />

                  {/* Event Type — custom select */}
                  <div className="relative">
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((p) => ({ ...p, eventType: e.target.value }))}
                      required
                      dir={isRtl ? "rtl" : "ltr"}
                      className={`${inputBase} appearance-none cursor-pointer`}
                      style={{
                        ...blurStyle,
                        color: form.eventType ? "white" : "rgba(255,255,255,0.35)",
                      }}
                      onFocus={(e) => Object.assign(e.target.style, { ...focusStyle, color: "white" })}
                      onBlur={(e)  => Object.assign(e.target.style, { ...blurStyle,  color: form.eventType ? "white" : "rgba(255,255,255,0.35)" })}
                    >
                      <option value="" disabled style={{ background: "#0c0e1a", color: "#888" }}>
                        {t("formEventTypePlaceholder")}
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} style={{ background: "#0c0e1a", color: "white" }}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {/* Chevron icon */}
                    <svg
                      className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-white/35 ${
                        isRtl ? "left-3.5" : "right-3.5"
                      }`}
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {/* Submit CTA */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileTap={{ scale: 0.98 }}
                    className="mt-1 w-full py-3.5 rounded-xl font-bold text-[13px] text-white
                               transition-opacity duration-200 disabled:opacity-60"
                    style={{
                      background:    "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                      boxShadow:     "0 4px 22px rgba(245,158,11,0.30), inset 0 1px 0 rgba(255,255,255,0.14)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {status === "loading" ? t("formSubmitting") : t("formSubmit") + " →"}
                  </motion.button>

                  {status === "error" && (
                    <p className="text-center text-[12px] text-red-400">{t("formError")}</p>
                  )}

                  <p className={`text-[10px] text-white/22 mt-0.5 ${isRtl ? "text-right" : "text-center"}`}>
                    {t("formDisclaimer")}
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Stats pill — desktop only, sits beneath the form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="hidden lg:flex items-center justify-around mt-4 px-5 py-3.5 rounded-xl"
            style={{
              background:           "rgba(255,255,255,0.05)",
              border:               "1px solid rgba(255,255,255,0.08)",
              backdropFilter:       "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {[
              { num: "250+", label: isRtl ? "فعالية منفذة" : "Events Delivered" },
              { num: "15+",  label: isRtl ? "سنة خبرة"     : "Years"        },
              { num: "4.9★", label: isRtl ? "تقييم"         : "Rating"       },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[17px] font-black text-white leading-none mb-0.5" style={{ letterSpacing: "-0.03em" }}>
                  {s.num}
                </p>
                <p className="text-[9px] text-white/38 uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll cue — bottom right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-10 right-8 z-30 hidden lg:flex items-center gap-2.5"
      >
        <motion.span
          animate={{ scaleX: [0.5, 1.3, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          className="block h-px w-7 bg-white/28 origin-left"
        />
        <span className="text-[9px] text-white/32 font-medium tracking-[0.24em] uppercase select-none">
          Scroll
        </span>
      </motion.div>

      {/* ── Vertical editorial text — far right ── */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 z-30 hidden xl:block pointer-events-none">
        <span
          className="text-white/14 text-[8px] font-bold tracking-[0.48em] uppercase select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2010
        </span>
      </div>
    </div>
  );
}
