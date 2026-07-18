"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Layers,
  FolderOpen,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  Upload,
  FileText,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// Partner Onboarding Form — public, English-only (v1).
// Design rule: only 5 things are required (company, contact person, WhatsApp,
// city, ≥1 service + accuracy confirmation). Everything else is optional so
// small vendors without a website or formal documents can still register.
// Files are collected as LINKS (Drive/Dropbox/WeTransfer) — event-industry
// portfolios are too heavy for direct upload.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Venues",
  "Catering",
  "Decor & Floral",
  "Lighting",
  "AV & LED Screens",
  "Event Production",
  "Temporary Structures",
  "Furniture Rental",
  "Photography",
  "Videography",
  "Entertainment",
  "Security",
  "Staffing & Hostesses",
  "Logistics & Transportation",
  "Luxury Cars",
  "Other",
];

const SAUDI_CITIES = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Al Khobar",
  "Makkah",
  "Medina",
  "AlUla",
  "NEOM",
  "Tabuk",
];

// Vendors in the network are already based in Dubai, Doha and Muscat — the
// base-city dropdown and coverage grid both accept GCC options.
const GCC_CITIES = ["Dubai", "Abu Dhabi", "Doha", "Manama", "Kuwait City", "Muscat"];

const COVERAGE_OPTIONS = [
  ...SAUDI_CITIES,
  "All Saudi Arabia",
  "UAE",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "Oman",
  "All GCC",
];

const STEPS = [
  { label: "Company", icon: Building2 },
  { label: "Services", icon: Layers },
  { label: "Portfolio", icon: FolderOpen },
  { label: "Confirm", icon: ShieldCheck },
];

type FormState = {
  companyName: string;
  businessType: string;
  contactPerson: string;
  jobTitle: string;
  whatsapp: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  instagram: string;
  googleMaps: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  categories: string[];
  servicesDesc: string;
  regionCoverage: string[];
  yearsInBusiness: string;
  teamSize: string;
  languages: string;
  crNumber: string;
  vatNumber: string;
  portfolioLink: string;
  logoLink: string;
  profileLink: string;
  videoLink: string;
  pricingType: string;
  rateCardLink: string;
  majorClients: string;
  certifications: string;
  permMediaUse: boolean;
  permLogoUse: boolean;
  featureOnSem: boolean;
  backlinkAnswer: string;
  extraNotes: string;
  permAccurate: boolean;
  permNonCircumvention: boolean;
  companyUrl: string; // honeypot — hidden, must stay empty
};

const INITIAL: FormState = {
  companyName: "",
  businessType: "",
  contactPerson: "",
  jobTitle: "",
  whatsapp: "",
  email: "",
  phone: "",
  city: "",
  website: "",
  instagram: "",
  googleMaps: "",
  linkedin: "",
  facebook: "",
  tiktok: "",
  youtube: "",
  categories: [],
  servicesDesc: "",
  regionCoverage: [],
  yearsInBusiness: "",
  teamSize: "",
  languages: "",
  crNumber: "",
  vatNumber: "",
  portfolioLink: "",
  logoLink: "",
  profileLink: "",
  videoLink: "",
  pricingType: "",
  rateCardLink: "",
  majorClients: "",
  certifications: "",
  permMediaUse: false,
  permLogoUse: false,
  featureOnSem: false,
  backlinkAnswer: "",
  extraNotes: "",
  permAccurate: false,
  permNonCircumvention: false,
  companyUrl: "",
};

const inputClass =
  "w-full bg-neutral-50 border border-neutral-200/80 px-4 py-3 text-[14px] text-neutral-900 placeholder-neutral-400 focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none rounded-xl hover:border-neutral-300";

const labelClass = "block text-[12px] font-semibold text-neutral-700 mb-1.5";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required ? <span className="text-[var(--primary)] ms-0.5">*</span> : (
          <span className="text-neutral-400 font-normal ms-1">(optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="text-[11px] text-neutral-400 mt-1">{hint}</p>}
    </div>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`px-3 py-2.5 rounded-xl border text-[13px] font-medium text-start transition-all ${
              active
                ? "border-[var(--primary)] bg-[var(--primary)]/5 text-neutral-900"
                : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ${
                  active ? "bg-[var(--primary)] border-[var(--primary)]" : "border-neutral-300 bg-white"
                }`}
              >
                {active && <CheckCircle size={11} className="text-white" />}
              </span>
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type UploadState = {
  status: "uploading" | "done" | "error";
  name?: string;
  error?: string;
};

