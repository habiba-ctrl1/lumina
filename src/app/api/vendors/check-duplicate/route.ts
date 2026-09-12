import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { findPossibleDuplicates } from '@/lib/vendor-dedupe';

// POST /api/vendors/check-duplicate — admin-only. Non-blocking duplicate
// warning used by the "Add Vendor" modal and the Partner Application approval
// flow. Never blocks or merges by itself — just returns candidates for the
// admin to decide on.
export async function POST(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const candidates = await findPossibleDuplicates(prisma, {
      name: body.name,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
    }, body.excludeId);

    return NextResponse.json({ candidates });
  } catch (error) {
    console.error('Duplicate Check Error:', error);
    return NextResponse.json({ error: 'Failed to check for duplicates' }, { status: 500 });
  }
}
