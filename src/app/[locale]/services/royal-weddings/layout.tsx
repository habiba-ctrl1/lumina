import type { Metadata } from "next";
import { robotsForRoute, hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const canonical = `${base}${locale === "en" ? "" : "/ar"}/services/royal-weddings`;

  return {
    title:
      "Royal Wedding Planner Saudi Arabia | Ceremonial Luxury & Royal Protocol | Saudi Event Management",
    description:
      "Saudi Arabia's foremost royal wedding planning specialists. Nikah ceremonies, Walima receptions for 2,000+ guests, Zaffa processions, and bespoke palace-venue experiences — designed for the Kingdom's most distinguished families in Riyadh, Jeddah, AlUla, and NEOM.",
    keywords: [
      "royal wedding planner Saudi Arabia",
      "royal wedding Saudi Arabia",
      "luxury royal wedding Riyadh",
      "royal wedding planner Jeddah",
      "Saudi royal wedding traditions",
      "Nikah ceremony planner Saudi Arabia",
      "Walima reception organizer KSA",
      "Zaffa procession organizer Saudi Arabia",
      "royal wedding venues Riyadh",
      "royal wedding package Saudi Arabia",
      "VIP wedding planner KSA",
      "مخطط أفراح ملكي السعودية",
      "تنظيم أعراس ملكية الرياض",
      "حفلات زفاف فاخرة المملكة",
      "best royal wedding company KSA",
      "palace wedding Saudi Arabia",
      "royal family event management Saudi Arabia",
      "HNWI wedding planner Saudi Arabia",
      "high-end wedding planner Riyadh",
      "royal wedding AlUla NEOM",
    ],
    alternates: {
      canonical,
      languages: hreflangAlternates("/services/royal-weddings"),
    },
    openGraph: {
      title:
        "Royal Wedding Planner Saudi Arabia | Ceremonial Luxury | Saudi Event Management",
      description:
        "Bespoke royal wedding planning for the Kingdom's most distinguished families. Nikah, Walima, Zaffa, Henna Night — every ceremony crafted to perfection in Riyadh, Jeddah, AlUla, and NEOM.",
      url: canonical,
      type: "website",
      images: [
        {
          url: `${base}/services/wedding_stage_backdrop_decor.webp`,
          width: 1200,
          height: 630,
          alt: "Royal Wedding Planner Saudi Arabia — Luxury Ceremonial Design by Saudi Event Management",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Royal Wedding Planner Saudi Arabia | Saudi Event Management",
      description:
        "Saudi Arabia's premier royal wedding architects — Nikah, Walima, Zaffa, palace venues, VIP protocol.",
      images: [`${base}/services/wedding_stage_backdrop_decor.webp`],
    },
    // Route-aware: Arabic stays `noindex, follow` until this route is added to
    // TRANSLATED_AR_ROUTES in @/lib/seo. Matches the X-Robots-Tag header.
    robots: robotsForRoute(locale, "/services/royal-weddings"),
  };
}

export default function RoyalWeddingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
