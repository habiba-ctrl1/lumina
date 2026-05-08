"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import Link from "next/link";

const galleryItems = [
  { id: 1, src: "/gallery_wedding_reception.png", title: "Royal Riyadh Wedding", category: "Weddings", slug: "royal-riyadh-wedding" },
  { id: 2, src: "/gallery_corporate_gala.png", title: "Executive Summit Jeddah", category: "Corporate", slug: "" },
  { id: 3, src: "/gallery_destination_wedding.png", title: "Elite Majlis Gathering", category: "Private", slug: "" },
  { id: 4, src: "/gallery_vip_party.png", title: "Riyadh Luxury Soiree", category: "Private", slug: "" },
  { id: 5, src: "/gallery_charity_gala.png", title: "AlUla Desert Festival", category: "Culture", slug: "" },
  { id: 6, src: "/gallery_garden_party.png", title: "Desert Resort Oasis", category: "Private", slug: "" },
];

export default function RecentEvents({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section id="gallery" className="section-minimal bg-white relative overflow-hidden">
      <div className="container-minimal relative z-10">
        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-primary text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
            >
              Portfolio
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-black mb-10"
            >
              Recent <span className="text-primary">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed"
            >
              Explore our most spectacular luxury events in this immersive curated gallery.
            </motion.p>
          </div>
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
                  <div className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-lg transition-all duration-700">
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      sizes="(max-width: 768px) 300px, 500px"
                    />
                    {/* Minimalist Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-[10px] text-primary uppercase tracking-[0.4em] font-bold mb-3">{item.category}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="w-10 h-0.5 bg-primary mt-4" />
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
          background: #E5E7EB;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #D4AF37;
          width: 24px;
          border-radius: 4px;
        }
      `}} />
    </section>
  );
}
