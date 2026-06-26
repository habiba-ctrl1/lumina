"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { MessageCircle, ArrowRight } from "lucide-react";

/**
 * Mobile-only sticky bottom bar with a high-intent "Free Quote" CTA + WhatsApp.
 * Always visible on small screens so any visitor is one tap from becoming a lead.
 * Hidden on md+ (desktop has the nav CTA + floating WhatsApp button).
 */
export default function StickyLeadBar() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const waText = isAr
    ? "مرحبًا! أرغب في الحصول على عرض سعر مجاني لفعاليتي."
    : "Hi! I'd like a free quote for my event.";
  const waHref = `https://wa.me/966539388072?text=${encodeURIComponent(waText)}`;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label={isAr ? "احصل على عرض سعر" : "Get a quote"}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <Link
          href={`${arHref}/contact`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(13,107,78,0.3)] active:scale-[0.98] transition-transform"
        >
          {isAr ? "احصل على عرض سعر مجاني" : "Get a Free Quote"}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
          className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-4 text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] active:scale-[0.98] transition-transform"
        >
          <MessageCircle size={22} />
        </a>
      </div>
    </div>
  );
}
