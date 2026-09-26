import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
