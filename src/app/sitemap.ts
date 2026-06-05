import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com";

  const blogEntries = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages: { route: string; freq: 'weekly' | 'monthly'; priority: number }[] = [
    // ── Core pages ──────────────────────────────────────────────────────────
    { route: '',                   freq: 'weekly',  priority: 1.0 },
    { route: '/about',             freq: 'monthly', priority: 0.8 },
    { route: '/services',          freq: 'weekly',  priority: 0.9 },
    { route: '/portfolio',         freq: 'monthly', priority: 0.8 },
    { route: '/portfolio-luxury',  freq: 'monthly', priority: 0.7 },
    { route: '/blog',              freq: 'weekly',  priority: 0.8 },
    { route: '/contact',           freq: 'monthly', priority: 0.8 },
    { route: '/consultation',      freq: 'monthly', priority: 0.7 },

    // ── Service sub-pages ────────────────────────────────────────────────────
    { route: '/services/weddings',          freq: 'monthly', priority: 0.8 },
    { route: '/services/corporate-events',  freq: 'monthly', priority: 0.8 },
    { route: '/services/exhibitions',       freq: 'monthly', priority: 0.8 },
    { route: '/services/conferences',       freq: 'monthly', priority: 0.7 },
    { route: '/services/event-production',  freq: 'monthly', priority: 0.7 },
    { route: '/services/cultural-events',   freq: 'monthly', priority: 0.7 },
    { route: '/services/luxury-vip-events', freq: 'monthly', priority: 0.7 },

    // ── Locations ────────────────────────────────────────────────────────────
    { route: '/locations',          freq: 'monthly', priority: 0.7 },
    { route: '/locations/riyadh',   freq: 'monthly', priority: 0.7 },
    { route: '/locations/jeddah',   freq: 'monthly', priority: 0.7 },
    { route: '/locations/alula',    freq: 'monthly', priority: 0.7 },
    { route: '/locations/dammam',   freq: 'monthly', priority: 0.6 },

    // ── Supporting pages ─────────────────────────────────────────────────────
    { route: '/vendors',            freq: 'monthly', priority: 0.6 },
    { route: '/vendor-registration',freq: 'monthly', priority: 0.6 },
    { route: '/partners',           freq: 'monthly', priority: 0.6 },
    { route: '/testimonials',       freq: 'monthly', priority: 0.6 },
    { route: '/faq',                freq: 'monthly', priority: 0.6 },
    { route: '/glossary',           freq: 'monthly', priority: 0.5 },
    { route: '/tracking',           freq: 'monthly', priority: 0.4 },
    { route: '/privacy',            freq: 'monthly', priority: 0.3 },
    { route: '/terms',              freq: 'monthly', priority: 0.3 },
  ];

  const staticEntries = staticPages.map(({ route, freq, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  return [...staticEntries, ...blogEntries];
}
