"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Image as ImageIcon, Save, Loader2, Link as LinkIcon, Info, Filter, RefreshCw } from "lucide-react";

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

export default function AdminGallery() {
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
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Gallery & Portfolio CMS
          </h1>
          <p className="text-sm text-slate-500">Manage the visual narrative of Saudi Event Management experiences.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 ${
            showForm 
              ? "bg-slate-100 border border-slate-200 text-slate-700" 
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? "Close Editor" : "Add Gallery Entry"}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mb-6"
          >
            <form
              onSubmit={handleAdd}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <LinkIcon size={12} /> Media URL
                    </label>
                    <input
                      type="url"
                      required
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Info size={12} /> Asset Description (Alt Text)
                    </label>
                    <input
                      type="text"
                      required
                      value={form.alt}
                      onChange={(e) => setForm({ ...form, alt: e.target.value })}
                      placeholder="e.g. Grand Ballroom Floral Decor"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Content Type</label>
                      <select
                        required
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-teal-400 appearance-none cursor-pointer"
                      >
                        <option value="image">Still Image</option>
                        <option value="video">Cinematic Video</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Associate Event ID</label>
                      <input
                        type="text"
                        value={form.eventId}
                        onChange={(e) => setForm({ ...form, eventId: e.target.value })}
                        placeholder="Optional Event ID"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? "Archiving..." : "Register Asset"}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i: any) => (
            <div key={i} className="h-52 bg-white animate-pulse rounded-2xl border border-slate-200" />
          ))}
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
            <ImageIcon size={22} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Visual Assets Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto italic">Start building your agency&apos;s visual authority by adding your first project photo or video.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredAssets.map((asset: any) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-teal-400 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                {asset.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-teal-500">
                    <ImageIcon size={32} />
                    <span className="absolute bottom-3 start-3 text-[9px] font-bold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded text-white">Video Asset</span>
                  </div>
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.alt || ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4 flex items-center justify-between flex-1">
                <div className="min-w-0 flex-1 me-3">
                  <h3 className="text-xs font-bold text-slate-800 truncate tracking-tight">{asset.alt || "Untitled Asset"}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100 uppercase tracking-wider">
                      {asset.event?.type || 'Portfolio'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">Added {new Date(asset.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(asset.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
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
