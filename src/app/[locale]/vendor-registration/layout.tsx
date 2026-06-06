import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as an Event Vendor | Saudi Event Management",
  description: "Join Saudi Arabia's elite event vendor network. We partner with premium photographers, luxury caterers, and AV production experts across Riyadh and Jeddah.",
  keywords: [
    "Event Vendor Registration Saudi Arabia",
    "Become an Event Partner KSA",
    "Saudi Event Management Vendors",
    "Premium Event Suppliers Riyadh",
    "Luxury Event Vendors Jeddah"
  ],
};

export default function VendorRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Register as an Event Vendor in Saudi Arabia",
    "description": "Join Saudi Arabia's elite event vendor network.",
    "url": "https://saudieventmanagement.com/vendor-registration",
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
