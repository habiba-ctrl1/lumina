AUDIT STATUS: COMPLETED
PHASE: 0
PURPOSE: Existing Site Audit + Opportunity Discovery — Full URL Inventory
NO IMPLEMENTATION PERFORMED: YES

*Date compiled: 2026-09-22. Companion to `phase-0-existing-site-audit.md` and `phase-0-opportunities.md`. Supersedes/extends the route list in `AUDIT-01-WHAT-EXISTS.md` (facts-only, partial table) and the classifications in `SEM-SEO-PAGE-MAP.md` (2026-09-13, mega-event-brief scope only) — those two documents are correct as far as they go and are used here as a verified baseline, not re-derived from scratch. Classification legend: **KEEP** (no action) · **ENRICH** (same URL, add depth/schema/links) · **REWRITE** (same URL, materially rework) · **MERGE** (fold into a sibling) · **REDIRECT** · **NOINDEX** (stays live, excluded from index) · **REMOVE** · **INVESTIGATE** (founder decision needed before any classification is final).

---

## 1. Static service pages — `/services/*` (14 pages)

| URL | Title tag | H1 | Primary keyword | Depth | Schema | Canonical/hreflang | Duplicate-risk note | Classification |
|---|---|---|---|---|---|---|---|---|
| `/services/corporate-events` | Corporate Event Management Saudi Arabia \| AGMs, Summits & Galas | Corporate Event Management in Saudi Arabia | corporate event management Saudi Arabia | Deep (1303 ln) | FAQPage, HowTo, ItemList, BreadcrumbList, WebPage | Y/Y | Overlaps PSEO `corporate-events-{riyadh,jeddah,dammam}`; near-identical venue list vs `/services/conferences` | KEEP (national hub) / ENRICH (de-dup venue list) |
| `/services/weddings` | Luxury Wedding Planner Saudi Arabia — Riyadh, Jeddah & AlUla | Wedding Planner Saudi Arabia | luxury wedding planner Saudi Arabia | Deep (746 ln) | FAQPage, BreadcrumbList, Service/LocalBusiness/OfferCatalog | Y/Y | Parent/child overlap with `/services/royal-weddings` (shared ceremony vocabulary) — genuinely differentiated by intent (general vs. ceremonial/HNW), not cannibalizing | KEEP |
| `/services/exhibitions` | Exhibition Management Company Riyadh \| Trade Show Organizer Saudi Arabia | Exhibition Management in Saudi Arabia | exhibition management company Riyadh | Moderate-deep (703 ln) | Service/FAQ/Breadcrumb family | Y/Y | Overlaps PSEO `exhibitions-{jeddah,dammam}` | KEEP (model page for broker-framing) |
| `/services/conferences` | Conference Management Services Riyadh \| B2B Summit Planning Saudi Arabia | Conference Management Saudi Arabia | conference management Riyadh | Deep (807 ln) | same family | Y/Y | Near-identical venue list vs `/services/corporate-events`; co-surfaces the MICE blog cannibalization pair (§4) | ENRICH (de-dup venue list, tighten partner-network disclosure) |
| `/services/event-production` | Event Production Company Saudi Arabia \| Stage, Sound & Lighting Riyadh | Event Production Services Saudi Arabia | event production company Saudi Arabia | Deep (838 ln) | same family | Y/Y | Overlaps `/services/production-venues` (AV/stage) | KEEP (model page) / see trust-language finding in main audit §Content |
| `/services/cultural-events` | **"Saudi National Day 2026 Event Management Riyadh"** | Cultural Event Management in Saudi Arabia | Metadata targets National Day (seasonal); H1 targets generic cultural events | Moderate-deep (862 ln) | FAQ/Breadcrumb | Y/Y | Title/H1 keyword mismatch — flagged, not necessarily wrong (seasonal CTR play layered on an evergreen page) but worth a conscious decision | ENRICH (reconcile metadata vs. H1 intent, or confirm seasonal framing is intentional) |
| `/services/luxury-vip-events` | VIP Event Management Saudi Arabia \| Private & Corporate Events | VIP & Private Event Management Saudi Arabia | VIP event planning Saudi Arabia | Moderate (701 ln) | same family | Y/Y | Overlaps `/services/royal-weddings` (royal-family events) and `/services/destination-events` (yacht/desert) | ENRICH (strengthen partner-network disclosure — leans first-party) |
| `/services/destination-events` | Destination Events Saudi Arabia \| AlUla, NEOM, Red Sea & Diriyah | Destination Event Planning in Saudi Arabia | destination events Saudi Arabia | Moderate (746 ln) | same family | Y/Y | Overlaps `/services/luxury-vip-events`; folds destination-wedding intent (no separate page — correct per prior audit) | ENRICH (partner-network disclosure) |
| `/services/royal-weddings` | Royal Wedding Planner Saudi Arabia \| Ceremonial Luxury & Royal Protocol | Royal Wedding Planners Saudi Arabia | royal wedding planner Saudi Arabia | Very deep (1643 ln) | ItemList, BreadcrumbList, WebPage | Y/Y | Nests under Weddings in breadcrumb — genuinely differentiated, not cannibalizing | KEEP (fabricated "4.9★/148 reviews" stat already removed — confirmed in current tree) |
| `/services/production-venues` | Event Services & Venues Saudi Arabia \| AV, Catering, Staging & Decoration | Event Services & Venue Sourcing Saudi Arabia | event services Saudi Arabia | Moderate (656 ln) | FAQ/Breadcrumb/Service/OfferCatalog | Y/Y | Overlaps `/services/event-production` and ancillary pages | KEEP |
| `/services/valet-parking` | Valet Parking Riyadh & Saudi Arabia \| Event, Wedding & Corporate Valet | Event Valet Parking Saudi Arabia | valet parking company Riyadh | Moderate (494 ln) | Service/FAQ/Breadcrumb | Y/Y | Low differentiation from vip-transportation (same template tier) | KEEP / ENRICH (expand "Venue & Hotel Valet" bullet — real, vendor-backed) |
| `/services/vip-transportation` | VIP Transportation Riyadh & Saudi Arabia \| Chauffeur, Airport & Event Transfers | VIP Event Transportation Saudi Arabia | VIP transportation Riyadh | Moderate (459 ln) | Service/FAQ/Breadcrumb | Y/Y | Same template tier as valet/entertainment/birthday | KEEP / ENRICH (expand "Airport & Hotel Transfers" bullet) |
| `/services/entertainment` | Event Entertainment Company Riyadh & Saudi Arabia \| Live Bands, DJs & Performers | Event Entertainment Saudi Arabia | event entertainment company Riyadh | Moderate (410 ln) | Service/FAQ/Breadcrumb | Y/Y | Fabricated "Award — Winning Booth Design 2024"-style claim NOT present on this page (that was `/services/exhibitions`; already removed there too) | KEEP |
| `/services/birthday-party` | Birthday Party Planning Saudi Arabia \| Setup, Kids Entertainment & Catering | Birthday Party Planning in Saudi Arabia | birthday party planner Riyadh | Thinnest of the 14 (406 ln) | Service/FAQ/Breadcrumb | Y/Y | Real vendor-backed niche page, appropriately scoped | KEEP |

