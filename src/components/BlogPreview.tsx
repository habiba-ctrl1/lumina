"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-padding bg-white relative">
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
         <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-champagne-500" />
              <span className="text-sm uppercase tracking-[0.5em] text-champagne-500 font-medium">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-[#041E42] mb-8">
              Latest <span className="text-shimmer italic font-medium">Stories</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed font-light">
              Explore our curated collection of event planning wisdom and trending aesthetics.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-4 text-[#041E42] text-[12px] uppercase tracking-[0.3em] font-bold border-b border-gray-100 pb-4 hover:border-champagne-500 transition-all duration-700"
          >
            Explore All Articles
            <ArrowRight size={16} className="text-champagne-500 group-hover:translate-x-3 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {latestPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700 rounded-sm overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute top-6 left-6">
                    <span className="px-6 py-2.5 bg-white text-[#041E42] text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl border border-gray-50">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-12">
                  <div className="flex items-center gap-6 text-[10px] text-gray-400 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-champagne-500" /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-champagne-500" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-[#041E42] mb-6 group-hover:text-champagne-500 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed mb-10 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-[#041E42] text-[12px] uppercase tracking-[0.3em] font-bold group-hover:gap-5 transition-all duration-500">
                    Read Article <ArrowRight size={16} className="text-champagne-500" />
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
