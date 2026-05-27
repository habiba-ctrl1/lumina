"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Briefcase, Star, MapPin, Utensils, Music, ArrowRight, MessageCircle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const services = [
  {
    id: 1,
    title: "Wedding Event Management",
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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl p-8 md:p-10 flex flex-col items-start group hover:-translate-y-2 transition-all duration-300 ease-in-out border border-slate-200 shadow-sm hover:shadow-xl"
    >
      <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-lg mb-8 group-hover:bg-teal-50 transition-colors duration-300">
        <service.icon size={26} className="text-slate-400 group-hover:text-[var(--primary)] transition-colors duration-300" />
      </div>

      <div className="flex-grow">
        <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest mb-3 block">
          {service.starting}
        </span>
        <h3 className="font-display font-bold text-xl text-slate-900 mb-4 tracking-tight group-hover:text-[var(--primary)] transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      <div className="w-full mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
        <Link 
          href={service.href}
          className="flex items-center gap-2 text-[var(--primary)] text-[11px] font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300"
        >
          <span>Learn More</span>
          <ArrowRight size={14} />
        </Link>
        <a 
          href={`https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
          title={`Contact us about ${service.title} via WhatsApp`}
        >
          <MessageCircle size={14} fill="white" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <SectionWrapper className="bg-slate-50 relative" id="services">
      <div className="relative z-10 py-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <span className="w-12 h-[2px] bg-[var(--primary)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
              Capabilities
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-slate-900 mb-6 text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase"
          >
            Specially Selected <span className="text-[var(--primary)] font-bold">Services</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-600 text-base leading-relaxed"
          >
            From royal weddings to corporate summits, we deliver unparalleled excellence 
            across every category of event management.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
