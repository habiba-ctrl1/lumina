"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Star, CheckCircle, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function FeedbackForms() {
  const [activeTab, setActiveTab] = useState<"question" | "review">("question");

  // Question tab → /api/contact (saves the inquiry + emails the customer a confirmation).
  const [question, setQuestion] = useState({ name: "", email: "", message: "" });
  const [questionStatus, setQuestionStatus] = useState<Status>("idle");

  // Review tab → /api/testimonials.
  const [review, setReview] = useState({ name: "", message: "", rating: 0 });
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewStatus, setReviewStatus] = useState<Status>("idle");

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.name || !question.email || !question.message) return;
    setQuestionStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...question, source: "feedback_question" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setQuestionStatus("success");
      setQuestion({ name: "", email: "", message: "" });
      setTimeout(() => setQuestionStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setQuestionStatus("error");
      setTimeout(() => setQuestionStatus("idle"), 5000);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.name || !review.message) return;
    setReviewStatus("loading");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: review.message,
          author: review.name,
          role: "Verified Client",
          rating: review.rating || 5,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setReviewStatus("success");
      setReview({ name: "", message: "", rating: 0 });
      setTimeout(() => setReviewStatus("idle"), 6000);
    } catch (err) {
      console.error(err);
      setReviewStatus("error");
      setTimeout(() => setReviewStatus("idle"), 5000);
    }
  };

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

                <form className="space-y-6" onSubmit={handleQuestionSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={question.name}
                        onChange={(e) => setQuestion((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={question.email}
                        onChange={(e) => setQuestion((p) => ({ ...p, email: e.target.value }))}
                        className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Question</label>
                    <textarea
                      rows={4}
                      required
                      value={question.message}
                      onChange={(e) => setQuestion((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none uppercase tracking-widest"
                      placeholder="What would you like to know?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={questionStatus === "loading"}
                    className="bg-primary text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 disabled:opacity-60"
                  >
                    {questionStatus === "loading" ? "Sending…" : "Send Question"} <Send size={14} />
                  </button>

                  {questionStatus === "success" && (
                    <p className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                      <CheckCircle size={16} /> Received — we&apos;ve sent a confirmation to your email and will reply shortly.
                    </p>
                  )}
                  {questionStatus === "error" && (
                    <p className="flex items-center gap-2 text-rose-600 text-sm font-medium">
                      <AlertCircle size={16} /> Something went wrong. Please try again.
                    </p>
                  )}
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

                <form className="space-y-6" onSubmit={handleReviewSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Client Name</label>
                      <input
                        type="text"
                        required
                        value={review.name}
                        onChange={(e) => setReview((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all uppercase tracking-widest"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Rating</label>
                      <div className="flex gap-2 py-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReview((p) => ({ ...p, rating: star }))}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className={`transition-colors ${
                              star <= (hoverRating || review.rating) ? "text-primary" : "text-gray-200"
                            }`}
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star size={24} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ms-1">Your Review</label>
                    <textarea
                      rows={4}
                      required
                      value={review.message}
                      onChange={(e) => setReview((p) => ({ ...p, message: e.target.value }))}
                      className="w-full bg-ink-800 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-all resize-none uppercase tracking-widest"
                      placeholder="Tell us about your event experience..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={reviewStatus === "loading"}
                    className="bg-black text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-gray-900 transition-all shadow-xl disabled:opacity-60"
                  >
                    {reviewStatus === "loading" ? "Submitting…" : "Submit Review"}
                  </button>

                  {reviewStatus === "success" && (
                    <p className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                      <CheckCircle size={16} /> Thank you — your review has been submitted for approval.
                    </p>
                  )}
                  {reviewStatus === "error" && (
                    <p className="flex items-center gap-2 text-rose-600 text-sm font-medium">
                      <AlertCircle size={16} /> Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
