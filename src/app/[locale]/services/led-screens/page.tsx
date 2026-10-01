import type { Metadata } from "next";
import ServiceCategoryPage, { buildServiceCategoryMetadata } from "@/components/ServiceCategoryPage";
import { getServiceCategory } from "@/lib/service-categories";

const category = getServiceCategory("led-screens");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildServiceCategoryMetadata(category, locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ServiceCategoryPage category={category} locale={locale} />;
}
