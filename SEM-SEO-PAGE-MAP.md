# SEM SEO Page Map
*Master classification of every existing and proposed URL. Companion to `SEM-MEGA-EVENT-SEO-AUDIT.md` and `SEM-MEGA-EVENT-SEO-ROADMAP.md`. Purpose: prevent duplicate/cannibalizing pages as this plan is implemented.*

**Legend**: KEEP (as-is) · IMPROVE (same URL, edit content/schema/copy) · MERGE (fold into another page) · REDIRECT (301/permanent, no live content of its own) · NOINDEX (stays live, excluded from index/sitemap) · CREATE (new page) · DO NOT CREATE (evaluated and rejected)

---

## 1. Core Service Pages (`/services/*`)

| URL | Classification | Notes |
|---|---|---|
| `/services` (hub) | IMPROVE | Add `/mega-events`, product-launch, and brand-activation cards once built (Day 2/4). Fix title double-append bug (Day 1). |
| `/services/corporate-events` | IMPROVE | Strong page, keep structure. Fixes: tighten partner-network disclosure on AV/registration-platform copy; de-duplicate venue list vs. `/services/conferences` (Day 3). |
| `/services/conferences` | IMPROVE | Same venue-list de-dup as above; strengthen partner-network disclosure to match exhibitions/event-production standard (Day 3). |
| `/services/exhibitions` | IMPROVE | Model page for broker-framing — keep as the template. Remove the unverified "Award — Winning Booth Design 2024" claim (Day 1). |
| `/services/weddings` | KEEP | Genuinely differentiated from royal-weddings (general commercial vs. ceremonial/high-net-worth intent). No cannibalization found. |
| `/services/royal-weddings` | IMPROVE | Remove the fabricated "4.9★ (148 reviews)" trust-bar stat (Day 1, highest priority fix in this whole audit). Otherwise keep — deep, differentiated content. |
| `/services/luxury-vip-events` | IMPROVE | Strengthen partner-network disclosure (currently leans first-party: "we bring our full production capability... directly") (Day 3). |
| `/services/event-production` | KEEP | Model page for broker-framing, real partner photos, honest indicative pricing. |
| `/services/destination-events` | IMPROVE | Strengthen partner-network disclosure; verify or soften "NEOM APPROVED" claim (Day 1). Covers destination weddings adequately — do not split out a separate destination-weddings page without GSC evidence of unmet demand. |
| `/services/cultural-events` | KEEP | No issues found in this pass. |
| `/services/production-venues` | KEEP | No issues found in this pass. |
| `/services/valet-parking` | KEEP | Real AP-backed page, correctly text-only/no-vendor-name per existing agreement stage. |
| `/services/vip-transportation` | KEEP | Same as above. |
| `/services/entertainment` | KEEP | Same as above. |
| `/services/birthday-party` | KEEP | Real vendor-backed niche page, appropriately scoped. |
| `/services/[slug]` (19 PSEO city×service pages) | KEEP | Genuinely differentiated content per combination, not templated filler. No changes needed this cycle. |
| **`/services/gala-dinner-events`** (as a brand-new URL) | **DO NOT CREATE** | The intent is already served by the blog post `gala-dinner-awards-ceremony-planning-saudi-arabia`, which already has GSC-validated impressions at its current URL. A new competing service URL would split authority against itself. |
| **`/services/award-ceremony-events`** | **DO NOT CREATE** | Same audience/format as gala dinners in Saudi market practice — splitting doubles thin content instead of strengthening one asset. Covered by the gala post upgrade instead. |
| **`/services/product-launch-events`** | **CREATE** | Genuine gap, distinct production requirements (reveal staging, embargoed press, brand exclusivity) not served by generic corporate-events content. Day 2. P1. |
| **`/services/brand-activation`** | **CREATE** | Genuine gap, distinct consumer-facing/experiential intent vs. internal corporate-events framing; strong Riyadh Season / Jeddah Season tie-in. Day 4. P1. |
| **`/services/conference-management`** | **DO NOT CREATE** | Duplicates `/services/conferences` under a worse name. |
| **`/services/exhibition-management`** | **DO NOT CREATE** | Duplicates `/services/exhibitions` under a worse name. |
| **`/services/vip-events`** | **DO NOT CREATE** | Duplicates `/services/luxury-vip-events` under a worse name. |
| **`/services/large-weddings`** | **DO NOT CREATE** | Duplicates `/services/royal-weddings` under a worse name. |
| **`/services/destination-weddings`** | **DO NOT CREATE** (for now) | Currently folded into `/services/destination-events`. Revisit only if GSC query data on that page shows meaningful "destination wedding" volume being underserved — not a default build. |
| **`/services/government-events`** | **CREATE — conditional, founder decision required** | Brushes against the standing "government/embassy work is referral-only, never solicited" business rule. Organic SEO for inbound inquiries is arguably distinct from bidding a sealed tender, but this specific page must not be built without explicit sign-off given how close it sits to that line. Not scheduled in the 7-day roadmap. |

