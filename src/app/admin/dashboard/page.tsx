"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, Mail, TrendingUp, Sparkles, MessageSquareQuote, Plus, Trash2, CheckCircle2, Clock, AlertCircle, BarChart3, PieChart as PieChartIcon, FileText, PlusCircle, Calendar, Users, Download, X } from "lucide-react";
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
  
  // Quick Actions & Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", phone: "", eventType: "", message: "" });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [activityLogs, setActivityLogs] = useState<{ id: string; action: string; details: string; createdAt: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, []);

  const handleAddInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingInquiry(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiryForm, source: "Manual Admin Entry" })
      });
      if (res.ok) {
        setIsInquiryModalOpen(false);
        setInquiryForm({ name: "", phone: "", eventType: "", message: "" });
        fetchStats(); // Refresh everything
      }
    } catch (error) {
      console.error("Error adding manual inquiry:", error);
    }
    setSubmittingInquiry(false);
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      
      // Filter for current month
      const now = new Date();
      const thisMonthData = data.filter((inq: any) => {
        const d = new Date(inq.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      const headers = ["Name", "Email", "Phone", "Event Type", "Date", "Source"];
      const csvContent = [
        headers.join(","),
        ...thisMonthData.map((inq: any) => [
          `"${inq.name}"`,
          `"${inq.email}"`,
          `"${inq.phone}"`,
          `"${inq.eventType}"`,
          `"${new Date(inq.createdAt).toLocaleDateString()}"`,
          `"${inq.source || 'direct'}"`
        ].join(","))
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `monthly_report_${now.toLocaleString('default', { month: 'short' })}_${now.getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      // 1. Fetch Overview Stats
      const overviewRes = await fetch('/api/admin/stats/overview');
      const overviewData = await overviewRes.json();
      
      setStats({
        events: overviewData.totalEvents || 0,
        testimonials: 0, // We can keep testimonials separate if needed, or add to overview
        inquiries: overviewData.pendingLeads || 0,
        quotes: overviewData.vendorQuotes || 0,
      });

      // 2. Fetch Recent Data
      const [inquiriesRes, quotesRes, logsRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/quotes'),
        fetch('/api/logs')
      ]);

      const inquiriesData = await inquiriesRes.json();
      const quotesData = await quotesRes.json();
      const logsData = await logsRes.json();

      setRecentInquiries((Array.isArray(inquiriesData) ? inquiriesData : []).slice(0, 5));
      setRecentQuotes((Array.isArray(quotesData) ? quotesData : []).slice(0, 5));
      
      // Pulse Updates count
      setStats(prev => ({ ...prev, pulse: overviewData.pulseUpdates || 0 }));

      // 3. Fetch Pipeline Stats
      const pipelineRes = await fetch('/api/admin/stats/pipeline');
      const pipelineDataRes = await pipelineRes.json();
      const pipelineArr = [
        { name: 'Inquiry', value: pipelineDataRes.inquiry },
        { name: 'Quoted', value: pipelineDataRes.quoted },
        { name: 'Booked', value: pipelineDataRes.booked },
        { name: 'Completed', value: pipelineDataRes.completed },
      ];
      setPipelineData(pipelineArr);

      // 4. Fetch Lead Sources
      const sourcesRes = await fetch('/api/admin/stats/lead-sources');
      const sourcesDataRes = await sourcesRes.json();
      const totalSources = sourcesDataRes.direct + sourcesDataRes.referral + sourcesDataRes.social + sourcesDataRes.other;
      
      if (totalSources > 0) {
        const sourceArr = [
          { name: 'Direct', value: Math.round((sourcesDataRes.direct / totalSources) * 100) },
          { name: 'Referral', value: Math.round((sourcesDataRes.referral / totalSources) * 100) },
          { name: 'Social', value: Math.round((sourcesDataRes.social / totalSources) * 100) },
          { name: 'Other', value: Math.round((sourcesDataRes.other / totalSources) * 100) },
        ].filter(s => s.value > 0);
        setSourceData(sourceArr);
      } else {
        setSourceData([]);
      }

      // Set Activity Logs (last 5)
      setActivityLogs((Array.isArray(logsData) ? logsData : []).slice(0, 5));

    } catch (error) {
      console.error("Error fetching stats:", error);
    }

    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Image, color: "bg-blue-50 text-blue-600", iconColor: "text-blue-500", subtext: "Managed records" },
    { label: "Pending Leads", value: stats.inquiries, icon: Mail, color: "bg-amber-50 text-amber-600", iconColor: "text-amber-500", subtext: "Requires action" },
    { label: "Vendor Quotes", value: stats.quotes, icon: MessageSquareQuote, color: "bg-emerald-50 text-emerald-600", iconColor: "text-emerald-500", subtext: "Active requests" },
    { label: "Pulse Updates", value: (stats as any).pulse ?? statuses.length, icon: Sparkles, color: "bg-purple-50 text-purple-600", iconColor: "text-purple-500", subtext: "Business status" },
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
          <div className="h-72 w-full flex items-center justify-center">
            {!loading && pipelineData.every(d => d.value === 0) ? (
              <div className="text-center">
                <BarChart3 size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium tracking-wide">No events yet. Start by adding your first event.</p>
              </div>
            ) : (
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
            )}
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
          <div className="h-72 w-full flex items-center justify-center">
            {!loading && sourceData.length === 0 ? (
              <div className="text-center">
                <PieChartIcon size={32} className="text-slate-200 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium tracking-wide">No lead data yet</p>
              </div>
            ) : (
              <>
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
              </>
            )}
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
          {/* Quick Actions Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Sparkles size={18} className="text-gold-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setIsInquiryModalOpen(true)}
                className="flex items-center gap-3 w-full p-4 bg-slate-50 hover:bg-gold-50 border border-slate-100 hover:border-gold-200 rounded-xl transition-all group"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-gold-500 group-hover:text-white transition-colors">
                  <PlusCircle size={18} />
                </div>
                <span className="text-xs font-bold text-slate-700">New Inquiry</span>
              </button>

              <Link 
                href="/admin/events/new"
                className="flex items-center gap-3 w-full p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl transition-all group"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Calendar size={18} />
                </div>
                <span className="text-xs font-bold text-slate-700">Add Event</span>
              </Link>

              <Link 
                href="/admin/inquiries"
                className="flex items-center gap-3 w-full p-4 bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-200 rounded-xl transition-all group"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Users size={18} />
                </div>
                <span className="text-xs font-bold text-slate-700">View All Leads</span>
              </Link>

              <button 
                onClick={handleExport}
                className="flex items-center gap-3 w-full p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl transition-all group"
              >
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Download size={18} />
                </div>
                <span className="text-xs font-bold text-slate-700">Export Report</span>
              </button>
            </div>

            <div className="mt-12 space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h3>
              <div className="space-y-6">
                {activityLogs.map((log) => (
                  <div key={log.id} className="relative pl-6 group">
                    <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-gold-500 transition-colors" />
                    <p className="text-xs text-slate-900 font-bold mb-0.5">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {log.details ? `${log.details} — ` : ""}
                      {mounted ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "---"}
                    </p>
                  </div>
                ))}
                
                {activityLogs.length === 0 && !loading && (
                  <div className="flex flex-col items-center py-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <AlertCircle size={24} className="text-slate-300 mb-2" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">
                      No recent activity. Activity will appear here as you use the system.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New Inquiry Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Add New Inquiry</h3>
              <button onClick={() => setIsInquiryModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddInquiry} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-gold-500 transition-all"
                  placeholder="Client name"
                  value={inquiryForm.name}
                  onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-gold-500 transition-all"
                  placeholder="+966"
                  value={inquiryForm.phone}
                  onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Type</label>
                <select 
                  required 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-gold-500 transition-all appearance-none"
                  value={inquiryForm.eventType}
                  onChange={e => setInquiryForm({...inquiryForm, eventType: e.target.value})}
                >
                  <option value="">Select event...</option>
                  <option value="Wedding">Royal Wedding</option>
                  <option value="Corporate">Corporate Gala</option>
                  <option value="Private">Private Event</option>
                  <option value="Culture">Cultural Activation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Notes</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-gold-500 transition-all resize-none"
                  placeholder="Internal notes about this lead..."
                  value={inquiryForm.message}
                  onChange={e => setInquiryForm({...inquiryForm, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={submittingInquiry}
                className="w-full py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50"
              >
                {submittingInquiry ? "Creating Lead..." : "Save Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
