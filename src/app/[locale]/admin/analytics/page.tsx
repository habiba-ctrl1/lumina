"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, BarChart3, PieChart, Users, Award, 
  Layers, CheckCircle2, RefreshCw, Briefcase, DollarSign, Calendar
} from "lucide-react";

type AnalyticsData = {
  counters: {
    totalEvents: number;
    totalClients: number;
    totalVendors: number;
    totalInquiries: number;
    totalProposals: number;
  };
  eventTypes: { name: string; value: number }[];
  eventStatuses: { name: string; value: number }[];
  vendorCategories: { name: string; value: number }[];
  monthlyFinance: { month: string; revenue: number; expense: number }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats/analytics");
      const json = await res.json();
      if (!json.error) setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getMaximumFinance = () => {
    if (!data) return 10000;
    const maxVal = Math.max(
      ...data.monthlyFinance.map(f => Math.max(f.revenue, f.expense))
    );
    return maxVal === 0 ? 10000 : maxVal;
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Analytics & Reports
          </h1>
          <p className="text-sm text-slate-500 font-medium">Analyze business indicators, event spreads, and financial metrics.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-sm active:scale-95 transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-teal-650" : "text-teal-650"} />
          Refresh Stats
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === "overview" 
              ? "bg-slate-900 text-white border-slate-900" 
              : "bg-white text-slate-500 hover:bg-slate-50 border-slate-200"
          }`}
        >
          Overview KPI
        </button>
        <button 
          onClick={() => setActiveTab("market")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === "market" 
              ? "bg-slate-900 text-white border-slate-900" 
              : "bg-white text-slate-500 hover:bg-slate-50 border-slate-200"
          }`}
        >
          Event Segments
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4">
          <RefreshCw className="animate-spin text-teal-650" size={32} />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading Business Intelligence Hub...</p>
        </div>
      ) : !data ? (
        <div className="text-center py-20 bg-white border rounded-2xl">
          <p className="text-slate-450 italic text-sm">Failed to aggregate statistics. Please retry.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Counters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Events Managed</p>
              <h3 className="text-xl font-bold text-slate-800">{data.counters.totalEvents}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">CRM Clients</p>
              <h3 className="text-xl font-bold text-slate-850">{data.counters.totalClients}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Registered Partners</p>
              <h3 className="text-xl font-bold text-slate-800">{data.counters.totalVendors}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Inbound Leads</p>
              <h3 className="text-xl font-bold text-slate-800">{data.counters.totalInquiries}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">B2B Proposals</p>
              <h3 className="text-xl font-bold text-slate-800">{data.counters.totalProposals}</h3>
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Financial chart */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm md:col-span-2">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-1.5">
                  <DollarSign size={16} className="text-teal-650" />
                  Financial Inflows & Outflows (SAR)
                </h3>
                
                <div className="h-64 flex items-end gap-5 pt-6 border-b border-slate-150">
                  {data.monthlyFinance.map((f, i) => {
                    const maxVal = getMaximumFinance();
                    const revenueHeight = (f.revenue / maxVal) * 180;
                    const expenseHeight = (f.expense / maxVal) * 180;
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div className="w-full flex justify-center gap-1">
                          {/* Revenue bar */}
                          <div 
                            style={{ height: `${Math.max(revenueHeight, 4)}px` }}
                            className="w-3 bg-teal-500 rounded-t-sm relative group cursor-pointer"
                          >
                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
                              Revenue: {f.revenue.toLocaleString()}
                            </span>
                          </div>
                          {/* Expense bar */}
                          <div 
                            style={{ height: `${Math.max(expenseHeight, 4)}px` }}
                            className="w-3 bg-red-400 rounded-t-sm relative group cursor-pointer"
                          >
                            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded font-bold opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
                              Expense: {f.expense.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1">{f.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 justify-end mt-4 text-[10px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-teal-500 rounded-sm" />
                    <span className="text-slate-500">Inflows (Revenue)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-sm" />
                    <span className="text-slate-500">Outflows (Expense)</span>
                  </div>
                </div>
              </div>

              {/* Conversion and stats details */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
                  <TrendingUp size={16} className="text-teal-650" />
                  Performance Insights
                </h3>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Proposal Success Ratio</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-bold text-slate-800">
                      {data.counters.totalInquiries > 0 
                        ? ((data.counters.totalProposals / data.counters.totalInquiries) * 100).toFixed(1)
                        : "0.0"}%
                    </h4>
                    <span className="text-[10px] text-teal-600 font-bold">Proposal Generation</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Event to Lead Ratio</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-bold text-slate-850">
                      {data.counters.totalInquiries > 0 
                        ? ((data.counters.totalEvents / data.counters.totalInquiries) * 100).toFixed(1)
                        : "0.0"}%
                    </h4>
                    <span className="text-[10px] text-emerald-600 font-bold">Execution Speed</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Partner Sourcing Capacity</p>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl font-bold text-slate-800">
                      {data.counters.totalVendors} Active
                    </h4>
                    <span className="text-[10px] text-blue-600 font-bold">Registered vendors</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "market" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event type distribution */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-1.5">
                  <Layers size={16} className="text-teal-650" />
                  Event Type Distribution
                </h3>
                <div className="space-y-3">
                  {data.eventTypes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No events registered to analyze.</p>
                  ) : (
                    data.eventTypes.map((item, idx) => {
                      const total = data.counters.totalEvents || 1;
                      const percentage = (item.value / total) * 100;
                      
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{item.name}</span>
                            <span>{item.value} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${percentage}%` }}
                              className="bg-teal-500 h-full rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Vendor Category spread */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-1.5">
                  <Briefcase size={16} className="text-teal-650" />
                  Vendor Partners Categories Segment
                </h3>
                <div className="space-y-3">
                  {data.vendorCategories.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No vendors registered to analyze.</p>
                  ) : (
                    data.vendorCategories.map((item, idx) => {
                      const total = data.counters.totalVendors || 1;
                      const percentage = (item.value / total) * 100;
                      
                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{item.name}</span>
                            <span>{item.value} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${percentage}%` }}
                              className="bg-blue-500 h-full rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
