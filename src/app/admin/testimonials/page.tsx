"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Star, Save, Loader2, MessageSquareQuote } from "lucide-react";

type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  created_at: string;
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
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTestimonials(data || []);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("testimonials").insert([form]);
    if (!error) {
      setForm({ quote: "", author: "", role: "", rating: 5 });
      setShowForm(false);
      fetchTestimonials();
    } else {
      alert("Error adding testimonial: " + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Manage <span className="text-gold-500 font-semibold ">Testimonials</span>
          </h1>
          <p className="text-gray-500">Add or remove client reviews shown on the website.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-charcoal-900 font-semibold text-sm rounded-xl hover:bg-gold-400 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAdd}
            className="bg-charcoal-800 border border-white/5 rounded-2xl p-6 mb-8 space-y-4 overflow-hidden"
          >
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Quote</label>
              <textarea
                required
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="What did the client say..."
                className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Author Name</label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="e.g. Sophia Reynolds"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Role / Title</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Bride, CEO"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Rating</label>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="transition-colors"
                    >
                      <Star
                        size={24}
                        className={star <= form.rating ? "text-gold-500 fill-gold-500" : "text-gray-600"}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-charcoal-900 font-semibold text-sm rounded-xl hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Testimonial"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Testimonials List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-charcoal-800 animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-24 bg-charcoal-800 rounded-2xl border border-white/5">
          <MessageSquareQuote size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">No testimonials yet. Click &quot;Add Testimonial&quot; to start.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-charcoal-800 border border-white/5 rounded-2xl p-6 hover:border-gold-500/20 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed mb-4">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-gold-500 text-sm font-semibold">{t.author}</p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5 ml-auto">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors shrink-0"
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
