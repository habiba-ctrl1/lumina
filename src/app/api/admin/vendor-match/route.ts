import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get('eventType') || '';
    const city = searchParams.get('city') || '';
    const budgetStr = searchParams.get('budget') || '0';
    const budget = parseFloat(budgetStr.replace(/[^0-9.]/g, '')) || 0;

    // Filter categories: Venues, Catering, Decor
    const categories = ['Venue', 'Catering', 'Decor', 'AV & Lighting', 'Photography'];

    // Match engine logic:
    // 1. Filter by category
    // 2. Filter by city if specified
    // 3. Sort by rating desc
    const matches: Record<string, any[]> = {};

    for (const cat of categories) {
      const vendors = await prisma.vendor.findMany({
        where: {
          category: { equals: cat },
          city: city ? { equals: city } : undefined,
        },
        orderBy: [
          { rating: 'desc' },
          { name: 'asc' }
        ],
        take: 10,
      });

      matches[cat.toLowerCase() + 's'] = vendors;
    }

    return NextResponse.json({
      success: true,
      matches,
      filters: { eventType, city, budget }
    });
  } catch (error) {
    console.error('Vendor matching engine error:', error);
    return NextResponse.json({ error: 'Failed to run matching engine' }, { status: 500 });
  }
}
