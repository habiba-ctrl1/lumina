import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Lifestyle Journal",
  description:
    "Explore event planning tips, trending color palettes, decor ideas, and luxury lifestyle insights from the Saudi Event Management editorial team.",
  openGraph: {
    title: "Blog & Lifestyle Journal",
    description:
      "Explore event planning tips, trending color palettes, decor ideas, and luxury lifestyle insights.",
    url: "/blog",
    siteName: "Saudi Event Management",
    type: "website",
  },
  alternates: { canonical: "https://saudieventmanagement.com/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
