"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts, blogCategories } from "@/lib/blog-data";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featuredPosts = blogPosts.filter((p) => p.featured);

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900">Blog &amp; Lifestyle</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--primary)] font-bold">The Saudi Event Management Journal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight uppercase tracking-tight">
              Inspire Your <span className="text-[var(--primary)] font-bold">Next Event</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Event planning tips, trending color palettes, decor inspiration, and lifestyle insights curated by our luxury event experts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-3 mt-12">
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border rounded-md shadow-sm ${activeCategory === cat ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 bg-white"}`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {activeCategory === "All" && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredPosts.map((post, idx) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + idx * 0.15 }} onMouseEnter={() => setHoveredPost(post.slug)} onMouseLeave={() => setHoveredPost(null)} className="group relative h-[480px] overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl rounded-xl transition-all duration-500">
                    <div className="absolute inset-0">
                      <Image src={post.image} alt={post.title} width={800} height={480} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                    </div>
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-4 py-1.5 bg-white text-[var(--primary)] text-[10px] uppercase tracking-widest font-bold rounded-full shadow-md">Featured</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <span className="text-[var(--primary)] text-[11px] uppercase tracking-[0.2em] font-bold bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm mb-4 inline-block">{post.category}</span>
                      <h3 className="text-xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-teal-100 transition-colors duration-300 leading-tight">{post.title}</h3>
                      <p className="text-slate-200 text-sm font-light line-clamp-2 mb-8 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-6 text-[10px] text-white/80 uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--primary)]" /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-[var(--primary)]" /> {post.readTime}</span>
                      </div>
                      <motion.div className="absolute bottom-8 right-8" animate={{ x: hoveredPost === post.slug ? 0 : -10, opacity: hoveredPost === post.slug ? 1 : 0 }} transition={{ duration: 0.3 }}>
                        <div className="w-12 h-12 flex items-center justify-center text-white bg-[var(--primary)] shadow-md rounded-full"><ArrowRight size={18} /></div>
                      </motion.div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts Grid - Editorial Style */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--primary)] font-bold mb-4 block">The Collection</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight uppercase tracking-tight">Latest <span className="text-[var(--primary)]">Insights</span> & Lifestyle</h2>
            </div>
            {/* Category selection refined */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-slate-200 pb-4">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative pb-3 ${
                    activeCategory === cat
                      ? "text-[var(--primary)]"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="catUnderline" className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--primary)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12"
            >
              {filteredPosts.map((post, idx) => {
                // Create an asymmetrical layout pattern
                const isLarge = idx % 5 === 0;
                const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
                const rowSpan = isLarge ? "md:row-span-2" : "";

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className={`${colSpan} ${rowSpan} group`}>
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                      className="flex flex-col h-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image - Minimal frame */}
                      <div className={`relative overflow-hidden bg-slate-100 ${isLarge ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={isLarge ? 800 : 400}
                          height={isLarge ? 500 : 500}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Elegant floating category */}
                        <div className="absolute top-4 right-4">
                           <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--primary)] bg-white px-3 py-1.5 border border-slate-200 rounded-full shadow-sm">
                             {post.category}
                           </span>
                        </div>
                      </div>

                      {/* Content - Spaced out */}
                      <div className="pt-8 px-8 pb-8 flex flex-col flex-1 bg-white">
                        <div className="flex items-center gap-6 mb-6">
                           <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2"><Calendar size={14} className="text-[var(--primary)]" /> {post.date}</span>
                           <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2"><Clock size={14} className="text-[var(--primary)]" /> {post.readTime}</span>
                        </div>
                        
                        <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-xl"} font-display font-bold text-slate-900 mb-4 group-hover:text-[var(--primary)] transition-colors duration-500 leading-tight uppercase tracking-tight`}>
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 max-w-lg">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[var(--primary)] text-[10px] uppercase tracking-widest font-bold">
                           <span className="relative">
                             Read Discovery
                           </span>
                           <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-28">
              <p className="text-slate-500 text-sm">No articles found in this category yet. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--primary)] relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-100 mb-6 block">Ready to Create Something Extraordinary?</span>
          <h2 className="font-display font-bold text-white mb-6 text-3xl md:text-4xl uppercase tracking-tight">
            Let&apos;s Bring Your <span className="font-bold text-teal-200">Vision</span> to Life
          </h2>
          <p className="text-teal-50 text-sm md:text-base mb-10 max-w-2xl mx-auto">Our team of luxury event experts is ready to transform your ideas into unforgettable experiences.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[var(--primary)] text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all duration-300 shadow-md rounded-md">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
