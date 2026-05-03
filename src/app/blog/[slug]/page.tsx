"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts } from "@/lib/blog-data";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 2);
  if (relatedPosts.length < 2) {
    const extras = blogPosts.filter((p) => p.slug !== slug && !relatedPosts.includes(p)).slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...extras);
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-display text-white mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-gold-500 hover:text-gold-400 text-sm uppercase tracking-wider">
            &larr; Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const renderContent = (block: string) => {
    if (block.startsWith("## ")) {
      return (
        <h2 className="text-2xl md:text-3xl font-display text-white mt-12 mb-4 leading-tight">
          {block.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p
        className="text-gray-400 font-light leading-[1.9] mb-6"
        dangerouslySetInnerHTML={{ __html: block }}
      />
    );
  };

  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/50 to-charcoal-900/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/blog" className="inline-flex items-center gap-3 text-gold-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 group hover:text-white transition-all duration-500">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center group-hover:border-white transition-colors">
                  <ArrowLeft size={12} />
                </div>
                Back to Collection
              </Link>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-px bg-gold-500" />
                 <span className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-bold">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] mb-8 max-w-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-8 text-[10px] text-gray-500 uppercase tracking-[0.25em] font-medium border-t border-white/5 pt-8">
                <span className="flex items-center gap-2">By <span className="text-white">{post.author}</span></span>
                <span className="flex items-center gap-2">Date <span className="text-white">{post.date}</span></span>
                <span className="flex items-center gap-2">Read <span className="text-white">{post.readTime}</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Content */}
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              {/* Intro */}
              <div className="border-l-2 border-gold-500/30 pl-6 mb-10">
                <p className="text-lg text-gray-300 font-light leading-relaxed italic" dangerouslySetInnerHTML={{ __html: post.content[0] }} />
              </div>

              {/* Body */}
              <div className="prose-custom">
                {post.content.slice(1).map((block, i) => (
                  <div key={i}>{renderContent(block)}</div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Tags:</span>
                  {[post.category, "Luxury Events", "Inspiration"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-charcoal-800/50 border border-white/5 text-gray-400 text-[10px] uppercase tracking-[0.15em]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2"><Share2 size={12} /> Share:</span>
                {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                  <button key={platform} className="px-4 py-2 border border-white/5 text-gray-400 text-[10px] uppercase tracking-wider hover:text-gold-500 hover:border-gold-500/30 transition-all duration-300">{platform}</button>
                ))}
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="hidden lg:block">
              <div className="sticky top-28">
                <div className="w-px h-16 bg-gradient-to-b from-gold-500/50 to-transparent mb-6 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 text-center mb-2">Written by</p>
                <p className="text-xs text-white text-center font-medium mb-8">{post.author}</p>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent mb-6 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 text-center mb-2">Published</p>
                <p className="text-xs text-white text-center font-medium">{post.date}</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group p-8 md:p-12 border-r border-white/5 hover:bg-charcoal-800/20 transition-colors duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2 mb-3"><ArrowLeft size={12} /> Previous</span>
                <h4 className="text-sm font-display text-white group-hover:text-gold-400 transition-colors line-clamp-2">{prevPost.title}</h4>
              </Link>
            ) : <div className="p-8 md:p-12 border-r border-white/5" />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group p-8 md:p-12 text-right hover:bg-charcoal-800/20 transition-colors duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 flex items-center justify-end gap-2 mb-3">Next <ArrowRight size={12} /></span>
                <h4 className="text-sm font-display text-white group-hover:text-gold-400 transition-colors line-clamp-2">{nextPost.title}</h4>
              </Link>
            ) : <div className="p-8 md:p-12" />}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-medium whitespace-nowrap">You May Also Like</span>
            <div className="h-px flex-1 bg-gradient-to-l from-gold-500/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                <motion.article whileHover={{ y: -4 }} className="group flex gap-6 border border-white/5 bg-charcoal-800/20 p-4 hover:border-gold-500/20 transition-all duration-500">
                  <div className="relative w-32 h-32 shrink-0 overflow-hidden">
                    <Image src={rp.image} alt={rp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-gold-500 text-[10px] uppercase tracking-[0.2em] mb-2">{rp.category}</span>
                    <h4 className="text-sm font-display text-white group-hover:text-gold-400 transition-colors line-clamp-2 mb-2">{rp.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{rp.readTime}</span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
