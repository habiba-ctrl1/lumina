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
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="container-luxury max-w-4xl">
        <div className="text-center mb-16">
           <span className="text-primary text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Client Community</span>
           <h2 className="text-black text-2xl md:text-3xl font-bold uppercase tracking-tight">Connect <span className="text-primary">& Share</span></h2>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => setActiveTab("question")}
              className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === "question" ? "bg-black text-white" : "text-gray-400 hover:text-black bg-white"}`}
            >
              <MessageSquare size={16} />
              Ask a Question
            </button>
            <button 
              onClick={() => setActiveTab("review")}
              className={`flex-1 py-6 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === "review" ? "bg-black text-white" : "text-gray-400 hover:text-black bg-white"}`}
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
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-tight">Received With Thanks</h3>
                  <p className="text-gray-500 text-sm">Our concierge team will process your entry shortly.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === "question" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === "question" ? 20 : -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                      <input type="text" required className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-primary transition-all" placeholder="Enter name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" required className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-primary transition-all" placeholder="your@email.com" />
                    </div>
                  </div>

                  {activeTab === "review" && (
                    <div className="space-y-2 text-center py-4">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Your Rating</label>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={24} className="text-primary cursor-pointer hover:scale-125 transition-transform" fill="#D4AF37" />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      {activeTab === "question" ? "Your Question" : "Your Experience"}
                    </label>
                    <textarea 
                      required 
                      rows={4} 
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm outline-none focus:border-primary transition-all resize-none" 
                      placeholder={activeTab === "question" ? "How can we help you plan your legacy?" : "Describe your event masterpiece..."}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-black text-white py-5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <Send size={14} />
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
