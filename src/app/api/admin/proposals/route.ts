import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const proposals = await prisma.proposal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        request: true
      }
    });

    return NextResponse.json(proposals);
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to fetch proposals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      requestId,
      quoteNumber,
      lineItems,
      subtotal,
      vatAmount,
      totalAmount,
      validUntil,
      notes,
      status
    } = body;

    if (!requestId || !quoteNumber || !lineItems) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const proposal = await prisma.proposal.create({
      data: {
        requestId,
        quoteNumber,
        lineItems: typeof lineItems === 'string' ? lineItems : JSON.stringify(lineItems),
        subtotal: parseFloat(subtotal),
        vatAmount: parseFloat(vatAmount),
        totalAmount: parseFloat(totalAmount),
        validUntil: new Date(validUntil),
        notes,
        status: status || 'draft'
      },
      include: {
        request: true
      }
    });

    // Create system log
    await prisma.activityLog.create({
      data: {
        action: 'Quote Created',
        details: `Proposal ${quoteNumber} registered for SAR ${totalAmount}`,
        userEmail: 'admin@lumina.sa'
      }
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
