-- ─────────────────────────────────────────────────────────────────────────────
-- SECURITY FIX — enable Row Level Security on tables created after prisma/enable-rls.sql
--
-- FOUND 2026-10-06: with only the PUBLIC anon key (shipped in the browser bundle) these
-- tables were readable with no login:
--     VendorApplication (private vendor contact info + CR numbers), VendorNote
--     (internal vendor meeting notes), EmailLead (inbound email triage), ChatMessage
--     (Copilot conversations).
-- The Vendor / Inquiry / Lead / Client tables were already protected.
--
-- WHY THIS IS SAFE: the app never reads these tables through the Supabase client — all
-- data access goes through Prisma (direct Postgres connection as the table owner, which
-- bypasses RLS) and file access uses the service-role key server-side. Supabase JS is
-- used for auth + storage only. Enabling RLS with NO policies simply closes PostgREST
-- access for anon/authenticated roles. Idempotent: running it twice is harmless.
--
-- HOW: Supabase dashboard → SQL Editor → paste → Run.
-- THEN verify (should return "[]" or an RLS error, never rows):
--     curl "$SUPABASE_URL/rest/v1/VendorApplication?select=id&limit=1" \
--          -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY"
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE IF EXISTS "VendorApplication"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "VendorNote"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "EmailLead"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "ChatMessage"            ENABLE ROW LEVEL SECURITY;

-- Not currently leaking data (empty or not exposed) but created after the original
-- RLS script — close them now so they cannot start leaking when they fill up.
ALTER TABLE IF EXISTS "Category"               ENABLE ROW LEVEL SECURITY;  -- public list is served by /api/categories via Prisma
ALTER TABLE IF EXISTS "VendorQuote"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Meeting"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "_VendorCategories"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "_ApplicationCategories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "_PartnerDeals"          ENABLE ROW LEVEL SECURITY;

-- New vendor-operations tables (scripts/vendor-ops-tables.sql) — that script enables RLS
-- itself; listed here only so this file stays the single "everything is locked" checklist.
ALTER TABLE IF EXISTS "VendorCapability"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "VendorOps"              ENABLE ROW LEVEL SECURITY;
