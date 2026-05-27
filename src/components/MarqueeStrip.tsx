"use client";

import { Crown, Heart, Star, Gem, Award, Sparkles } from "lucide-react";

const items = [
  { icon: Crown, text: "250+ Elite Events" },
  { icon: Heart, text: "100% Client Satisfaction" },
  { icon: Star, text: "Middle East Events Winner 2024" },
  { icon: Gem, text: "Luxury Certified" },
  { icon: Award, text: "Vision 2030 Partner" },
  { icon: Sparkles, text: "Premium Partners" },
];

export default function MarqueeStrip() {
  return (
    <div className="relative py-8 bg-slate-50 border-y border-slate-200 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-10 mx-12 shrink-0">
            <item.icon size={16} className="text-[var(--primary)]" />
            <span className="text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              {item.text}
            </span>
            <span className="text-[var(--primary)]/20 ml-8 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
