"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isArabic ? "rtl" : "ltr";
      document.documentElement.lang = isArabic ? "ar" : "en";
      // Optional: Add a class to body for specific font handling
      if (isArabic) {
        document.body.classList.add("font-arabic");
      } else {
        document.body.classList.remove("font-arabic");
      }
    }
  }, [isArabic]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["home", "services", "gallery", "vendors", "testimonials", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Vendors", href: "/vendors" },
    { name: "Live Tracking", href: "/tracking" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-2xl bg-charcoal-900/80 py-3 shadow-2xl shadow-charcoal-950/50 border-b border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-display font-bold text-white tracking-[0.15em] uppercase group">
              Lumina<span className="text-gold-500 group-hover:text-gold-400 transition-colors">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive ? "text-gold-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            {/* Language Toggle */}
            <button 
              onClick={() => setIsArabic(!isArabic)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-300 hover:text-gold-500 transition-colors border border-white/10 hover:border-gold-500/30 rounded-full mr-4 uppercase tracking-widest"
            >
              <span className={`w-2 h-2 rounded-full ${isArabic ? "bg-emerald-500" : "bg-gold-500"} animate-pulse`} />
              {isArabic ? "English" : "Arabic"}
            </button>

            {/* Premium CTA */}
            <Link
              href="#contact"
              className="px-6 py-2.5 bg-gold-500 text-charcoal-900 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
            >
              Book Discovery Call
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden backdrop-blur-2xl bg-charcoal-900/95 border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-gold-500 border-l-2 border-gold-500"
                        : "text-gray-400 hover:text-white border-l-2 border-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-6 py-3 bg-gold-500 text-charcoal-900 text-sm font-bold uppercase tracking-wider"
                >
                  Book Discovery Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
