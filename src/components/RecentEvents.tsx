"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Link from "next/link";

const galleryItems = [
  { id: 1, src: "/gallery_wedding_reception.png", title: "Royal Riyadh Wedding", category: "Weddings", slug: "royal-riyadh-wedding" },
  { id: 2, src: "/gallery_corporate_gala.png", title: "Executive Summit Jeddah", category: "Corporate", slug: "#" },
  { id: 3, src: "/gallery_destination_wedding.png", title: "Elite Majlis Gathering", category: "Private", slug: "#" },
  { id: 4, src: "/gallery_vip_party.png", title: "Dubai Luxury Soiree", category: "Private", slug: "#" },
  { id: 5, src: "/gallery_charity_gala.png", title: "Dubai Sands Festival", category: "Culture", slug: "#" },
  { id: 6, src: "/gallery_garden_party.png", title: "Desert Resort Oasis", category: "Private", slug: "#" },
];

export default function RecentEvents({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="gallery" className="py-12 md:py-20 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-champagne-500 text-sm uppercase tracking-[0.5em] font-medium mb-8 block"
            >
              Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-4xl md:text-5xl font-display text-[#041E42] mb-12"
            >
              Recent <span className="text-shimmer italic font-medium">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="text-gray-500 max-w-2xl mx-auto text-xl font-light mb-16 leading-relaxed"
            >
              Explore our most spectacular luxury events in this immersive curated gallery.
            </motion.p>
          </div>
        )}

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
                <Link href={item.slug !== "#" ? `/portfolio/${item.slug}` : "#"} className="block group cursor-pointer">
                  <div className="relative w-[240px] md:w-[350px] lg:w-[400px] h-[300px] md:h-[400px] lg:h-[450px] rounded-sm overflow-hidden border border-black/5 shadow-2xl shadow-black/5">
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      sizes="(max-width: 768px) 300px, 500px"
                    />
                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white">
                      <h3 className="text-xl font-display font-medium text-[#041E42] mb-2 group-hover:text-champagne-500 transition-colors">{item.title}</h3>
                      <p className="text-[11px] text-champagne-500 uppercase tracking-[0.2em]">{item.category}</p>
                      {item.slug !== "#" && (
                        <p className="text-xs text-gray-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">View Case Study &rarr;</p>
                      )}
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
          background-image: linear-gradient(to left, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));
        }
      `}} />
    </section>
  );
}
