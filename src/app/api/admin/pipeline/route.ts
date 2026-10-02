import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { CHANNELS, STAGES, TRACKS } from '@/lib/pipeline';

// GET /api/admin/pipeline — every SEM deal with its partner and latest update,
// plus the vendor list for the partner picker (names only — no contact fields).
export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [deals, partners] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { business: 'SEM' },
        orderBy: [{ nextActionAt: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
        include: {
          partner: { select: { id: true, name: true } },
          updates: { orderBy: { createdAt: 'desc' }, take: 1 },
          _count: { select: { updates: true } },
        },
      }),
      prisma.vendor.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
    ]);

    return NextResponse.json({ deals, partners });
  } catch (error) {
    console.error('Fetch Pipeline Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pipeline' }, { status: 500 });
  }
}

// POST /api/admin/pipeline — add a deal by hand (WhatsApp / email / phone enquiry).
export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const b = await request.json();
    if (!b.clientName?.trim()) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
    }

    const deal = await prisma.quoteRequest.create({
      data: {
        clientName: b.clientName.trim(),
        clientPhone: b.clientPhone?.trim() || '---',
        clientEmail: b.clientEmail?.trim() || null,
        clientCompany: b.clientCompany?.trim() || null,
        eventType: b.eventType?.trim() || 'Event',
        eventCity: b.eventCity?.trim() || 'TBC',
        eventDate: b.eventDate ? new Date(b.eventDate) : null,
        guestCount: parseInt(b.guestCount) || null,
        budgetMin: parseFloat(b.budgetMin) || null,
        budgetMax: parseFloat(b.budgetMax) || null,
        budgetKnown: Boolean(b.budgetMin || b.budgetMax),
        requirements: b.requirements?.trim() || null,
        channel: CHANNELS.includes(b.channel) ? b.channel : null,
        track: TRACKS.includes(b.track) ? b.track : null,
        stage: STAGES.includes(b.stage) ? b.stage : 'new',
        nextAction: b.nextAction?.trim() || 'Qualify: date, city, pax, budget, decision-maker',
        nextActionAt: b.nextActionAt ? new Date(b.nextActionAt) : new Date(),
        source: b.channel ? `manual_${b.channel}` : 'manual_entry',
        updates: b.requirements?.trim()
          ? { create: { kind: 'note', channel: b.channel || null, summary: `Enquiry: ${b.requirements.trim()}` } }
          : undefined,
      },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (error) {
    console.error('Create Deal Error:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }
}
