import prisma from '@/lib/prisma';

// ─────────────────────────────────────────────────────────────────────────────
// SEM Copilot — read-only data context builder.
//
// Assembles a compact, CONTACT-SCRUBBED snapshot of the founder's live SEM
// records (vendors, leads, quote requests, upcoming events) so the AI advisor
// can answer real operational questions ("how many active vendors?", "which
// vendors do LED in Riyadh?", "which leads need follow-up?") from actual data
// instead of hallucinating.
//
// HARD RULES enforced here (mirrors /api/admin/vendor-match):
//   • Vendor/client CONTACT fields (phone, email, whatsapp, contactPerson,
//     contactInfo) are NEVER selected — they never reach the LLM provider.
//   • This module is READ-ONLY. It performs no writes of any kind.
//   • Bounded result sizes keep token cost predictable.
//
// Rebuilt on every Copilot message, so the snapshot is always current.
// ─────────────────────────────────────────────────────────────────────────────

// Keep in sync with /api/admin/action-needed — a "vendor" inquiry is a supplier
// pitch, never a client booking.
const VENDOR_SOURCES = ['vendor_registration', 'become_one_partnership', 'vendor_inquiry'];

// Bounds — vendor network is ~2 dozen today, so these fit comfortably.
const MAX_VENDORS = 80;
const MAX_LEADS = 25;
const MAX_INQUIRIES = 25;
const MAX_QUOTE_REQUESTS = 25;
const MAX_EVENTS = 15;

function fmtDate(d: Date | null | undefined): string {
  if (!d) return '—';
  return new Date(d).toISOString().slice(0, 10);
}

function clean(s: string | null | undefined, max = 120): string {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max) + '…' : t;
}

/**
 * Build the SEM data snapshot the Copilot uses as its source of truth.
 * Never throws — on a DB error it returns a note so the chat still works.
 */
