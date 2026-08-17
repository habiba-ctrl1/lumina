import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/birthday-party`;

  return {
    title: isAr
      ? { absolute: "تنظيم حفلات أعياد الميلاد في السعودية | تجهيز وترفيه وضيافة | إدارة الفعاليات السعودية" }
      : "Birthday Party Planning Saudi Arabia | Setup, Kids Entertainment & Catering | Saudi Event Management",
    description: isAr
      ? "تنظيم حفلات أعياد ميلاد متكاملة في الرياض وجدة والدمام — تجهيز وديكور، وترفيه وأنشطة للأطفال، وكشك تصوير، وضيافة، منسّق بالكامل عبر شبكة شركاء إدارة الفعاليات السعودية."
      : "Managed birthday party planning across Riyadh, Jeddah, and Dammam — setup and decor, kids entertainment and activities, photo booth, and catering, coordinated end-to-end through Saudi Event Management's partner network.",
    keywords: [
      "Birthday party planner Riyadh",
      "Birthday party setup Saudi Arabia",
      "Kids birthday party Riyadh",
      "Birthday party decoration Jeddah",
      "Birthday entertainment Saudi Arabia",
      "تنظيم حفلات أعياد ميلاد الرياض",
      "تجهيز حفلة عيد ميلاد جدة",
      "ترفيه أطفال حفلة عيد ميلاد",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/birthday-party"),
    },
    openGraph: {
      title: isAr
        ? "تنظيم حفلات أعياد الميلاد في السعودية | إدارة الفعاليات السعودية"
        : "Birthday Party Planning Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "تجهيز وديكور، وترفيه وأنشطة للأطفال، وكشك تصوير، وضيافة — منسّق بالكامل عبر شبكة شركاء إدارة الفعاليات السعودية."
        : "Setup and decor, kids entertainment and activities, photo booth, and catering — coordinated end-to-end through Saudi Event Management's partner network.",
      url: canonicalUrl,
      images: [
        {
          url: "/services/private_party.webp",
          width: 1200,
          height: 630,
          alt: "Birthday Party Planning Saudi Arabia",
        },
      ],
    },
  };
}

export default function BirthdayPartyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
