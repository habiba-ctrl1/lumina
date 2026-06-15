import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { robotsForRootLayout } from "@/lib/seo";
import "../globals.css";
import Script from "next/script";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// ─────────────────────────────────────────────────────────────────────────────
// Fonts
// Plus Jakarta Sans → headings/display  (--font-display)
// Inter             → body/UI           (--font-sans)
// Playfair Display  → luxury serif      (--font-serif)  — used in city names,
//                                        editorial headings, hero overlay text
// ─────────────────────────────────────────────────────────────────────────────
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// `robots` is intentionally omitted from this base object — it is set per-locale
// in generateMetadata() below via robotsForRootLayout(): English inherits an
// indexable directive, while Arabic indexability is decided per-route by the
// X-Robots-Tag header in middleware (see @/lib/seo).
// ─────────────────────────────────────────────────────────────────────────────
const baseMetadata: Metadata = {
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
  applicationName: "Saudi Event Management",
  // NOTE: No site-wide alternates.canonical here — each page/layout sets its own
  // canonical and hreflang to avoid bleeding the homepage URL to every route.
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/icon.svg",
    apple: { url: "/icon.png", sizes: "180x180", type: "image/png" },
  },
};

// Per-locale metadata. English routes inherit an `index, follow` directive here.
// Arabic routes emit NO `<meta robots>` from this layout — their indexability is
// decided per-route by the `X-Robots-Tag` header set in middleware (see @/lib/seo),
// so a translated `/ar` route is never forced to `noindex` by inheritance.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...baseMetadata,
    robots: robotsForRootLayout(locale),
  };
}

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
  email: "infosaudieventmanagement@gmail.com",
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
      name: "Al Khobar",
    },
    {
      "@type": "City",
      name: "Makkah",
    },
    {
      "@type": "City",
      name: "AlUla",
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
  inLanguage: ["en-US", "ar-SA"]
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
      className={`scroll-smooth ${plusJakarta.variable} ${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      {/*
        font-sans   → DM Sans      (body text, nav, UI labels)
        antialiased → smoother font rendering on dark backgrounds
      */}
      <body
        className="font-sans antialiased"
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