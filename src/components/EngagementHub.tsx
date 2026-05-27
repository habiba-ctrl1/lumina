"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, Send, CheckCircle } from "lucide-react";

export default function EngagementHub() {
  const [activeTab, setActiveTab] = useState<"question" | "review">("question");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-slate-50 relative py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[var(--primary)]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Client Community</span>
          </div>
          <h2 className="font-display text-slate-900 text-3xl md:text-4xl font-bold uppercase tracking-tight">Connect <span className="text-[var(--primary)]">& Share</span></h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveTab("question")}
              className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === "question" ? "bg-[var(--primary)] text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 bg-white"}`}
            >
              <MessageSquare size={16} />
              Ask a Question
            </button>
            <button 
              onClick={() => setActiveTab("review")}
              className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === "review" ? "bg-[var(--primary)] text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 bg-white"}`}
            >
              <Star size={16} />
              Submit Review
            </button>
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-teal-50 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 tracking-tight">Received With Thanks</h3>
                  <p className="text-slate-500 text-sm">Our concierge team will process your entry shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === "question" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === "question" ? 20 : -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
                      <input type="text" required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-md text-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-slate-900" placeholder="John Doe" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                      <input type="email" required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-md text-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all text-slate-900" placeholder="john@company.com" />
                    </div>
                  </div>

                  {activeTab === "review" && (
                    <div className="space-y-3 text-center py-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-6">Your Rating</label>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={28} className="text-[var(--primary)] cursor-pointer hover:scale-110 transition-transform" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {activeTab === "question" ? "Your Question" : "Your Experience"}
                    </label>
                    <textarea 
                      required 
                      rows={4} 
                      className="w-full bg-slate-50 border border-slate-200 p-4 rounded-md text-sm outline-none focus:border-[var(--primary)] focus:bg-white transition-all resize-none text-slate-900" 
                      placeholder={activeTab === "question" ? "How can we help you plan your event?" : "Describe your event experience..."}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[var(--primary)] text-white py-4 rounded-md text-[11px] font-bold uppercase tracking-widest hover:bg-[var(--primary-dark)] hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
                  >
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    {activeTab === "question" ? "Post Question" : "Publish Review"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
