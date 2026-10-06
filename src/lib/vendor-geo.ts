// City normalisation for vendors and applications.
//
// Vendor.city is free text and Vendor.regionCoverage is a free-text string[] —
// real values in production include "jiddah", "All Saudi Arabia", "Saudi Arabia",
// "Multiple Cities", "UAE (covers UAE, KSA & wider GCC)" and "Not specified".
// Rather than rewrite stored data, we normalise at READ time so the coverage map,
// filters and matching all speak the same vocabulary. Nothing here writes.

export const KSA_CITIES = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Al Khobar",
  "Eastern Province",
  "Makkah",
  "Madinah",
  "AlUla",
  "NEOM",
  "Tabuk",
  "Taif",
  "Abha",
] as const;

export type NormalizedPlace = (typeof KSA_CITIES)[number] | "KSA-wide" | "Outside KSA" | "Unspecified";

const CITY_ALIASES: [RegExp, (typeof KSA_CITIES)[number]][] = [
  [/riyadh|الرياض/i, "Riyadh"],
  [/jed+ah|jiddah|جدة/i, "Jeddah"],
  [/dammam|الدمام/i, "Dammam"],
  [/khobar|الخبر/i, "Al Khobar"],
  [/dhahran|eastern province|المنطقة الشرقية/i, "Eastern Province"],
  [/makkah|mecca|مكة/i, "Makkah"],
  [/medina|madinah|المدينة/i, "Madinah"],
  [/alula|al-ula|العلا/i, "AlUla"],
  [/neom|نيوم/i, "NEOM"],
  [/tabuk|تبوك/i, "Tabuk"],
  [/taif|الطائف/i, "Taif"],
  [/abha|أبها/i, "Abha"],
];

const KSA_WIDE = /all saudi|saudi arabia|\bksa\b|multiple cities|nationwide|kingdom|السعودية|جميع المدن/i;
const OUTSIDE = /dubai|uae|abu.?dhabi|qatar|doha|bahrain|manama|kuwait|oman|muscat|poland|tashkent|\bgcc\b|international/i;

/**
 * Normalise any mix of city / coverage strings into canonical places.
 * "KSA-wide" means the vendor says it covers the whole Kingdom (not that SEM has
 * verified it in every city) — callers should treat it as a weaker signal than a
 * named city.
 */
export function normalizePlaces(...raw: (string | string[] | null | undefined)[]): NormalizedPlace[] {
  const out = new Set<NormalizedPlace>();
  for (const r of raw.flat()) {
    if (!r) continue;
    const s = String(r);
    let hit = false;
    for (const [re, name] of CITY_ALIASES) {
      if (re.test(s)) {
        out.add(name);
        hit = true;
      }
    }
    if (KSA_WIDE.test(s) && !/uae|dubai|qatar|bahrain|kuwait|oman/i.test(s.replace(/saudi arabia|ksa/gi, ""))) {
      out.add("KSA-wide");
      hit = true;
    } else if (KSA_WIDE.test(s)) {
      // e.g. "UAE (covers UAE, KSA & wider GCC)" — based outside, serves KSA cross-border
      out.add("Outside KSA");
      hit = true;
    }
    if (!hit && OUTSIDE.test(s)) out.add("Outside KSA");
  }
  if (out.size === 0) out.add("Unspecified");
  return [...out];
}

/** True when the vendor/application can be placed in this city (named, or KSA-wide). */
export function servesCity(places: NormalizedPlace[], city: string): boolean {
  return places.includes(city as NormalizedPlace) || places.includes("KSA-wide");
}
