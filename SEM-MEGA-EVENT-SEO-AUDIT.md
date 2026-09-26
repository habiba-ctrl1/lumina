# SEM Mega-Event & High-Value Lead SEO Audit
*Audit date: 2026-09-13. Read-only — no code changed while producing this document. Branch audited: `draft/rcu-venues`.*

## 0. TL;DR

This is **not** a greenfield site. It's a mature, disciplined, mostly well-run bilingual SEO property that has already been through one painful lesson: in mid-2026 the team over-indexed a `/locations/[city]/[service]` programmatic grid (70 → 238 indexed pages), average position degraded from ~14 to ~28, and they had to spend a session *un-doing* it (noindex + sitemap exclusion + internal-link rerouting). That fix is still live and working. **The single biggest risk in this new brief is repeating that exact mistake with a fresh set of mega-event pages.** The brief already says "don't blindly create hundreds of pages" — the codebase agrees with you, empirically.

The real opportunity here is narrower than the brief's draft IA suggests: most of the requested service concepts already exist under different (better) URL names, most of the requested city-split pages already exist via a working PSEO system, and the genuine gaps are a short list (mega-events pillar, gala/awards as a dedicated page, product-launch, brand-activation, one seasonal cluster). The bigger unlocks are two **quality regressions** that need same-day fixes (a fabricated review stat and an unverifiable award claim — exactly the pattern a prior cleanup pass was supposed to eliminate) and a **conversion gap that isn't about pages at all** (no budget field anywhere on the public funnel, no spam protection on the main contact endpoint, and — per prior business diagnosis — the actual lead-to-close bottleneck is vendor quote turnaround speed, not site content).

---

## 1. Current Architecture

- **Framework**: Next.js 16, App Router, `next-intl` for EN/AR (`/` = English, `/ar/*` = Arabic).
- **Rendering**: No `force-dynamic`/`revalidate` directives found anywhere in `src/app` — the entire site (72 static `page.tsx` files plus all combinatorial routes) renders fully static at build time by default. Good for SEO (fast TTFB, stable crawl snapshots); the tradeoff is that new blog posts / sitemap changes require a redeploy to go live, which matches this team's existing cherry-pick-and-deploy workflow.
- **Backend**: Prisma + Postgres (Supabase), ~20 models covering the full quote-to-close pipeline (see §9).
- **Content model**: Marketing pages are hand-authored JSX (not CMS-driven); blog posts are data objects in `src/lib/blog-data.ts` (40 posts) rendered through one dynamic route; two separate PSEO systems generate city/service combination pages from hardcoded data records (not a CMS, not database-driven).
- **i18n indexability control**: a single registry (`TRANSLATED_AR_ROUTES` in `src/lib/seo.ts`, 99 entries) simultaneously drives Arabic indexability, sitemap inclusion, and hreflang emission. This is a genuinely good pattern — one source of truth, hard to get out of sync — and should be preserved, not replaced, by any new work.

## 2. Existing Page Inventory (what's really there)

| Section | Count | Notes |
|---|---|---|
| Static service pages | 14 | corporate-events, conferences, exhibitions, weddings, royal-weddings, luxury-vip-events, event-production, destination-events, cultural-events, production-venues, valet-parking, vip-transportation, entertainment, birthday-party |
| PSEO service×city pages (`/services/[slug]`) | 19 slugs × 2 locales = 38 pages | e.g. `corporate-events-riyadh`, `luxury-weddings-jeddah`. Hand-authored data record, not a template stamped blindly — each has real 600–900 word bodies. |
| Static city pages | 5 | riyadh, jeddah, dammam, alula, makkah |
| Dynamic city pages (`/locations/[city]`) | 7 (neom, khobar, madinah, taif, abha, diriyah, tabuk) | **No `generateStaticParams`** — render on-demand per request, unlike every other route in the site. Inconsistent with the rest of the static-first architecture. |
| City×service grid (`/locations/[city]/[service]`) | 12 cities × 5 services = up to 60 combinations, many noindexed | Already has a working cannibalization guard (see §4) |
| Blog posts | ~40 | Data-driven, EN+AR mirrored per the block-index rule |
| Portfolio | Hub + 3 categories + 14 case studies | `[slug]/page.tsx` dynamic catch-all is a dead stub (always `notFound()`) — all real case studies are separate static folders |
| Admin | 24 routes | Correctly blocked in robots.txt and excluded from sitemap |

