"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = t.raw("items");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-neutral-200/80 transition-all duration-300 overflow-hidden"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
    >
      <Quote className="text-[var(--primary)]/10 absolute top-6 end-8 pointer-events-none" size={40} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} className="text-[var(--primary)] fill-[var(--primary)]" />
            ))}
          </div>
          <p className="text-neutral-800 text-[16px] leading-relaxed mb-8 font-medium italic" style={{ letterSpacing: "-0.01em" }}>
            &quot;{testimonials[current].quote}&quot;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-neutral-200" />
            <div>
              <p className="text-[13px] font-semibold text-neutral-900">{testimonials[current].author}</p>
              <p className="text-[12px] text-neutral-400 mt-0.5">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5 mt-8 z-10 relative">
        {testimonials.map((_: any, i: number) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-[var(--primary)]" : "w-1.5 bg-neutral-200"}`}
            aria-label={`Go to testimonial slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
