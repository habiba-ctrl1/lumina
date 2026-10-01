"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

/**
 * A service-specific qualification question (e.g. "Indoor or outdoor?" on the
 * LED page). Answers are folded into the inquiry's message/requirements text,
 * so they land in the EXISTING Inquiry / QuoteRequest records — no new tables.
 */
export interface ServiceLeadField {
  name: string;
  label: string;
  type: "select" | "text";
  options?: string[];
  placeholder?: string;
  /** Only show this field when one of these "Service Required" values is selected. Omit = always show. */
  showFor?: string[];
}

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
  /** Label for the category dropdown (default "Event Type"). */
  eventTypeLabel?: string;
  /** Label for the guests/travellers field (default "Guests"). */
  guestCountLabel?: string;
  /** Label for the (optional) date field (default "Preferred Date"). */
  dateLabel?: string;
  /** Placeholder for the guests/travellers field. */
  guestCountPlaceholder?: string;
  /** Label for the company field (default "Company / Organisation"). */
  companyLabel?: string;
  /** Label for the free-text field (default "Project Details"). */
  messageLabel?: string;
  /** Placeholder for the free-text field. */
  messagePlaceholder?: string;

  // ── Qualified-lead mode (opt-in; existing pages are unaffected) ──────────
  /** "Service Required" options. Providing this switches the form into qualified-lead mode. */
  serviceOptions?: string[];
  /** Pre-selected "Service Required" value. */
  defaultService?: string;
  /** Service-specific questions rendered under the core fields. */
  serviceFields?: ServiceLeadField[];
  /** Budget range options (field is always optional). */
  budgetOptions?: string[];
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

const DEFAULT_BUDGETS = [
  "Prefer not to say",
  "Under SAR 10,000",
  "SAR 10,000 – 25,000",
  "SAR 25,000 – 50,000",
  "SAR 50,000 – 100,000",
  "SAR 100,000+",
];

const CONTACT_METHODS = ["WhatsApp", "Phone call", "Email"];

