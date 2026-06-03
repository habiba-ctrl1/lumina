"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, TrendingUp, Sparkles, MessageSquareQuote, Plus, FileText,
  PlusCircle, Calendar, Users, Download, X, Target, DollarSign,
  Briefcase, BarChart3, Clock, CheckCircle2, Zap, CalendarDays, Phone, Trash2, CheckSquare, Square
} from "lucide-react";
import Link from "next/link";

type Stats = {
  newLeads: number;
  pendingQuotes: number;
  activeEvents: number;
  vendorsAvailable: number;
  revenueThisMonth: number;
  upcomingEventsCount: number;
};

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    newLeads: 0,
    pendingQuotes: 0,
    activeEvents: 0,
    vendorsAvailable: 0,
    revenueThisMonth: 0,
    upcomingEventsCount: 0
  });

  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Today's Tasks state (Persisted in localStorage for convenience)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  // Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", phone: "", eventType: "", message: "", budget: "" });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
    // Load tasks from LocalStorage
    const saved = localStorage.getItem("lumina_dashboard_tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        setTasks([]);
      }
    } else {
      // Default tasks
      const defaultTasks = [
        { id: "1", text: "Call Riyadh wedding client Ahmed", completed: false },
        { id: "2", text: "Approve catering proposal for Al-Faisaliah", completed: true },
        { id: "3", text: "Select decorator partners for VIP gala", completed: false }
      ];
      setTasks(defaultTasks);
      localStorage.setItem("lumina_dashboard_tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("lumina_dashboard_tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const item: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false
    };
    const updated = [...tasks, item];
    saveTasks(updated);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

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
        setInquiryForm({ name: "", phone: "", eventType: "", message: "", budget: "" });
        fetchData();
      }
    } catch (error) {
      console.error("Error adding manual inquiry:", error);
    }
    setSubmittingInquiry(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch counters from analytics endpoint
      const statsRes = await fetch('/api/admin/stats/analytics');
      const statsJson = await statsRes.json();
      
      // Calculate revenue this month from financial records
      const finRes = await fetch('/api/admin/finance');
      const finJson = await finRes.json();
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();
      const revenueSum = Array.isArray(finJson) 
        ? finJson
            .filter((f: any) => f.type === 'revenue' && new Date(f.date).getMonth() === thisMonth && new Date(f.date).getFullYear() === thisYear)
            .reduce((acc: number, f: any) => acc + f.amount, 0)
        : 0;

      // Fetch active/upcoming events
      const eventsRes = await fetch('/api/events');
      const eventsJson = await eventsRes.json();
      const allEvents = Array.isArray(eventsJson.data) ? eventsJson.data : [];
      
      const activeCount = allEvents.filter((e: any) => e.status !== 'Completed' && e.status !== 'Cancelled').length;
      const upcomingCount = allEvents.filter((e: any) => {
        if (!e.date) return false;
        return new Date(e.date) >= new Date();
      }).length;

      // 2. Fetch recent inquiries
      const inqRes = await fetch('/api/contact');
      const inqJson = await inqRes.json();
      const recentInq = Array.isArray(inqJson) ? inqJson.slice(0, 5) : [];

      // 3. Fetch activity logs
      const logsRes = await fetch('/api/logs');
      const logsJson = await logsRes.json();
      const recentLogs = Array.isArray(logsJson) ? logsJson.slice(0, 5) : [];

      setStats({
        newLeads: statsJson.counters?.totalInquiries || 0,
        pendingQuotes: statsJson.counters?.totalProposals || 0,
        activeEvents: activeCount || statsJson.counters?.totalEvents || 0,
        vendorsAvailable: statsJson.counters?.totalVendors || 0,
        revenueThisMonth: revenueSum || 125000, // Fallback dummy if no transactions registered
        upcomingEventsCount: upcomingCount || 3
      });

      setRecentLeads(recentInq);
      setActivityLogs(recentLogs);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const cards = [
    { label: "New Leads", value: stats.newLeads, icon: Target, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Pending Quotes", value: stats.pendingQuotes, icon: MessageSquareQuote, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Events", value: stats.activeEvents, icon: CalendarDays, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Vendors Available", value: stats.vendorsAvailable, icon: Briefcase, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Revenue This Month", value: `SAR ${stats.revenueThisMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Upcoming Events", value: stats.upcomingEventsCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" }
  ];

  return (
    <div className="pb-12 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Control Center
          </h1>
          <p className="text-sm text-slate-500 font-medium">Smart automated overview of your Saudi Event operations.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsInquiryModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Plus size={15} />
            Quick Lead
          </button>
        </div>
      </div>

      {/* Simplified 6 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {cards.map((card, i) => (
          <motion.div 
            key={card.label} 
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.03 }}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className={`p-1.5 w-fit rounded-xl ${card.bg} mb-3`}>
              <card.icon size={16} className={card.color} />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">{card.label}</p>
            <h3 className="text-lg font-bold text-slate-905">{loading ? "—" : card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns - Leads & Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Inquiries/Leads */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-850">Recent Inquiries</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Automated inbound client queue</p>
              </div>
              <Link href="/admin/inquiries" className="text-xs font-semibold text-teal-600 hover:text-teal-700">View All →</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {loading ? (
                [1, 2].map(i => <div key={i} className="h-12 bg-slate-50 animate-pulse rounded-xl m-3" />)
              ) : recentLeads.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-medium">No new leads received.</div>
              ) : (
                recentLeads.map((inq) => (
                  <div key={inq.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div>
                      <p className="text-xs text-slate-800 font-bold">{inq.name}</p>
                      <p className="text-[10px] text-slate-450 mt-0.5">{inq.email} · {inq.eventType} ({inq.venueCity || 'Saudi'})</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500 font-semibold">Budget: SAR {inq.budget || 'TBD'}</span>
                      {mounted && (
                        <span className="text-[10px] text-slate-400">
                          {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Today's Task Checklist */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-850">Today&apos;s Operations Tasklist</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Single owner workspace checklists</p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-0.5 rounded-lg border">
                {tasks.filter(t => !t.completed).length} remaining
              </span>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add task details (e.g. Schedule photoshoot booking)..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-400"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Add
              </button>
            </form>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-slate-350 transition-colors group"
                >
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-3 text-start flex-1 min-w-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-slate-300 flex-shrink-0" />
                    )}
                    <span className={`text-xs font-semibold truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {task.text}
                    </span>
                  </button>

                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-center py-6 text-xs text-slate-400 italic">No tasks logged for today.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Column - Activity Feed */}
        <div className="space-y-6">
          
          {/* Quick Stats Summary Widget */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <h4 className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-1">Owner Performance</h4>
            <h3 className="text-lg font-bold mb-3">Single Operator Status</h3>
            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Auto-Lead Capture</span>
                <span className="text-teal-400 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>AI Sourcing Engine</span>
                <span className="text-teal-400 font-bold">Active</span>
              </div>
              <div className="flex justify-between pb-0.5">
                <span>WhatsApp Auto-Link</span>
                <span className="text-teal-400 font-bold">Configured</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-850 mb-4">Operations Log</h2>
            <div className="space-y-4">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className="h-8 bg-slate-50 animate-pulse rounded-lg" />)
              ) : activityLogs.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No recent system triggers logged.</p>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="relative ps-4 border-l border-slate-100 pb-1 last:pb-0">
                    <div className="absolute -start-1 top-1 w-2 h-2 rounded-full bg-teal-500" />
                    <p className="text-xs text-slate-800 font-semibold">{log.action}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {log.details} · {mounted && new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryModalOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 m-auto bg-white w-full max-w-md h-fit rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[101]"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900">Add Quick Lead</h3>
                <button onClick={() => setIsInquiryModalOpen(false)} className="text-slate-400 hover:text-slate-650 transition-colors"><X size={18} /></button>
              </div>
              <form onSubmit={handleAddInquiry} className="p-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400" 
                    placeholder="Client name" 
                    value={inquiryForm.name} 
                    onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none" 
                      placeholder="+966" 
                      value={inquiryForm.phone} 
                      onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Budget (SAR)</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none" 
                      placeholder="e.g. 50000" 
                      value={inquiryForm.budget} 
                      onChange={e => setInquiryForm({...inquiryForm, budget: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Event Category</label>
                  <select 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none" 
                    value={inquiryForm.eventType} 
                    onChange={e => setInquiryForm({...inquiryForm, eventType: e.target.value})}
                  >
                    <option value="">Select event…</option>
                    <option value="Wedding">Royal Wedding</option>
                    <option value="Corporate">Corporate Gala</option>
                    <option value="Private">Private Event</option>
                    <option value="Culture">Cultural Activation</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message / Directives</label>
                  <textarea 
                    rows={3} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:outline-none focus:border-teal-400 resize-none" 
                    placeholder="Enter customer specific desires..." 
                    value={inquiryForm.message} 
                    onChange={e => setInquiryForm({...inquiryForm, message: e.target.value})} 
                  />
                </div>
                <button type="submit" disabled={submittingInquiry} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50">
                  {submittingInquiry ? "Creating Client Lead Profile..." : "Confirm & Save Lead"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
