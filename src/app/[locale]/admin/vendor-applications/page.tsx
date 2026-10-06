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
  Send,
  Users,
  Search,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildPartnerWelcome } from "@/lib/partner-welcome";
import { normalizePlaces } from "@/lib/vendor-geo";
import { canonicalCategoryNames } from "@/lib/vendor-categories";
import { SEED_CATEGORY_NAMES } from "@/lib/categories";

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
  // Added by GET /api/partner-applications (formal applications only)
  categoryLinks?: { id: string; name: string }[];
  flags?: {
    existingVendors: { id: string; name: string; matchedOn: string; confidence: string }[];
    repeats: { appNumber: string; status: string; createdAt: string; matchedOn: string }[];
  };
};

type VendorOption = { id: string; name: string; category: string; categories?: string[] };

const STATUS_TABS = ["Open", "Pending", "Under Review", "Need More Information", "Approved", "Rejected", "Duplicate", "all"] as const;
const TAB_LABEL: Record<string, string> = { "Need More Information": "Need Info", all: "All" };
const OPEN_STATUSES = ["Pending", "Under Review", "Need More Information"];
const KNOWN_CATEGORY_NAMES = [...SEED_CATEGORY_NAMES, "Full-Service Event Management"];

const statusBadge = (status: string) =>
  status === "Pending"
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : status === "Under Review"
    ? "bg-blue-50 text-blue-600 border-blue-200"
    : status === "Need More Information"
    ? "bg-orange-50 text-orange-600 border-orange-200"
    : status === "Approved"
    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
    : status === "Duplicate"
    ? "bg-slate-100 text-slate-500 border-slate-300"
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
  const [counts, setCounts] = useState<Record<string, number>>({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<(typeof STATUS_TABS)[number]>("Open");
  // Client-side triage filters (the list is a few dozen rows — no need to hit the API again)
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [flagFilter, setFlagFilter] = useState<"all" | "dup" | "repeat" | "nocat">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null); // app id with approve panel open
  const [mergeVendorId, setMergeVendorId] = useState("");
  const [vendorOptions, setVendorOptions] = useState<VendorOption[]>([]);
  const [busy, setBusy] = useState(false);

  // Welcome-email review modal — opened after a successful approval when the
  // partner has an email on file. Nothing sends until the founder clicks Send.
  const [emailDraft, setEmailDraft] = useState<
    { to: string; subject: string; body: string; companyName: string } | null
  >(null);
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailDone, setEmailDone] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      // 1. Fetch formal Partner Applications
      const res = await adminFetch(`/api/partner-applications?status=${tab === "Open" ? "open" : tab}`);
      const data = await res.json();
      const formalApps: Application[] = !data.error ? data.applications || [] : [];
      const baseCounts = data.counts || { pending: 0, approved: 0, rejected: 0 };

      // 2. Fetch initial Vendor Registration inquiries
      let vendorInquiries: Application[] = [];
      try {
        const inqRes = await adminFetch("/api/contact?audience=partner");
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

      // Quick registrations only ever have Pending / Approved / Rejected.
      const filteredInquiries = tab === "all"
        ? vendorInquiries
        : tab === "Open"
        ? vendorInquiries.filter((i) => (i.status || "Pending").toLowerCase() === "pending")
        : vendorInquiries.filter((i) => (i.status || "Pending").toLowerCase() === tab.toLowerCase());

      const combined = [...formalApps, ...filteredInquiries].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const inqPending = vendorInquiries.filter((i) => (i.status || "Pending").toLowerCase() === "pending").length;
      const inqApproved = vendorInquiries.filter((i) => (i.status || "").toLowerCase() === "approved").length;
      const inqRejected = vendorInquiries.filter((i) => (i.status || "").toLowerCase() === "rejected").length;

      setApplications(combined);
      setCounts({
        ...baseCounts,
        pending: baseCounts.pending + inqPending,
        open: (baseCounts.open ?? baseCounts.pending) + inqPending,
        approved: baseCounts.approved + inqApproved,
        rejected: baseCounts.rejected + inqRejected,
        total: (baseCounts.total ?? 0) + vendorInquiries.length,
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

  // Category-saturation check — surfaced before approval so the founder is
  // never blindsided by a category quietly filling up with lookalike vendors.
  // Non-blocking: purely informational, approve still requires her own click.
  const categoryMatchesFor = (app: Application): { category: string; vendors: string[] }[] => {
    const result: { category: string; vendors: string[] }[] = [];
    for (const cat of app.categories) {
      const catLower = cat.trim().toLowerCase();
      if (!catLower) continue;
      const matched = vendorOptions.filter(
        (v) => v.category?.toLowerCase() === catLower || (v.categories || []).some((c) => c.toLowerCase() === catLower)
      );
      if (matched.length > 0) result.push({ category: cat, vendors: matched.map((v) => v.name) });
    }
    return result;
  };

  const openApprovePanel = async (appId: string) => {
    setApproving(appId);
    setMergeVendorId("");
    setDupCandidates([]);
    if (vendorOptions.length === 0) {
      try {
        const res = await adminFetch("/api/vendors?pageSize=100&sortBy=name");
        const data = await res.json();
        if (Array.isArray(data.vendors)) {
          setVendorOptions(data.vendors.map((v: any) => ({ id: v.id, name: v.name, category: v.category, categories: v.categories || [] })));
        }
      } catch (e) {
        console.error("Failed to fetch vendors:", e);
      }
    }
  };

  // After a successful approval, offer the welcome email (only if we have an
  // address to send to). The draft is fully editable and never auto-sends.
  const offerWelcomeEmail = (approvedApp?: Application) => {
    if (!approvedApp?.email) return;
    const { subject, body } = buildPartnerWelcome({
      contactPerson: approvedApp.contactPerson,
      companyName: approvedApp.companyName,
    });
    setEmailDone(false);
    setEmailDraft({ to: approvedApp.email, subject, body, companyName: approvedApp.companyName });
  };

  const act = async (
    id: string,
    body: Record<string, unknown>,
    isQuickRegistration?: boolean,
    approvedApp?: Application
  ) => {
    setBusy(true);
    try {
      if (isQuickRegistration) {
        const newStatus = body.action === "reject" ? "Rejected" : body.action === "reopen" ? "Pending" : "Approved";
        const res = await adminFetch(`/api/contact?id=${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setApproving(null);
          setDupCandidates([]);
          await fetchApplications();
          if (body.action === "approve") offerWelcomeEmail(approvedApp);
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
          if (body.action === "approve") offerWelcomeEmail(approvedApp);
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

  // One-time, additive: link older applications to canonical categories. Dry-run first so
  // the founder sees exactly what will be linked before anything is written.
  const mapCategories = async () => {
    setBusy(true);
    try {
      const dry = await adminFetch("/api/partner-applications/backfill-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun: true }),
      });
      const preview = await dry.json();
      if (!dry.ok) return alert(preview.error || "Preview failed");
      const sample = (preview.plan as { appNumber: string; companyName: string; to: string[] }[])
        .slice(0, 8)
        .map((p) => `${p.appNumber} ${p.companyName.slice(0, 28)} → ${p.to.join(" + ")}`)
        .join("\n");
      const more = preview.plan.length > 8 ? "\n…" : "";
      const msg = `Link ${preview.plan.length} older application(s) to canonical categories?\n\nAdditive only — nothing is removed or overwritten.\n\n${sample}${more}`;
      if (!window.confirm(msg)) return;
      const res = await adminFetch("/api/partner-applications/backfill-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const out = await res.json();
      if (!res.ok) return alert(out.error || "Failed");
      alert(`Linked ${out.linked} application(s).`);
      await fetchApplications();
    } finally {
      setBusy(false);
    }
  };

  const sendWelcome = async () => {
    if (!emailDraft) return;
    setEmailBusy(true);
    try {
      const res = await adminFetch(`/api/admin/partner-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailDraft.to,
          subject: emailDraft.subject,
          body: emailDraft.body,
          companyName: emailDraft.companyName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmailDone(true);
        setTimeout(() => { setEmailDraft(null); setEmailDone(false); }, 1500);
      } else {
        alert(data.error || "Failed to send the welcome email.");
      }
    } finally {
      setEmailBusy(false);
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
        await adminFetch(`/api/contact?id=${id}`, { method: "DELETE" });
      } else {
        await adminFetch(`/api/partner-applications/${id}`, { method: "DELETE" });
      }
      await fetchApplications();
    } finally {
      setBusy(false);
    }
  };

  // ── Triage filtering ──
  const effectiveCategories = (a: Application): string[] =>
    a.categoryLinks && a.categoryLinks.length
      ? a.categoryLinks.map((c) => c.name)
      : canonicalCategoryNames(a.categories || [], KNOWN_CATEGORY_NAMES);
  const appPlaces = (a: Application) => normalizePlaces(a.city, a.regionCoverage);

  const categoryOptions = Array.from(new Set(applications.flatMap(effectiveCategories))).sort();
  const cityOptions = Array.from(new Set(applications.flatMap(appPlaces))).sort();

  const visible = applications.filter((a) => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hay = [a.companyName, a.contactPerson, a.appNumber, a.servicesDesc, a.city].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (catFilter !== "all" && !effectiveCategories(a).includes(catFilter)) return false;
    if (cityFilter !== "all" && !appPlaces(a).includes(cityFilter as never)) return false;
    if (flagFilter === "dup" && !(a.flags?.existingVendors.length)) return false;
    if (flagFilter === "repeat" && !(a.flags?.repeats.length)) return false;
    if (flagFilter === "nocat" && (a.isQuickRegistration || (a.categoryLinks && a.categoryLinks.length))) return false;
    return true;
  });
  const filtersActive = Boolean(search.trim()) || catFilter !== "all" || cityFilter !== "all" || flagFilter !== "all";

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
        <div className="flex items-center gap-2">
          {(counts.uncategorised ?? 0) > 0 && (
            <button
              onClick={mapCategories}
              disabled={busy}
              title="Adds canonical category links to older applications that have none. Additive only — nothing is removed or overwritten."
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-amber-200 rounded-lg text-[12px] font-semibold text-amber-700 hover:bg-amber-50 transition-all disabled:opacity-60"
            >
              Map categories ({counts.uncategorised})
            </button>
          )}
          <button
            onClick={fetchApplications}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((t) => {
          const key = t === "Open" ? "open" : t === "Pending" ? "pending" : t === "Under Review" ? "underReview" : t === "Need More Information" ? "needInfo" : t === "Approved" ? "approved" : t === "Rejected" ? "rejected" : t === "Duplicate" ? "duplicate" : "total";
          const count = counts[key] ?? 0;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all border ${
                tab === t
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
            >
              {TAB_LABEL[t] ?? t} <span className="opacity-60 ms-1">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, contact, app no., services…"
            className="w-full ps-8 pe-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] text-slate-700 outline-none focus:border-emerald-400"
          />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] text-slate-600 outline-none focus:border-emerald-400">
          <option value="all">All categories</option>
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] text-slate-600 outline-none focus:border-emerald-400">
          <option value="all">All cities</option>
          {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={flagFilter} onChange={(e) => setFlagFilter(e.target.value as typeof flagFilter)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-[12px] text-slate-600 outline-none focus:border-emerald-400">
          <option value="all">All flags</option>
          <option value="dup">Possible duplicate of a vendor</option>
          <option value="repeat">Repeat submission</option>
          <option value="nocat">No canonical category</option>
        </select>
        {filtersActive && (
          <button onClick={() => { setSearch(""); setCatFilter("all"); setCityFilter("all"); setFlagFilter("all"); }} className="text-[11px] font-semibold text-slate-400 hover:text-slate-600">
            Clear filters
          </button>
        )}
        <span className="ms-auto text-[11px] text-slate-400">{visible.length} of {applications.length} shown</span>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading applications…</div>
      ) : visible.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl">
          <ClipboardList size={28} className="mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500 font-medium">{filtersActive ? "No applications match these filters" : `No ${tab === "all" ? "" : tab.toLowerCase() + " "}applications yet`}</p>
          <p className="text-[12px] text-slate-400 mt-1">
            Share the onboarding link with vendors: <span className="font-mono text-slate-500">saudieventmanagement.com/partner-onboarding</span>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((app) => {
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
                      {!!app.flags?.existingVendors.length && app.status !== "Duplicate" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold bg-amber-50 text-amber-700 border-amber-300" title="Matches a vendor already in your database">
                          <AlertTriangle size={10} /> Possible duplicate · {app.flags.existingVendors[0].name}
                        </span>
                      )}
                      {!!app.flags?.repeats.length && app.status !== "Duplicate" && (
                        <span className="px-2 py-0.5 rounded-full border text-[10px] font-semibold bg-slate-50 text-slate-600 border-slate-200" title={app.flags.repeats.map((r) => `${r.appNumber} (${r.status})`).join(", ")}>
                          Repeat · {app.flags.repeats.length + 1} submissions
                        </span>
                      )}
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

                        {/* Duplicate evidence — shown above the actions so the decision is informed */}
                        {(!!app.flags?.existingVendors.length || !!app.flags?.repeats.length) && (
                          <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 space-y-1.5">
                            <p className="text-[12px] font-bold text-amber-700 flex items-center gap-1.5"><AlertTriangle size={13} /> Duplicate check</p>
                            {app.flags!.existingVendors.map((v) => (
                              <p key={v.id} className="text-[12px] text-amber-800">
                                Already a vendor: <b>{v.name}</b> <span className="text-amber-600">(matched on {v.matchedOn}, {v.confidence} confidence)</span>
                              </p>
                            ))}
                            {app.flags!.repeats.length > 0 && (
                              <p className="text-[12px] text-amber-800">
                                Same company applied before: {app.flags!.repeats.map((r) => `${r.appNumber} (${r.status})`).join(", ")}
                              </p>
                            )}
                            <p className="text-[11px] text-amber-600">Nothing is merged or deleted automatically. Use “Approve → merge into…” to add this to the existing vendor, or mark it a duplicate to keep it as a record only.</p>
                          </div>
                        )}

                        {/* Actions */}
                        {OPEN_STATUSES.includes(app.status) && (
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

                                {categoryMatchesFor(app).length > 0 && (
                                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 space-y-1.5">
                                    <p className="text-[12px] font-bold text-sky-700 flex items-center gap-1.5">
                                      <Users size={13} /> Category already has vendor{categoryMatchesFor(app).some((c) => c.vendors.length > 1) ? "s" : ""} on file
                                    </p>
                                    {categoryMatchesFor(app).map((c) => (
                                      <p key={c.category} className="text-[12px] text-sky-800">
                                        <strong>{c.category}</strong> — {c.vendors.join(", ")}
                                      </p>
                                    ))}
                                    <p className="text-[11px] text-sky-600">Adding another is fine (more fallback options) — just confirming before you approve.</p>
                                  </div>
                                )}

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
                                    onClick={() => act(app.id, { action: "approve", mergeVendorId: mergeVendorId || undefined }, app.isQuickRegistration, app)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-[12px] font-semibold hover:bg-emerald-600 transition-all disabled:opacity-60"
                                  >
                                    <CheckCircle2 size={13} /> Confirm Approve
                                  </button>
                                  {dupCandidates.length > 0 && !mergeVendorId && (
                                    <button
                                      disabled={busy}
                                      onClick={() => act(app.id, { action: "approve", forceCreate: true }, app.isQuickRegistration, app)}
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
                                {!app.isQuickRegistration && app.status !== "Under Review" && (
                                  <button
                                    disabled={busy}
                                    onClick={() => act(app.id, { action: "review" })}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-[12px] font-semibold hover:bg-blue-50 transition-all"
                                  >
                                    Mark under review
                                  </button>
                                )}
                                {!app.isQuickRegistration && app.status !== "Need More Information" && (
                                  <button
                                    disabled={busy}
                                    onClick={() => {
                                      const note = window.prompt("What information is missing? (saved to the activity log)", "");
                                      if (note === null) return;
                                      act(app.id, { action: "need_info", note });
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-orange-200 text-orange-600 rounded-lg text-[12px] font-semibold hover:bg-orange-50 transition-all"
                                  >
                                    Need more information
                                  </button>
                                )}
                                {!app.isQuickRegistration && (app.flags?.existingVendors || []).slice(0, 2).map((v) => (
                                  <button
                                    key={v.id}
                                    disabled={busy}
                                    onClick={() => {
                                      if (window.confirm(`Mark ${app.appNumber} as a duplicate of the existing vendor “${v.name}”?\n\nThe application is kept as a record and NO second vendor is created. The vendor itself is not changed.`)) {
                                        act(app.id, { action: "duplicate", vendorId: v.id });
                                      }
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-[12px] font-semibold hover:bg-amber-50 transition-all"
                                  >
                                    Duplicate of {v.name.length > 22 ? v.name.slice(0, 22) + "…" : v.name}
                                  </button>
                                ))}
                                {!app.isQuickRegistration && !(app.flags?.existingVendors.length) && !!app.flags?.repeats.length && (
                                  <button
                                    disabled={busy}
                                    onClick={() => {
                                      if (window.confirm(`Mark ${app.appNumber} as a repeat submission of an earlier application?\n\nIt is kept as a record; nothing is deleted.`)) {
                                        act(app.id, { action: "duplicate" });
                                      }
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg text-[12px] font-semibold hover:bg-amber-50 transition-all"
                                  >
                                    Mark as repeat submission
                                  </button>
                                )}
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
                        {(app.status === "Rejected" || app.status === "Duplicate") && (
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

      {/* Welcome-email review — appears after approval, sends only on click */}
      <AnimatePresence>
        {emailDraft && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !emailBusy && setEmailDraft(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", damping: 24, stiffness: 240 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-xl bg-white rounded-2xl border border-slate-200 z-[101] shadow-2xl flex flex-col max-h-[88vh]"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm font-bold text-slate-800">Welcome email</h2>
                    <p className="text-[11px] text-slate-400 truncate">
                      Approved — review and send to <span className="font-semibold text-slate-500">{emailDraft.to}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !emailBusy && setEmailDraft(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <XCircle size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</label>
                  <input
                    type="text"
                    value={emailDraft.subject}
                    onChange={(e) => setEmailDraft({ ...emailDraft, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-[13px] font-medium text-slate-800 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message</label>
                  <textarea
                    rows={14}
                    value={emailDraft.body}
                    onChange={(e) => setEmailDraft({ ...emailDraft, body: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-[13px] text-slate-700 leading-relaxed focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Sends from <span className="font-mono">info@saudieventmanagement.com</span>. Edit freely — nothing goes out until you click Send.
                </p>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setEmailDraft(null)}
                  disabled={emailBusy}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-500 hover:bg-slate-50 transition-all disabled:opacity-60"
                >
                  Skip for now
                </button>
                <button
                  onClick={sendWelcome}
                  disabled={emailBusy || emailDone}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-[12px] font-semibold hover:bg-emerald-600 transition-all disabled:opacity-60"
                >
                  {emailDone ? (
                    <><CheckCircle2 size={14} /> Sent</>
                  ) : emailBusy ? (
                    <><RefreshCw size={14} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={14} /> Send welcome email</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

