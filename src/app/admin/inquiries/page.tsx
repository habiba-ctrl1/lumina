"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Calendar, User, Trash2, RefreshCw, Search } from "lucide-react";

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
      if (!data.error) setInquiries(data || []);
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
  const statuses = ["Pending", "Contacted", "Confirmed", "Cancelled"];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Client <span className="text-gold-500 font-semibold ">Inquiries</span>
          </h1>
          <p className="text-gray-500 text-sm">Manage leads and communication from your website.</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gold-500 shadow-lg"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-charcoal-800/50 border border-white/5 rounded-2xl p-4 mb-8 flex flex-col lg:flex-row gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-grow min-w-[300px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company, message..."
            className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-gold-500/30 transition-colors"
          />
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">From</span>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-charcoal-900 border border-white/10 rounded-xl py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-500/30"
          />
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">To</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-charcoal-900 border border-white/10 rounded-xl py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-500/30"
          />
        </div>

        <div className="flex gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Status</span>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-charcoal-900 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-500/30 transition-colors appearance-none min-w-[140px]"
            >
              <option value="all">All Statuses</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category</span>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-charcoal-900 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-500/30 transition-colors appearance-none min-w-[140px]"
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-charcoal-800/40 animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-24 bg-charcoal-800/30 rounded-2xl border border-white/5">
          <Mail size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">
            {search || status !== 'all' || category !== 'all' 
              ? "No matching inquiries found with current filters." 
              : "No inquiries received yet."}
          </p>
          {(search || status !== 'all' || category !== 'all' || startDate || endDate) && (
            <button 
              onClick={() => {setSearch(""); setStatus("all"); setCategory("all"); setStartDate(""); setEndDate("");}}
              className="mt-4 text-gold-500 text-sm hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((inquiry) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-charcoal-800 border border-white/5 p-6 rounded-2xl group hover:border-gold-500/30 transition-all duration-300 flex flex-col h-full relative"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                  inquiry.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                  inquiry.status === 'Contacted' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>
                  {inquiry.status || 'Pending'}
                </span>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium leading-none mb-1">{inquiry.name}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      {inquiry.event_type || 'General Inquiry'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={16} className="text-gold-500" />
                  <span className="truncate">{inquiry.email}</span>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <RefreshCw size={16} className="text-gold-500 rotate-90" />
                    <span>{inquiry.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Calendar size={16} className="text-gold-500" />
                  <span>{inquiry.event_date ? new Date(inquiry.event_date).toLocaleDateString() : 'TBD'}</span>
                </div>
              </div>

              <div className="bg-charcoal-900/50 p-4 rounded-xl border border-white/5 mb-6 flex-grow">
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{inquiry.message}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-600 uppercase font-bold tracking-tighter">Budget Range</span>
                  <span className="text-xs text-white font-medium">{inquiry.budget || 'Flexible'}</span>
                </div>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
