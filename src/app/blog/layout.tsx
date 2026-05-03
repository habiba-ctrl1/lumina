import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Lifestyle | Lumina Events - Event Planning Tips & Inspiration",
  description:
    "Explore event planning tips, trending color palettes, decor ideas, and luxury lifestyle insights from the Lumina Events editorial team.",
  openGraph: {
    title: "Blog & Lifestyle | Lumina Events",
    description:
      "Explore event planning tips, trending color palettes, decor ideas, and luxury lifestyle insights.",
    url: "/blog",
    siteName: "Lumina Events",
    type: "website",
  },
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
