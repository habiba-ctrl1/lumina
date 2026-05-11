"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, Mail, TrendingUp, Sparkles, MessageSquareQuote, Plus, Trash2, CheckCircle2, Clock, AlertCircle, BarChart3, PieChart as PieChartIcon, FileText } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Link from "next/link";

type Stats = {
  events: number;
  testimonials: number;
  inquiries: number;
  quotes: number;
};

type Quote = {
  id: string;
  clientName: string;
  clientEmail: string;
  details: string;
  status: string;
  createdAt: string;
  vendor?: {
    name: string;
  };
  event?: {
    client?: {
      name: string;
    }
  }
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, testimonials: 0, inquiries: 0, quotes: 0 });
  const [recentInquiries, setRecentInquiries] = useState<{ id: string; name: string; email: string; createdAt: string }[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusLabel, setStatusLabel] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statuses, setStatuses] = useState<{ id: string; text: string; label: string; created_at: string }[]>([]);
  const [pipelineData, setPipelineData] = useState<{ name: string; value: number }[]>([]);
  const [sourceData, setSourceData] = useState<{ name: string; value: number }[]>([]);
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
      // Fetch stats from local APIs
      const [eventsRes, inquiriesRes, quotesRes, logsRes, testimonialsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/contact'),
        fetch('/api/quotes'),
        fetch('/api/logs'),
        fetch('/api/testimonials')
      ]);

      const eventsData = await eventsRes.json();
      const inquiriesData = await inquiriesRes.json();
      const quotesData = await quotesRes.json();
      const logsData = await logsRes.json();
      const testimonialsData = await testimonialsRes.json();

      setStats({
        events: eventsData.count || 0,
        testimonials: Array.isArray(testimonialsData) ? testimonialsData.length : 0,
        inquiries: Array.isArray(inquiriesData) ? inquiriesData.length : 0,
        quotes: Array.isArray(quotesData) ? quotesData.length : 0,
      });

      setRecentInquiries((Array.isArray(inquiriesData) ? inquiriesData : []).slice(0, 5));
      setRecentQuotes((Array.isArray(quotesData) ? quotesData : []).slice(0, 5));
      setStatuses(Array.isArray(logsData) ? logsData.map((l: any) => ({
        id: l.id,
        text: l.details || l.action,
        label: l.action,
        created_at: l.createdAt
      })) : []);

      // Fetch business updates with error handling
      try {
        const { data: statusData, error: statusError } = await supabase
          .from("business_updates")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);
        
        if (!statusError) setStatuses(statusData || []);
      } catch (e) {
        setStatuses([]);
      }

    } catch (error) {
      console.error("Error fetching stats:", error);
    }

    // Mock data for charts
    setPipelineData([
      { name: 'Inquiry', value: 12 },
      { name: 'Quoted', value: 8 },
      { name: 'Booked', value: 5 },
      { name: 'Completed', value: 20 },
    ]);

    setSourceData([
      { name: 'Direct', value: 45 },
      { name: 'Referral', value: 25 },
      { name: 'Social', value: 20 },
      { name: 'Other', value: 10 },
    ]);

    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Image, color: "bg-blue-50 text-blue-600", iconColor: "text-blue-500", subtext: "Managed records" },
    { label: "Pending Leads", value: stats.inquiries, icon: Mail, color: "bg-amber-50 text-amber-600", iconColor: "text-amber-500", subtext: "Requires action" },
    { label: "Vendor Quotes", value: stats.quotes, icon: MessageSquareQuote, color: "bg-emerald-50 text-emerald-600", iconColor: "text-emerald-500", subtext: "Active requests" },
    { label: "Pulse Updates", value: statuses.length, icon: Sparkles, color: "bg-purple-50 text-purple-600", iconColor: "text-purple-500", subtext: "Business status" },
  ];

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back, Admin. Here's what's happening with Saudi Event Management today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">System Live</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
          >
            <FileText size={14} className="text-gold-500" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color} transition-colors`}>
                <card.icon size={20} />
              </div>
              <TrendingUp size={16} className="text-slate-300" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {loading ? "—" : card.value}
              </h3>
              <p className="text-[11px] text-slate-400 mt-2 font-medium">{card.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <BarChart3 size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Event Pipeline</h2>
              <p className="text-xs text-slate-500 font-medium">Distribution of events by stage</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#EAB308" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <PieChartIcon size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Lead Sources</h2>
              <p className="text-xs text-slate-500 font-medium">Where your inquiries are coming from</p>
            </div>
          </div>
          <div className="h-72 w-full flex items-center">
            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#EAB308', '#0F172A', '#64748B', '#F1F5F9'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 pl-8">
              {sourceData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#EAB308', '#0F172A', '#64748B', '#F1F5F9'][i % 4] }} />
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quotes Section */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Vendor Quotes</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage and review incoming vendor proposals</p>
              </div>
              <Link href="/admin/quotes" className="text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors bg-gold-50 px-4 py-2 rounded-lg">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : recentQuotes.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquareQuote size={24} className="text-slate-300" />
                </div>
                <p className="text-slate-400 font-medium">No recent quotes found.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200">
                        {(quote.event?.client?.name || quote.clientName || "?").charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-slate-900 font-bold">{quote.event?.client?.name || quote.clientName}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                            quote.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            quote.status === "Rejected" ? "bg-red-50 text-red-600 border-red-100" :
                            "bg-amber-50 text-amber-600 border-amber-100"
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">For <span className="font-semibold text-slate-700">{quote.vendor?.name}</span></p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-xs font-bold text-slate-400">
                        {mounted ? new Date(quote.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "---"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inquiries Section */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Latest Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs font-bold text-gold-600 hover:text-gold-700">View All</Link>
            </div>
            
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-12 bg-slate-50 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : recentInquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-medium">No new inquiries.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-slate-900 font-bold text-sm">{inq.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{inq.email}</p>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {mounted ? new Date(inq.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "---"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          {/* Pulse Update Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gold-500 rounded-lg shadow-lg shadow-gold-500/20">
                <Sparkles size={18} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Post Update</h2>
            </div>
            
            <form onSubmit={handleAddStatus} className="space-y-6">
              <textarea 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder="What's the latest update?"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 min-h-[120px] resize-none transition-all placeholder:text-slate-400 font-medium"
              />
              
              <div className="flex flex-wrap gap-2">
                {["Active", "Milestone", "Success", "Planning"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStatusLabel(label)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                      statusLabel === label 
                      ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                      : "bg-white text-slate-500 hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
              <button 
                type="submit"
                disabled={updating}
                className="w-full py-4 bg-gold-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-600 transition-all shadow-lg shadow-gold-500/20 disabled:opacity-50 transform active:scale-95 flex items-center justify-center gap-2"
              >
                {updating ? <Clock size={16} className="animate-spin" /> : <Plus size={16} />}
                {updating ? "Syncing..." : "Publish Pulse"}
              </button>
            </form>

            <div className="mt-12 space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity Feed</h3>
              <div className="space-y-6">
                {statuses.map((status) => (
                  <div key={status.id} className="relative pl-6 group">
                    <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-gold-500 transition-colors" />
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${
                        status.label === "Success" ? "text-emerald-600" : 
                        status.label === "Milestone" ? "text-amber-600" : 
                        status.label === "Planning" ? "text-blue-600" : 
                        "text-gold-600"
                      }`}>
                        {status.label}
                      </span>
                      <button 
                        onClick={() => handleDeleteStatus(status.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium mb-1">{status.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {mounted ? new Date(status.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "---"}
                    </span>
                  </div>
                ))}
                
                {statuses.length === 0 && !loading && (
                  <div className="flex flex-col items-center py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <AlertCircle size={24} className="text-slate-300 mb-2" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Feed Empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
