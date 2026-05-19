"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "GEA", logo: "/partners/gea.webp", alt: "General Entertainment Authority GEA — partner of Saudi Event Management" },
  { name: "NEOM", logo: "/partners/neom.webp", alt: "NEOM Saudi Arabia — partner of Saudi Event Management company" },
  { name: "Vision 2030", logo: "/partners/vision2030.webp", alt: "Saudi Vision 2030 partner of Saudi Event Management" },
  { name: "Ministry of Culture", logo: "/partners/moc.webp", alt: "Saudi Ministry of Culture partner event management company" },
  { name: "Riyadh Season", logo: "/partners/riyadh_season.svg", alt: "Riyadh Season partner of Saudi Event Management" },
  { name: "Red Sea Global", logo: "/partners/red_sea.svg", alt: "Red Sea Global partner of Saudi Event Management" },
  { name: "Diriyah Gate", logo: "/partners/diriyah.svg", alt: "Diriyah Gate partner of Saudi Event Management" },
  { name: "Saudia", logo: "/partners/saudia.svg", alt: "Saudia partner of Saudi Event Management" },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-24 bg-ink-950 overflow-hidden border-y border-ink-800 relative">
      <div className="container-luxury relative z-10">
        <div className="text-center mb-16">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-400 text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium mb-4 block"
            >
              The Luxury Circle
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl font-medium text-sand-50 mb-4 uppercase tracking-tighter"
            >
              Our Trusted <span className="text-gold-400 italic font-light">Partners</span>
            </motion.h2>
          </motion.div>
          <p className="text-sand-400 max-w-2xl mx-auto text-[13px] leading-relaxed">
            Collaborating with the world's most prestigious brands and suppliers to deliver excellence beyond expectations.
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative group mt-20">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink-950 to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-12 py-10"
              animate={{
                x: [0, -1920], // Adjust based on content width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {/* Double the array for seamless loop */}
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="group relative w-[140px] h-[80px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer scale-90 hover:scale-105"
                >
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={180}
                      height={80}
                      unoptimized
                      className="w-full h-full object-contain opacity-30 group-hover:opacity-100 transition-all duration-500 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <motion.a
            href="/partners/become-one"
            whileHover={{ scale: 1.05 }}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-sand-500 hover:text-gold-400 transition-colors border-b border-ink-800 hover:border-gold-400/50 pb-1"
          >
            Become a Partner &rarr;
          </motion.a>
        </div>
      </div>
    </section>
  );
}
