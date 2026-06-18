// The [slug] route only matches unknown portfolio slugs and always calls
// notFound() — real case studies are static sibling routes. This layout is
// therefore intentionally a pass-through (no metadata/schema for 404s).
export default function PortfolioItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
