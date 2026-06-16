"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Send, CheckCircle, HelpCircle, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

// Which FAQ items to surface on the homepage (out of 14 in translations)
// Chosen for highest-intent search coverage: local SEO, pricing, logistics, eligibility
const HOMEPAGE_FAQ_INDICES = [1, 2, 5, 6, 10, 11];

type Tab = "faq" | "review";

export default function EngagementHub() {
  const t    = useTranslations("engagement");
  const tFaq = useTranslations("faq");

  const [activeTab, setActiveTab]   = useState<Tab>("faq");
  const [openIdx, setOpenIdx]       = useState<number | null>(0);
  const [submitted, setSubmitted]   = useState(false);
  const [rating, setRating]         = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview]         = useState({ name: "", email: "", experience: "" });
  const [reviewError, setReviewError] = useState(false);

  const allFaqItems   = tFaq.raw("items") as any[];
  const homepageFaqs  = HOMEPAGE_FAQ_INDICES.map((i) => allFaqItems[i]).filter(Boolean);

  // JSON-LD FAQ schema injected inline
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError(false);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: review.experience,
          author: review.name,
          role: "Verified Client",
          rating: rating || 5,
          email: review.email,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setReview({ name: "", email: "", experience: "" });
      setRating(0);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      setReviewError(true);
      setTimeout(() => setReviewError(false), 4000);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof HelpCircle }[] = [
    { id: "faq",    label: tFaq("tabLabel"), icon: HelpCircle   },
    { id: "review", label: t("submitReview"), icon: Star         },
  ];

  return (
    <section className="bg-[var(--surface-tinted)] bg-emerald-dots relative py-20 overflow-hidden">
      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <motion.div
        className="max-w-4xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {t("label")}
            </span>
          </div>
          <h2
            className="text-neutral-900 text-3xl md:text-4xl font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </h2>
        </div>

        <div
          className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden"
          style={{ boxShadow: "0 4px 12px -2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)" }}
        >
          {/* Tabs */}
          <div className="flex border-b border-neutral-200/80 bg-neutral-50/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-5 flex items-center justify-center gap-2 text-[12px] font-semibold transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-[var(--primary)]"
                    : "text-neutral-500 hover:text-neutral-900 bg-transparent"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="engagement-tab-indicator"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[var(--primary)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">

              {/* ── FAQ Tab ─────────────────────────────────────────── */}
              {activeTab === "faq" && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="divide-y divide-neutral-100">
                    {homepageFaqs.map((item: any, i: number) => (
                      <div key={i} className="py-5 first:pt-0 last:pb-0">
                        <button
                          onClick={() => setOpenIdx(openIdx === i ? null : i)}
                          className="w-full flex items-start justify-between gap-4 text-start group"
                          aria-expanded={openIdx === i}
                        >
                          <span
                            className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                              openIdx === i ? "text-[var(--primary)]" : "text-neutral-900 group-hover:text-[var(--primary)]"
                            }`}
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {item.question}
                          </span>
                          <motion.span
                            animate={{ rotate: openIdx === i ? 180 : 0 }}
                            transition={{ duration: 0.22 }}
                            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-200 ${
                              openIdx === i ? "bg-[var(--primary)] text-white" : "bg-neutral-100 text-neutral-400"
                            }`}
                          >
                            <ChevronDown size={13} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {openIdx === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="pt-3.5 text-[14px] text-neutral-500 leading-relaxed">
                                {item.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp CTA row */}
                  <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div>
                      <p className="text-[14px] font-semibold text-neutral-900 mb-1">
                        {tFaq("stillHaveQuestions")}
                      </p>
                      <p className="text-[13px] text-neutral-500 max-w-sm leading-relaxed">
                        {tFaq("conciergeDesc")}
                      </p>
                    </div>
                    <Link
                      href="https://wa.me/966501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl text-[13px] font-semibold transition-all hover:bg-[#1ebe5d] group"
                      style={{ boxShadow: "0 2px 8px rgba(37,211,102,0.28)" }}
                    >
                      <MessageSquare size={14} fill="white" />
                      {tFaq("messageWhatsApp")}
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* ── Review Tab — Success ─────────────────────────── */}
              {activeTab === "review" && submitted && (
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
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2" style={{ letterSpacing: "-0.01em" }}>
                    {t("receivedThanks")}
                  </h3>
                  <p className="text-neutral-500 text-[14px] font-medium">{t("processingEntry")}</p>
                </motion.div>
              )}

              {/* ── Review Tab — Form ───────────────────────────── */}
              {activeTab === "review" && !submitted && (
                <motion.form
                  key="review"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-500 mb-2">{t("yourName")}</label>
                      <input
                        type="text"
                        required
                        value={review.name}
                        onChange={(e) => setReview((p) => ({ ...p, name: e.target.value }))}
                        placeholder={t("namePlaceholder")}
                        className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-500 mb-2">{t("emailAddress")}</label>
                      <input
                        type="email"
                        required
                        value={review.email}
                        onChange={(e) => setReview((p) => ({ ...p, email: e.target.value }))}
                        placeholder={t("emailPlaceholder")}
                        className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="py-2">
                    <label className="block text-[13px] font-medium text-neutral-500 mb-4 text-center">{t("yourRating")}</label>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                          aria-label={`Rate ${s} stars`}
                        >
                          <Star
                            size={28}
                            className={`transition-colors duration-150 ${
                              s <= (hoverRating || rating) ? "text-amber-400" : "text-neutral-200"
                            }`}
                            fill={s <= (hoverRating || rating) ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-neutral-500 mb-2">{t("yourExperience")}</label>
                    <textarea
                      required
                      rows={4}
                      value={review.experience}
                      onChange={(e) => setReview((p) => ({ ...p, experience: e.target.value }))}
                      placeholder={t("experiencePlaceholder")}
                      className="w-full bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-xl text-[14px] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all resize-none text-neutral-900 placeholder:text-neutral-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[var(--primary)] text-white py-4 rounded-xl text-[14px] font-semibold hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2 group"
                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                  >
                    <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    {t("publishReview")}
                  </button>

                  {reviewError && (
                    <p className="text-center text-[13px] text-rose-600 font-medium">
                      Something went wrong submitting your review. Please try again.
                    </p>
                  )}
                </motion.form>
              )}

            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
