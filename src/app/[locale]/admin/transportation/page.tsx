"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Download, MessageCircle, Search, X } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { LOST_REASONS, UPDATE_KINDS, label } from "@/lib/pipeline";
import {
  PROVIDER_STATUSES, TRANSPORT_STAGE_LABEL, computePriority, isClosedStage, stageFlow, type QuoteMeta,
} from "@/lib/transportation/admin";
import { SERVICE_CATEGORIES } from "@/lib/transportation/config";

type Lead = {
  id: string; leadRef?: string | null; createdAt: string; clientName: string; clientCompany?: string | null;
  clientEmail?: string | null; clientPhone: string; serviceCategory?: string | null; journeyType?: string | null;
  originCity?: string | null; originCountry?: string | null; destinationCity?: string | null; destinationCountry?: string | null;
  eventDate?: string | null; guestCount?: number | null; vehiclePreference?: string | null; stage: string;
  nextAction?: string | null; nextActionAt?: string | null; quotedAmount?: number | null; source: string;
  utmSource?: string | null; utmCampaign?: string | null; notifyStatus?: string | null; details?: { quoteDeadline?: string; quote?: QuoteMeta } | null;
  proposals?: { id: string; status: string; version: number; totalAmount: number; currency: string }[];
};
type Detail = Omit<Lead, "proposals"> & {
  referrer?: string | null; landingPage?: string | null; utmMedium?: string | null; attribution?: { first_touch?: { landing_page?: string; at?: string } } | null; requirements?: string | null;
  lostReason?: string | null; updates: { id: string; kind: string; author: string; summary: string; nextActionAt?: string | null; createdAt: string }[];
  proposals: { id: string; quoteNumber: string; version: number; totalAmount: number; currency: string; validUntil: string; status: string; emailStatus: string }[];
  vendorQuotes: { id: string; quoteNumber: string; service: string; vendorCost: number; currency: string; status: string; vendor: { name: string } }[];
};

