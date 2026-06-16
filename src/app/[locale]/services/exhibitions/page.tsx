"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Layout, Monitor, Globe, Users, PenTool, Lightbulb, TrendingUp, Award, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function ExhibitionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ExhibitionEvent",
        "name": "Global Trade Expo 2025 Riyadh",
        "eventStatus": "https://schema.org/EventScheduled",
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
        },
        "offers": {
          "@type": "Offer",
          "name": "Exhibition Space Inquiry",
          "price": "0",
          "priceCurrency": "SAR",
          "url": "https://saudieventmanagement.com/contact",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management Exhibition Management",
        "image": "https://saudieventmanagement.com/services/corporate.webp",
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

  const expoServices = [
    { icon: Briefcase, title: "Trade Show Organizing", desc: "End-to-end management for Index Saudi and Saudi Agriculture level industry expos with international delegations." },
    { icon: PenTool, title: "Booth Design", desc: "Award-winning expo booth design KSA experts for GITEX and massive business fair pavilions." },
    { icon: Layout, title: "Stand Building", desc: "Leading exhibition stand builder for Saudi Expo 2030, creating breathtaking exhibition pavilion Saudi structures." },
    { icon: Globe, title: "International Expo", desc: "Strategic international expo organizer Saudi Arabia connecting global ADIPEC partners with KSA." },
    { icon: Monitor, title: "Digital Showcase", desc: "High-impact commercial display event and product showcase Saudi Arabia utilizing interactive AV and VR technologies." },
    { icon: Users, title: "B2B Matchmaking", desc: "Professional B2B expo planner Riyadh facilitating high-value networking for trade fair organizer Jeddah summits." },
    { icon: Lightbulb, title: "Creative Strategy", desc: "Developing unique concepts to ensure your brand stands out in competitive exhibitions like Index Saudi." },
    { icon: TrendingUp, title: "Visitor Engagement", desc: "Proven strategies to maximize footfall and lead conversion at major venues like RECC Riyadh." },
  ];

  const faqs = [
    { q: "What are the major exhibitions in Saudi Arabia?", a: "Major exhibitions include LEAP, Big 5 Construct, and Index Saudi. We provide premium booth design and management for international brands at these high-profile events." },
    { q: "Who manages trade shows in Riyadh?", a: "Saudi Event Management is a leading trade show organizer Saudi Arabia, acting as the primary liaison between exhibitors and venues like RICEC and RECC for flawless execution." },
    { q: "When is the next big expo in Saudi Arabia?", a: "The exhibition calendar is dynamic, with peak seasons in Q1 and Q4. Contact us for our detailed 'Annual Saudi exhibition calendar' and strategic planning timelines." },
    { q: "We want to exhibit at a trade show in Riyadh — where should we start?", a: "The first step is to book exhibition space KSA early. Saudi Event Management provides end-to-end consulting, helping you select the best event, secure space, and manage all local logistics." },
    { q: "What are the upcoming major exhibitions in Saudi Arabia in 2025?", a: "2025 features LEAP, Saudi Agriculture, Index Saudi, and major summits aligned with Vision 2030. We can align your brand with the most relevant B2B opportunities." },
    { q: "How to design an exhibition booth for a Saudi audience?", a: "It requires balancing modern technology with cultural nuances, such as private Majlis meeting areas. Our exhibition stand design Riyadh team excels at creating culturally resonant, high-impact pavilions." },
    { q: "trade show organizer near me Riyadh", a: "Saudi Event Management is strategically headquartered in Riyadh, offering rapid, on-the-ground support and logistics for any trade exhibition." },
    { q: "exhibition management company Saudi Arabia", a: "As a top-tier exhibition management company Saudi Arabia, we provide comprehensive services across the Kingdom for any industry expo or business fair." },
    { q: "expo booth builder Jeddah", a: "Saudi Event Management operates extensively on the West Coast, acting as the premier expo booth builder Jeddah for custom commercial display events." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <Navbar />

        <InternalPageHero
          title="Exhibition Management"
          titleHighlight="Saudi Arabia"
          subtitle="Premier trade show organizer and exhibition management company in Saudi Arabia — partnering with Saudi Expo 2030, GITEX Saudi Arabia, and Big 5 Saudi for world-class presence at every expo."
          backgroundImage="/services/premium_exhibition_hero.webp"
          imageAlt="Large-scale international trade show and exhibition in Saudi Arabia with custom booths"
          enableParallax
          badge="Exhibitions & Expos"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Exhibitions" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "RECC", label: "Official Partner Network" },
            { value: "100+", label: "Pavilions Delivered" },
            { value: "Award", label: "Winning Booth Design 2024" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#expo-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              Organize Your Expo
            </Link>
            <a
              href="tel:+966501234567"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> Book Exhibition Space
            </a>
          </div>
        </div>

        {/* E-E-A-T Signals & Partnerships */}
        <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={22} />
                </div>
                <div>
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">Official RECC Partner</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Venue Logistics &amp; Support</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>INDEX SAUDI</span>
                <span>SAUDI AGRICULTURE</span>
                <span>ADIPEC</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                &quot;Award-Winning Exhibition Design 2024&quot;
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/gallery_2.webp')" }} aria-label="Exhibition visual showcase">
          <div aria-hidden className="absolute inset-0 bg-slate-900/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Exhibition Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Exhibition Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Exhibition Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                Saudi Arabia&apos;s Premier Trade Show Organizer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Elevating Exhibition Management <br className="hidden md:block" />
                <span className="text-[var(--primary)]">in Saudi Arabia</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                As a fully integrated exhibition management company, we provide end-to-end services for B2B trade shows and international pavilions. From securing premium floor space at <Link href="/locations/riyadh" className="text-[var(--primary)] hover:underline font-semibold">Riyadh&apos;s RICEC</Link> to breathtaking <Link href="/services/event-production" className="text-[var(--primary)] hover:underline font-semibold">custom booth design</Link> and <Link href="/portfolio/vision-2030" className="text-[var(--primary)] hover:underline font-semibold">Vision 2030</Link> alignments, our team ensures your brand commands attention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expoServices.map((service, i) => (
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

        {/* ── LEAD FORM / EXPO ENQUIRY ── */}
        <section id="expo-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/exhibition_hall_riyadh.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> Reserve Your Presence
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  Secure premium space.<br />
                  <span className="text-[#C5A880]">Stand out at every expo.</span>
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  Tell us which show you&apos;re targeting and our exhibitions team returns a stand concept,
                  space options at RICEC or RECC, and an itemised build quote within two hours.
                </p>
                <ul className="space-y-3.5 pt-2">
                  {[
                    "Priority space booking at RICEC, RECC & JCFE",
                    "Custom 3D stand design & turnkey build",
                    "On-site logistics, AV & lead-capture tech",
                    "B2B matchmaking to maximise qualified leads",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20exhibit%20at%20a%20Saudi%20trade%20show."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> Or message us on WhatsApp
                </a>
              </div>
              <ServiceLeadForm
                source="exhibitions_page"
                defaultEventType="Exhibition / Trade Show"
                eyebrow="Exhibition Enquiry"
                heading="Plan your exhibition presence"
                subheading="Our exhibitions team will respond within 2 hours with stand options and an itemised quote."
                submitLabel="Request Exhibition Proposal"
                eventTypeOptions={[
                  "Custom Stand Design & Build",
                  "Exhibition Space Booking",
                  "Full Trade Show Management",
                  "International Pavilion",
                  "B2B Matchmaking",
                  "Other",
                ]}
              />
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
                  Exhibitor Resources
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">Exhibitor <br /><span className="text-[var(--primary)]">insights</span></h2>
                <p className="text-neutral-500 text-sm leading-relaxed">Strategic resources for maximizing your presence at the Kingdom&apos;s most prestigious trade shows.</p>
                <Link href="/blog" className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">View All Guides</Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Annual Saudi exhibition calendar", desc: "Stay ahead with our comprehensive timeline of the Kingdom's most critical trade shows and B2B summits." },
                  { title: "Exhibitor success stories", desc: "Discover how our clients maximize ROI and secure high-value leads at competitive venues." },
                  { title: "Exhibition cost breakdown guides", desc: "A transparent analysis of booth construction, technology integration, and staffing costs in KSA." },
                  { title: "Venue comparison articles", desc: "An in-depth review of RICEC, RECC, and Jeddah Center for Forums & Events to choose your optimal location." }
                ].map((post, idx) => (
                  <div key={idx} className="p-6 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl hover:border-[var(--primary)]/30 hover:shadow-[0_8px_30px_rgba(13,107,78,0.07)] transition-all cursor-pointer group">
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Section */}
        <section className="py-24 md:py-28 bg-[var(--surface-tinted)] border-b border-emerald-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl leading-tight font-bold text-neutral-900">
                  الريادة في <br /><span className="text-[var(--primary)]">تنظيم المعارض</span>
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  تعتبر إدارة الفعاليات السعودية أفضل <strong className="text-neutral-900">شركة إدارة معارض في الرياض</strong>، حيث نقدم حلولاً متكاملة لتنظيم المعارض التجارية في جدة والدمام. نحن نركز على الابتكار في التصميم والتميز في التنفيذ لضمان نجاح مشاركتكم في <strong className="text-neutral-900">مركز الرياض للمعارض والمؤتمرات</strong>.
                </p>
                <div className="flex gap-6 pt-2">
                  <div className="px-6 py-3 border border-gold-300 bg-gold-50 rounded-full text-sm font-bold text-gold-700">إدارة المعارض</div>
                  <div className="px-6 py-3 border border-gold-300 bg-gold-50 rounded-full text-sm font-bold text-gold-700">تصميم الأجنحة</div>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                <Image
                  src="/services/exhibition_hall_riyadh.webp"
                  alt="مركز الرياض للمعارض والمؤتمرات - أجنحة عرض وتنظيم معارض تجارية في السعودية"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & HowTo Section */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Expo <span className="text-[var(--primary)]">guide</span></h2>
              <p className="text-neutral-500 mt-4 uppercase tracking-widest text-xs">Everything you need to know about Saudi trade shows</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
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
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">Real-World Considerations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">Exhibition challenges — <span className="text-[var(--primary)]">solved with experience</span></h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">Trade-show success in Saudi Arabia is won or lost in the operational detail. Here is how our exhibition team handles the risks exhibitors face most.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { c: "Tight build & teardown windows at RICEC/RECC", s: "Move-in slots are fixed and shared with dozens of exhibitors. Pre-fabricated modular stands and a sequenced build schedule get your stand show-ready before doors open." },
                { c: "Customs & freight for international exhibits", s: "We coordinate temporary import, freight forwarding, and on-site handling so overseas exhibits clear customs and arrive on the stand without last-minute delays." },
                { c: "Standing out on a crowded show floor", s: "Sightline-driven stand design, double-decker options, and integrated lighting and AV pull footfall toward your brand instead of past it." },
                { c: "Turning footfall into qualified leads", s: "Digital lead-capture, B2B matchmaking, and post-show reporting convert visitor traffic into a measurable, follow-up-ready pipeline." },
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

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">Exhibitions & Expos — Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Vision 2030 Showcase", slug: "vision-2030", desc: "A large-format exhibition and brand showcase aligned with Vision 2030 themes." },
                { title: "Global Tech Summit", slug: "global-tech-summit", desc: "Exhibitor pavilions and B2B matchmaking integrated into a major technology event." },
                { title: "Dammam Corporate Seminar", slug: "dammam-corporate-seminar", desc: "An Eastern Province industry showcase with custom stands and delegate management." },
              ].map((p) => (
                <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
                  <h4 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">View Project <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-8">
              <div>
                <h3 className="text-neutral-900 font-bold text-lg">Exhibiting at a Saudi expo?</h3>
                <p className="text-neutral-500 text-sm mt-1">Book a free consultation or speak with our exhibition team — we typically reply within two hours.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href="/consultation" className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">Book a Free Consultation</Link>
                <Link href="/contact" className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">Contact Us</Link>
              </div>
            </div>
            <p className="text-neutral-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore <Link href="/services/conferences" className="text-[var(--primary)] font-semibold hover:underline">conference management</Link>.</p>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">Related Services</h2>
              <Link href="/services" className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">View all services <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Conference Management", slug: "conferences", desc: "B2B summit planning, PCO services, and hybrid conference management." },
                { title: "Corporate Events", slug: "corporate-events", desc: "Executive summits, galas, and corporate event management in KSA." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and technical production for large-scale expos." },
                { title: "Event Services & Venues", slug: "production-venues", desc: "Venue sourcing, catering, and decoration for trade shows." },
              ].map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{rel.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">Learn More <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exhibition Locations ── */}
        <section className="py-16 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Exhibition Management by City</h2>
            <p className="text-neutral-400 text-xs mb-8">Full-service exhibition management at RICEC, JCFE, DCEC, and all major Saudi convention centres.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Exhibition Management Riyadh (RICEC)", href: "/locations/riyadh" },
                { name: "Exhibition Management Jeddah (JCFE)", href: "/locations/jeddah" },
                { name: "Exhibition Management Dammam", href: "/locations/dammam" },
              ].map((loc) => (
                <Link
                  key={loc.href}
                  href={loc.href}
                  className="px-5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── MICE Industry Insights ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-8 uppercase tracking-widest">MICE Industry Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", slug: "mice-tourism-saudi-arabia-complete-guide-2026", desc: "Market size, key exhibition venues, and how to plan a MICE event in Saudi Arabia." },
                { title: "State of the MICE Industry in Saudi Arabia 2026", slug: "state-of-mice-industry-saudi-arabia-2026", desc: "Explosive growth in exhibitions and conferences — the numbers and what they mean for exhibitors." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">Industry Guide</span>
                  <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
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
