import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Become a Partner",
    description: "Join our elite ecosystem of event professionals. Apply to become a strategic partner, elite supplier, or cultural collaborator with Saudi Event Management.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/partners/become-one`,
      languages: { "en-US": `${base}/partners/become-one`, "ar-SA": `${base}/ar/partners/become-one` },
    },
  };
}

export default function BecomeOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
