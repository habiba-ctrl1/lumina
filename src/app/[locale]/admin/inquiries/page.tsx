"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminFetch } from "@/lib/admin-fetch";
import { LANES, laneFor, nextStepFor, type LaneKey } from "@/lib/lead-lanes";
import { Mail, Calendar, Trash2, RefreshCw, Search, Phone, Building2, MapPin, Users2, Clock, Plus, Sparkles, X, Loader2, ChevronDown, MessageCircle, Zap, Archive } from "lucide-react";

const EMPTY_FORM = {
  name: "", phone: "", email: "", company: "",
  venueCity: "", eventType: "", eventDate: "", guestCount: "", budget: "", message: "",
};

type Inquiry = {
  id: string;
  refNumber?: string | null;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  eventType?: string;
  budget?: string;
  eventDate?: string;
  guestCount?: string;
  venueCity?: string;
  message: string;
  source?: string;
  status?: string;
  assignedTo?: string;
  createdAt: string;
};

const STATUS_TONE: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Contacted: "bg-sky-50 text-sky-700 border-sky-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-slate-100 text-slate-500 border-slate-200",
};

function ago(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  if (mins < 60 * 24) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [laneFilter, setLaneFilter] = useState<LaneKey | "all" | "quick">("all");
  const [showNotClient, setShowNotClient] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [audience, setAudience] = useState<"client" | "partner">("client");
  const [openId, setOpenId] = useState<string | null>(null);

  // ── Quick Add (manual WhatsApp/phone/email intake) ──────────────────────
  const [showAdd, setShowAdd] = useState(false);
  const [rawText, setRawText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const resetAdd = () => {
    setShowAdd(false);
    setRawText("");
    setForm({ ...EMPTY_FORM });
    setParsing(false);
    setSaving(false);
  };

  const extractDetails = async () => {
    if (!rawText.trim()) return;
    setParsing(true);
    try {
      const res = await adminFetch("/api/admin/quick-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parseOnly: true, raw: rawText }),
      });
      const json = await res.json();
      if (json.data) {
        // Keep anything the founder already typed; fill blanks from the parse.
        setForm((prev) => {
          const next = { ...prev };
          for (const k of Object.keys(EMPTY_FORM) as (keyof typeof EMPTY_FORM)[]) {
            if (!prev[k] && json.data[k]) next[k] = json.data[k];
          }
          return next;
        });
      }
    } catch (err) {
      console.error("Extract failed:", err);
      alert("Could not read the chat. You can still fill the fields manually.");
    } finally {
      setParsing(false);
    }
  };

  const saveLead = async () => {
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) {
      alert("Please add a name and at least a phone or email.");
      return;
    }
    setSaving(true);
    try {
      const res = await adminFetch("/api/admin/quick-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "whatsapp_manual" }),
      });
      const json = await res.json();
      if (res.ok) {
        resetAdd();
        fetchInquiries();
      } else {
        alert(json.error || "Failed to save lead");
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save lead");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiries();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, startDate, endDate, audience]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, status, category: "all", startDate, endDate, audience });
      const response = await adminFetch(`/api/contact?${params.toString()}`);
      const data = await response.json();
      if (!data.error) setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const setLeadStatus = async (id: string, next: string) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: next } : i)));
    try {
      await adminFetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
    } catch {
      fetchInquiries();
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry permanently? (Use Archive to keep a record.)")) return;
    try {
      const response = await adminFetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (response.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Failed to delete inquiry");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete inquiry");
    }
  };

  const statusOptions = ["Pending", "Contacted", "Confirmed", "Cancelled"];

  // Classify every lead once (display-only suggestion).
  const rows = useMemo(
    () => inquiries.map((i) => ({ i, lane: laneFor(i) })),
    [inquiries]
  );

  const laneCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const r of rows) {
      if (audience === "client" && r.lane.key === "not_client") continue;
      m[r.lane.key] = (m[r.lane.key] || 0) + 1;
    }
    return m;
  }, [rows, audience]);

  const notClientCount = useMemo(() => rows.filter((r) => r.lane.key === "not_client").length, [rows]);
  const quickWinCount = useMemo(
    () => rows.filter((r) => r.lane.quickWin && r.lane.key !== "not_client" && (r.i.status || "Pending") === "Pending").length,
    [rows]
  );

  const visible = rows.filter((r) => {
    if (audience === "client") {
      if (r.lane.key === "not_client" && !showNotClient && laneFilter !== "not_client") return false;
      if (laneFilter === "quick") return r.lane.quickWin && r.lane.key !== "not_client";
      if (laneFilter !== "all" && r.lane.key !== laneFilter) return false;
    }
    return true;
  });

  const kpi = useMemo(() => {
    const real = rows.filter((r) => r.lane.key !== "not_client");
    return {
      fresh: real.filter((r) => (r.i.status || "Pending") === "Pending").length,
      contacted: real.filter((r) => r.i.status === "Contacted").length,
      confirmed: real.filter((r) => r.i.status === "Confirmed").length,
    };
  }, [rows]);

  const filtersActive = !!(search || status !== "all" || startDate || endDate || laneFilter !== "all");
  const clearFilters = () => {
    setSearch(""); setStatus("all"); setStartDate(""); setEndDate(""); setLaneFilter("all");
  };

  return (
    <div className="pb-16 max-w-[1200px] mx-auto text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-5 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            {audience === "client" ? "Leads" : "Partner Inquiries"}
          </h1>
          <p className="text-sm text-slate-500">
            {audience === "client"
              ? "Every query sorted by service — handle the quick wins first."
              : "Suppliers who wrote to you — kept separate from client leads."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-1.5 font-semibold text-xs shadow-sm"
          >
            <Plus size={14} />
            Add Query
          </button>
          <button
            onClick={fetchInquiries}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 transition-all flex items-center gap-1.5 font-semibold text-xs disabled:opacity-50"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-emerald-600" : "text-emerald-600"} />
            Refresh
          </button>
        </div>
      </div>

      {/* Audience tabs */}
      <div className="flex gap-2 mb-4">
        {([
          { key: "client", label: "Client Leads" },
          { key: "partner", label: "Partner Inquiries" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setAudience(tab.key); setLaneFilter("all"); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              audience === tab.key
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {audience === "client" && (
        <>
          {/* At-a-glance numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "New — reply today", value: kpi.fresh, tone: "text-amber-600" },
              { label: "Quick wins waiting", value: quickWinCount, tone: "text-emerald-600" },
              { label: "In progress", value: kpi.contacted, tone: "text-sky-600" },
              { label: "Confirmed", value: kpi.confirmed, tone: "text-slate-900" },
            ].map((k) => (
              <div key={k.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className={`text-2xl font-bold ${k.tone}`}>{k.value}</div>
                <div className="text-[11px] font-semibold text-slate-500">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Service lanes */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
            <button
              onClick={() => setLaneFilter("all")}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                laneFilter === "all" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              All ({Object.entries(laneCounts).reduce((a, [, n]) => a + n, 0)})
            </button>
            <button
              onClick={() => setLaneFilter("quick")}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1 ${
                laneFilter === "quick" ? "bg-emerald-600 text-white border-emerald-600" : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400"
              }`}
            >
              <Zap size={11} /> Quick wins
            </button>
            {LANES.filter((l) => l.key !== "not_client" && laneCounts[l.key]).map((l) => (
              <button
                key={l.key}
                onClick={() => setLaneFilter(laneFilter === l.key ? "all" : l.key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  laneFilter === l.key ? "bg-slate-900 text-white border-slate-900" : `${l.tone} hover:brightness-95`
                }`}
              >
                {l.label} ({laneCounts[l.key]})
              </button>
            ))}
            {laneCounts.other ? (
              <button
                onClick={() => setLaneFilter(laneFilter === "other" ? "all" : "other")}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  laneFilter === "other" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"
                }`}
              >
                Other ({laneCounts.other})
              </button>
            ) : null}
          </div>
        </>
      )}

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 mb-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-grow min-w-[240px]">
            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, company, ref number…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 ps-9 pe-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-400 transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 h-[34px]">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-slate-700 text-xs font-semibold focus:outline-none [color-scheme:light]" />
              <span className="text-slate-400 text-xs">—</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-slate-700 text-xs font-semibold focus:outline-none [color-scheme:light]" />
            </div>
            {audience === "client" && notClientCount > 0 && (
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 cursor-pointer">
                <input type="checkbox" checked={showNotClient} onChange={(e) => setShowNotClient(e.target.checked)} className="accent-emerald-600" />
                Show spam / job seekers / pitches ({notClientCount})
              </label>
            )}
            {filtersActive && (
              <button onClick={clearFilters} className="text-[11px] font-bold text-emerald-700 hover:underline">Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-white animate-pulse rounded-2xl border border-slate-200" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Mail size={22} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800 mb-1">Nothing here</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {filtersActive ? "No leads match these filters." : "No leads yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map(({ i: inquiry, lane }) => {
            const st = inquiry.status || "Pending";
            const open = openId === inquiry.id;
            const wa = inquiry.phone ? `https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}` : null;
            return (
              <div
                key={inquiry.id}
                className={`bg-white border rounded-2xl shadow-sm transition-colors ${open ? "border-emerald-300" : "border-slate-200 hover:border-slate-300"} ${st === "Cancelled" ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-3 p-3.5 cursor-pointer" onClick={() => setOpenId(open ? null : inquiry.id)}>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-bold text-slate-900 truncate max-w-[220px]">{inquiry.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lane.tone}`}>{lane.label}</span>
                      {lane.quickWin && lane.key !== "not_client" && st === "Pending" && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5"><Zap size={10} />quick win</span>
                      )}
                      {inquiry.refNumber && <span className="text-[10px] text-slate-400 font-semibold">{inquiry.refNumber}</span>}
                      <span className="text-[10px] text-slate-400 ms-auto">{ago(inquiry.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{inquiry.message}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[11px] text-slate-500">
                      {inquiry.venueCity && <span className="flex items-center gap-1"><MapPin size={11} className="text-slate-400" />{inquiry.venueCity}</span>}
                      {inquiry.eventDate && <span className="flex items-center gap-1"><Calendar size={11} className="text-slate-400" />{inquiry.eventDate}</span>}
                      {inquiry.guestCount && <span className="flex items-center gap-1"><Users2 size={11} className="text-slate-400" />{inquiry.guestCount}</span>}
                      {inquiry.budget && <span className="font-semibold text-slate-700">{inquiry.budget}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100"
                        title="WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                    )}
                    <select
                      value={st}
                      onChange={(e) => setLeadStatus(inquiry.id, e.target.value)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer ${STATUS_TONE[st] || STATUS_TONE.Pending}`}
                    >
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {open && (
                  <div className="border-t border-slate-100 px-3.5 py-3 text-xs text-slate-600 space-y-3 bg-slate-50/60 rounded-b-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      <div className="flex items-center gap-2 truncate"><Mail size={12} className="text-slate-400" />{inquiry.email}</div>
                      {inquiry.phone && <div className="flex items-center gap-2"><Phone size={12} className="text-slate-400" />{inquiry.phone}</div>}
                      {inquiry.company && <div className="flex items-center gap-2 truncate"><Building2 size={12} className="text-slate-400" />{inquiry.company}</div>}
                      <div className="flex items-center gap-2"><Clock size={12} className="text-slate-400" />{new Date(inquiry.createdAt).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}</div>
                      {inquiry.source && <div className="text-slate-400">Source: {inquiry.source}</div>}
                      {inquiry.eventType && <div className="text-slate-400">Form type: {inquiry.eventType}</div>}
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed text-slate-600">{inquiry.message}</div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-500">Next: <span className="text-slate-800">{nextStepFor(inquiry.status, lane, !!inquiry.phone)}</span></span>
                      <div className="flex items-center gap-2">
                        {st !== "Cancelled" && (
                          <button onClick={() => setLeadStatus(inquiry.id, "Cancelled")} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 text-[11px] font-bold flex items-center gap-1">
                            <Archive size={12} /> Archive
                          </button>
                        )}
                        <button onClick={() => deleteInquiry(inquiry.id)} className="px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 text-[11px] font-bold flex items-center gap-1">
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}


      {/* Quick Add — paste a WhatsApp/email chat, auto-extract, review & save */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
            onClick={resetAdd}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-lg rounded-2xl shadow-xl my-8 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Add Query Manually</h2>
                  <p className="text-[11px] text-slate-500">Paste a WhatsApp or email chat — we'll fill the details for you.</p>
                </div>
                <button onClick={resetAdd} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Paste box */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Paste chat</label>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    rows={4}
                    placeholder="Paste the client's WhatsApp / email message here..."
                    className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 resize-none"
                  />
                  <button
                    onClick={extractDetails}
                    disabled={parsing || !rawText.trim()}
                    className="mt-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 disabled:opacity-40"
                  >
                    {parsing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} className="text-emerald-400" />}
                    Extract details
                  </button>
                </div>

                {/* Editable fields */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {([
                    { k: "name", label: "Name", ph: "Client name", full: false },
                    { k: "phone", label: "Phone / WhatsApp", ph: "+9665...", full: false },
                    { k: "email", label: "Email", ph: "optional", full: false },
                    { k: "company", label: "Company", ph: "optional", full: false },
                    { k: "eventType", label: "Event Type", ph: "Wedding, Corporate...", full: false },
                    { k: "venueCity", label: "City", ph: "Riyadh", full: false },
                    { k: "eventDate", label: "Event Date", ph: "e.g. 15 March 2026", full: false },
                    { k: "guestCount", label: "Guests", ph: "e.g. 200", full: false },
                    { k: "budget", label: "Budget", ph: "e.g. SAR 95,000", full: true },
                    { k: "message", label: "Requirements / Notes", ph: "Full message", full: true },
                  ] as const).map((f) => (
                    <div key={f.k} className={f.full ? "col-span-2" : ""}>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{f.label}</label>
                      {f.k === "message" ? (
                        <textarea
                          value={form[f.k]}
                          onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                          rows={2}
                          placeholder={f.ph}
                          className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={form[f.k]}
                          onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                          placeholder={f.ph}
                          className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-100 bg-slate-50">
                <button onClick={resetAdd} className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors">
                  Cancel
                </button>
                <button
                  onClick={saveLead}
                  disabled={saving}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                  Save to CRM
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
