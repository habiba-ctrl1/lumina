"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, FileText, Search, Filter, RefreshCw, X, CheckCircle, 
  Trash2, Eye, DollarSign, Calendar, AlertCircle, PlusCircle, MinusCircle, Send, Award
} from "lucide-react";

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
  createdAt: string;
  request?: {
    clientName: string;
    clientEmail: string | null;
    eventType: string;
    eventCity: string;
  } | null;
};

type QuoteRequest = {
  id: string;
  clientName: string;
  eventType: string;
  eventCity: string;
};

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedRequest, setSelectedRequest] = useState("");
  const [quoteNumber, setQuoteNumber] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<{ service: string; description: string; qty: number; unitPrice: number }[]>([
    { service: "Venue Styling & Decor", description: "Saudi floral arrangements and stage design", qty: 1, unitPrice: 35000 }
  ]);

  useEffect(() => {
    fetchProposals();
    fetchRequests();
  }, [statusFilter]);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status: statusFilter });
      const res = await fetch(`/api/admin/proposals?${params.toString()}`);
      const data = await res.json();
      setProposals(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/quote-requests");
      const data = await res.json();
      setQuoteRequests(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { service: "", description: "", qty: 1, unitPrice: 0 }]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const getSubtotal = () => lineItems.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  const getVat = (sub: number) => sub * 0.15; // 15% Saudi VAT
  const getTotal = (sub: number, vat: number) => sub + vat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !quoteNumber || lineItems.length === 0) {
      alert("Please complete the quote identity details and line items.");
      return;
    }

    setIsSubmitting(true);
    try {
      const subtotal = getSubtotal();
      const vatAmount = getVat(subtotal);
      const totalAmount = getTotal(subtotal, vatAmount);

      const payload = {
        requestId: selectedRequest,
        quoteNumber,
        lineItems,
        subtotal,
        vatAmount,
        totalAmount,
        validUntil: new Date(validUntil).toISOString(),
        notes,
        status: "draft"
      };

      const res = await fetch("/api/admin/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setLineItems([{ service: "Venue Styling & Decor", description: "Saudi floral arrangements and stage design", qty: 1, unitPrice: 35000 }]);
        setSelectedRequest("");
        setNotes("");
        setQuoteNumber("");
        setValidUntil("");
        fetchProposals();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to create proposal");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/proposals`, {
        method: "POST", // Simulating status change via a post request or API override
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }) // If endpoint is built for it
      });
      fetchProposals();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Proposals & Quotes CRM
          </h1>
          <p className="text-sm text-slate-500 font-medium">Issue, authorize, and track B2B client proposals and quotes.</p>
        </div>
        <button
          onClick={() => {
            setQuoteNumber(`SEM-Q-2026-${Math.floor(100 + Math.random() * 900)}`);
            setValidUntil(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 30 days valid
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Plus size={15} />
          Create B2B Proposal
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Value</p>
          <h3 className="text-lg font-bold text-slate-850">
            SAR {proposals.reduce((acc, p) => acc + p.totalAmount, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Accepted Value</p>
          <h3 className="text-lg font-bold text-emerald-600">
            SAR {proposals.filter(p => p.status === "accepted").reduce((acc, p) => acc + p.totalAmount, 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Pending Sent</p>
          <h3 className="text-lg font-bold text-blue-600">
            {proposals.filter(p => p.status === "sent").length} Issued
          </h3>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Draft Quotes</p>
          <h3 className="text-lg font-bold text-slate-500">
            {proposals.filter(p => p.status === "draft").length} Drafts
          </h3>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by quote number or client..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 min-w-[130px] cursor-pointer"
            >
              <option value="all">All Proposals</option>
              <option value="draft">Drafts</option>
              <option value="sent">Sent to Client</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>

            <button 
              onClick={fetchProposals}
              disabled={loading}
              className="p-2 bg-white border border-slate-200 rounded-xl text-teal-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Proposals Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
                <th className="px-6 py-3.5 text-start font-semibold">Quote ID</th>
                <th className="px-6 py-3.5 text-start font-semibold">Client Target</th>
                <th className="px-6 py-3.5 text-start font-semibold">Proposal Values</th>
                <th className="px-6 py-3.5 text-start font-semibold">Validity</th>
                <th className="px-6 py-3.5 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6"><div className="h-6 bg-slate-50 rounded-xl" /></td>
                  </tr>
                ))
              ) : proposals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">No B2B proposals found matching search criteria.</td>
                </tr>
              ) : (
                proposals.filter(p => p.quoteNumber.toLowerCase().includes(search.toLowerCase()) || (p.request?.clientName && p.request.clientName.toLowerCase().includes(search.toLowerCase()))).map((prop: any, i: number) => (
                  <motion.tr 
                    key={prop.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold shadow-sm">
                          <FileText size={15} />
                        </div>
                        <div>
                          <p className="text-slate-800 font-bold text-xs tracking-tight">{prop.quoteNumber}</p>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border inline-block mt-0.5 ${
                            prop.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            prop.status === 'sent' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            prop.status === 'draft' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                            'bg-red-50 text-red-650 border-red-100'
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {prop.request ? (
                        <div>
                          <p className="text-xs text-slate-700 font-semibold">{prop.request.clientName}</p>
                          <p className="text-[10px] text-slate-400">{prop.request.eventType} in {prop.request.eventCity}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Individual proposal</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs text-slate-800 font-bold">SAR {prop.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                        <p className="text-[9px] text-slate-400">VAT Included: SAR {prop.vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-450" />
                        <span>Valid: {new Date(prop.validUntil).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                        <Eye size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creation Modal */}
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
              className="fixed inset-y-0 end-0 w-full md:w-[600px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-550 rounded-xl text-white shadow-md">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Create Corporate Proposal</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">B2B Event Sourcing</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-450 hover:text-slate-650 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Proposal Quote ID</label>
                      <input 
                        type="text" 
                        required
                        value={quoteNumber}
                        onChange={(e) => setQuoteNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Validity Expiry</label>
                      <input 
                        type="date" 
                        required
                        value={validUntil}
                        onChange={(e) => setValidUntil(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none [color-scheme:light]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Associate Client Request</label>
                    <select 
                      required
                      value={selectedRequest}
                      onChange={(e) => setSelectedRequest(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      <option value="">Select client request...</option>
                      {quoteRequests.map(req => (
                        <option key={req.id} value={req.id}>{req.clientName} - {req.eventType} ({req.eventCity})</option>
                      ))}
                      {quoteRequests.length === 0 && (
                        <option value="dummy-req-id" className="text-slate-400">Generate Individual Quotation (Mock Request)</option>
                      )}
                    </select>
                  </div>

                  {/* Line Items */}
                  <div className="border-t border-slate-100 pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Line Items & Breakdown</label>
                      <button 
                        type="button" 
                        onClick={handleAddLineItem}
                        className="flex items-center gap-1 text-[10px] font-bold text-teal-600 hover:text-teal-700"
                      >
                        <PlusCircle size={12} /> Add Item
                      </button>
                    </div>

                    <div className="space-y-3">
                      {lineItems.map((item, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-150 relative space-y-2">
                          <button 
                            type="button" 
                            onClick={() => handleRemoveLineItem(index)}
                            className="absolute top-2.5 end-2.5 text-slate-400 hover:text-red-500"
                          >
                            <MinusCircle size={14} />
                          </button>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                              <input 
                                type="text"
                                required
                                placeholder="Service Title"
                                value={item.service}
                                onChange={(e) => handleLineItemChange(index, "service", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                              />
                            </div>
                            <div>
                              <input 
                                type="number"
                                required
                                placeholder="Qty"
                                value={item.qty}
                                onChange={(e) => handleLineItemChange(index, "qty", parseInt(e.target.value) || 1)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                              <input 
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <input 
                                type="number"
                                required
                                placeholder="SAR Rate"
                                value={item.unitPrice}
                                onChange={(e) => handleLineItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-1.5 text-xs font-semibold text-slate-700">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>SAR {getSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>VAT (15%):</span>
                      <span>SAR {getVat(getSubtotal()).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1.5 text-sm font-bold text-slate-900">
                      <span>Total Amount:</span>
                      <span>SAR {getTotal(getSubtotal(), getVat(getSubtotal())).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Proposal Terms & Notes</label>
                    <textarea 
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add event custom clauses or validity guidelines..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:border-teal-400 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send size={13} className="text-teal-400" />
                    {isSubmitting ? "Generating Workspace..." : "Authorize & Send Proposal"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
