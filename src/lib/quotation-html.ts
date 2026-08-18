// Branded SEM client-quotation → print-ready HTML.
// Mirrors the approved navy/gold letterhead in
// client/Sem Templates and company profile/_SEM-Quotation-TEMPLATE.html
// so the admin "Preview PDF" button produces the same document the founder
// otherwise builds by hand.
//
// HARD RULES honoured here: never show vendor name/phone/cost, never show SEM
// commission, always keep the "Coordination & execution" disclosure box.

export type QuotationLineItem = {
  service: string;
  description?: string;
  qty?: number;
  unitPrice?: number;
  total: number;
};

export type QuotationData = {
  clientName: string;
  scope: string; // e.g. "Wedding" — event type / summary of works
  location: string; // e.g. "Riyadh"
  quoteNumber: string; // "SEM-Q-2026-001" or "DRAFT"
  date: string; // formatted date string
  validity: string; // e.g. "Valid until 09 Jan 2026" or "14 days"
  lineItems: QuotationLineItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  terms?: string; // free-text terms & conditions (from the builder textarea)
};

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const money = (n: number) =>
  (Number(n) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Amount in words (SAR) ────────────────────────────────────────────────
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty",
  "Ninety",
];

function threeDigitsToWords(n: number): string {
  let out = "";
  if (n >= 100) {
    out += ONES[Math.floor(n / 100)] + " Hundred";
    n %= 100;
    if (n) out += " ";
  }
  if (n >= 20) {
    out += TENS[Math.floor(n / 10)];
    if (n % 10) out += "-" + ONES[n % 10];
  } else if (n > 0) {
    out += ONES[n];
  }
  return out;
}

export function amountInWords(amount: number): string {
  const rounded = Math.round((Number(amount) || 0) * 100) / 100;
  let whole = Math.floor(rounded);
  const halalas = Math.round((rounded - whole) * 100);

  if (whole === 0 && halalas === 0) return "Zero Saudi Riyals Only";

  const scales = [
    { value: 1_000_000_000, name: "Billion" },
    { value: 1_000_000, name: "Million" },
    { value: 1_000, name: "Thousand" },
  ];
  let words = "";
  for (const { value, name } of scales) {
    if (whole >= value) {
      const chunk = Math.floor(whole / value);
      words += threeDigitsToWords(chunk) + " " + name + " ";
      whole %= value;
    }
  }
  if (whole > 0) words += threeDigitsToWords(whole) + " ";

  let result = words.trim() + " Saudi Riyals";
  if (halalas > 0) {
    result += " and " + threeDigitsToWords(halalas) + " Halalas";
  }
  return result.trim() + " Only";
}

