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
      ? { absolute: "شركة ترفيه فعاليات في الرياض والسعودية | فرق موسيقية ومنسقو حفلات وفنانون | إدارة الفعاليات السعودية" }
      : "Event Entertainment Company Riyadh & Saudi Arabia | Live Bands, DJs & Performers | Saudi Event Management",
    description: isAr
      ? "تنسيق ترفيه الفعاليات في الرياض وعموم السعودية — فرق موسيقية شرقية وغربية، وفنانون تفاعليون، ومنسقو حفلات (DJ)، وترفيه للأعراس وحفلات الشركات وحفلات الجوائز — عبر شبكة شركاء إدارة الفعاليات السعودية."
      : "Event entertainment coordination across Riyadh and Saudi Arabia — Eastern & Western live bands, interactive performers, and DJs for weddings, corporate events, and gala & awards nights — delivered through Saudi Event Management's partner network.",
    keywords: [
      "Event entertainment company Riyadh",
      "Wedding entertainment Riyadh",
      "Live band booking Saudi Arabia",
      "Corporate event entertainment KSA",
      "Gala & awards entertainment Saudi Arabia",
      "DJ booking Riyadh Jeddah",
      "Event performers Saudi Arabia",
      "شركة ترفيه فعاليات الرياض",
      "فرقة موسيقية حفل زفاف الرياض",
      "منسق حفلات دي جي الرياض",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/entertainment"),
    },
    openGraph: {
      title: isAr
        ? "شركة ترفيه فعاليات في الرياض والسعودية | إدارة الفعاليات السعودية"
        : "Event Entertainment Company in Riyadh & Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "فرق موسيقية، وفنانون تفاعليون، ومنسقو حفلات، وترفيه للأعراس وحفلات الشركات والجوائز — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Live bands, interactive performers, and DJs for weddings, corporate events, and gala nights — coordinated through Saudi Event Management's partner network.",
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
