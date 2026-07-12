import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: "%s | RCU Venue Partner — Saudi Event Management",
      default: "Official RCU Venue Partner — Saudi Event Management",
    },
    robots: { index: false, follow: false }, // DRAFT — not for indexing
  };
}

export default function RCUPartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
