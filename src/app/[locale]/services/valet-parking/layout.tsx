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
      ? { absolute: "خدمة صف السيارات (فاليه) للفعاليات في السعودية | إدارة الفعاليات السعودية" }
      : "Event Valet Parking Services Saudi Arabia | Saudi Event Management",
    description: isAr
      ? "تنسيق خدمة صف سيارات (فاليه) احترافية لحفلات الزفاف وفعاليات الشركات في عموم السعودية — طاقم موحّد الزي، وإدارة مفاتيح آمنة، ومساعدة كبار السن وذوي الإعاقة، عبر شبكة شركاء إدارة الفعاليات السعودية."
      : "Professional event valet parking coordination for weddings and corporate events across Saudi Arabia — uniformed staff, secure key management, and accessibility support — delivered through Saudi Event Management's partner network.",
    keywords: [
      "Valet parking service Riyadh",
      "Event valet company Saudi Arabia",
      "Wedding valet parking Jeddah",
      "Corporate event valet Riyadh",
      "Valet staff for events Saudi Arabia",
      "خدمة فاليه للفعاليات الرياض",
      "شركة صف سيارات السعودية",
      "فاليه حفل زفاف جدة",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/valet-parking"),
    },
    openGraph: {
      title: isAr
        ? "خدمة صف السيارات (فاليه) للفعاليات في السعودية | إدارة الفعاليات السعودية"
        : "Event Valet Parking Services Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "طاقم فاليه موحّد الزي، وإدارة مفاتيح آمنة، ومساعدة كبار السن وذوي الإعاقة — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Uniformed valet staff, secure key management, and accessibility support — coordinated through Saudi Event Management's partner network.",
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
