"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
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
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 overflow-hidden bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Luxury Event Backdrop" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface-raised)]/50 to-[var(--surface-raised)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center items-center gap-2 text-[12px] font-medium text-neutral-400 mb-6">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900">Journal & Lifestyle</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <span className="section-label bg-white border border-neutral-200/80">
                <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                The Lumina Journal
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
              Inspire Your <span className="text-[var(--primary)]">Next Event</span>
            </h1>
            <p className="text-neutral-500 text-[16px] md:text-lg leading-relaxed max-w-2xl mx-auto">
              Event planning tips, trending color palettes, decor inspiration, and lifestyle insights curated by our luxury event experts.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mt-12">
            {blogCategories.map((cat: any) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 text-[13px] font-medium transition-all duration-300 rounded-xl border ${activeCategory === cat ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-[0_2px_8px_rgba(13,107,78,0.2)]" : "border-neutral-200/80 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"}`}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {activeCategory === "All" && (
        <section className="py-24 bg-white border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post: any, idx: number) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }} onMouseEnter={() => setHoveredPost(post.slug)} onMouseLeave={() => setHoveredPost(null)} className="group relative h-[500px] overflow-hidden border border-neutral-200/80 bg-neutral-100 rounded-3xl transition-all duration-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:border-neutral-300">
                    <div className="absolute inset-0">
                      <Image src={post.image} alt={post.title} width={800} height={500} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-900/30 to-transparent" />
                    </div>
                    <div className="absolute top-6 start-6 z-10">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[var(--primary)] text-[12px] font-medium rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08)]">Featured</span>
                    </div>
                    <div className="absolute bottom-0 start-0 end-0 p-8 z-10 flex flex-col justify-end">
                      <span className="text-[var(--primary)] text-[12px] font-medium bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg mb-4 inline-block w-fit shadow-sm">{post.category}</span>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300 leading-tight" style={{ letterSpacing: "-0.02em" }}>{post.title}</h3>
                      <p className="text-neutral-300 text-[15px] font-light line-clamp-2 mb-6 leading-relaxed max-w-lg">{post.excerpt}</p>
                      
                      <div className="flex items-center gap-6 text-[12px] text-neutral-300 font-medium">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[var(--primary)]" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-[var(--primary)]" /> {post.readTime}</span>
                      </div>
                      
                      <motion.div className="absolute bottom-8 end-8" animate={{ x: hoveredPost === post.slug ? 0 : -8, opacity: hoveredPost === post.slug ? 1 : 0 }} transition={{ duration: 0.3 }}>
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="section-label mb-4 block w-fit">
                <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                The Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight" style={{ letterSpacing: "-0.025em" }}>Latest <span className="text-[var(--primary)]">Insights</span> & Lifestyle</h2>
            </div>
            {/* Category selection refined */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pb-2 border-b border-neutral-100">
              {blogCategories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[13px] font-medium transition-all duration-300 relative pb-3 ${
                    activeCategory === cat
                      ? "text-[var(--primary)]"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div layoutId="catUnderline" className="absolute bottom-[-1px] start-0 end-0 h-[2px] bg-[var(--primary)]" />
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8"
            >
              {filteredPosts.map((post: any, idx: number) => {
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                    <motion.article
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                      className="flex flex-col h-full bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all duration-300"
                    >
                      {/* Image - Minimal frame */}
                      <div className="relative overflow-hidden bg-neutral-100 aspect-[4/3]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-500" />
                        
                        <div className="absolute top-4 end-4">
                           <span className="text-[11px] font-medium text-[var(--primary)] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                             {post.category}
                           </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1 bg-white">
                        <div className="flex items-center gap-4 mb-4 text-[11px] font-medium text-neutral-400">
                           <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
                           <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
                        </div>
                        
                        <h3 className="text-[18px] font-semibold text-neutral-900 mb-3 group-hover:text-[var(--primary)] transition-colors duration-200 line-clamp-2" style={{ letterSpacing: "-0.01em" }}>
                          {post.title}
                        </h3>
                        
                        <p className="text-neutral-500 text-[14px] leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[var(--primary)] text-[13px] font-medium group-hover:gap-3 transition-all duration-200">
                           Read Discovery
                           <ArrowRight size={14} />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-neutral-50 border border-neutral-100 rounded-2xl">
              <p className="text-neutral-500 text-[15px]">No articles found in this category yet. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-white border border-neutral-200/80 rounded-3xl p-12 md:p-16 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <span className="section-label mb-6 mx-auto w-fit">
            <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            Ready to Create Something Extraordinary?
          </span>
          <h2 className="font-semibold text-neutral-900 mb-6 text-3xl md:text-4xl" style={{ letterSpacing: "-0.025em" }}>
            Let&apos;s Bring Your <span className="text-[var(--primary)]">Vision</span> to Life
          </h2>
          <p className="text-neutral-500 text-[15px] md:text-base mb-10 max-w-2xl mx-auto leading-relaxed">Our team of luxury event experts is ready to transform your ideas into unforgettable experiences.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-white text-[14px] font-medium hover:bg-[var(--primary-dark)] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-xl">
            Book a Discovery Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
