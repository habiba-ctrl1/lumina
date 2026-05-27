import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/exhibitions`;

  return {
    title: 'Exhibition Management Company Riyadh',
    description: 'Premier exhibition management in Saudi Arabia. Expert trade show organizer in Riyadh and expo management in KSA. High-end exhibition stand builder and booth design.',
    keywords: 'exhibition management Saudi Arabia, إدارة المعارض التجارية السعودية, trade show organizer Riyadh, expo management KSA, product showcase Saudi Arabia, trade fair organizer Jeddah, expo booth design KSA, exhibition stand builder Saudi Arabia, B2B expo planner Riyadh, best exhibition management company in Saudi Arabia 2025, how to set up a trade show booth in Riyadh, cost of exhibition space at RECC Riyadh, international expo organizer Saudi Arabia, شركة إدارة معارض الرياض, تنظيم معارض تجارية جدة, مركز الرياض للمعارض والمؤتمرات',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': 'https://saudieventmanagement.com/services/exhibitions',
        'ar-SA': 'https://saudieventmanagement.com/ar/services/exhibitions',
      },
    },
  };
}

export default function ExhibitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
