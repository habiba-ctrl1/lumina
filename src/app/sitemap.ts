import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { isArabicRouteInSitemap, isArabicPath, stripLocalePrefix } from '@/lib/seo';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com";

/* ─── City slugs supported by /locations/[city] ────────────────────────────── */
const locationCities = [
  "riyadh", "jeddah", "dammam", "alula",
  "neom", "khobar", "makkah", "madinah",
  "taif", "abha", "diriyah", "tabuk",
];

/* ─── Service slugs supported by /locations/[city]/[service] ───────────────── */
const locationServices = [
  "corporate-event-management",
  "luxury-wedding-planning",
  "exhibition-management",
  "conference-planning",
  "vip-event-planning",
];

/* ─── Top cities to generate city×service matrix (avoids low-value combos) ─── */
const primaryCities    = ["riyadh", "jeddah", "dammam", "alula"];
const secondaryCities  = ["neom", "khobar", "makkah", "madinah", "diriyah"];

/* ─── PSEO service×city slugs at /services/[slug] ──────────────────────────── */
const pseoServiceSlugs = [
  "corporate-events-riyadh",
  "corporate-events-jeddah",
  "corporate-events-dammam",
  "luxury-weddings-riyadh",
  "luxury-weddings-jeddah",
  "luxury-weddings-dammam",
  "exhibitions-jeddah",
  "exhibitions-dammam",
  "conference-management-jeddah",
  "conference-management-dammam",
  "event-production-riyadh",
  "event-production-jeddah",
  "event-production-alula",
  "cultural-events-riyadh",
  "cultural-events-jeddah",
  "vip-events-jeddah",
  "vip-events-alula",
  "destination-events-alula",
  "destination-events-neom",
];

