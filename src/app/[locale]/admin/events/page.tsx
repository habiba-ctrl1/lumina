"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, X, Calendar, MapPin, User, Info, DollarSign, 
  Users, RefreshCw, Search, Briefcase, CheckCircle2, ChevronRight, Filter,
  CheckSquare, Square, Save, ArrowRight, Sparkles
} from "lucide-react";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  location: string | null;
  type: string;
  status: string;
  timeline: string;
  guestCount: string | null;
  budget: string | null;
  clientId: string | null;
  client?: {
    name: string;
    email: string;
  } | null;
  createdAt: string;
};

type Client = {
  id: string;
  name: string;
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Workspace State
  const [activeWorkspace, setActiveWorkspace] = useState<Event | null>(null);
  const [workspaceTasks, setWorkspaceTasks] = useState<{id: string; label: string; done: boolean}[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    type: "Wedding",
    status: "Inquiry",
    timeline: "Planning",
    guestCount: "",
    budget: "",
    clientId: ""
  });

  const eventTypes = ["Wedding", "Corporate", "Private", "Culture", "General"];
  const eventStatuses = ["Inquiry", "Quoted", "Booked", "Completed", "Cancelled"];
  const timelines = ["Planning", "Vendor Selection", "Proposal", "Confirmation", "Execution", "Completed"];

  useEffect(() => {
    fetchEvents();
    fetchClients();
  }, [type, status]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ type, status });
      const response = await fetch(`/api/events?${params.toString()}`);
      const data = await response.json();
      if (data.data) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();
      if (Array.isArray(data)) setClients(data);
    } catch (e) {
      console.error(e);
    }
  };

  const openWorkspace = (event: Event) => {
    setActiveWorkspace(event);
    
    // Load tasks from LocalStorage or set defaults
    const saved = localStorage.getItem(`event_tasks_${event.id}`);
    if (saved) {
      try {
        setWorkspaceTasks(JSON.parse(saved));
      } catch (e) {
        setWorkspaceTasks(getDefaultTasks());
      }
    } else {
      setWorkspaceTasks(getDefaultTasks());
    }
  };

  const getDefaultTasks = () => [
    { id: "1", label: "Venue", done: false },
    { id: "2", label: "Catering", done: false },
    { id: "3", label: "Decor", done: false },
    { id: "4", label: "Photography", done: false }
  ];

  const toggleWorkspaceTask = (taskId: string) => {
    if (!activeWorkspace) return;
    const updated = workspaceTasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    setWorkspaceTasks(updated);
    localStorage.setItem(`event_tasks_${activeWorkspace.id}`, JSON.stringify(updated));
    
    // Auto progress update logic
    const completedCount = updated.filter(t => t.done).length;
    let newTimeline = activeWorkspace.timeline;
    if (completedCount === 0) newTimeline = "Planning";
    else if (completedCount > 0 && completedCount < 4) newTimeline = "Vendor Selection";
    else if (completedCount === 4) newTimeline = "Execution";

    if (newTimeline !== activeWorkspace.timeline) {
      updateEventTimeline(activeWorkspace.id, newTimeline);
      setActiveWorkspace({ ...activeWorkspace, timeline: newTimeline });
    }
  };

  const updateEventTimeline = async (id: string, timeline: string) => {
    try {
      await fetch("/api/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, timeline })
      });
      fetchEvents(); // Background refresh
    } catch (e) {
      console.error("Failed to auto-update timeline", e);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        clientId: formData.clientId || null
      };
      
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({
          title: "", description: "", date: "", location: "", type: "Wedding",
          status: "Inquiry", timeline: "Planning", guestCount: "", budget: "", clientId: ""
        });
        fetchEvents();
      } else {
        const errData = await response.json();
        alert(`Error: ${errData.error || 'Failed to save event'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Event Management
          </h1>
          <p className="text-sm text-slate-500 font-medium">Plan, track, and execute upcoming luxury events.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Plus size={15} />
          Create New Event
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">All Events</p>
          <h3 className="text-lg font-bold text-slate-800">{events.length} Active</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Booked</p>
          <h3 className="text-lg font-bold text-emerald-600">{events.filter(e => e.status === "Booked").length} Confirmed</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">In Planning</p>
          <h3 className="text-lg font-bold text-amber-600">{events.filter(e => e.status === "Inquiry" || e.status === "Quoted").length} Pipeline</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Completed</p>
          <h3 className="text-lg font-bold text-blue-600">{events.filter(e => e.status === "Completed").length} Managed</h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title, location..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 min-w-[120px]"
            >
              <option value="all">All Types</option>
              {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 min-w-[120px]"
            >
              <option value="all">All Statuses</option>
              {eventStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button 
              onClick={fetchEvents}
              disabled={loading}
              className="p-2 bg-white border border-slate-200 rounded-xl text-teal-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
                <th className="px-6 py-3.5 text-start font-semibold">Event Details</th>
                <th className="px-6 py-3.5 text-start font-semibold">Client</th>
                <th className="px-6 py-3.5 text-start font-semibold">Timeline & Status</th>
                <th className="px-6 py-3.5 text-start font-semibold">Details</th>
                <th className="px-6 py-3.5 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3].map((i: any) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6"><div className="h-6 bg-slate-50 rounded-xl" /></td>
                  </tr>
                ))
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">No events registered yet.</td>
                </tr>
              ) : (
                events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || (e.location && e.location.toLowerCase().includes(search.toLowerCase()))).map((event: any, i: number) => (
                  <motion.tr 
                    key={event.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                    onClick={() => openWorkspace(event)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-colors">
                          {event.type.charAt(0)}
                        </div>
                        <div>
                          <p className="text-slate-800 font-semibold text-xs tracking-tight group-hover:text-teal-650 transition-colors">{event.title}</p>
                          <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded mt-0.5 inline-block border border-teal-100">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {event.client ? (
                        <div>
                          <p className="text-xs text-slate-700 font-semibold flex items-center gap-1"><User size={12} className="text-slate-400" /> {event.client.name}</p>
                          <p className="text-[10px] text-slate-400">{event.client.email}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No associated client</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md border inline-block ${
                          event.status === 'Booked' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          event.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          event.status === 'Cancelled' ? 'bg-red-50 text-red-650 border-red-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {event.status}
                        </span>
                        <p className="text-[10px] text-slate-400">Timeline: <span className="font-semibold text-slate-650">{event.timeline}</span></p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-[11px] text-slate-600">
                        {event.date && <p className="flex items-center gap-1"><Calendar size={11} className="text-slate-400" /> {new Date(event.date).toLocaleDateString()}</p>}
                        {event.location && <p className="flex items-center gap-1"><MapPin size={11} className="text-slate-400" /> {event.location}</p>}
                        {event.budget && <p className="flex items-center gap-1 font-semibold text-teal-600"><DollarSign size={11} /> SAR {parseFloat(event.budget).toLocaleString()}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm">
                        Workspace
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Workspace Modal */}
      <AnimatePresence>
        {activeWorkspace && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveWorkspace(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-4xl bg-white border-t border-x border-slate-200 z-[101] shadow-2xl rounded-t-[2rem] flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-[2rem]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-500 rounded-xl text-white shadow-md shadow-teal-500/20">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">{activeWorkspace.title}</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">Event Board Workspace</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveWorkspace(null)}
                  className="p-2 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Col: Info */}
                  <div className="col-span-1 space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Event Snapshot</h3>
                      
                      <div className="space-y-3 text-sm font-semibold text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500"><User size={14}/> Client:</span>
                          <span className="text-slate-900">{activeWorkspace.client?.name || "Unassigned"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500"><DollarSign size={14}/> Budget:</span>
                          <span className="text-teal-650">{activeWorkspace.budget ? `SAR ${parseFloat(activeWorkspace.budget).toLocaleString()}` : "TBD"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500"><Info size={14}/> Status:</span>
                          <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-xs">{activeWorkspace.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Timeline Progress</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 transition-all duration-500" 
                            style={{ 
                              width: activeWorkspace.timeline === 'Completed' ? '100%' : 
                                     activeWorkspace.timeline === 'Execution' ? '80%' : 
                                     activeWorkspace.timeline === 'Vendor Selection' ? '50%' : '20%' 
                            }} 
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{activeWorkspace.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Col: Tasks Checklist */}
                  <div className="col-span-1 md:col-span-2">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">Required Vendors</h3>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">Tick automatically updates progress</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {workspaceTasks.map(task => (
                          <div 
                            key={task.id}
                            onClick={() => toggleWorkspaceTask(task.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              task.done 
                                ? 'bg-teal-50/50 border-teal-200/50' 
                                : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                            }`}
                          >
                            <div className="flex-shrink-0">
                              {task.done ? (
                                <CheckSquare size={20} className="text-teal-500" />
                              ) : (
                                <Square size={20} className="text-slate-300" />
                              )}
                            </div>
                            <span className={`text-sm font-bold ${task.done ? 'text-teal-800 line-through opacity-70' : 'text-slate-700'}`}>
                              {task.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Link 
                          href={`/admin/quote-wizard?eventId=${activeWorkspace.id}`}
                          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
                        >
                          <Sparkles size={14} className="text-gold-400" />
                          Smart Quote Generator
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 end-0 w-full md:w-[500px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500 rounded-xl text-white shadow-md">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Create Event Project</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Initialize Workspace</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Event Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Royal Wedding Reception" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Associate Client</label>
                    <select 
                      value={formData.clientId}
                      onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                    >
                      <option value="">Select client...</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Event Date</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none [color-scheme:light]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location / City</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Riyadh, Saudi Arabia" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Event Type</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      >
                        {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      >
                        {eventStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Guest Count</label>
                      <input 
                        type="text" 
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        placeholder="e.g. 500" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Budget (SAR)</label>
                      <input 
                        type="text" 
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. 150000" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Timeline / Progress Stage</label>
                    <select 
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                    >
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Event Overview / Notes</label>
                    <textarea 
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief details about custom themes, logistics details..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle2 className="text-teal-400" size={14} />}
                      {isSubmitting ? "Creating Event..." : "Register Event Project"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
