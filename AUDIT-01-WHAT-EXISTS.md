# AUDIT-01 — What Exists (read-only, facts only)

## 1. ROUTES

All public/admin routes live under `src/app/[locale]/` (locale = `en` | `ar`, routed via `src/middleware.ts` + `src/i18n/routing.ts`, next-intl). 95 `page.tsx` files total.

**Static top-level routes** (file path = `src/app/[locale]/<route>/page.tsx` unless noted):
`/` (`src/app/[locale]/page.tsx`), `/about`, `/about/awards-accolades`, `/about/careers`, `/about/our-team`, `/blog`, `/consultation`, `/contact`, `/editorial-policy`, `/faq`, `/glossary`, `/partner-onboarding`, `/partners`, `/partners/become-one`, `/portfolio`, `/portfolio-luxury` (redirect only, no content), `/portfolio/corporate-events`, `/portfolio/luxury-weddings`, `/portfolio/vision-2030`, `/privacy`, `/terms`, `/testimonials`, `/tracking`, `/travel`, `/vendor-registration`, `/vendors`, `/locations`, `/locations/alula`, `/locations/dammam`, `/locations/jeddah`, `/locations/makkah`, `/locations/riyadh`, `/services` (index), 14 static service pages (`corporate-events`, `weddings`, `exhibitions`, `conferences`, `event-production`, `cultural-events`, `luxury-vip-events`, `destination-events`, `royal-weddings`, `production-venues`, `valet-parking`, `vip-transportation`, `entertainment`, `birthday-party`), `/venues`, `/venues/alfursan-equestrian-village`, `/venues/almughayra-heritage-sport-village`.

Static portfolio case studies (13 individual `page.tsx` files under `src/app/[locale]/portfolio/<slug>/`, e.g. `royal-riyadh-wedding`, `alula-desert-festival`, `neom-future-summit`, etc.).

**Dynamic routes:**
- `src/app/[locale]/services/[slug]/page.tsx` — 19 PSEO service×city slugs (list in `src/app/sitemap.ts`).
- `src/app/[locale]/locations/[city]/page.tsx` — dynamic city page.
- `src/app/[locale]/locations/[city]/[service]/page.tsx` — city×service matrix (4 primary cities × 5 services, 8 secondary cities × 2 services).
- `src/app/[locale]/blog/[slug]/page.tsx` — blog posts, data from `src/lib/blog-data.ts` (not DB).
- `src/app/[locale]/portfolio/[slug]/page.tsx` — catch-all portfolio (overlaps with the 13 static portfolio dirs above; Next.js resolves static dirs first).
- `src/app/[locale]/about/our-team/[name]/page.tsx` — team member profiles.

**RCU partner/venue pages:** `src/app/[locale]/partners/rcu/alfursan-equestrian-village/page.tsx`, `.../almughayra-heritage-sport-village/page.tsx`.

**No-content route flagged:** `/portfolio-luxury` (`src/app/[locale]/portfolio-luxury/page.tsx`) — confirmed in `sitemap.ts` comment as "a 308 permanent redirect to /portfolio (no indexable content of its own)."

**Admin routes** (18 pages under `src/app/[locale]/admin/`): `dashboard`, `inquiries`, `quotes`, `quote-wizard`, `vendors`, `vendor-applications`, `clients`, `events`, `proposals`, `meetings`, `finance`, `calendar`, `gallery`, `blog`, `testimonials`, `analytics`, `social`, `copilot`, `action-needed`, `email-leads`, `search`, `status`, `login`.

**API routes** (`route.ts`, all under `src/app/api/`): public — `contact`, `consultation`, `newsletter`, `quotes`, `vendor`, `vendors`, `vendors/[id]`, `vendors/check-duplicate`, `categories`, `clients`, `events`, `blog`, `gallery`, `testimonials`, `partner-applications` (+ `[id]`, `file-url`, `upload-url`), `email-test`, `keepalive`, `logs`, `cron/follow-up-digest`; admin-guarded — `admin/*` (17 routes: dashboard stats, quote-requests, vendor-quotes, proposals, finance, meetings, email-leads, categories, vendor-match, copilot, social-post, action-needed, quick-lead, partner-welcome).

## 2. VENDOR DATA

Stored in **Postgres via Prisma** (`prisma/schema.prisma`), model `Vendor` — NOT a JSON file or hardcoded component. `prisma/dev.db` (SQLite) exists on disk but the active `datasource db` provider is `postgresql` (Supabase) — the SQLite file is not the live source.