**No `/mega-events` page exists anywhere** — confirmed by file-tree search, sitemap search, and full-repo grep.

**None of the exact URLs proposed in the brief exist under those names.** The site already has equivalent pages under shorter, more natural names:

| Brief's guess | What actually exists |
|---|---|
| `/services/conference-management` | `/services/conferences` |
| `/services/exhibition-management` | `/services/exhibitions` |
| `/services/vip-events` | `/services/luxury-vip-events` |
| `/services/large-weddings` | `/services/royal-weddings` (+ general `/services/weddings`) |
| `/services/destination-weddings` | Folded into `/services/destination-events` |
| `/services/product-launch-events` | **Does not exist** — bullet-point only |
| `/services/gala-dinner-events` | **Does not exist as a page** — only a blog post |
| `/services/award-ceremony-events` | **Does not exist** — same blog post covers it |
| `/services/government-events` | **Does not exist anywhere** |
| `/services/brand-activation` | **Does not exist** as a dedicated page |
| `/mega-events` pillar | **Does not exist** |

This matters: the correct response to the brief's proposed IA is not "build all 11," it's "4 of them are DO NOT CREATE (duplicate an existing URL under a worse name), and the remaining gaps need to be judged individually on real intent" — done in §"Missing Opportunities" below and fully scored in the companion Page Map.

## 3. What Is Already Strong

- **The PSEO service×city system** (`/services/[slug]`) is genuinely good work — real, differentiated 600-900 word content per combination, not templated filler, with its own FAQ/Service/Breadcrumb schema per page.
- **`/services/exhibitions` and `/services/event-production`** are the best-practice model for broker-correct content: they use a shared `PartnerNetworkGallery` component with real partner-sourced photos captioned "delivered through SEM's vetted production partner network" — honest, differentiated, and reusable. Every other service page should be brought up to this bar, not the other way around.
- **The `TRANSLATED_AR_ROUTES` indexability registry** — one edit flips indexability + sitemap + hreflang together, and it's been correctly used to keep non-translated pages fully out of Google's Arabic index (no orphaned half-translated pages).
- **The `isConsolidatedNoindex` cannibalization guard** in both `locations/[city]/[service]/page.tsx` and `sitemap.ts` — a real, working fix for a real problem, still intact.
- **Fabrication cleanup (Aug 2026)** mostly held: no fake company-age claims, no fake office addresses, no fake awards in the sitewide Organization schema, `/about/awards-accolades` reframed honestly. (Two regressions found — see §8.)
- **`robots.txt`** is clean and correct, including the deliberate (and correct) decision to leave `/tracking` crawlable so its page-level noindex meta is actually seen by Googlebot rather than hidden by a blanket disallow.
- **WhatsApp-first conversion design** — a global floating button plus 12+ components with contextual WhatsApp CTAs. This is a legitimate strength for a KSA audience, not a design flaw.
- **The vendor-cost-vs-client-price separation in the schema** (`VendorQuote.vendorCost` vs `Proposal.totalAmount`, vendor contact fields never selected in any public/admin-list API) — the non-circumvention and margin-protection rules from CLAUDE.md are actually enforced in code, not just policy.

## 4. Technical SEO Issues

