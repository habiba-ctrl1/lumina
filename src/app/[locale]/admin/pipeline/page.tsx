"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { Plus, X, AlertTriangle, Clock, Handshake, Search } from "lucide-react";
import {
  STAGES, OPEN_STAGES, TRACKS, CHANNELS, LOST_REASONS, UPDATE_KINDS, PARTNER_STALE_HOURS, label,
} from "@/lib/pipeline";

type Update = {
  id: string; kind: string; author: string; channel?: string | null; summary: string;
  nextAction?: string | null; nextActionAt?: string | null; createdAt: string;
};
type Deal = {
  id: string; clientName: string; clientPhone: string; clientEmail?: string | null; clientCompany?: string | null;
  eventType: string; eventCity: string; eventDate?: string | null; guestCount?: number | null;
  budgetMin?: number | null; budgetMax?: number | null; requirements?: string | null; decisionMaker?: string | null;
  channel?: string | null; track?: string | null; stage: string; nextAction?: string | null; nextActionAt?: string | null;
  lastContactAt?: string | null; partnerId?: string | null; partner?: { id: string; name: string } | null;
  partnerHandedAt?: string | null; partnerLastUpdateAt?: string | null; quotedAmount?: number | null;
  quoteSentAt?: string | null; semMarginPct?: number | null; lostReason?: string | null; lostNote?: string | null;
  wonValue?: number | null; createdAt: string; updates: Update[]; _count?: { updates: number };
};
type Partner = { id: string; name: string };

const TABS = ["today", "partner_check", "open", "parked", "won", "lost"] as const;
type Tab = typeof TABS[number];
const TAB_LABEL: Record<Tab, string> = {
  today: "Due today", partner_check: "Partner check", open: "All open", parked: "Parked", won: "Won", lost: "Lost",
};

