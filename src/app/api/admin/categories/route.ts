import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';

// Admin-only category management. Categories are never deleted — only
// deactivated (isActive: false) — so historical Vendor/VendorApplication
// links never dangle. GET here (unlike the public /api/categories) includes
// inactive ones so the founder can re-enable a retired category.

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { vendors: true, applications: true } } },
  });
  return NextResponse.json(categories);
}

// POST — create a new category. Used both by a future admin management
// screen and inline from the Add/Edit Vendor category picker's
// "+ Create '[typed text]'" option (2026-07, founder's "don't want to
// manually categorize everything, but let me add one when needed" ask).
export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) return NextResponse.json({ error: 'Category name is required' }, { status: 400 });

    const slug = slugify(name);

    // Re-activate + rename if a matching slug already exists (including a
    // previously-deactivated one) instead of erroring — keeps this endpoint
    // idempotent for the inline "+ Create" flow.
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      const updated = await prisma.category.update({
        where: { slug },
        data: { isActive: true },
      });
      return NextResponse.json(updated, { status: 200 });
    }

    const maxSort = await prisma.category.aggregate({ _max: { sortOrder: true } });
    const category = await prisma.category.create({
      data: { name, slug, sortOrder: (maxSort._max.sortOrder ?? 0) + 1 },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Category Create Error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// PATCH — rename, reorder, or activate/deactivate. Never deletes.
export async function PATCH(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const body = await request.json();
    const data: Record<string, unknown> = {};
    if (typeof body.name === 'string' && body.name.trim()) data.name = body.name.trim();
    if (typeof body.isActive === 'boolean') data.isActive = body.isActive;
    if (typeof body.sortOrder === 'number') data.sortOrder = body.sortOrder;

    const updated = await prisma.category.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Category Update Error:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}
