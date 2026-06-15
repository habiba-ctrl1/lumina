import { blogPosts } from "@/lib/blog-data";
import { hreflangAlternates } from "@/lib/seo";

const BASE = "https://saudieventmanagement.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Saudi Event Management" };
  }

  const canonical = `${BASE}${locale === "en" ? "" : "/ar"}/blog/${slug}`;

  return {
    title: (post as any).metaTitle || post.title,
    description: (post as any).metaDescription || post.excerpt,
    alternates: {
      canonical,
      languages: hreflangAlternates(`/blog/${slug}`),
    },
    openGraph: {
      title: (post as any).metaTitle || post.title,
      description: (post as any).metaDescription || post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
