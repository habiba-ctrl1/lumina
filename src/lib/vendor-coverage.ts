// Category × city coverage, computed READ-ONLY from the live Vendor / Category /
// VendorApplication tables. Powers /admin/coverage. Nothing here writes.
//
// The point is to answer "where do we REALLY have partners, and how sure are we?"
// before any public page or promise is made. So every cell keeps three honesty
// tiers apart instead of one flattering "vendor count":
//
//   confirmed — verificationStatus Verified, or Partner tier, or meeting "Confirmed Partner"
//   tiered    — partnershipStatus "Verified Vendor" but NOT verified yet (data shows many of
//               these are still verification=Pending with no agreement — treat as unconfirmed)
//   listed    — in the database (Info Only / Contacted / Met / Negotiating), no relationship
//
// Pending applications are counted separately and de-duplicated by company, so a
// vendor who submitted the form five times counts once.

import type { PrismaClient } from '@prisma/client';
import { KSA_CITIES, normalizePlaces, type NormalizedPlace } from './vendor-geo';
import { matchCandidates, type DedupeRow } from './vendor-dedupe';

export type Tier = 'confirmed' | 'tiered' | 'listed';
export type Readiness = 'STRONG' | 'SUPPORTED' | 'POSSIBLE' | 'WEAK' | 'NO PAGE';

type VendorRow = {
  id: string; name: string; category: string; services: string | null;
  email: string | null; phone: string | null; whatsapp: string | null;
  city: string | null; regionCoverage: string[];
  meetingStatus: string; verificationStatus: string; partnershipStatus: string; agreementSigned: boolean;
  rateCardSummary: string | null; createdAt: Date;
  categoryLinks: { id: string; name: string }[];
};

export function vendorTier(v: Pick<VendorRow, 'verificationStatus' | 'partnershipStatus' | 'meetingStatus'>): Tier {
  if (v.verificationStatus === 'Verified' || v.partnershipStatus === 'Partner' || v.meetingStatus === 'Confirmed Partner') return 'confirmed';
  if (v.partnershipStatus === 'Verified Vendor') return 'tiered';
  return 'listed';
}

export type Cell = {
  confirmed: number; tiered: number; listed: number; pending: number;
  kingdomWide: number; // vendors that claim "all Saudi Arabia" — weaker than a named city
  broad: number; // "broad claimers" linked here but NOT as their primary category — shown, never counted
  vendorIds: string[]; pendingIds: string[]; readiness: Readiness;
};

/**
 * A vendor linked to this many categories or more is a "broad claimer". Production data
 * shows these links are over-generous (e.g. a production-only supplier linked to Catering
 * and Venues because its profile lists "all services"). They count toward coverage ONLY
 * in their recorded primary category; elsewhere they appear as "broad" and never lift a
 * cell's readiness.
 */
export const BROAD_LINK_THRESHOLD = 5;

export const COVERAGE_PLACES: NormalizedPlace[] = [...KSA_CITIES, 'KSA-wide', 'Unspecified', 'Outside KSA'];

function readiness(c: Omit<Cell, 'readiness'>): Readiness {
  const named = c.confirmed + c.tiered;
  if (c.confirmed >= 1 && named >= 2) return 'STRONG';
  if (named >= 1) return 'SUPPORTED';
  if (c.listed >= 1 || c.pending >= 1 || c.kingdomWide >= 1) return 'POSSIBLE';
  return 'NO PAGE';
}

