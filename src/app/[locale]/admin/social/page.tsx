"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import { Megaphone, RefreshCw, Send, Check, X, ThumbsUp, Camera } from "lucide-react";

type BlogOption = {
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
};

type GalleryImage = { label: string; imageUrl: string };

type PostResult = { success: boolean; postId?: string; error?: string };

export default function SocialPage() {
  const [posts, setPosts] = useState<BlogOption[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [toFacebook, setToFacebook] = useState(true);
  const [toInstagram, setToInstagram] = useState(true);
  const [posting, setPosting] = useState(false);
  const [results, setResults] = useState<Record<string, PostResult> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await adminFetch("/api/admin/social-post");
        const data = await res.json();
        if (data.posts) setPosts(data.posts);
        if (data.gallery) setGallery(data.gallery);
      } catch (e) {
        console.error("Failed to load blog posts:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pickPost = (slug: string) => {
    setSelectedSlug(slug);
    setResults(null);
    const p = posts.find((x) => x.slug === slug);
    if (p) {
      setImageUrl(p.imageUrl);
      setCaption(p.caption);
    }
  };

  const publish = async () => {
    const platforms: string[] = [];
    if (toFacebook) platforms.push("facebook");
    if (toInstagram) platforms.push("instagram");
    if (!platforms.length || !imageUrl || !caption) return;

    setPosting(true);
    setResults(null);
    try {
      const res = await adminFetch("/api/admin/social-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, caption, platforms }),
      });
      const data = await res.json();
      setResults(data.results || { error: { success: false, error: data.error } });
    } catch (e) {
      setResults({ error: { success: false, error: String(e) } });
    } finally {
      setPosting(false);
    }
  };

  const charCount = caption.length;

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone size={20} className="text-emerald-600" /> Social Publisher
        </h1>
        <p className="text-[12px] text-slate-400 mt-0.5">
          Pick a blog post, tweak the caption, and publish to Facebook &amp; Instagram in one click.
          The image comes straight from the post — for a video/reel, generate it first, then upload manually.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Loading posts…</div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
          {/* Blog picker */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Source blog post
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => pickPost(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 focus:outline-none focus:border-emerald-400"
            >
              <option value="">— Select a post —</option>
              {posts.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {selectedSlug && (
            <>
              {/* Image preview */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Image
                </label>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Post preview"
                  className="w-full max-h-64 object-cover rounded-lg border border-slate-200"
                />

                {/* Swap to another real photo */}
                {gallery.length > 0 && (
                  <div className="mt-2.5">
                    <p className="text-[10px] text-slate-400 mb-1.5">Swap to another real photo:</p>
                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-1.5">
                      {gallery.map((g) => (
                        <button
                          key={g.imageUrl}
                          type="button"
                          onClick={() => setImageUrl(g.imageUrl)}
                          title={g.label}
                          className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                            imageUrl === g.imageUrl
                              ? "border-emerald-500"
                              : "border-transparent hover:border-slate-300"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.imageUrl} alt={g.label} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom image URL (e.g. a photo/graphic you generated yourself) */}
                <div className="mt-2.5">
                  <p className="text-[10px] text-slate-400 mb-1">Or paste your own image URL:</p>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://…"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Caption
                  </label>
                  <span className={`text-[10px] ${charCount > 2200 ? "text-red-500" : "text-slate-400"}`}>
                    {charCount} chars {charCount > 2200 && "(IG limit 2200)"}
                  </span>
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 leading-relaxed focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              {/* Platform toggles */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Publish to
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setToFacebook((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                      toFacebook
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    <ThumbsUp size={15} /> Facebook {toFacebook && <Check size={13} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setToInstagram((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold border transition-all ${
                      toInstagram
                        ? "bg-pink-50 border-pink-300 text-pink-700"
                        : "bg-white border-slate-200 text-slate-400"
                    }`}
                  >
                    <Camera size={15} /> Instagram {toInstagram && <Check size={13} />}
                  </button>
                </div>
              </div>

              {/* Publish button */}
              <button
                onClick={publish}
                disabled={posting || (!toFacebook && !toInstagram)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-[13px] font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {posting ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
                {posting ? "Publishing…" : "Publish now"}
              </button>

              {/* Results */}
              {results && (
                <div className="space-y-2 pt-1">
                  {Object.entries(results).map(([platform, r]) => (
                    <div
                      key={platform}
                      className={`flex items-start gap-2 px-3 py-2.5 rounded-lg border text-[12px] ${
                        r.success
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      {r.success ? <Check size={14} className="mt-0.5" /> : <X size={14} className="mt-0.5" />}
                      <div>
                        <span className="font-semibold capitalize">{platform}</span>{" "}
                        {r.success ? `posted successfully (id: ${r.postId})` : `failed — ${r.error}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
