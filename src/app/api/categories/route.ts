import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/categories — PUBLIC. Returns the active canonical category list.
// Safe to expose: id/name/slug only, no vendor data joined in here.
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true, slug: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
