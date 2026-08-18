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
  includes private vendor contact fields.**
- **Request vendor prices:** ask each vendor for their **best price** — never quote the client's
  ceiling/budget to a vendor (protects margin). Their cost is logged as a `VendorQuote`
  (`vendorCost`, private). Their PDF stays on the founder's laptop in `VENDOR Quotations/`; only the
  filename is stored (`fileRef`).

### 3. Client quotation
- Build in **`/admin/quotes`** (quote builder) or `quote-wizard` → creates a `Proposal`
  (`lineItems` JSON, `subtotal`, 15% `vatAmount`, `totalAmount`).
- **Preview / generate PDF:** `quotation-html.ts` → `buildQuotationHtml()` renders the approved
  navy/gold letterhead (`client/Sem Templates and company profile/_SEM-Quotation-TEMPLATE.html`).
  Preview works even before saving (shows "DRAFT").
- **Margin:** `commission = Proposal.subtotal − Proposal.vendorCostTotal`. **Never disclose the
  vendor's cost or SEM's commission to the client.** Every quote carries the standing T&C clause that
  discloses partner-payment routing (SEM's fee is not itemised).
- Sending flips `QuoteRequest.status → quote_sent`. **Known gap:** no real email/WhatsApp send is
  wired into the "Send to Client" button yet — see [KNOWN-ISSUES.md](KNOWN-ISSUES.md).

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
