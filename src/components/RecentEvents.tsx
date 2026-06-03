"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

const galleryItems = [
  { id: 1, src: "/gallery_wedding_reception.webp", title: "Royal Riyadh Wedding", category: "Weddings", slug: "royal-riyadh-wedding", alt: "Royal Riyadh Wedding reception design and setup Saudi Arabia" },
  { id: 2, src: "/gallery_corporate_gala.webp", title: "Executive Summit Jeddah", category: "Corporate", slug: "executive-summit-jeddah", alt: "Executive Summit Jeddah stage and corporate event management" },
  { id: 3, src: "/gallery_destination_wedding.webp", title: "Elite Majlis Gathering", category: "Private", slug: "riyadh-elite-majlis", alt: "Elite Majlis VIP private gathering organizer Riyadh" },
  { id: 4, src: "/gallery_vip_party.webp", title: "Riyadh Luxury Soiree", category: "Private", slug: "riyadh-luxury-soiree", alt: "Riyadh Luxury Soiree and exclusive private concert KSA" },
  { id: 5, src: "/gallery_charity_gala.webp", title: "AlUla Desert Festival", category: "Culture", slug: "alula-desert-festival", alt: "AlUla Desert Festival cultural exhibition management Saudi Arabia" },
  { id: 6, src: "/gallery_garden_party.webp", title: "NEOM Future Summit", category: "Corporate", slug: "neom-future-summit", alt: "NEOM Future Summit corporate conference planning KSA" },
];

export default function RecentEvents({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <SectionWrapper id="gallery" className="bg-slate-50 relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        {!hideHeader ? (
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="flex flex-col items-center gap-3 mb-6"
            >
              <span className="w-12 h-[2px] bg-[var(--primary)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                Portfolio
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 uppercase tracking-tight"
            >
              Recent <span className="text-[var(--primary)] font-bold">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed"
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
            {galleryItems.map((item: any) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <Link href={item.slug ? `/portfolio/${item.slug}` : "/portfolio"} className="block group cursor-pointer">
                  <div className="relative w-[300px] md:w-[450px] h-[250px] md:h-[350px] rounded-xl overflow-hidden border border-slate-200 group-hover:border-[var(--primary)] shadow-md hover:shadow-xl transition-all duration-700">
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    
                    {/* Content - Always visible with white text on dark overlay */}
                    <div className="absolute bottom-0 start-0 end-0 p-8">
                      <p className="text-[10px] text-teal-300 uppercase tracking-[0.4em] font-bold mb-2">{item.category}</p>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="w-10 h-0.5 bg-[var(--primary)] mt-3" />
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
          background: #CBD5E1;
          border: 1px solid #94A3B8;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary);
          border-color: var(--primary);
          width: 24px;
          border-radius: 4px;
        }
      `}} />
    </SectionWrapper>
  );
}
