"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, LayoutTemplate, Sparkles } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const iconMap = [
  <MessageSquare size={20} />,
  <PenTool size={20} />,
  <LayoutTemplate size={20} />,
  <Sparkles size={20} />
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
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {t("label")}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-900 text-3xl md:text-4xl mb-5 font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-500 text-[16px] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[40px] left-[12%] right-[12%] h-px bg-neutral-200 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-[var(--primary)]/30 origin-start"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="w-20 h-20 bg-white border border-neutral-200 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[var(--primary)]/30 group-hover:bg-emerald-50/50 transition-all duration-300 relative"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                  >
                    <div className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white border border-neutral-200/80 rounded-xl p-6 w-full flex-grow relative transition-all duration-300 group-hover:border-neutral-300"
                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-[var(--background)] text-neutral-400 text-[11px] font-medium px-3 py-1 rounded-full border border-neutral-200 group-hover:bg-emerald-50 group-hover:text-[var(--primary)] group-hover:border-emerald-100 transition-all duration-300">
                      {t("stepPrefix")} 0{index + 1}
                    </div>
                    <h3 className="text-neutral-900 text-[16px] mb-3 font-semibold mt-2" style={{ letterSpacing: "-0.01em" }}>
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-[14px] leading-relaxed">
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
