import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  const canonical = `${base}${locale === "en" ? "" : "/ar"}/services/corporate-events`;

  return {
    title:
      "Corporate Event Management Saudi Arabia | AGMs, Summits & Galas | Saudi Event Management",
    description:
      "Saudi Arabia's premier corporate event management company — AGMs, executive summits, gala dinners, product launches, and Vision 2030 activations at KAFD, RICEC, and top five-star venues across Riyadh, Jeddah, and Dammam.",
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
      languages: {
        "en-US": `${base}/services/corporate-events`,
        "ar-SA": `${base}/ar/services/corporate-events`,
      },
    },
    openGraph: {
      title:
        "Corporate Event Management Saudi Arabia | Saudi Event Management",
      description:
        "End-to-end corporate event planning for AGMs, executive summits, gala dinners, and Vision 2030 activations across Riyadh, Jeddah, and Dammam. IAPCO-affiliated. Preferred partner at KAFD and RICEC.",
      url: canonical,
      type: "website",
      images: [
        {
          url: `${base}/alkhobar_corporate_people.webp`,
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
      images: [`${base}/alkhobar_corporate_people.webp`],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default function CorporateEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
