import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/production-venues`;

  return {
    title: 'Production & Venue Management',
    description: 'Full-service event management in Saudi Arabia. Premium event venues in Riyadh, AV production, stage design, luxury catering, and event decoration in KSA.',
    keywords: 'event services Saudi Arabia, خدمات الفعاليات السعودية, event venue Riyadh, أماكن فعاليات الرياض, AV production company Riyadh, event catering Saudi Arabia, stage design company KSA, event decoration Jeddah, event photography Saudi Arabia, event lighting Riyadh, full service event management company Saudi Arabia, best AV production company for events in Riyadh, event catering prices Saudi Arabia 2025, outdoor event venue rental Riyadh, event stage design and build KSA, شركة إنتاج صوت وصورة الرياض, خدمات تموين الفعاليات السعودية, تصميم وديكور فعاليات جدة, تصوير فعاليات الرياض',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': 'https://saudieventmanagement.com/services/production-venues',
        'ar-SA': 'https://saudieventmanagement.com/ar/services/production-venues',
      },
    },
  };
}

export default function ProductionVenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
