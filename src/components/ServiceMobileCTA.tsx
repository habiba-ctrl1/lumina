"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { MessageCircle, FileText } from "lucide-react";

/**
 * Mobile-only sticky action bar for /services/* pages: Request a Quote + WhatsApp.
 * "Request a Quote" jumps to the page's own enquiry form when it has one (so the
 * lead keeps that page's source attribution), otherwise to /contact.
 * On these pages it replaces the global floating WhatsApp button below lg
 * (hidden via the [data-wa-float] rule) so the two never overlap.
 * Hidden on lg+ where the navbar CTA and in-page forms are always visible.
 */
export default function ServiceMobileCTA() {
  const isAr = useLocale() === "ar";
  const [quoteHref, setQuoteHref] = useState(isAr ? "/ar/contact" : "/contact");

  useEffect(() => {
    const form = document.querySelector<HTMLElement>('#enquiry, [id$="-enquiry"], #quote, #proposal');
    if (form?.id) setQuoteHref(`#${form.id}`);
  }, []);

  const wa = `https://wa.me/966539388072?text=${encodeURIComponent(isAr ? "مرحبًا، أرغب في الاستفسار عن خدمة لفعالية." : "Hi SEM, I'd like to ask about a service for my event.")}`;

  return (
    <>
      <style>{`@media (max-width: 1023px) { [data-wa-float] { display: none !important; } }`}</style>
      {/* Spacer so the bar never covers the end of the page (footer links). */}
      <div aria-hidden className="h-24 lg:hidden" />
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[90] border-t border-neutral-200 bg-white/95 backdrop-blur px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-2.5">
          <a
            href={quoteHref}
            className="flex flex-1 items-center justify-center gap-2 h-12 rounded-xl bg-[var(--primary)] text-white hover:text-white text-[14px] font-semibold active:scale-[0.98] transition-transform"
          >
            <FileText size={16} /> {isAr ? "اطلب عرض سعر" : "Request a Quote"}
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-white hover:text-white text-[14px] font-semibold active:scale-[0.98] transition-transform"
          >
            <MessageCircle size={16} /> {isAr ? "واتساب" : "WhatsApp"}
          </a>
        </div>
      </div>
    </>
  );
}
