import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/weddings`;

  return {
    title: isAr
      ? {
          absolute:
            "تنظيم حفلات الزفاف في السعودية | مخطِّط أعراس الرياض وجدة والدمام | إدارة الفعاليات السعودية",
        }
      : "Wedding Planning Services Saudi Arabia | Saudi Event Management",
    description: isAr
      ? "خدمات تنظيم حفلات زفاف احترافية في الرياض وجدة والدمام — مراسم عقد القران والملكة، وليالي الحناء، وحفلات الاستقبال الكبرى. فريق موثوق لتخطيط الأعراس الفاخرة في السعودية."
      : "Professional wedding planning services across Riyadh, Jeddah, and Dammam — Nikah and Milka ceremonies, Henna nights, and grand receptions. Saudi Arabia's trusted wedding planning team.",
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/weddings"),
    },
    openGraph: {
      title: isAr
        ? "تنظيم حفلات الزفاف في السعودية | إدارة الفعاليات السعودية"
        : "Wedding Planning Services Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "تخطيط وتنفيذ حفلات الزفاف الفاخرة وإدارة المناسبات الاجتماعية في الرياض وجدة والدمام بلمسة راقية."
        : "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam.",
      url: canonicalUrl,
      images: [{ url: "/services/wedding.webp", width: 1200, height: 630, alt: "Luxury Wedding Planning Saudi Arabia" }],
    },
  };
}

export default function WeddingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
