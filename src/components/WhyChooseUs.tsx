"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Users, Clock, Sparkles, HeartHandshake, Globe, ArrowRight, MessageCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const iconMap = [
  <ShieldCheck size={20} />,
  <Users size={20} />,
  <Clock size={20} />,
  <Sparkles size={20} />,
  <HeartHandshake size={20} />,
  <Globe size={20} />,
  <Sparkles size={20} />
];

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  
  const reasons = t.raw("reasons").map((reason: any, i: number) => ({
    icon: iconMap[i],
    title: reason.title,
    desc: reason.desc
  }));

  return (
    <SectionWrapper className="bg-neutral-900 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 start-0 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 py-10 max-w-6xl mx-auto px-6">
        <div className="bg-neutral-800/40 rounded-3xl p-8 md:p-12 border border-neutral-700/50"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left */}
            <div className="lg:col-span-4 flex flex-col justify-start pt-2">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-emerald-400 text-[13px] font-medium mb-5 block"
              >
                {t("label")}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-2xl md:text-3xl mb-5 font-semibold"
                style={{ letterSpacing: "-0.025em" }}
              >
                {t("title")} <span className="text-emerald-400">{t("titleHighlight")}</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-neutral-400 text-[14px] leading-relaxed mb-6 max-w-sm"
              >
                {t("subtitle")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="w-8 h-0.5 bg-emerald-400/30 mb-8 rounded-full"
              />

              {/* CTA Box */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-neutral-900/60 border border-neutral-700/50 p-6 rounded-2xl"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)" }}
              >
                <h4 className="text-white text-[15px] font-semibold mb-2">{t("requestConsultation")}</h4>
                <p className="text-neutral-500 text-[13px] mb-6 leading-relaxed">
                  {t("consultationDesc")}
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20would%20like%20to%20request%20a%20consultation%20for%20my%20upcoming%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-3 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all duration-200"
                    style={{ boxShadow: "0 2px 6px rgba(37,211,102,0.15)" }}
                  >
                    <MessageCircle size={16} />
                    {t("chatWhatsApp")}
                  </Link>
                  <Link 
                    href="/contact"
                    className="w-full bg-neutral-800 text-white border border-neutral-700 py-3 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2 hover:bg-neutral-700 transition-all duration-200"
                  >
                    {t("submitInquiry")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right — Reasons Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {reasons.map((reason: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col group"
                  >
                    <div className="text-emerald-400 mb-4 bg-emerald-500/10 w-10 h-10 flex items-center justify-center rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      {reason.icon}
                    </div>
                    <h5 className="text-white text-[15px] mb-2 font-semibold" style={{ letterSpacing: "-0.01em" }}>
                      {reason.title}
                    </h5>
                    <p className="text-neutral-500 text-[13px] leading-relaxed">
                      {reason.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
