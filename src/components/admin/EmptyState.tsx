"use client";

import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
};

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="py-10 px-6 text-center">
      <div className="w-10 h-10 bg-brand-surface-lifted rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon size={17} className="text-brand-foreground-faint" />
      </div>
      <p className="text-xs font-bold text-brand-heading mb-0.5">{title}</p>
      {description && <p className="text-[11px] text-brand-foreground-muted max-w-[26ch] mx-auto">{description}</p>}
    </div>
  );
}
