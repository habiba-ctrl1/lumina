# SEM Documentation Index

This `/docs` folder is a **thin map**, not a second copy of everything. SEM already has strong
living documentation elsewhere — the rule here is **point to the source, never duplicate it**.
When something has a maintained home (the ledger, memory, seo-maps, vendor folders), link to it.

Only 4 docs live here, covering genuine gaps that had no home before:
[ARCHITECTURE](ARCHITECTURE.md), [WORKFLOW](WORKFLOW.md), [CLIENTS](CLIENTS.md), [KNOWN-ISSUES](KNOWN-ISSUES.md).

---

## Where everything actually lives

| You want to know… | Read this (the real source) |
|---|---|
| **Hard rules / what an agent may not do** | `CLAUDE.md` (repo root) — vendor-contact privacy, no fabrication, SEO care, deploy flow |
| **What's DONE / GAPS / DECISIONS / NEXT** | `SEM VENDOR DETAILS/PROJECT-LEDGER.md` — the living record, updated every session. This is also the de-facto CHANGELOG and CURRENT-STATUS. |
| **Business model, commission, SEO care, payment structure** | Auto-memory (`.claude/.../memory/`) — see `MEMORY.md` index. Deeper business context than any repo file. |
| **SEO per city / keyword targeting** | `seo-map-*.md` ×11 (repo root) + `SEO/` folder (GSC exports, gitignored) + `src/lib/seo.ts` (`TRANSLATED_AR_ROUTES`) |
| **Vendors (who, category, agreement status)** | `SEM VENDOR DETAILS/vendors/V0XX/` folders + `vendors/_VENDOR-INDEX.md` + `SEM_Vendor_Intake_Template.csv` |
| **Clients / event projects** | `client/` folders (per-project files) — indexed in [CLIENTS.md](CLIENTS.md) |
| **Agreements, partner kit, playbook** | `SEM VENDOR DETAILS/agreements/` (SEM_Founder_Playbook.md, SEM_Partner_Kit.md, partnership agreement) |
| **Code / DB structure** | [ARCHITECTURE.md](ARCHITECTURE.md) + `prisma/schema.prisma` |
| **Lead → quote → booking flow** | [WORKFLOW.md](WORKFLOW.md) |
| **Client-quote PDF template** | `client/Sem Templates and company profile/_SEM-Quotation-TEMPLATE.html` + `src/lib/quotation-html.ts` |

## Rules for anyone editing docs here
1. **Don't duplicate a maintained source.** If the ledger/memory/seo-map already owns it, link — don't copy.
2. **Never put vendor or client contact info (person/phone/email/whatsapp) in these docs** — same hard rule as public routes.
3. The **PROJECT-LEDGER stays the single living record.** Do not create a competing STATUS/CHANGELOG file here.
4. Update the relevant doc **after** an approved change, not before.