// ── HTML builder ──────────────────────────────────────────────────────────
export function buildQuotationHtml(d: QuotationData): string {
  const rows = d.lineItems
    .filter((it) => (it.service && it.service.trim()) || it.total)
    .map((it) => {
      const qtyNote =
        it.qty && it.qty > 1 && it.unitPrice
          ? `<div class="item-desc">${it.qty} × SAR ${money(it.unitPrice)}</div>`
          : "";
      const desc = it.description
        ? `<div class="item-desc">${esc(it.description)}</div>`
        : "";
      return `
        <tr>
          <td>
            <div class="item-title">${esc(it.service) || "Service"}</div>
            ${desc}${qtyNote}
          </td>
          <td class="amt">${money(it.total)}</td>
        </tr>`;
    })
    .join("");

  const termsItems = (d.terms || "")
    .split(/\n+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `<li>${esc(t)}</li>`)
    .join("");

  const termsBlock = termsItems
    ? `<ul class="terms">${termsItems}</ul>`
    : `<ul class="terms"><li>This quotation is valid for the period stated above and is subject to final confirmation by both parties.</li></ul>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SEM Quotation — ${esc(d.quoteNumber)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  :root {
    --ink: #0B1D33; --ink2: #13314F; --gold: #B0862B; --gold-bright: #D4B25A;
    --slate: #1E293B; --muted: #6B7280; --line: #E6E1D4; --cream: #FBF8F1;
  }
  html, body { background: #f1f1f1; }
  body { font-family: "Segoe UI", Calibri, Arial, sans-serif; color: var(--slate); line-height: 1.55; font-size: 13px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { max-width: 820px; margin: 0 auto; background: #fff; box-shadow: 0 10px 40px rgba(0,0,0,.1); }
  .inner { padding: 0 52px 44px; }

  .band { background: linear-gradient(135deg, #0B1D33 0%, #13314F 100%); padding: 26px 52px 22px; display: flex; justify-content: space-between; align-items: center; }
  .band img.logo { height: 54px; width: auto; display: block; }
  .qmark { text-align: right; }
  .qmark h1 { font-family: Georgia, "Times New Roman", serif; font-size: 26px; font-weight: 700; color: var(--gold-bright); letter-spacing: 0.18em; }
  .qmark .sub { font-size: 10px; color: #B9C4D2; letter-spacing: 0.06em; margin-top: 5px; line-height: 1.6; }
  .goldrule { height: 3px; background: linear-gradient(90deg, #8A6620, var(--gold-bright), #8A6620); }

  .meta { display: flex; justify-content: space-between; gap: 22px; margin: 26px 0 20px; }
  .meta-box { flex: 1; border: 1px solid var(--line); border-left: 3px solid var(--gold); border-radius: 6px; padding: 13px 18px; background: var(--cream); font-size: 12px; }
  .meta-box .row { margin-bottom: 6px; }
  .meta-box .row:last-child { margin-bottom: 0; }
  .meta-box b { color: var(--ink); display: inline-block; min-width: 96px; font-weight: 700; }

  .intro { font-size: 12.5px; color: #475569; margin-bottom: 20px; }

  h2.sec { font-family: Georgia, "Times New Roman", serif; font-size: 13px; font-weight: 700; color: var(--ink); text-transform: uppercase; letter-spacing: 0.14em; margin: 24px 0 12px; padding-bottom: 7px; border-bottom: 1px solid var(--line); position: relative; }
  h2.sec::after { content: ""; position: absolute; left: 0; bottom: -1px; width: 54px; height: 2px; background: var(--gold); }

  table.items { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  table.items thead th { background: var(--ink); color: #F4EAD2; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.09em; padding: 11px 14px; text-align: left; font-weight: 700; }
  table.items thead th.amt { text-align: right; width: 150px; }
  table.items tbody td { padding: 13px 14px; border-bottom: 1px solid var(--line); vertical-align: top; font-size: 12.5px; }
  table.items tbody tr:nth-child(even) td { background: #FCFAF5; }
  table.items tbody td.amt { text-align: right; font-weight: 700; color: var(--ink); white-space: nowrap; }
  .item-title { font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .item-desc { color: var(--muted); font-size: 11.5px; line-height: 1.6; }

  .totals { margin-top: 12px; margin-left: auto; width: 340px; }
  .totals .r { display: flex; justify-content: space-between; padding: 8px 14px; font-size: 12.5px; color: var(--slate); }
  .totals .r span:last-child { font-weight: 600; color: var(--ink); }
  .totals .divide { border-top: 1px solid var(--line); margin: 2px 0; }
  .totals .grand { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #0B1D33, #13314F); border-radius: 7px; padding: 14px 16px; margin-top: 6px; }
  .totals .grand .lbl { color: #E7EDF4; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
  .totals .grand .val { color: var(--gold-bright); font-family: Georgia, serif; font-weight: 700; font-size: 18px; }
  .totals .words { font-size: 10.5px; color: var(--gold); text-align: right; padding: 8px 14px 0; font-style: italic; }

  ul.terms { list-style: none; margin: 0; }
  ul.terms li { position: relative; padding-left: 16px; margin-bottom: 9px; font-size: 12px; color: #475569; line-height: 1.6; }
  ul.terms li::before { content: ""; position: absolute; left: 0; top: 7px; width: 5px; height: 5px; background: var(--gold); border-radius: 50%; }
  ul.terms li b { color: var(--ink); font-weight: 700; }

  .pay { background: var(--cream); border: 1px solid var(--line); border-left: 3px solid var(--gold); border-radius: 6px; padding: 14px 18px; margin-top: 14px; font-size: 12px; color: #3F4A5A; line-height: 1.6; }
  .pay b { color: var(--ink); }

  footer { margin-top: 30px; text-align: center; }
  footer .fbar { height: 2px; width: 100%; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin-bottom: 12px; }
  footer .ftxt { font-size: 10px; color: #94A3B8; }

  .toolbar { position: fixed; top: 14px; right: 14px; display: flex; gap: 8px; z-index: 99; }
  .toolbar button { font-family: inherit; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; border: none; border-radius: 8px; padding: 10px 16px; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.15); }
  .toolbar .save { background: #0B1D33; color: #D4B25A; }
  .toolbar .close { background: #fff; color: #64748b; }

  @media print {
    html, body { background: #fff; }
    .page { box-shadow: none; max-width: 100%; }
    .toolbar { display: none !important; }
    .inner { padding-bottom: 16mm; }
    h2.sec.tc { break-before: page; page-break-before: always; padding-top: 16mm; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <button class="save" onclick="window.print()">Save as PDF</button>
    <button class="close" onclick="window.close()">Close</button>
  </div>
  <div class="page">
    <div class="band">
      <img class="logo" alt="Saudi Event Management" src="/sem-logo-light.svg">
      <div class="qmark">
        <h1>QUOTATION</h1>
        <div class="sub">saudieventmanagement.com<br>WhatsApp: +966 539 388 072<br>info@saudieventmanagement.com<br>Private &amp; Confidential</div>
      </div>
    </div>
    <div class="goldrule"></div>

    <div class="inner">
      <div class="meta">
        <div class="meta-box">
          <div class="row"><b>Prepared For:</b> ${esc(d.clientName) || "—"}</div>
          <div class="row"><b>Scope:</b> ${esc(d.scope) || "—"}</div>
          <div class="row"><b>Location:</b> ${esc(d.location) || "—"}</div>
        </div>
        <div class="meta-box">
          <div class="row"><b>Quotation No:</b> ${esc(d.quoteNumber)}</div>
          <div class="row"><b>Date:</b> ${esc(d.date)}</div>
          <div class="row"><b>Validity:</b> ${esc(d.validity)}</div>
        </div>
      </div>

      <p class="intro">Thank you for the opportunity. Please find below Saudi Event Management's proposal for the scope of work set out, designed, coordinated, and delivered end-to-end by SEM.</p>

      <h2 class="sec">Scope of Work</h2>
      <table class="items">
        <thead>
          <tr><th>Description</th><th class="amt">Amount (SAR)</th></tr>
        </thead>
        <tbody>
          ${rows || '<tr><td><div class="item-title">—</div></td><td class="amt">0.00</td></tr>'}
        </tbody>
      </table>

      <div class="totals">
        <div class="r"><span>Subtotal</span><span>${money(d.subtotal)}</span></div>
        <div class="r"><span>VAT (15%)</span><span>${money(d.vatAmount)}</span></div>
        <div class="divide"></div>
        <div class="grand"><span class="lbl">Total Payable</span><span class="val">SAR ${money(d.totalAmount)}</span></div>
        <div class="words">${esc(amountInWords(d.totalAmount))}</div>
      </div>

      <h2 class="sec tc">Terms &amp; Conditions</h2>
      ${termsBlock}

      <div class="pay"><b>Coordination &amp; execution:</b> Payments for on-ground execution are settled directly with SEM's vetted delivery and execution partners in Saudi Arabia, in accordance with the payment schedule set out in this proposal. Saudi Event Management is responsible for vendor selection, quality assurance, coordination, and full project oversight from booking through to event completion — one team, one quotation, one point of accountability.</div>

      <footer>
        <div class="fbar"></div>
        <div class="ftxt">Saudi Event Management · saudieventmanagement.com · This quotation is confidential and subject to final confirmation by both parties.</div>
      </footer>
    </div>
  </div>
</body>
</html>`;
}
