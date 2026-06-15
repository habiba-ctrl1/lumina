import type { Metadata } from "next";
import { robotsForRoute } from "@/lib/seo";

// Robots only. The location pages set their own title/description/alternates;
// those fields override per page, while `robots` is inherited here so the whole
// /locations subtree (index, [city], [city]/[service], static cities) gets the
// correct directive. All location routes are translated, so this is index,follow
// on EN and /ar alike — matching the per-route X-Robots-Tag header in middleware.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    robots: robotsForRoute(locale, "/locations"),
  };
}

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
