"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  User, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Send, 
  RefreshCw,
  Search,
  Filter,
  Users,
  MessageSquare,
  XCircle,
  TrendingUp
} from "lucide-react";

type Quote = {
  id: string;
  vendor_name: string;
  client_name: string;
  client_email: string;
  event_date: string;
  guest_count?: number;
  requirements?: string;
  status: string;
  price?: number | null;
  created_at: string;
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (id: string, updates: Partial<Quote>) => {
    setUpdatingId(id);
    try {
      const response = await fetch('/api/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      if (response.ok) {
        const updated = await response.json();
        setQuotes(quotes.map(q => q.id === id ? { ...q, ...updated } : q));
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Quote Requests
          </h1>
          <p className="text-slate-500 font-medium">Review and price vendor inquiries from your elite clientele.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchQuotes}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-white animate-pulse rounded-2xl border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 border-dashed shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No Requests Found</h3>
          <p className="text-slate-500 max-w-xs mx-auto font-medium">When clients request quotes for vendors, they will appear here for your review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {quotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all shadow-sm group"
            >
              <div className="p-8 flex flex-col lg:flex-row lg:items-center gap-10">
                {/* Client Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gold-50 text-gold-600 rounded-2xl flex items-center justify-center border border-gold-100 shadow-sm">
                      <User size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{quote.client_name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{quote.client_email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Calendar size={16} className="text-gold-500" />
                      <span>Event: {new Date(quote.event_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Users size={16} className="text-gold-500" />
                      <span>{quote.guest_count || 0} Guests expected</span>
                    </div>
                  </div>
                </div>

                {/* Vendor & Requirements */}
                <div className="lg:w-1/3 border-y lg:border-y-0 lg:border-x border-slate-100 py-8 lg:py-0 lg:px-10">
                  <div className="mb-6">
                    <span className="text-[11px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2 block">Vendor Assignment</span>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full" />
                      <h4 className="text-lg font-bold text-slate-900">{quote.vendor_name}</h4>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 relative">
                    <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <MessageSquare size={14} className="text-gold-500" /> Requirements
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{quote.requirements || 'No specific requirements provided.'}"</p>
                  </div>
                </div>

                {/* Pricing & Status */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      quote.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      quote.status === 'Quoted' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {quote.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      ID: #{quote.id.toString().substring(0, 8)}
                    </span>
                  </div>

                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gold-50 rounded-lg flex items-center justify-center text-gold-600 border border-gold-100 group-focus-within/input:bg-gold-500 group-focus-within/input:text-white transition-all">
                      <DollarSign size={16} />
                    </div>
                    <input 
                      type="number" 
                      placeholder="Quote Price"
                      defaultValue={quote.price || ""}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val) && val !== quote.price) {
                          updateQuote(quote.id, { price: val, status: 'Quoted' });
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-16 pr-4 py-4 text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400 placeholder:font-medium"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateQuote(quote.id, { status: 'Confirmed' })}
                      disabled={updatingId === quote.id}
                      className="flex-1 bg-emerald-500 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle2 size={14} />
                      Confirm
                    </button>
                    <button 
                      onClick={() => updateQuote(quote.id, { status: 'Cancelled' })}
                      disabled={updatingId === quote.id}
                      className="flex-1 bg-white border border-slate-200 text-slate-400 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <XCircle size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

