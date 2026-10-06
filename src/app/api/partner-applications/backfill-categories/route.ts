import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { logActivity } from '@/lib/logger';
import { resolveCategories } from '@/lib/vendor-categories';

// POST /api/partner-applications/backfill-categories — admin only, ADDITIVE ONLY.
//
// Older intake forms never sent canonical category ids, so many applications have
// free-text categories but no Category link. This connects each such application to
// the canonical categories its free-text labels map to (see vendor-categories.ts).
// It only ever ADDS links to applications that have none — it never removes or
// replaces a link, never touches the free-text field, and never touches vendors.
// body: { dryRun?: boolean }  — dryRun returns what WOULD be linked without writing.
export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json().catch(() => ({}));
    const dryRun = body?.dryRun === true;

    const apps = await prisma.vendorApplication.findMany({
      where: { categoryLinks: { none: {} } },
      select: { id: true, appNumber: true, companyName: true, categories: true },
    });

    const plan: { appNumber: string; companyName: string; from: string[]; to: string[] }[] = [];
    let linked = 0;
    for (const a of apps) {
      const cats = await resolveCategories(prisma, a.categories);
      if (cats.length === 0) continue;
      plan.push({ appNumber: a.appNumber, companyName: a.companyName, from: a.categories, to: cats.map((c) => c.name) });
      if (!dryRun) {
        await prisma.vendorApplication.update({
          where: { id: a.id },
          data: { categoryLinks: { connect: cats.map((c) => ({ id: c.id })) } },
        });
        linked++;
      }
    }

    if (!dryRun && linked > 0) {
      await logActivity('Partner Applications — categories mapped', `${linked} older application(s) linked to canonical categories`, user.email || 'admin');
    }
    return NextResponse.json({ dryRun, candidates: apps.length, linked, plan });
  } catch (error) {
    console.error('Backfill categories error:', error);
    return NextResponse.json({ error: 'Failed to map categories' }, { status: 500 });
  }
}
