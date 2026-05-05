"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Heart, Stars, MapPin, Sparkles, Utensils, Music, Camera, Gift } from "lucide-react";
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
          "name": "Lumina Events",
          "image": "https://luminaevents.com/wedding.png",
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
            "name": "What is the average cost of a wedding in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The average cost of a luxury wedding in Saudi Arabia can range from SAR 150,000 to over SAR 1,000,000, depending on the venue, guest count, and level of customization. Lumina provides tailored packages to suit elite preferences."
            }
          },
          {
            "@type": "Question",
            "name": "How to find a wedding planner in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Finding the best wedding planner in Riyadh involves looking for agencies with local expertise, a strong portfolio of traditional and modern weddings, and excellent vendor connections. Lumina Events is a top-rated choice for high-end celebrations."
            }
          },
          {
            "@type": "Question",
            "name": "What are the best wedding venues in Jeddah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jeddah offers stunning venues like the Ritz-Carlton, Park Hyatt, and exclusive private estates along the Red Sea. Lumina assists in securing the most prestigious locations for your special day."
            }
          },
          {
            "@type": "Question",
            "name": "Is a wedding coordinator different from a wedding planner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, a wedding planner handles the entire process from concept to execution (often 6-12 months), while a coordinator typically manages the logistics in the final weeks and on the day of the event."
            }
          }
        ]
      },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Lumina Events"
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
      "reviewBody": "Lumina made my dream wedding in Riyadh a reality. Their attention to detail and traditional Saudi touches were perfect."
    },
    {
      "@type": "Event",
      "name": "Grand Saudi Wedding Showcase 2025",
      "startDate": "2025-10-15T19:00",
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
      "image": "https://luminaevents.com/wedding.png",
      "description": "An exclusive showcase of luxury wedding trends and traditional Saudi elegance organized by Lumina Events.",
      "performer": {
        "@type": "Organization",
        "name": "Lumina Events"
      }
    },
    {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Lumina Events"
      },
      "ratingValue": "4.9",
      "reviewCount": "120"
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

        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/wedding.png" 
              alt="Luxury wedding planner Saudi Arabia - Riyadh Wedding" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold-500 text-sm uppercase tracking-[0.5em] font-bold mb-6 block"
            >
              حفلات الزفاف والمناسبات | Social Elegance
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight"
            >
              Wedding <span className="italic font-light">Planner</span> <br/>
              <span className="text-shimmer">Saudi Arabia</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-200 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto"
            >
              Exquisite wedding event management in Riyadh, Jeddah, and across the Kingdom. Creating timeless memories with a blend of tradition and modern luxury.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="inline-block px-12 py-5 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-2xl"
              >
                Start Planning Your Dream
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/gallery_wedding_reception.png" 
                  alt="Luxury wedding decoration company Saudi Arabia prices" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-display text-charcoal-950 leading-tight">
                  Crafting the Best <br/><span className="text-gold-600 italic">Wedding Experience</span> in Riyadh
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  As the premier <strong className="text-charcoal-950">wedding planner in Saudi Arabia</strong>, Lumina specializes in transforming your vision into an editorial masterpiece. Whether you are planning a traditional Saudi wedding or a contemporary luxury celebration, our team ensures every detail reflects your unique story.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <h4 className="text-gold-600 font-bold mb-2">مخططة أفراح السعودية</h4>
                    <p className="text-sm text-gray-500 font-light">Expertise in local traditions and high-end cultural nuances.</p>
                  </div>
                  <div>
                    <h4 className="text-gold-600 font-bold mb-2">Luxury Wedding Packages</h4>
                    <p className="text-sm text-gray-500 font-light">Bespoke 2025 packages for Jeddah and Riyadh venues.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20">
            <span className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-6xl font-display text-charcoal-950">Social Event <span className="italic">Planning</span></h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: "Engagement Party", desc: "Elegant engagement party planner KSA services for intimate or grand gatherings." },
                { icon: Sparkles, title: "Henna Nights", desc: "Authentic henna night organizer in Saudi Arabia with a modern luxurious twist." },
                { icon: Stars, title: "Graduation Parties", desc: "Premium graduation party Riyadh planning for celebrating milestones in style." },
                { icon: MapPin, title: "Social Events", desc: "Comprehensive social event planning Jeddah for all your private celebrations." },
                { icon: Utensils, title: "Gourmet Catering", desc: "World-class menus tailored to your cultural and personal preferences." },
                { icon: Music, title: "Entertainment", desc: "Exclusive access to top artists, DJs, and traditional performers." },
                { icon: Camera, title: "Media Production", desc: "Cinematic photography and videography to capture every moment." },
                { icon: Gift, title: "Floral Design", desc: "Bespoke arrangements from the best wedding decoration company in Saudi Arabia." },
              ].map((service, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group">
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold-500 transition-colors">
                    <service.icon size={28} className="text-gold-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-display text-charcoal-950 mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localized Arabic Focus Section */}
        <section className="py-32 bg-charcoal-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-display mb-16">
              نصمم <span className="text-gold-500 italic">أجمل اللحظات</span> في المملكة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-display text-gold-500 mb-4">مخطط أفراح الرياض</h3>
                <p className="text-gray-400 font-light">إدارة حفلات الزفاف الفاخرة في قلب العاصمة مع اهتمام بأدق التفاصيل.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-display text-gold-500 mb-4">شركة تنظيم حفلات جدة</h3>
                <p className="text-gray-400 font-light">تنظيم مناسبات اجتماعية راقية على ساحل البحر الأحمر بأسلوب عصري.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-display text-gold-500 mb-4">حفلات الأعراس الدمام</h3>
                <p className="text-gray-400 font-light">خبرة واسعة في تنظيم الأعراس والمناسبات الكبرى في المنطقة الشرقية.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-display text-charcoal-950">Common <span className="italic text-gold-600">Inquiries</span></h2>
              <p className="text-gray-500 mt-4">Everything you need to know about planning your Saudi wedding.</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What is the average cost of a wedding in Saudi Arabia?", a: "The average cost of a luxury wedding in Saudi Arabia can range from SAR 150,000 to over SAR 1,000,000. Factors include guest count, venue choice (like luxury hotels in Riyadh or Jeddah), and custom décor requirements." },
                { q: "How to find a wedding planner in Riyadh?", a: "Look for planners with a strong presence in the KSA market, positive client reviews, and a style that matches yours. Lumina is recognized as one of the best wedding planners in Riyadh for our attention to cultural authenticity and luxury." },
                { q: "What are the best wedding venues in Jeddah?", a: "Jeddah features world-class venues such as the Ritz-Carlton Jeddah, Park Hyatt, and Waldorf Astoria. We help you source and book these exclusive locations, often with better rates and perks." },
                { q: "Is a wedding coordinator different from a wedding planner?", a: "A wedding planner is involved in the entire creative and logistical journey, while a wedding coordinator focuses on the 'day-of' execution to ensure everything runs smoothly." }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                  <h3 className="text-lg font-bold text-charcoal-950 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
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
