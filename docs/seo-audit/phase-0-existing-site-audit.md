AUDIT STATUS: COMPLETED
PHASE: 0
PURPOSE: Existing Site Audit + Opportunity Discovery
NO IMPLEMENTATION PERFORMED: YES

*Date compiled: 2026-09-22. Companion documents: `phase-0-url-inventory.md` (full per-page table), `phase-0-opportunities.md` (new commercial opportunities). This document treats prior SEO documents in the repo root (`AUDIT-01/02/03`, `SEM-MEGA-EVENT-SEO-AUDIT.md`/`-ROADMAP.md`/`-PAGE-MAP.md`, all dated 2026-09-13/20) as verified historical baseline, not re-derived from scratch — new findings in this document either extend that baseline or note where the working tree has since changed. `SEM-IMPLEMENTATION-LOG.md`'s 2026-09-20 entry (removal of fabricated SAR price figures, deletion of the unused `VendorMarketplace` component) is already reflected in the current working tree and is treated as done throughout.*

---

## 1. Business model framing

SEM is a solo-founder, remote (Pakistan-based) digital sales/coordination broker for event services in Saudi Arabia, working through a vetted vendor partner network — not a full-service owner-operator. This matters for judging every claim and every proposed page: the site should target the full breadth of commercial service intent (event coordination, AV/production, catering, transportation, valet, venue/hotel sourcing, weddings, corporate, MICE, VIP services) that the vendor network can realistically fulfil, not just the generic "event management Saudi Arabia" head term — and every claim of capability must map to a real vendor relationship, not an implied one. This framing is the yardstick used throughout this audit (see especially §11 E-E-A-T and `phase-0-opportunities.md`).

## 2. Complete URL inventory

See `phase-0-url-inventory.md` for the full page-by-page table (title/H1/primary keyword/depth/schema/canonical-hreflang/duplicate-risk/classification) covering all ~95 static routes, the 19 PSEO service×city pages, the 60 city×service matrix combinations, all 39 blog posts, the 13 portfolio case studies, and the vendor/partner/venue/about/legal subtrees. Summary counts: ~62 KEEP, ~7 content-level ENRICH, ~6 technical-only ENRICH fixes (several of which touch 20–40 URLs each), 2 confirmed blog MERGE candidates + 2 softer INVESTIGATE candidates, 4 pages needing an explicit founder INVESTIGATE decision (`/venues/*` vs `/partners/rcu/*`), 1 harmless dead-code route.

## 3. Duplicate/thin/cannibalizing pages — findings

This site already lived through one real thin-page cannibalization incident (documented in the 2026-09-13 audit and the project ledger): the `/locations/[city]/[service]` cartesian grid grew from 70 to 238 indexed pages between June–August 2026, average site-wide position degraded from ~14 to ~28, and a consolidation fix (noindex + sitemap exclusion + internal-link rerouting to the PSEO tier) was shipped 2026-08-22 and is still holding. **The single biggest structural risk for any new work is repeating this exact pattern.**

Current duplicate/cannibalization findings, ranked by evidence strength:

