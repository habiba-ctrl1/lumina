"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import SectionWrapper from "./SectionWrapper";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", eventType: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", phone: "", eventType: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const ic = (field: string) => `w-full bg-ink-900 border border-ink-500 p-4 text-sm text-sand-100 placeholder-sand-500 focus:border-gold-400 transition-all tracking-tight outline-none rounded-sm ${focusedField === field ? "shadow-md border-gold-400" : "hover:border-gold-400/30"}`;

  return (
    <SectionWrapper id="contact" className="bg-ink-950 relative overflow-hidden">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Testimonials (Compact) */}
          <div className="lg:col-span-5 pt-4">
            <div className="mb-10">
              <span className="section-label">Direct Inquiry</span>
              <h2 className="font-display font-medium text-sand-50 text-2xl md:text-3xl uppercase tracking-tight mb-4 leading-tight">
                Start Your <span className="text-shimmer italic">Legacy</span>
              </h2>
              <p className="text-sand-400 text-[13px] leading-relaxed max-w-sm">
                Most luxury clients connect via WhatsApp for immediate white-glove service.
              </p>
            </div>

            <Testimonials />

            <div className="mt-12">
               <motion.a 
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 bg-[#25D366] text-white px-8 py-5 rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/20 transition-all w-fit"
                >
                  <MessageCircle size={20} />
                  <div className="text-left">
                    <p className="text-[8px] uppercase tracking-widest font-bold opacity-80 leading-none mb-1">Instant Response</p>
                    <p className="text-sm font-bold">WhatsApp Concierge</p>
                  </div>
                </motion.a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-ink-800 rounded-lg p-8 md:p-12 border border-ink-600 shadow-xl shadow-black/30">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={ic("name")}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    onFocus={() => setFocusedField("phone")} 
                    onBlur={() => setFocusedField(null)} 
                    className={ic("phone")} 
                    placeholder="+966" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Event Category</label>
                <select 
                  required 
                  value={formData.eventType} 
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} 
                  className={`${ic("type")} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-ink-900 text-sand-100">Choose your occasion...</option>
                  <option value="wedding" className="bg-ink-900 text-sand-100">Royal Wedding</option>
                  <option value="corporate" className="bg-ink-900 text-sand-100">Corporate Gala</option>
                  <option value="private" className="bg-ink-900 text-sand-100">Private VIP Event</option>
                  <option value="cultural" className="bg-ink-900 text-sand-100">Cultural Activation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-sand-300 uppercase tracking-widest ml-1">Your Vision</label>
                <textarea 
                  required 
                  rows={4} 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  className={`${ic("msg")} resize-none`} 
                  placeholder="Tell us about the masterpiece you want to create..." 
                />
              </div>

              <div className="pt-2">
                <motion.button 
                  type="submit" 
                  disabled={status === "loading"} 
                  whileHover={{ scale: 1.01 }} 
                  whileTap={{ scale: 0.99 }} 
                  className="w-full bg-gold-400 text-ink-950 py-4 text-[10px] font-bold uppercase tracking-[0.25em] rounded-sm shadow-md hover:bg-gold-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {status === "loading" ? "Processing..." : "Submit Inquiry"}
                </motion.button>
              </div>

              <AnimatePresence>
                {status === "success" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-3 text-emerald-400 text-[10px] font-bold uppercase tracking-widest bg-emerald-950/20 px-6 py-4 rounded-sm border border-emerald-500/20 mt-4"><CheckCircle size={16} />Vision Received. Concierge will contact you shortly.</motion.div>)}
              </AnimatePresence>

              <p className="text-center mt-6 text-sand-500 text-[9px] uppercase tracking-widest">
                Excellence in <Link href="/privacy" className="text-gold-400 font-bold">Privacy & Security</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
