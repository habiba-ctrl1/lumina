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
    if (action.includes("Lead") || action.includes("Inquiry")) return "bg-amber-50 text-amber-605 border-amber-100";
    if (action.includes("Quote")) return "bg-blue-50 text-blue-605 border-blue-100";
    if (action.includes("Partner") || action.includes("Vendor")) return "bg-purple-50 text-purple-605 border-purple-100";
    if (action.includes("Blog") || action.includes("Article")) return "bg-emerald-50 text-emerald-605 border-emerald-100";
    if (action.includes("Gallery")) return "bg-pink-50 text-pink-605 border-pink-100";
    return "bg-teal-50 text-teal-700 border-teal-100";
  };

  const getLabelIcon = (action: string) => {
    if (action.includes("Lead") || action.includes("Inquiry") || action.includes("Assigned")) return <Target size={11} />;
    if (action.includes("Quote") || action.includes("Updated")) return <CheckCircle2 size={11} />;
    if (action.includes("Blog") || action.includes("Partner")) return <Star size={11} />;
    return <Clock size={11} />;
  };

  const filteredLogs = filter === "all" 
    ? logs 
    : logs.filter(l => l.action.toLowerCase().includes(filter.toLowerCase()));

  const categories = ["all", "Lead", "Quote", "Partner", "Blog", "Gallery"];

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            System & Activity Logs
          </h1>
          <p className="text-slate-500 text-sm">A comprehensive history of all Saudi Event Management operations and milestones.</p>
        </div>
        <button 
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold tracking-wide text-xs rounded-xl transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Log
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
              filter === cat
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-500 hover:bg-slate-50 border-slate-200"
            }`}
          >
            {cat === "all" ? "All Activity" : cat}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="p-2 bg-teal-500 rounded-lg text-white shadow-sm shadow-teal-500/10">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Activity Stream</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{filteredLogs.length} entries recorded</p>
          </div>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i: any) => (
                <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-xl border border-slate-200" />
              ))}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <AlertCircle size={22} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">No Activity Logged</h3>
              <p className="text-xs text-slate-550 italic max-w-xs mx-auto">
                {filter !== "all" ? "No entries match this filter." : "Actions like new leads, quote updates, and content changes will be tracked here."}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredLogs.map((log: any, i: number) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-xl hover:border-teal-400 hover:shadow-sm transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold flex items-center gap-1 border flex-shrink-0 ${getLabelStyle(log.action)}`}>
                      {getLabelIcon(log.action)}
                      {log.action}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 font-semibold text-xs mb-0.5 truncate">{log.details || log.action}</p>
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold">
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(log.createdAt).toLocaleString()}
                        </div>
                        {log.userEmail && (
                          <span className="text-slate-400">by {log.userEmail}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(log.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    title="Delete Entry"
                  >
                    <Trash2 size={14} />
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
