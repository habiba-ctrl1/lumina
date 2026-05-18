"use client";

import { motion } from "framer-motion";

const stats = [
  { value: 250, suffix: "+", label: "Elite Events" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Retention Rate" },
  { value: 120, suffix: "M+", label: "SAR Budget Managed" },
];



export default function StatsSection() {
  return (
    <section className="py-24 bg-ink-900 relative overflow-hidden border-y border-ink-600">
      <div className="container-luxury relative z-10">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-3xl md:text-4xl font-medium text-sand-50 mb-3 tracking-tighter">
                <span className="tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
