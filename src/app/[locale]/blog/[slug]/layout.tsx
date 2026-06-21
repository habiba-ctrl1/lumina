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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
