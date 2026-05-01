"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <Quote size={64} className="text-gold-500/20" />
        </motion.div>

        <div className="relative min-h-[250px]">
          {testimonials.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="text-2xl md:text-4xl font-light text-white mb-8 leading-snug">
                  &quot;{testimonials[current]?.quote}&quot;
                </p>
                <div>
                  <h4 className="text-gold-500 font-medium text-lg uppercase tracking-wider mb-1">
                    {testimonials[current]?.author}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonials[current]?.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex justify-center items-center gap-6 mt-16">
          <button 
            onClick={prev}
            className="p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-gold-500 w-8" : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
