"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Lightbulb, TrendingUp,
  AlertTriangle, CheckCircle, ArrowUpRight, Clock,
  Calendar, MessageCircle, ListChecks,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { blogPosts } from "@/lib/blog-data";
import { ChevronRight as Chevron } from "lucide-react";

/* ─── Inline markdown → HTML ────────────────────────────────────────────────── */
function inlineMarkdown(text: string): string {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[var(--primary)] font-medium hover:text-[var(--primary-dark)] underline decoration-[var(--primary)]/30 underline-offset-[3px] transition-colors">$1</a>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[var(--heading)]">$1</strong>');
}

/* ─── Content segment types ─────────────────────────────────────────────────── */
type ContentSegment =
  | { kind: "block"; content: string }
  | { kind: "table"; rows: string[] }
  | { kind: "takeaways"; items: string[] };

/* ─── Pre-process flat blocks into typed segments ────────────────────────────── */
function parseSegments(blocks: string[]): ContentSegment[] {
  const segs: ContentSegment[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];

    /* Collect consecutive pipe rows into a single table segment */
    if (b.startsWith("| ")) {
      const rows: string[] = [];
      while (i < blocks.length && blocks[i].startsWith("| ")) {
        if (!/^\|\s*:?-+:?\s*\|/.test(blocks[i])) rows.push(blocks[i]);
        i++;
      }
      if (rows.length) segs.push({ kind: "table", rows });
      continue;
    }

    /* Key Takeaways header → collect following bullet items */
    if (b === "## Key Takeaways") {
      const items: string[] = [];
      i++;
      while (i < blocks.length && blocks[i].startsWith("- ")) {
        items.push(blocks[i].replace(/^-\s+/, ""));
        i++;
      }
      if (items.length) segs.push({ kind: "takeaways", items });
      continue;
    }

    segs.push({ kind: "block", content: b });
    i++;
  }
  return segs;
}

