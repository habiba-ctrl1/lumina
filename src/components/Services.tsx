"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Briefcase, Star, MapPin, Utensils, Music, ArrowRight, MessageCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useTranslations } from "next-intl";

const services = [
  {
    id: 1,
    titleKey: "Wedding Event Management",
    href: "/services/weddings",
    description: "Luxury Event Planner Saudi Arabia specializing in grand and luxurious royal weddings and traditional ceremonies.",
    icon: Heart,
    starting: "From SAR 50,000",
  },
  {
    id: 2,
    title: "Corporate Event Planning",
    href: "/services/corporate-events",
    description: "Corporate Event Planning Saudi Arabia for business summits, AGMs, and gala dinners.",
    icon: Briefcase,
    starting: "From SAR 75,000",
  },
  {
    id: 3,
    title: "Exhibition Management",
    href: "/services/exhibitions",
    description: "Exhibition Management Company organizing large-scale industry expos, trade shows, and brand launches.",
    icon: Star,
    starting: "From SAR 80,000",
  },
  {
    id: 4,
    title: "Event Production Services",
    href: "/services/event-production",
    description: "Full-scale technical Event Production Services including light, sound, special light and video shows on walls, and custom stages.",
    icon: MapPin,
    starting: "From SAR 60,000",
  },
  {
    id: 5,
    title: "Conference Management",
    href: "/services/conferences",
    description: "End-to-end Conference Management Riyadh, from getting government event licenses and international VIP planning to events with both in-person and online guests.",
    icon: Utensils,
    starting: "From SAR 45,000",
  },
  {
    id: 6,
    title: "Cultural & Seasonal Events",
    href: "/services/cultural-events",
    description: "Custom-made seasonal festivals, sports events, and national cultural events and activities across the Kingdom.",
    icon: Music,
    starting: "Custom Pricing",
  },
];

function ServiceCard({ service, index, t }: { service: typeof services[0]; index: number; t: any }) {
  const itemKey = index;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-xl p-8 flex flex-col items-start border border-neutral-200/80 transition-all duration-300 hover:border-neutral-300"
      style={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 24px -4px rgba(0,0,0,0.06), 0 4px 8px -2px rgba(0,0,0,0.03)",
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-neutral-50 flex items-center justify-center rounded-xl mb-6 border border-neutral-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-300">
        <service.icon size={22} className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors duration-300" />
      </div>

      <div className="flex-grow">
        {/* Starting price */}
        <span className="text-[12px] font-medium text-[var(--primary)] mb-3 block">
          {t(`items.${itemKey}.starting`)}
        </span>
        {/* Title */}
        <h3 className="text-lg text-neutral-900 mb-3 font-semibold group-hover:text-[var(--primary)] transition-colors duration-200" style={{ letterSpacing: "-0.02em" }}>
          {t(`items.${itemKey}.title`)}
        </h3>
        {/* Description */}
        <p className="text-neutral-500 text-[14px] leading-relaxed mb-6">
          {t(`items.${itemKey}.description`)}
        </p>
      </div>

      {/* Footer */}
      <div className="w-full mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Link 
          href={service.href}
          className="flex items-center gap-2 text-[var(--primary)] text-[13px] font-medium group-hover:gap-3 transition-all duration-200"
        >
          <span>{t("learnMore")}</span>
          <ArrowRight size={14} />
        </Link>
        <a 
          href={`https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title || "")}%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366] text-white transition-all duration-200 hover:scale-110"
          style={{
            boxShadow: "0 2px 6px rgba(37, 211, 102, 0.25)",
          }}
          title={`Contact us about ${service.title || ""} via WhatsApp`}
        >
          <MessageCircle size={14} fill="white" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations("services");
  
  return (
    <SectionWrapper className="bg-[var(--background)] relative" id="services">
      <div className="relative z-10 py-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            className="text-neutral-900 mb-5 text-3xl md:text-4xl font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-neutral-500 text-[16px] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service: any, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} t={t} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
