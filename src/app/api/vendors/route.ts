import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/logger';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { category: { contains: search } },
        { services: { contains: search } }
      ];
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    const vendors = await prisma.vendor.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { 
            quotes: true,
            events: true
          }
        }
      }
    });

    return NextResponse.json(vendors);
  } catch (error) {
    console.error('Vendors Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        category: body.category,
        services: body.services,
        contactInfo: body.contactInfo,
        rating: body.rating ? parseFloat(body.rating) : 5.0,
      }
    });

    await logActivity('Registered Partner', `New vendor added: ${vendor.name} (${vendor.category})`, 'admin@saudievent.com');

    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error('Vendor Create Error:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}