---

## 2. New Pillar Page

| URL | Classification | Notes |
|---|---|---|
| **`/mega-events`** | **CREATE** | The one page in the brief's original IA with no existing equivalent anywhere on the site. Real differentiated intent (500+ guest / major-scale events), matches the business's actual model (source + qualify + coordinate through the strongest execution partner for scale). Day 2. P0. |

---

## 3. Location Pages (`/locations/*`)

| URL | Classification | Notes |
|---|---|---|
| `/locations` (hub) | KEEP | No issues found. |
| `/locations/riyadh`, `/jeddah`, `/dammam`, `/alula`, `/makkah` (static) | KEEP | Fix title double-append on `jeddah`/`riyadh`/`makkah`/`dammam` (Day 1). No content changes needed. |
| `/locations/[city]` — neom, khobar, madinah, taif, abha, diriyah, tabuk (dynamic, no `generateStaticParams`) | IMPROVE (technical only) | Consider adding `generateStaticParams` for consistency with the 5 static city pages — architectural cleanup, not an SEO-urgent fix. Not scheduled in the 7-day roadmap; flag for a future technical-debt pass. |
| `/locations/[city]/corporate-event-management` (all 12 cities) | NOINDEX | Already correctly noindexed — folds into `/services/corporate-events-{city}` PSEO pages. No change. |
| `/locations/[city]/conference-planning` (non-Riyadh) | NOINDEX | Already correctly noindexed. Riyadh variant stays indexable (no `/services/conference-management-riyadh` PSEO twin exists yet). No change. |
| `/locations/[city]/{luxury-wedding-planning, exhibition-management, vip-event-planning}` (indexable subset per sitemap) | KEEP | Working as designed — verify none of these have since grown a `/services/[slug]` twin that would trigger the same cannibalization pattern; if one is added later, apply the identical noindex predicate. |
| `/locations/taif/*`, `/locations/abha/*`, `/locations/tabuk/*` service combinations | IMPROVE (technical) | Built and crawlable but missing from `sitemap.ts` — add them (Day 1). No content change. |
| **New location-split pages for gala/product-launch/brand-activation** | **DO NOT CREATE (yet)** | Every existing city split followed proven national-level demand first. Apply the same discipline — revisit only once the new national pages have real GSC data. |

---

## 4. Blog (`src/lib/blog-data.ts`, ~40 posts)

| URL/Slug | Classification | Notes |
|---|---|---|
| `gala-dinner-awards-ceremony-planning-saudi-arabia` | IMPROVE | Upgrade in place with a real commercial CTA block and tighter commercial title/meta — do not create a competing service-page URL. Day 2. P0. |
| `elevating-corporate-events-riyadh-jeddah` | MERGE (into the other) | Near-duplicate of the post below — bring to founder for a merge-or-differentiate call (Day 7 flag, not built in this cycle). |
| `corporate-event-excellence-riyadh-jeddah` | MERGE (target) | Likely merge target for the above, or the one to keep if it has the stronger position — founder to confirm which one is currently ranking better before deciding direction. |
| `national-day-event-ideas-saudi-arabia-corporates` | KEEP | Already refreshed/optimized in a prior session — no further action needed. |
| `ramadan-event-planning-guide-saudi-arabia` | KEEP | Adequate existing coverage — no new Ramadan page needed. |
| `entertainment-activations-jeddah-season-corporate` | IMPROVE | Add reciprocal internal link to new `/services/brand-activation` page (Day 4). |
| `plan-mega-exhibition-riyadh-logistics` | IMPROVE | Add reciprocal internal link to new `/mega-events` page and the new FII/LEAP/Cityscape/Big5 post (Day 5/7). |
| All other 33+ posts | KEEP | Not in scope of this audit's content-quality spot-check; no action recommended without a dedicated blog-wide review. |
| **New: Riyadh Season corporate/activation post** | **CREATE** | Zero current coverage of the Kingdom's largest annual entertainment event — real gap. Day 5. P1. |
| **New: Founding Day event ideas post** | **CREATE** | Low-effort, mirrors the proven National Day pattern. Day 5. P2. |
| **New: Consolidated FII/LEAP/Cityscape/Big5 exhibition-support post** | **CREATE** | One post, not four — real B2B-exhibitor-support intent, insufficient unique content per event to justify four separate pages. Day 5. P2. |
| **Four separate FII/LEAP/Cityscape/Big5 pages** | **DO NOT CREATE** | Exactly the thin-sprawl pattern that already damaged this site's average position once (70→238 indexed pages). |
| **Separate Jeddah Season post** (beyond what exists) | **DO NOT CREATE** | `entertainment-activations-jeddah-season-corporate` already covers this adequately; improve its internal linking instead of adding a second post. |

