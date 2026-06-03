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
      <main className="min-h-screen bg-ink-800 flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-sans font-bold text-sand-50 mb-8">Article Not Found</h1>
          <Link href="/blog" className="text-gold-600 hover:text-gold-500 text-sm uppercase tracking-wider">
            &larr; Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const renderContent = (block: string) => {
    if (block.startsWith("### ")) {
      return (
        <h3 className="text-lg md:text-xl font-sans font-bold text-sand-50 mt-8 mb-8 leading-tight">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 className="text-xl md:text-2xl font-sans font-bold text-sand-50 mt-12 mb-8 leading-tight">
          {block.replace("## ", "")}
        </h2>
      );
    }
    // Simple markdown link parser: [Text](url) -> <a href="url" class="text-gold-500 hover:text-gold-400 underline">Text</a>
    const parsedBlock = block.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-gold-500 hover:text-gold-400 underline">$1</a>'
    );

    return (
      <p
        className="text-sand-200 leading-[1.9] mb-8"
        dangerouslySetInnerHTML={{ __html: parsedBlock }}
      />
    );
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://saudieventmanagement.com${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Saudi Event Management",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saudieventmanagement.com/logo.png"
      }
    },
    "datePublished": post.date,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://saudieventmanagement.com/blog/${post.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-ink-800 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-black">
        <Image src={post.image} alt={post.title} width={1920} height={1080} className="w-full h-full object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 start-0 end-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/blog" className="inline-flex items-center gap-3 text-gold-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8 group hover:text-white transition-all duration-500">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center group-hover:border-white transition-colors">
                  <ArrowLeft size={12} />
                </div>
                Back to Collection
              </Link>
              <div className="flex items-center gap-10 mb-8">
                 <div className="w-12 h-px bg-gold-500" />
                 <span className="text-gold-500 text-[10px] uppercase tracking-[0.4em] font-bold">{post.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-[1.1] mb-8 max-w-4xl opacity-100">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-10 text-[10px] text-gray-400 uppercase tracking-[0.25em] font-medium border-t border-white/10 pt-8">
                <span className="flex items-center gap-2">By <span className="text-white">{post.author}</span></span>
                <span className="flex items-center gap-2">Date <span className="text-white">{post.date}</span></span>
                <span className="flex items-center gap-2">Read <span className="text-white">{post.readTime}</span></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-32 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-12">
            {/* Main Content */}
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              {/* Intro */}
              <div className="border-s-2 border-gold-500/30 ps-6 mb-10">
                <p className="text-lg text-sand-100 leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: post.content[0] }} />
              </div>

              {/* Body */}
              <div className="prose-custom">
                {post.content.slice(1).map((block: any, i: number) => (
                  <div key={i}>{renderContent(block)}</div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-ink-500">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Tags:</span>
                  {[post.category, "Luxury Events", "Inspiration"].map((tag: any) => (
                    <span key={tag} className="px-3 py-1.5 bg-ink-950 border border-ink-600 text-sand-300 text-[10px] uppercase tracking-[0.15em]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-10">
                <span className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-2"><Share2 size={12} /> Share:</span>
                {["Twitter", "Facebook", "LinkedIn"].map((platform: any) => (
                  <button key={platform} className="px-4 py-2 border border-ink-600 text-sand-300 text-[10px] uppercase tracking-wider hover:text-gold-600 hover:border-gold-500/30 transition-all duration-300">{platform}</button>
                ))}
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="hidden lg:block">
              <div className="sticky top-28">
                <div className="w-px h-16 bg-gradient-to-b from-gold-500/50 to-transparent mb-8 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand-400 text-center mb-2">Written by</p>
                <p className="text-xs text-sand-100 text-center font-medium mb-8">{post.author}</p>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent mb-8 mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand-400 text-center mb-2">Published</p>
                <p className="text-xs text-sand-100 text-center font-medium">{post.date}</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="border-t border-ink-500 bg-ink-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group p-8 md:p-12 border-r border-ink-500 hover:bg-ink-900 transition-colors duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sand-400 flex items-center gap-2 mb-3"><ArrowLeft size={12} /> Previous</span>
                <h4 className="text-sm font-sans font-bold text-sand-100 group-hover:text-gold-600 transition-colors line-clamp-2">{prevPost.title}</h4>
              </Link>
            ) : <div className="p-8 md:p-12 border-r border-ink-500" />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group p-8 md:p-12 text-end hover:bg-ink-900 transition-colors duration-300">
                <span className="text-[10px] uppercase tracking-[0.2em] text-sand-400 flex items-center justify-end gap-2 mb-3">Next <ArrowRight size={12} /></span>
                <h4 className="text-sm font-sans font-bold text-sand-100 group-hover:text-gold-600 transition-colors line-clamp-2">{nextPost.title}</h4>
              </Link>
            ) : <div className="p-8 md:p-12" />}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-28 border-t border-ink-500 bg-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-10 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-600 font-medium whitespace-nowrap">You May Also Like</span>
            <div className="h-px flex-1 bg-gradient-to-l from-gold-500/30 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {relatedPosts.map((rp: any) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                <motion.article whileHover={{ y: -4 }} className="group flex gap-10 border border-ink-500 bg-ink-950 p-4 hover:border-gold-500/20 transition-all duration-500">
                  <div className="relative w-32 h-32 shrink-0 overflow-hidden">
                    <Image src={rp.image} alt={rp.title} width={300} height={300} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-gold-500 text-[10px] uppercase tracking-[0.2em] mb-2">{rp.category}</span>
                    <h4 className="text-sm font-sans font-bold text-sand-100 group-hover:text-gold-600 transition-colors line-clamp-2 mb-2">{rp.title}</h4>
                    <span className="text-[10px] text-sand-400 uppercase tracking-wider">{rp.readTime}</span>
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
