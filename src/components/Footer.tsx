"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-white border-t border-neutral-200/80 relative pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <Image
                src="/main-logo.webp"
                alt="Saudi Event Management - Luxury Event Planning Company in Saudi Arabia"
                width={200}
                height={70}
                className="object-contain h-10 w-auto"
                style={{ filter: "brightness(0) invert(0)" }}
              />
            </Link>
            <p className="text-neutral-500 text-[14px] leading-relaxed mb-6 max-w-sm font-medium">
              {t("description")}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s: any) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                    border border-neutral-200/80 text-neutral-500 bg-white
                    hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-emerald-50/50
                    transition-all duration-200"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[14px] font-semibold text-neutral-900 mb-5" style={{ letterSpacing: "-0.01em" }}>
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-3">
              {t.raw("serviceLinks").map((item: string) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-[14px] text-neutral-500 font-medium
                      hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[14px] font-semibold text-neutral-900 mb-5" style={{ letterSpacing: "-0.01em" }}>
              {t("companyTitle")}
            </h4>
            <ul className="space-y-3">
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
                    className="text-[14px] text-neutral-500 font-medium
                      hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[14px] font-semibold text-neutral-900 mb-5" style={{ letterSpacing: "-0.01em" }}>
              {t("contactTitle")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span className="text-[14px] text-neutral-500 font-medium">{t("contactAddress")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--primary)] shrink-0" />
                <span className="text-[14px] text-neutral-500 font-medium">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--primary)] shrink-0" />
                <span className="text-[14px] text-neutral-500 font-medium">infosaudieventmanagement@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-label mb-3 block">
                <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                {t("newsletterLabel")}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2" style={{ letterSpacing: "-0.02em" }}>{t("newsletterTitle")}</h3>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
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
                className="flex-1 bg-white border border-neutral-200/80 text-neutral-900
                  px-4 py-3.5 rounded-xl text-[14px]
                  placeholder:text-neutral-400
                  focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10
                  transition-all duration-200 shadow-sm"
              />
              <button
                type="submit"
                className="bg-[var(--primary)] text-white px-6 py-3.5 rounded-xl text-[14px] font-medium hover:bg-[var(--primary-dark)] transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {t("subscribe")}
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] font-medium text-neutral-400">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors">{t("privacy")}</Link>
            <Link href="/terms"   className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}