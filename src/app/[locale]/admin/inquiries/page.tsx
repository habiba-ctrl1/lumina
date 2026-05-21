"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search, Filter, Phone, Building2, MapPin, Briefcase } from "lucide-react";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInquiries();
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [search, status, category, startDate, endDate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        status,
        category,
        startDate,
        endDate,
      });
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
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const categories = ["Wedding", "Corporate", "Private", "Culture", "Other"];
  const statusOptions = ["Pending", "Contacted", "Confirmed", "Cancelled"];

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10">
        <div>
          <h1 className="text-2xl font-bold text-sand-50 tracking-tight mb-2">
            Client Inquiries
          </h1>
          <p className="text-sand-300 font-medium">Manage and respond to event leads from your elite network.</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="p-3 bg-ink-800 border border-ink-600 rounded-xl text-gold-600 hover:bg-ink-950 transition-all shadow-sm flex items-center gap-2 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-ink-800 border border-ink-600 rounded-2xl p-6 mb-10 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Search */}
          <div className="relative flex-grow min-w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, or message..."
              className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 pl-12 pr-4 text-sand-50 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-sand-400"
            />
          </div>

          <div className="flex flex-wrap gap-10 items-end">
            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-sand-400 uppercase font-black tracking-widest px-1">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sand-50 text-sm font-bold focus:outline-none focus:border-gold-500 transition-all appearance-none min-w-[140px] cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-sand-400 uppercase font-black tracking-widest px-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sand-50 text-sm font-bold focus:outline-none focus:border-gold-500 transition-all appearance-none min-w-[140px] cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-sand-400 uppercase font-black tracking-widest px-1">Date Range</label>
              <div className="flex items-center gap-2 bg-ink-950 border border-ink-600 rounded-xl p-1">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent py-2 px-2 text-sand-50 text-xs font-bold focus:outline-none"
                />
                <span className="text-sand-500">—</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent py-2 px-2 text-sand-50 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-ink-800 animate-pulse rounded-3xl border border-ink-600 shadow-sm" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-32 bg-ink-800 rounded-3xl border border-ink-600 shadow-sm">
          <div className="w-20 h-20 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail size={32} className="text-sand-500" />
          </div>
          <h3 className="text-xl font-bold text-sand-50 mb-2">No Inquiries Found</h3>
          <p className="text-sand-300 max-w-sm mx-auto font-medium">
            {search || status !== 'all' || category !== 'all' 
              ? "We couldn't find any inquiries matching your current filters." 
              : "You haven't received any client inquiries yet."}
          </p>
          {(search || status !== 'all' || category !== 'all' || startDate || endDate) && (
            <button 
              onClick={() => {setSearch(""); setStatus("all"); setCategory("all"); setStartDate(""); setEndDate("");}}
              className="mt-8 text-gold-600 font-bold text-sm hover:text-gold-700 transition-colors bg-gold-50 px-6 py-2 rounded-xl"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-ink-800 border border-ink-600 p-8 rounded-3xl group hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Status Dropdown */}
              <div className="absolute top-6 right-6">
                <select 
                  value={inquiry.status || 'Pending'}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      await fetch(`/api/contact?id=${inquiry.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: newStatus })
                      });
                      fetchInquiries();
                    } catch (err) {
                      console.error("Status update failed:", err);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border focus:outline-none cursor-pointer transition-all ${
                    inquiry.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    inquiry.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    inquiry.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-10 mb-8">
                <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-2xl flex items-center justify-center border border-gold-100 shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-sand-50 leading-none mb-2">{inquiry.name}</h3>
                  <div className="flex items-center gap-2">
                    <Briefcase size={12} className="text-gold-500" />
                    <p className="text-[10px] text-sand-400 uppercase tracking-widest font-black">
                      {inquiry.eventType || 'General Inquiry'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm font-semibold text-sand-200">
                  <Mail size={18} className="text-gold-500" />
                  <span className="truncate">{inquiry.email}</span>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-sand-200">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gold-500" />
                      <span>{inquiry.phone}</span>
                    </div>
                    <a 
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=Hello ${inquiry.name}, this is Saudi Event Management regarding your inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 hover:text-emerald-600 transition-colors p-1.5 bg-emerald-50 rounded-lg border border-emerald-100"
                      title="Contact on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                  </div>
                )}
                {inquiry.company && (
                  <div className="flex items-center gap-3 text-sm font-semibold text-sand-200">
                    <Building2 size={18} className="text-gold-500" />
                    <span className="truncate">{inquiry.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm font-semibold text-sand-200">
                  <Calendar size={18} className="text-gold-500" />
                  <span>{inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}</span>
                </div>
              </div>

              <div className="bg-ink-950 p-5 rounded-2xl border border-ink-500 mb-8 flex-grow">
                <p className="text-sand-300 text-sm leading-relaxed font-medium line-clamp-4 italic">"{inquiry.message}"</p>
              </div>

              <div className="mb-8 space-y-2">
                <label className="text-[10px] text-sand-400 uppercase font-black tracking-widest px-1">Lead Allocation</label>
                <select 
                  value={inquiry.assignedTo || ""}
                  onChange={async (e) => {
                    const newAssignee = e.target.value;
                    try {
                      await fetch(`/api/contact?id=${inquiry.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ assignedTo: newAssignee })
                      });
                      fetchInquiries();
                    } catch (err) {
                      console.error("Assignment failed:", err);
                    }
                  }}
                  className="w-full bg-ink-800 border border-ink-500 rounded-xl py-2.5 px-3 text-xs font-bold text-sand-100 focus:outline-none focus:border-gold-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  <option value="Admin">Admin Team</option>
                  <option value="Sarah">Sarah (VIP Relations)</option>
                  <option value="Ahmed">Ahmed (Logistics)</option>
                  <option value="Nora">Nora (Creative Director)</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-ink-500">
                <div className="flex flex-col">
                  <span className="text-[9px] text-sand-400 uppercase font-black tracking-widest mb-1">Budget Allocation</span>
                  <span className="text-sm text-sand-50 font-extrabold">{inquiry.budget || 'To be discussed'}</span>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sand-500 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                  title="Delete Inquiry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

