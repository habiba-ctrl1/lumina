"use client";

import { Briefcase, Star, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const mockVendors = [
  { id: "1", name: "Royal Catering Co.", category: "Catering", rating: 4.9, status: "Active", phone: "+966 50 111 2222" },
  { id: "2", name: "Elite Florals", category: "Decor", rating: 4.8, status: "Active", phone: "+966 55 333 4444" },
  { id: "3", name: "Lumina Production", category: "AV & Lighting", rating: 5.0, status: "In-House", phone: "Internal" },
  { id: "4", name: "Luxury Rides SA", category: "Transportation", rating: 4.7, status: "Pending", phone: "+966 59 555 6666" },
];

export default function VendorsPage() {
  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Vendors & <span className="text-gold-500 font-semibold italic">Team</span> Management
          </h1>
          <p className="text-gray-500 text-sm">Manage your external vendors, suppliers, and internal event teams.</p>
        </div>
        <button className="px-6 py-2.5 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
          Add New Vendor
        </button>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between bg-charcoal-900/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search vendors by name or category..." 
              className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-charcoal-900 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
          {mockVendors.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-charcoal-900 border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-colors group relative"
            >
              <div className="absolute top-4 right-4">
                <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                  vendor.status === 'Active' || vendor.status === 'In-House' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {vendor.status}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-charcoal-800 to-charcoal-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="text-gold-500" size={20} />
              </div>
              <h3 className="text-white font-medium text-lg mb-1">{vendor.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{vendor.category}</p>
              
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="text-gold-500 fill-gold-500" size={14} />
                  <span className="text-sm text-white font-medium">{vendor.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{vendor.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
