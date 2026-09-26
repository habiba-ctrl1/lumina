-- Phase 1 (Sept 2026): "Send to Client" fix — separate "quotation created"
-- from "email actually delivered" on the Proposal table.
--
-- Run this in the Supabase SQL Editor BEFORE using the updated quote-send
-- flow in production (prisma db push is network-blocked from the dev
-- machine — see PROJECT-LEDGER "Prisma db push Network Limitation").
-- Idempotent — safe to run more than once.

ALTER TABLE "Proposal" ADD COLUMN IF NOT EXISTS "emailStatus" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "Proposal" ADD COLUMN IF NOT EXISTS "emailSentAt" TIMESTAMP(3);
ALTER TABLE "Proposal" ADD COLUMN IF NOT EXISTS "emailError" TEXT;
