import type { Metadata } from "next";
import { robotsForRoute, hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const canonical = `${base}${locale === "en" ? "" : "/ar"}/services/corporate-events`;

  return {
    title: isAr
      ? {
          absolute:
            "إدارة فعاليات الشركات في السعودية | مؤتمرات وقمم وحفلات أعمال | إدارة الفعاليات السعودية",
        }
      : "Corporate Event Management Saudi Arabia | AGMs, Summits & Galas | Saudi Event Management",
    description: isAr
      ? "شركة رائدة في إدارة فعاليات الشركات بالسعودية: اجتماعات الجمعيات العمومية، القمم التنفيذية، حفلات العشاء الفاخرة، إطلاق المنتجات، وفعاليات رؤية 2030 في مركز الملك عبدالله المالي ومركز الرياض للمؤتمرات والمعارض وأفخم القاعات بالرياض وجدة والدمام. احجز استشارة مجانية."
      : "Saudi Arabia's premier corporate event management company — AGMs, executive summits, gala dinners, product launches, and Vision 2030 activations at KAFD, RICEC, and top five-star venues across Riyadh, Jeddah, and Dammam.",
    keywords: [
      "corporate event management Saudi Arabia",
      "corporate event planning Riyadh",
      "corporate event company Jeddah",
      "AGM planning Saudi Arabia",
      "executive summit organizer Riyadh",
      "gala dinner planner Riyadh",
      "conference management Saudi Arabia",
      "KAFD event management",
      "RICEC event organizer",
      "Vision 2030 corporate events",
      "product launch event Saudi Arabia",
      "business event planner KSA",
      "PCO professional conference organizer Saudi Arabia",
      "hybrid event management Saudi Arabia",
      "corporate gala Jeddah",
      "board retreat Saudi Arabia",
      "شركة إدارة فعاليات مؤسسية السعودية",
      "تنظيم مؤتمرات الرياض",
      "إدارة فعاليات الشركات جدة",
      "فعاليات رؤية 2030",
      "brand activation Saudi Arabia",
      "employee engagement event KSA",
      "Future Investment Initiative FII event",
    ],
    alternates: {
      canonical,
      languages: hreflangAlternates("/services/corporate-events"),
    },
    openGraph: {
      title: isAr
        ? "إدارة فعاليات الشركات في السعودية | إدارة الفعاليات السعودية"
        : "Corporate Event Management Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "تنظيم متكامل لفعاليات الشركات: الجمعيات العمومية، القمم التنفيذية، حفلات العشاء، وفعاليات رؤية 2030 في الرياض وجدة والدمام."
        : "End-to-end corporate event planning for AGMs, executive summits, gala dinners, and Vision 2030 activations across Riyadh, Jeddah, and Dammam. IAPCO-affiliated. Preferred partner at KAFD and RICEC.",
      url: canonical,
      type: "website",
      images: [
        {
          url: `${base}/services/alkhobar_corporate_people.webp`,
          width: 1200,
          height: 630,
          alt: "Corporate Event Management Saudi Arabia — Executive Summit at KAFD Riyadh",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Corporate Event Management Saudi Arabia | Saudi Event Management",
      description:
        "AGMs, executive summits, gala dinners, and Vision 2030 activations — managed end-to-end across the Kingdom.",
      images: [`${base}/services/alkhobar_corporate_people.webp`],
    },
    // Route-aware: Arabic stays `noindex, follow` until this route is added to
    // TRANSLATED_AR_ROUTES in @/lib/seo. Matches the X-Robots-Tag header.
    robots: robotsForRoute(locale, "/services/corporate-events"),
  };
}

export default function CorporateEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
