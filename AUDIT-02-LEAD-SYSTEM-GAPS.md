# AUDIT-02 — Lead System Gaps (read-only, facts only)

## 1. LEAD CAPTURE GAPS

**`ServiceLeadForm`** (`src/components/ServiceLeadForm.tsx:64-75`), posts to `/api/contact`:
| Field | Required | Validation |
|---|---|---|
| name | yes (`required` on `<input>`, line 140) | HTML5 only — no length/format check |
| email | yes (`required`, `type="email"`, line 156) | HTML5 email pattern only |
| phone | no (line 170) | none |
| company | no (line 183) | none |
| eventType | no (`<select>`, line 198) | none — free dropdown, can stay `""` |
| venueCity | no (`<select>`, line 216) | none |
| eventDate | no (`type="date"`, line 236) | none |
| guestCount | no (`type="text"`, line 247) | none — plain text, not numeric |
| message | yes (`required`, `<textarea>`, line 264) | HTML5 only |

**`ContactForm`** (`src/app/[locale]/contact/ContactForm.tsx:8-17`), posts to `/api/contact`:
| Field | Required | Validation |
|---|---|---|
| name | yes (line 105) | HTML5 only |
| email | yes (line 122) | HTML5 email pattern |
| phone | no (line 140) | none |
| eventType | no, and only rendered `if (isClient)` (line 151-171) | none |
| venueCity | no, `if (isClient)` (line 175-194) | none |
| message | yes (line 202) | HTML5 only |
| source | fixed `"contact_page"` (line 15) | n/a |
| inquiryType | toggle `"client"` / `"vendor"` (line 16, 76-94) | n/a |

**Consultation form** (`src/app/[locale]/consultation/page.tsx:21`), posts to `/api/consultation`:
Fields `name, email, phone, company, eventType, eventDate, guestCount, budget, message` (line 63 reset list). Required (`required` attribute present): `name` (line 174), `email` (line 187), `phone` (line 203), `eventType` `<select>` (line 215), `budget` `<select>` (line 246), `message` `<textarea>` (line 265). `company`, `eventDate`, `guestCount` are optional. Same server-side check in `src/app/api/consultation/route.ts:16` (`if (!name || !email || !phone || !eventType || !budget || !message)`).

Server-side validation, all three converge on two API routes:
- `src/app/api/contact/route.ts:25` — `if (!name || !email || !message) return 400`. `budget` is never required or validated server-side even though `ContactForm`/`ServiceLeadForm` don't collect it at all for the client path outside consultation.
- `src/app/api/consultation/route.ts:16` — as above.
No format/regex validation (email shape, phone shape, numeric guest count) exists in either route — both trust whatever JSON the client sends.

**To add a budget-tier field and a service-required field to all three forms:**
- `prisma/schema.prisma`: `Inquiry` (`prisma/schema.prisma:242-260`) already has `budget String?` but no service-type-required flag; `Lead` (`prisma/schema.prisma:262-277`) already has `budget String?`; `QuoteRequest` (`prisma/schema.prisma:342-359`) already has `budgetRange String?`. None of the three models has any "service required" boolean/enum field — a new column would need adding to `Inquiry`, `Lead`, and `QuoteRequest` (and a `prisma migrate`/`db push`).
- `src/components/ServiceLeadForm.tsx`: add `budget`/`serviceRequired` keys to the `formData` state (line 64-75) and a new `<select>`/`<input>` block (pattern at line 195-257).
- `src/app/[locale]/contact/ContactForm.tsx`: same, to `formData` (line 8-17) and a new field block (pattern at line 133-194) — note it currently has no `budget` field at all.
- `src/app/[locale]/consultation/page.tsx`: `budget` already exists (line 246 `<select>`); would only need the new service-required field added.
- `src/app/api/contact/route.ts`: destructure the new field from `body` (line 9-12), add to the `Inquiry.create` (line 58-73), `Lead.create` (line 93-106), and `QuoteRequest.create` (line 108-123) data blocks.
- `src/app/api/consultation/route.ts`: destructure (line 9-12), add to `Inquiry.create` (line 26-39) and `QuoteRequest.create` (line 42-56).
- `src/app/api/admin/quick-lead/route.ts`: same three `.create()` blocks (line 61-131) for the WhatsApp/manual-intake path to stay consistent.

