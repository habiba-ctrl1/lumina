"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const partners = [
  { name: "GEA", logo: "/partners/gea.webp", alt: "General Entertainment Authority" },
  { name: "NEOM", logo: "/partners/neom.webp", alt: "NEOM" },
  { name: "Vision 2030", logo: "/partners/vision2030.webp", alt: "Vision 2030" },
  { name: "Ministry of Culture", logo: "/partners/moc.webp", alt: "Ministry of Culture" },
  { name: "Riyadh Season", logo: "/partners/riyadh_season.svg", alt: "Riyadh Season" },
  { name: "Red Sea Global", logo: "/partners/red_sea.svg", alt: "Red Sea Global" },
  { name: "Diriyah Gate", logo: "/partners/diriyah.svg", alt: "Diriyah Gate" },
  { name: "Saudia", logo: "/partners/saudia.svg", alt: "Saudia" },
];
export default function PartnersSection() {
  const t = useTranslations("partners");
  const testimonials = t.raw("testimonials");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id="clients" className="bg-white relative overflow-hidden">
      <div className="relative z-10 py-10">
        
        {/* Partner Logos Marquee */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t("trustedBy")}
            </span>
          </div>
          
          <div className="relative group overflow-hidden">
            <div className="absolute start-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute end-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-16 md:gap-24 items-center"
                animate={{ x: [0, -1920] }}
                transition={{
                  x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
                }}
                style={{ width: "fit-content" }}
              >
                {[...partners, ...partners, ...partners].map((partner: any, index: number) => (
                  <div key={index} className="w-[120px] md:w-[150px] shrink-0 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={150}
                      height={60}
                      className="w-full object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto text-center mt-24">
          <Quote className="text-[var(--primary)] mx-auto mb-8 opacity-20" size={64} />
          
          <div className="h-[280px] md:h-[200px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="font-display text-slate-900 text-xl md:text-2xl lg:text-3xl leading-relaxed mb-10 font-medium">
                  "{testimonials[current].quote}"
                </p>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                    <Image 
                      src={testimonials[current].image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"} 
                      alt={testimonials[current].author}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                      {testimonials[current].author}
                    </h4>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {testimonials[current].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-[var(--primary)]" : "w-2 bg-slate-200"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
