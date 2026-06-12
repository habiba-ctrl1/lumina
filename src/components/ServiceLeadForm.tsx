"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export interface ServiceLeadFormProps {
  /** Identifies the originating page in the CRM (e.g. "corporate_events_page"). */
  source?: string;
  /** Pre-selected event category. */
  defaultEventType?: string;
  /** Event category options shown in the dropdown. */
  eventTypeOptions?: string[];
  /** Eyebrow label above the form. */
  eyebrow?: string;
  /** Form heading. */
  heading?: string;
  /** Short supporting line under the heading. */
  subheading?: string;
  /** Submit button label. */
  submitLabel?: string;
}

const DEFAULT_EVENT_TYPES = [
  "Corporate Summit / Conference",
  "Gala Dinner & Awards",
  "Product Launch / Brand Activation",
  "Exhibition / Trade Show",
  "Luxury & VIP Event",
  "Event Production / Technical",
  "Other",
];

export default function ServiceLeadForm({
  source = "service_page",
  defaultEventType = "",
  eventTypeOptions = DEFAULT_EVENT_TYPES,
  eyebrow = "Request a Proposal",
  heading = "Tell us about your event",
  subheading = "Share a few details and a senior consultant will respond within 2 hours with a tailored proposal.",
  submitLabel = "Request My Proposal",
}: ServiceLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: defaultEventType,
    venueCity: "",
    guestCount: "",
    message: "",
    source,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        eventType: defaultEventType,
        venueCity: "",
        guestCount: "",
        message: "",
        source,
      });

      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass = (field: string) => `
    w-full bg-neutral-50 border border-neutral-200/80 px-4 py-3.5 text-[14px] text-neutral-900 placeholder-neutral-400
    focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none rounded-xl
    ${focusedField === field ? "shadow-sm border-[var(--primary)]" : "hover:border-neutral-300"}
  `;

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10 border border-neutral-200/80 shadow-[0_8px_40px_rgba(15,23,42,0.06)] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-[var(--primary)]" size={16} />
        <span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase">{eyebrow}</span>
      </div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-2" style={{ letterSpacing: "-0.02em" }}>
        {heading}
      </h3>
      <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">{subheading}</p>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">
              Full Name <span className="text-[var(--primary)]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your name"
              className={inputClass("name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">
              Work Email <span className="text-[var(--primary)]">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className={inputClass("email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">Phone / WhatsApp</label>
            <input
              type="tel"
              placeholder="+966 50 123 4567"
              className={inputClass("phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">Company / Organisation</label>
            <input
              type="text"
              placeholder="Company name"
              className={inputClass("company")}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2 md:col-span-1">
            <label className="text-[13px] font-medium text-neutral-500 block">Event Type</label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className={`${inputClass("type")} appearance-none cursor-pointer`}
              onFocus={() => setFocusedField("type")}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Select...</option>
              {eventTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">City</label>
            <select
              value={formData.venueCity}
              onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
              className={`${inputClass("city")} appearance-none cursor-pointer`}
              onFocus={() => setFocusedField("city")}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Select...</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
              <option value="AlUla">AlUla</option>
              <option value="NEOM">NEOM</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium text-neutral-500 block">Guests</label>
            <input
              type="text"
              placeholder="e.g. 250"
              className={inputClass("guests")}
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
              onFocus={() => setFocusedField("guests")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-medium text-neutral-500 block">
            Project Details <span className="text-[var(--primary)]">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us about your objectives, preferred dates, venue ideas, and any special requirements..."
            className={`${inputClass("msg")} resize-none`}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            onFocus={() => setFocusedField("msg")}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-4 text-[14px] font-semibold rounded-xl shadow-[0_4px_14px_rgba(13,107,78,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ms-1 me-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Send size={15} />
                {submitLabel}
              </>
            )}
          </motion.button>
          <p className="text-center text-neutral-400 text-[11px] mt-3">
            100% confidential · No obligation · Response within 2 hours
          </p>
        </div>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-emerald-700 text-[13px] font-medium bg-emerald-50 px-6 py-4 rounded-xl border border-emerald-100"
            >
              <CheckCircle size={18} className="shrink-0 text-emerald-600" />
              <span>Thank you. Your request has been received — our lead consultant will contact you within 2 hours.</span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-rose-700 text-[13px] font-medium bg-rose-50 px-6 py-4 rounded-xl border border-rose-100"
            >
              <AlertCircle size={18} className="shrink-0 text-rose-600" />
              <span>Something went wrong. Please try again or message us on WhatsApp.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
