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
      className="group relative bg-white rounded-xl p-8 flex flex-col items-start border border-neutral-200/80 transition-all duration-300 hover:border-[var(--primary)]/30 overflow-hidden"
      style={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 32px -6px rgba(0,0,0,0.08), 0 4px 8px -2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[var(--primary)] to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

      {/* Icon */}
      <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center rounded-xl mb-6 border border-emerald-100 group-hover:bg-emerald-100 group-hover:border-emerald-200 transition-all duration-300">
        <service.icon size={22} className="text-[var(--primary)]" />
      </div>

      <div className="flex-grow">
        {/* Investment badge — premium gold micro-badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase border border-[var(--gold)]/50 bg-[var(--gold-muted)] text-[var(--gold-hover)] px-3 py-1.5 rounded-md mb-5">
          {t(`items.${itemKey}.starting`)}
        </span>
        {/* Title */}
        <h3 className="text-[17px] text-neutral-900 mb-3 font-semibold group-hover:text-[var(--primary)] transition-colors duration-200" style={{ letterSpacing: "-0.02em", lineHeight: 1.35 }}>
          {t(`items.${itemKey}.title`)}
        </h3>
        {/* Description */}
        <p className="text-neutral-500 text-[13.5px] leading-relaxed mb-6">
          {t(`items.${itemKey}.description`)}
        </p>
      </div>

      {/* Footer */}
      <div className="w-full mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between gap-4">
        <Link
          href={service.href}
          className="flex items-center gap-1.5 text-[var(--primary)] text-[13px] font-semibold group-hover:gap-2.5 transition-all duration-200"
        >
          <span className="border-b border-[var(--primary)]/30 group-hover:border-[var(--primary)] pb-px transition-colors">
            {t(`items.${itemKey}.cta`)}
          </span>
          <ArrowRight size={13} />
        </Link>
        <a
          href={`https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20${encodeURIComponent(t(`items.${itemKey}.title`))}%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366] text-white transition-all duration-200 hover:scale-110"
          style={{ boxShadow: "0 2px 6px rgba(37, 211, 102, 0.25)" }}
          aria-label={`WhatsApp enquiry for ${t(`items.${itemKey}.title`)}`}
        >
          <MessageCircle size={14} fill="white" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services({ showAllServicesLink = true }: { showAllServicesLink?: boolean }) {
  const t = useTranslations("services");

  return (
    <SectionWrapper className="bg-neutral-50/60 relative" id="services">
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

        {/* View all services */}
        {showAllServicesLink && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold text-sm border border-[var(--primary)]/30 rounded-full px-7 py-3.5 hover:bg-[var(--primary)]/5 transition-colors"
            >
              View All Event Management Services
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
