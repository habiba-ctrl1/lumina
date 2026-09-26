import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { logActivity } from '@/lib/logger';
import { sendProposalEmail } from '@/lib/send-quote-email';

// A genuine intentional resend of the same request within this window is
// vanishingly unlikely for a human — this is the server-side guard against
// an accidental double-click/double-submit creating two quotations.
const DUPLICATE_WINDOW_MS = 10_000;

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { requestId, lineItems, validUntil, notes } = body;

    if (!requestId || typeof requestId !== 'string') {
      return NextResponse.json({ error: 'A client request is required.' }, { status: 400 });
    }
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: 'At least one line item is required.' }, { status: 400 });
    }
    if (!validUntil || isNaN(new Date(validUntil).getTime())) {
      return NextResponse.json({ error: 'A valid "valid until" date is required.' }, { status: 400 });
    }

    const quoteRequest = await prisma.quoteRequest.findUnique({ where: { id: requestId } });
    if (!quoteRequest) {
      return NextResponse.json({ error: 'Client request not found.' }, { status: 404 });
    }

    const recent = await prisma.proposal.findFirst({
      where: { requestId, createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) } },
      orderBy: { createdAt: 'desc' },
    });
    if (recent) {
      return NextResponse.json(
        {
          error: 'A quotation was just created for this request — please wait a moment before sending again.',
          proposal: recent,
        },
        { status: 409 }
      );
    }

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

    // A request can already carry earlier proposal(s) — this is a revision,
    // not a brand-new document, so number it accordingly (quoteNumber stays
    // globally unique per row; `version` is what makes "V2" meaningful).
    const latestForRequest = await prisma.proposal.findFirst({
      where: { requestId },
      orderBy: { version: 'desc' },
      select: { version: true },
    });
    const version = (latestForRequest?.version || 0) + 1;

    // 3. Create Proposal — status starts "draft" (schema default) and only
    // becomes "sent" once the client email actually goes out, so "sent" is
    // never a lie (see sendProposalEmail).
    const proposal = await prisma.proposal.create({
      data: {
        requestId,
        quoteNumber,
        version,
        lineItems: JSON.stringify(lineItems),
        subtotal,
        vatAmount,
        totalAmount,
        validUntil: new Date(validUntil),
        notes,
      }
    });

    await logActivity(
      'Quote Created',
      `Proposal ${quoteNumber}${version > 1 ? ` (v${version})` : ''} created for ${quoteRequest.clientName} — SAR ${totalAmount.toFixed(2)}`,
      user.email || undefined
    );

    // 4. Attempt to email it to the client. QuoteRequest.status only advances
    // to "quote_sent" inside sendProposalEmail, and only on real success.
    const sendResult = await sendProposalEmail(proposal.id, user.email || undefined);
    const finalProposal = await prisma.proposal.findUnique({ where: { id: proposal.id } });

    return NextResponse.json(
      {
        proposal: finalProposal,
        emailSent: sendResult.ok,
        emailError: sendResult.ok ? undefined : sendResult.error,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create Proposal Error:', error);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