1. **Title double-append bug (real, live, ~12+ routes).** Root layout sets `title.template: "%s | Saudi Event Management"`. Multiple pages/layouts set a plain-string title that *already ends in* `"| Saudi Event Management"`, so the rendered `<title>` literally reads `"...| Saudi Event Management | Saudi Event Management"`. Confirmed on: `editorial-policy`, `partner-onboarding`, `testimonials`, `services/page.tsx`, 4× `locations/{jeddah,riyadh,makkah,dammam}`, `services/corporate-events/layout.tsx` (EN branch only — the AR branch of the *same file* correctly uses `title:{absolute:...}`, proving the team already knows the fix), `glossary`, `vendors`, `vendor-registration`, `partners`, `blog/[slug]/layout.tsx`, both `partners/rcu/*` pages, and `venues/page.tsx` (a second, independently-introduced instance of the identical pattern via a *nested* template). This has been flagged in the project ledger since 2026-08-17 as "not fixed, out of scope" — it's now had a month to keep silently degrading CTR on ~12 URLs. Cheap, mechanical, zero-risk fix (either convert to `title:{absolute:...}` or strip the trailing suffix from every literal).
2. **Sitemap orphans**: `taif`, `abha`, and `tabuk` city×service combination pages are statically generated and live (crawlable, internally reachable) but are never listed in `sitemap.ts` — a discoverability gap for pages that already cost a build slot.
3. **`/locations/[city]/page.tsx` has no `generateStaticParams`** for its 7 dynamic cities (neom, khobar, madinah, taif, abha, diriyah, tabuk), while the other 5 city pages are hand-coded static files. This is an architectural inconsistency (some cities static, some on-demand) worth normalizing during any location-page work, though not a current SEO problem per se.
4. **Duplicate-content risk: `/venues/*` vs `/partners/rcu/*`.** Both `/venues/alfursan-equestrian-village` + `/venues/almughayra-heritage-sport-village` and `/partners/rcu/alfursan-equestrian-village` + `/partners/rcu/almughayra-heritage-sport-village` exist as separate static pages describing the same two properties. Given this touches the RCU relationship (which the business has a standing decision to keep low-profile — see project history), **this needs a founder decision, not a unilateral fix**: confirm which URL tree is the intended public one before canonicalizing/merging.
5. **No centralized JSON-LD schema builders.** Every page hand-writes its own `BreadcrumbList`/`Service`/`FAQPage` JSON-LD literal (38+ files for `BreadcrumbList` alone). Not a current bug, but a maintenance/consistency risk — the visual breadcrumb component (`InternalPageHero`) and the JSON-LD breadcrumb are two independently maintained sources of truth per page, meaning they can silently drift. Not urgent, but worth a shared helper if more pages are added.
6. **No sitemap-embedded hreflang**, only page-level `<link rel="alternate" hreflang>`. This is acceptable (page-level coverage satisfies the requirement) but worth knowing it's not double-covered at the sitemap layer.
7. **No `manifest.ts`** — minor, PWA/rich-result-adjacent, not a ranking factor but a completeness gap.

## 5. Content Issues

