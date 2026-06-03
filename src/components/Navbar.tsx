"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Heart, Briefcase, Presentation,
  Landmark, Sparkles, Users, ArrowRight, UserPlus, MapPin,
} from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
// Note: The labels are now fetched via useTranslations inside the component
const defaultNavLinks = [
  { key: "home",      href: "/" },
  { key: "about",     href: "/about" },
  { key: "services",  href: "/services" },
  { key: "portfolio", href: "/portfolio" },
  { key: "locations", href: "/locations" },
  { key: "contact",   href: "/contact" },
  { key: "journal",   href: "/blog" },
];

const services = [
  { key: "royalWeddings",       href: "/services/weddings",          icon: Heart },
  { key: "corporateGalas",      href: "/services/corporate-events",          icon: Briefcase },
  { key: "exhibitionsTrade",  href: "/services/exhibitions",icon: Presentation },
  { key: "eventProduction",  href: "/services/event-production",           icon: Landmark },
  { key: "culturalSeasonal",   href: "/services/cultural-events",                         icon: Sparkles },
  { key: "luxuryVip",   href: "/services/luxury-vip-events",                         icon: Sparkles },
  { key: "privateEvents",       href: "/services",                                  icon: Users },
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
export default function Navbar({ darkHero = false, locale = "en" }: { darkHero?: boolean, locale?: string }) {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isOpen, setIsOpen]               = useState(false);
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);
  const pathname                          = usePathname();
  const router                            = useRouter();
  const tNav = useTranslations("nav");
  const tServices = useTranslations("navServices");
  const tLocs = useTranslations("navLocations");
 
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };
 
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      onMouseLeave={() => setHoveredLink(null)}
      className={`fixed top-0 start-0 end-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm"
          : "bg-white border-b border-slate-100 py-5"
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
              style={{ filter: "brightness(0) invert(0)" }} // Ensure dark logo on white background
            />
          </Link>
 
          {/* ── Desktop Links ────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center px-8">
            {defaultNavLinks.map((link: any) => {
              const isActive   = pathname === link.href;
              const linkName   = tNav(link.key as any);
              const hasDropdown = ["services", "partners", "locations"].includes(link.key);
              
              const textNormal = "text-slate-600 hover:text-slate-900";
              const textActive = "text-[var(--primary)]";
 
              return (
                <div
                  key={link.key}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredLink(link.key)}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1 px-4 py-2
                      text-[10px] font-bold uppercase tracking-widest
                      transition-colors duration-200 ${
                        isActive ? textActive : textNormal
                      }`}
                  >
                    {linkName}
                    {hasDropdown && (
                      <ChevronDown
                        size={10}
                        className={`transition-transform duration-200 ${
                          hoveredLink === link.key ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {/* Active underline */}
                    {isActive && (
                      <span className="absolute bottom-0 start-4 end-4 h-[2px] bg-[var(--primary)]" />
                    )}
                  </Link>

                  {/* ── Services Mega Menu ─────────────────────────────────── */}
                  {link.key === "services" && (
                    <AnimatePresence>
                      {hoveredLink === "services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full start-1/2 -translate-x-1/2 mt-4
                            w-[720px] bg-white border border-slate-200
                            rounded-xl overflow-hidden flex shadow-2xl"
                        >
                          {/* Left panel */}
                          <div className="w-[240px] bg-slate-50 border-r border-slate-200
                            p-8 flex flex-col justify-between shrink-0">
                            <div>
                              <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest mb-4 block">{tNav("ourExpertise")}</span>
                              <p className="font-display text-2xl font-bold text-slate-900 leading-snug whitespace-pre-line">
                                {tNav("premiumCorporateEvents")}
                              </p>
                            </div>
                            <Link
                              href="/services"
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-2 text-[10px] font-bold
                                uppercase tracking-widest text-[var(--primary)]
                                hover:text-[var(--primary-dark)] transition-colors group/all mt-6"
                            >
                              {tNav("allServices")}
                              <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                            </Link>
                          </div>

                          {/* Services grid */}
                          <div className="flex-1 p-8 grid grid-cols-2 gap-x-8 gap-y-6">
                            {services.map((item: any) => (
                              <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setHoveredLink(null)}
                                className="flex items-start gap-4 group/item"
                              >
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                                  bg-slate-50 border border-slate-200
                                  group-hover/item:bg-teal-50
                                  group-hover/item:border-teal-100
                                  transition-all duration-300">
                                  <item.icon
                                    size={18}
                                    className="text-slate-400 group-hover/item:text-[var(--primary)] transition-colors"
                                  />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[11px] font-bold uppercase tracking-widest
                                    text-slate-900 group-hover/item:text-[var(--primary)] transition-colors mb-1">
                                    {tServices(item.key as any)}
                                  </span>
                                  <span className="block text-[11px] text-slate-500 leading-snug">
                                    {tServices(`${item.key}Desc` as any)}
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
                  {link.key === "partners" && (
                    <AnimatePresence>
                      {hoveredLink === "partners" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full start-0 mt-4
                            w-[280px] bg-white border border-slate-200
                            rounded-xl overflow-hidden p-3
                            shadow-2xl"
                        >
                          {[
                            { label: tNav("partnerWithUs"),  sub: tNav("partnerWithUsSub"), href: "/partners",          Icon: Users    },
                            { label: tNav("becomePartner"), sub: tNav("becomePartnerSub"),  href: "/partners/become-one", Icon: UserPlus },
                          ].map(({ label, sub, href, Icon }) => (
                            <Link
                              key={label}
                              href={href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-start gap-4 p-3 rounded-lg
                                hover:bg-slate-50 transition-all group/sub"
                            >
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                                bg-white border border-slate-200
                                group-hover/sub:border-[var(--primary)] transition-all">
                                <Icon size={18} className="text-slate-400 group-hover/sub:text-[var(--primary)] transition-colors" />
                              </div>
                              <div className="pt-0.5">
                                <span className="block text-[10px] font-bold uppercase tracking-widest
                                  text-slate-900 group-hover/sub:text-[var(--primary)] transition-colors mb-1">
                                  {label}
                                </span>
                                <span className="block text-[11px] text-slate-500 leading-snug">{sub}</span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* ── Locations Dropdown ─────────────────────────────────── */}
                  {link.key === "locations" && (
                    <AnimatePresence>
                      {hoveredLink === "locations" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full start-0 mt-4
                            w-[200px] bg-white border border-slate-200
                            rounded-xl overflow-hidden p-3
                            shadow-2xl"
                        >
                          {locations.map((city: any) => (
                            <Link
                              key={city.name}
                              href={city.href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg
                                hover:bg-slate-50 transition-all group/city"
                            >
                              <MapPin size={14} className="text-slate-400 group-hover/city:text-[var(--primary)] transition-colors shrink-0" />
                              <span className="text-[10px] font-bold uppercase tracking-widest
                                text-slate-600 group-hover/city:text-slate-900 transition-colors">
                                {tLocs(city.name.toLowerCase() as any)}
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
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            {/* Language toggle */}
            <div className="flex items-center gap-2 group" aria-label="Language toggle">
              <button onClick={() => switchLanguage('en')} className={`text-[10px] font-bold tracking-widest transition-colors ${locale === 'en' ? 'text-[var(--primary)]' : 'text-slate-400 hover:text-slate-900'}`}>EN</button>
              <span className="w-[1px] h-3 bg-slate-300" />
              <button onClick={() => switchLanguage('ar')} className={`text-[10px] font-bold tracking-widest transition-colors ${locale === 'ar' ? 'text-[var(--primary)]' : 'text-slate-400 hover:text-slate-900'}`}>AR</button>
            </div>
 
            {/* CTA */}
            <Link
              href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
                bg-[var(--primary)] text-white
                px-6 py-3 rounded-md
                text-[10px] font-bold uppercase tracking-widest
                transition-all duration-300
                hover:bg-[var(--primary-dark)] hover:shadow-lg hover:-translate-y-0.5"
            >
              {tNav("requestQuote")}
            </Link>
          </div>
 
          {/* ── Mobile Hamburger ──────────────────────────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-900 hover:text-[var(--primary)] transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="lg:hidden absolute top-full start-0 end-0
              bg-white/95 backdrop-blur-xl
              border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-8 space-y-2">
              {defaultNavLinks.map((link: any, i: number) => {
                const isActive = pathname === link.href;
                const linkName = tNav(link.key as any);
                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between
                        px-4 py-4 rounded-lg
                        text-[11px] font-bold uppercase tracking-widest
                        transition-colors duration-150 ${
                          isActive
                            ? "text-[var(--primary)] bg-teal-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                    >
                      {linkName}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />}
                    </Link>
                  </motion.div>
                );
              })}
 
              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="pt-6 border-t border-slate-100 mt-6"
              >
                <Link
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-[var(--primary)] text-white py-4 rounded-md text-[11px] font-bold uppercase tracking-widest"
                >
                  {tNav("requestQuote")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}