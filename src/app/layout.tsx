import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Lumina | Luxury Event Management 2026",
    template: "%s | Lumina Luxury Events",
  },
  description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties for 2026. Book your unforgettable experience.",
  applicationName: "Lumina Events",
  keywords: ["luxury event management 2026", "wedding planner 2026", "corporate gala planner", "private party organizer", "bespoke events", "premium event agency", "award winning event planners", "sustainable luxury events"],
  authors: [{ name: "Lumina Events", url: "https://luminaevents.com" }],
  creator: "Lumina Events",
  publisher: "Lumina Events",
  category: "Event Planning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://luminaevents.com"),
  openGraph: {
    title: "Lumina | Luxury Event Management 2026",
    description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties for 2026.",
    url: "/",
    siteName: "Lumina Events",
    images: [{ url: "/hero_bg.png", width: 1200, height: 630, alt: "Lumina Luxury Event Management" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina | Luxury Event Management 2026",
    description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.",
    images: ["/hero_bg.png"],
    creator: "@luminaevents",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://luminaevents.com/#organization",
        "name": "Lumina Events",
        "url": "https://luminaevents.com",
        "logo": "https://luminaevents.com/logo.png",
        "sameAs": [
          "https://instagram.com/luminaevents",
          "https://linkedin.com/company/luminaevents"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://luminaevents.com/#localbusiness",
        "name": "Lumina Luxury Event Management Riyadh",
        "image": "https://luminaevents.com/hero_bg.png",
        "telephone": "+966501234567",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Olaya St",
          "addressLocality": "Riyadh",
          "addressRegion": "Riyadh Province",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "24.7136",
          "longitude": "46.6753"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://luminaevents.com/#website",
        "url": "https://luminaevents.com",
        "name": "Lumina Events",
        "publisher": { "@id": "https://luminaevents.com/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://luminaevents.com/#webpage",
        "url": "https://luminaevents.com",
        "name": "Lumina Events",
        "isPartOf": { "@id": "https://luminaevents.com/#website" }
      },
      {
        "@type": "EventSeries",
        "@id": "https://luminaevents.com/#eventseries",
        "name": "Lumina Signature Events",
        "description": "A series of high-profile corporate, exhibition, and luxury social events managed by Lumina across KSA.",
        "organizer": { "@id": "https://luminaevents.com/#organization" }
      },
      {
        "@type": "FAQPage",
        "@id": "https://luminaevents.com/#faqpage",
        "mainEntity": []
      },
      {
        "@type": "HowTo",
        "@id": "https://luminaevents.com/#howto",
        "name": "How to Plan an Event in Saudi Arabia with Lumina",
        "step": [
          { "@type": "HowToStep", "text": "Contact our expert consultants for a discovery session." },
          { "@type": "HowToStep", "text": "Collaborate on bespoke event design and logistics planning." },
          { "@type": "HowToStep", "text": "Experience flawless execution of your premium event." }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://luminaevents.com/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://luminaevents.com" }
        ]
      },
      {
        "@type": "Article",
        "@id": "https://luminaevents.com/#article",
        "headline": "Lumina Event Management Insights",
        "author": { "@type": "Person", "name": "Lumina Experts" },
        "publisher": { "@id": "https://luminaevents.com/#organization" }
      },
      {
        "@type": "Person",
        "@id": "https://luminaevents.com/#person",
        "name": "Habiba",
        "jobTitle": "Founder & Event Director"
      },
      {
        "@type": "AggregateRating",
        "@id": "https://luminaevents.com/#aggregaterating",
        "itemReviewed": { "@id": "https://luminaevents.com/#localbusiness" },
        "ratingValue": "4.9",
        "reviewCount": "150"
      },
      {
        "@type": "Review",
        "@id": "https://luminaevents.com/#review",
        "itemReviewed": { "@id": "https://luminaevents.com/#localbusiness" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "author": { "@type": "Person", "name": "VIP Client" }
      },
      {
        "@type": "Service",
        "@id": "https://luminaevents.com/#service",
        "name": "Luxury Event Management",
        "provider": { "@id": "https://luminaevents.com/#organization" },
        "offers": {
          "@type": "Offer",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "75000",
            "priceCurrency": "SAR"
          }
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
