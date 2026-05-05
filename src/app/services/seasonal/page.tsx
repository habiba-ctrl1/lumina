"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Moon, Star, Flag, Gift, Calendar, MapPin, Landmark, Award } from "lucide-react";
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
            "name": "What events happen during Ramadan in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ramadan in Saudi Arabia is marked by festive community iftars, suhoor tents, religious lectures, and charity markets. Lumina specializes in luxury corporate iftars and private Ramadan activations."
            }
          },
          {
            "@type": "Question",
            "name": "How to plan a National Day event in KSA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Planning a National Day event requires early venue booking, GEA permit coordination, and patriotic-themed décor. We recommend starting the process at least 3-4 months in advance."
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
          }
        ]
      },
      {
        "@type": "Article",
        "headline": "How to Plan a National Day Celebration in Saudi Arabia",
        "author": {
          "@type": "Organization",
          "name": "Lumina Events"
        },
        "datePublished": "2024-09-01",
        "description": "A comprehensive guide to organizing high-impact National Day galas and community festivals in Riyadh."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-charcoal-950">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/private_party.png" 
              alt="Ramadan events Saudi Arabia - Saudi National Day event organizer" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold-500 text-sm uppercase tracking-[0.6em] font-bold mb-6 block"
            >
              الفعاليات الموسمية والدينية | Cultural Heritage
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight"
            >
              Seasonal <span className="italic font-light text-gold-500">& Religious</span> <br/>
              Events KSA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-200 text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Exquisite Ramadan events, Saudi National Day galas, and Eid celebrations. We preserve traditional Saudi heritage with a modern luxury touch.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="inline-block px-12 py-5 bg-gold-600 text-white font-bold uppercase tracking-widest hover:bg-gold-700 transition-all shadow-2xl"
              >
                Plan Your Celebration
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Occasions */}
        <section className="py-32 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-display text-charcoal-950 mb-6">Honoring Our <span className="italic text-gold-600">Traditions</span></h2>
              <div className="w-24 h-px bg-gold-600/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { 
                  icon: Moon, 
                  title: "Ramadan Events", 
                  desc: "The best Ramadan event organizer in Riyadh 2025. Specialized in corporate iftars, suhoor tents, and luxury activations.",
                  linkText: "Ramadan Activation Management"
                },
                { 
                  icon: Flag, 
                  title: "National Day Galas", 
                  desc: "Premier Saudi National Day event organizer. We plan high-impact National Day celebrations in Saudi Arabia from Riyadh to Jeddah.",
                  linkText: "National Day Planning"
                },
                { 
                  icon: Gift, 
                  title: "Eid Celebrations", 
                  desc: "Comprehensive Eid celebration management KSA. From corporate Eid parties in Jeddah to community festivals in Dammam.",
                  linkText: "Eid Al-Fitr Events"
                },
                { 
                  icon: Landmark, 
                  title: "Founding Day", 
                  desc: "Founding Day event organizer KSA. Celebrating the Kingdom's roots with historical exhibitions and traditional hospitality.",
                  linkText: "Founding Day Heritage"
                },
                { 
                  icon: Star, 
                  title: "Religious Services", 
                  desc: "Professional Hajj event services Saudi Arabia and specialized support for religious gatherings and conferences.",
                  linkText: "Religious Event Support"
                },
                { 
                  icon: Award, 
                  title: "Cultural Festivals", 
                  desc: "Curating large-scale cultural festivals that align with Saudi Vision 2030 and local community values.",
                  linkText: "Cultural Management"
                },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold-600 transition-colors">
                    <item.icon size={28} className="text-gold-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-display text-charcoal-950 mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">{item.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 border-b border-gold-200 pb-1">{item.linkText}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Arabic Heritage Content Section */}
        <section className="py-32 bg-charcoal-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/gallery_1.png" 
                  alt="احتفالات اليوم الوطني السعودي - فعاليات رمضان الرياض" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-10">
                <h2 className="text-4xl md:text-6xl font-display leading-tight">
                  الاحتفاء بـ <br/><span className="text-gold-500 italic">الهوية السعودية</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "تنظيم فعاليات رمضان الرياض", desc: "نقدم تجارب إفطار وسحور فاخرة تجمع بين الأصالة والحداثة." },
                    { title: "احتفالات اليوم الوطني السعودي", desc: "تنظيم فعاليات وطنية كبرى تعزز روح الانتماء والفخر بالوطن." },
                    { title: "فعاليات العيد الرياض", desc: "إدارة احتفالات العيد للشركات والعائلات بأعلى معايير الرفاهية." },
                    { title: "فعاليات يوم التأسيس السعودي", desc: "تسليط الضوء على الإرث التاريخي للمملكة من خلال فعاليات تراثية مبتكرة." },
                  ].map((local, idx) => (
                    <div key={idx} className="border-r-2 border-gold-500 pr-6">
                      <h4 className="text-xl font-bold mb-2">{local.title}</h4>
                      <p className="text-gray-400 text-sm font-light">{local.desc}</p>
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
              <h2 className="text-4xl font-display text-charcoal-950">Cultural <span className="italic text-gold-600">Insights</span></h2>
              <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs">Answering your questions about KSA Seasonal Events</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What events happen during Ramadan in Saudi Arabia?", a: "Ramadan is filled with religious, social, and cultural events. Lumina specializes in creating high-end Ramadan activation event management Saudi Arabia experiences, including corporate suhoors and decorative mall activations." },
                { q: "How to plan a National Day event in KSA?", a: "Focus on patriotic themes, early venue coordination (like Boulevard Riyadh City), and secure necessary permits. As a Saudi National Day event organizer, we handle all logistics from branding to fireworks." },
                { q: "What is special about Saudi Founding Day celebrations?", a: "It's a time to celebrate traditional 'Najdi' and regional Saudi heritage. Our events emphasize traditional hospitality, crafts, and historical storytelling." },
                { q: "How early should I book a Ramadan event organizer?", a: "To ensure the best Ramadan events Saudi Arabia venues and custom fabrication, we recommend booking at least 90 days before the start of the holy month." }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-4">{faq.q}</h3>
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
