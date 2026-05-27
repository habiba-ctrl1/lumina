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
    <SectionWrapper className="bg-[var(--primary)] relative overflow-hidden text-white py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl md:text-4xl mb-6 uppercase tracking-tight text-white"
          >
            VISION 2030 ALIGNMENT
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-teal-50 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Supporting the General Entertainment Authority (GEA) to host world-class events through world-class cultural activations.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 divide-x divide-white/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                <span className="tabular-nums">
                  {stat.value.toLocaleString()}<span className="text-teal-200">{stat.suffix}</span>
                </span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-teal-50 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
