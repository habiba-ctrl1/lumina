import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const skip = (page - 1) * limit;

    let where: any = {};

    if (type && type !== 'All' && type !== 'all') {
      where.type = type;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const [events, count] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: true,
          media: true
        }
      }),
      prisma.event.count({ where })
    ]);

    return NextResponse.json({
      data: events,
      count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: body,
      include: {
        client: true,
        media: true
      }
    });
    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error('Prisma error:', err);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
