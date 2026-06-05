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
    <div className="bg-[var(--surface-raised)] py-20 px-6 font-sans select-none overflow-hidden relative border-t border-neutral-100">
      <style jsx global>{`
        @keyframes rp { 0% { r: 7; stroke-opacity: 0.8; } 100% { r: 18; stroke-opacity: 0; } }
        @keyframes rp2 { 0% { r: 7; stroke-opacity: 0.6; } 100% { r: 26; stroke-opacity: 0; } }
        @keyframes dd { from { stroke-dashoffset: 28; } to { stroke-dashoffset: 0; } }
        @keyframes ddr { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 28; } }
        .ra { fill: none; stroke: var(--primary); stroke-width: 0.9; stroke-opacity: 0.5; stroke-dasharray: 3 6; animation: dd 3.5s linear infinite; }
        .rar { fill: none; stroke: var(--primary); stroke-width: 0.9; stroke-opacity: 0.5; stroke-dasharray: 3 6; animation: ddr 4.2s linear infinite; }
        .lp1 { fill: none; stroke: var(--primary); stroke-width: 1; animation: rp 2.2s ease-out infinite; }
        .lp2 { fill: none; stroke: var(--primary); stroke-width: 1; animation: rp2 2.2s ease-out infinite; animation-delay: 0.9s; }
        .dot circle.d { fill: var(--primary); transition: r 0.2s; }
        .dot:hover circle.d { r: 7; }
        .lbl { fill: #4B5563; font-size: 8px; letter-spacing: 0.1em; pointer-events: none; font-family: sans-serif; font-weight: 600; }
      `}</style>

      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="section-label">
            <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            Our Presence Across the Kingdom
          </span>
        </div>
        <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.025em" }}>
          Crafting <span className="text-[var(--primary)]">Masterpieces</span> in Every Corner of Saudi Arabia
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto relative z-10">
        {/* Left Sidebar */}
        <div className="w-full lg:w-48 flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3 z-20">
          {(Object.keys(CITY_DATA) as CityKey[]).map((id: CityKey) => (
            <div 
              key={id}
              onClick={() => updatePopPos(id)}
              className={`bg-white border rounded-xl p-3 cursor-pointer transition-all duration-300 ${activeCity === id ? 'border-[var(--primary)] bg-emerald-50/50 shadow-[0_2px_8px_rgba(13,107,78,0.15)]' : 'border-neutral-200/80 hover:border-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'}`}
            >
              <div className={`text-[11px] font-semibold tracking-widest text-center uppercase ${activeCity === id ? 'text-[var(--primary)]' : 'text-neutral-500'}`}>{CITY_DATA[id].n}</div>
            </div>
          ))}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative w-full" ref={containerRef}>
          <svg 
            ref={svgRef}
            viewBox="0 0 950 780" 
            className="w-full h-auto block"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.05))" }}
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
            </defs>

            {/* Saudi Arabia Outline */}
            <path 
              d="M 38,151 C 55,100 70,60 79,43 L 190,43 C 220,43 270,58 317,78 C 370,100 440,115 495,130 C 515,155 530,175 535,195 L 554,208 C 575,222 608,230 634,281 C 650,305 662,315 666,325 L 674,390 L 686,411 C 730,430 800,442 833,455 L 853,477 C 830,520 780,565 713,606 C 680,640 655,658 634,671 L 535,692 C 490,705 440,712 396,714 L 348,701 C 340,697 338,694 336,692 L 316,670 C 305,650 300,638 296,627 C 285,605 278,592 276,584 C 268,562 262,550 258,541 C 240,510 228,503 218,498 C 205,488 190,470 178,455 C 160,430 148,418 138,411 C 122,390 112,375 118,368 C 105,348 95,335 99,325 C 88,303 72,290 79,281 C 68,258 52,248 59,238 C 45,215 35,202 40,195 C 32,172 30,160 36,151 Z"
              fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2"
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
            {(Object.keys(CITY_DATA) as CityKey[]).map((id: CityKey) => {
              const city = CITY_DATA[id];
              return (
                <g key={id} className="dot cursor-pointer" onClick={() => updatePopPos(id)}>
                  <circle className="lp1" cx={city.svgX} cy={city.svgY} r="7"/>
                  <circle className="lp2" cx={city.svgX} cy={city.svgY} r="7"/>
                  <circle className="d" cx={city.svgX} cy={city.svgY} r="5" filter="url(#ggg)"/>
                  <text className="lbl" x={city.svgX + 12} y={city.svgY + 3}>{city.n}</text>
                </g>
              );
            })}
          </svg>

          {/* Absolute Popup */}
          <AnimatePresence>
            {activeCity && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bg-white border border-neutral-200/80 rounded-2xl p-5 min-w-[200px] z-30 pointer-events-auto"
                style={{ 
                  left: popPos.left, 
                  top: popPos.top,
                  boxShadow: "0 12px 24px -4px rgba(0,0,0,0.08), 0 4px 8px -2px rgba(0,0,0,0.04)"
                }}
              >
                <div className="text-[13px] font-bold text-neutral-900 tracking-wider uppercase mb-1">{CITY_DATA[activeCity].n}</div>
                <div className="text-[10px] font-medium text-emerald-500 tracking-wider uppercase mb-3">{CITY_DATA[activeCity].s}</div>
                <div className="text-[11px] text-neutral-500 mb-4 font-medium uppercase tracking-widest border-t border-neutral-100 pt-3 flex items-center justify-between">Events <b className="text-[var(--primary)] ms-1">{CITY_DATA[activeCity].e}</b></div>
                <button 
                  onClick={() => router.push(`/locations/${CITY_DATA[activeCity].slug}`)}
                  className="w-full text-[11px] text-white bg-[var(--primary)] rounded-lg py-2.5 text-center font-medium hover:bg-[var(--primary-dark)] transition-all"
                >
                  Explore Events →
                </button>
                {/* Arrow */}
                <div className="absolute -bottom-1.5 start-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-neutral-200/80" style={{ transform: 'rotate(45deg)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
