import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/destination-events`;

  return {
    title: "Destination Events Saudi Arabia | AlUla, NEOM, Red Sea & Diriyah",
    description:
      "Plan breathtaking destination events across Saudi Arabia's most iconic landscapes. Desert glamping in AlUla, futuristic summits in NEOM, luxury yacht events on the Red Sea, and heritage events in Diriyah.",
    keywords: [
      "Destination events Saudi Arabia",
      "AlUla event planning",
      "NEOM event management",
      "Red Sea destination events",
      "Desert glamping events KSA",
      "Diriyah heritage events",
      "Luxury destination wedding Saudi Arabia",
      "Corporate retreat AlUla NEOM",
      "فعاليات وجهة السعودية",
      "تنظيم فعاليات العُلا ونيوم",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/destination-events"),
    },
    openGraph: {
      title: "Destination Events Saudi Arabia | AlUla, NEOM, Red Sea & Diriyah",
      description:
        "Breathtaking destination events across Saudi Arabia's most iconic landscapes — AlUla, NEOM, Red Sea coastal, and Diriyah heritage city.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/hero_bg.webp",
          width: 1200,
          height: 630,
          alt: "Destination Events Saudi Arabia AlUla NEOM Red Sea",
        },
      ],
    },
  };
}

export default function DestinationEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
