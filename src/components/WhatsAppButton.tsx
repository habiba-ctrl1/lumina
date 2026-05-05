"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const WhatsAppIcon = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const WHATSAPP_URL = "https://wa.me/923001234567?text=Hi%20Lumina%20Events!%20I%20would%20like%20to%20connect.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-[120]"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#041E42] text-white text-[10px] uppercase tracking-[0.2em] font-bold px-5 py-3 border border-white/10 shadow-2xl whitespace-nowrap pointer-events-none"
          >
            Start Your Journey
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-[#041E42] rotate-45 border-r border-t border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Rings */}
      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse pointer-events-none" />

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-16 h-16 bg-white border border-gray-100 text-[#25D366] shadow-2xl transition-all duration-700 hover:bg-[#25D366] hover:text-white rounded-full group overflow-hidden"
        aria-label="Contact us on WhatsApp"
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <WhatsAppIcon className="relative z-10 transition-transform duration-500 group-hover:scale-110" />
      </a>
    </motion.div>
  );
}
