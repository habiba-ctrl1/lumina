-- Lock down all tables from the public Supabase Data API.
-- The app talks to Postgres through Prisma as the table OWNER (postgres role),
-- which BYPASSES row-level security — so enabling RLS here does NOT affect the
-- website. It only blocks the public `anon`/`authenticated` Data API roles, so
-- customer data (names, emails, phones) is no longer readable with the public key.
-- Run this once in Supabase → SQL Editor.

ALTER TABLE "User"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Client"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Event"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vendor"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Quote"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Inquiry"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead"            ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Testimonial"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MediaAsset"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ClientEstimate"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ActivityLog"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuoteRequest"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Proposal"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FinancialRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Communication"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_EventVendors"   ENABLE ROW LEVEL SECURITY;
