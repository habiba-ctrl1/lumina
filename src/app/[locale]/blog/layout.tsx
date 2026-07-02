import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

const BASE = "https://saudieventmanagement.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = locale === "en" ? `${BASE}/blog` : `${BASE}/ar/blog`;

  const title = isAr
    ? "رؤى ونصائح تخطيط الفعاليات الفاخرة"
    : "Event Planning Insights & Industry News";
  const description = isAr
    ? "اكتشف نصائح الخبراء في تخطيط الفعاليات، وأحدث أخبار القطاع، ورؤى حول حفلات الزفاف الفاخرة وفعاليات الشركات في المملكة العربية السعودية من إدارة الفعاليات السعودية."
    : "Discover expert event planning tips, industry news, and insights into luxury weddings and corporate events in Saudi Arabia from Saudi Event Management.";

  return {
    title,
    description,
    keywords: isAr
      ? [
          "مدوّنة إدارة الفعاليات السعودية",
          "نصائح تخطيط الفعاليات",
          "اتجاهات الزفاف الفاخر السعودية",
          "أفكار فعاليات الشركات الرياض",
        ]
      : [
          "Saudi Event Management Blog",
          "Event Planning Tips KSA",
          "Luxury Wedding Trends Saudi Arabia",
          "Corporate Event Ideas Riyadh",
          "Event Industry News KSA",
        ],
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical,
      languages: hreflangAlternates("/blog"),
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Saudi Event Management Blog",
    "description": "Discover expert event planning tips, industry news, and insights into luxury weddings and corporate events in Saudi Arabia.",
    "url": "https://saudieventmanagement.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Saudi Event Management",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saudieventmanagement.com/logo.webp"
      }
    }
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
