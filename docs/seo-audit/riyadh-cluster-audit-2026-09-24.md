AUDIT STATUS: COMPLETE. Superseded for implementation purposes by `riyadh-phase-master-plan-2026-09-24.md` (same date, fuller architecture/keyword/vendor/AEO/conversion layers built on top of this document's conclusions — none overturned).
SCOPE: Riyadh only
NO CODE CHANGED TO PRODUCE THIS DOCUMENT.

**IMPLEMENTATION STATUS (updated 2026-09-24, follow-up session):** The 3 Riyadh-scoped P0 fixes this document called for in §K (gala-tile link, Diriyah link, `luxury-wedding-planning` noindex) are now **DONE** — see `SEM-IMPLEMENTATION-LOG.md` (2026-09-24 entry) for the change log. Everything else in this document (the 2 new PSEO pages, the merge decision, etc.) remains unimplemented.

*Compiled 2026-09-24. This is a new, narrower-scope audit — not a renumbering of the existing "Phase 0/Phase 1" work. It treats the following as a fixed, already-completed baseline and does NOT re-derive any of it:*
- *`docs/seo-audit/phase-0-*.md` (2026-09-22 sitewide audit — URL inventory, opportunities, technical/trust/UX findings)*
- *`SEM-MEGA-EVENT-SEO-AUDIT.md` / `-ROADMAP.md` / `-PAGE-MAP.md` (2026-09-13 mega-event brief audit)*
- *`SEM-IMPLEMENTATION-LOG.md` (2026-09-20 fabrication/SAR-price cleanup, already in the working tree)*
- *`AUDIT-03-GSC.md` (2026-09-20 GSC facts, "Last 3 months" export)*

*This document goes one level deeper than any of the above on Riyadh specifically: every Riyadh-tagged query in the raw GSC export (not just the sitewide top-30), the current vendor tracker filtered for Riyadh coverage, and a line-by-line read of the actual Riyadh page code (`locations/riyadh/page.tsx`, the `[city]/[service]` grid, and the 4 existing Riyadh PSEO entries in `services/[slug]/page.tsx`). Where this document repeats a prior finding, it's cited, not re-investigated.*

*Data note: `AUDIT-03-GSC.md` used the "Last 3 months" export pulled 2026-09-20. A fresher export was pulled 2026-09-24 (this session) covering "Last 6 months" (1,092 queries, 31,572 impressions, 65 clicks; 244 pages, 74,436 impressions) — a larger sample, same site, no methodology change. Every Riyadh-specific number in this document is sourced from the 2026-09-24 six-month export, cross-checked against the 2026-09-20 three-month export. The two datasets agree closely (e.g. `/locations/riyadh` 5,676→6,022 impressions, gala blog 6,403→6,873 impressions) — nothing below is a one-off spike, and no finding changed direction between the two pulls.*

---

## 0. TL;DR

Riyadh is already the best-covered city on the site — a genuinely deep static hub page (1,061 lines, real venue/permit/seasonal content, not filler) plus 4 PSEO pages plus a 5-page location grid. The instinct to "audit before building" is correct, because the honest finding is: **Riyadh needs 2 new pages, not a new cluster.** Everything else is a linking fix, a schema fix, or a duplicate that should be quietly consolidated using the exact pattern this site already proved works in August.

Three concrete findings drove this conclusion:

1. **Riyadh is the one primary city missing PSEO twins for its two most natural categories.** `exhibitions-{jeddah,dammam}` and `conference-management-{jeddah,dammam}` exist; `exhibitions-riyadh` and `conference-management-riyadh` do not — despite Riyadh carrying RICEC, KAICC, and KAFD (the country's flagship exhibition/conference venues) and despite real, scattered GSC demand across ~15 exhibition/booth/registration queries that no single page currently owns.
2. **A cannibalization pattern the site already fixed once (Aug 2026) has silently recurred for weddings.** `/services/luxury-weddings-riyadh` (PSEO, ranks position ~7) and `/locations/riyadh/luxury-wedding-planning` (grid, position ~34) are the same twin-page pattern that `corporate-event-management` and `conference-planning` were already noindexed for — just never caught for weddings. This is new, not previously flagged anywhere in the repo.
3. **The single biggest validated keyword opportunity on the whole site (gala/awards, 6,873 impressions on one blog post as of the 2026-09-24 export, up from 6,403 four days earlier — a growing, not fading, opportunity) is concentrated in Riyadh venue language (KAFD, Ritz-Carlton, RICEC) — and the Riyadh hub page has a "Gala Dinners & Award Ceremonies" tile that currently links to the generic `/services/corporate-events` instead of that asset.** Zero-risk, one-line fix.

No mass city-split, no new location pages, no new grid rows. The site already lived through the 70→238 indexed-page regression once; this audit deliberately does not repeat that mistake.

---

## A. Existing Riyadh URLs (complete inventory)

| # | URL | Type | Indexable? | GSC (6mo, 2026-09-24) | Notes |
|---|---|---|---|---|---|
| 1 | `/locations/riyadh` | Static hub | Y | 6,022 impr, pos 48.67, 18 clicks | Deep (1,061 ln): venue directory, permit FAQ (Amanah Ar-Riyad/SECB/GEA/DGDA), seasonal event calendar, Diriyah venue card |
| 2 | `/locations/riyadh/corporate-event-management` | Grid | **NOINDEX** (has PSEO twin) | 595 impr, pos 79.89 (still crawled/measured pre-noindex data lag) | Correctly consolidated 2026-08-22 |
| 3 | `/locations/riyadh/conference-planning` | Grid | Y (kept — no PSEO twin) | 358 impr, pos 68.76 | Kept indexable specifically *because* no twin exists — see §B |
| 4 | `/locations/riyadh/exhibition-management` | Grid | Y (kept — no PSEO twin) | 19 impr, pos 52.89 | Same reasoning |
| 5 | `/locations/riyadh/vip-event-planning` | Grid | Y | 7 impr, pos 40.71 | No PSEO twin exists or is proposed — correctly the canonical answer for this thin intent |
| 6 | `/locations/riyadh/luxury-wedding-planning` | Grid | Y — **should be noindexed, see §B** | 7 impr, pos 34.29 | **Has an unflagged PSEO twin** (`luxury-weddings-riyadh`, pos ~7) |
| 7 | `/services/corporate-events-riyadh` | PSEO | Y (EN+AR) | 24 impr, pos 54.00 | |
| 8 | `/services/luxury-weddings-riyadh` | PSEO | Y (EN+AR) | 35 impr, pos 6.97 | Best-ranking Riyadh URL on the whole site |
| 9 | `/services/event-production-riyadh` | PSEO | Y (EN+AR) | 226 impr, pos 59.26 | |
| 10 | `/services/cultural-events-riyadh` | PSEO | Y (EN+AR) | 18 impr, pos 18.22 | Already name-checks Riyadh Season |
| 11 | `/blog/best-wedding-venues-riyadh-2026` | Blog | Y (EN+AR) | 997 impr, pos 7.84, 14 clicks | Strong performer |
| 12 | `/blog/best-corporate-event-venues-riyadh-2026` | Blog | Y (EN+AR) | 629 impr, pos 11.98, 6 clicks | Strong performer |
| 13 | `/blog/best-event-management-company-riyadh-questions-to-ask` | Blog | Y (EN+AR) | 277 impr, pos 25.47 | |
| 14 | `/blog/elevating-corporate-events-riyadh-jeddah` | Blog | Y | 178 impr, pos 56.37 | Confirmed near-dup of #15 — carried from sitewide audit |
| 15 | `/blog/corporate-event-excellence-riyadh-jeddah` | Blog | Y | 1,309 impr, pos 53.49 | Stronger of the pair by impressions — likely the merge target |
| 16 | `/blog/plan-mega-exhibition-riyadh-logistics` | Blog | Y | 127 impr, pos 25.12, 2 clicks | Should feed the new `exhibitions-riyadh` page once built |
| 17 | `/portfolio/royal-riyadh-wedding` | Portfolio | Y | 102 impr, pos 23.76 | |
| 18 | `/portfolio/riyadh-government-summit` | Portfolio | Y | 13 impr, pos 10.46, 1 click | |
| 19 | `/portfolio/riyadh-elite-majlis` | Portfolio | Y | 9 impr, pos 6.22 | |
| 20 | `/portfolio/riyadh-luxury-soiree` | Portfolio | Y | 3 impr, pos 8.33 | |

**Adjacent, not counted as core Riyadh inventory**: `/locations/diriyah` — a separate dynamic secondary-city page with its own deep, differentiated DGDA/At-Turaif/Formula E content. Administratively distinct from Riyadh but 15 minutes away and already treated as part of the Riyadh event story inside `/locations/riyadh`'s own copy (see §H). `/venues/*` and `/partners/rcu/*` are AlUla (RCU), not Riyadh — correctly out of scope here.

---

## B. Keep / Enrich / Merge / Redirect recommendations

| URL | Verdict | Why |
|---|---|---|
| `/locations/riyadh` | **ENRICH** | Two internal-link fixes (§H) + two new FAQ entries (§I). No content rewrite — it's already strong. |
| `/locations/riyadh/corporate-event-management` | KEEP as-is (noindex) | Already correct. |
| `/locations/riyadh/conference-planning` | **NOINDEX once `conference-management-riyadh` ships** | Mirror the exact predicate already used for `corporate-event-management`. Until then, correctly stays indexable. |
| `/locations/riyadh/exhibition-management` | **NOINDEX once `exhibitions-riyadh` ships** | Same pattern. |
| `/locations/riyadh/vip-event-planning` | KEEP indexable | No twin proposed (see §C — VIP-Riyadh has zero GSC demand). This page should remain the canonical, if thin, answer. |
| `/locations/riyadh/luxury-wedding-planning` | **NOINDEX now — new finding, not previously flagged** | Twin of `luxury-weddings-riyadh` already exists and already outranks it (~pos 7 vs ~pos 34). This is the identical cannibalization pattern the Aug 2026 fix addressed for two other services; it was never applied here. Zero risk (same proven mechanism, no URL deleted). |
| `/services/corporate-events-riyadh`, `luxury-weddings-riyadh`, `event-production-riyadh`, `cultural-events-riyadh` | KEEP | Real, differentiated 600–900-word content, functioning as designed. |
| `elevating-corporate-events-riyadh-jeddah` / `corporate-event-excellence-riyadh-jeddah` | **MERGE** (carried from sitewide audit, still unresolved) | Near-duplicate; #15 has ~7x the impressions of #14 — likely the keeper, founder to confirm before executing. |
| All 4 Riyadh portfolio case studies | KEEP | Real, appropriately labeled "concept case study," no fabrication found in the sitewide pass. |
| Riyadh blog cluster (10–13) | KEEP | All performing at or above sitewide average; no action needed beyond the internal-link additions in §H. |

---

## C. New Riyadh URL opportunities

Evaluated against the same bar the rest of this project already uses: **real GSC query demand + confirmed vendor capability + no thin/duplicate risk.**

| Candidate | Verdict | Evidence |
|---|---|---|
| **`/services/exhibitions-riyadh`** | **CREATE** | Fills the one real structural gap (§0). See §D/E/F for full spec. |
| **`/services/conference-management-riyadh`** | **CREATE** | Same reasoning, second-strongest evidence. |
| **`/services/vip-events-riyadh`** | **DO NOT CREATE** | Zero Riyadh-tagged VIP query in the full 90-row Riyadh GSC filter. `luxury-vip-events` (national) + `corporate-events-riyadh` already cover this intent. Building it would be exactly the reflexive city-split this project's own history warns against. |
| **Riyadh Season corporate/activation blog post** (carried from the 2026-09-13 roadmap, still awaiting founder approval, never built) | **DEFER, not cancel** | Checked against both the 2026-09-20 and the fresher 2026-09-24 (6mo) export — no Riyadh-tagged buyer-intent "activation"/"Riyadh Season" query exists in either. The *one* Riyadh Season row that does appear in the fresh pull, `riyadh season or jeddah season vendor or supplier 2026` (2 impr, pos 8), is a **supplier looking for work**, not a client looking to hire — the same VENDOR-LOOKING-FOR-WORK pattern already identified and excluded sitewide in `AUDIT-03-GSC.md` §4. This reinforces rather than weakens the defer call. The original roadmap scheduled this post on strategic/calendar grounds, not query evidence. Recommend sequencing it *after* the two PSEO creates above, and only once `/services/brand-activation` (national, still pending founder sign-off per the sitewide roadmap) actually exists for it to feed into — a seasonal post with no page to convert into is a dead end. |
| **A standalone "exhibition booth/stand design" page** | **DO NOT CREATE as its own URL** | The booth/stand-design queries (`exhibition stand company riyadh`, `trade show booth design services in riyadh`, `exhibition booth contractor riyadh`, etc.) are real but low-volume individually (2–5 impressions each) and read as sub-intent *within* exhibition management, not a separate buyer journey. Fold into `exhibitions-riyadh` as a bulleted capability, not a page of its own — the exact "don't split thin intent" discipline already proven right elsewhere on this site. |
| **"Corporate presentation design / reception & lobby branding" cluster** | **FLAG, don't build** | Real impressions (2026-09-24: `corporate presentation services riyadh` 47, `corporate presentation design riyadh` 41, `business presentation design riyadh` 11, `reception & lobby branding in riyadh` 12 — all buried pos 59–84) but **no vendor on file backs presentation/graphic design work**, and this may sit outside the broker's actual coordination scope (closer to a design agency service than event coordination/production). Founder call: worth a founder conversation on whether this is even a fit for the business model before any content decision — flagged as an open question in §L, not scored as a page opportunity. |
| Corporate Gifts & Giveaways / standalone Catering pages | Already scored **CREATE** at the *national* level in `phase-0-opportunities.md` §G | Not re-scored here — correctly national-level per that audit's own reasoning (real vendor backing is Riyadh-based for both — Crystal Catering, Perfume Lounge — but the intent itself isn't Riyadh-specific in the GSC data, so building national with Riyadh-weighted proof points is the right shape, not a Riyadh-only page). |

---

## D. Full proposed Riyadh cluster structure

```
/locations/riyadh  (hub — ENRICH: 2 link fixes + 2 FAQs)
│
├── PSEO tier (city × service, /services/[slug]-riyadh)
│   ├── corporate-events-riyadh          KEEP
│   ├── luxury-weddings-riyadh           KEEP  ← absorbs grid twin (noindex it)
│   ├── event-production-riyadh          KEEP
│   ├── cultural-events-riyadh           KEEP  (carries Riyadh Season mention until a dedicated post/page exists)
│   ├── exhibitions-riyadh               ★ CREATE
│   └── conference-management-riyadh     ★ CREATE
│
├── Grid tier (/locations/riyadh/[service]) — thin, city-only, no dedicated content investment
│   ├── corporate-event-management       noindex (done)
│   ├── conference-planning              → noindex once conference-management-riyadh ships
│   ├── exhibition-management            → noindex once exhibitions-riyadh ships
│   ├── luxury-wedding-planning          → noindex now (new finding)
│   └── vip-event-planning               stays indexable (canonical for thin VIP intent)
│
├── Blog tier (national URLs, Riyadh-weighted content)
│   ├── gala-dinner-awards-ceremony-planning-saudi-arabia   ENRICH (Riyadh venue depth + inbound link from hub)
│   ├── best-wedding-venues-riyadh-2026                     KEEP
│   ├── best-corporate-event-venues-riyadh-2026             KEEP
│   ├── best-event-management-company-riyadh-questions-to-ask  KEEP
│   ├── plan-mega-exhibition-riyadh-logistics                KEEP, link → exhibitions-riyadh once built
│   ├── corporate-event-excellence-riyadh-jeddah            KEEP (merge target)
│   └── elevating-corporate-events-riyadh-jeddah            MERGE into above
│
├── Portfolio tier — 4 case studies, KEEP as-is
│
└── Adjacent node: /locations/diriyah — link FROM /locations/riyadh (new fix, §H); no content change to Diriyah itself
```

---

## E. Primary + secondary keywords per proposed URL

**`/services/exhibitions-riyadh`** (CREATE)
- Primary: *exhibition management company Riyadh*
- Secondary: exhibition stand company Riyadh, trade show organizer Riyadh, RICEC exhibition management, SECB exhibition permit Riyadh, exhibition booth contractor Riyadh, trade show booth design Riyadh
- Grounding (2026-09-24, 6mo export; sum of matching Riyadh GSC rows, positions 22–98 today, currently split across the thin grid page + the buried national `/services/exhibitions`): `mice exhibition riyadh` (85 impr), `event production exhibition riyadh` (48), `custom event planning for exhibition in riyadh` (33), `full-service event planning for trade shows in riyadh` (32), `exhibition and trade show management in riyadh` (26), plus ~10 smaller booth/stand/contractor queries (2–5 impr each: `riyadh exhibition center stand contractor`, `exhibition stand company riyadh`, `trade show booth design services in riyadh`, `exhibition booth contractor riyadh`, `top exhibition company in riyadh`, `best exhibition company in riyadh`). Roughly 240+ combined impressions with no single owning page — and this cluster grew (not shrank) between the 2026-09-20 and 2026-09-24 pulls.

**`/services/conference-management-riyadh`** (CREATE)
- Primary: *conference management company Riyadh*
- Secondary: conference venues Riyadh, KAICC Riyadh, registration company for conferences Riyadh, event registration company Riyadh, corporate event organizers Riyadh
- Grounding (2026-09-24, 6mo export): `registration company for conferences riyadh` (16), `registration service in events riyadh` (14), `corporate event organizers riyadh` (17), `corporate event management riyadh` (16), `kaicc riyadh` (14, position 15.8 — page-1 territory already), `event registration company riyadh` (12), `event registration service riyadh` (10), `event registration riyadh` (10), `ricec riyadh` (5), `conference venues riyadh`/`in riyadh` (~6 combined), `king abdulaziz international conference center riyadh` (2, the full-name variant of the KAICC query — same intent).

**`gala-dinner-awards-ceremony-planning-saudi-arabia`** (ENRICH, existing URL)
- Primary (unchanged — already ranking): *gala dinner awards ceremony planning Saudi Arabia*
- Secondary to deepen: gala dinner venues Riyadh, KAFD gala dinner, Ritz-Carlton Riyadh awards night, RICEC gala production
- Grounding: this is the single largest validated cluster on the entire site (6,403 impressions on this URL alone, plus the broader national gala-query cluster at ~2,800+ impressions across positions 16–38) — the enrichment target is Riyadh venue *specificity*, not new keyword targeting, since the URL already has the traffic.

No new keyword targeting is proposed for the grid-tier or portfolio-tier URLs — they retain their existing targeting.

---

## F. Search intent per proposed URL

| URL | Intent | Stage |
|---|---|---|
| `exhibitions-riyadh` | Commercial — a company/organizer in Riyadh actively searching for a firm to run/build their exhibition presence (booth design, floor ops, SECB compliance) | Mid-to-bottom funnel; several source queries are already highly specific ("exhibition booth contractor riyadh") |
| `conference-management-riyadh` | Commercial — corporate/government body needing conference logistics, delegate registration, or a specific known venue (KAICC/KAFD/RICEC) | Mid-funnel; venue-name queries (`kaicc riyadh`) signal high purchase intent despite generic phrasing |
| `gala-dinner-awards...` enrichment | Commercial, already validated | Bottom-funnel — the conversion-mechanics problem is the priority, not intent-matching (already covered in `phase-0-existing-site-audit.md` §5) |
| `/locations/riyadh` hub | Navigational/commercial umbrella | Top-of-funnel discovery, routes into every other tier |

---

## G. Existing vendor support per service (Riyadh-specific)

*Caveat, applying the same discipline as [[riyadh-first-capability-backed-pages]]: the CSV tracker (`SEM_Vendor_Intake_Template.csv`) is dated July 2026 and only covers V001–V014; the newer `_VENDOR-INDEX.md` (Aug 18 2026) covers V001–V019 but may itself be behind more recent vendor activity referenced in project memory (e.g. the Key Events Partner/Tony relationship formalized around the British Embassy KBP tender, and the Eventyst gala project in Aug 2026 that reportedly used a Key Events cost basis). Re-confirm current status before making any public capability claim.*

| Service | Riyadh vendor(s) on file | Status | Backs |
|---|---|---|---|
| Valet / VIP transportation / entertainment | Advanced Prestige (Malek) | 🟢 Active, Riyadh-based | Already-live pages (`valet-parking`, `vip-transportation`, `entertainment`) — real, no action needed |
| Catering | Crystal Catering | 🟢 Active, Riyadh-based | No dedicated page yet (national-level gap per `phase-0-opportunities.md` §G, not Riyadh-specific) |
| Full-service events / weddings / gala-adjacent | Key Events Management (Tony), V009 in the CSV — **possible overlap with the "Key Events Partner" relationship in more recent project memory; not confirmed to be the same entity, flag for founder to verify** | Riyadh-based, responsive; used on at least one real gala-adjacent quotation per project memory | Directly relevant to the exhibitions/conference-management creates and the gala-dinner enrichment — this is the strongest single piece of evidence that Riyadh gala/corporate-event capability is real, not aspirational |
| Decor & furniture rental | Royal Event Decor | Riyadh-based, warm/responsive, not yet formalized | Supports wedding/production content depth; no dedicated page warranted |
| Exhibition/production fabrication | Shihab Electra Arabia | 🟢 Active, GCC-wide incl. Saudi Arabia (not Riyadh-exclusive) | Backs `exhibitions-riyadh` — real capability, though not Riyadh-only, consistent with how the page should be worded (network capability, not a Riyadh-only claim) |
| Exhibition/booth fabrication (alternate) | D&C (Display & Counters) | 🔵 Evaluating, Jeddah-based | Not Riyadh-specific — do not cite for a Riyadh page |
| Event tech / registration / staffing | MICEtribe | ⚪ On file, **not yet onboarded/active** per `phase-0-opportunities.md` §G | This is the real capability gap behind the registration-services portion of the `conference-management-riyadh` demand. **Do not claim dedicated registration-desk/staffing as an owned capability** on the new page — keep it at the same "broker coordinates through the network" register the rest of the site already uses correctly, or omit the specific claim until this vendor is confirmed active. |
| Corporate presentation / graphic design | None found | — | Confirms the §C "flag, don't build" call |

---

## H. Internal-link architecture (fixes + new links)

**Immediate, zero-new-content fixes to `/locations/riyadh` (both currently misrouted to generic pages when a better, real asset exists):**
1. "Gala Dinners & Award Ceremonies" tile → currently links to `/services/corporate-events` → **change to `/blog/gala-dinner-awards-ceremony-planning-saudi-arabia`** (the actual ranking asset for this exact intent).
2. Extensive Diriyah copy (venue card, FAQ mentions, event calendar) → **currently zero links to `/locations/diriyah`**, which has its own deep, differentiated DGDA/At-Turaif/Formula E content and is otherwise an internal-linking orphan per `phase-0-existing-site-audit.md` §13. Add a contextual link from the Riyadh hub's Diriyah venue card.

**New links once the two PSEO pages ship:**
3. `/locations/riyadh` — the existing "All Services Available in Riyadh" chip strip (currently 5 grid-tier links) should add/replace with links to `exhibitions-riyadh` and `conference-management-riyadh` once those are the canonical (indexable) pages, matching how the strip already prioritizes the PSEO wedding/corporate pages over their own grid twins in spirit.
4. `plan-mega-exhibition-riyadh-logistics` (blog) — currently links only to national `/services/exhibitions`; add a link to `exhibitions-riyadh` once built (same pattern already used elsewhere: blog → most-specific matching commercial page).
5. New pages cross-link each other and the existing 4 Riyadh PSEO pages, mirroring the proven `corporate-events` ↔ `conferences` national hub/adjacent pattern.
6. "Brand Activations — Riyadh Season" tile currently routes to `/services/event-production` (a reasonable placeholder) — once/if the national `/services/brand-activation` page is approved and built (still pending founder sign-off per the 2026-09-13 roadmap), reroute here. Not actionable until that page exists.

No new grid rows, no new location pages — every fix above is a link change or a noindex flag on an existing URL.

---

## I. AEO / GEO / LLM discoverability opportunities

The Riyadh hub already handles several AI-testable questions well and citably: largest exhibition venue (RICEC), best KAFD venue, Riyadh event permits (Amanah Ar-Riyad/SECB/GEA/DGDA), best luxury wedding venue, and Riyadh Season participation — all confirmed present as both visible FAQ and JSON-LD.

**Two confirmed gaps, both directly tied to the highest-value findings above:**
1. **"Who organizes gala dinners / award ceremonies in Riyadh?"** — despite the hub having a dedicated tile for this, there is no FAQ entry answering it directly and citably. Add one, and point it at the enriched gala blog post.
2. **"Which company handles exhibition booth design / conference registration in Riyadh?"** — no confident, citable answer exists anywhere today (only the thin grid pages, which don't carry FAQ/AEO-oriented content at the depth the static hub or PSEO pages do). This resolves itself once `exhibitions-riyadh` and `conference-management-riyadh` ship, provided they're built with FAQ blocks matching the format proven elsewhere on the site (a plain, directly-answerable Q, not marketing copy).

No new schema pattern is needed — reuse the existing Service/FAQPage/BreadcrumbList tier already applied to the 4 existing Riyadh PSEO pages.

---

## J. Visual / content requirements

- No dev server was run to produce this audit (static code read only) — visual/rendering claims below are candidates for founder confirmation, same disclaimer pattern as the sitewide audit.
- The Riyadh hub already references real, specifically-named imagery (`diriyah_event_venues.webp`, `riyadh_summit_people.webp`) — no fabricated-photo risk found in this pass.
- The two new PSEO pages should follow the same imagery discipline as the 4 existing Riyadh PSEO entries: reuse existing real assets where a genuine match exists (e.g. `riyadh_summit_people.webp` is already used for `corporate-events-riyadh` and `event-production-riyadh` — an exhibition-specific or conference-specific real photo should be sourced/confirmed before launch rather than reusing an unrelated hero image).
- No new visual pattern, component, or design system change is required — both new pages sit inside the existing, proven PSEO template.

---

## K. Recommended implementation order

1. **P0 — link/noindex fixes only, no new content, same-day effort:**
   - Reroute the "Gala Dinners" tile on `/locations/riyadh` to the gala blog post.
   - Add a `/locations/diriyah` link from the Riyadh hub's Diriyah content.
   - Apply the existing noindex-consolidation predicate to `/locations/riyadh/luxury-wedding-planning` (new finding — same mechanism already used twice elsewhere, zero new code pattern).
2. **P1 — build `exhibitions-riyadh`** (strongest GSC-validated gap, real vendor backing, richest existing content to draw from — RICEC/KAICC language already exists on the hub and on `/services/exhibitions`).
3. **P1 — build `conference-management-riyadh`** (second-strongest evidence, same build pattern).
4. **P1 — once both ship: noindex the corresponding two grid pages** (`exhibition-management`, `conference-planning`) using the proven predicate; update the hub's chip strip and the mega-exhibition blog's internal link.
5. **P2 — add the two AEO FAQ entries to the Riyadh hub** (§I) and deepen Riyadh venue specificity inside the gala blog post enrichment (this can happen independently of steps 2–4, and is otherwise the highest-leverage content move already identified sitewide).
6. **P2 — founder decision requested**: merge `elevating-corporate-events-riyadh-jeddah` into `corporate-event-excellence-riyadh-jeddah` (carried over, unresolved since the 2026-09-13 audit).
7. **P3 — deferred, not cancelled**: Riyadh Season blog post — sequence after `/services/brand-activation` exists (still pending founder sign-off nationally) since it currently has zero direct GSC validation and no page to convert into.
8. **Not part of this Riyadh scope, but load-bearing context**: `/mega-events`, `/services/brand-activation`, `/services/product-launch-events` are already fully scoped at the national level in the 2026-09-13 roadmap and materially affect Riyadh (most large-scale/product-launch demand concentrates in Riyadh) — still awaiting founder approval, not re-litigated here.

---

## L. Estimated number of Riyadh pages actually justified

**2.** (`exhibitions-riyadh`, `conference-management-riyadh`)

Everything else in this audit is a link change, a noindex flag, an FAQ addition, or a merge of existing content — zero additional new URLs. This is deliberately conservative: the site's own history (70→238 indexed pages, average position ~14→~28, a full session spent undoing it) is the standing argument against building more than the evidence supports, and Riyadh — despite being the highest-value market — only produced two pages that clear the real-demand-plus-real-capability bar used throughout this project.

**Open question for the founder** (not resolved in this audit, flagged per §C): is "corporate presentation / lobby branding design" even a service SEM's broker model should pursue, given no vendor currently covers it? This is the one Riyadh-tagged query cluster with real (if modest) impressions that this audit deliberately did not turn into a page recommendation, because it may sit outside the business's actual scope — worth a direct answer before it's dismissed or pursued either way.

---

*Companion documents: `phase-0-existing-site-audit.md`, `phase-0-opportunities.md`, `phase-0-url-inventory.md` (sitewide baseline), `AUDIT-03-GSC.md` (source GSC facts), `SEM-MEGA-EVENT-SEO-AUDIT.md`/`-ROADMAP.md`/`-PAGE-MAP.md` (mega-event brief, still awaiting founder approval). This document does not implement anything — awaiting founder review of the structure above before any code change.*
