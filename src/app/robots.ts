import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com";

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/admin/dashboard',
          '/admin/inquiries',
          '/admin/quotes',
          '/admin/vendors',
          '/admin/clients',
          '/admin/gallery',
          '/admin/blog',
          '/admin/analytics',
          '/admin/events',
          '/admin/proposals',
          '/admin/finance',
          '/admin/calendar',
          '/admin/testimonials',
          '/admin/status',
          '/admin/search',
          '/admin/quote-wizard',
          '/admin/login',
          // NOTE: /tracking is intentionally NOT disallowed here. It must stay
          // crawlable so Googlebot can see its `noindex, nofollow` meta tag
          // (set in app/[locale]/tracking/page.tsx). A robots.txt Disallow would
          // hide that tag and could leave the URL indexable via external links.
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