export default function ServiceLeadForm({
  source = "service_page",
  defaultEventType = "",
  eventTypeOptions = DEFAULT_EVENT_TYPES,
  eyebrow = "Request a Proposal",
  heading = "Tell us about your event",
  subheading = "Share a few details and we'll review your requirements and come back to you with next steps and suitable options.",
  submitLabel = "Request My Proposal",
  eventTypeLabel = "Event Type",
  guestCountLabel = "Guests",
  dateLabel = "Preferred Date",
  guestCountPlaceholder = "e.g. 250",
  companyLabel = "Company / Organisation",
  messageLabel = "Project Details",
  messagePlaceholder = "Tell us about your objectives, preferred dates, venue ideas, and any special requirements...",
  serviceOptions,
  defaultService = "",
  serviceFields = [],
  budgetOptions = DEFAULT_BUDGETS,
}: ServiceLeadFormProps) {
  const qualified = Array.isArray(serviceOptions) && serviceOptions.length > 0;

  const emptyForm = () => ({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: defaultEventType,
    venueCity: qualified ? "Riyadh" : "",
    eventDate: "",
    guestCount: "",
    message: "",
    source,
    service: defaultService,
    venue: "",
    budget: "",
    preferredContact: "WhatsApp",
  });

  const [formData, setFormData] = useState(emptyForm);
  const [details, setDetails] = useState<Record<string, string>>({});

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const visibleFields = serviceFields.filter(
    (f) => !f.showFor || !formData.service || f.showFor.includes(formData.service),
  );

  // Fold the qualification answers into the message so they reach the
  // existing Inquiry.message / QuoteRequest.requirements fields verbatim.
  const composeMessage = () => {
    if (!qualified) return formData.message;
    const lines = [
      `Service required: ${formData.service || "Not specified"}`,
      formData.venue ? `Venue / location: ${formData.venue}` : null,
      `Preferred contact: ${formData.preferredContact}`,
      formData.budget ? `Budget range: ${formData.budget}` : null,
      ...visibleFields
        .filter((f) => details[f.name])
        .map((f) => `${f.label}: ${details[f.name]}`),
    ].filter(Boolean);
    return `${lines.join("\n")}\n\nRequirements:\n${formData.message}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { venue: _venue, preferredContact: _pc, ...rest } = formData;
      const payload = {
        ...rest,
        message: composeMessage(),
        budget: formData.budget && formData.budget !== "Prefer not to say" ? formData.budget : "",
        service: qualified ? formData.service : undefined,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setFormData(emptyForm());
      setDetails({});

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

  const focusProps = (field: string) => ({
    onFocus: () => setFocusedField(field),
    onBlur: () => setFocusedField(null),
  });

  const labelClass = "text-[13px] font-medium text-neutral-500 block";
  const required = <span className="text-[var(--primary)]">*</span>;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-neutral-200/80 shadow-[0_8px_40px_rgba(15,23,42,0.06)] relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="text-[var(--primary)]" size={16} />
        <span className="text-[12px] font-semibold text-[var(--primary)] tracking-wider uppercase">{eyebrow}</span>
      </div>
      <h3 className="text-2xl font-bold text-neutral-900 mb-2" style={{ letterSpacing: "-0.02em" }}>
        {heading}
      </h3>
      <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">{subheading}</p>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {qualified && (
          <div className="space-y-2">
            <label htmlFor={`${source}-service`} className={labelClass}>
              Service Required {required}
            </label>
            <select
              id={`${source}-service`}
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`${inputClass("service")} appearance-none cursor-pointer`}
              {...focusProps("service")}
            >
              <option value="">Select...</option>
              {serviceOptions!.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={labelClass}>
              Full Name {required}
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              className={inputClass("name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              {...focusProps("name")}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>
              {qualified ? "Email" : "Work Email"} {required}
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={inputClass("email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              {...focusProps("email")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={labelClass}>
              {qualified ? <>WhatsApp Number {required}</> : "Phone / WhatsApp"}
            </label>
            <input
              type="tel"
              required={qualified}
              autoComplete="tel"
              placeholder="+966 50 123 4567"
              className={inputClass("phone")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              {...focusProps("phone")}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>{companyLabel}</label>
            <input
              type="text"
              autoComplete="organization"
              placeholder="Company name"
              className={inputClass("company")}
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              {...focusProps("company")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="space-y-2">
            <label className={labelClass}>{eventTypeLabel}</label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className={`${inputClass("type")} appearance-none cursor-pointer`}
              {...focusProps("type")}
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
            <label className={labelClass}>City</label>
            <select
              value={formData.venueCity}
              onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
              className={`${inputClass("city")} appearance-none cursor-pointer`}
              {...focusProps("city")}
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
            <label className={labelClass}>{dateLabel}</label>
            <input
              type="date"
              className={`${inputClass("date")} cursor-pointer`}
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              {...focusProps("date")}
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>{guestCountLabel}</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder={guestCountPlaceholder}
              className={inputClass("guests")}
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
              {...focusProps("guests")}
            />
          </div>
        </div>

        {qualified && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className={labelClass}>Venue / Location</label>
              <input
                type="text"
                placeholder="Venue name or district (if known)"
                className={inputClass("venue")}
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                {...focusProps("venue")}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Budget Range <span className="text-neutral-400 font-normal">(optional)</span></label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className={`${inputClass("budget")} appearance-none cursor-pointer`}
                {...focusProps("budget")}
              >
                <option value="">Select...</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {qualified && visibleFields.length > 0 && (
          <fieldset className="rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-4 sm:p-5">
            <legend className="px-1 text-[12px] font-semibold uppercase tracking-wider text-[var(--primary)]">
              {formData.service ? `${formData.service} details` : "Service details"}
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleFields.map((f) => (
                <div key={f.name} className="space-y-2">
                  <label htmlFor={`${source}-${f.name}`} className={labelClass}>{f.label}</label>
                  {f.type === "select" ? (
                    <select
                      id={`${source}-${f.name}`}
                      value={details[f.name] || ""}
                      onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })}
                      className={`${inputClass(f.name)} appearance-none cursor-pointer bg-white`}
                      {...focusProps(f.name)}
                    >
                      <option value="">Select...</option>
                      {(f.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`${source}-${f.name}`}
                      type="text"
                      placeholder={f.placeholder}
                      value={details[f.name] || ""}
                      onChange={(e) => setDetails({ ...details, [f.name]: e.target.value })}
                      className={`${inputClass(f.name)} bg-white`}
                      {...focusProps(f.name)}
                    />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        )}

        <div className="space-y-2">
          <label className={labelClass}>
            {messageLabel} {required}
          </label>
          <textarea
            required
            rows={4}
            placeholder={messagePlaceholder}
            className={`${inputClass("msg")} resize-none`}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            {...focusProps("msg")}
          />
        </div>

        {qualified && (
          <div className="space-y-2">
            <span className={labelClass}>Preferred Contact Method</span>
            <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Preferred contact method">
              {CONTACT_METHODS.map((m) => (
                <label
                  key={m}
                  className={`cursor-pointer select-none rounded-full border px-4 py-2 text-[13px] transition-colors ${
                    formData.preferredContact === m
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-semibold"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${source}-contact`}
                    value={m}
                    checked={formData.preferredContact === m}
                    onChange={() => setFormData({ ...formData, preferredContact: m })}
                    className="sr-only"
                  />
                  {m}
                </label>
              ))}
            </div>
          </div>
        )}

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
            Confidential · No obligation · Pricing confirmed only after supplier availability is checked
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
              <span>Thank you — your request has been received. We&apos;ll review your requirements and contact you by your preferred method.</span>
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
