"use client";

export type StatusTone = "success" | "warning" | "critical" | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  success:  "bg-status-success-bg text-status-success",
  warning:  "bg-status-warning-bg text-status-warning",
  critical: "bg-status-critical-bg text-status-critical",
  neutral:  "bg-status-neutral-bg text-status-neutral",
};

// Best-effort tone for the free-text status strings used across Inquiry /
// QuoteRequest / Proposal / Meeting models (none are Prisma enums today).
// Unknown values fall back to "neutral" rather than guessing.
export function toneForStatus(status?: string | null): StatusTone {
  const s = (status || "").toLowerCase();
  if (["confirmed", "accepted", "sent", "completed", "verified", "approved", "active"].includes(s)) return "success";
  if (["pending", "contacted", "quote_sent", "scheduled", "draft"].includes(s)) return "warning";
  if (["cancelled", "canceled", "rejected", "expired", "failed", "missed"].includes(s)) return "critical";
  return "neutral";
}

export default function StatusBadge({ status, tone }: { status: string; tone?: StatusTone }) {
  const resolved = tone ?? toneForStatus(status);
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider ${TONE_CLASSES[resolved]}`}
    >
      {status}
    </span>
  );
}
