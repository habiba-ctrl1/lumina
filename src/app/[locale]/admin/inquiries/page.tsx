"use client";

import { useEffect, useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search, Phone, Building2, Briefcase, DollarSign, MapPin, Users2, Plus, Sparkles, X, Loader2, Clock, ChevronDown, MessageSquare } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";

const EMPTY_FORM = {
  name: "", phone: "", email: "", company: "",
  venueCity: "", eventType: "", eventDate: "", guestCount: "", budget: "", message: "",
};

type Inquiry = {
  id: string;
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

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [audience, setAudience] = useState<"client" | "partner">("client");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
  }, [search, status, category, startDate, endDate, audience]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, status, category, startDate, endDate, audience });
      const response = await fetch(`/api/contact?${params.toString()}`);
      const data = await response.json();
      if (!data.error) setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      const response = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setInquiries(inquiries.filter((i) => i.id !== id));
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Failed to delete inquiry");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete inquiry");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const statusClasses = (s?: string) =>
    s === "Confirmed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    s === "Contacted" ? "bg-blue-50 text-blue-700 border-blue-200" :
    s === "Cancelled" ? "bg-red-50 text-red-600 border-red-200" :
    "bg-amber-50 text-amber-700 border-amber-200";

  const categories = ["Wedding", "Corporate", "Private", "Culture", "Other"];
  const statusOptions = ["Pending", "Contacted", "Confirmed", "Cancelled"];

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            {audience === "client" ? "Lead Management" : "Partner Inquiries"}
          </h1>
          <p className="text-sm text-slate-500">
            {audience === "client"
              ? "Qualify, segment, and respond to incoming event leads."
              : "Suppliers and partners who want to work with you — kept separate from client leads."}
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

      {/* Audience Tabs — separate client leads from vendor/partner inquiries */}
      <div className="flex gap-2 mb-5">
        {([
          { key: "client", label: "Client Leads" },
          { key: "partner", label: "Partner Inquiries" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAudience(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              audience === tab.key
                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-grow min-w-[280px]">
            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, email, company..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 ps-9 pe-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-400 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 items-center justify-end">
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer min-w-[120px]"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((s: any) => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-700 text-xs font-semibold focus:outline-none focus:border-emerald-400 cursor-pointer min-w-[130px]"
            >
              <option value="all">All Categories</option>
              {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
            </select>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 h-[34px]">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-slate-700 text-xs font-semibold focus:outline-none w-26 [color-scheme:light]"
              />
              <span className="text-slate-400 text-xs">—</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-slate-700 text-xs font-semibold focus:outline-none w-26 [color-scheme:light]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      {!loading && inquiries.length > 0 && (
        <p className="text-xs text-slate-500 mb-2 px-1">
          Showing <span className="font-bold text-slate-700">{inquiries.length}</span>{" "}
          {audience === "client" ? "client lead" : "partner inquiry"}{inquiries.length === 1 ? "" : "s"}
        </p>
      )}

      {/* Inquiries List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((i: any) => (
            <div key={i} className="h-16 animate-pulse bg-slate-50/60" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <Mail size={22} className="text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Leads Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {search || status !== 'all' || category !== 'all' || startDate || endDate
              ? "We couldn't find any leads matching your filters."
              : "You haven't received any leads yet."}
          </p>
          {(search || status !== 'all' || category !== 'all' || startDate || endDate) && (
            <button
              onClick={() => {setSearch(""); setStatus("all"); setCategory("all"); setStartDate(""); setEndDate("");}}
              className="mt-4 text-emerald-600 text-xs font-bold hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-left">
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Name / Contact</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">Event</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden lg:table-cell">Date &amp; City</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Budget</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry: any) => {
                  const isOpen = expandedId === inquiry.id;
                  const waNumber = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
                  return (
                    <Fragment key={inquiry.id}>
                      <tr
                        className="hover:bg-slate-50/70 transition-colors align-middle"
                      >
                        {/* Name / Contact */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 shrink-0 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 font-bold text-sm">
                              {(inquiry.name || "?").charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate max-w-[220px]">{inquiry.name}</p>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate max-w-[220px]">
                                <Mail size={11} className="text-slate-400 shrink-0" />
                                <span className="truncate">{inquiry.email || "—"}</span>
                              </div>
                              {inquiry.phone && (
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                                  <Phone size={11} className="text-slate-400 shrink-0" />
                                  <span>{inquiry.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Event */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {inquiry.eventType || "General"}
                          </span>
                          {inquiry.guestCount && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                              <Users2 size={11} /> {inquiry.guestCount} guests
                            </div>
                          )}
                        </td>

                        {/* Date & City */}
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
                            <Calendar size={11} className="text-slate-400" />
                            {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : "Date TBD"}
                          </div>
                          {inquiry.venueCity && (
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                              <MapPin size={11} /> {inquiry.venueCity}
                            </div>
                          )}
                        </td>

                        {/* Budget */}
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-[12px] font-semibold text-slate-700">{inquiry.budget || "TBD"}</span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <select
                            value={inquiry.status || "Pending"}
                            onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none transition-all ${statusClasses(inquiry.status)}`}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s} className="bg-white text-slate-800">{s}</option>
                            ))}
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {waNumber && (
                              <a
                                href={`https://wa.me/${waNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open WhatsApp"
                                className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                              >
                                <MessageSquare size={15} />
                              </a>
                            )}
                            <button
                              onClick={() => setExpandedId(isOpen ? null : inquiry.id)}
                              title="View details"
                              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                            >
                              <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            <button
                              onClick={() => deleteInquiry(inquiry.id)}
                              title="Delete"
                              className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      {isOpen && (
                        <tr className="bg-slate-50/60">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <Detail icon={Clock} label="Submitted" value={inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—"} />
                              <Detail icon={Building2} label="Company" value={inquiry.company || "—"} />
                              <Detail icon={Users2} label="Guests" value={inquiry.guestCount || "—"} />
                              <Detail icon={DollarSign} label="Budget" value={inquiry.budget || "TBD"} />
                              <Detail icon={Calendar} label="Event Date" value={inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : "TBD"} />
                              <Detail icon={MapPin} label="City" value={inquiry.venueCity || "—"} />
                              <Detail icon={Briefcase} label="Event Type" value={inquiry.eventType || "General"} />
                              <Detail icon={Mail} label="Source" value={inquiry.source || "website"} />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Message / Requirements</p>
                              <div className="bg-white border border-slate-200 rounded-xl p-3 text-[13px] text-slate-600 leading-relaxed">
                                {inquiry.message || "No message provided."}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
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

function Detail({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
        <Icon size={11} /> {label}
      </p>
      <p className="text-[13px] font-medium text-slate-700 break-words">{value}</p>
    </div>
  );
}