---

## 5. Portfolio / Venues / Partners

| URL | Classification | Notes |
|---|---|---|
| `/portfolio` (hub) + 3 categories + 14 case studies | KEEP | Not in scope of the fabrication spot-check this pass; no action recommended without a dedicated review. |
| `portfolio/[slug]/page.tsx` (dynamic catch-all) | NOINDEX / flag | Currently a dead stub (`notFound()` always). Not harmful as-is (no real URL resolves through it), but flag as dead code for a future cleanup — not an SEO action. |
| `/portfolio-luxury` | KEEP (as redirect) | Already correctly implemented as a 308 permanent redirect to `/portfolio`, already excluded from sitemap. No change. |
| `/venues` + `/venues/{alfursan,almughayra}` | **DECISION NEEDED** | Duplicates `/partners/rcu/{alfursan,almughayra}` content. Do not merge/redirect unilaterally — touches the standing low-profile-RCU business decision. Flag to founder (Day 1/Day 7). |
| `/partners/rcu/{alfursan,almughayra}` | **DECISION NEEDED** | Same as above — draft-branch-only, deliberately excluded from `main` per prior decisions; confirm intended canonical tree before any technical action. |
| `/partners`, `/partners/become-one` | KEEP | No issues found this pass. |

---

## 6. Standalone / Utility Pages

| URL | Classification | Notes |
|---|---|---|
| `/`, `/about`, `/about/our-team`, `/about/our-team/habiba-asghar`, `/about/awards-accolades`, `/about/careers` | KEEP | No issues found this pass (awards-accolades already reframed honestly in prior cleanup). |
| `/contact` | IMPROVE | Add spam protection + budget field alignment (Day 6) — see Conversion Funnel section below. |
| `/consultation`, `/faq`, `/glossary`, `/testimonials` | KEEP | Fix title double-append on `testimonials` and `glossary` (Day 1). No content changes. |
| `/privacy`, `/terms`, `/editorial-policy` | IMPROVE (technical only) | Fix title double-append on `editorial-policy` (Day 1). No content change needed — legal/low-priority pages. |
| `/tracking` | KEEP | Correctly noindexed but deliberately crawlable — working as designed. |
| `/travel` | KEEP | Recently launch-readied per prior session; no new issues found. |
| `/vendor-registration`, `/vendors`, `/partner-onboarding` | KEEP (out of scope) | Vendor-side funnel, not part of this client-lead-focused audit. Title double-append fix applies to `vendors`/`vendor-registration`/`partner-onboarding` (Day 1). |

---

## 7. Conversion Funnel (not URLs, but tracked here per the brief's request)

| Item | Classification | Notes |
|---|---|---|
| `ServiceLeadForm` (shared, 16 pages) | IMPROVE | Add optional budget-range field (Day 6). |
| `ContactSection` (homepage form) | IMPROVE | Bring field parity with `ServiceLeadForm` (phone/company/city/date/guests currently missing) (Day 6). |
| `/api/contact` | IMPROVE | Add honeypot + rate-limit, matching the pattern already live on `/api/partner-applications` (Day 6). P0 — this is a live security/spam gap, not just a nice-to-have. |
| Dedicated "Request a Proposal" qualification page | **DO NOT CREATE as a separate page** | Reuse the existing shared form with mega-event-specific props (guest-count bands, event-type options) on the new `/mega-events` page instead of building a whole new page/component (Day 6). Avoids maintaining a third form implementation. |
| `Lead.status` funnel enum (New→Won/Lost) | **NOT IN SCOPE** | Exists in schema, never surfaced in UI — a real gap, but a CRM/admin-panel build, not an SEO/content task. Flagged in the audit for awareness, not scheduled here. |
| `Communication` model | **NOT IN SCOPE** | Fully unused in code — same as above, an admin-panel gap outside this audit's scope. |

---

## Summary Counts

- **KEEP**: ~55 pages/posts
- **IMPROVE**: ~20 pages/posts + 3 funnel components
- **MERGE**: 2 blog posts (pending founder decision on direction)
- **NOINDEX**: ~15 already-correct combinations (no change) + 1 dead stub flagged
- **DECISION NEEDED** (not classified until founder input): 4 pages (`venues/*` × 2, `partners/rcu/*` × 2)
- **CREATE**: 4 pages (`/mega-events`, product-launch, brand-activation) + 3 blog posts, 1 conditional (government-events, pending sign-off)
- **DO NOT CREATE**: 10 pages evaluated and explicitly rejected (see table entries above)
