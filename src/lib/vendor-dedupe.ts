// Duplicate-vendor detection. Pure JS, no Postgres extension required —
// matches on exact normalized email/phone/whatsapp, or high name-token
// overlap. Always surfaced as a non-blocking warning to the admin ("merge
// instead?") — never auto-merges, never auto-blocks a create.
//
// Built after this codebase already produced a real duplicate (the same
// vendor entered once via a manual bulk import and again via a form
// submission, under slightly different names/emails) — see the 2026-07
// vendor-platform plan for context.

import type { PrismaClient } from '@prisma/client';

export function normalizePhone(s: string | null | undefined): string {
  if (!s) return '';
  const digits = s.replace(/\D/g, '');
  // Unify Saudi-style local (0X...) vs international (966X...) prefixes so
  // "+966 50 123 4567" and "0501234567" compare equal.
  if (digits.startsWith('966')) return digits.slice(3);
  if (digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function normalizeEmail(s: string | null | undefined): string {
  return (s || '').trim().toLowerCase();
}

const NAME_NOISE_WORDS = new Set([
  'company', 'co', 'est', 'establishment', 'llc', 'ltd', 'group', 'events',
  'event', 'the', 'and', 'for', 'services', 'trading',
]);

export function normalizeName(s: string | null | undefined): string {
  return (s || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // strip punctuation, keep unicode letters/digits
    .split(/\s+/)
    .filter((w) => w && !NAME_NOISE_WORDS.has(w))
    .sort()
    .join(' ')
    .trim();
}

/** Dice-coefficient-style token overlap on already-normalized name strings. */
function nameOverlap(a: string, b: string): number {
  if (!a || !b) return 0;
  const setA = new Set(a.split(' '));
  const setB = new Set(b.split(' '));
  if (setA.size === 0 || setB.size === 0) return 0;
  let shared = 0;
  for (const tok of setA) if (setB.has(tok)) shared++;
  return (2 * shared) / (setA.size + setB.size);
}

export type DuplicateCandidate = {
  vendor: { id: string; name: string; city: string | null; category: string };
  matchedOn: 'email' | 'phone' | 'whatsapp' | 'name';
  confidence: 'high' | 'medium';
};

export async function findPossibleDuplicates(
  prisma: PrismaClient,
  input: { name?: string | null; email?: string | null; phone?: string | null; whatsapp?: string | null },
  excludeId?: string
): Promise<DuplicateCandidate[]> {
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const whatsapp = normalizePhone(input.whatsapp);
  const name = normalizeName(input.name);

  // Pull a narrow candidate set (anyone with any contact info at all, minus
  // the vendor being edited) and normalize in JS — cheap at hundreds/thousands
  // of rows, avoids needing a Postgres extension for fuzzy matching.
  const candidates = await prisma.vendor.findMany({
    where: excludeId ? { id: { not: excludeId } } : undefined,
    select: { id: true, name: true, email: true, phone: true, whatsapp: true, city: true, category: true },
  });

  const results: DuplicateCandidate[] = [];
  for (const c of candidates) {
    const cEmail = normalizeEmail(c.email);
    const cPhone = normalizePhone(c.phone);
    const cWhatsapp = normalizePhone(c.whatsapp);
    const cName = normalizeName(c.name);

    const vendor = { id: c.id, name: c.name, city: c.city, category: c.category };

    if (email && cEmail && email === cEmail) {
      results.push({ vendor, matchedOn: 'email', confidence: 'high' });
      continue;
    }
    if (phone && (cPhone === phone || cWhatsapp === phone)) {
      results.push({ vendor, matchedOn: 'phone', confidence: 'high' });
      continue;
    }
    if (whatsapp && (cWhatsapp === whatsapp || cPhone === whatsapp)) {
      results.push({ vendor, matchedOn: 'whatsapp', confidence: 'high' });
      continue;
    }
    if (name && cName && nameOverlap(name, cName) >= 0.6) {
      results.push({ vendor, matchedOn: 'name', confidence: 'medium' });
    }
  }

  return results;
}
