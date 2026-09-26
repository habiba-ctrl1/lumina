AUDIT STATUS: PLAN COMPLETE — PHASE A (P0 EXISTING-URL CLEANUP) PARTIALLY IMPLEMENTED
SCOPE: Riyadh only
NO CODE/CONTENT/SCHEMA CHANGES WERE MADE TO PRODUCE THIS DOCUMENT ITSELF. See status update below for what has since shipped.

**IMPLEMENTATION STATUS (updated 2026-09-25):** Phase A items 1–4 and Phase B items 5–6 are all **DONE**. Both approved new Riyadh URLs are now live in the working tree: `/services/exhibitions-riyadh` and `/services/conference-management-riyadh` (EN+AR each), both hreflang-correct, both schema-complete, both runtime-verified. `tsc`/lint/build/runtime all verified clean each round; see `SEM-IMPLEMENTATION-LOG.md` (2026-09-24 and 2026-09-25 entries) for the full change logs. **Still open**: Phase B item 7 (noindex `/locations/riyadh/exhibition-management` and `/locations/riyadh/conference-planning`, update the hub chip strip, add the mega-exhibition blog's inbound link — deliberately not done yet, awaiting explicit go-ahead) and all of Phase C/D. **New flag from the conference-management-riyadh build**: the national `/services/conferences` page contains a stronger, unhedged registration/staffing claim than the vendor evidence supports — not fixed (out of this task's scope), see the 2026-09-25 implementation log entry.

*Compiled 2026-09-24. This is the master planning layer on top of `docs/seo-audit/riyadh-cluster-audit-2026-09-24.md` (read first, per instruction — its conclusions are the starting point here, not re-derived). Sitewide baseline (`phase-0-*.md`, `SEM-MEGA-EVENT-SEO-*.md`, `SEM-IMPLEMENTATION-LOG.md`, `AUDIT-03-GSC.md`) is treated as fixed and is cited, not repeated. GSC figures below are sourced from the 2026-09-24 six-month export (1,092 queries / 31,572 impressions / 65 clicks; 244 pages / 74,436 impressions), the freshest data in the repository as of this audit, cross-checked against the 2026-09-20 three-month export where noted.*

*This document does not overturn any conclusion from the 2026-09-24 Riyadh cluster audit. No new evidence was found that changes any of its verdicts. What follows is that audit's findings reorganized into the fuller architecture, keyword, vendor, AEO, conversion, UI, automation, indexation, and Arabic layers the founder asked for this round, plus several new granular findings surfaced while doing that deeper pass (flagged inline as "NEW THIS PASS").*

---

## 1. Executive summary

Riyadh already has 20 live URLs, the deepest content of any city on the site, and a genuinely good hub page (1,061 lines, real permit/venue/seasonal knowledge, already using correct "through trusted partners" broker language in most places). The prior Riyadh audit concluded only 2 new pages clear the evidence bar. This pass does not disturb that conclusion — it confirms it with a full intent-cluster breakdown (23 categories, A–W) and finds no 24th category that changes the answer.

**What's actually wrong with the Riyadh ecosystem today is not a content gap — it's four specific, fixable defects:**

