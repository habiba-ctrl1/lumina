"use client";

import { Search, Filter, MoreVertical, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const mockClients = [
  { id: "1", name: "Sarah Al Saud", email: "sarah.alsaud@example.com", phone: "+966 50 123 4567", status: "VIP", events: 3, lastActive: "2 days ago" },
  { id: "2", name: "Ahmed bin Tariq", email: "ahmed.bt@example.com", phone: "+966 55 987 6543", status: "Active", events: 1, lastActive: "5 hours ago" },
  { id: "3", name: "Layan Corporation", email: "events@layancorp.com", phone: "+971 50 234 5678", status: "Corporate", events: 5, lastActive: "1 week ago" },
];

export default function ClientsPage() {
  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Client <span className="text-gold-500 font-semibold italic">CRM</span> Directory
          </h1>
          <p className="text-gray-500 text-sm">Manage your high-net-worth individuals and corporate clients.</p>
        </div>
        <button className="px-6 py-2.5 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
          Add New Client
        </button>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-charcoal-900/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search clients by name, email, or status..." 
              className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-charcoal-900/80 border-b border-white/5 text-xs uppercase tracking-widest text-gray-500">
                <th className="px-6 py-4 font-medium">Client Info</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Events</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockClients.map((client, i) => (
                <motion.tr 
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/20 flex items-center justify-center text-gold-500 font-bold uppercase">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{client.name}</p>
                        <p className="text-xs text-gray-500">Active {client.lastActive}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-400 flex items-center gap-2"><Mail size={12}/> {client.email}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-2"><Phone size={12}/> {client.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full ${
                      client.status === 'VIP' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' :
                      client.status === 'Corporate' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-semibold">{client.events} <span className="text-gray-500 font-normal">total</span></p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
