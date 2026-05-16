import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const counts = await prisma.event.groupBy({
      by: ['status'],
      _count: {
        _all: true
      }
    });

    const result = {
      inquiry: 0,
      quoted: 0,
      booked: 0,
      completed: 0
    };

    counts.forEach(item => {
      const status = item.status.toLowerCase();
      if (status === 'inquiry') result.inquiry = item._count._all;
      else if (status === 'quoted') result.quoted = item._count._all;
      else if (status === 'booked') result.booked = item._count._all;
      else if (status === 'completed') result.completed = item._count._all;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Stats Pipeline Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pipeline stats' }, { status: 500 });
  }
}
