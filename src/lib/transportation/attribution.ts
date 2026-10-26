// Shared lead-attribution model for the transportation division.
//
// Two halves:
//  • Client (captureAttribution): records first-touch/last-touch campaign data
//    in the visitor's browser as a convenience. It is untrusted input.
//  • Server (sanitizeAttribution / SEM_SERVER_FIELDS): validates that input and
//    stamps the fields the client must never control (business unit, department,
//    source website). Phase 2's endpoint must call these — never trust a
//    client-supplied business_unit.

export const SEM_SERVER_FIELDS = {
  business_unit: "SEM",
  lead_department: "transportation",
  source_website: "saudieventmanagement.com",
} as const;

export interface Touch {
  landing_page: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  at: string; // ISO timestamp
}

export interface Attribution {
  first_touch: Touch | null;
  last_touch: Touch | null;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const MAX_LEN = 200;

function cleanText(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, MAX_LEN);
  return s || null;
}

function cleanPath(v: unknown): string {
  if (typeof v !== "string") return "/";
  const path = v.split(/[?#]/)[0].trim().slice(0, MAX_LEN);
  return path.startsWith("/") && !path.startsWith("//") ? path.replace(/[\u0000-\u001f\u007f<>]/g, "") : "/";
}

/** Keep only an http(s) origin+path; drop query strings and anything else. */
function cleanReferrer(v: unknown): string | null {
  if (typeof v !== "string" || !v) return null;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return `${u.origin}${u.pathname}`.slice(0, MAX_LEN);
  } catch {
    return null;
  }
}

function cleanTouch(raw: unknown): Touch | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const at = typeof t.at === "string" && !Number.isNaN(Date.parse(t.at)) ? new Date(t.at).toISOString() : new Date().toISOString();
  return {
    landing_page: cleanPath(t.landing_page),
    referrer: cleanReferrer(t.referrer),
    utm_source: cleanText(t.utm_source),
    utm_medium: cleanText(t.utm_medium),
    utm_campaign: cleanText(t.utm_campaign),
    utm_content: cleanText(t.utm_content),
    utm_term: cleanText(t.utm_term),
    at,
  };
}

/** SERVER: validate untrusted client attribution into a safe, bounded shape. */
export function sanitizeAttribution(raw: unknown): Attribution {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return { first_touch: cleanTouch(r.first_touch), last_touch: cleanTouch(r.last_touch) };
}

const STORAGE_KEY = "sem_tx_attribution";

/** CLIENT: record this page view's touch. Safe to call repeatedly; never throws. */
export function captureAttribution(): Attribution {
  const empty: Attribution = { first_touch: null, last_touch: null };
  if (typeof window === "undefined") return empty;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM_KEYS.some((k) => params.has(k));
    const external = document.referrer && !document.referrer.startsWith(window.location.origin);

    let stored: Attribution = empty;
    try {
      stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null") || empty;
    } catch {
      stored = empty;
    }

    // Only a new campaign or external referral replaces last touch (internal navigation doesn't).
    if (!stored.first_touch || hasUtm || external) {
      const touch: Touch = {
        landing_page: window.location.pathname,
        referrer: external ? document.referrer : null,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        utm_term: params.get("utm_term"),
        at: new Date().toISOString(),
      };
      stored = { first_touch: stored.first_touch ?? touch, last_touch: touch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch {
        /* storage blocked — attribution just isn't persisted */
      }
    }
    return stored;
  } catch {
    return empty;
  }
}
