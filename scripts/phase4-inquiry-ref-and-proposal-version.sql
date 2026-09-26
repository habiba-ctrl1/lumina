-- Phase 4 (Sept 2026): give inquiries a human-readable reference number,
-- and give quotes a version number so "V2 of this quote" is explicit
-- instead of relying on array order.
--
-- Run this in the Supabase SQL Editor before using the updated code
-- (prisma db push is network-blocked from the dev machine — see
-- PROJECT-LEDGER "Prisma db push Network Limitation"). Idempotent.

ALTER TABLE "Inquiry" ADD COLUMN IF NOT EXISTS "refNumber" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Inquiry_refNumber_key" ON "Inquiry"("refNumber");

ALTER TABLE "Proposal" ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;
