"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-play
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length, next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-32 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/3 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
          >
            Testimonials
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <Quote size={48} className="text-gold-500/15" />
        </motion.div>

        <div className="relative min-h-[280px]">
          {testimonials.length > 0 && (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="text-center absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>

                <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-white mb-10 leading-snug max-w-3xl">
                  &quot;{testimonials[current]?.quote}&quot;
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-px bg-gold-500/30 mb-5" />
                  <h4 className="text-gold-500 font-medium text-lg uppercase tracking-wider mb-1">
                    {testimonials[current]?.author}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonials[current]?.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-16">
          <button
            onClick={prev}
            className="p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all duration-300 hover:bg-gold-500/5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Progress dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === current ? "bg-gold-500 w-8" : "bg-white/15 w-2 hover:bg-white/30"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all duration-300 hover:bg-gold-500/5"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
