import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Event Partnerships | Saudi Event Management",
  description: "Join Saudi Arabia's premier event management network. We collaborate with world-class brands, government entities, and elite suppliers to deliver luxury experiences.",
  keywords: [
    "Event Management Partners Saudi Arabia",
    "Saudi Vision 2030 Event Partners",
    "Corporate Event Partnerships Riyadh",
    "Luxury Event Suppliers KSA"
  ],
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Strategic Event Partnerships in Saudi Arabia",
    "description": "Collaborate with Saudi Event Management for high-level GIGA projects, national celebrations, and luxury events across KSA.",
    "url": "https://saudieventmanagement.com/partners",
    "mainEntity": {
      "@type": "Organization",
      "name": "Saudi Event Management",
      "url": "https://saudieventmanagement.com"
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
