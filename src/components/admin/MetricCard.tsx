"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type MetricTone = "neutral" | "highlight" | "success" | "critical";

const TONE_STYLES: Record<MetricTone, { iconBg: string; iconColor: string; ring: string }> = {
  neutral:   { iconBg: "bg-brand-surface-lifted", iconColor: "text-brand-foreground-muted", ring: "" },
  highlight: { iconBg: "bg-brand-gold/10",        iconColor: "text-brand-gold-hover",       ring: "before:bg-brand-gold" },
  success:   { iconBg: "bg-status-success-bg",    iconColor: "text-status-success",         ring: "before:bg-status-success" },
  critical:  { iconBg: "bg-status-critical-bg",   iconColor: "text-status-critical",         ring: "before:bg-status-critical" },
};

type MetricCardProps = {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  tone?: MetricTone;
  href?: string;
  sublabel?: string;
  loading?: boolean;
};

/**
 * Standard dashboard metric tile. `tone` carries meaning, not decoration:
 * "highlight" = worth a look, "critical" = something failed, "success" = an
 * all-clear on something that could have failed, "neutral" = steady-state count.
 */
export default function MetricCard({ label, value, icon: Icon, tone = "neutral", href, sublabel, loading }: MetricCardProps) {
  const t = TONE_STYLES[tone];
  const hasAccent = tone !== "neutral";

  const content = (
    <div
      className={`relative overflow-hidden bg-white border border-brand-border rounded-xl p-4 shadow-card transition-all duration-200 ${
        href ? "hover:shadow-card-hover hover:border-brand-border cursor-pointer" : ""
      } ${hasAccent ? `before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${t.ring}` : ""}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.iconBg} mb-3`}>
        <Icon size={15} className={t.iconColor} strokeWidth={2.25} />
      </div>
      <p className="text-[10px] text-brand-foreground-muted font-bold uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-xl font-bold text-brand-heading leading-none tabular-nums">{loading ? "—" : value}</h3>
      {sublabel && !loading && (
        <p className="text-[10.5px] text-brand-foreground-faint font-medium mt-1.5">{sublabel}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
