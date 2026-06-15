import { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Riyadh Luxury Soiree Case Study',
    description: 'An exclusive high-society soiree in Riyadh, featuring bespoke production and elite hospitality by Saudi Event Management.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/riyadh-luxury-soiree`,
      languages: hreflangAlternates("/portfolio/riyadh-luxury-soiree"),
    },
  };
}

export default function RiyadhLuxurySoireeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
