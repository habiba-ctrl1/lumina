"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Calendar, DollarSign, MapPin, Users, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", budget: "", eventDate: "", guestCount: "", venueCity: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", eventType: "", budget: "", eventDate: "", guestCount: "", venueCity: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const ic = (field: string) => `w-full bg-charcoal-900/80 border rounded-sm px-5 py-4 text-white text-sm placeholder-gray-600 focus:outline-none transition-all duration-500 ${focusedField === field ? "border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-white/10 hover:border-white/20"}`;

  return (
    <section id="contact" className="py-28 bg-charcoal-800 relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block">Start Your Journey</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-4">Book a <span className="text-shimmer font-semibold italic">Discovery Call</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg font-light mb-3">Tell us about your vision and we&apos;ll craft a bespoke proposal.</motion.p>
          {/* Response time badge */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="inline-flex items-center gap-2 text-gold-500/80 text-xs uppercase tracking-wider border border-gold-500/20 px-4 py-2">
            <Clock size={12} />
            Average response time: under 2 hours
          </motion.div>
        </div>

        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="c-name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Full Name *</label>
              <input type="text" id="c-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} className={ic("name")} placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Email Address *</label>
              <input type="email" id="c-email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} className={ic("email")} placeholder="you@example.com" />
            </div>
          </div>

          {/* Row 2: Phone + Event Type + Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="c-phone" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Phone</label>
              <input type="tel" id="c-phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} className={ic("phone")} placeholder="+92 3XX XXXXXXX" />
            </div>
            <div>
              <label htmlFor="c-type" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><Calendar size={12} className="inline mr-1" />Event Type</label>
              <select id="c-type" value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} onFocus={() => setFocusedField("type")} onBlur={() => setFocusedField(null)} className={`${ic("type")} appearance-none cursor-pointer`}>
                <option value="" className="bg-charcoal-900">Select type...</option>
                <option value="wedding" className="bg-charcoal-900">Wedding</option>
                <option value="corporate" className="bg-charcoal-900">Corporate Gala</option>
                <option value="private" className="bg-charcoal-900">Private Party</option>
                <option value="destination" className="bg-charcoal-900">Destination Event</option>
                <option value="other" className="bg-charcoal-900">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-budget" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><DollarSign size={12} className="inline mr-1" />Starting Investment</label>
              <select id="c-budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} onFocus={() => setFocusedField("budget")} onBlur={() => setFocusedField(null)} className={`${ic("budget")} appearance-none cursor-pointer`}>
                <option value="" className="bg-charcoal-900">Select range...</option>
                <option value="10-25k" className="bg-charcoal-900">$10K – $25K</option>
                <option value="25-50k" className="bg-charcoal-900">$25K – $50K</option>
                <option value="50-100k" className="bg-charcoal-900">$50K – $100K</option>
                <option value="100k+" className="bg-charcoal-900">$100K+</option>
              </select>
            </div>
          </div>

          {/* Row 3: Event Date + Guest Count + Venue City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="c-date" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><Calendar size={12} className="inline mr-1" />Preferred Date</label>
              <input type="date" id="c-date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} onFocus={() => setFocusedField("date")} onBlur={() => setFocusedField(null)} className={ic("date")} />
            </div>
            <div>
              <label htmlFor="c-guests" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><Users size={12} className="inline mr-1" />Guest Count</label>
              <select id="c-guests" value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} onFocus={() => setFocusedField("guests")} onBlur={() => setFocusedField(null)} className={`${ic("guests")} appearance-none cursor-pointer`}>
                <option value="" className="bg-charcoal-900">Estimated guests...</option>
                <option value="<50" className="bg-charcoal-900">Under 50</option>
                <option value="50-150" className="bg-charcoal-900">50 – 150</option>
                <option value="150-300" className="bg-charcoal-900">150 – 300</option>
                <option value="300-500" className="bg-charcoal-900">300 – 500</option>
                <option value="500+" className="bg-charcoal-900">500+</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-city" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><MapPin size={12} className="inline mr-1" />Venue City</label>
              <input type="text" id="c-city" value={formData.venueCity} onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })} onFocus={() => setFocusedField("city")} onBlur={() => setFocusedField(null)} className={ic("city")} placeholder="e.g. New York, Dubai" />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="c-msg" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Vision *</label>
            <textarea id="c-msg" required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocusedField("msg")} onBlur={() => setFocusedField(null)} className={`${ic("msg")} resize-none`} placeholder="Tell us about your dream event — the venue, mood, colors, or any inspiration you have in mind..." />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full sm:w-auto px-12 py-4 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-wider text-sm btn-glow flex items-center justify-center gap-3 disabled:opacity-50">
              {status === "loading" ? (<><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full" />Processing...</>) : (<><Send size={16} />Book Discovery Call</>)}
            </motion.button>
            <p className="text-gray-600 text-xs">By submitting, you agree to our <a href="/privacy" className="text-gold-500/60 hover:text-gold-500 transition-colors">Privacy Policy</a></p>
          </div>

          <AnimatePresence>
            {status === "success" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-400 text-sm bg-green-400/10 border border-green-400/20 px-5 py-3 rounded-sm"><CheckCircle size={18} />Thank you! We&apos;ll be in touch within 2 hours to schedule your discovery call.</motion.div>)}
            {status === "error" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-5 py-3 rounded-sm"><AlertCircle size={18} />Something went wrong. Please try again or contact us directly.</motion.div>)}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
