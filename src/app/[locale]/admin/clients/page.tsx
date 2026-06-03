"use client";

import { useEffect, useState } from "react";
import { Search, Filter, MoreVertical, Mail, Phone, Plus, UserPlus, TrendingUp, Star, Award, Building } from "lucide-react";
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
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Client CRM
          </h1>
          <p className="text-slate-500 text-sm">Manage and segment your high-net-worth network.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5 active:scale-95">
          <UserPlus size={15} />
          Add Client
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Clients</p>
            <h3 className="text-xl font-bold text-slate-800">{clients.length}</h3>
          </div>
          <div className="text-teal-600 bg-teal-50 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold">
            <TrendingUp size={12} /> +12%
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">VIP Network</p>
            <h3 className="text-xl font-bold text-slate-800">{clients.filter(c => c.status === 'VIP').length}</h3>
          </div>
          <div className="text-amber-600 bg-amber-50 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold">
            <Award size={12} /> HNW Network
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Corporate Partners</p>
            <h3 className="text-xl font-bold text-slate-800">{clients.filter(c => c.status === 'Corporate').length}</h3>
          </div>
          <div className="text-blue-600 bg-blue-50 px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-semibold">
            <Building size={12} /> B2B Segment
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Panel */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or company..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer min-w-[130px]"
            >
              <option value="all">All Statuses</option>
              <option value="VIP">VIP</option>
              <option value="Active">Active</option>
              <option value="Corporate">Corporate</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
                <th className="px-6 py-3.5 text-start font-semibold">Client Identity</th>
                <th className="px-6 py-3.5 text-start font-semibold">Contact Info</th>
                <th className="px-6 py-3.5 text-start font-semibold">Status</th>
                <th className="px-6 py-3.5 text-start font-semibold">Engagement</th>
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
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">No clients found matching your search.</td>
                </tr>
              ) : (
                clients.map((client: any, i: number) => (
                  <motion.tr 
                    key={client.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold text-sm shadow-sm">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-slate-800 font-semibold text-xs tracking-tight">{client.name}</p>
                          <p className="text-[10px] text-slate-450 font-semibold uppercase tracking-wide mt-0.5">{client.company || 'Private Client'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-700 font-semibold flex items-center gap-1.5 hover:text-teal-600 transition-colors">
                          <Mail size={12} className="text-slate-400" /> {client.email}
                        </p>
                        {client.phone && (
                          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                            <Phone size={12} className="text-slate-400" /> {client.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md border ${
                        client.status === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        client.status === 'Corporate' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        client.status === 'Lead' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                        'bg-teal-50 text-teal-600 border-teal-100'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-800 font-bold">{client._count?.events || 0}</span>
                        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Events Managed</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreVertical size={16} />
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
