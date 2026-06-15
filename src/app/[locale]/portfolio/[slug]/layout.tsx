import { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const title = slug.split('-').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const base = "https://saudieventmanagement.com";
  const canonical = `${base}${locale === "en" ? "" : "/ar"}/portfolio/${slug}`;

  return {
    title: `${title} | Saudi Event Management`,
    description: `Detailed case study of the ${title} project by Saudi Event Management.`,
    alternates: {
      canonical,
      languages: hreflangAlternates(`/portfolio/${slug}`),
    },
    openGraph: {
      title: title,
      description: `Detailed case study of the ${title} project.`,
      url: canonical,
    },
  };
}

export default async function PortfolioItemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.split('-').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${title} Case Study`,
    "description": `Detailed case study of the ${title} event production by Saudi Event Management.`,
    "author": {
      "@type": "Organization",
      "name": "Saudi Event Management"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Saudi Event Management",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saudieventmanagement.com/logo.webp"
      }
    },
    "url": `https://saudieventmanagement.com/portfolio/${slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
