"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Building2, User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export default function VendorRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    category: "",
    city: "",
    portfolio: "",
    message: ""
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
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.businessName,
          eventType: formData.category,
          venueCity: formData.city,
          message: `Portfolio: ${formData.portfolio}\n\nDetails: ${formData.message}`,
          source: "vendor_registration"
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        category: "",
        city: "",
        portfolio: "",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field: string) => `
    w-full bg-neutral-50 border border-neutral-200/80 px-4 py-3.5 text-[14px] text-neutral-900 placeholder-neutral-400 
    focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none rounded-xl
    ${focusedField === field ? "shadow-sm border-[var(--primary)]" : "hover:border-neutral-300"}
  `;

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-24 bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden px-6">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Partnership
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6"
            style={{ letterSpacing: "-0.025em" }}
          >
            Vendor <span className="text-[var(--primary)]">Registration</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 max-w-2xl mx-auto text-[16px] md:text-lg leading-relaxed"
          >
            Join Saudi Event Management's elite network of world-class vendors. We collaborate with the most prestigious 
            service providers to deliver masterpieces of luxury across the Middle East.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Side: Info */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h3 className="text-neutral-900 font-semibold text-lg mb-8" style={{ letterSpacing: "-0.01em" }}>Why Partner With Us?</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Elite Clientele", desc: "Gain access to high-profile corporate galas and royal weddings." },
                    { title: "Vision 2030 Projects", desc: "Collaborate on major Saudi Season events and GIGA projects." },
                    { title: "Seamless Coordination", desc: "Professional planning teams that handle all logistics." },
                  ].map((item: any, i: number) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full mt-2 shrink-0" />
                      <div>
                        <h4 className="text-neutral-900 text-[14px] font-semibold mb-1" style={{ letterSpacing: "-0.01em" }}>{item.title}</h4>
                        <p className="text-neutral-500 text-[13px] leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h4 className="text-neutral-900 text-lg font-semibold mb-3" style={{ letterSpacing: "-0.01em" }}>Direct Support</h4>
                <p className="text-neutral-500 text-[14px] mb-8 leading-relaxed">Prefer to speak with our partnership team directly?</p>
                <a 
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20want%20to%20register%20as%20a%20vendor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all shadow-[0_1px_2px_rgba(37,211,102,0.2)]"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-3xl border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><User size={14} className="text-neutral-400" /> Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClass("fullName")} 
                        placeholder="e.g. Abdullah Ahmed" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><Mail size={14} className="text-neutral-400" /> Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className={inputClass("email")} 
                        placeholder="contact@business.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><Phone size={14} className="text-neutral-400" /> WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        required 
                        className={inputClass("phone")} 
                        placeholder="+966 5x xxx xxxx" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><Building2 size={14} className="text-neutral-400" /> Business Name</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClass("businessName")} 
                        placeholder="e.g. Al-Fursan Catering" 
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        onFocus={() => setFocusedField("businessName")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><Briefcase size={14} className="text-neutral-400" /> Service Category</label>
                      <select 
                        required 
                        className={`${inputClass("category")} appearance-none cursor-pointer`}
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        onFocus={() => setFocusedField("category")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="" className="text-neutral-400">Select Category</option>
                        <option value="catering" className="text-neutral-900">Catering & Fine Dining</option>
                        <option value="floral" className="text-neutral-900">Floral Design</option>
                        <option value="photography" className="text-neutral-900">Photography & Cinema</option>
                        <option value="decor" className="text-neutral-900">Lighting & Decor</option>
                        <option value="entertainment" className="text-neutral-900">Live Entertainment</option>
                        <option value="transport" className="text-neutral-900">Luxury Transport</option>
                        <option value="venue" className="text-neutral-900">Venue / Space</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><MapPin size={14} className="text-neutral-400" /> Primary City</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClass("city")} 
                        placeholder="e.g. Riyadh" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        onFocus={() => setFocusedField("city")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 flex items-center gap-2 block"><LinkIcon size={14} className="text-neutral-400" /> Portfolio / Website Link</label>
                    <input 
                      type="url" 
                      className={inputClass("portfolio")} 
                      placeholder="https://yourportfolio.com" 
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      onFocus={() => setFocusedField("portfolio")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Tell us about your services</label>
                    <textarea 
                      rows={4} 
                      className={`${inputClass("message")} resize-none`} 
                      placeholder="Describe your experience, past projects, and why you want to partner with Saudi Event Management..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full bg-[var(--primary)] text-white py-4 rounded-xl text-[14px] font-medium hover:bg-[var(--primary-dark)] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] disabled:opacity-50 flex items-center justify-center"
                    >
                      {status === "loading" ? "Processing..." : "Submit Application"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-emerald-700 text-[13px] font-medium bg-emerald-50 px-6 py-4 rounded-xl border border-emerald-100 mt-4">
                        <CheckCircle size={18} className="shrink-0 text-emerald-600" /> Application Sent Successfully!
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-rose-700 text-[13px] font-medium bg-rose-50 px-6 py-4 rounded-xl border border-rose-100 mt-4">
                        <AlertCircle size={18} className="shrink-0 text-rose-600" /> Error sending application.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
