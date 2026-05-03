"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  className: string;
};

const fallbackEvents: GalleryItem[] = [
  { id: 1, src: "/gallery_wedding_reception.png", alt: "Luxury wedding reception in grand ballroom with crystal chandeliers", category: "Weddings", className: "h-72 md:h-80" },
  { id: 2, src: "/gallery_corporate_gala.png", alt: "Upscale corporate gala dinner with dramatic stage lighting", category: "Corporate", className: "h-72 md:h-80" },
  { id: 3, src: "/gallery_destination_wedding.png", alt: "Outdoor destination wedding ceremony at sunset overlooking ocean", category: "Weddings", className: "h-72 md:h-80" },
  { id: 4, src: "/gallery_vip_party.png", alt: "Exclusive VIP birthday party in lavish penthouse with city skyline", category: "Private", className: "h-72 md:h-80" },
  { id: 5, src: "/gallery_charity_gala.png", alt: "Grand charity gala ballroom with crystal chandeliers and red carpet", category: "Corporate", className: "h-72 md:h-80" },
  { id: 6, src: "/gallery_garden_party.png", alt: "Enchanting garden party at historic estate with string lights", category: "Private", className: "h-72 md:h-80" },
];

const categories = ["All", "Weddings", "Corporate", "Private"];

export default function RecentEvents() {
  const [events] = useState<GalleryItem[]>(fallbackEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? events : events.filter((e) => e.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="py-28 bg-charcoal-800 relative border-t border-white/5">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block">
              Portfolio
            </motion.span>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-4">
              Recent <span className="text-shimmer font-semibold italic">Masterpieces</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl text-lg font-light">
              A glimpse into the extraordinary moments we&apos;ve crafted.
            </motion.p>
          </div>
        </div>

        {/* Category Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-400 border ${
                activeCategory === cat
                  ? "bg-gold-500 text-charcoal-900 border-gold-500"
                  : "border-white/10 text-gray-400 hover:border-gold-500/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative overflow-hidden group cursor-pointer ${event.className}`}
                onClick={() => openLightbox(index)}
              >
                <Image src={event.src} alt={event.alt} fill className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/60 transition-all duration-500 flex flex-col items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-gold-500 flex items-center justify-center mb-3">
                      <Eye size={20} className="text-gold-500" />
                    </div>
                    <span className="text-white text-xs uppercase tracking-[0.2em]">{event.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-charcoal-900/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50" aria-label="Close lightbox">
              <X size={28} />
            </button>

            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all z-50" aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[75vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[lightboxIndex].src} alt={filtered[lightboxIndex].alt} fill className="object-contain" sizes="90vw" />
            </motion.div>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 border border-white/10 rounded-full hover:border-gold-500 hover:text-gold-500 text-white transition-all z-50" aria-label="Next image">
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-sm">
              <span className="text-gold-500">{lightboxIndex + 1}</span> / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