export default function sitemap(): MetadataRoute.Sitemap {

  /* ── Blog entries ────────────────────────────────────────────────────────── */
  const blogEntriesEN = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogEntriesAR = blogPosts.map((post) => ({
    url: `${BASE}/ar/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  /* ── Location city pages ─────────────────────────────────────────────────── */
  const locationCityEntries = locationCities.flatMap((city) => [
    {
      url: `${BASE}/locations/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: city === "riyadh" || city === "jeddah" ? 0.75 : 0.65,
    },
    {
      url: `${BASE}/ar/locations/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    },
  ]);

  /* ── Location city×service pages (primary cities: all services) ─────────── */
  const primaryCityServiceEntries = primaryCities.flatMap((city) =>
    locationServices.flatMap((service) => [
      {
        url: `${BASE}/locations/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      },
      {
        url: `${BASE}/ar/locations/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      },
    ])
  );

  /* ── PSEO service×city pages at /services/[slug] ────────────────────────── */
  const pseoServiceEntries = pseoServiceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* ── Location city×service pages (secondary cities: top 2 services only) ── */
  const secondaryCityServiceEntries = secondaryCities.flatMap((city) =>
    ["corporate-event-management", "luxury-wedding-planning"].flatMap((service) => [
      {
        url: `${BASE}/locations/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.55,
      },
      {
        url: `${BASE}/ar/locations/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ])
  );

  /* ── Static pages ────────────────────────────────────────────────────────── */
  const staticPages: { route: string; freq: 'weekly' | 'monthly'; priority: number }[] = [
    // ── Core ──────────────────────────────────────────────────────────────────
    { route: '',                      freq: 'weekly',  priority: 1.0  },
    { route: '/about',                freq: 'monthly', priority: 0.8  },
    { route: '/services',             freq: 'weekly',  priority: 0.9  },
    { route: '/portfolio',            freq: 'monthly', priority: 0.8  },
    { route: '/blog',                 freq: 'weekly',  priority: 0.8  },
    { route: '/contact',              freq: 'monthly', priority: 0.8  },
    { route: '/consultation',         freq: 'monthly', priority: 0.7  },
    { route: '/locations',            freq: 'monthly', priority: 0.75 },

    // ── Arabic core ────────────────────────────────────────────────────────────
    { route: '/ar',                   freq: 'weekly',  priority: 0.9  },
    { route: '/ar/about',             freq: 'monthly', priority: 0.7  },
    { route: '/ar/services',          freq: 'weekly',  priority: 0.8  },
    { route: '/ar/contact',           freq: 'monthly', priority: 0.7  },
    { route: '/ar/blog',              freq: 'weekly',  priority: 0.7  },
    { route: '/ar/locations',         freq: 'monthly', priority: 0.65 },

    // ── Service sub-pages (English) ────────────────────────────────────────────
    { route: '/services/corporate-events',    freq: 'monthly', priority: 0.85 },
    { route: '/services/weddings',            freq: 'monthly', priority: 0.85 },
    { route: '/services/exhibitions',         freq: 'monthly', priority: 0.8  },
    { route: '/services/conferences',         freq: 'monthly', priority: 0.8  },
    { route: '/services/event-production',    freq: 'monthly', priority: 0.75 },
    { route: '/services/cultural-events',     freq: 'monthly', priority: 0.75 },
    { route: '/services/luxury-vip-events',   freq: 'monthly', priority: 0.75 },
    { route: '/services/destination-events',  freq: 'monthly', priority: 0.75 },
    { route: '/services/royal-weddings',      freq: 'monthly', priority: 0.7  },
    { route: '/services/production-venues',   freq: 'monthly', priority: 0.7  },

    // ── Service sub-pages (Arabic) ─────────────────────────────────────────────
    { route: '/ar/services/corporate-events',   freq: 'monthly', priority: 0.75 },
    { route: '/ar/services/weddings',           freq: 'monthly', priority: 0.75 },
    { route: '/ar/services/exhibitions',        freq: 'monthly', priority: 0.7  },
    { route: '/ar/services/conferences',        freq: 'monthly', priority: 0.7  },
    { route: '/ar/services/destination-events', freq: 'monthly', priority: 0.65 },

    // ── Portfolio ─────────────────────────────────────────────────────────────
    { route: '/portfolio/luxury-weddings',           freq: 'monthly', priority: 0.7 },
    { route: '/portfolio/corporate-events',          freq: 'monthly', priority: 0.7 },
    { route: '/portfolio/vision-2030',               freq: 'monthly', priority: 0.7 },
    { route: '/portfolio/royal-riyadh-wedding',      freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/riyadh-elite-majlis',       freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/riyadh-luxury-soiree',      freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/neom-future-summit',        freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/executive-summit-jeddah',   freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/global-tech-summit',        freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/dammam-corporate-seminar',  freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/alula-desert-festival',     freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/makkah-vip-retreat',        freq: 'monthly', priority: 0.6  },
    { route: '/portfolio/madinah-spiritual-event',   freq: 'monthly', priority: 0.6  },
    { route: '/portfolio/riyadh-government-summit',  freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/jeddah-beach-wedding',      freq: 'monthly', priority: 0.65 },
    { route: '/portfolio/alkhobar-corporate-retreat',freq: 'monthly', priority: 0.6  },
    { route: '/portfolio/grand-wedding-ceremony',    freq: 'monthly', priority: 0.6  },

    // ── About ─────────────────────────────────────────────────────────────────
    { route: '/about/our-team',           freq: 'monthly', priority: 0.6 },
    { route: '/about/awards-accolades',   freq: 'monthly', priority: 0.55 },
    { route: '/about/careers',            freq: 'monthly', priority: 0.55 },

    // ── Supporting ────────────────────────────────────────────────────────────
    { route: '/vendors',              freq: 'monthly', priority: 0.6 },
    { route: '/vendor-registration',  freq: 'monthly', priority: 0.55 },
    { route: '/partners',             freq: 'monthly', priority: 0.6 },
    { route: '/partners/become-one',  freq: 'monthly', priority: 0.55 },
    { route: '/testimonials',         freq: 'monthly', priority: 0.6 },
    { route: '/faq',                  freq: 'monthly', priority: 0.65 },
    { route: '/glossary',             freq: 'monthly', priority: 0.5 },
    { route: '/editorial-policy',     freq: 'monthly', priority: 0.3 },
    { route: '/privacy',              freq: 'monthly', priority: 0.3 },
    { route: '/terms',                freq: 'monthly', priority: 0.3 },
    // NOTE: /tracking and /portfolio-luxury intentionally excluded — thin/noindex content
    // NOTE: /admin/* intentionally excluded — blocked in robots.txt
  ];

  const staticEntries = staticPages.map(({ route, freq, priority }) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
    // Attach the hero showreel to the homepage entry so Google can discover and
    // index it (paired with the VideoObject schema on the page itself).
    ...(route === ''
      ? {
          videos: [
            {
              title:
                'Saudi Event Management — Luxury Event Production in Saudi Arabia',
              thumbnail_loc: `${BASE}/hero_bg.webp`,
              description:
                'Showreel of luxury weddings, royal ceremonies, corporate galas, and exhibitions produced by Saudi Event Management across Riyadh, Jeddah, Dammam, and AlUla.',
              content_loc: `${BASE}/hero-video1.mp4`,
            },
          ],
        }
      : {}),
  }));

  const allEntries = [
    ...staticEntries,
    ...locationCityEntries,
    ...primaryCityServiceEntries,
    ...secondaryCityServiceEntries,
    ...pseoServiceEntries,
    ...blogEntriesEN,
    ...blogEntriesAR,
  ];

  // TEMPORARY: Arabic (/ar/*) routes are included PER ROUTE — only those whose
  // Arabic content is complete (listed in TRANSLATED_AR_ROUTES in @/lib/seo).
  // Untranslated Arabic routes are excluded here and carry `noindex, follow`.
  // Non-Arabic (English) routes are always kept.
  return allEntries.filter((entry) => {
    const path = entry.url.slice(BASE.length) || '/';
    if (!isArabicPath(path)) return true;
    return isArabicRouteInSitemap(stripLocalePrefix(path));
  });
}
