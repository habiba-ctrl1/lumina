import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

// /api/admin/vendor-quotes/[id] (PATCH, DELETE — admin only)

const VENDOR_PUBLIC_SELECT = { id: true, name: true, category: true, city: true };

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    // Whitelist editable fields — never let quoteNumber/requestId/vendorId change.
    const data: any = {};
    if (typeof body.service === 'string') data.service = body.service.trim();
    if (body.vendorCost !== undefined && !isNaN(parseFloat(body.vendorCost))) data.vendorCost = parseFloat(body.vendorCost);
    if (typeof body.currency === 'string') data.currency = body.currency.trim();
    if (typeof body.fileRef === 'string') data.fileRef = body.fileRef.trim() || null;
    if (typeof body.status === 'string') data.status = body.status.trim();
    if (typeof body.notes === 'string') data.notes = body.notes.trim() || null;
    if (body.validUntil !== undefined) {
      const d = body.validUntil ? new Date(body.validUntil) : null;
      data.validUntil = d && !isNaN(d.getTime()) ? d : null;
    }

    const updated = await prisma.vendorQuote.update({
      where: { id },
      data,
      include: { vendor: { select: VENDOR_PUBLIC_SELECT } },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('Vendor Quote Update Error:', error);
    return NextResponse.json({ error: 'Failed to update vendor quote' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await prisma.vendorQuote.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor Quote Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete vendor quote' }, { status: 500 });
  }
}
