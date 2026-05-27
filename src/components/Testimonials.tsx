"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const fallbackTestimonials = [
  {
    id: 1,
    quote: "The level of perfect planning and attention to detail Saudi Event Management brought to our Royal Gala was staggering.",
    author: "H.H. Princess Noura",
    role: "Cultural Initiative, Riyadh"
  },
  {
    id: 2,
    quote: "For our NEOM executive summit, we needed a partner who understood high-stakes logistics. They delivered a masterclass.",
    author: "Khalid Al-Mansour",
    role: "Strategic Partnerships"
  },
  {
    id: 3,
    quote: "The Red Sea wedding they designed for us was a dream brought to life. Every detail was executed to perfection.",
    author: "Sarah & Ahmed",
    role: "Wedding Clients, Jeddah"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % fallbackTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-slate-200 hover:border-[var(--primary)] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg">
      <Quote className="text-[var(--primary)]/15 absolute top-6 right-8" size={48} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative z-10"
        >
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-[var(--primary)] fill-[var(--primary)]" />)}
          </div>
          <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
            &quot;{fallbackTestimonials[current].quote}&quot;
          </p>
          <div className="flex items-center gap-6">
            <div className="w-10 h-[2px] bg-[var(--primary)]/30" />
            <div>
              <p className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">{fallbackTestimonials[current].author}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{fallbackTestimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2 mt-8">
        {fallbackTestimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-[var(--primary)]" : "w-2 bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
