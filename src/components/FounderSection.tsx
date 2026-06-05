"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FounderSection() {
  const t = useTranslations("founder");
  return (
    <section className="py-28 md:py-36 bg-neutral-900 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 end-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative h-[460px] md:h-[560px] w-full overflow-hidden rounded-2xl">
              <Image
                src="/gallery_2.webp"
                alt="Founder Habiba Asghar - Saudi Event Management Luxury Event Vision"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
              className="absolute -bottom-5 -end-5 bg-neutral-800 border border-neutral-700/50 px-6 py-4 hidden md:block rounded-xl"
              style={{ boxShadow: "0 8px 24px -4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              <p className="text-emerald-400 text-2xl font-bold" style={{ letterSpacing: "-0.03em" }}>12+</p>
              <p className="text-neutral-400 text-[12px] font-medium">{t("yearsOfExcellence")}</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-emerald-400 text-[13px] font-medium mb-6 block">
              {t("label")}
            </span>
            <h2 className="text-2xl md:text-3xl text-white mb-3 font-semibold leading-tight" style={{ letterSpacing: "-0.025em" }}>
              {t("title")} <span className="text-emerald-400">{t("titleHighlight")}</span> {t("titleEnd")}
            </h2>
            <p className="text-neutral-500 text-[14px] mb-8 font-medium">
              {t("subtitle")}
            </p>

            <div className="space-y-5 text-neutral-400 text-[15px] leading-relaxed">
              <p>{t("bio1")}</p>
              <p>{t("bio2")}</p>
              <p>{t("bio3")}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-white/5">
              {t.raw("stats").map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xl md:text-2xl font-bold text-white mb-1" style={{ letterSpacing: "-0.02em" }}>{stat.number}</p>
                  <p className="text-neutral-500 text-[12px] font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
