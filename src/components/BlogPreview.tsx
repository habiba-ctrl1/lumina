"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
         <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gold-500/50" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-bold">Lumina Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-white mb-4">
              Latest from the <span className="text-shimmer italic">Lifestyle</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Explore our curated collection of event planning wisdom, design inspiration, and trending aesthetics.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-3 text-white text-[11px] uppercase tracking-[0.3em] font-bold border-b border-white/10 pb-2 hover:border-gold-500 transition-all duration-500"
          >
            Explore All Articles
            <ArrowRight size={14} className="text-gold-500 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-gold-500 text-[9px] uppercase tracking-[0.2em] font-bold">
                       {post.category}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-display text-white mb-4 group-hover:text-gold-500 transition-colors duration-500 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-white text-[10px] uppercase tracking-[0.2em] font-bold group-hover:gap-3 transition-all duration-500">
                    Read Article
                    <ArrowRight size={14} className="text-gold-500" />
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
