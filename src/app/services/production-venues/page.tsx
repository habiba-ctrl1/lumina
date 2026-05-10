"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Speaker, Camera, Utensils, PenTool, Lightbulb, Map, Zap, Star } from "lucide-react";
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
      <main className="min-h-screen bg-charcoal-950 text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/gallery_wedding_reception.webp" 
              alt="Event services Saudi Arabia - Event venue Riyadh" 
              fill 
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/20" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold-500 text-sm uppercase tracking-[0.6em] font-bold mb-6 block"
            >
              خدمات الفعاليات والأماكن | Production Mastery
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-sans text-white mb-8 leading-tight font-bold"
            >
              Exquisite <span className="font-bold text-gold-500">Services</span> <br/>
              & <span className="text-shimmer font-bold">Elite Venues</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Exclusive access to <strong className="text-white">KAICC</strong>, <strong className="text-white">RECC</strong>, and the prestigious <strong className="text-white">King Abdullah Economic City (KAEC)</strong>. We streamline your <strong className="text-white">event venue rental Riyadh</strong> and <strong className="text-white">venue sourcing Saudi Arabia</strong> processes. Delivering comprehensive <strong className="text-white">production services events Saudi</strong>, from <strong className="text-white">audio visual production events</strong> to complex <strong className="text-white">event logistics KSA</strong>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="inline-block px-12 py-5 bg-gold-500 text-charcoal-950 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
              >
                Inquire for Services
              </Link>
            </motion.div>
          </div>
        </section>

        {/* E-E-A-T & Vendor Partnerships */}
        <section className="py-12 border-y border-white/5 bg-charcoal-900/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Star className="text-gold-500" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-widest">ISO 9001 Certified</p>
                  <p className="text-[10px] text-gray-500 uppercase">Quality Management Partners</p>
                </div>
              </div>
              <div className="flex items-center gap-8 grayscale opacity-50 text-[10px] font-bold tracking-[0.2em]">
                <span>MADINAT AL FAISALIAH</span>
                <span>JW MARRIOTT</span>
                <span>RITZ-CARLTON</span>
              </div>
              <div className="text-xs text-gold-500 font-bold  tracking-widest uppercase border-l border-white/10 pl-8">
                &quot;Tier-1 Vendor Status in Saudi Arabia&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-32 bg-charcoal-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Speaker, title: "AV Production", desc: "ISO-certified audio visual production events for KAICC level summits. Concert-grade audio and cinematic LED visuals." },
                { icon: Map, title: "Venue Sourcing", desc: "Expert venue sourcing Saudi Arabia, granting exclusive access to the finest event venue Riyadh and KAEC options." },
                { icon: Zap, title: "Stage Design", desc: "Award-winning event staging at Madinat Al Faisaliah. Immersive architectural environments for high-profile events." },
                { icon: Utensils, title: "Luxury Catering", desc: "Exquisite event catering Saudi Arabia. Partnered with Rosewood Jeddah for five-star dining experiences." },
                { icon: PenTool, title: "Event Decoration", desc: "Bespoke event decoration Jeddah, providing robust event infrastructure and utilizing 2025 KSA design trends." },
                { icon: Camera, title: "Media Production", desc: "Professional event photography and cinematic videography for KAICC and KAFD gatherings." },
                { icon: Lightbulb, title: "Lighting Artistry", desc: "Dynamic event lighting Riyadh services, specialized in creating mood for grand ballrooms." },
                { icon: Star, title: "Elite Hospitality", desc: "VIP guest management, concierge services, and flawless event logistics KSA at Ritz-Carlton venues." },
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-gold-500/10 group-hover:border-gold-500/50 transition-all duration-500">
                    <service.icon size={24} className="text-gold-500" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-24 bg-charcoal-950 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-white">Production <br/><span className="text-gold-500">Hub</span></h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Technical guides and design trends for executing world-class events in the Kingdom.</p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">Fahad Al-Sulaiman</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Head of Production</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Complete guide to event services in Saudi Arabia", desc: "From AV technical riders to catering licenses: navigating the KSA service landscape." },
                  { title: "Top event venues in Riyadh 2025", desc: "An exclusive look at KAICC, Ritz-Carlton, and the future of venue spaces in KAFD." },
                  { title: "AV production guide for Saudi events", desc: "Optimizing sound, light, and visual technology for grand-scale ballroom environments." },
                  { title: "Event decoration trends in KSA 2025", desc: "Exploring the fusion of traditional Saudi motifs with futuristic minimalism." }
                ].map((post, idx) => (
                  <div key={idx} className="p-8 bg-charcoal-900 rounded-2xl hover:bg-gold-500/5 transition-all cursor-pointer group">
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-gold-500 transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Content */}
        <section className="py-32 bg-white text-charcoal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-sans text-charcoal-950 font-bold">
                  خدمات <br/><span className="text-gold-600">عالمية المستوى</span>
                </h2>
                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 border-l-4 border-gold-500">
                    <h4 className="text-xl font-bold mb-2">أماكن فعاليات الرياض</h4>
                    <p className="text-gray-600 text-sm">نقدم أفضل خيارات القاعات والمساحات الخارجية الفاخرة التي تناسب تطلعاتكم.</p>
                  </div>
                  <div className="p-8 bg-gray-50 border-l-4 border-gold-500">
                    <h4 className="text-xl font-bold mb-2">شركة إنتاج صوت وصورة الرياض</h4>
                    <p className="text-gray-600 text-sm">أحدث التقنيات في الصوت والإضاءة والشاشات لضمان تجربة بصرية مذهلة.</p>
                  </div>
                  <div className="p-8 bg-gray-50 border-l-4 border-gold-500">
                    <h4 className="text-xl font-bold mb-2">تصميم وديكور فعاليات جدة</h4>
                    <p className="text-gray-600 text-sm">نبتكر تصاميم وديكورات تعكس هوية الفعالية وتضيف لمسة من الأناقة.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/gallery_corporate_gala.webp" 
                  alt="خدمات الفعاليات السعودية - أماكن فعاليات الرياض" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Price Specification Section */}
        <section className="py-32 bg-charcoal-900 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">Investment <span className="text-gold-500">Guide</span></h2>
              <p className="text-gray-500 mt-4 uppercase tracking-[0.4em] text-[10px]">Estimated 2025 Service Rates in Saudi Arabia</p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-charcoal-950 shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-8 py-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Service Category</th>
                    <th className="px-8 py-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Starting Investment</th>
                    <th className="px-8 py-6 text-gold-500 uppercase tracking-widest text-xs font-bold">Key Inclusions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { category: "AV Production", price: "SAR 15,000", inclusions: "Audio, Lighting, Technical Crew" },
                    { category: "Stage Design & Build", price: "SAR 35,000", inclusions: "3D Renders, Fabrication, Install" },
                    { category: "Luxury Catering", price: "SAR 450 / Guest", inclusions: "Live Stations, Staffing, Silverware" },
                    { category: "Venue Rental", price: "SAR 50,000", inclusions: "Location, Security, Basic Setup" },
                    { category: "Event Media", price: "SAR 8,500", inclusions: "Photography, Cinematic Highlights" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6 text-white font-medium">{row.category}</td>
                      <td className="px-8 py-6 text-gold-500 font-bold">{row.price}</td>
                      <td className="px-8 py-6 text-gray-500 text-sm font-light">{row.inclusions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white text-charcoal-950">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-sans mb-16 text-center font-bold">Service <span className="text-gold-600">Queries</span></h2>
            <div className="space-y-6">
              {[
                { q: "What AV equipment do I need for a 500-person conference in Riyadh?", a: "A 500-person conference requires a robust line array sound system, at least two large LED display walls, lavalier mics, and a multi-camera live switching setup. As a leading AV company for events KSA, Saudi Event Management provides complete technical specifications tailored to your venue." },
                { q: "Can you recommend event caterers in Jeddah?", a: "Absolutely. We hold exclusive partnerships with elite culinary teams, including executive chefs at the Rosewood Jeddah. We can quickly provide detailed event catering quotes Saudi Arabia for everything from VIP plated dinners to massive corporate buffets." },
                { q: "What event decoration styles are popular in Saudi Arabia?", a: "The current trend fuses futuristic minimalism with traditional heritage. Think sleek metallic accents paired with traditional Najdi geometric patterns, ambient architectural lighting, and opulent, fragrant floral installations." },
                { q: "What is included in full-service event management in KSA?", a: "Saudi Event Management's full-service model covers everything from venue scouting and creative design to AV production, catering, and on-site event execution." },
                { q: "How to choose an event venue in Riyadh?", a: "We analyze your event's theme, guest list, and technical needs to facilitate the ideal event venue rental Riyadh, whether it's a 5-star hotel or an exclusive desert retreat." },
                { q: "event venue near me Riyadh", a: "Saudi Event Management operates locally in Riyadh, granting you immediate, exclusive access to the city's most sought-after palaces, hotels, and exhibition centers." },
                { q: "catering company for events Jeddah", a: "We manage high-end catering logistics on the West Coast, ensuring your Jeddah events feature world-class gastronomy and impeccable service." },
                { q: "AV production near me Saudi Arabia", a: "With operations across the Kingdom, Saudi Event Management provides localized, concert-grade AV production and technical support wherever your event takes place." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-8">
                  <h3 className="text-xl font-bold mb-4">{faq.q}</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
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
