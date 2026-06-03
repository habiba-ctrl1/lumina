"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Users, Clock, Sparkles, HeartHandshake, Globe } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const iconMap = [
  <ShieldCheck size={28} />,
  <Users size={28} />,
  <Clock size={28} />,
  <Sparkles size={28} />,
  <HeartHandshake size={28} />,
  <Globe size={28} />,
  <Sparkles size={28} />
];

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  
  const reasons = t.raw("reasons").map((reason: any, i: number) => ({
    icon: iconMap[i],
    title: reason.title,
    desc: reason.desc
  }));

  return (
    <SectionWrapper className="bg-ink-950 relative overflow-hidden">
      <div className="relative z-10">
        {/* Main Box Wrapper */}
        <div className="bg-ink-800 rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm mx-auto w-full transition-all duration-300 hover:shadow-md border border-ink-600 hover:border-[#3F3F46]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Header Area */}
            <div className="lg:col-span-4 flex flex-col justify-start pt-4">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary text-xs uppercase tracking-[0.4em] font-bold mb-8 block"
              >
                {t("label")}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-black text-2xl md:text-3xl mb-8 font-bold"
              >
                {t("title")} <span className="text-primary italic">{t("titleHighlight")}</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-[13px] leading-relaxed mb-8 max-w-sm"
              >
                {t("subtitle")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-16 h-0.5 bg-primary/40 mb-10"
              />

              {/* Consultation Form / CTA (Top of section) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-ink-950 border border-ink-600 p-6 rounded-2xl shadow-sm"
              >
                <h4 className="text-black text-sm font-bold uppercase tracking-widest mb-8">{t("requestConsultation")}</h4>
                <p className="text-gray-500 text-xs mb-8 leading-relaxed">
                  {t("consultationDesc")}
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20would%20like%20to%20request%20a%20consultation%20for%20my%20upcoming%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all"
                  >
                    {t("chatWhatsApp")}
                  </Link>
                  <Link 
                    href="/contact"
                    className="w-full bg-primary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-hover transition-all"
                  >
                    {t("submitInquiry")}
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Grid of Reasons */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
                {reasons.map((reason: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col group"
                  >
                    <div className="text-primary mb-5 bg-gold-50 w-14 h-14 flex items-center justify-center rounded-full border border-gold-100 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {reason.icon}
                    </div>
                    <h5 className="text-black text-sm md:text-base mb-3 font-bold uppercase tracking-tight">
                      {reason.title}
                    </h5>
                    <p className="text-gray-600 text-[13px] leading-relaxed">
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
