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
  }, [testimonials.length]);

  return (
    <SectionWrapper id="clients" className="bg-white relative overflow-hidden">
      <div className="relative z-10 py-10">
        
        {/* Partner Logos Marquee */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="section-label justify-center">
              <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {t("trustedBy")}
            </span>
          </div>
          
          <div className="relative group overflow-hidden">
            <div className="absolute start-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute end-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-16 md:gap-24 items-center"
                animate={{ x: [0, -1920] }}
                transition={{
                  x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
                }}
                style={{ width: "fit-content" }}
              >
                {[...partners, ...partners, ...partners].map((partner: any, index: number) => (
                  <div key={index} className="w-[110px] md:w-[130px] shrink-0 opacity-40 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={130}
                      height={50}
                      className="w-full object-contain h-12"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-3xl mx-auto text-center mt-24">
          <Quote className="text-[var(--primary)] mx-auto mb-6 opacity-10 pointer-events-none" size={48} />
          
          <div className="h-[260px] md:h-[180px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-neutral-900 text-lg md:text-xl leading-relaxed mb-8 font-medium italic" style={{ letterSpacing: "-0.01e" }}>
                  &quot;{testimonials[current].quote}&quot;
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200/80 shadow-sm shrink-0">
                    <Image 
                      src={testimonials[current].image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"} 
                      alt={testimonials[current].author}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="text-start">
                    <h4 className="text-[13px] font-semibold text-neutral-900">
                      {testimonials[current].author}
                    </h4>
                    <span className="text-[12px] text-neutral-400 mt-0.5 block">
                      {testimonials[current].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {testimonials.map((_: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[var(--primary)]" : "w-1.5 bg-neutral-200"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
