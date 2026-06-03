"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Star } from "lucide-react";

export default function FeedbackForms() {
  const [activeTab, setActiveTab] = useState<"question" | "review">("question");

  return (
    <section className="py-32 bg-ink-800 border-y border-ink-600">
      <div className="container-luxury max-w-4xl">
        <div className="flex justify-center gap-10 mb-12">
          <button
            onClick={() => setActiveTab("question")}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === "question" 
                ? "bg-black text-white shadow-xl" 
                : "bg-ink-950 text-gray-400 hover:bg-gray-100"
            }`}
          >
            Ask a Question
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeTab === "review" 
                ? "bg-black text-white shadow-xl" 
                : "bg-ink-950 text-gray-400 hover:bg-gray-100"
            }`}
          >
            Submit Review
          </button>
        </div>

        <div className="bg-ink-800 rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-ink-600 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 end-0 w-24 h-24 bg-primary/5 rounded-bs-full" />
          
          <div className="relative z-10">
            {activeTab === "question" ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key="question-form"
              >
                <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-tight">Have a <span className="text-primary">Question?</span></h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Our concierge team is here to provide clarity on any aspect of our services.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Name</label>
                      <input type="text" className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Email Address</label>
                      <input type="email" className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest" placeholder="Enter your email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Question</label>
                    <textarea rows={4} className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none uppercase tracking-widest" placeholder="What would you like to know?"></textarea>
                  </div>
                  <button className="bg-primary text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
                    Send Question <Send size={14} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key="review-form"
              >
                <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-tight">Share Your <span className="text-primary">Experience</span></h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">Help us maintain our standard of excellence by sharing your valuable feedback.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Client Name</label>
                      <input type="text" className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Rating</label>
                      <div className="flex gap-2 py-3">
                        {[1,2,3,4,5].map((star: any) => (
                          <button key={star} type="button" className="text-gray-200 hover:text-primary transition-colors">
                            <Star size={24} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Review</label>
                    <textarea rows={4} className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none uppercase tracking-widest" placeholder="Tell us about your event experience..."></textarea>
                  </div>
                  <button className="bg-black text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-gray-900 transition-all shadow-xl">
                    Submit Review
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
