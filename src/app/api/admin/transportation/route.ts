import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { OPEN_STAGES } from '@/lib/pipeline';
import { TRANSPORT_STAGE_LABEL } from '@/lib/transportation/admin';

// GET /api/admin/transportation — the transportation lead queue.
// Only rows created by the transportation form (leadDepartment = 'transportation')
// are returned; event enquiries never appear here. Filters: q, category, stage,
// view (open|closed|all), country, from/to (travel date), source. `format=csv`
// exports the same filtered set.
const CSV_COLUMNS = [
  'Reference', 'Created', 'Service', 'Journey', 'Origin', 'Destination', 'Travel date', 'Passengers',
  'Vehicle', 'Customer', 'Company', 'Email', 'Phone', 'Stage', 'Quoted (SAR)', 'Form', 'UTM source', 'UTM campaign',
];

// Spreadsheet formula-injection guard for customer-supplied text.
const csvCell = (v: unknown) => {
  let s = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const sp = new URL(request.url).searchParams;
    const where: Prisma.QuoteRequestWhereInput = { business: 'SEM', leadDepartment: 'transportation' };
    const and: Prisma.QuoteRequestWhereInput[] = [];

    const q = (sp.get('q') || '').trim().slice(0, 100);
    if (q) {
      const c = { contains: q, mode: 'insensitive' as const };
      and.push({
        OR: [
          { clientName: c }, { clientCompany: c }, { clientEmail: c }, { clientPhone: c }, { leadRef: c },
          { originCity: c }, { destinationCity: c }, { originCountry: c }, { destinationCountry: c },
        ],
      });
    }
    const category = sp.get('category');
    if (category) where.serviceCategory = category;
    const stage = sp.get('stage');
    if (stage && stage in TRANSPORT_STAGE_LABEL) where.stage = stage;
    const view = sp.get('view') || 'open';
    if (!stage) {
      if (view === 'open') where.stage = { in: [...OPEN_STAGES] };
      if (view === 'closed') where.stage = { notIn: [...OPEN_STAGES] };
    }
    const country = (sp.get('country') || '').slice(0, 60);
    if (country) and.push({ OR: [{ destinationCountry: country }, { originCountry: country }] });
    const source = sp.get('source');
    if (source) where.source = source;
    const from = sp.get('from');
    const to = sp.get('to');
    if (from || to) {
      where.eventDate = {
        ...(from && !Number.isNaN(Date.parse(from)) ? { gte: new Date(`${from}T00:00:00Z`) } : {}),
        ...(to && !Number.isNaN(Date.parse(to)) ? { lte: new Date(`${to}T23:59:59Z`) } : {}),
      };
    }
    if (and.length) where.AND = and;

    const leads = await prisma.quoteRequest.findMany({
      where,
      orderBy: [{ eventDate: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
      take: 500,
      select: {
        id: true, leadRef: true, createdAt: true, clientName: true, clientCompany: true, clientEmail: true, clientPhone: true,
        serviceCategory: true, journeyType: true, originCity: true, originCountry: true, destinationCity: true,
        destinationCountry: true, eventDate: true, guestCount: true, vehiclePreference: true, stage: true,
        nextAction: true, nextActionAt: true, quotedAmount: true, source: true, utmSource: true, utmCampaign: true,
        notifyStatus: true, details: true,
        proposals: { select: { id: true, status: true, version: true, totalAmount: true, currency: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    if (sp.get('format') === 'csv') {
      const rows = leads.map((l) => [
        l.leadRef, l.createdAt.toISOString(), l.serviceCategory, l.journeyType,
        `${l.originCity ?? ''}, ${l.originCountry ?? ''}`, `${l.destinationCity ?? ''}, ${l.destinationCountry ?? ''}`,
        l.eventDate?.toISOString().slice(0, 10), l.guestCount, l.vehiclePreference, l.clientName, l.clientCompany,
        l.clientEmail, l.clientPhone, TRANSPORT_STAGE_LABEL[l.stage] ?? l.stage, l.quotedAmount, l.source, l.utmSource, l.utmCampaign,
      ].map(csvCell).join(','));
      const csv = [CSV_COLUMNS.map(csvCell).join(','), ...rows].join('\r\n');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="transportation-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Fetch Transportation Leads Error:', (error as { code?: string })?.code ?? (error as Error)?.name);
    return NextResponse.json({ error: 'Failed to fetch transportation leads' }, { status: 500 });
  }
}
