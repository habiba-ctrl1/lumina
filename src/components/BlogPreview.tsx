"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-white relative py-24 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="section-label">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Journal
              </span>
            </div>
            <h2 className="text-neutral-900 text-3xl md:text-4xl mb-4 font-semibold" style={{ letterSpacing: "-0.025em" }}>
              Latest <span className="text-[var(--primary)]">Stories</span>
            </h2>
            <p className="text-neutral-500 text-[16px] leading-relaxed max-w-lg">
              Explore our curated collection of event planning wisdom, industry insights, and trending aesthetics.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300 rounded-xl py-3 px-5 font-medium transition-all duration-200 text-[14px] group"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
          >
            Explore All Articles
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestPosts.map((post: any, i: number) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white border border-neutral-200/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-neutral-300"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 24px -4px rgba(0,0,0,0.06), 0 4px 8px -2px rgba(0,0,0,0.03)",
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 start-3">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[var(--primary)] text-[12px] font-medium rounded-lg"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[12px] text-neutral-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-[17px] text-neutral-900 mb-3 font-semibold group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2" style={{ letterSpacing: "-0.01em", lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 text-[14px] leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[var(--primary)] text-[13px] font-medium group-hover:gap-3 transition-all duration-200">
                    Read Article <ArrowRight size={14} />
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