/* ─── Styled data table ─────────────────────────────────────────────────────── */
function BlogTable({ rows }: { rows: string[] }) {
  const parseCells = (row: string) =>
    row
      .split("|")
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      .map((c) => c.trim());

  const headers = parseCells(rows[0]);
  const bodyRows = rows.slice(1);

  return (
    <div className="my-10 overflow-x-auto rounded-xl border border-[var(--border)] shadow-[var(--shadow-sm)]">
      <table className="w-full text-[14px] border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-white bg-[var(--primary)]"
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(h) }}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => {
            const cells = parseCells(row);
            return (
              <tr
                key={ri}
                className={`${ri % 2 === 0 ? "bg-white" : "bg-[var(--surface-raised)]"} hover:bg-[var(--surface-tinted)] transition-colors`}
              >
                {cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-5 py-3.5 text-[var(--foreground-medium)] border-t border-[var(--border-subtle)] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(cell) }}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Key Takeaways summary card ────────────────────────────────────────────── */
function TakeawaysCard({ items }: { items: string[] }) {
  return (
    <div className="my-12 rounded-2xl bg-[var(--surface-tinted)] border border-[var(--primary)]/15 p-7 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center shrink-0">
          <ListChecks size={16} className="text-white" />
        </div>
        <p className="text-[16px] font-bold text-[var(--heading)] leading-tight" style={{ letterSpacing: "-0.015em" }}>
          Key Takeaways
        </p>
      </div>
      <ul className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-[3px] w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <CheckCircle size={12} className="text-[var(--primary)]" />
            </div>
            <p
              className="text-[var(--foreground-medium)] text-[14.5px] leading-[1.8] m-0"
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Main page component
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  /* Related posts — same category first, fill remaining slots */
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);
  if (relatedPosts.length < 3) {
    blogPosts
      .filter((p) => p.slug !== slug && !relatedPosts.includes(p))
      .slice(0, 3 - relatedPosts.length)
      .forEach((p) => relatedPosts.push(p));
  }

  /* Related services by post category */
  const getRelatedServices = (cat: string) => {
    const map: Record<string, { title: string; href: string; desc: string }[]> = {
      Corporate: [
        { title: "Corporate Events & Galas",  href: "/services/corporate-events", desc: "High-profile summits and executive dinners." },
        { title: "Conference Management",     href: "/services/conferences",      desc: "End-to-end MICE solutions." },
        { title: "Exhibition Management",     href: "/services/exhibitions",      desc: "Large-scale trade shows & expos." },
      ],
      Weddings: [
        { title: "Wedding Planning",          href: "/services/weddings",         desc: "Royal weddings and milestone celebrations." },
        { title: "Destination Events",        href: "/services/destination-events", desc: "AlUla, Red Sea & NEOM events." },
        { title: "VIP Events",               href: "/services/luxury-vip-events",  desc: "Private and intimate celebrations." },
      ],
    };
    return (
      map[cat] ?? [
        { title: "Corporate Events",  href: "/services/corporate-events",  desc: "Strategic business events." },
        { title: "Wedding Planning",  href: "/services/weddings",          desc: "Memorable celebrations." },
        { title: "Destination Events",href: "/services/destination-events", desc: "Across Saudi Arabia." },
      ]
    );
  };

  /* ── 404 ──────────────────────────────────────────────────────────────────── */
  if (!post) {
    return (
      <main className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[var(--heading)] mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-[var(--primary)] text-sm font-medium hover:underline">
            &larr; Back to Journal
          </Link>
        </div>
      </main>
    );
  }

  /* ── Parse content into typed segments (skip hero intro block) ──────────── */
  const segments = parseSegments(post.content.slice(1));

  /* ── Single-block renderer ──────────────────────────────────────────────── */
  const renderBlock = (content: string, idx: number) => {
    /* H3 */
    if (content.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className="text-[clamp(1.05rem,2.2vw,1.2rem)] font-semibold text-[var(--heading)] mt-8 mb-3 leading-snug"
          style={{ letterSpacing: "-0.012em" }}
        >
          {content.replace("### ", "")}
        </h3>
      );
    }

    /* H2 */
    if (content.startsWith("## ")) {
      const text = content.replace("## ", "");
      if (text.includes("Ready to Elevate") || text.includes("Ready to Create")) return null;
      return (
        <h2
          key={idx}
          className="text-[clamp(1.3rem,2.8vw,1.65rem)] font-semibold text-[var(--heading)] mt-14 mb-5 leading-tight pl-4 border-l-[3px] border-[var(--primary)]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {text}
        </h2>
      );
    }

    /* Callout boxes */
    const callouts: Record<
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { icon: any; label: string; bg: string; border: string; label_color: string; icon_bg: string }
    > = {
      "[TIP]": {
        icon: Lightbulb, label: "Expert Tip",
        bg: "bg-amber-50/70", border: "border-amber-300/70",
        label_color: "text-amber-700", icon_bg: "bg-amber-100",
      },
      "[INSIGHT]": {
        icon: TrendingUp, label: "Industry Insight",
        bg: "bg-sky-50/70", border: "border-sky-300/70",
        label_color: "text-sky-700", icon_bg: "bg-sky-100",
      },
      "[MISTAKE]": {
        icon: AlertTriangle, label: "Common Pitfall",
        bg: "bg-rose-50/60", border: "border-rose-300/60",
        label_color: "text-rose-700", icon_bg: "bg-rose-100",
      },
      "[RECOMMENDATION]": {
        icon: CheckCircle, label: "Our Recommendation",
        bg: "bg-emerald-50/60", border: "border-emerald-300/60",
        label_color: "text-emerald-700", icon_bg: "bg-emerald-100",
      },
    };
    for (const [prefix, cfg] of Object.entries(callouts)) {
      if (content.startsWith(prefix)) {
        const Icon = cfg.icon;
        return (
          <div key={idx} className={`my-8 rounded-xl border ${cfg.border} ${cfg.bg} p-5 md:p-6 flex gap-4`}>
            <div className={`w-8 h-8 rounded-lg ${cfg.icon_bg} flex items-center justify-center shrink-0 mt-0.5`}>
              <Icon size={15} className={cfg.label_color} />
            </div>
            <div>
              <p className={`${cfg.label_color} text-[11px] font-bold uppercase tracking-[0.12em] mb-2`}>
                {cfg.label}
              </p>
              <p
                className="text-[var(--foreground)] text-[15px] leading-relaxed font-[450] m-0"
                dangerouslySetInnerHTML={{ __html: inlineMarkdown(content.replace(prefix, "").trim()) }}
              />
            </div>
          </div>
        );
      }
    }

    /* Bullet point */
    if (content.startsWith("- ")) {
      return (
        <div key={idx} className="flex gap-3 mb-3.5 items-start">
          <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0 opacity-70" />
          <p
            className="text-[var(--foreground-medium)] text-[15px] leading-[1.85] m-0"
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(content.substring(2)) }}
          />
        </div>
      );
    }

    /* Skip old CTA paragraphs (the boilerplate "Contact Saudi Event Management today" footer) */
    if (content.includes("[Contact Saudi Event Management today]")) return null;

    /* Standard paragraph */
    return (
      <p
        key={idx}
        className="text-[var(--foreground-medium)] text-[15.5px] leading-[1.85] mb-6"
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(content) }}
      />
    );
  };

  /* ── JSON-LD schema ─────────────────────────────────────────────────────── */
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

  /* ══════════════════════════════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <ScrollProgress />
      <Navbar />

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-[var(--surface-raised)] border-b border-[var(--border-subtle)] pt-20">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-[12px] font-medium text-[var(--foreground-muted)] flex-wrap">
          <Link href="/" className="hover:text-[var(--heading)] transition-colors">Home</Link>
          <Chevron size={11} className="text-[var(--foreground-disabled)]" />
          <Link href="/blog" className="hover:text-[var(--heading)] transition-colors">Journal</Link>
          <Chevron size={11} className="text-[var(--foreground-disabled)]" />
          <span className="text-[var(--heading)] line-clamp-1">{post.title}</span>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] md:min-h-[62vh] flex flex-col justify-end overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.78) 100%)" }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 border border-white/20 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                {post.category}
              </span>
              <span className="text-white/65 text-[12px] font-medium flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <h1
              className="text-3xl md:text-[2.8rem] lg:text-[3.2rem] font-bold text-white leading-[1.08] mb-6 max-w-3xl"
              style={{ letterSpacing: "-0.03em", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-[12px] text-white/60 font-medium border-t border-white/10 pt-5">
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-[11px] font-bold">
                  {post.author.charAt(0)}
                </span>
                <span className="text-white/90">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.date}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article body ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-12 lg:gap-16">

            {/* Main column */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="min-w-0"
            >
              {/* Editorial lede — hero introduction */}
              {post.content[0] && (
                <div className="mb-12 pb-10 border-b border-[var(--border)]">
                  <p
                    className="text-[var(--foreground)] text-[1.1rem] md:text-[1.175rem] leading-[1.8] font-[450]"
                    style={{ letterSpacing: "-0.01em" }}
                    dangerouslySetInnerHTML={{ __html: inlineMarkdown(post.content[0]) }}
                  />
                </div>
              )}

              {/* Body — typed segments */}
              <div>
                {segments.map((seg, idx) => {
                  if (seg.kind === "table")     return <BlogTable     key={`t${idx}`}  rows={seg.rows} />;
                  if (seg.kind === "takeaways") return <TakeawaysCard key={`tw${idx}`} items={seg.items} />;
                  const el = renderBlock(seg.content, idx);
                  return el ? <div key={idx}>{el}</div> : null;
                })}
              </div>

              {/* Topic tags */}
              <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[var(--foreground-faint)] font-semibold mr-1">
                  Topics
                </span>
                {[post.category, "Saudi Arabia", "Vision 2030"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-medium text-[var(--foreground-muted)] bg-[var(--surface-raised)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile sidebar CTA */}
              <div className="mt-10 lg:hidden p-6 rounded-2xl bg-[var(--surface-tinted)] border border-[var(--primary)]/15">
                <p className="text-[14px] font-semibold text-[var(--heading)] mb-2">
                  Ready to Plan Your Event?
                </p>
                <p className="text-[13px] text-[var(--foreground-muted)] leading-relaxed mb-4">
                  Our team delivers events across Saudi Arabia — from Riyadh to AlUla.
                </p>
                <Link href="/contact" className="btn-primary w-full text-center text-[13px] py-3">
                  Get a Free Consultation
                </Link>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">

                {/* Author */}
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-3">
                    Written by
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary-muted)] border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm shrink-0">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[var(--heading)]">{post.author}</p>
                      <p className="text-[11px] text-[var(--foreground-muted)]">Event Industry Specialist</p>
                    </div>
                  </div>
                </div>

                {/* CTA — primary emerald card */}
                <div className="p-5 rounded-2xl bg-[var(--primary)] text-white relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{ backgroundImage: "radial-gradient(circle at 70% 0%, white 0%, transparent 65%)" }}
                  />
                  <div className="relative">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                      <MessageCircle size={15} className="text-white" />
                    </div>
                    <p className="text-[14px] font-semibold text-white mb-1.5">Need Help Planning?</p>
                    <p className="text-[12px] text-white/75 leading-relaxed mb-4">
                      Our event team is ready to help across Saudi Arabia — Riyadh, Jeddah, AlUla, and beyond.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-lg bg-white text-[var(--primary)] text-[12.5px] font-semibold hover:bg-white/90 transition-colors"
                    >
                      Get a Free Consultation
                    </Link>
                  </div>
                </div>

                {/* Related Services */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-3">
                    Related Services
                  </p>
                  <div className="space-y-2">
                    {getRelatedServices(post.category).map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        className="group flex items-start gap-3 p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-sm)] transition-all duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                          <ArrowUpRight size={14} className="text-[var(--primary)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-medium text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors truncate">
                            {s.title}
                          </p>
                          <p className="text-[11px] text-[var(--foreground-muted)] leading-snug mt-0.5">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related Articles */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--foreground-faint)] font-bold mb-3">
                    Related Articles
                  </p>
                  <div className="space-y-4">
                    {relatedPosts.slice(0, 3).map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-[12.5px] font-medium text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug mb-1">
                          {rp.title}
                        </p>
                        <p className="text-[11px] text-[var(--foreground-faint)] flex items-center gap-1.5">
                          <Clock size={10} />
                          {rp.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--surface-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label mb-5 mx-auto w-fit">
            <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            Plan Your Next Event
          </span>
          <h2
            className="text-2xl md:text-3xl font-semibold text-[var(--heading)] mb-4"
            style={{ letterSpacing: "-0.025em" }}
          >
            Let&apos;s Plan Your <span className="text-[var(--primary)]">Next Event</span> Together
          </h2>
          <p className="text-[var(--foreground-muted)] text-[15px] mb-8 max-w-xl mx-auto leading-relaxed">
            Whether you are planning a corporate summit in Riyadh, an exhibition in Jeddah, or a destination event in AlUla — our team delivers from concept to completion.
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

      {/* ── Prev / Next navigation ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group py-10 md:pr-10 transition-all">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-faint)] font-bold flex items-center gap-2 mb-3">
                  <ArrowLeft size={13} /> Previous
                </span>
                <h4 className="text-[15px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {prevPost.title}
                </h4>
              </Link>
            ) : (
              <div className="py-10 md:pr-10" />
            )}
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="group py-10 md:pl-10 text-left md:text-right transition-all">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-faint)] font-bold flex items-center md:justify-end gap-2 mb-3">
                  Next <ArrowRight size={13} />
                </span>
                <h4 className="text-[15px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {nextPost.title}
                </h4>
              </Link>
            ) : (
              <div className="py-10 md:pl-10" />
            )}
          </div>
        </div>
      </section>

      {/* ── Continue Reading ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label mb-3 block w-fit">
                <span className="w-4 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
                Continue Reading
              </span>
              <h3
                className="text-2xl md:text-3xl font-semibold text-[var(--heading)]"
                style={{ letterSpacing: "-0.025em" }}
              >
                More <span className="text-[var(--primary)]">Insights</span>
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-[var(--primary)] text-[13px] font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
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
                    <Image
                      src={rp.image}
                      alt={rp.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 end-3">
                      <span className="text-[10px] font-medium text-[var(--primary)] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">
                        {rp.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3 text-[11px] text-[var(--foreground-faint)] font-medium">
                      <span className="flex items-center gap-1"><Calendar size={12} />{rp.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{rp.readTime}</span>
                    </div>
                    <h4
                      className="text-[16px] font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug mb-3"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {rp.title}
                    </h4>
                    <p className="text-[var(--foreground-muted)] text-[13px] line-clamp-2 leading-relaxed mb-4">
                      {rp.excerpt}
                    </p>
                    <span className="flex items-center gap-1.5 text-[var(--primary)] text-[12px] font-medium">
                      Read article <ArrowRight size={12} />
                    </span>
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
