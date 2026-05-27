import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/cultural-events`;

  return {
    title: "Cultural Event Management Saudi Arabia | Saudi Event Management",
    description:
      "Expert cultural event planning and management across Saudi Arabia. National celebrations, heritage festivals, and traditional Saudi entertainment experiences.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/cultural-events",
        "ar-SA": "https://saudieventmanagement.com/ar/services/cultural-events",
      },
    },
    openGraph: {
      title: "Cultural Event Management Saudi Arabia | Saudi Event Management",
      description:
        "Expert cultural event planning and management across Saudi Arabia.",
      url: canonicalUrl,
    },
  };
}

export default function CulturalEventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
