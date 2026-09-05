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
      ? { absolute: "نقل كبار الشخصيات في الرياض والسعودية | سائق خاص واستقبال مطارات ونقل فعاليات | إدارة الفعاليات السعودية" }
      : "VIP Transportation Riyadh & Saudi Arabia | Chauffeur, Airport & Event Transfers | Saudi Event Management",
    description: isAr
      ? "نقل كبار الشخصيات بسائق خاص في الرياض وعموم السعودية — استقبال المطارات والفنادق، وتأجير سيارات فاخرة بسائقين، ومركبات تنفيذية مدرَّعة، وأساطيل لضيوف الشركات والمؤتمرات والأعراس، بتنسيق إدارة الفعاليات السعودية."
      : "VIP and chauffeur-driven transportation across Riyadh and Saudi Arabia — airport & hotel transfers, luxury car hire with drivers, armored executive cars, and corporate, conference & wedding guest fleets, coordinated by Saudi Event Management.",
    keywords: [
      "VIP transportation Riyadh",
      "Chauffeur service Riyadh",
      "Luxury car with driver Riyadh",
      "Airport transfer service Riyadh",
      "Executive & corporate transportation Saudi Arabia",
      "Conference delegate transportation KSA",
      "Armored vehicle hire Riyadh",
      "Luxury car hire for events Saudi Arabia",
      "نقل كبار الشخصيات الرياض",
      "سيارة فاخرة مع سائق الرياض",
      "خدمة سائق خاص الرياض",
      "تأجير سيارات فاخرة السعودية",
      "نقل تنفيذي مدرّع الرياض",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/vip-transportation"),
    },
    openGraph: {
      title: isAr
        ? "نقل كبار الشخصيات وسائق خاص في الرياض والسعودية | إدارة الفعاليات السعودية"
        : "VIP Transportation & Chauffeur Hire in Riyadh | Saudi Event Management",
      description: isAr
        ? "سائق خاص واستقبال مطارات، ومركبات مدرَّعة، وأساطيل لضيوف الشركات والمؤتمرات والأعراس — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Chauffeur-driven cars, airport transfers, armored vehicles, and corporate, conference & wedding guest fleets — coordinated through Saudi Event Management's partner network.",
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
