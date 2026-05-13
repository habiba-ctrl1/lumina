"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart, Briefcase, Presentation, Landmark, Sparkles, Users, ArrowRight, UserPlus, MapPin } from "lucide-react";
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
    { name: "Partners", href: "/partners" },
    { name: "Journal", href: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 py-2" 
          : "bg-white/80 backdrop-blur-lg border-b border-transparent py-3"
      }`}
      onMouseLeave={() => setHoveredLink(null)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/main-logo.webp" 
                alt="Saudi Event Management Logo" 
                width={280} 
                height={100}
                className={`object-contain transition-all duration-500 ${isScrolled ? "h-12" : "h-16"} w-auto`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end px-12">
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
                          <div className="w-[280px] bg-gray-50 relative p-8 border-r border-gray-100 flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                              <Image 
                                src="/main-logo.webp" 
                                alt="Background Pattern" 
                                width={300}
                                height={200}
                                className="object-contain p-4 scale-150 rotate-12"
                              />
                            </div>
                            <div className="relative z-10">
                              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Our Expertise</span>
                              <p className="text-black font-sans text-xl leading-tight font-bold">Bespoke<br/>Experiences</p>
                            </div>
                            <Link 
                              href="/services"
                              onClick={() => setHoveredLink(null)}
                              className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors group/all"
                            >
                              View All Services <ArrowRight size={12} className="group-hover/all:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                          <div className="flex-1 p-8 grid grid-cols-2 gap-x-10 gap-y-6">
                            {[
                              { name: "Royal Weddings", href: "/services/weddings", icon: Heart, desc: "Ultra-luxury celebrations" },
                              { name: "Corporate Galas", href: "/services/corporate-events", icon: Briefcase, desc: "High-stakes networking" },
                              { name: "Exhibitions & Trade", href: "/services/exhibitions", icon: Presentation, desc: "B2B brand showcases" },
                              { name: "Production & Venues", href: "/services/production-venues", icon: Landmark, desc: "Iconic space curation" },
                              { name: "Seasonal Festivals", href: "/services/seasonal", icon: Sparkles, desc: "Regional cultural events" },
                              { name: "Private Events", href: "/services", icon: Users, desc: "Exclusive social gatherings" },
                            ].map((item) => (
                              <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setHoveredLink(null)}
                                className="group/item flex items-start gap-4 transition-all"
                              >
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/item:bg-primary group-hover/item:border-primary transition-all duration-300">
                                  <item.icon size={18} className="text-gray-400 group-hover/item:text-white transition-colors" />
                                </div>
                                <div>
                                  <span className="text-black text-[11px] font-bold uppercase tracking-widest block mb-0.5 group-hover/item:text-primary transition-colors">{item.name}</span>
                                  <span className="text-gray-400 text-[9px] font-medium leading-none block">{item.desc}</span>
                                </div>
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
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group/sub"
                            onClick={() => setHoveredLink(null)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/sub:bg-primary transition-colors">
                              <Users size={14} className="text-gray-400 group-hover/sub:text-white" />
                            </div>
                            <div>
                              <span className="text-black text-[11px] font-bold uppercase tracking-widest block mb-0.5 group-hover/sub:text-primary transition-colors">Partner with Us</span>
                              <span className="text-gray-400 text-[9px] font-medium leading-none block">Overview of partnerships</span>
                            </div>
                          </Link>
                          <Link 
                            href="/partners/become-one" 
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all group/sub"
                            onClick={() => setHoveredLink(null)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/sub:bg-primary transition-colors">
                              <UserPlus size={14} className="text-gray-400 group-hover/sub:text-white" />
                            </div>
                            <div>
                              <span className="text-black text-[11px] font-bold uppercase tracking-widest block mb-0.5 group-hover/sub:text-primary transition-colors">Become a Partner</span>
                              <span className="text-gray-400 text-[9px] font-medium leading-none block">Join our elite ecosystem</span>
                            </div>
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
                          {[
                            { name: "Riyadh", href: "/locations/riyadh" },
                            { name: "Jeddah", href: "/locations/jeddah" },
                            { name: "AlUla", href: "/locations/alula" },
                            { name: "Dammam", href: "/locations/dammam" },
                          ].map((city) => (
                            <Link 
                              key={city.name}
                              href={city.href} 
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all group/sub"
                              onClick={() => setHoveredLink(null)}
                            >
                              <MapPin size={12} className="text-gray-300 group-hover/sub:text-primary" />
                              <span className="text-black text-[10px] font-bold uppercase tracking-widest group-hover/sub:text-primary transition-colors">{city.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
            </div>


          {/* Premium CTA */}
          <div className="hidden lg:flex items-center gap-6">
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
