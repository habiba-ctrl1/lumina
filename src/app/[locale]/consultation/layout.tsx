import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Book a Consultation",
    description: "Schedule your discovery session with our luxury event experts. We bring your vision to life with perfect planning and design that makes people feel special.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/consultation`,
      languages: { "en-US": `${base}/consultation`, "ar-SA": `${base}/ar/consultation` },
    },
  };
}

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
