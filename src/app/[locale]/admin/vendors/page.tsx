"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { Briefcase, Star, Search, RefreshCw, Plus, X, Phone, Mail, MapPin, MoreVertical, CheckCircle2, Award, Zap, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Vendor = {
  id: string;
  name: string;
  category: string;
  services?: string;
  contactInfo?: string;
  city?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  portfolio?: string;
  pricing?: string;
  availability?: string;
  rating: number;
  contactPerson?: string;
  categories?: string[];
  regionCoverage?: string[];
  yearsExperience?: number | null;
  certifications?: string;
  rateCardSummary?: string;
  rateCardFiles?: string;
  portfolioFiles?: string;
  meetingStatus?: string;
  agreementSigned?: boolean;
  agreementDate?: string | null;
  verificationStatus?: string;
  internalRating?: number;
  preferred?: boolean;
  photoPermission?: boolean;
  notes?: { id: string; note: string; createdAt: string }[];
  _count?: {
    quotes: number;
    events: number;
  };
};

const MEETING_STATUSES = ["Contacted", "Meeting Scheduled", "Met", "Negotiating", "Confirmed Partner", "Not Proceeding"];
const VERIFY_STATUSES = ["Verified", "Pending", "Unverified"];

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Matching Engine State
  const [matchService, setMatchService] = useState("");
  const [matchCity, setMatchCity] = useState("Riyadh");
  const [matchedResults, setMatchedResults] = useState<Vendor[]>([]);
  const [matching, setMatching] = useState(false);
  const [showMatchEngine, setShowMatchEngine] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Venue",
    services: "",
    contactInfo: "",
    city: "Riyadh",
    email: "",
    phone: "",
    whatsapp: "",
    portfolio: "",
    pricing: "Budget",
    availability: "Available",
    rating: "5.0"
  });

  const categories = [
    "Venues",
    "Catering",
    "Decor",
    "Lighting",
    "Photography",
    "Entertainment",
    "Furniture",
    "AV Equipment",
    "Luxury Cars"
  ];

  const saudiCities = ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Makkah", "Medina", "NEOM"];

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
      const response = await adminFetch(`/api/vendors?${params.toString()}`);
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
      // Combine contact info for legacy column
      const contactInfoCombined = formData.email || formData.phone
        ? `${formData.email} | ${formData.phone}`
        : formData.contactInfo;

      const response = await adminFetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          contactInfo: contactInfoCombined
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({
          name: "",
          category: "Venue",
          services: "",
          contactInfo: "",
          city: "Riyadh",
          email: "",
          phone: "",
          whatsapp: "",
          portfolio: "",
          pricing: "Budget",
          availability: "Available",
          rating: "5.0"
        });
        fetchVendors();
      } else {
        alert(`Failed to register partner: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("A network error occurred while registering the partner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Vendor detail panel (view/edit + append-only notes) ──
  const [detail, setDetail] = useState<Vendor | null>(null);
  const [savingDetail, setSavingDetail] = useState(false);
  const [newNote, setNewNote] = useState("");

  const openVendor = async (id: string) => {
    try {
      const r = await adminFetch(`/api/vendors/${id}`);
      const d = await r.json();
      if (!d.error) setDetail(d);
    } catch (e) { console.error("Failed to load vendor:", e); }
  };

  const saveDetail = async () => {
    if (!detail) return;
    setSavingDetail(true);
    try {
      const r = await adminFetch(`/api/vendors/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detail),
      });
      if (r.ok) fetchVendors();
      else alert("Save failed");
    } finally { setSavingDetail(false); }
  };

  const addNote = async () => {
    if (!detail || !newNote.trim()) return;
    const r = await adminFetch(`/api/vendors/${detail.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote }),
    });
    if (r.ok) { setNewNote(""); openVendor(detail.id); }
  };

  const runMatchingEngine = async () => {
    setMatching(true);
    try {
      const params = new URLSearchParams({ service: matchService, city: matchCity });
      const res = await adminFetch(`/api/admin/vendor-match?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.matches)) {
        setMatchedResults(data.matches);
      }
    } catch (error) {
      console.error("Error running match engine:", error);
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Partners & Vendor Network
          </h1>
          <p className="text-slate-500 text-sm">Manage your professional network of elite event service providers.</p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => {
              setShowMatchEngine(!showMatchEngine);
              if(!showMatchEngine) runMatchingEngine();
            }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-semibold text-xs tracking-wide transition-all shadow-sm ${
              showMatchEngine 
                ? "bg-teal-50 border-teal-200 text-teal-700" 
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Zap size={14} className={showMatchEngine ? "text-teal-600 animate-pulse" : "text-slate-500"} />
            AI Matching Engine
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Plus size={15} /> 
            Add New Partner
          </button>
        </div>
      </div>

      {/* AI Vendor Matching Engine Widget */}
      <AnimatePresence>
        {showMatchEngine && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-teal-200/60 rounded-2xl p-5 mb-6 shadow-sm shadow-teal-500/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3">
              <button onClick={() => setShowMatchEngine(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-teal-100 text-teal-700 rounded-lg"><Zap size={14} /></div>
              <h2 className="text-sm font-semibold text-slate-800">Smart Vendor Matching Engine</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mb-5">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Service Needed</label>
                <select
                  value={matchService}
                  onChange={(e) => setMatchService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400"
                >
                  <option value="">Any Service</option>
                  {["Tents & Structures", "Catering", "Entertainment", "Decor", "AV", "Full-Service", "Venues", "Wedding", "Transportation", "Scaffolding", "Speakers"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">City / Region</label>
                <select
                  value={matchCity}
                  onChange={(e) => setMatchCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400"
                >
                  {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button
                onClick={runMatchingEngine}
                disabled={matching}
                className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-55"
              >
                {matching ? "Matching..." : "Auto Match Vendors"}
              </button>
            </div>

            {/* Match Results — top 5, ranked: Verified > Preferred > internal rating */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-700">Best Matches ({matchedResults.length})</h3>
                <span className="text-[10px] text-slate-400 italic">Date availability not tracked yet — confirm with vendor before quoting</span>
              </div>
              {matchedResults.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic p-3 bg-white rounded-xl border border-dashed">No matching partners found. Try &quot;Any Service&quot; or a different city.</p>
              ) : (
                <div className="space-y-1.5">
                  {matchedResults.map((item, i) => (
                    <div key={item.id} onClick={() => openVendor(item.id)}
                      className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs hover:border-teal-300 transition-all cursor-pointer">
                      <div className="min-w-0 flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {(item.categories?.length ? item.categories : [item.category]).join(" · ")} — {item.regionCoverage?.join(", ") || item.city || "Saudi Arabia"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.verificationStatus === "Verified" && (
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded flex items-center gap-1"><CheckCircle2 size={10} /> Verified</span>
                        )}
                        {item.preferred && (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1"><Award size={10} /> Preferred</span>
                        )}
                        <span className="flex items-center gap-1 text-[11px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                          <Star size={10} className="fill-current" />
                          {(item.internalRating || 0) > 0 ? item.internalRating : "—"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by vendor name or services..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 min-w-[130px] appearance-none cursor-pointer shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
            </select>

            <button 
              onClick={fetchVendors}
              disabled={loading}
              className="p-2 bg-white border border-slate-200 rounded-xl text-teal-600 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-5">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i: any) => (
                <div key={i} className="h-44 bg-slate-50 animate-pulse rounded-2xl border border-slate-200" />
              ))}
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <Briefcase size={22} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm font-medium">No vendors found matching your criteria.</p>
              {(search || category !== 'all') && (
                <button 
                  onClick={() => {setSearch(""); setCategory("all");}}
                  className="mt-4 text-teal-600 font-bold text-xs bg-teal-50 px-4 py-2 rounded-xl hover:bg-teal-100 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vendors.map((vendor: any) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => openVendor(vendor.id)}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 hover:border-teal-400 hover:shadow-md transition-all duration-300 flex flex-col relative cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                      <Briefcase size={18} />
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                      <Star className="text-amber-500 fill-amber-500" size={12} />
                      <span className="text-xs text-slate-700 font-bold">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <h3 className="text-sm font-bold text-slate-800 mb-0.5 tracking-tight">{vendor.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md">
                        {vendor.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                        <MapPin size={10} /> {vendor.city || 'Riyadh'}
                      </span>
                      {vendor.meetingStatus && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                          vendor.meetingStatus === "Confirmed Partner" ? "bg-emerald-50 text-emerald-700"
                          : vendor.meetingStatus === "Not Proceeding" ? "bg-rose-50 text-rose-600"
                          : "bg-amber-50 text-amber-700"}`}>
                          {vendor.meetingStatus}
                        </span>
                      )}
                      {vendor.verificationStatus === "Verified" && (
                        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 size={10} /> Verified
                        </span>
                      )}
                      {vendor.preferred && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Award size={10} /> Preferred
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {vendor.services || 'Premium services tailored for luxury events.'}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-400">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-slate-400">Engagement</span>
                      <span className="text-xs text-slate-700 font-semibold">{vendor._count?.events || 0} Events</span>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <a href={`mailto:${vendor.email || ''}`} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"><Mail size={14} /></a>
                      <a href={`https://wa.me/${(vendor.whatsapp || vendor.phone || '').replace(/\D/g, '')}`} target="_blank" className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50"><Phone size={14} /></a>
                    </div>
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 end-0 w-full md:w-[500px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500 rounded-xl text-white shadow-md">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800 tracking-tight">
                      Register Partner
                    </h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Network Expansion</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <form onSubmit={handleAddVendor} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Business Identity</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Majestic Catering Services" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-450"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category</label>
                      <select 
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer"
                      >
                        {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">City</label>
                      <select 
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer"
                      >
                        {saudiCities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@company.sa" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone (Mobile)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">WhatsApp URL/Number</label>
                      <input 
                        type="text" 
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+9665..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Portfolio Website</label>
                      <input 
                        type="text" 
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        placeholder="https://..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pricing Level</label>
                      <select 
                        value={formData.pricing}
                        onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      >
                        <option value="Budget">Budget</option>
                        <option value="Premium">Premium</option>
                        <option value="Luxury / VIP">Luxury / VIP</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Initial Rating</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="1.0" 
                        max="5.0" 
                        required
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Service Portfolio Summary</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.services}
                      onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      placeholder="Describe the specialized services offered by this partner..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-400 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle2 className="text-teal-400" size={14} />}
                      {isSubmitting ? "Synchronizing..." : "Register Partner"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Vendor Detail / Edit side-over */}
      <AnimatePresence>
        {detail && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDetail(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 end-0 w-full md:w-[560px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-slate-800 tracking-tight truncate">{detail.name}</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Partner Record · {detail._count?.events || 0} events · {detail._count?.quotes || 0} quotes
                  </p>
                </div>
                <button onClick={() => setDetail(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Status row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Meeting Status</label>
                    <select value={detail.meetingStatus || "Contacted"}
                      onChange={(e) => setDetail({ ...detail, meetingStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400">
                      {MEETING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verification</label>
                    <select value={detail.verificationStatus || "Pending"}
                      onChange={(e) => setDetail({ ...detail, verificationStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400">
                      {VERIFY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Toggles + rating */}
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["agreementSigned", "Agreement Signed"],
                    ["preferred", "Preferred Partner"],
                    ["photoPermission", "Photo Permission"],
                  ] as const).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer">
                      <input type="checkbox" checked={!!detail[key]}
                        onChange={(e) => setDetail({ ...detail, [key]: e.target.checked })}
                        className="accent-teal-600" />
                      <span className="text-xs font-semibold text-slate-700">{label}</span>
                    </label>
                  ))}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                    <span className="text-xs font-semibold text-slate-700">Internal Rating</span>
                    <select value={detail.internalRating ?? 0}
                      onChange={(e) => setDetail({ ...detail, internalRating: parseInt(e.target.value) })}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 ms-auto">
                      {[0, 1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n === 0 ? "—" : "★".repeat(n)}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact (private) */}
                <div className="border border-rose-100 bg-rose-50/40 rounded-xl p-3 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Private — never shown to clients</p>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      ["contactPerson", "Contact Person"],
                      ["phone", "Phone"],
                      ["email", "Email"],
                      ["whatsapp", "WhatsApp"],
                    ] as const).map(([key, label]) => (
                      <div key={key} className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
                        <input type="text" value={(detail[key] as string) || ""}
                          onChange={(e) => setDetail({ ...detail, [key]: e.target.value })}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coverage & profile */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Categories (comma separated)</label>
                    <input type="text" value={(detail.categories || []).join(", ")}
                      onChange={(e) => setDetail({ ...detail, categories: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Region Coverage (comma separated)</label>
                    <input type="text" value={(detail.regionCoverage || []).join(", ")}
                      onChange={(e) => setDetail({ ...detail, regionCoverage: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rate Card Summary (internal reference only)</label>
                    <textarea rows={3} value={detail.rateCardSummary || ""}
                      onChange={(e) => setDetail({ ...detail, rateCardSummary: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-400 resize-none" />
                  </div>
                </div>

                <button onClick={saveDetail} disabled={savingDetail}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {savingDetail ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle2 className="text-teal-400" size={14} />}
                  {savingDetail ? "Saving…" : "Save Changes"}
                </button>

                {/* Append-only notes log */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Meeting / Interaction Log (append-only)</p>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addNote()}
                      placeholder="Add a new note (old notes are never overwritten)…"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-400" />
                    <button onClick={addNote} className="px-4 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-500">Add</button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {(detail.notes || []).length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic">No notes yet.</p>
                    ) : (
                      (detail.notes || []).map((n) => (
                        <div key={n.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                          <p className="text-[10px] text-slate-400 font-semibold mb-1">
                            {new Date(n.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{n.note}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
