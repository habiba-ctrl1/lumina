"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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
    { name: "Locations", href: "/locations" },
    { name: "Journal", href: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gold-500/50 py-3" : "bg-transparent py-6"
      }`}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/lumina-logo-transparent.png" 
                alt="Lumina Events Logo" 
                width={160} 
                height={60}
                className={`transition-all duration-700 object-contain h-12 w-auto ${isScrolled ? "brightness-50" : "brightness-100"}`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-[clamp(1rem,2.5vw,2.5rem)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isServices = link.name === "Services";

              return (
                <div 
                  key={link.name} 
                  className="relative group h-full flex items-center py-4"
                  onMouseEnter={() => setHoveredLink(link.name)}
                >
                  <Link
                    href={link.href}
                    className={`relative px-2 py-1 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-500 ${
                      isScrolled 
                        ? (isActive || hoveredLink === link.name ? "text-[#041E42]" : "text-gray-500 hover:text-[#041E42]") 
                        : (isActive || hoveredLink === link.name ? "text-champagne-500" : "text-white/90 hover:text-white")
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-px bg-champagne-500 transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>

                  {/* Mega Menu for Services */}
                  {isServices && (
                    <AnimatePresence>
                      {hoveredLink === "Services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white border border-gray-100 shadow-2xl rounded-sm overflow-hidden flex"
                        >
                          <div className="w-1/3 bg-gray-50 relative p-8">
                            <Image 
                              src="/gallery_1.png" 
                              alt="Lumina Luxury Services" 
                              fill 
                              className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-[#041E42]/80 mix-blend-multiply" />
                            <div className="relative z-10 h-full flex flex-col justify-end">
                              <h3 className="text-white font-display text-2xl mb-2">Bespoke<br/>Experiences</h3>
                              <p className="text-gray-300 text-xs font-light">Crafting extraordinary events across the Middle East.</p>
                            </div>
                          </div>
                          <div className="w-2/3 p-8 grid grid-cols-2 gap-x-8 gap-y-4">
                            {[
                              { name: "Royal Weddings", href: "/services/weddings" },
                              { name: "Corporate Galas", href: "/services/corporate-events" },
                              { name: "Exhibitions & Trade", href: "/services/exhibitions" },
                              { name: "Production & Venues", href: "/services/production-venues" },
                              { name: "Seasonal Festivals", href: "/services/seasonal" },
                              { name: "Private Events", href: "/services" },
                            ].map((item) => (
                              <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setHoveredLink(null)}
                                className="group/item flex items-center gap-3 p-3 hover:bg-gray-50 rounded-sm transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30 group-hover/item:bg-gold-500 transition-colors" />
                                <span className="text-[#041E42] text-xs font-medium uppercase tracking-widest">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
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
                href="/consultation"
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
                  href="/consultation"
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
