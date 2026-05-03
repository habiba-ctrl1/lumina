"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const galleryItems = [
  { id: 1, src: "/gallery_wedding_reception.png", title: "Royal Riyadh Wedding", category: "Weddings" },
  { id: 2, src: "/gallery_corporate_gala.png", title: "Executive Summit Jeddah", category: "Corporate" },
  { id: 3, src: "/gallery_destination_wedding.png", title: "Elite Majlis Gathering", category: "Private" },
  { id: 4, src: "/gallery_vip_party.png", title: "Dubai Luxury Soiree", category: "Private" },
  { id: 5, src: "/gallery_charity_gala.png", title: "Lahore Cultural Festival", category: "Culture" },
  { id: 6, src: "/gallery_garden_party.png", title: "Desert Resort Oasis", category: "Private" },
];

export default function RecentEvents() {
  return (
    <section id="gallery" className="py-28 bg-charcoal-900 relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-6"
          >
            3D Event <span className="text-shimmer font-semibold italic">Showcase</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
          >
            Swipe through our most spectacular luxury events in this immersive 3D gallery.
          </motion.p>
        </div>

        {/* 3D Coverflow Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full pb-16"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 250,
              modifier: 1.5,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full pt-12 pb-20"
          >
            {galleryItems.map((item) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <div className="relative w-[240px] md:w-[350px] lg:w-[400px] h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden group border border-white/10 shadow-2xl shadow-charcoal-950/50">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                    sizes="(max-width: 768px) 300px, 500px"
                  />
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-gold-500 text-xs uppercase tracking-[0.3em] font-medium block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.category}
                    </span>
                    <h3 className="text-white text-2xl md:text-3xl font-display font-medium">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom Styles for Swiper Pagination */}
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #D4AF37;
          width: 24px;
          border-radius: 4px;
        }
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background-image: linear-gradient(to left, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0));
        }
      `}} />
    </section>
  );
}
