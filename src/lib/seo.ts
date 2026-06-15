import type { Metadata } from "next";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Arabic SEO indexing control — single source of truth (per-route)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * TEMPORARY PROTECTION STRATEGY
 *
 * Most `/ar/*` routes currently render English body content (only the shared
 * chrome — navbar, hero, footer — is translated). Letting Google index those
 * pages would create duplicate/low-quality Arabic results. So, **per route**:
 *
 *   • Untranslated Arabic route    → `noindex, follow` + excluded from sitemap.
 *   • Fully-translated Arabic route → `index, follow`  + included in sitemap.
 *
 * English routes are always indexable and unaffected.
 *
 * ── HOW TO PROMOTE A ROUTE FROM "untranslated" → "translated" ────────────────
 *   Add its canonical (locale-agnostic) path to `TRANSLATED_AR_ROUTES` below.
 *   That single edit:
 *     1. Flips `/ar/<path>` from `noindex, follow` → `index, follow`
 *        (enforced centrally by middleware + the robots helpers here).
 *     2. Adds `/ar/<path>` to the XML sitemap.
 *   No SEO logic anywhere else needs to change.
 *
 * ── When ALL Arabic translations are complete ────────────────────────────────
 *   Set `AR_INDEXABLE = true` (master override). Every `/ar/*` route becomes
 *   indexable and is added to the sitemap, regardless of the registry.
 */

/** Master override. While `false`, indexability is decided per-route below. */
export const AR_INDEXABLE = false;

/**
 * Registry of canonical (locale-agnostic) paths whose Arabic content is COMPLETE.
 *
 * Paths are normalized: leading slash, NO trailing slash, root = `"/"`.
 * Anything NOT listed here is treated as untranslated Arabic.
 *
 * Examples (add as translations ship):
 *   "/",                       // homepage
 *   "/contact",
 *   "/services/weddings",
 *   "/locations/riyadh",
 *   "/blog/destination-wedding-planning-guide",
 */
export const TRANSLATED_AR_ROUTES: ReadonlySet<string> = new Set<string>([
  "/", // Homepage — Arabic content complete.
]);

/**
 * Route SUBTREES whose Arabic content is complete. A prefix matches the path
 * itself AND every descendant, so dynamic routes (`/blog/[slug]`,
 * `/locations/[city]/[service]`, etc.) are covered without enumerating each one.
 *
 * NEVER add `"/"` here — that would flip the entire site. Use exact entries in
 * `TRANSLATED_AR_ROUTES` for single pages, prefixes here for whole sections.
 */
export const TRANSLATED_AR_ROUTE_PREFIXES: readonly string[] = [
  "/locations", // /locations index + every /locations/[city] and /locations/[city]/[service].
  // NOTE: /blog, /services, /portfolio are still PENDING — do not add until their
  // Arabic content is complete.
];

/** Canonical site origin, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saudieventmanagement.com"
).replace(/\/+$/, "");

/* ─────────────────────────────────────────────────────────────────────────────
   Path helpers
   ───────────────────────────────────────────────────────────────────────────── */

/** Normalize a path: strip query/hash, ensure leading slash, drop trailing slash. */
export function normalizePath(path: string): string {
  if (!path) return "/";
  let p = path.split("?")[0].split("#")[0];
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
}

/** Remove a leading `/ar` or `/en` locale segment, returning the canonical path. */
export function stripLocalePrefix(pathname: string): string {
  const p = normalizePath(pathname);
  const match = p.match(/^\/(ar|en)(\/.*)?$/);
  if (match) return normalizePath(match[2] || "/");
  return p;
}

/** Is the given path an Arabic (`/ar` or `/ar/...`) route? */
export function isArabicPath(pathname: string): boolean {
  const p = normalizePath(pathname);
  return p === "/ar" || p.startsWith("/ar/");
}

/* ─────────────────────────────────────────────────────────────────────────────
   Indexability decisions (all driven by the registry above)
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Whether the Arabic version of a canonical (locale-agnostic) route should be
 * indexed. `true` once the route is in `TRANSLATED_AR_ROUTES` (or the master
 * override is on).
 */
export function isArabicRouteIndexable(canonicalPath: string): boolean {
  if (AR_INDEXABLE) return true;
  const path = normalizePath(canonicalPath);
  if (TRANSLATED_AR_ROUTES.has(path)) return true;
  return TRANSLATED_AR_ROUTE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/"),
  );
}

