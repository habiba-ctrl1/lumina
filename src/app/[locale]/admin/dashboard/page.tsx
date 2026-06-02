"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Image, Mail, TrendingUp, Sparkles, MessageSquareQuote, Plus, Trash2, CheckCircle2, Clock, AlertCircle, BarChart3, PieChart as PieChartIcon, FileText, PlusCircle, Calendar, Users, Download, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from "next/link";

type Stats = { events: number; testimonials: number; inquiries: number; quotes: number; pulse?: number };
type Quote = { id: string; clientName: string; clientEmail: string; details: string; status: string; createdAt: string; vendor?: { name: string }; event?: { client?: { name: string } } };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, testimonials: 0, inquiries: 0, quotes: 0 });
  const [recentInquiries, setRecentInquiries] = useState<{ id: string; name: string; email: string; createdAt: string }[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [pipelineData, setPipelineData] = useState<{ name: string; value: number }[]>([]);
  const [sourceData, setSourceData] = useState<{ name: string; value: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", phone: "", eventType: "", message: "" });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [activityLogs, setActivityLogs] = useState<{ id: string; action: string; details: string; createdAt: string }[]>([]);

  useEffect(() => { setMounted(true); fetchStats(); }, []);

  const handleAddInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingInquiry(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...inquiryForm, source: "Manual Admin Entry" }) });
      if (res.ok) { setIsInquiryModalOpen(false); setInquiryForm({ name: "", phone: "", eventType: "", message: "" }); fetchStats(); }
    } catch (error) { console.error("Error adding manual inquiry:", error); }
    setSubmittingInquiry(false);
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      const now = new Date();
      const thisMonthData = data.filter((inq: any) => { const d = new Date(inq.createdAt); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); });
      const headers = ["Name", "Email", "Phone", "Event Type", "Date", "Source"];
      const csvContent = [headers.join(","), ...thisMonthData.map((inq: any) => [`"${inq.name}"`, `"${inq.email}"`, `"${inq.phone}"`, `"${inq.eventType}"`, `"${new Date(inq.createdAt).toLocaleDateString()}"`, `"${inq.source || 'direct'}"`].join(","))].join("\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `report_${now.toLocaleString('default', { month: 'short' })}_${now.getFullYear()}.csv`);
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
    } catch (error) { console.error("Export failed:", error); }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const overviewRes = await fetch('/api/admin/stats/overview');
      const overviewData = await overviewRes.json();
      setStats({ events: overviewData.totalEvents || 0, testimonials: 0, inquiries: overviewData.pendingLeads || 0, quotes: overviewData.vendorQuotes || 0, pulse: overviewData.pulseUpdates || 0 });
      const [inquiriesRes, quotesRes, logsRes] = await Promise.all([fetch('/api/contact'), fetch('/api/quotes'), fetch('/api/logs')]);
      const inquiriesData = await inquiriesRes.json();
      const quotesData = await quotesRes.json();
      const logsData = await logsRes.json();
      setRecentInquiries((Array.isArray(inquiriesData) ? inquiriesData : []).slice(0, 5));
      setRecentQuotes((Array.isArray(quotesData) ? quotesData : []).slice(0, 5));
      const pipelineRes = await fetch('/api/admin/stats/pipeline');
      const pipelineDataRes = await pipelineRes.json();
      setPipelineData([{ name: 'Inquiry', value: pipelineDataRes.inquiry }, { name: 'Quoted', value: pipelineDataRes.quoted }, { name: 'Booked', value: pipelineDataRes.booked }, { name: 'Completed', value: pipelineDataRes.completed }]);
      const sourcesRes = await fetch('/api/admin/stats/lead-sources');
      const sourcesDataRes = await sourcesRes.json();
      const totalSources = sourcesDataRes.direct + sourcesDataRes.referral + sourcesDataRes.social + sourcesDataRes.other;
      if (totalSources > 0) {
        setSourceData([{ name: 'Direct', value: Math.round((sourcesDataRes.direct / totalSources) * 100) }, { name: 'Referral', value: Math.round((sourcesDataRes.referral / totalSources) * 100) }, { name: 'Social', value: Math.round((sourcesDataRes.social / totalSources) * 100) }, { name: 'Other', value: Math.round((sourcesDataRes.other / totalSources) * 100) }].filter(s => s.value > 0));
      } else { setSourceData([]); }
      setActivityLogs((Array.isArray(logsData) ? logsData : []).slice(0, 5));
    } catch (error) { console.error("Error fetching stats:", error); }
    setLoading(false);
  };

  const statCards = [
    { label: "Total Events", value: stats.events, icon: Image, accent: "text-blue-400 bg-blue-500/10", sub: "Managed records" },
    { label: "Pending Leads", value: stats.inquiries, icon: Mail, accent: "text-amber-400 bg-amber-500/10", sub: "Requires action" },
    { label: "Vendor Quotes", value: stats.quotes, icon: MessageSquareQuote, accent: "text-emerald-400 bg-emerald-500/10", sub: "Active requests" },
    { label: "Pulse Updates", value: stats.pulse ?? 0, icon: Sparkles, accent: "text-purple-400 bg-purple-500/10", sub: "Business status" },
  ];

  const PIE_COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];

  return (
    <div className="pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-slate-400 text-sm">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06]">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-medium text-slate-400">System Live</span>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-white font-medium text-xs rounded-lg hover:bg-white/[0.1] transition-all border border-white/[0.06]">
            <FileText size={13} className="text-amber-500" />
            Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.accent}`}><card.icon size={16} /></div>
              <TrendingUp size={14} className="text-slate-600" />
            </div>
            <p className="text-xs text-slate-400 mb-1">{card.label}</p>
            <h3 className="text-2xl font-bold text-white">{loading ? "—" : card.value}</h3>
            <p className="text-[11px] text-slate-500 mt-1">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Pipeline */}
        <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg"><BarChart3 size={15} /></div>
            <div>
              <h2 className="text-sm font-semibold text-white">Event Pipeline</h2>
              <p className="text-[11px] text-slate-500">Distribution by stage</p>
            </div>
          </div>
          <div className="h-60 w-full flex items-center justify-center">
            {!loading && pipelineData.every(d => d.value === 0) ? (
              <p className="text-xs text-slate-500">No events yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} dy={8} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0d1321', color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sources */}
        <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg"><PieChartIcon size={15} /></div>
            <div>
              <h2 className="text-sm font-semibold text-white">Lead Sources</h2>
              <p className="text-[11px] text-slate-500">Where inquiries come from</p>
            </div>
          </div>
          <div className="h-60 w-full flex items-center justify-center">
            {!loading && sourceData.length === 0 ? (
              <p className="text-xs text-slate-500">No lead data yet</p>
            ) : (
              <div className="flex items-center w-full">
                <div className="flex-1 h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={6} dataKey="value">
                        {sourceData.map((_, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % 4]} />))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#0d1321', color: '#fff', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3 pl-4">
                  {sourceData.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % 4] }} />
                        <span className="text-xs text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quotes */}
          <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Recent Vendor Quotes</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Review incoming vendor proposals</p>
              </div>
              <Link href="/admin/quotes" className="text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors">View All →</Link>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 bg-white/[0.02] animate-pulse rounded-lg" />)}</div>
            ) : recentQuotes.length === 0 ? (
              <div className="p-12 text-center"><MessageSquareQuote size={20} className="text-slate-600 mx-auto mb-2" /><p className="text-slate-500 text-sm">No recent quotes</p></div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300 font-semibold text-sm border border-white/[0.06]">
                        {(quote.event?.client?.name || quote.clientName || "?").charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-white text-sm font-medium">{quote.event?.client?.name || quote.clientName}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                            quote.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" :
                            quote.status === "Rejected" ? "bg-red-500/10 text-red-400" :
                            "bg-amber-500/10 text-amber-400"
                          }`}>{quote.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Vendor: <span className="text-slate-300">{quote.vendor?.name}</span></p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">{mounted ? new Date(quote.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "—"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inquiries */}
          <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Latest Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs font-medium text-amber-500 hover:text-amber-400">View All →</Link>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">{[1,2].map(i => <div key={i} className="h-12 bg-white/[0.02] animate-pulse rounded-lg" />)}</div>
            ) : recentInquiries.length === 0 ? (
              <div className="p-10 text-center text-slate-500 text-sm">No new inquiries</div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="px-6 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                      <p className="text-white text-sm font-medium">{inq.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{inq.email}</p>
                    </div>
                    <p className="text-[11px] text-slate-500">{mounted ? new Date(inq.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => setIsInquiryModalOpen(true)} className="flex items-center gap-3 w-full p-3 bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.06] hover:border-amber-500/20 rounded-lg transition-all group">
                <div className="p-1.5 bg-white/[0.06] rounded-md group-hover:bg-amber-500 group-hover:text-white transition-colors text-slate-400"><PlusCircle size={15} /></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">New Inquiry</span>
              </button>
              <Link href="/admin/events/new" className="flex items-center gap-3 w-full p-3 bg-white/[0.03] hover:bg-blue-500/10 border border-white/[0.06] hover:border-blue-500/20 rounded-lg transition-all group">
                <div className="p-1.5 bg-white/[0.06] rounded-md group-hover:bg-blue-500 group-hover:text-white transition-colors text-slate-400"><Calendar size={15} /></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Add Event</span>
              </Link>
              <Link href="/admin/inquiries" className="flex items-center gap-3 w-full p-3 bg-white/[0.03] hover:bg-purple-500/10 border border-white/[0.06] hover:border-purple-500/20 rounded-lg transition-all group">
                <div className="p-1.5 bg-white/[0.06] rounded-md group-hover:bg-purple-500 group-hover:text-white transition-colors text-slate-400"><Users size={15} /></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">View Leads</span>
              </Link>
              <button onClick={handleExport} className="flex items-center gap-3 w-full p-3 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/20 rounded-lg transition-all group">
                <div className="p-1.5 bg-white/[0.06] rounded-md group-hover:bg-emerald-500 group-hover:text-white transition-colors text-slate-400"><Download size={15} /></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Export CSV</span>
              </button>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-[#0d1321] border border-white/[0.06] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="relative pl-4 group">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                  <p className="text-xs text-white font-medium mb-0.5">{log.action}</p>
                  <p className="text-[10px] text-slate-500">{log.details ? `${log.details} · ` : ""}{mounted ? new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}</p>
                </div>
              ))}
              {activityLogs.length === 0 && !loading && (
                <div className="flex flex-col items-center py-6 text-center bg-white/[0.02] rounded-lg border border-dashed border-white/[0.06]">
                  <AlertCircle size={18} className="text-slate-600 mb-1.5" />
                  <p className="text-[11px] text-slate-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isInquiryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0d1321] w-full max-w-lg rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">
            <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Add New Inquiry</h3>
              <button onClick={() => setIsInquiryModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddInquiry} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Full Name</label>
                <input type="text" required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all placeholder:text-slate-600" placeholder="Client name" value={inquiryForm.name} onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Phone Number</label>
                <input type="tel" required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all placeholder:text-slate-600" placeholder="+966" value={inquiryForm.phone} onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Event Type</label>
                <select required className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all appearance-none" value={inquiryForm.eventType} onChange={e => setInquiryForm({...inquiryForm, eventType: e.target.value})}>
                  <option value="">Select event…</option>
                  <option value="Wedding">Royal Wedding</option>
                  <option value="Corporate">Corporate Gala</option>
                  <option value="Private">Private Event</option>
                  <option value="Culture">Cultural Activation</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Notes</label>
                <textarea rows={3} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500/40 transition-all resize-none placeholder:text-slate-600" placeholder="Internal notes…" value={inquiryForm.message} onChange={e => setInquiryForm({...inquiryForm, message: e.target.value})} />
              </div>
              <button type="submit" disabled={submittingInquiry} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm rounded-lg transition-all disabled:opacity-50">
                {submittingInquiry ? "Creating…" : "Save Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
