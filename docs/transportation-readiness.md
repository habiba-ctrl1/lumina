# Transportation division — production-readiness report (Phase 6, 2026-10-26)

Branch: `claude/sem-premium-transport-division-abe623` · Not merged, not deployed.

## 1. Verdict
**Code-complete for a soft launch, but not deployable until the SQL is run and one real enquiry is end-to-end tested against the live database and SMTP.** Those two things could not be verified from the development machine (Postgres is network-blocked; no SMTP credentials locally).

## 2. Must do before deploy (in order)
1. Run `scripts/phase2-transport-columns.sql` in the Supabase SQL editor. **Deploying code first would break existing pipeline/quotes/contact queries** (Prisma selects every `QuoteRequest` column).
2. Confirm env vars on the host: `SMTP_*` (existing), `CRON_SECRET` (existing, also guards the new retry cron), optional `TRANSPORT_CUSTOMER_ACK=off` to disable the customer acknowledgement.
3. Deploy, then submit one real enquiry on `/transportation/request-a-quote` and verify: (a) success screen shows a `SEM-YYYY-######` reference; (b) a row appears in `/admin/transportation` with correct attribution and `business=SEM`, `leadDepartment=transportation`; (c) the internal email arrives; (d) the customer acknowledgement arrives (or is disabled by flag); (e) the same enquiry appears in `/admin/inquiries` and `/admin/pipeline` as expected.
4. Founder read-through of page copy and FAQs (`src/lib/transportation/pages.ts`, hub page) — no policy claims were invented, but wording is unreviewed.

## 3. Test results
| Check | Result |
|---|---|
| `tsc --noEmit` | Clean |
| `npm run build` (Next 16 / Turbopack) | Passes; all 9 new pages + 3 new API routes compile |
| ESLint (`next lint` no longer exists in Next 16 — run `eslint --no-eslintrc -c .eslintrc.json`) | New transportation code clean. 19 errors remain in files I only touched lightly (`admin/layout.tsx`, `Navbar.tsx`, `admin/pipeline/page.tsx`: unused imports, `any`) — all pre-existing |
| Unit/integration tests | **None exist in the repo**; none added. Validation was exercised by hand against the running endpoint |
| Endpoint behaviour (prod build) | Empty/invalid → 400 with field errors; past date, wrong country pairing, missing consent → 400; honeypot and <3s submissions → silent no-save; 6th request in 10 min → 429; DB failure → generic 500, no internals |
| Form flow in browser (375px, prod build) | Step-by-step validation, Back keeps data, missing consent blocked, DB failure shows an error and keeps the form (never a false success) |
| Responsive (320 / 375 / 768 / 1024 / 1440) | No horizontal overflow on the hub at any width; Riyadh page checked at 375 |
| Accessibility (scripted) | No images without alt, no unnamed buttons/links, no heading skips; form fields labelled. One unlabelled input found — it is the site-wide footer newsletter field (pre-existing) |
| Contrast | Gold eyebrow text on ivory failed AA; fixed (darker bronze on light sections) |
| Reduced motion | Reveal and smooth-scroll are JS-guarded; hero animation is `motion-safe`; a scoped `prefers-reduced-motion` rule now neutralises every transition on transportation pages. **Not exercised in a browser** |
| Regression (prod build, HTTP) | `/`, `/about`, `/services`, `/services/*`, `/travel`, `/contact`, `/blog`, `/locations/riyadh`, `/portfolio`, `/vendors`, `/ar`, `/admin/login`, robots, sitemap all 200. `/api/contact` still validates (400 on empty). `/api/admin/pipeline`, `/api/admin/transportation*` and the retry cron return 401 without credentials |
| SEO | See `docs/transportation-seo.md` |

## 4. Not verified (be aware)
- A successful database write, email delivery, retry cron, and admin queue with real data and a real admin login.
- Core Web Vitals / Lighthouse — not measured. Hero image is `priority`-loaded; no video; no heavy scripts added.
- Visual QA at 320 and 768 on every page, RTL/Arabic (no Arabic pages exist), real mobile devices, screen-reader testing.
- Existing admin pipeline UI with the new stages present (code path reviewed, not clicked through while logged in).
- The existing event forms were not submitted (that would write real leads); only their validation path was hit.

## 5. Known limitations and risks
- **No cross-border route is operationally verified.** All are enquiry-only by design (`ROUTE_ELIGIBILITY`). Marking one verified requires a human to confirm an authorised operator.
- **Jeddah page is noindex** until a Jeddah partner is confirmed.
- **No admin roles**: every signed-in admin can see transport leads and export CSV (existing limitation).
- **Rate limiting is in-memory** (per serverless instance); the database duplicate check is the backstop.
- **Retry cron runs daily**; a failed email can wait up to ~24 h.
- **No attachments, no pre-WhatsApp capture form, no map, no Arabic, no transport quote PDF** (proposals reuse the existing quote tool; the wizard does not prefill from a lead).
- `/api/contact` still returns a raw error string on failure and interpolates user input into email HTML (pre-existing; not changed).
- GSC shows no existing transport demand; the SERPs are aggregator-dominated. Expect slow organic traction.

## 6. Prioritised remaining work
1. Run SQL + end-to-end test on the live stack (above).
2. Founder review of copy; confirm vehicle/capacity wording and customer-ack email default.
3. Confirm a Jeddah partner (then flip `indexable`), and any licensed cross-border operator (then verify the first route and build its page).
4. Add a minimal test suite for `validateEnquiry` and the endpoint (no test runner is configured yet).
5. Harden `/api/contact` (escape email HTML, generic errors, rate limit) — shared risk with the new form.
6. Measure CWV after launch; review GSC after 4–6 weeks and adjust per `docs/transportation-seo.md`.
7. Later: Arabic pages, corporate transportation page, Makkah/Madinah/Dammam pages once supply is confirmed, admin roles, quote prefill and PDF for transport.

## 7. Environment / configuration summary
| Item | Needed for |
|---|---|
| `scripts/phase2-transport-columns.sql` applied | Everything (hard requirement) |
| `SMTP_HOST/PORT/USER/PASS` | Notification emails (existing) |
| `CRON_SECRET` | Retry cron auth (existing) |
| `TRANSPORT_CUSTOMER_ACK=off` (optional) | Disable customer acknowledgement |
| `NEXT_PUBLIC_SITE_URL` (optional) | Admin link in notification emails |
