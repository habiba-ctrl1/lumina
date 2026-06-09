"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Heart, Briefcase, Presentation,
  Landmark, Sparkles, Users, ArrowRight, UserPlus, MapPin,
  Trophy, TrendingUp, ImageIcon, Building2, Info, Handshake,
} from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
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
  { key: "royalWeddings",    href: "/services/weddings",          icon: Heart },
  { key: "corporateGalas",   href: "/services/corporate-events",  icon: Briefcase },
  { key: "exhibitionsTrade", href: "/services/exhibitions",       icon: Presentation },
  { key: "eventProduction",  href: "/services/event-production",  icon: Landmark },
  { key: "culturalSeasonal", href: "/services/cultural-events",   icon: Sparkles },
  { key: "luxuryVip",        href: "/services/luxury-vip-events", icon: Sparkles },
  { key: "privateEvents",    href: "/services",                   icon: Users },
];

const locations = [
  // ── Primary markets (dedicated SEO pages) ──
  { key: "riyadh",  name: "Riyadh",    href: "/locations/riyadh",  region: "Capital Region",      badge: "HQ"     },
  { key: "jeddah",  name: "Jeddah",    href: "/locations/jeddah",  region: "Western Province",    badge: ""       },
  { key: "makkah",  name: "Makkah",    href: "/locations/makkah",  region: "Holy Capital",        badge: "Muslim" },
  { key: "dammam",  name: "Dammam",    href: "/locations/dammam",  region: "Eastern Province",    badge: ""       },
  { key: "alula",   name: "AlUla",     href: "/locations/alula",   region: "UNESCO Heritage",     badge: "Luxury" },
  // ── Extended coverage ──
  { key: "madinah", name: "Madinah",   href: "/locations/madinah", region: "Al Madinah Province", badge: ""       },
  { key: "khobar",  name: "Al Khobar", href: "/locations/khobar",  region: "Eastern Province",    badge: ""       },
  { key: "neom",    name: "NEOM",      href: "/locations/neom",    region: "Tabuk Province",      badge: "Giga"   },
  { key: "taif",    name: "Taif",      href: "/locations/taif",    region: "Makkah Province",     badge: ""       },
  { key: "abha",    name: "Abha",      href: "/locations/abha",    region: "Aseer Province",      badge: ""       },
  { key: "diriyah", name: "Diriyah",   href: "/locations/diriyah", region: "Riyadh Province",     badge: "UNESCO" },
  { key: "tabuk",   name: "Tabuk",     href: "/locations/tabuk",   region: "Tabuk Province",      badge: ""       },
];

const portfolioItems = [
  { key: "luxuryWeddings",  label: "Luxury Weddings",    href: "/portfolio/luxury-weddings",  icon: Heart,      desc: "Royal ceremonies & bridal events"     },
  { key: "corporateEvents", label: "Corporate Events",   href: "/portfolio/corporate-events", icon: Briefcase,  desc: "Summits, galas & brand activations"   },
  { key: "vision2030",      label: "Vision 2030",        href: "/portfolio/vision-2030",      icon: TrendingUp, desc: "Giga-project & government showcases"  },
  { key: "allPortfolio",    label: "View All Projects",  href: "/portfolio",                  icon: ImageIcon,  desc: "Browse the full portfolio gallery"    },
];

const aboutItems = [
  { label: "About Us",           href: "/about",                    icon: Info,       desc: "Our story, mission & values"          },
  { label: "Our Team",           href: "/about/our-team",           icon: Users,      desc: "Meet the people behind every event"   },
  { label: "Awards & Accolades", href: "/about/awards-accolades",   icon: Trophy,     desc: "Recognition & industry milestones"    },
  { label: "Partner With Us",    href: "/vendors",                  icon: Handshake,  desc: "Join our vendor & partner network"    },
  { label: "Careers",            href: "/about/careers",            icon: Building2,  desc: "Grow with Saudi Event Management"     },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion variants
// ─────────────────────────────────────────────────────────────────────────────
const spring = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

const dropdownVariants = {
  hidden:  { opacity: 0, y: 8,  scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 500, damping: 35 },
  },
  exit: {
    opacity: 0, y: 4, scale: 0.98, filter: "blur(2px)",
    transition: { duration: 0.14, ease: "easeOut" as const },
  },
};

