"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HubGroup, HubService } from "@/lib/service-categories";

/**
 * "What do you need for your event?" — interactive category filter on the
 * Riyadh hub. Pure client-side filtering of the same server-provided list;
 * every item links to an existing authoritative service page.
 */
export default function ServiceExplorer({
  groups,
  services,
  prefix,
}: {
  groups: { id: HubGroup; label: string; blurb: string }[];
  services: HubService[];
  prefix: string;
}) {
  const [active, setActive] = useState<HubGroup>(groups[0].id);
  const current = groups.find((g) => g.id === active)!;
  const items = services.filter((s) => s.groups.includes(active));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-4">
        <div role="tablist" aria-label="Event service categories" className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 [scrollbar-width:none]">
          {groups.map((g) => {
            const selected = g.id === active;
            return (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="explorer-panel"
                onClick={() => setActive(g.id)}
                className={`shrink-0 lg:w-full text-start rounded-xl border px-4 py-3 lg:px-5 lg:py-4 transition-all duration-200 ${
                  selected
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_10px_30px_-12px_rgba(13,107,78,0.6)]"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-[var(--primary)]/40"
                }`}
              >
                <span className="block text-[14.5px] font-semibold">{g.label}</span>
                <span className={`hidden lg:block mt-0.5 text-[12.5px] ${selected ? "text-white/75" : "text-neutral-500"}`}>{g.blurb}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div id="explorer-panel" role="tabpanel" className="lg:col-span-8 rounded-2xl border border-neutral-200/80 bg-white p-5 md:p-7">
        <p className="text-[14px] text-neutral-500 lg:hidden mb-4">{current.blurb}</p>
        <ul className="divide-y divide-neutral-100">
          {items.map((s) => (
            <li key={s.href}>
              <Link href={`${prefix}${s.href}`} className="group flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{s.title}</p>
                  <p className="mt-1 text-[13.5px] text-neutral-500">{s.keyServices.join(" · ")}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[var(--primary)]">
                  <span className="hidden sm:inline">Get options</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
