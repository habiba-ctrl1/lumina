-- Phase 2 (Oct 2026): transportation division lead fields on QuoteRequest.
--
-- Additive only: nullable columns (plus one INT default 0). No column is
-- dropped or renamed and no existing row changes. Idempotent — safe to run twice.
--
-- !! RUN THIS IN THE SUPABASE SQL EDITOR *BEFORE* DEPLOYING THE CODE. !!
-- Prisma selects every column of QuoteRequest by default, so deploying the
-- updated client before these columns exist would break the existing
-- pipeline/quotes/contact queries, not just the transportation form.
-- (prisma db push is network-blocked from the dev machine.)

ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "leadDepartment"     TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "leadRef"            TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "serviceCategory"    TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "journeyType"        TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "originCountry"      TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "originCity"         TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "destinationCountry" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "destinationCity"    TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "vehiclePreference"  TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "sourceWebsite"      TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "landingPage"        TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "referrer"           TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "utmSource"          TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "utmMedium"          TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "utmCampaign"        TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "utmContent"         TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "utmTerm"            TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "attribution"        JSONB;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "details"            JSONB;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "notifyStatus"       TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "notifyAttempts"     INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "notifyError"        TEXT;

CREATE INDEX IF NOT EXISTS "QuoteRequest_leadDepartment_serviceCategory_idx"
  ON "QuoteRequest" ("leadDepartment", "serviceCategory");
