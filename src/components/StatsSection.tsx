"use client";

import { motion } from "framer-motion";

const stats = [
  { value: 250, suffix: "+", label: "Events Crafted" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Retention" },
  { value: 120, suffix: "M+", label: "SAR Budget Managed" },
];



export default function StatsSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden border-y border-gray-100">
      <div className="container-luxury relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tight"
          >
            VISION 2030 <span className="text-primary">ALIGNMENT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
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
              <div className="text-4xl md:text-5xl font-bold text-black mb-3 tracking-tighter">
                <span className="tabular-nums">
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
