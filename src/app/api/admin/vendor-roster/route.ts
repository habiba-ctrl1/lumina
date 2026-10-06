import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { loadOpsMap, isMissingTable, ROLES, SERVICE_LANES, vendorServesLane, isExcluded } from '@/lib/vendor-ops';

// GET /api/admin/vendor-roster — admin only. Every vendor with its curation state
// (role, archived?) and the "who handles which lane" map. Contact details are NOT included.
export async function GET(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const [vendors, { map, ready }] = await Promise.all([
      prisma.vendor.findMany({
        select: { id: true, name: true, city: true, verificationStatus: true, partnershipStatus: true, updatedAt: true },
        orderBy: { name: 'asc' },
      }),
      loadOpsMap(prisma as never),
    ]);

    const rows = vendors.map((v) => {
      const info = map.get(v.id);
      return {
        id: v.id,
        name: v.name,
        city: v.city,
        verificationStatus: v.verificationStatus,
        partnershipStatus: v.partnershipStatus,
        updatedAt: v.updatedAt,
        curated: !!info,
        relationshipType: info?.relationshipType ?? null,
        role: info?.role ?? null,
        categoryName: info?.categoryName ?? null,
        subcategories: info?.subcategories ?? [],
        cities: info?.cities ?? [],
        capabilityStatus: info?.status ?? null,
      };
    });

    const lanes = SERVICE_LANES.map((lane) => {
      const hit = (role: string) =>
        vendors
          .filter((v) => {
            const info = map.get(v.id);
            return info && !isExcluded(info) && info.role === role && vendorServesLane(info, lane);
          })
          .map((v) => ({ id: v.id, name: v.name, cities: map.get(v.id)!.cities }));
      return { key: lane.key, label: lane.label, priority: lane.priority, preferred: hit('preferred'), secondary: hit('secondary'), backup: hit('backup') };
    }).sort((a, b) => a.priority - b.priority);

    return NextResponse.json({ ready, total: vendors.length, curated: map.size, rows, lanes });
  } catch (error) {
    console.error('Vendor roster error:', error);
    return NextResponse.json({ error: 'Failed to load roster' }, { status: 500 });
  }
}

// PATCH /api/admin/vendor-roster  { vendorId, action: 'set_role' | 'archive' | 'restore', role? }
// Never deletes or merges anything: archive = relationshipType 'inactive' + role 'inactive'
// (hidden from matching/coverage), restore = back to a normal vendor.
export async function PATCH(request: Request) {
  const user = await requireAdmin(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { vendorId, action, role } = await request.json();
    if (!vendorId || typeof vendorId !== 'string') return NextResponse.json({ error: 'vendorId required' }, { status: 400 });
    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId }, select: { id: true, name: true } });
    if (!vendor) return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });

    let nextRole: string;
    let relationshipType = 'vendor';
    if (action === 'archive') {
      nextRole = 'inactive';
      relationshipType = 'inactive';
    } else if (action === 'restore') {
      nextRole = 'candidate';
    } else if (action === 'set_role' && ROLES.includes(role) && role !== 'inactive') {
      nextRole = role;
    } else {
      return NextResponse.json({ error: 'Invalid action/role' }, { status: 400 });
    }

    await prisma.vendorOps.upsert({
      where: { vendorId },
      create: { vendorId, relationshipType },
      update: { relationshipType },
    });
    const primary = await prisma.vendorCapability.findFirst({ where: { vendorId, isPrimary: true } });
    if (primary) {
      await prisma.vendorCapability.update({ where: { id: primary.id }, data: { role: nextRole } });
    } else {
      await prisma.vendorCapability.create({ data: { vendorId, isPrimary: true, role: nextRole } });
    }

    await prisma.activityLog
      .create({
        data: {
          action: 'Vendor roster change',
          details: `${vendor.name}: ${action}${action === 'set_role' ? ' → ' + nextRole : ''}`,
          userEmail: user.email || 'admin',
        },
      })
      .catch(() => undefined);

    return NextResponse.json({ ok: true, role: nextRole, relationshipType });
  } catch (error) {
    if (isMissingTable(error)) {
      return NextResponse.json({ error: 'Run scripts/vendor-ops-tables.sql in Supabase first.' }, { status: 409 });
    }
    console.error('Vendor roster update error:', error);
    return NextResponse.json({ error: 'Failed to update roster' }, { status: 500 });
  }
}
