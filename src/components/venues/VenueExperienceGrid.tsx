"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface VenueExperienceItem {
  category: string;
  title: string;
  description: string;
  expandedDescription: string;
  image: string;
  imageAlt: string;
}

interface VenueExperienceGridProps {
  eyebrow: string;
  heading: React.ReactNode;
  intro: string;
  items: VenueExperienceItem[]; // exactly 6 — layout is a fixed bento shape
}

// Fixed asymmetric bento shape — first item is the lead (large) card.
const SLOT_CLASS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-1",
  "md:col-span-5 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
];

export default function VenueExperienceGrid({ eyebrow, heading, intro, items }: VenueExperienceGridProps) {
  const visible = items.slice(0, 6);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next]);

  return (
    <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">{eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-5">{heading}</h2>
          <p className="text-neutral-500 text-[15px] md:text-[16px] leading-relaxed font-light">{intro}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 md:auto-rows-[210px]">
          {visible.map((item, i) => {
            const large = i === 0;
            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setOpenIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden group aspect-[4/3] md:aspect-auto text-left cursor-pointer ${SLOT_CLASS[i]}`}
                aria-label={`Learn more about ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
                  <span className="text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-2 block">{item.category}</span>
                  <h3 className={`text-white font-semibold leading-snug mb-1.5 ${large ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
                    {item.title}
                  </h3>
                  <p className={`text-neutral-300 font-light leading-relaxed ${large ? "text-[14px] max-w-md" : "text-[12.5px] line-clamp-2"}`}>
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Expanded detail modal ── */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-neutral-950/90 flex items-center justify-center p-4 md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                <Image
                  src={visible[openIndex].image}
                  alt={visible[openIndex].imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                <span className="text-emerald-700 text-[11px] font-bold tracking-widest uppercase mb-3 block">
                  {visible[openIndex].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-4">
                  {visible[openIndex].title}
                </h3>
                <p className="text-neutral-600 text-[15px] leading-relaxed font-light">
                  {visible[openIndex].expandedDescription}
                </p>
                <span className="text-neutral-400 text-[12px] mt-8">
                  {openIndex + 1} / {visible.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
