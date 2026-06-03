import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: 'Post Not Found | Saudi Event Management' };
  }
  
  return {
    title: (post as any).metaTitle || post.title,
    description: (post as any).metaDescription || post.excerpt,
    alternates: {
      canonical: `https://saudieventmanagement.com/blog/${slug}`,
    },
    openGraph: {
      title: (post as any).metaTitle || post.title,
      description: (post as any).metaDescription || post.excerpt,
      images: [post.image],
    }
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
