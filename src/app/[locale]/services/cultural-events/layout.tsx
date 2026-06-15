import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/cultural-events`;

  return {
    title: "Cultural & Religious Event Planning Saudi Arabia | Ramadan, National Day & Eid",
    description:
      "Authentic cultural and religious event management across Saudi Arabia. Ramadan iftars, National Day galas, Founding Day celebrations, Eid parties, and Riyadh Season activations — by Saudi Event Management.",
    keywords: [
      "Cultural event management Saudi Arabia",
      "Ramadan event planner KSA",
      "National Day event organizer Riyadh",
      "Eid celebration company Saudi Arabia",
      "Founding Day events Saudi Arabia",
      "Riyadh Season activations",
      "Religious event planner Saudi Arabia",
      "تنظيم فعاليات وطنية السعودية",
      "مخطط فعاليات رمضان الرياض",
      "احتفالات اليوم الوطني السعودي",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/cultural-events"),
    },
    openGraph: {
      title: "Cultural & Religious Event Planning Saudi Arabia | Saudi Event Management",
      description:
        "Authentic cultural event management — Ramadan iftars, National Day galas, Founding Day, Eid celebrations, and Riyadh Season activations.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/private_party.webp",
          width: 1200,
          height: 630,
          alt: "Cultural and Religious Events Saudi Arabia",
        },
      ],
    },
  };
}

export default function CulturalEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
