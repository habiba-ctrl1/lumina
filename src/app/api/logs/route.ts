import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Logs Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
