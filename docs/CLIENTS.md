# CLIENTS

How client / event-project records are organised. **This file is committed to git — so it holds
NO client names, contact details, or deal specifics.** The real register lives in the gitignored
`client/` folder.

## Where client data lives
- **`client/` (gitignored, laptop-only)** — one folder per active client/event project (contracts,
  RFQs, extracted data, quote templates). Never pushed to remote (`.gitignore` line 57).
- **`client/README.md` (gitignored)** — the actual **client register/index** (project name, event,
  city, date, status, next action). Maintain the live list there, not here.
- **Database** — structured records live in Prisma (`Client`, `Inquiry`, `Lead`, `QuoteRequest`,
  `Event`, `Proposal`). The `client/` folder is for documents; the DB is for pipeline state.

## Rules
1. **Do not hardcode client data into application code** — it belongs in the DB or the `client/` folder.
2. **Never expose client contact info** on public routes/APIs/exports (mirror of the vendor rule).
3. **Never put client names or deal specifics in `docs/`** — `docs/` is committed. Sensitive detail
   goes in the gitignored `client/` folder only.
4. One folder per project; keep the folder name to a short project label (e.g. company + event),
   not personal contact info.

## Register schema (fields to track per client — kept in `client/README.md`)
Client/project label · Event type · City · Event date · Guest count · Budget · Requested services ·
Vendor requirements · Quote status · Current negotiation · Last interaction · Next action ·
Important constraints · Communication preference.

> The client register was seeded in `client/README.md` from the existing `client/` project folders.
> Update it there as projects progress.
