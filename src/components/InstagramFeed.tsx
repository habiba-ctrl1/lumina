"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const Instagram = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const posts = [
  { id: 1, src: "/gallery_wedding_reception.webp", likes: "1.2k", comments: "45", alt: "Luxury wedding reception decoration setup Saudi Arabia" },
  { id: 2, src: "/gallery_corporate_gala.webp", likes: "850", comments: "22", alt: "High-end corporate gala dinner stage and AV setup Riyadh" },
  { id: 3, src: "/gallery_destination_wedding.webp", likes: "2.1k", comments: "89", alt: "Royal outdoor destination wedding decoration Jeddah" },
  { id: 4, src: "/gallery_vip_party.webp", likes: "1.1k", comments: "31", alt: "Premium VIP private concert and party organization KSA" },
  { id: 5, src: "/gallery_charity_gala.webp", likes: "920", comments: "18", alt: "Elite charity gala and business networking event Saudi Arabia" },
  { id: 6, src: "/gallery_garden_party.webp", likes: "1.5k", comments: "52", alt: "Elegant outdoor social event planning and design" },
  { id: 7, src: "/wedding.webp", likes: "3.4k", comments: "120", alt: "Bespoke bridal event design and luxury floral arches" },
  { id: 8, src: "/corporate.webp", likes: "760", comments: "15", alt: "Modern B2B corporate conference production in Riyadh" },
  { id: 9, src: "/private_party.webp", likes: "1.8k", comments: "64", alt: "Opulent private birthday celebration and ballroom setup" },
];

export default function InstagramFeed() {
  const t = useTranslations("instagram");
  return (
    <section className="bg-white relative py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
               <Instagram className="text-[var(--primary)]" size={20} />
               <span className="text-[var(--primary)] text-[12px] font-medium tracking-wide">{t("label")}</span>
            </div>
            <h2 className="text-neutral-900 text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.025em" }}>{t("title")} <span className="text-[var(--primary)]">{t("titleHighlight")}</span></h2>
          </div>
          <motion.a 
            href="https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-[var(--primary-dark)] transition-all flex items-center gap-2"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            {t("follow")}
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {posts.map((post: any, i: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-xl border border-neutral-100"
            >
              <Image 
                src={post.src} 
                alt={post.alt} 
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5 rounded-xl">
                <div className="flex items-center gap-1.5 text-white">
                  <Heart size={16} fill="white" />
                  <span className="font-semibold text-[13px]">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <MessageCircle size={16} fill="white" />
                  <span className="font-semibold text-[13px]">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
