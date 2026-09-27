# ARCHITECTURE

Technical map of the SEM codebase. Source of truth for **structure** — for behaviour/history read the
`PROJECT-LEDGER.md`; for the exact DB shape read `prisma/schema.prisma` (this doc summarises it).

## Stack
- **Next.js 16** (App Router), TypeScript, Tailwind. Bilingual EN/AR via `[locale]` segment.
- **Prisma + PostgreSQL (Supabase)**, connected through the Vercel↔Supabase integration.
  Runtime uses the pooled URL (`POSTGRES_PRISMA_URL`); `db push`/migrate uses the non-pooled URL.
  **Note:** despite `prisma/dev.db` existing on disk, production is **Postgres, not SQLite** (ledger DECISION).
- **Deploy:** Vercel. Founder cherry-picks from `draft/rcu-venues` → `main` → the lumina repo
  (`main` lives in a separate worktree, `WEBSITES/lumina-main-worktree`). See `CLAUDE.md` deploy rule.
- **Schema changes** are applied via `prisma db push` (no `migrations/` folder). `db push` is often
  **network-blocked from the founder's machine** — workaround is hand-written SQL run in the Supabase
  SQL Editor (see `scripts/_*-migration.sql` and the memory note on this limitation).

## App routes — `src/app/`
- `[locale]/` — the public bilingual marketing site: `services/`, `locations/`, `blog/`, `venues/`,
  `partners/`, `about/`, `contact/`, `consultation/`, `portfolio/`, `testimonials/`, `faq/`,
  `glossary/`, plus vendor-facing forms `partner-onboarding/`, `vendor-registration/`, `vendors/`.
- `[locale]/admin/` — the private admin panel (Supabase-auth gated). Key pages:
  `dashboard`, `inquiries` (Leads list + Quick-Add), `quotes` + `quote-wizard` + `proposals`,
  `vendors` + `vendor-applications`, `clients`, `events`, `meetings`, `email-leads`,
  `action-needed`, `copilot`, `finance`, `analytics`, `social`, `blog`, `gallery`, `testimonials`.
  All admin content is wrapped in `.admin-scope` (see globals.css) to isolate it from the marketing
  site's global heading CSS. **Note (2026-09-26):** `main` and `draft/rcu-venues` have genuinely
  diverged on several of these — see KNOWN-ISSUES.md before assuming a page's `draft` state is what's
  actually live.
- `api/` — public + admin API routes. Public (deliberately unauthenticated): `contact` (POST only —
  GET/PATCH/DELETE now `requireAdmin`-gated as of 2026-09-26), `vendor`, `vendors`, `partner-applications`,
  `blog` (GET only — writes now guarded), `testimonials` (POST only — GET/DELETE now guarded),
  `gallery` (now fully guarded, no public caller exists), `consultation`, `newsletter`, `keepalive`,
  `cron`. Admin (all `requireAdmin`-guarded, audited comprehensively 2026-09-26 — every
  `/api/admin/*` route plus `clients`, `events`, `logs`, `quotes` at the site root): `quick-lead`,
  `quote-requests`, `quotes` + `quotes/[id]/send` (real client email, see below), `proposals`,
  `vendor-match` (now prefers the `categoryLinks` relation, legacy text fields as fallback only),
  `vendor-quotes`, `meetings`, `email-leads`, `action-needed`, `copilot`, `finance`, `stats`,
  `social-post`, `categories`. **Removed:** `/api/email-test` (a diagnostic route that could send
  arbitrary mail via the production SMTP account — deleted, not just guarded).

## Shared libs — `src/lib/`
| File | Role |
|---|---|
| `prisma.ts` | Prisma client singleton |
| `api-auth.ts` | `requireAdmin` — Supabase admin-token gate for admin APIs |
| `admin-fetch.ts` | `adminFetch` — client-side helper that attaches the admin token |
| `seo.ts` | `TRANSLATED_AR_ROUTES` — **the only** control for `/ar` indexability; sitemap/canonical helpers |
| `blog-data.ts` | Blog posts as content-block `string[]` (+ `contentAr[]` mirrored block-for-block) |
| `parse-lead.ts` | Local (no-API) WhatsApp/email → structured lead parser; powers Quick-Add |
| `quotation-html.ts` | `buildQuotationHtml(data, logoSrc?)` — navy/gold client quote → HTML/PDF (no vendor/commission ever). `logoSrc` param added 2026-09-26 so an emailed copy (no site origin) still resolves the logo. |
| `send-quote-email.ts` | **New 2026-09-26.** `sendProposalEmail()` — actually emails a `Proposal` to the client via `resend.ts`, attaching the branded quotation HTML. Shared by `POST /api/admin/quotes` (on creation) and `POST /api/admin/quotes/[id]/send` (retry). Never throws; always returns `{ok, error?}` and records `Proposal.emailStatus` — this is what makes "Send to Client" not lie about what happened. |
| `quote-engine.ts` | Quote calculation helpers |
| `vendor-ranking.ts` / `vendor-dedupe.ts` | Matching-engine ranking + duplicate detection |
| `ai-provider.ts` | Provider-agnostic `getAIReply()` (anthropic/openai/gemini via `AI_PROVIDER` env) — **connected** since 2026-08-27 (gemini) |
| `categories.ts` | Canonical category taxonomy helpers |
| `supabase.ts` | Supabase client (auth + Storage signed URLs for vendor-file uploads) |
| `resend.ts` | Email sending — actually **Gmail SMTP via nodemailer** (`SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`), kept under the old `resend` name so existing call sites didn't need edits. `isResendConfigured` gates every caller. Extended 2026-09-26 to support `attachments`. |
| `dictionaries.ts` | EN/AR dictionary loader |

