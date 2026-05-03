"use client";

import { motion } from "framer-motion";
import { MessageSquare, CalendarCheck, GlassWater, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare size={32} />,
    title: "Initial Consultation",
    desc: "We discuss your vision, preferences, and requirements to understand the core of your dream event.",
  },
  {
    icon: <CalendarCheck size={32} />,
    title: "Bespoke Planning",
    desc: "Our experts craft a meticulously detailed proposal, encompassing venue selection, design, and timeline.",
  },
  {
    icon: <GlassWater size={32} />,
    title: "Flawless Execution",
    desc: "On the day, our team ensures seamless coordination, allowing you to immerse yourself in the experience.",
  },
  {
    icon: <Sparkles size={32} />,
    title: "Timeless Memories",
    desc: "We deliver an unforgettable celebration that exceeds your expectations and captivates your guests.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-charcoal-950 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
          >
            The Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-6"
          >
            How We <span className="text-shimmer font-semibold italic">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
          >
            A seamless journey from your first idea to the final applause.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative group perspective-[1000px]"
            >
              <div className="glass-strong rounded-2xl p-8 h-full border-t border-white/10 hover:border-gold-500/40 transition-all duration-500 transform-gpu group-hover:-translate-y-4 group-hover:rotate-x-6 group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.05)]">
                {/* Step Number Background */}
                <div className="absolute -top-4 -right-2 text-9xl font-display font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-gold-500/[0.05] transition-colors duration-500">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 rounded-full bg-charcoal-900 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-charcoal-900 transition-all duration-500 shadow-lg shadow-gold-500/10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-4 group-hover:text-gold-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
