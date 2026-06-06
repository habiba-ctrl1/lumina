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
  { key: "vendors",   href: "/vendors" },
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

// Spring physics for Emil Kowalski-style motion
const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...springTransition,
      stiffness: 500,
      damping: 35,
    },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    filter: "blur(2px)",
    transition: { duration: 0.15, ease: "easeOut" as const },
  },
};

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseLeave={() => setHoveredLink(null)}
      className={`fixed top-0 start-0 end-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-neutral-200/60 py-3"
          : "bg-transparent py-5"
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
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
                isScrolled ? "h-9" : "h-12"
              }`}
              style={{ filter: isScrolled ? "brightness(0) invert(0)" : "brightness(0) invert(1)" }}
            />
          </Link>
 
          {/* ── Desktop Links ────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center px-8">
            {defaultNavLinks.map((link: any) => {
              const isActive   = pathname === link.href;
              const linkName   = tNav(link.key as any);
              const hasDropdown = ["services", "partners", "locations"].includes(link.key);
 
              return (
                <div
                  key={link.key}
                  className="relative flex items-center"
                  onMouseEnter={() => setHoveredLink(link.key)}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-3.5 py-2
                      text-[13px] font-medium
                      transition-colors duration-150 rounded-lg ${
                        isScrolled
                          ? isActive ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                          : isActive ? "text-white"        : "text-white/70 hover:text-white"
                      }`}
                  >
                    {linkName}
                    {hasDropdown && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          hoveredLink === link.key ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {/* Active indicator — subtle dot */}
                    {isActive && (
                      <motion.span 
                        layoutId="nav-active-indicator"
                        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isScrolled ? "bg-[var(--primary)]" : "bg-white"}`}
                        transition={springTransition}
                      />
                    )}
                  </Link>

                  {/* ── Services Mega Menu ─────────────────────────────────── */}
                  {link.key === "services" && (
                    <AnimatePresence>
                      {hoveredLink === "services" && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full start-1/2 -translate-x-1/2 mt-3
                            w-[680px] bg-white/95 backdrop-blur-xl border border-neutral-200/80
                            rounded-xl overflow-hidden flex"
                          style={{
                            boxShadow: "0 16px 48px -8px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
                          }}
                        >
                          {/* Left panel */}
                          <div className="w-[220px] bg-neutral-50/80 border-r border-neutral-100
                            p-7 flex flex-col justify-between shrink-0">
                            <div>
                              <span className="text-[11px] font-medium text-[var(--primary)] mb-4 block">{tNav("ourExpertise")}</span>
                              <p className="text-xl font-semibold text-neutral-900 leading-snug whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
                                {tNav("premiumCorporateEvents")}
                              </p>
                            </div>
                            <Link
                              href="/services"
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-2 text-[13px] font-medium
                                text-[var(--primary)]
                                hover:text-[var(--primary-dark)] transition-colors group/all mt-6"
                            >
                              {tNav("allServices")}
                              <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                            </Link>
                          </div>

                          {/* Services grid */}
                          <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-1">
                            {services.map((item: any) => (
                              <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setHoveredLink(null)}
                                className="flex items-start gap-3.5 group/item rounded-lg p-3 -mx-3 transition-colors duration-150 hover:bg-neutral-50"
                              >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                  bg-neutral-100/80 border border-neutral-200/60
                                  group-hover/item:bg-emerald-50
                                  group-hover/item:border-emerald-100
                                  transition-all duration-200">
                                  <item.icon
                                    size={16}
                                    className="text-neutral-400 group-hover/item:text-[var(--primary)] transition-colors"
                                  />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[13px] font-medium
                                    text-neutral-900 group-hover/item:text-[var(--primary)] transition-colors mb-0.5">
                                    {tServices(item.key as any)}
                                  </span>
                                  <span className="block text-[12px] text-neutral-400 leading-snug">
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
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full start-0 mt-3
                            w-[260px] bg-white/95 backdrop-blur-xl border border-neutral-200/80
                            rounded-xl overflow-hidden p-2"
                          style={{
                            boxShadow: "0 16px 48px -8px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.04)",
                          }}
                        >
                          {[
                            { label: tNav("partnerWithUs"),  sub: tNav("partnerWithUsSub"), href: "/partners",          Icon: Users    },
                            { label: tNav("becomePartner"), sub: tNav("becomePartnerSub"),  href: "/partners/become-one", Icon: UserPlus },
                          ].map(({ label, sub, href, Icon }) => (
                            <Link
                              key={label}
                              href={href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-start gap-3.5 p-3 rounded-lg
                                hover:bg-neutral-50 transition-all duration-150 group/sub"
                            >
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                bg-neutral-100/80 border border-neutral-200/60
                                group-hover/sub:border-[var(--primary)]/30 transition-all">
                                <Icon size={16} className="text-neutral-400 group-hover/sub:text-[var(--primary)] transition-colors" />
                              </div>
                              <div className="pt-0.5">
                                <span className="block text-[13px] font-medium
                                  text-neutral-900 group-hover/sub:text-[var(--primary)] transition-colors mb-0.5">
                                  {label}
                                </span>
                                <span className="block text-[12px] text-neutral-400 leading-snug">{sub}</span>
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
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full start-0 mt-3
                            w-[200px] bg-white/95 backdrop-blur-xl border border-neutral-200/80
                            rounded-xl overflow-hidden p-2"
                          style={{
                            boxShadow: "0 16px 48px -8px rgba(0,0,0,0.1), 0 4px 8px -2px rgba(0,0,0,0.04)",
                          }}
                        >
                          {locations.map((city: any) => (
                            <Link
                              key={city.name}
                              href={city.href}
                              onClick={() => setHoveredLink(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg
                                hover:bg-neutral-50 transition-all duration-150 group/city"
                            >
                              <MapPin size={14} className="text-neutral-400 group-hover/city:text-[var(--primary)] transition-colors shrink-0" />
                              <span className="text-[13px] font-medium
                                text-neutral-600 group-hover/city:text-neutral-900 transition-colors">
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
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Language toggle */}
            <div
              className={`flex items-center rounded-lg p-0.5 transition-all duration-300 ${
                isScrolled
                  ? "border border-neutral-200/60 bg-neutral-50/50"
                  : "border border-white/20 bg-white/10"
              }`}
              aria-label="Language toggle"
            >
              <button
                onClick={() => switchLanguage('en')}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                  locale === 'en'
                    ? isScrolled ? 'bg-white text-neutral-900 shadow-sm' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-neutral-400 hover:text-neutral-600' : 'text-white/55 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                  locale === 'ar'
                    ? isScrolled ? 'bg-white text-neutral-900 shadow-sm' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-neutral-400 hover:text-neutral-600' : 'text-white/55 hover:text-white'
                }`}
              >
                AR
              </button>
            </div>
 
            {/* CTA */}
            <Link
              href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2
                text-white px-5 py-2.5 rounded-lg
                text-[13px] font-medium transition-opacity duration-200 hover:opacity-90"
              style={{
                background:  "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                boxShadow:   "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              {tNav("requestQuote")}
            </Link>
          </div>
 
          {/* ── Mobile Hamburger ──────────────────────────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-lg transition-all ${
              isScrolled
                ? "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full start-0 end-0
              bg-white/95 backdrop-blur-xl
              border-b border-neutral-200/60 overflow-hidden"
            style={{
              boxShadow: "0 16px 48px -8px rgba(0,0,0,0.08)",
            }}
          >
            <div className="px-6 py-6 space-y-1">
              {defaultNavLinks.map((link: any, i: number) => {
                const isActive = pathname === link.href;
                const linkName = tNav(link.key as any);
                return (
                  <motion.div
                    key={link.key}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ...springTransition }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between
                        px-4 py-3 rounded-lg
                        text-[14px] font-medium
                        transition-colors duration-150 ${
                          isActive
                            ? "text-[var(--primary)] bg-emerald-50/50"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
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
                transition={{ delay: 0.3, ...springTransition }}
                className="pt-4 border-t border-neutral-100 mt-4"
              >
                <Link
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full text-white py-3.5 rounded-lg text-[14px] font-medium"
                  style={{
                    background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                    boxShadow:  "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
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