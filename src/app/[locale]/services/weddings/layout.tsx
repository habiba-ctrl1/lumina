import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/weddings`;

  return {
    title: "Luxury Wedding Planning Saudi Arabia | Saudi Event Management",
    description:
      "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam. Saudi Arabia's premier wedding event planner.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/weddings",
        "ar-SA": "https://saudieventmanagement.com/ar/services/weddings",
      },
    },
    openGraph: {
      title: "Luxury Wedding Planning Saudi Arabia | Saudi Event Management",
      description:
        "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam.",
      url: canonicalUrl,
      images: [{ url: "/wedding.webp", width: 1200, height: 630, alt: "Luxury Wedding Planning Saudi Arabia" }],
    },
  };
}

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
