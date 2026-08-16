"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import {
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Trash2,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Link as LinkIcon,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Application = {
  id: string;
  appNumber: string;
  status: string;
  companyName: string;
  businessType?: string | null;
  contactPerson: string;
  jobTitle?: string | null;
  whatsapp: string;
  email?: string | null;
  phone?: string | null;
  city: string;
  regionCoverage: string[];
  website?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  googleMaps?: string | null;
  categories: string[];
  servicesDesc?: string | null;
  yearsInBusiness?: string | null;
  teamSize?: string | null;
  languages?: string | null;
  crNumber?: string | null;
  vatNumber?: string | null;
  logoLink?: string | null;
  profileLink?: string | null;
  portfolioLink?: string | null;
  videoLink?: string | null;
  rateCardLink?: string | null;
  pricingType?: string | null;
  majorClients?: string | null;
  certifications?: string | null;
  permLogoUse: boolean;
  permMediaUse: boolean;
  permNonCircumvention: boolean;
  featureOnSem: boolean;
  backlinkAnswer?: string | null;
  extraNotes?: string | null;
  vendorId?: string | null;
  createdAt: string;
  isQuickRegistration?: boolean;
};

type VendorOption = { id: string; name: string; category: string };

const STATUS_TABS = ["Pending", "Approved", "Rejected", "all"] as const;

const statusBadge = (status: string) =>
  status === "Pending"
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : status === "Approved"
    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
    : "bg-red-50 text-red-500 border-red-200";

