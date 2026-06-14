"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const faqCategories = [
  { id: "general", name: "General" },
  { id: "pricing", name: "Booking & Pricing" },
  { id: "logistics", name: "Services & Logistics" }
];

export default function FAQ({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("faq");
  const faqs = t.raw("items");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("general");

  return (
    <section id="faq" className={`bg-neutral-900 relative ${showHeader ? "py-24 md:py-32" : "pt-12 pb-24 md:pb-32"}`}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header — hidden when the parent page already provides an h1 */}
        {showHeader && (
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-emerald-400 text-[13px] font-medium mb-6 block"
            >
              {t("label")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl text-white mb-6 font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              {t("title")} <span className="text-emerald-400">{t("titleHighlight")}</span>
            </motion.h2>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {faqCategories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                activeCategory === cat.id 
                  ? "bg-emerald-600 text-white" 
                  : "bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700"
              }`}
            >
              {t(`categories.${cat.id}` as any)}
            </button>
          ))}
        </div>

        {/*
          FAQ Items — every question and answer for ALL categories is rendered
          into the DOM so the full content is present in the server HTML and
          crawlable (and matches the FAQPage schema). Inactive categories are
          hidden with CSS rather than unmounted, and each answer stays mounted
          while collapsed via an animated height so the answer text is always
          in the HTML.
        */}
        <div className="space-y-2">
          {faqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            const isVisible = faq.category === activeCategory;
            return (
              <div
                key={index}
                hidden={!isVisible}
                className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl overflow-hidden transition-colors duration-200 hover:border-neutral-600/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full flex items-center justify-between p-5 text-start group"
                >
                  <span className={`text-[15px] font-medium transition-colors ${isOpen ? 'text-emerald-400' : 'text-neutral-300 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <span className="ms-4 flex-shrink-0 text-neutral-500">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="px-5 pb-5 text-neutral-400 text-[14px] leading-relaxed pe-10 border-t border-neutral-700/30 pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center bg-neutral-800/50 border border-neutral-700/50 p-8 rounded-2xl"
        >
          <h3 className="text-white text-lg font-semibold mb-3" style={{ letterSpacing: "-0.02em" }}>{t("stillHaveQuestions")}</h3>
          <p className="text-neutral-400 text-[14px] mb-6 max-w-md mx-auto leading-relaxed">
            {t("conciergeDesc")}
          </p>
          <a 
            href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-[#20ba59] transition-all duration-200"
            style={{ boxShadow: "0 2px 8px rgba(37,211,102,0.25)" }}
          >
            <MessageCircle size={16} />
            {t("messageWhatsApp")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
