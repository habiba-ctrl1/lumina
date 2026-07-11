"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.eventType || !formData.budget || !formData.message) {
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      return;
    }

    if (!formData.phone.startsWith("+966") && !formData.phone.startsWith("05")) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", eventType: "", eventDate: "", guestCount: "", budget: "", message: "" });
    } catch {
      setStatus("error");
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
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6">
        <div className="absolute inset-0 z-0 bg-[var(--surface-raised)] border-b border-neutral-200/80">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Personalized Planning
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6"
            style={{ letterSpacing: "-0.025em" }}
          >
            Book Your <span className="text-[var(--primary)]">Discovery Session</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 text-[16px] md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Let&apos;s begin the journey of creating your next masterpiece. Our senior consultants are ready to bring your vision to life.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-neutral-200/80 p-8 md:p-10 rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <h2 className="text-neutral-900 font-semibold text-2xl mb-8" style={{ letterSpacing: "-0.025em" }}>
                Your <span className="text-[var(--primary)]">Discovery</span> Journey
              </h2>
              <h3 className="text-neutral-400 font-medium text-[12px] uppercase tracking-widest mb-8">What to Expect</h3>
              <ul className="space-y-8">
                {[
                  { icon: Zap, title: "Initial Vision Discovery", desc: "A 30-minute deep dive into your event goals and inspirations." },
                  { icon: Sparkles, title: "Creative Possibilities", desc: "Early conceptual ideas tailored to your unique style." },
                  { icon: ShieldCheck, title: "Strategic Roadmap", desc: "Transparent timeline and initial budget considerations." }
                ].map((item: any, i: number) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[var(--primary)] shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-neutral-900 font-semibold text-[15px] mb-1.5" style={{ letterSpacing: "-0.01em" }}>{item.title}</h4>
                      <p className="text-neutral-500 text-[14px] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-8 border border-neutral-200/80 bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 text-[var(--primary)] mb-4">
                <Clock size={18} />
                <span className="text-[13px] font-semibold uppercase tracking-wider">Priority Response</span>
              </div>
              <p className="text-neutral-500 text-[14px] leading-relaxed">
                Our concierge team reviews all discovery requests within 90 minutes. You will receive a personalized calendar link to finalize your session.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] border border-neutral-200/80 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className={inputClass("name")}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className={inputClass("email")}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className={inputClass("phone")}
                      placeholder="+966 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Event Type</label>
                    <select 
                      required
                      className={`${inputClass("type")} appearance-none cursor-pointer`}
                      value={formData.eventType}
                      onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                      onFocus={() => setFocusedField("type")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" className="text-neutral-400">Select Event Type</option>
                      <option value="wedding" className="text-neutral-900">Royal Wedding</option>
                      <option value="corporate" className="text-neutral-900">Corporate Gala</option>
                      <option value="private" className="text-neutral-900">Private Celebration</option>
                      <option value="other" className="text-neutral-900">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Target Date</label>
                    <input 
                      type="date" 
                      className={inputClass("date")}
                      value={formData.eventDate}
                      onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                      onFocus={() => setFocusedField("date")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-neutral-500 block">Estimated Budget</label>
                    <select 
                      required
                      className={`${inputClass("budget")} appearance-none cursor-pointer`}
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      onFocus={() => setFocusedField("budget")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" className="text-neutral-400">Budget Range</option>
                      <option value="150k-350k" className="text-neutral-900">SAR 150,000 – 350,000</option>
                      <option value="350k-900k" className="text-neutral-900">SAR 350,000 – 900,000</option>
                      <option value="900k-1.8m" className="text-neutral-900">SAR 900,000 – 1,800,000</option>
                      <option value="1.8m+" className="text-neutral-900">SAR 1,800,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-neutral-500 block">Brief Overview of your Vision</label>
                  <textarea 
                    required
                    rows={4}
                    className={`${inputClass("msg")} resize-none`}
                    placeholder="Tell us about the atmosphere, location, and key elements you envision..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    onFocus={() => setFocusedField("msg")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-medium py-4 text-[14px] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Request Session <ChevronRight size={16} /></>
                  )}
                </motion.button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-emerald-700 text-[13px] font-medium mt-4"
                    >
                      <CheckCircle size={18} className="shrink-0" /> 
                      Thank you! Our concierge team will contact you within 90 minutes.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-center gap-3 text-rose-700 text-[13px] font-medium mt-4"
                    >
                      <AlertCircle size={18} className="shrink-0" /> 
                      Please ensure all fields are correct. Phone must start with +966 or 05.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-6 border-t border-neutral-100 text-center">
                  <p className="text-neutral-400 text-[11px] font-medium uppercase tracking-wider mb-3">Prefer instant reply?</p>
                  <a 
                    href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I'd%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-[13px] hover:text-emerald-700 transition-colors"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Descriptive SEO Section */}
      <section className="py-24 md:py-32 relative max-w-4xl mx-auto px-6 text-center border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.025em" }}>
          The Power of <span className="text-[var(--primary)]">Early Consultation</span>
        </h2>
        <div className="prose prose-slate max-w-none text-neutral-500 font-normal text-[15px] leading-relaxed space-y-6 text-justify sm:text-center">
          <p>
            A discovery session with Saudi Event Management is more than just a meeting; it is the first step in translating your abstract ideas into a tangible, world-class experience. We believe that the foundation of any successful event lies in the initial conceptualization phase. During your consultation, our senior event directors will listen to your aspirations, understand your brand or personal narrative, and begin identifying the strategic pillars that will support your event&apos;s success. This collaborative approach allows us to align our meticulous planning and design with your emotional vision from day one.
          </p>
          <p>
            Our consultation process is designed to save you time and provide immediate clarity on the feasibility, scale, and potential of your project. We discuss high-level logistical considerations, venue availability in key Saudi cities, and preliminary budget frameworks that reflect your quality expectations. By engaging with our experts early in your planning journey, you gain access to a rigorously vetted network of partners that can elevate your event from standard to extraordinary. We prioritize confidentiality and professional discretion throughout every interaction, ensuring your vision is protected while it is being refined.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
