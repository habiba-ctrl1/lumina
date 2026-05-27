"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-white relative py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[var(--primary)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Journal</span>
            </div>
            <h2 className="font-display font-bold text-slate-900 text-3xl md:text-4xl mb-6 uppercase tracking-tight">
              Latest <span className="text-[var(--primary)]">Stories</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl">
              Explore our curated collection of event planning wisdom, industry insights, and trending aesthetics.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-3 border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-md py-3 px-6 uppercase tracking-widest font-bold transition-all duration-300 text-[11px]"
          >
            Explore All Articles
            <ArrowRight size={16} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[var(--primary)] text-[10px] uppercase tracking-widest font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--primary)]" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-[var(--primary)]" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-4 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[var(--primary)] text-[11px] uppercase tracking-widest font-bold transition-all">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
