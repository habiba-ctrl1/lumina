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
  event_type?: string;
  budget?: string;
  event_date?: string;
  guest_count?: string;
  venue_city?: string;
  message: string;
  source?: string;
  status?: string;
  created_at: string;
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
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (!error) setInquiries(inquiries.filter((i) => i.id !== id));
  };

  const categories = ["Wedding", "Corporate", "Private", "Culture", "Other"];
  const statusOptions = ["Pending", "Contacted", "Confirmed", "Cancelled"];

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Client Inquiries
          </h1>
          <p className="text-slate-500 font-medium">Manage and respond to event leads from your elite network.</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="p-3 bg-white border border-slate-200 rounded-xl text-gold-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 font-bold text-xs uppercase tracking-wider disabled:opacity-50"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-10 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="relative flex-grow min-w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company, or message..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 text-sm font-bold focus:outline-none focus:border-gold-500 transition-all appearance-none min-w-[140px] cursor-pointer"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 text-sm font-bold focus:outline-none focus:border-gold-500 transition-all appearance-none min-w-[140px] cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Date Range</label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent py-2 px-2 text-slate-900 text-xs font-bold focus:outline-none"
                />
                <span className="text-slate-300">—</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent py-2 px-2 text-slate-900 text-xs font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-white animate-pulse rounded-3xl border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Inquiries Found</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 p-8 rounded-3xl group hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                  inquiry.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  inquiry.status === 'Contacted' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                  'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {inquiry.status || 'Pending'}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-2xl flex items-center justify-center border border-gold-100 shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-none mb-2">{inquiry.name}</h3>
                  <div className="flex items-center gap-2">
                    <Briefcase size={12} className="text-gold-500" />
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                      {inquiry.event_type || 'General Inquiry'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <Mail size={18} className="text-gold-500" />
                  <span className="truncate">{inquiry.email}</span>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <Phone size={18} className="text-gold-500" />
                    <span>{inquiry.phone}</span>
                  </div>
                )}
                {inquiry.company && (
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                    <Building2 size={18} className="text-gold-500" />
                    <span className="truncate">{inquiry.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <Calendar size={18} className="text-gold-500" />
                  <span>{inquiry.event_date ? new Date(inquiry.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8 flex-grow">
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-4 italic">"{inquiry.message}"</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Budget Allocation</span>
                  <span className="text-sm text-slate-900 font-extrabold">{inquiry.budget || 'To be discussed'}</span>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
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

