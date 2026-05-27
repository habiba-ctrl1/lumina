import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/destination-events`;

  return {
    title: "Destination Event Planning Saudi Arabia | Saudi Event Management",
    description:
      "Luxury destination event planning across Saudi Arabia's most iconic locations — AlUla, NEOM, Red Sea, and the Empty Quarter. Bespoke experiences in extraordinary settings.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/destination-events",
        "ar-SA": "https://saudieventmanagement.com/ar/services/destination-events",
      },
    },
    openGraph: {
      title: "Destination Event Planning Saudi Arabia | Saudi Event Management",
      description:
        "Luxury destination event planning across Saudi Arabia's most iconic locations.",
      url: canonicalUrl,
    },
  };
}

export default function DestinationEventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
