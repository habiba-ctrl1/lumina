"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const portfolioItems = [
  {
    id: 1, src: "/luxury_wedding_couple_guests.webp", title: "Al-Saud Royal Wedding", category: "Luxury Weddings",
    slug: "royal-riyadh-wedding", client: "Private Royal Commission", date: "Dec 2024",
    guests: "800+", outcome: "Architectural desert oasis build", location: "Riyadh",
    services: "Design · Production · VIP Protocol",
    alt: "Luxury royal wedding guests celebrating in a grand Saudi Arabia wedding hall"
  },
  {
    id: 2, src: "/neom_summit_people.webp", title: "NEOM Future Summit", category: "Conferences",
    slug: "neom-future-summit", client: "Leading Saudi Giga-Project", date: "Nov 2024",
    guests: "250 VIPs", outcome: "Zero-waste luxury production", location: "NEOM",
    services: "Conference · Staging · Delegate Management",
    alt: "VIPs and speakers at a high-tech NEOM summit stage in Saudi Arabia"
  },
  {
    id: 3, src: "/portfolio/makkah-vip-retreat.webp", title: "Makkah VIP Retreat", category: "VIP & Private",
    slug: "makkah-vip-retreat", client: "VIP Delegation", date: "Oct 2024",
    guests: "VIP Delegation", outcome: "10-day ultra-luxury private retreat", location: "Makkah",
    services: "Security · Private Dining · Haram Logistics",
    alt: "Ultra-luxury private VIP retreat villa setting in Makkah, Saudi Arabia"
  },
  {
    id: 4, src: "/riyadh_summit_people.webp", title: "Riyadh Government Summit", category: "Conferences",
    slug: "riyadh-government-summit", client: "Premier Government Ministry", date: "Sept 2024",
    guests: "1,200+", outcome: "Immersive multi-screen production", location: "Riyadh",
    services: "Conference · Multi-screen · Protocol",
    alt: "Large audience and immersive screens at a high-level government summit in Riyadh Saudi Arabia"
  },
  {
    id: 5, src: "/portfolio/alula-festival.webp", title: "AlUla Desert Festival", category: "Cultural Events",
    slug: "alula-desert-festival", client: "National Cultural Activation", date: "Jan 2025",
    guests: "5,000+ Daily", outcome: "Heritage desert festival production", location: "AlUla",
    services: "Staging · Lighting · Audience Experience",
    alt: "Heritage desert festival staging and lighting in AlUla's Ashar Valley, Saudi Arabia"
  },
  {
    id: 6, src: "/jeddah_luxury_people.webp", title: "Jeddah Executive Soiree", category: "Corporate Events",
    slug: "executive-summit-jeddah", client: "Prominent Government Ministry", date: "Feb 2025",
    guests: "300", outcome: "High-security diplomatic summit", location: "Jeddah",
    services: "Corporate · Hospitality · Security",
    alt: "Elegant guests networking at a high-end luxury hotel event in Jeddah Saudi Arabia"
  },
  {
    id: 7, src: "/jeddah_beach_wedding_setup.webp", title: "Jeddah Seaside Wedding", category: "Luxury Weddings",
    slug: "jeddah-beach-wedding", client: "Private Family Commission", date: "Mar 2025",
    guests: "450", outcome: "Luxury Red Sea coastal production", location: "Jeddah",
    services: "Design · Floral · Coastal Production",
    alt: "Luxurious seaside wedding setup with guests on the Red Sea coast in Jeddah"
  },
  {
    id: 8, src: "/alkhobar_corporate_people.webp", title: "Al Khobar Corporate Retreat", category: "Corporate Events",
    slug: "alkhobar-corporate-retreat", client: "Saudi Aramco Subsidiary", date: "Apr 2025",
    guests: "120", outcome: "Executive team building & branding", location: "Al Khobar",
    services: "Corporate · Branding · Team Building",
    alt: "Professional corporate team at a branded Eastern Province event in Al Khobar Saudi Arabia"
  },
  {
    id: 9, src: "/wedding_hall_grand_entrance.webp", title: "Grand Wedding Ceremony", category: "Luxury Weddings",
    slug: "grand-wedding-ceremony", client: "Private Royal Commission", date: "May 2025",
    guests: "600+", outcome: "Traditional VIP entrance protocol", location: "Riyadh",
    services: "Design · Production · VIP Protocol",
    alt: "Traditional male wedding entrance with VIP guests in a grand Saudi Arabia wedding hall"
  },
];

const categories = ["all", "conferences", "corporateEvents", "luxuryWeddings", "vipPrivate", "cultural"];

export default function FilterablePortfolio() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === t(`categories.${activeCategory}` as any) || item.category.toLowerCase().replace(/ /g, '') === activeCategory.toLowerCase());

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
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h2>
          <p className="text-neutral-500 text-[16px] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters — layoutId animated sliding pill */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 text-[13px] font-medium rounded-lg border overflow-hidden transition-colors duration-200 ${
                activeCategory === category
                  ? "border-[var(--primary)]"
                  : "bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
              style={activeCategory !== category ? { boxShadow: "0 1px 2px rgba(0,0,0,0.04)" } : {}}
            >
              {activeCategory === category && (
                <motion.span
                  layoutId="portfolio-tab-pill"
                  className="absolute inset-0 bg-[var(--primary)]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  style={{ boxShadow: "0 2px 8px rgba(13,107,78,0.22)" }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === category ? "text-white" : ""}`}>
                {t(`categories.${category}` as any)}
              </span>
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
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full" aria-label={`View case study: ${item.title} — ${item.category} in ${item.location}`}>
                  <Image
                    src={item.src} alt={item.alt} width={800} height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      <h3 className="text-xl text-white mb-1.5 font-semibold" style={{ letterSpacing: "-0.01em" }}>{item.title}</h3>
                      <div className="flex items-center gap-1.5 text-white/80 text-[12.5px]">
                        <MapPin size={13} className="text-emerald-400 shrink-0" />
                        <span>{item.location}, Saudi Arabia</span>
                      </div>

                      {/* Hover metadata */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 mt-3">
                        <p className="text-[12.5px] text-neutral-300 leading-snug mb-3">{item.services}</p>
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
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[12.5px] font-semibold mt-3">
                          View case study
                          <ArrowRight size={13} className="rtl:rotate-180" />
                        </span>
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
