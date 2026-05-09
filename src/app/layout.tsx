import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Luxury Wedding Planner Riyadh & Corporate Event Management Jeddah | Saudi Event Management",
    template: "%s | Saudi Event Management Luxury Events KSA",
  },
  description: "Saudi Event Management is Saudi Arabia's premier luxury event management agency. We specialize in bespoke royal weddings in Riyadh, high-end corporate galas in Jeddah, and exclusive cultural activations in AlUla. Book your elite experience.",
  applicationName: "Saudi Event Management",
  keywords: ["Luxury Wedding Planner Riyadh", "Corporate Event Management Jeddah", "Luxury Events Saudi Arabia", "Event Agency AlUla", "Bespoke Weddings KSA", "Royal Wedding Organizer Riyadh", "Corporate Gala Planner Saudi", "Sustainable Luxury Events KSA"],
  authors: [{ name: "Saudi Event Management", url: "https://saudieventmanagement.com" }],
  creator: "Saudi Event Management",
  publisher: "Saudi Event Management",
  category: "Event Planning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com"),
  openGraph: {
    title: "Saudi Event Management | Luxury Event Management 2026",
    description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties for 2026.",
    url: "/",
    siteName: "Saudi Event Management",
    images: [{ url: "/hero_bg.png", width: 1200, height: 630, alt: "Saudi Event Management Luxury Event Management" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Event Management | Luxury Event Management 2026",
    description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.",
    images: ["/hero_bg.png"],
    creator: "@saudieventmanagement",
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
        "@id": "https://saudieventmanagement.com/#organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com",
        "logo": "https://saudieventmanagement.com/sem-logo.svg",
        "sameAs": [
          "https://instagram.com/saudieventmanagement",
          "https://linkedin.com/company/saudieventmanagement"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://saudieventmanagement.com/#localbusiness",
        "name": "Saudi Event Management Luxury Event Management Riyadh",
        "image": "https://saudieventmanagement.com/hero_bg.png",
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
        "@id": "https://saudieventmanagement.com/#website",
        "url": "https://saudieventmanagement.com",
        "name": "Saudi Event Management",
        "publisher": { "@id": "https://saudieventmanagement.com/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://saudieventmanagement.com/#webpage",
        "url": "https://saudieventmanagement.com",
        "name": "Saudi Event Management",
        "isPartOf": { "@id": "https://saudieventmanagement.com/#website" }
      },
      {
        "@type": "EventSeries",
        "@id": "https://saudieventmanagement.com/#eventseries",
        "name": "Saudi Event Management Signature Events",
        "description": "A series of high-profile corporate, exhibition, and luxury social events managed by Saudi Event Management across KSA.",
        "organizer": { "@id": "https://saudieventmanagement.com/#organization" }
      },
      {
        "@type": "FAQPage",
        "@id": "https://saudieventmanagement.com/#faqpage",
        "mainEntity": []
      },
      {
        "@type": "HowTo",
        "@id": "https://saudieventmanagement.com/#howto",
        "name": "How to Plan an Event in Saudi Arabia with Saudi Event Management",
        "step": [
          { "@type": "HowToStep", "text": "Contact our expert consultants for a discovery session." },
          { "@type": "HowToStep", "text": "Collaborate on bespoke event design and logistics planning." },
          { "@type": "HowToStep", "text": "Experience flawless execution of your premium event." }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://saudieventmanagement.com/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" }
        ]
      },
      {
        "@type": "Article",
        "@id": "https://saudieventmanagement.com/#article",
        "headline": "Saudi Event Management Insights",
        "author": { "@type": "Person", "name": "Saudi Event Management Experts" },
        "publisher": { "@id": "https://saudieventmanagement.com/#organization" }
      },
      {
        "@type": "Person",
        "@id": "https://saudieventmanagement.com/#person",
        "name": "Habiba",
        "jobTitle": "Founder & Event Director"
      },
      {
        "@type": "AggregateRating",
        "@id": "https://saudieventmanagement.com/#aggregaterating",
        "itemReviewed": { "@id": "https://saudieventmanagement.com/#localbusiness" },
        "ratingValue": "4.9",
        "reviewCount": "150"
      },
      {
        "@type": "Review",
        "@id": "https://saudieventmanagement.com/#review",
        "itemReviewed": { "@id": "https://saudieventmanagement.com/#localbusiness" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "author": { "@type": "Person", "name": "VIP Client" }
      },
      {
        "@type": "Service",
        "@id": "https://saudieventmanagement.com/#service",
        "name": "Luxury Event Management",
        "provider": { "@id": "https://saudieventmanagement.com/#organization" },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
