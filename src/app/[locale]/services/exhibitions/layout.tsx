import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/exhibitions`;

  return {
    title: isAr
      ? {
          absolute:
            "شركة إدارة المعارض في الرياض | تنظيم المعارض التجارية في السعودية | إدارة الفعاليات السعودية",
        }
      : "Exhibition Management Company Riyadh | Trade Show Organizer Saudi Arabia",
    description: isAr
      ? "شركة رائدة في إدارة المعارض بالسعودية ومنظِّم محترف للمعارض التجارية في الرياض — تصميم أجنحة المعارض وبناء المنصات والمطابقة التجارية (B2B) واللوجستيات المتكاملة في RICEC وRECC."
      : "Premier exhibition management company in Saudi Arabia. Expert trade show organizer in Riyadh — expo booth design, stand building, B2B matchmaking, and complete exhibition logistics at RICEC and RECC.",
    keywords: [
      "Exhibition management Saudi Arabia",
      "Trade show organizer Riyadh",
      "Expo booth design KSA",
      "Exhibition stand builder Saudi Arabia",
      "B2B expo planner Riyadh",
      "Trade fair organizer Jeddah",
      "RICEC RECC exhibition management",
      "Saudi Expo 2030",
      "إدارة المعارض التجارية السعودية",
      "شركة إدارة معارض الرياض",
      "تنظيم معارض تجارية جدة",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/exhibitions"),
    },
    openGraph: {
      title: isAr
        ? "شركة إدارة المعارض في الرياض | إدارة الفعاليات السعودية"
        : "Exhibition Management Company Riyadh | Saudi Event Management",
      description: isAr
        ? "إدارة معارض رائدة في السعودية — تنظيم المعارض التجارية وتصميم الأجنحة وبناء المنصات وإدارة المعارض B2B في RICEC وRECC وكبرى القاعات السعودية."
        : "Premier exhibition management in Saudi Arabia — trade show organizing, booth design, stand building, and B2B expo management at RICEC, RECC, and major Saudi venues.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/exhibition_hall_riyadh.webp",
          width: 1200,
          height: 630,
          alt: "Exhibition management company Saudi Arabia — trade show booths at a Riyadh expo hall",
        },
      ],
    },
  };
}

export default function ExhibitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
