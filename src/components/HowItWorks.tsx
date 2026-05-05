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
    <section id="process" className="section-padding bg-[#F8F9FA] relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-champagne-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-champagne-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-8 block"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-[#041E42] mb-12"
          >
            How We <span className="text-shimmer italic font-medium">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-3xl mx-auto text-xl font-light leading-relaxed"
          >
            A seamless journey from your first idea to the final applause.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-champagne-500/20 to-transparent" />

          {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative group p-12 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700 rounded-sm"
              >
                <div className="absolute top-6 right-8 text-7xl font-display font-bold text-[#041E42]/5 group-hover:text-champagne-500/10 transition-colors">
                  {index + 1}
                </div>
                <div className="text-champagne-500 mb-10 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-[#041E42] font-display text-2xl mb-6">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-lg font-light leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
