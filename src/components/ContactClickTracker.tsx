"use client";

import { useEffect } from "react";
import { trackContactClick, type ContactChannel } from "@/lib/analytics";

// Pages whose contact clicks are not client leads (job seekers, vendors, admin).
const EXCLUDED_PATHS = ["/about/careers", "/admin", "/vendor-registration", "/partners"];

function channelFor(href: string): ContactChannel | null {
  const h = href.toLowerCase();
  if (h.includes("wa.me/") || h.includes("api.whatsapp.com") || h.includes("whatsapp://")) return "whatsapp";
  if (h.startsWith("tel:")) return "phone";
  if (h.startsWith("mailto:")) return "email";
  return null;
}

/**
 * One delegated click listener for every WhatsApp / phone / email link on the
 * site, so each new CTA is tracked without wiring it up individually.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const channel = channelFor(link.getAttribute("href") || "");
      if (!channel) return;
      const path = window.location.pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
      if (EXCLUDED_PATHS.some((p) => path.startsWith(p))) return;
      trackContactClick(channel, { page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
