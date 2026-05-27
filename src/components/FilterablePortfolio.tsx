"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

const portfolioItems = [
  { 
    id: 1, 
    src: "/real_wedding.png", 
    title: "Al-Saud Royal Wedding", 
    category: "Luxury Weddings", 
    slug: "royal-riyadh-wedding",
    client: "Private Royal Commission",
    date: "Dec 2024",
    guests: "800+",
    outcome: "Architectural desert oasis build",
    alt: "Luxury royal wedding planning and setup in Riyadh Saudi Arabia"
  },
  { 
    id: 2, 
    src: "/gallery_corporate_gala.webp", 
    title: "NEOM Future Summit", 
    category: "Conferences", 
    slug: "neom-future-summit",
    client: "Leading Saudi Giga-Project",
    date: "Nov 2024",
    guests: "250 VIPs",
    outcome: "Zero-waste luxury production",
    alt: "Enterprise conference planning and stage setup for NEOM Saudi Arabia"
  },
  { 
    id: 3, 
    src: "/gallery_destination_wedding.webp", 
    title: "Makkah VIP Retreat", 
    category: "Corporate Events", 
    slug: "makkah-vip-retreat",
    client: "Global Islamic Foundation",
    date: "Oct 2024",
    guests: "50",
    outcome: "Exclusive spiritual concierge",
    alt: "VIP corporate retreat and spiritual concierge services in Makkah KSA"
  },
  { 
    id: 4, 
    src: "/gallery_vip_party.webp", 
    title: "Al-Rashid Annual Gala", 
    category: "Corporate Events", 
    slug: "riyadh-luxury-soiree",
    client: "Premier Financial Institution",
    date: "Sept 2024",
    guests: "400",
    outcome: "Immersive digital art gallery",
    alt: "Corporate gala event planning and luxury soiree in Riyadh Saudi Arabia"
  },
  { 
    id: 5, 
    src: "/gallery_charity_gala.webp", 
    title: "AlUla Desert Festival", 
    category: "Exhibitions", 
    slug: "alula-desert-festival",
    client: "National Tourism Authority",
    date: "Jan 2025",
    guests: "1200",
    outcome: "UNESCO heritage site activation",
    alt: "Cultural festival production and exhibition management in AlUla Saudi Arabia"
  },
  { 
    id: 6, 
    src: "/gallery_2.webp", 
    title: "Executive Summit Jeddah", 
    category: "Conferences", 
    slug: "executive-summit-jeddah",
    client: "Prominent Government Ministry",
    date: "Feb 2025",
    guests: "150",
    outcome: "High-security diplomatic summit",
    alt: "Business conference and summit organizer services in Jeddah Saudi Arabia"
  }
];

const categories = ["All", "Conferences", "Exhibitions", "Corporate Events", "Luxury Weddings"];

export default function FilterablePortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <SectionWrapper className="bg-slate-50 relative overflow-hidden">
      <div className="relative z-10 py-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3 mb-6"
          >
            <span className="w-12 h-[2px] bg-[var(--primary)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
              Portfolio of Excellence
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-slate-900 text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight"
          >
            Recent <span className="text-[var(--primary)] font-bold">Masterpieces</span>
          </motion.h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            From royal weddings to high-stakes corporate summits, explore our gallery of meticulously crafted events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 md:px-8 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-md font-bold border ${
                activeCategory === category 
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900"
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative h-[380px] overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                       <span className="text-[9px] text-[var(--primary)] uppercase tracking-widest font-bold">{item.category}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-[2px] bg-[var(--primary)]" />
                        <span className="text-[var(--primary)] text-[9px] uppercase tracking-widest font-bold bg-white/10 px-2 py-0.5 rounded-sm backdrop-blur-sm">{item.client}</span>
                      </div>
                      <h3 className="font-display text-2xl text-white mb-2 font-bold tracking-tight">{item.title}</h3>
                      
                      {/* Detailed Metadata (Visible on Hover) */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-4">
                        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 mb-4">
                           <div>
                             <p className="text-[9px] text-slate-300 uppercase tracking-widest mb-1">Guests</p>
                             <p className="text-sm text-white font-bold">{item.guests}</p>
                           </div>
                           <div>
                             <p className="text-[9px] text-slate-300 uppercase tracking-widest mb-1">Date</p>
                             <p className="text-sm text-white font-bold">{item.date}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
