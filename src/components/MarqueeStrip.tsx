"use client";

import { Crown, Heart, Star, Gem, Award, Sparkles } from "lucide-react";

import { useTranslations } from "next-intl";

const iconMap = [Crown, Heart, Star, Gem, Award, Sparkles];

export default function MarqueeStrip() {
  const t = useTranslations("marquee");
  const items = t.raw("items").map((text: string, i: number) => ({
    icon: iconMap[i],
    text
  }));

  return (
    <div className="relative py-8 bg-slate-50 border-y border-slate-200 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute start-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="absolute end-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item: any, i: number) => (
          <div key={i} className="flex items-center gap-10 mx-12 shrink-0">
            <item.icon size={16} className="text-[var(--primary)]" />
            <span className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              {item.text}
            </span>
            <span className="text-[var(--primary)]/20 ms-8 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
