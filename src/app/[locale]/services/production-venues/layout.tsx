import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/production-venues`;

  return {
    title: isAr
      ? { absolute: "خدمات وقاعات الفعاليات في السعودية | الصوت والصورة والتموين والمسرح والديكور | إدارة الفعاليات السعودية" }
      : "Event Services & Venues Saudi Arabia | AV, Catering, Staging & Decoration",
    description: isAr
      ? "إدارة فعاليات متكاملة في السعودية — اختيار قاعات راقية في الرياض، وإنتاج صوت وصورة معتمد من ISO، وتموين فاخر، وتصميم مسرح، وديكور فعاليات، وإنتاج إعلامي. مورّد من الفئة الأولى لأبرز قاعات المملكة."
      : "Full-service event management in Saudi Arabia — premium venue sourcing in Riyadh, ISO-certified AV production, luxury catering, stage design, event decoration, and media production. Tier-1 vendor for KSA's top venues.",
    keywords: [
      "Event services Saudi Arabia",
      "Event venue Riyadh",
      "AV production company Riyadh",
      "Event catering Saudi Arabia",
      "Stage design KSA",
      "Event decoration Jeddah",
      "Luxury catering events Saudi Arabia",
      "Event venue rental Riyadh",
      "شركة إنتاج صوت وصورة الرياض",
      "أماكن فعاليات الرياض",
      "تصميم وديكور فعاليات جدة",
      "تموين فعاليات السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/production-venues"),
    },
    openGraph: {
      title: isAr
        ? "خدمات وقاعات الفعاليات في السعودية | إدارة الفعاليات السعودية"
        : "Event Services & Venues Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "إدارة فعاليات متكاملة — اختيار قاعات راقية، وإنتاج صوت وصورة معتمد من ISO، وتموين فاخر، وتصميم مسرح، وديكور فعاليات في عموم السعودية."
        : "Full-service event management — premium venue sourcing, ISO-certified AV production, luxury catering, stage design, and event decoration across Saudi Arabia.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/gallery_wedding_reception.webp",
          width: 1200,
          height: 630,
          alt: "Event Services and Venues Saudi Arabia",
        },
      ],
    },
  };
}

export default function ProductionVenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
