# KNOWN ISSUES

Open gaps, flagged-not-fixed items, and decisions awaiting the founder — extracted from the
`PROJECT-LEDGER.md` into one scannable list. **The ledger stays the source of truth**; when an item
here is resolved, resolve it in the ledger and update/remove it here.

_Last synced from ledger: 2026-08-18._

## 🔴 Awaiting founder decision
- **Ship the new Leads/inquiries table to `main`.** The redesigned `/admin/inquiries` table is on
  `draft/rcu-venues` but did **not** deploy — `main` is missing `/api/admin/quick-lead` and
  `/api/admin/vendor-quotes`, so force-shipping it would put a broken "Add Query" button in prod.
  Choose: (a) reconcile the draft admin backlog to main properly, or (b) graft just the table onto
  main's Quick-Add-less page. Production currently has the header/spacing fix but not the new table.
- **Backlog reconciliation (draft → main).** ~40 draft commits (full vendor-system evolution:
  taxonomy, dedup, tiering, secured admin APIs, matching engine, CSV import, onboarding portal)
  have diverged from main's partially-cherry-picked vendor system — needs a careful side-by-side
  review, not a mechanical redo. Budget real time.

## 🟠 Flagged, not fixed (needs a call before touching)
- **No real "Send to Client" delivery.** `/api/admin/quotes` creates the `Proposal` + flips status
  to `quote_sent`, but **no email/WhatsApp send is wired** — the "notify the client" note is
  aspirational. Founder to approve wiring real send.
- **Orphaned endpoint `/api/vendor/route.ts`** — the old email-only vendor intake, now unused after
  all 3 forms were repointed at `/api/partner-applications`. Left in place, not deleted without say-so.
- **Root layout title double-append** — the title template appends "| Saudi Event Management" twice
  on service pages. Fixing touches the shared root layout (broad blast radius) — deferred.
- **`prisma/seed-categories.ts` drift** — the "Corporate Gifts & Giveaways" category was added live
  via `Category.upsert` but not added to the `CATEGORIES` array; a future re-seed would drop it.

## 🟡 Infrastructure ahead of usage
- **Empty pipeline tables.** `VendorQuote`, `Proposal`, `Meeting`, `ChatMessage`, `Communication`,
  `FinancialRecord` are live but had **0 rows** at last audit — the quoting/comms/finance flows exist
  in code but aren't in active production use yet.
- **`categoryLinks` ~unused.** `_VendorCategories` had 1 row against ~22 live vendors; the matching
  engine still leans on legacy text fields. Next step (not started): make `vendor-match` prefer
  `categoryLinks` + backfill from legacy `category` (additive only).
- **Copilot not connected.** Provider abstraction is built (`ai-provider.ts`) but no API key is set
  and `AI_PROVIDER`/key values are empty; `ChatMessage` migration may still need running via SQL.

## 🔧 Environment / ops
- **`prisma db push` is network-blocked** from the founder's machine (Postgres TCP handshake stalls;
  HTTPS to the same host works). Workaround: hand-written SQL via Supabase SQL Editor.
- **Vercel env vars to confirm set:** `SUPABASE_SERVICE_ROLE_KEY` (vendor-file uploads),
  `CRON_SECRET` + `EMAIL_LEAD_INTAKE_SECRET` (digest cron + inbox routine log-to-DB). Until set, those
  degrade gracefully but don't fully work.
- **Supabase free-tier pause** — mitigated by the daily `/api/keepalive` cron (only runs post-deploy).

## 📈 SEO / growth (open, longer-horizon)
- **Low domain authority / indexing backlog** — ~64–98 EN pages "Discovered - not indexed"; root
  cause is authority, not on-page. #1 lever = backlinks (partner kit ready, directories: Arabia
  Weddings, Zafaf, Clutch). See `seo-map-*.md` + the ledger SEO entries.
- **GSC export folder** should eventually move out of `public/` (gitignored now, but wrong location).
