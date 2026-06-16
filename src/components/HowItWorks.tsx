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
    <SectionWrapper id="process" className="relative overflow-hidden">
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
            <span className="section-label !text-amber-300">
              <span className="w-6 h-0.5 rounded-full bg-amber-300 opacity-60" />
              {t("label")}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-white text-3xl md:text-4xl mb-5 font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")} <span className="text-amber-300">{t("titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-[16px] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line — sits behind the step number badges */}
          <div className="hidden lg:block absolute top-[20px] left-[12%] right-[12%] h-px bg-white/20 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-amber-300/50 origin-start"
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
                  {/* Step Number Badge */}
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20 ring-4 ring-amber-400/15">
                    <span className="text-ink-950 text-[13px] font-bold">0{index + 1}</span>
                  </div>

                  {/* Step Icon Circle */}
                  <div className="w-16 h-16 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-white/15 group-hover:border-amber-300/30 transition-all duration-300 relative">
                    <div className="text-amber-300">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white/[0.07] border border-white/15 rounded-xl p-6 w-full flex-grow relative backdrop-blur-md transition-all duration-300 group-hover:bg-white/[0.12] group-hover:border-amber-300/40">
                    <h3 className="text-white text-[16px] mb-3 font-semibold" style={{ letterSpacing: "-0.01em" }}>
                      {step.title}
                    </h3>
                    <p className="text-white/65 text-[14px] leading-relaxed">
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
