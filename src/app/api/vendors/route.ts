import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';
import { requireAdmin } from '@/lib/api-auth';
import { vendorScore } from '@/lib/vendor-ranking';

// GET /api/vendors — admin only. Server-side search/filter/pagination so the
// admin vendor list stops loading the entire table on every page view
// (2026-07 vendor-platform foundation — see the vendor-platform plan).
//
// sortBy=best is computed in JS after the DB has already applied search/
// filters — a pragmatic tradeoff: exact vendorScore() weighting isn't
// expressible as a single Prisma orderBy, but sorting the (already narrowed)
// filtered set in JS stays fast at hundreds/thousands of rows. Revisit if a
// single filter combination ever matches tens of thousands of vendors.
export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const search = (searchParams.get('search') || '').trim();
    const categoryId = searchParams.get('categoryId') || '';
    const city = searchParams.get('city') || '';
    const partnershipStatus = searchParams.get('partnershipStatus') || '';
    const verificationStatus = searchParams.get('verificationStatus') || '';
    const meetingStatus = searchParams.get('meetingStatus') || '';
    const preferredOnly = searchParams.get('preferred') === '1';
    const sortBy = (searchParams.get('sortBy') || 'best') as 'best' | 'name' | 'rating' | 'newest';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '25', 10) || 25));

    const and: any[] = [];

    if (search) {
      and.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { services: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { contactPerson: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    if (categoryId) {
      // Match the new canonical link OR the legacy free-text fields, since
      // existing vendors don't have categoryLinks populated yet (founder's
      // 2026-07 decision: no scripted backfill — they re-register via the
      // onboarding form instead).
      const cat = await prisma.category.findUnique({ where: { id: categoryId }, select: { name: true } });
      and.push({
        OR: [
          { categoryLinks: { some: { id: categoryId } } },
          ...(cat
            ? [
                { category: { contains: cat.name, mode: 'insensitive' as const } },
                { categories: { has: cat.name } },
              ]
            : []),
        ],
      });
    }

    if (city) {
      and.push({
        OR: [
          { city: { contains: city, mode: 'insensitive' } },
          { regionCoverage: { has: city } },
        ],
      });
    }

    if (partnershipStatus && partnershipStatus !== 'all') and.push({ partnershipStatus });
    if (verificationStatus && verificationStatus !== 'all') and.push({ verificationStatus });
    if (meetingStatus && meetingStatus !== 'all') and.push({ meetingStatus });
    if (preferredOnly) and.push({ preferred: true });

    const where = and.length ? { AND: and } : {};

    const total = await prisma.vendor.count({ where });

    let vendors;
    if (sortBy === 'best') {
      // Need the full filtered set to score+sort correctly before paginating.
      const all = await prisma.vendor.findMany({
        where,
        include: { _count: { select: { quotes: true, events: true } } },
      });
      all.sort((a, b) => vendorScore(b) - vendorScore(a));
      vendors = all.slice((page - 1) * pageSize, page * pageSize);
    } else {
      const orderBy =
        sortBy === 'name'
          ? { name: 'asc' as const }
          : sortBy === 'newest'
          ? { createdAt: 'desc' as const }
          : { rating: 'desc' as const };
      vendors = await prisma.vendor.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { _count: { select: { quotes: true, events: true } } },
      });
    }

    return NextResponse.json({
      vendors,
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    console.error('Vendors Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const categoryIds: string[] = Array.isArray(body.categoryIds) ? body.categoryIds : [];

    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        category: body.category,
        services: body.services,
        contactInfo: body.contactInfo,
        city: body.city || null,
        email: body.email || null,
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        portfolio: body.portfolio || null,
        pricing: body.pricing || null,
        availability: body.availability || 'Available',
        rating: body.rating ? parseFloat(body.rating) : 5.0,
        partnershipStatus: body.partnershipStatus || 'Pending',
        ...(categoryIds.length ? { categoryLinks: { connect: categoryIds.map((id) => ({ id })) } } : {}),
      },
    });

    await logActivity('Registered Partner', `New vendor added: ${vendor.name} (${vendor.category})`, 'admin@saudievent.com');

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error('Vendor Create Error:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}
