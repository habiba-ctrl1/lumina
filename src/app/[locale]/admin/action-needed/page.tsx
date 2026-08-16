"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-fetch";
import {
  ListChecks,
  RefreshCw,
  Users,
  ClipboardList,
  Inbox,
  MessageSquareQuote,
  ExternalLink,
  Check,
  Phone,
  ArrowRight,
} from "lucide-react";

type ClientLead = {
  id: string; name: string; email: string; phone?: string | null;
  company?: string | null; eventType?: string | null; venueCity?: string | null;
  budget?: string | null; message: string; createdAt: string;
};
type PartnerApp = {
  id: string; appNumber: string; companyName: string; contactPerson: string;
  city: string; servicesDesc?: string | null; createdAt: string;
};
type PartnerEmail = {
  id: string; category: string; gmailThreadId: string; senderName?: string | null;
  senderEmail: string; companyName?: string | null; subject?: string | null;
  summary?: string | null; suggestedAction?: string | null; needsMeeting: boolean; createdAt: string;
};
type QuoteReq = {
  id: string; clientName: string; clientPhone: string; eventType: string;
  eventCity: string; budgetRange?: string | null; createdAt: string;
};
type Data = {
  clientLeads: ClientLead[];
  partnerApplications: PartnerApp[];
  partnerEmails: PartnerEmail[];
  quoteRequests: QuoteReq[];
  cvCount: number;
  counts: { clientLeads: number; partnerApplications: number; partnerEmails: number; quoteRequests: number; total: number };
};

const dateStr = (d: string) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
const waLink = (phone?: string | null) => {
  const digits = (phone || "").replace(/[^0-9]/g, "");
  return digits ? `https://wa.me/${digits}` : null;
};

