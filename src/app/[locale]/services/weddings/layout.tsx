import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/weddings`;

  return {
    title: "Wedding Planning Services Saudi Arabia | Saudi Event Management",
    description:
      "Professional wedding planning services across Riyadh, Jeddah, and Dammam — Nikah and Milka ceremonies, Henna nights, and grand receptions. Saudi Arabia's trusted wedding planning team.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/weddings",
        "ar-SA": "https://saudieventmanagement.com/ar/services/weddings",
      },
    },
    openGraph: {
      title: "Wedding Planning Services Saudi Arabia | Saudi Event Management",
      description:
        "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam.",
      url: canonicalUrl,
      images: [{ url: "/services/wedding.webp", width: 1200, height: 630, alt: "Luxury Wedding Planning Saudi Arabia" }],
    },
  };
}

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
