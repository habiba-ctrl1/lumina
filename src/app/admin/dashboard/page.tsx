"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, MessageSquareQuote, Mail, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

type Stats = {
  events: number;
  testimonials: number;
  inquiries: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, testimonials: 0, inquiries: 0 });
  const [recentInquiries, setRecentInquiries] = useState<{ id: string; name: string; email: string; created_at: string }[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusLabel, setStatusLabel] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statuses, setStatuses] = useState<{ id: string; text: string; label: string; created_at: string }[]>([]);

  useEffect(() => {
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

      setStats({
        events: eventsRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        inquiries: inquiriesRes.count || 0,
      });

      const { data: statusData } = await supabase
        .from("business_updates")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      setStatuses(statusData || []);

      const { data } = await supabase
        .from("contact_messages")
        .select("id, name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentInquiries(data || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events + 24, icon: Image, color: "from-blue-500/20 to-blue-600/5", iconColor: "text-blue-400", subtext: "All time records" },
    { label: "Pending Leads", value: stats.inquiries, icon: Mail, color: "from-amber-500/20 to-amber-600/5", iconColor: "text-amber-400", subtext: "Requires action" },
    { label: "Confirmed Bookings", value: stats.events, icon: TrendingUp, color: "from-emerald-500/20 to-emerald-600/5", iconColor: "text-emerald-400", subtext: "Ready for execution" },
    { label: "Completed Events", value: 18, icon: Sparkles, color: "from-purple-500/20 to-purple-600/5", iconColor: "text-purple-400", subtext: "Successfully delivered" },
  ];

  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-charcoal-800 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-light text-white mb-2">
            Booking <span className="text-gold-500 font-semibold italic">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-sm">Overview of all your bookings, inquiries, and upcoming trips.</p>
        </div>
        <div className="relative z-10 px-4 py-2 bg-charcoal-900 border border-white/10 rounded-xl flex items-center gap-3 shadow-lg shadow-black/50">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-xs text-gray-300 uppercase tracking-widest font-bold">System Online</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-charcoal-800 border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300 group shadow-xl relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-charcoal-900 border border-white/5 shadow-inner`}>
                  <card.icon size={18} className={card.iconColor} />
                </div>
                <p className="text-sm font-medium text-gray-300">{card.label}</p>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-4xl font-display font-light text-white mb-2">
                {loading ? "—" : card.value}
              </p>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">{card.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-charcoal-800 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Recent Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-wider">View All</Link>
            </div>
            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-charcoal-900 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No inquiries yet.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="text-white text-sm font-medium">{inq.name}</p>
                      <p className="text-gray-500 text-xs">{inq.email}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      {new Date(inq.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats/Activity Graph Mockup */}
          <div className="bg-charcoal-800 border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp size={120} className="text-gold-500" />
             </div>
             <h2 className="text-lg font-medium text-white mb-6">Business Growth</h2>
             <div className="h-48 flex items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 space-y-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className="w-full bg-gradient-to-t from-gold-600/20 to-gold-500 rounded-t-lg"
                    />
                    <p className="text-[10px] text-gray-600 text-center">Day {i+1}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Status Updates */}
        <div className="space-y-8">
          <div className="bg-charcoal-800 border border-white/5 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-gold-500" />
              Status Update
            </h2>
            
            <form onSubmit={handleAddStatus} className="space-y-4">
              <div>
                <textarea 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="What's happening in your business?"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-gold-500/50 min-h-[100px] resize-none"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {["Active", "Milestone", "Success", "Planning"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStatusLabel(label)}
                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all ${
                      statusLabel === label 
                      ? "bg-gold-500 text-charcoal-900 font-bold" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button 
                type="submit"
                disabled={updating}
                className="w-full py-3 bg-gold-500 text-charcoal-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Posting..." : "Post Update"}
              </button>
            </form>

            <div className="mt-10 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold mb-4">Recent Updates</h3>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                {statuses.map((status) => (
                  <div key={status.id} className="relative pl-8 group/item">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-charcoal-900 border border-white/10 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${
                        status.label === "Success" ? "bg-emerald-500" : 
                        status.label === "Milestone" ? "bg-amber-500" : 
                        status.label === "Planning" ? "bg-blue-500" : "bg-gold-500"
                      }`} />
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded bg-white/5 ${
                          status.label === "Success" ? "text-emerald-400" : 
                          status.label === "Milestone" ? "text-amber-400" : 
                          status.label === "Planning" ? "text-blue-400" : "text-gold-400"
                        }`}>
                          {status.label}
                        </span>
                        <button 
                          onClick={() => handleDeleteStatus(status.id)}
                          className="opacity-0 group-hover/item:opacity-100 text-[8px] text-red-500 uppercase tracking-widest hover:text-red-400 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-600">
                        {new Date(status.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{status.text}</p>
                  </div>
                ))}
                {statuses.length === 0 && !loading && (
                  <p className="text-center text-gray-600 text-xs py-4">No updates posted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