1. **Corporate-events ↔ conferences venue-list copy-paste** (KAFD, RICEC, Ritz-Carlton, Four Seasons, Al Faisaliah, JW Marriott, near-verbatim on both pages) — increases duplicate-content signal for shared queries like "corporate event venues Riyadh" without adding differentiation. Real, unresolved, already flagged 2026-09-13.
2. **Two confirmed near-duplicate blog pairs**: `state-of-mice-industry-saudi-arabia-2026` / `mice-tourism-saudi-arabia-complete-guide-2026` (both surfaced together on `/services/conferences` — the site's own IA already treats them as a pair) and `elevating-corporate-events-riyadh-jeddah` / `corporate-event-excellence-riyadh-jeddah` (near-identical titles). Two softer candidates also flagged in `phase-0-url-inventory.md` §4.
3. **`/venues/*` vs `/partners/rcu/*`** — confirmed genuine content duplicates (same venue name/description/JSON-LD/photo for each of AlFursan and AlMughayra, across two URL trees). Both noindexed today, so no live index-time harm, but the `/partners/rcu/*` canonical points at a non-production staging domain (`draft.sem.sa`) — a live bug that would surface the moment either tree is flipped indexable. **Founder decision required** on which tree is canonical before any technical merge — this touches the standing low-profile-RCU business decision and should not be resolved unilaterally.
4. **PSEO city pages vs. static hub pages** (e.g. `corporate-events-riyadh` vs `/services/corporate-events`) — this is the *intended*, working PSEO local-SEO structure (city long-tail vs. national hub), not an accidental duplicate, but it sits close to the exact pattern that caused the 2026 cannibalization once already. Worth periodic monitoring, not immediate action.
5. **Secondary-city service sub-pages, absent from the sitemap** — `exhibition-management`/`conference-planning`/`vip-event-planning` for the 8 secondary cities are built and live but not sitemapped (≈21+ URLs) — a discoverability gap, not a duplication risk, but relevant to the same "programmatic sprawl discipline" theme.

No new mass city-page generation is recommended anywhere in this audit — every existing city split followed proven national-level demand first, and that discipline should hold for all future work too.

## 4. Corporate page cluster — deep audit

`/services/corporate-events` (national hub, deep, 1303 lines) and `/services/conferences` (deep, 807 lines) are legitimate parent/adjacent pages — conferences is a genuine sub-intent (PCO services, hybrid streaming, speaker management) distinct from the broader "corporate event" umbrella (AGMs, summits, galas). The PSEO tier (`corporate-events-{riyadh,jeddah,dammam}`, `conference-management-{jeddah,dammam}`) correctly serves city-specific long-tail intent underneath both hubs. `/services/luxury-vip-events` overlaps both at the edges (VIP/private corporate events) but is differentiated enough by its HNWI/concierge framing to justify a separate page.

Real buyer-usefulness gaps found in this cluster: `corporate-events` and `conferences` share the venue-list duplication noted above; three pages in the broader corporate-adjacent set (`conferences`, `luxury-vip-events`, `destination-events`) lean toward first-party production language ("our production team," "we bring our full production capability... directly") rather than the honest partner-network disclosure that `exhibitions` and `event-production` already use correctly — a direct match to this project's own hard rule against overstating owned capability (see §11). Supplier/service sub-intents currently hidden inside generic corporate-events copy: product-launch events (reveal-moment staging, embargoed press) and brand activation (consumer-facing/experiential) — both real, distinct intents folded into generic bullets today; both are already scoped as CREATE candidates in `phase-0-opportunities.md` §G (carried over from the 2026-09-13 audit).

"Corporate events Riyadh" vs. "corporate events Saudi Arabia" *is* differentiated in practice — the national hub targets the umbrella term and general capability, the PSEO Riyadh page targets city-specific long-tail with distinct 600–900-word content, not a copy-paste variant.

## 5. GSC / search data (actual data, not inference)

Source: `AUDIT-03-GSC.md`, four exports pulled 2026-09-20, primary dataset = "Last 3 months" (1000 query rows, 30,116 impressions, 63 clicks site-wide; 242 page rows, 70,293 impressions). This section restates the load-bearing facts only — see that file for full tables.

- **Site-wide CTR is extremely low (~0.21%)** despite meaningful impression volume — this is a framing/CTR problem on already-ranking content, not a "no one is searching" problem.
- **Largest query cluster by far**: CORPORATE (543 of 1000 queries, 25,802 impressions, only 30 clicks) — gala/awards/conference/exhibition/MICE terms dominate. The gala/awards sub-cluster alone (`gala dinners and awards ceremonies`, `award and gala dinner event companies`, etc.) accounts for several of the single highest-impression rows in the entire export, at positions in the 16–26 range — genuine near-miss/striking-distance territory, not a cold topic.
- **`/services/corporate-events` and `/services/conferences` are chronically buried** (positions ~72 and ~74 respectively, despite 5,524 and 1,690 impressions) — never-ranked, not a recent regression.
- **`/blog/gala-dinner-awards-ceremony-planning-saudi-arabia`** carries 6,403 impressions at position ~23 with a 0.03% CTR — the single most data-validated "real demand, wrong conversion mechanics" asset on the entire site.
- **WEDDING cluster** (133 queries, 1,488 impressions) converts comparatively well — `exceptional-wedding-cost-saudi-arabia-guide` is the single best-performing page in the export (54 clicks, position ~6, 0.9% CTR) proving the site can rank and convert when title/meta framing lines up with intent.
- **GOVERNMENT-TENDER cluster** (22 queries, 359 impressions) exists as real inbound search interest but must be handled per the standing referral-only business rule (see `phase-0-opportunities.md` §G) — not solicited or bid directly.
- **No genuine hotel-venue-sourcing or hotel-event-production query anywhere in the export** (the one "hotel" match is classified IRRELEVANT — AI-assistant prompts about Hilton loyalty programs). This is the load-bearing fact behind the hotel-opportunity verdict in `phase-0-opportunities.md` §I.
- **Zero-impression static service pages**: `cultural-events`, `vip-transportation`, `entertainment` (English); a different set of 3 in Arabic. All 19 PSEO pages have at least some impressions (lowest: 5).

## 6. Hotel opportunity — pointer

Full deep-dive (current coverage, vendor-capability backing assessment, GSC evidence, recommendation-ready verdict) is in `phase-0-opportunities.md` §I. Headline: content gap is real, but vendor-capability backing is thin-to-none (a real inbound hotel-venue lead — Warwick Hotel Khobar — already exposed a servicing gap in the network), and GSC shows no genuine hotel-intent demand in the current export. **Do not build a dedicated hotel pillar page until real hotel-side vendor capability exists**; a safe, already-backed near-term move is expanding the existing hotel-transfer/hotel-valet bullets on `vip-transportation`/`valet-parking`.

## 7. Local SEO audit

- **Riyadh, Jeddah, Dammam, AlUla** = "primary cities" with full static hub pages + PSEO service-page coverage — genuine business capability and vendor coverage sit behind these, confirmed via the vendor network's regional-coverage fields.
- **Makkah** = a 5th static hub page but without PSEO city×service twins — a tier between primary and secondary.
- **8 secondary cities** (NEOM, Khobar, Madinah, Taif, Abha, Diriyah, Tabuk — dynamic, no `generateStaticParams`) have real, distinct content per city (confirmed genuinely differentiated data, not filler) but materially thinner internal linking and a live sitemap gap for 3 of their 5 possible service combinations (§3 above).
- **No location page is a copy-paste of another** — each of the 12 cities has distinct venue/landmark/FAQ content, confirmed by direct file reads. This is a genuine strength, contrary to what a "mass template" pattern would predict.
- **No mass city-page generation is recommended.** Every existing split followed proven demand; any future local-SEO expansion (e.g. splitting mega-events or gala by city) should follow the identical discipline — national first, split only on GSC evidence.

## 8. Keyword strategy — representative examples

Full per-page primary/secondary keyword mapping lives in `phase-0-url-inventory.md`. Representative pattern, using valet parking (the brief's own worked example) as the real on-site case:
- Primary: **valet parking company Riyadh** (title tag)
- Secondary (confirmed on-page): wedding valet, corporate valet, conference/exhibition valet, VIP priority arrival + luggage, venue & hotel valet, golf-cart guest mobility
- Related entities used on-page: valet attendants, parking coordination, guest arrival flow, hotel/private-venue integration, VIP arrivals

This pattern (one clear primary keyword + a confirmed, non-stuffed secondary/long-tail set mapped to real FAQ content) holds consistently across the 14 static service pages and the 19 PSEO pages — this is a genuine strength of the current site, not a gap.

## 9. AEO / GEO / LLM discoverability audit

Full detail in the accompanying research pass; headline findings:

- **FAQ schema and visible FAQ content are kept in sync** across all 28 files carrying FAQPage schema — a genuine strength (no schema/visible-content mismatch found, contrary to what might be expected on a site this size).
- **Of 5 test questions an AI/careful human might ask**, 4 are answered clearly and citably on-site today: "What services in Riyadh?" (via `/locations/riyadh`'s OfferCatalog + FAQ), "Valet parking for a hotel event?" (explicit line on `/services/valet-parking`), "Coordinate a hotel venue + suppliers together?" (explicit "under one roof" language on `/services/production-venues` and `/services/conferences`), "VIP transportation?" (dedicated page, unambiguous).
- **One confirmed gap**: "Can they arrange a henna event / henna party?" — the concept exists only nested inside `/services/royal-weddings` ceremony content, with no glossary entry, FAQ, or blog coverage answering it as a standalone bookable service. An AI system or skimming user asking this generically would not find a confident, citable answer today.
- **Schema coverage is broad and mostly well-structured**: Service/FAQPage/BreadcrumbList on every service-tier page, LocalBusiness/Place on location pages, BlogPosting on posts, Person/Organization on About/team pages — but **no centralized schema builder** exists; every page hand-writes its own JSON-LD literal, which is both how consistent language (e.g. "20+ Vetted Vendors") propagated correctly by copy-paste, and how the response-time/city-count drift below crept in (no single source of truth for shared stat blocks).
- **Entity naming is fully consistent** — "Saudi Event Management" / "SEM" used everywhere; zero instances of "SCM" found anywhere in the codebase.

## 10. E-E-A-T / trust audit

The August 2026 fabrication cleanup (fake award, fake office addresses, fake client/venue logos) mostly held, and — newly confirmed this pass — **the two specific regressions flagged in the 2026-09-13 audit ("4.9★/148 reviews" on royal-weddings, "Award — Winning Booth Design 2024" on exhibitions) and the "NEOM APPROVED" claim on destination-events are all already fixed in the current working tree.** No street address or fake office claim has crept back in anywhere.

New contradictions found this pass, ranked:

1. **Response-time promise varies by page with no stated reason**: "within the hour" (WhatsApp/contact page) vs. "Guaranteed Response Within 90 Minutes" (homepage hero form) vs. "within 2 hours" (the overwhelming majority of service-page lead forms) vs. "within one business day" (portfolio/case-study CTA). The separate "within 24 hours for a full quotation" claim is internally consistent and not part of this contradiction — only the *first-contact* promise varies. **Recommend reconciling to one stated number per channel** (e.g. WhatsApp: within the hour; web form: within 2 hours; full quote: within 24 hours) and applying it uniformly.
2. **"10+ cities" vs. "12 cities"** used interchangeably across roughly a dozen files for the same geographic footprint. Not false (12 cities are in fact named on `/locations`), but presents two different numbers depending on which page a visitor lands on.
3. **Owner-operator language vs. the honest broker/founder-led framing.** `/about/our-team` correctly describes SEM as "an event coordination and vendor-sourcing platform connecting clients with a curated network of experienced delivery partners." But several other pages use materially stronger first-party operational language: "Saudi Event Management's **production warehouse and team** are based in Riyadh," "**our fabrication team** begins stage construction... in our warehouse," "**an on-day team of 15–40 professionals**" / "**40-person on-day operations team**," "headquartered in Riyadh with a **dedicated operations team available 24/7**... and active teams serving Jeddah, Dammam, AlUla, and NEOM." This is a broader version of the "inconsistent broker-vs-owner framing" the 2026-09-13 audit already flagged narrowly (3 pages) — this pass finds it extends to literal facility-ownership language ("our warehouse") and a specific headcount claim ("40-person team") on `event-production`, `luxury-vip-events`, `destination-events`, `royal-weddings`, `conferences`, and the main `/about` page. **This needs a founder decision**: either apply the same partner-network disclosure `exhibitions`/`event-production`'s gallery section already models, or confirm a specific claim is factually accurate (e.g. if SEM genuinely does have a warehouse/fixed team) and leave it — this audit cannot determine which from the codebase alone.
4. **`/testimonials` markets "Verified Client Feedback" and a "Live Testimonials Carousel" around a single, unattributed, company-authored quote** (`"We personally vet every vendor..." — author: "Saudi Event Management"`), rendered with a fixed 5-star display regardless of any real rating. No `aggregateRating`/`reviewCount` schema exists (consistent with the prior fabrication cleanup — good), but the page's framing implies a body of real client feedback that doesn't exist in the codebase. This is the same underlying issue the "148 reviews" regression addressed, in a softer but still-live form. **Needs a founder decision**: add real, consented client quotes, or reframe the page copy away from "verified reviews."
5. **`glossary.md`'s "IAPCO-aligned PCO" claim** ("Saudi Event Management operates in alignment with IAPCO standards, serving as a trusted PCO for government entities, international associations, and major corporations") is a real external professional body cited with no supporting relationship, membership, or case study anywhere else on the site — the same pattern as the already-fixed "NEOM APPROVED" claim. **Needs founder verification.**

No new fabricated-award, fake-address, or fake-logo pattern was found beyond what's listed above.

## 11. UI/UX audit

Full detail in the accompanying research pass (static code-level review; no dev server was run, so contrast/visual findings are candidates for founder visual confirmation, explicitly marked as such below). Ranked by likely impact:

1. **No privacy/consent note or policy link on any of the 4 lead forms** (`ServiceLeadForm`, `ContactForm`, consultation page, homepage `ContactSection`) — despite a `/privacy` page existing, none of the forms link to it or show a consent checkbox. Likely suppresses completion among privacy-conscious/enterprise leads.
2. **Homepage contact form (`ContactSection`) collects far less than every other form** — no phone number at all, despite WhatsApp being the site's primary follow-up channel everywhere else. The highest-traffic entry point produces the least-actionable leads.
3. **Floating WhatsApp button likely overlaps the mobile sticky lead bar** — both are `fixed` to the viewport bottom with high/conflicting z-index (120 vs 40); CSS math suggests real visual overlap on nearly every mobile page, though this needs visual confirmation.
4. **Generic "Contact Us"/"Learn More" CTAs dominate secondary buttons** across every service page and every blog-post closer (10+ files for "Contact Us," 19+ for "Learn More," 20+ blog CTAs) — the highest-volume organic touchpoint (blog) consistently ends on the weakest CTA copy on the site, while strong action-specific copy ("Request a Proposal," "Get a Free Quote") is reserved for the nav/forms.
5. **Site-wide dark-green (#0E7A66) H1 highlight text over dark photo-overlay heroes**, propagated via the shared `InternalPageHero` component to 28+ pages — a candidate low-contrast pattern; if visually confirmed, this is the single highest-leverage fix in the whole audit since one component change fixes every page at once. *(Candidate — needs visual confirmation.)*
6. **No visible required-field asterisks on the Consultation page or homepage contact form**, despite two of the four forms using them — inconsistent affordance, users on those two forms only discover a missing field after a failed submit attempt.
7. **Footer's "Services" sitemap list omits 6 of 14 services** (Royal Weddings, Production/Venues, Entertainment, VIP Transportation, Valet Parking, Birthday Party) relative to the Navbar's full mega-menu — reduces footer-driven internal-link equity to those 6 pages.
8. **Breadcrumb visible label text diverges from its own JSON-LD schema `name`** on at least 3 service pages (Weddings, Exhibitions, Conferences) — cosmetic, low urgency, but an easy consistency fix.

No broken/placeholder links (`href="#"`, empty href) were found anywhere in the codebase. Mobile nav correctly mirrors the desktop mega-menu (all 14 services, all 12 cities present in the mobile drawer).

## 12. Conversion audit

- Every static service page consistently answers "what is the service," "who is it for," and "why SEM" through its FAQ + trust-bar pattern.
- **"What does the client need to provide" and "how does quotation work" are answered inconsistently** — the 24-hour full-quotation promise is site-wide consistent, but the *first-contact* response-time promise varies by page (see §10.1), which muddies the "what happens after I submit" answer a visitor gets depending on which page/form they use.
- **Budget qualification exists on only one of four public forms** (the Consultation page) — `Inquiry.budget`, `Lead.budget`, and `QuoteRequest.budgetRange` all exist in the Prisma schema and are referenced downstream, but the two highest-traffic forms (`ServiceLeadForm`, used on 16+ pages, and the homepage `ContactSection`) never ask for it. This is a real qualification gap with a cheap, already-scoped fix (2026-09-13 roadmap Day 6: add an optional budget-range select).
- **No spam protection on `/api/contact`** (no honeypot, no rate limit) despite the vendor-facing `/api/partner-applications` route already having both — a live security/spam gap on the higher-traffic, higher-value client-facing endpoint. Already flagged 2026-09-13 as P0.
- Generic CTA copy (§11.4) is itself a conversion issue, not just a UX cosmetic one — weakest CTA language sits on the highest-organic-traffic surface (blog).

## 13. Internal linking audit

- Reciprocal hub/child linking works well for `corporate-events` ↔ `conferences` and `weddings` ↔ `royal-weddings`.
- `gala-dinner-awards-ceremony-planning-saudi-arabia` was previously orphaned (0 inbound contextual links despite 2,264+ impressions) — already fixed 2026-08-22 with 3 reciprocal links; still converts through a blog post rather than a commercial page (tracked in `phase-0-opportunities.md` §G).
- **New this pass**: `/locations/alula` (a primary city) has zero internal links to its own `/locations/alula/{service}` sub-pages, unlike Riyadh/Jeddah/Dammam.
- **New this pass**: the 7 secondary dynamic city pages (`neom`, `khobar`, etc.) have zero internal links down into any of their own city×service sub-pages — reachable only by direct URL or the (partial) sitemap.
- **New this pass**: Footer's incomplete service list (§11.7) is itself an internal-linking gap for 6 service pages.
- No orphaned page was found beyond the already-fixed gala post and the always-noindexed venues/RCU pages.

## 14. Technical SEO audit

Full per-URL detail lives in `phase-0-url-inventory.md`; consolidated list of live technical defects found across both this pass and the still-valid 2026-09-13 findings:

| # | Issue | Scope | Status |
|---|---|---|---|
| 1 | Title double-append bug (`"X | Saudi Event Management | Saudi Event Management"`) on ~12+ routes | editorial-policy, partner-onboarding, testimonials, services hub, 4 static location pages, corporate-events layout (EN branch), glossary, vendors, vendor-registration, partners, blog layout, partners/rcu×2, venues | Flagged 2026-08-17, still open per prior audit — **not independently re-verified in this pass**, carry forward as open |
| 2 | **19 PSEO pages (38 URLs) missing hreflang entirely** — `generateMetadata` sets canonical only | `services/[slug]/page.tsx:1057-1088` | **New finding, confirmed this pass** |
| 3 | **Secondary-city service sub-pages absent from sitemap** (~21+ live, non-noindexed URLs) | `locations/{8 secondary cities}/{exhibition-management, conference-planning, vip-event-planning}` | **New finding, confirmed this pass** (extends the already-known taif/abha/tabuk sitemap gap) |
| 4 | Noindex-consolidation predicate hardcoded twice (page + sitemap) | `locations/[city]/[service]/page.tsx` + `sitemap.ts` | Flagged 2026-09-13, still open |
| 5 | `/locations/[city]/page.tsx` has no `generateStaticParams` for its 7 dynamic cities | location dynamic route | Flagged 2026-09-13, still open — architectural inconsistency, not urgent |
| 6 | `/partners/rcu/alfursan-equestrian-village` canonical points to `draft.sem.sa` (non-production domain) | 1 file (pattern likely shared by its sibling) | **New finding, confirmed this pass** |
| 7 | `/vendor-registration` missing canonical + hreflang entirely | `vendor-registration/layout.tsx` | **New finding, confirmed this pass** |
| 8 | `/services/cultural-events` title/meta targets "Saudi National Day 2026" while H1 targets generic "Cultural Event Management" | 1 page | **New finding, confirmed this pass** |
| 9 | Portfolio hub's ItemList schema links to `/services/{slug}` rather than portfolio category pages | `/portfolio` hub | **New finding, confirmed this pass** — cosmetic |
| 10 | Stale code comment in `src/lib/seo.ts:56-64` contradicts the actual `TRANSLATED_AR_ROUTES` registry beneath it | `seo.ts` | **New finding, confirmed this pass** — documentation drift, no live routing defect |
| 11 | No centralized JSON-LD schema builder (38+ files hand-write BreadcrumbList alone) | site-wide | Flagged 2026-09-13, still open — maintenance-risk tier, not urgent |
| 12 | No sitemap-embedded hreflang (page-level only) | site-wide | Flagged 2026-09-13 — acceptable as-is, noted for completeness |
| 13 | No `manifest.ts` | site-wide | Flagged 2026-09-13 — minor completeness gap |

`robots.txt` remains clean and correct (confirmed this pass: also correctly does not disallow `/venues/*` or `/partners/rcu/*`, consistent with relying on page-level noindex meta the same way `/tracking` does).

## 15. Prioritization

**P0 — existing issues to address before any new page work:**
- Remove/verify the two remaining unverified trust claims: the "IAPCO-aligned PCO" claim (§10.5) and reconcile the response-time contradiction (§10.1).
- Add spam protection to `/api/contact` (§12) — live security gap, not just SEO hygiene.
- Add hreflang to the 19 PSEO pages (§14.2) — 38 URLs fixed in one file edit.
- Add the missing secondary-city service pages to the sitemap or make a deliberate noindex decision (§14.3).
- Title double-append bug re-verification and fix if still present (§14.1).
- Founder decision on `/venues/*` vs `/partners/rcu/*` canonical tree (§3.3) — including the `draft.sem.sa` canonical bug.

**HIGH COMMERCIAL INTENT, existing pages to strengthen first:**
- `/blog/gala-dinner-awards-ceremony-planning-saudi-arabia` — 6,403 impressions, position ~23, 0.03% CTR: the single most data-validated "fix conversion mechanics, not content" opportunity on the site.
- `/services/corporate-events` and `/services/conferences` — 5,524 and 1,690 impressions respectively, both chronically buried (positions 72–74) — the venue-list de-dup and partner-network disclosure fixes are cheap and directly serve this cluster.
- The wedding-cost blog guide already proves the site can rank *and* convert (54 clicks, position ~6) when framing is right — a template worth replicating on the gala post specifically.

**MEDIUM COMMERCIAL INTENT:** the mega-events pillar, product-launch, and brand-activation pages already scoped in the 2026-09-13 roadmap — real, evidence-backed, but dependent on founder approval of that roadmap, which has not yet been given per the project ledger.

**LOW COMMERCIAL INTENT / defer:** majlis setup, henna-as-standalone-service, welcome/registration-desk staffing — real cultural/content concepts but currently blocked on vendor capability, not content strategy.

**Do not build without more evidence:** a dedicated hotel pillar page (§6), any city-split of not-yet-launched national pages, government-events content without sign-off, four separate FII/LEAP/Cityscape/Big5 pages.

## 16. What SHOULD NOT be built (consolidated)

- `/services/conference-management`, `/exhibition-management`, `/vip-events`, `/large-weddings`, `/destination-weddings` as new URLs (each duplicates an existing, better-named page).
- A second gala/award-ceremony service-page URL competing with the already-ranking blog post.
- A dedicated hotel venue-sourcing/production page until real hotel-side vendor capability exists.
- Four separate FII/LEAP/Cityscape/Big5 pages (one consolidated post covers the real intent).
- Any city-split of gala/product-launch/brand-activation/mega-events before national-level GSC data justifies it.
- A majlis-setup or registration-desk-staffing page while the underlying vendor relationship remains unsigned/not onboarded.
- Government-events content of any kind without explicit founder sign-off.
- Any expansion of the `/locations/[city]/[service]` grid — this exact pattern already caused the 70→238 indexing regression once.

---

## Final classification lists (A–R, per audit brief)

### A. Existing pages to preserve (KEEP)
`/services/{weddings, exhibitions, event-production, royal-weddings, production-venues, valet-parking, vip-transportation, entertainment, birthday-party}`, all 19 PSEO service×city pages, all 5 static city pages, all 7 dynamic secondary-city pages (content itself; technical fixes are separate), the full portfolio subtree, `/about` subtree, `/travel`, `/vendors`, `/partner-onboarding`, legal/utility pages, `/tracking` (as-is), the existing noindex consolidation on the `/locations/[city]/[service]` grid. Full list in `phase-0-url-inventory.md`.

### B. Existing pages to enrich
`/services/corporate-events` and `/services/conferences` (venue-list de-dup), `/services/luxury-vip-events`, `/services/destination-events`, `/services/conferences` (partner-network disclosure), `/services/cultural-events` (title/H1 reconciliation), `/services/valet-parking` + `/services/vip-transportation` (hotel-bullet expansion — real, vendor-backed), `/locations/alula` (add missing sub-page links), `/vendor-registration` (add canonical/hreflang), `services/[slug]` PSEO template (add hreflang), `/locations/[city]/page.tsx` (add `generateStaticParams`), `/testimonials` (reframe or add real quotes — founder decision), `/glossary` (verify or soften IAPCO claim — founder decision).

### C. Existing pages that appear duplicated
`/venues/*` vs `/partners/rcu/*` (4 pages, content duplicates, founder decision needed on canonical tree); `corporate-events` vs `conferences` (venue-list copy only, not whole-page duplication); the PSEO-vs-static-hub proximity noted in §3.4 (working as intended, monitor only).

### D. Existing pages that should eventually be merged
`state-of-mice-industry-saudi-arabia-2026` + `mice-tourism-saudi-arabia-complete-guide-2026` (blog); `elevating-corporate-events-riyadh-jeddah` + `corporate-event-excellence-riyadh-jeddah` (blog) — both founder merge-direction decisions, not yet executed. Two softer candidates flagged INVESTIGATE in `phase-0-url-inventory.md` §4.

### E. Existing pages that may need redirect/noindex review
`/venues/*` + `/partners/rcu/*` (founder decision on canonical tree — see C); `/portfolio/[slug]/page.tsx` dead-code catch-all (harmless, low-priority cleanup flag only); no redirect action recommended anywhere else.

### F. Existing pages with strong search/commercial signals
`/blog/gala-dinner-awards-ceremony-planning-saudi-arabia` (6,403 impressions, real demand, conversion-mechanics problem); `/blog/exceptional-wedding-cost-saudi-arabia-guide` (54 clicks, position ~6 — proof the site can rank and convert); `/services/corporate-events`, `/services/conferences`, `/services/exhibitions`, `/services/event-production` (all high-impression, currently under-ranking — high-value strengthen-first targets); the full CORPORATE query cluster (543 of 1000 queries, 25,802 impressions) as a demand signal even where individual pages aren't yet capturing it.

### G–L. New opportunities (service, Riyadh, hotel, transportation, wedding/social, production/AV)
Full detail in `phase-0-opportunities.md`. Headline: mega-events/gala-upgrade/product-launch/brand-activation already scoped and awaiting founder approval (2026-09-13 roadmap); Corporate Gifts & Giveaways and standalone Catering are the two cleanest newly-discovered gaps (real vendor backing, zero front-end page); hotel pillar page is a confirmed content gap but thin-to-none on vendor backing — do not build yet; no new Riyadh-specific city-split page is justified; no new transportation page beyond enriching existing hotel-transfer/hotel-valet bullets; henna-as-standalone-service and majlis setup are real cultural concepts blocked on vendor capability, not content strategy; hybrid/live-streaming production is a plausible enrich-in-place candidate on the existing `event-production` page.

### M. UI/UX issues
Full ranked list in §11 above. Top 3: no privacy/consent note on any lead form; homepage contact form under-collects (no phone) relative to every other form; floating WhatsApp button likely overlaps the mobile sticky lead bar (candidate, needs visual confirmation).

### N. Technical SEO issues
Full table in §14 above. Top 3 new findings this pass: 38 PSEO URLs missing hreflang; ~21+ secondary-city service URLs live but absent from the sitemap; `/partners/rcu/alfursan-equestrian-village` canonical points to a non-production staging domain.

### O. AEO/GEO/LLM issues
FAQ schema is well-synced with visible content (a strength, not a gap). One confirmed AEO gap: "can they arrange a henna event" has no clear on-site answer today. No centralized schema builder is a maintenance risk that has already caused the response-time/city-count drift in §10.

### P. E-E-A-T/trust issues
Full ranked list in §10 above. Top findings: response-time claims vary 4 ways across the site with no stated reason; "10+" vs "12" cities inconsistency; owner-operator language on 6 pages contradicts the honest broker framing on `/about/our-team` (needs founder decision — verify or soften); `/testimonials` markets "verified reviews" around one unattributed company-authored quote; the IAPCO-alignment claim on `/glossary` is unverified. The two previously-flagged fabrication regressions (royal-weddings reviews stat, exhibitions award claim) and the NEOM-approved claim are **confirmed already fixed** — no action needed there.

### Q. Internal linking issues
Full list in §13 above. Top findings: `/locations/alula` and the 7 secondary dynamic city pages have zero cross-links to their own service sub-pages; the footer's incomplete service list is itself a linking gap for 6 pages.

### R. Questions/information needed from the founder
1. **`/venues/*` vs `/partners/rcu/*`**: which URL tree is the intended canonical public one? (Standing low-profile-RCU decision — cannot resolve unilaterally.)
2. **Response-time promise**: which number is actually true per channel (WhatsApp / web form / full quotation), so the site can state one consistent promise instead of four?
3. **"10+ cities" vs "12 cities"**: which phrasing should become the standard?
4. **Owner-operator language** ("our warehouse," "our fabrication team," "40-person operations team," "dedicated operations team available 24/7"): is any of this factually accurate, or should these pages adopt the same partner-network disclosure `exhibitions`/`event-production` already use?
5. **`/testimonials`**: are there real, nameable client quotes (with consent) that can replace the single self-authored quote, or should the page's "verified reviews" framing be softened?
6. **IAPCO alignment claim** on `/glossary`: is there a real IAPCO relationship, or should this be removed/softened?
7. **Hotel opportunity**: is there any informal hotel-side relationship (a banquet/events contact, a hotel group contact) not currently reflected in the vendor tracker, that would change the "do not build yet" verdict in `phase-0-opportunities.md` §I?
8. **Henna-as-standalone-service and majlis setup**: worth pursuing as content (and, for majlis, worth re-approaching the previously-unsigned vendor) or leave as-is?
9. **2026-09-13 mega-event roadmap**: still awaiting explicit founder approval before any of its 4 new pages / 3 blog posts are built — confirm scope/sequence or adjust.
10. **Government-events page**: sign-off decision still outstanding, per the standing referral-only rule.
