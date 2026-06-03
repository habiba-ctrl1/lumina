"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

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

const serviceLinks = ["Corporate Events", "Exhibition Management", "Conference Management", "Event Production"];

const companyLinks = [
  { name: "About Us",     href: "/about" },
  { name: "Portfolio",    href: "/portfolio" },
  { name: "Journal",      href: "/blog" },
  { name: "Locations",    href: "/locations" },
  { name: "FAQ",          href: "/faq" },
  { name: "Book Session", href: "/consultation" },
];

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-slate-50 border-t border-slate-200 relative pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-7">
              <Image
                src="/main-logo.webp"
                alt="Saudi Event Management - Luxury Event Planning Company in Saudi Arabia"
                width={220}
                height={80}
                className="object-contain h-12 w-auto"
                style={{ filter: "brightness(0) invert(0)" }}
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-xs">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s: any) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg
                    border border-slate-200 text-slate-400 bg-white shadow-sm
                    hover:border-[var(--primary)] hover:text-[var(--primary)]
                    transition-all duration-300"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-6">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-4">
              {t.raw("serviceLinks").map((item: string) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-sm text-slate-500
                      hover:text-[var(--primary)] transition-colors group"
                  >
                    <span className="w-0 h-[2px] bg-[var(--primary)] group-hover:w-3 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-6">
              {t("companyTitle")}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t("companyLinks.aboutUs"), href: "/about" },
                { name: t("companyLinks.portfolio"), href: "/portfolio" },
                { name: t("companyLinks.journal"), href: "/blog" },
                { name: t("companyLinks.locations"), href: "/locations" },
                { name: t("companyLinks.faq"), href: "/faq" },
                { name: t("companyLinks.bookSession"), href: "/consultation" },
              ].map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-slate-500
                      hover:text-[var(--primary)] transition-colors group"
                  >
                    <span className="w-0 h-[2px] bg-[var(--primary)] group-hover:w-3 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-6">
              {t("contactTitle")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span className="text-sm text-slate-500">{t("contactAddress")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--primary)] shrink-0" />
                <span className="text-sm text-slate-500">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--primary)] shrink-0" />
                <span className="text-sm text-slate-500">infosaudieventmanagement@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-sm">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)] mb-4 block">{t("newsletterLabel")}</span>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 tracking-tight">{t("newsletterTitle")}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t("newsletterDesc")}
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                required
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-900
                  px-4 py-4 rounded-md text-sm
                  placeholder:text-slate-400
                  focus:outline-none focus:border-[var(--primary)] focus:bg-white
                  transition-colors"
              />
              <button
                type="submit"
                className="bg-[var(--primary)] text-white px-8 py-4 rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--primary-dark)] hover:shadow-lg transition-all whitespace-nowrap"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[11px] uppercase tracking-widest text-slate-400 font-bold hover:text-[var(--primary)] transition-colors">{t("privacy")}</Link>
            <Link href="/terms"   className="text-[11px] uppercase tracking-widest text-slate-400 font-bold hover:text-[var(--primary)] transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}