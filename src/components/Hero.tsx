"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_bg.png"
          alt="Luxury Event"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-charcoal-900/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-6">
            Premier <span className="text-gold-500 font-semibold italic">Event Management</span> Services
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            We are a premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] w-full sm:w-auto text-center"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass hover:bg-white/10 text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300 w-full sm:w-auto text-center"
          >
            Book Consultation
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-gray-400 text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-gold-500 to-transparent"
        />
      </motion.div>
    </div>
  );
}
