"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const portfolioItems = [
  { 
    id: 1, 
    src: "/gallery_wedding_reception.webp", 
    title: "Al-Saud Royal Wedding", 
    category: "Riyadh", 
    slug: "royal-riyadh-wedding",
    client: "Royal Family Office",
    date: "Dec 2024",
    guests: "800+",
    outcome: "Architectural desert oasis build"
  },
  { 
    id: 2, 
    src: "/gallery_corporate_gala.webp", 
    title: "NEOM Future Summit", 
    category: "Riyadh", 
    slug: "neom-future-summit",
    client: "NEOM Authority",
    date: "Nov 2024",
    guests: "250 VIPs",
    outcome: "Zero-waste luxury production"
  },
  { 
    id: 3, 
    src: "/gallery_destination_wedding.webp", 
    title: "Makkah VIP Retreat", 
    category: "Makkah", 
    slug: "makkah-vip-retreat",
    client: "Private Office",
    date: "Oct 2024",
    guests: "50",
    outcome: "Exclusive spiritual concierge"
  },
  { 
    id: 4, 
    src: "/gallery_vip_party.webp", 
    title: "Al-Rashid Annual Gala", 
    category: "Riyadh", 
    slug: "riyadh-luxury-soiree",
    client: "Al-Rashid Group",
    date: "Sept 2024",
    guests: "400",
    outcome: "Immersive digital art gallery"
  },
  { 
    id: 5, 
    src: "/gallery_charity_gala.webp", 
    title: "AlUla Desert Festival", 
    category: "AlUla", 
    slug: "alula-desert-festival",
    client: "Royal Commission for AlUla",
    date: "Jan 2025",
    guests: "1200",
    outcome: "UNESCO heritage site activation"
  },
  { 
    id: 6, 
    src: "/gallery_2.webp", 
    title: "Executive Summit Jeddah", 
    category: "Jeddah", 
    slug: "executive-summit-jeddah",
    client: "Ministry of Investment",
    date: "Feb 2025",
    guests: "150",
    outcome: "High-security diplomatic summit"
  }
];

const categories = ["All", "Riyadh", "Jeddah", "Makkah", "AlUla"];

export default function FilterablePortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-luxury relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-primary text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block"
          >
            Portfolio of Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-black text-2xl md:text-4xl font-bold mb-4 uppercase tracking-tight"
          >
            Recent <span className="text-primary">Masterpieces</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-[13px] font-light leading-relaxed">
            From royal weddings to high-stakes summits, we define the standard of Saudi luxury events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-10 py-3.5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 rounded-full font-bold border ${
                activeCategory === category 
                  ? "bg-black text-white border-black shadow-xl" 
                  : "bg-transparent text-gray-400 border-gray-100 hover:border-black hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="group relative h-[320px] overflow-hidden rounded-[2rem] bg-gray-900 border border-gray-100"
              >
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-8 right-8 overflow-hidden rounded-full">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2">
                       <span className="text-[9px] text-white uppercase tracking-widest font-bold">{item.category}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-px bg-primary" />
                        <span className="text-primary text-[9px] uppercase tracking-widest font-bold">{item.client}</span>
                      </div>
                      <h3 className="text-xl text-white mb-3 font-bold tracking-tight">{item.title}</h3>
                      
                      {/* Detailed Metadata (Visible on Hover) */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mb-6">
                           <div>
                             <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Guests</p>
                             <p className="text-xs text-white font-bold">{item.guests}</p>
                           </div>
                           <div>
                             <p className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Date</p>
                             <p className="text-xs text-white font-bold">{item.date}</p>
                           </div>
                        </div>
                        <p className="text-[10px] text-gray-300 leading-relaxed font-light italic">
                          &quot;{item.outcome}&quot;
                        </p>
                      </div>
                    </div>
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