## Shared UI components — `src/components/admin/` (new 2026-09-26)
First shared component directory in the admin panel (previously every one of the ~18 admin pages
reimplemented its own cards/badges/empty-states inline). Only used by the dashboard so far — not yet
adopted by other admin pages.
| File | Role |
|---|---|
| `MetricCard.tsx` | Dashboard stat tile. `tone` prop (`neutral/highlight/success/critical`) carries meaning, not decoration. |
| `StatusBadge.tsx` | Status pill + `toneForStatus()` best-effort mapping for the free-text status strings used across `Inquiry`/`QuoteRequest`/`Proposal`/`Meeting` (none are Prisma enums). |
| `EmptyState.tsx` | Standard icon+title+description empty state. |

## Design tokens (additive, 2026-09-26)
`globals.css` (`--status-success/warning/critical/neutral` + `-bg` variants) and `tailwind.config.ts`
(`brand-*` color family mapping to the **existing** `--primary`/`--gold`/`--surface*` vars that were
already defined but unused by admin) — new names only, **no existing Tailwind class changed meaning**,
so this carries zero risk to the public site or any admin page not yet migrated. See KNOWN-ISSUES.md
for which pages still use the old generic classes.

## Data model — key models (see `prisma/schema.prisma` for full columns)
**Client/lead pipeline:** `Inquiry` (website/quick-add lead) → `Client` + `Lead` + `QuoteRequest`.
`Meeting`, `Communication`, `EmailLead` (inbound-email triage log) support ops.
- `Inquiry.refNumber` (new 2026-09-26) — human-readable `SEM-2026-000123`, one shared sequence per
  year across client+vendor inquiries. **Nullable, new rows only** — existing rows were never
  backfilled (matches the founder's established no-scripted-backfill preference, see `categoryLinks`).

**Quoting (two-sided margin):**
- `VendorQuote` = a vendor's **cost to SEM** (private, never client-facing).
- `Proposal` = the **client-facing quote** (subtotal + 15% VAT). `Proposal.vendorCostTotal` lets
  `commission = subtotal − vendorCostTotal` be computed. **Vendor cost & commission never appear in
  any client output** (hard rule).
- `Proposal.status` (new semantics 2026-09-26) now only becomes `"sent"` once the client email
  actually goes out — it used to be hardcoded to `"sent"` at creation, before any send was attempted.
- `Proposal.emailStatus` / `emailSentAt` / `emailError` (new 2026-09-26) — the real delivery outcome,
  intentionally a separate field from `status` above so "quote created" and "client received it" can't
  be conflated again. See `send-quote-email.ts`.
- `Proposal.version` (new 2026-09-26) — which revision of the quote for a given `QuoteRequest` this is
  (a request could already carry multiple `Proposal` rows — that relation always existed; this just
  numbers them). `GET /api/admin/quote-requests` now orders included proposals by `version desc` —
  previously unordered, so "the" active proposal could silently have been the oldest one.

**Vendors:** `Vendor` (with a block of **PRIVATE contact fields** — never on public routes/APIs/exports),
`VendorApplication` (public onboarding submissions, signed-consent record via `permAccurate` /
`permNonCircumvention`), `VendorNote` (append-only log), `Category` (canonical taxonomy, m2m via
`categoryLinks` — the legacy free-text `categories[]`/`category` fields are **deprecated, read-only**).

**Other:** `BlogPost`, `Testimonial`, `MediaAsset`, `FinancialRecord`, `ActivityLog`, `ChatMessage`
(Copilot), `User`.

> Several pipeline tables (`VendorQuote`, `Meeting`, `ChatMessage`, `Communication`, `FinancialRecord`)
> had **0 rows** as of the last DB audit — row counts not reverified since. `Proposal` is now exercised
> by a real send-email flow (2026-09-26), so it's likely no longer empty in practice. See
> [KNOWN-ISSUES.md](KNOWN-ISSUES.md).
