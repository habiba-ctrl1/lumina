"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface VenueExperienceItem {
  category: string;
  title: string;
  description: string;
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
          {items.slice(0, 6).map((item, i) => {
            const large = i === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden group aspect-[4/3] md:aspect-auto ${SLOT_CLASS[i]}`}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
