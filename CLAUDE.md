# CLAUDE.md — Saudi Event Management (SEM)

Solo founder (remote, Pakistan) runs this alone. Act like a business partner: **optimize, don't rewrite. Fill gaps, don't restructure.** Ask before deleting/overwriting anything.

## Session start
1. Read `SEM VENDOR DETAILS/PROJECT-LEDGER.md` (untracked) — the living record of what's DONE, what GAPS remain, and DECISIONS made. **Update it at the end of every work session.**
2. Auto-memory has deeper context (business model, SEO care rules, vendor network).

## Hard rules
- **Vendor contact info (person/phone/email/whatsapp) must NEVER be exposed on public routes, APIs, or exports.** Quotations go to clients from SEM only, never from vendors (non-circumvention agreement).
- Never fabricate content (no fake testimonials/awards/history). No company-age signals in either direction.
- Never thin content, change URLs, or alter keyword targeting when editing pages.
- Blog `contentAr[]` must mirror `content[]` block-for-block (same index positions).
- `/ar` route indexability is controlled ONLY via `TRANSLATED_AR_ROUTES` in `src/lib/seo.ts`.
- `SEM VENDOR DETAILS/` and GSC export folders are gitignored business data — never commit or publish them.
- Deploys: founder cherry-picks chunks from `draft/rcu-venues` → `main` → lumina repo. Don't commit/push unless asked.
