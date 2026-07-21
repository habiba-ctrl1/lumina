import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { vendorScore } from '@/lib/vendor-ranking';

/**
 * Vendor matching engine (admin only).
 * GET /api/admin/vendor-match?city=Riyadh&service=Catering&includeUnverified=1
 *
 * Ranking (per founder's spec):
 *  1. Service/category match (when a service is given)
 *  2. Region coverage must include the client's city (or "Saudi Arabia"-wide)
 *  3. Unverified excluded by default (includeUnverified=1 overrides)
 *  4. Verified > Pending, then preferred flag, then internalRating, then rating
 * Availability-by-date is not yet tracked — flagged in the response.
 * Output contains NO private contact fields.
 */
export async function GET(request: Request) {
  try {
    const user = await requireAdmin(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const city = (searchParams.get('city') || '').trim().toLowerCase();
    const service = (searchParams.get('service') || '').trim().toLowerCase();
    const includeUnverified = searchParams.get('includeUnverified') === '1';

    const vendors = await prisma.vendor.findMany({
      // Private contact fields deliberately excluded from matching output.
      select: {
        id: true, name: true, category: true, categories: true, services: true,
        city: true, regionCoverage: true, verificationStatus: true, partnershipStatus: true, meetingStatus: true,
        internalRating: true, rating: true, preferred: true, agreementSigned: true,
      },
    });

    const coversCity = (v: (typeof vendors)[number]) =>
      !city ||
      (v.city || '').toLowerCase().includes(city) ||
      v.regionCoverage.some((r) => r.toLowerCase().includes(city) || /saudi arabia/i.test(r));

    const matchesService = (v: (typeof vendors)[number]) =>
      !service ||
      [v.category, ...v.categories, v.services || ''].join(' ').toLowerCase().includes(service);

    const ranked = vendors
      .filter((v) => (includeUnverified || v.verificationStatus !== 'Unverified') && coversCity(v) && matchesService(v))
      .sort((a, b) => vendorScore(b) - vendorScore(a))
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      matches: ranked,
      note: 'Availability for specific dates is not yet tracked — confirm with the vendor before quoting.',
      filters: { city, service, includeUnverified },
    });
  } catch (error) {
    console.error('Vendor matching engine error:', error);
    return NextResponse.json({ error: 'Failed to run matching engine' }, { status: 500 });
  }
}
