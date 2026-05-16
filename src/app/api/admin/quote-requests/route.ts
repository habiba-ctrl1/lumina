import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const requests = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { proposals: true }
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
