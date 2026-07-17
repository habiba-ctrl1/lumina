"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Real project photography from SEM's vetted production partner network.
// PROTECTION RULE: never surface a partner's name/brand here — only SEM's own
// framing. See CLAUDE.md hard rules (vendor non-circumvention).
export type GalleryImage = {
  src: string;
  alt: string;
  altAr: string;
};

export default function PartnerNetworkGallery({
  images,
  isAr,
  eyebrow,
  eyebrowAr,
  heading,
  headingAr,
  subheading,
  subheadingAr,
}: {
  images: GalleryImage[];
  isAr: boolean;
  eyebrow: string;
  eyebrowAr: string;
  heading: React.ReactNode;
  headingAr: React.ReactNode;
  subheading: string;
  subheadingAr: string;
}) {
  return (
    <section className="py-24 md:py-28 bg-neutral-50/60 border-y border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="section-label justify-center mb-4 flex">
            <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
            {isAr ? eyebrowAr : eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-5">
            {isAr ? headingAr : heading}
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm leading-relaxed">
            {isAr ? subheadingAr : subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200/80 group"
            >
              <Image
                src={img.src}
                alt={isAr ? img.altAr : img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
