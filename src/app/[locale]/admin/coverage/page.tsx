"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-fetch";
import { Grid3x3, RefreshCw, ShieldAlert, Info } from "lucide-react";

// Read-only category × city coverage + data-quality view. Everything comes from
// GET /api/admin/vendor-coverage (computed from live rows). No writes happen here.

type Tier = "confirmed" | "tiered" | "listed";
type Readiness = "STRONG" | "SUPPORTED" | "POSSIBLE" | "WEAK" | "NO PAGE";
type Cell = { confirmed: number; tiered: number; listed: number; pending: number; kingdomWide: number; broad: number; vendorIds: string[]; pendingIds: string[]; readiness: Readiness };
type VendorLite = { id: string; name: string; tier: Tier; broad: boolean; primaryCategory: string; meetingStatus: string; verificationStatus: string; partnershipStatus: string; places: string[]; hasContact: boolean; hasServices: boolean; hasRateCard: boolean };
type PendingLite = { id: string; appNumber: string; companyName: string; status: string; places: string[]; hasCR: boolean };
type Data = {
  categories: { id: string; name: string }[];
  places: string[];
  cells: Record<string, Record<string, Cell>>;
  vendors: VendorLite[];
  pending: PendingLite[];
  totals: { vendors: number; confirmed: number; tiered: number; listed: number; openApplications: number; uniqueOpenApplications: number };
  quality: {
    broadClaimers: string[]; noContact: string[]; noPlace: string[]; noServices: string[]; tierWithoutVerification: string[];
    vendorDuplicatePairs: { a: string; b: string; matchedOn: string }[];
    uncategorisedApplications: string[];
    repeatSubmissionGroups: { company: string; appNumbers: string[]; statuses: string[] }[];
  };
};

const READY_STYLE: Record<Readiness, string> = {
  STRONG: "bg-emerald-100 text-emerald-800 border-emerald-300",
  SUPPORTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  POSSIBLE: "bg-amber-50 text-amber-700 border-amber-200",
  WEAK: "bg-slate-50 text-slate-500 border-slate-200",
  "NO PAGE": "bg-white text-slate-300 border-slate-100",
};
const TIER_STYLE: Record<Tier, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  tiered: "bg-amber-50 text-amber-700 border-amber-200",
  listed: "bg-slate-50 text-slate-500 border-slate-200",
};
const TIER_LABEL: Record<Tier, string> = { confirmed: "Confirmed", tiered: "Verified-Vendor tier", listed: "Listed" };

