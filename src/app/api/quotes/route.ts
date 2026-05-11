import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId, eventId, details, amount } = body;

    if (!vendorId || !eventId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        vendorId,
        eventId,
        details: details || "",
        amount: amount ? parseFloat(amount) : null,
        status: 'Pending',
      },
      include: {
        vendor: true
      }
    });

    await logActivity('Generated Quote', `New quote from ${quote.vendor.name} for SAR ${quote.amount || 'TBD'}`, 'admin@saudievent.com');

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Quote Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        vendor: true,
        event: {
          include: {
            client: true
          }
        }
      }
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Quotes Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, amount } = body;

    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: { 
        status,
        ...(amount && { amount: parseFloat(amount) })
      },
      include: {
        vendor: true
      }
    });

    await logActivity('Updated Quote', `Quote status changed to ${status} for ${updatedQuote.vendor.name}`, 'admin@saudievent.com');

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Quote Update Error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
