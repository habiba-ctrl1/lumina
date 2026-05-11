"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Plus, ExternalLink, Calendar, Clock, RefreshCw, FileText, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  readTime?: string;
  createdAt: string;
  media?: { url: string }[];
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Blog Management
          </h1>
          <p className="text-slate-500 font-medium">Manage your lifestyle articles and event planning tips.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
          <Plus size={16} className="text-gold-500" /> 
          Create New Post
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row gap-6 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500 transition-all placeholder:text-slate-400"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-all shadow-sm">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-[0.25em] text-slate-400 font-black">
                <th className="px-8 py-6">Article</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-8"><div className="h-12 bg-slate-50 rounded-xl" /></td>
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <FileText size={40} className="mx-auto text-slate-100 mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No articles found in your library.</p>
                  </td>
                </tr>
              ) : (
                posts.map((post, i) => (
                  <motion.tr 
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm bg-slate-50 flex items-center justify-center">
                          {post.media && post.media[0] ? (
                            <Image src={post.media[0].url} alt={post.title} fill className="object-cover" />
                          ) : (
                            <FileText size={20} className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 line-clamp-1 tracking-tight">{post.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-gold-50 border border-gold-100 text-[9px] uppercase tracking-widest font-black text-gold-600">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${post.published ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock size={10} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{post.readTime}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100"
                          title="View Publicly"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <button 
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-gold-600 hover:bg-gold-50 hover:shadow-md transition-all border border-transparent hover:border-gold-100"
                          title="Edit Article"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
