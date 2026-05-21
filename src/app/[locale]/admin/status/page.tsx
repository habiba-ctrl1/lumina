"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Trash2, RefreshCw, AlertCircle, Clock, CheckCircle2, Star, Target, Filter } from "lucide-react";

type LogEntry = {
  id: string;
  action: string;
  details: string | null;
  userEmail: string | null;
  createdAt: string;
};

export default function StatusPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this log entry?")) return;
    try {
      const response = await fetch(`/api/logs?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setLogs(logs.filter(l => l.id !== id));
      } else {
        alert("Failed to delete log entry.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("A network error occurred.");
    }
  };

  const getLabelStyle = (action: string) => {
    if (action.includes("Lead") || action.includes("Inquiry")) return "bg-amber-50 text-amber-600 border-amber-100";
    if (action.includes("Quote")) return "bg-blue-50 text-blue-600 border-blue-100";
    if (action.includes("Partner") || action.includes("Vendor")) return "bg-purple-50 text-purple-600 border-purple-100";
    if (action.includes("Blog") || action.includes("Article")) return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (action.includes("Gallery")) return "bg-pink-50 text-pink-600 border-pink-100";
    return "bg-gold-50 text-gold-600 border-gold-100";
  };

  const getLabelIcon = (action: string) => {
    if (action.includes("Lead") || action.includes("Inquiry") || action.includes("Assigned")) return <Target size={12} />;
    if (action.includes("Quote") || action.includes("Updated")) return <CheckCircle2 size={12} />;
    if (action.includes("Blog") || action.includes("Partner")) return <Star size={12} />;
    return <Clock size={12} />;
  };

  const filteredLogs = filter === "all" 
    ? logs 
    : logs.filter(l => l.action.toLowerCase().includes(filter.toLowerCase()));

  const categories = ["all", "Lead", "Quote", "Partner", "Blog", "Gallery"];

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <h1 className="text-3xl font-bold text-sand-50 tracking-tight mb-2">
            Business Activity Log
          </h1>
          <p className="text-sand-300 font-medium">A comprehensive history of all Saudi Event Management operations and milestones.</p>
        </div>
        <button 
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-ink-800 border border-ink-600 text-sand-200 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-ink-950 transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Log
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              filter === cat
                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                : "bg-ink-800 text-sand-400 hover:bg-ink-950 border-ink-600"
            }`}
          >
            {cat === "all" ? "All Activity" : cat}
          </button>
        ))}
      </div>

      <div className="bg-ink-800 border border-ink-600 rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-8 py-6 border-b border-ink-500 bg-ink-950/50">
          <div className="p-2 bg-gold-500 rounded-lg shadow-lg shadow-gold-500/20">
            <Activity className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sand-50">Activity Stream</h2>
            <p className="text-[10px] text-sand-400 font-bold uppercase tracking-widest">{filteredLogs.length} entries recorded</p>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 bg-ink-950 animate-pulse rounded-2xl border border-ink-500" />
              ))}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="py-32 text-center">
              <div className="w-16 h-16 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle size={24} className="text-sand-500" />
              </div>
              <h3 className="text-lg font-bold text-sand-50 mb-2">No Activity Logged</h3>
              <p className="text-sand-400 font-medium italic max-w-xs mx-auto">
                {filter !== "all" ? "No entries match this filter." : "Actions like new leads, quote updates, and content changes will be tracked here."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log, i) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between p-5 bg-ink-800 border border-ink-500 rounded-2xl hover:border-gold-500/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-10 flex-1 min-w-0">
                    <div className={`px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest font-black flex items-center gap-2 border flex-shrink-0 ${getLabelStyle(log.action)}`}>
                      {getLabelIcon(log.action)}
                      {log.action}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sand-50 font-bold text-sm mb-1 truncate">{log.details || log.action}</p>
                      <div className="flex items-center gap-10 text-[10px] text-sand-400 font-bold">
                        <div className="flex items-center gap-1.5">
                          <Clock size={10} />
                          {new Date(log.createdAt).toLocaleString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                          })}
                        </div>
                        {log.userEmail && (
                          <span className="text-sand-500">by {log.userEmail}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(log.id)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sand-500 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    title="Delete Entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