## 2. LEAD LIFECYCLE

Status enum/values (as documented in `prisma/schema.prisma` comments and enforced only by convention — all fields are `String`, not a Prisma `enum`):
- `Inquiry.status` (`prisma/schema.prisma:254`): `Pending, Contacted, Confirmed, Cancelled`, default `Pending`.
- `Lead.status` (`prisma/schema.prisma:273`): `New, Contacted, Proposal Sent, Negotiation, Won, Lost`, default `New`.
- `QuoteRequest.status` (`prisma/schema.prisma:354`): `pending, quote_sent, accepted, rejected, archived`, default `pending`.
- `Quote.status` (`prisma/schema.prisma:233`): `Pending, Approved, Rejected`, default `Pending`.
- `Proposal.status` (`prisma/schema.prisma:397`): `draft, sent, accepted, rejected, expired`, default `draft`.
- `VendorQuote.status` (`prisma/schema.prisma:379`): `Requested, Received, Selected, Rejected`, default `Requested`.

Where each is set in code (create/update sites):
- `Inquiry.status`: created as `'New'` by `src/app/api/consultation/route.ts:37`; created implicitly `'Pending'` (schema default, no explicit value) by `src/app/api/contact/route.ts` creates (line 58, 38) and `src/app/api/admin/quick-lead/route.ts:62-77`; updated via `PATCH` body passthrough in `src/app/api/contact/route.ts:448-451` (`admin/inquiries/page.tsx` UI restricts the value to `Pending, Contacted, Confirmed, Cancelled`, `src/app/[locale]/admin/inquiries/page.tsx:170`); also flipped to `Contacted` by the Action-Needed page (`src/app/[locale]/admin/action-needed/page.tsx:105`).
- `Lead.status`: created as `'New'` in `src/app/api/contact/route.ts:103` and `src/app/api/admin/quick-lead/route.ts:109`. No other write site found (no PATCH route for `Lead` located in `src/app/api`).
- `QuoteRequest.status`: created as `'pending'` (`src/app/api/contact/route.ts:121`, `src/app/api/consultation/route.ts:54`, `src/app/api/admin/quick-lead/route.ts:126`); moved to `'quote_sent'` in `src/app/api/admin/quotes/route.ts:45`; other transitions (`accepted`, `rejected`, `archived`) referenced only in read/count queries (`src/app/api/admin/quote-requests/route.ts:11-17`) — no write site for those three values was found in the routes inspected.
- `Quote.status`: created as `'Pending'` (schema default) in `src/app/api/quotes/route.ts:20`.
- `Proposal.status`: created as `'draft'` in `src/app/[locale]/admin/proposals/page.tsx:123`; moved to `'sent'` in `src/app/api/admin/quotes/route.ts:38`.
- `EmailLead.status` (separate model, `prisma/schema.prisma:145`): `New, Reviewed, Actioned` — set via `src/app/api/admin/email-leads/[id]/route.ts:9` and `src/app/[locale]/admin/action-needed/page.tsx:119`.

Presence of specific tracking fields — searched `prisma/schema.prisma` directly:
- **Due date**: NOT PRESENT on `Inquiry`, `Lead`, `QuoteRequest`, `Quote`, or `Proposal`.
- **Next-follow-up date**: NOT PRESENT as a stored field on any lead/quote model. The closest mechanism is `src/app/api/cron/follow-up-digest/route.ts`, which computes staleness at query time from `createdAt`/`updatedAt` age thresholds (e.g. `INQUIRY_STALE_DAYS`, line 48-64) — nothing is written back to a record.
- **Owner**: `Inquiry.assignedTo String?` (`prisma/schema.prisma:255`) and `Lead.assignedTo String?` (`prisma/schema.prisma:274`) exist and are populated (e.g. `"Habiba Asghar"` hardcoded in `src/app/api/contact/route.ts:30`). `QuoteRequest`, `Quote`, and `Proposal` have NOT PRESENT — no owner field.
- **Lost reason**: NOT PRESENT. `Lead.status` has a `Lost` value (schema comment, line 273) but no accompanying reason field; `Inquiry.notes String?` and `Lead.notes String?` are free-text and could hold a reason but nothing structures or requires one.
- **Quote-sent timestamp**: NOT PRESENT as a dedicated field. `QuoteRequest`/`Proposal` rely on `updatedAt` (auto-managed by Prisma, `@updatedAt`) changing when status flips to `quote_sent`/`sent` — there is no explicit `quoteSentAt` column.

