import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } }
      ];
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const clients = await prisma.client.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { events: true }
        }
      }
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Clients Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        status: body.status || 'Active',
      }
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error('Client Create Error:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
