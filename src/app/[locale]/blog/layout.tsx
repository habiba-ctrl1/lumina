import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Planning Insights & News | Saudi Event Management Blog",
  description: "Discover expert event planning tips, industry news, and insights into luxury weddings and corporate events in Saudi Arabia from Saudi Event Management.",
  keywords: [
    "Saudi Event Management Blog",
    "Event Planning Tips KSA",
    "Luxury Wedding Trends Saudi Arabia",
    "Corporate Event Ideas Riyadh",
    "Event Industry News KSA"
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Saudi Event Management Blog",
    "description": "Discover expert event planning tips, industry news, and insights into luxury weddings and corporate events in Saudi Arabia.",
    "url": "https://saudieventmanagement.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Saudi Event Management",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saudieventmanagement.com/logo.webp"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
