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

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-minimal flex flex-col items-start group hover:-translate-y-2.5 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-xl mb-8 group-hover:bg-primary/10 transition-colors duration-300">
        <service.icon size={24} className="text-black" />
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-tight">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      <div className="w-full pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {service.starting}
        </span>
        <Link 
          href={`https://wa.me/966501234567?text=I%20am%20interested%20in%20the%20${encodeURIComponent(service.title)}%20service.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-md"
        >
          <span>Book via WhatsApp</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-minimal bg-white">
      <div className="container-minimal">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
          >
            Capabilities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-black mb-10 text-3xl md:text-5xl font-sans font-bold uppercase tracking-tight"
          >
            Curated <span className="text-primary font-bold">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
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
