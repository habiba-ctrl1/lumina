"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Layout, Monitor, Globe, Users, PenTool, Lightbulb, TrendingUp, Award } from "lucide-react";
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
          "name": "Saudi Event Management",
          "url": "https://saudieventmanagement.com"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management Exhibition Management",
        "image": "https://saudieventmanagement.com/corporate.webp",
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
            "name": "What are the major exhibitions in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The major exhibitions in Saudi Arabia include LEAP, the Big 5 Construct Saudi, Saudi Agriculture, and the upcoming Saudi Expo 2030 initiatives. Saudi Event Management provides comprehensive event management for all major summits."
            }
          },
          {
            "@type": "Question",
            "name": "Who manages trade shows in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is a leading exhibition management company that manages trade shows in Riyadh. We offer end-to-end B2B matchmaking, booth design, and full-scale logistics at RICEC and RECC."
            }
          },
          {
            "@type": "Question",
            "name": "When is the next big expo in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Arabia has a packed annual exhibition calendar with major expos happening year-round, notably in Q1 and Q4. Check our Annual Saudi exhibition calendar to stay updated on the next big expo."
            }
          },
          {
            "@type": "Question",
            "name": "We want to exhibit at a trade show in Riyadh — where should we start?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The first step is to secure your presence and book exhibition space KSA. Saudi Event Management provides an end-to-end service, helping you choose the right event, secure premium space at RICEC or RECC, and manage all logistics as your primary trade show organizer Saudi Arabia."
            }
          },
          {
            "@type": "Question",
            "name": "What are the upcoming major exhibitions in Saudi Arabia in 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2025, major exhibitions include LEAP, the Big 5 Construct Saudi, Index Saudi, and critical summits leading up to Saudi Expo 2030. We monitor the complete Saudi exhibition calendar to align your brand with the most impactful events."
            }
          },
          {
            "@type": "Question",
            "name": "How to design an exhibition booth for a Saudi audience?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Designing for a Saudi audience requires a balance of cultural respect, VIP hospitality spaces (like a Majlis), and cutting-edge technology. Our exhibition stand design Riyadh team specializes in creating culturally resonant, high-impact pavilions."
            }
          },
          {
            "@type": "Question",
            "name": "trade show organizer near me Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is strategically based in Riyadh, making us the ideal partner when you need a top-tier trade show organizer near me Riyadh for your commercial display event."
            }
          },
          {
            "@type": "Question",
            "name": "exhibition management company Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As a leading exhibition management company Saudi Arabia, we handle everything from international business fair planning to local product showcase event execution."
            }
          },
          {
            "@type": "Question",
            "name": "expo booth builder Jeddah",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management serves as an expert expo booth builder Jeddah, creating stunning exhibition pavilion Saudi setups along the Red Sea coast."
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
            "text": "Collaborate with Saudi Event Management for professional expo booth design and stand building."
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Exhibitions & Trade Shows", "item": "https://saudieventmanagement.com/services/exhibitions" }
        ]
      },
      {
        "@type": "Organization",
        "name": "Saudi Event Management Exhibition Management",
        "description": "Partnering with the Royal Commission for Riyadh City (RCEF) and Saudi Expo 2030 initiatives.",
        "memberOf": {
          "@type": "Organization",
          "name": "RECC Official Partner Network"
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
      <main className="min-h-screen bg-emerald-950 text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/blog_corporate_events.webp" 
              alt="Exhibition management Saudi Arabia - Trade show organizer Riyadh" 
              width={1920}
              height={1080}
              className="w-full h-full object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/40 to-emerald-950" />
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
              className="text-3xl md:text-5xl lg:text-6xl font-sans text-white mb-8 leading-tight font-bold"
            >
              Exhibition Management <span className="font-bold">Company</span> <br/>
              <span className="text-shimmer font-bold">Riyadh</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The premier <strong className="text-white">trade show organizer Saudi Arabia</strong>. Partnering with <strong className="text-white">Saudi Expo 2030</strong>, <strong className="text-white">GITEX Saudi Arabia</strong>, and <strong className="text-white">Big 5 Saudi</strong>. Mastering grand-scale presence for any <strong className="text-white">trade exhibition</strong> or <strong className="text-white">product showcase event</strong> and helping international brands effortlessly <strong className="text-white">book exhibition space KSA</strong>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/#contact"
                className="inline-block px-12 py-5 bg-gold-500 text-emerald-950 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-2xl"
              >
                Organize Your Expo
              </Link>
            </motion.div>
          </div>
        </section>

        {/* E-E-A-T Signals & Partnerships */}
        <section className="py-12 border-y border-white/5 bg-emerald-900/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Award className="text-gold-500" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-widest">Official RECC Partner</p>
                  <p className="text-[10px] text-gray-500 uppercase">Venue Logistics & Support</p>
                </div>
              </div>
              <div className="flex items-center gap-8 grayscale opacity-50">
                <span className="text-xs font-bold tracking-tighter">INDEX SAUDI</span>
                <span className="text-xs font-bold tracking-tighter">SAUDI AGRICULTURE</span>
                <span className="text-xs font-bold tracking-tighter">ADIPEC</span>
              </div>
              <div className="text-xs text-gold-500 font-bold  tracking-widest uppercase">
                &quot;Award-Winning Exhibition Design 2024&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-32 bg-emerald-900/30 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">Our Expo <span className="text-gold-500">Expertise</span></h2>
              <div className="w-24 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Briefcase, title: "Trade Show Organizing", desc: "End-to-end management for Index Saudi and Saudi Agriculture level industry expos with international delegations." },
                { icon: PenTool, title: "Booth Design", desc: "Award-winning expo booth design KSA experts for GITEX and massive business fair pavilions." },
                { icon: Layout, title: "Stand Building", desc: "Leading exhibition stand builder for Saudi Expo 2030, creating breathtaking exhibition pavilion Saudi structures." },
                { icon: Globe, title: "International Expo", desc: "Strategic international expo organizer Saudi Arabia connecting global ADIPEC partners with KSA." },
                { icon: Monitor, title: "Digital Showcase", desc: "High-impact commercial display event and product showcase Saudi Arabia utilizing interactive AV and VR technologies." },
                { icon: Users, title: "B2B Matchmaking", desc: "Professional B2B expo planner Riyadh facilitating high-value networking for trade fair organizer Jeddah summits." },
                { icon: Lightbulb, title: "Creative Strategy", desc: "Developing unique concepts to ensure your brand stands out in competitive exhibitions like Index Saudi." },
                { icon: TrendingUp, title: "Visitor Engagement", desc: "Proven strategies to maximize footfall and lead conversion at major venues like RECC Riyadh." },
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-emerald-900 border border-white/5 p-10 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group"
                >
                  <service.icon size={32} className="text-gold-500 mb-8 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-sans font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-24 bg-emerald-950 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-white">Exhibitor <br/><span className="text-gold-500">Insights</span></h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Strategic resources for maximizing your presence at the Kingdom&apos;s most prestigious trade shows.</p>
                <Link href="/blog" className="inline-block text-gold-500 text-xs font-bold uppercase tracking-widest border-b border-gold-500 pb-1">View All Guides</Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Annual Saudi exhibition calendar", desc: "Stay ahead with our comprehensive timeline of the Kingdom's most critical trade shows and B2B summits." },
                  { title: "Exhibitor success stories", desc: "Discover how our clients maximize ROI and secure high-value leads at competitive venues." },
                  { title: "Exhibition cost breakdown guides", desc: "A transparent analysis of booth construction, technology integration, and staffing costs in KSA." },
                  { title: "Venue comparison articles", desc: "An in-depth review of RICEC, RECC, and Jeddah Center for Forums & Events to choose your optimal location." }
                ].map((post, idx) => (
                  <div key={idx} className="p-8 bg-emerald-900 rounded-2xl hover:bg-gold-500/5 transition-all cursor-pointer group">
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-gold-500 transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Section */}
        <section className="py-32 bg-white text-charcoal-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-50/50 -skew-x-12 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-sans leading-tight font-bold">
                  الريادة في <br/><span className="text-gold-600">تنظيم المعارض</span>
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
                  src="/gallery_corporate_gala.webp" 
                  alt="مركز الرياض للمعارض والمؤتمرات - تنظيم معارض" 
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & HowTo Section */}
        <section className="py-32 bg-emerald-900 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-2xl md:text-3xl font-sans text-white font-bold">Expo <span className="text-gold-500">Guide</span></h2>
              <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs">Everything you need to know about Saudi Trade Shows</p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What are the major exhibitions in Saudi Arabia?", a: "Major exhibitions include LEAP, Big 5 Construct, and Index Saudi. We provide premium booth design and management for international brands at these high-profile events." },
                { q: "Who manages trade shows in Riyadh?", a: "Saudi Event Management is a leading trade show organizer Saudi Arabia, acting as the primary liaison between exhibitors and venues like RICEC and RECC for flawless execution." },
                { q: "When is the next big expo in Saudi Arabia?", a: "The exhibition calendar is dynamic, with peak seasons in Q1 and Q4. Contact us for our detailed 'Annual Saudi exhibition calendar' and strategic planning timelines." },
                { q: "We want to exhibit at a trade show in Riyadh — where should we start?", a: "The first step is to book exhibition space KSA early. Saudi Event Management provides end-to-end consulting, helping you select the best event, secure space, and manage all local logistics." },
                { q: "What are the upcoming major exhibitions in Saudi Arabia in 2025?", a: "2025 features LEAP, Saudi Agriculture, Index Saudi, and major summits aligned with Vision 2030. We can align your brand with the most relevant B2B opportunities." },
                { q: "How to design an exhibition booth for a Saudi audience?", a: "It requires balancing modern technology with cultural nuances, such as private Majlis meeting areas. Our exhibition stand design Riyadh team excels at creating culturally resonant, high-impact pavilions." },
                { q: "trade show organizer near me Riyadh", a: "Saudi Event Management is strategically headquartered in Riyadh, offering rapid, on-the-ground support and logistics for any trade exhibition." },
                { q: "exhibition management company Saudi Arabia", a: "As a top-tier exhibition management company Saudi Arabia, we provide comprehensive services across the Kingdom for any industry expo or business fair." },
                { q: "expo booth builder Jeddah", a: "Saudi Event Management operates extensively on the West Coast, acting as the premier expo booth builder Jeddah for custom commercial display events." }
              ].map((faq, i) => (
                <div key={i} className="bg-emerald-950 p-8 rounded-2xl border border-white/5">
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
