"use client";

import { motion } from "framer-motion";

export interface JourneyStop {
  day: string;
  title: string;
  description: string;
}

interface VenueJourneyTimelineProps {
  eyebrow: string;
  heading: React.ReactNode;
  intro: string;
  stops: JourneyStop[];
}

export default function VenueJourneyTimeline({ eyebrow, heading, intro, stops }: VenueJourneyTimelineProps) {
  return (
    <section className="py-24 md:py-32 bg-neutral-50 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">{eyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-5">{heading}</h2>
          <p className="text-neutral-500 text-[15px] leading-relaxed font-light">{intro}</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-px bg-neutral-200" aria-hidden />

          {stops.map((stop, i) => (
            <motion.div
              key={stop.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-800 font-bold text-[13px] mb-5">
                {i + 1}
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-700 mb-2">{stop.day}</span>
              <h3 className="text-[18px] font-medium text-neutral-900 mb-2">{stop.title}</h3>
              <p className="text-neutral-500 text-[14px] leading-relaxed font-light max-w-xs">{stop.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-neutral-400 text-[12.5px] mt-14 italic">
          A suggested structure — every itinerary is tailored to the group and finalized with the destination team.
        </p>
      </div>
    </section>
  );
}
