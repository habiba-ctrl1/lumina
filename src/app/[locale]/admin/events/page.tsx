"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Image as ImageIcon, Save, Loader2, Layout, Link as LinkIcon, Info, Filter } from "lucide-react";

type GalleryAsset = {
  id: string;
  url: string;
  alt: string | null;
  type: string;
  eventId: string | null;
  createdAt: string;
  event?: {
    title: string;
    type: string;
  } | null;
};

const layoutOptions = [
  { value: "h-[288px]", label: "Standard" },
  { value: "md:col-span-2 md:row-span-2 h-[600px]", label: "Featured" },
  { value: "md:col-span-3 h-[400px]", label: "Wide Display" },
];

export default function AdminEvents() {
  const [assets, setAssets] = useState<GalleryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ url: "", alt: "", type: "image", eventId: "" });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setAssets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setForm({ url: "", alt: "", type: "image", eventId: "" });
        setShowForm(false);
        fetchGallery();
      } else {
        alert("Error adding asset: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Add failed:", err);
      alert("Network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this asset from the gallery?")) return;
    try {
      const response = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setAssets(assets.filter((a) => a.id !== id));
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredAssets = filter === "all" 
    ? assets 
    : assets.filter(a => a.event?.type === filter || a.type === filter);

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-10">
        <div>
          <h1 className="text-3xl font-bold text-sand-50 tracking-tight mb-2">
            Gallery & Portfolio
          </h1>
          <p className="text-sand-300 font-medium">Manage the visual narrative of Saudi Event Management experiences.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
            showForm 
              ? "bg-ink-800 border border-ink-600 text-sand-400 hover:text-sand-200 shadow-sm" 
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
          }`}
        >
          {showForm ? <X size={18} /> : <Plus size={18} className="text-gold-500" />}
          {showForm ? "Close Editor" : "Add Gallery Entry"}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <form
              onSubmit={handleAdd}
              className="bg-ink-800 border border-ink-600 rounded-[2rem] p-8 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1 flex items-center gap-2">
                      <LinkIcon size={12} /> Media URL
                    </label>
                    <input
                      type="url"
                      required
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-medium text-sand-50 focus:outline-none focus:border-gold-500 transition-all placeholder:text-sand-500 shadow-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1 flex items-center gap-2">
                      <Info size={12} /> Asset Description (Alt)
                    </label>
                    <input
                      type="text"
                      required
                      value={form.alt}
                      onChange={(e) => setForm({ ...form, alt: e.target.value })}
                      placeholder="e.g. Grand Ballroom Floral Decor"
                      className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-medium text-sand-50 focus:outline-none focus:border-gold-500 transition-all placeholder:text-sand-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">Content Type</label>
                      <select
                        required
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                        className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-bold text-sand-50 focus:outline-none focus:border-gold-500 appearance-none cursor-pointer"
                      >
                        <option value="image">Still Image</option>
                        <option value="video">Cinematic Video</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-sand-400 px-1">Associate Event</label>
                      <input
                        type="text"
                        value={form.eventId}
                        onChange={(e) => setForm({ ...form, eventId: e.target.value })}
                        placeholder="Optional Event ID"
                        className="w-full bg-ink-950 border border-ink-600 rounded-xl py-3 px-4 text-sm font-bold text-sand-50 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} className="text-gold-500" />}
                      {saving ? "Archiving..." : "Register Asset"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-ink-800 animate-pulse rounded-3xl border border-ink-600 shadow-sm" />
          ))}
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-32 bg-ink-800 rounded-[2.5rem] border border-ink-600 border-dashed">
          <div className="w-20 h-20 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8">
            <ImageIcon size={32} className="text-sand-500" />
          </div>
          <h3 className="text-xl font-bold text-sand-50 mb-2">No Visual Assets Found</h3>
          <p className="text-sand-400 font-medium max-w-sm mx-auto italic">Start building your agency's visual authority by adding your first project photo or video.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {assets.map((asset) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-ink-800 border border-ink-500 rounded-3xl overflow-hidden group hover:border-gold-500/20 hover:shadow-2xl hover:shadow-gold-500/5 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden bg-ink-950">
                {asset.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-gold-500">
                    <ImageIcon size={48} />
                    <span className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest bg-black/40 px-2 py-1 rounded text-white">Video Asset</span>
                  </div>
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.alt || ""}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="min-w-0 flex-1 mr-4">
                  <h3 className="text-sm font-black text-sand-50 truncate tracking-tight">{asset.alt || "Untitled Asset"}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded border border-gold-100 uppercase tracking-widest">
                      {asset.event?.type || 'Portfolio'}
                    </span>
                    <span className="text-[9px] text-sand-400 font-medium">Added {new Date(asset.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-200 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
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
