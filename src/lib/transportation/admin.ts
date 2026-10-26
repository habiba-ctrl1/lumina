// Shared (client + server) helpers for the transportation admin queue:
// per-category stage flow, labels and the priority rules.

export const TRANSPORT_STAGE_LABEL: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualifying: "Requirements being clarified",
  route_review: "Route feasibility review",
  vendor_pending: "Vendor availability pending",
  quote_prep: "Quote in preparation",
  quote_sent: "Quote sent",
  waiting_client: "Awaiting client",
  negotiating: "Negotiation",
  won: "Won / confirmed",
  lost: "Lost",
  cancelled: "Cancelled",
  parked: "Parked",
};

const CLOSED = ["won", "lost", "cancelled", "parked"];
export const isClosedStage = (stage: string) => CLOSED.includes(stage);

/** Stages offered in the dropdown. Cross-border adds the feasibility-review step; domestic skips it. */
export function stageFlow(serviceCategory?: string | null): string[] {
  const core = ["new", "contacted", "qualifying", "route_review", "vendor_pending", "quote_prep", "quote_sent", "waiting_client", "negotiating", "won", "lost", "cancelled", "parked"];
  return serviceCategory === "cross_border" ? core : core.filter((s) => s !== "route_review");
}

export const PROVIDER_STATUSES = [
  { value: "not_requested", label: "Not yet requested" },
  { value: "requested", label: "Availability requested" },
  { value: "confirmed", label: "Provider confirmed" },
  { value: "unavailable", label: "Provider unavailable" },
] as const;

export interface QuoteMeta {
  currency?: string;
  validUntil?: string;
  providerStatus?: string;
  paymentTerms?: string;
  cancellationTerms?: string;
  inclusions?: string;
  exclusions?: string;
}

export interface PriorityInput {
  stage: string;
  eventDate?: string | Date | null;
  nextActionAt?: string | Date | null;
  quoteDeadline?: string | null;
}

export interface Priority {
  level: "urgent" | "high" | "normal" | "none";
  reasons: string[];
}

const DAY = 24 * 60 * 60 * 1000;

/** Rule-based priority — each reason is shown in the UI so it is never a black box. */
export function computePriority(l: PriorityInput, now = Date.now()): Priority {
  if (isClosedStage(l.stage)) return { level: "none", reasons: [] };
  const reasons: string[] = [];
  let level: Priority["level"] = "normal";
  const bump = (to: "high" | "urgent") => {
    if (to === "urgent" || level === "normal") level = to;
  };

  if (l.eventDate) {
    const days = (new Date(l.eventDate).getTime() - now) / DAY;
    if (days <= 2) { bump("urgent"); reasons.push(days < 0 ? "Travel date has passed" : "Travelling within 48 hours"); }
    else if (days <= 7) { bump("high"); reasons.push("Travelling within 7 days"); }
  }
  if (l.quoteDeadline) {
    const days = (new Date(`${l.quoteDeadline}T23:59:59Z`).getTime() - now) / DAY;
    if (days <= 3) { bump("high"); reasons.push(days < 0 ? "Quote deadline passed" : "Quote needed within 3 days"); }
  }
  if (l.nextActionAt && now - new Date(l.nextActionAt).getTime() > DAY) {
    bump("high");
    reasons.push("Follow-up overdue by more than a day");
  }
  return { level, reasons };
}
