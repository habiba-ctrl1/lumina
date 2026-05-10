"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Activity, Trash2, RefreshCw, AlertCircle, Clock, CheckCircle2, Star, Target } from "lucide-react";

export default function StatusPage() {
  const [statuses, setStatuses] = useState<{ id: string; text: string; label: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("business_updates")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setStatuses(data);
      } else {
        console.warn("Status table may be missing or inaccessible:", error);
        setStatuses([]);
      }
    } catch (e) {
      console.error("Fetch statuses failed:", e);
      setStatuses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStatus = async (id: string) => {
    if (!confirm("Delete this status update?")) return;
    try {
      const { error } = await supabase.from("business_updates").delete().eq("id", id);
      if (!error) {
        setStatuses(statuses.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case "Success": return <CheckCircle2 size={12} />;
      case "Milestone": return <Star size={12} />;
      case "Planning": return <Target size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Business Status Log
          </h1>
          <p className="text-slate-500 font-medium">A comprehensive history of all Saudi Event Management milestones and updates.</p>
        </div>
        <button 
          onClick={fetchStatuses}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Log
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="p-2 bg-gold-500 rounded-lg shadow-lg shadow-gold-500/20">
            <Activity className="text-white" size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Activity Stream</h2>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
              ))}
            </div>
          ) : statuses.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-medium italic">No activity logs recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {statuses.map((status, i) => (
                <motion.div 
                  key={status.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-gold-500/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`px-4 py-2 rounded-xl text-[9px] uppercase tracking-widest font-black flex items-center gap-2 border ${
                      status.label === "Success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                      status.label === "Milestone" ? "bg-amber-50 text-amber-600 border-amber-100" : 
                      status.label === "Planning" ? "bg-blue-50 text-blue-600 border-blue-100" : 
                      "bg-gold-50 text-gold-600 border-gold-100"
                    }`}>
                      {getLabelIcon(status.label)}
                      {status.label}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm mb-1">{status.text}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                        <Clock size={10} />
                        {new Date(status.created_at).toLocaleString(undefined, { 
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteStatus(status.id)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 opacity-0 group-hover:opacity-100"
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

