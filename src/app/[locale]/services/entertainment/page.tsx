import ServiceCategoryPage from "@/components/ServiceCategoryPage";
import { getServiceCategory } from "@/lib/service-categories";

// Metadata (indexed EN + AR) is owned by ./layout.tsx. Content — including the
// full Arabic version — lives in src/lib/service-categories/entertainment.ts.
const category = getServiceCategory("entertainment");

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ServiceCategoryPage category={category} locale={locale} />;
}