**Cross-cutting structural note**: the four "ancillary partner-network" pages (valet-parking, vip-transportation, entertainment, birthday-party) share near-identical schema tiering (Service+FAQ+Breadcrumb only, no OfferCatalog/HowTo/ItemList) and boilerplate "coordinated through our partner network" framing — consistent, not a defect, but worth knowing as a template class distinct from the 10 "primary" pages.

## 2. PSEO service×city pages — `/services/[slug]` (19 slugs × EN/AR = 38 URLs)

All 19: `corporate-events-{riyadh,jeddah,dammam}`, `luxury-weddings-{riyadh,jeddah,dammam}`, `exhibitions-{jeddah,dammam}`, `conference-management-{jeddah,dammam}`, `event-production-{riyadh,jeddah,alula}`, `cultural-events-{riyadh,jeddah}`, `vip-events-{jeddah,alula}`, `destination-events-{alula,neom}`.

- Content: genuinely distinct 600–900 word bodies + 3 unique FAQs per slug, not templated filler — confirmed by direct read of the underlying `PSEO_DATA` record.
- **Technical defect confirmed**: `generateMetadata` sets `canonical` only — **never calls `hreflangAlternates()`** (`services/[slug]/page.tsx:1057-1088`), unlike every other route class on the site. All 19 slugs are listed in `TRANSLATED_AR_ROUTES` and in `sitemap.ts` for both locales, so 38 bilingual, sitemapped, "indexable" URLs currently ship with **no hreflang annotation** at all.
- Classification: **KEEP** content (no change) + **ENRICH (technical-only)**: add `hreflangAlternates()` call to this one shared template — fixes all 38 URLs in one edit.

## 3. Location pages

### 3a. Static city pages (5): riyadh, jeddah, dammam, alula, makkah — all **KEEP**, deep (870–1061 ln each), full schema/canonical/hreflang. One gap: `/locations/alula` doesn't internally link to its own `/locations/alula/{service}` sub-pages despite AlUla being a primary city — **ENRICH** (add the cross-links every other primary city page already has).

