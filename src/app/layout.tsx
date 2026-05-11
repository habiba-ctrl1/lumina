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
    images: [{ url: "/hero_bg.webp", width: 1200, height: 630, alt: "Saudi Event Management Luxury Event Management" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saudi Event Management | Luxury Event Management 2026",
    description: "Award-winning premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.",
    images: ["/hero_bg.webp"],
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
  alternates: { 
    canonical: "https://saudieventmanagement.com",
    languages: {
      "ar-SA": "https://saudieventmanagement.com/ar",
    },
  },
};

import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";

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
        "logo": "https://saudieventmanagement.com/main-logo.webp",
        "sameAs": [
          "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn",
          "https://linkedin.com/company/saudieventmanagement"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://saudieventmanagement.com/#localbusiness-riyadh",
        "name": "Saudi Event Management - Riyadh Headquarters",
        "image": "https://saudieventmanagement.com/hero_bg.webp",
        "telephone": "+966501234567",
        "priceRange": "$$$",
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
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "184"
        },
        "review": [
          {
            "@type": "Review",
            "author": "H.H. Princess Noura",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "reviewBody": "The level of architectural precision and emotional resonance was staggering. They curate history."
          },
          {
            "@type": "Review",
            "author": "Khalid Al-Mansour",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "reviewBody": "A masterclass in high-stakes corporate logistics and ultra-luxury hospitality."
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://saudieventmanagement.com/#localbusiness-jeddah",
        "name": "Saudi Event Management - Jeddah Coastal Office",
        "image": "https://saudieventmanagement.com/gallery_corporate_gala.webp",
        "telephone": "+966509876543",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jeddah Corniche",
          "addressLocality": "Jeddah",
          "addressRegion": "Makkah Province",
          "addressCountry": "SA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "21.4858",
          "longitude": "39.1925"
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
        "@type": "FAQPage",
        "@id": "https://saudieventmanagement.com/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you offer destination event planning in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we specialize in high-end destination events across the Kingdom, including AlUla heritage sites, NEOM future summits, and Red Sea coastal weddings."
            }
          },
          {
            "@type": "Question",
            "name": "What is the average budget for a luxury event?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our bespoke events typically range from 500,000 SAR to over 1,000,000 SAR, depending on the scale and architectural complexity."
            }
          }
        ]
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
            "price": "500000",
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
        <SplashScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