export async function buildSemContext(): Promise<string> {
  try {
    const [vendors, inquiries, leads, quoteRequests, events] = await Promise.all([
      // Private contact fields deliberately excluded (same rule as vendor-match).
      prisma.vendor.findMany({
        select: {
          name: true, category: true, categories: true, services: true, city: true,
          regionCoverage: true, availability: true, verificationStatus: true,
          partnershipStatus: true, preferred: true, internalRating: true, rating: true,
        },
        orderBy: [{ preferred: 'desc' }, { name: 'asc' }],
        take: MAX_VENDORS,
      }),
      prisma.inquiry.findMany({
        where: { source: { notIn: VENDOR_SOURCES }, status: { in: ['Pending', 'Contacted'] } },
        orderBy: { createdAt: 'desc' },
        take: MAX_INQUIRIES,
        select: {
          name: true, company: true, eventType: true, venueCity: true, budget: true,
          eventDate: true, guestCount: true, status: true, createdAt: true,
        },
      }),
      prisma.lead.findMany({
        where: { status: { in: ['New', 'Contacted', 'Proposal Sent', 'Negotiation'] } },
        orderBy: { createdAt: 'desc' },
        take: MAX_LEADS,
        select: {
          name: true, company: true, eventType: true, budget: true, eventDate: true,
          source: true, status: true, createdAt: true,
        },
      }),
      prisma.quoteRequest.findMany({
        where: { status: { in: ['pending', 'quote_sent'] } },
        orderBy: { createdAt: 'desc' },
        take: MAX_QUOTE_REQUESTS,
        select: {
          clientName: true, eventType: true, eventCity: true, eventDate: true,
          guestCount: true, budgetRange: true, status: true, createdAt: true,
        },
      }),
      prisma.event.findMany({
        where: { date: { gte: new Date() }, status: { notIn: ['Cancelled', 'Completed'] } },
        orderBy: { date: 'asc' },
        take: MAX_EVENTS,
        select: {
          title: true, type: true, status: true, timeline: true, date: true,
          location: true, guestCount: true, budget: true, client: { select: { name: true } },
        },
      }),
    ]);

    // ── Vendor network coverage (derived from the populated legacy `category`
    //    field; categoryLinks m2m is still largely unused). ──
    const coverage = new Map<string, number>();
    for (const v of vendors) {
      const cat = (v.category || 'Uncategorized').trim() || 'Uncategorized';
      coverage.set(cat, (coverage.get(cat) || 0) + 1);
    }
    const coverageLines = [...coverage.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([cat, n]) => `- ${cat}: ${n}${n < 2 ? '  ⚠ single/no vendor — gap' : ''}`)
      .join('\n');

    const vendorLines = vendors
      .map((v) => {
        const cats = [v.category, ...(v.categories || [])].filter(Boolean).join(', ');
        const region = (v.regionCoverage || []).join(', ') || v.city || '—';
        const flags = [
          v.preferred ? 'preferred' : '',
          v.verificationStatus && v.verificationStatus !== 'Pending' ? v.verificationStatus : '',
          v.partnershipStatus && v.partnershipStatus !== 'Pending' ? v.partnershipStatus : '',
          v.availability ? `avail:${v.availability}` : '',
        ].filter(Boolean).join(', ');
        return `- ${v.name} | ${clean(cats, 60)} | area: ${clean(region, 50)}${v.services ? ` | ${clean(v.services, 60)}` : ''}${flags ? ` | ${flags}` : ''}`;
      })
      .join('\n');

    const inquiryLines = inquiries.length
      ? inquiries.map((i) =>
          `- ${i.name}${i.company ? ` (${i.company})` : ''} | ${i.eventType || 'event ?'} | ${i.venueCity || 'city ?'} | ${i.eventDate || 'date ?'} | budget ${i.budget || '?'} | status ${i.status} | in ${fmtDate(i.createdAt)}`
        ).join('\n')
      : '(none open)';

    const leadLines = leads.length
      ? leads.map((l) =>
          `- ${l.name}${l.company ? ` (${l.company})` : ''} | ${l.eventType || 'event ?'} | budget ${l.budget || '?'} | ${l.eventDate || 'date ?'} | ${l.status} | src ${l.source || '?'} | in ${fmtDate(l.createdAt)}`
        ).join('\n')
      : '(none active)';

    const qrLines = quoteRequests.length
      ? quoteRequests.map((q) =>
          `- ${q.clientName} | ${q.eventType} | ${q.eventCity} | ${fmtDate(q.eventDate)} | ${q.guestCount ?? '?'} guests | budget ${q.budgetRange || '?'} | ${q.status}`
        ).join('\n')
      : '(none pending)';

    const eventLines = events.length
      ? events.map((e) =>
          `- ${e.title}${e.client?.name ? ` — ${e.client.name}` : ''} | ${e.type} | ${fmtDate(e.date)} | ${e.location || 'location ?'} | ${e.status}/${e.timeline}`
        ).join('\n')
      : '(none upcoming)';

    return [
      '## SEM LIVE DATA SNAPSHOT (read-only, current as of this message)',
      '',
      `### Vendor network — ${vendors.length} vendor(s)${vendors.length === MAX_VENDORS ? ' (showing first ' + MAX_VENDORS + ')' : ''}`,
      'Coverage by category (⚠ = fewer than 2 vendors, a sourcing gap):',
      coverageLines || '(no vendors)',
      '',
      'Vendors (contact details deliberately withheld):',
      vendorLines || '(no vendors)',
      '',
      `### Open client inquiries — ${inquiries.length}`,
      inquiryLines,
      '',
      `### Active pipeline leads — ${leads.length}`,
      leadLines,
      '',
      `### Pending quote requests — ${quoteRequests.length}`,
      qrLines,
      '',
      `### Upcoming events — ${events.length}`,
      eventLines,
    ].join('\n');
  } catch (err) {
    console.error('buildSemContext error:', err);
    return '## SEM LIVE DATA SNAPSHOT\n(Unavailable — could not read the database this request. Do not guess any numbers, vendors, or records; tell Habiba the data snapshot failed to load.)';
  }
}
