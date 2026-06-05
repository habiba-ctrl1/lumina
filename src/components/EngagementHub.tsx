"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EngagementHub() {
  const t = useTranslations("engagement");
  const [activeTab, setActiveTab] = useState<"question" | "review">("question");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-[var(--surface-tinted)] bg-emerald-dots relative py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {t("label")}
            </span>
          </div>
          <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.025em" }}>{t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span></h2>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden"
          style={{ boxShadow: "0 4px 12px -2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)" }}
        >
          {/* Tabs */}
          <div className="flex border-b border-neutral-200/80 bg-neutral-50/50">
            <button 
              onClick={() => setActiveTab("question")}
              className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-[12px] font-medium transition-all ${activeTab === "question" ? "bg-white text-[var(--primary)] border-b-2 border-b-[var(--primary)]" : "text-neutral-500 hover:text-neutral-900 bg-transparent"}`}
            >
              <MessageSquare size={16} />
              {t("askQuestion")}
            </button>
            <button 
              onClick={() => setActiveTab("review")}
              className={`flex-1 py-5 flex items-center justify-center gap-2.5 text-[12px] font-medium transition-all ${activeTab === "review" ? "bg-white text-[var(--primary)] border-b-2 border-b-[var(--primary)]" : "text-neutral-500 hover:text-neutral-900 bg-transparent"}`}
            >
              <Star size={16} />
              {t("submitReview")}
            </button>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2" style={{ letterSpacing: "-0.01em" }}>{t("receivedThanks")}</h3>
                  <p className="text-neutral-500 text-[14px] font-medium">{t("processingEntry")}</p>
                </motion.div>
              ) : (
                <motion.form 
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-500 mb-2">{t("yourName")}</label>
                      <input type="text" required className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all text-neutral-900 placeholder:text-neutral-400" placeholder={t("namePlaceholder")} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-500 mb-2">{t("emailAddress")}</label>
                      <input type="email" required className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all text-neutral-900 placeholder:text-neutral-400" placeholder={t("emailPlaceholder")} />
                    </div>
                  </div>

                  {activeTab === "review" && (
                    <div className="text-center py-4">
                      <label className="block text-[13px] font-medium text-neutral-500 mb-4">{t("yourRating")}</label>
                      <div className="flex justify-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((s: any) => (
                          <Star key={s} size={28} className="text-[var(--primary)] cursor-pointer hover:scale-110 transition-transform" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[13px] font-medium text-neutral-500 mb-2">
                      {activeTab === "question" ? t("yourQuestion") : t("yourExperience")}
                    </label>
                    <textarea 
                      required 
                      rows={4} 
                      className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all resize-none text-neutral-900 placeholder:text-neutral-400" 
                      placeholder={activeTab === "question" ? t("questionPlaceholder") : t("experiencePlaceholder")}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[var(--primary)] text-white py-4 rounded-xl text-[14px] font-medium hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2 group"
                    style={{
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    {activeTab === "question" ? t("postQuestion") : t("publishReview")}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
