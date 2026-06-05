"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative z-10"
            >
              <Image 
                src="/main-logo.webp" 
                alt="Saudi Event Management" 
                width={400} 
                height={160}
                className="object-contain"
                style={{ filter: "brightness(0) invert(0)" }}
                priority
              />
              
              {/* Progress Line */}
              <div className="w-full h-px bg-neutral-100 mt-8 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: 1.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="absolute inset-0 bg-[var(--primary)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-20 start-0 end-0 text-center"
          >
            <span className="text-neutral-400 text-[12px] font-medium" style={{ letterSpacing: "0.2em" }}>
              Architectural Emotion
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