## 3. WHATSAPP

Every WhatsApp reference in the codebase:
- **Floating outbound button**: `src/components/WhatsAppButton.tsx:23` — static `wa.me/966539388072` link with a canned pre-filled message, rendered on public pages site-wide.
- **Admin email notifications**: `src/app/api/contact/route.ts:175` (vendor-path admin email) and `:289` (client-path admin email) embed a `wa.me/<lead's phone>` button so the admin can open a chat with the lead — outbound only, triggered by the admin clicking.
- **Client confirmation email**: `src/app/api/contact/route.ts:341` embeds a `wa.me/966539388072` link inviting the client to message SEM.
- **Social post copy**: `src/app/api/admin/social-post/route.ts:7,83` — a hardcoded WhatsApp number string inserted into generated social captions, no API call.
- **Manual WhatsApp-lead intake**: `src/app/api/admin/quick-lead/route.ts` — an admin-only, admin-triggered endpoint. The admin pastes a WhatsApp conversation into the admin UI; `parseLead()` (`src/lib/parse-lead.ts`) extracts fields from the pasted text (`parseOnly` mode, line 24-27); a second call with the extracted fields creates `Inquiry`/`Client`/`Lead`/`QuoteRequest` rows tagged `source: 'whatsapp_manual'` / `'whatsapp'` (line 49, 108). This requires a human to copy-paste — WhatsApp is not connected as a live channel.
- **Vendor `whatsapp` field**: `Vendor.whatsapp`, `VendorApplication.whatsapp` (schema fields, private/admin-only per the hard rule in `CLAUDE.md`).
- **Copilot/system-prompt references**: `src/app/api/admin/copilot/route.ts:20,32` — instructs the AI assistant never to reveal WhatsApp numbers cross-party; not a WhatsApp integration itself.

**No inbound WhatsApp integration exists.** No webhook route, no WhatsApp Business API / Cloud API credentials, and no `twilio`/`360dialog`/`WABA`-style code were found anywhere in `src` (confirmed via repo-wide search). Every WhatsApp touchpoint is either (a) an outbound `wa.me` deep link, or (b) the `quick-lead` endpoint, which requires a human admin to manually copy text from WhatsApp and paste it into the admin panel. No inbound WhatsApp message can create or update a record automatically.

## 4. VENDOR DATA COMPLETENESS

Public forms write to `VendorApplication` (`prisma/schema.prisma:156-218`), never directly to `Vendor` — a `Vendor` row is only created/updated later by an admin action (`src/app/api/partner-applications/[id]/route.ts`, approve/merge branch, line 90-172).

- **`PartnerOnboardingForm`** (`src/components/PartnerOnboardingForm.tsx`, used at `/partner-onboarding`) collects nearly the entire `VendorApplication` schema via its `FormState` (line 70-110): `companyName, businessType, contactPerson, jobTitle, whatsapp, email, phone, city, website, instagram, googleMaps, linkedin, facebook, tiktok, youtube, categories, servicesDesc, regionCoverage, yearsInBusiness, teamSize, languages, crNumber, vatNumber, portfolioLink, logoLink, profileLink, videoLink, pricingType, rateCardLink, majorClients, certifications, permMediaUse, permLogoUse, featureOnSem, backlinkAnswer, extraNotes, permAccurate, permNonCircumvention`.
- **`/vendor-registration` page** (`src/app/[locale]/vendor-registration/page.tsx`, a separate, simpler self-contained form, NOT `PartnerOnboardingForm`) collects only `fullName, email, phone, businessName, category, city, portfolio, message, permAccurate, permNonCircumvention` and maps them to `VendorApplication` on submit (line 42-53): `companyName←businessName, contactPerson←fullName, whatsapp←phone, email, city, categories←[category], profileLink←portfolio, servicesDesc←message, permAccurate, permNonCircumvention`.
- `VendorApplication` fields collected by NEITHER public form (system/admin-set only): `appNumber` (auto-generated, `src/app/api/partner-applications/route.ts:33-39`), `status`, `vendorId`, `reviewedAt`.

