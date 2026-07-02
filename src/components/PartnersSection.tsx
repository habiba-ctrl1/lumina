"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Globe, Building2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const pillars = [
  {
    icon: Target,
    titleEn: "Quality First",
    titleAr: "الجودة أولاً",
    descEn: "Every vendor in our network is personally vetted to meet international event standards.",
    descAr: "كل مورد في شبكتنا معتمد شخصياً لتلبية معايير الفعاليات الدولية.",
  },
  {
    icon: Sparkles,
    titleEn: "Vision 2030 Aligned",
    titleAr: "متوائم مع رؤية 2030",
    descEn: "Supporting the Kingdom's transformation by connecting the events industry with world-class talent.",
    descAr: "دعم تحول المملكة من خلال ربط صناعة الفعاليات بالكفاءات العالمية.",
  },
  {
    icon: Globe,
    titleEn: "Kingdom-Wide",
    titleAr: "تغطية المملكة",
    descEn: "Building vendor coverage across Riyadh, Jeddah, Dammam, AlUla, and beyond.",
    descAr: "بناء تغطية للموردين عبر الرياض وجدة والدمام والعلا وغيرها.",
  },
  {
    icon: Building2,
    titleEn: "B2B Focused",
    titleAr: "تركيز B2B",
    descEn: "A professional platform designed for corporate clients and event organisers.",
    descAr: "منصة احترافية مصممة للعملاء من الشركات ومنظمي الفعاليات.",
  },
];

export default function PartnersSection() {
  const t = useTranslations("partners");
  const params = useParams();
  const isAr = (params?.locale as string) === "ar";

  return (
    <SectionWrapper id="clients" className="bg-[var(--surface-tinted)] bg-emerald-dots relative overflow-hidden">
      <div className="relative z-10 py-10">

        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="section-label justify-center">
            <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            {t("trustedBy")}
          </span>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-600 text-[15px] leading-relaxed mt-6 max-w-xl mx-auto"
          >
            {t.raw("testimonials")[0].quote}
          </motion.p>
        </div>

        {/* Value Pillars Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-neutral-200/80 rounded-2xl p-6 text-center hover:border-[var(--primary)]/30 hover:shadow-md transition-all duration-300"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 mx-auto mb-4">
                <pillar.icon size={22} />
              </div>
              <h3 className="font-semibold text-neutral-900 text-[15px] mb-2">
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed">
                {isAr ? pillar.descAr : pillar.descEn}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