export default function CoveragePage() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"coverage" | "quality">("coverage");
  const [sel, setSel] = useState<{ cat: string; place: string } | null>(null);
  const [onlyFocus, setOnlyFocus] = useState(true);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/vendor-coverage");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load coverage");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const vendorById = useMemo(() => Object.fromEntries((data?.vendors || []).map((v) => [v.id, v])), [data]);
  const pendingById = useMemo(() => Object.fromEntries((data?.pending || []).map((p) => [p.id, p])), [data]);

  // columns: only places that have something in them
  const places = useMemo(() => {
    if (!data) return [] as string[];
    return data.places.filter((p) => data.categories.some((c) => data.cells[c.name]?.[p]));
  }, [data]);

  // rows: categories with data first (by confirmed+tiered desc), optional hide of empty ones
  const rows = useMemo(() => {
    if (!data) return [];
    const score = (name: string) => Object.values(data.cells[name] || {}).reduce((s, c) => s + c.confirmed * 3 + c.tiered * 2 + c.listed + c.pending * 0.5, 0);
    return [...data.categories].sort((a, b) => score(b.name) - score(a.name)).filter((c) => !onlyFocus || score(c.name) > 0);
  }, [data, onlyFocus]);

  const nameOf = (id: string) => vendorById[id]?.name || id.slice(0, 6);
  const list = (ids: string[]) => ids.map(nameOf);

  const selCell = sel && data ? data.cells[sel.cat]?.[sel.place] : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Grid3x3 size={20} className="text-emerald-600" /> Category &amp; City Coverage
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">Where SEM really has partners, and how sure we are — read-only, computed live from your vendor and application data.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50">
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {error && <div className="p-3 rounded-lg border border-red-200 bg-red-50 text-[12px] text-red-600">{error}</div>}
      {loading && !data && <div className="py-20 text-center text-slate-400 text-sm">Computing coverage…</div>}

      {data && (
        <>
          <div className="flex flex-wrap gap-2 text-[12px]">
            {[
              ["Vendors", data.totals.vendors, "bg-white text-slate-700 border-slate-200"],
              ["Confirmed", data.totals.confirmed, TIER_STYLE.confirmed],
              ["Verified-Vendor tier", data.totals.tiered, TIER_STYLE.tiered],
              ["Listed only", data.totals.listed, TIER_STYLE.listed],
              [`Open applications (${data.totals.uniqueOpenApplications} unique companies)`, data.totals.openApplications, "bg-blue-50 text-blue-700 border-blue-200"],
            ].map(([label, n, cls]) => (
              <span key={String(label)} className={`px-3 py-1.5 rounded-lg border font-semibold ${cls}`}>{label} <span className="ms-1 opacity-70">{n}</span></span>
            ))}
          </div>

          <div className="flex gap-2">
            {(["coverage", "quality"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-[12px] font-semibold border ${tab === t ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}>
                {t === "coverage" ? "Coverage map" : "Data quality"}
                {t === "quality" && <span className="opacity-60 ms-1.5">{data.quality.vendorDuplicatePairs.length + data.quality.noContact.length + data.quality.tierWithoutVerification.length}</span>}
              </button>
            ))}
          </div>

          {tab === "coverage" && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
                <div className="flex flex-wrap items-center gap-2">
                  {(["STRONG", "SUPPORTED", "POSSIBLE", "WEAK"] as Readiness[]).map((r) => (
                    <span key={r} className={`px-2 py-0.5 rounded border font-semibold ${READY_STYLE[r]}`}>{r}</span>
                  ))}
                  <span className="ms-1">cell = <b>confirmed / tier / listed</b> <span className="text-blue-600">+pending apps</span> <span className="text-slate-400">~broad claimers (not counted)</span></span>
                </div>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={onlyFocus} onChange={(e) => setOnlyFocus(e.target.checked)} /> hide empty categories
                </label>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
                <table className="min-w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <th className="sticky start-0 bg-slate-50 text-start px-3 py-2 font-semibold text-slate-600 min-w-[200px]">Category</th>
                      {places.map((p) => <th key={p} className="px-2 py-2 font-semibold text-slate-500 whitespace-nowrap">{p}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100 last:border-0">
                        <td className="sticky start-0 bg-white px-3 py-1.5 font-semibold text-slate-800">{c.name}</td>
                        {places.map((p) => {
                          const cell = data.cells[c.name]?.[p];
                          const active = sel?.cat === c.name && sel?.place === p;
                          return (
                            <td key={p} className="px-1.5 py-1 text-center">
                              {cell ? (
                                <button
                                  onClick={() => setSel({ cat: c.name, place: p })}
                                  className={`w-full min-w-[64px] rounded-md border px-1.5 py-1 font-semibold transition-all ${READY_STYLE[cell.readiness]} ${active ? "ring-2 ring-emerald-500" : "hover:brightness-95"}`}
                                  title={`${cell.readiness}: ${cell.confirmed} confirmed, ${cell.tiered} tier, ${cell.listed} listed, ${cell.pending} pending applications`}
                                >
                                  {cell.confirmed}/{cell.tiered}/{cell.listed}
                                  {cell.pending > 0 && <span className="text-blue-600"> +{cell.pending}</span>}
                                  {cell.broad > 0 && <span className="text-slate-400 font-normal"> ~{cell.broad}</span>}
                                </button>
                              ) : (
                                <span className="text-slate-200">·</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2 p-3 rounded-lg border border-blue-100 bg-blue-50/50 text-[11px] text-blue-800 leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5" />
                <p>
                  <b>How to read it.</b> STRONG = at least one <i>confirmed</i> partner and two or more confirmed/tier partners named in that city. SUPPORTED = at least one confirmed or tier partner. POSSIBLE = only listed vendors, pending applications or a vendor claiming all of Saudi Arabia. &ldquo;KSA-wide&rdquo; is a vendor&apos;s own claim, not a verified city. A vendor linked to 5+ categories is a &ldquo;broad claimer&rdquo;: it counts only in its recorded primary category and shows as ~n elsewhere, because those extra links have proven over-generous. Many &ldquo;Verified-Vendor tier&rdquo; vendors are still verification-pending with no agreement — treat them as unconfirmed until you decide otherwise.
                </p>
              </div>

              {sel && selCell && (
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[13px] font-bold text-slate-900">{sel.cat} <span className="text-slate-400 font-normal">· {sel.place}</span> <span className={`ms-2 px-2 py-0.5 rounded border text-[10px] ${READY_STYLE[selCell.readiness]}`}>{selCell.readiness}</span></h2>
                    <button onClick={() => setSel(null)} className="text-[11px] text-slate-400 hover:text-slate-600">close</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Vendors ({selCell.vendorIds.length})</p>
                      <ul className="space-y-1.5">
                        {selCell.vendorIds.map((id) => {
                          const v = vendorById[id];
                          if (!v) return null;
                          return (
                            <li key={id} className="flex flex-wrap items-center gap-2 text-[12px]">
                              <span className="font-semibold text-slate-800">{v.name}</span>
                              <span className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${TIER_STYLE[v.tier]}`}>{TIER_LABEL[v.tier]}</span>
                              <span className="text-[10px] text-slate-400">{v.meetingStatus} · verification {v.verificationStatus}</span>
                              {v.broad && v.primaryCategory.toLowerCase() !== sel.cat.toLowerCase() && <span className="text-[10px] text-slate-500 border border-slate-200 rounded px-1">broad claimer — primary: {v.primaryCategory}</span>}
                              {!v.hasContact && <span className="text-[10px] text-red-500">no contact on file</span>}
                              {!v.hasServices && <span className="text-[10px] text-amber-600">no services text</span>}
                            </li>
                          );
                        })}
                        {selCell.vendorIds.length === 0 && <li className="text-[12px] text-slate-400">None</li>}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Pending applications ({selCell.pendingIds.length}, unique companies)</p>
                      <ul className="space-y-1.5">
                        {selCell.pendingIds.map((id) => {
                          const p = pendingById[id];
                          if (!p) return null;
                          return (
                            <li key={id} className="text-[12px] text-slate-700">
                              <span className="font-mono text-[10px] text-slate-400 me-1.5">{p.appNumber}</span>{p.companyName}
                              <span className="ms-2 text-[10px] text-slate-400">{p.hasCR ? "CR provided" : "no CR"}</span>
                            </li>
                          );
                        })}
                        {selCell.pendingIds.length === 0 && <li className="text-[12px] text-slate-400">None</li>}
                      </ul>
                      <Link href="/admin/vendor-applications" className="inline-block mt-3 text-[11px] font-semibold text-emerald-700 hover:underline">Open Applications →</Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {tab === "quality" && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Possible duplicate vendors", hint: "Same email, phone or near-identical name. Review before anything is merged — two companies can share a contact person.", n: data.quality.vendorDuplicatePairs.length, items: data.quality.vendorDuplicatePairs.map((p) => `${nameOf(p.a)}  ↔  ${nameOf(p.b)}  (matched on ${p.matchedOn})`) },
                { title: "Repeat application submissions", hint: "The same company applied more than once. Mark the extras “Duplicate” (they are kept as records, never turned into a second vendor).", n: data.quality.repeatSubmissionGroups.length, items: data.quality.repeatSubmissionGroups.map((g) => `${g.company} — ${g.appNumbers.map((a, i) => `${a} (${g.statuses[i]})`).join(", ")}`) },
                { title: "Linked to 5+ categories (broad claimers)", hint: "Check each link is a service they really deliver. Their extra links are excluded from coverage counts until you confirm.", n: data.quality.broadClaimers.length, items: list(data.quality.broadClaimers) },
                { title: "“Verified Vendor”/Partner tier without verification", hint: "Tier says trusted, verification says otherwise. Decide which is right before relying on these for public claims.", n: data.quality.tierWithoutVerification.length, items: list(data.quality.tierWithoutVerification) },
                { title: "Vendors with no contact on file", hint: "Cannot be matched to a lead or asked for a quote until a contact is added.", n: data.quality.noContact.length, items: list(data.quality.noContact) },
                { title: "Vendors with no usable city/coverage", hint: "Invisible on the coverage map except under “Unspecified”.", n: data.quality.noPlace.length, items: list(data.quality.noPlace) },
                { title: "Vendors with no services description", hint: "Capability is unknown — cannot be used to justify a page.", n: data.quality.noServices.length, items: list(data.quality.noServices) },
                { title: "Applications without a canonical category", hint: "Submitted through an older form. New submissions are now mapped automatically; these older rows need a one-time category mapping.", n: data.quality.uncategorisedApplications.length, items: [] as string[] },
              ].map((b) => (
                <div key={b.title} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[13px] font-bold text-slate-900 flex items-center gap-1.5"><ShieldAlert size={14} className={b.n > 0 ? "text-amber-500" : "text-slate-300"} /> {b.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${b.n > 0 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-slate-50 text-slate-400 border-slate-200"}`}>{b.n}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{b.hint}</p>
                  {b.items.length > 0 && (
                    <ul className="mt-2.5 space-y-1 max-h-48 overflow-y-auto pe-1">
                      {b.items.map((i, k) => <li key={k} className="text-[12px] text-slate-700">• {i}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
