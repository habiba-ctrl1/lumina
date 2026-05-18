"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import Link from "next/link";

const galleryItems = [
  { id: 1, src: "/gallery_wedding_reception.webp", title: "Royal Riyadh Wedding", category: "Weddings", slug: "royal-riyadh-wedding" },
  { id: 2, src: "/gallery_corporate_gala.webp", title: "Executive Summit Jeddah", category: "Corporate", slug: "executive-summit-jeddah" },
  { id: 3, src: "/gallery_destination_wedding.webp", title: "Elite Majlis Gathering", category: "Private", slug: "riyadh-elite-majlis" },
  { id: 4, src: "/gallery_vip_party.webp", title: "Riyadh Luxury Soiree", category: "Private", slug: "riyadh-luxury-soiree" },
  { id: 5, src: "/gallery_charity_gala.webp", title: "AlUla Desert Festival", category: "Culture", slug: "alula-desert-festival" },
  { id: 6, src: "/gallery_garden_party.webp", title: "NEOM Future Summit", category: "Corporate", slug: "neom-future-summit" },
];

export default function RecentEvents({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="gallery" className="py-24 bg-ink-900 relative overflow-hidden border-t border-ink-600">
      <div className="container-luxury relative z-10">
        {/* Header */}
        {!hideHeader ? (
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="section-label"
            >
              Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="font-display font-medium text-2xl md:text-3xl text-sand-50 mb-10 uppercase tracking-tight"
            >
              Recent <span className="text-shimmer italic">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-sand-400 max-w-2xl mx-auto text-sm leading-relaxed"
            >
              Explore our most spectacular luxury events in this immersive curated gallery.
            </motion.p>
          </div>
        ) : (
          <h2 className="sr-only">Recent Portfolio Masterpieces</h2>
        )}

        {/* 3D Coverflow Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full pb-16"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full pt-10 pb-20"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <Link href={item.slug ? `/portfolio/${item.slug}` : "/portfolio"} className="block group cursor-pointer">
                  <div className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-sm overflow-hidden border border-ink-600 shadow-md transition-all duration-700">
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" 
                    />
                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-[10px] text-gold-400 uppercase tracking-[0.4em] font-medium mb-3">{item.category}</p>
                      <h3 className="font-display text-xl md:text-2xl font-medium text-white mb-2">{item.title}</h3>
                      <div className="w-10 h-0.5 bg-gold-400 mt-4" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom Styles for Swiper Pagination */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet {
          background: #1C1C26;
          border: 1px solid #2E2E3E;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #D4AF37;
          border-color: #D4AF37;
          width: 24px;
          border-radius: 4px;
        }
      `}} />
    </section>
  );
}
