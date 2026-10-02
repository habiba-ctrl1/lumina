-- Phase 1 (Oct 2026): turn QuoteRequest into the single deal/pipeline record
-- for every SEM enquiry (WhatsApp, email, website), and add LeadUpdate — an
-- append-only timeline so partner updates ("client had the call", "asked for
-- a meeting", "quote sent") are recorded per deal.
--
-- Additive only: no column is dropped or renamed, no existing row is changed
-- except receiving the defaults below. Idempotent — safe to run twice.
--
-- Run this in the Supabase SQL Editor before using the updated code
-- (prisma db push is network-blocked from the dev machine — see
-- PROJECT-LEDGER "Prisma db push Network Limitation").

ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "business"            TEXT NOT NULL DEFAULT 'SEM';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "channel"             TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "clientCompany"       TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "budgetMin"           DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "budgetMax"           DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "budgetKnown"         BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "decisionMaker"       TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "track"               TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "stage"               TEXT NOT NULL DEFAULT 'new';
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "nextAction"          TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "nextActionAt"        TIMESTAMP(3);
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "lastContactAt"       TIMESTAMP(3);
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "partnerId"           TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "partnerHandedAt"     TIMESTAMP(3);
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "partnerLastUpdateAt" TIMESTAMP(3);
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "quotedAmount"        DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "quoteSentAt"         TIMESTAMP(3);
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "semMarginPct"        DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "semMarginAmount"     DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "lostReason"          TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "lostNote"            TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "wonValue"            DOUBLE PRECISION;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "closedAt"            TIMESTAMP(3);

DO $$ BEGIN
  ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_partnerId_fkey"
    FOREIGN KEY ("partnerId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS "QuoteRequest_stage_nextActionAt_idx" ON "QuoteRequest"("stage", "nextActionAt");

CREATE TABLE IF NOT EXISTS "LeadUpdate" (
  "id"           TEXT NOT NULL,
  "requestId"    TEXT NOT NULL,
  "author"       TEXT NOT NULL DEFAULT 'SEM',
  "kind"         TEXT NOT NULL,
  "channel"      TEXT,
  "summary"      TEXT NOT NULL,
  "nextAction"   TEXT,
  "nextActionAt" TIMESTAMP(3),
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeadUpdate_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  ALTER TABLE "LeadUpdate" ADD CONSTRAINT "LeadUpdate_requestId_fkey"
    FOREIGN KEY ("requestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS "LeadUpdate_requestId_createdAt_idx" ON "LeadUpdate"("requestId", "createdAt");

-- Same posture as prisma/enable-rls.sql: server uses the service role (bypasses
-- RLS); this only blocks direct anon access to the new table.
ALTER TABLE "LeadUpdate" ENABLE ROW LEVEL SECURITY;
