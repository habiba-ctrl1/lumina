# SEM Mega-Event & High-Value Lead SEO Roadmap
*Companion to `SEM-MEGA-EVENT-SEO-AUDIT.md`. Nothing in this document has been built yet — this is the proposed 7-day plan for founder review before any implementation begins.*

**Scope discipline, stated up front**: this plan creates **4 new pages and 2-3 new blog posts** total, not 20. The audit found that most of the brief's proposed IA already exists under different names, and this site has direct, painful, documented history with over-creating programmatic pages (indexed pages 70→238, average position ~14→~28). Every new URL below is justified individually against real intent, differentiation, and (where available) actual GSC evidence — not created because it appeared on a keyword list.

---

## Day 1 — Architecture + Technical Fixes

No new pages today. This is fixing what's already live and already losing value silently.

| Fix | File(s) | Why | Priority |
|---|---|---|---|
| Title double-append bug | `editorial-policy`, `partner-onboarding`, `testimonials`, `services/page.tsx`, `locations/{jeddah,riyadh,makkah,dammam}/page.tsx`, `services/corporate-events/layout.tsx` (EN branch), `glossary/layout.tsx`, `vendors/layout.tsx`, `vendor-registration/layout.tsx`, `partners/layout.tsx`, `blog/[slug]/layout.tsx`, `partners/rcu/*`, `venues/page.tsx` | `<title>` renders as `"X | Saudi Event Management | Saudi Event Management"` on ~12+ live URLs — degrades CTR on every one, been flagged since Aug 17 as "not fixed." Convert each to `title:{absolute:"..."}` (the pattern already correctly used elsewhere in the same files) instead of a plain string. Zero content/URL/keyword change. | P0 |
| Remove fabricated review stat | `services/royal-weddings/page.tsx` trust bar | "4.9★ (148 reviews)" has no backing schema or data anywhere in the codebase — matches the exact fabrication pattern already removed sitewide in August. Replace with the same honest metric used elsewhere ("20+ Vetted Vendors") or remove the tile. | P0 |
| Remove/soften unverifiable award claim | `services/exhibitions/page.tsx` hero trust element | "Award — Winning Booth Design 2024," no awarding body, no reference anywhere else. Same pattern as the already-removed "Best Luxury Event Planner GCC 2024." | P0 |
| Verify or soften "NEOM APPROVED" | `services/destination-events/page.tsx` credentials bar | Reads as a formal certification; nothing in the codebase or business record substantiates it. Confirm with founder — if not a real designation, reword to descriptive language ("NEOM-Experienced Team" or similar, non-certification framing). | P0 |
| Add taif/abha/tabuk to sitemap | `src/app/sitemap.ts` | These 3 city×service combinations are already built and crawlable but absent from the sitemap — pure discoverability gap, no new content needed. | P1 |
| Flag venues/RCU duplicate for founder decision | `venues/*` vs `partners/rcu/*` | Same two properties live at two URL trees. **Do not resolve unilaterally** — this touches the standing "keep RCU relationship low-profile" business decision; needs founder input on which tree is canonical before any merge/redirect. | P1 (decision, not code) |

**Verification**: `tsc --noEmit` clean; spot-check rendered `<title>` tags in dev server on every touched route; confirm no visible-copy regression on royal-weddings/exhibitions/destination-events beyond the specific claims removed.

---

## Day 2 — Mega-Event + Corporate/Commercial Pillar Pages

### Page 1: `/mega-events` (new pillar)

