"use client";

import { useEffect, useState } from "react";
import { Briefcase, Star, Search, Filter, RefreshCw, Plus, X, Phone, Globe, Mail, MapPin } from "lucide-react";
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
      if (!data.error) setVendors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Partners & Vendors
          </h1>
          <p className="text-slate-500 font-medium">Manage your professional network of elite event service providers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gold-500 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-gold-600 transition-all shadow-lg shadow-gold-500/20 active:scale-95"
        >
          <Plus size={18} /> Add New Partner
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row gap-6 items-end bg-slate-50/30">
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vendor name..." 
              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap items-end gap-4 w-full lg:w-auto">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-gold-500 min-w-[140px] appearance-none cursor-pointer shadow-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-gold-500 min-w-[120px] appearance-none cursor-pointer shadow-sm"
              >
                <option value="all">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button 
              onClick={fetchVendors}
              disabled={loading}
              className={`p-3 bg-white border border-slate-200 rounded-xl text-gold-600 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50`}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-3xl border border-slate-100" />
              ))}
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No vendors found matching your criteria.</p>
              {(search || category !== 'all' || status !== 'all') && (
                <button 
                  onClick={() => {setSearch(""); setCategory("all"); setStatus("all");}}
                  className="mt-6 text-gold-600 font-bold text-xs uppercase tracking-widest bg-gold-50 px-6 py-2 rounded-xl"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {vendors.map((vendor, i) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-slate-100 rounded-3xl p-8 hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500 group relative flex flex-col"
                >
                  <div className="absolute top-6 right-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      vendor.status === 'Active' || vendor.status === 'In-House' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {vendor.status}
                    </span>
                  </div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
                    <Briefcase size={24} />
                  </div>
                  
                  <div className="mb-6 flex-1">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-gold-600 transition-colors">{vendor.name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">{vendor.category}</p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg">
                      <Star className="text-gold-500 fill-gold-500" size={14} />
                      <span className="text-xs text-slate-700 font-black">{vendor.rating}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold">{vendor.phone}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Side-over Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white border-l border-slate-200 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gold-500 rounded-2xl shadow-lg shadow-gold-500/20">
                      <Plus className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Add New Partner
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Business Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Saudi Elite Catering"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Category</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-gold-500 transition-all appearance-none cursor-pointer">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Initial Status</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-gold-500 transition-all appearance-none cursor-pointer">
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Contact Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+966 50 XXX XXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Internal Notes</label>
                    <textarea 
                      rows={5}
                      placeholder="Specialties, pricing structure, or past event context..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="pt-10 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      className="flex-1 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 transform active:scale-95"
                    >
                      Initialize Partner
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