Exact schema (`prisma/schema.prisma:57-107`):
```
model Vendor {
  id, name, category (String, legacy single-value), services (String?)
  contactInfo, email, phone, whatsapp, contactPerson   // private, admin-only
  city, portfolio (URL), pricing (String), availability, rating (Float, default 5.0)
  categories (String[], legacy), regionCoverage (String[]), yearsExperience (Int?)
  crNumber, vatNumber, certifications, rateCardSummary
  rateCardFiles, portfolioFiles   // filenames only, files live on founder's laptop
  meetingStatus (default "Contacted"), agreementSigned (Bool), agreementDate
  verificationStatus (default "Pending"), partnershipStatus (default "Pending")
  internalRating (Int 0-5), preferred (Bool), photoPermission (Bool)
  notes: VendorNote[], events, quotes, vendorQuotes, applications
  categoryLinks: Category[] (canonical m2m taxonomy)
  createdAt, updatedAt
}
```
Related tables: `Category` (canonical taxonomy), `VendorApplication` (public onboarding submissions, separate table, merges into `Vendor` on admin approval), `VendorNote` (append-only interaction log), `VendorQuote` (vendor's cost-side quote per client request).

**Record count:** not determinable from this audit — live DB is Postgres/Supabase and was not queried (per prior session note, direct DB connection is network-blocked from this dev machine). `prisma/seed.ts` contains 4 `name:` seed entries; this is seed/dev data, not necessarily the live count.

## 3. LEAD FLOW

Two client-facing entry points, both POST to the same API:

- **`ServiceLeadForm`** (`src/components/ServiceLeadForm.tsx`) — used on service pages. Fields: `name, email, phone, company, eventType, venueCity, eventDate, guestCount, message, source`.
- **`ContactForm`** (`src/app/[locale]/contact/ContactForm.tsx`) — used on `/contact`. Fields: `name, email, phone, eventType, venueCity, message, source ("contact_page"), inquiryType ("client"|"vendor")`.
- **Consultation form** on `/consultation` posts to a separate route (`/api/consultation`). Fields: `name, email, phone, eventType, budget, eventDate, message`.

**API → DB:**
- `src/app/api/contact/route.ts` (POST): if `inquiryType==="vendor"` or `source` matches a vendor-source list → creates only an `Inquiry` row (no Client/Lead/QuoteRequest). Otherwise (client path, in one `$transaction`): creates `Inquiry`, upserts `Client` (status `Lead`), creates `Lead`, creates `QuoteRequest`.
- `src/app/api/consultation/route.ts` (POST): creates `Inquiry` + `QuoteRequest` (not in a transaction — two separate `.create()` calls, city hardcoded to `'Riyadh'`).

**Notifications:** Both routes call `resend.emails.send()` (`src/lib/resend.ts`, provider = Resend) — one admin-notification email (to `ADMIN_EMAIL`, includes a `wa.me/<phone>` WhatsApp deep-link button) and one client-confirmation email. No native SMS/WhatsApp API integration — WhatsApp is only a `wa.me` link inside the email HTML. `logActivity()` (`src/lib/logger.ts`) writes an `ActivityLog` row for both flows.

**Admin surface:** `src/app/[locale]/admin/inquiries/page.tsx` reads `GET /api/contact`, updates status via `PATCH /api/contact?id=`, deletes via `DELETE /api/contact?id=`.

## 4. SEO PLUMBING

66 of 95 `page.tsx` files export `generateMetadata`; 56 files reference `canonical`; 55 files build `alternates.languages` (hreflang, via `hreflangAlternates()` in `src/lib/seo.ts` — only emitted for routes listed in `TRANSLATED_AR_ROUTES`/prefixes, otherwise `undefined`). 49 files reference JSON-LD (`application/ld+json` / schema `@type`).

Representative rows (grouping templated routes — full 95-row table not reproduced here to stay within length limit):

| Route (canonical) | generateMetadata | canonical | hreflang | JSON-LD |
|---|---|---|---|---|
| `/` | y | y | y (indexable, `/` in `TRANSLATED_AR_ROUTES`) | Organization/WebSite (+VideoObject via sitemap) |
| `/services/*` (14 static) | y (most) | y | y for the 14 body-translated pages | Service/FAQPage on several |
| `/services/[slug]` (19 PSEO) | y | y | y (all 19 listed in `TRANSLATED_AR_ROUTES`) | varies |
| `/locations/[city]` , `/locations/[city]/[service]` | y | y | y (`/locations` is a translated prefix) | LocalBusiness-type on some |
| `/blog/[slug]` | y (`blog/[slug]/layout.tsx`) | y | y only for the ~39 slugs listed individually in `TRANSLATED_AR_ROUTES` | Article/FAQPage (FAQ auto-emitted per `blog-content-conventions`) |
| `/portfolio/[slug]` , static case studies | y | y | y for the ~17 listed slugs | CreativeWork-type on some |
| `/vendors`, `/vendor-registration`, `/partner-onboarding` | y | y | n (not in translated registry) | none confirmed |
| `/admin/*` (18 routes) | n | n | n | none — excluded from sitemap and disallowed in robots.txt |
| `/tracking` | has page-level `noindex,nofollow` meta (per code comment) | n/a | n | none |
| `/portfolio-luxury` | redirect, no metadata | n/a | n | none |

`src/app/sitemap.ts` **exists**. It programmatically outputs: static pages list (~40 EN + AR core entries), team-member EN+AR entries, Arabic portfolio entries (case studies + 3 category pages), location city pages (12 cities × EN+AR), primary/secondary city×service combinations, 19 PSEO service×city pages (EN+AR), all `blogPosts` from `blog-data.ts` (EN+AR). Arabic URLs are filtered through `isArabicRouteInSitemap()` (from `src/lib/seo.ts`) so only routes in `TRANSLATED_AR_ROUTES`/prefixes are included; all English URLs are always included. Consolidated duplicate city×service combos (`corporate-event-management` all cities, `conference-planning` non-Riyadh) are explicitly excluded.

`src/app/robots.ts` **exists**. `allow: '/'` for all user agents; `disallow`: `/api/`, `/admin/` and 12 explicitly-listed `/admin/*` sub-paths, plus `/admin/login`. `/tracking` is deliberately NOT disallowed (comment explains: must stay crawlable so its page-level `noindex` meta tag is honored by Googlebot). Points `sitemap` to `${baseUrl}/sitemap.xml`.

## 5. LANGUAGES

Arabic **is implemented** via `next-intl` (`src/middleware.ts`, `src/i18n/routing.ts`). Every route in `src/app/[locale]/` is served at both `/en/...` and `/ar/...`. Translation dictionaries: `src/lib/dictionaries/en.json` and `src/lib/dictionaries/ar.json` (511 lines each, loaded via `src/lib/dictionaries.ts`) — these cover shared chrome (nav/footer/UI strings), not full page body content.

Indexability of `/ar/*` is gated per-route by `TRANSLATED_AR_ROUTES` / `TRANSLATED_AR_ROUTE_PREFIXES` in `src/lib/seo.ts`: untranslated Arabic routes render (mostly English body content, per code comments) but get `X-Robots-Tag: noindex, follow` set in `src/middleware.ts` and are excluded from the sitemap. Currently indexable AR subtrees: homepage, 14 static + 19 PSEO service pages, ~39 blog posts, `/portfolio` index + ~17 case studies/categories, and the `/locations` and `/about` prefixes (whole subtrees). Everything else under `/ar` (rest of `/services` sub-pages, remaining `/blog`, remaining `/portfolio`) stays noindexed until translated.

## 6. ADMIN

Admin dashboard **exists**: `src/app/[locale]/admin/` (18 pages, login-gated via `src/app/[locale]/admin/login/page.tsx`, `src/lib/api-auth.ts` `requireAdmin()`).

On a lead in `/admin/inquiries` (`src/app/[locale]/admin/inquiries/page.tsx`, 579 lines) the operator can currently:
- View/search/filter inquiries (by search text, category, status, date range, and a Client-vs-Partner audience tab) via `GET /api/contact`.
- Change status through a fixed set: `Pending, Contacted, Confirmed, Cancelled` (`PATCH /api/contact?id=`).
- Delete an inquiry (`DELETE /api/contact?id=`).
- Manually add a lead (`saveLead` / "Add" modal, posts to `admin/quick-lead`).
- Expand a row for detail view (`expandedId` toggle) — no visible reassignment or notes-editing controls found in this file beyond status change.

Related admin pages exist for downstream lead handling but are separate pages/tables: `/admin/quote-wizard` and `/admin/quotes` (Proposal/Quote model), `/admin/clients` (Client model), `/admin/vendors` (1447 lines) and `/admin/vendor-applications` (Vendor / VendorApplication matching), `/admin/meetings` (Meeting model), `/admin/finance` (FinancialRecord), `/admin/action-needed`, `/admin/email-leads` (EmailLead triage), `/admin/copilot` (AI chat advisor, `src/lib/ai-provider.ts`).
