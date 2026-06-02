"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search, Phone, Building2, Briefcase } from "lucide-react";

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
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, category, startDate, endDate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, status, category, startDate, endDate });
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
    <div className="pb-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-1">
            Client Inquiries
          </h1>
          <p className="text-sm text-slate-400">Manage and respond to event leads from your elite network.</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="px-4 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-lg text-white transition-all flex items-center gap-2 font-medium text-xs disabled:opacity-50"
          disabled={loading}
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-amber-500" : "text-amber-500"} />
          Refresh
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow min-w-[300px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, company..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-amber-500/30 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider ml-1">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.06] rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-amber-500/30 transition-all min-w-[130px] cursor-pointer"
              >
                <option value="all" className="bg-[#0d1321]">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s} className="bg-[#0d1321]">{s}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider ml-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.06] rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-amber-500/30 transition-all min-w-[130px] cursor-pointer"
              >
                <option value="all" className="bg-[#0d1321]">All Categories</option>
                {categories.map(c => <option key={c} value={c} className="bg-[#0d1321]">{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider ml-1">Date Range</label>
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-2 h-[42px]">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-white text-xs focus:outline-none w-28 [color-scheme:dark]"
                />
                <span className="text-slate-600">—</span>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-white text-xs focus:outline-none w-28 [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-white/[0.02] animate-pulse rounded-xl border border-white/[0.04]" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 bg-[#0d1321] rounded-xl border border-white/[0.06]">
          <Mail size={24} className="text-slate-600 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-1">No Inquiries Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {search || status !== 'all' || category !== 'all' || startDate || endDate
              ? "We couldn't find any inquiries matching your filters." 
              : "You haven't received any inquiries yet."}
          </p>
          {(search || status !== 'all' || category !== 'all' || startDate || endDate) && (
            <button 
              onClick={() => {setSearch(""); setStatus("all"); setCategory("all"); setStartDate(""); setEndDate("");}}
              className="mt-6 text-amber-500 text-xs font-medium hover:text-amber-400 bg-amber-500/10 px-4 py-2 rounded-lg"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0d1321] border border-white/[0.06] p-6 rounded-xl group hover:border-white/[0.15] transition-all duration-300 flex flex-col h-full relative"
            >
              <div className="absolute top-5 right-5">
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
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold border focus:outline-none cursor-pointer transition-all ${
                    inquiry.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    inquiry.status === 'Contacted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    inquiry.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  <option value="Pending" className="bg-[#0d1321]">Pending</option>
                  <option value="Contacted" className="bg-[#0d1321]">Contacted</option>
                  <option value="Confirmed" className="bg-[#0d1321]">Confirmed</option>
                  <option value="Cancelled" className="bg-[#0d1321]">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-white/[0.04] text-slate-300 rounded-lg flex items-center justify-center border border-white/[0.06]">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white truncate max-w-[180px]">{inquiry.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Briefcase size={12} className="text-amber-500" />
                    <p className="text-[10px] text-slate-400">
                      {inquiry.eventType || 'General'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Mail size={14} className="text-slate-500" />
                  <span className="truncate">{inquiry.email}</span>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="text-slate-500" />
                      <span>{inquiry.phone}</span>
                    </div>
                    <a 
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 p-1 hover:bg-emerald-500/10 rounded"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
                {inquiry.company && (
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Building2 size={14} className="text-slate-500" />
                    <span className="truncate">{inquiry.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Calendar size={14} className="text-slate-500" />
                  <span>{inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'Date TBD'}</span>
                </div>
              </div>

              <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.04] mb-5 min-h-[60px]">
                <p className="text-slate-400 text-xs italic line-clamp-3">"{inquiry.message}"</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Budget</span>
                  <span className="text-xs text-white font-medium">{inquiry.budget || 'TBD'}</span>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="p-1.5 rounded text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
