// One-time (but safe to re-run) seed for the canonical vendor category
// taxonomy. Upserts by `slug`, so re-running never creates duplicates and
// never touches existing Vendor/VendorApplication rows — purely additive.
//
// Run with: node prisma/seed-categories.ts
// (Standalone from prisma/seed.ts on purpose — that script deletes demo
// Events/Testimonials/ContactMessages and must never run against production.)

export {}; // module scope — avoids top-level redeclaration clashes with prisma/seed.ts

const fs = require('fs');
const path = require('path');

// Load .env.local manually — this script is meant to be run directly with
// `node`, which doesn't auto-load Next.js's .env.local.
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Founder's final canonical list (2026-07) — order here is the default
// display order (sortOrder).
const CATEGORIES = [
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
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  for (let i = 0; i < CATEGORIES.length; i++) {
    const name = CATEGORIES[i];
    const slug = slugify(name);
    const result = await prisma.category.upsert({
      where: { slug },
      update: { name, sortOrder: i, isActive: true },
      create: { name, slug, sortOrder: i, isActive: true },
    });
    console.log(`✓ ${result.name} (${result.slug})`);
  }
  const total = await prisma.category.count();
  console.log(`\nDone — ${total} categories in the database.`);
}

main()
  .catch((e: any) => {
    console.error('Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
