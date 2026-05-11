"use client";

import { useEffect, useState } from "react";
import { Briefcase, Star, Search, RefreshCw, Plus, X, Phone, Mail, MapPin, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Vendor = {
  id: string;
  name: string;
  category: string;
  services?: string;
  contactInfo?: string;
  rating: number;
  _count?: {
    quotes: number;
    events: number;
  };
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Photography",
    services: "",
    contactInfo: "",
    rating: "5.0"
  });

  const categories = ["Photography", "Catering", "Decor", "AV & Lighting", "Transportation", "Cakes", "Floral", "Venue"];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVendors();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, category]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search, category });
      const response = await fetch(`/api/vendors?${params.toString()}`);
      const data = await response.json();
      if (!data.error) setVendors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", category: "Photography", services: "", contactInfo: "", rating: "5.0" });
        fetchVendors();
      } else {
        alert(`Failed to register partner: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("A network error occurred while registering the partner. Please check your connection.");
    } finally {
      setIsSubmitting(false);
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
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
        >
          <Plus size={18} className="text-gold-500" /> 
          Add New Partner
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row gap-6 items-end bg-slate-50/30">
          <div className="relative flex-grow w-full lg:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vendor name or services..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap items-end gap-4 w-full lg:w-auto">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-black tracking-widest px-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-gold-500 min-w-[140px] appearance-none cursor-pointer shadow-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button 
              onClick={fetchVendors}
              disabled={loading}
              className={`p-3 bg-white border border-slate-200 rounded-2xl text-gold-600 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50`}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-3xl border border-slate-100" />
              ))}
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium tracking-tight">No vendors found matching your criteria.</p>
              {(search || category !== 'all') && (
                <button 
                  onClick={() => {setSearch(""); setCategory("all");}}
                  className="mt-8 text-gold-600 font-black text-[10px] uppercase tracking-widest bg-gold-50 px-8 py-3 rounded-2xl hover:bg-gold-100 transition-all"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vendors.map((vendor, i) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-slate-100 rounded-[2rem] p-8 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/5 transition-all duration-500 group relative flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-sm">
                      <Briefcase size={26} />
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      <Star className="text-gold-500 fill-gold-500" size={14} />
                      <span className="text-xs text-slate-700 font-black">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8 flex-1">
                    <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-gold-600 transition-colors tracking-tight">{vendor.name}</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.25em] mb-4">{vendor.category}</p>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed italic">
                      {vendor.services || 'Premium services tailored for luxury events.'}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest mb-0.5">Engagement</span>
                      <span className="text-xs text-slate-900 font-black">{vendor._count?.events || 0} Events</span>
                    </div>
                    <button className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-all group-hover:text-slate-900">
                      <MoreVertical size={20} />
                    </button>
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[550px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gold-500 rounded-xl shadow-xl shadow-gold-500/20">
                    <Plus className="text-white" size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Initialize Partner
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Network Expansion</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <form onSubmit={handleAddVendor} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Business Identity</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Majestic Catering Services" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Category</label>
                      <select 
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-gold-500 appearance-none cursor-pointer"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Initial Rating</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="1.0" 
                        max="5.0" 
                        required
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Contact Metadata (Email/Phone)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      placeholder="contact@majestic.sa | +966..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500 transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Service Portfolio Summary</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.services}
                      onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      placeholder="Describe the specialized services offered by this partner..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500 transition-all placeholder:text-slate-300 resize-none"
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle2 className="text-gold-500" size={16} />}
                      {isSubmitting ? "Synchronizing..." : "Register Partner"}
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

