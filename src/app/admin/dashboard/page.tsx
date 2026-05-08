"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, Mail, TrendingUp, Sparkles, MessageSquareQuote } from "lucide-react";
import Link from "next/link";

type Stats = {
  events: number;
  testimonials: number;
  inquiries: number;
  quotes: number;
};

type Quote = {
  id: number;
  clientName: string;
  clientEmail: string;
  details: string;
  status: string;
  createdAt: string;
  vendor: {
    name: string;
  };
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, testimonials: 0, inquiries: 0, quotes: 0 });
  const [recentInquiries, setRecentInquiries] = useState<{ id: string; name: string; email: string; created_at: string }[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusLabel, setStatusLabel] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statuses, setStatuses] = useState<{ id: string; text: string; label: string; created_at: string }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const handleAddStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus.trim() || updating) return;

    setUpdating(true);
    try {
      const { data, error } = await supabase
        .from("business_updates")
        .insert([{ text: newStatus, label: statusLabel }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setStatuses([data, ...statuses]);
        setNewStatus("");
      }
    } catch (error) {
      console.error("Error adding status:", error);
    }
    setUpdating(false);
  };

  const handleDeleteStatus = async (id: string) => {
    try {
      const { error } = await supabase.from("business_updates").delete().eq("id", id);
      if (error) throw error;
      setStatuses(statuses.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [eventsRes, testimonialsRes, inquiriesRes] = await Promise.all([
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);

      const { data: statusData } = await supabase
        .from("business_updates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      setStatuses(statusData || []);

      const { data: inqData } = await supabase
        .from("contact_messages")
        .select("id, name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentInquiries(inqData || []);

      // Fetch recent quotes from internal API
      const quotesRes = await fetch('/api/quotes');
      let quotesCount = 0;
      if (quotesRes.ok) {
        const quoteData = await quotesRes.json();
        setRecentQuotes(quoteData.slice(0, 5));
        quotesCount = quoteData.length;
      }

      setStats({
        events: eventsRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        inquiries: inquiriesRes.count || 0,
        quotes: quotesCount,
      });

    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Image, color: "from-blue-500/20 to-blue-600/5", iconColor: "text-blue-400", subtext: "All time records" },
    { label: "Pending Leads", value: stats.inquiries, icon: Mail, color: "from-amber-500/20 to-amber-600/5", iconColor: "text-amber-400", subtext: "Requires action" },
    { label: "Vendor Quotes", value: stats.quotes, icon: MessageSquareQuote, color: "from-emerald-500/20 to-emerald-600/5", iconColor: "text-emerald-400", subtext: "Active requests" },
    { label: "Business Status", value: statuses.length, icon: Sparkles, color: "from-purple-500/20 to-purple-600/5", iconColor: "text-purple-400", subtext: "Recent updates" },
  ];

  return (
    <div className="pb-20 max-w-[1600px] mx-auto px-4 md:px-10">
      <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-charcoal-800/20 backdrop-blur-3xl border border-white/5 p-10 md:p-14 rounded-[3rem] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-sans font-extrabold text-white mb-4 tracking-tight">
            Booking <span className="text-gold-500/90">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed font-medium">Welcome back. Experience the refined control center of Lumina events, optimized for clarity and high-end management.</p>
        </div>
        <div className="relative z-10 px-8 py-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] flex items-center gap-5 shadow-2xl">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black">System: Optimal</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={`bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[2.5rem] p-10 hover:border-gold-500/10 transition-all duration-700 group shadow-3xl relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
            
            <div className="relative z-10 flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className={`p-4 rounded-[1.5rem] bg-charcoal-900/40 border border-white/5 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700`}>
                  <card.icon size={22} className={card.iconColor} />
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{card.label}</p>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-5xl font-sans font-black text-white mb-4 tracking-tighter">
                {loading ? "—" : card.value}
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold opacity-40">{card.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Recent Inquiries & Quotes */}
        <div className="lg:col-span-2 space-y-16">
          {/* Quotes Section */}
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] overflow-hidden shadow-3xl">
            <div className="px-10 py-10 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Recent Vendor Quotes</h2>
                <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide">Monitor incoming requests from your professional network</p>
              </div>
              <Link href="/admin/quotes" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] text-gold-500 transition-all uppercase tracking-[0.3em] font-black border border-white/5">View All</Link>
            </div>
            {loading ? (
              <div className="p-10 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-white/[0.02] animate-pulse rounded-[2rem]" />
                ))}
              </div>
            ) : recentQuotes.length === 0 ? (
              <div className="p-20 text-center text-gray-600 flex flex-col items-center gap-6">
                <MessageSquareQuote size={50} className="opacity-10" />
                <p className="font-medium tracking-wide">No quotes received yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="px-10 py-8 flex items-center justify-between hover:bg-white/[0.02] transition-all group">
                    <div className="flex items-center gap-7">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gold-500/10 flex items-center justify-center text-gold-500 text-xl font-black border border-gold-500/20 shadow-2xl">
                        {quote.clientName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <p className="text-white text-lg font-bold tracking-tight">{quote.clientName}</p>
                          <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border font-black ${
                            quote.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            quote.status === "Rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                            "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1.5 font-medium">Requested for <span className="text-gray-300">{quote.vendor?.name}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-sm font-semibold tracking-wide">
                        {mounted ? new Date(quote.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "---"}
                      </p>
                      <button className="text-[9px] text-gold-500 uppercase tracking-[0.3em] font-black opacity-0 group-hover:opacity-100 transition-all mt-2 hover:scale-105">Review</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] overflow-hidden shadow-3xl">
            <div className="px-10 py-10 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <h2 className="text-2xl font-black text-white tracking-tight">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-[10px] text-gold-500 hover:text-gold-400 transition-all uppercase tracking-[0.3em] font-black">View All</Link>
            </div>
            {loading ? (
              <div className="p-10 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-white/[0.02] animate-pulse rounded-[1.5rem]" />
                ))}
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="p-20 text-center text-gray-600 font-medium tracking-wide">No inquiries yet.</div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="px-10 py-8 flex items-center justify-between hover:bg-white/[0.02] transition-all">
                    <div>
                      <p className="text-white text-base font-bold tracking-tight">{inq.name}</p>
                      <p className="text-gray-500 text-xs mt-1.5 font-medium">{inq.email}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      {mounted ? new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "---"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Status Updates */}
        <div className="space-y-16">
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/[0.05] rounded-[3rem] p-10 shadow-3xl">
            <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-5 tracking-tight">
              <Sparkles size={28} className="text-gold-500" />
              Pulse Update
            </h2>
            
            <form onSubmit={handleAddStatus} className="space-y-8">
              <div>
                <textarea 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="What's happening at Lumina today?"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 text-sm text-white focus:outline-none focus:border-gold-500/50 min-h-[150px] resize-none transition-all placeholder:text-gray-700 font-medium leading-relaxed shadow-inner"
                />
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-6 no-scrollbar">
                {["Active", "Milestone", "Success", "Planning"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStatusLabel(label)}
                    className={`px-6 py-3 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shrink-0 font-black border ${
                      statusLabel === label 
                      ? "bg-gold-500 text-charcoal-900 border-gold-500 shadow-3xl shadow-gold-500/20" 
                      : "bg-white/5 text-gray-600 hover:bg-white/10 border-white/5 hover:text-gray-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button 
                type="submit"
                disabled={updating}
                className="w-full py-5 bg-gold-500 text-charcoal-900 text-[10px] font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-gold-400 transition-all shadow-3xl shadow-gold-500/10 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              >
                {updating ? "Syncing..." : "Post Pulse"}
              </button>
            </form>

            <div className="mt-16 space-y-10">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-700 font-black mb-8">Activity Stream</h3>
              <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/[0.05]">
                {statuses.map((status) => (
                  <div key={status.id} className="relative pl-12 group/item">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-charcoal-950 border border-white/10 flex items-center justify-center shadow-3xl">
                      <div className={`w-2 h-2 rounded-full ${
                        status.label === "Success" ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : 
                        status.label === "Milestone" ? "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]" : 
                        status.label === "Planning" ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" : 
                        "bg-gold-500 shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                      }`} />
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-4">
                        <span className={`text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 rounded-xl border font-black ${
                          status.label === "Success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                          status.label === "Milestone" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                          status.label === "Planning" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                          "bg-gold-500/10 text-gold-400 border-gold-500/20"
                        }`}>
                          {status.label}
                        </span>
                        <button 
                          onClick={() => handleDeleteStatus(status.id)}
                          className="opacity-0 group-hover/item:opacity-100 text-[8px] text-red-500 uppercase tracking-[0.3em] font-black hover:text-red-400 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                      <span className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">
                        {mounted ? new Date(status.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "---"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-400 transition-colors">{status.text}</p>
                  </div>
                ))}
                {statuses.length === 0 && !loading && (
                  <p className="text-center text-gray-700 text-[10px] py-12 uppercase tracking-widest font-black">Pulse stream empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
