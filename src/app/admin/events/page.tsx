"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Image as ImageIcon, Save, Loader2, Calendar, Layout, Link as LinkIcon, Info } from "lucide-react";

type Event = {
  id: string;
  src: string;
  alt: string;
  class_name: string;
  created_at: string;
};

const layoutOptions = [
  { value: "h-[288px]", label: "Small" },
  { value: "md:col-span-2 md:row-span-2 h-[600px]", label: "Featured" },
  { value: "md:col-span-3 h-[400px]", label: "Wide Display" },
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
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) setEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from("events").insert([form]);
      if (!error) {
        setForm({ src: "", alt: "", class_name: "h-[288px]" });
        setShowForm(false);
        fetchEvents();
      } else {
        alert("Error adding event: " + error.message);
      }
    } catch (err) {
      console.error("Add failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this event from the gallery?")) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (!error) setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Gallery & Events
          </h1>
          <p className="text-slate-500 font-medium">Curate your portfolio of luxury experiences and corporate milestones.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
            showForm 
              ? "bg-white border border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm" 
              : "bg-gold-500 text-white hover:bg-gold-600 shadow-gold-500/20"
          }`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close Form" : "Add Gallery Entry"}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 overflow-hidden"
          >
            <form
              onSubmit={handleAdd}
              className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 flex items-center gap-2">
                      <LinkIcon size={12} /> Image Endpoint (URL)
                    </label>
                    <input
                      type="url"
                      required
                      value={form.src}
                      onChange={(e) => setForm({ ...form, src: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 flex items-center gap-2">
                      <Info size={12} /> Descriptive Metadata (Alt)
                    </label>
                    <input
                      type="text"
                      required
                      value={form.alt}
                      onChange={(e) => setForm({ ...form, alt: e.target.value })}
                      placeholder="e.g. Royal Wedding Reception at NEOM"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 flex items-center gap-2">
                      <Layout size={12} /> Architectural Layout
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {layoutOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm({ ...form, class_name: opt.value })}
                          className={`px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                            form.class_name === opt.value
                              ? "bg-gold-500 border-gold-500 text-white shadow-lg shadow-gold-500/20"
                              : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      {saving ? "Deploying..." : "Publish to Gallery"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-white animate-pulse rounded-3xl border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 border-dashed">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Gallery is Empty</h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">Capture your successes. Click &quot;Add Gallery Entry&quot; to begin your visual narrative.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.src}
                  alt={event.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <p className="text-white text-xs font-black uppercase tracking-widest truncate">{event.alt}</p>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    <p className="text-slate-900 font-extrabold text-sm truncate">{event.alt}</p>
                  </div>
                  <p className="text-slate-400 text-[10px] font-bold truncate">{event.src}</p>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                  title="Remove Asset"
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

