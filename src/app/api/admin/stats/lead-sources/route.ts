import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const counts = await prisma.inquiry.groupBy({
      by: ['source'],
      _count: {
        _all: true
      }
    });

    const result = {
      direct: 0,
      referral: 0,
      social: 0,
      other: 0
    };

    counts.forEach(item => {
      const source = (item.source || 'other').toLowerCase();
      if (source.includes('direct')) result.direct += item._count._all;
      else if (source.includes('referral')) result.referral += item._count._all;
      else if (source.includes('social') || source.includes('insta') || source.includes('facebook')) result.social += item._count._all;
      else result.other += item._count._all;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Stats Lead Sources Error:', error);
    return NextResponse.json({ error: 'Failed to fetch lead source stats' }, { status: 500 });
  }
}
