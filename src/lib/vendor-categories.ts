// Maps the free-text category labels that older intake forms still send
// ("Catering & F&B", "Luxury Cars", "Logistics & Transportation", …) onto the
// canonical Category taxonomy (prisma Category table, seeded from
// src/lib/categories.ts).
//
// Why this exists: three public forms (/vendors, /vendor-registration,
// /partners/become-one) carry their own hardcoded category lists and never send
// categoryIds, so 35 of 48 applications arrived with NO canonical link. Fixing it
// here — once, server-side — repairs every current and future intake path without
// touching those forms. One label may map to several categories on purpose
// ("Lighting & Decor" → AV & LED + Decorations & Floral).

import type { PrismaClient } from '@prisma/client';

// Order is irrelevant; every matching rule contributes.
const RULES: [RegExp, string][] = [
  [/catering|f&b|food|restaurant|meal|dining|ضيافة|إعاشة|اعاشه/i, 'Catering'],
  [/transport|logistic|chauffeur|limo|luxury cars|valet|parking|golf|نقل/i, 'Transportation'],
  [/venue|space|hall|قاعة/i, 'Venues'],
  [/entertain|performer|\bdj\b|band|show/i, 'Entertainment'],
  [/\bav\b|\bled\b|sound|audio|lighting|light design|projection/i, 'AV & LED'],
  [/production|stage|truss|tent|structure|booth|exhibition/i, 'Event Production'],
  [/decor|décor|floral|flower/i, 'Decorations & Floral'],
  [/furniture/i, 'Furniture Rental'],
  [/photo|video|cinema|film/i, 'Photography & Videography'],
  [/staff|hostess|usher|crowd/i, 'Staffing'],
  [/security|guard/i, 'Security'],
  [/print|branding|signage|graphic/i, 'Printing & Branding'],
  [/technolog|registration|ticketing/i, 'Event Technology'],
  [/hospitality/i, 'Hospitality'],
  [/gift|giveaway/i, 'Corporate Gifts & Giveaways'],
  [/full.?service|event management|planner/i, 'Full-Service Event Management'],
];

/** Canonical category names for a list of free-text labels (deduplicated, never empty). */
export function canonicalCategoryNames(labels: string[], canonical: string[]): string[] {
  const byLower = new Map(canonical.map((n) => [n.toLowerCase(), n]));
  const out = new Set<string>();
  for (const raw of labels) {
    const label = (raw || '').trim();
    if (!label) continue;
    const exact = byLower.get(label.toLowerCase());
    if (exact) {
      out.add(exact);
      continue;
    }
    let matched = false;
    for (const [re, name] of RULES) {
      if (re.test(label) && byLower.has(name.toLowerCase())) {
        out.add(byLower.get(name.toLowerCase())!);
        matched = true;
      }
    }
    if (!matched && byLower.has('other')) out.add(byLower.get('other')!);
  }
  return [...out];
}

/** Resolve free-text labels to Category rows (ids + names). Read-only. */
export async function resolveCategories(
  prisma: PrismaClient,
  labels: string[],
): Promise<{ id: string; name: string }[]> {
  const all = await prisma.category.findMany({ where: { isActive: true }, select: { id: true, name: true } });
  const names = canonicalCategoryNames(labels, all.map((c) => c.name));
  return all.filter((c) => names.includes(c.name));
}
