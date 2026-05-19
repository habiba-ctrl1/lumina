"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Heart, Briefcase, GlassWater, MapPin, Flower2, Utensils, Music, Map, Star } from "lucide-react";
import { useRef } from "react";


const services = [
  {
    id: 1,
    title: "Wedding Event Management",
    href: "/services/luxury-wedding-planning-saudi-arabia",
    description: "Luxury Event Planner Saudi Arabia specializing in grand and luxurious royal weddings and traditional ceremonies.",
    icon: Heart,
    starting: "From SAR 50,000",
  },
  {
    id: 2,
    title: "Corporate Event Planning",
    href: "/services/corporate-events-riyadh",
    description: "Corporate Event Planning Saudi Arabia for business summits, AGMs, and gala dinners.",
    icon: Briefcase,
    starting: "From SAR 75,000",
  },
  {
    id: 3,
    title: "Exhibition Management",
    href: "/services/exhibition-management-saudi-arabia",
    description: "Exhibition Management Company organizing large-scale industry expos, trade shows, and brand launches.",
    icon: Star,
    starting: "From SAR 80,000",
  },
  {
    id: 4,
    title: "Event Production Services",
    href: "/services/event-production-saudi-arabia",
    description: "Full-scale technical Event Production Services including light, sound, special light and video shows on walls, and custom stages.",
    icon: MapPin,
    starting: "From SAR 60,000",
  },
  {
    id: 5,
    title: "Conference Management",
    href: "/services/conference-management-riyadh",
    description: "End-to-end Conference Management Riyadh, from getting government event licenses and international VIP planning to events with both in-person and online guests.",
    icon: Utensils,
    starting: "From SAR 45,000",
  },
  {
    id: 6,
    title: "Saudi Event Organizer",
    href: "/#contact",
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
      className="bg-ink-900 border border-ink-600 rounded-sm p-8 flex flex-col items-start group hover:-translate-y-2.5 transition-all duration-300 ease-in-out cursor-pointer card-hover"
    >
      <div className="w-14 h-14 bg-ink-950 flex items-center justify-center rounded-sm mb-8 group-hover:bg-gold-400/10 transition-colors duration-300 border border-ink-600">
        <service.icon size={24} className="text-gold-400" />
      </div>

      <div className="flex-grow">
        <h3 className="font-display font-medium text-lg text-sand-50 mb-4 uppercase tracking-tight">
          {service.title}
        </h3>
        <p className="text-sand-400 text-sm leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      <div className="w-full pt-6 border-t border-ink-600 flex items-center justify-between mt-auto">
        <span className="text-[10px] font-bold text-sand-400 uppercase tracking-widest">
          {service.starting}
        </span>
        <Link 
          href={service.href}
          className="flex items-center gap-2 bg-gold-400 text-ink-950 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-sm hover:bg-gold-500 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          <span>Learn More</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-ink-950 relative border-t border-ink-600">
      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-medium text-sand-50 mb-10 text-3xl md:text-5xl uppercase tracking-tight"
          >
            Specially Selected <span className="text-shimmer italic">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sand-400 max-w-2xl mx-auto text-sm leading-relaxed"
          >
            From royal weddings to corporate summits, we deliver unparalleled excellence 
            across every category of event management.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
