# AUDIT-03 — Google Search Console Data (facts only)

**Source files** (from `/downloads`, i.e. `C:\Users\786\Downloads\`): four exports for `saudieventmanagement.com` were found, all pulled 2026-09-20:
- `saudieventmanagement.com-Performance-on-Search-2026-09-20.zip` — filter **Date: Last 3 months**. Used as the primary dataset below (largest window, 1000 query rows — the GSC UI export cap — and 242 page rows).
- `...-2026-09-20 (1).zip` — filter **Time range: Last 24 hours** (155 query rows). Not used below except where noted.
- `...-2026-09-20 (2).zip` and `...-2026-09-20 (3).zip` — identical to each other, filter **Date: Last 28 days** (1049 query rows, 57 page rows). Not used below.
- A separate site, `taxisaudiarabia.com`, also has exports in `/downloads` — out of scope, not read.

Each zip contains `Queries.csv`, `Pages.csv`, `Countries.csv`, `Devices.csv`, `Chart.csv`, `Search appearance.csv`, `Filters.csv`. This report uses `Queries.csv` and `Pages.csv` from the "Last 3 months" export. Totals from the raw query file: **1000 queries, 30,116 impressions, 63 clicks** (site-wide average CTR ≈0.21%). Totals from the raw page file: **242 pages, 70,293 impressions** (Pages.csv is not capped at 1000 rows, so its impression total is higher/more complete than the query file's — GSC totals across the two reports are not expected to match 1:1).

## 1. Top 30 queries by impressions

| # | Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|---|
| 1 | event management | 1 | 685 | 0.15% | 57.43 |
| 2 | gala dinners and awards ceremonies | 0 | 480 | 0% | 17.21 |
| 3 | award and gala dinner event companies | 0 | 447 | 0% | 16.04 |
| 4 | gala dinners and award ceremonies | 0 | 431 | 0% | 25.56 |
| 5 | event management riyadh | 0 | 395 | 0% | 57.05 |
| 6 | corporate event organisers | 0 | 392 | 0% | 68.32 |
| 7 | corporate event management | 0 | 368 | 0% | 63.53 |
| 8 | gala dinners, award ceremonies | 0 | 340 | 0% | 23.75 |
| 9 | event management companies in saudi arabia | 2 | 336 | 0.6% | 34.23 |
| 10 | event management company | 0 | 317 | 0% | 26.88 |
| 11 | gala dinner event company | 0 | 308 | 0% | 21.65 |
| 12 | event management companies in riyadh | 0 | 295 | 0% | 56.72 |
| 13 | global gala dinners | 0 | 294 | 0% | 28.08 |
| 14 | gala dinners & award ceremonies | 0 | 283 | 0% | 20.08 |
| 15 | gala dinner events | 0 | 276 | 0% | 31.41 |
| 16 | gala dinner | 0 | 253 | 0% | 38.73 |
| 17 | corporate conference | 0 | 251 | 0% | 45.58 |
| 18 | corporate event companies | 0 | 245 | 0% | 58.93 |
| 19 | award ceremonies and dinners | 0 | 236 | 0% | 17.53 |
| 20 | corporate events | 0 | 224 | 0% | 60.73 |
| 21 | awards evening | 0 | 222 | 0% | 46.81 |
| 22 | gala event | 0 | 216 | 0% | 36.82 |
| 23 | saudi event awards faq | 0 | 207 | 0% | 29.93 |
| 24 | conference management companies | 0 | 203 | 0% | 54.35 |
| 25 | conference management services | 0 | 202 | 0% | 43.32 |
| 26 | conference and event management | 0 | 202 | 0% | 58.51 |
| 27 | conference company | 0 | 201 | 0% | 80.55 |
| 28 | gala dinner organisers | 0 | 197 | 0% | 27.23 |
| 29 | event planning companies | 0 | 194 | 0% | 29.74 |
| 30 | gala dinner event management | 0 | 187 | 0% | 25.37 |

Note: queries 23 ("saudi event awards faq") and several others in this list ("saudi event awards..." variants ranked just below the top 30) share wording with an unrelated third-party "Saudi Event Awards" industry-awards brand — see §4 methodology note.

## 2. Near-miss opportunities — position 4–20, impressions > 50

29 queries meet this criterion:

| # | Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|---|
| 1 | gala dinners and awards ceremonies | 0 | 480 | 0% | 17.21 |
| 2 | award and gala dinner event companies | 0 | 447 | 0% | 16.04 |
| 3 | award ceremonies and dinners | 0 | 236 | 0% | 17.53 |
| 4 | awards dinner event production | 0 | 156 | 0% | 9.16 |
| 5 | awards dinner events company | 0 | 149 | 0% | 13.73 |
| 6 | awards dinner event planner | 0 | 139 | 0% | 12.18 |
| 7 | gala dinner production | 0 | 136 | 0% | 11.66 |
| 8 | event management company saudi arabia | 1 | 134 | 0.75% | 19.04 |
| 9 | corporate event venue kafd | 0 | 127 | 0% | 17.69 |
| 10 | gala dinner event production | 0 | 116 | 0% | 15.66 |
| 11 | trade show management companies | 0 | 97 | 0% | 13.78 |
| 12 | red sea weddings | 0 | 95 | 0% | 12.00 |
| 13 | government event management saudi arabia | 0 | 92 | 0% | 12.55 |
| 14 | red sea wedding | 0 | 86 | 0% | 12.93 |
| 15 | event consultancy saudi arabia | 0 | 81 | 0% | 10.91 |
| 16 | book exhibition stand saudi event show | 0 | 75 | 0% | 10.11 |
| 17 | diriyah gate tender event management 2026 | 0 | 73 | 0% | 5.33 |
| 18 | event management saudi arabia | 3 | 72 | 4.17% | 17.96 |
| 19 | riyadh wedding venues | 1 | 66 | 1.52% | 11.21 |
| 20 | neom event service | 0 | 63 | 0% | 11.14 |
| 21 | event management company services | 0 | 62 | 0% | 9.11 |
| 22 | awards dinner management | 0 | 62 | 0% | 12.44 |
| 23 | event planning services | 0 | 60 | 0% | 16.47 |
| 24 | event planning firms | 0 | 58 | 0% | 19.22 |
| 25 | wedding planner jeddah | 3 | 55 | 5.45% | 19.05 |
| 26 | wedding planner | 0 | 54 | 0% | 19.00 |
| 27 | awards ceremony events company | 0 | 53 | 0% | 19.30 |
| 28 | wedding venues jeddah | 0 | 52 | 0% | 13.29 |
| 29 | vision 2030 technology event | 0 | 51 | 0% | 18.02 |

## 3. Pages with high impressions and under 1% CTR

Threshold used: impressions ≥ 100 AND CTR < 1%. 49 of 242 pages meet this:

| # | Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|---|
| 1 | / | 68 | 8944 | 0.76% | 21.28 |
| 2 | /blog/gala-dinner-awards-ceremony-planning-saudi-arabia | 2 | 6403 | 0.03% | 23.39 |
| 3 | /blog/exceptional-wedding-cost-saudi-arabia-guide | 54 | 6012 | 0.9% | 6.05 |
| 4 | /locations/riyadh | 13 | 5676 | 0.23% | 49.08 |
| 5 | /services/corporate-events | 2 | 5524 | 0.04% | 72.57 |
| 6 | /blog/complete-guide-event-planning-saudi-arabia-2026 | 20 | 2701 | 0.74% | 9.5 |
| 7 | /services/conferences | 2 | 1690 | 0.12% | 73.94 |
| 8 | /blog/corporate-event-planning-saudi-arabia-step-by-step-guide | 4 | 1440 | 0.28% | 34.58 |
| 9 | /services/event-production | 1 | 1338 | 0.07% | 27.68 |
| 10 | /about | 6 | 1307 | 0.46% | 59.62 |
| 11 | /blog/corporate-event-excellence-riyadh-jeddah | 2 | 1266 | 0.16% | 53.75 |
| 12 | /services | 1 | 807 | 0.12% | 60.35 |
| 13 | /locations/jeddah | 3 | 654 | 0.46% | 24.58 |
| 14 | /services/exhibitions | 0 | 650 | 0% | 40.36 |
| 15 | /locations/riyadh/corporate-event-management | 1 | 595 | 0.17% | 79.89 |
| 16 | /services/luxury-vip-events | 4 | 515 | 0.78% | 18.54 |
| 17 | /portfolio | 0 | 455 | 0% | 55.99 |
| 18 | /ar/locations/riyadh/corporate-event-management | 0 | 428 | 0% | 79.68 |
| 19 | /blog/choosing-exhibition-trade-show-company-saudi-arabia | 0 | 388 | 0% | 21.91 |
| 20 | /contact | 1 | 378 | 0.26% | 29.57 |
| 21 | /locations/riyadh/conference-planning | 0 | 353 | 0% | 68.63 |
| 22 | /blog/mice-tourism-saudi-arabia-complete-guide-2026 | 2 | 352 | 0.57% | 31.97 |
| 23 | /blog/vision-2030-redefining-saudi-event-landscape | 0 | 319 | 0% | 21.1 |
| 24 | /blog/event-planning-mistakes-to-avoid | 2 | 299 | 0.67% | 33.53 |
| 25 | /blog/ultimate-guide-exceptional-event-planning | 0 | 293 | 0% | 32.04 |
| 26 | /blog/best-event-management-company-riyadh-questions-to-ask | 0 | 267 | 0% | 25.33 |
| 27 | /blog/state-of-mice-industry-saudi-arabia-2026 | 2 | 248 | 0.81% | 44.82 |
| 28 | /ar/about/careers | 1 | 244 | 0.41% | 42.18 |
| 29 | /vendor-registration | 1 | 243 | 0.41% | 27.68 |
| 30 | /locations | 0 | 234 | 0% | 11.83 |
| 31 | /blog/entertainment-activations-jeddah-season-corporate | 0 | 233 | 0% | 52.41 |
| 32 | /faq | 0 | 230 | 0% | 22.19 |
| 33 | /services/event-production-riyadh | 1 | 220 | 0.45% | 59.73 |
| 34 | /services/conference-management-jeddah | 0 | 208 | 0% | 71.12 |
| 35 | /blog/alula-desert-festivals-cultural-activations | 1 | 205 | 0.49% | 10.21 |
| 36 | /blog/elevating-corporate-events-riyadh-jeddah | 0 | 176 | 0% | 56.91 |
| 37 | /blog/eco-friendly-event-management-saudi-arabia | 1 | 167 | 0.6% | 28.97 |
| 38 | /services/conference-management-dammam | 0 | 164 | 0% | 74.18 |
| 39 | /locations/jeddah/corporate-event-management | 1 | 140 | 0.71% | 77.93 |
| 40 | /blog/ramadan-event-planning-guide-saudi-arabia | 0 | 139 | 0% | 13.86 |
| 41 | /blog | 0 | 131 | 0% | 44.63 |
| 42 | /blog/plan-mega-exhibition-riyadh-logistics | 1 | 119 | 0.84% | 24.66 |
| 43 | /portfolio/vision-2030 | 0 | 119 | 0% | 21.72 |
| 44 | /testimonials | 0 | 117 | 0% | 14.26 |
| 45 | /locations/neom/corporate-event-management | 0 | 117 | 0% | 64.55 |
| 46 | /portfolio/neom-future-summit | 0 | 114 | 0% | 11.24 |
| 47 | /blog/future-event-production-saudi-arabia-technology-sustainability | 0 | 112 | 0% | 37.29 |
| 48 | /services/production-venues | 0 | 102 | 0% | 16.44 |
| 49 | /portfolio/corporate-events | 0 | 102 | 0% | 72.38 |

(URLs shortened from `https://saudieventmanagement.com<path>`.)

## 4. Query groups

**Methodology** (fact, not a recommendation): all 1000 queries from `Queries.csv` were run through a keyword-pattern classifier (case-insensitive regex over the exact query text) built from a manual read of the full sorted query list, then spot-checked against the resulting buckets. First-match-wins across the pattern list. This is a mechanical grouping, not a manual read of all 1000 rows — exact per-query placement for ambiguous/short queries (e.g. single words, generic price questions) may be imprecise; group totals are exact for the ruleset applied.

| Group | Query count | Total impressions | Total clicks |
|---|---|---|---|
| CORPORATE | 543 | 25,802 | 30 |
| IRRELEVANT | 262 | 1,846 | 9 |
| WEDDING | 133 | 1,488 | 23 |
| VENDOR-LOOKING-FOR-WORK | 21 | 503 | 0 |
| GOVERNMENT-TENDER | 22 | 359 | 0 |
| PRIVATE-SMALL | 19 | 118 | 1 |
| **Total** | **1000** | **30,116** | **63** |

Group composition notes:
- **CORPORATE** (largest group): conference/exhibition/gala/award/summit/MICE/trade-show/corporate-event/venue-management/event-registration-service queries, e.g. "event management", "gala dinners and awards ceremonies", "corporate event organisers", "conference management companies", "event registration company saudi arabia".
- **GOVERNMENT-TENDER** (22 queries, 359 impressions): explicit tender/RFP/procurement language or a named government/giga-project body, e.g. "diriyah gate tender event management 2026", "event management company tender saudi vision 2030 2026", "neom procurement event management 2026", "general entertainment authority tender event 2026", "mice tender saudi arabia 2026", "gea saudi arabia", "scega permit", "secb permit", "cvb riyadh", "saudi tourism authority tender event management 2026", "government event management saudi arabia".
- **VENDOR-LOOKING-FOR-WORK** (21 queries, 503 impressions): supplier/exhibitor/career-seeking intent rather than a client hiring SEM, e.g. "lead insights for exhibitors saudi event show", "saudi event show exhibitor opportunities", "exhibitor roi saudi event show", "event management jobs", "event management recruitment", "hire event managers", "hire someone", "saudi tourism vendor event or mice 2026", "what vendor opportunities are available in riyadh?".
- **WEDDING** (133 queries, 1,488 impressions): "wedding", "زفاف", "زواج", "ويدنج/ويدنق", "nikah/marriage" queries, e.g. "riyadh wedding venues", "wedding planner jeddah", "average wedding cost in saudi arabia", "red sea weddings", "saudi royal wedding".
- **PRIVATE-SMALL** (19 queries, 118 impressions): birthday/kids/small social-event queries, e.g. "kids birthday party catering", "birthday party caterers", "birthday celebration in jeddah", "party organizer near me".
- **IRRELEVANT** (262 queries, 1,846 impressions): includes (a) ~20+ queries containing "saudi event awards" (a third-party industry awards-ceremony brand's own FAQ/nomination/entry-fee/judging-criteria terms — not buyer intent for SEM's services, e.g. "saudi event awards nomination fee", "saudi event awards judging criteria", "book table saudi event awards"), (b) generic/fragment/non-English-non-query text ("yes", "نعم", "price", "كم السعر", "1000 شخص", "200 people", "fotos", "images"), (c) long multi-sentence AI-assistant/"AI Mode"-style prompts about hotel loyalty programs (Hilton) unrelated to event planning, (d) informational/policy queries with no buyer signal ("saudization in the events industry", "is music allowed in saudi arabia", "seo for event management companies"), and (e) apparent competitor/brand-name navigational queries ("vipeventmanagement.in", "kfahimevent.com", "shaheed's essentials event planner", "brilliant mind events riyadh").

## 5. Zero-impression static and PSEO service pages

Checked against `Pages.csv` (Last 3 months) — a page absent from that file received 0 impressions in the window.

**14 static service pages (English, `/services/<slug>`):**
- Zero impressions: **`cultural-events`, `vip-transportation`, `entertainment`** (3 of 14).
- All other 11 have impressions (range 32–5,524; lowest non-zero: `valet-parking` at 32, `destination-events` at 44).

**14 static service pages (Arabic, `/ar/services/<slug>`):** zero impressions: `cultural-events`, `destination-events`, `royal-weddings` (3 of 14 — different set than English; `entertainment` and `vip-transportation`, which are zero in English, do have Arabic impressions of 19 and 1 respectively).

**19 PSEO service×city pages (English, `/services/<slug>`):** none have zero impressions — all 19 have at least 5 impressions (lowest: `destination-events-neom` at 5; highest: `conference-management-jeddah` at 208).

**19 PSEO service×city pages (Arabic, `/ar/services/<slug>`):** zero impressions: `luxury-weddings-dammam`, `cultural-events-jeddah`, `destination-events-alula`, `destination-events-neom` (4 of 19).
