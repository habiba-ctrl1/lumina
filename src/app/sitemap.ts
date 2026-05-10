import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com";

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/faq',
    '/vendors',
    '/testimonials',
    '/blog',
    '/tracking',
    '/privacy',
    '/terms'
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : (route === '/blog' || route === '/services' || route === '/portfolio' ? 0.8 : 0.6),
  }));

  return [
    ...staticEntries,
    ...blogEntries,
  ];
}