- **Primary search intent**: Commercial/navigational — a company or organizer searching for a firm that can handle a large-scale (500+ guest) event in Saudi Arabia.
- **Primary keyword/theme**: "mega event management company Saudi Arabia"
- **Secondary keyword themes**: "large scale event planning KSA," "500+ guest event company Riyadh," "major event production Saudi Arabia," "large corporate event organizer Saudi Arabia"
- **Target location**: National (Saudi Arabia-wide, not city-split — see audit §11)
- **Search intent**: Commercial investigation → contact. Visitor is scoping capability/credibility before requesting a proposal for a large, complex, high-budget event.
- **Why it deserves to exist**: The single genuine gap in the brief's IA with no existing equivalent anywhere on the site. It also matches the business's actual current model shift (routing 500+ guest / major corporate / government / exhibition / mega-wedding projects to a larger execution partner while SEM retains lead-gen, qualification, and coordination margin) — a page that didn't exist before this model existed. Framed honestly (SEM sources, qualifies, and coordinates; large-scale delivery runs through the strongest partner in the network for the project's scale), it's differentiated from every existing service page, which are written at a more typical event scale.
- **Recommended H1**: "Mega Event Management in Saudi Arabia"
- **Suggested title tag**: "Mega Event Management Company in Saudi Arabia | 500+ Guest Events | Saudi Event Management"
- **Suggested meta description**: "Planning a large-scale event in Saudi Arabia — 500+ guests, major corporate, government, or exhibition scale? Saudi Event Management sources, qualifies, and coordinates delivery through the Kingdom's strongest execution partners. Request a proposal."
- **CTA**: "Request a Mega-Event Proposal" (heavier-qualification form — see Day 6)
- **Parent page**: `/services` hub (added as a featured entry, not buried)
- **Internal links to add** (from this new page, outbound): corporate-events, exhibitions, conferences, royal-weddings, the upgraded gala-dinner blog post, new brand-activation page, new product-launch page
- **Internal links from** (inbound, to add on existing pages): homepage hero/footer link hub, `/services` hub card, corporate-events "related services," exhibitions "related services"
- **Indexable**: Yes, EN + AR (write both bodies before launch — do not ship EN-only and add to `TRANSLATED_AR_ROUTES` before the AR body exists, per the site's own registry discipline)
- **Priority**: P0

### Page 2: `gala-dinner-awards-ceremony-planning-saudi-arabia` (upgrade existing blog post — no new URL)

- **Primary search intent**: Commercial — already validated: position ~21, 2,264 impressions, 0 clicks at last measurement.
- **Primary keyword/theme**: "gala dinner planning Saudi Arabia" / "award ceremony planning Saudi Arabia"
- **Secondary keyword themes**: "corporate gala company Riyadh," "awards night event management KSA"
- **Target location**: National
- **Why upgrade in place instead of a new `/services/gala-dinner-events` URL**: it already has earned impressions at its current URL; a new competing service-page URL would split authority against itself and violate the site's own "never change URLs" discipline. The 0% CTR despite meaningful impressions signals a conversion/framing problem, not a wrong-URL problem.
- **What changes**: add a proper commercial CTA block at the top of the post (proposal-request framing, not a generic "read more" blog CTA), tighten the title/meta for commercial intent (front-load "Gala Dinner & Award Ceremony Planning Company" over the more generic guide framing), keep all existing body content and word count intact (no thinning).
- **Recommended title tag**: "Gala Dinner & Award Ceremony Planning Company in Saudi Arabia | Saudi Event Management"
- **Suggested meta description**: "Full-service gala dinner and award ceremony planning across Saudi Arabia — venue sourcing, stage production, entertainment, and guest experience, coordinated end-to-end. Request a proposal."
- **CTA**: "Request a Gala Proposal"
- **Parent page**: `/blog` (stays a blog URL) but heavily cross-linked from `/mega-events`, `corporate-events`, `luxury-vip-events`
- **Internal links to add**: to `/mega-events` (new), to `corporate-events`
- **Internal links from**: already has 3 (corporate-events, luxury-vip-events, conferences) — add `/mega-events` as a 4th once built
- **Indexable**: Already indexed — no change
- **Priority**: P0

### Page 3: `/services/product-launch-events` (new)

- **Primary search intent**: Commercial — company planning a product/brand reveal event.
- **Primary keyword/theme**: "product launch event company Saudi Arabia"
- **Secondary keyword themes**: "product launch planning Riyadh," "brand reveal event management KSA," "press launch event Saudi Arabia"
- **Target location**: National
- **Search intent**: Commercial investigation, typically B2B marketing/brand teams (automotive, tech, FMCG, real estate) sourcing an event partner for a specific reveal-moment production.
- **Why it deserves to exist**: Currently only a bullet point inside `corporate-events` — genuinely distinct production requirements (embargoed press logistics, reveal-moment staging, brand-exclusivity venue lockdown) that a generic corporate-events page can't showcase properly. Real, common commercial event type in the KSA market (automotive and real-estate launches especially).
- **Recommended H1**: "Product Launch Event Management in Saudi Arabia"
- **Suggested title tag**: "Product Launch Event Company Saudi Arabia | Brand Reveal & Press Events | Saudi Event Management"
- **Suggested meta description**: "Planning a product or brand launch in Saudi Arabia? We coordinate reveal-moment staging, press logistics, and guest experience through our vetted production partner network. Request a proposal."
- **CTA**: "Request a Launch Proposal"
- **Parent page**: `/services` hub, child of `corporate-events`
- **Internal links to add**: corporate-events, event-production, `/mega-events`
- **Internal links from**: corporate-events (replace the current bullet-point mention with a real link), `/services` hub, `/mega-events`
- **Indexable**: Yes, EN + AR
- **Priority**: P1

**Verification**: `tsc --noEmit` clean; dev-server render check EN+AR for `/mega-events` and `/services/product-launch-events`; confirm the gala post's word count did not shrink.

---

## Day 3 — Riyadh-Focused Work

Riyadh already has strong, real coverage (static city page, 6+ PSEO service×city combinations, the deepest venue content of any city). Day 3 is **not** about creating new Riyadh URLs — it's about fixing the two real Riyadh-relevant gaps found in the audit: inconsistent broker-framing and duplicate venue copy.

| Task | Pages | Why |
|---|---|---|
| Bring broker-network framing up to the exhibitions/event-production standard | `conferences`, `luxury-vip-events`, `destination-events` | These three lean toward first-party language ("our production team," "we bring our full production capability... directly") without partner-network disclosure. Match the honest, differentiated framing already proven on exhibitions/event-production. No URL/keyword change — copy-only edit. |
| De-duplicate venue-list copy | `corporate-events` vs `conferences` | Both list near-identical KAFD/RICEC/Ritz-Carlton/Four Seasons/Al Faisaliah/JW Marriott copy. Differentiate the angle (corporate-events keeps the full venue list; conferences trims to conference-specific capacity/AV specs only) to reduce duplicate-content signal on shared queries like "corporate event venues Riyadh." |
| Internal-link the new pillar pages in | `/mega-events`, product-launch page | Add contextual links from Riyadh-heavy pages (`corporate-events-riyadh` PSEO page, `locations/riyadh`) into the new mega-events and product-launch pages. |

**Priority**: P1 (trust/consistency fix, not new content — but directly serves CLAUDE.md's hard rule on not overstating owned capability).

---

## Day 4 — Jeddah-Focused Work

Similarly, Jeddah already has solid coverage. Day 4 builds the one genuinely missing piece with a natural Jeddah tie-in, plus a smaller consolidation fix.

### Page 4: `/services/brand-activation` (new)

- **Primary search intent**: Commercial — brand/marketing teams sourcing experiential/consumer-facing activation production, distinct from internal corporate events.
- **Primary keyword/theme**: "brand activation company Saudi Arabia"
- **Secondary keyword themes**: "experiential marketing event Saudi Arabia," "brand activation Jeddah Season," "pop-up brand experience KSA"
- **Target location**: National, with a strong Jeddah Season / Riyadh Season contextual tie-in (both festivals are the biggest annual driver of brand-activation demand in KSA)
- **Search intent**: Commercial investigation, marketing/brand teams (often agencies or in-house brand teams) planning consumer-facing pop-ups, festival activations, retail experiences.
- **Why it deserves to exist**: Genuinely distinct from `corporate-events` (internal/B2B framing) — activation is consumer-facing, experiential, and increasingly tied to Saudi Arabia's seasonal entertainment calendar (Riyadh Season, Jeddah Season). The existing blog post `entertainment-activations-jeddah-season-corporate` already touches this intent but there's no commercial service page to convert that traffic.
- **Recommended H1**: "Brand Activation & Experiential Events in Saudi Arabia"
- **Suggested title tag**: "Brand Activation Company Saudi Arabia | Experiential Events & Season Activations | Saudi Event Management"
- **Suggested meta description**: "Consumer-facing brand activations, pop-ups, and experiential events across Saudi Arabia — including Riyadh Season and Jeddah Season activation support. Request a proposal."
- **CTA**: "Request an Activation Proposal"
- **Parent page**: `/services` hub
- **Internal links to add**: `entertainment-activations-jeddah-season-corporate` (existing blog), new Riyadh Season post (Day 5), `corporate-events`
- **Internal links from**: `corporate-events`, `entertainment` service page, `/services` hub
- **Indexable**: Yes, EN + AR
- **Priority**: P1

| Additional task | Pages | Why |
|---|---|---|
| Confirm sitemap fix from Day 1 shipped | `taif`/`abha`/`tabuk` | Verification pass — these are geographically closer to the Jeddah/Eastern-Province cluster in the city list, natural to re-check here. |

**Priority**: P1 overall for this day.

---

## Day 5 — High-Value Seasonal/Event Pages

All seasonal content ships as **blog posts**, not standalone service pages — matching the pattern already proven on the National Day and Ramadan posts, and avoiding a fresh cluster of thin pillar pages.

### Post 1: Riyadh Season corporate/activation support (new)

- **Primary search intent**: Informational→commercial — companies wanting to run corporate events, activations, or hospitality during Riyadh Season.
- **Primary keyword/theme**: "corporate events Riyadh Season"
- **Secondary keyword themes**: "Riyadh Season brand activation," "corporate hospitality Riyadh Season"
- **Target location**: Riyadh
- **Why it deserves to exist**: Riyadh Season is the single largest annual entertainment/tourism event in Saudi Arabia and currently has **zero** coverage on the site (Jeddah Season has partial coverage via one blog post; Riyadh Season, the larger of the two, has none). Real commercial angle: brands running activations/hospitality tied to the season, not implying official festival affiliation.
- **Recommended H1**: "Planning a Corporate Event or Activation During Riyadh Season"
- **Suggested title tag**: "Corporate Events & Brand Activations During Riyadh Season | Saudi Event Management"
- **Suggested meta description**: "Running a corporate event, hospitality suite, or brand activation during Riyadh Season? Here's how to plan around the calendar, secure venues early, and coordinate activation logistics."
- **CTA**: link to new `/services/brand-activation` page + WhatsApp
- **Parent page**: `/blog`, cross-linked from `brand-activation` and `entertainment-activations-jeddah-season-corporate`
- **Internal links to add**: `brand-activation`, `entertainment`, `corporate-events`
- **Internal links from**: `brand-activation` (new), `/services` hub blog resources grid
- **Indexable**: Yes, EN + AR
- **Priority**: P1

### Post 2: Founding Day event ideas (new, mirrors National Day post)

- **Primary keyword/theme**: "Founding Day event ideas Saudi Arabia" / "Founding Day corporate event"
- **Target location**: National
- **Why**: Low-effort, proven pattern (the National Day post already works this angle and was recently refreshed) — Founding Day (Feb 22) is a comparable annual corporate-event occasion with zero current coverage.
- **Recommended H1**: "Founding Day Event Ideas for Saudi Companies"
- **Suggested title tag**: "Saudi Founding Day Event Ideas for Corporates 2027 | Saudi Event Management"
- **Suggested meta description**: "Celebrating Founding Day with your team or clients? Corporate event, activation, and hospitality ideas for Saudi Arabia's national heritage day."
- **CTA**: WhatsApp + link to `corporate-events`
- **Parent page**: `/blog`
- **Internal links to add**: `corporate-events`, `cultural-events`
- **Internal links from**: `national-day-event-ideas-saudi-arabia-corporates` (reciprocal seasonal cluster link), `cultural-events`
- **Indexable**: Yes, EN + AR
- **Priority**: P2

### Post 3: Consolidated exhibition-calendar support post (FII / LEAP / Cityscape / Big 5) (new)

- **Primary keyword/theme**: "event support for exhibitors Saudi Arabia" (umbrella), with FII/LEAP/Cityscape/Big5 named as H2 sections within one post
- **Target location**: National (Riyadh-weighted — most of these run in Riyadh)
- **Why one post, not four**: real B2B-exhibitor-support intent exists (companies attending FII, LEAP, Cityscape Saudi, Big 5 Saudi need booth support, VIP hospitality, transport), but each individually doesn't carry enough unique content to justify a standalone page without becoming thin/repetitive — exactly the sprawl pattern this site has already been burned by. One consolidated post covering all four, feeding into `/services/exhibitions`, is proportionate.
- **Recommended H1**: "Event & Hospitality Support for Saudi Arabia's Major Exhibitions (FII, LEAP, Cityscape, Big 5)"
- **Suggested title tag**: "Exhibition Support Services for FII, LEAP, Cityscape & Big 5 Saudi | Saudi Event Management"
- **Suggested meta description**: "Exhibiting or hosting hospitality at FII, LEAP, Cityscape Saudi, or Big 5 Saudi? We coordinate booth support, VIP transport, and hospitality logistics around the Kingdom's major exhibition calendar."
- **CTA**: link to `exhibitions` + `vip-transportation`
- **Parent page**: `/blog`, linked from `exhibitions` and `plan-mega-exhibition-riyadh-logistics`
- **Internal links to add**: `exhibitions`, `vip-transportation`, `mega-events`
- **Internal links from**: `exhibitions`, `plan-mega-exhibition-riyadh-logistics` (existing post)
- **Indexable**: Yes, EN + AR
- **Priority**: P2

### Government events — decision point, not a build

Per audit §11: do **not** build `/services/government-events` this cycle without an explicit founder go-ahead, given the standing "government/embassy work is referral-only, never solicited" business rule. If approved, it would follow the same disciplined, non-relationship-claiming pattern already proven safe on `/locations/alula` and the generic GEA/MISA/DGDA mentions elsewhere — flagged here as a Day-5-adjacent decision item, not scheduled work.

---

## Day 6 — Conversion + Request a Proposal Funnel + Internal Linking

All additive, no rebuild, no new CRM system (per audit §6.6 — the founder's own prior diagnosis is that vendor-quote turnaround speed, not the intake funnel, is the real conversion bottleneck; this day fixes clear, cheap gaps without solving the wrong problem).

| Fix | Where | Detail |
|---|---|---|
| Add optional budget-range field | `ServiceLeadForm.tsx`, `ContactSection.tsx` | Schema already has `Inquiry.budget` / `QuoteRequest.budgetRange` — just never captured publicly. Add as an optional select (e.g. "Under SAR 50k / 50k–150k / 150k–500k / 500k+ / Prefer to discuss") — optional so it doesn't add friction, but lets the founder triage mega-event-scale leads instantly. |
| Align `ContactSection` fields with `ServiceLeadForm` | `ContactSection.tsx` | Homepage form currently missing phone, company, city, date, guest count — a homepage visitor is under-qualified compared to a service-page visitor. Bring it to parity (or just reuse `ServiceLeadForm` on the homepage instead of maintaining a second implementation). |
| Add spam protection to `/api/contact` | `src/app/api/contact/route.ts` | No honeypot, no rate limit today — the vendor-facing `/api/partner-applications` route already has both; port the same pattern over. Protects the higher-traffic, higher-value client-facing endpoint. |
| Add a slightly heavier qualification step for mega-event leads specifically | `/mega-events` page's form instance | Reuse `ServiceLeadForm` but pass mega-event-specific event-type options and a guest-count field framed in bands (200-500 / 500-1,000 / 1,000+) rather than free text — cheap, no new component needed, just prop configuration on the existing shared form. |
| Wire all new pages' internal links | `/mega-events`, product-launch, brand-activation, gala post | Complete the reciprocal internal-linking set planned in Days 2-5 — homepage footer link hub, `/services` hub cards, related-services grids on corporate-events/exhibitions/conferences. |

**Priority**: P0 for spam protection (security gap), P1 for the rest.

---

## Day 7 — SEO QA + Metadata + Sitemap + Schema + Search Console Readiness

| Task | Detail |
|---|---|
| Verify title-bug fix | Re-check all ~12+ routes from Day 1 render a single, correct `<title>` — no residual doubling. |
| Add new pages to `sitemap.ts` | `/mega-events`, `/services/product-launch-events`, `/services/brand-activation`, the 2 new blog posts (Founding Day, exhibition-calendar). EN + AR entries only once AR bodies are written. |
| Add new pages to `TRANSLATED_AR_ROUTES` | Same set — only after the Arabic body is actually complete for each, per the registry's own discipline (never list a route as translated before it is). |
| Confirm schema on new pages | Service + FAQPage + BreadcrumbList JSON-LD present and internally consistent with the visible breadcrumb trail on every new page (per audit §4.5, these are two independently-maintained sources today — hand-verify they match on the 4 new pages at minimum). |
| Merge/flag near-duplicate blog posts | `elevating-corporate-events-riyadh-jeddah` vs `corporate-event-excellence-riyadh-jeddah` — bring to founder for a merge-or-differentiate decision (out of this roadmap's build scope, but surface it explicitly rather than let it sit another cycle). |
| Founder decision checkpoint | `venues/*` vs `partners/rcu/*` duplicate (Day 1 flag) — resolve or explicitly defer. |
| Request-indexing list | Prepare the GSC request-indexing URL list for all net-new/changed URLs (mirrors the existing day-1/day-2 request-indexing rotation pattern already used in this project), for the founder to submit. |
| Final `tsc --noEmit` + full dev-server render pass | Every new/changed route, EN + AR, before handing back for founder review. |

---

## Net New Surface Area (summary)

- **4 new pages**: `/mega-events`, `/services/product-launch-events`, `/services/brand-activation`, plus the in-place upgrade of the existing gala-dinner blog post (no new URL).
- **2-3 new blog posts**: Riyadh Season, Founding Day, consolidated FII/LEAP/Cityscape/Big5.
- **0 new city-split pages** — deliberately deferred until the national pages show real GSC demand, mirroring exactly how the existing PSEO city pages were built.
- **1 conditional item held for founder decision**: government events.
- **6 technical/trust fixes** to already-live pages (title bug, 2 fabrication regressions, 1 unverified claim, sitemap orphans, spam protection).

This is a deliberately small, evidence-weighted plan. If the founder wants more page volume after seeing real performance data from these, the next tranche (city-splits for gala/product-launch/brand-activation, or the government-events page) should be scoped the same way — one page, one piece of evidence, at a time.