1. **Fabrication regression #1 (HIGH PRIORITY): `/services/royal-weddings`** trust bar displays `"4.9★ — Average Client Rating (148 reviews)"`. Zero `aggregateRating`/`reviewCount` schema exists anywhere in the codebase, no testimonials data structure backs "148 reviews," and this exact number appears nowhere else on the site. Every other page uses only defensible stats ("20+ Vetted Vendors"). This is precisely the category of claim the August 2026 trust-cleanup was built to remove. It needs to come out (or be replaced with a real, sourced figure) before this page gets any more visibility.
2. **Fabrication regression #2: `/services/exhibitions`** hero trust element: `"Award — Winning Booth Design 2024"` — no awarding body named, no other reference on the page or site, unverifiable superlative. Same category as the "Best Luxury Event Planner GCC 2024" award that was already removed sitewide in August. This either survived that pass or was reintroduced afterward.
3. **Unsubstantiated certification-style claim: `/services/destination-events`** credentials bar includes `"NEOM APPROVED"` — reads as a formal designation. Nothing elsewhere in the codebase or business memory substantiates an actual NEOM approval/certification. Needs verification with the founder or softening to non-certification language.
4. **Inconsistent broker-vs-owner framing.** `exhibitions` and `event-production` correctly disclose partner-network delivery throughout ("delivered through SEM's vetted production partner network," real partner photos). `corporate-events` is partially disclosed (some capabilities say "through trusted partners," others like AV/lighting and registration platforms read as first-party). `conferences`, `luxury-vip-events`, and `destination-events` lean more toward first-party language ("our production team," "we bring our full production capability... directly to the client's private property") with little-to-no partner disclosure. This is a direct match to a CLAUDE.md hard rule ("do not falsely claim SEM itself owns every production capability") — it's not fabrication exactly, but it's an inconsistent application of a rule the business clearly cares about, and any new mega-event content needs to hold the exhibitions/event-production standard from day one.
5. **Near-duplicate blog posts**: `elevating-corporate-events-riyadh-jeddah` and `corporate-event-excellence-riyadh-jeddah` — near-identical titles and topics. Already flagged internally in prior project history (positions ~58/~68) as "near-duplicates worth merging" — still unresolved.
6. **Gala/awards demand already validated by data, still under-monetized.** `gala-dinner-awards-ceremony-planning-saudi-arabia` (blog) carries 2,264 impressions at position ~21 per prior GSC analysis — real, measured commercial interest — but it converts through a blog post, not a commercial service page with its own lead form framing ("Request a Gala Proposal" vs. a generic blog CTA). This is the single most data-backed content opportunity in this entire audit; everything else here is judgment, this one has actual search-console evidence behind it.

## 6. Conversion Issues

1. **No budget field anywhere on public forms**, despite `Inquiry.budget`, `Lead.budget`, and `QuoteRequest.budgetRange` all existing in the schema and being referenced downstream (admin manual-entry, outbound alert emails as "Not specified"). Budget qualification today happens only if a client volunteers it in free text, or is captured manually later. This is exactly the qualification gap the brief asks about — the backend already has the field, the public form just never asks.
2. **Two different, inconsistent lead forms.** The shared `ServiceLeadForm` (used on 16 pages) collects name/email/phone/company/event type/city/date/guests/message. The homepage's `ContactSection` is a separately-coded, shorter form missing phone, company, city, date, and guest count entirely. A homepage visitor is qualified less thoroughly than a service-page visitor — an unforced inconsistency.
3. **No spam protection on `/api/contact`** — no honeypot, no rate limit, no CAPTCHA. The vendor-facing `/api/partner-applications` route *does* have both a honeypot and a 3/hour per-IP rate limit; that protection was simply never carried over to the client-facing contact route, which is the higher-traffic, higher-value target for spam/bot submissions.
4. **No dedicated "Request a Proposal" qualification page** — "Request a Proposal" is just a heading string on the generic lead form, not a distinct, more structured qualifier (no guest-count bands, no budget-range selector, no service-need checklist). For mega-event/high-value leads specifically, a slightly heavier qualification step (still short — 6-8 fields) would let the founder triage instantly instead of reading free text.
5. **The lead-status lifecycle is fragmented, not the founder's structured funnel.** Only two mini-funnels are actually driven by the UI today: `Inquiry.status` (Pending→Contacted→Confirmed/Cancelled) and `QuoteRequest.status` (pending→quote_sent→accepted/rejected/archived). The richer `Lead.status` enum (New→Contacted→Proposal Sent→Negotiation→Won→Lost) exists in the schema and is written on every single submission, but is never advanced or even displayed anywhere in the admin UI — dead state today. `Communication` (a full interaction-log model) has zero code paths writing or reading it — entirely unused.
6. **Important context that changes the priority of all the above**: per existing business diagnosis, the real conversion bottleneck this business has already identified is **vendor-quote turnaround speed**, not lead volume or intake friction (12-13 inquiries measured, 0 closes, root cause = slow partner quotes). None of the funnel gaps above are wasted effort to fix — the budget field and spam-protection gaps in particular are cheap and clearly worth doing — but a new CRM lifecycle rebuild would be solving the wrong problem right now. Recommend scoping funnel work to the small, additive fixes only (see roadmap Day 6), not a pipeline redesign.

