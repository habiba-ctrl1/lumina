"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import {
  Inbox,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Paperclip,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Lead = {
  id: string;
  category: string;
  gmailThreadId: string;
  senderEmail: string;
  senderName?: string | null;
  companyName?: string | null;
  subject?: string | null;
  summary?: string | null;
  suggestedAction?: string | null;
  needsMeeting: boolean;
  attachmentNames?: string | null;
  draftCreated: boolean;
  status: string;
  createdAt: string;
};

const STATUS_TABS = ["New", "Reviewed", "Actioned", "all"] as const;
const CATEGORIES = ["all", "Partnership", "CV", "ClientInquiry", "Spam", "Uncertain"] as const;

const categoryBadge = (category: string) =>
  category === "Partnership"
    ? "bg-teal-50 text-teal-700 border-teal-200"
    : category === "CV"
    ? "bg-slate-50 text-slate-500 border-slate-200"
    : category === "ClientInquiry"
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : category === "Spam"
    ? "bg-red-50 text-red-400 border-red-200"
    : "bg-purple-50 text-purple-600 border-purple-200";

const statusBadge = (status: string) =>
  status === "New"
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : status === "Reviewed"
    ? "bg-blue-50 text-blue-600 border-blue-200"
    : "bg-emerald-50 text-emerald-600 border-emerald-200";

export default function EmailLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState({ new: 0, reviewed: 0, actioned: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof STATUS_TABS)[number]>("New");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/email-leads?status=${tab}&category=${category}`);
      const data = await res.json();
      if (!data.error) {
        setLeads(data.leads || []);
        setCounts(data.counts || { new: 0, reviewed: 0, actioned: 0 });
      }
    } catch (e) {
      console.error("Failed to fetch email leads:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, category]);

  const setStatus = async (id: string, status: string) => {
    setBusy(id);
    try {
      const res = await adminFetch(`/api/admin/email-leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) await fetchLeads();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Inbox size={20} className="text-teal-600" /> Email Leads
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Inbox-triage log from infosaudieventmanagement@gmail.com — replies wait as Gmail
            drafts, this is just the paper trail. Attachment content is never parsed, only filenames.
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => {
          const count = t === "New" ? counts.new : t === "Reviewed" ? counts.reviewed : t === "Actioned" ? counts.actioned : counts.new + counts.reviewed + counts.actioned;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-all border ${
                tab === t
                  ? "bg-teal-50 border-teal-200 text-teal-700"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {t === "all" ? "All" : t} <span className="opacity-60 ms-1">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all border ${
              category === c
                ? "bg-slate-800 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {c === "all" ? "All categories" : c}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading email leads…</div>
      ) : leads.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl">
          <Inbox size={28} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500 font-medium">
            No {tab === "all" ? "" : tab.toLowerCase() + " "}email leads yet
          </p>
          <p className="text-[12px] text-slate-400 mt-1">
            These appear once the inbox-triage routine runs against infosaudieventmanagement@gmail.com.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => {
            const isOpen = expanded === lead.id;
            return (
              <div key={lead.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : lead.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-start hover:bg-slate-50/50 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-bold text-slate-900 truncate">
                        {lead.companyName || lead.senderName || lead.senderEmail}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${categoryBadge(lead.category)}`}>
                        {lead.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                      {lead.needsMeeting && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-600 text-[10px] font-semibold">
                          <Star size={9} /> Meeting?
                        </span>
                      )}
                      {lead.attachmentNames && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                          <Paperclip size={9} /> {lead.attachmentNames}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500">
                      <span className="truncate">{lead.subject || "(no subject)"}</span>
                      <span>{lead.senderEmail}</span>
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3">
                        {lead.summary && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                              AI summary
                            </p>
                            <p className="text-[13px] text-slate-700 whitespace-pre-wrap">{lead.summary}</p>
                          </div>
                        )}
                        {lead.suggestedAction && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                              Suggested action
                            </p>
                            <p className="text-[13px] text-slate-700">{lead.suggestedAction}</p>
                          </div>
                        )}
                        <a
                          href={`https://mail.google.com/mail/u/0/#all/${lead.gmailThreadId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:border-teal-300 hover:text-teal-700 transition-all"
                        >
                          Open thread in Gmail <ExternalLink size={10} className="text-slate-400" />
                        </a>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {lead.status !== "Reviewed" && (
                            <button
                              disabled={busy === lead.id}
                              onClick={() => setStatus(lead.id, "Reviewed")}
                              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 transition-all disabled:opacity-60"
                            >
                              Mark Reviewed
                            </button>
                          )}
                          {lead.status !== "Actioned" && (
                            <button
                              disabled={busy === lead.id}
                              onClick={() => setStatus(lead.id, "Actioned")}
                              className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-all disabled:opacity-60"
                            >
                              Mark Actioned
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
