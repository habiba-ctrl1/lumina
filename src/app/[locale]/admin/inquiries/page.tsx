"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search, Phone, Building2, Briefcase, DollarSign, MapPin, Users2, Plus, Sparkles, X, Loader2 } from "lucide-react";
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

      {/* Inquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i: any) => (
            <div key={i} className="h-56 bg-white animate-pulse rounded-2xl border border-slate-200" />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {inquiries.map((inquiry: any) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200/80 p-5 rounded-2xl hover:border-emerald-400 hover:shadow-md transition-all duration-300 flex flex-col h-full relative"
            >
              <div className="absolute top-4 end-4">
                <select 
                  value={inquiry.status || 'Pending'}
                  onChange={async (e) => {
                    try {
                      await fetch(`/api/contact?id=${inquiry.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: e.target.value })
                      });
                      fetchInquiries();
                    } catch (err) {}
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border focus:outline-none cursor-pointer transition-all ${
                    inquiry.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    inquiry.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    inquiry.status === 'Cancelled' ? 'bg-red-50 text-red-650 border-red-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}
                >
                  <option value="Pending" className="bg-white text-slate-800">Pending</option>
                  <option value="Contacted" className="bg-white text-slate-800">Contacted</option>
                  <option value="Confirmed" className="bg-white text-slate-800">Confirmed</option>
                  <option value="Cancelled" className="bg-white text-slate-800">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 font-bold text-sm shadow-sm">
                  {inquiry.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-800 truncate max-w-[150px]">{inquiry.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {inquiry.eventType || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 mb-4 flex-1 text-xs text-slate-600">
                <div className="flex items-center gap-2 truncate">
                  <Mail size={12} className="text-slate-400" />
                  <span>{inquiry.email}</span>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-slate-400" />
                      <span>{inquiry.phone}</span>
                    </div>
                    <a 
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 font-bold"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
                {inquiry.company && (
                  <div className="flex items-center gap-2 truncate">
                    <Building2 size={12} className="text-slate-400" />
                    <span>{inquiry.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-slate-400" />
                  <span>{inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'Date TBD'}</span>
                </div>
                {inquiry.venueCity && (
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-slate-400" />
                    <span>{inquiry.venueCity}</span>
                  </div>
                )}
                {inquiry.guestCount && (
                  <div className="flex items-center gap-2">
                    <Users2 size={12} className="text-slate-400" />
                    <span>{inquiry.guestCount} Guests</span>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4 min-h-[50px] text-[11px] leading-relaxed text-slate-500 italic">
                "{inquiry.message}"
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Budget Limit</span>
                  <span className="text-xs text-slate-800 font-semibold">{inquiry.budget || 'TBD'}</span>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-650 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))}
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
