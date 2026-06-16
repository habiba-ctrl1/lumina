"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Briefcase, CheckCircle, AlertCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const t = useTranslations("contact");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Controlled form state + submission status, wired to /api/contact
  // (saves the inquiry to the CRM and emails both the team and the customer).
  const [form, setForm] = useState({ name: "", email: "", eventType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "homepage_contact_section" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", eventType: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field: string) => `
    w-full bg-neutral-50 border border-neutral-200/80 p-4 text-[14px] text-neutral-900 
    placeholder:text-neutral-400 focus:border-[var(--primary)] focus:bg-white 
    outline-none rounded-xl transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/10
    ${focusedField === field ? "border-[var(--primary)] bg-white" : "hover:border-neutral-300"}
  `;

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
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
              <span className="section-label mb-6 !text-amber-300">
                <span className="w-6 h-0.5 rounded-full bg-amber-300 opacity-60" />
                Contact
              </span>
              <h2 className="text-white text-3xl md:text-4xl mb-5 font-semibold" style={{ letterSpacing: "-0.025em" }}>
                {t("title")}
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <div className="space-y-8">
              {/* Headquarters */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">

                  <MapPin className="text-amber-300" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">
                    {t("headquarters")}
                  </h4>
                  <p className="text-white/70 text-[14px] leading-relaxed whitespace-pre-line">
                    {t("headquartersAddress")}
                  </p>
                </div>
              </div>

              {/* Direct Line */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">

                  <Phone className="text-amber-300" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">
                    {t("directLine")}
                  </h4>
                  <p className="text-white/70 text-[14px] leading-relaxed">
                    +966 50 123 4567<br />
                    <span className="text-white/45 text-[12px] mt-1 block">{t("hours")}</span>
                  </p>
                </div>
              </div>

              {/* Email Inquiries */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">

                  <Mail className="text-amber-300" size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white mb-2">
                    {t("emailInquiries")}
                  </h4>
                  <p className="text-white/70 text-[14px]">
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
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-[13px] font-medium text-neutral-500 mb-2">
                      {t("fullName")}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
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
                      value={form.eventType}
                      onChange={(e) => setForm((p) => ({ ...p, eventType: e.target.value }))}
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
                    required
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder={t("detailsPlaceholder")}
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[var(--primary)] text-white py-4 rounded-xl text-[14px] font-medium transition-all duration-200 hover:bg-[var(--primary-dark)] disabled:opacity-60 flex items-center justify-center gap-2 group"
                  style={{
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>{t("sendMessage")}</span>
                      <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 text-emerald-700 text-[13px] font-medium bg-emerald-50 px-5 py-4 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle size={18} className="shrink-0 text-emerald-600" />
                      <span>Thank you — your inquiry has been received. A confirmation email is on its way and our team will reach out shortly.</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 text-rose-700 text-[13px] font-medium bg-rose-50 px-5 py-4 rounded-xl border border-rose-100"
                    >
                      <AlertCircle size={18} className="shrink-0 text-rose-600" />
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
