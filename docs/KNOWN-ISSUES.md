# KNOWN ISSUES

Open gaps, flagged-not-fixed items, and decisions awaiting the founder — extracted from the
`PROJECT-LEDGER.md` into one scannable list. **The ledger stays the source of truth**; when an item
here is resolved, resolve it in the ledger and update/remove it here.

_Last synced from ledger: 2026-09-26._

## 🔴 Awaiting founder decision
- **`draft` → `main` feature gap, confirmed 2026-09-26 (bigger than previously known).** Three
  complete features exist ONLY on `draft/rcu-venues` and have **never** been shipped to `main`,
  discovered by direct investigation while resolving cherry-pick conflicts (not just assumed):
  1. **Meetings** — `/admin/meetings` page + `/api/admin/meetings` route: zero trace on `main`.
  2. **Social Publisher** — `/admin/social`: zero trace on `main`.
  3. **Vendor-quote cost-tracking** (the commission/margin calculator inside the quote builder —
     `VendorQuote` add/edit UI in `admin/quotes/page.tsx`, `/api/admin/vendor-quotes` + `[id]` routes):
     zero trace on `main`, confirmed via `git ls-tree` + grep, not just a diff artifact.
  Each needs a deliberate port-over session (review main's real current state first, don't assume
  draft is simply "ahead") — don't let a future feature-specific cherry-pick silently drag one of
  these in half-finished the way `admin/quotes` almost did.
- **`/admin/inquiries` still two different UIs.** `main`'s live page is the older card-grid version;
  `draft`'s is a table redesign (from 2026-08-18, never shipped — `main` lacked `/api/admin/quick-lead`
  at the time). As of 2026-09-26, `main`'s card-grid version was kept and only had the new `refNumber`
  field surgically added to it — the full table-vs-card decision is still open.
- **Admin design-token migration is partial.** `brand-*`/`status-*` Tailwind tokens (real brand colors,
  additive-only, see ARCHITECTURE.md) were applied to `admin/dashboard/page.tsx` and `admin/layout.tsx`
  only (2026-09-26). The other ~17 admin pages (quotes, inquiries, vendors, clients, etc.) still use
  generic `emerald-*`/`slate-*`/`teal-*` Tailwind classes — a future consistency pass, not urgent.

## 🟠 Flagged, not fixed (needs a call before touching)
- **Three parallel quote builders.** `/admin/quotes` is the real one (has the working send-email flow,
  version history, margin display). `/admin/proposals` is an older duplicate with dead status-update
  code. `/admin/quote-wizard` is a fully mocked prototype, not even linked in the sidebar nav. Retiring
  the latter two is a real decision, not done as of 2026-09-26.
- **Orphaned endpoint `/api/vendor/route.ts`** — the old email-only vendor intake, now unused after
  all 3 forms were repointed at `/api/partner-applications`. Left in place, not deleted without say-so.
- **Root layout title double-append** — the title template appends "| Saudi Event Management" twice
  on service pages. Fixing touches the shared root layout (broad blast radius) — deferred.
- **`prisma/seed-categories.ts` drift** — the "Corporate Gifts & Giveaways" category was added live
  via `Category.upsert` but not added to the `CATEGORIES` array; a future re-seed would drop it.
- **No real Task module.** The dashboard's "Local Notes" card is `localStorage`-only by design
  (explicitly relabeled 2026-09-26 so it's never mistaken for shared/synced operational data — it used
  to silently imply otherwise). A real DB-backed Task model tied to inquiries/events/vendor-deadlines
  is still unbuilt; the notification bell (see below) can't surface "task due" until it exists.
- **Legacy substring fallback in vendor-match is brittle against taxonomy renames.** Fixed 2026-09-26
  to prefer the canonical `categoryLinks` relation, but a vendor whose free-text `category` predates a
  category rename can still be missed by both the old and new matching path. Pre-existing, unchanged.

## 🟡 Infrastructure ahead of usage / recently changed
- **Empty pipeline tables** (`VendorQuote`, `Meeting`, `ChatMessage`, `Communication`,
  `FinancialRecord`) — row counts not reverified since the last DB audit; `Proposal` specifically is
  now exercised by a real send-email flow (2026-09-26) so it may no longer be empty in practice.
- **Copilot IS connected** (this entry was stale) — `AI_PROVIDER=gemini` + a populated `GEMINI_API_KEY`
  have been live since 2026-08-27, with read-only DB-grounded context (`copilot-context.ts`). Advisory
  only, cannot write.
- **Security audit (2026-09-26):** ~19 previously-unauthenticated `/api/**` routes (including one
  returning full vendor contact records unauthenticated) now require admin auth; `/api/email-test`
  (could send arbitrary mail via the production SMTP account) was removed entirely. See ARCHITECTURE.md.

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