### 3b. Dynamic city pages (7): `/locations/[city]/page.tsx` covers neom, khobar, madinah, taif, abha, diriyah, tabuk — genuinely distinct data per city, full schema/hreflang, but **no `generateStaticParams`** (renders on-demand, unlike every other route) and **zero internal links** from this shared template down into any `/locations/{city}/{service}` sub-page. Classification: **ENRICH (technical)** — add `generateStaticParams` for architectural consistency + add city→service cross-links; not urgent, technical-debt tier.

### 3c. City×service matrix — `/locations/[city]/[service]/page.tsx` (12 cities × 5 services = 60 combinations, statically generated, ×2 locales = 120 URLs)

- `corporate-event-management`: **NOINDEX for all 12 cities** (already-correct, working cannibalization guard, dated 2026-08-22).
- `conference-planning`: **NOINDEX for all cities except Riyadh** (Riyadh kept indexable — no PSEO twin exists yet for it).
- The noindex predicate is hardcoded **twice** (once in the page, once in `sitemap.ts`) — a maintenance-drift risk if one copy is edited without the other. **ENRICH (technical)**: extract to one shared predicate function.
- **Confirmed new discoverability gap**: for the 8 secondary cities, `exhibition-management`, `conference-planning`, and `vip-event-planning` sub-pages are built, live, NOT noindexed, yet **absent from `sitemap.ts`** (only `luxury-wedding-planning` is sitemapped for secondary cities). `/locations/makkah/exhibition-management` is even directly linked from the static Makkah page. Roughly 21 EN URLs (+ AR mirrors) affected. Classification: **ENRICH (technical)** — add to sitemap, or make a deliberate noindex decision; currently neither, which is the actual defect.
- `taif`/`abha`/`tabuk` city×service combinations flagged in the prior mega-event audit as built-but-sitemap-absent — **same underlying gap**, folded into the finding above.

## 4. Blog — `/blog/[slug]` (39 posts)

Full slug/title list captured in the research pass (see agent output in working notes) — all 39 are individually listed in `TRANSLATED_AR_ROUTES` (fully AR-indexable), each with `BlogPosting`+`Person`+`Organization`+`FAQPage` schema where a FAQ segment exists.

