import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['New', 'Reviewed', 'Actioned'];

// PATCH /api/admin/email-leads/:id — body.status: "New" | "Reviewed" | "Actioned"
export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const lead = await prisma.emailLead.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Email Lead Update Error:', error);
    return NextResponse.json({ error: 'Failed to update email lead' }, { status: 500 });
  }
}
