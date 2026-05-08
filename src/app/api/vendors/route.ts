import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { location: { contains: search } }
      ];
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    // Note: status is not in the original model I added, 
    // but I can add it if needed. For now, matching the Prisma schema.
    
    const vendors = await prisma.vendor.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { quotes: true }
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
        price: parseFloat(body.price),
        location: body.location,
        rating: body.rating ? parseFloat(body.rating) : 5.0,
      }
    });
    return NextResponse.json(vendor, { status: 201 });
  } catch (error) {
    console.error('Vendor Create Error:', error);
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 });
  }
}
