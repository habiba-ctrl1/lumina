"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Calendar, MapPin, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", eventType: "", eventDate: "", guestCount: "", venueCity: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", eventType: "", eventDate: "", guestCount: "", venueCity: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const ic = (field: string) => `w-full bg-white border border-gray-200 p-5 text-sm text-black placeholder-gray-400 focus:border-primary transition-all uppercase tracking-widest outline-none rounded-xl ${focusedField === field ? "shadow-lg border-primary" : "hover:border-primary/50"}`;

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden border-y border-gray-50">
      <div className="container-luxury relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-primary text-[11px] uppercase tracking-[0.5em] font-bold mb-6 block"
          >
            Start Your Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black text-4xl md:text-5xl font-bold mb-10 uppercase tracking-tight"
          >
            Start Your <span className="text-primary">Legacy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-gray-500 text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Tell us about your vision and we&apos;ll craft a bespoke proposal.
          </motion.p>
          {/* Response time badge */}
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="inline-flex items-center gap-3 text-gray-400 text-[10px] uppercase tracking-widest border border-gray-100 px-8 py-4 rounded-xl bg-gray-50/50"
          >
            <Clock size={14} className="text-primary" />
            Average response time: under 2 hours
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className={ic("name")}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    className={ic("email")}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Row 2: Phone + Event Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)} className={ic("phone")} placeholder="+966 5x xxx xxxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Event Type</label>
                  <div className="relative">
                    <select value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} onFocus={() => setFocusedField("type")} onBlur={() => setFocusedField(null)} className={`${ic("type")} appearance-none cursor-pointer`}>
                      <option value="">Select Event Type</option>
                      <option value="wedding">Royal Wedding</option>
                      <option value="corporate">Corporate Gala</option>
                      <option value="private">Private Party</option>
                      <option value="destination">Destination Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Event Date + Guest Count + Venue City */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Calendar size={12} className="text-primary" /> Event Date</label>
                  <input type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} onFocus={() => setFocusedField("date")} onBlur={() => setFocusedField(null)} className={ic("date")} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Users size={12} className="text-primary" /> Estimated Guests</label>
                  <select value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} onFocus={() => setFocusedField("guests")} onBlur={() => setFocusedField(null)} className={`${ic("guests")} appearance-none cursor-pointer`}>
                    <option value="">Guest Count...</option>
                    <option value="<50">Under 50</option>
                    <option value="50-150">50 – 150</option>
                    <option value="150-300">150 – 300</option>
                    <option value="300-500">300 – 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><MapPin size={12} className="text-primary" /> City</label>
                  <input type="text" value={formData.venueCity} onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })} onFocus={() => setFocusedField("city")} onBlur={() => setFocusedField(null)} className={ic("city")} placeholder="e.g. Riyadh" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Vision</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocusedField("msg")} onBlur={() => setFocusedField(null)} className={`${ic("msg")} resize-none`} placeholder="Tell us about your dream event..." />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <motion.button 
                  type="submit" 
                  disabled={status === "loading"} 
                  whileHover={{ y: -2, scale: 1.01 }} 
                  whileTap={{ scale: 0.98 }} 
                  className="w-full sm:w-auto bg-black text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl hover:bg-gray-900 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Processing..." : "Submit Inquiry"}
                </motion.button>
                <span className="text-gray-300 uppercase text-[9px] tracking-widest hidden sm:block">OR</span>
                <motion.a 
                  href="https://wa.me/966501234567?text=Hi%20Lumina!%20I%20would%20like%20to%20discuss%20an%20event." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#128C7E] transition-all"
                >
                  <MessageCircle size={18} /> WhatsApp
                </motion.a>
              </div>
              <p className="text-center mt-8 text-gray-400 text-[10px] uppercase tracking-widest">
                By submitting, you agree to our <Link href="/privacy" className="text-black hover:text-primary transition-colors underline underline-offset-4 font-bold">Privacy Policy</Link>
              </p>

              <AnimatePresence>
                {status === "success" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 text-green-600 text-xs font-bold uppercase tracking-widest bg-green-50 px-6 py-4 rounded-xl border border-green-100 mt-6"><CheckCircle size={16} />Success! We&apos;ll reach out soon.</motion.div>)}
                {status === "error" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 text-red-600 text-xs font-bold uppercase tracking-widest bg-red-50 px-6 py-4 rounded-xl border border-red-100 mt-6"><AlertCircle size={16} />Error. Please try again later.</motion.div>)}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
