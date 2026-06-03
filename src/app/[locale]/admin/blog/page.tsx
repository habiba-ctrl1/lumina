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
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Blog & Articles CMS
          </h1>
          <p className="text-sm text-slate-500 font-medium">Manage lifestyle publications, SEO optimizations, and event planning resources.</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5 active:scale-95">
          <Plus size={15} /> 
          Create New Post
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-400 transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={14} /> Filters
          </button>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/50">
                <th className="px-6 py-3.5 text-start font-semibold">Article Details</th>
                <th className="px-6 py-3.5 text-start font-semibold">Category</th>
                <th className="px-6 py-3.5 text-start font-semibold">Status</th>
                <th className="px-6 py-3.5 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3].map((i: any) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-6 py-6"><div className="h-10 bg-slate-50 rounded-xl" /></td>
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <FileText size={22} className="mx-auto text-slate-400 mb-3" />
                    <p className="text-slate-400 font-medium text-xs">No articles found in your library.</p>
                  </td>
                </tr>
              ) : (
                posts.map((post: any, i: number) => (
                  <motion.tr 
                    key={post.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm bg-slate-50 flex items-center justify-center">
                          {post.media && post.media[0] ? (
                            <Image src={post.media[0].url} alt={post.title} width={80} height={60} className="w-full h-full object-cover" />
                          ) : (
                            <FileText size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 line-clamp-1 tracking-tight">{post.title}</p>
                          <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-teal-50 border border-teal-105 text-[9px] uppercase tracking-wider font-bold text-teal-700">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-semibold">
                            <Clock size={10} />
                            <span>{post.readTime}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-450 hover:text-slate-700 hover:bg-slate-50"
                          title="View Publicly"
                        >
                          <ExternalLink size={14} />
                        </Link>
                        <button 
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-455 hover:text-teal-600 hover:bg-teal-50"
                          title="Edit Article"
                        >
                          <Edit3 size={14} />
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