## 7. Internal-Linking Issues

- Reciprocal hub/child linking between `corporate-events` ↔ `conferences`, and `weddings` ↔ `royal-weddings`, is already in place and works well as topic-cluster architecture.
- `gala-dinner-awards-ceremony-planning-saudi-arabia` was previously an **orphaned** asset (2,264 impressions, 0 clicks, zero inbound contextual links) until a prior session added 3 reciprocal links from `corporate-events`, `luxury-vip-events`, and `conferences`. That fix is in place — but the page it links to is still a blog post, not a commercial page (see §5.6).
- `corporate-events` and `conferences` share near-identical venue lists (KAFD, RICEC, Ritz-Carlton, Four Seasons, Al Faisaliah, JW Marriott) copy-pasted across both pages — increases duplicate-content signal for shared queries like "corporate event venues Riyadh" without adding differentiation value.

## 8. Indexation Risks

- Confirmed via `TRANSLATED_AR_ROUTES`: the Arabic indexability gate is a minority-of-routes allowlist (99 of many more total EN routes) — correct and intentional, not a risk in itself.
- `taif`/`abha`/`tabuk` city×service pages: built, crawlable, internally linked, but absent from the sitemap — a real (if minor) discovery gap (§4.2).
- No evidence of the prior thin-page flood recurring — the `isConsolidatedNoindex` guard is holding. **The risk is prospective**: any new mega-event page work that reflexively splits by city before demand is proven would recreate the exact failure mode this site already lived through once.

## 9. Cannibalization Risks

- `corporate-events` vs `conferences`: legitimate parent/adjacent hub structure, but near-duplicate venue-list copy increases risk on shared head terms (§7).
- `royal-weddings` vs `weddings`: genuinely differentiated by depth and intent (ceremonial/high-net-worth vs. general commercial) — **not** a cannibalization risk, despite surface-level topical overlap (shared ceremony names, shared venues). No action needed here.
- `elevating-corporate-events-riyadh-jeddah` vs `corporate-event-excellence-riyadh-jeddah` (blog): real, unresolved near-duplicate.
- The already-fixed `/locations/[city]/corporate-event-management` and `/locations/[city]/conference-planning` (non-Riyadh) noindex guard remains the template to reuse for any *future* new-service-cluster city split, rather than inventing a new pattern.

## 10. Trust/Credibility Issues

