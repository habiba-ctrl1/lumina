"use client";

import { useEffect, useState } from "react";
import { Briefcase, Star, Search, Filter, RefreshCw, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Vendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  status: string;
  phone: string;
  created_at?: string;
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["Photography", "Catering", "Decor", "AV & Lighting", "Transportation", "Cakes", "Floral"];
  const statuses = ["Active", "Pending", "In-House", "Inactive"];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendors();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, category, status]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, category, status });
      const response = await fetch(`/api/vendors?${params.toString()}`);
      const data = await response.json();
      if (!data.error) setVendors(data || []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Vendors & <span className="text-gold-500 font-semibold ">Team</span> Management
          </h1>
          <p className="text-gray-500 text-sm">Manage your external vendors, suppliers, and internal event teams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 active:scale-95"
        >
          <Plus size={14} /> Add New Vendor
        </button>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
        {/* Filters Bar */}
        <div className="p-6 border-b border-white/5 flex flex-col lg:flex-row gap-4 items-center bg-charcoal-900/50">
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendors by name..." 
              className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors shadow-inner"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category</span>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500/50 min-w-[140px] appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Status</span>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-charcoal-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500/50 min-w-[120px] appearance-none"
              >
                <option value="all">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button 
              onClick={fetchVendors}
              className={`p-2.5 bg-white/5 border border-white/10 rounded-xl text-gold-500 hover:bg-white/10 transition-all ${loading ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-charcoal-900/50 animate-pulse rounded-2xl border border-white/5" />
              ))}
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-20 bg-charcoal-900/20 rounded-2xl border border-white/5 border-dashed">
              <Briefcase size={40} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 text-sm">No vendors found matching your criteria.</p>
              {(search || category !== 'all' || status !== 'all') && (
                <button 
                  onClick={() => {setSearch(""); setCategory("all"); setStatus("all");}}
                  className="mt-4 text-gold-500 text-xs hover:underline uppercase tracking-widest"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vendors.map((vendor, i) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-charcoal-900 border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-all group relative shadow-lg hover:shadow-gold-500/5"
                >
                  <div className="absolute top-4 right-4">
                    <span className={`text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full ${
                      vendor.status === 'Active' || vendor.status === 'In-House' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {vendor.status}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gold-500/5 border border-gold-500/20 flex items-center justify-center mb-4 group-hover:bg-gold-500/10 transition-all">
                    <Briefcase className="text-gold-500" size={18} />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-0.5 group-hover:text-gold-400 transition-colors">{vendor.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">{vendor.category}</p>
                  
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Star className="text-gold-500 fill-gold-500" size={14} />
                      <span className="text-sm text-white font-medium">{vendor.rating}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono tracking-tighter">{vendor.phone}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slide-over Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-charcoal-900 border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-light text-white">
                    Add New <span className="text-gold-500 font-semibold">Vendor</span>
                  </h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Vendor Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Saudi Event Management Catering"
                      className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                      <select className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors appearance-none">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</label>
                      <select className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors appearance-none">
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Contact Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+966 50 123 4567"
                      className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</label>
                    <textarea 
                      rows={4}
                      placeholder="Specialties, conditions, or any additional context..."
                      className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-white/10 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      className="flex-1 py-3 bg-gold-500 text-charcoal-900 text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-colors"
                    >
                      Save Vendor
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
