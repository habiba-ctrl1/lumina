"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Lightbulb, TrendingUp,
  AlertTriangle, CheckCircle, ArrowUpRight, Clock,
  Calendar, BookOpen, MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts } from "@/lib/blog-data";
import { ChevronRight as Chevron } from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────── */

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost =
    currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  /* related posts — same category first, then fill */
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);
  if (relatedPosts.length < 3) {
    const extras = blogPosts
      .filter((p) => p.slug !== slug && !relatedPosts.includes(p))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...extras);
  }

  /* related services by category */
  const getRelatedServices = (cat: string) => {
    const map: Record<string, { title: string; href: string; desc: string }[]> = {
      Corporate: [
        { title: "Corporate Events & Galas", href: "/services/corporate-events", desc: "High-profile summits and executive dinners." },
        { title: "Conference Management", href: "/services/conferences", desc: "End-to-end MICE solutions." },
        { title: "Exhibition Management", href: "/services/exhibitions", desc: "Large-scale trade shows & expos." },
      ],
      Weddings: [
        { title: "Wedding Planning", href: "/services/weddings", desc: "Bespoke royal weddings & celebrations." },
        { title: "Destination Events", href: "/services/destination-events", desc: "AlUla, Red Sea & NEOM weddings." },
        { title: "VIP Events", href: "/services/luxury-vip-events", desc: "Private & intimate celebrations." },
      ],
    };
    return map[cat] ?? [
      { title: "Corporate Events", href: "/services/corporate-events", desc: "Strategic business events." },
      { title: "Wedding Planning", href: "/services/weddings", desc: "Unforgettable celebrations." },
      { title: "Destination Events", href: "/services/destination-events", desc: "Across Saudi Arabia." },
    ];
  };

  /* ── 404 ──────────────────────────────────────────────────────────────── */
  if (!post) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--heading)] mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-[var(--primary)] text-sm font-medium hover:underline">&larr; Back to Journal</Link>
        </div>
      </main>
    );
  }

  /* ── Markdown renderer ───────────────────────────────────────────────── */
  const renderContent = (block: string) => {
    /* H3 */
    if (block.startsWith("### ")) {
      return (
        <h3 className="text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold text-[var(--heading)] mt-10 mb-4 leading-snug" style={{ letterSpacing: "-0.015em" }}>
          {block.replace("### ", "")}
        </h3>
      );
    }
    /* H2 */
    if (block.startsWith("## ")) {
      const text = block.replace("## ", "");
      const isCTA = text.includes("Ready to Elevate");
      if (isCTA) return null; // CTA rendered separately
      return (
        <h2 className="text-[clamp(1.4rem,3vw,1.75rem)] font-semibold text-[var(--heading)] mt-14 mb-5 leading-tight" style={{ letterSpacing: "-0.02em" }}>
          {text}
        </h2>
      );
    }

    /* ── Highlight boxes ─────────────────────────────────────────────── */
    const boxes: Record<string, { tag: string; icon: any; label: string; bg: string; border: string; labelColor: string }> = {
      "[TIP]":            { tag: "[TIP]",            icon: Lightbulb,     label: "Expert Tip",         bg: "bg-amber-50/60",   border: "border-amber-400", labelColor: "text-amber-700" },
      "[INSIGHT]":        { tag: "[INSIGHT]",        icon: TrendingUp,    label: "Industry Insight",   bg: "bg-sky-50/60",     border: "border-sky-500",   labelColor: "text-sky-700" },
      "[MISTAKE]":        { tag: "[MISTAKE]",        icon: AlertTriangle, label: "Common Pitfall",     bg: "bg-rose-50/50",    border: "border-rose-400",  labelColor: "text-rose-700" },
      "[RECOMMENDATION]": { tag: "[RECOMMENDATION]", icon: CheckCircle,   label: "Our Recommendation", bg: "bg-emerald-50/50", border: "border-emerald-500", labelColor: "text-emerald-700" },
    };
    for (const [prefix, cfg] of Object.entries(boxes)) {
      if (block.startsWith(prefix)) {
        const Icon = cfg.icon;
        return (
          <div className={`my-8 rounded-xl border-l-[3px] ${cfg.border} ${cfg.bg} p-5 md:p-6`}>
            <p className={`${cfg.labelColor} text-[11px] font-bold uppercase tracking-[0.12em] flex items-center gap-2 mb-2`}>
              <Icon size={15} /> {cfg.label}
            </p>
            <p className="text-[var(--foreground)] text-[15px] leading-relaxed font-medium m-0">{block.replace(prefix, "").trim()}</p>
          </div>
        );
      }
    }

    /* Bullet points */
    if (block.startsWith("- **")) {
      const parsed = inlineMarkdown(block.substring(2));
      return (
        <div className="flex gap-3 mb-4 items-start">
          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0 opacity-60" />
          <p className="text-[var(--foreground-medium)] text-[15px] leading-[1.8] m-0" dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
      );
    }

    /* Table rows — pipe syntax */
    if (block.startsWith("| ")) {
      return <p className="text-[var(--foreground-medium)] text-sm leading-relaxed mb-1 font-mono" dangerouslySetInnerHTML={{ __html: block }} />;
    }

    /* CTA paragraph (last block) */
    if (block.includes("[Contact Saudi Event Management today]")) {
      return null; // rendered in dedicated CTA section
    }

    /* Standard paragraph */
    const parsed = inlineMarkdown(block);
    return (
      <p className="text-[var(--foreground-medium)] text-[15.5px] leading-[1.85] mb-6" dangerouslySetInnerHTML={{ __html: parsed }} />
    );
  };

  /* inline markdown: bold + links */
  function inlineMarkdown(text: string) {
    return text
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] underline decoration-[var(--primary)]/30 underline-offset-[3px] transition-colors">$1</a>'
      )
      .replace(
        /\*\*([^*]+)\*\*/g,
        '<strong class="font-semibold text-[var(--heading)]">$1</strong>'
      );
  }

  /* ── Schema ──────────────────────────────────────────────────────────── */
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: `https://saudieventmanagement.com${post.image}`,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Saudi Event Management",
      logo: { "@type": "ImageObject", url: "https://saudieventmanagement.com/logo.png" },
    },
    datePublished: post.date,
    description: post.excerpt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://saudieventmanagement.com/blog/${post.slug}` },
  };

  /* CTA text from content */
  const ctaBlock = post.content.find((b) => b.includes("[Contact Saudi Event Management today]"));

  /* ════════════════════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Navbar />

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-[var(--surface-raised)] border-b border-[var(--border-subtle)] pt-20">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-[12px] font-medium text-[var(--foreground-muted)] flex-wrap">
          <Link href="/" className="hover:text-[var(--heading)] transition-colors">Home</Link>
          <Chevron size={11} className="text-[var(--foreground-disabled)]" />
          <Link href="/blog" className="hover:text-[var(--heading)] transition-colors">Journal</Link>
          <Chevron size={11} className="text-[var(--foreground-disabled)]" />
          <span className="text-[var(--heading)] line-clamp-1">{post.title}</span>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] md:min-h-[62vh] flex flex-col justify-end overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 6, ease: "easeOut" }}>
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.72) 100%)" }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 border border-white/20 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.1)" }}>
                {post.category}
              </span>
              <span className="text-white/65 text-[12px] font-medium flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-[2.8rem] lg:text-[3.2rem] font-bold text-white leading-[1.08] mb-6 max-w-3xl" style={{ letterSpacing: "-0.03em", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-[12px] text-white/60 font-medium border-t border-white/10 pt-5">
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-[11px] font-bold">{post.author.charAt(0)}</span>
                <span className="text-white/90">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

            {/* Main column */}
            <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="min-w-0">

              {/* Introduction */}
              {post.content[0] && (
                <div className="mb-12 pb-10 border-b border-[var(--border)]">
                  <p className="text-[var(--foreground)] text-lg md:text-xl leading-[1.75] font-medium" style={{ letterSpacing: "-0.01em" }} dangerouslySetInnerHTML={{ __html: inlineMarkdown(post.content[0]) }} />
                </div>
              )}

              {/* Body blocks */}
              <div>
                {post.content.slice(1).map((block: string, i: number) => {
                  const el = renderContent(block);
                  return el ? <div key={i}>{el}</div> : null;
                })}
              </div>

              {/* Tags */}
              <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[var(--foreground-faint)] font-semibold mr-1">Topics</span>
                {[post.category, "Saudi Arabia", "Vision 2030"].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full text-[11px] font-medium text-[var(--foreground-muted)] bg-[var(--surface-raised)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors cursor-default">{tag}</span>
                ))}
              </div>
            </motion.article>

            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">

                {/* Author */}
                <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-3">Written by</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-muted)] border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm">{post.author.charAt(0)}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--heading)]">{post.author}</p>
                      <p className="text-[11px] text-[var(--foreground-muted)]">Event Industry Specialist</p>
                    </div>
                  </div>
                </div>

                {/* Related Services */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-4">Related Services</p>
                  <div className="space-y-2.5">
                    {getRelatedServices(post.category).map((s, i) => (
                      <Link key={i} href={s.href} className="group flex items-start gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-sm)] transition-all duration-200">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                          <ArrowUpRight size={14} className="text-[var(--primary)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors truncate">{s.title}</p>
                          <p className="text-[11px] text-[var(--foreground-muted)] leading-snug mt-0.5">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sidebar CTA */}
                <div className="p-5 rounded-xl bg-[var(--primary-muted)] border border-[var(--primary)]/15">
                  <p className="text-[13px] font-semibold text-[var(--heading)] mb-2 flex items-center gap-2"><MessageCircle size={15} className="text-[var(--primary)]" />Need Help Planning?</p>
                  <p className="text-[12px] text-[var(--foreground-muted)] leading-relaxed mb-4">Our team is ready to bring your vision to life across Saudi Arabia.</p>
                  <Link href="/contact" className="btn-primary w-full text-center text-[12px] py-2.5">
                    Get a Free Consultation
                  </Link>
                </div>

                {/* Related Blogs */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-4">Related Articles</p>
                  <div className="space-y-3">
                    {relatedPosts.slice(0, 3).map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-[13px] font-medium text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">{rp.title}</p>
                        <p className="text-[11px] text-[var(--foreground-faint)] mt-1">{rp.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--surface-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label mb-5 mx-auto w-fit">
            <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            Ready to Create Something Extraordinary?
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--heading)] mb-4" style={{ letterSpacing: "-0.025em" }}>
            Let&apos;s Bring Your <span className="text-[var(--primary)]">Vision</span> to Life
          </h2>
          <p className="text-[var(--foreground-muted)] text-[15px] mb-8 max-w-xl mx-auto leading-relaxed">
            Our expert event planners are here to turn your vision into an unprecedented reality across Saudi Arabia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary px-8 py-3.5">
              Book a Discovery Call <ArrowRight size={15} />
            </Link>
            <Link href="/services" className="btn-outline px-8 py-3.5">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Prev / Next ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group py-10 md:pr-10 transition-all">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-faint)] font-bold flex items-center gap-2 mb-3"><ArrowLeft size={13} /> Previous</span>
                <h4 className="text-[15px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">{prevPost.title}</h4>
              </Link>
            ) : <div className="py-10 md:pr-10" />}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group py-10 md:pl-10 text-left md:text-right transition-all">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-faint)] font-bold flex items-center md:justify-end gap-2 mb-3">Next <ArrowRight size={13} /></span>
                <h4 className="text-[15px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">{nextPost.title}</h4>
              </Link>
            ) : <div className="py-10 md:pl-10" />}
          </div>
        </div>
      </section>

      {/* ── Continue Reading ───────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label mb-3 block w-fit">
                <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Continue Reading
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--heading)]" style={{ letterSpacing: "-0.025em" }}>
                More <span className="text-[var(--primary)]">Insights</span>
              </h3>
            </div>
            <Link href="/blog" className="text-[var(--primary)] text-[13px] font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
              View all articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-md)] hover:border-neutral-300 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    <Image src={rp.image} alt={rp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 end-3">
                      <span className="text-[10px] font-medium text-[var(--primary)] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">{rp.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-[11px] text-[var(--foreground-faint)] font-medium">
                      <span className="flex items-center gap-1"><Calendar size={12} />{rp.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{rp.readTime}</span>
                    </div>
                    <h4 className="text-[16px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug mb-3" style={{ letterSpacing: "-0.01em" }}>{rp.title}</h4>
                    <p className="text-[var(--foreground-muted)] text-[13px] line-clamp-2 leading-relaxed">{rp.excerpt}</p>
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
