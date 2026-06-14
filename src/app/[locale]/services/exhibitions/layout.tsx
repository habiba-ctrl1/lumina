import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/exhibitions`;

  return {
    title: "Exhibition Management Company Riyadh | Trade Show Organizer Saudi Arabia",
    description:
      "Premier exhibition management company in Saudi Arabia. Expert trade show organizer in Riyadh — expo booth design, stand building, B2B matchmaking, and complete exhibition logistics at RICEC and RECC.",
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
      languages: {
        "en-US": "https://saudieventmanagement.com/services/exhibitions",
        "ar-SA": "https://saudieventmanagement.com/ar/services/exhibitions",
      },
    },
    openGraph: {
      title: "Exhibition Management Company Riyadh | Saudi Event Management",
      description:
        "Premier exhibition management in Saudi Arabia — trade show organizing, booth design, stand building, and B2B expo management at RICEC, RECC, and major Saudi venues.",
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