function SectionShell({
  icon: Icon, title, subtitle, count, accent, children,
}: {
  icon: React.ElementType; title: string; subtitle: string; count: number;
  accent: string; children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[13px] font-bold text-slate-900">{title}</h2>
          <p className="text-[11px] text-slate-400">{subtitle}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[12px] font-bold min-w-[26px] text-center">
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}

export default function ActionNeededPage() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminFetch("/api/admin/action-needed");
      const d = await res.json();
      if (!d.error) setData(d);
    } catch (e) {
      console.error("Failed to fetch action items:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markClientReplied = async (id: string) => {
    setBusy(id);
    try {
      const res = await adminFetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Contacted" }),
      });
      if (res.ok) await fetchData();
    } finally {
      setBusy(null);
    }
  };

  const markEmailReviewed = async (id: string) => {
    setBusy(id);
    try {
      const res = await adminFetch(`/api/admin/email-leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Reviewed" }),
      });
      if (res.ok) await fetchData();
    } finally {
      setBusy(null);
    }
  };

  const total = data?.counts.total ?? 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ListChecks size={20} className="text-emerald-600" /> Action Needed
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Everything waiting on you — clients first, then partners. Job/CV emails are filed
            away automatically and never shown here.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {loading && !data ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading your action list…</div>
      ) : total === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl">
          <Check size={30} className="mx-auto text-emerald-400 mb-3" />
          <p className="text-sm text-slate-600 font-semibold">You&apos;re all caught up 🎉</p>
          <p className="text-[12px] text-slate-400 mt-1">
            No client leads, applications, partner emails, or quote requests waiting.
          </p>
          {data && data.cvCount > 0 && (
            <p className="text-[11px] text-slate-400 mt-3">
              {data.cvCount} job/CV email{data.cvCount === 1 ? "" : "s"} filed under “CVs” — no action needed.
            </p>
          )}
        </div>
      ) : (
        <>
          {/* 1. Client leads — money first */}
          <SectionShell
            icon={Users}
            title="Client leads — reply first"
            subtitle="Real clients who haven't heard back yet"
            count={data?.counts.clientLeads ?? 0}
            accent="bg-rose-50 text-rose-500"
          >
            {data && data.clientLeads.length === 0 ? (
              <p className="px-5 py-6 text-[12px] text-slate-400">No client leads waiting. ✅</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {data?.clientLeads.map((l) => (
                  <div key={l.id} className="px-5 py-3.5 flex flex-wrap items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{l.name}</span>
                        {l.eventType && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-500">
                            {l.eventType}
                          </span>
                        )}
                        {l.venueCity && <span className="text-[11px] text-slate-400">{l.venueCity}</span>}
                        <span className="text-[11px] text-slate-300">·</span>
                        <span className="text-[11px] text-slate-400">{dateStr(l.createdAt)}</span>
                      </div>
                      <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">{l.message}</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {l.email}{l.phone ? ` · ${l.phone}` : ""}{l.budget ? ` · Budget: ${l.budget}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {waLink(l.phone) && (
                        <a
                          href={waLink(l.phone)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-all"
                        >
                          <Phone size={11} /> WhatsApp
                        </a>
                      )}
                      <button
                        disabled={busy === l.id}
                        onClick={() => markClientReplied(l.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-all disabled:opacity-60"
                      >
                        <Check size={11} /> Mark replied
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* 2. Partner applications — pending review */}
          <SectionShell
            icon={ClipboardList}
            title="Partner applications — review"
            subtitle="Onboarding form submissions waiting to approve"
            count={data?.counts.partnerApplications ?? 0}
            accent="bg-emerald-50 text-emerald-600"
          >
            {data && data.partnerApplications.length === 0 ? (
              <p className="px-5 py-6 text-[12px] text-slate-400">No applications waiting. ✅</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {data?.partnerApplications.map((a) => (
                  <div key={a.id} className="px-5 py-3.5 flex flex-wrap items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{a.companyName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-500">
                          {a.appNumber}
                        </span>
                        <span className="text-[11px] text-slate-400">{a.city}</span>
                        <span className="text-[11px] text-slate-300">·</span>
                        <span className="text-[11px] text-slate-400">{dateStr(a.createdAt)}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Contact: {a.contactPerson}</p>
                      {a.servicesDesc && (
                        <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">{a.servicesDesc}</p>
                      )}
                    </div>
                    <Link
                      href="/admin/vendor-applications"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all"
                    >
                      Review <ArrowRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* 3. Partner / client emails from Gmail triage */}
          <SectionShell
            icon={Inbox}
            title="Partner emails — from inbox"
            subtitle="Triaged from Gmail, waiting for your review"
            count={data?.counts.partnerEmails ?? 0}
            accent="bg-amber-50 text-amber-600"
          >
            {data && data.partnerEmails.length === 0 ? (
              <p className="px-5 py-6 text-[12px] text-slate-400">No new partner emails to review. ✅</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {data?.partnerEmails.map((e) => (
                  <div key={e.id} className="px-5 py-3.5 flex flex-wrap items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-900">
                          {e.companyName || e.senderName || e.senderEmail}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-500">
                          {e.category}
                        </span>
                        {e.needsMeeting && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-600">
                            Meeting?
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">{dateStr(e.createdAt)}</span>
                      </div>
                      {e.summary && <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">{e.summary}</p>}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://mail.google.com/mail/u/0/#all/${e.gmailThreadId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-50 border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition-all"
                      >
                        Open <ExternalLink size={10} />
                      </a>
                      <button
                        disabled={busy === e.id}
                        onClick={() => markEmailReviewed(e.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-800 text-white hover:bg-slate-900 transition-all disabled:opacity-60"
                      >
                        <Check size={11} /> Reviewed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* 4. Quote requests pending */}
          <SectionShell
            icon={MessageSquareQuote}
            title="Quote requests — pending"
            subtitle="Website quote requests not yet sent"
            count={data?.counts.quoteRequests ?? 0}
            accent="bg-indigo-50 text-indigo-500"
          >
            {data && data.quoteRequests.length === 0 ? (
              <p className="px-5 py-6 text-[12px] text-slate-400">No pending quote requests. ✅</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {data?.quoteRequests.map((q) => (
                  <div key={q.id} className="px-5 py-3.5 flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{q.clientName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-500">
                          {q.eventType}
                        </span>
                        <span className="text-[11px] text-slate-400">{q.eventCity}</span>
                        {q.budgetRange && <span className="text-[11px] text-slate-400">· {q.budgetRange}</span>}
                        <span className="text-[11px] text-slate-300">·</span>
                        <span className="text-[11px] text-slate-400">{dateStr(q.createdAt)}</span>
                      </div>
                    </div>
                    <Link
                      href="/admin/quotes"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all"
                    >
                      Open <ArrowRight size={11} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </SectionShell>

          {/* CVs — filed away, not actionable */}
          {data && data.cvCount > 0 && (
            <p className="text-center text-[11px] text-slate-400 pt-1">
              {data.cvCount} job/CV email{data.cvCount === 1 ? "" : "s"} filed under “CVs” and kept out of your way — no action needed.
            </p>
          )}
        </>
      )}
    </div>
  );
}
