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
    <section className="py-28 bg-charcoal-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Header */}
          <div className="lg:col-span-2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
            >
              The Lumina Difference
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-white mb-6 leading-tight"
            >
              Why Clients <span className="text-shimmer font-semibold italic">Choose</span> Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light leading-relaxed mb-8"
            >
              We deliver absolute perfection, transforming your grandest visions into flawless realities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-16 h-[2px] bg-gradient-to-r from-gold-500 to-transparent"
            />
          </div>

          {/* Right Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 border border-white/5 hover:border-gold-500/20 transition-all duration-500 hover:bg-charcoal-900/50"
              >
                <div className="text-gold-500/60 mb-4 group-hover:text-gold-500 transition-colors duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-white font-display text-lg mb-2 group-hover:text-gold-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
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
