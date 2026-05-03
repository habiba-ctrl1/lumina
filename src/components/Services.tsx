"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    id: 1,
    num: "01",
    title: "Royal Weddings",
    description: "Opulent wedding planning specializing in grand ballroom settings and traditional royal ceremonies across the Middle East.",
    image: "/wedding.png",
    seoAlt: "Luxury royal wedding planning in Saudi Arabia and Pakistan",
    details: ["Royal Ballrooms", "Arabic Catering", "Floral Installations", "Zaffa Processions", "Bridal Suites"],
    starting: "Starting from SAR 50,000",
  },
  {
    id: 2,
    num: "02",
    title: "Majlis & Corporate",
    description: "Sophisticated Majlis arrangements and high-profile corporate summits designed for executive networking and brand prestige.",
    image: "/corporate.png",
    seoAlt: "High-end Majlis and corporate event management in KSA",
    details: ["Majlis Design", "VIP Hospitality", "Government Summits", "Audio-Visual Excellence", "Catering Curation"],
    starting: "Starting from SAR 75,000",
  },
  {
    id: 3,
    num: "03",
    title: "Elite Birthdays",
    description: "Bespoke milestone celebrations and private gatherings in exclusive villas or desert resorts, tailored to perfection.",
    image: "/private_party.png",
    seoAlt: "Elite private party and milestone birthday planning in Saudi Arabia",
    details: ["Villa Events", "Desert Resort Galas", "Bespoke Cakes", "Live Orchestras", "Guest Concierge"],
    starting: "Starting from SAR 25,000",
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
        className="group relative overflow-hidden bg-charcoal-800 border border-white/5 hover:border-gold-500/30 transition-colors duration-700 cursor-pointer"
      >
        {/* Number tag */}
        <div className="absolute top-6 left-6 z-20 text-gold-500/20 text-6xl font-display font-bold select-none group-hover:text-gold-500/40 transition-colors duration-500">
          {service.num}
        </div>

        {/* Image */}
        <div className="relative h-[320px] md:h-[380px] lg:h-[420px] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.seoAlt}
            fill
            className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          {/* Gold line */}
          <div className="w-10 h-[2px] bg-gold-500 mb-4 group-hover:w-16 transition-all duration-500" />

          <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
            {service.title}
          </h3>

          {/* Starting price */}
          <p className="text-gold-500/70 text-xs uppercase tracking-[0.2em] font-medium mb-3">
            {service.starting}
          </p>

          <p className="text-gray-300/80 text-sm leading-relaxed mb-4 max-w-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {service.description}
          </p>

          {/* Sub-services */}
          <div className="flex flex-wrap gap-2 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
            {service.details.map((detail, i) => (
              <span key={i} className="text-[10px] text-gray-400 uppercase tracking-wider border border-white/10 px-2.5 py-1">
                {detail}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gold-500 text-sm font-semibold uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
            <span>Learn More</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28 bg-charcoal-900 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-6"
          >
            Our <span className="text-shimmer font-semibold italic">Expertise</span>
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
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
          >
            Delivering unparalleled excellence across diverse event categories.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