Covered in detail in §5 (fabrication regressions #1 and #2, the NEOM-approved claim, and inconsistent broker-framing). Restating the ranked severity for clarity:
1. Royal-weddings "4.9★ (148 reviews)" — fabricated/unsupported, highest priority.
2. Exhibitions "Award — Winning Booth Design 2024" — fabricated/unsupported award pattern.
3. Destination-events "NEOM APPROVED" badge — needs verification or removal.
4. Inconsistent partner-network disclosure across service pages — not fabrication, but inconsistent application of a rule the business explicitly cares about (CLAUDE.md: "must clearly distinguish SEM-managed work, partner capabilities, and partner portfolio").

## 11. Missing Opportunities (evaluated against real intent, not just the brief's wishlist)

Full scoring lives in the companion Page Map document. Headline calls:

- **`/mega-events` pillar — build it.** This is the one page in the brief's IA that has no existing equivalent, has genuine differentiated intent ("mega event company Saudi Arabia," "large-scale event management KSA," 500+ guest positioning), and matches the business's actual model shift toward routing large/mega projects to a stronger execution partner while SEM retains the lead-gen/coordination/margin role. It should explain that model honestly (broker/coordinator for large-scale delivery, not implying SEM's own crews build 2,000-seat productions) and hub-link into corporate-events, exhibitions, conferences, royal-weddings, and the new gala/brand-activation pages.
- **Gala Dinner & Award Ceremony — upgrade the existing blog post in place, don't create a competing new URL.** Already has GSC-validated demand (§5.6) at its current URL (position ~21, 2,264 impressions). Creating a brand-new `/services/gala-dinner-events` page would split authority against a page that's already earning impressions — the lower-risk move, and the one consistent with the "never change URLs" rule, is to strengthen the *existing* post's commercial conversion mechanics (a proper proposal-request CTA block, not just a generic blog CTA) rather than compete with itself. Keep the "award ceremony" intent merged into the same asset rather than splitting into two thin pages — it already treats them as one topic and ranks for both.
- **Product-launch events — genuine gap, real distinct intent** (reveal moments, embargoed press, brand-exclusivity logistics) not served by generic corporate-events content. Worth a dedicated page.
- **Brand activation — genuine gap**, distinct from general corporate-events (experiential/consumer-facing vs. internal/B2B corporate). A blog post (`entertainment-activations-jeddah-season-corporate`) already touches the edge of this intent.
- **Government events — do NOT reflexively build.** This brushes directly against the business's own standing rule that government/embassy work is referral-only and must never look like SEM is soliciting or bidding on tenders. An SEO landing page capturing *organic* "government event planning Saudi Arabia" inquiries is a different thing from bidding a sealed tender, but the content must be written with the same discipline already proven safe on `/locations/alula` and the generic GEA/MISA/DGDA mentions elsewhere (informational "we navigate X's requirements," zero named-relationship claims). **Founder sign-off required before building this one specifically** — flagging it as a judgment call, not a default yes.
- **Riyadh Season — genuine, currently uncovered seasonal opportunity** for the corporate-sponsorship/activation-support angle (companies wanting event support during the festival, not implying official festival affiliation). Jeddah Season has partial coverage already; Riyadh Season, the larger of the two, has none.
- **Founding Day — minor, low-effort seasonal gap**, mirror the pattern already proven on the National Day post.
- **FII / LEAP / Cityscape / Big 5 — one consolidated post, not four thin ones.** Real intent exists (companies exhibiting/attending need hospitality, VIP transport, booth support), but it's B2B-exhibitor-support content, not four separate keyword-stuffed pages. One post covering "supporting your company's presence at Saudi Arabia's major exhibitions" feeding into `/services/exhibitions` is proportionate; four dedicated pages is exactly the sprawl pattern this site already got burned by.
- **City-split for any of the above — not yet.** Every existing city split (Riyadh/Jeddah/Dammam PSEO pages) followed proof of demand at the national level first. Recommend the same discipline for gala/product-launch/brand-activation: launch national, watch GSC, split only where data justifies it.

## 12. Pages That Should NOT Be Created

- `/services/conference-management`, `/services/exhibition-management`, `/services/vip-events`, `/services/large-weddings`, `/services/destination-weddings` — all duplicate an existing, better-named URL. Creating them would be self-cannibalization on day one.
- Any immediate city-split of new pages (`/services/gala-dinner-events-riyadh` etc.) before the national page has any ranking data.
- A second `/services/award-ceremony-events` page separate from gala dinners — same audience, same event format in Saudi practice (galas nearly always include an awards segment), splitting them thins both.
- Four separate FII/LEAP/Cityscape/Big5 pages.
- Any additional `/locations/[city]/[service]` grid expansion — this exact pattern is what caused the 70→238 indexing flood; the grid should be consolidated further, not extended.

---
*Companion documents: `SEM-MEGA-EVENT-SEO-ROADMAP.md` (7-day execution plan), `SEM-SEO-PAGE-MAP.md` (every existing + proposed URL classified KEEP/IMPROVE/MERGE/REDIRECT/NOINDEX/CREATE/DO NOT CREATE).*
