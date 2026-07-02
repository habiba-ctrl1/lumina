"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "20+",   label: "Vetted Vendors",      sub: "A trusted network of KSA event partners." },
  { value: "6+",    label: "Event Categories",    sub: "Covering corporate, cultural, and private events." },
  { value: "10+",   label: "Saudi Cities",        sub: "Connecting clients across the Kingdom." },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.6, ease: EASE },
  }),
};

export default function GeoDefinitionBlock() {
  return (
    <section className="bg-slate-50 py-16 text-slate-900 overflow-hidden" aria-label="About Saudi Event Management">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="flex flex-col space-y-6 text-center">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold font-serif tracking-tight text-slate-900"
          >
            What is Saudi Event Management?
          </motion.h2>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg leading-relaxed text-slate-700"
          >
            <strong>Saudi Event Management</strong> is a Riyadh-focused B2B platform connecting clients with 
            trusted, vetted event service providers across Saudi Arabia. We simplify event planning for corporate events, 
            conferences, exhibitions, and private events across Riyadh, Jeddah, Dammam, and AlUla by providing 
            access to elite vendors for stage design, AV production, VIP protocol, and GEA permits.
          </motion.p>

          {/* Stat cards — staggered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="p-6 bg-white rounded-xl shadow-sm border border-slate-100"
              >
                <h3 className="text-4xl font-bold text-emerald-600 mb-2">{s.value}</h3>
                <p className="font-medium text-slate-800">{s.label}</p>
                <p className="text-sm text-slate-500 mt-2">{s.sub}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
