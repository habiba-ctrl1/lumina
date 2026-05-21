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
    <div className="relative bg-ink-950 rounded-[2rem] p-8 md:p-10 border border-ink-600/60 hover:border-[#3F3F46] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
      <Quote className="text-primary/10 absolute top-6 right-8" size={48} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative z-10"
        >
          <div className="flex gap-1 mb-8">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-primary fill-primary" />)}
          </div>
          <p className="text-black text-[15px] italic leading-relaxed mb-8 font-medium">
            &quot;{fallbackTestimonials[current].quote}&quot;
          </p>
          <div className="flex items-center gap-10">
            <div className="w-10 h-px bg-primary/30" />
            <div>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest">{fallbackTestimonials[current].author}</p>
              <p className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">{fallbackTestimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5 mt-8">
        {fallbackTestimonials.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-0.5 rounded-full transition-all duration-500 ${i === current ? "w-6 bg-primary" : "w-1.5 bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
