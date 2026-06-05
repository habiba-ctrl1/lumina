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
    <SectionWrapper id="gallery" className="bg-[var(--surface-raised)] relative overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        {!hideHeader ? (
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 8 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="flex flex-col items-center gap-4 mb-6"
            >
              <span className="section-label">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Portfolio
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 8 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900 text-3xl md:text-4xl mb-5 font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              Recent <span className="text-[var(--primary)]">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-neutral-500 text-[16px] leading-relaxed"
            >
              Explore our most spectacular luxury events in this immersive curated gallery.
            </motion.p>
          </div>
        ) : (
          <h2 className="sr-only">Recent Portfolio Masterpieces</h2>
        )}

        {/* 3D Coverflow Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pb-10"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 80,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full pt-6 pb-20"
          >
            {galleryItems.map((item: any) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <Link href={item.slug ? `/portfolio/${item.slug}` : "/portfolio"} className="block group cursor-pointer">
                  <div className="relative w-[290px] md:w-[420px] h-[240px] md:h-[320px] rounded-2xl overflow-hidden border border-neutral-200/80 transition-all duration-500"
                    style={{
                      boxShadow: "0 4px 12px -2px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)",
                    }}
                  >
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/10 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 start-0 end-0 p-6 z-10">
                      <p className="text-[12px] text-emerald-400 font-semibold mb-1" style={{ letterSpacing: "0.05em" }}>{item.category}</p>
                      <h3 className="text-lg md:text-xl font-semibold text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>{item.title}</h3>
                      <div className="w-8 h-0.5 bg-[var(--primary)] mt-3 rounded-full opacity-80" />
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
          background: #D4D4D4;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary);
          opacity: 1;
          width: 20px;
          border-radius: 100px;
        }
      `}} />
    </SectionWrapper>
  );
}
