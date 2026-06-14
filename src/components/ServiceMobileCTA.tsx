"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";

/**
 * Mobile-only sticky consultation CTA for service pages.
 * Sits to the left of the global floating WhatsApp button (which handles
 * the WhatsApp channel), so the two never overlap or duplicate intent:
 *   • Green floating circle  → WhatsApp chat
 *   • This pill              → Book a free consultation
 * Hidden on lg+ where the navbar CTA and in-page forms are always visible.
 */
export default function ServiceMobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-5 start-4 end-[84px] z-[90] pointer-events-none">
      <Link
        href="/consultation"
        className="pointer-events-auto flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--primary)] text-white text-[13px] font-semibold tracking-wide active:scale-[0.98] transition-transform"
        style={{ boxShadow: "0 8px 24px rgba(13,107,78,0.35), inset 0 1px 0 rgba(255,255,255,0.14)" }}
      >
        <CalendarCheck size={16} />
        Book a Free Consultation
      </Link>
    </div>
  );
}
