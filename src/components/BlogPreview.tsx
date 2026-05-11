"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-white relative">
      <div className="container-minimal relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-primary/30" />
              <span className="text-[11px] uppercase tracking-[0.5em] text-primary font-bold">Journal</span>
            </div>
            <h2 className="text-black text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tight">
              Latest <span className="text-primary">Stories</span>
            </h2>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-xl">
              Explore our curated collection of event planning wisdom, industry insights, and trending aesthetics.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-4 text-black text-[12px] uppercase tracking-[0.3em] font-bold border-b border-gray-100 pb-4 hover:border-primary transition-all duration-500"
          >
            Explore All Articles
            <ArrowRight size={16} className="text-primary group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {latestPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="px-5 py-2 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg rounded-md">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-6 text-[10px] text-gray-400 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-6 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-black text-[11px] uppercase tracking-[0.3em] font-bold group-hover:gap-5 transition-all">
                    Read Article <ArrowRight size={16} className="text-primary" />
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
