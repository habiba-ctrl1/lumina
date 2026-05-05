"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Clock, Sparkles, HeartHandshake, Globe } from "lucide-react";

const reasons = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Stress-Free Execution",
    desc: "We handle every detail from logistics to last-minute changes, so you can be fully present in the moment.",
  },
  {
    icon: <Users size={28} />,
    title: "Elite Vendor Network",
    desc: "Access our curated network of 200+ premium vendors — florists, caterers, photographers — all vetted for excellence.",
  },
  {
    icon: <Clock size={28} />,
    title: "Timeline Mastery",
    desc: "Our military-precise timeline management ensures zero delays. Every second of your event flows seamlessly.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Bespoke Design",
    desc: "No templates. Every element is custom-designed to reflect your unique personality, story, and aesthetic vision.",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Dedicated Concierge",
    desc: "One dedicated planner handles your entire event. You&apos;ll never be passed between teams or departments.",
  },
  {
    icon: <Globe size={28} />,
    title: "Global Reach",
    desc: "From royal palaces in Riyadh to elite venues in Dubai — we execute flawlessly across the Middle East.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Header */}
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-8 block"
            >
              The Lumina Difference
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display text-[#041E42] mb-12"
            >
              The Lumina <span className="text-plum-700 italic font-medium">Standard</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-xl leading-relaxed max-w-xl mb-16"
            >
              Absolute perfection for your grandest visions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-20 h-[1px] bg-champagne-500"
            />
          </div>

          {/* Right Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-12 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700 rounded-sm"
              >
                <div className="text-champagne-500 mb-10 group-hover:scale-110 transition-transform duration-500">
                  {reason.icon}
                </div>
                <h3 className="text-[#041E42] font-display text-2xl mb-6 group-hover:text-champagne-500 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
