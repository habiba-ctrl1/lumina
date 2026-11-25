import { blogPosts } from "@/lib/blog-data";
import { hreflangAlternates } from "@/lib/seo";
import { notFound } from "next/navigation";

const BASE = "https://saudieventmanagement.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: { absolute: "Post Not Found | Saudi Event Management" } };
  }

  const canonical = `${BASE}${locale === "en" ? "" : "/ar"}/blog/${slug}`;
  const isAr = locale === "ar";
  const p = post as any;
  const title = isAr
    ? p.metaTitleAr || p.titleAr || p.metaTitle || post.title
    : p.metaTitle || post.title;
  const description = isAr
    ? p.metaDescriptionAr || p.excerptAr || p.metaDescription || post.excerpt
    : p.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  // Unknown slugs must return a real 404 status. The client page's own
  // "Article Not Found" view returned 200, which Google reports as soft 404s.
  const { slug } = await params;
  if (!blogPosts.some((p) => p.slug === slug)) notFound();
  return <>{children}</>;
}
