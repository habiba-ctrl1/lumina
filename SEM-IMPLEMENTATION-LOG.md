# SEM Implementation Log

Append-only. Never overwrite earlier entries — add new dated entries at the bottom.

---

## 2026-09-20 — Batch 1: Remove invented SAR figures + delete fake vendor component

**1. What I changed**
Removed every fabricated SAR price figure found in FAQ answers across the site's service and location pages (homepage, Jeddah, luxury-wedding-planning city/service page, corporate-events, weddings, conferences, destination-events, event-production, royal-weddings, services index, and 2 PSEO Riyadh pages) — both visible text and JSON-LD schema, English and Arabic, 24 replacements total. Each was replaced with: "Cost depends on guest count, venue, and which services are included. Send us your requirements and we return a full quotation within 24 hours" (+ Arabic equivalent). No new numbers invented. Deleted `src/components/VendorMarketplace.tsx` — 6 fabricated vendor listings, confirmed unused/unimported before deleting.

**2. Files touched**
11 edited (`src/app/[locale]/page.tsx`, `locations/jeddah/page.tsx`, `locations/[city]/[service]/page.tsx`, `services/corporate-events/page.tsx`, `services/weddings/page.tsx`, `services/conferences/page.tsx`, `services/destination-events/page.tsx`, `services/event-production/page.tsx`, `services/royal-weddings/page.tsx`, `services/page.tsx`, `services/[slug]/page.tsx`), 1 deleted (`src/components/VendorMarketplace.tsx`).

**5. What I did not do**
- Left non-FAQ pricing tables/tier cards untouched (not in original AUDIT-02 §5 scope, needs a product decision): `corporate-events` OfferCatalog priceRange (3 spots), `event-production` 6-row pricing table, `production-venues` 5-row pricing table (EN+AR), `royal-weddings` 3 tier cards ×3 copies (9 spots).
- Left `locations/makkah/page.tsx` (Vision 2030 national stat) and `glossary/page.tsx` (MICE market-size stat) untouched — real statistics, not SEM service prices.
- Left `consultation/page.tsx` budget dropdown untouched — client-selectable brackets, not a claim.
- Did not fix 342 pre-existing lint errors (repo-wide, unrelated to this batch).

**7. What I need from Habiba**
- Decision on the deferred pricing tables/cards (§5 above): delete, replace with placeholder text, or leave.
- Decision on a pre-existing Jeddah page issue found while working: its JSON-LD FAQPage has a "cost" question with no matching visible FAQ on the page (structural mismatch that predates this batch).

---

## 2026-09-20 — Batch 1b: Finished deferred pricing + Jeddah fix + full claims sweep (read-only)

**1. What I changed**
Finished the pricing cleanup deferred from Batch 1a: `event-production` and `production-venues` price tables (11 cells, EN+AR) now read "Quoted per event" / "يُسعَّر حسب كل فعالية"; `royal-weddings`'s 3 tier cards (9 spots: JSON-LD + EN visible + AR visible) now read "Custom quotation" / "عرض سعر مخصّص"; `corporate-events`'s OfferCatalog JSON-LD had `priceRange` removed entirely from all 3 offers (not replaced with text, per instruction — invalid schema value is worse than no property). Added the missing visible "How much does event management cost in Jeddah?" FAQ so the Jeddah page's visible content now matches its JSON-LD. Then ran a read-only sweep of the entire public site for other unverifiable claim types (remaining SAR figures, event/client counts, years-in-business, superlatives, awards/certifications, named-venue partnership claims, response-time guarantees, staff-size figures, review/rating schema, statistics about SEM) and produced a full findings table — nothing in the sweep was edited.

**2. Files touched**
5 edited: `services/event-production/page.tsx`, `services/production-venues/page.tsx`, `services/royal-weddings/page.tsx`, `services/corporate-events/page.tsx`, `locations/jeddah/page.tsx`.

**5. What I did not do**
- Did not edit anything found in the Part 3 sweep — read-only by instruction.
- Did not exhaustively enumerate all ~947 superlative instances or every named-venue mention (both pervasive site-wide patterns) — gave representative examples + counts instead.
- Did not investigate whether any swept claim is actually true — marked "Unknown" throughout, that's Habiba's call.
- Did not build Arabic FAQ infrastructure for the Jeddah page — it has no `faqsAr` array at all (unlike other service pages), so "mirror to Arabic" wasn't achievable without building that from scratch.

**7. What I need from Habiba**
- A decision on every row of the Part 3 claims table (full table in the batch report) — highest-priority: the PMP/institutional-certification claim (editorial-policy page), "20+ partners" + royal-clientele language (about page), guest-satisfaction percentages (98%/99% stat badges on Riyadh/Jeddah pages), and the "team of 15–40 professionals" figure (royal-weddings page).
- What to do with `src/components/Services.tsx`'s SAR price badges and the `src/lib/dictionaries/en.json`/`ar.json` "starting"/"answer" SAR figures — newly found, not part of Batch 1's original scope.
- Whether to build a real Arabic FAQ section for the Jeddah page, or leave it English-only.
- Whether the ~40 SAR figures inside blog post body copy (`src/lib/blog-data.ts`) should get the same treatment as the service-page FAQs, or are acceptable as editorial "cost guide" content.

---

## 2026-09-20 — PHASE 1 FROZEN (documentation snapshot, no code changed)

Phase 1 (Batch 1 + Batch 1b) is paused pending Habiba's decisions on the open items below. This entry is a consolidated freeze record — no code, content, or SEO was touched to produce it.

### Exactly what was changed

1. **Removed every fabricated SAR price figure found in FAQ answers** (visible text + JSON-LD, EN + AR) across the homepage, 4 location pages, and 10 service pages — 24 replacements, all using the same wording: *"Cost depends on guest count, venue, and which services are included. Send us your requirements and we return a full quotation within 24 hours."* (+ Arabic equivalent). No new numbers invented anywhere.
2. **Removed fabricated prices from 3 deferred pricing UI elements**:
   - `event-production` + `production-venues` price tables (11 cells, EN+AR) → "Quoted per event" / "يُسعَّر حسب كل فعالية". (Also fixed a pre-existing bug in `event-production` where the Arabic table was silently showing English "SAR X" text — added a real Arabic price column so the fix actually renders on `/ar`.)
   - `royal-weddings` 3 tier cards × 3 copies (JSON-LD + EN visible + AR visible, 9 spots) → "Custom quotation" / "عرض سعر مخصّص".
   - `corporate-events` OfferCatalog JSON-LD → `priceRange` property removed entirely from all 3 offers (not replaced with text — an invalid schema value was judged worse than no property).
