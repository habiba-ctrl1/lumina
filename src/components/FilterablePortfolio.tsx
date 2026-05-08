"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const portfolioItems = [
  { id: 1, src: "/gallery_wedding_reception.png", title: "Royal Palace Wedding", category: "Riyadh", slug: "royal-riyadh-wedding" },
  { id: 2, src: "/gallery_corporate_gala.png", title: "Executive Summit", category: "Jeddah", slug: "executive-summit-jeddah" },
  { id: 3, src: "/gallery_destination_wedding.png", title: "VIP Retreat", category: "Makkah", slug: "makkah-vip-retreat" },
  { id: 4, src: "/gallery_vip_party.png", title: "Luxury Soiree", category: "Riyadh", slug: "riyadh-luxury-soiree" },
  { id: 5, src: "/gallery_charity_gala.png", title: "Desert Festival", category: "AlUla", slug: "alula-desert-festival" },
  { id: 6, src: "/gallery_garden_party.png", title: "Corporate Seminar", category: "Dammam", slug: "dammam-corporate-seminar" },
  { id: 7, src: "/wedding.png", title: "Spiritual Journey Event", category: "Madinah", slug: "madinah-spiritual-event" },
  { id: 8, src: "/corporate.png", title: "Global Tech Summit", category: "Jeddah", slug: "global-tech-summit" },
  { id: 9, src: "/private_party.png", title: "Elite Majlis Gathering", category: "Riyadh", slug: "riyadh-elite-majlis" },
];

const categories = ["All", "Riyadh", "Jeddah", "Makkah", "Madinah", "AlUla", "Dammam"];

export default function FilterablePortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="section-minimal bg-white relative">
      <div className="container-minimal">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-primary text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
          >
            Gallery
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-black mb-10"
          >
            Our <span className="text-primary">Portfolio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
          >
            A curated collection of Saudi Arabia&apos;s most prestigious events.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-lg font-bold border ${
                activeCategory === category 
                  ? "bg-black text-white border-black" 
                  : "bg-transparent text-gray-400 border-gray-100 hover:border-primary hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Standard Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full overflow-hidden group cursor-pointer rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700 h-[200px] md:h-[250px]"
              >
                <Link href={item.slug !== "#" ? `/portfolio/${item.slug}` : "#"} className="block w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-[10px] text-primary uppercase tracking-[0.4em] font-bold mb-2">{item.category}</p>
                    <h3 className="text-xl md:text-2xl text-white mb-2 font-bold">{item.title}</h3>
                    <div className="w-10 h-0.5 bg-primary mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
