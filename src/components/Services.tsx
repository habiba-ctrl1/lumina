"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Luxury Weddings",
    description: "Bespoke wedding planning with meticulous attention to detail, transforming your special day into a timeless masterpiece.",
    image: "/wedding.png",
    seoAlt: "Luxury wedding planning and premium coordination services",
  },
  {
    id: 2,
    title: "Corporate Galas",
    description: "Elevate your brand with high-end corporate events, conferences, and executive retreats designed to impress.",
    image: "/corporate.png",
    seoAlt: "High-end corporate gala and executive retreat event management",
  },
  {
    id: 3,
    title: "Private Parties",
    description: "Exclusive VIP events, milestone birthdays, and private dinners crafted for the ultimate sophisticated experience.",
    image: "/private_party.png",
    seoAlt: "Exclusive private party, VIP event, and milestone birthday planning",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-charcoal-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-light text-white mb-4"
          >
            Our <span className="text-gold-500 font-semibold italic">Expertise</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gold-500 mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Delivering unparalleled excellence across diverse event categories.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden bg-charcoal-800 border border-white/5 hover:border-gold-500/30 transition-colors duration-500"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.seoAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-gold-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {service.description}
                </p>
                <div className="flex items-center text-gold-500 text-sm font-semibold uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  Discover More <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
