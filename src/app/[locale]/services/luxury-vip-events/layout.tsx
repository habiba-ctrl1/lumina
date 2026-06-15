import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/luxury-vip-events`;

  return {
    title: "VIP Event Management Saudi Arabia | Private & Corporate Events",
    description:
      "Exclusive luxury event planning and VIP concierge services in Riyadh, Jeddah, and AlUla. Specialists in private parties, royal family events, HNWI experiences, desert glamping, and luxury yacht events.",
    keywords: [
      "VIP event planning Saudi Arabia",
      "Luxury events Riyadh",
      "Private party planner Jeddah",
      "Royal family event management KSA",
      "HNWI event concierge Saudi Arabia",
      "Luxury yacht events Red Sea",
      "Exclusive launch events KSA",
      "AlUla private event planner",
      "فعاليات كبار الشخصيات السعودية",
      "مخطط فعاليات خاصة الرياض",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/luxury-vip-events"),
    },
    openGraph: {
      title: "VIP Event Management Saudi Arabia | Saudi Event Management",
      description:
        "Ultra-discreet luxury event planning for royal families, HNWIs, and diplomatic guests across Saudi Arabia — private concerts, yacht events, and bespoke desert experiences.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/luxury_vip_majlis.webp",
          width: 1200,
          height: 630,
          alt: "Luxury VIP Events Saudi Arabia",
        },
      ],
    },
  };
}

export default function LuxuryVipEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