function LinkRow({ label, url }: { label: string; url?: string | null }) {
  const [opening, setOpening] = useState(false);
  if (!url) return null;

  // Files uploaded through the onboarding form live in the PRIVATE
  // "vendor-files" bucket as "supabase://…" paths — open via a short-lived
  // signed URL from the admin-guarded file-url route.
  if (url.startsWith("supabase://")) {
    const openFile = async () => {
      setOpening(true);
      try {
        const res = await adminFetch(
          `/api/partner-applications/file-url?path=${encodeURIComponent(url)}`
        );
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error(data.error || "Failed to open file");
        window.open(data.url, "_blank", "noopener,noreferrer");
      } catch {
        alert("Could not open the file — check that SUPABASE_SERVICE_ROLE_KEY is set.");
      } finally {
        setOpening(false);
      }
    };
    return (
      <button
        type="button"
        onClick={openFile}
        disabled={opening}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[12px] font-medium text-emerald-700 hover:border-emerald-300 transition-all disabled:opacity-60"
      >
        <LinkIcon size={11} /> {label} (uploaded){" "}
        <ExternalLink size={10} className="text-emerald-400" />
      </button>
    );
  }

  const href = url.startsWith("http") ? url : `https://${url}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition-all"
    >
      <LinkIcon size={11} /> {label} <ExternalLink size={10} className="text-slate-400" />
    </a>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
      <p className="text-[13px] text-slate-700 whitespace-pre-wrap">{value}</p>
    </div>
  );
}

export default function VendorApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof STATUS_TABS)[number]>("Pending");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null); // app id with approve panel open
  const [mergeVendorId, setMergeVendorId] = useState("");
  const [vendorOptions, setVendorOptions] = useState<VendorOption[]>([]);
  const [busy, setBusy] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // 1. Fetch formal Partner Applications
      const res = await adminFetch(`/api/partner-applications?status=${tab}`);
      const data = await res.json();
      const formalApps: Application[] = !data.error ? data.applications || [] : [];
      const baseCounts = data.counts || { pending: 0, approved: 0, rejected: 0 };

      // 2. Fetch initial Vendor Registration inquiries
      let vendorInquiries: Application[] = [];
      try {
        const inqRes = await fetch("/api/contact?audience=partner");
        const inqData = await inqRes.json();
        if (Array.isArray(inqData)) {
          vendorInquiries = inqData.map((inq: any) => {
            let pLink: string | null = null;
            if (inq.message && inq.message.includes("Portfolio: ")) {
              const match = inq.message.match(/Portfolio:\s*([^\s\n]+)/);
              if (match) pLink = match[1];
            }

            return {
              id: inq.id,
              appNumber: "INQ-REG",
              status: inq.status || "Pending",
              companyName: inq.company || inq.name || "Vendor Registration",
              contactPerson: inq.name,
              whatsapp: inq.phone || "N/A",
              phone: inq.phone,
              email: inq.email,
              city: inq.venueCity || "Saudi Arabia",
              regionCoverage: [],
              categories: [inq.eventType || "Vendor / Partnership"],
              servicesDesc: inq.message,
              portfolioLink: pLink,
              permLogoUse: false,
              permMediaUse: false,
              permNonCircumvention: false,
              featureOnSem: false,
              createdAt: inq.createdAt,
              isQuickRegistration: true,
            };
          });
        }
      } catch (inqErr) {
        console.error("Failed to fetch vendor inquiries:", inqErr);
      }

      const filteredInquiries = tab === "all"
        ? vendorInquiries
        : vendorInquiries.filter((i) => (i.status || "Pending").toLowerCase() === tab.toLowerCase());

      const combined = [...formalApps, ...filteredInquiries].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const inqPending = vendorInquiries.filter((i) => (i.status || "Pending").toLowerCase() === "pending").length;
      const inqApproved = vendorInquiries.filter((i) => (i.status || "").toLowerCase() === "approved").length;
      const inqRejected = vendorInquiries.filter((i) => (i.status || "").toLowerCase() === "rejected").length;

      setApplications(combined);
      setCounts({
        pending: baseCounts.pending + inqPending,
        approved: baseCounts.approved + inqApproved,
        rejected: baseCounts.rejected + inqRejected,
      });
    } catch (e) {
      console.error("Failed to fetch applications:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const [dupCandidates, setDupCandidates] = useState<{ vendor: VendorOption & { id: string }; matchedOn: string }[]>([]);

  const openApprovePanel = async (appId: string) => {
    setApproving(appId);
    setMergeVendorId("");
    setDupCandidates([]);
    if (vendorOptions.length === 0) {
      try {
        const res = await adminFetch("/api/vendors?pageSize=100&sortBy=name");
        const data = await res.json();
        if (Array.isArray(data.vendors)) {
          setVendorOptions(data.vendors.map((v: any) => ({ id: v.id, name: v.name, category: v.category })));
        }
      } catch (e) {
        console.error("Failed to fetch vendors:", e);
      }
    }
  };

  const act = async (id: string, body: Record<string, unknown>, isQuickRegistration?: boolean) => {
    setBusy(true);
    try {
      if (isQuickRegistration) {
        const newStatus = body.action === "reject" ? "Rejected" : body.action === "reopen" ? "Pending" : "Approved";
        const res = await fetch(`/api/contact?id=${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setApproving(null);
          setDupCandidates([]);
          await fetchApplications();
        } else {
          alert("Failed to update status");
        }
      } else {
        const res = await adminFetch(`/api/partner-applications/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          setApproving(null);
          setDupCandidates([]);
          await fetchApplications();
        } else if (res.status === 409) {
          const data = await res.json();
          setDupCandidates(data.candidates || []);
        } else {
          const data = await res.json();
          alert(data.error || "Action failed");
        }
      }
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string, appNumber: string, vendorId?: string | null, isQuickRegistration?: boolean) => {
    const warning = vendorId
      ? `Delete application ${appNumber}? This only removes the application record — the vendor it already created stays in your Vendors list and must be deleted separately if unwanted. This cannot be undone.`
      : `Delete submission ${appNumber}? This cannot be undone.`;
    if (!confirm(warning)) return;
    setBusy(true);
    try {
      if (isQuickRegistration) {
        await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      } else {
        await adminFetch(`/api/partner-applications/${id}`, { method: "DELETE" });
      }
      await fetchApplications();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList size={20} className="text-emerald-600" /> Partner Applications & Vendor Registrations
          </h1>
          <p className="text-[12px] text-slate-400 mt-0.5">
            Submissions from /partner-onboarding and /vendor-registration — approve to manage in your vendor network.
          </p>
        </div>
        <button
          onClick={fetchApplications}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => {
          const count = t === "Pending" ? counts.pending : t === "Approved" ? counts.approved : t === "Rejected" ? counts.rejected : counts.pending + counts.approved + counts.rejected;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-[12px] font-semibold transition-all border ${
                tab === t
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {t === "all" ? "All" : t} <span className="opacity-60 ms-1">{count}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading applications…</div>
      ) : applications.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl">
          <ClipboardList size={28} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500 font-medium">No {tab === "all" ? "" : tab.toLowerCase() + " "}applications yet</p>
          <p className="text-[12px] text-slate-400 mt-1">
            Share the onboarding link with vendors: <span className="font-mono text-slate-500">saudieventmanagement.com/partner-onboarding</span>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => {
            const isOpen = expanded === app.id;
            return (
              <div key={app.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                {/* Summary row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : app.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-start hover:bg-slate-50/50 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-bold text-slate-900">{app.companyName}</span>
                      <span className="text-[10px] font-mono text-slate-400">{app.appNumber}</span>
                      {app.isQuickRegistration ? (
                        <span className="px-2 py-0.5 rounded-full border text-[10px] font-semibold bg-blue-50 text-blue-700 border-blue-200">
                          Vendor Registration
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full border text-[10px] font-semibold bg-slate-50 text-slate-600 border-slate-200">
                          Partner Profile
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1"><MapPin size={10} /> {app.city}</span>
                      <span>{app.categories.slice(0, 3).join(" · ")}{app.categories.length > 3 ? " +" + (app.categories.length - 3) : ""}</span>
                      <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <div className="px-5 py-5 space-y-5">
                        {/* Contact — PRIVATE, admin only */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-700 font-medium">
                            {app.contactPerson}{app.jobTitle ? ` — ${app.jobTitle}` : ""}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                            <Phone size={12} className="text-emerald-600" /> {app.whatsapp}
                          </span>
                          {app.email && (
                            <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                              <Mail size={12} className="text-emerald-600" /> {app.email}
                            </span>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Detail label="Services / Details" value={app.servicesDesc} />
                          <Detail label="Coverage" value={app.regionCoverage.join(", ")} />
                          <Detail label="Business type" value={app.businessType} />
                          <Detail label="Years / Team / Languages" value={[app.yearsInBusiness && `${app.yearsInBusiness} yrs`, app.teamSize && `team ${app.teamSize}`, app.languages].filter(Boolean).join(" · ")} />
                          <Detail label="CR / VAT" value={[app.crNumber, app.vatNumber].filter(Boolean).join(" / ")} />
                          <Detail label="Pricing" value={app.pricingType} />
                          <Detail label="Major clients" value={app.majorClients} />
                          <Detail label="Certifications" value={app.certifications} />
                          <Detail label="Notes" value={app.extraNotes} />
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-2">
                          <LinkRow label="Portfolio / Website" url={app.portfolioLink} />
                          <LinkRow label="Profile PDF" url={app.profileLink} />
                          <LinkRow label="Logo" url={app.logoLink} />
                          <LinkRow label="Video" url={app.videoLink} />
                          <LinkRow label="Rate card" url={app.rateCardLink} />
                          <LinkRow label="Website" url={app.website} />
                          <LinkRow label="Instagram" url={app.instagram} />
                          <LinkRow label="Maps" url={app.googleMaps} />
                          <LinkRow label="LinkedIn" url={app.linkedin} />
                          <LinkRow label="Facebook" url={app.facebook} />
                          <LinkRow label="TikTok" url={app.tiktok} />
                          <LinkRow label="YouTube" url={app.youtube} />
                        </div>

                        {/* Permissions */}
                        {!app.isQuickRegistration && (
                          <div className="flex flex-wrap gap-2">
                            {[
                              [app.permNonCircumvention, "Non-circumvention agreed"],
                              [app.permMediaUse, "Media use permission"],
                              [app.permLogoUse, "Logo display permission"],
                              [app.featureOnSem, "Wants SEM feature"],
                              [!!app.backlinkAnswer, `Backlink: ${app.backlinkAnswer || "—"}`],
                            ].map(([ok, label], i) => (
                              <span
                                key={i}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium ${
                                  ok ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-400"
                                }`}
                              >
                                <ShieldCheck size={11} /> {label}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        {app.status === "Pending" && (
                          <div className="pt-2 border-t border-slate-100">
                            {approving === app.id ? (
                              <div className="space-y-3 pt-3">
                                <p className="text-[12px] font-semibold text-slate-600">
                                  Approve as new vendor, or merge into an existing one (existing data is never overwritten):
                                </p>
                                <select
                                  value={mergeVendorId}
                                  onChange={(e) => setMergeVendorId(e.target.value)}
                                  className="w-full max-w-md px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 outline-none focus:border-emerald-400"
                                >
                                  <option value="">➕ Create as NEW vendor</option>
                                  {vendorOptions.map((v) => (
                                    <option key={v.id} value={v.id}>Merge into: {v.name} ({v.category})</option>
                                  ))}
                                </select>

                                {dupCandidates.length > 0 && (
                                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2">
                                    <p className="text-[12px] font-bold text-amber-700">
                                      Possible duplicate{dupCandidates.length > 1 ? "s" : ""} — this looks like a vendor already in your database:
                                    </p>
                                    {dupCandidates.map((c) => (
                                      <div key={c.vendor.id} className="flex items-center justify-between text-[12px] bg-white rounded-md px-2.5 py-1.5 border border-amber-100">
                                        <span className="text-slate-700">
                                          <strong>{c.vendor.name}</strong> ({c.vendor.category}) — matched on {c.matchedOn}
                                        </span>
                                        <button
                                          onClick={() => setMergeVendorId(c.vendor.id)}
                                          className="text-emerald-600 font-semibold hover:underline"
                                        >
                                          Merge into this
                                        </button>
                                      </div>
                                    ))}
                                    <p className="text-[11px] text-amber-600">
                                      Sure it&apos;s a different company? Use &quot;Create anyway&quot; below instead of Confirm Approve.
                                    </p>
                                  </div>
                                )}

                                <div className="flex gap-2">
                                  <button
                                    disabled={busy}
                                    onClick={() => act(app.id, { action: "approve", mergeVendorId: mergeVendorId || undefined }, app.isQuickRegistration)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-[12px] font-semibold hover:bg-emerald-600 transition-all disabled:opacity-60"
                                  >
                                    <CheckCircle2 size={13} /> Confirm Approve
                                  </button>
                                  {dupCandidates.length > 0 && !mergeVendorId && (
                                    <button
                                      disabled={busy}
                                      onClick={() => act(app.id, { action: "approve", forceCreate: true }, app.isQuickRegistration)}
                                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-[12px] font-semibold hover:bg-amber-50 transition-all disabled:opacity-60"
                                    >
                                      Create anyway (different company)
                                    </button>
                                  )}
                                  <button
                                    onClick={() => { setApproving(null); setDupCandidates([]); }}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-wrap gap-2 pt-3">
                                <button
                                  disabled={busy}
                                  onClick={() => openApprovePanel(app.id)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-[12px] font-semibold hover:bg-emerald-600 transition-all"
                                >
                                  <CheckCircle2 size={13} /> Approve
                                </button>
                                <button
                                  disabled={busy}
                                  onClick={() => act(app.id, { action: "reject" }, app.isQuickRegistration)}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-red-200 text-red-500 rounded-lg text-[12px] font-semibold hover:bg-red-50 transition-all"
                                >
                                  <XCircle size={13} /> Reject
                                </button>
                                <button
                                  disabled={busy}
                                  onClick={() => remove(app.id, app.appNumber, app.vendorId, app.isQuickRegistration)}
                                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg text-[12px] font-semibold hover:text-red-500 hover:border-red-200 transition-all ms-auto"
                                >
                                  <Trash2 size={13} /> Delete (spam)
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {app.status === "Rejected" && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              disabled={busy}
                              onClick={() => act(app.id, { action: "reopen" }, app.isQuickRegistration)}
                              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                            >
                              Reopen as Pending
                            </button>
                            <button
                              disabled={busy}
                              onClick={() => remove(app.id, app.appNumber, app.vendorId, app.isQuickRegistration)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg text-[12px] font-semibold hover:text-red-500 hover:border-red-200 transition-all"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                        {app.status === "Approved" && (
                          <div className="flex flex-wrap items-center gap-3">
                            {app.vendorId && (
                              <p className="text-[12px] text-emerald-600 font-medium">
                                ✓ Added to vendor database — see the Vendors page.
                              </p>
                            )}
                            <button
                              disabled={busy}
                              onClick={() => remove(app.id, app.appNumber, app.vendorId, app.isQuickRegistration)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg text-[12px] font-semibold hover:text-red-500 hover:border-red-200 transition-all"
                            >
                              <Trash2 size={13} /> Delete application
                            </button>
                          </div>
                        )}
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

