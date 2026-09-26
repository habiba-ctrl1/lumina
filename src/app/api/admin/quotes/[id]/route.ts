import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: { request: true }
    });

    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error('Fetch Proposal Error:', error);
    return NextResponse.json({ error: 'Failed to fetch proposal' }, { status: 500 });
  }
}
