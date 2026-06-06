"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";

const CATEGORIES = [
  "Catering & F&B",
  "AV & Production",
  "Floral & Décor",
  "Photography & Videography",
  "Entertainment",
  "VIP Transport",
  "Venues & Spaces",
  "Tents & Structures",
  "Print & Branding",
  "Lighting Design",
  "Security & Protocol",
  "Other Services",
];

const CITIES = ["Riyadh", "Jeddah", "Dammam", "AlUla", "Makkah", "Madinah", "Multiple Cities"];
const YEARS = ["2–5 years", "5–10 years", "10–20 years", "20+ years"];
const HOW_HEARD = ["Google Search", "Instagram / Social Media", "Referral from a Vendor", "Referral from a Client", "LinkedIn", "Industry Event / Exhibition", "Other"];

const inputClass =
  "w-full bg-neutral-50 border border-neutral-200/80 px-4 py-3.5 text-[14px] text-neutral-900 placeholder:text-neutral-400 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all duration-200";

const labelClass = "block text-[13px] font-medium text-neutral-500 mb-1.5";

interface FormData {
  companyName: string;
  crNumber: string;
  contactName: string;
  jobTitle: string;
  phone: string;
  email: string;
  primaryCategory: string;
  additionalCategories: string[];
  yearsInOperation: string;
  primaryCity: string;
  portfolioUrl: string;
  companyIntro: string;
  howHeard: string;
}

const initial: FormData = {
  companyName: "", crNumber: "", contactName: "", jobTitle: "",
  phone: "", email: "", primaryCategory: "", additionalCategories: [],
  yearsInOperation: "", primaryCity: "", portfolioUrl: "", companyIntro: "", howHeard: "",
};

