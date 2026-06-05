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
    <div className="fixed end-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-6">
      {sections.map((section: any) => (
        <div
          key={section.id}
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <AnimatePresence>
            {hoveredSection === section.id && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.12 }}
                className="absolute end-6 text-[12px] text-neutral-600 font-medium bg-white px-3 py-1.5 border border-neutral-200/80 rounded-lg whitespace-nowrap"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
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
                scale: activeSection === section.id ? 1.3 : 1,
                backgroundColor: activeSection === section.id ? "var(--primary)" : "rgba(163, 163, 163, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-2 h-2 rounded-full group-hover:bg-neutral-400/60"
            />
            {activeSection === section.id && (
              <motion.div
                layoutId="active-dot-outline"
                className="absolute -inset-1.5 border border-[var(--primary)]/30 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
