import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/cultural-events`;

  return {
    title: isAr
      ? { absolute: "إدارة فعاليات اليوم الوطني السعودي 2026 | الرياض والسعودية | إدارة الفعاليات السعودية" }
      : "Saudi National Day 2026 Event Management Riyadh | SEM",
    description: isAr
      ? "إدارة فعاليات اليوم الوطني السعودي 2026 (23 سبتمبر) في الرياض وعموم المملكة — حفلات مؤسسية، وتفعيلات، وترفيه، وديكور وهوية، وهدايا وتوزيعات. القاعات تُحجز بسرعة — احصل على عرض سعر سريع من إدارة الفعاليات السعودية."
      : "Saudi National Day 2026 (23 Sep) event management in Riyadh & across Saudi Arabia — corporate galas, activations, entertainment, décor & gifting. Venues fill fast — get a fast quote from Saudi Event Management.",
    keywords: [
      "Saudi National Day event management",
      "Saudi National Day event company",
      "National Day corporate events Riyadh",
      "National Day event planning Saudi Arabia",
      "National Day gifts and giveaways Saudi Arabia",
      "Cultural event management Saudi Arabia",
      "Founding Day events Saudi Arabia",
      "Ramadan event planner KSA",
      "إدارة فعاليات اليوم الوطني السعودي",
      "احتفالات اليوم الوطني السعودي",
      "هدايا اليوم الوطني للشركات",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/cultural-events"),
    },
    openGraph: {
      title: isAr
        ? "إدارة فعاليات اليوم الوطني السعودي 2026 | إدارة الفعاليات السعودية"
        : "Saudi National Day 2026 Event Management | Saudi Event Management",
      description: isAr
        ? "إدارة فعاليات اليوم الوطني السعودي 2026 (23 سبتمبر) في الرياض والمملكة — حفلات، وتفعيلات، وترفيه، وهدايا مؤسسية، إلى جانب رمضان ويوم التأسيس والعيد."
        : "Saudi National Day 2026 (23 Sep) event management in Riyadh & the Kingdom — galas, activations, entertainment and corporate gifting, alongside Ramadan, Founding Day and Eid.",
      url: canonicalUrl,
      images: [
        {
          url: "/blog/saudi_national_day_event_2026.webp",
          width: 1200,
          height: 630,
          alt: "Saudi National Day corporate event in Riyadh with green-and-white national branding",
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
