import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/vip-transportation`;

  return {
    title: isAr
      ? { absolute: "النقل الفاخر لكبار الشخصيات في السعودية | نقل تنفيذي ومدرَّع | إدارة الفعاليات السعودية" }
      : "VIP Event Transportation Saudi Arabia | Luxury & Armored Executive Transport | Saudi Event Management",
    description: isAr
      ? "تنسيق نقل فاخر ومدرَّع لضيوف الفعاليات وكبار الشخصيات في عموم السعودية — استقبال المطارات، وتأجير سيارات فاخرة بسائقين، ونقل جماعي للمندوبين، عبر شبكة شركاء إدارة الفعاليات السعودية."
      : "Luxury and armored VIP transportation coordination for event guests across Saudi Arabia — airport transfers, chauffeured luxury vehicle hire, and group delegate transport — delivered through Saudi Event Management's partner network.",
    keywords: [
      "VIP transportation Riyadh",
      "Luxury car hire for events Saudi Arabia",
      "Airport transfer service Riyadh",
      "Executive transportation Saudi Arabia",
      "Armored vehicle hire Riyadh",
      "Event delegate transportation KSA",
      "نقل كبار الشخصيات الرياض",
      "تأجير سيارات فاخرة السعودية",
      "نقل تنفيذي مدرّع الرياض",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/vip-transportation"),
    },
    openGraph: {
      title: isAr
        ? "النقل الفاخر لكبار الشخصيات في السعودية | إدارة الفعاليات السعودية"
        : "VIP Event Transportation Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "نقل فاخر ومدرَّع، واستقبال مطارات، ونقل جماعي للمندوبين — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Luxury and armored transport, airport transfers, and group delegate transportation — coordinated through Saudi Event Management's partner network.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/premium_luxury_vip_hero.webp",
          width: 1200,
          height: 630,
          alt: "VIP Event Transportation Saudi Arabia",
        },
      ],
    },
  };
}

export default function VipTransportationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
