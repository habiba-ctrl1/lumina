"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import PartnerNetworkGallery from "@/components/PartnerNetworkGallery";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Layout, Monitor, Globe, Users, PenTool, Lightbulb, TrendingUp, Award, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function ExhibitionsPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management Exhibition Management",
        "image": "https://saudieventmanagement.com/services/corporate.webp",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riyadh",
          "addressCountry": "SA"
        },
        "telephone": "+966539388072"
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
        "description": "Coordinating exhibition management aligned with Saudi Expo 2030 initiatives."
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

  // ── Arabic body content (phase 1b) — parallel to the English arrays above. ──
  const expoServicesAr = [
    { title: "تنظيم المعارض التجارية", desc: "إدارة متكاملة لمعارض بحجم إندكس السعودية والزراعة السعودية بوفود دولية." },
    { title: "تصميم الأجنحة", desc: "خبراء حائزون على جوائز في تصميم أجنحة المعارض بالمملكة لجايتكس وأجنحة المعارض التجارية الكبرى." },
    { title: "بناء المنصات", desc: "باني منصات معارض رائد لإكسبو السعودية 2030، نبتكر أجنحة عرض مبهرة في السعودية." },
    { title: "المعارض الدولية", desc: "منظِّم معارض دولي استراتيجي في السعودية يربط شركاء أديبك العالميين بالمملكة." },
    { title: "العرض الرقمي", desc: "فعاليات عرض تجارية مؤثّرة وعروض منتجات في السعودية بتقنيات صوت وصورة وواقع افتراضي تفاعلية." },
    { title: "المطابقة التجارية (B2B)", desc: "مخطّط معارض B2B محترف في الرياض يسهّل تواصلًا عالي القيمة لقمم المعارض في جدة." },
    { title: "الاستراتيجية الإبداعية", desc: "تطوير مفاهيم فريدة تضمن تميّز علامتك في المعارض التنافسية مثل إندكس السعودية." },
    { title: "تفاعل الزوّار", desc: "استراتيجيات مثبتة لزيادة الإقبال وتحويل العملاء المحتملين في كبرى القاعات مثل مركز الرياض للمعارض." },
  ];

  const faqsAr = [
    { q: "ما أبرز المعارض في السعودية؟", a: "تشمل أبرز المعارض LEAP وبيج 5 كونستركت وإندكس السعودية. ونقدّم تصميم أجنحة وإدارة راقية للعلامات الدولية في هذه الفعاليات البارزة." },
    { q: "من يدير المعارض التجارية في الرياض؟", a: "إدارة الفعاليات السعودية منظِّم معارض رائد في السعودية، يعمل كحلقة وصل رئيسية بين العارضين والقاعات مثل RICEC وRECC لتنفيذ متقن." },
    { q: "متى المعرض الكبير القادم في السعودية؟", a: "تقويم المعارض متغيّر، بمواسم ذروة في الربعين الأول والرابع. تواصل معنا للحصول على «التقويم السنوي للمعارض السعودية» وجداول التخطيط الاستراتيجي." },
    { q: "نريد المشاركة في معرض بالرياض — من أين نبدأ؟", a: "الخطوة الأولى هي حجز مساحة المعرض مبكرًا في المملكة. وتقدّم إدارة الفعاليات السعودية استشارات متكاملة تساعدك على اختيار الفعالية الأنسب وتأمين المساحة وإدارة جميع اللوجستيات المحلية." },
    { q: "ما أبرز المعارض القادمة في السعودية 2025؟", a: "يشهد 2025 معارض LEAP والزراعة السعودية وإندكس السعودية وقممًا كبرى متوافقة مع رؤية 2030. ويمكننا مواءمة علامتك مع أنسب الفرص التجارية." },
    { q: "كيف تصمّم جناح معرض لجمهور سعودي؟", a: "يتطلب ذلك موازنة التقنية الحديثة مع اللمسات الثقافية، مثل مناطق المجلس الخاصة. ويتميّز فريق تصميم أجنحة المعارض لدينا في الرياض بابتكار أجنحة مؤثّرة متناغمة ثقافيًا." },
    { q: "منظّم معارض تجارية قريب مني في الرياض", a: "تتخذ إدارة الفعاليات السعودية من الرياض مقرًا لها، وتوفّر دعمًا ميدانيًا سريعًا ولوجستيات لأي معرض تجاري." },
    { q: "شركة إدارة معارض في السعودية", a: "بصفتنا شركة إدارة معارض من الطراز الأول في السعودية، نقدّم خدمات شاملة في عموم المملكة لأي معرض صناعي أو تجاري." },
    { q: "باني أجنحة معارض في جدة", a: "تعمل إدارة الفعاليات السعودية بكثافة على الساحل الغربي، بصفتها باني أجنحة المعارض الأول في جدة لفعاليات العرض التجارية المخصّصة." },
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
          title={isAr ? "إدارة المعارض" : "Exhibition Management"}
          titleHighlight={isAr ? "في السعودية" : "Saudi Arabia"}
          subtitle={
            isAr
              ? "منظِّم رائد للمعارض التجارية وشركة متخصصة في إدارة المعارض بالسعودية — بالشراكة مع إكسبو السعودية 2030 وجايتكس السعودية وبيج 5 السعودية لحضورٍ عالمي المستوى في كل معرض."
              : "Premier trade show organizer and exhibition management company in Saudi Arabia — partnering with Saudi Expo 2030, GITEX Saudi Arabia, and Big 5 Saudi for world-class presence at every expo."
          }
          backgroundImage="/services/premium_exhibition_hero.webp"
          imageAlt="Large-scale international trade show and exhibition in Saudi Arabia with custom booths"
          enableParallax
          badge={isAr ? "المعارض والإكسبو" : "Exhibitions & Expos"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "المعارض" : "Exhibitions" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "10+", label: "Saudi Cities Covered" },
            { value: "20+", label: "Vetted Vendors" },
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
              {isAr ? "نظّم معرضك" : "Organize Your Expo"}
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? "احجز مساحة عرض" : "Book Exhibition Space"}
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
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? "+20 مورد معتمد" : "20+ Vetted Vendors"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? "لوجستيات القاعات والدعم" : "Venue Logistics & Support"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>INDEX SAUDI</span>
                <span>SAUDI AGRICULTURE</span>
                <span>ADIPEC</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                {isAr ? "«تصميم معارض حائز على جوائز 2024»" : "\"Award-Winning Exhibition Design 2024\""}
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
                {isAr ? "منظِّم المعارض التجارية الأول في السعودية" : "Saudi Arabia's Premier Trade Show Organizer"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? "نرتقي بإدارة المعارض" : "Elevating Exhibition Management"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "في السعودية" : "in Saudi Arabia"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    بصفتنا شركة إدارة معارض متكاملة، نقدّم خدمات شاملة للمعارض التجارية B2B والأجنحة الدولية. من تأمين مساحات عرض مميزة في <Link href={`${arHref}/locations/riyadh`} className="text-[var(--primary)] hover:underline font-semibold">مركز الرياض للمعارض RICEC</Link> إلى <Link href={`${arHref}/services/event-production`} className="text-[var(--primary)] hover:underline font-semibold">تصميم أجنحة مبهرة</Link> والتوافق مع <Link href={`${arHref}/portfolio/vision-2030`} className="text-[var(--primary)] hover:underline font-semibold">رؤية 2030</Link>، يضمن فريقنا أن تستحوذ علامتك على الأنظار.
                  </>
                ) : (
                  <>
                    As a fully integrated exhibition management company, we provide end-to-end services for B2B trade shows and international pavilions. From securing premium floor space at <Link href="/locations/riyadh" className="text-[var(--primary)] hover:underline font-semibold">Riyadh&apos;s RICEC</Link> to breathtaking <Link href="/services/event-production" className="text-[var(--primary)] hover:underline font-semibold">custom booth design</Link> and <Link href="/portfolio/vision-2030" className="text-[var(--primary)] hover:underline font-semibold">Vision 2030</Link> alignments, our team ensures your brand commands attention.
                  </>
                )}
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
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{isAr ? expoServicesAr[i].title : service.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? expoServicesAr[i].desc : service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER PRODUCTION GALLERY ── */}
        <PartnerNetworkGallery
          isAr={isAr}
          eyebrow="Real Exhibition Builds"
          eyebrowAr="أعمال معارض حقيقية"
          heading={<>Exhibition Stands <span className="text-[var(--primary)]">Delivered by Our Network</span></>}
          headingAr={<>أجنحة معارض <span className="text-[var(--primary)]">من شبكة شركائنا</span></>}
          subheading="A selection of exhibition stand and interactive LED builds delivered through SEM's vetted production partner network across the Gulf region."
          subheadingAr="مجموعة مختارة من أجنحة المعارض وتركيبات الشاشات التفاعلية التي تم تنفيذها عبر شبكة شركاء الإنتاج المعتمدين لدى SEM في منطقة الخليج."
          images={[
            {
              src: "/services/partner-network/exhibition-stand-design-saudi-arabia-1.webp",
              alt: "Custom exhibition stand design with interactive LED tower installation at a major Gulf trade show",
              altAr: "تصميم جناح معرض مخصص مع تركيب برج شاشات LED تفاعلي في معرض تجاري كبير بالخليج",
            },
            {
              src: "/services/partner-network/exhibition-stand-design-saudi-arabia-2.webp",
              alt: "Interactive LED exhibition tower build on the show floor of a national exhibition",
              altAr: "تركيب برج شاشات LED تفاعلي على أرضية معرض وطني",
            },
          ]}
        />

        {/* ── LEAD FORM / EXPO ENQUIRY ── */}
        <section id="expo-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/exhibition_hall_riyadh.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "احجز حضورك" : "Reserve Your Presence"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    احجز مساحة مميزة.<br />
                    <span className="text-[#C5A880]">وتميّز في كل معرض.</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Secure premium space.<br />
                    <span className="text-[#C5A880]">Stand out at every expo.</span>
                  </h2>
                )}
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "أخبرنا بالمعرض الذي تستهدفه، ويعيد إليك فريق المعارض مفهوم جناح وخيارات مساحات في RICEC أو RECC وعرض بناء مفصّلًا خلال ساعتين."
                    : "Tell us which show you're targeting and our exhibitions team returns a stand concept, space options at RICEC or RECC, and an itemised build quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? [
                    "حجز مساحات بالأولوية في RICEC وRECC وJCFE",
                    "تصميم جناح ثلاثي الأبعاد مخصّص وبناء متكامل",
                    "لوجستيات ميدانية وصوت وصورة وتقنية التقاط العملاء",
                    "مطابقة تجارية B2B لتعظيم العملاء المؤهَّلين",
                  ]
                    : [
                    "Priority space booking at RICEC, RECC & JCFE",
                    "Custom 3D stand design & turnkey build",
                    "On-site logistics, AV & lead-capture tech",
                    "B2B matchmaking to maximise qualified leads",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20exhibit%20at%20a%20Saudi%20trade%20show."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="exhibitions_page"
                defaultEventType="Exhibition / Trade Show"
                eyebrow={isAr ? "استفسار معرض" : "Exhibition Enquiry"}
                heading={isAr ? "خطّط لحضورك في المعرض" : "Plan your exhibition presence"}
                subheading={isAr ? "سيردّ فريق المعارض خلال ساعتين بخيارات أجنحة وعرض سعر مفصّل." : "Our exhibitions team will respond within 2 hours with stand options and an itemised quote."}
                submitLabel={isAr ? "اطلب عرض المعرض" : "Request Exhibition Proposal"}
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
                  {isAr ? "موارد العارضين" : "Exhibitor Resources"}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">{isAr ? <>رؤى <br /><span className="text-[var(--primary)]">العارضين</span></> : <>Exhibitor <br /><span className="text-[var(--primary)]">insights</span></>}</h2>
                <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "موارد استراتيجية لتعظيم حضورك في أرقى المعارض التجارية بالمملكة." : "Strategic resources for maximizing your presence at the Kingdom's most prestigious trade shows."}</p>
                <Link href={`${arHref}/blog`} className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">{isAr ? "عرض كل الأدلّة" : "View All Guides"}</Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {(isAr
                  ? [
                  { title: "التقويم السنوي للمعارض السعودية", desc: "تقدّم بخطوة عبر جدولنا الشامل لأهم المعارض التجارية وقمم الأعمال في المملكة." },
                  { title: "قصص نجاح العارضين", desc: "اكتشف كيف يعظّم عملاؤنا العائد ويؤمّنون عملاء عالي القيمة في القاعات التنافسية." },
                  { title: "أدلّة تفصيل تكاليف المعارض", desc: "تحليل شفّاف لتكاليف بناء الأجنحة ودمج التقنية والتوظيف في المملكة." },
                  { title: "مقالات مقارنة القاعات", desc: "مراجعة معمّقة لـ RICEC وRECC ومركز جدة للمنتديات والفعاليات لاختيار موقعك الأمثل." },
                    ]
                  : [
                  { title: "Annual Saudi exhibition calendar", desc: "Stay ahead with our comprehensive timeline of the Kingdom's most critical trade shows and B2B summits." },
                  { title: "Exhibitor success stories", desc: "Discover how our clients maximize ROI and secure high-value leads at competitive venues." },
                  { title: "Exhibition cost breakdown guides", desc: "A transparent analysis of booth construction, technology integration, and staffing costs in KSA." },
                  { title: "Venue comparison articles", desc: "An in-depth review of RICEC, RECC, and Jeddah Center for Forums & Events to choose your optimal location." }
                ]).map((post, idx) => (
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
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{isAr ? <>دليل <span className="text-[var(--primary)]">المعارض</span></> : <>Expo <span className="text-[var(--primary)]">guide</span></>}</h2>
              <p className="text-neutral-500 mt-4 uppercase tracking-widest text-xs">{isAr ? "كل ما تحتاج معرفته عن المعارض التجارية في السعودية" : "Everything you need to know about Saudi trade shows"}</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-neutral-50/80 border border-neutral-200/80 p-7 rounded-2xl">
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{isAr ? faqsAr[i].q : faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? faqsAr[i].a : faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? "اعتبارات واقعية" : "Real-World Considerations"}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{isAr ? <>تحديات المعارض — <span className="text-[var(--primary)]">نحلّها بالخبرة</span></> : <>Exhibition challenges — <span className="text-[var(--primary)]">solved with experience</span></>}</h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? "يُكسب نجاح المعارض في السعودية أو يُخسر في التفاصيل التشغيلية. وإليك كيف يتعامل فريق المعارض لدينا مع أكثر المخاطر شيوعًا لدى العارضين." : "Trade-show success in Saudi Arabia is won or lost in the operational detail. Here is how our exhibition team handles the risks exhibitors face most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? [
                { c: "نوافذ بناء وتفكيك ضيّقة في RICEC/RECC", s: "فترات الدخول ثابتة ومشتركة مع عشرات العارضين. الأجنحة المعيارية الجاهزة وجدول البناء المتسلسل يجعلان جناحك جاهزًا قبل فتح الأبواب." },
                { c: "الجمارك والشحن للمعروضات الدولية", s: "ننسّق الاستيراد المؤقت والشحن والمناولة الميدانية لتعبر المعروضات الدولية الجمارك وتصل إلى الجناح دون تأخير لحظي." },
                { c: "التميّز في أرضية معرض مزدحمة", s: "تصميم جناح مدروس لخطوط الرؤية، وخيارات الطابقين، وإضاءة وصوت وصورة متكاملة تجذب الإقبال نحو علامتك لا بعيدًا عنها." },
                { c: "تحويل الإقبال إلى عملاء مؤهَّلين", s: "التقاط رقمي للعملاء، ومطابقة تجارية B2B، وتقارير ما بعد المعرض تحوّل حركة الزوّار إلى قائمة قابلة للقياس وجاهزة للمتابعة." },
                  ]
                : [
                { c: "Tight build & teardown windows at RICEC/RECC", s: "Move-in slots are fixed and shared with dozens of exhibitors. Pre-fabricated modular stands and a sequenced build schedule get your stand show-ready before doors open." },
                { c: "Customs & freight for international exhibits", s: "We coordinate temporary import, freight forwarding, and on-site handling so overseas exhibits clear customs and arrive on the stand without last-minute delays." },
                { c: "Standing out on a crowded show floor", s: "Sightline-driven stand design, double-decker options, and integrated lighting and AV pull footfall toward your brand instead of past it." },
                { c: "Turning footfall into qualified leads", s: "Digital lead-capture, B2B matchmaking, and post-show reporting convert visitor traffic into a measurable, follow-up-ready pipeline." },
              ]).map((item) => (
                <div key={item.c} className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{isAr ? "التحدّي" : "Challenge"}</span>
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
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? "المعارض والإكسبو — مشاريع مختارة" : "Exhibitions & Expos — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "عرض رؤية 2030", slug: "vision-2030", desc: "معرض كبير وعرض علامة متوافق مع محاور رؤية 2030." },
                { title: "قمة التقنية العالمية", slug: "global-tech-summit", desc: "أجنحة عارضين ومطابقة تجارية B2B مدمجة في فعالية تقنية كبرى." },
                { title: "ملتقى الدمام للشركات", slug: "dammam-corporate-seminar", desc: "عرض صناعي في المنطقة الشرقية بأجنحة مخصّصة وإدارة مندوبين." },
                  ]
                : [
                { title: "Vision 2030 Showcase", slug: "vision-2030", desc: "A large-format exhibition and brand showcase aligned with Vision 2030 themes." },
                { title: "Global Tech Summit", slug: "global-tech-summit", desc: "Exhibitor pavilions and B2B matchmaking integrated into a major technology event." },
                { title: "Dammam Corporate Seminar", slug: "dammam-corporate-seminar", desc: "An Eastern Province industry showcase with custom stands and delegate management." },
              ]).map((p) => (
                <Link key={p.slug} href={`${arHref}/portfolio/${p.slug}`} className="group bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
                  <h4 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "عرض المشروع" : "View Project"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-8">
              <div>
                <h3 className="text-neutral-900 font-bold text-lg">{isAr ? "تعرض في معرض سعودي؟" : "Exhibiting at a Saudi expo?"}</h3>
                <p className="text-neutral-500 text-sm mt-1">{isAr ? "احجز استشارة مجانية أو تحدّث إلى فريق المعارض — نردّ عادةً خلال ساعتين." : "Book a free consultation or speak with our exhibition team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? "احجز استشارة مجانية" : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? "تواصل معنا" : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-neutral-500 text-sm mt-6">تصفّح <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو استكشف <Link href={`${arHref}/services/conferences`} className="text-[var(--primary)] font-semibold hover:underline">إدارة المؤتمرات</Link>.</p>
            ) : (
              <p className="text-neutral-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore <Link href="/services/conferences" className="text-[var(--primary)] font-semibold hover:underline">conference management</Link>.</p>
            )}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h2>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? "عرض كل الخدمات" : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(isAr
                ? [
                { title: "إدارة المؤتمرات", slug: "conferences", desc: "تخطيط قمم الأعمال وخدمات منظِّم المؤتمرات وإدارة المؤتمرات الهجينة." },
                { title: "فعاليات الشركات", slug: "corporate-events", desc: "القمم التنفيذية والحفلات وإدارة فعاليات الشركات في المملكة." },
                { title: "الإنتاج الفعّالياتي", slug: "event-production", desc: "مسرح وصوت وصورة وإضاءة وإنتاج تقني للمعارض الكبرى." },
                { title: "خدمات الفعاليات والقاعات", slug: "production-venues", desc: "اختيار القاعات والضيافة والديكور للمعارض التجارية." },
                  ]
                : [
                { title: "Conference Management", slug: "conferences", desc: "B2B summit planning, PCO services, and hybrid conference management." },
                { title: "Corporate Events", slug: "corporate-events", desc: "Executive summits, galas, and corporate event management in KSA." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and technical production for large-scale expos." },
                { title: "Event Services & Venues", slug: "production-venues", desc: "Venue sourcing, catering, and decoration for trade shows." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{rel.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "اعرف المزيد" : "Learn More"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Exhibition Locations ── */}
        <section className="py-16 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">{isAr ? "إدارة المعارض حسب المدينة" : "Exhibition Management by City"}</h2>
            <p className="text-neutral-400 text-xs mb-8">{isAr ? "إدارة معارض متكاملة في RICEC وJCFE وDCEC وجميع مراكز المؤتمرات الكبرى بالسعودية." : "Full-service exhibition management at RICEC, JCFE, DCEC, and all major Saudi convention centres."}</p>
            <div className="flex flex-wrap gap-3">
              {(isAr
                ? [
                { name: "إدارة المعارض في الرياض (RICEC)", href: "/locations/riyadh" },
                { name: "إدارة المعارض في جدة (JCFE)", href: "/locations/jeddah" },
                { name: "إدارة المعارض في الدمام", href: "/locations/dammam" },
                  ]
                : [
                { name: "Exhibition Management Riyadh (RICEC)", href: "/locations/riyadh" },
                { name: "Exhibition Management Jeddah (JCFE)", href: "/locations/jeddah" },
                { name: "Exhibition Management Dammam", href: "/locations/dammam" },
              ]).map((loc) => (
                <Link
                  key={loc.href}
                  href={`${arHref}${loc.href}`}
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
            <h2 className="text-sm font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? "موارد قطاع MICE" : "MICE Industry Resources"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", slug: "mice-tourism-saudi-arabia-complete-guide-2026", desc: "Market size, key exhibition venues, and how to plan a MICE event in Saudi Arabia." },
                { title: "State of the MICE Industry in Saudi Arabia 2026", slug: "state-of-mice-industry-saudi-arabia-2026", desc: "Explosive growth in exhibitions and conferences — the numbers and what they mean for exhibitors." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`${arHref}/blog/${post.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">{isAr ? "دليل قطاعي" : "Industry Guide"}</span>
                  <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "اقرأ المقال" : "Read Article"} <ChevronRight size={12} /></span>
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
