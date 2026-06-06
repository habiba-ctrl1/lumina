"use client";

import { Crown, Heart, Star, Gem, Award, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const iconMap = [Crown, Heart, Star, Gem, Award, Sparkles];

export default function MarqueeStrip() {
  const t = useTranslations("marquee");
  const items = t.raw("items").map((text: string, i: number) => ({
    icon: iconMap[i],
    text
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-5 bg-[var(--surface-raised)] border-y border-[var(--border)] overflow-hidden bg-glow-top"
    >
      {/* Fade edges */}
      <div className="absolute start-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--surface-raised)] to-transparent z-10" />
      <div className="absolute end-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--surface-raised)] to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-8 mx-10 shrink-0">
            <item.icon size={14} className="text-[var(--primary)] opacity-50" />
            <span className="text-neutral-500 text-[12px] font-medium whitespace-nowrap" style={{ letterSpacing: "0.08em" }}>
              {item.text}
            </span>
            <span className="text-neutral-300 ms-6 text-[10px]">✦</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
