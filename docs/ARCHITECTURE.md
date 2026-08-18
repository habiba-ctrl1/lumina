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
  site's global heading CSS.
- `api/` — public + admin API routes. Public: `contact`, `vendor`, `vendors`, `partner-applications`,
  `blog`, `consultation`, `newsletter`, `keepalive`, `cron`. Admin (all `requireAdmin`-guarded):
  `api/admin/*` — `quick-lead`, `quote-requests`, `quotes`, `proposals`, `vendor-match`,
  `vendor-quotes`, `meetings`, `email-leads`, `action-needed`, `copilot`, `finance`, `stats`,
  `social-post`, `categories`.

## Shared libs — `src/lib/`
| File | Role |
|---|---|
| `prisma.ts` | Prisma client singleton |
| `api-auth.ts` | `requireAdmin` — Supabase admin-token gate for admin APIs |
| `admin-fetch.ts` | `adminFetch` — client-side helper that attaches the admin token |
| `seo.ts` | `TRANSLATED_AR_ROUTES` — **the only** control for `/ar` indexability; sitemap/canonical helpers |
| `blog-data.ts` | Blog posts as content-block `string[]` (+ `contentAr[]` mirrored block-for-block) |
| `parse-lead.ts` | Local (no-API) WhatsApp/email → structured lead parser; powers Quick-Add |
| `quotation-html.ts` | `buildQuotationHtml()` — navy/gold client quote → PDF (no vendor/commission ever) |
| `quote-engine.ts` | Quote calculation helpers |
| `vendor-ranking.ts` / `vendor-dedupe.ts` | Matching-engine ranking + duplicate detection |
| `ai-provider.ts` | Provider-agnostic `getAIReply()` (anthropic/openai/gemini via `AI_PROVIDER` env) |
| `categories.ts` | Canonical category taxonomy helpers |
| `supabase.ts` | Supabase client (auth + Storage signed URLs for vendor-file uploads) |
| `resend.ts` | Email sending (Resend) |
| `dictionaries.ts` | EN/AR dictionary loader |

## Data model — key models (see `prisma/schema.prisma` for full columns)
**Client/lead pipeline:** `Inquiry` (website/quick-add lead) → `Client` + `Lead` + `QuoteRequest`.
`Meeting`, `Communication`, `EmailLead` (inbound-email triage log) support ops.

**Quoting (two-sided margin):**
- `VendorQuote` = a vendor's **cost to SEM** (private, never client-facing).
- `Proposal` = the **client-facing quote** (subtotal + 15% VAT). `Proposal.vendorCostTotal` lets
  `commission = subtotal − vendorCostTotal` be computed. **Vendor cost & commission never appear in
  any client output** (hard rule).

**Vendors:** `Vendor` (with a block of **PRIVATE contact fields** — never on public routes/APIs/exports),
`VendorApplication` (public onboarding submissions, signed-consent record via `permAccurate` /
`permNonCircumvention`), `VendorNote` (append-only log), `Category` (canonical taxonomy, m2m via
`categoryLinks` — the legacy free-text `categories[]`/`category` fields are **deprecated, read-only**).

**Other:** `BlogPost`, `Testimonial`, `MediaAsset`, `FinancialRecord`, `ActivityLog`, `ChatMessage`
(Copilot), `User`.

> Several pipeline tables (`VendorQuote`, `Proposal`, `Meeting`, `ChatMessage`, `Communication`,
> `FinancialRecord`) exist live but had **0 rows** as of the last audit — infrastructure ahead of usage.
> See [KNOWN-ISSUES.md](KNOWN-ISSUES.md).
