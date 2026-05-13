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
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/3 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">
            <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <span className="text-gold-500">/</span>
            <span className="text-gold-500">Blog &amp; Lifestyle</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-medium">The Saudi Event Management Journal</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-sans text-white mb-6 leading-[1.1] font-bold opacity-100">
              Inspire Your <span className="text-shimmer font-bold">Next Event</span>
            </h1>
            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
              Event planning tips, trending color palettes, decor inspiration, and lifestyle insights curated by our luxury event experts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-2 mt-12">
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 border ${activeCategory === cat ? "bg-gold-500 text-charcoal-900 border-gold-500" : "border-white/10 text-gray-400 hover:text-white hover:border-white/20 bg-white/[0.02]"}`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {activeCategory === "All" && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, idx) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 + idx * 0.15 }} onMouseEnter={() => setHoveredPost(post.slug)} onMouseLeave={() => setHoveredPost(null)} className="group relative h-[480px] overflow-hidden border border-white/5 bg-charcoal-800/30">
                    <div className="absolute inset-0">
                      <Image src={post.image} alt={post.title} width={800} height={480} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
                    </div>
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-3 py-1.5 bg-gold-500 text-charcoal-900 text-[10px] uppercase tracking-[0.2em] font-bold">Featured</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <span className="text-gold-500 text-[11px] uppercase tracking-[0.2em] font-medium">{post.category}</span>
                      <h2 className="text-xl md:text-2xl font-sans font-bold text-white mt-2 mb-3 group-hover:text-gold-300 transition-colors duration-300 leading-tight">{post.title}</h2>
                      <p className="text-gray-400 text-sm font-light line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-[11px] text-gray-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                      </div>
                      <motion.div className="absolute bottom-8 right-8" animate={{ x: hoveredPost === post.slug ? 0 : -10, opacity: hoveredPost === post.slug ? 1 : 0 }} transition={{ duration: 0.3 }}>
                        <div className="w-12 h-12 border border-gold-500/50 flex items-center justify-center text-gold-500"><ArrowRight size={18} /></div>
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-500 font-bold mb-4 block">The Collection</span>
              <h2 className="text-2xl md:text-4xl font-sans font-bold text-white leading-tight">Latest <span className="opacity-60 font-bold">Insights</span> & Lifestyle</h2>
            </div>
            {/* Category selection refined */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/5 pb-4">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative pb-2 ${
                    activeCategory === cat
                      ? "text-gold-500"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="catUnderline" className="absolute bottom-0 left-0 right-0 h-px bg-gold-500" />
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
              className="grid grid-cols-1 md:grid-cols-12 gap-y-20 gap-x-12"
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
                      className="flex flex-col h-full"
                    >
                      {/* Image - Minimal frame */}
                      <div className={`relative overflow-hidden bg-charcoal-800 ${isLarge ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={isLarge ? 800 : 400}
                          height={isLarge ? 500 : 500}
                          className="w-full h-full object-cover transition-transform duration-1000 scale-[1.02] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Elegant floating category */}
                        <div className="absolute top-0 right-0 p-6">
                           <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 bg-black/20 backdrop-blur-md px-3 py-1.5 border border-white/5">
                             {post.category}
                           </span>
                        </div>
                      </div>

                      {/* Content - Spaced out */}
                      <div className="pt-8 flex flex-col flex-1">
                        <div className="flex items-center gap-4 mb-4">
                           <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">{post.date}</span>
                           <div className="w-8 h-px bg-white/10" />
                           <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">{post.readTime}</span>
                        </div>
                        
                        <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-lg"} font-sans font-bold text-white mb-4 group-hover:text-gold-500 transition-colors duration-500 leading-[1.2]`}>
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-2 max-w-lg">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden">
                           <span className="relative">
                             Read Discovery
                             <div className="absolute bottom-[-4px] left-0 w-full h-px bg-gold-500/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                           </span>
                           <ArrowRight size={14} className="translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-gold-500" />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-gray-500 text-sm">No articles found in this category yet. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative overflow-hidden border border-white/5 bg-charcoal-800/30 p-12 md:p-16 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-medium mb-4 block">Ready to Create Something Extraordinary?</span>
              <h2 className="text-2xl md:text-4xl font-sans font-bold text-white mb-4">
                Let&apos;s Bring Your <span className="text-shimmer font-bold">Vision</span> to Life
              </h2>
              <p className="text-gray-400 font-light max-w-lg mx-auto mb-8">Our team of luxury event experts is ready to transform your ideas into unforgettable experiences.</p>
              <Link href="/consultation" className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-charcoal-900 text-xs font-bold uppercase tracking-[0.15em] hover:bg-gold-400 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20 btn-glow">
                Book a Discovery Call <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
