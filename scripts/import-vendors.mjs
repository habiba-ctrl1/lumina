/**
 * Import vendors from "SEM VENDOR DETAILS/SEM_Vendor_Intake_Template.csv"
 * into the Vendor table (+ meeting notes into VendorNote, append-only).
 *
 * Usage:
 *   node scripts/import-vendors.mjs --dry    # preview only, no DB writes
 *   node scripts/import-vendors.mjs          # real import (upserts by legal name)
 *
 * Safe to re-run: existing vendors (matched by name) are UPDATED, not duplicated.
 * Meeting notes are only added if an identical note doesn't already exist.
 * Requires .env.local (POSTGRES_PRISMA_URL). Run `npx prisma db push` first.
 */
import { readFileSync } from "fs";
import path from "path";

const DRY = process.argv.includes("--dry");
const CSV_PATH = path.resolve("SEM VENDOR DETAILS/SEM_Vendor_Intake_Template.csv");

/* ── Minimal RFC-4180 CSV parser (quotes, embedded commas/newlines) ── */
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); if (row.some((f) => f.trim() !== "")) rows.push(row); }
  return rows;
}

/* ── Field mappers ── */
const clean = (s) => (s || "").trim();
const yn = (s) => /^y(es)?$/i.test(clean(s));
const num = (s) => { const n = parseInt(clean(s), 10); return Number.isFinite(n) ? n : null; };
const list = (s) => clean(s).split(/[,;]/).map((x) => x.trim()).filter(Boolean);
// "Event Operations / Transportation & Valet / Entertainment (multi-category)" → parts
// (slashes inside parentheses are not split points)
const cats = (s) =>
  clean(s)
    .replace(/\(multi-category\)/i, "")
    .replace(/\([^)]*\)/g, (m) => m.replace(/\//g, "∕"))
    .split("/")
    .map((x) => x.replace(/∕/g, "/").trim())
    .filter(Boolean);
// Excel-mangled phones like "9.66547E+11" can't be recovered — flag them
const phone = (s) => { const v = clean(s); return /e\+/i.test(v) ? null : v || null; };

function mapRow(header, row) {
  const get = (col) => clean(row[header.indexOf(col)] ?? "");
  const categories = cats(get("Category"));
  const notes = [];
  if (get("Meeting_Notes")) notes.push(`[intake] ${get("Meeting_Notes")}`);
  if (get("Notes")) notes.push(`[intake] ${get("Notes")}`);
  const badPhone = /e\+/i.test(get("Phone"));
  return {
    data: {
      name: get("Legal_Name"),
      category: categories[0] || "Other",
      categories,
      contactPerson: get("Contact_Person") || null,
      phone: phone(get("Phone")),
      email: get("Email") || null,
      yearsExperience: num(get("Years_Experience")),
      certifications: get("Certifications") || null,
      regionCoverage: list(get("Region_Coverage")),
      city: list(get("Region_Coverage"))[0] || null,
      rateCardSummary: get("Rate_Card_Summary") || null,
      rateCardFiles: get("Rate_Card_File_Name") || null,
      portfolioFiles: get("Portfolio_Image_File_Names") || null,
      meetingStatus: get("Meeting_Status") || "Contacted",
      agreementSigned: yn(get("Agreement_Signed_YN")),
      verificationStatus: get("Verification_Status") || "Pending",
      internalRating: num(get("Internal_Rating_1to5")) ?? 0,
      photoPermission: /permission/i.test(get("Portfolio_Image_File_Names")),
    },
    notes,
    flags: badPhone ? ["phone number corrupted by Excel (scientific notation) — re-enter manually"] : [],
    vendorId: get("Vendor_ID"),
  };
}

/* ── Main ── */
const rows = parseCSV(readFileSync(CSV_PATH, "utf8"));
const header = rows[0].map(clean);
const vendors = rows.slice(1).map((r) => mapRow(header, r)).filter((v) => v.data.name);

console.log(`Parsed ${vendors.length} vendors from CSV${DRY ? " (DRY RUN — no DB writes)" : ""}\n`);
for (const v of vendors) {
  const f = v.flags.length ? `  ⚠ ${v.flags.join("; ")}` : "";
  console.log(
    `${v.vendorId.padEnd(6)} ${v.data.name.slice(0, 45).padEnd(46)} cat=${v.data.category.slice(0, 22).padEnd(23)} status=${v.data.meetingStatus.padEnd(12)} verify=${v.data.verificationStatus.padEnd(9)} rating=${v.data.internalRating} notes=${v.notes.length}${f}`
  );
}

if (!DRY) {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  let created = 0, updated = 0, notesAdded = 0;
  for (const v of vendors) {
    const existing = await prisma.vendor.findFirst({ where: { name: v.data.name } });
    const vendor = existing
      ? await prisma.vendor.update({ where: { id: existing.id }, data: v.data })
      : await prisma.vendor.create({ data: v.data });
    existing ? updated++ : created++;
    for (const note of v.notes) {
      const dup = await prisma.vendorNote.findFirst({ where: { vendorId: vendor.id, note } });
      if (!dup) { await prisma.vendorNote.create({ data: { vendorId: vendor.id, note } }); notesAdded++; }
    }
  }
  console.log(`\nDone: ${created} created, ${updated} updated, ${notesAdded} notes added.`);
  await prisma.$disconnect();
}
