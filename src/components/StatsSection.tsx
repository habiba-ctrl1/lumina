"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const stats = [
  { value: 50, suffix: "+", label: "Events Managed" },
  { value: 20, suffix: "+", label: "Trusted Vendors" },
  { value: 10, suffix: "+", label: "Saudi Cities Served" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];



export default function StatsSection() {
  return (
    <SectionWrapper className="bg-ink-900 relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-2xl md:text-3xl text-sand-50 mb-4 uppercase tracking-tight"
          >
            VISION 2030 <span className="text-shimmer italic">ALIGNMENT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sand-400 max-w-2xl mx-auto text-[13px] leading-relaxed"
          >
            Supporting the General Entertainment Authority (GEA) to host world-class events through world-class cultural activations.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-ink-600/30">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="font-display text-3xl md:text-5xl font-light text-sand-50 mb-3 tracking-tighter">
                <span className="tabular-nums">
                  {stat.value.toLocaleString()}<span className="text-gold-400">{stat.suffix}</span>
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-sand-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