/** Sitemap inclusion mirrors indexability — kept as a named alias for readability. */
export const isArabicRouteInSitemap = isArabicRouteIndexable;

/* ─────────────────────────────────────────────────────────────────────────────
   hreflang (conditional, reciprocal)
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Builds the `alternates.languages` map for a route, for use in a page's metadata.
 *
 * hreflang annotations must be **reciprocal** — every version of a page lists all
 * versions, and all of them must be indexable. Because untranslated Arabic routes
 * are `noindex`, we only emit the EN↔AR pair once the route's Arabic content is
 * complete (i.e. it is listed in `TRANSLATED_AR_ROUTES`):
 *
 *   • Route NOT translated → returns `undefined`. No hreflang is emitted, so an
 *     English page advertises no Arabic alternate, and the (noindex) Arabic page
 *     advertises no English relationship.
 *   • Route translated      → returns `{ en-US, ar-SA, x-default → en }`. Identical
 *     on both the English and Arabic versions, as hreflang requires.
 *
 * The map is locale-independent on purpose: pass the canonical (locale-agnostic)
 * path and use the SAME result on both the `/x` and `/ar/x` pages.
 *
 * To make a future route emit hreflang, add its path to `TRANSLATED_AR_ROUTES`.
 * Nothing else needs to change.
 */
export function hreflangAlternates(
  canonicalPath: string,
): Record<string, string> | undefined {
  const path = normalizePath(canonicalPath);
  if (!isArabicRouteIndexable(path)) return undefined;

  const suffix = path === "/" ? "" : path;
  const enUrl = `${SITE_URL}${suffix}`;
  const arUrl = `${SITE_URL}/ar${suffix}`;
  return { "en-US": enUrl, "ar-SA": arUrl, "x-default": enUrl };
}

/**
 * For middleware: returns `true` only for Arabic routes whose content is NOT yet
 * translated. Those receive an `X-Robots-Tag: noindex, follow` response header.
 */
export function shouldNoindexArabicPath(pathname: string): boolean {
  if (!isArabicPath(pathname)) return false;
  return !isArabicRouteIndexable(stripLocalePrefix(pathname));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Robots directives for `generateMetadata`
   ───────────────────────────────────────────────────────────────────────────── */

/** Standard "index, follow" directive used for indexable routes. */
const INDEXABLE_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

/** "noindex, follow": keep the page out of the index but let crawlers follow links. */
const NOINDEX_FOLLOW_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

/**
 * Route-aware robots directive. Pass the active `locale` and the route's canonical
 * (locale-agnostic) path. Use this in any layout/page that already knows its own
 * fixed path (e.g. `/services/royal-weddings`). The emitted `<meta robots>` will
 * always agree with the centrally-enforced `X-Robots-Tag` header.
 *
 *   • Non-Arabic locale          → indexable.
 *   • Arabic, route translated   → indexable.
 *   • Arabic, route untranslated → `noindex, follow`.
 */
export function robotsForRoute(locale: string, canonicalPath: string): Metadata["robots"] {
  if (locale === "ar" && !isArabicRouteIndexable(canonicalPath)) {
    return NOINDEX_FOLLOW_ROBOTS;
  }
  return INDEXABLE_ROBOTS;
}

/**
 * Robots directive for the root `[locale]/layout.tsx`, which does NOT know the
 * request path. English routes get the full indexable directive by inheritance.
 * Arabic routes return `undefined` (no `<meta robots>` emitted) so that the
 * per-route `X-Robots-Tag` header set in middleware is the single, route-accurate
 * authority for Arabic indexability.
 */
export function robotsForRootLayout(locale: string): Metadata["robots"] | undefined {
  if (locale === "ar") return undefined;
  return INDEXABLE_ROBOTS;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Back-compat
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * @deprecated Locale-only robots helper (no route awareness). Prefer
 * `robotsForRoute(locale, path)` for routes that know their path, or
 * `robotsForRootLayout(locale)` for the root layout. Retained so any remaining
 * caller keeps the conservative behaviour: Arabic → `noindex, follow`.
 */
export function robotsForLocale(locale: string): Metadata["robots"] {
  if (locale === "ar" && !AR_INDEXABLE) return NOINDEX_FOLLOW_ROBOTS;
  return INDEXABLE_ROBOTS;
}

/** @deprecated Use the per-route `isArabicRouteInSitemap(path)` instead. */
export const includeArabicInSitemap = AR_INDEXABLE;
