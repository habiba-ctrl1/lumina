import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { logActivity } from '@/lib/logger';

// /api/admin/vendor-quotes (GET, POST — admin only)
// The COST side of a deal: prices vendors send to SEM for a specific client
// request. Client-facing quotes live in Proposal — these never appear to a client.
// Vendor CONTACT fields are never selected here (kept on Vendor, admin-only).

// Only the vendor's public-safe identity is ever returned with a vendor quote —
// no phone/email/whatsapp/contactPerson, even though this is an admin route.
const VENDOR_PUBLIC_SELECT = { id: true, name: true, category: true, city: true };

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    const vendorQuotes = await prisma.vendorQuote.findMany({
      where: requestId ? { requestId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { vendor: { select: VENDOR_PUBLIC_SELECT } },
    });

    return NextResponse.json({ data: vendorQuotes });
  } catch (error) {
    console.error('Vendor Quotes Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor quotes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const requestId = (body.requestId || '').trim();
    const vendorId = (body.vendorId || '').trim();
    const service = (body.service || '').trim();
    const vendorCost = parseFloat(body.vendorCost);

    if (!requestId || !vendorId || !service || isNaN(vendorCost)) {
      return NextResponse.json(
        { error: 'requestId, vendorId, service and a numeric vendorCost are required.' },
        { status: 400 }
      );
    }

    // Sequential internal ref: SEM-VQ-YYYY-NNN (solo-founder volume, count+1 is fine).
    const year = new Date().getFullYear();
    const countThisYear = await prisma.vendorQuote.count({
      where: { quoteNumber: { startsWith: `SEM-VQ-${year}-` } },
    });
    const quoteNumber = `SEM-VQ-${year}-${String(countThisYear + 1).padStart(3, '0')}`;

    const validUntilRaw = (body.validUntil || '').trim();
    const parsedValid = validUntilRaw ? new Date(validUntilRaw) : null;
    const validUntil = parsedValid && !isNaN(parsedValid.getTime()) ? parsedValid : null;

    const vendorQuote = await prisma.vendorQuote.create({
      data: {
        quoteNumber,
        requestId,
        vendorId,
        service,
        vendorCost,
        currency: (body.currency || 'SAR').trim(),
        fileRef: (body.fileRef || '').trim() || null,
        validUntil,
        status: (body.status || 'Received').trim(),
        notes: (body.notes || '').trim() || null,
      },
      include: { vendor: { select: VENDOR_PUBLIC_SELECT } },
    });

    await logActivity(
      'Vendor Quote Added',
      `${quoteNumber}: ${vendorQuote.vendor.name} quoted ${vendorCost} ${vendorQuote.currency} for "${service}".`,
      user.email || 'admin'
    );

    return NextResponse.json({ data: vendorQuote }, { status: 201 });
  } catch (error) {
    console.error('Vendor Quote Create Error:', error);
    return NextResponse.json({ error: 'Failed to save vendor quote', details: String(error) }, { status: 500 });
  }
}
