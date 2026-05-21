"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const CITY_DATA = {
  riyadh: { n: 'RIYADH', s: 'CAPITAL HEADQUARTERS', e: '120+', svgX: 505, svgY: 357, slug: 'riyadh' },
  jeddah: { n: 'JEDDAH', s: 'RED SEA GATEWAY', e: '85+', svgX: 204, svgY: 497, slug: 'jeddah' },
  alula: { n: 'ALULA', s: 'HERITAGE LUXURY', e: '35+', svgX: 154, svgY: 275, slug: 'alula' },
  makkah: { n: 'MAKKAH', s: 'SACRED ELEGANCE', e: '42+', svgX: 232, svgY: 502, slug: 'makkah' },
  madinah: { n: 'MADINAH', s: 'HOLY CITY HUB', e: '30+', svgX: 220, svgY: 365, slug: 'madinah' },
  dammam: { n: 'DAMMAM', s: 'EASTERN GATEWAY', e: '55+', svgX: 638, svgY: 284, slug: 'dammam' }
};

type CityKey = keyof typeof CITY_DATA;

export default function SaudiMap() {
  const [activeCity, setActiveCity] = useState<CityKey | null>(null);
  const [popPos, setPopPos] = useState({ left: 0, top: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const updatePopPos = (id: CityKey) => {
    if (!svgRef.current || !containerRef.current) return;
    const city = CITY_DATA[id];
    const sr = svgRef.current.getBoundingClientRect();
    const wr = containerRef.current.getBoundingClientRect();
    const scx = sr.width / 950;
    const scy = sr.height / 780;
    
    setPopPos({
      left: (city.svgX * scx) + (sr.left - wr.left) - 82,
      top: (city.svgY * scy) + (sr.top - wr.top) - 145
    });
    setActiveCity(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => updatePopPos('riyadh'), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (activeCity) updatePopPos(activeCity);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeCity]);

  return (
    <div className="bg-[#03030a] py-6 px-4 md:px-8 font-serif select-none overflow-hidden">
      <style jsx global>{`
        @keyframes rp { 0% { r: 7; stroke-opacity: 0.8; } 100% { r: 18; stroke-opacity: 0; } }
        @keyframes rp2 { 0% { r: 7; stroke-opacity: 0.6; } 100% { r: 26; stroke-opacity: 0; } }
        @keyframes dd { from { stroke-dashoffset: 28; } to { stroke-dashoffset: 0; } }
        @keyframes ddr { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 28; } }
        .ra { fill: none; stroke: #D4AF37; stroke-width: 0.9; stroke-opacity: 0.28; stroke-dasharray: 3 6; animation: dd 3.5s linear infinite; }
        .rar { fill: none; stroke: #D4AF37; stroke-width: 0.9; stroke-opacity: 0.28; stroke-dasharray: 3 6; animation: ddr 4.2s linear infinite; }
        .lp1 { fill: none; stroke: #D4AF37; stroke-width: 1; animation: rp 2.2s ease-out infinite; }
        .lp2 { fill: none; stroke: #D4AF37; stroke-width: 1; animation: rp2 2.2s ease-out infinite; animation-delay: 0.9s; }
        .dot circle.d { fill: #D4AF37; transition: r 0.2s; }
        .dot:hover circle.d { r: 7; }
        .lbl { fill: #c9a428; font-size: 8px; letter-spacing: 0.1em; pointer-events: none; font-family: sans-serif; font-weight: 600; }
      `}</style>

      <div className="text-center mb-8">
        <p className="text-[#D4AF37] text-[10px] tracking-[0.35em] font-sans mb-2 uppercase">Our Presence Across the Kingdom</p>
        <h2 className="text-[#f0e6cc] text-lg md:text-xl font-normal tracking-wide">
          Crafting <span className="italic text-[#D4AF37]">Masterpieces</span> in Every Corner of Saudi Arabia
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start max-w-3xl mx-auto relative">
        {/* Left Sidebar */}
        <div className="w-full lg:w-44 flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-2 z-20">
          {(Object.keys(CITY_DATA) as CityKey[]).map((id) => (
            <div 
              key={id}
              onClick={() => updatePopPos(id)}
              className={`bg-[#070710] border rounded-lg p-1.5 cursor-pointer transition-all duration-300 ${activeCity === id ? 'border-[#D4AF37] bg-[#0c0c1a]' : 'border-[#1c1c2e] hover:border-[#D4AF37]/50'}`}
            >
              <div className="text-[9px] font-bold text-[#D4AF37] tracking-[0.1em] font-sans text-center">{CITY_DATA[id].n}</div>
            </div>
          ))}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative w-full" ref={containerRef}>
          <svg 
            ref={svgRef}
            viewBox="0 0 950 780" 
            className="w-full h-auto block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="gg" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="ggg" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="9" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="bg-grad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0e0e22" stopOpacity="1"/>
                <stop offset="100%" stopColor="#03030a" stopOpacity="1"/>
              </radialGradient>
            </defs>

            {/* Background */}
            <rect width="950" height="780" fill="url(#bg-grad)" rx="10"/>

            {/* Saudi Arabia Outline */}
            <path 
              d="M 38,151 C 55,100 70,60 79,43 L 190,43 C 220,43 270,58 317,78 C 370,100 440,115 495,130 C 515,155 530,175 535,195 L 554,208 C 575,222 608,230 634,281 C 650,305 662,315 666,325 L 674,390 L 686,411 C 730,430 800,442 833,455 L 853,477 C 830,520 780,565 713,606 C 680,640 655,658 634,671 L 535,692 C 490,705 440,712 396,714 L 348,701 C 340,697 338,694 336,692 L 316,670 C 305,650 300,638 296,627 C 285,605 278,592 276,584 C 268,562 262,550 258,541 C 240,510 228,503 218,498 C 205,488 190,470 178,455 C 160,430 148,418 138,411 C 122,390 112,375 118,368 C 105,348 95,335 99,325 C 88,303 72,290 79,281 C 68,258 52,248 59,238 C 45,215 35,202 40,195 C 32,172 30,160 36,151 Z"
              fill="#0b0b1e" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4"
            />

            {/* Routes */}
            <path className="ra" d="M 505,357 Q 290,240 204,497"/>
            <path className="rar" d="M 505,357 Q 572,215 638,284"/>
            <path className="ra" d="M 505,357 Q 310,185 154,275"/>
            <path className="rar" d="M 505,357 Q 355,255 220,365"/>
            <path className="ra" d="M 505,357 Q 295,268 232,502"/>
            <path className="rar" d="M 204,497 Q 88,360 154,275"/>
            <path className="ra" d="M 204,497 Q 218,477 232,502"/>
            <path className="rar" d="M 220,365 Q 188,430 232,502"/>
            <path className="ra" d="M 638,284 Q 430,240 220,365"/>

            {/* City Dots */}
            {(Object.keys(CITY_DATA) as CityKey[]).map((id) => {
              const city = CITY_DATA[id];
              return (
                <g key={id} className="dot" onClick={() => updatePopPos(id)}>
                  <circle className="lp1" cx={city.svgX} cy={city.svgY} r="7"/>
                  <circle className="lp2" cx={city.svgX} cy={city.svgY} r="7"/>
                  <circle className="d" cx={city.svgX} cy={city.svgY} r="5" filter="url(#ggg)"/>
                  <text className="lbl" x={city.svgX + 10} y={city.svgY - 6}>{city.n}</text>
                </g>
              );
            })}
          </svg>

          {/* Absolute Popup */}
          <AnimatePresence>
            {activeCity && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute bg-[#09091a] border border-[#D4AF37] rounded-xl p-4 min-w-[170px] z-30 pointer-events-auto shadow-2xl"
                style={{ 
                  left: popPos.left, 
                  top: popPos.top,
                }}
              >
                <div className="text-[11px] font-bold text-[#D4AF37] tracking-[0.14em] font-sans mb-1">{CITY_DATA[activeCity].n}</div>
                <div className="text-[8px] text-[#55556a] tracking-[0.08em] font-sans mb-2 uppercase">{CITY_DATA[activeCity].s}</div>
                <div className="text-[9px] text-[#999] font-sans mb-3">Events delivered: <b className="text-[#D4AF37]">{CITY_DATA[activeCity].e}</b></div>
                <button 
                  onClick={() => router.push(`/locations/${CITY_DATA[activeCity].slug}`)}
                  className="w-full text-[8px] text-[#D4AF37] border border-[#D4AF37] rounded-md py-2 text-center tracking-[0.1em] font-sans hover:bg-[#D4AF37]/10 transition-colors uppercase"
                >
                  Explore Events →
                </button>
                {/* Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#D4AF37]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Pills (Mobile optimized) */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-6">
        {(Object.keys(CITY_DATA) as CityKey[]).map((id) => (
          <button
            key={id}
            onClick={() => updatePopPos(id)}
            className={`text-[8px] md:text-[9px] tracking-[0.13em] px-4 py-2 rounded-full border transition-all uppercase font-sans ${activeCity === id ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10' : 'border-[#1a1a28] text-gray-500 hover:text-[#D4AF37]'}`}
          >
            {CITY_DATA[id].n}
          </button>
        ))}
      </div>
    </div>
  );
}
