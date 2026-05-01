import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lumina | Luxury Event Management Services",
  description: "Premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties. Book your unforgettable experience.",
  keywords: ["luxury event management", "wedding planner", "corporate gala planner", "private party organizer", "bespoke events", "premium event agency"],
  authors: [{ name: "Lumina Events" }],
  creator: "Lumina Events",
  publisher: "Lumina Events",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://luminaevents.com"),
  openGraph: {
    title: "Lumina | Luxury Event Management Services",
    description: "Premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.",
    url: "/",
    siteName: "Lumina Events",
    images: [
      {
        url: "/hero_bg.png",
        width: 1200,
        height: 630,
        alt: "Lumina Luxury Event Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina | Luxury Event Management Services",
    description: "Premier event management agency specializing in bespoke luxury weddings, high-end corporate galas, and exclusive private parties.",
    images: ["/hero_bg.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