1. Two real category gaps (exhibitions, conferences) where Riyadh — uniquely among primary cities — has no PSEO page, despite owning RICEC/KAICC/KAFD and real scattered demand no page currently owns.
2. One newly-confirmed cannibalization leak (`luxury-wedding-planning` grid page vs. its own outranking PSEO twin) that the site's own proven fix was never applied to.
3. One badly-misrouted internal link (the hub's own "Gala Dinners" tile pointing away from the single highest-value asset on the entire site).
4. **NEW THIS PASS**: the PSEO template that all 4 existing Riyadh service×city pages share (and where the 2 new pages would be built) has two structural weaknesses not caught in the prior Riyadh pass — it has no `hreflangAlternates()` call at all (confirmed in code, `services/[slug]/page.tsx`), and its only conversion mechanism is a single unqualified WhatsApp deep-link, unlike the 16 static service pages that use the structured `ServiceLeadForm` (event type/date/guest count). Both are fixable in the shared template, benefiting the 4 existing pages and the 2 proposed ones in one edit each.

No mass city-splitting, no new grid rows, no reflexive page-per-keyword-variant. The final justified count is unchanged from the prior audit: **2 new URLs.**

---

## 2. Existing Riyadh URL inventory

Full 13-field record per URL. "Vendor support" and "commercial value" are new columns added this pass; everything else confirms/extends the prior Riyadh audit's Table A.

| URL | Type | Indexable | Canonical/hreflang | Lang | Primary intent | Current target keyword | Secondary intents | GSC (6mo) | Depth | Commercial value | Vendor support | Cannib. risk | Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/locations/riyadh` | Static hub | Y | ✅/✅ | EN+AR | Umbrella/navigational | "event management Riyadh" | corporate, exhibitions, weddings, gala, gov't, brand activation | 6,022 impr, pos 48.67, 18 clicks | Deep (1,061 ln) | High (top-of-funnel router) | Multi (broker-level, correctly disclosed) | Low | ENRICH (2 link fixes, 2 FAQs) |
| `/locations/riyadh/corporate-event-management` | Grid | NOINDEX | n/a (noindex) | EN | — | — | — | 595 impr (pre-noindex residual) | Thin | None (correctly retired) | Advanced Prestige/Key Events (indirect) | None (resolved) | KEEP (noindex) |
| `/locations/riyadh/conference-planning` | Grid | Y (no twin yet) | ✅/✅ | EN | Conference org., Riyadh | "conference organizer Riyadh" | registration, KAICC/KAFD | 358 impr, pos 68.76 | Thin | Medium, currently unrealized | Key Events (indirect, unconfirmed) | **Will become HIGH once twin ships** | NOINDEX once `conference-management-riyadh` ships |
| `/locations/riyadh/exhibition-management` | Grid | Y (no twin yet) | ✅/✅ | EN | Exhibition mgmt, Riyadh | "exhibition management Riyadh" | booth/stand, RICEC | 19 impr, pos 52.89 | Thin | Medium, currently unrealized | Shihab Electra (indirect) | **Will become HIGH once twin ships** | NOINDEX once `exhibitions-riyadh` ships |
| `/locations/riyadh/vip-event-planning` | Grid | Y | ✅/✅ | EN | VIP event, Riyadh | "VIP event Riyadh" | — | 7 impr, pos 40.71 | Thin | Low (zero validated demand) | Advanced Prestige | None — no twin proposed | KEEP indexable (canonical for thin intent) |
| `/locations/riyadh/luxury-wedding-planning` | Grid | Y — **should not be** | ✅/✅ | EN | Wedding planning, Riyadh | "wedding planner Riyadh" | — | 7 impr, pos 34.29 | Thin | **Has a twin already outranking it** | Key Events, Royal Event Decor | **HIGH — confirmed twin, unresolved** | NOINDEX now |
| `/services/corporate-events-riyadh` | PSEO | Y | ✅ canonical / ❌ **no hreflang — confirmed this pass** | EN+AR | Corporate event mgmt, Riyadh | "corporate event management company Riyadh" | KAFD, AGMs, galas | 24 impr, pos 54.00 | Real 600–900w | Medium-high | Advanced Prestige, Key Events | Low | KEEP + fix hreflang (template-level, §13) |
| `/services/luxury-weddings-riyadh` | PSEO | Y | ✅ / ❌ no hreflang | EN+AR | Luxury wedding, Riyadh | "luxury wedding planner Riyadh" | Ritz-Carlton, Four Seasons | 35 impr, pos 6.97 | Real | High (best-ranking Riyadh URL site-wide) | Key Events, Royal Event Decor | Absorbs grid twin (§3) | KEEP + fix hreflang |
| `/services/event-production-riyadh` | PSEO | Y | ✅ / ❌ no hreflang | EN+AR | Event production, Riyadh | "event production company Riyadh" | AV, staging, LED | 226 impr, pos 59.26 | Real | Medium-high | Shihab Electra | Low | KEEP + fix hreflang |
| `/services/cultural-events-riyadh` | PSEO | Y | ✅ / ❌ no hreflang | EN+AR | Cultural/seasonal events, Riyadh | "cultural event management Riyadh" | National Day, Ramadan, Riyadh Season | 18 impr, pos 18.22 | Real | Medium | Key Events, Royal Event Decor | Low | KEEP + fix hreflang |
| `/blog/gala-dinner-awards-ceremony-planning-saudi-arabia` | Blog (national) | Y | ✅/✅ | EN+AR | Gala/awards, Riyadh-heavy | "gala dinner awards ceremony planning Saudi Arabia" | KAFD, Ritz-Carlton, RICEC | 6,873 impr, pos 22.93, 2 clicks | Deep | **Highest on the whole site** | Key Events (per project memory, unconfirmed same entity) | None | ENRICH + fix inbound link from hub |
| `/blog/best-wedding-venues-riyadh-2026` | Blog | Y | ✅/✅ | EN+AR | Wedding venue research, Riyadh | "best wedding venues Riyadh" | Ritz-Carlton, Four Seasons | 997 impr, pos 7.84, 14 clicks | Deep | High, converting | n/a (editorial) | Low | KEEP |
| `/blog/best-corporate-event-venues-riyadh-2026` | Blog | Y | ✅/✅ | EN+AR | Corporate venue research, Riyadh | "best corporate event venues Riyadh" | KAFD, RICEC | 629 impr, pos 11.98, 6 clicks | Deep | High, converting | n/a | Low | KEEP |
| `/blog/best-event-management-company-riyadh-questions-to-ask` | Blog | Y | ✅/✅ | EN+AR | Vendor-selection research | "questions to ask event management company Riyadh" | — | 277 impr, pos 25.47 | Deep | Medium | n/a | Low | KEEP |
| `/blog/elevating-corporate-events-riyadh-jeddah` | Blog | Y | ✅/✅ | EN | Corporate events, Riyadh+Jeddah | overlaps #16 | — | 178 impr, pos 56.37 | Moderate | Low (near-dup) | n/a | **Confirmed near-dup of #16** | MERGE into #16 |
| `/blog/corporate-event-excellence-riyadh-jeddah` | Blog | Y | ✅/✅ | EN | Corporate events, Riyadh+Jeddah | overlaps #14 | — | 1,309 impr, pos 53.49 | Moderate | Medium (merge target) | n/a | Same pair | KEEP as merge target |
| `/blog/plan-mega-exhibition-riyadh-logistics` | Blog | Y | ✅/✅ | EN | Exhibition logistics, Riyadh | "mega exhibition Riyadh logistics" | RICEC, LEAP | 127 impr, pos 25.12, 2 clicks | Deep | Medium | Shihab Electra | Low | KEEP + add link → `exhibitions-riyadh` once built |
| `/portfolio/royal-riyadh-wedding` | Portfolio | Y | ✅/✅ | EN+AR | Wedding proof-of-work | — | — | 102 impr, pos 23.76 | Case study | Trust asset | n/a | Low | KEEP |
| `/portfolio/riyadh-government-summit` | Portfolio | Y | ✅/✅ | EN+AR | Gov't/corporate proof-of-work | — | — | 13 impr, pos 10.46, 1 click | Case study | Trust asset | n/a | Low | KEEP |
| `/portfolio/riyadh-elite-majlis` | Portfolio | Y | ✅/✅ | EN+AR | Cultural/VIP proof-of-work | — | — | 9 impr, pos 6.22 | Case study | Trust asset | n/a | Low | KEEP |
| `/portfolio/riyadh-luxury-soiree` | Portfolio | Y | ✅/✅ | EN+AR | VIP proof-of-work | — | — | 3 impr, pos 8.33 | Case study | Trust asset | n/a | Low | KEEP |

**Adjacent node, not core inventory**: `/locations/diriyah` (dynamic secondary-city page, own DGDA/At-Turaif/Formula E content) — connected to Riyadh narratively but administratively distinct, correctly excluded from the core count. `/venues/*` and `/partners/rcu/*` are AlUla (RCU) — out of scope.

---

## 3. Keep / Enrich / Merge / Redirect / Noindex decisions

Restated as a decision list (same verdicts as the prior Riyadh audit §B, unchanged):

- **NOINDEX now**: `/locations/riyadh/luxury-wedding-planning` (confirmed twin exists, twin already outranks it 6.97 vs 34.29).
- **NOINDEX on ship**: `/locations/riyadh/conference-planning` and `/locations/riyadh/exhibition-management`, once their respective PSEO twins go live — same mechanism already proven twice (Aug 2026 corporate-event-management/conference-planning fix).
- **KEEP, no twin proposed**: `/locations/riyadh/vip-event-planning` — remains the correct canonical answer for a validated-thin intent.
- **ENRICH**: `/locations/riyadh` (hub — 2 link fixes, 2 FAQs, no content rewrite); the gala blog post (Riyadh venue-specificity); 4 existing PSEO pages (hreflang fix, template-level).
- **MERGE**: `elevating-corporate-events-riyadh-jeddah` into `corporate-event-excellence-riyadh-jeddah` — founder decision still open, carried forward unresolved since 2026-09-13.
- **KEEP as-is**: all 4 portfolio case studies, 3 of the 4 top-performing blog posts, `corporate-events-riyadh`/`event-production-riyadh`/`cultural-events-riyadh` (content), `/locations/riyadh/corporate-event-management` (already correctly noindexed).
- **No redirect action anywhere in the Riyadh set** — every consolidation uses noindex-in-place (URL stays live, no 301, no link equity lost), consistent with the project's standing "never change URLs" rule.

---

## 4. Current Riyadh search-intent map (A–W)

Every category the brief asked for, checked against the full 90+-row Riyadh-tagged slice of the 2026-09-24 six-month GSC export (not just the sitewide top-30).

| # | Cluster | Search intent | Buyer stage | GSC evidence (Riyadh-tagged) | Current owner | New page justified? |
|---|---|---|---|---|---|---|
| A | General event management | Broad vendor-shortlisting | Awareness→consideration | `event management riyadh` (418), `event management companies in riyadh` (312), `event companies in riyadh` (171), `event management company riyadh` (110), `event management in riyadh` (94) — ~1,100 impr total, positions 30–61 | `/locations/riyadh` hub | **No** — this is a ranking/authority problem (buried despite a real page), not an architecture gap. No new page fixes low domain authority. |
| B | Corporate events | Commercial | Consideration→decision | `corporate event riyadh` (40), `corporate event management riyadh` (16), `corporate event planner riyadh` (26) | `corporate-events-riyadh` PSEO | No — owned, weak position matches the sitewide "chronically buried" pattern already flagged for the national page. |
| C | Conferences | Commercial, high-ticket | Decision | `kaicc riyadh` (14, pos 15.8), `conference venues riyadh`/`in riyadh` (~6), `corporate event organizers riyadh` (17), `corporate event management riyadh` (16) | Thin grid page only, no PSEO twin | **Yes — `conference-management-riyadh`** |
| D | Exhibitions | Commercial, high-ticket, B2B | Decision | `mice exhibition riyadh` (85), `exhibition and trade show management in riyadh` (26), `custom event planning for exhibition in riyadh` (33), `full-service event planning for trade shows in riyadh` (32) | Thin grid page only, no PSEO twin | **Yes — `exhibitions-riyadh`** |
| E | Weddings | Commercial | Decision | `wedding planner riyadh` (44, pos 9.41), `riyadh wedding venues` (78), `wedding venue riyadh` (54), `wedding venues riyadh` (37) — well-served, ranking pos 7–15 in places | `luxury-weddings-riyadh` PSEO + blog | No — already owned and ranking well; fix the grid-twin leak instead (§3). |
| F | Gala / awards | Commercial, highest-ticket | Decision | `dinners and galas riyadh` (6) + the national gala cluster feeding the same blog post (6,873 impr) | Blog post, under-linked from the Riyadh hub | No new page — enrich + fix the link (§7 of prior audit, carried forward). |
| G | Venue sourcing | Cross-cutting, supports B/C/D/E | Consideration | `event venues in riyadh` (22), `event spaces riyadh` (4), `conference venues riyadh` (~6), plus the wedding-venue rows in E | Hub venue directory + PSEO pages' venue mentions | No — already adequately distributed; this is entity content, not a standalone page intent. |
| H | Event production | Commercial | Decision | `event production exhibition riyadh` (48), `event production rfp riyadh 2026` (4, pos 5.5 — page 1) | `event-production-riyadh` PSEO | No — owned. |
| I | AV / staging | Sub-intent of H | Decision | No distinct Riyadh-tagged query separate from event-production rows | Folded into `event-production-riyadh` | No — correctly a section, not a page. |
| J | Catering | Commercial | Consideration | Only `birthday party catering riyadh` (3) is Riyadh-tagged | No dedicated page (national gap, scored elsewhere) | No Riyadh-specific action — standalone catering is a *national*-level candidate per `phase-0-opportunities.md` §G (Crystal Catering is Riyadh-based, but demand isn't Riyadh-specific in the data) — not re-opened here. |
| K | Entertainment | Commercial | Consideration | Zero Riyadh-tagged query in either export | `/services/entertainment` (national, zero impressions site-wide per phase-0) | No Riyadh action. |
| L | Valet | Commercial | Decision | Zero Riyadh-tagged query | `/services/valet-parking` (national, real vendor) | No Riyadh action. |
| M | VIP transportation | Commercial | Decision | Zero Riyadh-tagged query | `/services/vip-transportation` (national) | No Riyadh action. |
| N | Birthday/private events | Commercial | Consideration | `birthday party catering riyadh` (3) | `/services/birthday-party` (national) | No — too thin to split. |
| O | Brand activations | Commercial, seasonal | Consideration | **Zero** buyer-intent Riyadh Season query in either export; the one Riyadh Season row found (`riyadh season or jeddah season vendor or supplier 2026`, 2 impr) is **vendor-looking-for-work**, not client intent | Hub tile (misrouted to `/services/event-production`) + `cultural-events-riyadh` mention | No — national `/services/brand-activation` still pending founder sign-off; not Riyadh-specific evidence. |
| P | Product launches | Commercial, high-ticket | Decision | Zero Riyadh-tagged query | Folded into generic corporate-events copy | No Riyadh-specific evidence; national `/services/product-launch-events` still pending. |
| Q | Government events | Sensitive — referral-only rule applies | Awareness/informational | `event management tender riyadh 2026` (10, **pos 4.9 — page 1**), `event production rfp riyadh 2026` (4, pos 5.5) — already ranking excellently | Hub's "Government & Vision 2030" tile + `corporate-events-riyadh` FAQ | **No dedicated page** — brushes the standing "referral-only, never solicit tenders" business rule; current informational, non-soliciting framing is already working (page-1 rankings) and should not be touched without explicit founder sign-off, consistent with the sitewide audit's identical call. |
| R | Cultural events | Commercial, seasonal | Consideration | Folded into `cultural-events-riyadh`'s existing performance (18 impr, pos 18.22) | `cultural-events-riyadh` PSEO | No — owned. |
| S | Riyadh Season | See O | See O | See O | See O | No — deferred, unchanged from prior audit. |
| T | Exhibition booths/stands | Sub-intent of D | Decision | ~10 low-volume rows (2–5 impr each): `exhibition stand company riyadh`, `trade show booth design services in riyadh`, `exhibition booth contractor riyadh`, `riyadh exhibition center stand contractor` | None currently | **Section within `exhibitions-riyadh`**, not its own page — individually too thin, collectively real, exactly the sub-intent the new page should absorb. |
| U | Event registration | Sub-intent of C (and touches D) | Decision | `registration company for conferences riyadh` (16), `registration service in events riyadh` (14), `event registration company riyadh` (12), `event registration service riyadh` (10), `event registration riyadh` (10) — ~62 impr combined | None currently | **Section within `conference-management-riyadh`**, cross-mentioned in `exhibitions-riyadh` — capability caveat: MICEtribe (the one registration/staffing vendor on file) is not yet onboarded/active, so this must stay broker-coordinated language, never an owned-capability claim (§5). |
| V | Delegate management | Sub-intent of C | Decision | No distinct Riyadh-tagged query beyond the registration cluster above | Already referenced on the hub ("bilingual delegate management") | No new page — folds into `conference-management-riyadh` content depth. |
| W | Other (presentation design, lobby branding, promoters, venue-authority navigational queries) | Mixed | Mixed | `corporate presentation services riyadh` (47), `corporate presentation design riyadh` (41), `business presentation design riyadh` (11), `reception & lobby branding in riyadh` (12) — ~111 impr, pos 59–84; `cvb riyadh`/`ricec riyadh`/`kaicc riyadh` (GEO-entity queries, already folded into venue content) | None | **Flag, don't build** — no vendor on file for presentation/graphic design; may sit outside the broker model entirely. Founder question, not a page decision (§27). |

---

## 5. Riyadh vendor capability matrix

*Caveat carried from the prior audit and repeated here because it governs every claim below: `SEM_Vendor_Intake_Template.csv` is dated July 2026 (covers V001–V014 only); `_VENDOR-INDEX.md` is dated 2026-08-18 (covers V001–V019) but may be behind more recent activity referenced in project memory (the Key Events Partner/Tony relationship formalized around the British Embassy KBP tender, and an Eventyst gala project in Aug 2026 reportedly costed off a "Key Events" basis). **Re-confirm current status with the founder before any public capability claim is published.***

| Vendor | Location | Status | Services | Subservices (confirmed) | Riyadh coverage confirmed? | Evidence source | Can SEM publicly mention? | Risk |
|---|---|---|---|---|---|---|---|---|
| Advanced Prestige (Malek) | Riyadh | 🟢 Active | Transportation, valet, entertainment | VIP chauffeur, event valet, golf-cart guest mobility | Yes | CSV V003 + `_VENDOR-INDEX.md` + agreement v4 pending | Yes — already live on `valet-parking`/`vip-transportation`/`entertainment` (national pages) | Low |
| Crystal Catering | Riyadh | 🟢 Active | Catering | Finger-food menus (3 tiers), mocktails | Yes | CSV V008/V015, `_VENDOR-INDEX.md` | Generic ("through our catering partners"), no page exists yet | Low |
| Key Events Management (Tony) | Riyadh | Responsive, pre-agreement | Full-service events, weddings, gala-adjacent | Venue/catering/decor/DJ/photography coordination | Yes | CSV V009; **possible overlap with "Key Events Partner" in more recent memory — not confirmed same entity, founder to verify (§27)** | Only as generic "through trusted partners" — do not name until agreement status and entity identity are confirmed | **Medium — identity ambiguity, not a capability doubt** |
| Royal Event Decor | Riyadh | Warm, not formalized | Decor, fabric draping, furniture rental | Ceiling/wall draping, stage/entrance decor, backdrops | Yes | CSV V011 | Generic only — no meeting held, no photo permission confirmed | Medium (not yet a signed relationship) |
| Shihab Electra Arabia | GCC-wide incl. Saudi (not Riyadh-exclusive) | 🟢 Active | Exhibition/production fabrication | LED, décor, exhibition stand build, AV, Kabuki drop | Partial — GCC-wide, not confirmed Riyadh-specific base | `_VENDOR-INDEX.md`, project ledger | Yes, but must be worded as network capability, not a Riyadh-only claim | Low |
| D&C (Display & Counters) | Jeddah | 🔵 Evaluating | Exhibition/retail fabrication | Booths, counters, kiosks, POSM, signage | No — Jeddah-based | CSV V014 | Not for a Riyadh page | Low (correctly excluded here) |
| MICEtribe | Unconfirmed base | ⚪ On file, **not onboarded/active** | Event tech, registration, staffing | Registration desk, delegate check-in | Unconfirmed | `_VENDOR-INDEX.md`, `phase-0-opportunities.md` §G | **No** — this is the exact capability gap behind the "event registration" GSC cluster (§4, row U). Do not claim registration/staffing as an owned or confirmed-partner capability until this vendor (or another) is actually active. | **High if misused** — the only real risk in this matrix is over-claiming registration/staffing capability on the new conference page before this vendor is confirmed. |

**Service → subservice → vendor → Riyadh page → intent graph** (only where evidence supports the link):

```
Exhibition Management
├── Booth/stand fabrication ── Shihab Electra ────────→ exhibitions-riyadh (T)
├── Exhibition floor logistics ── (broker-coordinated, no named vendor) → exhibitions-riyadh (D)
├── SECB/GEA permit coordination ── (broker-coordinated, per hub's existing language) → exhibitions-riyadh (D)
└── Registration/staffing ── CAPABILITY GAP (MICEtribe not active) ──→ do not claim on exhibitions-riyadh

Conference Management
├── Venue coordination (KAFD/KAICC/RICEC) ── (broker-coordinated) → conference-management-riyadh (C)
├── Delegate registration ── CAPABILITY GAP (MICEtribe not active) → conference-management-riyadh (U) — broker language only
├── Permit coordination (Amanah Ar-Riyad/SECB) ── (broker-coordinated, per hub's proven language) → conference-management-riyadh (C)
└── Full-service coordination ── Key Events (identity unconfirmed) → conference-management-riyadh (C) — generic only until confirmed

Weddings
├── Full-service coordination ── Key Events → luxury-weddings-riyadh (E) — already live
├── Decor/furniture ── Royal Event Decor → luxury-weddings-riyadh (E) — already live, could deepen
└── Catering ── Crystal Catering → luxury-weddings-riyadh (E) — already live, could deepen

Gala Dinners & Awards
├── Full-service coordination ── Key Events (per memory, unconfirmed identity) → gala blog post (F)
└── Venue coordination (KAFD/Ritz-Carlton/RICEC) ── (broker-coordinated) → gala blog post (F)
```

Everything not drawn above (entertainment, valet, VIP transport at the Riyadh-specific level) is already live on national pages and out of scope for new Riyadh content.

---

## 6. Commercial opportunity matrix

Every intent investigated, classified per the brief's required taxonomy.

| Opportunity | Classification | Why |
|---|---|---|
| Exhibition management, Riyadh | **PAGE** | Real demand, no owner, real vendor backing (§4 D, §7). |
| Conference management, Riyadh | **PAGE** | Same reasoning (§4 C, §7). |
| Exhibition booth/stand design | **SECTION** (within `exhibitions-riyadh`) | Real but thin individually; collectively a strong sub-section, not a page (§4 T). |
| Event registration/delegate management | **SECTION** (within `conference-management-riyadh`, cross-linked from `exhibitions-riyadh`) | Real demand, but capability-constrained — must stay broker-worded until MICEtribe (or another vendor) is confirmed active (§4 U, §5). |
| Gala dinners & award ceremonies, Riyadh | **INTERNAL-LINK TARGET + BLOG SUPPORT** (enrich the existing national blog post) | Already the single best-performing asset site-wide; a competing new URL would split its own authority (carried from prior audit). |
| Venue sourcing (RICEC/KAFD/KAICC/hotels) | **INTERNAL-LINK TARGET** (cross-cutting entity content, not a page) | Already distributed correctly across the hub and PSEO pages (§4 G). |
| Riyadh Season / brand activation | **DO NOT BUILD (Riyadh-specific); national candidate pending elsewhere** | Zero buyer-intent Riyadh Season query found; the only Riyadh Season row is vendor-looking-for-work (§4 O). |
| Product launch events | **DO NOT BUILD (Riyadh-specific)** | Zero Riyadh-tagged query; national candidate already scoped elsewhere, not re-opened here. |
| Government/tender events | **DO NOT BUILD dedicated page** — existing informational framing is already working | Standing referral-only rule; current pages already rank page-1 for tender-adjacent informational queries without soliciting (§4 Q). |
| Corporate presentation design / lobby branding | **VENDOR CAPABILITY ONLY — currently none; flag for founder** | Real but modest demand, zero vendor backing found, may be outside the broker model's scope entirely (§4 W, §27). |
| Standalone catering (Riyadh angle) | **DO NOT BUILD as Riyadh-specific** — national candidate elsewhere, real Riyadh vendor (Crystal Catering) but no Riyadh-specific demand signal | Not re-opened here; cross-referenced to `phase-0-opportunities.md` §G. |
| Entertainment / valet / VIP transport (Riyadh angle) | **DO NOT BUILD** — zero Riyadh-tagged demand | Already served adequately by national pages (§4 K/L/M). |

---

## 7. New URL candidates

Both candidates answer every question the brief requires before a page is approved.

### `/services/exhibitions-riyadh`

- **Why this URL?** Riyadh is the one primary city without this PSEO twin (Jeddah, Dammam already have it) despite owning the country's largest exhibition venue (RICEC) and hosting LEAP/World Defense Show/Cityscape/Saudi BUILD.
- **What search intent does it own?** Cluster D + T (exhibition management + booth/stand sub-intent) — ~240+ combined impressions today, positions 22–98, currently unowned.
- **Why can't an existing page own it?** `/locations/riyadh/exhibition-management` is a thin grid page (no FAQ depth, no AEO framing); `/services/exhibitions` (national) is chronically buried (position ~40 per sitewide audit) and not Riyadh-specific.
- **Commercial value?** High — exhibitor/organizer budgets are typically large single-event contracts, and several source queries (`exhibition booth contractor riyadh`, `trade show booth design services in riyadh`) signal late-funnel, vendor-shortlisting intent.
- **Can SEM actually deliver/coordinate it?** Yes, through Shihab Electra (active, fabrication/exhibition build) and the broker-coordinated permit/logistics language already proven on the hub. Registration/staffing must stay unclaimed (§5).
- **What content will make it better than existing results?** The exact same real-content discipline already proven on the other 4 Riyadh PSEO pages — RICEC/KAICC-specific venue detail, SECB permit process, real FAQ depth — none of which the thin grid page or the buried national page currently offer.
- **Internal links feeding it:** hub chip strip, `plan-mega-exhibition-riyadh-logistics` blog, cross-link from `conference-management-riyadh`, national `/services/exhibitions`.
- **What it links to:** `/contact`, `/consultation`, national `/services/exhibitions`, `conference-management-riyadh`.
- **What happens if it doesn't perform?** No downside — worst case it behaves like the current thin grid page (near-zero clicks) while the noindex-consolidation of the grid page prevents any duplicate-content cost. Nothing is lost that isn't already being lost today.

### `/services/conference-management-riyadh`

- **Why this URL?** Same structural gap, second-strongest evidence — Riyadh has no PSEO twin despite KAICC and KAFD already being named repeatedly across existing content.
- **What search intent does it own?** Cluster C + U (conference management + registration/delegate sub-intent) — ~86+ combined impressions in the registration sub-cluster alone, plus the KAICC/KAFD venue-name queries.
- **Why can't an existing page own it?** `/locations/riyadh/conference-planning` is thin; `/services/conferences` (national) is chronically buried (position ~74 per sitewide audit).
- **Commercial value?** High — conferences are typically the largest single-contract-value event type SEM coordinates.
- **Can SEM actually deliver/coordinate it?** Yes, at the broker-coordination level already proven (permits, venue relationships); registration/delegate-management content must stay generic/broker-worded until MICEtribe or an equivalent vendor is confirmed active (§5) — this is the one real constraint on this page's content.
- **What content will make it better than existing results?** Same discipline as above — real KAFD/KAICC/RICEC specificity, permit process detail, FAQ depth matching the proven PSEO template.
- **Internal links feeding it:** hub chip strip, cross-link from `exhibitions-riyadh`, `corporate-events-riyadh`.
- **What it links to:** `/contact`, `/consultation`, national `/services/conferences`, `exhibitions-riyadh`.
- **What happens if it doesn't perform?** Same answer as above — no downside beyond the cost of building it once.

---

## 8. URLs explicitly rejected, and why

| Rejected candidate | Why |
|---|---|
| `/services/vip-events-riyadh` | Zero Riyadh-tagged VIP query in the full GSC filter across two separate export pulls. Building it would fragment already-thin intent that `luxury-vip-events` (national) and `corporate-events-riyadh` already cover. |
| A standalone exhibition booth/stand design page | Individually low-volume queries (2–5 impr each); real only in aggregate, and aggregate belongs inside `exhibitions-riyadh` as a section, not a competing URL. |
| A standalone event-registration/delegate-management page | Same reasoning — real sub-intent, wrong altitude for its own URL, and capability-constrained (MICEtribe not active) in a way that would force thin/unclaimed content if built standalone. |
| Riyadh Season corporate/activation page (Riyadh-specific) | Zero buyer-intent Riyadh Season query found; the only matching row is a vendor, not a client. A page built on zero query evidence, in a city that already has the deepest content on the site, is exactly the reflexive-build pattern this whole project is designed to avoid. |
| Product-launch-events-riyadh | Zero Riyadh-tagged query; the national page itself is still pending founder sign-off — a city-split of an unbuilt, unvalidated national page has no evidence basis at all. |
| Government-events-riyadh (dedicated page) | Standing referral-only business rule; the current informational framing already ranks page-1 for tender-adjacent queries without soliciting — a dedicated page risks looking like active tender solicitation, which the business has explicitly ruled out without sign-off. |
| Corporate-presentation-design-riyadh | No vendor on file; may be outside the broker model's actual scope. Not rejected on evidence grounds (the queries are real) — rejected on capability grounds, pending a founder decision on whether to pursue the underlying capability at all (§27). |
| Standalone catering/entertainment/valet/VIP-transport, Riyadh-specific | Zero or near-zero Riyadh-tagged demand; these intents are already served adequately by national pages, and splitting them by city with no city-specific evidence repeats the exact 70→238 indexed-page mistake this site already lived through once. |

---

## 9. Full Riyadh cluster architecture

```
/locations/riyadh  (hub — router, ENRICH only)
│
├── PSEO tier — /services/[slug]-riyadh (real content, real FAQ/AEO depth)
│   ├── corporate-events-riyadh          KEEP
│   ├── luxury-weddings-riyadh           KEEP ← absorbs grid twin
│   ├── event-production-riyadh          KEEP
│   ├── cultural-events-riyadh           KEEP
│   ├── exhibitions-riyadh               ★ NEW — owns clusters D + T
│   └── conference-management-riyadh     ★ NEW — owns clusters C + U
│
├── Grid tier — /locations/riyadh/[service] (thin, no content investment, exists only to hold a URL until/unless retired)
│   ├── corporate-event-management       noindex (done)
│   ├── conference-planning              → noindex on ship
│   ├── exhibition-management            → noindex on ship
│   ├── luxury-wedding-planning          → noindex now
│   └── vip-event-planning               stays indexable (canonical, thin intent)
│
├── Blog tier — national URLs, Riyadh-weighted content, unchanged structure
│   ├── gala-dinner-awards-ceremony-planning-saudi-arabia   ENRICH + inbound link fix
│   ├── best-wedding-venues-riyadh-2026                     KEEP
│   ├── best-corporate-event-venues-riyadh-2026             KEEP
│   ├── best-event-management-company-riyadh-questions-to-ask  KEEP
│   ├── plan-mega-exhibition-riyadh-logistics                KEEP, add link → exhibitions-riyadh
│   ├── corporate-event-excellence-riyadh-jeddah            KEEP (merge target)
│   └── elevating-corporate-events-riyadh-jeddah            MERGE into above (founder decision)
│
├── Portfolio tier — 4 case studies, unchanged
│
└── Adjacent node: /locations/diriyah — receives a link from the hub, no content change
```

Every node above either already exists, is one of the 2 approved new pages, or is an explicit link/indexation fix — no new architecture pattern is introduced anywhere in this tree.

---

## 10–14. Keyword & intent architecture (primary keyword / secondary keywords / search intent / buyer stage / vendor support)

Full depth given only to the 2 new pages and the 1 enriched asset — the pages actually changing. Existing KEEP pages retain their current targeting (already validated by real rankings; manufacturing a "new" keyword list for a page that isn't changing would violate the brief's own instruction against artificial keyword lists).

| URL | Primary keyword | Secondary keywords | Search intent | Buyer stage | Vendor support |
|---|---|---|---|---|---|
| `exhibitions-riyadh` | exhibition management company Riyadh | exhibition stand company Riyadh, trade show organizer Riyadh, RICEC exhibition management, SECB exhibition permit Riyadh, exhibition booth contractor Riyadh, trade show booth design Riyadh | Commercial, B2B exhibitor/organizer shortlisting | Consideration→decision | Shihab Electra (fabrication); permits broker-coordinated; registration explicitly NOT claimed (§5) |
| `conference-management-riyadh` | conference management company Riyadh | conference venues Riyadh, KAICC Riyadh, registration company for conferences Riyadh, event registration company Riyadh, corporate event organizers Riyadh | Commercial, corporate/government conference logistics | Consideration→decision | Broker-coordinated venue/permit relationships; Key Events (identity unconfirmed, generic only); registration explicitly NOT claimed (§5) |
| `gala-dinner-awards-ceremony-planning-saudi-arabia` (enrich only) | gala dinner awards ceremony planning Saudi Arabia (unchanged — already ranking) | gala dinner venues Riyadh, KAFD gala dinner, Ritz-Carlton Riyadh awards night, RICEC gala production | Commercial, already bottom-funnel | Decision | Key Events (per memory, unconfirmed identity — generic language only until confirmed) |

Supporting entities used across both new pages (already established, real, reused — not invented): KAFD, KAICC, RICEC, Ritz-Carlton Riyadh, Four Seasons Riyadh, Amanah Ar-Riyad, SECB, GEA, DGDA, LEAP, World Defense Show, Cityscape Saudi, Saudi BUILD, FII.

SERP type for both new pages: primarily organic blue-link + potential Local Pack/Maps relevance given city-modified queries; no clear featured-snippet opportunity identified without further SERP research (not investigated this pass — flagged as a possible follow-up, not claimed).

Current ranking URL for the intent each new page would own: the respective thin grid page (§2), both under-70 in average position.

Cannibalization risk: low for both, provided the paired grid page is noindexed on ship (§3) — same proven mechanism, not a new risk pattern.

Canonical target: self (both are new, self-canonical URLs) — `https://saudieventmanagement.com/services/exhibitions-riyadh` and `.../conference-management-riyadh`, EN + AR, **with `hreflangAlternates()` wired in from day one** — the template bug (§13) must not be inherited by the new pages.

---

## 15. Internal-linking architecture

**Fixes to existing links (zero new content):**
1. `/locations/riyadh` "Gala Dinners & Award Ceremonies" tile: `/services/corporate-events` → `/blog/gala-dinner-awards-ceremony-planning-saudi-arabia`.
2. `/locations/riyadh` Diriyah content (venue card + FAQ mentions) → add a contextual link to `/locations/diriyah` (currently zero, confirmed in code).

**New links once the 2 pages ship:**
3. Hub's "All Services Available in Riyadh" chip strip — add `exhibitions-riyadh` and `conference-management-riyadh`, retire the equivalent grid-page chips once those are noindexed (or leave the chips pointing at the grid pages as an internal 301-free path — either works; recommend pointing at the new PSEO pages to concentrate link equity there).
4. `plan-mega-exhibition-riyadh-logistics` blog — currently links only to national `/services/exhibitions`; add a link to `exhibitions-riyadh`.
5. `exhibitions-riyadh` ↔ `conference-management-riyadh` cross-link each other (shared RICEC/KAICC venue context), mirroring the proven `corporate-events` ↔ `conferences` national pattern.
6. Both new pages link back to their national parent (`/services/exhibitions`, `/services/conferences`) and to `corporate-events-riyadh` (adjacent Riyadh intent).
7. "Brand Activations — Riyadh Season" tile stays pointed at `/services/event-production` until/unless the national `/services/brand-activation` page is built (not actionable now, not part of this Riyadh scope).

**Anchors** — reuse the natural, already-proven pattern from the site's existing internal links (descriptive, service+city phrasing: "exhibition team at RICEC," "conference organizer in Riyadh"), not exact-match keyword stuffing. No footer-only links proposed; every link above is contextual, in-body or in-chip-strip, matching the existing site convention.

**Explicitly avoided**: no every-page-links-to-every-page pattern, no new reciprocal link from the 4 unrelated national service pages (entertainment/valet/VIP-transport/birthday) into the Riyadh cluster — those have zero Riyadh-specific intent overlap (§4 K/L/M/N) and a forced link would be exactly the "irrelevant cross-linking" the brief asks to avoid.

---

## 16–18. AEO / GEO / LLM opportunities

**AEO — confirmed answerable today (strength, unchanged from prior audit):** largest exhibition venue (RICEC), best KAFD venue, Riyadh event permits, best luxury wedding venue, Riyadh Season activation participation — all present as both visible FAQ and JSON-LD on the hub.

**AEO — confirmed gaps, only where evidence supports an answer:**
- *"Who manages exhibitions in Riyadh?"* — no confident citable answer exists today; resolved by `exhibitions-riyadh`'s FAQ block, worded as broker-coordinated through Shihab Electra and the existing permit process, not an owned-fabrication claim.
- *"What does exhibition management in Riyadh include?"* — same page, answer scoped to what's evidenced (booth/stand coordination, SECB permits, RICEC logistics) — explicitly excludes registration/staffing as an owned capability per §5.
- *"Which venues are suitable for conferences in Riyadh?"* — already answerable via the hub's existing KAFD/KAICC/RICEC content; `conference-management-riyadh` should restate it in conference-specific framing (capacity, AV specs) rather than duplicate the hub's general venue list verbatim (avoids the same venue-list-copy-paste issue already flagged sitewide between `corporate-events` and `conferences`).
- *"Can SEM coordinate event permits in Riyadh?"* — already answered clearly and correctly on the hub (Amanah Ar-Riyad/SECB/GEA/DGDA, "through trusted partners") — reuse verbatim on both new pages, don't rewrite a working answer.
- *"How much does event management in Riyadh cost?"* — **do not answer with a number** — every sitewide pricing FAQ was already converted to "cost depends on guest count/venue/services — send requirements, get a quotation within 24 hours" per the 2026-09-20 fabrication cleanup (`SEM-IMPLEMENTATION-LOG.md`); the 2 new pages must follow the same pattern, not reintroduce a figure.
- *"How early should a Riyadh corporate event be booked?"* — evidenced lead-time language already exists for GEA (4–6 weeks) and SECB fast-track — reuse, don't invent a new number for exhibitions/conferences specifically unless the founder confirms one.
- *"Who can coordinate gala dinners in Riyadh?"* — **no citable on-page answer today despite the tile existing** — this is the highest-priority AEO fix in the whole plan (§7 of the prior audit, restated here): add an FAQ entry on the hub itself, not just a link, so both a human skimmer and an AI system get a direct answer at the hub level, then the linked blog post carries the depth.
- *"Can SEM coordinate exhibition booth construction?"* — answerable once `exhibitions-riyadh` ships, worded around Shihab Electra's confirmed fabrication capability — do not claim in-house construction.

**GEO entities** already correctly established and to be reused (not reinvented) on the 2 new pages: KAFD, KAICC, RICEC, Diplomatic Quarter, Diriyah, Amanah Ar-Riyad, SECB, GEA, DGDA — all real, all already verified present in the codebase.

**LLM/entity associations**: the site's entity naming is already fully consistent ("Saudi Event Management"/"SEM," zero "SCM" instances per the sitewide audit) — no change needed. The 2 new pages should reuse the same Service/FAQPage/BreadcrumbList schema tier already proven on the 4 existing Riyadh PSEO pages — no new schema pattern required, and specifically **must** include `hreflangAlternates()` in `generateMetadata`, unlike the 4 existing pages which are missing it (§13).

---

## 19. E-E-A-T / trust gaps (Riyadh-scoped)

The Riyadh hub is actually a **model page** for correct partner-network disclosure — "through trusted partners" language is used correctly and repeatedly (permit coordination, RICEC calendar support, Riyadh Season activation arrangement) rather than the first-party overclaiming flagged elsewhere on the site. This should be the template the 2 new pages copy, not a gap to fix.

**Specific unverified/superlative claims found, Riyadh-scoped (do not remove automatically — flagged for founder verification per instruction):**

| Claim | Location | Status |
|---|---|---|
| "headquartered in Riyadh with a full-time team available for rapid on-site consultation and same-day event logistics support" | `corporate-events-riyadh` FAQ | **NEW THIS PASS** — not previously flagged anywhere in the repo. Same category as the "owner-operator language" open question already tracked sitewide (`phase-0-existing-site-audit.md` §10.3) — this is a 7th instance of that same pattern, on a page the prior sitewide sweep didn't specifically check. Needs the same founder verification: is SEM actually headquartered/staffed in Riyadh, or should this soften to the broker-network framing used elsewhere? |
| "team for the largest event market in MENA" | Hub page, closing paragraph | Market-size claim about Riyadh (plausible, Riyadh genuinely is a large regional market) but unsourced as stated — low risk, but technically unverified. |
| "Riyadh's most trusted luxury wedding planner" / "Riyadh's leading corporate event planner" / "Riyadh's leading cultural event organiser" / "Riyadh's leading event production company" | PSEO intros (all 4 existing pages) | Superlative self-claims, consistent with the sitewide pattern already logged as "947 occurrences, not itemized" — representative Riyadh instances only, not a new finding, not re-itemized in full here. |
| "consistently ranked among the best wedding planners in Riyadh" | `luxury-weddings-riyadh` FAQ | Implies third-party ranking with no named source — same category as the above, slightly stronger phrasing (implies external validation that isn't evidenced). |

**None of these are being recommended for removal in this document** — per the brief's own instruction, they're flagged for founder verification, not auto-edited. The one item worth flagging as higher-priority than the rest: the "headquartered... full-time team... same-day" claim, because it's a specific operational assertion (not just marketing superlative language) and directly affects whether the 2 new pages should use similar language or the safer broker-network framing already proven correct on the hub.

---

## 20. Visual / UI gaps (Riyadh-scoped)

No dev server was run to produce this document — the findings below are code-level observations, flagged as candidates for visual confirmation, same disclaimer pattern used throughout this project's prior audits.

- The Riyadh hub and the 4 PSEO pages use real, specifically-captioned imagery (`diriyah_event_venues.webp`, `riyadh_summit_people.webp`) — no fabricated-photo risk found.
- **NEW THIS PASS**: the PSEO template's only CTA is a single centered WhatsApp button (§21) — visually this is a much lighter conversion surface than the static service pages' embedded form, which may itself read as a legitimacy/trust signal gap on the highest-commercial-intent Riyadh URLs (a page asking a visitor to leave the site to a WhatsApp deep-link, with no visible form, no field prompts, no sense of what happens next) compared to pages that show a structured intake form.
- The 2 new pages should follow the same template as the 4 existing ones for visual consistency — no new component or design pattern is needed, and none is recommended.
- Real, specific imagery should be sourced for `exhibitions-riyadh` (RICEC/booth context) and `conference-management-riyadh` (KAICC/KAFD context) rather than reusing the generic `riyadh_summit_people.webp` hero already used twice — not flagged as urgent, but worth avoiding a 3rd reuse of the same photo across Riyadh PSEO pages.

---

## 21. Conversion opportunities (Riyadh-scoped)

**NEW THIS PASS — the most concrete, previously-unflagged finding in this document**: the 4 existing Riyadh PSEO pages (and, if built identically, the 2 new ones) have **only a single unqualified WhatsApp deep-link** as their conversion mechanism (`wa.me/966539388072`, generic "Get a Free Consultation" button). This is structurally weaker than the 16 static service pages, which embed the shared `ServiceLeadForm` (name/email/phone/company/event type/city/date/guests/message) per the sitewide baseline audit. For the two highest-commercial-intent new Riyadh pages specifically (exhibition/conference budgets are typically large single-contract events), this matters more than it would on a lower-value page:

- A WhatsApp-only CTA captures zero structured qualification data (no event type, no date, no guest/delegate count, no budget signal) before the founder has to manually triage an open-ended chat.
- Recommend (not implemented here): either embed `ServiceLeadForm` on the PSEO template (same component already used sitewide, no new component needed), or at minimum pre-fill the WhatsApp deep-link with a structured message template (`?text=Exhibition management inquiry — Riyadh...`) so the chat opens with qualification framing instead of a blank thread.
- This is a template-level fix — doing it once on `services/[slug]/page.tsx` improves all 4 existing Riyadh PSEO pages plus the 2 new ones plus every other city's PSEO page site-wide, not just a Riyadh-specific change, but it's surfaced here because the 2 new high-ticket Riyadh pages are the direct motivating case.

**Other Riyadh-scoped conversion notes:**
- The hub page itself has no embedded lead form (relies on `/contact` and `/consultation` links plus the global floating WhatsApp button) — acceptable for a top-of-funnel router page, not flagged as a defect.
- No budget field exists anywhere in the Riyadh funnel, consistent with the sitewide gap already flagged and scoped for a fix in the 2026-09-13 roadmap (Day 6) — not re-scoped here, just noted as still open and directly relevant to qualifying high-ticket exhibition/conference leads specifically.
- Trust-before-CTA: the hub's permit/venue depth already functions as pre-CTA trust content — this is a genuine strength, not a gap, and the 2 new pages should preserve the same structure (content depth → FAQ → CTA), not front-load the CTA above the trust content.

---

## 22. Automation opportunities (described only — nothing implemented)

| Automation | What it would do | Risk if implemented carelessly |
|---|---|---|
| Noindex-predicate consolidation | The `isConsolidatedNoindex`-style predicate is already hardcoded twice (page + sitemap) per the sitewide audit; extracting it to one shared function and extending it to cover `luxury-wedding-planning` now and `conference-planning`/`exhibition-management` on ship would reduce drift risk | Low risk, mechanical — but must be tested against all 12 cities, not just Riyadh, since the predicate is shared sitewide |
| Hreflang validator | A build-time or CI check confirming every `generateMetadata` in `services/[slug]/page.tsx` (and any other route class) calls `hreflangAlternates()` | Would have caught the exact gap found in §13 automatically — low risk, pure detection, no content risk |
| GSC query → existing-URL matcher | A script cross-referencing `Queries.csv` rows against the current sitemap/route registry to flag "impressions with no owning page" automatically (this document did this manually for Riyadh) | Medium risk if the output is trusted blindly — query-to-intent mapping still needs human judgment (see how many "IRRELEVANT"/vendor-intent rows this audit had to manually exclude, e.g. the Riyadh Season vendor-supplier row) |
| Vendor → service → page capability graph | A structured (JSON/CSV) version of §5's graph, kept in sync with `_VENDOR-INDEX.md`, so future content work can query "what can we actually claim for Riyadh exhibitions" instead of re-deriving it by hand each time | Low risk, high maintenance value — but only as good as the underlying vendor tracker's freshness, which is already flagged as stale in multiple places in this document |
| Orphan-page detector | Flag any page with zero inbound internal links (would have caught the `/locations/diriyah` gap and the pre-2026-08-22 gala blog orphan automatically) | Low risk, pure detection |
| Pages with impressions but zero/near-zero clicks | A recurring report (this audit did it manually via `AUDIT-03-GSC.md`/fresh export comparison) flagging pages like the gala blog (6,873 impr, 2 clicks) for CTR/title-tag attention | Low risk — but the fix itself (title/meta rewrite) still needs a human, not an automation |
| Duplicate-intent/cannibalization detector | Would have caught the `luxury-wedding-planning` vs. `luxury-weddings-riyadh` twin automatically by comparing PSEO slugs against grid-service slugs per city | Low risk, mechanical string-matching — the exact class of bug this document found by hand |

None of the above is implemented in this pass. If approved, recommend building the hreflang validator and the duplicate-intent detector first — both are mechanical, low-risk, and would have caught two of this document's four headline findings automatically.

---

## 23. Indexation strategy

Goal restated per the brief: **fewer, stronger, more distinct, more commercially relevant URLs — not higher indexed-page count.**

| URL | Decision | Why |
|---|---|---|
| `/locations/riyadh` | INDEX (unchanged) | Correctly the umbrella router. |
| `/locations/riyadh/corporate-event-management` | NOINDEX (unchanged, already correct) | Twin absorbed the intent already. |
| `/locations/riyadh/conference-planning` | INDEX now → NOINDEX once twin ships | Correct sequencing — never noindex a page that's still the only asset for a real intent. |
| `/locations/riyadh/exhibition-management` | INDEX now → NOINDEX once twin ships | Same. |
| `/locations/riyadh/vip-event-planning` | INDEX, KEEP MONITOR | No twin proposed; correct canonical for thin intent; revisit only if GSC ever shows real VIP-Riyadh demand. |
| `/locations/riyadh/luxury-wedding-planning` | **NOINDEX now** | Confirmed twin already exists and already outranks it — this is overdue, not conditional on anything else shipping. |
| 4 existing Riyadh PSEO pages | INDEX (unchanged) + **CANONICAL FIX** (add hreflang) | Content stays; the missing `hreflangAlternates()` call is a template bug, not an indexation decision — fixing it doesn't change what's indexed, it fixes how EN/AR variants relate to each other. |
| 2 new Riyadh PSEO pages | INDEX from launch, EN+AR, with hreflang wired in correctly from day one | No reason to soft-launch noindexed — evidence is already established. |
| Blog/portfolio tier | INDEX (unchanged) | No indexation issues found in this tier. |

No new sitemap pattern is needed — the 2 new URLs slot into the existing `services/[slug]` sitemap loop the same way the 4 current Riyadh PSEO pages already do.

---

## 24. Arabic strategy

| URL | AR decision | Why |
|---|---|---|
| `/locations/riyadh` | Already EN+AR, KEEP | Working, in `TRANSLATED_AR_ROUTES`. |
| 4 existing Riyadh PSEO pages | Already EN+AR, KEEP + fix hreflang | Content exists; the gap is technical (missing hreflang annotation), not missing translation. |
| `exhibitions-riyadh` (new) | **CREATE Arabic from launch, not deferred** | Every existing Riyadh PSEO page ships bilingual on day one — there's no precedent on this site for an English-only PSEO page, and the Arabic exhibition/booth-design query intent (e.g. the Arabic-language equivalents of "exhibition management Riyadh") is presumptively real given the English cluster's volume. Do not machine-translate — mirror the real, hand-authored EN+AR pattern already used on the other 4 pages (`arBody` object with its own `intro`/`details`/`bulletPoints`/`faqs`, not a translated copy of the English FAQ). |
| `conference-management-riyadh` (new) | **CREATE Arabic from launch**, same reasoning | Same pattern. |
| Riyadh grid pages (all 5) | Already EN+AR per the sitewide audit (hreflang confirmed present in `[city]/[service]/page.tsx`) | No change needed beyond the noindex actions in §3/§23 — noindex doesn't require removing the AR variant, both EN and AR versions get the same robots directive. |
| Riyadh blog cluster | Already EN+AR for 5 of 6 (per §2); `elevating-corporate-events-riyadh-jeddah` has an AR mirror too | No new Arabic work — the merge decision (§3) applies to both language versions together when executed. |
| Gala blog enrichment | Already EN+AR — the enrichment (Riyadh venue specificity) must mirror block-for-block into `contentAr[]` per the standing CLAUDE.md rule, not an English-only enrichment | Explicit requirement, not optional. |

No page in this plan is recommended for English-only launch or deferred Arabic — the Riyadh cluster's established pattern (bilingual from day one, real translated content, not machine translation) should hold for both new pages.

---

## 25. Implementation phases

**Phase A — zero-risk fixes, no new content (same-day effort each):**
1. ✅ **DONE 2026-09-24** — Reroute the hub's "Gala Dinners" tile to the gala blog post.
2. ✅ **DONE 2026-09-24** — Add a `/locations/diriyah` link from the hub's Diriyah content.
3. ✅ **DONE 2026-09-24** — Noindex `/locations/riyadh/luxury-wedding-planning` (page + sitemap, verified in build output).
4. ⏸ **NOT DONE — explicitly excluded from the 2026-09-24 implementation pass** (sitewide/cross-city scope, outside Riyadh-only approval). Add `hreflangAlternates()` to the `services/[slug]/page.tsx` shared template (fixes all 4 existing Riyadh PSEO pages, plus every other city's PSEO pages, in one edit) — still open.

**Phase B — the 2 new pages:**
5. ✅ **DONE 2026-09-24** — Build `exhibitions-riyadh` (EN+AR, full FAQ/schema depth, correct vendor-capability language per §5). 6 FAQs, 8 bullet points covering the full commercial journey, no vendor named, registration/staffing capability deliberately not claimed, hreflang correct, sitemap + `TRANSLATED_AR_ROUTES` updated, runtime-verified.
6. ✅ **DONE 2026-09-25** — Build `conference-management-riyadh` (EN+AR, same standard). 6 FAQs, 9 bullet points, registration explicitly worded as partner-coordinated (not owned), links to `corporate-events-riyadh`/`event-production-riyadh`/`exhibitions-riyadh`/`/locations/riyadh`/the Riyadh venue blog, hreflang correct, sitemap + `TRANSLATED_AR_ROUTES` updated, runtime-verified.
7. ⏸ **NOT DONE — both prerequisites now satisfied, but not actioned this round (no explicit go-ahead given)** — Now that both new pages are live: noindex the corresponding grid pages (`exhibition-management`, `conference-planning`); update hub chip strip; add the `plan-mega-exhibition-riyadh-logistics` → `exhibitions-riyadh` link. Both grid pages remain indexable for now.

**Phase C — AEO/trust/conversion depth (can run in parallel with B):**
8. Add the "who organizes gala dinners in Riyadh" and "exhibition/conference in Riyadh" FAQ entries to the hub.
9. Deepen Riyadh venue-specificity inside the gala blog enrichment.
10. Founder decision + execution on the `corporate-events-riyadh` "headquartered... full-time team" claim (§19).
11. Conversion fix on the PSEO template (§21) — embed `ServiceLeadForm` or pre-filled WhatsApp deep-link.

**Phase D — founder decisions required before any action (not blocking A/B/C):**
12. Merge `elevating-corporate-events-riyadh-jeddah` into `corporate-event-excellence-riyadh-jeddah`.
13. Confirm/deny the Key Events Management ↔ "Key Events Partner" identity question (§5, §27).
14. Decide on the corporate-presentation-design/lobby-branding capability question (§4 W, §27).

**Not part of this Riyadh scope, sequenced elsewhere**: `/mega-events`, `/services/brand-activation`, `/services/product-launch-events` — national, still pending founder approval of the 2026-09-13 roadmap; the Riyadh Season blog post — deferred pending that national page's approval and any future Riyadh-specific demand evidence.

---

## 26. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| New pages built with generic/templated content instead of the real RICEC/KAICC depth already proven to work | Medium if rushed | High — would recreate exactly the "thin page" pattern the site already got burned by | Use the 4 existing Riyadh PSEO pages as the literal content bar, not a lower one |
| Registration/staffing capability overclaimed on `conference-management-riyadh` before MICEtribe (or equivalent) is confirmed active | Medium — real temptation since the GSC demand is there | Medium-high — a fabricated/overstated capability claim, exactly what CLAUDE.md's hard rules prohibit | Keep registration content broker-worded only, explicitly excluded from confirmed-capability claims until vendor status changes (§5) |
| Key Events Management (V009, CSV) conflated with "Key Events Partner" (project memory) without confirmation | Medium | Medium — could lead to citing the wrong entity's capability/status publicly | Explicit founder confirmation required before either entity is named anywhere (§27) |
| The hreflang template fix (Phase A.4) introduces a regression across all PSEO pages sitewide, not just Riyadh | Low (mechanical, well-scoped change) | Medium if it happens — affects every city's PSEO pages, not just Riyadh's | `tsc --noEmit` + spot-check of 2–3 non-Riyadh PSEO pages before considering it done, even though this document's scope is Riyadh only |
| Noindexing `luxury-wedding-planning` has an unexpected side effect (e.g. some other page links to it expecting it to be indexed) | Low | Low — same mechanism already proven safe twice | Grep for inbound links to the grid page before flipping the noindex flag, same diligence as the original Aug 2026 fix |
| Conversion-mechanism change on the PSEO template (§21, §25.11) is treated as urgent/rushed | Low if sequenced correctly | Medium — a bad form implementation could hurt WhatsApp-first conversion that already works well for this KSA audience | Treat as Phase C, not Phase A — validate against the existing `ServiceLeadForm` component's proven pattern rather than building something new |

---

## 27. Open founder decisions

1. **Key Events Management (CSV V009, Riyadh, full-service events/weddings) vs. "Key Events Partner" (Tony, referenced in more recent project memory re: the British Embassy KBP tender)** — same entity, or two different relationships? This affects what can be named/implied on `luxury-weddings-riyadh`, the gala blog enrichment, and `conference-management-riyadh`.
2. **Corporate presentation design / reception & lobby branding (§4 W)** — worth pursuing as a capability at all, given no vendor currently covers it, or is this outside SEM's broker model entirely? Not a content decision until this is answered.
3. **The "headquartered in Riyadh with a full-time team... same-day... support" claim on `corporate-events-riyadh` (§19)** — factually accurate as stated, or should it soften to the broker-network language the hub already uses correctly elsewhere?
4. **`elevating-corporate-events-riyadh-jeddah` vs. `corporate-event-excellence-riyadh-jeddah`** — confirm merge direction (carried forward, unresolved since 2026-09-13).
5. **Registration/delegate-management vendor status** — is MICEtribe (or any other vendor) close to being confirmed active? This directly gates how much registration-service content `conference-management-riyadh` can honestly carry at launch vs. needing to stay generic.
6. **Sequencing of the PSEO conversion-mechanism fix (§21)** — embed the full `ServiceLeadForm`, or a lighter pre-filled WhatsApp deep-link? Both are legitimate; the founder's known preference for WhatsApp-first conversion (a genuine strength elsewhere on the site) may favor the lighter option even though it captures less structured data.

---

## 28. Estimated final Riyadh URL count

**Current: 20 live URLs (+ `/locations/diriyah` as an adjacent, non-Riyadh node).**
**Proposed: 22** — 20 existing + 2 new (`exhibitions-riyadh`, `conference-management-riyadh`).
**Net indexable-URL change: +1 in practice** — 2 new indexable pages added, 1 existing indexable page (`luxury-wedding-planning`) moves to noindex now, and 2 more (`conference-planning`, `exhibition-management`) move to noindex once their twins ship — meaning the *indexed* count barely moves even though 2 genuinely new, stronger pages are added. This is deliberate: the objective was never page count, it was replacing 3 thin, unowned or duplicate URLs with 2 real ones and consolidating the rest — exactly the "fewer, stronger, more distinct" standard set in §23.

No implementation has occurred. This document is the plan only — waiting on founder review before any code, content, metadata, schema, redirect, noindex, or internal-link change.
