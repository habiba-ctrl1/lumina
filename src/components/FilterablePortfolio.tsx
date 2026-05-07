"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const portfolioItems = [
  { id: 1, src: "/gallery_wedding_reception.png", title: "Royal Riyadh Wedding", category: "Weddings", slug: "royal-riyadh-wedding", height: "h-[400px]" },
  { id: 2, src: "/gallery_corporate_gala.png", title: "Executive Summit Jeddah", category: "Corporate", slug: "executive-summit-jeddah", height: "h-[320px]" },
  { id: 3, src: "/gallery_destination_wedding.png", title: "Elite Majlis Gathering", category: "Private", slug: "elite-majlis-gathering", height: "h-[450px]" },
  { id: 4, src: "/gallery_vip_party.png", title: "Dubai Luxury Soiree", category: "Private", slug: "dubai-luxury-soiree", height: "h-[360px]" },
  { id: 5, src: "/gallery_charity_gala.png", title: "Dubai Sands Festival", category: "Culture", slug: "dubai-sands-festival", height: "h-[500px]" },
  { id: 6, src: "/gallery_garden_party.png", title: "Desert Resort Oasis", category: "Private", slug: "desert-resort-oasis", height: "h-[310px]" },
  { id: 7, src: "/wedding.png", title: "AlUla Destination Wedding", category: "Weddings", slug: "alula-destination-wedding", height: "h-[440px]" },
  { id: 8, src: "/corporate.png", title: "Global Tech Summit", category: "Corporate", slug: "global-tech-summit", height: "h-[380px]" },
  { id: 9, src: "/private_party.png", title: "VIP Yacht Celebration", category: "Private", slug: "vip-yacht-celebration", height: "h-[410px]" },
];

const categories = ["All", "Weddings", "Corporate", "Private", "Culture"];

export default function FilterablePortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-8 block"
          >
            Our Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-6xl font-display text-[#041E42] mb-12"
          >
            Event <span className="text-shimmer italic font-medium">Portfolio</span>
          </motion.h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-500 rounded-full border ${
                activeCategory === category 
                  ? "bg-[#041E42] text-white border-[#041E42]" 
                  : "bg-transparent text-gray-500 border-gray-200 hover:border-champagne-500 hover:text-[#041E42]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`relative w-full overflow-hidden group cursor-pointer break-inside-avoid rounded-sm ${item.height}`}
              >
                <Link href={item.slug !== "#" ? `/portfolio/${item.slug}` : "#"} className="block w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-110" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041E42]/90 via-[#041E42]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] text-champagne-500 uppercase tracking-[0.3em] font-medium mb-3">{item.category}</p>
                    <h3 className="text-2xl font-display text-white mb-2">{item.title}</h3>
                    <div className="w-8 h-px bg-champagne-500 mt-4 group-hover:w-16 transition-all duration-700" />
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
