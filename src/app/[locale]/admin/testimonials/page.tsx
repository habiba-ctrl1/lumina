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
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-sand-50 tracking-tight mb-2">
            Client Testimonials
          </h1>
          <p className="text-sand-300 font-medium">Curate and manage trust signals for the Saudi Event brand.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
        >
          {showForm ? <X size={18} /> : <Plus size={18} className="text-gold-500" />}
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <form onSubmit={handleAdd} className="bg-ink-800 border border-ink-600 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">Author Name</label>
                    <input
                      type="text"
                      required
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="e.g. HRH Princess Sarah"
                      className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-bold text-sand-50 focus:outline-none focus:border-gold-500 transition-all placeholder:text-sand-500 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">Role / Affiliation</label>
                    <input
                      type="text"
                      value={form.role || ""}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      placeholder="e.g. Royal Commission for Riyadh"
                      className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-bold text-sand-50 focus:outline-none focus:border-gold-500 transition-all placeholder:text-sand-500 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">Rating</label>
                    <div className="flex gap-2 bg-ink-950 p-3 rounded-xl border border-ink-600 w-fit">
                      {[1, 2, 3, 4, 5].map((star: any) => (
                        <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className="transition-all transform hover:scale-110">
                          <Star size={18} className={star <= form.rating ? "text-gold-500 fill-gold-500" : "text-slate-200"} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">The Endorsement (Quote)</label>
                  <textarea
                    required
                    rows={6}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    placeholder="Capture the essence of their experience..."
                    className="w-full flex-grow bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-bold text-sand-50 focus:outline-none focus:border-gold-500 transition-all placeholder:text-sand-500 shadow-sm resize-none italic"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin text-gold-500" /> : <Save size={16} className="text-gold-500" />}
                  {saving ? "Publishing..." : "Publish Testimonial"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2, 3, 4].map((i: any) => (
            <div key={i} className="h-64 bg-ink-800 animate-pulse rounded-[2rem] border border-ink-600 shadow-sm" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-32 bg-ink-800 rounded-[2.5rem] border border-ink-600 border-dashed shadow-sm">
          <div className="w-24 h-24 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <MessageSquareQuote size={40} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-sand-50 mb-2">No Testimonials Curated</h3>
          <p className="text-sand-400 font-medium">When you receive praise from your elite clients, it belongs here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t: any, i: number) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-ink-800 border border-ink-500 rounded-[2rem] p-10 hover:border-gold-500/20 hover:shadow-2xl hover:shadow-gold-500/5 transition-all group relative flex flex-col"
            >
              <div className="flex-1 mb-8">
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: 5 }).map((_: any, i: number) => (
                    <Star key={i} size={16} className={i < t.rating ? "text-gold-500 fill-gold-500" : "text-slate-100"} />
                  ))}
                </div>
                <p className="text-sand-200 text-base leading-relaxed font-medium italic">&quot;{t.quote}&quot;</p>
              </div>
              
              <div className="flex justify-between items-end pt-8 border-t border-slate-50">
                <div>
                  <p className="text-sand-50 font-black tracking-tight">{t.author}</p>
                  <p className="text-sand-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role || 'Elite Client'}</p>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-10 h-10 flex items-center justify-center text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
