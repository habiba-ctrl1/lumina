"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Briefcase } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contact");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputClass = (field: string) => `
    w-full bg-neutral-50 border border-neutral-200/80 p-4 text-[14px] text-neutral-900 
    placeholder:text-neutral-400 focus:border-[var(--primary)] focus:bg-white 
    outline-none rounded-xl transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/10
    ${focusedField === field ? "border-[var(--primary)] bg-white" : "hover:border-neutral-300"}
  `;

  return (
    <SectionWrapper id="contact" className="bg-[var(--surface-raised)] relative overflow-hidden">
      <div className="relative z-10 py-10 max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="mb-10">
              <span className="section-label mb-6">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Contact
              </span>
              <h2 className="text-neutral-900 text-3xl md:text-4xl mb-5 font-semibold" style={{ letterSpacing: "-0.025em" }}>
                {t("title")}
              </h2>
              <p className="text-neutral-500 text-[16px] leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <div className="space-y-8">
              {/* Headquarters */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <MapPin className="text-[var(--primary)]" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900 mb-2">
                    {t("headquarters")}
                  </h4>
                  <p className="text-neutral-500 text-[14px] leading-relaxed whitespace-pre-line">
                    {t("headquartersAddress")}
                  </p>
                </div>
              </div>

              {/* Direct Line */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <Phone className="text-[var(--primary)]" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900 mb-2">
                    {t("directLine")}
                  </h4>
                  <p className="text-neutral-500 text-[14px] leading-relaxed">
                    +966 50 123 4567<br />
                    <span className="text-neutral-400 text-[12px] mt-1 block">{t("hours")}</span>
                  </p>
                </div>
              </div>

              {/* Email Inquiries */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-center shrink-0"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <Mail className="text-[var(--primary)]" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-neutral-900 mb-2">
                    {t("emailInquiries")}
                  </h4>
                  <p className="text-neutral-500 text-[14px]">
                    infosaudieventmanagement@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-neutral-200/80"
              style={{ boxShadow: "0 4px 12px -2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)" }}
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
                {t("formTitle")}
              </h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-[13px] font-medium text-neutral-500 mb-2">
                      {t("fullName")}
                    </label>
                    <input 
                      id="fullName"
                      type="text" 
                      required
                      placeholder={t("namePlaceholder")}
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label htmlFor="corporateEmail" className="block text-[13px] font-medium text-neutral-500 mb-2">
                      {t("corporateEmail")}
                    </label>
                    <input 
                      id="corporateEmail"
                      type="email" 
                      required
                      placeholder={t("emailPlaceholder")}
                      className={inputClass("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-[13px] font-medium text-neutral-500 mb-2">
                    {t("eventType")}
                  </label>
                  <div className="relative">
                    <select 
                      id="eventType"
                      defaultValue=""
                      className={`${inputClass("type")} appearance-none cursor-pointer pr-10`}
                      onFocus={() => setFocusedField("type")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" disabled>{t("selectOption")}</option>
                      <option value="corporate">{t("corporateConference")}</option>
                      <option value="gala">{t("corporateGala")}</option>
                      <option value="exhibition">{t("exhibitionTrade")}</option>
                      <option value="wedding">{t("luxuryWedding")}</option>
                      <option value="other">{t("otherEvent")}</option>
                    </select>
                    <Briefcase size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventDetails" className="block text-[13px] font-medium text-neutral-500 mb-2">
                    {t("eventDetails")}
                  </label>
                  <textarea 
                    id="eventDetails"
                    rows={4}
                    placeholder={t("detailsPlaceholder")}
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[var(--primary)] text-white py-4 rounded-xl text-[14px] font-medium transition-all duration-200 hover:bg-[var(--primary-dark)] flex items-center justify-center gap-2 group"
                  style={{
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <span>{t("sendMessage")}</span>
                  <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