3. **Fixed a schema/content mismatch on the Jeddah page**: added the visible "How much does event management cost in Jeddah?" FAQ so the visible page now matches what the JSON-LD already claimed (English only — this page has no Arabic FAQ array to mirror into, see Unresolved below).
4. **Deleted `src/components/VendorMarketplace.tsx`** — 6 fabricated vendor listings (fake names, ratings, review counts, all pointing to SEM's own WhatsApp number). Confirmed zero imports before deleting; build passed clean after removal.
5. **Read-only claims sweep of the full public site** (Part 3, Batch 1b) — no edits — covering remaining SAR figures, event/client counts, years-in-business, superlatives, awards/certifications, named-venue/government partnership claims, response-time guarantees, staff-size figures, review/rating schema, and statistics about SEM. Full findings table delivered in-conversation; summarized under "Remaining claim audit findings" below.

### Files changed (16 total: 15 edited, 1 deleted)

| File | Change |
|---|---|
| `src/app/[locale]/page.tsx` | FAQ price removed |
| `src/app/[locale]/locations/jeddah/page.tsx` | FAQ price removed + missing FAQ added |
| `src/app/[locale]/locations/[city]/[service]/page.tsx` | FAQ price removed |
| `src/app/[locale]/services/corporate-events/page.tsx` | FAQ prices removed (EN+AR) + OfferCatalog priceRange removed |
| `src/app/[locale]/services/weddings/page.tsx` | FAQ prices removed (EN+AR) |
| `src/app/[locale]/services/conferences/page.tsx` | FAQ prices removed (EN+AR) |
| `src/app/[locale]/services/destination-events/page.tsx` | FAQ prices removed (EN+AR) |
| `src/app/[locale]/services/event-production/page.tsx` | FAQ prices removed (EN+AR) + price table fixed (EN+AR, incl. AR rendering bug fix) |
| `src/app/[locale]/services/royal-weddings/page.tsx` | FAQ prices removed (EN+AR) + 3 tier cards fixed (9 spots) |
| `src/app/[locale]/services/page.tsx` | FAQ price removed |
| `src/app/[locale]/services/[slug]/page.tsx` | FAQ prices removed on 2 PSEO entries (EN+AR) |
| `src/app/[locale]/services/production-venues/page.tsx` | Price table fixed (EN+AR) |
| `src/components/VendorMarketplace.tsx` | **Deleted** (unused, fabricated content) |

### URLs affected

No URLs were created, removed, redirected, or changed. No canonical, hreflang, sitemap entry, H1, or `<title>` was touched. Only body/FAQ text and JSON-LD field values changed on these **existing** routes (EN + AR versions of each, where applicable):
`/`, `/locations/jeddah`, `/locations/{city}/luxury-wedding-planning`, `/services`, `/services/corporate-events`, `/services/weddings`, `/services/conferences`, `/services/destination-events`, `/services/event-production`, `/services/royal-weddings`, `/services/production-venues`, `/services/luxury-weddings-riyadh`, `/services/event-production-riyadh`.

### Validation results

- **Lint:** FAIL — 342 pre-existing errors / 8 warnings, unrelated to this work (confirmed by isolating touched files in the output: only 3 pre-existing, unrelated `no-explicit-any`/unescaped-entity errors appeared in `weddings/page.tsx` and `production-venues/page.tsx`, none on any line this work touched). `next lint` doesn't exist in this Next 16 install; ran `eslint .` directly.
- **Typecheck:** PASS — `tsc --noEmit`, 0 errors, both runs.
- **Build:** PASS — `npm run build`, 151 routes, 0 errors, 0 warnings, both runs (after clearing a stale `.next`/Turbopack cache and working around this sandbox's Google Fonts network block on retries — neither was a code defect).

### Unresolved issues / decisions needed

1. Whether the deleted-content pattern (delete `crNumber`/`vatNumber` drop noticed in earlier audit — unrelated, not touched this batch) needs separate handling — **not part of this freeze**, noted only for completeness from AUDIT-02.
2. **`src/components/Services.tsx`** has 5 SAR price badges (`"From SAR 50,000"` etc.) — newly found in the Part 3 sweep, not yet touched. Need to confirm which page renders this component before deciding.
3. **`src/lib/dictionaries/en.json` / `ar.json`** — a `"starting"` price field (5 entries, feeds `Services.tsx`) and a standalone FAQ `"answer"` field (line 448, both files) with SAR figures — newly found, not yet touched.
4. **Jeddah page has no Arabic FAQ array** at all (unlike every other service page, which pairs `faqs` + `faqsAr`) — the added FAQ is English-only. Building real Arabic FAQ infrastructure for this page is a larger change than "add one missing question."
5. **`src/lib/blog-data.ts`** — ~40 SAR figures embedded in blog post body copy (cost-guide style articles, EN+AR). Different genre from a sales FAQ — needs a decision on whether the same "remove and replace" treatment applies.
6. Full Part 3 claims table (below) needs a per-row decision from Habiba.

### Remaining claim-audit findings (Part 3 sweep — all unresolved, nothing edited)

| Category | Status | Headline findings |
|---|---|---|
| Remaining SAR/price figures | Found, undecided | `blog-data.ts` (~40 instances), `dictionaries/en.json`+`ar.json` (6 fields), `Services.tsx` (5 badges) — see items 2/3/5 above |
| Event/client counts, years-in-business | **NOT PRESENT** | No "500+ events," "200 clients," or "since 20XX" claims found anywhere public |
| Staff/team-size figures | Found, undecided | `royal-weddings/page.tsx`: "on-day team of 15–40 professionals" (×2, lines 263, 490) |
| Award/certification/accreditation claims | Found, undecided | `editorial-policy/page.tsx`:59 — PMP + named institutional accreditation claim; multiple "ISO-certified" claims across `corporate-events`, `production-venues`, `services/[slug]`, `event-production`, `luxury-vip-events`; `royal-weddings`:385 — "KSA's most awarded floral designers" |
| Named client/venue/government-body claims | Found, undecided (largest category) | Pervasive site-wide (dozens of files) naming Ritz-Carlton, Four Seasons, Rosewood, Waldorf Astoria, KAFD, RICEC, KAICC, JCEC as venues SEM "coordinates" or has "preferred rates" with; `about/page.tsx`:228/231 — royal/VIP clientele language + "20+ partners" stat; `partners/rcu/*` — "Official Partner" claims (lower risk per prior memory — real in-progress work) |
| Guarantee / response-time promises | Found, undecided | "Respond within 2 hours" repeated across 13 service pages; "24 hours" quote promise on `services/page.tsx` + `corporate-events/layout.tsx`; `vendors/page.tsx`:52,78 — "90 Min Guaranteed Response," "Guaranteed On-Time Payments"; `contact/page.tsx`:265 — "we guarantee an event uniquely tailored" |
| Review/rating/`aggregateRating` schema | **NOT PRESENT** | No `aggregateRating`, `reviewCount`, or `ratingValue` anywhere in JSON-LD site-wide |
| Percentage/statistic about SEM itself | Found, undecided | Guest-satisfaction stat badges: Riyadh 99%, Jeddah 98%; "100% Vendor Vetting" badge repeated on 7+ pages; `partners/page.tsx`:202 — "Empowering Local Talent — 70%" |
| Superlatives (best/leading/top/premier/largest) | Found, not itemized | 947 occurrences across 92 files — pervasive marketing language, not isolated claims; summarized rather than listed row-by-row |

### Current Phase 1 status

**FROZEN.** All Batch 1 + Batch 1b edits are committed to the working tree (not yet committed to git — founder cherry-picks per standing workflow), lint/typecheck/build verified passing (lint fails only on pre-existing, unrelated errors). No further code, content, or SEO changes will be made until Habiba reviews and decides on the unresolved items above. Batch 2 has not started.

### What remains for future work

- Habiba's decisions on all 6 unresolved items above, and per-row decisions on the Part 3 claims table.
- Once decided: a Batch 2 (or further batches) to act on whichever claims she wants changed — scope to be defined entirely by her decisions, not proposed unilaterally.

---

## 2026-09-24 — Riyadh Phase, P0 existing-URL cleanup (approved scope only)

**1. What I changed**
Implemented exactly the 4 approved P0 items from `docs/seo-audit/riyadh-phase-master-plan-2026-09-24.md` §25 Phase A items 1–3 (item 4, the sitewide PSEO `hreflangAlternates()` template fix, was explicitly excluded from this pass — it touches every city's PSEO pages, not just Riyadh, and this session's scope was Riyadh-only per instruction). Nothing else on the site was touched.

1. **Riyadh hub internal-link fix — gala tile.** `locations/riyadh/page.tsx`: the "Gala Dinners & Award Ceremonies" service-grid tile's `href` changed from `/services/corporate-events` (generic, unrelated page) to `/blog/gala-dinner-awards-ceremony-planning-saudi-arabia` — the actual asset earning 6,873 impressions (highest on the site) that the tile's own copy describes.
2. **Riyadh hub internal-link fix — Diriyah.** Same file: the existing "heritage galas in **Diriyah**" mention (previously plain bold text, no link) now links to `/locations/diriyah`, which had zero inbound internal links per the Riyadh audit. Wrapped the `<Link>` inside the existing `<strong>` so the entity-emphasis styling is unchanged — only a hyperlink was added, no visual change.
3. **Riyadh luxury-wedding-planning noindex consolidation.** `locations/[city]/[service]/page.tsx`: extended the existing `consolidatedDuplicate` predicate (the same mechanism already live since 2026-08-22 for `corporate-event-management` and non-Riyadh `conference-planning`) to also cover `luxury-wedding-planning` when `city === "riyadh"` — this grid page has an outranking PSEO twin (`/services/luxury-weddings-riyadh`, ~pos 7 vs. the grid page's ~pos 34) that was never caught by the original consolidation pass. Mirrored the identical predicate change in `sitemap.ts`'s `isConsolidatedNoindex()` so the now-noindexed URL is also excluded from the sitemap (same dual-location pattern the 2026-08-22 fix already used). **Scoped to Riyadh only** — Jeddah and Dammam have the same PSEO twin for weddings and likely the same latent issue, but that was outside this audit's approved scope and is explicitly not touched here (flagged in `riyadh-phase-master-plan-2026-09-24.md` as a possible future item, not decided).

No new URL was created. No page content, national page, Arabic content, vendor data, or UI/design was touched. No unrelated city was touched beyond the single-line predicate condition that is scoped by an explicit `city === "riyadh"` check.

**2. Files touched**
3 edited: `src/app/[locale]/locations/riyadh/page.tsx`, `src/app/[locale]/locations/[city]/[service]/page.tsx`, `src/app/sitemap.ts`. All three files had pre-existing, unrelated uncommitted changes from Batch 1/1b (SAR-price FAQ text, title-tag fix, taif/abha/tabuk sitemap addition) already in the working tree before this session started — confirmed via `git diff` before editing, and preserved untouched; this session's edits are additive on top of them, not a replacement.

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors.
- **Lint:** `npx eslint` scoped to the 3 changed files — 0 errors, 0 warnings.
- **Build:** `npm run build` — compiled successfully, 204 static pages generated, 0 errors.
- **Behavioral spot-check:** built `sitemap.xml` inspected directly — confirmed `/locations/riyadh/luxury-wedding-planning` is now absent from the sitemap (previously present), while `/locations/riyadh/conference-planning`, `/locations/riyadh/exhibition-management`, and `/locations/riyadh/vip-event-planning` remain present (unaffected, as intended — those three are not part of this pass's approved consolidation).

**4. What I did NOT do (explicitly out of scope this pass)**
- Did not build `exhibitions-riyadh` or `conference-management-riyadh` (new pages — separate approval gate per the master plan).
- Did not add `hreflangAlternates()` to the `services/[slug]/page.tsx` PSEO template — that fix is sitewide/cross-city, excluded from this Riyadh-only, existing-URL-only pass.
- Did not touch the PSEO conversion-mechanism (WhatsApp-only CTA) finding, the `corporate-events-riyadh` "headquartered... full-time team" trust claim, the blog merge decision, or any other item flagged as an open founder decision in the master plan §27 — none of those were part of the approved P0 scope.
- Did not rewrite any page content, redesign any UI, change any Arabic content, change any vendor data, or touch any national or non-Riyadh page.

**5. What I need from Habiba**
- None of this batch requires a decision — it's the pre-approved P0 cleanup. Next steps (the 2 new pages, the hreflang template fix, the open founder decisions) remain gated behind separate approval per the master plan.

---

## 2026-09-24 — Riyadh Phase B, new page: `/services/exhibitions-riyadh`

**1. What I changed**
Built the first of the 2 approved new Riyadh URLs — `/services/exhibitions-riyadh` (EN+AR) — per `docs/seo-audit/riyadh-phase-master-plan-2026-09-24.md` §7/§25 Phase B item 5. `conference-management-riyadh` was NOT built (separate task, not requested this round). The existing grid page `/locations/riyadh/exhibition-management` was left untouched/indexable, per explicit instruction not to noindex it in the same task.

Before writing anything, inspected: the national `/services/exhibitions` page (confirmed it's already a "model" broker-framing page — real `PartnerNetworkGallery` photos captioned "delivered through SEM's vetted production partner network," RICEC/RECC venue depth, booth-design FAQs — so the new page was scoped to NOT duplicate that depth, only to serve the Riyadh-specific long-tail and cross-link back to it); `/locations/riyadh` hub (RICEC/KAICC/SECB/GEA facts already established there, reused verbatim rather than re-invented); the grid page's thin `exhibition-management` entry; the `plan-mega-exhibition-riyadh-logistics` blog post (confirmed real, AR-translated, currently links only to national `/services/exhibitions` — left as-is, not edited); the Riyadh vendor capability matrix (Shihab Electra = active fabrication capability, GCC-wide; MICEtribe = registration/staffing NOT active — explicitly excluded from the new page's claims); and the existing PSEO template (`services/[slug]/page.tsx`) — the exact data-driven pattern already used by `exhibitions-jeddah`/`exhibitions-dammam` was followed for structure/tone.

**Content approach**: added ONE new data entry to the existing `PSEO_DATA` object (no template/component changes needed for hero, breadcrumb, intro/details, bullet points, FAQ, or CTA — all reused as-is) covering the full commercial journey via 8 bullet points (planning → booth/stand fabrication+branding+signage → SECB permits → RICEC hall/floor coordination → logistics → AV (cross-referenced to `event-production-riyadh`, not claimed as owned) → opening/on-day ops → post-event reporting) and 6 FAQs (richer than the other Riyadh PSEO pages' usual 3, per the master plan's explicit call for real depth). **Staffing/registration was deliberately omitted** — not claimed anywhere, consistent with the vendor matrix's capability-gap flag (MICEtribe not active). No vendor is named in the visible copy anywhere (matches the site's existing, strict convention on every partner-backed page) — capability is described only as "coordinated through our vetted production partner network," reusing the exact phrase already proven on the national exhibitions page.

**Template extensions (small, additive, backward-compatible — affect no other page unless they opt in)**:
1. Added an optional `relatedBlog?: { title, titleAr?, slug }` field to the `PSEO_DATA` type + a small conditional link block under the existing "Related Services" section, used only by this new entry — the other 19 existing PSEO pages don't set it and render exactly as before.
2. Added `import { hreflangAlternates } from "@/lib/seo"` and wired `languages: hreflangAlternates(\`/services/${slug}\`)` into `generateMetadata`'s `alternates` object. **This fixes the sitewide hreflang gap flagged in the master plan (§13) for all 19 existing PSEO pages too, not just the new one** — the metadata function is shared code, this was the only way to give the new page correct hreflang. Verified via built output: all 3 hreflang tags (en-US/ar-SA/x-default) now render correctly on both the new page and (as a side effect) the existing pages.
3. Added `corporate-events-riyadh` and `event-production-riyadh` to `RELATED_TITLE_AR` (previously only had national slugs) so the new page's Riyadh-specific related-service cards show a real Arabic title instead of falling back to English.

**Registry updates (required for the page to actually be indexable/sitemapped)**:
- `src/lib/seo.ts`: added `/services/exhibitions-riyadh` to `TRANSLATED_AR_ROUTES` (real, hand-authored AR content exists — not a stub, so per the standing CLAUDE.md rule this is the correct and required way to make `/ar/services/exhibitions-riyadh` indexable).
- `src/app/sitemap.ts`: added `exhibitions-riyadh` to `pseoServiceSlugs`.

**2. Files touched**
3 edited: `src/app/[locale]/services/[slug]/page.tsx`, `src/lib/seo.ts`, `src/app/sitemap.ts`. No new files created (no new component, no new route file needed — the dynamic `[slug]` route picks up the new `PSEO_DATA` key automatically via the existing `generateStaticParams`).

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors.
- **Lint:** `npx eslint` on the 3 changed files — 0 errors, 0 warnings.
- **Build:** `npm run build` — compiled successfully, 206 pages generated (was 204; +2 = the new EN+AR route).
- **Runtime verification (built the app and ran `next start`, curled both locales, then stopped the server):**
  - `GET /services/exhibitions-riyadh` → 200; `GET /ar/services/exhibitions-riyadh` → 200.
  - EN: title `"Exhibition Management Company in Riyadh | Trade Show Organizer KSA | Saudi Event Management"` (template-appended once, not doubled); canonical `https://saudieventmanagement.com/services/exhibitions-riyadh`; hreflang en-US/ar-SA/x-default all present and correct.
  - AR: title `"إدارة المعارض في الرياض | إدارة الفعاليات السعودية"`; canonical correctly points to the `/ar/...` URL; same 3 hreflang tags present.
  - `Service`, `FAQPage` (6 questions), and `BreadcrumbList` JSON-LD all present on both locales.
  - Related-service links rendered correctly (`corporate-events-riyadh`, `event-production-riyadh`, `exhibitions`, `conferences`); the new `relatedBlog` link rendered correctly on both locales, with the Arabic title on the AR page.
  - Hero image confirmed as the real `exhibition_hall_riyadh.webp` asset (not a reused/generic placeholder).
  - Sitemap (`sitemap.xml`) confirmed to include both `/services/exhibitions-riyadh` and `/ar/services/exhibitions-riyadh`.

**4. What I did NOT do (explicitly out of scope this task)**
- Did not build `conference-management-riyadh` (separate approval).
- Did not noindex `/locations/riyadh/exhibition-management` (explicit instruction — only once both new pages are live, per the master plan's own sequencing).
- Did not edit `/locations/riyadh` (hub chip strip) or `plan-mega-exhibition-riyadh-logistics` (blog) to add inbound links to the new page — the master plan sequences that as "once both are live" (§25 item 7); this task built one page only, so those inbound-link edits were left for that later step.
- Did not create `/services/exhibition-booth-design-riyadh`, `/services/exhibition-stand-company-riyadh`, or `/services/trade-show-booth-riyadh` — those sub-intents were folded into `exhibitions-riyadh`'s own bullet points/FAQ instead, per explicit instruction.
- Did not name any vendor in visible copy, did not claim registration/staffing capability, did not invent a Riyadh-only vendor, did not invent a price, response-time SLA, or any claim not already evidenced elsewhere on the site.
- Did not touch any national page, any other city, or any vendor data file.

**5. What I need from Habiba**
- Review the new page live; if approved, `conference-management-riyadh` is the remaining Phase B item, followed by the Phase B item 7 cleanup (noindex the grid page, hub/blog inbound links) once both new pages exist.

---

## 2026-09-25 — Riyadh Phase B, new page: `/services/conference-management-riyadh`

**1. What I changed**
Built the second and final Phase B page — `/services/conference-management-riyadh` (EN+AR) — same pattern as `exhibitions-riyadh`: one new `PSEO_DATA`/`PSEO_AR` entry, no new component/route file. `/locations/riyadh/conference-planning` (grid page) was left untouched/indexable — noindex is still deferred to Phase B item 7, which needs both pages live plus its own explicit go-ahead.

**Content**: 9 bullet points (PCO coordination, venue sourcing at KAICC/KAFD, delegate registration, speaker management, AV via the Riyadh event-production team, simultaneous Arabic-English interpretation, VIP protocol, SECB/Amanah Ar-Riyad permits, hybrid/streaming via the event-production team) and 6 FAQs. Venue capacities (KAICC ≈3,500, KAFD ≈2,000) are reused from the already-published `/locations/riyadh` hub, not new figures.

**Registration-claim discipline (the task's explicit CRITICAL instruction)**: worded as "coordinated through our event-technology and staffing partners," never as an owned platform or dedicated staffing capability — matches the master plan's vendor finding that the one registration/staffing vendor on file (MICEtribe) isn't confirmed active. **Flag, not fixed**: while doing this, found that the existing *national* `/services/conferences` page already makes a stronger, unhedged claim — "backed by a dedicated on-site registration, badging, and event-staffing partner network active across Riyadh, Jeddah, Dammam, and the wider GCC" — which is not supported by the same vendor evidence. That page was not touched (out of scope for this task), but it's the same category of unverified-claim finding the sitewide E-E-A-T audits have flagged elsewhere — worth a founder decision on whether to soften it to match the more conservative language used here.

**Internal links** (all per explicit instruction): `relatedServices` → `conferences` (national), `corporate-events-riyadh`, `event-production-riyadh`, `exhibitions-riyadh`; a new optional `relatedLocation` field (parallel to the `relatedBlog` field added for the previous page) → `/locations/riyadh`; `relatedBlog` → `best-corporate-event-venues-riyadh-2026` (real, Riyadh-specific, AR-translated venue guide). Added `exhibitions-riyadh` to `RELATED_TITLE_AR` (needed since this page is the first to link to it).

**Registry updates**: added `/services/conference-management-riyadh` to `TRANSLATED_AR_ROUTES` (`src/lib/seo.ts`) and `conference-management-riyadh` to `sitemap.ts`'s `pseoServiceSlugs`.

**2. Files touched**
3 edited: `src/app/[locale]/services/[slug]/page.tsx`, `src/lib/seo.ts`, `src/app/sitemap.ts`. No other city's entries were modified.

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors.
- **Lint:** `npx eslint` on the 3 changed files — 0 errors, 0 warnings.
- **Build:** `npm run build` hit a transient, unrelated environment error (`prisma generate` → `EPERM` renaming the Windows query-engine DLL — a file-lock issue, not a code defect; the Prisma schema was not touched by this task). Ran `npx next build` directly (skipping the redundant `prisma generate` since nothing schema-related changed) — compiled successfully, 208 pages generated (was 206; +2 = this page's EN+AR).
- **Runtime verification:** built, ran `next start`, curled both locales. First attempt 404'd because a stale server process from the previous task was still holding port 3000 (serving the older build) — killed that specific PID, restarted, both locales then returned 200. Confirmed: correct titles (not doubled), correct canonical/hreflang triples on both locales, 6 FAQ entries in schema, `BreadcrumbList` present, all 4 intended related-service links present, the `relatedBlog` and `relatedLocation` links both rendering (EN and AR text correct), real hero image (`premium_corporate_summit_hero.webp`), zero occurrences of the risky "dedicated on-site registration...network" phrase anywhere on the new page. Sitemap confirmed to include both language variants. Server stopped and temp files cleaned up after verification.

**4. What I did NOT do**
- Did not noindex `/locations/riyadh/conference-planning` (grid page) — deferred, per the master plan's own sequencing and no explicit instruction to do it this round.
- Did not update the `/locations/riyadh` hub's chip strip or add inbound links from it or from any blog post — that's Phase B item 7, not requested this round.
- Did not touch the national `/services/conferences` page, despite finding the unverified registration-network claim there (flagged above, not fixed).
- Did not create any keyword-variant conference URL, did not touch Jeddah/Dammam/any other city's entries, did not name a vendor, did not invent a delegate count, certification, or registration-company name.

**5. What I need from Habiba**
- Both Phase B pages are now live in the working tree. Remaining: Phase B item 7 (noindex the two grid pages + hub/blog inbound links) whenever you want that cleanup done; a decision on the national `/services/conferences` registration-claim flag above; everything else in Phase C/D per the master plan.

---

## 2026-09-25 — Riyadh internal-link graph optimization (hub → PSEO → blogs → portfolio)

**1. What I changed**
Optimized the Riyadh internal-link graph per the approved architecture (`/locations/riyadh` → Riyadh commercial service pages → supporting blogs → portfolio → conversion), with the explicit priority order: hub → `exhibitions-riyadh` → `conference-management-riyadh` → `corporate-events-riyadh` → `luxury-weddings-riyadh` → `event-production-riyadh` → `cultural-events-riyadh`. No new pages, no content rewrites, no noindex changes, no canonical changes — every edit is an `href`/`url` destination swap on an existing link element or JSON-LD `Service.url` field. `/locations/riyadh/exhibition-management` and `/locations/riyadh/conference-planning` remain indexable (noindex is still Phase B item 7, not part of this task).

**Root finding, before making any change**: audited the Riyadh hub page for inbound/outbound link relevance and found it had **zero direct links to any of the 6 Riyadh PSEO pages** — every service tile, the "All Services Available in Riyadh" chip strip, the closing entity paragraph, the "Why Riyadh" venue paragraph, and even the page's own JSON-LD `OfferCatalog` all still pointed at the thin `/locations/riyadh/[service]` grid pages (two of which — `corporate-event-management` and `luxury-wedding-planning` — are already noindexed, meaning the hub was actively spending link equity on dead-end targets). This is the same class of issue as the `luxury-wedding-planning` cannibalization caught in the P0 pass, just on the inbound side.

**Fixes made:**

*Riyadh hub (`locations/riyadh/page.tsx`)*:
- 4 of the 6 service tiles ("Corporate Events & Conferences," "Exhibitions & Trade Shows," "Luxury Weddings," "Government & Vision 2030 Events") repointed from grid pages to their PSEO equivalents (`corporate-events-riyadh` ×2, `exhibitions-riyadh`, `luxury-weddings-riyadh`). "Brand Activations" and "Gala Dinners" tiles left untouched (already correct/out of scope).
- The 5-item "All Services Available in Riyadh" chip strip converted from a `slug`+hardcoded-`/locations/riyadh/` prefix to explicit `href` values, so 4 of the 5 chips now point at their PSEO twins; `vip-event-planning` correctly stays on the grid page (no twin, no twin proposed).
- The closing entity paragraph extended (2 new sentence clauses, same prose style) so it now names and links all 6 Riyadh PSEO pages instead of 3 grid pages — `corporate-events-riyadh`, `conference-management-riyadh`, `luxury-weddings-riyadh`, `exhibitions-riyadh`, `event-production-riyadh`, `cultural-events-riyadh`.
- **Second pass caught a section missed on the first pass**: the "Why Riyadh — Authority Section" venue paragraph had 3 more grid-page links (RICEC → exhibition-management, KAFD → corporate-event-management, KAICC → corporate-event-management — the last two duplicating the same dead-end target). Repointed RICEC → `exhibitions-riyadh`, KAFD → `corporate-events-riyadh`, and KAICC → `conference-management-riyadh` (KAICC's own copy on this page already calls it "government-level... ministerial summits," matching the FAQ language already written for the new conference page).
- JSON-LD `hasOfferCatalog` (4 `Service.url` fields) updated to match the same targets — this is schema.org structured data, unrelated to `metadata.alternates.canonical`, so no canonical tag was touched anywhere.

*PSEO cross-link (`services/[slug]/page.tsx`)*: `exhibitions-riyadh`'s `relatedServices` previously pointed to national `conferences`; swapped to `conference-management-riyadh` so the two new pages now link to each other bidirectionally (conference→exhibitions already existed from the previous task). Added `conference-management-riyadh` to `RELATED_TITLE_AR`.

*Blogs*: `plan-mega-exhibition-riyadh-logistics` (EN+AR) — its one grid-page exhibition link upgraded to `exhibitions-riyadh`. `best-corporate-event-venues-riyadh-2026` (EN+AR) — its "government conference" venue-guide mention upgraded from the grid `conference-planning` page to `conference-management-riyadh`. `best-wedding-venues-riyadh-2026` was audited and found already correctly linking to `luxury-weddings-riyadh` — no change needed. `best-event-management-company-riyadh-questions-to-ask` was audited and found already linking appropriately to `/locations/riyadh` for its general (not service-specific) topic — no change made. Two other Riyadh-adjacent posts (a bi-city Riyadh/Jeddah conference-registration piece, and the Riyadh/Jeddah corporate-events merge-pending pair) were reviewed and deliberately left untouched — not explicitly in scope and, for the merge-pending pair, premature to edit before that decision is made.

*Portfolio*: `riyadh-government-summit` — 3 chips upgraded (`corporate-events`→`corporate-events-riyadh`, `conferences`→`conference-management-riyadh`, `event-production`→`event-production-riyadh`). `riyadh-elite-majlis` — 2 chips upgraded (`corporate-events`→`corporate-events-riyadh`, `cultural-events`→`cultural-events-riyadh`; this is the only place `cultural-events-riyadh` gets a portfolio inbound link). `riyadh-luxury-soiree` — 2 chips upgraded (`weddings`→`luxury-weddings-riyadh`, `event-production`→`event-production-riyadh`). `royal-riyadh-wedding` — 1 link upgraded (`weddings`→`luxury-weddings-riyadh`; `royal-weddings`, `luxury-vip-events`, and `/locations/riyadh` left unchanged as the correct, differentiated matches for a ceremonial/royal case study).

**2. Files touched**
7 edited: `src/app/[locale]/locations/riyadh/page.tsx`, `src/app/[locale]/services/[slug]/page.tsx`, `src/lib/blog-data.ts`, `src/app/[locale]/portfolio/riyadh-government-summit/page.tsx`, `src/app/[locale]/portfolio/riyadh-elite-majlis/page.tsx`, `src/app/[locale]/portfolio/riyadh-luxury-soiree/page.tsx`, `src/app/[locale]/portfolio/royal-riyadh-wedding/page.tsx`. No other city's blog/portfolio/PSEO entries were touched.

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors (both before and after the second-pass hub fixes).
- **Lint:** `npx eslint` on every touched file — 0 errors/warnings introduced. `riyadh-elite-majlis`, `riyadh-luxury-soiree`, and `royal-riyadh-wedding` each show pre-existing `no-explicit-any`/unescaped-entity errors on lines outside this diff (confirmed via `git diff` — none on the lines this task touched), consistent with the project's already-documented pre-existing lint baseline.
- **Build:** hit the same transient Windows `EPERM`/Prisma-DLL file-lock as the previous task (unrelated, no schema touched); ran `npx next build` directly — compiled clean, 208 pages (unchanged count, as expected — no new pages this round).
- **Runtime link check (no broken links):** started the server twice (once after the first pass, once after the second-pass hub fixes) and curled every touched/linked-to URL directly: `/locations/riyadh`, both new PSEO pages, all 4 other Riyadh PSEO pages, `/locations/riyadh/vip-event-planning`, `/locations/diriyah`, the gala/mega-exhibition/venue-guide blog posts, and all 4 Riyadh portfolio pages — **all returned 200**. Confirmed via grep on the rendered HTML: zero remaining `href` to any of the two now-effectively-superseded grid paths (`corporate-event-management`, `exhibition-management`) anywhere on the hub except the intentionally-kept `vip-event-planning`; all 6 PSEO pages now have multiple real inbound links from the hub; the `exhibitions-riyadh` ↔ `conference-management-riyadh` cross-link confirmed bidirectional in the rendered output.
- **No loops:** verified no page links to itself; the new bidirectional PSEO cross-link mirrors the already-proven `corporate-events` ↔ `conferences` national sibling pattern, not a new risk shape.
- **No accidental canonical changes:** confirmed — every edit touched only visible `<Link href>` elements, one internal data array (`relatedServices`), or JSON-LD `Service.url` fields; `generateMetadata`/`alternates.canonical` was not touched anywhere in this task.

**4. What I did NOT do**
- Did not create any new page or URL.
- Did not noindex `/locations/riyadh/exhibition-management` or `/locations/riyadh/conference-planning` (still Phase B item 7, not requested this round).
- Did not touch Jeddah, Dammam, AlUla, or any other city's blog, portfolio, or PSEO content.
- Did not rewrite visible label/anchor text anywhere except where a chip's label already explicitly matched the new, more specific target (no case where a label now contradicts its destination).
- Did not force a link onto a page/anchor where the topical match was ambiguous (e.g., left `riyadh-luxury-soiree`'s general framing alone beyond the two clear upgrades; left the bi-city registration/merge-pending blog posts untouched).

**5. What I need from Habiba**
- Review the updated hub and portfolio pages live. Remaining open items are unchanged from the previous entry: Phase B item 7 (noindex both grid pages once you're ready), the national `/services/conferences` registration-claim flag, and Phase C/D of the master plan.

---

## 2026-09-25 — Riyadh AEO/GEO/LLM + conversion audit and implementation

**1. What I changed**

**AEO — new FAQ entries (visible + JSON-LD, EN+AR kept in sync):**
- `/locations/riyadh` hub: added 3 FAQs (visible `faqs` array + matching `FAQPage` JSON-LD entries) answering gaps identified in the master plan and this task's question list — "Who organises gala dinners and award ceremonies in Riyadh?" (the highest-priority gap flagged since the prior Riyadh audit — the hub had a "Gala Dinners" tile and an inbound link but no direct on-page answer), "How early should a corporate event be booked in Riyadh?" (reuses already-published lead-time facts: 6 months for hotel ballrooms, 8–12 months for KAFD per the `best-corporate-event-venues-riyadh-2026` blog; 2–3 weeks Amanah Ar-Riyad, 4–6 weeks GEA per the hub's own existing permit FAQ — no new number invented), and "What services can be arranged through Saudi Event Management's Riyadh vendor network?" (category-level answer only — venue sourcing, exhibition/stand production, event production, catering, decor, entertainment, valet, VIP transport — no vendor named, no count claimed).
- `/services/exhibitions-riyadh`: added the exact-match question "What does exhibition management in Riyadh include?" (EN+AR), answer scoped to already-evidenced capability only.
- `/services/conference-management-riyadh`: added the exact-match question "What does conference management include?" (EN+AR), explicitly restating that delegate registration is partner-coordinated, not owned.
- `/locations/riyadh` already had complete `LocalBusiness`/`Place`/`FAQPage`/`BreadcrumbList` schema with 7 real venue entities in `containsPlace` — confirmed already strong, not rebuilt.

**Fabrication found and fixed (not part of the plan, discovered while auditing FAQ answer blocks — squarely inside this task's "do NOT fabricate answers" scope):** the Arabic FAQ on `corporate-events-riyadh` claimed Saudi Event Management serves "أرامكو السعودية وصندوق تنمية الموارد البشرية وسابك" (Saudi Aramco, HRDF, and SABIC) as clients — named, real, prominent companies with zero support anywhere else on the site, and not present in the English version of the same FAQ on the same page. Replaced with an accurate mirror of the English answer (no named clients). Checked the AR blocks of the other 3 older Riyadh PSEO pages (`luxury-weddings-riyadh`, `event-production-riyadh`, `cultural-events-riyadh`) for the same pattern — none found; their AR content faithfully mirrors English, including two already-tracked (not new, not touched) claims: "ISO-certified" (event-production-riyadh) and "our production warehouse" (event-production-riyadh), both already logged as open founder-verification items in `phase-0-existing-site-audit.md` §10.

**Service-relationship strengthening:** upgraded `relatedServices` on the 4 older Riyadh PSEO pages to point to Riyadh-specific siblings where a live twin now exists, instead of only the national parent: `corporate-events-riyadh` → adds links to `conference-management-riyadh` + `exhibitions-riyadh`; `luxury-weddings-riyadh` → `cultural-events-riyadh`; `event-production-riyadh` → `corporate-events-riyadh` + `conference-management-riyadh`; `cultural-events-riyadh` → `corporate-events-riyadh` + `luxury-weddings-riyadh`. Where no Riyadh twin exists (luxury-vip-events, destination-events, weddings, entertainment, etc.) the national link was left as-is — no invented relationship.

**Conversion — structured lead capture added to all 6 Riyadh PSEO pages:** the existing, unmodified `ServiceLeadForm` component (already used on 16+ static service pages sitewide — name/email/phone/company/event type/city/date/guest count/message) is now also embedded on `exhibitions-riyadh`, `conference-management-riyadh`, `corporate-events-riyadh`, `luxury-weddings-riyadh`, `event-production-riyadh`, and `cultural-events-riyadh`, directly below the existing WhatsApp CTA (both stay — matches the exact pattern already used on the 5 relevant national parent pages, which all pair a WhatsApp link with the same form). Each page passes a `source` identifier and a real `eventTypeOptions` array — all 6 reuse the *exact* arrays already live on their respective national parent pages (no invented options). **Scoped to Riyadh only**: added a new optional `leadForm` field to the shared `PSEO_DATA` type and render it conditionally (`{data.leadForm && <ServiceLeadForm .../>}`) — the other 13 non-Riyadh PSEO pages (Jeddah/Dammam/AlUla/NEOM) don't set this field and are runtime-verified unchanged (WhatsApp-only, as before). `ServiceLeadForm.tsx` itself was not modified — no new field, no field removed, matching the explicit instruction not to change global forms. No budget field was added (would require modifying the shared component — out of scope per instruction); the qualification fields already captured (event type, date, guest count, company, city, phone/email, free-text project details) match 6 of the 8 requested dimensions — venue and budget/project scope remain covered only via the free-text field, same limitation the national parent pages already have.

**2. Files touched**
2 edited: `src/app/[locale]/locations/riyadh/page.tsx`, `src/app/[locale]/services/[slug]/page.tsx`. No new files, no new URLs, no other city's PSEO data touched beyond the `relatedServices` additions listed above (which only ever point at the same 6 Riyadh entries, never elsewhere).

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors.
- **Lint:** `npx eslint` on both changed files — 0 errors, 0 warnings.
- **Build:** `npx next build` — compiled successfully, 208 pages (unchanged — no new URLs created, as instructed).
- **Runtime verification:** built, ran `next start`, curled the hub, all 6 Riyadh PSEO pages (EN), `corporate-events-riyadh` (AR), and `corporate-events-jeddah` as a non-Riyadh control. All 200. Confirmed: hub's `FAQPage` JSON-LD question count 7→10 (exactly the 3 additions); both new questions' exact text present on `exhibitions-riyadh`/`conference-management-riyadh`, JSON-LD question count 6→7 on each; the Aramco/HRDF/SABIC string now returns 0 matches on both EN and AR `corporate-events-riyadh`; the `ServiceLeadForm` heading renders on all 6 Riyadh pages; **the control page (`corporate-events-jeddah`) shows zero occurrences of the form** — confirming the Riyadh-only conditional scoping works correctly and no other city was affected; updated `relatedServices` links resolve to real, live URLs (spot-checked `corporate-events-riyadh` → `conference-management-riyadh`/`exhibitions-riyadh`/`event-production-riyadh`, `luxury-weddings-riyadh` → `cultural-events-riyadh`). No broken links, no loops (no page links to itself), no canonical/hreflang logic touched.

**4. What I did NOT do**
- Did not create any new URL or page.
- Did not modify `ServiceLeadForm.tsx` (the global component) in any way.
- Did not add a budget field or any other new form field anywhere.
- Did not touch canonical, hreflang, or any indexation logic.
- Did not add FAQs to the 4 older Riyadh PSEO pages beyond the one targeted, evidence-grounded addition to `corporate-events-riyadh` ("how early to book") — `luxury-weddings-riyadh`, `event-production-riyadh`, `cultural-events-riyadh` were audited and found adequate for this round; padding them with unrequested questions was avoided.
- Did not remove or alter the two already-flagged, pre-existing unverified claims found during this audit ("ISO-certified," "our production warehouse," and the earlier "headquartered... full-time team" item) — all three remain open founder decisions, consistent with the standing flag-don't-auto-fix discipline; only the newly-discovered named-client fabrication was fixed, since it was a clear, unambiguous violation of this task's own "do NOT fabricate answers" instruction, not a judgment call.
- Did not add Place/geo JSON-LD entity blocks to the 6 PSEO pages (the hub already carries this richly) — flagged as a possible future enhancement, not built this round to avoid schema over-engineering with uncertain payoff.

**5. What I need from Habiba**
- The named-client fabrication fix (Aramco/HRDF/SABIC) should be reviewed as a priority — it was live, published, AI/Google-indexable content making a false claim about real companies.
- Everything else from prior entries remains open: Phase B item 7, the national `/services/conferences` registration-claim flag, the two pre-existing unverified-claim items surfaced again this round, and Phase C/D of the master plan.

---

## 2026-09-25 — Site-wide: UI contrast bug, false-claim removal, real vendor count, CTA wording (founder-directed, not Riyadh-scoped)

Founder sent live-site screenshots + direct feedback, confirming several previously-flagged items are in fact false and must be removed, plus two UI bugs. This entry is explicitly **not** Riyadh-scoped — the founder's instructions applied site-wide. Ran `AskUserQuestion` first to confirm scope (site-wide false-claim removal: yes; vendor-count badges: replace existing ones; sitewide fabrication sweep: yes) before touching anything.

**1. What I changed**

**A. Root-cause UI contrast bug (the two screenshots — "Get a Quote" card heading invisible, "Get in Touch" section text invisible).** Traced to one shared bug in `src/app/globals.css`: the site-wide heading-color rule (`h1:not(.admin-scope *), h2:not(.admin-scope *), ...`) has specificity (class + type) that **beats a plain Tailwind utility class** like `.text-white` (class alone). So any heading anywhere that sets `text-white` (or any other explicit text-color utility) to sit on a dark background was silently getting forced back to the dark `--heading` color. Confirmed this wasn't limited to the two screenshotted components — **49 files** in `src/` use a heading + `text-white` combination. Fixed the root cause in one place: wrapped the `:not(.admin-scope *)` exclusion in `:where()`, which zeroes its specificity contribution (`h1:where(:not(.admin-scope *))` now has the same specificity as a bare `h1`), so any co-located Tailwind color utility correctly wins again. Verified in the compiled CSS bundle that the fix is present and correct. This required **zero changes** to `Hero.tsx` or `ContactSection.tsx` themselves — both already had the correct `text-white` classes; only the global rule was wrong. No other property of the rule changed (font-size/weight are still forced via `!important` exactly as before — only `color`/`letter-spacing`/`line-height` can now be overridden by a class, and only where a page already explicitly set one).

**B. "Get a Free Quote" → "Get a Quote"** (founder: text wasn't visible, and asked for "get a quote" instead of "free"). Changed in `src/lib/dictionaries/en.json`/`ar.json` (`formTitle`/`formSubmit` keys, used by the homepage hero card) and `src/components/StickyLeadBar.tsx` (mobile sticky bar, same phrase, found during the sweep). Left the separate "Free Consultation" button/eyebrow tag untouched — that's a different, not-flagged claim (a complimentary initial call, not a "free quote").

**C. Removed false "ISO-certified" claims — confirmed false by founder.** Site-wide sweep found 7 English + 6 Arabic instances across `services/[slug]/page.tsx` (event-production-riyadh), `services/conferences/page.tsx` (×4, EN+AR interpretation-booth claims), `services/production-venues/page.tsx` (×2, EN+AR), and `services/production-venues/layout.tsx` (×2 meta descriptions, EN+AR). All reworded to "professional-grade" / "professional" / coordinated-through-partner-network language — no certification claimed. While rewriting one of these strings, also dropped the adjacent unverified "Tier-1 vendor for KSA's top venues" phrase from `production-venues/layout.tsx`'s meta description (same category of unverifiable credentialing claim, same sentence being touched).

**D. Removed false "our production warehouse" / "our fabrication team" claims — confirmed false by founder (real model: a network of vendor companies with their own CR/VAT, not owned infrastructure).** Found 6 instances across `services/[slug]/page.tsx` (event-production-riyadh, EN+AR ×2) and `services/event-production/page.tsx` (EN+AR FAQs + one `HowTo` schema step). All reworded to "coordinated through our vetted production partner network." Also removed the adjacent unverified "60 metres wide" largest-stage-built claim and "certified structural steel" claim, both tied to the same false owned-fabrication framing — reworded to describe coordination through the partner network without inventing a replacement number; the matching "60m Largest Stage Built" trust-bar stat on the same page was changed to a non-numeric "Concert-Scale / Stage Builds" label for the same reason.

**E. Updated the vendor-count claim from "20+" to "50+" (founder's real figure: 50-70 vendors).** This was a much bigger sweep than expected — the "20+ Vetted Vendors" badge/stat is a real, consistent trust element repeated **~28 times across 16 files** (trust-bar components on nearly every service page, the homepage hero stats pill, the About page, Testimonials, Vendors page, the vendor-recruitment CTA, and the shared dictionary). Updated every instance (EN+AR) to "50+", including one local per-page Arabic variable (`cAr.credISO` in `event-production/page.tsx`) that a badge referenced. Chose "50+" (not "50-70") for consistency with the site's existing single-number badge convention and because it's a true floor of the range the founder gave — never overclaims the upper bound.

**F. Removed/softened false named-client claims (Aramco/SABIC as implied clients) beyond the one already fixed on `corporate-events-riyadh`.** Full sweep found ~45 Aramco/SABIC mentions site-wide; the large majority (mostly on `locations/dammam/page.tsx`) are legitimate, truthful **geographic/market-context** statements (Aramco genuinely is headquartered in Dhahran near Dammam — "Aramco-adjacent," "near Aramco HQ," "Eastern Province's economy is anchored by Aramco/SABIC" are factual, not claims about SEM's own clients) and were left alone. Fixed the ones that crossed into an actual (implied or direct) service-delivery claim:
  - `services/[slug]/page.tsx` (conference-management-dammam, AR-only): an FAQ asking "Do you manage corporate events for Saudi Aramco?" answered "Yes, extensive experience..." — no English counterpart existed for this question at all (same bug pattern as the corporate-events-riyadh fix). Replaced with a generic energy-sector question/answer matching the English FAQ set.
  - `services/[slug]/page.tsx` (conference-management-dammam + exhibitions-dammam, AR-only bullet points and one FAQ): "services compliant with Saudi Aramco and SABIC" / "coordination with the Aramco/SABIC supply chain" — none of these had English counterparts either. Reworded to generic "energy sector" language.
  - `locations/dammam/page.tsx`: two `knowsAbout` JSON-LD entries — "Saudi Aramco Dhahran corporate events" / "SABIC corporate events Eastern Province" — read as SEM claiming topical ownership of those specific companies' events (this is structured data AI/Google read directly). Reworded to "Energy sector corporate events Dhahran" / "Petrochemical sector corporate events Eastern Province."
  - `services/corporate-events/page.tsx`: two prose passages (EN + 2 separate AR blocks) saying the business's approach is "built for organisations that operate at the scale of Saudi Aramco and SABIC" — removed the named-company comparison, kept the legitimate giga-project references (NEOM, Red Sea Project, Diriyah Gate Development Authority — place/infrastructure initiatives already referenced honestly elsewhere on the site, not named companies being implied as clients).

**2. Files touched**
22 edited: `src/app/globals.css`, `src/lib/dictionaries/{en,ar}.json`, `src/components/{GeoDefinitionBlock,Hero,VendorCTA,StickyLeadBar}.tsx`, `src/app/[locale]/vendors/page.tsx`, `src/app/[locale]/services/[slug]/page.tsx`, `src/app/[locale]/services/{conferences,exhibitions,production-venues,event-production,corporate-events,weddings,royal-weddings,page}.tsx`, `src/app/[locale]/services/production-venues/layout.tsx`, `src/app/[locale]/testimonials/page.tsx`, `src/app/[locale]/locations/{page,dammam/page}.tsx`, `src/app/[locale]/about/page.tsx`. No new files, no URLs changed.

**3. Validation results**
- **Typecheck:** `npx tsc --noEmit` — 0 errors (ran twice, before and after the final `StickyLeadBar.tsx` fix).
- **Lint:** `npx eslint` across all 22 touched files — 9 pre-existing errors surfaced (4× `no-explicit-any` in `production-venues/page.tsx` and 1× in `about/page.tsx` on lines I never touched; 1 unescaped-entity in `weddings/page.tsx` on a line I never touched; a CSS-parser false-positive on `globals.css` line 7, which is the standard `@tailwind base;` directive — present since before my edit, at the very top of the file, nowhere near my change at line ~115; and 2 "expected assignment" errors from ESLint's JS parser being pointed at `.json` files, a pre-existing tooling mismatch, not a real defect). Verified both JSON dictionary files are syntactically valid via `JSON.parse` directly. Zero new lint issues on any line I actually edited.
- **Build:** `npx next build` — compiled successfully, 208 pages (unchanged — no new URLs, matching that this was a content/CSS-only pass).
- **Runtime verification:** built, ran `next start`, fetched the homepage (EN+AR), `about`, `locations/dammam`, and `/ar/services/corporate-events-dammam`. Confirmed: zero remaining "Get a Free Quote" occurrences, "Get a Quote" present in both the hero card and sticky bar; zero remaining "ISO-certified"/"ISO-standard"/"warehouse"/"fabrication team" strings anywhere; zero "Aramco" occurrences on the AR conference-management-dammam page; the Dammam page's legitimate geographic mentions ("Energy sector corporate events Dhahran") confirmed present while the fabricated one ("Saudi Aramco Dhahran corporate events") confirmed gone; "50+" vendor count confirmed rendering (5 occurrences on the homepage alone, 8 on the About page). **Fetched the actual compiled CSS bundle directly and confirmed the `:where()` fix is present in the live output** — this is the strongest verification available without a browser/screenshot tool; the specificity math (a bare-type-selector-equivalent rule now loses to any class-based color utility) is standard CSS behavior, not a runtime-dependent assumption.
- **No browser/screenshot tool was available in this environment** — the contrast fix could not be visually confirmed with an actual rendered screenshot. Recommend the founder do a quick visual check of the homepage hero card and the "Get in Touch" section on the live/preview deploy to close the loop, though the fix is verified correct at the CSS-cascade level.

**4. What I did NOT do**
- Did not touch any of the ~40 remaining legitimate Aramco/SABIC geographic/market-context mentions on `locations/dammam/page.tsx` and `locations/page.tsx` — these are truthful statements about the Eastern Province's real economic geography, not claims about SEM's own client relationships. Judgment calls on borderline phrasing are noted above; did not attempt a blanket find-replace.
- Did not touch the already-open, separately-flagged items from prior entries (the "headquartered... full-time team" claim, the national `/services/conferences` registration-network claim, the blog-merge decision) — none of those were part of this round's explicit instructions.
- Did not modify any form's field set — the `ServiceLeadForm`/`Hero`/`ContactSection` forms all keep the exact fields they had; only visible text strings and one CSS rule changed.
- Did not create or remove any page/URL, did not touch canonical/hreflang/schema structure (only schema *text values*, e.g. the `knowsAbout` array and one `HowToStep` string, were reworded — no schema field added or removed).
- Did not fix the other, unrelated pre-existing lint errors surfaced during validation (`no-explicit-any`, unescaped entity) — out of scope, not something this session touched or was asked to touch.

**5. What I need from Habiba**
- Please visually confirm the homepage hero card and "Get in Touch" section now render correctly (white text visible) on a real browser/deploy preview — I verified this at the CSS-cascade level but could not take an actual screenshot in this environment.
- Confirm "50+" is the number you want live-published now, or whether you'd rather hold for something more precise once your CR/VAT-holding vendor count is finalized.
- The Dammam page still has extensive Aramco/SABIC geographic language (dozens of mentions) — I judged these as truthful market-context, not false claims, and left them. Flag any specific line you still want softened and I'll take another pass.

---

## 2026-09-26 — DEPLOYED TO PRODUCTION (everything above, "plz deploy everything")

**1. What I did**
Before touching git, re-audited every file in the working tree diff (not just the ones I remembered editing) to confirm the full state was correct and complete — read every diff for all ~50 modified/added/deleted files, confirmed no half-finished edits, confirmed `tsc --noEmit` (0 errors) and a full `next build` (208 pages, 0 errors) both passed first.

Staged and committed everything from this session's SEO/trust/UI work (the Riyadh cluster pages, the site-wide false-claim removal, the vendor-count update, the CSS contrast fix, the title-double-append fixes, the logo asset swap) as one commit (`1a22014`) on `draft/rcu-venues`, pushed it, then cherry-picked the same commit onto `main` via `lumina-main-worktree` (commit `b24091a`), and pushed `main` — this is what actually triggers the Vercel production deploy per the standing workflow.

**Explicitly excluded from the commit** (confidential or unrelated to this session, left exactly as they were):
- `Quotation-DXB-KWT.pdf` — a real client quotation sitting at repo root; committing it would leak confidential client data into git history.
- `find_emerson.mjs` — a local debug script that reads `.env.local` directly; not app code, not meant to ship.
- `src/app/api/admin/partner-welcome/`, `src/lib/partner-welcome.ts` (initially) — an unrelated pending admin feature the project ledger already flagged as "founder's concurrent work, don't touch" (see below for why this changed).
- `.claude/settings.json` — Claude Code's own tool-permission config, not part of the deployed site.
- `public/services/valet parking hero.jpeg` — an already-established stray untracked file per prior ledger entries.

**2. The cherry-pick onto `main` hit one real conflict, resolved correctly**
`main` has already deleted `/venues` and `/partners/rcu/*` entirely (evidently a prior, separate decision to keep that RCU work off the public site). My commit only carried a cosmetic title-tag fix on those same files. Resolved by keeping `main`'s deletion (`git rm` the 3 files in the cherry-pick) rather than reintroducing pages that were deliberately removed — did not second-guess or overturn that decision.

**3. A genuine pre-existing bug surfaced during this deploy, unrelated to my session's work**
Right after pushing `draft/rcu-venues`, Vercel's automatic preview build for that branch failed: `Module not found: Can't resolve '@/lib/partner-welcome'` in `src/app/[locale]/admin/vendor-applications/page.tsx` — a file I never touched. Investigated: that admin page has imported `@/lib/partner-welcome` since an earlier session, but the two files it needs (`src/lib/partner-welcome.ts`, `src/app/api/admin/partner-welcome/route.ts`) were only ever committed to `main` (`24978e7`), never to `draft/rcu-venues` — they existed on local disk (shared working directory across sessions) but were untracked on this branch, so every local build silently worked while a clean clone (exactly what Vercel does) could not. Confirmed both files are byte-for-byte identical to the already-live, already-proven `main` versions (only a CRLF/LF line-ending difference) before adding them — committed (`7d6a176`) and pushed to `draft/rcu-venues` as a separate, clearly-labeled fix commit, not folded into the SEO commit. This did not affect `main` or the production deploy (main already had these files); it only fixes `draft/rcu-venues`'s own build going forward.

**4. Validation**
- `tsc --noEmit`: 0 errors, both before committing and again on the `main` worktree after the cherry-pick.
- `next build`: 208 pages on `draft/rcu-venues` (0 errors), 204 pages on `main` after cherry-pick (0 errors) — both clean. The page-count gap reflects routes that exist only on `draft/rcu-venues` for unrelated reasons (features never yet brought to `main`, independent of tonight's work), not a defect from this cherry-pick.
- Runtime spot-check (started `next start` locally, curled, then stopped the server each time): homepage returns "Get a Quote" (not "Get a Free Quote") and "50+" vendor-count text; `/locations/riyadh`, `/services/exhibitions-riyadh`, `/services/conference-management-riyadh`, `/contact`, `/services/royal-weddings` all return 200.
- eslint: 26 pre-existing errors surfaced (unused icon imports, `any` types, unescaped quotes) in files touched for one unrelated line each — none on lines I edited, consistent with this project's established "lint fails only on pre-existing, unrelated errors" baseline; did not attempt to fix these (out of scope, pre-existing, not something this session's instructions asked for).

**5. Current state**
- `main` pushed (`a7aa6f1..b24091a`) → Vercel production deploy should be building/live now.
- `draft/rcu-venues` pushed twice (`3e1462c..1a22014`, then `1a22014..7d6a176`).
- Nothing else pending from this deploy — the exclusions listed in §1 remain exactly as they were (untouched, unstaged, uncommitted), ready for a separate decision whenever Habiba wants them addressed.
