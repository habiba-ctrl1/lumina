import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/luxury-vip-events`;

  return {
    title: "Luxury VIP Event Management Saudi Arabia | Saudi Event Management",
    description:
      "Ultra-exclusive VIP event management in Saudi Arabia. Private galas, royal celebrations, high-net-worth experiences, and bespoke luxury entertainment.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/luxury-vip-events",
        "ar-SA": "https://saudieventmanagement.com/ar/services/luxury-vip-events",
      },
    },
    openGraph: {
      title: "Luxury VIP Event Management Saudi Arabia | Saudi Event Management",
      description:
        "Ultra-exclusive VIP event management in Saudi Arabia. Private galas, royal celebrations, and bespoke luxury entertainment.",
      url: canonicalUrl,
    },
  };
}

export default function LuxuryVipEventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
