import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { publishToSocial } from '@/lib/social-post';
import { blogPosts } from '@/lib/blog-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saudieventmanagement.com';
const WHATSAPP = '+966 53 938 8072';

// ── Realistic imagery ────────────────────────────────────────────────────────
// Real event/people photos already published under /services on the live site
// (guaranteed reachable by the Graph API). Used INSTEAD of the /blog moodboard
// renders, which read as AI/stock and hurt credibility + reach.
const REALISTIC_IMAGES: { path: string; label: string; tags: string[] }[] = [
  { path: '/services/luxury_wedding_couple_guests.webp', label: 'Wedding — couple & guests', tags: ['Weddings'] },
  { path: '/services/jeddah_beach_wedding_setup.webp', label: 'Wedding — beach setup', tags: ['Weddings'] },
  { path: '/services/gallery_wedding_reception.webp', label: 'Wedding — reception', tags: ['Weddings'] },
  { path: '/services/luxury_wedding_table_setting.webp', label: 'Wedding — table setting', tags: ['Weddings', 'Decor Ideas', 'Color Trends'] },
  { path: '/services/neom_summit_people.webp', label: 'Corporate — summit', tags: ['Corporate', 'Event Planning'] },
  { path: '/services/alkhobar_corporate_people.webp', label: 'Corporate — conference', tags: ['Corporate'] },
  { path: '/services/gallery_corporate_gala.webp', label: 'Corporate — gala', tags: ['Corporate'] },
  { path: '/services/exhibition_hall_riyadh.webp', label: 'Exhibition hall', tags: ['Corporate'] },
  { path: '/services/event_production_stage_riyadh.webp', label: 'Stage production', tags: ['Corporate', 'Event Planning'] },
  { path: '/services/alula_gala_people.webp', label: 'AlUla gala', tags: ['Event Planning', 'Lifestyle'] },
  { path: '/services/majlis_gathering_people.webp', label: 'Majlis gathering', tags: ['Lifestyle', 'Event Planning'] },
  { path: '/services/jeddah_luxury_people.webp', label: 'Luxury evening event', tags: ['Lifestyle', 'Color Trends'] },
  { path: '/services/luxury_vip_majlis.webp', label: 'VIP majlis', tags: ['Lifestyle'] },
  { path: '/services/gala_decor_saudi.webp', label: 'Gala décor', tags: ['Decor Ideas', 'Color Trends'] },
  { path: '/services/gallery_charity_gala.webp', label: 'Charity gala', tags: ['Corporate', 'Lifestyle'] },
];

function realisticImageFor(category: string): string {
  const match = REALISTIC_IMAGES.find((img) => img.tags.includes(category));
  return (match || REALISTIC_IMAGES[0]).path;
}

// ── Captions ─────────────────────────────────────────────────────────────────
// Per-category hooks + hashtags so posts don't read as one templated block.
const CATEGORY_CONFIG: Record<string, { hooks: string[]; tags: string[] }> = {
  Weddings: {
    hooks: ['💍 Dreaming of a wedding no one forgets?', '✨ Saudi Arabia is the world’s new luxury wedding destination.', '🤍 From AlUla canyons to Red Sea shores —'],
    tags: ['#LuxuryWeddings', '#SaudiWedding', '#DestinationWedding', '#AlUla', '#RedSea'],
  },
  Corporate: {
    hooks: ['📈 Planning a corporate event in the Kingdom?', '🏢 Flawless corporate events start with the right partner.', '🎯 From summits to gala dinners —'],
    tags: ['#CorporateEvents', '#MICE', '#Riyadh', '#Jeddah', '#BusinessEvents'],
  },
  'Event Planning': {
    hooks: ['🗓️ Everything you need to plan a world-class event in Saudi Arabia.', '✨ Under Vision 2030, the Kingdom is staging events like never before.', '📋 The details that make or break an event —'],
    tags: ['#EventPlanning', '#SaudiEvents', '#Vision2030', '#Riyadh'],
  },
  'Color Trends': {
    hooks: ['🎨 The palette defining Saudi events this year.', '✨ Colour sets the whole mood of an event —'],
    tags: ['#EventDesign', '#EventStyling', '#ColorTrends', '#SaudiEvents'],
  },
  'Decor Ideas': {
    hooks: ['🌿 Décor that turns a venue into an experience.', '✨ The details guests remember —'],
    tags: ['#EventDecor', '#EventStyling', '#LuxuryEvents', '#SaudiEvents'],
  },
  Lifestyle: {
    hooks: ['🥂 Curating unforgettable moments across the Kingdom.', '✨ Luxury is in the experience —'],
    tags: ['#LuxuryLifestyle', '#SaudiEvents', '#VIP'],
  },
};
const BASE_TAGS = ['#SaudiArabia', '#SaudiEventManagement'];

// Stable per-slug pick so each post keeps the same (but varied) hook.
function pickHook(hooks: string[], slug: string): string {
  const sum = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return hooks[sum % hooks.length];
}

function buildCaption(post: (typeof blogPosts)[number]): string {
  const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG['Event Planning'];
  const hook = pickHook(cfg.hooks, post.slug);
  const tags = Array.from(new Set([...cfg.tags, ...BASE_TAGS])).join(' ');
  const domain = SITE_URL.replace('https://', '').replace(/\/$/, '');
  return `${hook}

${post.excerpt}

📖 Read the full guide 👉 ${domain}/blog/${post.slug}

📲 WhatsApp for a private consultation: ${WHATSAPP}

${tags}`;
}

// GET /api/admin/social-post — ADMIN ONLY. Lists blog posts with a ready-to-edit
// caption + absolute image URL, so the admin UI can offer one-click posting.
export async function GET(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const posts = blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    imageUrl: `${SITE_URL}${realisticImageFor(p.category)}`,
    caption: buildCaption(p),
  }));

  const gallery = REALISTIC_IMAGES.map((img) => ({
    label: img.label,
    imageUrl: `${SITE_URL}${img.path}`,
  }));

  return NextResponse.json({ posts, gallery });
}

// POST /api/admin/social-post — ADMIN ONLY. Publishes a photo + caption to the
// SEM Facebook Page and/or Instagram Business account.
export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { imageUrl, caption, platforms } = body as {
    imageUrl?: string;
    caption?: string;
    platforms?: Array<'facebook' | 'instagram'>;
  };

  if (!imageUrl || !caption) {
    return NextResponse.json({ error: 'imageUrl and caption are required' }, { status: 400 });
  }

  const targets: Array<'facebook' | 'instagram'> =
    platforms && platforms.length ? platforms : ['facebook', 'instagram'];
  const results = await publishToSocial({ imageUrl, caption }, targets);

  return NextResponse.json({ results });
}
