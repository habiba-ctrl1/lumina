"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, DollarSign, Search, Filter, RefreshCw, X, CheckCircle2, 
  ArrowUpRight, ArrowDownRight, Briefcase, Tag, Calendar, ChevronRight
} from "lucide-react";

type FinancialRecord = {
  id: string;
  type: string; // revenue, expense, vendor_payment
  category: string | null;
  amount: number;
  description: string | null;
  reference: string | null;
  date: string;
  createdAt: string;
};

export default function FinancePage() {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    type: "revenue",
    category: "Event Billing",
    amount: "",
    description: "",
    reference: "",
    date: new Date().toISOString().split("T")[0]
  });

  const categories = {
    revenue: ["Event Billing", "Consultation", "Premium Package Surcharge", "Other Inflow"],
    expense: ["Vendor Payout", "Marketing budget", "Operational overhead", "Equipment Lease", "Taxes & Licensing"]
  };

  useEffect(() => {
    fetchRecords();
  }, [typeFilter]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ type: typeFilter });
      const res = await fetch(`/api/admin/finance?${params.toString()}`);
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString()
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          type: "revenue",
          category: "Event Billing",
          amount: "",
          description: "",
          reference: "",
          date: new Date().toISOString().split("T")[0]
        });
        fetchRecords();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save entry");
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalRevenue = records.filter(r => r.type === "revenue").reduce((acc, r) => acc + r.amount, 0);
  const totalExpense = records.filter(r => r.type === "expense" || r.type === "vendor_payment").reduce((acc, r) => acc + r.amount, 0);
  const netProfit = totalRevenue - totalExpense;
  const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Finance & Ledger
          </h1>
          <p className="text-sm text-slate-500 font-medium">Track income, vendor disbursements, and client billings.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <Plus size={15} />
          Register Transaction
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Gross Revenue</p>
            <h3 className="text-lg font-bold text-slate-800">SAR {totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Operating Expenses</p>
            <h3 className="text-lg font-bold text-slate-805">SAR {totalExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
          </div>
          <div className="p-2 bg-red-50 text-red-600 rounded-xl">
            <ArrowDownRight size={16} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Net Income</p>
            <h3 className={`text-lg font-bold ${netProfit >= 0 ? 'text-teal-600' : 'text-red-650'}`}>
              SAR {netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h3>
          </div>
          <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
            <DollarSign size={16} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Operating Margin</p>
            <h3 className="text-lg font-bold text-slate-800">{margin.toFixed(1)}%</h3>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-lg border">
            Healthy
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Panel */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full md:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search description, reference..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-end">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 min-w-[130px] cursor-pointer"
            >
              <option value="all">All Entries</option>
              <option value="revenue">Inflows (Revenue)</option>
              <option value="expense">Outflows (Expense)</option>
            </select>

            <button 
              onClick={fetchRecords}
              disabled={loading}
              className="p-2 bg-white border border-slate-200 rounded-xl text-teal-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Ledger table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
                <th className="px-6 py-3.5 text-start font-semibold">Classification</th>
                <th className="px-6 py-3.5 text-start font-semibold">Category</th>
                <th className="px-6 py-3.5 text-start font-semibold">Description & Notes</th>
                <th className="px-6 py-3.5 text-start font-semibold">Posting Date</th>
                <th className="px-6 py-3.5 text-end font-semibold">Sum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-6"><div className="h-6 bg-slate-50 rounded-xl" /></td>
                  </tr>
                ))
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">No ledger postings logged for this period.</td>
                </tr>
              ) : (
                records.filter(r => (r.description || '').toLowerCase().includes(search.toLowerCase()) || (r.category || '').toLowerCase().includes(search.toLowerCase())).map((record: any, i: number) => (
                  <motion.tr 
                    key={record.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded-md border ${
                          record.type === 'revenue' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                            : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {record.type === 'revenue' ? 'Inflow' : 'Outflow'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-xs text-slate-700 font-semibold">
                        <Tag size={12} className="text-slate-400" />
                        <span>{record.category || 'General'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs text-slate-800 font-semibold">{record.description || 'Ledger Posting'}</p>
                        {record.reference && <p className="text-[10px] text-slate-400">Ref ID: {record.reference}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-450" />
                        <span>{new Date(record.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <span className={`text-xs font-bold ${record.type === 'revenue' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {record.type === 'revenue' ? '+' : '-'} SAR {record.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
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
              className="fixed inset-y-0 end-0 w-full md:w-[450px] bg-white border-l border-slate-200 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-500 rounded-xl text-white shadow-md">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Register Transaction</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Posting Ledger</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <form onSubmit={handleAddRecord} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transaction Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        setFormData({
                          ...formData,
                          type: newType,
                          category: categories[newType as 'revenue' | 'expense'][0]
                        });
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      <option value="revenue">Inflow (Revenue)</option>
                      <option value="expense">Outflow (Expense)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Post Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      {categories[formData.type as 'revenue' | 'expense'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transaction Date</label>
                      <input 
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 [color-scheme:light] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Amount (SAR)</label>
                      <input 
                        type="number"
                        required
                        step="0.01"
                        placeholder="e.g. 75000"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Reference ID / Code</label>
                    <input 
                      type="text"
                      placeholder="e.g. Event ID, Invoice Code"
                      value={formData.reference}
                      onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Transaction description</label>
                    <textarea 
                      rows={3}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter posting narration..." 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium focus:border-teal-400 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <RefreshCw className="animate-spin" size={14} /> : <CheckCircle2 className="text-teal-400" size={14} />}
                    {isSubmitting ? "Post Posting..." : "Commit Transaction"}
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
