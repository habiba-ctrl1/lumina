import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/entertainment`;

  return {
    title: isAr
      ? { absolute: "شركة ترفيه الفعاليات في السعودية | فرق موسيقية وفنانون ومنسقو حفلات | إدارة الفعاليات السعودية" }
      : "Event Entertainment Company Saudi Arabia | Live Bands, DJs & Performers | Saudi Event Management",
    description: isAr
      ? "تنسيق ترفيه الفعاليات في عموم السعودية — فرق موسيقية شرقية وغربية، وفنانون تفاعليون، ومنسقو حفلات (DJ)، وترفيه عائلي — عبر شبكة شركاء إدارة الفعاليات السعودية."
      : "Event entertainment coordination across Saudi Arabia — Eastern & Western live bands, interactive performers, DJs, and family entertainment — delivered through Saudi Event Management's partner network.",
    keywords: [
      "Event entertainment company Saudi Arabia",
      "Wedding entertainment Riyadh",
      "Live band booking Saudi Arabia",
      "Corporate event entertainment KSA",
      "DJ booking Riyadh Jeddah",
      "Event performers Saudi Arabia",
      "شركة ترفيه فعاليات السعودية",
      "فرقة موسيقية حفل زفاف الرياض",
      "منسق حفلات دي جي جدة",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/entertainment"),
    },
    openGraph: {
      title: isAr
        ? "شركة ترفيه الفعاليات في السعودية | إدارة الفعاليات السعودية"
        : "Event Entertainment Company Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "فرق موسيقية، وفنانون تفاعليون، ومنسقو حفلات، وترفيه عائلي — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Live bands, interactive performers, DJs, and family entertainment — coordinated through Saudi Event Management's partner network.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/event_production_stage_riyadh.webp",
          width: 1200,
          height: 630,
          alt: "Event Entertainment Saudi Arabia",
        },
      ],
    },
  };
}

export default function EntertainmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
