import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: "%s | Venue Portfolio — Saudi Event Management",
      default: "Venue Portfolio — Saudi Event Management",
    },
    robots: { index: false, follow: false }, // DRAFT — not for indexing
  };
}

export default function VenuesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
