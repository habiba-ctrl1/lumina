import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

type Params = { params: Promise<{ id: string }> };

// GET /api/vendors/:id — full vendor record + append-only notes log (admin only)
export async function GET(request: Request, { params }: Params) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const vendor = await prisma.vendor.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { createdAt: 'desc' } },
      _count: { select: { quotes: true, events: true } },
      categoryLinks: { select: { id: true, name: true, slug: true } },
      // Originating onboarding application(s), if any — surfaces documents
      // (CR/VAT/rate card/etc.) without duplicating that data onto Vendor.
      applications: {
        select: {
          id: true, appNumber: true, crNumber: true, vatNumber: true,
          logoLink: true, profileLink: true, rateCardLink: true, videoLink: true,
          majorClients: true, createdAt: true,
        },
      },
    },
  });
  if (!vendor) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(vendor);
}

// Fields the admin detail panel may update — everything else is ignored.
const EDITABLE = [
  'name', 'category', 'categories', 'services', 'contactInfo', 'contactPerson',
  'city', 'email', 'phone', 'whatsapp', 'portfolio', 'pricing', 'availability',
  'regionCoverage', 'yearsExperience', 'certifications', 'rateCardSummary',
  'rateCardFiles', 'portfolioFiles', 'meetingStatus', 'agreementSigned',
  'agreementDate', 'verificationStatus', 'partnershipStatus', 'internalRating',
  'preferred', 'photoPermission',
] as const;

// PATCH /api/vendors/:id — update vendor fields (admin only)
export async function PATCH(request: Request, { params }: Params) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const data: Record<string, unknown> = {};
  for (const key of EDITABLE) {
    if (key in body) data[key] = body[key];
  }
  if ('agreementDate' in data && typeof data.agreementDate === 'string' && data.agreementDate) {
    data.agreementDate = new Date(data.agreementDate as string);
  }
  // categoryIds is a relation set, not a plain scalar — handled separately
  // from the EDITABLE scalar whitelist above.
  if (Array.isArray(body.categoryIds)) {
    data.categoryLinks = { set: body.categoryIds.map((catId: string) => ({ id: catId })) };
  }
  const vendor = await prisma.vendor.update({ where: { id }, data });
  return NextResponse.json(vendor);
}

// POST /api/vendors/:id — append a timestamped note (never overwrites history)
export async function POST(request: Request, { params }: Params) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { note } = await request.json();
  if (!note || !String(note).trim()) {
    return NextResponse.json({ error: 'Note text required' }, { status: 400 });
  }
  const created = await prisma.vendorNote.create({ data: { vendorId: id, note: String(note).trim() } });
  return NextResponse.json(created, { status: 201 });
}
