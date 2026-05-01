"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Image as ImageIcon, Save, Loader2 } from "lucide-react";

type Event = {
  id: string;
  src: string;
  alt: string;
  class_name: string;
  created_at: string;
};

const layoutOptions = [
  { value: "h-[288px]", label: "Small (1 Col)" },
  { value: "md:col-span-2 md:row-span-2 h-[600px]", label: "Large (2 Col Featured)" },
  { value: "md:col-span-3 h-[400px]", label: "Wide (Full Width)" },
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: "", alt: "", class_name: "h-[288px]" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) setEvents(data || []);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("events").insert([form]);
    if (!error) {
      setForm({ src: "", alt: "", class_name: "h-[288px]" });
      setShowForm(false);
      fetchEvents();
    } else {
      alert("Error adding event: " + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event image?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Manage <span className="text-gold-500 font-semibold italic">Events</span>
          </h1>
          <p className="text-gray-500">Add or remove gallery images shown on the website.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-charcoal-900 font-semibold text-sm rounded-xl hover:bg-gold-400 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Event"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Image URL</label>
                <input
                  type="url"
                  required
                  value={form.src}
                  onChange={(e) => setForm({ ...form, src: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Alt Text</label>
                <input
                  type="text"
                  required
                  value={form.alt}
                  onChange={(e) => setForm({ ...form, alt: e.target.value })}
                  placeholder="e.g. Luxury Wedding"
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 block">Layout Size</label>
              <div className="flex flex-wrap gap-3">
                {layoutOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, class_name: opt.value })}
                    className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                      form.class_name === opt.value
                        ? "bg-gold-500/10 border-gold-500/30 text-gold-500"
                        : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-gold-500 text-charcoal-900 font-semibold text-sm rounded-xl hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Event"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-charcoal-800 animate-pulse rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-24 bg-charcoal-800 rounded-2xl border border-white/5">
          <ImageIcon size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-gray-500">No events added yet. Click &quot;Add Event&quot; to start.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-charcoal-800 border border-white/5 rounded-2xl overflow-hidden group hover:border-gold-500/20 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.src}
                  alt={event.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{event.alt}</p>
                  <p className="text-gray-600 text-xs mt-1 truncate max-w-[200px]">{event.src}</p>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
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
