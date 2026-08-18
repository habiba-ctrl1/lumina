-- link-vendor-categories.sql
-- Links approved/active vendors to their canonical Category (populates the
-- Prisma implicit m2m join table "_VendorCategories": column "A" = Category.id,
-- "B" = Vendor.id). Mirrors the by-category folder structure in
-- SEM VENDOR DETAILS/vendors/  (see _VENDOR-INDEX.md).
--
-- HOW TO RUN: Supabase Dashboard → SQL Editor → paste → Run.
-- (prisma db push / node scripts can't connect from the founder's machine —
--  Postgres TCP handshake is blocked; HTTPS/SQL Editor works. See PROJECT-LEDGER.)
--
-- SAFE TO RE-RUN: every insert is ON CONFLICT DO NOTHING and matches by name,
-- so it never duplicates a link and never touches Vendor/Category row data.
-- It only ADDS category links; it removes nothing.
--
-- BEFORE RUNNING: sanity-check the vendor names match your live DB with:
--   SELECT id, name FROM "Vendor" ORDER BY name;
--   SELECT id, name, slug FROM "Category" ORDER BY "sortOrder";
-- Adjust the ILIKE patterns / category slugs below if a name differs.

-- Ensure the canonical categories exist (idempotent; harmless if seed already ran).
INSERT INTO "Category" ("id","name","slug","isActive","sortOrder","createdAt","updatedAt")
VALUES
  (gen_random_uuid(),'Event Production','event-production',true,0,now(),now()),
  (gen_random_uuid(),'Catering','catering',true,2,now(),now()),
  (gen_random_uuid(),'Venues','venues',true,4,now(),now()),
  (gen_random_uuid(),'Transportation','transportation',true,7,now(),now()),
  (gen_random_uuid(),'Event Technology','event-technology',true,9,now(),now()),
  (gen_random_uuid(),'Corporate Gifts & Giveaways','corporate-gifts-and-giveaways',true,14,now(),now()),
  (gen_random_uuid(),'Other','other',true,15,now(),now())
ON CONFLICT ("slug") DO NOTHING;

-- Helper: link one vendor (by name pattern) to one category (by slug).
-- Repeated inline below rather than as a function so it's copy-paste portable.

-- V015 Crystal Catering → Catering
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'catering' AND v.name ILIKE '%Crystal Catering%'
ON CONFLICT DO NOTHING;

-- V003 Advanced Prestige → Transportation (VIP cars / valet / golf cart)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'transportation' AND v.name ILIKE '%Advanced Prestige%'
ON CONFLICT DO NOTHING;

-- V013 Shihab Electra → Event Production (production / exhibitions / AV)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-production' AND v.name ILIKE '%Electra%'
ON CONFLICT DO NOTHING;

-- V014 D&C (Display and Counters) → Event Production (booths / displays)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-production' AND (v.name ILIKE '%D&C%' OR v.name ILIKE '%Display%Counter%')
ON CONFLICT DO NOTHING;

-- V002 Liyah Creative → Event Production (creative / production)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-production' AND v.name ILIKE '%Liyah%'
ON CONFLICT DO NOTHING;

-- V005 RCU AlUla → Venues (heritage villages)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'venues' AND (v.name ILIKE '%RCU%' OR v.name ILIKE '%AlUla%')
ON CONFLICT DO NOTHING;

-- V001 Bait Al Nokhada → Event Production  (tents / majlis — no canonical "tents" cat; CONFIRM)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-production' AND v.name ILIKE '%Nokhada%'
ON CONFLICT DO NOTHING;

-- V007 Hayakil Al-Marhala → Event Production  (structures / establishment; CONFIRM)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-production' AND v.name ILIKE '%Hayakil%'
ON CONFLICT DO NOTHING;

-- V016 Perfume Lounge → Corporate Gifts & Giveaways
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'corporate-gifts-and-giveaways' AND v.name ILIKE '%Perfume Lounge%'
ON CONFLICT DO NOTHING;

-- V017 MICEtribe → Event Technology (registration / staffing)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'event-technology' AND v.name ILIKE '%MICEtribe%'
ON CONFLICT DO NOTHING;

-- V018 Royal Event → Other  (category unconfirmed; CONFIRM)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'other' AND v.name ILIKE '%Royal Event%'
ON CONFLICT DO NOTHING;

-- V019 Areeb → Other  (category unconfirmed; CONFIRM)
INSERT INTO "_VendorCategories" ("A","B")
SELECT c.id, v.id FROM "Category" c, "Vendor" v
WHERE c.slug = 'other' AND v.name ILIKE '%Areeb%'
ON CONFLICT DO NOTHING;

-- Verify what got linked:
--   SELECT v.name AS vendor, c.name AS category
--   FROM "_VendorCategories" vc
--   JOIN "Vendor" v   ON v.id = vc."B"
--   JOIN "Category" c ON c.id = vc."A"
--   ORDER BY c.name, v.name;
