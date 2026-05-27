"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Briefcase } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { useState } from "react";

export default function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputClass = (field: string) => `
    w-full bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900 
    placeholder-slate-400 focus:border-[var(--primary)] focus:bg-white 
    transition-all outline-none rounded-md
    ${focusedField === field ? "shadow-[0_0_0_4px_rgba(13,148,136,0.1)] border-[var(--primary)]" : "hover:border-slate-300"}
  `;

  return (
    <SectionWrapper id="contact" className="bg-slate-50 relative overflow-hidden">
      <div className="relative z-10 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="mb-10">
              <span className="w-12 h-[2px] bg-[var(--primary)] inline-block mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Get in Touch
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you're planning a high-profile corporate summit or an exclusive private gala, our expert team is ready to turn your vision into reality.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="text-[var(--primary)]" size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-2">
                    Headquarters
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Olaya District, King Fahd Road<br />
                    Riyadh, Kingdom of Saudi Arabia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="text-[var(--primary)]" size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-2">
                    Direct Line
                  </h4>
                  <p className="text-slate-600 text-sm">
                    +966 50 123 4567<br />
                    <span className="text-slate-400 text-xs mt-1 block">Mon-Thu 9am-6pm AST</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="text-[var(--primary)]" size={20} />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 mb-2">
                    Email Inquiries
                  </h4>
                  <p className="text-slate-600 text-sm">
                    hello@saudieventmanagement.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-black/5 border border-slate-100">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-8">
                Request a Proposal
              </h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Corporate Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@company.com"
                      className={inputClass("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Event Type
                  </label>
                  <div className="relative">
                    <select 
                      defaultValue=""
                      className={`${inputClass("type")} appearance-none cursor-pointer`}
                      onFocus={() => setFocusedField("type")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="corporate">Corporate Conference / Summit</option>
                      <option value="gala">Corporate Gala Dinner</option>
                      <option value="exhibition">Exhibition / Trade Show</option>
                      <option value="wedding">Luxury Wedding</option>
                      <option value="other">Other Exclusive Event</option>
                    </select>
                    <Briefcase size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Event Details
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your estimated guest count, preferred dates, and specific requirements..."
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[var(--primary)] text-white py-4 rounded-md font-bold uppercase tracking-widest text-sm transition-all hover:bg-[var(--primary-dark)] hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
