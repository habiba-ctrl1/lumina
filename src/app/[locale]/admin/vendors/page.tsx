"use client";

import { useEffect, useMemo, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { Briefcase, Star, Search, RefreshCw, Plus, X, Phone, Mail, MapPin, CheckCircle2, Award, Zap, FileCheck, Camera, Users, ChevronLeft, ChevronRight, ShieldAlert, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CategoryOption } from "@/lib/categories";
import type { DuplicateCandidate } from "@/lib/vendor-dedupe";

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
  categoryLinks?: CategoryOption[];
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
  partnershipStatus?: string;
  internalRating?: number;
  preferred?: boolean;
  photoPermission?: boolean;
  notes?: { id: string; note: string; createdAt: string }[];
  applications?: {
    id: string; appNumber: string; crNumber?: string | null; vatNumber?: string | null;
    logoLink?: string | null; profileLink?: string | null; rateCardLink?: string | null;
    videoLink?: string | null; majorClients?: string | null; createdAt: string;
  }[];
  _count?: {
    quotes: number;
    events: number;
  };
};

// "Info Only" = name/category/contact on file, no partnership discussion yet
// (2026-07, founder's ask — keeps these out of "Contacted", which already
// means active outreach/consideration for other vendors).
const MEETING_STATUSES = ["Info Only", "Contacted", "Meeting Scheduled", "Met", "Negotiating", "Confirmed Partner", "Not Proceeding"];
const VERIFY_STATUSES = ["Verified", "Pending", "Unverified"];
const PARTNERSHIP_STATUSES = ["Pending", "Verified Vendor", "Partner"];
const saudiCities = ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Makkah", "Medina", "NEOM"];

