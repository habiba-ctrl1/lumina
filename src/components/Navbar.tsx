"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Locations", href: "/#locations" },
    { name: "Journal", href: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-4 group">
              <div className={`w-9 h-9 flex items-center justify-center border transition-all duration-700 ${isScrolled ? "border-[#041E42] bg-[#041E42]" : "border-white/30 bg-transparent group-hover:border-white"}`}>
                <span className={`text-xl font-display font-bold transition-colors duration-500 ${isScrolled ? "text-white" : "text-white"}`}>L</span>
              </div>
              <span className={`text-lg font-display font-bold tracking-[0.25em] uppercase transition-colors duration-700 ${isScrolled ? "text-[#041E42]" : "text-white"}`}>
                Lumina<span className="text-champagne-500">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-[clamp(1rem,2.5vw,2.5rem)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-2 py-1 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-500 group ${
                    isScrolled 
                      ? (isActive ? "text-[#041E42]" : "text-gray-500 hover:text-[#041E42]") 
                      : (isActive ? "text-champagne-500" : "text-white/90 hover:text-white")
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-px bg-champagne-500 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              );
            })}

            {/* Premium CTA */}
            <div className="flex items-center gap-6 ml-4">
              <div className="flex items-center bg-gray-100/10 p-1 rounded-full border border-white/5">
                <button className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-all rounded-full ${isScrolled ? (true ? "text-[#041E42] bg-white shadow-sm" : "text-gray-400") : "text-white"}`}>
                  EN
                </button>
                <button className={`px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-all rounded-full text-gray-500 hover:text-champagne-500`}>
                  AR
                </button>
              </div>
              
              <Link
                href="/#contact"
                className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-700 border ${
                  isScrolled 
                    ? "bg-[#041E42] border-[#041E42] text-white hover:bg-transparent hover:text-[#041E42]" 
                    : "bg-white border-white text-[#041E42] hover:bg-transparent hover:text-white"
                }`}
              >
                Consultation
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 z-[100] lg:hidden bg-white border border-gray-100 rounded-sm overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-10 space-y-4 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-display text-[#041E42] uppercase tracking-widest hover:text-champagne-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-5 bg-[#041E42] text-white text-[11px] font-bold uppercase tracking-[0.3em]"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
