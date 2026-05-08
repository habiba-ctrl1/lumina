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
  MessageSquare
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
      setQuotes(data);
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
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Quote <span className="text-gold-500 font-semibold ">Requests</span>
          </h1>
          <p className="text-gray-500 text-sm">Review and price vendor inquiries from clients.</p>
        </div>
        <button
          onClick={fetchQuotes}
          className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-gold-500"
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-charcoal-800 animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-24 bg-charcoal-800 rounded-2xl border border-white/5 border-dashed">
          <FileText size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">No quote requests found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {quotes.map((quote) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-charcoal-800 border border-white/5 rounded-2xl overflow-hidden hover:border-gold-500/20 transition-all group"
            >
              <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Client Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center text-gold-500">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{quote.client_name}</h3>
                      <p className="text-xs text-gray-500">{quote.client_email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar size={14} className="text-gold-500" />
                      <span>Event: {new Date(quote.event_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} className="text-gold-500" />
                      <span>{quote.guest_count || 0} Guests expected</span>
                    </div>
                  </div>
                </div>

                {/* Vendor & Requirements */}
                <div className="lg:w-1/3 border-y lg:border-y-0 lg:border-x border-white/5 py-6 lg:py-0 lg:px-8">
                  <div className="mb-4">
                    <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Selected Vendor</span>
                    <h4 className="text-gold-500 font-bold">{quote.vendor_name}</h4>
                  </div>
                  <div className="bg-charcoal-900/50 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-bold uppercase tracking-tighter">
                      <MessageSquare size={12} /> Requirements
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 italic">"{quote.requirements || 'No specific requirements provided.'}"</p>
                  </div>
                </div>

                {/* Pricing & Status */}
                <div className="lg:w-1/3 flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      quote.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                      quote.status === 'Quoted' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {quote.status}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500" />
                    <input 
                      type="number" 
                      placeholder="Enter Quote Price"
                      defaultValue={quote.price || ""}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val) && val !== quote.price) {
                          updateQuote(quote.id, { price: val, status: 'Quoted' });
                        }
                      }}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateQuote(quote.id, { status: 'Confirmed' })}
                      className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => updateQuote(quote.id, { status: 'Cancelled' })}
                      className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all"
                    >
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
