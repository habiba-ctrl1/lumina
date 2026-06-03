"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Cake, Flower2, Utensils, Star, ArrowRight } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/966501234567?text=";

const categories = [
  { id: "photographers", name: "Photographers", icon: Camera },
  { id: "cakes", name: "Bespoke Cakes", icon: Cake },
  { id: "florists", name: "Floral Designers", icon: Flower2 },
  { id: "catering", name: "Royal Catering", icon: Utensils },
];

const vendors = [
  {
    id: 1,
    category: "photographers",
    name: "Al-Majid Studios",
    image: "/gallery_wedding_reception.webp",
    rating: 5.0,
    reviews: 124,
    location: "Riyadh, KSA",
    specialty: "Cinematic Weddings",
    whatsapp: "966501234567"
  },
  {
    id: 2,
    category: "cakes",
    name: "The Golden Whisk",
    image: "/gallery_corporate_gala.webp",
    rating: 4.9,
    reviews: 89,
    location: "Dubai, UAE",
    specialty: "Multi-tier Fondant",
    whatsapp: "966501234567"
  },
  {
    id: 3,
    category: "florists",
    name: "Sapphire Blooms",
    image: "/gallery_destination_wedding.webp",
    rating: 5.0,
    reviews: 56,
    location: "Riyadh, SA",
    specialty: "Exotic Installations",
    whatsapp: "966501234567"
  },
  {
    id: 4,
    category: "catering",
    name: "Saffron & Silk",
    image: "/gallery_garden_party.webp",
    rating: 4.8,
    reviews: 210,
    location: "Jeddah, KSA",
    specialty: "Traditional Majlis",
    whatsapp: "966501234567"
  },
  {
    id: 5,
    category: "photographers",
    name: "Elite Vision PK",
    image: "/gallery_vip_party.webp",
    rating: 4.9,
    reviews: 45,
    location: "Islamabad, PK",
    specialty: "Documentary Style",
    whatsapp: "966501234567"
  },
  {
    id: 6,
    category: "cakes",
    name: "Velvet Sugar",
    image: "/gallery_charity_gala.webp",
    rating: 5.0,
    reviews: 32,
    location: "Karachi, PK",
    specialty: "Artisan Desserts",
    whatsapp: "966501234567"
  },
];

export default function VendorMarketplace() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVendors = activeCategory === "all" 
    ? vendors 
    : vendors.filter(v => v.category === activeCategory);

  return (
    <section id="vendors" className="py-32 bg-emerald-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 start-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-8 block"
            >
              Curated Partners
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-sans font-bold text-white mb-0"
            >
              The <span className="text-shimmer font-semibold italic">Elite</span> Collective
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === "all" 
                ? "bg-gold-500 text-sand-50" 
                : "bg-ink-800/5 text-gray-400 hover:bg-ink-800/10"
              }`}
            >
              All Vendors
            </button>
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id 
                  ? "bg-gold-500 text-sand-50" 
                  : "bg-ink-800/5 text-gray-400 hover:bg-ink-800/10"
                }`}
              >
                <cat.icon size={14} />
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredVendors.map((vendor: any, index: number) => (
            <motion.div
              layout
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-emerald-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/5"
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-64 w-full overflow-hidden">
                <Image
                  src={vendor.image}
                  alt={vendor.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 start-4">
                  <span className="px-3 py-1 bg-emerald-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-gold-500 uppercase tracking-widest font-bold">
                    {vendor.specialty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-sans font-bold text-white group-hover:text-gold-400 transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">
                      {vendor.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-gold-500/10 px-2 py-1 rounded">
                    <Star size={12} className="text-gold-500 fill-gold-500" />
                    <span className="text-gold-500 text-xs font-bold">{vendor.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-gray-500 text-xs italic">
                    {vendor.reviews} Verified Reviews
                  </span>
                  <a
                    href={`https://wa.me/${vendor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all"
                  >
                    View Portfolio
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-3xl border border-gold-500/20 text-center"
        >
          <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-8">Are you a premium vendor?</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join the most exclusive event network in the Middle East and showcase your services to elite clientele.
          </p>
          <Link
            href="/vendor-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-primary transition-all duration-700 shadow-xl rounded-xl"
          >
            Apply to Join
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
