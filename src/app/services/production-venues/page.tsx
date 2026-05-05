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
          "name": "Lumina Events",
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
            "name": "What services do event management companies provide in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Full-service agencies like Lumina provide venue sourcing, AV production, stage design, catering, décor, photography, and on-site logistics management across KSA."
            }
          },
          {
            "@type": "Question",
            "name": "How to choose an event venue in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consider guest capacity, location (like the Diplomatic Quarter or King Abdullah Financial District), technical infrastructure, and accessibility. We help you source the best event venue Riyadh has to offer."
            }
          },
          {
            "@type": "Question",
            "name": "What is included in full-service event management in KSA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It includes everything from conceptual design and budget planning to vendor management, production, and post-event analysis."
            }
          },
          {
            "@type": "Question",
            "name": "How much do AV services cost for events in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AV production company Riyadh prices vary. Basic setups start around SAR 15,000, while complex LED wall and concert-grade audio systems can exceed SAR 200,000."
            }
          }
        ]
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
              src="/gallery_wedding_reception.png" 
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
              className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight"
            >
              Exquisite <span className="italic font-light">Services</span> <br/>
              & <span className="text-shimmer">Elite Venues</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              From the best AV production company in Riyadh to outdoor event venue rental, we provide end-to-end solutions for Saudi Arabia's most prestigious gatherings.
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

        {/* Services Showcase */}
        <section className="py-32 bg-charcoal-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Speaker, title: "AV Production", desc: "The premier AV production company Riyadh. Concert-grade audio and cinematic LED visuals." },
                { icon: Map, title: "Venue Sourcing", desc: "Exclusive access to the finest event venue Riyadh and outdoor event venue rental options." },
                { icon: Zap, title: "Stage Design", desc: "Award-winning stage design company KSA. Immersive architectural environments for high-profile events." },
                { icon: Utensils, title: "Luxury Catering", desc: "Exquisite event catering Saudi Arabia. Curated menus featuring local and international fusion." },
                { icon: PenTool, title: "Event Decoration", desc: "Bespoke event decoration Jeddah and Riyadh. Transforming spaces with floral and structural art." },
                { icon: Camera, title: "Media Production", desc: "Professional event photography Saudi Arabia and cinematic videography for milestone moments." },
                { icon: Lightbulb, title: "Lighting Artistry", desc: "Dynamic event lighting Riyadh services, creating mood and atmosphere through intelligent design." },
                { icon: Star, title: "Elite Hospitality", desc: "VIP guest management and concierge services for a seamless luxury experience." },
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
                  <h3 className="text-xl font-display text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Localized Arabic Content */}
        <section className="py-32 bg-white text-charcoal-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-display text-charcoal-950">
                  خدمات <br/><span className="text-gold-600 italic">عالمية المستوى</span>
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
                  src="/gallery_corporate_gala.png" 
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
              <h2 className="text-4xl font-display text-white">Investment <span className="italic text-gold-500">Guide</span></h2>
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
            <h2 className="text-4xl font-display mb-16 text-center">Service <span className="italic text-gold-600">Queries</span></h2>
            <div className="space-y-6">
              {[
                { q: "What is included in full-service event management in KSA?", a: "Lumina's full-service model covers everything from venue scouting and creative design to AV production, catering, and on-site event execution." },
                { q: "How to choose an event venue in Riyadh?", a: "We analyze your event's theme, guest list, and technical needs to recommend the best event venue Riyadh has to offer, from 5-star hotels to exclusive desert retreats." },
                { q: "What makes you the best AV production company for events in Riyadh?", a: "Our commitment to the latest technology (including transparent LEDs and spatial audio) combined with an expert technical team makes us a leader in Saudi event production." }
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
