"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-neutral-100 text-left cursor-zoom-in"
            aria-label={`Open image: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 inset-x-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
              <span className="text-white text-[14px] font-medium tracking-wide">{img.alt}</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-neutral-950/95 flex flex-col items-center justify-center p-4 md:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[78vh] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <div className="mt-5 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white text-[14px] font-medium">{images[openIndex].alt}</p>
              <p className="text-white/40 text-[12px] mt-1 tracking-wide">{openIndex + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
