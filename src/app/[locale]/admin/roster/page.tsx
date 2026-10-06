"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { RefreshCw, Archive, RotateCcw, AlertTriangle, Search } from "lucide-react";

type Row = {
  id: string;
  name: string;
  city?: string | null;
  verificationStatus: string;
  curated: boolean;
  relationshipType: string | null;
  role: string | null;
  categoryName: string | null;
  subcategories: string[];
  cities: string[];
  capabilityStatus: string | null;
};
type LaneRow = {
  key: string;
  label: string;
  priority: number;
  preferred: { id: string; name: string; cities: string[] }[];
  secondary: { id: string; name: string; cities: string[] }[];
  backup: { id: string; name: string; cities: string[] }[];
};
type Payload = { ready: boolean; total: number; curated: number; rows: Row[]; lanes: LaneRow[] };

const TABS = [
  { key: "active", label: "Active" },
  { key: "backup", label: "Backup" },
  { key: "candidate", label: "Needs info" },
  { key: "archived", label: "Archived" },
  { key: "new", label: "Not reviewed" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function tabOf(r: Row): TabKey {
  if (!r.curated) return "new";
  if (r.relationshipType !== "vendor" || r.role === "inactive") return "archived";
  if (r.role === "preferred" || r.role === "secondary") return "active";
  if (r.role === "backup") return "backup";
  return "candidate";
}

const ROLE_TONE: Record<string, string> = {
  preferred: "bg-emerald-50 text-emerald-700 border-emerald-200",
  secondary: "bg-sky-50 text-sky-700 border-sky-200",
  backup: "bg-slate-100 text-slate-600 border-slate-200",
  candidate: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function RosterPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<TabKey>("active");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await adminFetch("/api/admin/vendor-roster");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setData(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (r: Row, action: "set_role" | "archive" | "restore", role?: string) => {
    if (action === "archive" && !confirm(`Archive "${r.name}"?\n\nIt stays on record but is hidden from matching and coverage. You can restore it any time.`)) return;
    setBusy(r.id);
    try {
      const res = await adminFetch("/api/admin/vendor-roster", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vendorId: r.id, action, role }),
      });
      const json = await res.json();
      if (!res.ok) alert(json.error || "Failed");
      else await load();
    } finally {
      setBusy(null);
    }
  };

  const counts = useMemo(() => {
    const c: Record<TabKey, number> = { active: 0, backup: 0, candidate: 0, archived: 0, new: 0 };
    (data?.rows || []).forEach((r) => c[tabOf(r)]++);
    return c;
  }, [data]);

  const shown = (data?.rows || []).filter(
    (r) => tabOf(r) === tab && (!q || r.name.toLowerCase().includes(q.toLowerCase()) || (r.categoryName || "").toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="pb-16 max-w-[1200px] mx-auto text-slate-800">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Partner Roster</h1>
          <p className="text-sm text-slate-500">Who gets which leads. Archived vendors stay on record but are never offered. Nothing here deletes a vendor.</p>
        </div>
        <button onClick={load} disabled={loading} className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 flex items-center gap-1.5 font-semibold text-xs disabled:opacity-50">
          <RefreshCw size={14} className={loading ? "animate-spin text-emerald-600" : "text-emerald-600"} /> Refresh
        </button>
      </div>

      {err && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-700">{err}</div>}

      {data && !data.ready && (
        <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex gap-2">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <div>
            <b>One-time setup needed.</b> Run <code>scripts/vendor-ops-tables.sql</code> in the Supabase SQL Editor, then refresh. Until then this page is read-only and matching works as before.
          </div>
        </div>
      )}
      {data && data.ready && data.curated === 0 && (
        <div className="mb-4 p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800">
          No vendors reviewed yet. Everything sits under <b>Not reviewed</b>. Set a role on each vendor below, or run the reviewed curation seed.
        </div>
      )}

      {/* Who handles what */}
      {data && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-sm font-bold text-slate-900">Who handles what</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-2 font-bold">Service</th>
                  <th className="px-4 py-2 font-bold">Preferred</th>
                  <th className="px-4 py-2 font-bold">Second / backup</th>
                </tr>
              </thead>
              <tbody>
                {data.lanes.map((l) => (
                  <tr key={l.key} className="border-t border-slate-100 align-top">
                    <td className="px-4 py-2.5 font-semibold text-slate-800 whitespace-nowrap">{l.label}</td>
                    <td className="px-4 py-2.5">
                      {l.preferred.length ? (
                        l.preferred.map((v) => (
                          <div key={v.id} className="text-emerald-700 font-semibold">
                            {v.name.split(/[(—\[]/)[0].trim()} {v.cities.length ? <span className="text-slate-400 font-normal">· {v.cities.join(", ")}</span> : null}
                          </div>
                        ))
                      ) : (
                        <span className="text-red-600 font-bold">No vendor</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {[...l.secondary, ...l.backup].length ? [...l.secondary, ...l.backup].map((v) => v.name.split(/[(—\[]/)[0].trim()).join(", ") : <span className="text-slate-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${tab === t.key ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
          >
            {t.label} ({counts[t.key]})
          </button>
        ))}
        <div className="relative ms-auto min-w-[200px]">
          <Search size={13} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search vendor or category" className="w-full bg-white border border-slate-200 rounded-xl py-2 ps-8 pe-3 text-xs font-semibold focus:outline-none focus:border-emerald-400" />
        </div>
      </div>

      {/* Roster */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100">
        {loading && !data ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading…</div>
        ) : shown.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">Nothing in this tab.</div>
        ) : (
          shown.map((r) => (
            <div key={r.id} className="flex flex-col md:flex-row md:items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 truncate max-w-[340px]">{r.name}</span>
                  {r.role && ROLE_TONE[r.role] && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ROLE_TONE[r.role]}`}>{r.role}</span>}
                  {r.capabilityStatus === "confirmed" && <span className="text-[10px] font-bold text-emerald-700">confirmed</span>}
                  {r.relationshipType === "agency_client" && <span className="text-[10px] font-bold text-violet-700">agency client — not a vendor</span>}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {r.categoryName || "No primary category"}
                  {r.subcategories.length ? ` · ${r.subcategories.join(", ")}` : ""}
                  {(r.cities.length ? r.cities : r.city ? [r.city] : []).length ? ` · ${(r.cities.length ? r.cities : [r.city as string]).join(", ")}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {tab !== "archived" ? (
                  <>
                    <select
                      disabled={busy === r.id || (data ? !data.ready : true)}
                      value={r.role && r.role !== "inactive" ? r.role : ""}
                      onChange={(e) => act(r, "set_role", e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      <option value="" disabled>Set role…</option>
                      <option value="preferred">Preferred</option>
                      <option value="secondary">Secondary</option>
                      <option value="backup">Backup</option>
                      <option value="candidate">Needs info</option>
                    </select>
                    <button disabled={busy === r.id || (data ? !data.ready : true)} onClick={() => act(r, "archive")} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1 disabled:opacity-40">
                      <Archive size={12} /> Archive
                    </button>
                  </>
                ) : (
                  <button disabled={busy === r.id} onClick={() => act(r, "restore")} className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1">
                    <RotateCcw size={12} /> Restore
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
