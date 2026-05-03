"use client";

import { Crown, Heart, Star, Gem, Award, Sparkles } from "lucide-react";

const items = [
  { icon: Crown, text: "500+ Events Delivered" },
  { icon: Heart, text: "100% Client Satisfaction" },
  { icon: Star, text: "Award-Winning Team" },
  { icon: Gem, text: "Luxury Certified" },
  { icon: Award, text: "Featured in Vogue" },
  { icon: Sparkles, text: "Premium Partners" },
];

export default function MarqueeStrip() {
  return (
    <div className="relative py-6 bg-charcoal-950 border-y border-white/5 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-charcoal-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-charcoal-950 to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3 mx-10 shrink-0">
            <item.icon size={16} className="text-gold-500" />
            <span className="text-gray-400 text-sm uppercase tracking-[0.2em] whitespace-nowrap font-light">
              {item.text}
            </span>
            <span className="text-gold-500/30 ml-6">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
