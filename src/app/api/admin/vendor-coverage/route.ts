import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { buildCoverage } from '@/lib/vendor-coverage';

// GET /api/admin/vendor-coverage — admin only, READ-ONLY.
// Category × city coverage + data-quality findings, computed from live vendor and
// application rows. Contact details are deliberately NOT included in the payload.
export async function GET(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    return NextResponse.json(await buildCoverage(prisma));
  } catch (error) {
    console.error('Vendor coverage error:', error);
    return NextResponse.json({ error: 'Failed to compute coverage' }, { status: 500 });
  }
}