export default function VendorForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ref, setRef] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      additionalCategories: prev.additionalCategories.includes(cat)
        ? prev.additionalCategories.filter((c) => c !== cat)
        : [...prev.additionalCategories, cat],
    }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.crNumber.trim()) e.crNumber = "CR Number is required";
    if (!form.contactName.trim()) e.contactName = "Contact name is required";
    if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.primaryCategory) e.primaryCategory = "Please select a primary category";
    if (!form.companyIntro.trim()) e.companyIntro = "Company introduction is required";
    else if (form.companyIntro.trim().split(/\s+/).length > 250) e.companyIntro = "Please keep it under 250 words";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setRef(data.ref);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-10 md:p-14 border border-neutral-200/80 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-[var(--primary)]" />
        </div>
        <h3 className="text-2xl font-semibold text-neutral-900 mb-3" style={{ letterSpacing: "-0.02em" }}>
          Application Submitted
        </h3>
        <p className="text-neutral-500 text-[15px] leading-relaxed mb-6 max-w-md mx-auto">
          Thank you for applying to the Saudi Event Management Vendor Network. Our partnerships team will review your application within 5 business days.
        </p>
        <div className="inline-flex items-center gap-2 bg-neutral-50 border border-neutral-200/80 rounded-xl px-5 py-3">
          <span className="text-[13px] text-neutral-500 font-medium">Your reference number:</span>
          <span className="text-[13px] font-semibold text-neutral-900 font-mono">{ref}</span>
        </div>
      </div>
    );
  }

  const wordCount = form.companyIntro.trim() ? form.companyIntro.trim().split(/\s+/).length : 0;

  return (
    <form
      id="vendor-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200/80"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
      noValidate
    >
      <h2 className="text-2xl font-semibold text-neutral-900 mb-1" style={{ letterSpacing: "-0.02em" }}>
        Vendor Registration
      </h2>
      <p className="text-[14px] text-neutral-500 mb-8">All fields marked with <span className="text-[var(--primary)]">*</span> are required.</p>

      {/* Company Details */}
      <fieldset className="mb-8">
        <legend className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase mb-5 block">
          Company Details
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Company Name <span className="text-[var(--primary)]">*</span></label>
            <input type="text" value={form.companyName} onChange={set("companyName")} placeholder="Al Nakheel Catering Co." className={inputClass} />
            {errors.companyName && <p className="text-rose-500 text-[12px] mt-1.5">{errors.companyName}</p>}
          </div>
          <div>
            <label className={labelClass}>CR Number / Commercial Registration <span className="text-[var(--primary)]">*</span></label>
            <input type="text" value={form.crNumber} onChange={set("crNumber")} placeholder="1010XXXXXXX" className={inputClass} />
            {errors.crNumber && <p className="text-rose-500 text-[12px] mt-1.5">{errors.crNumber}</p>}
          </div>
        </div>
      </fieldset>

      {/* Contact Information */}
      <fieldset className="mb-8">
        <legend className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase mb-5 block">
          Contact Information
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Contact Person Full Name <span className="text-[var(--primary)]">*</span></label>
            <input type="text" value={form.contactName} onChange={set("contactName")} placeholder="Ahmed Al-Rashidi" className={inputClass} />
            {errors.contactName && <p className="text-rose-500 text-[12px] mt-1.5">{errors.contactName}</p>}
          </div>
          <div>
            <label className={labelClass}>Job Title</label>
            <input type="text" value={form.jobTitle} onChange={set("jobTitle")} placeholder="CEO / Director of Operations" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp <span className="text-[var(--primary)]">*</span></label>
            <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+966 5X XXX XXXX" className={inputClass} />
            {errors.phone && <p className="text-rose-500 text-[12px] mt-1.5">{errors.phone}</p>}
          </div>
          <div>
            <label className={labelClass}>Business Email <span className="text-[var(--primary)]">*</span></label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="contact@company.com.sa" className={inputClass} />
            {errors.email && <p className="text-rose-500 text-[12px] mt-1.5">{errors.email}</p>}
          </div>
        </div>
      </fieldset>

      {/* Service Categories */}
      <fieldset className="mb-8">
        <legend className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase mb-5 block">
          Service Categories
        </legend>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Primary Service Category <span className="text-[var(--primary)]">*</span></label>
            <select value={form.primaryCategory} onChange={set("primaryCategory")} className={inputClass}>
              <option value="">Select your primary category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.primaryCategory && <p className="text-rose-500 text-[12px] mt-1.5">{errors.primaryCategory}</p>}
          </div>
          <div>
            <label className={labelClass}>Additional Categories <span className="text-neutral-400 font-normal">(select all that apply)</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-1">
              {CATEGORIES.map((cat) => {
                const checked = form.additionalCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 text-[13px] font-medium select-none ${
                      checked
                        ? "bg-emerald-50 border-[var(--primary)]/30 text-[var(--primary)]"
                        : "bg-neutral-50 border-neutral-200/80 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${checked ? "bg-[var(--primary)] border-[var(--primary)]" : "bg-white border-neutral-300"}`}>
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {cat}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Operational Details */}
      <fieldset className="mb-8">
        <legend className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase mb-5 block">
          Operational Details
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Years in Operation</label>
            <select value={form.yearsInOperation} onChange={set("yearsInOperation")} className={inputClass}>
              <option value="">Select range…</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Primary City of Operation</label>
            <select value={form.primaryCity} onChange={set("primaryCity")} className={inputClass}>
              <option value="">Select city…</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Portfolio or Website URL</label>
            <input type="url" value={form.portfolioUrl} onChange={set("portfolioUrl")} placeholder="https://yourcompany.com.sa" className={inputClass} />
          </div>
        </div>
      </fieldset>

      {/* About Your Company */}
      <fieldset className="mb-8">
        <legend className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase mb-5 block">
          About Your Company
        </legend>
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass + " mb-0"}>Company Introduction <span className="text-[var(--primary)]">*</span></label>
              <span className={`text-[12px] font-medium ${wordCount > 250 ? "text-rose-500" : "text-neutral-400"}`}>{wordCount}/250 words</span>
            </div>
            <textarea
              value={form.companyIntro}
              onChange={set("companyIntro")}
              rows={5}
              placeholder="Describe your company, specialisations, key clients, and what sets you apart as a vendor in Saudi Arabia's event industry…"
              className={inputClass + " resize-none"}
            />
            {errors.companyIntro && <p className="text-rose-500 text-[12px] mt-1.5">{errors.companyIntro}</p>}
          </div>
          <div>
            <label className={labelClass}>How did you hear about us?</label>
            <select value={form.howHeard} onChange={set("howHeard")} className={inputClass}>
              <option value="">Select an option…</option>
              {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-xl mb-6 text-[14px]">
          <AlertCircle size={18} className="shrink-0" />
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-4 rounded-xl text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting Application…
          </>
        ) : (
          "Submit Vendor Application →"
        )}
      </button>
    </form>
  );
}
