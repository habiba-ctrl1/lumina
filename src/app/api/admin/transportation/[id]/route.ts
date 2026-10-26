import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { PROVIDER_STATUSES } from '@/lib/transportation/admin';

type Params = { params: Promise<{ id: string }> };

// GET /api/admin/transportation/:id — one transportation lead with timeline,
// proposals and vendor quotes. Vendor cost/contact data is admin-only here and
// never reaches customer-facing quotes.
export async function GET(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const lead = await prisma.quoteRequest.findFirst({
      where: { id, leadDepartment: 'transportation' },
      include: {
        partner: { select: { id: true, name: true } },
        updates: { orderBy: { createdAt: 'desc' } },
        proposals: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, quoteNumber: true, version: true, totalAmount: true, currency: true, validUntil: true, status: true, emailStatus: true, createdAt: true },
        },
        vendorQuotes: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, quoteNumber: true, service: true, vendorCost: true, currency: true, status: true, validUntil: true, vendor: { select: { name: true } } },
        },
      },
    });
    if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(lead);
  } catch (error) {
    console.error('Fetch Transportation Lead Error:', (error as { code?: string })?.code ?? (error as Error)?.name);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);

// PATCH /api/admin/transportation/:id — transport-only quote metadata
// (currency, validity, provider confirmation, terms). Stage, follow-up and
// quoted amount changes go through /api/admin/pipeline/:id, which also writes
// the timeline.
export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const b = await request.json();
    const current = await prisma.quoteRequest.findFirst({ where: { id, leadDepartment: 'transportation' }, select: { details: true } });
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const m = (b?.quoteMeta ?? {}) as Record<string, unknown>;
    const next: Record<string, string> = {};
    const currency = str(m.currency, 3)?.toUpperCase();
    if (currency !== undefined) {
      if (!/^[A-Z]{3}$/.test(currency)) return NextResponse.json({ error: 'Currency must be a 3-letter code' }, { status: 400 });
      next.currency = currency;
    }
    const validUntil = str(m.validUntil, 10);
    if (validUntil !== undefined) {
      if (validUntil && Number.isNaN(Date.parse(validUntil))) return NextResponse.json({ error: 'Invalid validity date' }, { status: 400 });
      next.validUntil = validUntil;
    }
    const provider = str(m.providerStatus, 30);
    if (provider !== undefined) {
      if (provider && !PROVIDER_STATUSES.some((p) => p.value === provider)) return NextResponse.json({ error: 'Invalid provider status' }, { status: 400 });
      next.providerStatus = provider;
    }
    for (const k of ['paymentTerms', 'cancellationTerms', 'inclusions', 'exclusions'] as const) {
      const v = str(m[k], 600);
      if (v !== undefined) next[k] = v;
    }

    const details = { ...((current.details as Record<string, unknown>) ?? {}) };
    details.quote = { ...((details.quote as Record<string, unknown>) ?? {}), ...next };
    await prisma.quoteRequest.update({ where: { id }, data: { details: details as object } });
    return NextResponse.json({ ok: true, quote: details.quote });
  } catch (error) {
    console.error('Update Transportation Lead Error:', (error as { code?: string })?.code ?? (error as Error)?.name);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
