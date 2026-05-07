"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Heart, Briefcase, GlassWater, MapPin, Flower2, Utensils, Music, Map, Star } from "lucide-react";
import { useRef } from "react";


const services = [
  {
    id: 1,
    title: "Wedding & Celebrations",
    href: "/services/weddings",
    description: "Opulent wedding planning specializing in grand ballroom settings and traditional royal ceremonies.",
    icon: Heart,
    starting: "From SAR 50,000",
  },
  {
    id: 2,
    title: "Corporate Galas",
    href: "/services/corporate-events",
    description: "High-profile corporate summits and galas designed for executive networking and brand prestige.",
    icon: Briefcase,
    starting: "From SAR 75,000",
  },
  {
    id: 3,
    title: "Private Events",
    href: "/services/private-events",
    description: "Bespoke milestone celebrations and private gatherings in exclusive villas or desert resorts.",
    icon: GlassWater,
    starting: "From SAR 25,000",
  },
  {
    id: 4,
    title: "Destination Events",
    href: "/services/destination",
    description: "Seamlessly executed luxury destination weddings and events across global hotspots.",
    icon: MapPin,
    starting: "From SAR 100,000",
  },
  {
    id: 5,
    title: "Floral & Décor",
    href: "/services/floral-decor",
    description: "Breathtaking floral installations and custom spatial design tailored to your vision.",
    icon: Flower2,
    starting: "From SAR 15,000",
  },
  {
    id: 6,
    title: "Catering Curation",
    href: "/services/catering",
    description: "Exquisite culinary experiences featuring world-class chefs and bespoke menus.",
    icon: Utensils,
    starting: "From SAR 450 / Guest",
  },
  {
    id: 7,
    title: "Entertainment Booking",
    href: "/services/entertainment",
    description: "Exclusive access to top-tier performers, live orchestras, and cultural entertainment.",
    icon: Music,
    starting: "From SAR 20,000",
  },
  {
    id: 8,
    title: "Venue Sourcing",
    href: "/services/venue-sourcing",
    description: "Securing the most prestigious and exclusive palaces, resorts, and ballrooms.",
    icon: Map,
    starting: "From SAR 5,000 (Sourcing Fee)",
  },
  {
    id: 9,
    title: "VIP Guest Management",
    href: "/services/vip-management",
    description: "Impeccable concierge services, travel coordination, and on-site VIP hospitality.",
    icon: Star,
    starting: "Custom Pricing",
  },
];

/* 3D Tilt Card Component */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.19, 1, 0.22, 1] }}
      className="perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700 cursor-pointer rounded-sm p-10 flex flex-col items-start justify-between"
      >
        <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center rounded-full mb-8 group-hover:bg-gold-50 group-hover:border-gold-500/20 transition-all duration-500">
          <service.icon size={28} className="text-[#041E42] group-hover:text-gold-500 transition-colors duration-500" />
        </div>

        <div>
          <h3 className="text-2xl font-display font-medium text-[#041E42] mb-3 group-hover:text-champagne-500 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {service.description}
          </p>
        </div>

        <div className="w-full mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[#041E42]/60 text-[10px] uppercase tracking-[0.2em] font-medium">
            {service.starting}
          </p>
          <Link 
            href={service.href}
            className="flex items-center gap-2 text-champagne-500 text-[11px] font-bold uppercase tracking-[0.1em]"
          >
            <span>Learn more</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-8 block"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-display text-[#041E42] mb-12"
          >
            Curated <span className="text-shimmer italic font-medium">Services</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto text-[10px] uppercase tracking-[0.3em]"
          >
            Delivering unparalleled excellence across diverse event categories.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
