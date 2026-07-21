// Canonical vendor category taxonomy — single source of truth so forms,
// admin filters, and the vendor list never drift into inconsistent free-text
// vocabulary again (they did: 4 separate hardcoded lists existed before this).
//
// Runtime code should always read categories from GET /api/categories (or the
// fetchCategories() helper below), never re-hardcode a list. The array below
// exists only as the seed source for prisma/seed-categories.ts.

export type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

// Founder's final canonical list (2026-07). Keep this in sync with
// prisma/seed-categories.ts if the founder asks to change the taxonomy later
// (add via the "+ Create" option in the admin picker or POST /api/admin/categories
// instead of editing this array — this array is seed data, not the live list).
export const SEED_CATEGORY_NAMES = [
  'Event Production',
  'AV & LED',
  'Catering',
  'Entertainment',
  'Venues',
  'Furniture Rental',
  'Photography & Videography',
  'Transportation',
  'Staffing',
  'Event Technology',
  'Printing & Branding',
  'Decorations & Floral',
  'Security',
  'Hospitality',
  'Other',
] as const;

/** Client-side helper — fetch the active category list from the API. */
export async function fetchCategories(): Promise<CategoryOption[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}
