import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { CHANNELS, CLIENT_CONTACT_KINDS, LOST_REASONS, STAGES, TRACKS, UPDATE_KINDS, label } from '@/lib/pipeline';

type Params = { params: Promise<{ id: string }> };

const num = (v: unknown) => (v === '' || v === null || v === undefined ? null : Number(v));
const date = (v: unknown) => (v ? new Date(String(v)) : null);

// GET /api/admin/pipeline/:id — one deal with its full timeline.
export async function GET(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const deal = await prisma.quoteRequest.findUnique({
      where: { id },
      include: {
        partner: { select: { id: true, name: true } },
        updates: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!deal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Fetch Deal Error:', error);
    return NextResponse.json({ error: 'Failed to fetch deal' }, { status: 500 });
  }
}

// PATCH /api/admin/pipeline/:id — edit deal fields. Stage changes and partner
// hand-offs are written to the timeline automatically.
export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const b = await request.json();
    const current = await prisma.quoteRequest.findUnique({ where: { id }, include: { partner: true } });
    if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (b.stage !== undefined && !STAGES.includes(b.stage)) {
      return NextResponse.json({ error: 'Invalid stage' }, { status: 400 });
    }
    if (b.stage === 'lost' && !(b.lostReason || current.lostReason)) {
      return NextResponse.json({ error: 'Pick a lost reason before marking a deal lost' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    const text = ['clientName', 'clientPhone', 'clientEmail', 'clientCompany', 'eventType', 'eventCity',
      'requirements', 'decisionMaker', 'nextAction', 'lostNote'];
    for (const k of text) if (b[k] !== undefined) data[k] = b[k] === '' ? null : b[k];
    if (b.clientName === '' || b.clientPhone === '' || b.eventType === '' || b.eventCity === '') {
      return NextResponse.json({ error: 'Name, phone, event type and city cannot be empty' }, { status: 400 });
    }
    for (const k of ['budgetMin', 'budgetMax', 'quotedAmount', 'semMarginPct', 'semMarginAmount', 'wonValue']) {
      if (b[k] !== undefined) data[k] = num(b[k]);
    }
    if (b.guestCount !== undefined) data.guestCount = b.guestCount === '' ? null : parseInt(b.guestCount);
    for (const k of ['eventDate', 'nextActionAt', 'quoteSentAt']) if (b[k] !== undefined) data[k] = date(b[k]);
    if (b.budgetMin !== undefined || b.budgetMax !== undefined) {
      data.budgetKnown = Boolean(num(b.budgetMin ?? current.budgetMin) || num(b.budgetMax ?? current.budgetMax));
    }
    if (b.channel !== undefined) data.channel = CHANNELS.includes(b.channel) ? b.channel : null;
    if (b.track !== undefined) data.track = TRACKS.includes(b.track) ? b.track : null;
    if (b.lostReason !== undefined) data.lostReason = LOST_REASONS.includes(b.lostReason) ? b.lostReason : null;

    const timeline: { kind: string; summary: string }[] = [];

    if (b.stage !== undefined && b.stage !== current.stage) {
      data.stage = b.stage;
      if (['won', 'lost'].includes(b.stage)) data.closedAt = new Date();
      else data.closedAt = null;
      const why = b.stage === 'lost' ? ` (${label(b.lostReason || current.lostReason || '')})` : '';
      timeline.push({ kind: 'status_change', summary: `Stage: ${label(current.stage)} → ${label(b.stage)}${why}` });
    }

    if (b.partnerId !== undefined && b.partnerId !== current.partnerId) {
      data.partnerId = b.partnerId || null;
      if (b.partnerId) {
        const partner = await prisma.vendor.findUnique({ where: { id: b.partnerId }, select: { name: true } });
        if (!partner) return NextResponse.json({ error: 'Partner not found' }, { status: 400 });
        data.partnerHandedAt = new Date();
        data.track = data.track ?? current.track ?? 'partner';
        timeline.push({ kind: 'status_change', summary: `Handed to partner: ${partner.name}` });
      } else {
        timeline.push({ kind: 'status_change', summary: `Partner removed (was ${current.partner?.name ?? 'unknown'})` });
      }
    }

    const deal = await prisma.quoteRequest.update({
      where: { id },
      data: { ...data, updates: timeline.length ? { create: timeline } : undefined },
      include: { partner: { select: { id: true, name: true } }, updates: { orderBy: { createdAt: 'desc' } } },
    });
    return NextResponse.json(deal);
  } catch (error) {
    console.error('Update Deal Error:', error);
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
  }
}

// POST /api/admin/pipeline/:id — add a timeline entry (call, client reply,
// partner update…). Optionally sets the deal's next action in the same step.
export async function POST(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const b = await request.json();
    if (!UPDATE_KINDS.includes(b.kind) || !b.summary?.trim()) {
      return NextResponse.json({ error: 'Kind and summary are required' }, { status: 400 });
    }

    const now = new Date();
    const dealData: Record<string, unknown> = {};
    if (b.kind === 'partner_update') dealData.partnerLastUpdateAt = now;
    if (CLIENT_CONTACT_KINDS.includes(b.kind)) dealData.lastContactAt = now;
    if (b.kind === 'quote_sent') dealData.quoteSentAt = now;
    if (b.nextAction !== undefined) dealData.nextAction = b.nextAction?.trim() || null;
    if (b.nextActionAt !== undefined) dealData.nextActionAt = date(b.nextActionAt);

    const [update] = await prisma.$transaction([
      prisma.leadUpdate.create({
        data: {
          requestId: id,
          kind: b.kind,
          author: b.author?.trim() || 'SEM',
          channel: CHANNELS.includes(b.channel) || b.channel === 'meeting' ? b.channel : null,
          summary: b.summary.trim(),
          nextAction: b.nextAction?.trim() || null,
          nextActionAt: date(b.nextActionAt),
        },
      }),
      prisma.quoteRequest.update({ where: { id }, data: dealData }),
    ]);

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    console.error('Add Deal Update Error:', error);
    return NextResponse.json({ error: 'Failed to add update' }, { status: 500 });
  }
}
