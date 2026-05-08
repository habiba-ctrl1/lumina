"use client";

import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";
import { Edit3, Plus, ExternalLink, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminBlogPage() {
  return (
    <div className="pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-light text-white mb-2">
            Blog <span className="text-gold-500 font-semibold ">Management</span>
          </h1>
          <p className="text-gray-500 text-sm">Manage your lifestyle articles and event planning tips.</p>
        </div>
        <button className="px-6 py-3 bg-gold-500 text-charcoal-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/10 flex items-center gap-2">
          <Plus size={16} /> Create New Post
        </button>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Article</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Details</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogPosts.map((post, i) => (
                <motion.tr 
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/[0.01] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0 border border-white/10">
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white line-clamp-1">{post.title}</p>
                        <p className="text-[10px] text-gray-500 font-mono">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-wider text-gold-400">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <Calendar size={10} className="text-gray-600" /> {post.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <Clock size={10} className="text-gray-600" /> {post.readTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="View Publicly"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button 
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-gold-500 hover:bg-gold-500/10 transition-all"
                        title="Edit Article"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gold-500/5 border border-gold-500/10 rounded-2xl">
        <p className="text-xs text-gold-500/80 leading-relaxed">
          <span className="font-bold uppercase tracking-wider block mb-1">Developer Note:</span>
          The blog posts are currently loaded from a static data file (`lib/blog-data.ts`). To enable full dynamic management (creating, editing, and deleting via this dashboard), we should migrate the blog data to Supabase. This would allow you to update your blog without any code changes.
        </p>
      </div>
    </div>
  );
}
