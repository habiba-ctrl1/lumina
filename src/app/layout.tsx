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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
