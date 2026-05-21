"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    venueCity: "",
    message: "",
    source: "contact_page",
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
        eventType: "",
        venueCity: "",
        message: "",
        source: "contact_page",
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass = (field: string) => `
    w-full bg-ink-900/60 border border-ink-600 px-4 py-3 text-sm text-sand-100 placeholder-sand-500/60 
    focus:border-gold-400 focus:bg-ink-900 transition-all tracking-tight outline-none rounded-md
    ${focusedField === field ? "shadow-[0_0_15px_rgba(212,175,55,0.15)] border-gold-400" : "hover:border-ink-500"}
  `;

  return (
    <div className="bg-ink-850/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-ink-600 shadow-2xl shadow-black/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="text-gold-400 animate-pulse" size={16} />
        <span className="text-[10px] font-bold text-gold-400 uppercase tracking-[0.2em]">Inquiry Form</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
              Full Name <span className="text-gold-400">*</span>
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

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
              Email Address <span className="text-gold-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass("email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
              Phone Number
            </label>
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

          {/* Event Category */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
              Event Category
            </label>
            <select
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className={`${inputClass("type")} appearance-none cursor-pointer`}
              onFocus={() => setFocusedField("type")}
              onBlur={() => setFocusedField(null)}
            >
              <option value="" className="bg-ink-950 text-sand-400">Choose your occasion...</option>
              <option value="Luxury Wedding" className="bg-ink-950 text-sand-100">Royal Wedding</option>
              <option value="Corporate Gala" className="bg-ink-950 text-sand-100">Corporate Gala / Summit</option>
              <option value="VIP Reception" className="bg-ink-950 text-sand-100">VIP Private Reception</option>
              <option value="Exhibition" className="bg-ink-950 text-sand-100">B2B Exhibition & Trade Show</option>
              <option value="Private Concert" className="bg-ink-950 text-sand-100">Exclusive Social & Cultural Event</option>
            </select>
          </div>
        </div>

        {/* Venue Location */}
        <div className="space-y-2">
          <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
            Preferred Venue City
          </label>
          <select
            value={formData.venueCity}
            onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
            className={`${inputClass("city")} appearance-none cursor-pointer`}
            onFocus={() => setFocusedField("city")}
            onBlur={() => setFocusedField(null)}
          >
            <option value="" className="bg-ink-950 text-sand-400">Select city...</option>
            <option value="Riyadh" className="bg-ink-950 text-sand-100">Riyadh</option>
            <option value="Jeddah" className="bg-ink-950 text-sand-100">Jeddah</option>
            <option value="AlUla" className="bg-ink-950 text-sand-100">AlUla</option>
            <option value="Dammam" className="bg-ink-950 text-sand-100">Dammam & Eastern Province</option>
          </select>
        </div>

        {/* Your Vision */}
        <div className="space-y-2">
          <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">
            Describe Your Vision <span className="text-gold-400">*</span>
          </label>
          <textarea
            required
            rows={5}
            placeholder="Tell us about the masterpiece you wish to create, event size, themes, and special requirements..."
            className={`${inputClass("msg")} resize-none`}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            onFocus={() => setFocusedField("msg")}
            onBlur={() => setFocusedField(null)}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-gold-400 hover:bg-gold-300 text-ink-950 py-4.5 text-[10px] font-bold uppercase tracking-[0.25em] rounded-md shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-ink-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Send size={12} />
                Submit Inquiry
              </>
            )}
          </motion.button>
        </div>

        {/* Status Alerts */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-emerald-400 text-[11px] font-semibold bg-emerald-950/40 px-6 py-4 rounded-md border border-emerald-500/30 mt-4"
            >
              <CheckCircle size={16} className="shrink-0" />
              <span>Vision Received. Our lead consultant will connect with you within 2 hours.</span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-rose-400 text-[11px] font-semibold bg-rose-950/40 px-6 py-4 rounded-md border border-rose-500/30 mt-4"
            >
              <AlertCircle size={16} className="shrink-0" />
              <span>Failed to submit. Please check your network or try again directly.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
