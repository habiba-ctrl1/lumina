// Local, deterministic WhatsApp/email lead parser — NO external API.
// Pasted client chat is parsed on our own server so private contact data never
// leaves SEM (founder's hard rule) and there is zero per-lead cost. The founder
// always reviews/edits the result before saving, so ~80% extraction is the goal,
// not perfection. Name is the hardest to guess reliably and is left blank when
// unsure rather than filled with a wrong guess.

export type ParsedLead = {
  name: string;
  phone: string;
  email: string;
  venueCity: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  message: string;
};

// Known KSA cities (EN + common Arabic) → canonical English label.
const CITY_MAP: Record<string, string> = {
  riyadh: 'Riyadh', الرياض: 'Riyadh',
  jeddah: 'Jeddah', jedda: 'Jeddah', جدة: 'Jeddah',
  dammam: 'Dammam', الدمام: 'Dammam',
  khobar: 'Al Khobar', 'al khobar': 'Al Khobar', الخبر: 'Al Khobar',
  mecca: 'Makkah', makkah: 'Makkah', makka: 'Makkah', مكة: 'Makkah',
  medina: 'Madinah', madinah: 'Madinah', المدينة: 'Madinah',
  alula: 'AlUla', 'al ula': 'AlUla', 'al-ula': 'AlUla', العلا: 'AlUla',
  taif: 'Taif', الطائف: 'Taif',
  abha: 'Abha', أبها: 'Abha',
  tabuk: 'Tabuk', تبوك: 'Tabuk',
  neom: 'NEOM', نيوم: 'NEOM',
  qassim: 'Qassim', buraidah: 'Buraidah', القصيم: 'Qassim',
  jubail: 'Jubail', yanbu: 'Yanbu', hail: 'Hail',
};

// Event-type keywords → the 4 canonical categories the admin already filters on
// (Wedding / Corporate / Private / Culture), plus a few common specifics.
const TYPE_RULES: { rx: RegExp; label: string }[] = [
  { rx: /\b(wedding|shadi|shaadi|nikah|nikkah|marriage|زفاف|عرس|زواج)\b/i, label: 'Wedding' },
  { rx: /\b(corporate|company|conference|summit|seminar|launch|gala dinner|gala|business|شركة|مؤتمر)\b/i, label: 'Corporate' },
  { rx: /\b(exhibition|expo|booth|stand|trade show|معرض)\b/i, label: 'Exhibition' },
  { rx: /\b(concert|entertainment|show|performer|artist|dj|حفلة|حفل)\b/i, label: 'Entertainment' },
  { rx: /\b(birthday|anniversary|engagement|graduation|private party|house party|milad|خطوبة|عيد ميلاد)\b/i, label: 'Private' },
  { rx: /\b(national day|founding day|cultural|heritage|festival|ثقافي|يوم وطني|تراث)\b/i, label: 'Culture' },
];

function cleanLine(s: string): string {
  // Strip common WhatsApp export prefixes: "[12/03/2026, 8:04 PM] Name:" or
  // "12/03/2026, 20:04 - Name:" so they don't pollute extraction.
  return s
    .replace(/^\[?\d{1,2}[\/.]\d{1,2}[\/.]\d{2,4},?\s*\d{1,2}:\d{2}(?:\s*[APap][Mm])?\]?\s*[-–]?\s*/, '')
    .trim();
}

