import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const requests = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      // A request can carry multiple Proposal versions (revisions). Order
      // newest-first so `proposals[0]` — what every admin page treats as
      // "the" active proposal — is actually the latest, not just whichever
      // row Postgres happened to return first.
      include: { proposals: { orderBy: { version: 'desc' } } }
    });

    const pending = await prisma.quoteRequest.count({ where: { status: 'pending' } });
    const quote_sent = await prisma.quoteRequest.count({ where: { status: 'quote_sent' } });
    const accepted = await prisma.quoteRequest.count({ where: { status: 'accepted' } });
    const total = await prisma.quoteRequest.count();

    const confirmedValue = await prisma.proposal.aggregate({
      where: { status: 'accepted' },
      _sum: { totalAmount: true }
    });

    return NextResponse.json({
      requests,
      counts: {
        pending,
        quote_sent,
        accepted,
        total,
        confirmedValue: confirmedValue._sum.totalAmount || 0
      }
    });
  } catch (error) {
    console.error('Fetch Quote Requests Error:', error);
    return NextResponse.json({ error: 'Failed to fetch quote requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const {
      clientName, clientPhone, clientEmail, eventType, 
      eventDate, eventCity, guestCount, budgetRange, requirements 
    } = body;

    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        clientName,
        clientPhone,
        clientEmail,
        eventType,
        eventDate: eventDate ? new Date(eventDate) : null,
        eventCity,
        guestCount: parseInt(guestCount) || null,
        budgetRange,
        requirements,
        source: 'manual_entry'
      }
    });

    return NextResponse.json(quoteRequest, { status: 201 });
  } catch (error) {
    console.error('Create Quote Request Error:', error);
    return NextResponse.json({ error: 'Failed to create quote request' }, { status: 500 });
  }
}
