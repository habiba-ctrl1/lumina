# Transportation division — SEO notes (Phase 5, 2026-10-26)

## What the evidence says
- **Own Search Console data (exports of 2026-09-20 and 09-24):** essentially no transport demand. The only related query is "king fahd causeway" (1 impression, position 69, from cross-border *events*). `/services/vip-transportation` and `/travel` have a handful of impressions. There is no baseline to prove demand for chauffeur or cross-border queries on this site.
- **SERP check (web search, not a volume tool):** the head terms are held by aggregators and established chauffeur brands — Blacklane (Riyadh, Dammam–Bahrain, long-distance), Daytrip (Riyadh–Dubai, Dammam–Bahrain airport transfers, with prices), Airssist (Dubai–Riyadh chauffeur), Swvl, Transfeero, OneClickDrive. Expect "chauffeur service Riyadh" and "airport transfer Riyadh" to be hard to rank for from a standing start.
- **No search-volume data was available.** Nothing in this file is a volume claim. Use Google Keyword Planner or Search Console once the pages have been live ~4–6 weeks.

## Positioning that is realistic
1. **Corporate / event-adjacent intent** the site already has authority for: "chauffeur for conference delegates Riyadh", "executive transport for corporate event", "delegation transport Riyadh". Strongest overlap with existing event pages; link from them.
2. **Enquiry-led cross-border** ("private transfer Saudi Arabia to Bahrain/UAE") — competitors publish fixed prices and durations; we cannot until a licensed operator is confirmed. Do not chase these terms with route pages yet.
3. Avoid head-term duplication with `/services/vip-transportation` (event transport, Riyadh) and `/travel` (leisure). Intent split: event → `/services/vip-transportation`; leisure/tourist → `/travel`; executive/corporate point-to-point and cross-border → `/transportation`.

## Candidate keyword set (to validate with Keyword Planner / GSC)
| Intent | Target page | Terms |
|---|---|---|
| Corporate chauffeur | `/transportation/vip-chauffeur/riyadh` | executive chauffeur Riyadh; chauffeur service for business travellers Riyadh; airport transfer Riyadh corporate |
| Chauffeur hub | `/transportation/vip-chauffeur` | VIP chauffeur Saudi Arabia; chauffeur-driven car Saudi Arabia |
| Cross-border (informational/enquiry) | `/transportation/cross-border-transfers` | private transfer Saudi Arabia to Bahrain; Dammam to Bahrain private car; Riyadh to Dubai chauffeur |
| Vehicle | `/transportation/luxury-vehicles` | executive SUV with driver Saudi; Mercedes V-Class chauffeur Saudi (only if a partner confirms; page currently avoids model claims) |
| Event overlap | `/services/vip-transportation` (existing) | conference delegate transport Riyadh; wedding guest transportation Riyadh |

Arabic equivalents (سائق خاص الرياض، نقل تنفيذي الرياض) are not targeted yet: the transportation pages are English-only.

## Technical checks run (dev server crawl)
- 7 `/transportation` URLs return 200; each has a unique title, unique description, one H1, and a self-canonical. Titles trimmed to ≤ ~64 characters and descriptions to ≤ 160 where I control them.
- No broken internal links among transportation pages (query-string quote links resolve to the canonical `/transportation/request-a-quote`).
- JSON-LD parses on every page. Types: Organization + WebSite (site layout), plus Service, BreadcrumbList and FAQPage per page. No ratings, reviews, LocalBusiness or address claims.
- Sitemap lists the 6 indexable transportation URLs; the Jeddah page is `noindex, follow` and deliberately absent.
- No hreflang is emitted on transportation pages (no Arabic versions); `/ar/transportation*` stays noindex via middleware.
- Inbound links: Navbar services dropdown, homepage services list (added), `/services/vip-transportation` related cards, and hub ↔ child pages.

## Known gaps / follow-ups
- `/services/vip-transportation` has a 112-character title and 250-character description (pre-existing). Candidate for a trim.
- `/services` index page does not link to `/transportation`; its cards are data-driven — add a card only if the founder wants the division promoted there.
- FAQPage markup is present because the FAQs are visible on the page; do not expect a rich result.
- Request-a-quote is indexable with a canonical; consider `noindex` if it competes with the hub in Search Console.
- Revisit this file after GSC shows impressions for the new URLs.
