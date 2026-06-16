"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import { Speaker, Camera, Utensils, PenTool, Lightbulb, Map, Zap, Star, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductionVenuesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Full-Service Event Management",
        "serviceType": "Event Production",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Saudi Event Management",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          }
        },
        "areaServed": "Saudi Arabia",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Event Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AV Production" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stage Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Catering" } }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "156"
        }
      },
      {
        "@type": "Product",
        "name": "Luxury Event Venue Package",
        "description": "Exclusive venue rental and full-service coordination in Riyadh.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "SAR",
          "price": "75000",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What AV equipment do I need for a 500-person conference in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 500-person conference typically requires a line array audio system, multiple LED screens or a central ultra-wide display, confidence monitors, and professional lighting. Saudi Event Management is a premier AV company for events KSA, supplying and managing all technical needs."
            }
          },
          {
            "@type": "Question",
            "name": "Can you recommend event caterers in Jeddah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we partner with top-tier culinary teams, including those at Rosewood Jeddah. We can provide customized event catering quotes Saudi Arabia based on your guest count and preference for traditional or international menus."
            }
          },
          {
            "@type": "Question",
            "name": "What event decoration styles are popular in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Popular styles blend futuristic minimalism with traditional Najdi or Hejazi geometric patterns. Clients often request lush floral arches, architectural lighting, and bespoke Majlis seating areas."
            }
          },
          {
            "@type": "Question",
            "name": "event venue near me Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management provides exclusive access and booking support when you need an elite event venue near me Riyadh for corporate or social gatherings."
            }
          },
          {
            "@type": "Question",
            "name": "catering company for events Jeddah",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As a top-tier catering company for events Jeddah, we partner with five-star culinary teams to deliver exceptional dining experiences along the Red Sea."
            }
          },
          {
            "@type": "Question",
            "name": "AV production near me Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For clients seeking AV production near me Saudi Arabia, Saudi Event Management offers concert-grade audio and cinematic visual setups across the Kingdom."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Event Services & Venues", "item": "https://saudieventmanagement.com/services/production-venues" }
        ]
      },
      {
        "@type": "Organization",
        "name": "Saudi Event Management Event Services",
        "description": "Leading technical production partner for KAICC and RECC summits in Saudi Arabia.",
        "memberOf": {
          "@type": "Organization",
          "name": "KAEC Strategic Service Network"
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
      <main className="min-h-screen bg-white">
        <Navbar />

        <InternalPageHero
          title="Event Services & Venue Sourcing"
          titleHighlight="Saudi Arabia"
          subtitle="Venue sourcing, AV production, staging, catering, and media under one roof — with access to KAICC, RECC, and leading event venues across Riyadh, Jeddah, and the Kingdom."
          backgroundImage="/services/neom_summit_people.webp"
          imageAlt="Event services Saudi Arabia — production venues and elite event spaces"
          badge="Venues & Production"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Event Services & Venues" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "ISO 9001", label: "Certified Quality Partners" },
            { value: "4.9/5", label: "From 156 Client Reviews" },
            { value: "Tier-1", label: "Vendor Status in KSA" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#services-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              Inquire for Services
            </Link>
            <a
              href="tel:+966501234567"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> Request a Venue Walkthrough
            </a>
          </div>
        </div>

        {/* E-E-A-T & Vendor Partnerships */}
        <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Star className="text-[var(--primary)]" size={22} />
                </div>
                <div>
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">ISO 9001 Certified</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Quality Management Partners</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>MADINAT AL FAISALIAH</span>
                <span>JW MARRIOTT</span>
                <span>RITZ-CARLTON</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                &quot;Tier-1 Vendor Status in Saudi Arabia&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                Full-Service Event Production
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Our production <span className="text-[var(--primary)]">services</span>
              </h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                Venue sourcing, AV, staging, catering and media — a single in-house team for every
                technical and hospitality element of your event.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Speaker, title: "AV Production", desc: "ISO-certified audio visual production events for KAICC level summits. Concert-grade audio and cinematic LED visuals." },
                { icon: Map, title: "Venue Sourcing", desc: "Expert venue sourcing Saudi Arabia, granting exclusive access to the finest event venue Riyadh and KAEC options." },
                { icon: Zap, title: "Stage Design", desc: "Award-winning event staging at Madinat Al Faisaliah. Immersive architectural environments for high-profile events." },
                { icon: Utensils, title: "Luxury Catering", desc: "Exquisite event catering Saudi Arabia. Partnered with Rosewood Jeddah for five-star dining experiences." },
                { icon: PenTool, title: "Event Decoration", desc: "Bespoke event decoration Jeddah, providing robust event infrastructure and utilizing 2025 KSA design trends." },
                { icon: Camera, title: "Media Production", desc: "Professional event photography and cinematic videography for KAICC and KAFD gatherings." },
                { icon: Lightbulb, title: "Lighting Artistry", desc: "Dynamic event lighting Riyadh services, specialized in creating mood for grand ballrooms." },
                { icon: Star, title: "VIP Hospitality", desc: "VIP guest management, concierge services, and dependable event logistics across KSA at Ritz-Carlton and other leading venues." },
              ].map((service: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.08 }}
                  className="bg-white border border-neutral-200/80 p-7 rounded-2xl hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors">
                    <service.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{service.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-24 md:py-28 bg-white border-b border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <span className="section-label">
                  <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                  Production Hub
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">Technical <br/><span className="text-[var(--primary)]">guides</span></h2>
                <p className="text-neutral-500 text-sm leading-relaxed">Technical guides and design trends for executing world-class events in the Kingdom.</p>
                <div className="pt-6 border-t border-neutral-200">
                  <p className="text-neutral-900 font-bold text-sm">Fahad Al-Sulaiman</p>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-widest">Head of Production</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Complete guide to event services in Saudi Arabia", desc: "From AV technical riders to catering licenses: navigating the KSA service landscape." },
                  { title: "Top event venues in Riyadh 2025", desc: "An exclusive look at KAICC, Ritz-Carlton, and the future of venue spaces in KAFD." },
                  { title: "AV production guide for Saudi events", desc: "Optimizing sound, light, and visual technology for grand-scale ballroom environments." },
                  { title: "Event decoration trends in KSA 2025", desc: "Exploring the fusion of traditional Saudi motifs with futuristic minimalism." }
                ].map((post: any, idx: number) => (
                  <div key={idx} className="p-6 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl hover:border-[var(--primary)]/30 hover:shadow-[0_8px_30px_rgba(13,107,78,0.07)] transition-all cursor-pointer group">
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Content */}
        <section className="py-24 md:py-28 bg-[var(--surface-tinted)] border-b border-emerald-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  خدمات <br/><span className="text-[var(--primary)]">عالمية المستوى</span>
                </h2>
                <div className="space-y-5">
                  <div className="p-6 bg-white border-s-4 border-[var(--primary)] rounded-e-xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                    <h3 className="text-lg font-bold mb-2 text-neutral-900">أماكن فعاليات الرياض</h3>
                    <p className="text-neutral-600 text-sm">نقدم أفضل خيارات القاعات والمساحات الخارجية الفاخرة التي تناسب تطلعاتكم.</p>
                  </div>
                  <div className="p-6 bg-white border-s-4 border-[var(--primary)] rounded-e-xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                    <h3 className="text-lg font-bold mb-2 text-neutral-900">شركة إنتاج صوت وصورة الرياض</h3>
                    <p className="text-neutral-600 text-sm">أحدث التقنيات في الصوت والإضاءة والشاشات لضمان تجربة بصرية مذهلة.</p>
                  </div>
                  <div className="p-6 bg-white border-s-4 border-[var(--primary)] rounded-e-xl shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
                    <h3 className="text-lg font-bold mb-2 text-neutral-900">تصميم وديكور فعاليات جدة</h3>
                    <p className="text-neutral-600 text-sm">نبتكر تصاميم وديكورات تعكس هوية الفعالية وتضيف لمسة من الأناقة.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                <Image
                  src="/services/gallery_corporate_gala.webp"
                  alt="خدمات الفعاليات السعودية - أماكن فعاليات الرياض"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD FORM / SERVICES ENQUIRY ── */}
        <section id="services-enquiry" className="py-24 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a3d2c 0%, #064E3B 55%, #0D6B4E 100%)" }}>
          <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-white/[0.04] pointer-events-none" />
          <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-white/[0.03] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> Request a Service Quote
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  One team for venue, <br />
                  <span className="text-[#C5A880]">AV, catering &amp; production.</span>
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  Tell us your venue, guest count, and technical needs. Our production team returns a
                  recommended venue, equipment plan, and an itemised quote within two hours.
                </p>
                <ul className="space-y-3.5 pt-2">
                  {[
                    "Exclusive venue access — KAICC, RECC & KAEC",
                    "Concert-grade AV, staging & lighting",
                    "Five-star catering & VIP hospitality",
                    "Cinematic media production & coverage",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20a%20quote%20for%20event%20production%20and%20venue%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> Or message us on WhatsApp
                </a>
              </div>
              <ServiceLeadForm
                source="production_venues_page"
                defaultEventType="Event Production / Technical"
                eyebrow="Services Enquiry"
                heading="Request your service quote"
                subheading="Our production team will respond within 2 hours with a venue and technical plan."
                submitLabel="Request Service Quote"
                eventTypeOptions={[
                  "Venue Sourcing & Rental",
                  "AV & Technical Production",
                  "Stage Design & Build",
                  "Luxury Catering",
                  "Lighting & Decor",
                  "Full-Service Package",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Price Specification Section */}
        <section className="py-24 md:py-28 bg-neutral-50/70 border-b border-neutral-200/70">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Investment <span className="text-[var(--primary)]">guide</span></h2>
              <p className="text-neutral-400 mt-4 uppercase tracking-[0.3em] text-[10px]">Estimated 2025 Service Rates in Saudi Arabia</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-neutral-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.06)]">
              <table className="w-full text-start min-w-[560px]">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-8 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-start">Service Category</th>
                    <th className="px-8 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-start">Starting Investment</th>
                    <th className="px-8 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-start">Key Inclusions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[
                    { category: "AV Production", price: "SAR 15,000", inclusions: "Audio, Lighting, Technical Crew" },
                    { category: "Stage Design & Build", price: "SAR 35,000", inclusions: "3D Renders, Fabrication, Install" },
                    { category: "Luxury Catering", price: "SAR 450 / Guest", inclusions: "Live Stations, Staffing, Silverware" },
                    { category: "Venue Rental", price: "SAR 50,000", inclusions: "Location, Security, Basic Setup" },
                    { category: "Event Media", price: "SAR 8,500", inclusions: "Photography, Cinematic Highlights" },
                  ].map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="px-8 py-5 text-neutral-900 font-semibold">{row.category}</td>
                      <td className="px-8 py-5 text-[var(--primary)] font-bold">{row.price}</td>
                      <td className="px-8 py-5 text-neutral-500 text-sm">{row.inclusions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center text-neutral-900">Service <span className="text-[var(--primary)]">queries</span></h2>
            <div className="space-y-4">
              {[
                { q: "What AV equipment do I need for a 500-person conference in Riyadh?", a: "A 500-person conference requires a robust line array sound system, at least two large LED display walls, lavalier mics, and a multi-camera live switching setup. As a leading AV company for events KSA, Saudi Event Management provides complete technical specifications tailored to your venue." },
                { q: "Can you recommend event caterers in Jeddah?", a: "Absolutely. We hold exclusive partnerships with elite culinary teams, including executive chefs at the Rosewood Jeddah. We can quickly provide detailed event catering quotes Saudi Arabia for everything from VIP plated dinners to massive corporate buffets." },
                { q: "What event decoration styles are popular in Saudi Arabia?", a: "The current trend fuses futuristic minimalism with traditional heritage. Think sleek metallic accents paired with traditional Najdi geometric patterns, ambient architectural lighting, and opulent, fragrant floral installations." },
                { q: "What is included in full-service event management in KSA?", a: "Saudi Event Management's full-service model covers everything from venue scouting and creative design to AV production, catering, and on-site event execution." },
                { q: "How to choose an event venue in Riyadh?", a: "We analyze your event's theme, guest list, and technical needs to facilitate the ideal event venue rental Riyadh, whether it's a 5-star hotel or an exclusive desert retreat." },
                { q: "event venue near me Riyadh", a: "Saudi Event Management operates locally in Riyadh, granting you immediate, exclusive access to the city's most sought-after palaces, hotels, and exhibition centers." },
                { q: "catering company for events Jeddah", a: "We manage high-end catering logistics on the West Coast, ensuring your Jeddah events feature world-class gastronomy and impeccable service." },
                { q: "AV production near me Saudi Arabia", a: "With operations across the Kingdom, Saudi Event Management provides localized, concert-grade AV production and technical support wherever your event takes place." }
              ].map((faq: any, i: number) => (
                <div key={i} className="bg-neutral-50/80 border border-neutral-200/80 p-7 rounded-2xl">
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                Real-World Production
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Production challenges — <span className="text-[var(--primary)]">and how we solve them</span>
              </h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">
                Delivering technical production across hotels, convention centres, and remote desert venues raises recurring problems. Here is how our team plans around them.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { c: "Venue power & rigging limits", s: "Many ballrooms and heritage sites were never built for concert-grade loads. We conduct a technical site survey early, then spec generators, clean power distribution, and certified rigging so the venue's limits never cap the production." },
                { c: "Tight load-in and changeover windows", s: "When a venue hosts back-to-back events, set-up time is brutal. Pre-built modular staging, labelled cable looms, and a rehearsed crew call sheet let us load in, test, and strike inside the window." },
                { c: "Multi-vendor accountability gaps", s: "AV, catering, décor, and venue teams pointing fingers is the classic failure mode. With every discipline owned in-house under one production director, there is a single point of accountability." },
                { c: "Remote-venue logistics (AlUla, desert)", s: "Off-grid sites need power, climate control, and redundancy. We plan silent generators, battery backup, and spare-kit contingencies so a desert gala runs as reliably as a five-star ballroom." },
              ].map((item) => (
                <div key={item.c} className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Challenge</span>
                  <h3 className="font-bold text-neutral-900 text-base mt-1 mb-3">{item.c}</h3>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-neutral-600 text-sm leading-relaxed">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">Related Services</h3>
              <Link href="/services" className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">View all services <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Event Production", slug: "event-production", desc: "Dedicated technical production — stage, AV, lighting, and LED." },
                { title: "Conference Management", slug: "conferences", desc: "Full PCO services integrating AV and catering for seamless delivery." },
                { title: "Corporate Events", slug: "corporate-events", desc: "End-to-end corporate event planning with in-house production." },
                { title: "Exhibitions & Trade Shows", slug: "exhibitions", desc: "Venue sourcing and AV production for B2B expos and trade shows." },
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

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Production In Action — Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Global Tech Summit", slug: "global-tech-summit", desc: "Main-stage AV, LED walls, and live switching for a multi-day technology conference." },
                { title: "Executive Summit Jeddah", slug: "executive-summit-jeddah", desc: "Full ballroom production, staging, and hospitality for a senior executive gathering." },
                { title: "AlUla Desert Festival", slug: "alula-desert-festival", desc: "Off-grid staging, power, and lighting for a large-scale desert heritage event." },
              ].map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">View Project <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-8">
              <div>
                <h3 className="text-slate-900 font-bold text-lg">Need a venue and production plan?</h3>
                <p className="text-gray-500 text-sm mt-1">Book a free consultation or request a venue walkthrough — our production team replies within two hours.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/consultation" className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">Book a Free Consultation</Link>
                <Link href="/contact" className="px-6 py-3 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">Contact Us</Link>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-6">Explore our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link> or our dedicated <Link href="/services/event-production" className="text-[var(--primary)] font-semibold hover:underline">event production service</Link>.</p>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Venue & Production Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Event Production Cost Guide Saudi Arabia 2026", slug: "event-production-cost-guide-saudi-arabia-2026", desc: "2026 pricing guide for AV, stage, LED walls, lighting rigs, and projection mapping in Riyadh and Jeddah." },
                { title: "Best Corporate Event Venues in Riyadh 2026", slug: "best-corporate-event-venues-riyadh-2026", desc: "Rank-ordered guide to Riyadh's top corporate event venues — capacity, AV specs, and booking timelines." },
                { title: "The Future of Event Production in Saudi Arabia", slug: "future-event-production-saudi-arabia-technology-sustainability", desc: "How event production in Saudi Arabia is evolving with cutting-edge technology and sustainable practices." },
                { title: "AlUla Events Guide: Maraya, Hegra & Desert Planning", slug: "alula-events-guide-maraya-hegra-desert", desc: "The definitive guide to planning events in AlUla — Maraya access, Hegra heritage events, and RCU permits." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Production Guide</span>
                  <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Read Article <ChevronRight size={12} /></span>
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
