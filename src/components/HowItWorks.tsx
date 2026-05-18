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
    desc: "We deliver an unforgettable celebration that exceeds expectations, turning your vision into a cherished legacy.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 bg-ink-900 relative overflow-hidden border-y border-ink-600">
      <div className="container-luxury relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-2xl md:text-3xl text-sand-50 mb-4 uppercase tracking-tight"
          >
            How We <span className="text-shimmer italic">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sand-400 max-w-2xl mx-auto text-[13px] leading-relaxed"
          >
            A seamless journey from your first idea to the final applause.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-ink-800 border border-ink-600 p-8 rounded-sm card-hover relative overflow-hidden"
              >
                <div className="absolute top-6 right-8 text-4xl font-display font-medium text-ink-700">
                  0{index + 1}
                </div>
                <div className="text-gold-400 mb-10">
                  {step.icon}
                </div>
                <h3 className="font-display text-sand-50 text-base mb-6 font-medium uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sand-400 text-[13px] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
