"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Layout, Monitor, Globe, Users, PenTool, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ExhibitionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExhibitionEvent",
        "name": "Global Trade Expo 2025 Riyadh",
        "startDate": "2025-11-20T09:00",
        "endDate": "2025-11-22T18:00",
        "location": {
          "@type": "Place",
          "name": "Riyadh International Convention & Exhibition Center (RICEC)",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "King Abdullah Rd",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          }
        },
        "description": "The premier B2B trade show for international brands in Saudi Arabia.",
        "organizer": {
          "@type": "Organization",
          "name": "Lumina Events",
          "url": "https://luminaevents.com"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Lumina Exhibition Management",
        "image": "https://luminaevents.com/corporate.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riyadh",
          "addressCountry": "SA"
        },
        "telephone": "+966501234567"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the biggest trade shows in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Arabia hosts several world-class trade shows, including LEAP in Riyadh, the Big 5 Construct Saudi, and the Saudi International Exhibition & Conference for Internet of Things."
            }
          },
          {
            "@type": "Question",
            "name": "How to book exhibition space at RECC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Booking space at the Riyadh Exhibition and Convention Center (RECC) typically requires early registration through the event organizer. Lumina manages the entire booking and coordination process for our clients."
            }
          },
          {
            "@type": "Question",
            "name": "What is the cost of exhibition management in KSA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Costs vary depending on the scale and booth complexity. Comprehensive management services in KSA can range from SAR 50,000 for standard booths to over SAR 500,000 for bespoke multi-story pavilions."
            }
          },
          {
            "@type": "Question",
            "name": "How to attract visitors to a trade show in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Attracting visitors involves interactive booth designs, strategic pre-event marketing, lead generation technologies, and high-impact digital displays, all of which Lumina specializes in."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to set up a trade show booth in Riyadh",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Define your objectives and target audience for the Riyadh market."
          },
          {
            "@type": "HowToStep",
            "text": "Secure your exhibition space at RICEC or RECC early."
          },
          {
            "@type": "HowToStep",
            "text": "Collaborate with Lumina for professional expo booth design and stand building."
          },
          {
            "@type": "HowToStep",
            "text": "Finalize AV requirements and lead capture technology."
          },
          {
            "@type": "HowToStep",
            "text": "Execute setup with our expert on-site logistics team."
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
              src="/blog_corporate_events.png" 
              alt="Exition management Saudi Arabia - Trade show organizer Riyadh" 
              fill 
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/40 to-charcoal-950" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold-500 text-sm uppercase tracking-[0.6em] font-bold mb-6 block"
            >
              المعارض والملتقيات | Exhibition Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight"
            >
              Exhibition <span className="italic font-light">Management</span> <br/>
              <span className="text-shimmer">Saudi Arabia</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The premier trade show organizer in Riyadh and expo management collective in KSA. Elevating B2B platforms through world-class stand building and strategic planning.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="inline-block px-12 py-5 bg-gold-500 text-charcoal-950 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-2xl"
              >
                Organize Your Expo
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-32 bg-charcoal-900/30 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Our Expo <span className="italic text-gold-500">Expertise</span></h2>
              <div className="w-24 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Briefcase, title: "Trade Show Organizing", desc: "End-to-end trade fair organizer Jeddah and Riyadh services for international delegations." },
                { icon: PenTool, title: "Booth Design", desc: "Award-winning expo booth design KSA experts creating immersive brand environments." },
                { icon: Layout, title: "Stand Building", desc: "Leading exhibition stand builder Saudi Arabia with precision engineering and luxury finishes." },
                { icon: Globe, title: "International Expo", desc: "Strategic international expo organizer Saudi Arabia connecting global markets with KSA." },
                { icon: Monitor, title: "Digital Showcase", desc: "High-impact product showcase Saudi Arabia utilizing interactive AV and VR technologies." },
                { icon: Users, title: "B2B Matchmaking", desc: "Professional B2B expo planner Riyadh facilitating high-value networking and deal-making." },
                { icon: Lightbulb, title: "Creative Strategy", desc: "Developing unique concepts to ensure your brand stands out in competitive exhibitions." },
                { icon: TrendingUp, title: "Visitor Engagement", desc: "Proven strategies to maximize footfall and lead conversion at major venues like RECC." },
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-charcoal-900 border border-white/5 p-10 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group"
                >
                  <service.icon size={32} className="text-gold-500 mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-display text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Localized Arabic Section */}
        <section className="py-32 bg-white text-charcoal-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-50/50 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-display leading-tight">
                  الريادة في <br/><span className="text-gold-600 italic">تنظيم المعارض</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  تعتبر لومينا أفضل <strong className="text-charcoal-950">شركة إدارة معارض في الرياض</strong>، حيث نقدم حلولاً متكاملة لتنظيم المعارض التجارية في جدة والدمام. نحن نركز على الابتكار في التصميم والتميز في التنفيذ لضمان نجاح مشاركتكم في <strong className="text-charcoal-950">مركز الرياض للمعارض والمؤتمرات</strong>.
                </p>
                <div className="flex gap-6 pt-4">
                  <div className="px-6 py-3 border border-gold-200 rounded-full text-sm font-bold text-gold-700">إدارة المعارض</div>
                  <div className="px-6 py-3 border border-gold-200 rounded-full text-sm font-bold text-gold-700">تصميم الأجنحة</div>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/gallery_corporate_gala.png" 
                  alt="مركز الرياض للمعارض والمؤتمرات - تنظيم معارض" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & HowTo Section */}
        <section className="py-32 bg-charcoal-900 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-display text-white">Expo <span className="italic text-gold-500">Guide</span></h2>
              <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs">Everything you need to know about Saudi Trade Shows</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What are the biggest trade shows in Saudi Arabia?", a: "Saudi Arabia hosts several world-class trade shows, including LEAP (tech), Big 5 Construct, and various Vision 2030 summits at RICEC and RECC." },
                { q: "How to set up a trade show booth in Riyadh?", a: "Successful setup involves early space booking, collaborating with an expert exhibition stand builder in Saudi Arabia, and ensuring your design complies with venue regulations in Riyadh or Jeddah." },
                { q: "What is the cost of exhibition management in KSA?", a: "Costs depend on booth size and complexity. Lumina offers tailored packages from standard shell schemes to bespoke premium pavilions at RICEC." },
                { q: "How to book exhibition space at RECC?", a: "Booking is usually done through the official event organizer. As your expo management partner, Lumina handles all logistics, venue coordination, and paperwork." }
              ].map((faq, i) => (
                <div key={i} className="bg-charcoal-950 p-8 rounded-2xl border border-white/5">
                  <h3 className="text-lg font-bold text-gold-500 mb-3">{faq.q}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{faq.a}</p>
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