// Link input + "Upload" button side by side. Once a file is uploaded (or while
// uploading) the row becomes a file chip; removing it restores the link input.
function LinkOrUploadField({
  label,
  hint,
  placeholder,
  accept,
  value,
  upload,
  onLinkChange,
  onFileSelect,
  onRemove,
}: {
  label: string;
  hint?: string;
  placeholder: string;
  accept: string;
  value: string;
  upload?: UploadState;
  onLinkChange: (v: string) => void;
  onFileSelect: (f: File) => void;
  onRemove: () => void;
}) {
  const uploaded = value.startsWith("supabase://");
  if (uploaded || upload?.status === "uploading") {
    return (
      <Field label={label}>
        <div className="flex items-center justify-between gap-3 bg-neutral-50 border border-neutral-200/80 px-4 py-3 rounded-xl">
          <span className="flex items-center gap-2 text-[13px] text-neutral-700 min-w-0">
            <FileText size={14} className="text-[var(--primary)] flex-shrink-0" />
            <span className="truncate">{upload?.name || "Uploaded file"}</span>
          </span>
          {upload?.status === "uploading" ? (
            <span className="text-[11px] font-semibold text-neutral-400 flex-shrink-0 animate-pulse">
              Uploading…
            </span>
          ) : (
            <span className="flex items-center gap-2 flex-shrink-0">
              <CheckCircle size={14} className="text-emerald-500" />
              <button
                type="button"
                onClick={onRemove}
                className="text-neutral-400 hover:text-red-500 transition-colors"
                aria-label="Remove file"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </Field>
    );
  }
  return (
    <Field label={label} hint={hint}>
      <div className="flex gap-2">
        <input
          className={inputClass}
          value={value}
          onChange={(e) => onLinkChange(e.target.value)}
          placeholder={placeholder}
        />
        <label className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[12px] font-semibold text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer transition-all">
          <Upload size={13} /> Upload
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileSelect(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {upload?.status === "error" && (
        <p className="text-[11px] text-red-500 mt-1">{upload.error}</p>
      )}
    </Field>
  );
}

export default function PartnerOnboardingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [appNumber, setAppNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showMoreSocials, setShowMoreSocials] = useState(false);
  const [showMoreCompany, setShowMoreCompany] = useState(false);

  const set = (field: keyof FormState, value: string | boolean | string[]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggle = (field: "categories" | "regionCoverage", value: string) =>
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));

  type FileField = "portfolioLink" | "profileLink" | "logoLink" | "rateCardLink";
  const [uploads, setUploads] = useState<Partial<Record<FileField, UploadState>>>({});

  const uploadFile = async (field: FileField, kind: string, file: File) => {
    setUploads((u) => ({ ...u, [field]: { status: "uploading", name: file.name } }));
    try {
      const res = await fetch("/api/partner-applications/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, filename: file.name, size: file.size }),
      });
      const data = await res.json();
      if (res.status === 503) throw new Error("Uploads are unavailable right now — please paste a link instead.");
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const { error } = await supabase.storage
        .from(data.bucket)
        .uploadToSignedUrl(data.path, data.token, file);
      if (error) throw new Error("Upload failed — please try again or paste a link.");
      set(field, `supabase://${data.bucket}/${data.path}`);
      setUploads((u) => ({ ...u, [field]: { status: "done", name: file.name } }));
    } catch (e: any) {
      setUploads((u) => ({
        ...u,
        [field]: { status: "error", error: e?.message || "Upload failed — please paste a link instead." },
      }));
    }
  };

  const removeUpload = (field: FileField) => {
    // Storage cleanup isn't needed — orphaned files are pruned manually, and
    // the private bucket is never listed publicly.
    set(field, "");
    setUploads((u) => ({ ...u, [field]: undefined }));
  };

  const uploadInProgress = Object.values(uploads).some((u) => u?.status === "uploading");

  const stepError = (): string => {
    if (uploadInProgress) return "Please wait — a file is still uploading.";
    if (step === 0) {
      if (!form.companyName.trim()) return "Please enter your company name.";
      if (!form.contactPerson.trim()) return "Please enter a contact person.";
      if (!form.whatsapp.trim()) return "Please enter your WhatsApp number.";
      if (!form.city) return "Please select your main city.";
    }
    if (step === 1 && form.categories.length === 0)
      return "Please select at least one service.";
    if (step === 3 && !form.permNonCircumvention)
      return "Please accept the non-circumvention agreement to continue.";
    if (step === 3 && !form.permAccurate)
      return "Please confirm the information provided is accurate.";
    return "";
  };

  const next = () => {
    const err = stepError();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setErrorMsg("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const err = stepError();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setAppNumber(data.appNumber);
      setStatus("success");
    } catch (e: any) {
      setErrorMsg(e?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 md:p-14 border border-neutral-200/80 shadow-[0_8px_40px_rgba(15,23,42,0.06)] text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Application received</h3>
        <p className="text-[14px] text-neutral-500 max-w-md mx-auto mb-4">
          Thank you, {form.contactPerson.split(" ")[0] || "partner"}. Your partner
          application has been submitted successfully. Our team will review it and
          confirm with you on WhatsApp shortly.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl">
          <Sparkles size={14} className="text-[var(--primary)]" />
          <span className="text-[13px] font-semibold text-neutral-700">
            Reference: {appNumber}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0_8px_40px_rgba(15,23,42,0.06)] overflow-hidden">
      {/* Step indicator */}
      <div className="px-6 md:px-10 pt-7 pb-5 border-b border-neutral-100">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    i < step
                      ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                      : i === step
                      ? "bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)]"
                      : "bg-neutral-50 border-neutral-200 text-neutral-400"
                  }`}
                >
                  {i < step ? <CheckCircle size={15} /> : <s.icon size={15} />}
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    i <= step ? "text-neutral-700" : "text-neutral-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mb-5 ${
                    i < step ? "bg-[var(--primary)]" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10">
        {/* Honeypot — hidden from humans, bots fill it */}
        <input
          type="text"
          name="companyUrl"
          value={form.companyUrl}
          onChange={(e) => set("companyUrl", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* ── Step 1 — Company & Contact ── */}
            {step === 0 && (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Company Name" required>
                    <input
                      className={inputClass}
                      value={form.companyName}
                      onChange={(e) => set("companyName", e.target.value)}
                      placeholder="e.g. Al Noor Events Co."
                    />
                  </Field>
                  <Field label="Business Type">
                    <input
                      className={inputClass}
                      value={form.businessType}
                      onChange={(e) => set("businessType", e.target.value)}
                      placeholder="e.g. Catering company, AV rental…"
                    />
                  </Field>
                  <Field label="Contact Person" required>
                    <input
                      className={inputClass}
                      value={form.contactPerson}
                      onChange={(e) => set("contactPerson", e.target.value)}
                      placeholder="Full name"
                    />
                  </Field>
                  <Field label="Job Title">
                    <input
                      className={inputClass}
                      value={form.jobTitle}
                      onChange={(e) => set("jobTitle", e.target.value)}
                      placeholder="e.g. Sales Manager"
                    />
                  </Field>
                  <Field label="WhatsApp Number" required hint="We coordinate all projects via WhatsApp.">
                    <input
                      className={inputClass}
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      inputMode="tel"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="name@company.com"
                      inputMode="email"
                    />
                  </Field>
                  <Field label="Main City" required>
                    <select
                      className={inputClass}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                    >
                      <option value="">Select city…</option>
                      <optgroup label="Saudi Arabia">
                        {SAUDI_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                      <optgroup label="GCC">
                        {GCC_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                    </select>
                  </Field>
                  <Field label="Phone (landline)">
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+966 11 XXX XXXX"
                      inputMode="tel"
                    />
                  </Field>
                </div>

                <div className="pt-2">
                  <p className="text-[12px] font-semibold text-neutral-700 mb-1.5">
                    Online presence <span className="text-neutral-400 font-normal">(all optional)</span>
                  </p>
                  <p className="text-[11px] text-neutral-400 mb-3">
                    No website? No problem — an Instagram page or Google Maps listing is enough.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <input className={inputClass} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="Website URL" />
                    <input className={inputClass} value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="Instagram" />
                    <input className={inputClass} value={form.googleMaps} onChange={(e) => set("googleMaps", e.target.value)} placeholder="Google Maps link" />
                  </div>
                  {showMoreSocials ? (
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      <input className={inputClass} value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="LinkedIn" />
                      <input className={inputClass} value={form.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="Facebook" />
                      <input className={inputClass} value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} placeholder="TikTok" />
                      <input className={inputClass} value={form.youtube} onChange={(e) => set("youtube", e.target.value)} placeholder="YouTube" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowMoreSocials(true)}
                      className="text-[12px] font-semibold text-[var(--primary)] mt-3 hover:underline"
                    >
                      + Add LinkedIn, Facebook, TikTok, YouTube
                    </button>
                  )}
                </div>
              </>
            )}

            {/* ── Step 2 — Services & Coverage ── */}
            {step === 1 && (
              <>
                <Field label="Which services do you provide?" required>
                  <CheckboxGrid
                    options={CATEGORIES}
                    selected={form.categories}
                    onToggle={(v) => toggle("categories", v)}
                  />
                </Field>
                <Field label="Briefly describe your services" hint="1–3 sentences is perfect.">
                  <textarea
                    className={`${inputClass} min-h-[90px] resize-y`}
                    value={form.servicesDesc}
                    onChange={(e) => set("servicesDesc", e.target.value)}
                    placeholder="e.g. Full buffet and live cooking stations for weddings and corporate events, 100–2,000 guests."
                  />
                </Field>
                <Field label="Which cities do you cover?">
                  <CheckboxGrid
                    options={COVERAGE_OPTIONS}
                    selected={form.regionCoverage}
                    onToggle={(v) => toggle("regionCoverage", v)}
                  />
                </Field>

                {showMoreCompany ? (
                  <div className="grid md:grid-cols-2 gap-5 pt-2">
                    <Field label="Years in business">
                      <input className={inputClass} value={form.yearsInBusiness} onChange={(e) => set("yearsInBusiness", e.target.value)} placeholder="e.g. 8" inputMode="numeric" />
                    </Field>
                    <Field label="Team size">
                      <input className={inputClass} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} placeholder="e.g. 25" />
                    </Field>
                    <Field label="Languages spoken">
                      <input className={inputClass} value={form.languages} onChange={(e) => set("languages", e.target.value)} placeholder="e.g. Arabic, English" />
                    </Field>
                    <Field label="Saudi CR Number">
                      <input className={inputClass} value={form.crNumber} onChange={(e) => set("crNumber", e.target.value)} placeholder="Commercial registration" />
                    </Field>
                    <Field label="VAT Number">
                      <input className={inputClass} value={form.vatNumber} onChange={(e) => set("vatNumber", e.target.value)} placeholder="VAT registration" />
                    </Field>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowMoreCompany(true)}
                    className="text-[12px] font-semibold text-[var(--primary)] hover:underline"
                  >
                    + Add company details (years in business, CR, VAT — optional)
                  </button>
                )}
              </>
            )}

            {/* ── Step 3 — Portfolio & Pricing ── */}
            {step === 2 && (
              <>
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl px-4 py-3">
                  <p className="text-[12px] text-neutral-500">
                    Everything on this page is <span className="font-semibold text-neutral-700">optional</span> —
                    you can submit now and share files later on WhatsApp. Paste a{" "}
                    <span className="font-semibold text-neutral-700">Google Drive, Dropbox or WeTransfer link</span>,
                    or <span className="font-semibold text-neutral-700">upload the file directly</span> (max 25MB).
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <LinkOrUploadField
                    label="Project photos"
                    hint="Drive/Dropbox folder with your best work — or upload a PDF/ZIP."
                    placeholder="https://drive.google.com/…"
                    accept=".pdf,.zip,.png,.jpg,.jpeg,.webp"
                    value={form.portfolioLink}
                    upload={uploads.portfolioLink}
                    onLinkChange={(v) => set("portfolioLink", v)}
                    onFileSelect={(f) => uploadFile("portfolioLink", "portfolio", f)}
                    onRemove={() => removeUpload("portfolioLink")}
                  />
                  <LinkOrUploadField
                    label="Company profile (PDF)"
                    placeholder="Link to your company profile"
                    accept=".pdf"
                    value={form.profileLink}
                    upload={uploads.profileLink}
                    onLinkChange={(v) => set("profileLink", v)}
                    onFileSelect={(f) => uploadFile("profileLink", "profile", f)}
                    onRemove={() => removeUpload("profileLink")}
                  />
                  <LinkOrUploadField
                    label="Company logo"
                    placeholder="Link to logo file (PNG/SVG)"
                    accept=".png,.jpg,.jpeg,.webp,.svg"
                    value={form.logoLink}
                    upload={uploads.logoLink}
                    onLinkChange={(v) => set("logoLink", v)}
                    onFileSelect={(f) => uploadFile("logoLink", "logo", f)}
                    onRemove={() => removeUpload("logoLink")}
                  />
                  <Field label="Videos" hint="Videos are link-only — YouTube or Drive.">
                    <input className={inputClass} value={form.videoLink} onChange={(e) => set("videoLink", e.target.value)} placeholder="YouTube / Drive link" />
                  </Field>
                </div>

                <Field label="How do you price your work?">
                  <div className="flex flex-wrap gap-2">
                    {["Rate card", "Project based"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("pricingType", form.pricingType === opt ? "" : opt)}
                        className={`px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all ${
                          form.pricingType === opt
                            ? "border-[var(--primary)] bg-[var(--primary)]/5 text-neutral-900"
                            : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300"
                        }`}
                      >
                        {opt === "Rate card" ? "We have a rate card" : "Pricing is project-based"}
                      </button>
                    ))}
                  </div>
                </Field>
                {form.pricingType === "Rate card" && (
                  <LinkOrUploadField
                    label="Rate card"
                    placeholder="Link to your rate card"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    value={form.rateCardLink}
                    upload={uploads.rateCardLink}
                    onLinkChange={(v) => set("rateCardLink", v)}
                    onFileSelect={(f) => uploadFile("rateCardLink", "ratecard", f)}
                    onRemove={() => removeUpload("rateCardLink")}
                  />
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Major clients or events" hint="Names you're proud of.">
                    <textarea className={`${inputClass} min-h-[70px] resize-y`} value={form.majorClients} onChange={(e) => set("majorClients", e.target.value)} placeholder="e.g. Aramco family day 2025, Riyadh Season activation…" />
                  </Field>
                  <Field label="Certifications / awards">
                    <textarea className={`${inputClass} min-h-[70px] resize-y`} value={form.certifications} onChange={(e) => set("certifications", e.target.value)} placeholder="ISO, municipality licenses, awards…" />
                  </Field>
                </div>
              </>
            )}

            {/* ── Step 4 — Permissions & Submit ── */}
            {step === 3 && (
              <>
                <div className="space-y-3">
                  {(
                    [
                      ["permMediaUse", "SEM may use our project photos on its website and in client proposals (with credit where applicable)."],
                      ["permLogoUse", "SEM may display our company logo as a partner."],
                      ["featureOnSem", "We'd like SEM to feature our company as a trusted partner."],
                    ] as [keyof FormState, string][]
                  ).map(([field, text]) => (
                    <label
                      key={field}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        form[field]
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form[field] as boolean}
                        onChange={(e) => set(field, e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[var(--primary)]"
                      />
                      <span className="text-[13px] text-neutral-700">{text}</span>
                    </label>
                  ))}
                </div>

                <Field label="Would you be open to adding SEM as a partner on your website?">
                  <div className="flex flex-wrap gap-2">
                    {["Yes", "Maybe later", "No website"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("backlinkAnswer", form.backlinkAnswer === opt ? "" : opt)}
                        className={`px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all ${
                          form.backlinkAnswer === opt
                            ? "border-[var(--primary)] bg-[var(--primary)]/5 text-neutral-900"
                            : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Anything else you'd like us to know?">
                  <textarea
                    className={`${inputClass} min-h-[70px] resize-y`}
                    value={form.extraNotes}
                    onChange={(e) => set("extraNotes", e.target.value)}
                    placeholder="Additional notes…"
                  />
                </Field>

                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    form.permNonCircumvention
                      ? "border-emerald-400 bg-emerald-50/50"
                      : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.permNonCircumvention}
                    onChange={(e) => set("permNonCircumvention", e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-[13px] text-neutral-700">
                    I agree that all leads and inquiries received through Saudi Event
                    Management (SEM) remain the property of SEM. I will not directly
                    solicit, negotiate with, or bypass SEM clients introduced through
                    the platform without written approval from SEM.{" "}
                    <span className="text-[var(--primary)]">*</span>
                  </span>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    form.permAccurate
                      ? "border-emerald-400 bg-emerald-50/50"
                      : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.permAccurate}
                    onChange={(e) => set("permAccurate", e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-emerald-500"
                  />
                  <span className="text-[13px] text-neutral-700">
                    I confirm the information provided is accurate and I'm authorized to
                    submit it on behalf of my company. <span className="text-[var(--primary)]">*</span>
                  </span>
                </label>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 mt-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl"
            >
              <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
              <span className="text-[13px] text-red-600">{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-neutral-200 text-[13px] font-semibold text-neutral-600 hover:bg-neutral-50 transition-all"
            >
              <ChevronLeft size={15} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-[13px] font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[var(--primary)] text-white text-[13px] font-semibold hover:opacity-90 transition-all shadow-sm disabled:opacity-60"
            >
              {status === "loading" ? "Submitting…" : (<>Submit Application <Send size={14} /></>)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
