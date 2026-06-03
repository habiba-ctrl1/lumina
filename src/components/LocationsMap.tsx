"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";

const locations = [
  { name: "Riyadh", x: "65%", y: "45%", slug: "/locations/riyadh" },
  { name: "Jeddah", x: "35%", y: "55%", slug: "/locations/jeddah" },
  { name: "Makkah", x: "32%", y: "58%", slug: "/locations/jeddah" }, // Reuse Jeddah for now or shared page
  { name: "AlUla", x: "28%", y: "30%", slug: "/locations/alula" },
  { name: "Dammam", x: "78%", y: "40%", slug: "/locations/dammam" },
];

export default function LocationsMap() {
  return (
    <section className="section-light section-padding relative overflow-hidden">
      <div className="container-luxury">
        <div className="text-center mb-20">
          <span className="text-gold-400 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">Regional Coverage</span>
          <h2 className="text-gray-800 text-3xl md:text-4xl font-bold uppercase tracking-tight">Our <span className="text-gold-400">Presence</span></h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm font-light mt-6">Defining luxury event management across the Kingdom&apos;s most iconic destinations.</p>
        </div>

        <div className="relative aspect-[16/10] md:aspect-[21/9] w-full max-w-5xl mx-auto bg-ink-950 rounded-[3rem] border border-ink-600/60 overflow-hidden group">
          {/* Stylized Saudi Map SVG Background mockup */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg viewBox="0 0 800 600" className="w-full h-full fill-black">
                <path d="M200,100 L600,150 L750,400 L600,550 L300,500 L150,350 Z" />
             </svg>
          </div>

          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
             <div className="relative w-full h-full max-w-2xl mx-auto">
                {locations.map((loc: any, i: number) => (
                  <motion.div
                    key={loc.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute cursor-pointer group/pin"
                    style={{ left: loc.x, top: loc.y }}
                  >
                    <Link href={loc.slug} className="flex flex-col items-center gap-2">
                       <div className="relative">
                          <div className="absolute inset-0 bg-gold-400/20 rounded-full animate-ping" />
                          <div className="relative w-4 h-4 bg-gold-400 rounded-full border-2 border-white shadow-lg group-hover/pin:scale-125 transition-transform" />
                       </div>
                       <span className="text-[9px] font-bold uppercase tracking-widest text-sand-50 group-hover/pin:text-gold-400 transition-colors whitespace-nowrap bg-ink-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-ink-600 shadow-sm">
                         {loc.name}
                       </span>
                    </Link>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Map Controls Mockup */}
          <div className="absolute bottom-10 start-10 flex gap-10">
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-gold-400 rounded-full" />
                   <span className="text-[8px] uppercase tracking-widest font-bold text-sand-400">Active Hub</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-ink-600 rounded-full" />
                   <span className="text-[8px] uppercase tracking-widest font-bold text-sand-400">Service Area</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
