import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Script from "next/script";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// ─────────────────────────────────────────────────────────────────────────────
// Fonts
// Plus Jakarta Sans → headings/display (--font-display) → font-display class
// Inter               → body/UI (--font-sans)        → font-sans class
// ─────────────────────────────────────────────────────────────────────────────
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// Metadata (unchanged — already well structured)
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:
      "Event Management Company in Saudi Arabia | Saudi Event Management",
    template: "%s | Saudi Event Management",
  },
  description:
    "Saudi Event Management is a premier event management company in Saudi Arabia. We specialize in corporate events, exhibitions, luxury weddings, and conferences across Riyadh, Jeddah, and AlUla.",
  keywords: [
    "Event Management Company in Saudi Arabia",
    "Event Management Riyadh",
    "Corporate Events Saudi Arabia",
    "Exhibition Management Saudi Arabia",
    "Luxury Event Management KSA",
    "Conference Management Riyadh",
    "Wedding Event Planner Saudi Arabia",
    "Event Production Saudi Arabia",
    "شركة إدارة فعاليات في السعودية",
    "تنظيم فعاليات الرياض",
  ],
  authors: [{ name: "Saudi Event Management", url: "https://saudieventmanagement.com" }],
  creator: "Saudi Event Management",
  publisher: "Saudi Event Management",
  category: "Event Planning",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com"
  ),
  openGraph: {
    type: "website",
    url: "https://saudieventmanagement.com",
    siteName: "Saudi Event Management",
    title:
      "Event Management Company in Saudi Arabia | Saudi Event Management",
    description:
      "Premier event management company in Saudi Arabia. Corporate events, exhibitions, luxury weddings & conferences in Riyadh, Jeddah, AlUla.",
    locale: "en_US",
    images: [
      {
        url: "https://saudieventmanagement.com/hero_bg.webp",
        width: 1200,
        height: 630,
        alt: "Saudi Event Management — Luxury Event Company in Saudi Arabia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@saudieventmgmt",
    creator: "@saudieventmgmt",
    title:
      "Event Management Company in Saudi Arabia | Saudi Event Management",
    description:
      "Premier event management company in Saudi Arabia. Corporate events, exhibitions, luxury weddings & conferences.",
    images: ["https://saudieventmanagement.com/hero_bg.webp"],
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
  },
  applicationName: "Saudi Event Management",
};

import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "EventVenue"],
  "@id": "https://saudieventmanagement.com/#organization",
  name: "Saudi Event Management",
  url: "https://saudieventmanagement.com",
  logo: {
    "@type": "ImageObject",
    url: "https://saudieventmanagement.com/main-logo.webp",
    width: 300,
    height: 100,
  },
  image: "https://saudieventmanagement.com/hero_bg.webp",
  description:
    "Premier event management company in Saudi Arabia specializing in corporate events, exhibitions, luxury weddings, conferences, and event production across Riyadh, Jeddah, and AlUla.",
  telephone: "+966501234567",
  email: "hello@saudieventmanagement.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
    addressRegion: "Riyadh Province",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Riyadh",
      "@id": "https://www.wikidata.org/wiki/Q3692",
    },
    {
      "@type": "City",
      name: "Jeddah",
      "@id": "https://www.wikidata.org/wiki/Q128473",
    },
    {
      "@type": "City",
      name: "AlUla",
    },
    {
      "@type": "City",
      name: "Makkah",
    },
    {
      "@type": "Country",
      name: "Saudi Arabia",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event Management Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Event Management",
          description:
            "Professional corporate event planning and management in Saudi Arabia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Exhibition Management",
          description:
            "Full-service exhibition setup and management across Saudi Arabia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conference Management",
          description:
            "End-to-end conference planning and production in Riyadh",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury Wedding Planning",
          description:
            "Bespoke luxury wedding planning and management in Saudi Arabia",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Event Production",
          description:
            "Stage, lighting, AV and full event production services",
        },
      },
    ],
  },
  sameAs: [
    "https://www.instagram.com/saudieventmanagement?igsh=enVkcGtuZGxiZ2Nn",
    "https://twitter.com/saudieventmgmt",
    "https://linkedin.com/company/saudieventmanagement",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://saudieventmanagement.com/#website",
  url: "https://saudieventmanagement.com",
  name: "Saudi Event Management",
  publisher: {
    "@id": "https://saudieventmanagement.com/#organization",
  },
  inLanguage: ["en-US", "ar-SA"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://saudieventmanagement.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
// ─────────────────────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`scroll-smooth ${plusJakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
          strategy="beforeInteractive"
        />
      </head>

      {/*
        font-sans   → DM Sans      (body text, nav, UI labels)
        antialiased → smoother font rendering on dark backgrounds
      */}
      <body
        className="font-sans antialiased bg-ink-950 text-sand-100"
        suppressHydrationWarning
      >
        {/* Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wqx7njmnor");
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-010MKH4LLF"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-010MKH4LLF');
            `,
          }}
        />

        <SplashScreen />
        <CustomCursor />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}