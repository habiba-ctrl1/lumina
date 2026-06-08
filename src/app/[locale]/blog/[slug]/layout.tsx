import { blogPosts } from "@/lib/blog-data";

const BASE = "https://saudieventmanagement.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Saudi Event Management" };
  }

  return {
    title: (post as any).metaTitle || post.title,
    description: (post as any).metaDescription || post.excerpt,
    alternates: {
      canonical: `${BASE}/blog/${slug}`,
      languages: {
        en: `${BASE}/blog/${slug}`,
        ar: `${BASE}/ar/blog/${slug}`,
        "x-default": `${BASE}/blog/${slug}`,
      },
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
