"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Star, Save, Loader2, MessageSquareQuote, CheckCircle2 } from "lucide-react";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  rating: number;
  createdAt: string;
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ quote: "", author: "", role: "", rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setForm({ quote: "", author: "", role: "", rating: 5 });
        setShowForm(false);
        fetchTestimonials();
      } else {
        alert(`Failed to save testimonial: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("A network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("A network error occurred during deletion.");
    }
  };

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Client Testimonials
          </h1>
          <p className="text-sm text-slate-500">Curate and manage trust signals for the Saudi Event brand.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mb-6"
          >
            <form onSubmit={handleAdd} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Author Name</label>
                    <input
                      type="text"
                      required
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="e.g. HRH Princess Sarah"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-405 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Role / Affiliation</label>
                    <input
                      type="text"
                      value={form.role || ""}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. Royal Commission for Riyadh"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-405 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rating</label>
                    <div className="flex gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-fit">
                      {[1, 2, 3, 4, 5].map((star: any) => (
                        <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className="transition-all transform hover:scale-110">
                          <Star size={16} className={star <= form.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Endorsement Quote</label>
                    <textarea
                      required
                      rows={5}
                      value={form.quote}
                      onChange={(e) => setForm({ ...form, quote: e.target.value })}
                      placeholder="Capture the essence of their experience..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-850 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-405 shadow-sm resize-none italic"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin text-teal-400" /> : <Save size={14} />}
                    {saving ? "Publishing..." : "Publish Testimonial"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i: any) => (
            <div key={i} className="h-44 bg-white animate-pulse rounded-2xl border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
            <MessageSquareQuote size={22} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Testimonials Curated</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">When you receive praise from your elite clients, it belongs here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t: any, i: number) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-teal-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"} />
                  ))}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic">&quot;{t.quote}&quot;</p>
              </div>
              
              <div className="flex justify-between items-end pt-3 border-t border-slate-100">
                <div>
                  <p className="text-slate-800 font-bold text-xs tracking-tight">{t.author}</p>
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{t.role || 'Elite Client'}</p>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-650 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
