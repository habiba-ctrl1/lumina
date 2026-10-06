-- ─────────────────────────────────────────────────────────────────────────────
-- Vendor operations tables — ADDITIVE ONLY (2026-10-06)
--
-- Adds two NEW tables. Nothing that exists is altered, renamed or dropped, and no
-- existing query is affected (no columns are added to Vendor / VendorApplication).
-- Idempotent: safe to run twice.
--
-- HOW: Supabase dashboard → SQL Editor → paste → Run.
-- ORDER: run scripts/enable-rls-newer-tables.sql too (security), then deploy the code.
--        The admin pages detect a missing table and show a "run the SQL" banner instead
--        of failing, so deploying first is also safe — the new panels just stay empty.
--
-- Prisma models: see "Vendor operations" at the bottom of prisma/schema.prisma.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "VendorCapability" (
  "id"               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "vendorId"         TEXT NOT NULL REFERENCES "Vendor"("id") ON DELETE CASCADE,
  "categoryId"       TEXT REFERENCES "Category"("id") ON DELETE SET NULL,
  "isPrimary"        BOOLEAN NOT NULL DEFAULT false,
  "subcategories"    TEXT[] NOT NULL DEFAULT '{}',
  "services"         TEXT,
  "cities"           TEXT[] NOT NULL DEFAULT '{}',
  "eventTypes"       TEXT[] NOT NULL DEFAULT '{}',
  "capacityNote"     TEXT,
  "pricePositioning" TEXT NOT NULL DEFAULT 'Unknown',
  "packagesNote"     TEXT,
  "status"           TEXT NOT NULL DEFAULT 'claimed',
  "confirmedAt"      TIMESTAMP(3),
  "confirmedBy"      TEXT,
  "role"             TEXT NOT NULL DEFAULT 'candidate',
  "evidence"         TEXT,
  "createdAt"        TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt"        TIMESTAMP(3) NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "VendorCapability_vendorId_idx"   ON "VendorCapability"("vendorId");
CREATE INDEX IF NOT EXISTS "VendorCapability_categoryId_idx" ON "VendorCapability"("categoryId");

CREATE TABLE IF NOT EXISTS "VendorOps" (
  "vendorId"            TEXT PRIMARY KEY REFERENCES "Vendor"("id") ON DELETE CASCADE,
  "relationshipType"    TEXT NOT NULL DEFAULT 'vendor',
  "responseSpeed"       TEXT NOT NULL DEFAULT 'Unknown',
  "quoteTurnaround"     TEXT NOT NULL DEFAULT 'Unknown',
  "reliability"         TEXT NOT NULL DEFAULT 'Unknown',
  "pricingStatus"       TEXT NOT NULL DEFAULT 'Unknown',
  "leadAcceptance"      TEXT NOT NULL DEFAULT 'Unknown',
  "availabilityNote"    TEXT,
  "commissionTerms"     TEXT,
  "partnerPricingNote"  TEXT,
  "lastContactedAt"     TIMESTAMP(3),
  "lastQuoteResponseAt" TIMESTAMP(3),
  "createdAt"           TIMESTAMP(3) NOT NULL DEFAULT now(),
  "updatedAt"           TIMESTAMP(3) NOT NULL DEFAULT now()
);

-- These hold commission terms and partner pricing — lock them from the public anon key
-- from the first second (see the RLS incident noted in enable-rls-newer-tables.sql).
ALTER TABLE "VendorCapability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VendorOps"        ENABLE ROW LEVEL SECURITY;
