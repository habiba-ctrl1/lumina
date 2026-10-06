// Vendor operations layer: roles (preferred / secondary / backup …), archive state and
// the "who handles which lane" map. Reads the NEW tables VendorOps / VendorCapability
// (scripts/vendor-ops-tables.sql). Every read degrades gracefully when those tables
// are not created yet, so deploying before the SQL is run cannot break existing pages.

export const ROLES = ["preferred", "secondary", "backup", "candidate", "inactive"] as const;
export type Role = (typeof ROLES)[number];
export const RELATIONSHIP_TYPES = ["vendor", "agency_client", "inactive"] as const;

export type OpsInfo = {
  relationshipType: string;
  role: string; // role of the primary capability ("candidate" when none recorded)
  categoryName: string | null;
  subcategories: string[];
  cities: string[];
  status: string; // claimed | confirmed
  hasCapability: boolean;
};

// Prisma "table does not exist" (P2021) or raw "relation … does not exist".
export function isMissingTable(err: unknown): boolean {
  const e = err as { code?: string; message?: string };
  return e?.code === "P2021" || /does not exist|relation .* does not exist/i.test(e?.message || "");
}

type PrismaLike = {
  vendorOps: { findMany: (a?: unknown) => Promise<any[]> };
  vendorCapability: { findMany: (a?: unknown) => Promise<any[]> };
};

/** vendorId → ops info. Returns { map: empty, ready: false } if the tables are missing. */
export async function loadOpsMap(prisma: PrismaLike): Promise<{ map: Map<string, OpsInfo>; ready: boolean }> {
  try {
    const [ops, caps] = await Promise.all([
      prisma.vendorOps.findMany(),
      prisma.vendorCapability.findMany({ where: { isPrimary: true }, include: { category: { select: { name: true } } } } as unknown),
    ]);
    const map = new Map<string, OpsInfo>();
    for (const o of ops) {
      map.set(o.vendorId, {
        relationshipType: o.relationshipType,
        role: "candidate",
        categoryName: null,
        subcategories: [],
        cities: [],
        status: "claimed",
        hasCapability: false,
      });
    }
    for (const c of caps) {
      const cur =
        map.get(c.vendorId) ||
        ({ relationshipType: "vendor", role: "candidate", categoryName: null, subcategories: [], cities: [], status: "claimed", hasCapability: false } as OpsInfo);
      cur.role = c.role;
      cur.categoryName = c.category?.name ?? null;
      cur.subcategories = c.subcategories || [];
      cur.cities = c.cities || [];
      cur.status = c.status;
      cur.hasCapability = true;
      map.set(c.vendorId, cur);
    }
    return { map, ready: true };
  } catch (err) {
    if (isMissingTable(err)) return { map: new Map(), ready: false };
    throw err;
  }
}

/** True when a vendor must not be offered / counted (archived or not a supplier). */
export function isExcluded(info: OpsInfo | undefined): boolean {
  if (!info) return false;
  return info.relationshipType !== "vendor" || info.role === "inactive";
}

const ROLE_RANK: Record<string, number> = { preferred: 3, secondary: 2, backup: 1, candidate: 0, inactive: -1 };
export function roleRank(info: OpsInfo | undefined): number {
  return info ? ROLE_RANK[info.role] ?? 0 : 0;
}

// ── "Who handles what": the founder's quick-win lanes ────────────────────────
// A vendor serves a lane when its primary category or one of its subcategories matches.
export const SERVICE_LANES: { key: string; label: string; match: RegExp; priority: number }[] = [
  { key: "cross_border", label: "Cross-border rides (GCC)", match: /cross-border/i, priority: 1 },
  { key: "vip", label: "VIP / airport / event transport", match: /vip transport|airport|chauffeur|large-vehicle|suv with driver/i, priority: 1 },
  { key: "valet", label: "Valet parking", match: /valet/i, priority: 1 },
  { key: "catering", label: "Catering", match: /catering|finger food|coffee break/i, priority: 2 },
  { key: "birthday", label: "Birthday / private events", match: /birthday|private event/i, priority: 4 },
  { key: "nikkah_decor", label: "Nikkah / wedding setup & decor", match: /decor|draping|backdrop|flowers|floral|wedding/i, priority: 2 },
  { key: "henna", label: "Henna / mehndi", match: /henna|mehndi/i, priority: 4 },
  { key: "mascot", label: "Mascots / kids entertainment", match: /mascot|kids|face painting/i, priority: 4 },
  { key: "booth", label: "Booth / stand", match: /booth|exhibition stand|counters/i, priority: 5 },
  { key: "led", label: "LED screens", match: /led/i, priority: 5 },
  { key: "venue", label: "Venues", match: /venue|hotel/i, priority: 3 },
];

export function vendorServesLane(info: OpsInfo, lane: (typeof SERVICE_LANES)[number]): boolean {
  const hay = [info.categoryName || "", ...info.subcategories].join(" | ");
  return lane.match.test(hay);
}