export default function VendorsPage() {
  // ── Tab: Partners (partnershipStatus === "Partner"), all Vendors, or just
  // Info Only (meetingStatus === "Info Only" — a name/category on file that
  // hasn't been evaluated as a partner or vendor candidate yet; 2026-07,
  // founder's "don't mix these up with real prospects" ask) ──
  const [tab, setTab] = useState<"partners" | "vendors" | "infoOnly">("vendors");

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [newCategoryText, setNewCategoryText] = useState("");

  // ── Server-driven filters/search/sort/pagination ──
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [city, setCity] = useState("all");
  const [verify, setVerify] = useState("all");
  const [meeting, setMeeting] = useState("all");
  const [onlyPreferred, setOnlyPreferred] = useState(false);
  const [sortBy, setSortBy] = useState<"best" | "name" | "rating" | "newest">("best");
  const [page, setPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const activeFilterCount =
    (debouncedSearch ? 1 : 0) + (categoryId !== "all" ? 1 : 0) + (city !== "all" ? 1 : 0) +
    (verify !== "all" ? 1 : 0) + (meeting !== "all" ? 1 : 0) + (onlyPreferred ? 1 : 0);

  const clearFilters = () => {
    setSearch(""); setCategoryId("all"); setCity("all"); setVerify("all");
    setMeeting("all"); setOnlyPreferred(false); setPage(1);
  };

  // Matching Engine State
  const [matchService, setMatchService] = useState("");
  const [matchCity, setMatchCity] = useState("Riyadh");
  const [matchedResults, setMatchedResults] = useState<Vendor[]>([]);
  const [matching, setMatching] = useState(false);
  const [showMatchEngine, setShowMatchEngine] = useState(false);

  // Form State (Add Vendor)
  const [formData, setFormData] = useState({
    name: "",
    categoryIds: [] as string[],
    services: "",
    contactPerson: "",
    city: "Riyadh",
    email: "",
    phone: "",
    whatsapp: "",
    portfolio: "",
    pricing: "Budget",
    partnershipStatus: "Pending",
    rating: "5.0",
  });
  const [dupCandidates, setDupCandidates] = useState<DuplicateCandidate[]>([]);
  const [checkingDup, setCheckingDup] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, debouncedSearch, categoryId, city, verify, meeting, onlyPreferred, sortBy, page]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (e) {
      console.error("Failed to fetch categories:", e);
    }
  };

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: debouncedSearch,
        categoryId: categoryId === "all" ? "" : categoryId,
        city: city === "all" ? "" : city,
        verificationStatus: verify,
        meetingStatus: tab === "infoOnly" ? "Info Only" : meeting,
        partnershipStatus: tab === "partners" ? "Partner" : "all",
        preferred: onlyPreferred ? "1" : "",
        sortBy,
        page: String(page),
        pageSize: String(pageSize),
      });
      const response = await adminFetch(`/api/vendors?${params.toString()}`);
      const data = await response.json();
      if (!data.error) {
        setVendors(Array.isArray(data.vendors) ? data.vendors : []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats (lightweight — derived from the current page only where noted; the
  // header counters below use `total` from the server for accuracy at scale).
  const stats = useMemo(() => ({
    verifiedOnPage: vendors.filter((v) => v.verificationStatus === "Verified").length,
    preferredOnPage: vendors.filter((v) => v.preferred).length,
    agreementsOnPage: vendors.filter((v) => v.agreementSigned).length,
    photoPermOnPage: vendors.filter((v) => v.photoPermission).length,
  }), [vendors]);

  const runDuplicateCheck = async () => {
    if (!formData.name.trim()) return;
    setCheckingDup(true);
    try {
      const res = await adminFetch('/api/vendors/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, whatsapp: formData.whatsapp }),
      });
      const data = await res.json();
      setDupCandidates(Array.isArray(data.candidates) ? data.candidates : []);
    } catch (e) {
      console.error("Duplicate check failed:", e);
    } finally {
      setCheckingDup(false);
    }
  };

  const createCategoryInline = async () => {
    const name = newCategoryText.trim();
    if (!name) return;
    try {
      const res = await adminFetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const created = await res.json();
      if (res.ok && created.id) {
        setCategories((prev) => (prev.some((c) => c.id === created.id) ? prev : [...prev, created]));
        setFormData((f) => ({ ...f, categoryIds: [...f.categoryIds, created.id] }));
        setNewCategoryText("");
      }
    } catch (e) {
      console.error("Failed to create category:", e);
    }
  };

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const primaryCategory = categories.find((c) => c.id === formData.categoryIds[0])?.name || 'Other';
      const response = await adminFetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          category: primaryCategory,
          contactInfo: formData.email || formData.phone ? `${formData.email} | ${formData.phone}` : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        setDupCandidates([]);
        setFormData({
          name: "", categoryIds: [], services: "", contactPerson: "", city: "Riyadh",
          email: "", phone: "", whatsapp: "", portfolio: "", pricing: "Budget",
          partnershipStatus: "Pending", rating: "5.0",
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
      const categoryIds = (detail.categoryLinks || []).map((c) => c.id);
      const r = await adminFetch(`/api/vendors/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...detail, categoryIds }),
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
              if (!showMatchEngine) runMatchingEngine();
            }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-semibold text-xs tracking-wide transition-all shadow-sm ${
              showMatchEngine
                ? "bg-teal-50 border-teal-200 text-teal-700"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Zap size={14} className={showMatchEngine ? "text-teal-600 animate-pulse" : "text-slate-500"} />
            Matching Engine
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

      {/* Partners / All Vendors tabs */}
      <div className="flex gap-2 mb-5">
        {([
          { key: "vendors" as const, label: "All Vendors", icon: Briefcase },
          { key: "partners" as const, label: "Partners", icon: Handshake },
          { key: "infoOnly" as const, label: "Info Only", icon: Phone },
        ]).map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setPage(1); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              tab === t.key
                ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-teal-300"
            }`}
          >
            <t.icon size={13} /> {t.label}
          </button>
        ))}
        <span className="text-[11px] font-semibold text-slate-400 self-center ms-1">
          {tab === "partners"
            ? "Strategic partners only — deeper relationship, priority in matching"
            : tab === "infoOnly"
            ? "Name/category on file, not yet evaluated as a partner or vendor candidate"
            : "Every vendor in the network"}
        </span>
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

            <div className="flex items-center gap-2 mb-1">
              <div className="p-1 bg-teal-100 text-teal-700 rounded-lg"><Zap size={14} /></div>
              <h2 className="text-sm font-semibold text-slate-800">Vendor Matching Engine</h2>
            </div>
            <p className="text-[10px] text-slate-400 mb-4 ms-7">Category/city text match, ranked by partnership tier &amp; rating — not yet AI-powered.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end mb-5">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Service Needed</label>
                <select
                  value={matchService}
                  onChange={(e) => setMatchService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400"
                >
                  <option value="">Any Service</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
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
                        {item.partnershipStatus === "Partner" && (
                          <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded flex items-center gap-1"><Handshake size={10} /> Partner</span>
                        )}
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

      {/* Network stats — current page only for verified/preferred/etc, total is server-accurate */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {([
          [Users, "Total (this view)", total, "text-slate-700 bg-slate-100"],
          [CheckCircle2, "Verified (page)", stats.verifiedOnPage, "text-sky-700 bg-sky-50"],
          [Award, "Preferred (page)", stats.preferredOnPage, "text-amber-700 bg-amber-50"],
          [FileCheck, "Agreements (page)", stats.agreementsOnPage, "text-emerald-700 bg-emerald-50"],
          [Camera, "Photo OK (page)", stats.photoPermOnPage, "text-violet-700 bg-violet-50"],
        ] as const).map(([Icon, label, value, tone]) => (
          <div key={label} className="bg-white border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tone}`}>
              <Icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-slate-900 leading-none">{value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1 truncate">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search name, service, city, contact…"
                className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setPage(1); }}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer shadow-sm"
              >
                <option value="best">Sort: Best first</option>
                <option value="rating">Sort: Highest rating</option>
                <option value="name">Sort: Name A–Z</option>
                <option value="newest">Sort: Newest</option>
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

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryId}
              onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer shadow-sm max-w-[220px]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer shadow-sm max-w-[180px]"
            >
              <option value="all">All Cities / Regions</option>
              {saudiCities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={verify}
              onChange={(e) => { setVerify(e.target.value); setPage(1); }}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer shadow-sm"
            >
              <option value="all">All Verification</option>
              {VERIFY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={meeting}
              onChange={(e) => { setMeeting(e.target.value); setPage(1); }}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer shadow-sm"
            >
              <option value="all">All Meeting Status</option>
              {MEETING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <button
              onClick={() => { setOnlyPreferred(!onlyPreferred); setPage(1); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all shadow-sm ${
                onlyPreferred
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <Award size={12} /> Preferred
            </button>

            <span className="text-[11px] font-semibold text-slate-400 ms-auto">
              {total} {tab === "partners" ? "partners" : tab === "infoOnly" ? "info-only entries" : "vendors"} total
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all"
              >
                <X size={12} /> Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Vendors — table view (scales far better than a card grid at hundreds+ rows) */}
        <div className="p-5">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-14 bg-slate-50 animate-pulse rounded-xl border border-slate-200" />)}
            </div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
                <Briefcase size={22} className="text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm font-medium">
                No {tab === "partners" ? "partners" : tab === "infoOnly" ? "info-only entries" : "vendors"} found matching your criteria.
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-teal-600 font-bold text-xs bg-teal-50 px-4 py-2 rounded-xl hover:bg-teal-100 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-start text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="text-start py-2 pe-3">Name</th>
                    <th className="text-start py-2 px-3">Categories</th>
                    <th className="text-start py-2 px-3">City</th>
                    <th className="text-start py-2 px-3">Status</th>
                    <th className="text-start py-2 px-3">Rating</th>
                    <th className="text-start py-2 px-3">Engagement</th>
                    <th className="text-end py-2 ps-3">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      onClick={() => openVendor(vendor.id)}
                      className="border-b border-slate-50 hover:bg-slate-50/70 cursor-pointer transition-colors"
                    >
                      <td className="py-3 pe-3">
                        <p className="font-bold text-slate-800">{vendor.name}</p>
                        {vendor.contactPerson && <p className="text-[10px] text-slate-400">{vendor.contactPerson}</p>}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {(vendor.categoryLinks?.length
                            ? vendor.categoryLinks.map((c) => c.name)
                            : (vendor.categories?.length ? vendor.categories : [vendor.category])
                          ).slice(0, 3).map((c) => (
                            <span key={c} className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md">{c}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <span className="inline-flex items-center gap-1"><MapPin size={10} className="text-slate-400" /> {vendor.city || vendor.regionCoverage?.[0] || '—'}</span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {vendor.partnershipStatus === "Partner" && (
                            <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded-md flex items-center gap-1 w-fit"><Handshake size={10} /> Partner</span>
                          )}
                          {vendor.partnershipStatus === "Verified Vendor" && (
                            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md w-fit">Verified Vendor</span>
                          )}
                          {vendor.verificationStatus === "Verified" && (
                            <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> Verified</span>
                          )}
                          {vendor.preferred && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md flex items-center gap-1 w-fit"><Award size={10} /> Preferred</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-bold">
                          <Star className="text-amber-500 fill-amber-500" size={11} />
                          {(vendor.internalRating || 0) > 0 ? vendor.internalRating : (vendor.rating || 0) > 0 ? vendor.rating.toFixed(1) : "—"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500">{vendor._count?.events || 0} events · {vendor._count?.quotes || 0} quotes</td>
                      <td className="py-3 ps-3 text-end" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2 justify-end">
                          <a href={`mailto:${vendor.email || ''}`} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"><Mail size={13} /></a>
                          <a href={`https://wa.me/${(vendor.whatsapp || vendor.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50"><Phone size={13} /></a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && vendors.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold">Page {page} of {totalPages} · {total} total</span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side-over Modal — Add Vendor */}
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
                      onBlur={runDuplicateCheck}
                      placeholder="e.g. Majestic Catering Services"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-450"
                    />
                  </div>

                  {/* Duplicate warning — non-blocking, admin decides */}
                  {dupCandidates.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                      <p className="text-[11px] font-bold text-amber-700 flex items-center gap-1.5">
                        <ShieldAlert size={13} /> Possible duplicate{dupCandidates.length > 1 ? "s" : ""} found
                      </p>
                      {dupCandidates.slice(0, 3).map((c) => (
                        <div key={c.vendor.id} className="flex items-center justify-between text-[11px] bg-white rounded-lg px-2.5 py-1.5 border border-amber-100">
                          <span className="text-slate-700">
                            <strong>{c.vendor.name}</strong> ({c.vendor.category}) — matched on {c.matchedOn}
                          </span>
                          <button
                            type="button"
                            onClick={() => { setIsModalOpen(false); openVendor(c.vendor.id); }}
                            className="text-teal-600 font-semibold hover:underline"
                          >
                            Edit existing
                          </button>
                        </div>
                      ))}
                      <p className="text-[10px] text-amber-600">Not a duplicate? Continue below — this is just a warning, it won&apos;t block you.</p>
                    </div>
                  )}
                  {checkingDup && <p className="text-[10px] text-slate-400">Checking for duplicates…</p>}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Categories (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-1">
                      {categories.map((c) => {
                        const active = formData.categoryIds.includes(c.id);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setFormData((f) => ({
                              ...f,
                              categoryIds: active ? f.categoryIds.filter((id) => id !== c.id) : [...f.categoryIds, c.id],
                            }))}
                            className={`text-[11px] font-medium px-2.5 py-1.5 rounded-lg border text-start transition-all ${
                              active ? "border-teal-400 bg-teal-50 text-teal-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newCategoryText}
                        onChange={(e) => setNewCategoryText(e.target.value)}
                        placeholder="Category not listed? Type to add…"
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5 text-[11px] font-medium text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                      <button type="button" onClick={createCategoryInline} className="px-3 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-200">
                        + Add
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
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
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Partnership Status</label>
                      <select
                        value={formData.partnershipStatus}
                        onChange={(e) => setFormData({ ...formData, partnershipStatus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer"
                      >
                        {PARTNERSHIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Person</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Full name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={runDuplicateCheck}
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
                        onBlur={runDuplicateCheck}
                        placeholder="+966..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">WhatsApp</label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        onBlur={runDuplicateCheck}
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
                <div className="grid grid-cols-3 gap-3">
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
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Partnership</label>
                    <select value={detail.partnershipStatus || "Pending"}
                      onChange={(e) => setDetail({ ...detail, partnershipStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400">
                      {PARTNERSHIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Toggles + rating */}
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["agreementSigned", "Agreement Signed"],
                    ["preferred", "Preferred (site feature)"],
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

                {/* Categories — canonical picker */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Categories</label>
                  <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-1 bg-slate-50 border border-slate-200 rounded-xl">
                    {categories.map((c) => {
                      const active = (detail.categoryLinks || []).some((l) => l.id === c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setDetail({
                            ...detail,
                            categoryLinks: active
                              ? (detail.categoryLinks || []).filter((l) => l.id !== c.id)
                              : [...(detail.categoryLinks || []), c],
                          })}
                          className={`text-[11px] font-medium px-2.5 py-1.5 rounded-lg border text-start transition-all ${
                            active ? "border-teal-400 bg-teal-50 text-teal-700" : "border-white bg-white text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                  {(detail.categories?.length ?? 0) > 0 && (
                    <p className="text-[10px] text-slate-400 italic">Legacy free-text categories on file: {detail.categories!.join(", ")}</p>
                  )}
                </div>

                {/* Coverage & profile */}
                <div className="grid grid-cols-1 gap-3">
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

                {/* Originating application(s) — read-only, avoids duplicating document storage */}
                {(detail.applications?.length ?? 0) > 0 && (
                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      From onboarding application{detail.applications!.length > 1 ? "s" : ""}
                    </p>
                    {detail.applications!.map((app) => (
                      <div key={app.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-2 text-[11px] text-slate-600 space-y-1">
                        <p className="font-semibold text-slate-700">{app.appNumber}</p>
                        {app.crNumber && <p>CR: {app.crNumber}</p>}
                        {app.vatNumber && <p>VAT: {app.vatNumber}</p>}
                        {app.majorClients && <p>Major clients: {app.majorClients}</p>}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {app.logoLink && <a href={app.logoLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Logo</a>}
                          {app.profileLink && <a href={app.profileLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Profile</a>}
                          {app.rateCardLink && <a href={app.rateCardLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Rate card</a>}
                          {app.videoLink && <a href={app.videoLink} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Video</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