On admin approval, the merge/create logic (`src/app/api/partner-applications/[id]/route.ts:95-171`) copies only a subset of `VendorApplication` fields onto `Vendor`: `contactPerson, email, phone, whatsapp, city, services←servicesDesc, portfolio←website/instagram/portfolioLink, portfolioFiles←portfolioLink, rateCardFiles←rateCardLink, rateCardSummary←pricingType, certifications, yearsExperience, categories, regionCoverage, categoryLinks, photoPermission←permMediaUse`. Notably **`app.crNumber` and `app.vatNumber` are captured on the public application but are never copied onto the created `Vendor` record** (absent from both the `create` data block at line 143-169 and the `fillIfEmpty` merge calls at line 99-114) — so `Vendor.crNumber`/`Vendor.vatNumber` stay `null` unless an admin manually re-enters them.

`Vendor` fields that can **only ever be filled in manually by an admin** (never populated by any public-form → approval pathway): `name` (uses `companyName` as-is, not editable pre-approval), `category` (legacy single value), `pricing`, `availability`, `rating`, `crNumber`, `vatNumber` (per above), `meetingStatus` (set to fixed `'Contacted'` on create, then admin-edited), `agreementSigned`, `agreementDate`, `verificationStatus` (set to fixed `'Pending'` on create), `partnershipStatus`, `internalRating`, `preferred`, `notes` (`VendorNote` — admin-only per schema comment, line 220-227).

**Publicly displayed vendor data**: `src/components/VendorMarketplace.tsx` contains 6 entirely hardcoded, fabricated vendor entries (`"Al-Majid Studios," "The Golden Whisk," "Sapphire Blooms," "Saffron & Silk," "Elite Vision PK," "Velvet Sugar"`, line 18-85) with fake ratings/review counts and all routed to SEM's own WhatsApp number (`966539388072`, line 9, 28 etc.) — but a repo-wide search found this component is **not imported by any page** (`grep -rln "VendorMarketplace" src` returns only the component's own file), so it does not currently render on the live site. The actual public `/vendors` page (`src/app/[locale]/vendors/page.tsx`) contains no `fetch`/API call and no references to `contactPerson`, `whatsapp`, `phone`, or `email` — it is static marketing copy, not a live vendor directory, so no real `Vendor` contact fields are exposed there (consistent with the hard rule in `CLAUDE.md`).

## 5. PRICING

Public pages **do** show concrete SAR figures — all inside FAQ copy / FAQPage JSON-LD answer text, not a pricing table or calculator. Files containing `SAR <figure>` statements: `src/app/[locale]/page.tsx` (homepage FAQ, line 203: "corporate events start from SAR 75,000, weddings from SAR 50,000, conferences from SAR 45,000, and exhibitions from SAR 80,000"), `src/app/[locale]/locations/jeddah/page.tsx:192`, `src/app/[locale]/locations/makkah/page.tsx`, `src/app/[locale]/locations/[city]/[service]/page.tsx:88` ("luxury weddings ... range from SAR 150,000 to SAR 2,000,000+"), `src/app/[locale]/services/corporate-events/page.tsx`, `src/app/[locale]/services/weddings/page.tsx`, `src/app/[locale]/services/conferences/page.tsx`, `src/app/[locale]/services/destination-events/page.tsx`, `src/app/[locale]/services/event-production/page.tsx`, `src/app/[locale]/services/production-venues/page.tsx`, `src/app/[locale]/services/royal-weddings/page.tsx`, `src/app/[locale]/services/luxury-vip-events/page.tsx`, `src/app/[locale]/services/page.tsx`, `src/app/[locale]/services/[slug]/page.tsx`, `src/app/[locale]/glossary/page.tsx`, `src/app/[locale]/blog/[slug]/page.tsx` (per-post, where blog content mentions cost). Representative figures found: "corporate events ... from SAR 18,000 for a full-day package," "gala dinners range from SAR 150,000–600,000," "large-scale conferences ... SAR 300,000–1,500,000," "luxury weddings ... SAR 150,000 to SAR 2,000,000+," "royal weddings start from SAR 250,000 ... can exceed SAR 2,000,000." No dedicated pricing/rate-card page, calculator, or line-item cost breakdown exists on any public route — figures are exclusively FAQ-answer prose (used for `FAQPage` JSON-LD / AEO purposes per code comments elsewhere in the repo).