const endOfToday = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d; };
const isOpen = (d: Deal) => OPEN_STAGES.includes(d.stage as typeof OPEN_STAGES[number]);
const isDue = (d: Deal) => isOpen(d) && (!d.nextActionAt || new Date(d.nextActionAt) <= endOfToday());
const partnerStale = (d: Deal) => {
  if (!isOpen(d) || !d.partnerId) return false;
  const last = d.partnerLastUpdateAt || d.partnerHandedAt;
  return !last || Date.now() - new Date(last).getTime() > PARTNER_STALE_HOURS * 3600 * 1000;
};
const fmtDate = (s?: string | null) => (s ? new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—");
const toInputDate = (s?: string | null) => (s ? new Date(s).toISOString().slice(0, 10) : "");
const sar = (n?: number | null) => (n || n === 0 ? `SAR ${Math.round(n).toLocaleString()}` : "—");

const STAGE_STYLE: Record<string, string> = {
  new: "bg-sky-50 text-sky-700 border-sky-100",
  qualifying: "bg-indigo-50 text-indigo-700 border-indigo-100",
  sourcing: "bg-violet-50 text-violet-700 border-violet-100",
  quote_sent: "bg-amber-50 text-amber-700 border-amber-100",
  negotiating: "bg-orange-50 text-orange-700 border-orange-100",
  waiting_client: "bg-slate-100 text-slate-600 border-slate-200",
  won: "bg-emerald-50 text-emerald-700 border-emerald-100",
  lost: "bg-rose-50 text-rose-700 border-rose-100",
  parked: "bg-stone-100 text-stone-600 border-stone-200",
};

const input = "w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400";
const fieldLabel = "block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1";

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("today");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Deal | null>(null);
  const [adding, setAdding] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/pipeline");
      const data = await res.json();
      setDeals(Array.isArray(data.deals) ? data.deals : []);
      setPartners(Array.isArray(data.partners) ? data.partners : []);
    } catch (e) {
      console.error("Failed to load pipeline:", e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const counts = useMemo(() => ({
    today: deals.filter(isDue).length,
    partner_check: deals.filter(partnerStale).length,
    open: deals.filter(isOpen).length,
    parked: deals.filter(d => d.stage === "parked").length,
    won: deals.filter(d => d.stage === "won").length,
    lost: deals.filter(d => d.stage === "lost").length,
  }), [deals]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return deals
      .filter(d =>
        tab === "today" ? isDue(d) :
        tab === "partner_check" ? partnerStale(d) :
        tab === "open" ? isOpen(d) : d.stage === tab)
      .filter(d => !q || [d.clientName, d.clientCompany, d.eventType, d.eventCity, d.partner?.name]
        .some(v => v?.toLowerCase().includes(q)));
  }, [deals, tab, search]);

  const openDeal = async (id: string) => {
    const res = await adminFetch(`/api/admin/pipeline/${id}`);
    if (res.ok) setSelected(await res.json());
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="mb-5 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Pipeline</h1>
          <p className="text-slate-500 text-sm">Every SEM enquiry — WhatsApp, email and website — with its next action and partner status.</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 shadow-sm flex items-center gap-1.5">
          <Plus size={15} /> Add deal
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 ${
              tab === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}>
            {t === "today" && <Clock size={12} />}
            {t === "partner_check" && <Handshake size={12} />}
            {TAB_LABEL[t]}
            <span className={`px-1.5 rounded-md text-[10px] ${tab === t ? "bg-white/20" : "bg-slate-100"}`}>{counts[t]}</span>
          </button>
        ))}
        <div className="relative ms-auto w-full sm:w-64">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client, city, partner…"
            className="w-full bg-white border border-slate-200 rounded-xl ps-8 pe-3 py-1.5 text-xs focus:outline-none focus:border-emerald-400" />
        </div>
      </div>

      {tab === "partner_check" && (
        <p className="text-xs text-slate-500 mb-3">
          Deals handed to a partner with no partner update for {PARTNER_STALE_HOURS}h. Ask the partner for a one-line status, or contact the client directly.
        </p>
      )}

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
              <th className="px-4 py-3 text-start">Client</th>
              <th className="px-4 py-3 text-start">Event</th>
              <th className="px-4 py-3 text-start">Stage</th>
              <th className="px-4 py-3 text-start">Partner</th>
              <th className="px-4 py-3 text-start">Next action</th>
              <th className="px-4 py-3 text-start">Last update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-xs text-slate-400">Loading…</td></tr>
            ) : visible.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-xs text-slate-400">Nothing here.</td></tr>
            ) : visible.map(d => {
              const overdue = isOpen(d) && d.nextActionAt && new Date(d.nextActionAt) < new Date(new Date().toDateString());
              return (
                <tr key={d.id} onClick={() => openDeal(d.id)} className="hover:bg-slate-50/60 cursor-pointer align-top">
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-800">{d.clientName}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">{d.clientCompany || "Private"} · {d.channel || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {d.eventType}<br />
                    <span className="text-[10px] text-slate-400">{d.eventCity} · {fmtDate(d.eventDate)} · {d.guestCount ?? "?"} pax</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md border ${STAGE_STYLE[d.stage] || ""}`}>
                      {label(d.stage)}
                    </span>
                    {d.track && <p className="text-[10px] text-slate-400 mt-1">{d.track}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {d.partner?.name || "—"}
                    {partnerStale(d) && (
                      <p className="text-[10px] text-rose-600 font-semibold flex items-center gap-1 mt-0.5">
                        <AlertTriangle size={10} /> no update
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p className="text-slate-700">{d.nextAction || "—"}</p>
                    <p className={`text-[10px] font-semibold ${overdue ? "text-rose-600" : "text-slate-400"}`}>{fmtDate(d.nextActionAt)}</p>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-500 max-w-[260px]">
                    {d.updates[0] ? <>{d.updates[0].summary.slice(0, 90)}<br /><span className="text-[10px] text-slate-400">{fmtDate(d.updates[0].createdAt)}</span></> : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <DealPanel deal={selected} partners={partners}
          onClose={() => setSelected(null)}
          onChanged={(d) => { setSelected(d); load(); }} />
      )}
      {adding && <AddDealModal onClose={() => setAdding(false)} onCreated={() => { setAdding(false); load(); }} />}
    </div>
  );
}

function DealPanel({ deal, partners, onClose, onChanged }: {
  deal: Deal; partners: Partner[]; onClose: () => void; onChanged: (d: Deal) => void;
}) {
  const [form, setForm] = useState({
    stage: deal.stage, track: deal.track || "", partnerId: deal.partnerId || "",
    nextAction: deal.nextAction || "", nextActionAt: toInputDate(deal.nextActionAt),
    eventDate: toInputDate(deal.eventDate), eventCity: deal.eventCity, guestCount: deal.guestCount?.toString() || "",
    budgetMin: deal.budgetMin?.toString() || "", budgetMax: deal.budgetMax?.toString() || "",
    decisionMaker: deal.decisionMaker || "", quotedAmount: deal.quotedAmount?.toString() || "",
    semMarginPct: deal.semMarginPct?.toString() || "", wonValue: deal.wonValue?.toString() || "",
    lostReason: deal.lostReason || "", lostNote: deal.lostNote || "",
  });
  const [upd, setUpd] = useState({ kind: "partner_update", author: "", channel: "whatsapp", summary: "", nextAction: "", nextActionAt: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true); setError("");
    const res = await adminFetch(`/api/admin/pipeline/${deal.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Save failed");
    onChanged(data);
  };

  const addUpdate = async () => {
    if (!upd.summary.trim()) return;
    setSaving(true); setError("");
    const res = await adminFetch(`/api/admin/pipeline/${deal.id}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...upd,
        author: upd.author || (upd.kind === "partner_update" ? deal.partner?.name || "Partner" : "SEM"),
        nextAction: upd.nextAction || undefined,
        nextActionAt: upd.nextActionAt || undefined,
      }),
    });
    setSaving(false);
    if (!res.ok) return setError((await res.json()).error || "Could not add update");
    setUpd(u => ({ ...u, summary: "", nextAction: "", nextActionAt: "" }));
    const fresh = await adminFetch(`/api/admin/pipeline/${deal.id}`);
    if (fresh.ok) onChanged(await fresh.json());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <div className="w-full max-w-xl h-full bg-white shadow-xl overflow-y-auto p-5" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{deal.clientName}</h2>
            <p className="text-xs text-slate-500">
              {deal.clientCompany || "Private"} · {deal.clientPhone}{deal.clientEmail ? ` · ${deal.clientEmail}` : ""}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{deal.eventType} · added {fmtDate(deal.createdAt)} via {deal.channel || "—"}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700"><X size={18} /></button>
        </div>

        {deal.requirements && (
          <p className="text-xs text-slate-600 bg-slate-50 rounded-xl p-3 mb-4 whitespace-pre-wrap">{deal.requirements}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><label className={fieldLabel}>Stage</label>
            <select className={input} value={form.stage} onChange={set("stage")}>
              {STAGES.map(s => <option key={s} value={s}>{label(s)}</option>)}
            </select></div>
          <div><label className={fieldLabel}>Track</label>
            <select className={input} value={form.track} onChange={set("track")}>
              <option value="">—</option>
              {TRACKS.map(t => <option key={t} value={t}>{t === "broker" ? "broker (SEM quotes)" : "partner (Saudi partner leads)"}</option>)}
            </select></div>
          <div className="col-span-2"><label className={fieldLabel}>Partner</label>
            <select className={input} value={form.partnerId} onChange={set("partnerId")}>
              <option value="">— none —</option>
              {partners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {deal.partnerHandedAt && (
              <p className="text-[10px] text-slate-400 mt-1">
                Handed {fmtDate(deal.partnerHandedAt)} · last partner update {fmtDate(deal.partnerLastUpdateAt)}
              </p>
            )}</div>
          <div className="col-span-2"><label className={fieldLabel}>Next action</label>
            <input className={input} value={form.nextAction} onChange={set("nextAction")} placeholder="e.g. Ask Tony for status" /></div>
          <div><label className={fieldLabel}>Next action date</label>
            <input type="date" className={input} value={form.nextActionAt} onChange={set("nextActionAt")} /></div>
          <div><label className={fieldLabel}>Event date</label>
            <input type="date" className={input} value={form.eventDate} onChange={set("eventDate")} /></div>
          <div><label className={fieldLabel}>City</label>
            <input className={input} value={form.eventCity} onChange={set("eventCity")} /></div>
          <div><label className={fieldLabel}>Guests</label>
            <input className={input} value={form.guestCount} onChange={set("guestCount")} inputMode="numeric" /></div>
          <div><label className={fieldLabel}>Budget min (SAR)</label>
            <input className={input} value={form.budgetMin} onChange={set("budgetMin")} inputMode="numeric" /></div>
          <div><label className={fieldLabel}>Budget max (SAR)</label>
            <input className={input} value={form.budgetMax} onChange={set("budgetMax")} inputMode="numeric" /></div>
          <div className="col-span-2"><label className={fieldLabel}>Decision-maker</label>
            <input className={input} value={form.decisionMaker} onChange={set("decisionMaker")} /></div>
          <div><label className={fieldLabel}>Quoted to client (SAR, incl. VAT)</label>
            <input className={input} value={form.quotedAmount} onChange={set("quotedAmount")} inputMode="numeric" /></div>
          <div><label className={fieldLabel}>SEM margin %</label>
            <input className={input} value={form.semMarginPct} onChange={set("semMarginPct")} inputMode="decimal" /></div>
          {form.stage === "won" && (
            <div className="col-span-2"><label className={fieldLabel}>Won value (SAR)</label>
              <input className={input} value={form.wonValue} onChange={set("wonValue")} inputMode="numeric" /></div>
          )}
          {form.stage === "lost" && <>
            <div><label className={fieldLabel}>Lost reason</label>
              <select className={input} value={form.lostReason} onChange={set("lostReason")}>
                <option value="">— pick one —</option>
                {LOST_REASONS.map(r => <option key={r} value={r}>{label(r)}</option>)}
              </select></div>
            <div><label className={fieldLabel}>Lost note</label>
              <input className={input} value={form.lostNote} onChange={set("lostNote")} /></div>
          </>}
        </div>
        {error && <p className="text-xs text-rose-600 mb-2">{error}</p>}
        <button onClick={save} disabled={saving}
          className="w-full mb-6 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50">
          {saving ? "Saving…" : "Save deal"}
        </button>

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Add update</h3>
        <div className="bg-slate-50 rounded-xl p-3 mb-5 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <select className={input} value={upd.kind} onChange={e => setUpd(u => ({ ...u, kind: e.target.value }))}>
              {UPDATE_KINDS.filter(k => k !== "status_change").map(k => <option key={k} value={k}>{label(k)}</option>)}
            </select>
            <select className={input} value={upd.channel} onChange={e => setUpd(u => ({ ...u, channel: e.target.value }))}>
              {[...CHANNELS, "meeting"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className={input} placeholder={upd.kind === "partner_update" ? deal.partner?.name || "Partner" : "SEM"}
              value={upd.author} onChange={e => setUpd(u => ({ ...u, author: e.target.value }))} />
          </div>
          <textarea className={`${input} min-h-[64px]`} placeholder="What happened? e.g. Tony: client had the call, wants revised quote with 2 options"
            value={upd.summary} onChange={e => setUpd(u => ({ ...u, summary: e.target.value }))} />
          <div className="grid grid-cols-3 gap-2">
            <input className={`${input} col-span-2`} placeholder="Next action (updates the deal)" value={upd.nextAction}
              onChange={e => setUpd(u => ({ ...u, nextAction: e.target.value }))} />
            <input type="date" className={input} value={upd.nextActionAt} onChange={e => setUpd(u => ({ ...u, nextActionAt: e.target.value }))} />
          </div>
          <button onClick={addUpdate} disabled={saving || !upd.summary.trim()}
            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50">
            Add to timeline
          </button>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Timeline</h3>
        <ol className="space-y-3">
          {deal.updates.length === 0 && <li className="text-xs text-slate-400">No updates yet.</li>}
          {deal.updates.map(u => (
            <li key={u.id} className="border-s-2 border-slate-200 ps-3">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                {fmtDate(u.createdAt)} · {label(u.kind)} · {u.author}{u.channel ? ` · ${u.channel}` : ""}
              </p>
              <p className="text-xs text-slate-700 whitespace-pre-wrap">{u.summary}</p>
              {u.nextAction && <p className="text-[11px] text-emerald-700 mt-0.5">→ {u.nextAction} {u.nextActionAt ? `(${fmtDate(u.nextActionAt)})` : ""}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function AddDealModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [f, setF] = useState({
    clientName: "", clientPhone: "", clientEmail: "", clientCompany: "", channel: "whatsapp", track: "",
    eventType: "", eventCity: "", eventDate: "", guestCount: "", budgetMin: "", budgetMax: "", requirements: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF(x => ({ ...x, [k]: e.target.value }));

  const submit = async () => {
    setSaving(true); setError("");
    const res = await adminFetch("/api/admin/pipeline", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    });
    setSaving(false);
    if (!res.ok) return setError((await res.json()).error || "Could not create deal");
    onCreated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-slate-900">Add deal</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700"><X size={18} /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2"><label className={fieldLabel}>Client name *</label><input className={input} value={f.clientName} onChange={set("clientName")} /></div>
          <div><label className={fieldLabel}>Phone / WhatsApp</label><input className={input} value={f.clientPhone} onChange={set("clientPhone")} /></div>
          <div><label className={fieldLabel}>Email</label><input className={input} value={f.clientEmail} onChange={set("clientEmail")} /></div>
          <div><label className={fieldLabel}>Company</label><input className={input} value={f.clientCompany} onChange={set("clientCompany")} /></div>
          <div><label className={fieldLabel}>Channel</label>
            <select className={input} value={f.channel} onChange={set("channel")}>{CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          <div><label className={fieldLabel}>Event type</label><input className={input} value={f.eventType} onChange={set("eventType")} placeholder="e.g. Wedding, Sound rental" /></div>
          <div><label className={fieldLabel}>City</label><input className={input} value={f.eventCity} onChange={set("eventCity")} /></div>
          <div><label className={fieldLabel}>Event date</label><input type="date" className={input} value={f.eventDate} onChange={set("eventDate")} /></div>
          <div><label className={fieldLabel}>Guests</label><input className={input} value={f.guestCount} onChange={set("guestCount")} inputMode="numeric" /></div>
          <div><label className={fieldLabel}>Budget min (SAR)</label><input className={input} value={f.budgetMin} onChange={set("budgetMin")} inputMode="numeric" /></div>
          <div><label className={fieldLabel}>Budget max (SAR)</label><input className={input} value={f.budgetMax} onChange={set("budgetMax")} inputMode="numeric" /></div>
          <div className="col-span-2"><label className={fieldLabel}>Track</label>
            <select className={input} value={f.track} onChange={set("track")}>
              <option value="">decide after qualifying</option>
              <option value="broker">broker — single service, SEM quotes</option>
              <option value="partner">partner — full event / CR needed</option>
            </select></div>
          <div className="col-span-2"><label className={fieldLabel}>What did they ask for?</label>
            <textarea className={`${input} min-h-[80px]`} value={f.requirements} onChange={set("requirements")} placeholder="Paste the WhatsApp message here" /></div>
        </div>
        {error && <p className="text-xs text-rose-600 mt-2">{error}</p>}
        <button onClick={submit} disabled={saving || !f.clientName.trim()}
          className="w-full mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50">
          {saving ? "Saving…" : "Create deal"}
        </button>
      </div>
    </div>
  );
}