const drawerVariants = (rtl: boolean) => ({
  hidden:  { x: rtl ? "-100%" : "100%" },
  visible: { x: 0, transition: { type: "spring" as const, stiffness: 320, damping: 32 } },
  exit:    { x: rtl ? "-100%" : "100%", transition: { type: "spring" as const, stiffness: 380, damping: 36 } },
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar({ darkHero = false, locale: localeProp }: { darkHero?: boolean; locale?: string }) {
  // useLocale() reads from NextIntlClientProvider context — reliable on every page
  const contextLocale = useLocale();
  const locale        = localeProp ?? contextLocale;
  const isRtl         = locale === "ar";

  const [isScrolled,      setIsScrolled]      = useState(false);
  const [isOpen,          setIsOpen]          = useState(false);
  const [hoveredLink,     setHoveredLink]      = useState<string | null>(null);
  const [mobileExpanded,  setMobileExpanded]  = useState<string | null>(null);

  // Timer ref — prevents dropdown from closing while mouse briefly leaves nav item
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname    = usePathname();
  const router      = useRouter();
  const tNav        = useTranslations("nav");
  const tServices   = useTranslations("navServices");

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setMobileExpanded(null); }, [pathname]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Hover handlers with debounce ─────────────────────────────────────────
  const onNavItemEnter = (key: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHoveredLink(key);
  };

  const onNavItemLeave = () => {
    hideTimer.current = setTimeout(() => setHoveredLink(null), 130);
  };

  const onDropdownEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const onDropdownLeave = () => {
    hideTimer.current = setTimeout(() => setHoveredLink(null), 130);
  };

  const closeDropdown = () => setHoveredLink(null);

  // ── Language switch ───────────────────────────────────────────────────────
  const switchLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  // ── Shared styles ─────────────────────────────────────────────────────────
  const navLinkBase = `relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-150`;
  const navLinkColor = (active: boolean) =>
    isScrolled
      ? active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
      : active ? "text-white"       : "text-white/70 hover:text-white";

  return (
    <>
      {/* ───────────────────────── Navbar bar ───────────────────────────── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-neutral-200/60 py-3"
            : "bg-transparent py-5"
        }`}
        style={{ WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/main-logo.webp"
                alt="Saudi Event Management"
                width={280}
                height={100}
                priority
                className={`object-contain w-auto transition-all duration-500 ${isScrolled ? "h-9" : "h-12"}`}
                style={{ filter: isScrolled ? "brightness(0) invert(0)" : "brightness(0) invert(1)" }}
              />
            </Link>

            {/* ── Desktop links ───────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center px-8">
              {defaultNavLinks.map((link) => {
                const isActive    = pathname === link.href;
                const hasDropdown = ["services", "locations", "portfolio", "about", "partners"].includes(link.key);
                const isHovered   = hoveredLink === link.key;

                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={() => onNavItemEnter(link.key)}
                    onMouseLeave={onNavItemLeave}
                  >
                    <Link href={link.href} className={`${navLinkBase} ${navLinkColor(isActive)}`}>
                      {tNav(link.key as any)}
                      {hasDropdown && (
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`}
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                            isScrolled ? "bg-[var(--primary)]" : "bg-white"
                          }`}
                          transition={spring}
                        />
                      )}
                    </Link>

                    {/* ── Services mega-menu ─────────────────────────────── */}
                    {link.key === "services" && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden" animate="visible" exit="exit"
                            onMouseEnter={onDropdownEnter}
                            onMouseLeave={onDropdownLeave}
                            className="absolute top-[calc(100%+10px)] w-[680px] bg-white/97 backdrop-blur-xl border border-neutral-200/80 rounded-xl overflow-hidden flex"
                            style={{
                              left: "50%",
                              transform: "translateX(-50%)",
                              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
                            }}
                          >
                            {/* Left panel */}
                            <div className="w-[220px] bg-neutral-50/80 border-e border-neutral-100 p-7 flex flex-col justify-between shrink-0">
                              <div>
                                <span className="text-[11px] font-medium text-[var(--primary)] mb-4 block tracking-wider uppercase">
                                  {tNav("ourExpertise")}
                                </span>
                                <p className="text-xl font-semibold text-neutral-900 leading-snug whitespace-pre-line" style={{ letterSpacing: "-0.02em" }}>
                                  {tNav("premiumCorporateEvents")}
                                </p>
                              </div>
                              <Link
                                href="/services"
                                onClick={closeDropdown}
                                className="group/all inline-flex items-center gap-2 text-[13px] font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors mt-6"
                              >
                                {tNav("allServices")}
                                <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                              </Link>
                            </div>

                            {/* Services grid */}
                            <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-1">
                              {services.map((item) => (
                                <Link
                                  key={item.key}
                                  href={item.href}
                                  onClick={closeDropdown}
                                  className="group/item flex items-start gap-3 p-3 -mx-3 rounded-lg transition-colors duration-150 hover:bg-neutral-50"
                                >
                                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100/80 border border-neutral-200/60 group-hover/item:bg-emerald-50 group-hover/item:border-emerald-100 transition-all duration-200">
                                    <item.icon size={16} className="text-neutral-400 group-hover/item:text-[var(--primary)] transition-colors" />
                                  </div>
                                  <div className="pt-0.5 min-w-0">
                                    <span className="block text-[13px] font-medium text-neutral-900 group-hover/item:text-[var(--primary)] transition-colors mb-0.5 truncate">
                                      {tServices(item.key as any)}
                                    </span>
                                    <span className="block text-[11.5px] text-neutral-400 leading-snug">
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

                    {/* ── Partners dropdown ──────────────────────────────── */}
                    {link.key === "partners" && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden" animate="visible" exit="exit"
                            onMouseEnter={onDropdownEnter}
                            onMouseLeave={onDropdownLeave}
                            className="absolute top-[calc(100%+10px)] start-0 w-[260px] bg-white/97 backdrop-blur-xl border border-neutral-200/80 rounded-xl overflow-hidden p-2"
                            style={{ boxShadow: "0 20px 60px -12px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04)" }}
                          >
                            {[
                              { label: tNav("partnerWithUs"),  sub: tNav("partnerWithUsSub"),  href: "/partners",           Icon: Users    },
                              { label: tNav("becomePartner"),  sub: tNav("becomePartnerSub"),   href: "/partners/become-one", Icon: UserPlus },
                            ].map(({ label, sub, href, Icon }) => (
                              <Link
                                key={href}
                                href={href}
                                onClick={closeDropdown}
                                className="group/sub flex items-start gap-3.5 p-3 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                              >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100/80 border border-neutral-200/60 group-hover/sub:border-[var(--primary)]/30 transition-all">
                                  <Icon size={16} className="text-neutral-400 group-hover/sub:text-[var(--primary)] transition-colors" />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[13px] font-medium text-neutral-900 group-hover/sub:text-[var(--primary)] transition-colors mb-0.5">{label}</span>
                                  <span className="block text-[11.5px] text-neutral-400 leading-snug">{sub}</span>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ── Portfolio dropdown ───────────────────────────── */}
                    {link.key === "portfolio" && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden" animate="visible" exit="exit"
                            onMouseEnter={onDropdownEnter}
                            onMouseLeave={onDropdownLeave}
                            className="absolute top-[calc(100%+10px)] w-[300px] bg-white/97 backdrop-blur-xl border border-neutral-200/80 rounded-xl overflow-hidden p-2"
                            style={{
                              left: "50%", transform: "translateX(-50%)",
                              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04)",
                            }}
                          >
                            {portfolioItems.map((item) => (
                              <Link
                                key={item.key}
                                href={item.href}
                                onClick={closeDropdown}
                                className="group/p flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-150"
                              >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100/80 border border-neutral-200/60 group-hover/p:bg-emerald-50 group-hover/p:border-emerald-100 transition-all duration-200">
                                  <item.icon size={15} className="text-neutral-400 group-hover/p:text-[var(--primary)] transition-colors" />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[13px] font-medium text-neutral-900 group-hover/p:text-[var(--primary)] transition-colors mb-0.5">{item.label}</span>
                                  <span className="block text-[11.5px] text-neutral-400 leading-snug">{item.desc}</span>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ── About dropdown ────────────────────────────────── */}
                    {link.key === "about" && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden" animate="visible" exit="exit"
                            onMouseEnter={onDropdownEnter}
                            onMouseLeave={onDropdownLeave}
                            className="absolute top-[calc(100%+10px)] w-[300px] bg-white/97 backdrop-blur-xl border border-neutral-200/80 rounded-xl overflow-hidden p-2"
                            style={{
                              left: "50%", transform: "translateX(-50%)",
                              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04)",
                            }}
                          >
                            {aboutItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeDropdown}
                                className="group/a flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-150"
                              >
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100/80 border border-neutral-200/60 group-hover/a:bg-emerald-50 group-hover/a:border-emerald-100 transition-all duration-200">
                                  <item.icon size={15} className="text-neutral-400 group-hover/a:text-[var(--primary)] transition-colors" />
                                </div>
                                <div className="pt-0.5">
                                  <span className="block text-[13px] font-medium text-neutral-900 group-hover/a:text-[var(--primary)] transition-colors mb-0.5">{item.label}</span>
                                  <span className="block text-[11.5px] text-neutral-400 leading-snug">{item.desc}</span>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* ── Locations mega-menu ───────────────────────────── */}
                    {link.key === "locations" && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden" animate="visible" exit="exit"
                            onMouseEnter={onDropdownEnter}
                            onMouseLeave={onDropdownLeave}
                            className="absolute top-[calc(100%+10px)] w-[680px] bg-white/97 backdrop-blur-xl border border-neutral-200/80 rounded-xl overflow-hidden flex"
                            style={{
                              left: "50%",
                              transform: "translateX(-50%)",
                              boxShadow: "0 20px 60px -12px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
                            }}
                          >
                            {/* Left panel */}
                            <div className="w-[220px] bg-neutral-50/80 border-e border-neutral-100 p-7 flex flex-col justify-between shrink-0">
                              <div>
                                <span className="text-[11px] font-medium text-[var(--primary)] mb-4 block tracking-wider uppercase">
                                  Our Locations
                                </span>
                                <p className="text-xl font-semibold text-neutral-900 leading-snug" style={{ letterSpacing: "-0.02em" }}>
                                  Saudi Arabia<br />Event<br />Destinations
                                </p>
                                <p className="text-[12px] text-neutral-400 mt-3 leading-relaxed">
                                  12 cities. One standard of excellence.
                                </p>
                              </div>
                              <Link
                                href="/locations"
                                onClick={closeDropdown}
                                className="group/all inline-flex items-center gap-2 text-[13px] font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors mt-6"
                              >
                                All Locations
                                <ArrowRight size={14} className="group-hover/all:translate-x-1 transition-transform" />
                              </Link>
                            </div>

                            {/* Cities grid — 2 columns */}
                            <div className="flex-1 p-5 grid grid-cols-2 gap-x-4 gap-y-0.5 content-start">
                              {locations.map((city) => (
                                <Link
                                  key={city.key}
                                  href={city.href}
                                  onClick={closeDropdown}
                                  className="group/city flex items-start gap-2.5 px-3 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors duration-150"
                                >
                                  <MapPin size={13} className="text-neutral-300 group-hover/city:text-[var(--primary)] transition-colors shrink-0 mt-0.5" />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-[13px] font-medium text-neutral-800 group-hover/city:text-[var(--primary)] transition-colors leading-tight">
                                        {city.name}
                                      </span>
                                      {city.badge && (
                                        <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full leading-none">
                                          {city.badge}
                                        </span>
                                      )}
                                    </div>
                                    <span className="block text-[11px] text-neutral-400 mt-0.5 leading-tight">{city.region}</span>
                                  </div>
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
            </div>

            {/* ── Desktop right: lang + CTA ───────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Language toggle */}
              <div
                className={`flex items-center rounded-lg p-0.5 transition-all duration-300 ${
                  isScrolled
                    ? "border border-neutral-200/60 bg-neutral-50/50"
                    : "border border-white/20 bg-white/10"
                }`}
              >
                {(["en", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLanguage(lang)}
                    className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                      locale === lang
                        ? isScrolled ? "bg-white text-neutral-900 shadow-sm" : "bg-white/20 text-white"
                        : isScrolled ? "text-neutral-400 hover:text-neutral-600" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:opacity-90 transition-opacity duration-200"
                style={{
                  background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                  boxShadow: "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
              >
                {tNav("requestQuote")}
              </Link>
            </div>

            {/* ── Mobile hamburger ────────────────────────────────────────── */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={`lg:hidden p-2.5 rounded-lg transition-all ${
                isScrolled
                  ? "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ───────────────────────── Mobile drawer ────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 z-[98] bg-neutral-900/60 backdrop-blur-[2px]"
              aria-hidden="true"
            />

            {/* Drawer panel — slides from end side (right LTR, left RTL) */}
            <motion.aside
              key="drawer"
              variants={drawerVariants(isRtl)}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`lg:hidden fixed top-0 bottom-0 z-[99] flex flex-col bg-white w-[82vw] max-w-[360px] ${
                isRtl ? "left-0" : "right-0"
              }`}
              style={{ boxShadow: isRtl ? "6px 0 48px rgba(0,0,0,0.14)" : "-6px 0 48px rgba(0,0,0,0.14)" }}
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-100 shrink-0">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/main-logo.webp"
                    alt="Saudi Event Management"
                    width={200}
                    height={70}
                    className="h-8 w-auto object-contain"
                    style={{ filter: "brightness(0) invert(0)" }}
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -me-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer nav links — scrollable */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <nav>
                  <ul className="space-y-0.5">
                    {defaultNavLinks.map((link, i) => {
                      const isActive    = pathname === link.href;
                      const linkName    = tNav(link.key as any);
                      const hasChildren = ["services", "locations", "portfolio", "about"].includes(link.key);
                      const isExpanded  = mobileExpanded === link.key;

                      return (
                        <motion.li
                          key={link.key}
                          initial={{ opacity: 0, x: isRtl ? -18 : 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.038, ...spring }}
                        >
                          {hasChildren ? (
                            <>
                              {/* Accordion trigger */}
                              <button
                                onClick={() => setMobileExpanded(isExpanded ? null : link.key)}
                                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all duration-150 ${
                                  isActive || isExpanded
                                    ? "text-[var(--primary)] bg-emerald-50/70"
                                    : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                                }`}
                              >
                                <span>{linkName}</span>
                                <ChevronDown
                                  size={16}
                                  className={`text-neutral-400 transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`}
                                />
                              </button>

                              {/* Accordion content */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <ul className="pt-1 pb-2 ps-3 space-y-0.5">
                                      {link.key === "services" && services.map((s) => (
                                        <li key={s.key}>
                                          <Link
                                            href={s.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-[var(--primary)] hover:bg-neutral-50 transition-all"
                                          >
                                            <s.icon size={15} className="text-neutral-400 shrink-0" />
                                            {tServices(s.key as any)}
                                          </Link>
                                        </li>
                                      ))}
                                      {link.key === "locations" && locations.map((city) => (
                                        <li key={city.key}>
                                          <Link
                                            href={city.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-[var(--primary)] hover:bg-neutral-50 transition-all"
                                          >
                                            <MapPin size={14} className="text-neutral-400 shrink-0" />
                                            <span>{city.name}</span>
                                            {city.badge && (
                                              <span className="ms-auto text-[9px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                                                {city.badge}
                                              </span>
                                            )}
                                          </Link>
                                        </li>
                                      ))}
                                      {link.key === "portfolio" && portfolioItems.map((item) => (
                                        <li key={item.key}>
                                          <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-[var(--primary)] hover:bg-neutral-50 transition-all"
                                          >
                                            <item.icon size={14} className="text-neutral-400 shrink-0" />
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                      {link.key === "about" && aboutItems.map((item) => (
                                        <li key={item.href}>
                                          <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:text-[var(--primary)] hover:bg-neutral-50 transition-all"
                                          >
                                            <item.icon size={14} className="text-neutral-400 shrink-0" />
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all duration-150 ${
                                isActive
                                  ? "text-[var(--primary)] bg-emerald-50/70"
                                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                              }`}
                            >
                              <span>{linkName}</span>
                              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />}
                            </Link>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* Drawer footer: lang toggle + CTA */}
              <div className="shrink-0 px-5 py-5 border-t border-neutral-100 space-y-3">
                {/* Language */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] text-neutral-400 font-medium">Language</span>
                  <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-50">
                    {(["en", "ar"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`text-[12px] font-semibold px-3.5 py-1.5 rounded-md transition-all duration-200 ${
                          locale === lang
                            ? "bg-white text-neutral-900 shadow-sm"
                            : "text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20event%20management%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full text-white py-3.5 rounded-xl text-[14px] font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
                    boxShadow: "0 4px 16px rgba(245,158,11,0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                >
                  {tNav("requestQuote")}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
