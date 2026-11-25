const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cap the largest generated width at 2048px. The default includes 3840px
    // (4K), which this site never needs — generating it is CPU-heavy, slows the
    // /_next/image optimizer (causing crawler timeouts) and hurts mobile LCP.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 2678400, // 31 days — cache optimized images longer
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'saudieventmanagement.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // 301s for URLs Google still reports as 404 / soft 404 (GSC, Nov 2026).
  // Each points to the closest live page; both locales are covered.
  async redirects() {
    const map = [
      // Blog slugs renamed in the July 2026 content-accuracy cleanup.
      ['/blog/weaving-luxury-lifestyle-saudi-arabia-elite-events', '/blog/weaving-exceptional-lifestyle-saudi-arabia-top-tier-events'],
      ['/blog/luxury-wedding-cost-saudi-arabia-guide', '/blog/exceptional-wedding-cost-saudi-arabia-guide'],
      ['/blog/2026-luxury-event-decor-trends-saudi-arabia', '/blog/2026-exceptional-event-decor-trends-saudi-arabia'],
      ['/blog/elevating-corporate-events-guide', '/blog/elevating-corporate-events-riyadh-jeddah'],
      // Retired programmatic service URLs.
      ['/services/exhibition-management-saudi-arabia', '/services/exhibitions'],
      ['/services/event-production-saudi-arabia', '/services/event-production'],
      // Removed team-member profiles.
      ['/about/our-team/fahad-al-sulaiman', '/about/our-team'],
      ['/about/our-team/nadia-al-rashidi', '/about/our-team'],
      ['/about/our-team/khalid-al-zahrani', '/about/our-team'],
    ];
    return map.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/ar${from}`, destination: `/ar${to}`, permanent: true },
    ]);
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://images.unsplash.com https://*.clearbit.com https://*.placehold.co https://placehold.co https://saudieventmanagement.com https://www.googletagmanager.com https://*.google-analytics.com https://*.clarity.ms; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://va.vercel-scripts.com https://*.supabase.co https://*.clearbit.com https://*.placehold.co https://placehold.co https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms https://c.bing.com; frame-ancestors 'none';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
