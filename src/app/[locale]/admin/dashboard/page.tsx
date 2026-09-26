"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, FileText, Calendar, X, Target, DollarSign,
  Briefcase, Clock, CheckCircle2, CalendarDays, Trash2, AlertCircle,
  ListChecks, BarChart3, Bot, ArrowRight, Inbox, XCircle,
} from "lucide-react";
import Link from "next/link";
import MetricCard from "@/components/admin/MetricCard";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";

type Stats = {
  newLeads: number;
  pendingQuoteRequests: number;
  failedQuoteEmails: number;
  todaysMeetings: number;
  activeEvents: number;
  upcomingEventsCount: number;
  revenueThisMonth: number;
  vendorsAvailable: number;
  actionNeededTotal: number;
};

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const EMPTY_STATS: Stats = {
  newLeads: 0,
  pendingQuoteRequests: 0,
  failedQuoteEmails: 0,
  todaysMeetings: 0,
  activeEvents: 0,
  upcomingEventsCount: 0,
  revenueThisMonth: 0,
  vendorsAvailable: 0,
  actionNeededTotal: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Today's local notes — device-local convenience list, NOT synced/shared
  // operational data. See EmptyState/copy below; kept as localStorage on
  // purpose (the real, database-backed Task module is a separate phase).
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: "", phone: "", eventType: "", message: "", budget: "" });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
    const saved = localStorage.getItem("saudieventmanagement_dashboard_tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch {
        setTasks([]);
      }
    }
    // No seeded sample tasks — an empty list is more honest than fake names.
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("saudieventmanagement_dashboard_tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const item: Task = { id: Date.now().toString(), text: newTaskText.trim(), completed: false };
    saveTasks([...tasks, item]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
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
      const [statsRes, finRes, eventsRes, inqRes, logsRes, quoteReqRes, proposalsRes, meetingsRes, actionRes] = await Promise.all([
        adminFetch('/api/admin/stats/analytics'),
        adminFetch('/api/admin/finance'),
        adminFetch('/api/events'),
        adminFetch('/api/contact?audience=client'),
        adminFetch('/api/logs'),
        adminFetch('/api/admin/quote-requests'),
        adminFetch('/api/admin/proposals'),
        adminFetch('/api/admin/meetings'),
        adminFetch('/api/admin/action-needed'),
      ]);

      const statsJson = await statsRes.json();
      const finJson = await finRes.json();
      const eventsJson = await eventsRes.json();
      const inqJson = await inqRes.json();
      const logsJson = await logsRes.json();
      const quoteReqJson = await quoteReqRes.json();
      const proposalsJson = await proposalsRes.json();
      const meetingsJson = await meetingsRes.json();
      const actionJson = await actionRes.json();

      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();
      const revenueSum = Array.isArray(finJson)
        ? finJson
            .filter((f: any) => f.type === 'revenue' && new Date(f.date).getMonth() === thisMonth && new Date(f.date).getFullYear() === thisYear)
            .reduce((acc: number, f: any) => acc + f.amount, 0)
        : 0;

      const allEvents = Array.isArray(eventsJson.data) ? eventsJson.data : [];
      const activeCount = allEvents.filter((e: any) => e.status !== 'Completed' && e.status !== 'Cancelled').length;
      const upcomingCount = allEvents.filter((e: any) => e.date && new Date(e.date) >= new Date()).length;

      const recentInq = Array.isArray(inqJson) ? inqJson.slice(0, 5) : [];
      const recentLogs = Array.isArray(logsJson) ? logsJson.slice(0, 5) : [];

      const proposals = Array.isArray(proposalsJson) ? proposalsJson : [];
      const failedEmails = proposals.filter((p: any) => p.emailStatus === 'failed').length;

      const now = new Date();
      const meetings = Array.isArray(meetingsJson.data) ? meetingsJson.data : [];
      const todaysMeetings = meetings.filter((m: any) => {
        if (m.status !== 'Scheduled') return false;
        const d = new Date(m.startTime);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
      }).length;

      setStats({
        newLeads: statsJson.counters?.totalInquiries || 0,
        pendingQuoteRequests: quoteReqJson.counts?.pending || 0,
        failedQuoteEmails: failedEmails,
        todaysMeetings,
        activeEvents: activeCount || statsJson.counters?.totalEvents || 0,
        upcomingEventsCount: upcomingCount, // real — no fake fallback
        revenueThisMonth: revenueSum,       // real — no fake fallback
        vendorsAvailable: statsJson.counters?.totalVendors || 0,
        actionNeededTotal: actionJson.counts?.total || 0,
      });

      setRecentLeads(recentInq);
      setActivityLogs(recentLogs);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
    setLoading(false);
  };

  const todayLabel = mounted
    ? new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "";

  return (
    <div className="pb-12 max-w-[1440px] mx-auto text-brand-foreground">
      {/* Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-heading tracking-tight mb-1">Control Center</h1>
          <p className="text-sm text-brand-foreground-muted font-medium">{todayLabel ? `${todayLabel} · ` : ""}Real-time overview of your Saudi Event operations.</p>
        </div>
        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-heading text-white font-semibold tracking-wide text-xs rounded-lg hover:bg-brand-primary-dark transition-all shadow-card active:scale-95"
        >
          <Plus size={15} />
          Quick Lead
        </button>
      </div>

      {/* Needs Attention banner */}
      <Link
        href="/admin/action-needed"
        className={`mb-5 flex items-center justify-between gap-4 px-5 py-3 rounded-xl border transition-all ${
          stats.actionNeededTotal > 0
            ? "bg-brand-gold/[0.07] border-brand-gold/25 hover:bg-brand-gold/[0.11]"
            : "bg-status-success-bg border-status-success/15 hover:opacity-90"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {stats.actionNeededTotal > 0 ? (
            <AlertCircle size={17} className="text-brand-gold-hover flex-shrink-0" />
          ) : (
            <CheckCircle2 size={17} className="text-status-success flex-shrink-0" />
          )}
          <span className={`text-xs font-bold ${stats.actionNeededTotal > 0 ? "text-brand-heading" : "text-status-success"}`}>
            {loading
              ? "Checking for items that need attention…"
              : stats.actionNeededTotal > 0
              ? `${stats.actionNeededTotal} item${stats.actionNeededTotal === 1 ? "" : "s"} need your attention today`
              : "All caught up — nothing pending review"}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-foreground-muted flex-shrink-0">
          View all <ArrowRight size={12} />
        </span>
      </Link>

      {/* Metrics — action-relevant first, steady-state overview second */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <MetricCard
          label="New Inquiries"
          value={stats.newLeads}
          icon={Target}
          tone={stats.newLeads > 0 ? "highlight" : "neutral"}
          href="/admin/inquiries"
          loading={loading}
        />
        <MetricCard
          label="Quotes Awaiting Action"
          value={stats.pendingQuoteRequests}
          icon={FileText}
          tone={stats.pendingQuoteRequests > 0 ? "highlight" : "neutral"}
          href="/admin/quotes"
          loading={loading}
        />
        <MetricCard
          label="Failed Quote Emails"
          value={stats.failedQuoteEmails}
          icon={stats.failedQuoteEmails > 0 ? XCircle : CheckCircle2}
          tone={stats.failedQuoteEmails > 0 ? "critical" : "success"}
          href="/admin/quotes"
          sublabel={stats.failedQuoteEmails > 0 ? "Needs a retry" : "All delivered"}
          loading={loading}
        />
        <MetricCard
          label="Today's Meetings"
          value={stats.todaysMeetings}
          icon={Calendar}
          tone={stats.todaysMeetings > 0 ? "highlight" : "neutral"}
          href="/admin/meetings"
          loading={loading}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Active Events" value={stats.activeEvents} icon={CalendarDays} href="/admin/events" loading={loading} />
        <MetricCard
          label="Upcoming Events"
          value={stats.upcomingEventsCount}
          icon={Clock}
          href="/admin/calendar"
          sublabel={stats.upcomingEventsCount === 0 && !loading ? "Nothing scheduled yet" : undefined}
          loading={loading}
        />
        <MetricCard
          label="Revenue This Month"
          value={`SAR ${stats.revenueThisMonth.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={DollarSign}
          href="/admin/finance"
          sublabel={stats.revenueThisMonth === 0 && !loading ? "No revenue logged yet" : undefined}
          loading={loading}
        />
        <MetricCard label="Vendor Network" value={stats.vendorsAvailable} icon={Briefcase} href="/admin/vendors" loading={loading} />
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Columns */}
        <div className="lg:col-span-2 space-y-5">

          {/* Recent Inquiries */}
          <div className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-card">
            <div className="px-5 py-4 border-b border-brand-border-subtle flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-brand-heading">Recent Inquiries</h2>
                <p className="text-[10px] text-brand-foreground-faint font-bold uppercase tracking-wider mt-0.5">Latest inbound client queue</p>
              </div>
              <Link href="/admin/inquiries" className="text-xs font-semibold text-brand-primary hover:text-brand-primary-dark">View All →</Link>
            </div>
            <div className="divide-y divide-brand-border-subtle">
              {loading ? (
                [1, 2].map(i => <div key={i} className="h-12 bg-brand-surface-raised animate-pulse rounded-lg m-3" />)
              ) : recentLeads.length === 0 ? (
                <EmptyState icon={Inbox} title="No new leads yet" description="New website and manual inquiries will show up here." />
              ) : (
                recentLeads.map((inq) => (
                  <div key={inq.id} className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-brand-surface-raised transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-brand-heading font-bold truncate">{inq.name}</p>
                        <StatusBadge status={inq.status || "Pending"} />
                      </div>
                      <p className="text-[10px] text-brand-foreground-muted mt-0.5 truncate">{inq.email} · {inq.eventType} ({inq.venueCity || 'Saudi'})</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-[10px] text-brand-foreground-medium font-semibold">Budget: {inq.budget || 'TBD'}</span>
                      {mounted && (
                        <span className="text-[10px] text-brand-foreground-faint">
                          {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Local Notes (device-local, not the real Task module) */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-brand-heading">Local Notes</h2>
              <span className="text-[10px] font-bold text-brand-foreground-muted uppercase tracking-wider bg-brand-surface-lifted px-2.5 py-0.5 rounded-md">
                {tasks.filter(t => !t.completed).length} open
              </span>
            </div>
            <p className="text-[10.5px] text-brand-foreground-faint font-medium mb-4">Saved on this device only — not synced, not shared, not backed up.</p>

            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Jot a quick reminder for yourself…"
                className="flex-1 bg-brand-surface-raised border border-brand-border rounded-lg px-3 py-2 text-xs font-medium text-brand-heading focus:outline-none focus:border-brand-primary-light"
              />
              <button type="submit" className="px-4 py-2 bg-brand-heading text-white font-semibold text-xs rounded-lg hover:bg-brand-primary-dark transition-all active:scale-95">
                Add
              </button>
            </form>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-brand-surface-raised border border-brand-border-subtle rounded-lg hover:border-brand-border transition-colors group">
                  <button onClick={() => toggleTask(task.id)} className="flex items-center gap-3 text-start flex-1 min-w-0">
                    {task.completed ? (
                      <CheckCircle2 size={16} className="text-status-success flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-brand-border flex-shrink-0" />
                    )}
                    <span className={`text-xs font-semibold truncate ${task.completed ? 'line-through text-brand-foreground-faint' : 'text-brand-foreground'}`}>
                      {task.text}
                    </span>
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="text-brand-foreground-faint hover:text-status-critical opacity-0 group-hover:opacity-100 transition-opacity p-0.5">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <EmptyState icon={ListChecks} title="No notes yet" description="Personal reminders you jot here stay only on this device." />
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">

          {/* Shortcuts — replaces the old decorative "Owner Performance" panel
              with real navigation to pages that already carry live counts. */}
          <div className="bg-brand-heading text-white rounded-xl p-5 shadow-card">
            <h2 className="text-[10px] text-brand-gold font-bold uppercase tracking-wider mb-3">Shortcuts</h2>
            <div className="space-y-1">
              <Link href="/admin/action-needed" className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-white/10 transition-colors group">
                <span className="flex items-center gap-2.5 text-xs font-semibold text-white/90 group-hover:text-white"><ListChecks size={14} /> Action Needed</span>
                {stats.actionNeededTotal > 0 && (
                  <span className="px-1.5 py-0.5 bg-brand-gold text-brand-heading text-[9px] font-bold rounded-full min-w-[18px] text-center">{stats.actionNeededTotal}</span>
                )}
              </Link>
              <Link href="/admin/analytics" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs font-semibold text-white/90 hover:text-white">
                <BarChart3 size={14} /> Analytics
              </Link>
              <Link href="/admin/copilot" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/10 transition-colors text-xs font-semibold text-white/90 hover:text-white">
                <Bot size={14} /> Copilot
              </Link>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-card">
            <h2 className="text-sm font-semibold text-brand-heading mb-4">Operations Log</h2>
            <div className="space-y-4">
              {loading ? (
                [1, 2, 3].map(i => <div key={i} className="h-8 bg-brand-surface-raised animate-pulse rounded-lg" />)
              ) : activityLogs.length === 0 ? (
                <EmptyState icon={FileText} title="No activity yet" description="System actions will be logged here as they happen." />
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="relative ps-4 border-l border-brand-border-subtle pb-1 last:pb-0">
                    <div className="absolute -start-1 top-1 w-2 h-2 rounded-full bg-brand-primary" />
                    <p className="text-xs text-brand-heading font-semibold">{log.action}</p>
                    <p className="text-[10px] text-brand-foreground-faint mt-0.5">
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
              className="fixed inset-0 m-auto bg-white w-full max-w-md h-fit rounded-xl shadow-2xl border border-brand-border overflow-hidden z-[101]"
            >
              <div className="p-5 border-b border-brand-border-subtle flex items-center justify-between bg-brand-surface-raised">
                <h3 className="text-sm font-semibold text-brand-heading">Add Quick Lead</h3>
                <button onClick={() => setIsInquiryModalOpen(false)} className="text-brand-foreground-faint hover:text-brand-foreground transition-colors"><X size={18} /></button>
              </div>
              <form onSubmit={handleAddInquiry} className="p-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-foreground-muted">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-brand-surface-raised border border-brand-border rounded-lg py-2 px-3 text-xs font-semibold text-brand-heading focus:outline-none focus:border-brand-primary-light"
                    placeholder="Client name"
                    value={inquiryForm.name}
                    onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-foreground-muted">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-brand-surface-raised border border-brand-border rounded-lg py-2 px-3 text-xs font-semibold text-brand-heading focus:outline-none"
                      placeholder="+966"
                      value={inquiryForm.phone}
                      onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-foreground-muted">Budget (SAR)</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-brand-surface-raised border border-brand-border rounded-lg py-2 px-3 text-xs font-semibold text-brand-heading focus:outline-none"
                      placeholder="e.g. 50000"
                      value={inquiryForm.budget}
                      onChange={e => setInquiryForm({...inquiryForm, budget: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-foreground-muted">Event Category</label>
                  <select
                    required
                    className="w-full bg-brand-surface-raised border border-brand-border rounded-lg py-2 px-3 text-xs font-semibold text-brand-heading focus:outline-none"
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
                  <label className="text-[10px] font-bold uppercase tracking-wider text-brand-foreground-muted">Message / Directives</label>
                  <textarea
                    rows={3}
                    className="w-full bg-brand-surface-raised border border-brand-border rounded-lg p-3 text-xs font-medium focus:outline-none focus:border-brand-primary-light resize-none"
                    placeholder="Enter customer specific desires..."
                    value={inquiryForm.message}
                    onChange={e => setInquiryForm({...inquiryForm, message: e.target.value})}
                  />
                </div>
                <button type="submit" disabled={submittingInquiry} className="w-full py-3 bg-brand-heading hover:bg-brand-primary-dark text-white font-semibold text-xs rounded-lg transition-all disabled:opacity-50">
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
