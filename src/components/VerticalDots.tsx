"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "gallery", label: "Portfolio" },
  { id: "tracking", label: "Live Tracking" },
  { id: "contact", label: "Contact" },
];

export default function VerticalDots() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-6">
      {sections.map((section) => (
        <div
          key={section.id}
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <AnimatePresence>
            {hoveredSection === section.id && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-8 text-[10px] uppercase tracking-[0.2em] text-[#041E42] font-bold bg-white px-3 py-1 border border-gray-100 shadow-sm"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            aria-label={`Scroll to ${section.label}`}
          >
            <motion.div
              animate={{
                scale: activeSection === section.id ? 1.5 : 1,
                backgroundColor: activeSection === section.id ? "#D4AF37" : "rgba(4, 30, 66, 0.2)",
              }}
              className="w-2.5 h-2.5 rounded-full transition-colors group-hover:bg-[#041E42]/40"
            />
            {activeSection === section.id && (
              <motion.div
                layoutId="active-dot-outline"
                className="absolute -inset-1.5 border border-champagne-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
