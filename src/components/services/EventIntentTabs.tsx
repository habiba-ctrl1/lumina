"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Intent = { id: string; title: string; image?: string; imageAlt?: string; points: string[]; links: { label: string; href: string }[] };

/**
 * Event-intent tabs for service pages (Wedding / Corporate / Conference …).
 * All panels are rendered in the HTML (hidden ones with `hidden`), so every
 * event-type section stays crawlable and readable without JavaScript.
 */
export default function EventIntentTabs({ items, prefix }: { items: Intent[]; prefix: string }) {
  const [active, setActive] = useState(items[0]?.id);

  return (
    <div>
      <div role="tablist" aria-label="Event types" className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]">
        {items.map((it) => {
          const selected = it.id === active;
          return (
            <button
              key={it.id}
              id={`tab-${it.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${it.id}`}
              onClick={() => setActive(it.id)}
              className={`shrink-0 rounded-full border px-5 h-11 text-[14px] font-semibold transition-colors ${
                selected ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-[var(--primary)]/50"
              }`}
            >
              {it.title}
            </button>
          );
        })}
      </div>

      {items.map((it) => (
        <div
          key={it.id}
          id={`panel-${it.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${it.id}`}
          hidden={it.id !== active}
          className={`mt-5 ${it.id === active ? "grid" : "hidden"} grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-neutral-200/80 bg-white p-5 md:p-7`}
        >
          {it.image && (
            <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
              <Image src={it.image} alt={it.imageAlt || it.title} fill loading="lazy" sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          <div className={it.image ? "lg:col-span-7" : "lg:col-span-12"}>
            <h3 className="!text-[1.35rem] text-neutral-900">{it.title}</h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {it.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-neutral-700">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[var(--primary)]" /> {p}
                </li>
              ))}
            </ul>
            {it.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {it.links.map((l) => (
                  <Link key={l.href + l.label} href={`${prefix}${l.href}`} className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/25 bg-[var(--primary)]/[0.04] px-4 py-2 text-[13px] font-semibold text-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--primary)]">
                    {l.label} <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
