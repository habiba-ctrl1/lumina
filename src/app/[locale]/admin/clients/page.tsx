"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, Mail, Phone, Plus, UserPlus, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  createdAt: string;
  _count?: {
    events: number;
  };
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    fetchClients();
  }, [search, status]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, status });
      const response = await fetch(`/api/clients?${params.toString()}`);
      const data = await response.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div>
          <h1 className="text-3xl font-bold text-sand-50 tracking-tight mb-2">
            Client CRM
          </h1>
          <p className="text-sand-300 font-medium">Manage and segment your high-net-worth network.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
          <UserPlus size={16} className="text-gold-500" />
          Add Client
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div className="bg-ink-800 p-6 rounded-3xl border border-ink-600 shadow-sm">
          <p className="text-[10px] text-sand-400 font-black uppercase tracking-widest mb-2">Total Clients</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-sand-50">{clients.length}</h3>
            <div className="text-emerald-500 flex items-center gap-1 text-xs font-bold">
              <TrendingUp size={14} /> +12%
            </div>
          </div>
        </div>
        <div className="bg-ink-800 p-6 rounded-3xl border border-ink-600 shadow-sm">
          <p className="text-[10px] text-sand-400 font-black uppercase tracking-widest mb-2">VIP Network</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-sand-50">{clients.filter(c => c.status === 'VIP').length}</h3>
            <div className="text-gold-500 font-black text-[10px] uppercase tracking-widest">Elite</div>
          </div>
        </div>
        <div className="bg-ink-800 p-6 rounded-3xl border border-ink-600 shadow-sm">
          <p className="text-[10px] text-sand-400 font-black uppercase tracking-widest mb-2">Corporate Partners</p>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-black text-sand-50">{clients.filter(c => c.status === 'Corporate').length}</h3>
            <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest">Growth</div>
          </div>
        </div>
      </div>

      <div className="bg-ink-800 border border-ink-600 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-ink-500 flex flex-col sm:flex-row gap-10 items-center justify-between bg-ink-950/50">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-400" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or company..." 
              className="w-full bg-ink-800 border border-ink-600 rounded-2xl pl-12 pr-4 py-3 text-sm text-sand-50 font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500 transition-all placeholder:text-sand-400"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-1 sm:flex-none px-4 py-3 bg-ink-800 border border-ink-600 rounded-2xl text-sm font-bold text-sand-200 focus:outline-none focus:border-gold-500 transition-all appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">All Statuses</option>
              <option value="VIP">VIP</option>
              <option value="Active">Active</option>
              <option value="Corporate">Corporate</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink-500 text-[10px] uppercase tracking-[0.2em] text-sand-400 font-black">
                <th className="px-8 py-6">Client Identity</th>
                <th className="px-8 py-6">Connection</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Engagement</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-8"><div className="h-8 bg-ink-950 rounded-xl" /></td>
                  </tr>
                ))
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-28 text-center text-sand-400 font-bold uppercase tracking-widest text-xs">No clients found matching your search.</td>
                </tr>
              ) : (
                clients.map((client, i) => (
                  <motion.tr 
                    key={client.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-ink-950/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-10">
                        <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center text-gold-600 font-black text-lg shadow-sm">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sand-50 font-black text-sm tracking-tight">{client.name}</p>
                          <p className="text-[10px] text-sand-400 font-bold uppercase tracking-wider mt-0.5">{client.company || 'Private Client'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1.5">
                        <p className="text-xs text-sand-200 font-semibold flex items-center gap-2 group-hover:text-gold-600 transition-colors">
                          <Mail size={14} className="text-gold-500" /> {client.email}
                        </p>
                        {client.phone && (
                          <p className="text-xs text-sand-300 font-medium flex items-center gap-2">
                            <Phone size={14} className="text-sand-400" /> {client.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[9px] uppercase tracking-[0.15em] font-black rounded-full border ${
                        client.status === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        client.status === 'Corporate' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        client.status === 'Lead' ? 'bg-ink-950 text-sand-300 border-ink-500' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-sand-50 font-black">{client._count?.events || 0}</span>
                        <span className="text-[10px] text-sand-400 font-bold uppercase tracking-wider">Events Managed</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="w-10 h-10 flex items-center justify-center text-sand-500 hover:bg-ink-800 hover:text-sand-50 hover:shadow-md rounded-xl transition-all border border-transparent hover:border-ink-500">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
