"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-24 bg-ink-950 relative overflow-hidden">
      <div className="container-luxury relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="section-label"
          >
            Portfolio of Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="font-display font-medium text-sand-50 text-2xl md:text-4xl mb-4 uppercase tracking-tight"
          >
            Recent <span className="text-shimmer italic">Masterpieces</span>
          </motion.h2>
          <p className="text-sand-400 max-w-2xl mx-auto text-[13px] font-light leading-relaxed">
            From royal weddings to high-stakes summits, we define the standard of Saudi luxury events.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 md:px-8 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 rounded-sm font-medium border ${
                activeCategory === category 
                  ? "bg-gold-400 text-ink-950 border-gold-400 shadow-md" 
                  : "bg-transparent text-sand-400 border-ink-600 hover:border-gold-400 hover:text-sand-50"
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
                className="group relative h-[320px] overflow-hidden rounded-sm bg-ink-900 border border-ink-600"
              >
                <Link href={`/portfolio/${item.slug}`} className="block w-full h-full">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-8 right-8 overflow-hidden rounded-sm">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2">
                       <span className="text-[9px] text-white uppercase tracking-widest font-bold">{item.category}</span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-px bg-gold-400" />
                        <span className="text-gold-400 text-[9px] uppercase tracking-widest font-bold">{item.client}</span>
                      </div>
                      <h3 className="text-xl text-white mb-3 font-bold tracking-tight">{item.title}</h3>
                      
                      {/* Detailed Metadata (Visible on Hover) */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mb-6">
                           <div>
                             <p className="text-[8px] text-sand-400 uppercase tracking-widest mb-1">Guests</p>
                             <p className="text-xs text-white font-bold">{item.guests}</p>
                           </div>
                           <div>
                             <p className="text-[8px] text-sand-400 uppercase tracking-widest mb-1">Date</p>
                             <p className="text-xs text-white font-bold">{item.date}</p>
                           </div>
                        </div>
                        <p className="text-[10px] text-sand-300 leading-relaxed font-light italic">
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
