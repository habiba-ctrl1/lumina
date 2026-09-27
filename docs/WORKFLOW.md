# WORKFLOW

The end-to-end deal flow SEM runs, and how each step maps onto the code/DB. SEM is a **digital
sales & coordination broker** with a vendor partner network — not a full-service owner-operator.
Quotations always go to the client **from SEM**, never from a vendor (non-circumvention).

## Pipeline: lead → requirement → sourcing → quote → negotiation → booking → completion

### 1. Lead capture (multiple entry points, one destination)
- **Website contact form** → `POST /api/contact` → creates `Inquiry` (+ upserts `Client`, `Lead`,
  `QuoteRequest`).
- **WhatsApp / email (manual)** → admin **Quick-Add** on `/admin/inquiries`: paste the chat →
  `parse-lead.ts` extracts fields locally (no external API, keeps client contact private) →
  `POST /api/admin/quick-lead` writes the same multi-table set. Phone-only leads get a stable
  `whatsapp-<digits>@lead.sem` key so the same number dedupes to one `Client`.
- **Inbound partnership/CV emails** → triaged into `EmailLead` by the scheduled inbox routine
  (drafts only, never auto-sends).
- Daily driver to see what needs a reply: **`/admin/action-needed`**.

### 2. Requirement + vendor sourcing
- Requirement lives on the `QuoteRequest` (event type, city, guest count, budget range, requirements).
- **Match vendors:** `/admin/vendors` → matching widget → `POST /api/admin/vendor-match`
  (`vendor-ranking.ts`). Filters by service + city (`regionCoverage`, "Saudi Arabia"-wide supported),
  excludes `Unverified` by default, ranks Verified > Preferred > internalRating. **Output never
  includes private vendor contact fields.** Service matching now prefers the canonical `categoryLinks`
  relation (fixed 2026-09-26 — previously only checked deprecated legacy text fields, which could miss
  properly-categorized vendors); legacy fields remain a fallback for vendors not yet re-linked.
- **Request vendor prices:** ask each vendor for their **best price** — never quote the client's
  ceiling/budget to a vendor (protects margin). Their cost is logged as a `VendorQuote`
  (`vendorCost`, private). Their PDF stays on the founder's laptop in `VENDOR Quotations/`; only the
  filename is stored (`fileRef`).

### 3. Client quotation
- Build in **`/admin/quotes`** (the real, actively-used builder — `quote-wizard` is a mocked
  prototype and `/admin/proposals` an older duplicate, neither in active use, see KNOWN-ISSUES.md) →
  creates a `Proposal` (`lineItems` JSON, `subtotal`, 15% `vatAmount`, `totalAmount`, `version`).
- **Preview / generate PDF:** `quotation-html.ts` → `buildQuotationHtml()` renders the approved
  navy/gold letterhead (`client/Sem Templates and company profile/_SEM-Quotation-TEMPLATE.html`).
  Preview works even before saving (shows "DRAFT").
- **Margin:** `commission = Proposal.subtotal − Proposal.vendorCostTotal`. **Never disclose the
  vendor's cost or SEM's commission to the client.** Every quote carries the standing T&C clause that
  discloses partner-payment routing (SEM's fee is not itemised).
- **"Send to Client" actually sends now (fixed 2026-09-26).** `sendProposalEmail()`
  (`send-quote-email.ts`) emails the client via the existing Gmail-SMTP helper with the branded
  quotation attached. `QuoteRequest.status` only advances to `quote_sent` and `Proposal.status` only
  becomes `sent` on a real, confirmed delivery — never optimistically. On failure the quotation is
  preserved, `Proposal.emailStatus="failed"` is recorded, and the admin gets a Retry button
  (`POST /api/admin/quotes/[id]/send`). A second+ quote for the same request is a new `version`,
  shown as "(Rev. N)" on the document/email subject — v1 stays unlabeled.

### 4. Negotiation → booking
- Statuses move along `Lead` (New → Contacted → Proposal Sent → Negotiation → Won/Lost) and
  `QuoteRequest`/`Proposal` (pending → quote_sent → accepted/rejected).
- Booking/confirmation → `Event` (status Inquiry → Quoted → Booked → Completed) with its `timeline`
  stage; `Meeting` rows log scheduled calls/meetings.

### 5. Payment & completion
- **No Saudi bank/CR yet:** the vendor collects the client payment directly; **staged deposits**
  protect against vendor-absconding risk (memory: client-payment-structure).
- Agreements are signed **at project assignment**, not at early proposal stage — use a light
  NDA/non-circumvention note for early quoting.
- `FinancialRecord` is the intended home for revenue/expense/commission tracking (not yet in active use).

## Non-negotiables threaded through every step
- Vendor contact info (person/phone/email/whatsapp) **never** exposed to clients, public routes, APIs, or exports.
- Client's target budget/ceiling **never** revealed to a vendor.
- No fabricated content (testimonials, awards, client credits, company age).
- Quotes go **from SEM only**.
