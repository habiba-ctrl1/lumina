"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Building2, User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon, Handshake } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function BecomeOne() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    partnerType: "",
    city: "",
    website: "",
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
          eventType: formData.partnerType,
          venueCity: formData.city,
          message: `Website: ${formData.website}\n\nPartner Details: ${formData.message}`,
          source: "become_one_partnership"
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        partnerType: "",
        city: "",
        website: "",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200/80 py-3 px-4 text-xs text-slate-800 placeholder-slate-400 focus:border-gold-400 focus:bg-white transition-all rounded-sm outline-none hover:border-slate-300 shadow-sm";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-100/50 border-b border-slate-200/50">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 bg-emerald-50 rounded-sm flex items-center justify-center mx-auto mb-6 border border-emerald-800/10"
          >
            <Handshake size={28} className="text-emerald-800" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-label"
          >
            Become One
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-medium text-slate-900 mb-4 uppercase tracking-tight text-2xl md:text-3xl lg:text-4xl"
          >
            Strategic <span className="text-shimmer italic">Alliance</span> Application
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-xl mx-auto text-xs md:text-sm leading-relaxed"
          >
            Join an elite ecosystem of innovators and creators. We look for partners who share our commitment to 
            absolute perfection and cultural resonance.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-slate-50">
        <div className="container-luxury max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Side: Info */}
            <div className="lg:col-span-4 space-y-10">
              <div>
                <h2 className="font-display font-medium text-slate-900 mb-6 leading-tight text-xl">
                  Why Partner with <span className="text-shimmer italic">Saudi Event Management</span>
                </h2>
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mb-4">Partnership Value</h3>
                <ul className="space-y-6">
                  {[
                    { title: "Joint Innovation", desc: "Collaborate on groundbreaking event concepts and technologies." },
                    { title: "Market Leadership", desc: "Position your brand at the center of Saudi's event revolution." },
                    { title: "Resource Sharing", desc: "Access our world-class infrastructure and planning expertise." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 shrink-0 shadow-sm" />
                      <div>
                        <h4 className="text-slate-900 text-[10px] font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-slate-600 text-[10px] leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-950 p-8 rounded-sm text-white shadow-md border border-emerald-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-full blur-2xl -mr-12 -mt-12" />
                <h4 className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-3">Direct Inquiry</h4>
                <p className="text-emerald-200/80 text-[10px] mb-6 leading-relaxed">For high-level strategic inquiries or government relations, please contact us via WhatsApp.</p>
                <a 
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20want%20to%20discuss%20a%20strategic%20partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gold-400 text-slate-900 py-3 rounded-sm text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gold-500 transition-all"
                >
                  <MessageCircle size={14} /> Partner Hotline
                </a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6 md:p-8 hover:shadow-md"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><User size={10} /> Principal Contact</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="Full Name" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Mail size={10} /> Professional Email</label>
                      <input 
                        type="email" 
                        required 
                        className={inputClasses} 
                        placeholder="contact@organization.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value.toLowerCase()})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Phone size={10} /> Contact Number</label>
                      <input 
                        type="tel" 
                        required 
                        className={inputClasses} 
                        placeholder="+966 5x xxx xxxx" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Building2 size={10} /> Organization Name</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="Legal Entity Name" 
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><Briefcase size={10} /> Partnership Tier</label>
                      <select 
                        required 
                        className={`${inputClasses} appearance-none cursor-pointer`}
                        value={formData.partnerType}
                        onChange={(e) => setFormData({...formData, partnerType: e.target.value})}
                      >
                        <option value="">Select Tier</option>
                        <option value="strategic">Strategic Partner</option>
                        <option value="supplier">Elite Supplier</option>
                        <option value="cultural">Cultural Collaborator</option>
                        <option value="venue">Venue Partner</option>
                        <option value="tech">Technology Partner</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><MapPin size={10} /> Headquarters</label>
                      <input 
                        type="text" 
                        required 
                        className={inputClasses} 
                        placeholder="City, Country" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2"><LinkIcon size={10} /> Corporate Website</label>
                    <input 
                      type="url" 
                      className={inputClasses} 
                      placeholder="https://www.organization.com" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Partnership Vision</label>
                    <textarea 
                      required
                      rows={2} 
                      className={`${inputClasses} resize-none`} 
                      placeholder="Describe your vision for this collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="btn-primary font-semibold tracking-widest text-xs px-10 py-4 shadow-sm bg-gold-400 text-slate-900 hover:bg-gold-500 rounded-sm w-full md:w-auto"
                    >
                      {status === "loading" ? "Validating..." : "Submit Proposal"}
                    </button>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Agreement required to <Link href="/terms" className="text-emerald-800 hover:underline">partnership terms</Link>.</p>
                  </div>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-700 text-[10px] bg-green-50 px-6 py-4 rounded-sm border border-green-200 font-bold uppercase tracking-[0.2em]">
                        <CheckCircle size={18} /> Proposal Received. Our team will review shortly.
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-700 text-[10px] bg-red-50 px-6 py-4 rounded-sm border border-red-200 font-bold uppercase tracking-[0.2em]">
                        <AlertCircle size={18} /> Error sending proposal. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Descriptive SEO Section */}
      <section className="py-20 relative max-w-4xl mx-auto px-4 text-center border-t border-slate-200/80 bg-slate-50">
        <h2 className="font-display font-medium text-slate-900 mb-8 leading-tight text-xl md:text-2xl">
          The Partnership <span className="text-shimmer italic">Ecosystem</span>
        </h2>
        <div className="prose prose-gray max-w-none text-slate-600 text-sm leading-relaxed space-y-6">
          <p>
            Becoming a partner with Saudi Event Management means joining an elite collective dedicated to redefining the luxury and corporate event landscape in the Kingdom. We believe that extraordinary events are the result of synergistic collaborations between the industry&apos;s most talented professionals. Our partnership ecosystem is designed to foster mutual growth, knowledge sharing, and the joint execution of high-stakes projects across Riyadh, Jeddah, AlUla, and beyond. We value partners who bring specialized expertise, whether in cutting-edge AV technology, traditional Saudi craftsmanship, bespoke catering, or architectural venue management.
          </p>
          <p>
            Our selection process is rigorous, ensuring that every strategic alliance we form aligns with our core values of excellence, discretion, and cultural resonance. As a partner, you gain access to a pipeline of high-profile events and a network of high-net-worth clients and government entities. We prioritize long-term, sustainable relationships that contribute to the professionalization and elevation of the Saudi event sector in line with Vision 2030 objectives. By submitting your proposal, you are initiating a dialogue that could lead to your involvement in some of the most significant and culturally impactful events in Saudi Arabia&apos;s history.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
