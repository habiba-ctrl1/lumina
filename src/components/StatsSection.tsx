"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const el = numRef.current;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        el.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={containerRef} className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ letterSpacing: "-0.03em" }}>
      <span ref={numRef} className="tabular-nums">0</span>
      <span className="text-emerald-300 font-medium">{suffix}</span>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");
  const stats = t.raw("items");
  return (
    <SectionWrapper className="bg-[var(--primary-dark)] relative overflow-hidden text-white py-24">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl md:text-4xl mb-5 font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-emerald-100/80 text-[16px] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:border-r md:border-white/10 md:last:border-r-0 px-4"
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
              <div className="text-[13px] text-emerald-100/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
