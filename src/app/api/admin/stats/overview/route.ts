import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [totalEvents, pendingLeads, vendorQuotes, pulseUpdates] = await Promise.all([
      prisma.event.count(),
      prisma.inquiry.count({ where: { status: 'Pending' } }),
      prisma.quote.count(),
      prisma.activityLog.count()
    ]);

    return NextResponse.json({
      totalEvents,
      pendingLeads,
      vendorQuotes,
      pulseUpdates
    });
  } catch (error) {
    console.error('Stats Overview Error:', error);
    return NextResponse.json({ error: 'Failed to fetch overview stats' }, { status: 500 });
  }
}
