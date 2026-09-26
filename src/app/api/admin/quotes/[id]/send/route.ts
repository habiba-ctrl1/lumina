import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { sendProposalEmail } from '@/lib/send-quote-email';

// Retries the client email for an already-created Proposal — used by the
// "Retry" button when the initial send (in POST /api/admin/quotes) failed.
// Never creates a new Proposal, so it can't produce duplicate quote numbers.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const existing = await prisma.proposal.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Quotation not found.' }, { status: 404 });
    }
    if (existing.emailStatus === 'sent') {
      return NextResponse.json(
        { error: 'This quotation was already sent successfully. Create a new quote if you need to send a revision.' },
        { status: 400 }
      );
    }

    const sendResult = await sendProposalEmail(id, user.email || undefined);
    const finalProposal = await prisma.proposal.findUnique({ where: { id } });

    return NextResponse.json({
      proposal: finalProposal,
      emailSent: sendResult.ok,
      emailError: sendResult.ok ? undefined : sendResult.error,
    });
  } catch (error) {
    console.error('Resend Quote Error:', error);
    return NextResponse.json({ error: 'Failed to resend quotation' }, { status: 500 });
  }
}
