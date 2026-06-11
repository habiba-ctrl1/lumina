"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Heart, Stars, MapPin, Sparkles, Utensils, Music, Camera, Gift, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Metadata cannot be exported from a client component in Next.js 13+ app dir
// So we move it to a separate layout or just skip it if this is a client page.
// However, for SEO, it's better to have it in a parent layout or a server wrapper.
// For now, I will keep the JSON-LD which is great for SEO and move metadata to a separate file if needed.
// Actually, I can use a separate server component for metadata.

export default function WeddingsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Luxury Wedding Planning Saudi Arabia",
        "serviceType": "Wedding Event Management",
        "description": "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Saudi Event Management",
          "image": "https://saudieventmanagement.com/wedding.webp",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          },
          "telephone": "+966501234567"
        },
        "areaServed": ["Riyadh", "Jeddah", "Dammam", "KSA"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Wedding Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Luxury Wedding Package Jeddah 2025"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the best wedding planners in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best wedding planners in Riyadh combine extensive local expertise with luxury design capabilities. Saudi Event Management is widely recognized as a top-tier choice for elite celebrations, offering access to exclusive venues and premium vendors."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a Saudi wedding cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The cost of a Saudi wedding varies greatly depending on the scale and luxury level. High-end luxury weddings can range from SAR 150,000 to over SAR 1,000,000, factoring in custom decor, premium venues, and exclusive catering."
            }
          },
          {
            "@type": "Question",
            "name": "Which hotels are best for weddings in Jeddah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jeddah boasts spectacular wedding venues. The best hotels for weddings include the Ritz-Carlton Jeddah, Park Hyatt Jeddah, and the Waldorf Astoria (Qasr Al Sharq), offering breathtaking Red Sea views and grand, luxurious ballrooms."
            }
          },
          {
            "@type": "Question",
            "name": "Is a wedding coordinator different from a wedding planner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, a wedding planner handles the entire process from concept to execution (often 6-12 months), while a coordinator typically manages the logistics in the final weeks and on the day of the event."
            }
          },
          {
            "@type": "Question",
            "name": "wedding planner near me Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management provides elite services for clients searching for a wedding planner near me Riyadh, specializing in both traditional and contemporary designs."
            }
          },
          {
            "@type": "Question",
            "name": "who plans weddings in Jeddah Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is the premier answer to who plans weddings in Jeddah Saudi Arabia, utilizing stunning Red Sea venues for unforgettable celebrations."
            }
          },
          {
            "@type": "Question",
            "name": "best wedding company Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consistently ranked as the best wedding company Saudi Arabia, Saudi Event Management excels in delivering high-end, customized experiences for our clients."
            }
          }
        ]
      },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Al-Saud"
      },
      "reviewBody": "Saudi Event Management made my dream wedding in Riyadh a reality. Their attention to detail and traditional Saudi touches were perfect."
    },
    {
      "@type": "Event",
      "name": "Grand Saudi Wedding Showcase 2025",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2025-10-15T19:00",
      "endDate": "2025-10-15T23:00",
      "location": {
        "@type": "Place",
        "name": "The Ritz-Carlton, Riyadh",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Hada Area",
          "addressLocality": "Riyadh",
          "addressRegion": "Riyadh",
          "postalCode": "11493",
          "addressCountry": "SA"
        }
      },
      "image": "https://saudieventmanagement.com/wedding.webp",
      "description": "An exclusive showcase of luxury wedding trends and traditional Saudi elegance organized by Saudi Event Management.",
      "organizer": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com"
      },
      "offers": {
        "@type": "Offer",
        "name": "Wedding Planning Consultation",
        "price": "0",
        "priceCurrency": "SAR",
        "url": "https://saudieventmanagement.com/contact",
        "availability": "https://schema.org/InStock"
      },
      "performer": {
        "@type": "Organization",
        "name": "Saudi Event Management"
      }
    },
    {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management"
      },
      "ratingValue": "4.9",
      "reviewCount": "120"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Weddings & Social Events", "item": "https://saudieventmanagement.com/services/weddings" }
      ]
    },
    {
      "@type": "Organization",
      "name": "Saudi Event Management Luxury Weddings",
      "description": "Aligning with the Saudi Tourism Authority to showcase the Kingdom's finest wedding destinations.",
      "memberOf": {
        "@type": "Organization",
        "name": "Ministry of Culture Creative Network"
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
          title="Luxury Wedding Planner"
          titleHighlight="Saudi Arabia"
          subtitle="Elite luxury wedding planning in Riyadh and Jeddah — royal weddings, traditional Nikah ceremonies, and VIP receptions at the Kingdom's most prestigious venues."
          backgroundImage="/luxury_wedding_couple_guests.webp"
          imageAlt="Luxury wedding planner Saudi Arabia"
          badge="حفلات الزفاف | Luxury Weddings"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Weddings" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-100 py-6">
          <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-block px-12 py-5 bg-[var(--primary)] text-slate-900 font-bold uppercase tracking-widest hover:bg-[var(--primary)] transition-all shadow-2xl"
            >
              Start Planning Your Dream
            </Link>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Three-image wedding showcase mosaic */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/wedding_stage_backdrop_decor.webp"
                    alt="Elegant wedding stage backdrop with white arches neon sign and floral decor Saudi Arabia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/gallery_wedding_reception.webp"
                      alt="Luxury wedding reception hall decoration by Saudi Event Management"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/luxury_wedding_table_setting.webp"
                      alt="Premium gold-rimmed wedding table setting with crystal glasses and floral centrepiece"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-sans text-slate-900 leading-tight font-bold">
                  Crafting the Best <br/><span className="text-[var(--primary)]">Wedding Experience</span> in Riyadh
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  As the premier <strong className="text-slate-900">wedding planner in Saudi Arabia</strong> for over 15 years, Saudi Event Management specializes in transforming your vision into an editorial masterpiece. Our portfolio includes exclusive celebrations at the <strong className="text-slate-900">Ritz-Carlton Riyadh</strong>, <strong className="text-slate-900">Four Seasons</strong>, and the iconic <strong className="text-slate-900">Al-Khayala</strong> venues.
                </p>
                <div className="grid grid-cols-2 gap-10 pt-8">
                  <div>
                    <h4 className="text-[var(--primary)] font-bold mb-2">مخططة أفراح السعودية</h4>
                    <p className="text-sm text-gray-500 font-light">Unrivaled expertise in traditional Saudi wedding traditions and modern luxury.</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--primary)] font-bold mb-2">Venue Partnerships</h4>
                    <p className="text-sm text-gray-500 font-light">Preferred planning partner for JW Marriott Riyadh and InterContinental Jeddah.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T & Portfolio Highlights */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-12">
              <div className="flex items-center gap-10">
                <div className="text-3xl font-sans text-[var(--primary)] font-bold">15+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-600">Years in <br/>Saudi Market</div>
              </div>
              <div className="flex gap-10 grayscale opacity-40">
                <span className="text-xs font-bold tracking-widest">FOUR SEASONS</span>
                <span className="text-xs font-bold tracking-widest">RITZ-CARLTON</span>
                <span className="text-xs font-bold tracking-widest">JW MARRIOTT</span>
              </div>
              <div className="text-sm text-gray-500 font-light ">
                &quot;Award-winning planning excellence for the Kingdom&apos;s elite.&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20">
            <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-8 block">Our Expertise</span>
            <h2 className="text-2xl md:text-4xl font-sans text-slate-900 font-bold">Social Event <span className="text-[var(--primary)]">Planning</span></h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Heart, title: "Engagement Party", desc: "Elegant engagement celebration planning in KSA for intimate or grand gatherings." },
                { icon: Sparkles, title: "Henna Nights", desc: "Authentic henna party organizer in Saudi Arabia with a modern luxurious twist." },
                { icon: Stars, title: "Graduation Parties", desc: "Premium graduation party Riyadh planning for celebrating milestones in style." },
                { icon: MapPin, title: "Social Events", desc: "Comprehensive social event planning Jeddah for all your private celebrations." },
                { icon: Utensils, title: "Gourmet Catering", desc: "World-class menus tailored to your cultural and personal preferences." },
                { icon: Music, title: "Entertainment", desc: "Exclusive access to top artists, DJs, and flawless Zaffa planning KSA." },
                { icon: Camera, title: "Media Production", desc: "Cinematic photography and videography to capture every moment." },
                { icon: Gift, title: "Floral Design", desc: "Custom-made arrangements from the best wedding decoration company in Saudi Arabia." },
              ].map((service: any, i: number) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 group">
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--primary)] transition-colors">
                    <service.icon size={28} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-slate-900 mb-8">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-32 bg-white relative border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-slate-900">Bridal <br/><span className="text-[var(--primary)]">Resources</span></h3>
                <p className="text-gray-500 text-sm font-normal leading-relaxed">Expert advice for navigating the luxury wedding landscape in the Kingdom.</p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-bold text-sm">Fatima Al-Rashid</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Senior Wedding Consultant</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { title: "Real wedding stories & photo essays", desc: "Explore our gallery of breathtaking recent celebrations across Riyadh and Jeddah." },
                  { title: "Price guide for Saudi weddings 2025", desc: "A comprehensive breakdown of luxury wedding costs, from elite venues to custom florals." },
                  { title: "Wedding vendor directory Saudi Arabia", desc: "Our exclusive network of the Kingdom's finest caterers, designers, and entertainers." },
                  { title: "Saudi wedding trends 2025", desc: "Discover the latest in bridal fashion, cinematic media, and immersive decor." }
                ].map((post: any, idx: number) => (
                  <div key={idx} className="p-8 bg-white rounded-2xl hover:bg-gold-50 transition-colors cursor-pointer group">
                    <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-normal leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Focus Section */}
        <section className="py-32 bg-emerald-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl md:text-4xl font-sans mb-16 font-bold">
              نصمم <span className="text-[var(--primary)]">أجمل اللحظات</span> في المملكة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">مخطط أفراح الرياض</h3>
                <p className="text-slate-600 font-normal">إدارة حفلات الزفاف الفاخرة في قلب العاصمة مع اهتمام بأدق التفاصيل.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">شركة تنظيم حفلات جدة</h3>
                <p className="text-slate-600 font-normal">تنظيم مناسبات اجتماعية راقية على ساحل البحر الأحمر بأسلوب عصري.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">حفلات الأعراس الدمام</h3>
                <p className="text-slate-600 font-normal">خبرة واسعة في تنظيم الأعراس والمناسبات الكبرى في المنطقة الشرقية.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-2xl font-sans text-slate-900 font-bold">Common <span className="text-[var(--primary)]">Inquiries</span></h2>
              <p className="text-gray-500 mt-4">Everything you need to know about planning your Saudi wedding.</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What are the best wedding planners in Riyadh?", a: "The best wedding planners in Riyadh offer a seamless blend of cultural authenticity and modern luxury. Saudi Event Management is highly rated for transforming high-profile venues like the Ritz-Carlton into personalized masterpieces." },
                { q: "How much does a Saudi wedding cost?", a: "A luxury Saudi wedding typically ranges from SAR 150,000 to upwards of SAR 1,000,000. This includes premium venue sourcing, custom floral designs, and world-class entertainment and catering." },
                { q: "Which hotels are best for weddings in Jeddah?", a: "The Ritz-Carlton Jeddah, Park Hyatt, and Waldorf Astoria are among the best hotels for weddings in Jeddah. We specialize in securing these exclusive Red Sea venues with preferred rates." },
                { q: "wedding planner near me Riyadh", a: "Saudi Event Management is strategically based in Riyadh, ensuring you always have immediate, hands-on support for your personalized wedding event." },
                { q: "who plans weddings in Jeddah Saudi Arabia", a: "We proudly plan and execute breathtaking weddings in Jeddah, providing a dedicated team of coastal luxury specialists." },
                { q: "best wedding company Saudi Arabia", a: "Known for our impeccable taste and operational excellence, Saudi Event Management is frequently called the best wedding company Saudi Arabia." },
                { q: "Is a wedding coordinator different from a wedding planner?", a: "A wedding planner manages the entire creative and logistical journey (often 6-12 months), while a coordinator focuses purely on the 'day-of' execution to ensure your plans run flawlessly." }
              ].map((faq: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
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
                { title: "Royal Weddings", slug: "royal-weddings", desc: "Nikah, Walima, Zaffa, and Laylat al-Henna — ceremonial excellence for distinguished Saudi families." },
                { title: "Destination Events", slug: "destination-events", desc: "Destination weddings in AlUla, NEOM, and the Red Sea coast." },
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Royal and HNWI event experiences with absolute discretion." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and floral production for any wedding scale." },
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

        {/* ── Wedding Planning Locations ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-widest">Where We Plan Weddings</h3>
            <p className="text-gray-500 text-sm mb-8">Luxury wedding planning services available across Saudi Arabia&apos;s premier destinations.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Wedding Planner Riyadh", href: "/locations/riyadh" },
                { name: "Wedding Planner Jeddah", href: "/locations/jeddah" },
                { name: "Wedding Planner Dammam", href: "/locations/dammam" },
                { name: "Destination Weddings AlUla", href: "/locations/alula" },
                { name: "Weddings Makkah", href: "/locations/makkah" },
              ].map((loc) => (
                <Link
                  key={loc.href}
                  href={loc.href}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">Wedding Planning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "How Much Does a Wedding Cost in Saudi Arabia? (2026 Guide)", slug: "exceptional-wedding-cost-saudi-arabia-guide", desc: "A comprehensive data-driven cost breakdown comparing Riyadh vs AlUla luxury weddings." },
                { title: "Why Saudi Arabia is the New Global Destination for Weddings", slug: "destination-wedding-planning-guide", desc: "From AlUla to NEOM, discover why Vision 2030 has transformed Saudi Arabia into the ultimate wedding destination." },
                { title: "Destination Weddings in AlUla & The Red Sea", slug: "destination-weddings-alula-red-sea", desc: "Crafting breathtaking desert ceremonies and Red Sea beachfront weddings in Saudi Arabia." },
                { title: "Best Wedding Venues in Jeddah 2026", slug: "best-wedding-venues-jeddah-2026", desc: "The complete guide to Jeddah's best wedding venues — waterfront ceremony spaces and exceptional hotel ballrooms." },
                { title: "Crafting Unforgettable Royal Weddings in Saudi Arabia", slug: "crafting-unforgettable-royal-weddings-saudi-arabia", desc: "Explore the essence of a royal Saudi wedding and how Vision 2030 is shaping grand celebrations." },
                { title: "2026 Event Color Trends: The Defining Palette", slug: "trending-colors-2026-event-palette", desc: "Discover the stunning color trends dominating events in 2026 — from AlUla sands to Red Sea blues." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Wedding Guide</span>
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
