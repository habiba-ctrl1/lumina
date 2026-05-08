import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId, clientName, clientEmail, requirements } = body;

    if (!vendorId || !clientName || !clientEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        vendorId: parseInt(vendorId),
        clientName,
        clientEmail,
        details: requirements || "",
        status: 'Pending',
      }
    });

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
        vendor: true
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
    const { id, status } = body;

    const updatedQuote = await prisma.quote.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Quote Update Error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
