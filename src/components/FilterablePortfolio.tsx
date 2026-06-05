"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const portfolioItems = [
  { 
    id: 1, src: "/real_wedding.png", title: "Al-Saud Royal Wedding", category: "Luxury Weddings", 
    slug: "royal-riyadh-wedding", client: "Private Royal Commission", date: "Dec 2024",
    guests: "800+", outcome: "Architectural desert oasis build",
    alt: "Luxury royal wedding planning and setup in Riyadh Saudi Arabia"
  },
  { 
    id: 2, src: "/gallery_corporate_gala.webp", title: "NEOM Future Summit", category: "Conferences", 
    slug: "neom-future-summit", client: "Leading Saudi Giga-Project", date: "Nov 2024",
    guests: "250 VIPs", outcome: "Zero-waste luxury production",
    alt: "Enterprise conference planning and stage setup for NEOM Saudi Arabia"
  },
  { 
    id: 3, src: "/gallery_destination_wedding.webp", title: "Makkah VIP Retreat", category: "Corporate Events", 
    slug: "makkah-vip-retreat", client: "Global Islamic Foundation", date: "Oct 2024",
    guests: "50", outcome: "Exclusive spiritual concierge",
    alt: "VIP corporate retreat and spiritual concierge services in Makkah KSA"
  },
  { 
    id: 4, src: "/gallery_vip_party.webp", title: "Al-Rashid Annual Gala", category: "Corporate Events", 
    slug: "riyadh-luxury-soiree", client: "Premier Financial Institution", date: "Sept 2024",
    guests: "400", outcome: "Immersive digital art gallery",
    alt: "Corporate gala event planning and luxury soiree in Riyadh Saudi Arabia"
  },
  { 
    id: 5, src: "/gallery_charity_gala.webp", title: "AlUla Desert Festival", category: "Exhibitions", 
    slug: "alula-desert-festival", client: "National Tourism Authority", date: "Jan 2025",
    guests: "1200", outcome: "UNESCO heritage site activation",
    alt: "Cultural festival production and exhibition management in AlUla Saudi Arabia"
  },
  { 
    id: 6, src: "/gallery_2.webp", title: "Executive Summit Jeddah", category: "Conferences", 
    slug: "executive-summit-jeddah", client: "Prominent Government Ministry", date: "Feb 2025",
    guests: "150", outcome: "High-security diplomatic summit",
    alt: "Business conference and summit organizer services in Jeddah Saudi Arabia"
  }
];

const categories = ["all", "conferences", "exhibitions", "corporateEvents", "luxuryWeddings"];

export default function FilterablePortfolio() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === t(`categories.${activeCategory}` as any) || item.category.toLowerCase().replace(/ /g, '') === activeCategory.toLowerCase());

  return (
    <SectionWrapper className="bg-[var(--surface-raised)] relative overflow-hidden">
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
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h2>
          <p className="text-neutral-500 text-[16px] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200 border ${
                activeCategory === category 
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]" 
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900"
              }`}
              style={activeCategory === category ? { boxShadow: "0 2px 8px rgba(13, 107, 78, 0.2)" } : { boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
            >
              {t(`categories.${category}` as any)}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: any) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[360px] overflow-hidden rounded-2xl bg-white border border-neutral-200/80 transition-all duration-300 hover:border-neutral-300"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  <Image 
                    src={item.src} alt={item.alt} width={800} height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 end-4">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                    >
                      <span className="text-[12px] text-[var(--primary)] font-medium">
                        {(() => {
                          const catKey = Object.keys(t.raw("categories")).find(k => t(`categories.${k}`) === item.category || k.toLowerCase() === item.category.toLowerCase().replace(/ /g, ''));
                          return catKey ? t(`categories.${catKey}` as any) : item.category;
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-px bg-emerald-400 opacity-60" />
                        <span className="text-emerald-400 text-[12px] font-medium">{item.client}</span>
                      </div>
                      <h3 className="text-xl text-white mb-1 font-semibold" style={{ letterSpacing: "-0.01em" }}>{item.title}</h3>
                      
                      {/* Hover metadata */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 mt-3">
                        <div className="grid grid-cols-2 gap-3 border-t border-white/15 pt-3">
                          <div>
                            <p className="text-[11px] text-neutral-400 mb-0.5">{t("guests")}</p>
                            <p className="text-[13px] text-white font-semibold">{item.guests}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-neutral-400 mb-0.5">{t("date")}</p>
                            <p className="text-[13px] text-white font-semibold">{item.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
