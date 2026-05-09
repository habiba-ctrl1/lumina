"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
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
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Locations", href: "/locations" },
    { name: "Partners", href: "#partners" },
    { name: "Journal", href: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/10 py-4`}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/sem-logo.svg" 
                alt="Saudi Event Management Logo" 
                width={160} 
                height={50}
                className="object-contain h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div 
                  key={link.name} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.name)}
                >
                  <Link
                    href={link.href}
                    className={`relative px-2 py-1 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                      isActive || hoveredLink === link.name ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {link.name}
                      {["Services", "Partners", "Locations"].includes(link.name) && (
                        <ChevronDown size={10} className={`transition-transform duration-300 ${hoveredLink === link.name ? "rotate-180" : ""}`} />
                      )}
                    </span>
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>

                  {/* Mega Menu for Services */}
                  {link.name === "Services" && (
                    <AnimatePresence>
                      {hoveredLink === "Services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden flex mt-4"
                        >
                          <div className="w-1/3 bg-gray-50 relative p-8">
                            <Image 
                              src="/gallery_1.png" 
                              alt="Saudi Event Management Services" 
                              fill 
                              className="object-cover opacity-50 grayscale"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="relative z-10 h-full flex flex-col justify-end">
                              <h3 className="text-black font-sans text-lg mb-2 font-bold">Bespoke<br/>Experiences</h3>
                              <p className="text-gray-600 text-[10px] font-semibold">Crafting extraordinary events.</p>
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
                                className="group/item flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary transition-colors" />
                                <span className="text-black text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Dropdown for Partners */}
                  {link.name === "Partners" && (
                    <AnimatePresence>
                      {hoveredLink === "Partners" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-0 w-[280px] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden mt-4 p-2"
                        >
                          <Link 
                            href="/partners" 
                            className="flex flex-col p-4 hover:bg-gray-50 rounded-xl transition-all group/sub"
                            onClick={() => setHoveredLink(null)}
                          >
                            <span className="text-black text-[11px] font-bold uppercase tracking-widest mb-1 group-hover/sub:text-primary transition-colors">Partner with Us</span>
                            <span className="text-gray-400 text-[10px] font-medium leading-tight">Overview of partnerships</span>
                          </Link>
                          <Link 
                            href="/vendor-registration" 
                            className="flex flex-col p-4 hover:bg-gray-50 rounded-xl transition-all group/sub"
                            onClick={() => setHoveredLink(null)}
                          >
                            <span className="text-black text-[11px] font-bold uppercase tracking-widest mb-1 group-hover/sub:text-primary transition-colors">Vendor Registration</span>
                            <span className="text-gray-400 text-[10px] font-medium leading-tight">Join our elite vendor network</span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Dropdown for Locations */}
                  {link.name === "Locations" && (
                    <AnimatePresence>
                      {hoveredLink === "Locations" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-0 w-[200px] bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden mt-4 p-2"
                        >
                          {["Riyadh", "Jeddah", "Makkah", "Madinah", "AlUla", "Dammam"].map((city) => (
                            <Link 
                              key={city}
                              href="/locations" 
                              className="flex p-3 hover:bg-gray-50 rounded-xl transition-all group/sub"
                              onClick={() => setHoveredLink(null)}
                            >
                              <span className="text-black text-[10px] font-bold uppercase tracking-widest group-hover/sub:text-primary transition-colors">{city}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}

            {/* Premium CTA */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 group">
                <span className="text-[10px] font-bold tracking-widest text-primary">EN</span>
                <span className="w-px h-3 bg-gray-200" />
                <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-black transition-colors">AR</span>
              </button>
              
              <Link
                href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white text-[10px] py-3 px-8 uppercase tracking-[0.2em] font-bold rounded-xl hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black p-2 transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 z-[100] lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-8 py-10 space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full py-4 text-xs"
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