const VIEWS = ["open", "closed", "all"] as const;
const PRIORITY_STYLE: Record<string, string> = {
  urgent: "bg-rose-50 text-rose-700 border-rose-200",
  high: "bg-amber-50 text-amber-700 border-amber-200",
  normal: "bg-slate-50 text-slate-500 border-slate-200",
};
const inputCls = "w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400";
const fieldLabel = "block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1";
const fmtDate = (s?: string | null) => (s ? new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" }) : "—");
const toInput = (s?: string | null) => (s ? new Date(s).toISOString().slice(0, 10) : "");
const route = (l: Lead) => `${l.originCity || "?"} → ${l.destinationCity || "?"}`;

export default function TransportationQueuePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<(typeof VIEWS)[number]>("open");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [stage, setStage] = useState("");
  const [country, setCountry] = useState("");
  const [source, setSource] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selected, setSelected] = useState<Detail | null>(null);

  const query = useMemo(() => {
    const p = new URLSearchParams({ view });
    if (q.trim()) p.set("q", q.trim());
    if (category) p.set("category", category);
    if (stage) p.set("stage", stage);
    if (country) p.set("country", country);
    if (source) p.set("source", source);
    if (from) p.set("from", from);
    if (to) p.set("to", to);
    return p.toString();
  }, [view, q, category, stage, country, source, from, to]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch(`/api/admin/transportation?${query}`);
      if (!res.ok) throw new Error();
      setLeads((await res.json()).leads ?? []);
    } catch {
      setError("Couldn't load transportation leads.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0); // debounce typing only
    return () => clearTimeout(t);
  }, [load, q]);

  const open = async (id: string) => {
    const res = await adminFetch(`/api/admin/transportation/${id}`);
    if (res.ok) setSelected(await res.json());
  };

  const exportCsv = async () => {
    const res = await adminFetch(`/api/admin/transportation?${query}&format=csv`);
    if (!res.ok) return setError("Export failed.");
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `transportation-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rows = useMemo(
    () => leads.map((l) => ({ l, p: computePriority({ stage: l.stage, eventDate: l.eventDate, nextActionAt: l.nextActionAt, quoteDeadline: l.details?.quoteDeadline }) })),
    [leads],
  );
  const stats = {
    open: rows.filter((r) => !isClosedStage(r.l.stage)).length,
    urgent: rows.filter((r) => r.p.level === "urgent").length,
    feasibility: rows.filter((r) => r.l.stage === "route_review").length,
    awaitingQuote: rows.filter((r) => ["vendor_pending", "quote_prep"].includes(r.l.stage)).length,
  };

  return (
    <div className="mx-auto max-w-[1440px] pb-16 text-slate-800">
      <div className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-1 text-xl font-bold tracking-tight text-slate-900">Transportation leads</h1>
          <p className="text-sm text-slate-500">Chauffeur, cross-border and corporate transport enquiries from the SEM transportation form. Event enquiries stay in Pipeline.</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300">
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["Open", stats.open], ["Urgent", stats.urgent], ["Feasibility review", stats.feasibility], ["Awaiting quote", stats.awaitingQuote]].map(([k, v]) => (
          <div key={k as string} className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</p>
            <p className="text-2xl font-bold text-slate-900">{v}</p>
          </div>
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {VIEWS.map((v) => (
          <button key={v} onClick={() => { setView(v); setStage(""); }} className={`rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize ${view === v && !stage ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{v}</button>
        ))}
        <div className="relative ms-auto w-full sm:w-72">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, company, ref, route, phone, email…" aria-label="Search leads" className="w-full rounded-xl border border-slate-200 bg-white py-1.5 ps-8 pe-3 text-xs focus:border-emerald-400 focus:outline-none" />
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-6">
        <select aria-label="Service" className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All services</option>
          {Object.entries(SERVICE_CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select aria-label="Stage" className={inputCls} value={stage} onChange={(e) => setStage(e.target.value)}>
          <option value="">Any stage</option>
          {Object.entries(TRANSPORT_STAGE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input aria-label="Country" className={inputCls} placeholder="Country (e.g. Bahrain)" value={country} onChange={(e) => setCountry(e.target.value)} />
        <select aria-label="Form" className={inputCls} value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="">Any form</option>
          <option value="transportation_hub">Hub form</option>
          <option value="transport_request_a_quote">Request-a-quote page</option>
        </select>
        <input aria-label="Travel from" type="date" className={inputCls} value={from} onChange={(e) => setFrom(e.target.value)} />
        <input aria-label="Travel to" type="date" className={inputCls} value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      {error && <p role="alert" className="mb-3 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"><AlertTriangle size={14} /> {error}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[900px] text-left text-xs">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <tr>{["Priority", "Ref", "Customer", "Service · route", "Travel", "Stage", "Next action", "Quote"].map((h) => <th key={h} className="px-3 py-2.5">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && <tr><td colSpan={8} className="px-3 py-8 text-center text-slate-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && <tr><td colSpan={8} className="px-3 py-8 text-center text-slate-400">No transportation leads match these filters.</td></tr>}
            {rows.map(({ l, p }) => (
              <tr key={l.id} onClick={() => open(l.id)} className="cursor-pointer hover:bg-slate-50">
                <td className="px-3 py-2.5">{p.level !== "none" && <span title={p.reasons.join(" · ")} className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase ${PRIORITY_STYLE[p.level]}`}>{p.level}</span>}</td>
                <td className="px-3 py-2.5 font-mono">{l.leadRef ?? "—"}</td>
                <td className="px-3 py-2.5"><p className="font-semibold">{l.clientName}</p><p className="text-slate-400">{l.clientCompany}</p></td>
                <td className="px-3 py-2.5"><p>{SERVICE_CATEGORIES[l.serviceCategory as keyof typeof SERVICE_CATEGORIES]?.label ?? l.serviceCategory}</p><p className="text-slate-400">{route(l)}</p></td>
                <td className="px-3 py-2.5">{fmtDate(l.eventDate)}<p className="text-slate-400">{l.guestCount ?? "?"} pax</p></td>
                <td className="px-3 py-2.5">{TRANSPORT_STAGE_LABEL[l.stage] ?? label(l.stage)}</td>
                <td className="px-3 py-2.5"><p>{l.nextAction ?? "—"}</p><p className={l.nextActionAt && new Date(l.nextActionAt) < new Date() ? "font-semibold text-rose-600" : "text-slate-400"}>{fmtDate(l.nextActionAt)}</p></td>
                <td className="px-3 py-2.5">{l.quotedAmount ? `SAR ${Math.round(l.quotedAmount).toLocaleString()}` : l.proposals?.[0] ? `Draft v${l.proposals[0].version}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <LeadPanel lead={selected} onClose={() => setSelected(null)} onChanged={async () => { await load(); await open(selected.id); }} />}
    </div>
  );
}

function LeadPanel({ lead, onClose, onChanged }: { lead: Detail; onClose: () => void; onChanged: () => Promise<void> }) {
  const meta: QuoteMeta = lead.details?.quote ?? {};
  const [stage, setStage] = useState(lead.stage);
  const [lostReason, setLostReason] = useState(lead.lostReason ?? "");
  const [nextAction, setNextAction] = useState(lead.nextAction ?? "");
  const [nextActionAt, setNextActionAt] = useState(toInput(lead.nextActionAt));
  const [amount, setAmount] = useState(lead.quotedAmount?.toString() ?? "");
  const [quote, setQuote] = useState<QuoteMeta>({ currency: "SAR", ...meta });
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<(typeof UPDATE_KINDS)[number]>("note");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const wa = `https://wa.me/${lead.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${lead.clientName}, this is Saudi Event Management regarding your transportation enquiry ${lead.leadRef ?? ""}.`)}`;

  const run = async (fn: () => Promise<Response[]>) => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fn();
      const bad = res.find((r) => !r.ok);
      if (bad) setMsg((await bad.json().catch(() => ({}))).error || "Save failed.");
      else { setMsg("Saved."); await onChanged(); }
    } catch {
      setMsg("Save failed.");
    } finally {
      setBusy(false);
    }
  };
  const json = (b: unknown) => ({ method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) });

  const save = () =>
    run(async () => [
      await adminFetch(`/api/admin/pipeline/${lead.id}`, json({
        stage, lostReason: stage === "lost" ? lostReason : undefined, nextAction, nextActionAt: nextActionAt || null,
        quotedAmount: amount === "" ? null : Number(amount),
      })),
      await adminFetch(`/api/admin/transportation/${lead.id}`, json({ quoteMeta: quote })),
    ]);

  const addNote = () =>
    run(async () => [
      await adminFetch(`/api/admin/pipeline/${lead.id}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, summary: note, nextAction: nextAction || undefined, nextActionAt: nextActionAt || undefined }),
      }),
    ]).then(() => setNote(""));

  const att = lead.attribution ?? {};
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <aside role="dialog" aria-label="Lead detail" onClick={(e) => e.stopPropagation()} className="h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="font-mono text-xs text-slate-400">{lead.leadRef}</p>
            <h2 className="text-lg font-bold">{lead.clientName}</h2>
            <p className="text-xs text-slate-500">{lead.clientCompany} · {lead.clientEmail} · {lead.clientPhone}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 hover:bg-slate-100"><X size={16} /></button>
        </div>

        <a href={wa} target="_blank" rel="noopener noreferrer" className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"><MessageCircle size={13} /> WhatsApp customer</a>
        {lead.notifyStatus && lead.notifyStatus !== "sent" && <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs text-amber-800">Email notification status: {lead.notifyStatus}. A daily retry runs automatically.</p>}

        <pre className="mb-5 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">{lead.requirements}</pre>

        <section className="mb-5 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={fieldLabel} htmlFor="t-stage">Stage</label>
            <select id="t-stage" className={inputCls} value={stage} onChange={(e) => setStage(e.target.value)}>
              {stageFlow(lead.serviceCategory).map((s) => <option key={s} value={s}>{TRANSPORT_STAGE_LABEL[s]}</option>)}
            </select>
          </div>
          {stage === "lost" && (
            <div className="col-span-2">
              <label className={fieldLabel} htmlFor="t-lost">Lost reason</label>
              <select id="t-lost" className={inputCls} value={lostReason} onChange={(e) => setLostReason(e.target.value)}>
                <option value="">Select…</option>
                {LOST_REASONS.map((r) => <option key={r} value={r}>{label(r)}</option>)}
              </select>
            </div>
          )}
          <div><label className={fieldLabel} htmlFor="t-na">Next action</label><input id="t-na" className={inputCls} value={nextAction} onChange={(e) => setNextAction(e.target.value)} /></div>
          <div><label className={fieldLabel} htmlFor="t-nad">Follow-up date</label><input id="t-nad" type="date" className={inputCls} value={nextActionAt} onChange={(e) => setNextActionAt(e.target.value)} /></div>
        </section>

        <section className="mb-5 rounded-xl border border-slate-200 p-3">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Quotation</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={fieldLabel} htmlFor="t-amt">Quoted amount (incl. VAT)</label><input id="t-amt" inputMode="decimal" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
            <div><label className={fieldLabel} htmlFor="t-cur">Currency</label><input id="t-cur" maxLength={3} className={inputCls} value={quote.currency ?? ""} onChange={(e) => setQuote({ ...quote, currency: e.target.value.toUpperCase() })} /></div>
            <div><label className={fieldLabel} htmlFor="t-val">Valid until</label><input id="t-val" type="date" className={inputCls} value={quote.validUntil ?? ""} onChange={(e) => setQuote({ ...quote, validUntil: e.target.value })} /></div>
            <div>
              <label className={fieldLabel} htmlFor="t-prov">Provider status</label>
              <select id="t-prov" className={inputCls} value={quote.providerStatus ?? ""} onChange={(e) => setQuote({ ...quote, providerStatus: e.target.value })}>
                <option value="">—</option>
                {PROVIDER_STATUSES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            {(["inclusions", "exclusions", "paymentTerms", "cancellationTerms"] as const).map((k) => (
              <div key={k} className="col-span-2"><label className={fieldLabel} htmlFor={`t-${k}`}>{label(k.replace(/([A-Z])/g, " $1").toLowerCase())}</label><input id={`t-${k}`} className={inputCls} value={quote[k] ?? ""} onChange={(e) => setQuote({ ...quote, [k]: e.target.value })} /></div>
            ))}
          </div>
          <div className="mt-3 space-y-1 text-xs">
            {lead.proposals.map((p) => <p key={p.id}>{p.quoteNumber} · v{p.version} · {p.currency} {Math.round(p.totalAmount).toLocaleString()} · {p.status} (email {p.emailStatus})</p>)}
            {lead.vendorQuotes.map((v) => <p key={v.id} className="text-slate-500">Provider: {v.vendor.name} · {v.currency} {Math.round(v.vendorCost).toLocaleString()} · {v.status}</p>)}
            {lead.proposals.length === 0 && <p className="text-slate-400">No proposal yet.</p>}
          </div>
          <Link href="/admin/quote-wizard" className="mt-2 inline-block text-xs font-semibold text-emerald-700 underline">Prepare a formal quotation →</Link>
        </section>

        <div className="mb-5 flex items-center gap-3">
          <button disabled={busy || (stage === "lost" && !lostReason)} onClick={save} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">{busy ? "Saving…" : "Save changes"}</button>
          {msg && <span role="status" className="text-xs text-slate-500">{msg}</span>}
        </div>

        <section className="mb-5">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Add to timeline</h3>
          <div className="flex gap-2">
            <select aria-label="Entry type" className={`${inputCls} w-36`} value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
              {UPDATE_KINDS.filter((k) => k !== "status_change").map((k) => <option key={k} value={k}>{label(k)}</option>)}
            </select>
            <input aria-label="Note" className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What happened?" />
            <button disabled={busy || !note.trim()} onClick={addNote} className="rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white disabled:opacity-50">Add</button>
          </div>
          <ul className="mt-3 space-y-2 text-xs">
            {lead.updates.map((u) => <li key={u.id} className="border-s-2 border-slate-200 ps-3"><span className="font-semibold">{label(u.kind)}</span> · {u.author} · <span className="text-slate-400">{new Date(u.createdAt).toLocaleString("en-GB")}</span><p className="text-slate-600">{u.summary}</p></li>)}
          </ul>
        </section>

        <section className="text-xs text-slate-500">
          <h3 className="mb-1 text-xs font-bold uppercase tracking-wider">Attribution</h3>
          <p>Form: {lead.source} · Landing: {lead.landingPage ?? "—"} · Referrer: {lead.referrer ?? "—"}</p>
          <p>UTM: {[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || "—"}</p>
          <p>First touch: {att.first_touch?.landing_page ?? "—"} ({fmtDate(att.first_touch?.at)})</p>
        </section>
      </aside>
    </div>
  );
}
