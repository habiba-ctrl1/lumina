"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Users,
  MessageSquare,
  XCircle,
  Plus,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  MoreVertical,
  Archive,
  Trash2,
  X,
  ExternalLink,
  PlusCircle,
  MinusCircle,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";

type QuoteRequest = {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
  eventType: string;
  eventDate: string | null;
  eventCity: string;
  guestCount: number | null;
  budgetRange: string | null;
  requirements: string | null;
  source: string;
  status: string;
  createdAt: string;
  proposals: any[];
};

type Proposal = {
  id: string;
  quoteNumber: string;
  lineItems: string; // JSON string
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  validUntil: string;
  notes: string | null;
  status: string;
};

export default function AdminQuotes() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [counts, setCounts] = useState({ pending: 0, quote_sent: 0, accepted: 0, total: 0, confirmedValue: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  
  // Modals & Sidebars
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Forms
  const [manualForm, setManualForm] = useState({
    clientName: "", clientPhone: "", clientEmail: "", eventType: "", 
    eventDate: "", eventCity: "", guestCount: "", budgetRange: "", requirements: ""
  });
  
  const [quoteForm, setQuoteForm] = useState({
    lineItems: [{ service: "", description: "", qty: 1, unitPrice: 0, total: 0 }],
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: "This quote is valid for 14 days. A 40% deposit is required to confirm the booking. All prices in Saudi Riyal (SAR) inclusive of 15% VAT."
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/quote-requests');
      const data = await response.json();
      setRequests(data.requests || []);
      setCounts(data.counts || { pending: 0, quote_sent: 0, accepted: 0, total: 0, confirmedValue: 0 });
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/quote-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchData();
        if (selectedRequest?.id === id) setIsDetailOpen(false);
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      const response = await fetch(`/api/admin/quote-requests/${id}/status`, {
        method: 'DELETE'
      });
      if (response.ok) fetchData();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm)
      });
      if (response.ok) {
        setIsManualModalOpen(false);
        setManualForm({
          clientName: "", clientPhone: "", clientEmail: "", eventType: "", 
          eventDate: "", eventCity: "", guestCount: "", budgetRange: "", requirements: ""
        });
        fetchData();
      }
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    try {
      const response = await fetch('/api/admin/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: selectedRequest.id,
          ...quoteForm
        })
      });
      if (response.ok) {
        setIsQuoteModalOpen(false);
        fetchData();
      }
    } catch (error) {
      console.error("Quote creation failed:", error);
    }
  };

  const addLineItem = () => {
    setQuoteForm({
      ...quoteForm,
      lineItems: [...quoteForm.lineItems, { service: "", description: "", qty: 1, unitPrice: 0, total: 0 }]
    });
  };

  const removeLineItem = (index: number) => {
    const newItems = [...quoteForm.lineItems];
    newItems.splice(index, 1);
    setQuoteForm({ ...quoteForm, lineItems: newItems });
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const newItems = [...quoteForm.lineItems];
    const item = { ...newItems[index], [field]: value };
    if (field === 'qty' || field === 'unitPrice') {
      item.total = (item.qty || 0) * (item.unitPrice || 0);
    }
    newItems[index] = item;
    setQuoteForm({ ...quoteForm, lineItems: newItems });
  };

  const filteredRequests = requests.filter(req => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'quote_sent': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      case 'archived': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Quote Requests</h1>
          <p className="text-slate-500 font-medium">Manage and generate luxury event proposals for your clients.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
          >
            <Plus size={16} className="text-gold-500" />
            Add Manual Request
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Requests</p>
            <h3 className="text-2xl font-black text-slate-900">{counts.pending}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Quotes Sent</p>
            <h3 className="text-2xl font-black text-slate-900">{counts.quote_sent}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confirmed Value</p>
            <h3 className="text-2xl font-black text-slate-900">SAR {counts.confirmedValue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Filters & Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-wrap items-center gap-4">
          {['all', 'pending', 'quote_sent', 'accepted', 'rejected'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === t 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center">
              <RefreshCw size={32} className="animate-spin text-slate-200 mx-auto mb-4" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Accessing Secure Records...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={32} className="text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No quote requests yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium text-sm mb-8">Quote requests from your website contact forms will appear here automatically.</p>
              <button
                onClick={() => setIsManualModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all"
              >
                <Plus size={16} /> Add Manual Request
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Client Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Event Type</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">City</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Date Received</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-8 py-6 border-b border-slate-50">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{req.clientName}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{req.clientPhone}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-slate-50">
                      <span className="text-xs font-bold text-slate-600">{req.eventType}</span>
                    </td>
                    <td className="px-8 py-6 border-b border-slate-50">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gold-500" />
                        <span className="text-xs font-bold text-slate-600">{req.eventCity}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 border-b border-slate-50">
                      <span className="text-xs font-medium text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-6 border-b border-slate-50 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(req.status)}`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-6 border-b border-slate-50 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedRequest(req); setIsDetailOpen(true); }}
                          className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                          title="View Details"
                        >
                          <ChevronRight size={18} />
                        </button>
                        {req.status === 'pending' && (
                          <button 
                            onClick={() => { setSelectedRequest(req); setIsQuoteModalOpen(true); }}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Create Quote"
                          >
                            <FileText size={18} />
                          </button>
                        )}
                        <div className="relative group/menu">
                          <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                            <MoreVertical size={18} />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all p-2">
                            <button 
                              onClick={() => updateStatus(req.id, 'rejected')}
                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors flex items-center gap-3"
                            >
                              <XCircle size={14} /> Mark Rejected
                            </button>
                            <button 
                              onClick={() => updateStatus(req.id, 'archived')}
                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-3"
                            >
                              <Archive size={14} /> Archive
                            </button>
                            <button 
                              onClick={() => deleteRequest(req.id)}
                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors flex items-center gap-3"
                            >
                              <Trash2 size={14} /> Delete Permanent
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      <AnimatePresence>
        {isDetailOpen && selectedRequest && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[80]"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[90] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Request Details</h2>
                <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                {/* Client Info */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Client Profile</span>
                  <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                        <User size={20} className="text-gold-500" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{selectedRequest.clientName}</p>
                        <p className="text-[11px] text-slate-400 font-medium">Source: {selectedRequest.source}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <Phone size={14} className="text-slate-400" /> {selectedRequest.clientPhone}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                        <Mail size={14} className="text-slate-400" /> {selectedRequest.clientEmail || "No email provided"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Event Intelligence</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Type</p>
                      <p className="text-xs font-bold text-slate-900">{selectedRequest.eventType}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Location</p>
                      <p className="text-xs font-bold text-slate-900">{selectedRequest.eventCity}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Guests</p>
                      <p className="text-xs font-bold text-slate-900">{selectedRequest.guestCount || "---"}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Budget</p>
                      <p className="text-xs font-bold text-slate-900">{selectedRequest.budgetRange || "---"}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Vision & Vision</span>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 italic">
                    <p className="text-sm text-slate-600 leading-relaxed">"{selectedRequest.requirements || "No specific requirements shared."}"</p>
                  </div>
                </div>

                {/* Proposal Summary */}
                {selectedRequest.proposals.length > 0 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Active Proposal</span>
                    <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-slate-900/20">
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Quote #{selectedRequest.proposals[0].quoteNumber}</p>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-widest">{selectedRequest.proposals[0].status}</span>
                      </div>
                      <h4 className="text-3xl font-black text-gold-500">SAR {selectedRequest.proposals[0].totalAmount.toLocaleString()}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Valid until: {new Date(selectedRequest.proposals[0].validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-3">
                {selectedRequest.status === 'pending' ? (
                  <button 
                    onClick={() => { setIsDetailOpen(false); setIsQuoteModalOpen(true); }}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Create Quote
                  </button>
                ) : (
                  <button 
                    className="flex-1 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> View Quote PDF
                  </button>
                )}
                <Link 
                  href={`https://wa.me/${selectedRequest.clientPhone.replace(/\D/g, '')}?text=Hi%20${selectedRequest.clientName},%20I'm%20contacting%20you%20from%20Saudi%20Event%20Management%20regarding%20your%20${selectedRequest.eventType}%20inquiry.`}
                  target="_blank"
                  className="w-14 h-14 bg-white border border-slate-200 text-emerald-500 rounded-xl flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-100 transition-all"
                >
                  <Phone size={20} />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Manual Request Modal */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manual Request Entry</h2>
                <button onClick={() => setIsManualModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><X size={24} /></button>
              </div>
              <form onSubmit={handleManualSubmit} className="p-10 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Name</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-gold-500 focus:outline-none" 
                    value={manualForm.clientName} onChange={e => setManualForm({...manualForm, clientName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client Phone</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-gold-500 focus:outline-none"
                    value={manualForm.clientPhone} onChange={e => setManualForm({...manualForm, clientPhone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Event Type</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-gold-500 focus:outline-none"
                    value={manualForm.eventType} onChange={e => setManualForm({...manualForm, eventType: e.target.value})}>
                    <option value="">Select...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Private Gala">Private Gala</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <input required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-gold-500 focus:outline-none"
                    value={manualForm.eventCity} onChange={e => setManualForm({...manualForm, eventCity: e.target.value})} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Requirements & Vision</label>
                  <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-gold-500 focus:outline-none resize-none"
                    value={manualForm.requirements} onChange={e => setManualForm({...manualForm, requirements: e.target.value})} />
                </div>
                <button type="submit" className="col-span-2 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl mt-4">
                  Register Lead
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quote Builder Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && selectedRequest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Quotation</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Client: {selectedRequest.clientName} | {selectedRequest.eventType}</p>
                </div>
                <button onClick={() => setIsQuoteModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"><X size={24} /></button>
              </div>

              <div className="p-10 grid grid-cols-3 gap-12">
                {/* Builder Area */}
                <div className="col-span-2 space-y-8">
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="col-span-5">Service / Item</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-3 text-right">Unit Price</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>
                    
                    <div className="space-y-3">
                      {quoteForm.lineItems.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
                          <div className="col-span-5">
                            <input 
                              placeholder="Description..." 
                              className="w-full bg-transparent border-none text-xs font-bold focus:outline-none"
                              value={item.service}
                              onChange={e => updateLineItem(idx, 'service', e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <input 
                              type="number" 
                              className="w-full bg-white border border-slate-200 rounded-lg py-2 text-center text-xs font-bold focus:outline-none focus:border-gold-500"
                              value={item.qty}
                              onChange={e => updateLineItem(idx, 'qty', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="col-span-3">
                            <input 
                              type="number" 
                              className="w-full bg-white border border-slate-200 rounded-lg py-2 text-right px-3 text-xs font-bold focus:outline-none focus:border-gold-500"
                              value={item.unitPrice}
                              onChange={e => updateLineItem(idx, 'unitPrice', parseFloat(e.target.value))}
                            />
                          </div>
                          <div className="col-span-2 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <span className="text-xs font-black text-slate-900">{item.total.toLocaleString()}</span>
                              <button onClick={() => removeLineItem(idx)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                                <MinusCircle size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={addLineItem}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-600 hover:text-gold-700 transition-colors ml-4"
                    >
                      <PlusCircle size={14} /> Add Line Item
                    </button>
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Terms & Conditions</label>
                      <textarea 
                        rows={4} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-medium text-slate-600 focus:outline-none focus:border-gold-500 resize-none"
                        value={quoteForm.notes}
                        onChange={e => setQuoteForm({...quoteForm, notes: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pricing Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-400">Subtotal</span>
                        <span>SAR {quoteForm.lineItems.reduce((a, b) => a + b.total, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-400">VAT (15%)</span>
                        <span>SAR {(quoteForm.lineItems.reduce((a, b) => a + b.total, 0) * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold-500">Total SAR</span>
                        <span className="text-3xl font-black">{(quoteForm.lineItems.reduce((a, b) => a + b.total, 0) * 1.15).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valid Until</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold focus:outline-none focus:border-gold-500"
                        value={quoteForm.validUntil}
                        onChange={e => setQuoteForm({...quoteForm, validUntil: e.target.value})}
                      />
                    </div>
                    <button 
                      onClick={handleQuoteSubmit}
                      className="w-full py-5 bg-gold-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-gold-600 transition-all shadow-xl shadow-gold-500/20"
                    >
                      Send to Client
                    </button>
                    <button className="w-full py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                      <FileText size={16} /> Preview PDF
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
                    <AlertCircle size={20} className="text-blue-500 shrink-0" />
                    <p className="text-[10px] text-blue-700 font-bold leading-relaxed uppercase tracking-wider">
                      Sending this quote will automatically update the request status to "Quote Sent" and notify the client via email.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
