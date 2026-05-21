"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

// ── Inline SVG social icons (no extra dependency) ────────────────────────────
const Instagram = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const Twitter = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const Linkedin = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const socialLinks = [
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn" },
  { icon: Twitter,   label: "Twitter",   url: "https://twitter.com/saudieventmgmt" },
  { icon: Linkedin,  label: "LinkedIn",  url: "https://linkedin.com/company/saudieventmanagement" },
];

const serviceLinks = ["Royal Weddings", "Corporate Events", "Elite Birthdays", "Destination"];

const companyLinks = [
  { name: "About Us",     href: "/about" },
  { name: "Portfolio",    href: "/portfolio" },
  { name: "Journal",      href: "/blog" },
  { name: "Locations",    href: "/locations" },
  { name: "FAQ",          href: "/faq" },
  { name: "Book Session", href: "/consultation" },
];

const partnerNames = [
  "General Entertainment Authority", "Ministry of Culture",
  "Saudi Tourism Authority", "Vision 2030", "NEOM",
  "Diriyah Gate", "Red Sea Global", "Riyadh Season", "Saudi Seasons",
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-ink-600 relative">

      {/* ── Subtle top gold line ─────────────────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        {/* ── Main grid ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-7">
              <Image
                src="/main-logo.webp"
                alt="Saudi Event Management - Luxury Event Planning Company in Saudi Arabia"
                width={220}
                height={80}
                className="object-contain h-12 w-auto"
              />
            </Link>
            <p className="text-sand-300 text-sm leading-relaxed mb-7 max-w-xs">
              Crafting extraordinary experiences and timeless memories through
              unparalleled luxury event management across the Middle East.
            </p>
            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-md
                    border border-ink-500 text-sand-400
                    hover:border-gold-400/40 hover:text-gold-400
                    transition-all duration-200"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand-300 mb-8">
              Services
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-sm text-sand-400
                      hover:text-gold-400 transition-colors group"
                  >
                    <span className="w-0 h-px bg-gold-400 group-hover:w-3 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand-300 mb-8">
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-sand-400
                      hover:text-gold-400 transition-colors group"
                  >
                    <span className="w-0 h-px bg-gold-400 group-hover:w-3 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand-300 mb-8">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm text-sand-400">Riyadh, Jeddah, AlUla & Dammam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <span className="text-sm text-sand-400">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <span className="text-sm text-sand-400">hello@saudieventmanagement.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Partners strip ─────────────────────────────────────────────────── */}
        <div className="border-y border-ink-600 py-12 mb-12">
          <div className="text-center mb-8">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] text-sand-400 mb-3">
              Our Trusted Partners & Vendors
            </h4>
            <Link
              href="/partners"
              className="text-[10px] font-medium uppercase tracking-widest
                text-gold-400 border-b border-gold-400/30
                hover:border-gold-400 transition-colors pb-0.5"
            >
              Partner With Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {partnerNames.map((name) => (
              <span
                key={name}
                className="text-[9px] font-medium tracking-[0.18em] uppercase text-sand-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Newsletter ─────────────────────────────────────────────────────── */}
        <div className="bg-ink-800 border border-ink-600 rounded-lg p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Decorative gold glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full -mr-24 -mt-24 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="section-label mb-3">Inner Circle</span>
              <h3 className="font-display text-2xl font-medium text-sand-50 mb-3">Stay Inspired</h3>
              <p className="text-sand-400 text-sm leading-relaxed">
                Exclusive event insights, luxury trends, and a first look at our
                latest masterpieces — delivered to your inbox.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 bg-ink-700 border border-ink-500 text-sand-100
                  px-4 py-3 rounded-md text-sm
                  placeholder:text-sand-500
                  focus:outline-none focus:border-gold-400/50
                  transition-colors"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 py-3 text-[10px]"
              >
                Join the Circle
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
        <div className="border-t border-ink-600 pt-7 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[11px] uppercase tracking-widest text-sand-500">
            &copy; {new Date().getFullYear()} Saudi Event Management. All rights reserved.
          </p>
          <div className="flex gap-7">
            <Link href="/privacy" className="text-[11px] uppercase tracking-widest text-sand-500 hover:text-gold-400 transition-colors">Privacy</Link>
            <Link href="/terms"   className="text-[11px] uppercase tracking-widest text-sand-500 hover:text-gold-400 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}