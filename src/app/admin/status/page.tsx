"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Activity, Trash2, RefreshCw } from "lucide-react";

export default function StatusPage() {
  const [statuses, setStatuses] = useState<{ id: string; text: string; label: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("business_updates")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setStatuses(data);
    setLoading(false);
  };

  const handleDeleteStatus = async (id: string) => {
    try {
      await supabase.from("business_updates").delete().eq("id", id);
      setStatuses(statuses.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Business <span className="text-gold-500 font-semibold ">Status</span> Updates
          </h1>
          <p className="text-gray-500 text-sm">Comprehensive log of all your business milestones and live feed posts.</p>
        </div>
        <button 
          onClick={fetchStatuses}
          className="flex items-center gap-2 px-6 py-2.5 bg-charcoal-800 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white/5 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Log
        </button>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
          <Activity className="text-gold-500" size={24} />
          <h2 className="text-xl font-medium text-white">Full Activity Log</h2>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-charcoal-900 animate-pulse rounded-xl" />)}
          </div>
        ) : statuses.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No status updates found.</div>
        ) : (
          <div className="space-y-4">
            {statuses.map((status, i) => (
              <motion.div 
                key={status.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 bg-charcoal-900 border border-white/5 rounded-xl hover:border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold w-24 text-center ${
                    status.label === "Success" ? "bg-emerald-500/10 text-emerald-400" : 
                    status.label === "Milestone" ? "bg-amber-500/10 text-amber-400" : 
                    status.label === "Planning" ? "bg-blue-500/10 text-blue-400" : "bg-gold-500/10 text-gold-400"
                  }`}>
                    {status.label}
                  </div>
                  <div>
                    <p className="text-white text-sm mb-1">{status.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(status.created_at).toLocaleString(undefined, { 
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteStatus(status.id)}
                  className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
