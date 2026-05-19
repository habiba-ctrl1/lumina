"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

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
  return (
    <section className="py-24 bg-gray-50/30 overflow-hidden">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <Instagram className="text-primary" size={24} />
               <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold">Live from the Field</span>
            </div>
            <h2 className="text-black text-2xl md:text-3xl font-bold uppercase tracking-tight">Social <span className="text-primary">Narrative</span></h2>
          </div>
          <motion.a 
            href="https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg flex items-center gap-3"
          >
            Follow @SaudiEventManagement
          </motion.a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square group cursor-pointer overflow-hidden rounded-2xl"
            >
              <Image 
                src={post.src} 
                alt={post.alt} 
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart size={20} fill="white" />
                  <span className="font-bold text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle size={20} fill="white" />
                  <span className="font-bold text-sm">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
