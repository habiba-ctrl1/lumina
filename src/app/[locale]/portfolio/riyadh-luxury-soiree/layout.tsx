import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Riyadh Luxury Soiree Case Study',
    description: 'An exclusive high-society soiree in Riyadh, featuring bespoke production and elite hospitality by Saudi Event Management.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/riyadh-luxury-soiree`,
      languages: { "en-US": `${base}/portfolio/riyadh-luxury-soiree`, "ar-SA": `${base}/ar/portfolio/riyadh-luxury-soiree` },
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
