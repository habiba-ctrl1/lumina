"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "GEA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/General_Entertainment_Authority_Saudi_Arabia_logo.svg/512px-General_Entertainment_Authority_Saudi_Arabia_logo.svg.png" },
  { name: "NEOM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/NEOM_Logo.svg/512px-NEOM_Logo.svg.png" },
  { name: "Vision 2030", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Saudi_Vision_2030_logo.svg/512px-Saudi_Vision_2030_logo.svg.png" },
  { name: "Ministry of Culture", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ministry_of_Culture_Saudi_Arabia_logo.svg/512px-Ministry_of_Culture_Saudi_Arabia_logo.svg.png" },
  { name: "Riyadh Season", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Riyadh_Season_logo.svg/512px-Riyadh_Season_logo.svg.png" },
  { name: "Red Sea Global", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Red_Sea_Global_Logo.png/512px-Red_Sea_Global_Logo.png" },
  { name: "Diriyah Gate", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Diriyah_Gate_Development_Authority_logo.svg/512px-Diriyah_Gate_Development_Authority_logo.svg.png" },
  { name: "Saudia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Saudia_Logo.svg/512px-Saudia_Logo.svg.png" },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 bg-white overflow-hidden border-y border-gray-50">
      <div className="container-luxury">
        <div className="text-center mb-10">
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
              className="text-primary text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold mb-4 block"
            >
              The Luxury Circle
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-bold text-black mb-4 uppercase tracking-tight"
            >
              Our Trusted <span className="text-primary italic">Partners</span>
            </motion.h2>
          </motion.div>
          <p className="text-gray-400 max-w-2xl mx-auto text-[13px] leading-relaxed">
            Collaborating with the world's most prestigious brands and suppliers to deliver excellence beyond expectations.
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="relative group mt-16">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

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
                      alt={`${partner.name} Corporate Logo`}
                      fill
                      unoptimized
                      className="object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 filter brightness-0 group-hover:brightness-100"
                      sizes="180px"
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
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-primary transition-colors border-b border-gray-100 pb-1"
          >
            Become a Partner &rarr;
          </motion.a>
        </div>
      </div>
    </section>
  );
}