export function parseLead(raw: string): ParsedLead {
  const text = (raw || '').trim();
  const lines = text.split(/\r?\n/).map(cleanLine).filter(Boolean);
  const flat = lines.join('\n');
  const lower = flat.toLowerCase();

  // ── Email ──────────────────────────────────────────────────────────────
  const emailMatch = flat.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  const email = emailMatch ? emailMatch[0].trim() : '';

  // ── Phone / WhatsApp (Saudi + generic international) ─────────────────────
  // Prefer a +966 / 05x number; fall back to any 9+ digit run.
  const phoneCandidates = flat.match(/(\+?\d[\d\s()-]{7,}\d)/g) || [];
  let phone = '';
  for (const c of phoneCandidates) {
    const digits = c.replace(/[^\d+]/g, '');
    const d = digits.replace(/\D/g, '');
    if (d.length >= 9 && d.length <= 15) { phone = digits; break; }
  }

  // ── City ────────────────────────────────────────────────────────────────
  let venueCity = '';
  for (const key of Object.keys(CITY_MAP)) {
    const rx = /^[\x00-\x7F]+$/.test(key)
      ? new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      : new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (rx.test(lower) || rx.test(flat)) { venueCity = CITY_MAP[key]; break; }
  }

  // ── Event type ────────────────────────────────────────────────────────────
  let eventType = '';
  for (const rule of TYPE_RULES) {
    if (rule.rx.test(flat)) { eventType = rule.label; break; }
  }

  // ── Guest count ───────────────────────────────────────────────────────────
  const guestMatch = flat.match(
    /(\d{1,3}(?:,\d{3})*|\d{2,5})\s*(?:\+\s*)?(guests?|pax|people|persons?|ppl|attendees?|invitees?|mehman|مدعو|ضيوف)/i
  );
  const guestCount = guestMatch ? guestMatch[1].replace(/,/g, '') : '';

  // ── Budget ────────────────────────────────────────────────────────────────
  // Only treat a number as budget if it is qualified: has a currency token
  // (SAR/SR/ريال/﷼/ر.س), a magnitude word (k/thousand/million/lac/lakh), OR is a
  // grouped figure like 250,000. This stops a bare date number ("15 March") or a
  // guest count being mistaken for a budget.
  const budgetMatch =
    flat.match(/(?:sar|sr|ر\.?س|ريال|﷼)\s*[\d,]+(?:\.\d+)?\s*(?:k|thousand|million|m|lac|lakh)?/i) ||
    flat.match(/[\d,]+(?:\.\d+)?\s*(?:k|thousand|million|m|lac|lakh)\b/i) ||
    flat.match(/[\d,]+(?:\.\d+)?\s*(?:sar|sr|ريال|﷼|ر\.?س)/i) ||
    flat.match(/\b\d{1,3}(?:,\d{3})+\b/);
  const budget = budgetMatch ? budgetMatch[0].trim().replace(/\s+/g, ' ') : '';

  // ── Event date ────────────────────────────────────────────────────────────
  // Explicit numeric or "15 March 2026" / "March 15" style. Relative phrases
  // ("next month") are left for the founder — kept in the message.
  const months = 'jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?';
  const dateMatch =
    flat.match(new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:${months})(?:\\s+\\d{4})?`, 'i')) ||
    flat.match(new RegExp(`\\b(?:${months})\\s+\\d{1,2}(?:st|nd|rd|th)?(?:,?\\s+\\d{4})?`, 'i')) ||
    flat.match(/\b\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}\b/) ||
    flat.match(new RegExp(`\\b(?:${months})\\s+\\d{4}`, 'i'));
  const eventDate = dateMatch ? dateMatch[0].trim() : '';

  // ── Name ──────────────────────────────────────────────────────────────────
  // Only fill when a clear self-introduction exists — never guess.
  let name = '';
  const nameMatch =
    flat.match(/\b(?:my name is|i am|i'm|this is|name\s*[:\-])\s*([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){0,2})/) ||
    flat.match(/\b(?:اسمي|انا)\s*([^\n,.]{2,30})/);
  if (nameMatch) {
    const candidate = nameMatch[1].trim();
    // Reject if it accidentally captured a common non-name word.
    if (!/^(interested|looking|planning|from|here|calling|writing)$/i.test(candidate)) {
      name = candidate;
    }
  }

  return {
    name,
    phone,
    email,
    venueCity,
    eventType,
    eventDate,
    guestCount,
    budget,
    message: text,
  };
}