**Confirmed cannibalization/near-duplicate pairs** (ranked by evidence strength):
1. `state-of-mice-industry-saudi-arabia-2026` vs `mice-tourism-saudi-arabia-complete-guide-2026` — both surfaced together as related reading on `/services/conferences`; the site's own IA already treats them as a pair. **MERGE candidate — strongest evidence.**
2. `elevating-corporate-events-riyadh-jeddah` vs `corporate-event-excellence-riyadh-jeddah` — near-identical titles/scope, already flagged in the prior mega-event audit as unresolved. **MERGE candidate.**
3. `ultimate-guide-exceptional-event-planning` vs `complete-guide-event-planning-saudi-arabia-2026` — both broad "how to plan an event in KSA" guides. **INVESTIGATE (softer overlap than #1/#2).**
4. `luxury-weddings-saudi-arabia-destination` vs `destination-wedding-planning-guide` — same core claim/angle ("Saudi Arabia is the new destination for luxury weddings"). **INVESTIGATE.**
5. City-paired posts (`best-wedding-venues-riyadh-2026`/`-jeddah-2026`, `best-corporate-event-venues-riyadh-2026`/`-jeddah-2026`) — **not** true duplicates, intentional city-parallel pattern, **KEEP** both.

`gala-dinner-awards-ceremony-planning-saudi-arabia` — already de-orphaned (3 reciprocal inbound links added 2026-08-22), GSC-validated demand (2,264 impressions, position ~21, historically 0 clicks) — **ENRICH in place** (stronger commercial CTA framing), per prior audit; **do not** create a competing `/services/gala-dinner-events` URL.

A stale code comment in `src/lib/seo.ts:56-64` claims blog AR posts are still mostly noindexed — contradicted by the actual registry (all 39 are listed). Documentation-drift, not a live defect — **flag for cleanup**, no URL action.

## 5. Portfolio

| URL | Classification | Note |
|---|---|---|
| `/portfolio` (hub) | KEEP | ItemList schema items link to `/services/{slug}` rather than the portfolio category pages themselves — a schema/URL mismatch worth a copy-only fix, not urgent |
| `/portfolio/{corporate-events, luxury-weddings, vision-2030}` (3 categories) | KEEP | — |
| 13 static case studies | KEEP | Copy explicitly labels each as a "concept case study" — honest framing already in place, no fabrication found |
| `/portfolio/[slug]/page.tsx` (dynamic catch-all) | NOINDEX / dead code | Unconditional `notFound()`, 5 lines — harmless, flag for a future cleanup pass only |
| `/portfolio-luxury` | KEEP (redirect) | Correctly a 308 to `/portfolio`, already excluded from sitemap |

## 6. Venues / Partners / RCU — INVESTIGATE (founder decision required, not resolvable unilaterally)

| URL | Robots | Canonical | Linked from anywhere? | Sitemap? |
|---|---|---|---|---|
| `/venues` | indexable metadata, but page **visibly shows a "DRAFT — Internal Proposal" banner** | none set | only its own 2 children | N |
| `/venues/alfursan-equestrian-village` | noindex,nofollow | correct domain | only `/venues` hub | N |
| `/venues/almughayra-heritage-sport-village` | noindex,nofollow | correct domain | only `/venues` hub | N |
| `/partners/rcu/alfursan-equestrian-village` | noindex,nofollow | **points to `draft.sem.sa`, a non-production staging domain** — a live bug, currently harmless only because the page is noindexed | zero references anywhere else in the codebase | N |
| `/partners/rcu/almughayra-heritage-sport-village` | noindex,nofollow | same staging-domain canonical bug | zero references | N |

**Confirmed**: the two `/venues/*` pages and the two `/partners/rcu/*` pages are content duplicates of each other (same venue name/description/JSON-LD/hero image for each of the two properties). Both trees are currently noindexed and neither is disallowed in `robots.ts` — safe today, but the `draft.sem.sa` canonical bug on the `partners/rcu` tree would surface immediately if either tree is ever flipped indexable without first deduplicating. **This is the same open item the 2026-09-13 audit flagged — still unresolved, still requires the founder to confirm which URL tree is the intended canonical public one before any technical merge/redirect**, per the standing low-profile-RCU business decision. Do not resolve unilaterally.

## 7. About subtree — all KEEP

`/about`, `/about/awards-accolades` (already honestly reframed), `/about/careers`, `/about/our-team` (hub), `/about/our-team/[name]` (currently only 1 live profile: `habiba-asghar` — template is ready for more, not a defect, just currently underpopulated).

## 8. Vendor-facing public pages

| URL | Canonical/hreflang | Robots | Classification |
|---|---|---|---|
| `/vendors` | Y/Y | default | KEEP |
| `/vendor-registration` | **missing entirely** — no `alternates` key in its `layout.tsx` | default | ENRICH (technical — add canonical+hreflang to match its near-twin `/vendors`) |
| `/partner-onboarding` | none set | explicit noindex,nofollow (by design — "operations tool, not SEO content," per its own code comment) | KEEP (correctly private) |

## 9. Small/legal/utility pages — all KEEP (no content issues found this pass)

`/faq`, `/glossary`, `/testimonials` *(see main audit — framing issue, not a URL issue)*, `/contact`, `/consultation`, `/editorial-policy`, `/privacy`, `/terms`, `/tracking` (correctly noindexed-but-crawlable by design).

## 10. `/travel` — KEEP, confirmed fully built (535 lines, full schema/canonical/hreflang/sitemap presence), not a stub. Launched Sept 2026.

---

## Summary counts (this pass, supersedes the 2026-09-13 page-map's narrower count where overlapping)

- **KEEP**: ~62 pages/posts
- **ENRICH (content)**: ~7 (corporate-events, conferences, luxury-vip-events, destination-events, cultural-events title/H1 reconciliation, valet-parking/vip-transportation hotel-bullet expansion)
- **ENRICH (technical-only)**: ~6 fixes covering many more URLs (PSEO hreflang = 38 URLs in 1 file edit; secondary-city sitemap gap = ~21+ URLs; dynamic city `generateStaticParams`; noindex-predicate duplication; `/vendor-registration` canonical/hreflang; AlUla cross-links)
- **MERGE**: 2 confirmed blog pairs (MICE guides; corporate-events-Riyadh-Jeddah pair), 2 softer candidates flagged INVESTIGATE
- **NOINDEX (already correct, no change)**: the full `/locations/[city]/[service]` consolidation set, `/tracking`, `/partner-onboarding`
- **INVESTIGATE (founder decision required)**: `/venues/*` vs `/partners/rcu/*` (4 pages) — canonical-bug + duplicate-content, cannot resolve unilaterally per standing RCU low-profile decision
- **DEAD CODE (harmless, flag only)**: `/portfolio/[slug]/page.tsx` catch-all
