import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/valet-parking`;

  return {
    title: isAr
      ? { absolute: "خدمة فاليه (صف السيارات) في الرياض والسعودية | فاليه أعراس وشركات ومؤتمرات | إدارة الفعاليات السعودية" }
      : "Valet Parking Riyadh & Saudi Arabia | Event, Wedding & Corporate Valet | Saudi Event Management",
    description: isAr
      ? "خدمة فاليه احترافية للفعاليات في الرياض وعموم السعودية — أعراس وشركات ومؤتمرات ومعارض: طاقم موحّد الزي، وإدارة مفاتيح آمنة، وأولوية وقوف، ومساعدة ذوي الإعاقة، بتنسيق إدارة الفعاليات السعودية."
      : "Professional event valet parking across Riyadh and Saudi Arabia — for weddings, corporate events, conferences & exhibitions: uniformed staff, secure key management, priority parking, and accessibility support, coordinated by Saudi Event Management.",
    keywords: [
      "Valet parking company Riyadh",
      "Event valet service Riyadh",
      "Wedding valet parking Riyadh",
      "Corporate event valet Saudi Arabia",
      "Conference & exhibition valet Riyadh",
      "Valet staff for events Saudi Arabia",
      "خدمة فاليه الرياض",
      "شركة صف سيارات الرياض",
      "فاليه حفل زفاف الرياض",
      "فاليه فعاليات الشركات السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/valet-parking"),
    },
    openGraph: {
      title: isAr
        ? "خدمة فاليه (صف السيارات) في الرياض والسعودية | إدارة الفعاليات السعودية"
        : "Valet Parking in Riyadh & Saudi Arabia | Event, Wedding & Corporate Valet",
      description: isAr
        ? "فاليه للأعراس والشركات والمؤتمرات: طاقم موحّد الزي، وإدارة مفاتيح آمنة، وأولوية وقوف، ومساعدة ذوي الإعاقة — عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Valet for weddings, corporate events & conferences: uniformed staff, secure key management, priority parking, and accessibility support — coordinated through Saudi Event Management's partner network.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/wedding_hall_grand_entrance.webp",
          width: 1200,
          height: 630,
          alt: "Event Valet Parking Saudi Arabia",
        },
      ],
    },
  };
}

export default function ValetParkingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
