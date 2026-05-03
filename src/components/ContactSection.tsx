"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Calendar, DollarSign } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", eventType: "", budget: "", message: "" });
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold-500 text-xs uppercase tracking-[0.4em] font-medium mb-4 block">Start Your Journey</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white mb-4">Get In <span className="text-shimmer font-semibold italic">Touch</span></motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg font-light">Let us craft your next extraordinary experience.</motion.p>
        </div>
        <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="c-name" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
              <input type="text" id="c-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} className={ic("name")} placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
              <input type="email" id="c-email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} className={ic("email")} placeholder="you@example.com" />
            </div>
          </div>
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
                <option value="other" className="bg-charcoal-900">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="c-budget" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider"><DollarSign size={12} className="inline mr-1" />Budget</label>
              <select id="c-budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} onFocus={() => setFocusedField("budget")} onBlur={() => setFocusedField(null)} className={`${ic("budget")} appearance-none cursor-pointer`}>
                <option value="" className="bg-charcoal-900">Select range...</option>
                <option value="5-15k" className="bg-charcoal-900">$5K - $15K</option>
                <option value="15-50k" className="bg-charcoal-900">$15K - $50K</option>
                <option value="50-100k" className="bg-charcoal-900">$50K - $100K</option>
                <option value="100k+" className="bg-charcoal-900">$100K+</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="c-msg" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Vision</label>
            <textarea id="c-msg" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocusedField("msg")} onBlur={() => setFocusedField(null)} className={`${ic("msg")} resize-none`} placeholder="Tell us about your dream event..." />
          </div>
          <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full md:w-auto px-12 py-4 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-wider text-sm btn-glow flex items-center justify-center gap-3 disabled:opacity-50">
            {status === "loading" ? (<><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-charcoal-900/30 border-t-charcoal-900 rounded-full" />Sending...</>) : (<><Send size={16} />Send Inquiry</>)}
          </motion.button>
          <AnimatePresence>
            {status === "success" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-400 text-sm bg-green-400/10 border border-green-400/20 px-5 py-3 rounded-sm"><CheckCircle size={18} />Thank you! We&apos;ll get back to you within 24 hours.</motion.div>)}
            {status === "error" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-5 py-3 rounded-sm"><AlertCircle size={18} />Something went wrong. Please try again.</motion.div>)}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
