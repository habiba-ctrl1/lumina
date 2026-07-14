"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageBandProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export default function ParallaxImageBand({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  quality = 82,
}: ParallaxImageBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} quality={quality} priority={priority} />
      </motion.div>
    </div>
  );
}
