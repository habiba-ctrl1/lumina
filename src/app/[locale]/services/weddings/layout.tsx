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
      : "Luxury Wedding Planner Saudi Arabia — Riyadh, Jeddah & AlUla",
    description: isAr
      ? "مخطِّط أعراس فاخرة في السعودية — عقد القران والملكة، وليالي الحناء، والكوشة، وحفلات الاستقبال الكبرى في الرياض وجدة والعلا. احصل على استشارة مجانية اليوم."
      : "Saudi Arabia's trusted luxury wedding planner — crafting Nikah & Milka ceremonies, Henna nights, kosha design & grand receptions in Riyadh, Jeddah & AlUla. Get a free consultation today.",
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
