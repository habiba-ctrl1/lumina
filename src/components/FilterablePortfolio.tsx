"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, PartyPopper, Mic2, Sparkles, Layers, Users } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const eventCategories = [
  {
    icon: Building2,
    titleEn: "Corporate Events",
    titleAr: "فعاليات الشركات",
    descEn: "Business summits, galas, product launches, and corporate retreats.",
    descAr: "مؤتمرات الأعمال والحفلات وإطلاق المنتجات والاستراحات التنفيذية.",
  },
  {
    icon: Layers,
    titleEn: "Exhibitions",
    titleAr: "المعارض",
    descEn: "Trade shows, pavilion design, and full exhibition management.",
    descAr: "المعارض التجارية وتصميم الأجنحة وإدارة المعارض الكاملة.",
  },
  {
    icon: Mic2,
    titleEn: "Conferences & Summits",
    titleAr: "المؤتمرات والقمم",
    descEn: "Government and executive conferences with delegate management.",
    descAr: "مؤتمرات حكومية وتنفيذية مع إدارة المندوبين.",
  },
  {
    icon: PartyPopper,
    titleEn: "Weddings & Celebrations",
    titleAr: "حفلات الزفاف والاحتفالات",
    descEn: "Luxury weddings, engagement parties, and milestone celebrations.",
    descAr: "حفلات الزفاف الفاخرة والخطوبة والاحتفالات المميزة.",
  },
  {
    icon: Sparkles,
    titleEn: "Event Production",
    titleAr: "إنتاج الفعاليات",
    descEn: "Stage, AV, lighting, and immersive show production at any scale.",
    descAr: "مسرح وصوت وصورة وإضاءة وإنتاج عروض غامرة بأي حجم.",
  },
  {
    icon: Users,
    titleEn: "Cultural & Seasonal",
    titleAr: "ثقافية وموسمية",
    descEn: "National Day activations, heritage festivals, and seasonal programming.",
    descAr: "تفعيلات اليوم الوطني ومهرجانات التراث والبرامج الموسمية.",
  },
];

export default function FilterablePortfolio() {
  const t = useTranslations("portfolio");
  const params = useParams();
  const isAr = (params?.locale as string) === "ar";

  return (
    <SectionWrapper className="bg-white relative overflow-hidden">
      <div className="relative z-10 py-10">

        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            {isAr ? "رؤيتنا" : "Our Vision"}
          </motion.h2>
          <p className="text-neutral-500 text-[16px] leading-relaxed">
            {isAr
              ? "نحن نبني محفظتنا — اكتشف أنواع الفعاليات التي نربط العملاء بها مع أفضل مزودي الخدمات في المملكة."
              : "We're building our portfolio — discover the types of events where we connect clients with the Kingdom's best service providers."}
          </p>
        </div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800">
            <Calendar size={16} className="text-amber-600" />
            <span className="text-[13px] font-semibold">
              {isAr ? "المحفظة قيد البناء — قريباً" : "Portfolio Coming Soon — Stay Tuned"}
            </span>
          </div>
        </motion.div>

        {/* Event Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {eventCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[var(--surface-raised)] border border-neutral-200/80 rounded-2xl p-7 hover:border-[var(--primary)]/30 hover:shadow-md transition-all duration-300"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 mb-5">
                <cat.icon size={22} />
              </div>
              <h3 className="font-semibold text-neutral-900 text-[17px] mb-2" style={{ letterSpacing: "-0.01em" }}>
                {isAr ? cat.titleAr : cat.titleEn}
              </h3>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                {isAr ? cat.descAr : cat.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="text-neutral-400 text-[14px] mb-4">
            {isAr
              ? "هل تريد أن تكون من أوائل مشاريعنا؟ تواصل معنا اليوم."
              : "Want to be one of our first projects? Get in touch today."}
          </p>
          <a
            href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20discuss%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white bg-[#25D366] hover:bg-[#1fb855] transition-colors"
            style={{ boxShadow: "0 4px 14px rgba(37,211,102,0.35)" }}
          >
            {isAr ? "تواصل عبر واتساب" : "WhatsApp Us"}
          </a>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
