"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Building2, User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

  const inputClasses = "w-full bg-ink-800 border border-ink-600 p-5 text-sm text-black placeholder-gray-400 focus:border-primary transition-all rounded-xl outline-none shadow-sm hover:border-gray-200 focus:shadow-lg";

  return (
    <main className="min-h-screen bg-ink-950/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-ink-800 border-b border-ink-600">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-8 block"
          >
            Partnership
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 uppercase tracking-tight"
          >
            Vendor <span className="text-primary italic">Registration</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Join Saudi Event Management's elite network of world-class vendors. We collaborate with the most prestigious 
            service providers to deliver masterpieces of luxury across the Middle East.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32">
        <div className="container-luxury max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Side: Info */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-black font-bold uppercase tracking-widest text-sm mb-8">Why Partner With Us?</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Elite Clientele", desc: "Gain access to high-profile corporate galas and royal weddings." },
                    { title: "Vision 2030 Projects", desc: "Collaborate on major Saudi Season events and GIGA projects." },
                    { title: "Seamless Coordination", desc: "Professional planning teams that handle all logistics." },
                  ].map((item: any, i: number) => (
                    <li key={i} className="flex gap-10">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                      <div>
                        <h4 className="text-black text-[11px] font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink-800 p-8 rounded-2xl border border-ink-600 shadow-sm">
                <h4 className="text-black text-xs font-bold uppercase tracking-widest mb-8">Direct Support</h4>
                <p className="text-gray-500 text-[11px] mb-8 leading-relaxed">Prefer to speak with our partnership team directly?</p>
                <a 
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20want%20to%20register%20as%20a%20vendor."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-ink-800 p-8 md:p-12 rounded-3xl border border-ink-600 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><User size={12} /> Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="e.g. Abdullah Ahmed" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><Mail size={12} /> Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className={inputClasses} 
                        placeholder="contact@business.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><Phone size={12} /> WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        required 
                        className={inputClasses} 
                        placeholder="+966 5x xxx xxxx" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><Building2 size={12} /> Business Name</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="e.g. Al-Fursan Catering" 
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><Briefcase size={12} /> Service Category</label>
                      <select 
                        required 
                        className={`${inputClasses} appearance-none cursor-pointer`}
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        <option value="catering">Catering & Fine Dining</option>
                        <option value="floral">Floral Design</option>
                        <option value="photography">Photography & Cinema</option>
                        <option value="decor">Lighting & Decor</option>
                        <option value="entertainment">Live Entertainment</option>
                        <option value="transport">Luxury Transport</option>
                        <option value="venue">Venue / Space</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><MapPin size={12} /> Primary City</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="e.g. Riyadh" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1 flex items-center gap-2"><LinkIcon size={12} /> Portfolio / Website Link</label>
                    <input 
                      type="url" 
                      className={inputClasses} 
                      placeholder="https://yourportfolio.com" 
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Tell us about your services</label>
                    <textarea 
                      rows={4} 
                      className={`${inputClasses} resize-none`} 
                      placeholder="Describe your experience, past projects, and why you want to partner with Saudi Event Management..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-10 pt-6">
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl disabled:opacity-50"
                    >
                      {status === "loading" ? "Processing..." : "Submit Application"}
                    </button>
                    <a 
                      href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20the%20vendor%20registration%20process."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto bg-[#25D366] text-white px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all"
                    >
                      <MessageCircle size={18} /> Chat via WhatsApp
                    </a>
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-600 text-xs bg-green-50 px-6 py-4 rounded-xl border border-green-100 font-bold uppercase tracking-widest">
                        <CheckCircle size={18} /> Application Sent Successfully!
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-600 text-xs bg-red-50 px-6 py-4 rounded-xl border border-red-100 font-bold uppercase tracking-widest">
                        <AlertCircle size={18} /> Error sending application.
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
