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
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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



  return (
    <main className="min-h-screen bg-[#041E42] overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#041E42] via-transparent to-[#041E42]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-500 text-xs uppercase tracking-[0.5em] font-bold mb-8 block"
          >
            Personalized Planning
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-bold text-white mb-8"
          >
            Book Your <span className="hero-subtitle-shimmer font-bold">Discovery Session</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Let&apos;s begin the journey of creating your next masterpiece. Our senior consultants are ready to bring your vision to life.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-32 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-ink-800/5 border border-white/10 p-8 rounded-sm">
              <h2 className="text-white font-sans font-bold text-2xl mb-8 uppercase tracking-tight">
                Your <span className="text-gold-500">Discovery</span> Journey
              </h2>
              <h3 className="text-white/60 font-sans font-bold text-xs mb-8 uppercase tracking-widest">What to Expect</h3>
              <ul className="space-y-6">
                {[
                  { icon: Zap, title: "Initial Vision Discovery", desc: "A 30-minute deep dive into your event goals and inspirations." },
                  { icon: Sparkles, title: "Creative Possibilities", desc: "Early conceptual ideas tailored to your unique style." },
                  { icon: ShieldCheck, title: "Strategic Roadmap", desc: "Transparent timeline and initial budget considerations." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-10"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="p-8 border border-white/5 rounded-sm">
              <div className="flex items-center gap-10 text-gold-500 mb-8">
                <Clock size={20} />
                <span className="text-xs uppercase tracking-widest font-bold">Priority Response</span>
              </div>
              <p className="text-gray-400 text-sm font-light">
                Our concierge team reviews all discovery requests within 90 minutes. You will receive a personalized calendar link to finalize your session.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-ink-800 p-8 md:p-12 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] placeholder-gray-300 focus:border-gold-500 transition-all outline-none" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] placeholder-gray-300 focus:border-gold-500 transition-all outline-none" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] placeholder-gray-300 focus:border-gold-500 transition-all outline-none" 
                      placeholder="+966 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Event Type</label>
                    <select 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] focus:border-gold-500 transition-all outline-none appearance-none"
                      value={formData.eventType}
                      onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Royal Wedding</option>
                      <option value="corporate">Corporate Gala</option>
                      <option value="private">Private Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Target Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] focus:border-gold-500 transition-all outline-none" 
                      value={formData.eventDate}
                      onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Estimated Budget</label>
                    <select 
                      className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] focus:border-gold-500 transition-all outline-none appearance-none"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    >
                      <option value="">Budget Range</option>
                      <option value="150k-350k">SAR 150,000 – 350,000</option>
                      <option value="350k-900k">SAR 350,000 – 900,000</option>
                      <option value="900k-1.8m">SAR 900,000 – 1,800,000</option>
                      <option value="1.8m+">SAR 1,800,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Brief Overview of your Vision</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-ink-950 border border-ink-600 p-4 text-sm text-[#041E42] placeholder-gray-300 focus:border-gold-500 transition-all outline-none resize-none" 
                    placeholder="Tell us about the atmosphere, location, and key elements you envision..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <motion.button 
                  type="submit" 
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#041E42] text-white font-bold uppercase tracking-[0.3em] py-5 text-[11px] flex items-center justify-center gap-10 hover:bg-[#062a5c] transition-all"
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
                      className="bg-green-50 border border-green-100 p-4 flex items-center gap-3 text-green-700 text-sm"
                    >
                      <CheckCircle size={18} /> Thank you! Our concierge team will contact you within 90 minutes.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-100 p-4 flex items-center gap-3 text-red-700 text-sm"
                    >
                      <AlertCircle size={18} /> Please ensure all fields are correct. Phone must start with +966 or 05.
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-6 border-t border-ink-600 text-center">
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-8">Prefer instant reply?</p>
                  <a 
                    href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I'd%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest hover:text-green-700 transition-colors"
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
      <section className="py-28 relative max-w-4xl mx-auto px-4 text-center border-t border-white/5">
        <h2 className="text-2xl md:text-3xl font-sans text-white mb-8 font-bold uppercase tracking-tight">
          The Power of <span className="text-gold-500">Early Consultation</span>
        </h2>
        <div className="prose prose-invert prose-gold max-w-none text-gray-400 font-light leading-relaxed space-y-6">
          <p>
            A discovery session with Saudi Event Management is more than just a meeting; it is the first step in translating your abstract ideas into a tangible, world-class experience. We believe that the foundation of any successful event lies in the initial conceptualization phase. During your consultation, our senior event directors will listen to your aspirations, understand your brand or personal narrative, and begin identifying the strategic pillars that will support your event&apos;s success. This collaborative approach allows us to align our perfect planning and design with your emotional vision from day one.
          </p>
          <p>
            Our consultation process is designed to save you time and provide immediate clarity on the feasibility, scale, and potential of your project. We discuss high-level logistical considerations, venue availability in key Saudi cities, and preliminary budget frameworks that reflect your quality expectations. By engaging with our experts early in your planning journey, you gain access to a decade of industry expertise and a network of elite partners that can elevate your event from standard to extraordinary. We prioritize confidentiality and professional discretion throughout every interaction, ensuring your vision is protected while it is being refined.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