export async function buildCoverage(prisma: PrismaClient) {
  const [categories, vendorsRaw, appsRaw] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }], select: { id: true, name: true } }),
    prisma.vendor.findMany({ include: { categoryLinks: { select: { id: true, name: true } } } }),
    prisma.vendorApplication.findMany({ include: { categoryLinks: { select: { id: true, name: true } } } }),
  ]);
  const vendors = vendorsRaw as unknown as VendorRow[];

  // ── vendors per category/place
  const cells: Record<string, Record<string, Cell>> = {};
  const cell = (cat: string, place: string): Cell =>
    ((cells[cat] ||= {})[place] ||= { confirmed: 0, tiered: 0, listed: 0, pending: 0, kingdomWide: 0, broad: 0, vendorIds: [], pendingIds: [], readiness: 'NO PAGE' });

  for (const v of vendors) {
    const places = normalizePlaces(v.city, v.regionCoverage);
    const cats = v.categoryLinks.length ? v.categoryLinks.map((c) => c.name) : [v.category];
    const t = vendorTier(v);
    const isBroad = cats.length >= BROAD_LINK_THRESHOLD;
    for (const cat of cats) for (const p of places) {
      const c = cell(cat, p);
      if (isBroad && cat.toLowerCase() !== (v.category || '').toLowerCase()) {
        c.broad++;
        c.vendorIds.push(v.id);
        continue;
      }
      c[t]++;
      c.vendorIds.push(v.id);
      if (p === 'KSA-wide') c.kingdomWide++;
    }
  }

  // ── pending applications: open statuses only, not a duplicate of a vendor, one per company
  const openApps = appsRaw.filter((a) => ['Pending', 'Under Review', 'Need More Information'].includes(a.status));
  const vendorRows: DedupeRow[] = vendors.map((v) => ({ id: v.id, name: v.name, email: v.email, phone: v.phone, whatsapp: v.whatsapp, city: v.city, category: v.category }));
  const seen: DedupeRow[] = [];
  const uniqueOpen = openApps.filter((a) => {
    const input = { name: a.companyName, email: a.email, phone: a.phone, whatsapp: a.whatsapp };
    if (matchCandidates(vendorRows.filter((v) => v.id !== a.vendorId), input).length > 0) return false; // already a vendor
    if (matchCandidates(seen, input).length > 0) return false; // repeat submission
    seen.push({ id: a.id, name: a.companyName, email: a.email, phone: a.phone, whatsapp: a.whatsapp, city: null, category: '' });
    return true;
  });
  for (const a of uniqueOpen) {
    const places = normalizePlaces(a.city, a.regionCoverage);
    for (const cat of a.categoryLinks.map((c) => c.name)) for (const p of places) {
      const c = cell(cat, p);
      c.pending++;
      c.pendingIds.push(a.id);
    }
  }

  for (const cat of Object.keys(cells)) for (const p of Object.keys(cells[cat])) cells[cat][p].readiness = readiness(cells[cat][p]);

  // ── data-quality findings
  const pairs: { a: string; b: string; matchedOn: string }[] = [];
  for (let i = 0; i < vendorRows.length; i++) {
    for (const m of matchCandidates(vendorRows.slice(i + 1), vendorRows[i])) pairs.push({ a: vendorRows[i].id, b: m.vendor.id, matchedOn: m.matchedOn });
  }
  const uncategorisedApps = appsRaw.filter((a) => a.categoryLinks.length === 0);
  const repeatGroups: { company: string; appNumbers: string[]; statuses: string[] }[] = [];
  const groupedIds = new Set<string>();
  for (const a of appsRaw) {
    if (groupedIds.has(a.id)) continue;
    const others = matchCandidates(
      appsRaw.filter((o) => o.id !== a.id).map((o) => ({ id: o.id, name: o.companyName, email: o.email, phone: o.phone, whatsapp: o.whatsapp, city: null, category: '' })),
      { name: a.companyName, email: a.email, phone: a.phone, whatsapp: a.whatsapp },
    );
    if (others.length > 0) {
      const ids = [a.id, ...others.map((o) => o.vendor.id)];
      ids.forEach((i) => groupedIds.add(i));
      const rows = appsRaw.filter((x) => ids.includes(x.id)).sort((x, y) => x.appNumber.localeCompare(y.appNumber));
      repeatGroups.push({ company: a.companyName, appNumbers: rows.map((r) => r.appNumber), statuses: rows.map((r) => r.status) });
    }
  }

  const quality = {
    broadClaimers: vendors.filter((v) => (v.categoryLinks.length || 1) >= BROAD_LINK_THRESHOLD).map((v) => v.id),
    noContact: vendors.filter((v) => !v.email && !v.phone && !v.whatsapp).map((v) => v.id),
    noPlace: vendors.filter((v) => normalizePlaces(v.city, v.regionCoverage).every((p) => p === 'Unspecified')).map((v) => v.id),
    noServices: vendors.filter((v) => !v.services).map((v) => v.id),
    tierWithoutVerification: vendors.filter((v) => ['Verified Vendor', 'Partner'].includes(v.partnershipStatus) && v.verificationStatus !== 'Verified').map((v) => v.id),
    vendorDuplicatePairs: pairs,
    uncategorisedApplications: uncategorisedApps.map((a) => a.id),
    repeatSubmissionGroups: repeatGroups,
  };

  return {
    categories,
    places: COVERAGE_PLACES,
    cells,
    vendors: vendors.map((v) => ({
      id: v.id, name: v.name, tier: vendorTier(v), meetingStatus: v.meetingStatus, verificationStatus: v.verificationStatus,
      partnershipStatus: v.partnershipStatus, places: normalizePlaces(v.city, v.regionCoverage),
      broad: v.categoryLinks.length >= BROAD_LINK_THRESHOLD, primaryCategory: v.category,
      hasContact: Boolean(v.email || v.phone || v.whatsapp), hasServices: Boolean(v.services), hasRateCard: Boolean(v.rateCardSummary),
    })),
    pending: uniqueOpen.map((a) => ({
      id: a.id, appNumber: a.appNumber, companyName: a.companyName, status: a.status,
      places: normalizePlaces(a.city, a.regionCoverage), hasCR: Boolean(a.crNumber),
    })),
    totals: {
      vendors: vendors.length,
      confirmed: vendors.filter((v) => vendorTier(v) === 'confirmed').length,
      tiered: vendors.filter((v) => vendorTier(v) === 'tiered').length,
      listed: vendors.filter((v) => vendorTier(v) === 'listed').length,
      openApplications: openApps.length,
      uniqueOpenApplications: uniqueOpen.length,
    },
    quality,
  };
}
