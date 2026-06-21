"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";

const galleryItems = [
  { id: 1, src: "/luxury_wedding_couple_guests.webp",    title: "Royal Riyadh Wedding",      category: "Weddings",  slug: "royal-riyadh-wedding",        alt: "Luxury royal wedding guests celebrating in a grand Saudi Arabia wedding hall" },
  { id: 2, src: "/riyadh_summit_people.webp",            title: "Executive Summit Jeddah",   category: "Corporate", slug: "executive-summit-jeddah",      alt: "Large audience at an immersive corporate summit in Jeddah Saudi Arabia" },
  { id: 3, src: "/majlis_gathering_people.webp",         title: "Elite Majlis Gathering",    category: "Private",   slug: "riyadh-elite-majlis",          alt: "Men in traditional Saudi attire networking at a luxury Majlis gathering" },
  { id: 4, src: "/jeddah_luxury_people.webp",            title: "Riyadh Luxury Soiree",      category: "Private",   slug: "riyadh-luxury-soiree",         alt: "Elegant guests at an exclusive luxury hotel soiree in Saudi Arabia" },
  { id: 5, src: "/alula_gala_people.webp",               title: "AlUla Heritage Gala",       category: "Culture",   slug: "alula-desert-festival",        alt: "Guests in formal wear at a desert heritage gala event in AlUla Saudi Arabia" },
  { id: 6, src: "/neom_summit_people.webp",              title: "NEOM Future Summit",        category: "Corporate", slug: "neom-future-summit",           alt: "VIPs and speakers at a high-tech NEOM summit stage in Saudi Arabia" },
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
              rotate: 4,
              stretch: 20,
              depth: 60,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full pt-6 pb-20"
          >
            {galleryItems.map((item: any) => (
              <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                <Link href={item.slug ? `/portfolio/${item.slug}` : "/portfolio"} className="block group cursor-pointer" aria-label={`View case study: ${item.title}`}>
                  <div className="relative w-[260px] md:w-[380px] h-[360px] md:h-[500px] rounded-2xl overflow-hidden border border-neutral-200/80 transition-all duration-500"
                    style={{
                      boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Background image — rendered via CSS so Swiper loop-clones always
                        paint reliably (next/image clones break in coverflow loop mode). */}
                    <div
                      role="img"
                      aria-label={item.alt}
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${item.src}')` }}
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/15 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 start-0 end-0 p-6 z-10">
                      <p className="text-[12px] text-emerald-400 font-semibold mb-1" style={{ letterSpacing: "0.05em" }}>{item.category}</p>
                      <h3 className="text-lg md:text-xl font-semibold text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>{item.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-white/85 text-[12.5px] font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View case study
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
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