## 6. CONTENT PROVENANCE

- **`/testimonials`** (`src/app/[locale]/testimonials/page.tsx`) renders `<Testimonials />` (`src/components/Testimonials.tsx:9-10`), which reads `useTranslations("testimonials").raw("items")` — i.e. content lives in the i18n dictionaries `src/lib/dictionaries/en.json` / `ar.json`, not the `Testimonial` Prisma model (which exists in the schema, `prisma/schema.prisma:296-307`, and has its own admin page `src/app/[locale]/admin/testimonials/page.tsx` + `src/app/api/testimonials/route.ts`, but is not what the public page renders). The `testimonials.items` array in `en.json` currently has exactly **one entry**: `{"quote": "We personally vet every vendor in our network so you get one accountable partner — not a directory of strangers.", "author": "Saudi Event Management", "role": "Riyadh, Saudi Arabia"}` — a company statement attributed to SEM itself, not a named client.
- **`/about/awards-accolades`** (`src/app/[locale]/about/awards-accolades/page.tsx`): hardcoded `standards` array (line 49-71) in the page file itself. It contains no awards or third-party accolades — three internal "Standards" entries: "Personal Vendor Vetting," "A Transparent Process," "One Accountable Point of Contact," each with English/Arabic body text describing SEM's process, not any claimed external award.
- **`/about/our-team`** (`src/app/[locale]/about/our-team/page.tsx`) and the dynamic profile route `src/app/[locale]/about/our-team/[name]/page.tsx`: a hardcoded `TEAM_PROFILES` object (line 15-95 of the `[name]/page.tsx` file). It contains exactly **one profile**: `"Habiba Asghar"` (Arabic: `"حبيبة أصغر"`), title "Founder & CEO." `teamMemberSlugs = Object.keys(TEAM_PROFILES)` (line 105) is what `src/app/sitemap.ts` iterates to generate team-page sitemap entries — currently only one slug.
- **13 portfolio case studies**: driven by `src/lib/case-studies.ts` (`CASE_STUDIES` record, line 26 onward), a hardcoded data file (not DB, not CMS) that powers structured data, the "related projects" CTA, and page metadata. Entries are generic event-type titles, not client names — e.g. `"royal-riyadh-wedding": "Riyadh Royal-Style Palace Wedding"`, `"makkah-vip-retreat": "Makkah VIP Retreat"`, `"madinah-spiritual-event"`, `"alula-desert-festival"`, `"dammam-corporate-seminar"`, `"executive-summit-jeddah": "Jeddah Executive Summit"`, `"global-tech-summit"`, `"neom-future-summit"`, `"riyadh-elite-majlis"`, `"riyadh-luxury-soiree"`, `"alkhobar-corporate-retreat": "Al Khobar Corporate Retreat"`, `"grand-wedding-ceremony"`, `"jeddah-beach-wedding": "Jeddah Seaside Wedding"`, `"riyadh-government-summit"`. There is no `client` field in the `CaseStudy` type (line 9-23); descriptions are explicitly framed as concepts (e.g. royal-riyadh-wedding description begins "A concept for an 800-guest royal-style wedding..." — line 30-31), and no real client/company name appears in any of the 13 entries.
