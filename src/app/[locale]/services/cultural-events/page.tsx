"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Moon, Star, Flag, Gift, Landmark, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SeasonalEventsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Festival",
        "name": "Ramadan Nights Riyadh 2025",
        "startDate": "2025-03-01",
        "endDate": "2025-03-30",
        "location": {
          "@type": "Place",
          "name": "Diplomatic Quarter, Riyadh",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          }
        },
        "description": "Exquisite Ramadan iftar and suhoor events featuring traditional Saudi hospitality and luxury activations."
      },
      {
        "@type": "CivicStructure",
        "name": "Riyadh National Day Pavilion",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riyadh",
          "addressCountry": "SA"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What should I know about planning events during Ramadan in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ramadan in Saudi Arabia requires cultural sensitivity, adjusting event timings to post-iftar or suhoor hours, and focusing on traditional hospitality. As a premier Ramadan event planner KSA, Saudi Event Management manages all aspects of luxury corporate iftars and brand activations."
            }
          },
          {
            "@type": "Question",
            "name": "We want to do a Ramadan iftar activation for our brand in Riyadh. Where do we start?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starting a Ramadan activation requires early concept design and venue booking. Saudi Event Management provides full-service solutions for brand activations, from bespoke Majlis setups to luxury catering."
            }
          },
          {
            "@type": "Question",
            "name": "How to organize a National Day celebration for our company?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Organizing a National Day celebration requires patriotic branding, entertainment permits, and engaging cultural activities. As your National Day event organizer Riyadh, we recommend starting the process 3-4 months in advance."
            }
          },
          {
            "@type": "Question",
            "name": "What is special about Saudi Founding Day celebrations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Founding Day celebrates the traditional heritage of the Kingdom. Events often feature traditional attire, Saudi coffee ceremonies, and historical exhibitions."
            }
          },
          {
            "@type": "Question",
            "name": "How early should I book a Ramadan event organizer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Due to high demand, we recommend booking your Ramadan event organizer at least 2-3 months before the holy month starts to secure the best venues and vendors."
            }
          },
          {
            "@type": "Question",
            "name": "Ramadan event company near me Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is a premier Ramadan event company near me Saudi Arabia, offering localized, high-end Islamic seasonal events across Riyadh, Jeddah, and the Eastern Province."
            }
          },
          {
            "@type": "Question",
            "name": "National Day party organizer Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As the top National Day party organizer Riyadh, Saudi Event Management creates massive patriotic festivals and exclusive corporate celebrations for the Kingdom's most important holiday."
            }
          }
        ]
      },
      {
        "@type": "Article",
        "headline": "How to Plan a National Day Celebration in Saudi Arabia",
        "author": {
          "@type": "Organization",
          "name": "Saudi Event Management"
        },
        "datePublished": "2024-09-01",
        "description": "A comprehensive guide to organizing high-impact National Day galas and community festivals in Riyadh."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Seasonal & Religious Events", "item": "https://saudieventmanagement.com/services/seasonal" }
        ]
      },
      {
        "@type": "Organization",
        "name": "Saudi Event Management Seasonal Events",
        "description": "Specializing in Saudi National Day, Founding Day, and Riyadh Season cultural activations.",
        "memberOf": {
          "@type": "Organization",
          "name": "GEA Certified Event Organizers"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <InternalPageHero
          title="Cultural Event Management"
          titleHighlight="in Saudi Arabia"
          subtitle="The Kingdom's leading Ramadan, National Day, and Eid event organizer — preserving Saudi heritage and delivering luxury cultural experiences across Riyadh, Jeddah, and beyond."
          backgroundImage="/majlis_gathering_people.webp"
          imageAlt="Cultural events Saudi Arabia — Ramadan and National Day organizer"
          badge="Cultural Events | التراث السعودي"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Cultural Events" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-12 py-5 bg-[var(--primary-dark)] text-white font-bold uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl"
            >
              Plan Your Celebration
            </Link>
          </div>
        </div>

        {/* E-E-A-T & Cultural Credentials */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-12">
              <div className="flex items-center gap-10">
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm tracking-widest">Heritage Certified</p>
                  <p className="text-[10px] text-gray-500 uppercase">Cultural Sensitivity Credentials</p>
                </div>
              </div>
              <div className="flex gap-10 grayscale opacity-40  font-bold text-xs tracking-widest">
                <span>RIYADH SEASON</span>
                <span>MINISTRY OF HAJJ</span>
                <span>FOUNDING DAY</span>
              </div>
              <div className="text-sm text-gray-500 font-light ">
                &quot;Official participation in National Day initiatives for over a decade.&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Featured Occasions */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-2xl md:text-4xl font-sans text-slate-900 mb-8 font-bold">Honoring Our <span className="text-[var(--primary)]">Traditions</span></h2>
              <div className="w-24 h-px bg-[var(--primary-dark)]/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { 
                  icon: Moon, 
                  title: "Ramadan Events", 
                  desc: "Exquisite activations for the holy month. Specialized in corporate iftars and suhoors with deep respect for Islamic seasonal events.",
                  linkText: "Ramadan Portfolio"
                },
                { 
                  icon: Flag, 
                  title: "National Day (Sep 23)", 
                  desc: "Planning high-impact National Day (اليوم الوطني) celebrations and holiday activation KSA. From grand fireworks to community heritage festivals.",
                  linkText: "National Day Experience"
                },
                { 
                  icon: Gift, 
                  title: "Eid Al-Fitr & Al-Adha", 
                  desc: "Comprehensive religious celebration management KSA. Preserving the joy of both Eids with luxury corporate and family events.",
                  linkText: "Eid Management"
                },
                { 
                  icon: Landmark, 
                  title: "Founding Day (Feb 22)", 
                  desc: "Honoring the Kingdom&apos;s roots on يوم التأسيس with traditional exhibitions and Saudi heritage events.",
                  linkText: "Founding Day Heritage"
                },
                { 
                  icon: Star, 
                  title: "Hajj & Umrah Season", 
                  desc: "Coordinating with the Ministry of Hajj and Umrah to provide elite support and event services for pilgrims during the spiritual festival season Saudi Arabia.",
                  linkText: "Religious Support"
                },
                { 
                  icon: Award, 
                  title: "Riyadh Season", 
                  desc: "Contributing to the Kingdom&apos;s most ambitious entertainment season with unique annual celebration planning and flawless execution.",
                  linkText: "Season Activations"
                },
              ].map((item: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 group"
                >
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--primary-dark)] transition-colors">
                    <item.icon size={28} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-slate-900 mb-8">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">{item.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] border-b border-gold-200 pb-1">{item.linkText}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-32 bg-white relative border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-slate-900">Heritage <br/><span className="text-[var(--primary)]">Resources</span></h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Expert insights for planning culturally significant events across the Kingdom.</p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-bold text-sm">Saleh Al-Humaid</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Cultural Affairs Advisor</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: "Complete guide to Ramadan event activations in Saudi Arabia", desc: "A deep dive into Majlis design, traditional catering, and ethical engagement during the holy month." },
                  { title: "Saudi National Day event planning 2025", desc: "Preparing for the Kingdom&apos;s biggest celebration with grand-scale branding and patriotic themes." },
                  { title: "Corporate Eid celebration guide KSA", desc: "How to host inclusive and festive Eid gatherings for diverse corporate environments." },
                  { title: "Seasonal event calendar Saudi Arabia 2025", desc: "Tracking the Kingdom&apos;s transformation through Riyadh Season, religious milestones, and national days." }
                ].map((post: any, idx: number) => (
                  <div key={idx} className="p-8 bg-white rounded-2xl hover:bg-gold-50 transition-colors cursor-pointer group">
                    <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Arabic Heritage Content Section */}
        <section className="py-32 bg-emerald-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/gallery_1.webp" 
                  alt="احتفالات اليوم الوطني السعودي - فعاليات رمضان الرياض" 
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-10">
                <h2 className="text-2xl md:text-4xl font-sans leading-tight font-bold">
                  الاحتفاء بـ <br/><span className="text-[var(--primary)]">الهوية السعودية</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "تنظيم فعاليات رمضان الرياض", desc: "نقدم تجارب إفطار وسحور فاخرة تجمع بين الأصالة والحداثة." },
                    { title: "احتفالات اليوم الوطني السعودي", desc: "تنظيم فعاليات وطنية كبرى تعزز روح الانتماء والفخر بالوطن." },
                    { title: "فعاليات العيد الرياض", desc: "إدارة احتفالات العيد للشركات والعائلات بأعلى معايير الرفاهية." },
                    { title: "فعاليات يوم التأسيس السعودي", desc: "تسليط الضوء على الإرث التاريخي للمملكة من خلال فعاليات تراثية مبتكرة." },
                  ].map((local: any, idx: number) => (
                    <div key={idx} className="border-e-2 border-[var(--primary)] pe-6">
                      <h4 className="text-xl font-bold mb-2">{local.title}</h4>
                      <p className="text-slate-600 text-sm font-light">{local.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-2xl md:text-3xl font-sans text-slate-900 font-bold">Cultural <span className="text-[var(--primary)]">Insights</span></h2>
              <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs">Answering your questions about KSA Seasonal Events</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What should I know about planning events during Ramadan in Saudi Arabia?", a: "Planning requires deep cultural understanding. Event timings shift to late night (Suhoor), and decor emphasizes traditional hospitality. As a top Ramadan event planner KSA, Saudi Event Management creates authentic, high-end experiences." },
                { q: "We want to do a Ramadan iftar activation for our brand in Riyadh. Where do we start?", a: "Start with a culturally resonant concept. We help you design the activation, secure premium mall or hotel space, and execute flawlessly." },
                { q: "How to organize a National Day celebration for our company?", a: "Focus on patriotic themes, early venue coordination, and secure necessary GEA permits. As your National Day event organizer Riyadh, we handle everything from green-themed decor to traditional entertainment." },
                { q: "Can you manage Eid celebrations as well?", a: "Yes, we are a leading Eid celebration company Saudi Arabia, specializing in both intimate luxury family gatherings and large-scale corporate Eid festivities." },
                { q: "What is special about Saudi Founding Day celebrations?", a: "It's a time to celebrate traditional 'Najdi' and regional Saudi heritage. Our events emphasize traditional hospitality, crafts, and historical storytelling." },
                { q: "Ramadan event company near me Saudi Arabia", a: "Saudi Event Management operates extensively across Saudi Arabia, offering immediate local expertise for any high-end Ramadan brand activation or corporate Iftar." },
                { q: "National Day party organizer Riyadh", a: "As a premier National Day party organizer Riyadh, Saudi Event Management specializes in creating large-scale patriotic events and community festivals that align with Vision 2030." }
              ].map((faq: any, i: number) => (
                <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">{faq.q}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Cultural Events Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AlUla Desert Festivals & Cultural Activations", slug: "alula-desert-festivals-cultural-activations", desc: "Discover how AlUla is leveraging its rich heritage to host world-class cultural events under Vision 2030." },
                { title: "Saudi National Day Event Ideas for Corporates", slug: "national-day-event-ideas-saudi-arabia-corporates", desc: "Creative corporate event ideas for Saudi National Day — patriotic galas, themed activations and GEA compliance." },
                { title: "Corporate Ramadan Event Planning Guide", slug: "ramadan-event-planning-guide-saudi-arabia", desc: "Complete guide to planning corporate iftar and suhoor events in Saudi Arabia." },
                { title: "Vision 2030 Redefining Saudi Arabia's Event Landscape", slug: "vision-2030-redefining-saudi-event-landscape", desc: "From NEOM to GEA, discover how Vision 2030 is creating transformative cultural experiences." },
                { title: "AlUla Events Guide: Maraya, Hegra & Desert Planning", slug: "alula-events-guide-maraya-hegra-desert", desc: "The definitive guide to planning events in AlUla — Maraya access, Hegra heritage events, and RCU permits." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Cultural Insight</span>
                  <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Read Article <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Related Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Luxury Weddings", slug: "weddings", desc: "Bespoke social celebrations including traditional Saudi ceremonies." },
                { title: "Corporate Events", slug: "corporate-events", desc: "National Day corporate galas and Vision 2030 event initiatives." },
                { title: "Destination Events", slug: "destination-events", desc: "AlUla, Diriyah, and heritage destination events across the Kingdom." },
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Private HNWI and royal family cultural celebrations." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{rel.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Learn More <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
