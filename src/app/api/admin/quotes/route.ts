import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { requestId, lineItems, validUntil, notes } = body;

    // 1. Calculate totals
    // lineItems: [{ service, description, qty, unitPrice, total }]
    const subtotal = lineItems.reduce((acc: number, item: any) => acc + (parseFloat(item.total) || 0), 0);
    const vatAmount = subtotal * 0.15;
    const totalAmount = subtotal + vatAmount;

    // 2. Generate Quote Number: SEM-Q-YYYY-001
    const year = new Date().getFullYear();
    const count = await prisma.proposal.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`)
        }
      }
    });
    const quoteNumber = `SEM-Q-${year}-${(count + 1).toString().padStart(3, '0')}`;

    // 3. Create Proposal
    const proposal = await prisma.proposal.create({
      data: {
        requestId,
        quoteNumber,
        lineItems: JSON.stringify(lineItems),
        subtotal,
        vatAmount,
        totalAmount,
        validUntil: new Date(validUntil),
        notes,
        status: 'sent'
      }
    });

    // 4. Update Request Status
    await prisma.quoteRequest.update({
      where: { id: requestId },
      data: { status: 'quote_sent' }
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error('Create Proposal Error:', error);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
