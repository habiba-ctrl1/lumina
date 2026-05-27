import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/corporate-events`;

  return {
    title: "Corporate Event Management Saudi Arabia | Saudi Event Management",
    description:
      "Premier corporate event management in Saudi Arabia. Galas, product launches, executive summits, and brand activations across Riyadh, Jeddah, and Dammam.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": "https://saudieventmanagement.com/services/corporate-events",
        "ar-SA": "https://saudieventmanagement.com/ar/services/corporate-events",
      },
    },
    openGraph: {
      title: "Corporate Event Management Saudi Arabia | Saudi Event Management",
      description:
        "Premier corporate event management in Saudi Arabia. Galas, product launches, executive summits, and brand activations.",
      url: canonicalUrl,
      images: [{ url: "/corporate.webp", width: 1200, height: 630, alt: "Corporate Event Management Saudi Arabia" }],
    },
  };
}

export default function CorporateEventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
