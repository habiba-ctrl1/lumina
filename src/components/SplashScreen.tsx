"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Show for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          <div className="relative">
            {/* Outer Glow - Teal tint */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.08 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-[var(--primary)] rounded-full blur-3xl"
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="relative z-10"
            >
              <Image 
                src="/main-logo.webp" 
                alt="Saudi Event Management" 
                width={500} 
                height={200}
                className="object-contain grayscale brightness-0"
                priority
              />
              
              {/* Progress Line */}
              <motion.div 
                className="w-full h-[1px] bg-slate-200 mt-8 relative overflow-hidden"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 2,
                    ease: "linear",
                    repeat: 0
                  }}
                  className="absolute inset-0 bg-[var(--primary)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-20 left-0 right-0 text-center"
          >
            <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.8em] font-bold">
              Architectural Emotion
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
