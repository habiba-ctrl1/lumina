"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, LayoutTemplate, Sparkles } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const iconMap = [
  <MessageSquare size={24} />,
  <PenTool size={24} />,
  <LayoutTemplate size={24} />,
  <Sparkles size={24} />
];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  
  const steps = t.raw("steps").map((step: any, i: number) => ({
    icon: iconMap[i],
    title: step.title,
    desc: step.desc
  }));

  return (
    <SectionWrapper id="process" className="bg-white relative overflow-hidden">
      <div className="relative z-10 py-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <span className="w-12 h-[2px] bg-[var(--primary)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
              {t("label")}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight"
          >
            {t("title")} <span className="text-[var(--primary)] font-bold">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 text-base leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-slate-100 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-[var(--primary)] origin-start"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number Indicator */}
                  <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-[var(--primary)] group-hover:shadow-lg transition-all duration-300 relative">
                    <div className="absolute inset-2 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors duration-300">
                      <div className="text-slate-400 group-hover:text-white transition-colors duration-300">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 w-full flex-grow relative">
                    <div className="absolute -top-4 start-1/2 -translate-x-1/2 bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                      {t("stepPrefix")} 0{index + 1}
                    </div>
                    <h3 className="font-display text-slate-900 text-lg mb-4 font-bold tracking-tight mt-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
