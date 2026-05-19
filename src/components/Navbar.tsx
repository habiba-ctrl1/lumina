"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Heart, Briefcase, Presentation,
  Landmark, Sparkles, Users, ArrowRight, UserPlus, MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const navLinks = [
  { name: "Home",      href: "/" },
  { name: "About",     href: "/about" },
  { name: "Services",  href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Locations", href: "/locations" },
  { name: "Partners",  href: "/partners" },
  { name: "Journal",   href: "/blog" },
];

const services = [
  { name: "Royal Weddings",       href: "/services/weddings",          icon: Heart,        desc: "Ultra-luxury celebrations" },
  { name: "Corporate Galas",      href: "/services/corporate-events",  icon: Briefcase,    desc: "High-stakes networking" },
  { name: "Exhibitions & Trade",  href: "/services/exhibitions",       icon: Presentation, desc: "B2B brand showcases" },
  { name: "Production & Venues",  href: "/services/production-venues", icon: Landmark,     desc: "Iconic space curation" },
  { name: "Seasonal Festivals",   href: "/services/seasonal",          icon: Sparkles,     desc: "Regional cultural events" },
  { name: "Private Events",       href: "/services",                   icon: Users,        desc: "Exclusive social gatherings" },
];

const locations = [
  { name: "Riyadh",  href: "/locations/riyadh" },
  { name: "Jeddah",  href: "/locations/jeddah" },
  { name: "AlUla",   href: "/locations/alula" },
  { name: "Dammam",  href: "/locations/dammam" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar({ darkHero = false }: { darkHero?: boolean }) {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isOpen, setIsOpen]               = useState(false);
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);
  const pathname                          = usePathname();
 
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => { setIsOpen(false); }, [pathname]);
 
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      onMouseLeave={() => setHoveredLink(null)}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          // Scrolled: solid light surface + subtle slate bottom border
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-2 shadow-sm"
          // Top of page: fully transparent so hero image shows through
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
 
          {/* ── Logo ────────────────────────────────────────────────────────── */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <Image
              src="/main-logo.webp"
              alt="Saudi Event Management"
              width={280}
              height={100}
              priority
              className={`object-contain w-auto transition-all duration-500 ${
                isScrolled ? "h-10" : "h-14"
              }`}
            />
          </Link>
 
          {/* ── Desktop Links ────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center px-8">
            {navLinks.map((link) => {
              const isActive   = pathname === link.href;
              const hasDropdown = ["Services", "Partners", "Locations"].includes(link.name);
              
              // Choose legibility colors dynamically based on scrolling & hero themes
              const textNormal = isScrolled
                ? "text-slate-600 hover:text-slate-900"
                : darkHero
                  ? "text-white/80 hover:text-white"
                  : "text-slate-600 hover:text-slate-900";
              const textActive = isScrolled
                ? "text-emerald-800"
                : darkHero
                  ? "text-gold-400"
                  : "text-emerald-800";
 
              return (
                <div
                  key={link.name}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredLink(link.name)}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 px-3 py-2
                      text-[10px] font-semibold uppercase tracking-[0.15em]
                      transition-colors duration-200 ${
                        isActive ? textActive : textNormal
                      }`}
                  >
                    {link.name}
                    {hasDropdown && (
                      <ChevronDown
                        size={9}
                        className={`transition-transform duration-200 ${
                          hoveredLink === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {/* Active underline */}
                    {isActive && (
                      <span className={`absolute bottom-0 left-3 right-3 h-px ${
                        isScrolled ? "bg-emerald-800" : darkHero ? "bg-gold-400" : "bg-emerald-800"
                      }`} />
                    )}
                  </Link>

                  {/* ── Services Mega Menu ─────────────────────────────────── */}
                  {link.name === "Services" && (
                    <AnimatePresence>
                      {hoveredLink === "Services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                            w-[660px] bg-ink-800 border border-ink-600
                            rounded-lg overflow-hidden flex shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                        >
                          {/* Left panel */}
                          <div className="w-[220px] bg-ink-900 border-r border-ink-600
                            p-7 flex flex-col justify-between shrink-0">
                            <div>
                              <span className="section-label mb-3">Our Expertise</span>
                              <p className="font-display text-2xl font-medium text-sand-50 leading-snug">
                                Bespoke<br />Experiences
                              </p>
                            </div>
                            <Link
                              href="/services"
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-2 text-[10px] font-medium
                                uppercase tracking-widest text-sand-300
                                hover:text-gold-400 transition-colors group/all mt-6"
                            >
                              All Services
                              <ArrowRight size={11} className="group-hover/all:translate-x-1 transition-transform" />
                            </Link>
                          </div>

                          {/* Services grid */}
                          <div className="flex-1 p-7 grid grid-cols-2 gap-x-6 gap-y-5">
                            {services.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setHoveredLink(null)}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0
                                  bg-ink-700 border border-ink-500
                                  group-hover/item:bg-gold-400/10
                                  group-hover/item:border-gold-400/30
                                  transition-all duration-200">
                                  <item.icon
                                    size={15}
                                    className="text-sand-400 group-hover/item:text-gold-400 transition-colors"
                                  />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[10px] font-medium uppercase tracking-widest
                                    text-sand-200 group-hover/item:text-gold-400 transition-colors mb-0.5">
                                    {item.name}
                                  </span>
                                  <span className="block text-[10px] text-sand-400 leading-none">
                                    {item.desc}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* ── Partners Dropdown ──────────────────────────────────── */}
                  {link.name === "Partners" && (
                    <AnimatePresence>
                      {hoveredLink === "Partners" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3
                            w-[260px] bg-ink-800 border border-ink-600
                            rounded-lg overflow-hidden p-2
                            shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                        >
                          {[
                            { label: "Partner with Us",  sub: "Overview of partnerships", href: "/partners",          Icon: Users    },
                            { label: "Become a Partner", sub: "Join our elite ecosystem",  href: "/partners/become-one", Icon: UserPlus },
                          ].map(({ label, sub, href, Icon }) => (
                            <Link
                              key={label}
                              href={href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-start gap-3 p-3 rounded-md
                                hover:bg-ink-700 transition-all group/sub"
                            >
                              <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0
                                bg-ink-700 border border-ink-500
                                group-hover/sub:border-gold-400/30 transition-all">
                                <Icon size={13} className="text-sand-400 group-hover/sub:text-gold-400 transition-colors" />
                              </div>
                              <div className="pt-0.5">
                                <span className="block text-[10px] font-medium uppercase tracking-widest
                                  text-sand-200 group-hover/sub:text-gold-400 transition-colors mb-0.5">
                                  {label}
                                </span>
                                <span className="block text-[10px] text-sand-400 leading-none">{sub}</span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* ── Locations Dropdown ─────────────────────────────────── */}
                  {link.name === "Locations" && (
                    <AnimatePresence>
                      {hoveredLink === "Locations" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-3
                            w-[180px] bg-ink-800 border border-ink-600
                            rounded-lg overflow-hidden p-2
                            shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                        >
                          {locations.map((city) => (
                            <Link
                              key={city.name}
                              href={city.href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-md
                                hover:bg-ink-700 transition-all group/city"
                            >
                              <MapPin size={11} className="text-sand-500 group-hover/city:text-gold-400 transition-colors shrink-0" />
                              <span className="text-[10px] font-medium uppercase tracking-widest
                                text-sand-300 group-hover/city:text-sand-50 transition-colors">
                                {city.name}
                              </span>
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

          {/* ── Right: Lang + CTA ─────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* Language toggle */}
            <button className="flex items-center gap-2 group" aria-label="Language toggle">
              <span className="text-[10px] font-medium tracking-widest text-gold-400">EN</span>
              <span className={`w-px h-3 ${isScrolled ? "bg-slate-300" : darkHero ? "bg-white/20" : "bg-slate-300"}`} />
              <span className={`text-[10px] font-medium tracking-widest transition-colors ${
                isScrolled
                  ? "text-slate-500 group-hover:text-slate-900"
                  : darkHero
                    ? "text-slate-300 group-hover:text-white"
                    : "text-slate-500 group-hover:text-slate-900"
              }`}>AR</span>
            </button>

            {/* CTA */}
            <Link
              href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
                bg-gold-400 text-ink-950
                px-6 py-2.5 rounded-sm
                text-[10px] font-medium uppercase tracking-[0.18em]
                transition-all duration-200
                hover:bg-gold-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              Book Now
            </Link>
          </div>

          {/* ── Mobile Hamburger ──────────────────────────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled
                ? "text-slate-800 hover:text-emerald-800"
                : darkHero
                  ? "text-white hover:text-gold-400"
                  : "text-slate-800 hover:text-emerald-800"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 right-0
              bg-ink-900/98 backdrop-blur-xl
              border-b border-ink-600 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between
                        px-4 py-3 rounded-md
                        text-[11px] font-medium uppercase tracking-widest
                        transition-colors duration-150 ${
                          isActive
                            ? "text-gold-400 bg-gold-400/5"
                            : "text-sand-300 hover:text-sand-50 hover:bg-ink-800"
                        }`}
                    >
                      {link.name}
                      {isActive && <span className="w-1 h-1 rounded-full bg-gold-400" />}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="pt-5 border-t border-ink-600 mt-4"
              >
                <Link
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full justify-center py-3.5 text-[10px]"
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