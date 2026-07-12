"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import { Moon, Star, Flag, Gift, Landmark, Award, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function SeasonalEventsPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
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
            "name": "What should I know about planning events during Ramadan in Saudi Arabia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ramadan in Saudi Arabia requires cultural sensitivity, adjusting event timings to post-iftar or suhoor hours, and focusing on traditional hospitality. As a premier Ramadan event planner KSA, Saudi Event Management manages all aspects of luxury corporate iftars and brand activations."
            }
          },
          {
            "@type": "Question",
            "name": "We want to do a Ramadan iftar activation for our brand in Riyadh. Where do we start?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starting a Ramadan activation requires early concept design and venue booking. Saudi Event Management provides full-service solutions for brand activations, from bespoke Majlis setups to luxury catering."
            }
          },
          {
            "@type": "Question",
            "name": "How to organize a National Day celebration for our company?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Organizing a National Day celebration requires patriotic branding, entertainment permits, and engaging cultural activities. As your National Day event organizer Riyadh, we recommend starting the process 3-4 months in advance."
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
          },
          {
            "@type": "Question",
            "name": "Ramadan event company near me Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is a premier Ramadan event company near me Saudi Arabia, offering localized, high-end Islamic seasonal events across Riyadh, Jeddah, and the Eastern Province."
            }
          },
          {
            "@type": "Question",
            "name": "National Day party organizer Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As the top National Day party organizer Riyadh, Saudi Event Management creates massive patriotic festivals and exclusive corporate celebrations for the Kingdom's most important holiday."
            }
          }
        ]
      },
      {
        "@type": "Article",
        "headline": "How to Plan a National Day Celebration in Saudi Arabia",
        "author": {
          "@type": "Organization",
          "name": "Saudi Event Management"
        },
        "datePublished": "2024-09-01",
        "description": "A comprehensive guide to organizing high-impact National Day galas and community festivals in Riyadh."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Seasonal & Religious Events", "item": "https://saudieventmanagement.com/services/seasonal" }
        ]
      },
      {
        "@type": "Organization",
        "name": "Saudi Event Management Seasonal Events",
        "description": "Specializing in Saudi National Day, Founding Day, and Riyadh Season cultural activations."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-slate-900">
        <Navbar />

        <InternalPageHero
          title={isAr ? "إدارة الفعاليات الثقافية" : "Cultural Event Management"}
          titleHighlight={isAr ? "في السعودية" : "in Saudi Arabia"}
          subtitle={
            isAr
              ? "المنظِّم الرائد في المملكة لفعاليات رمضان واليوم الوطني والعيد — نحفظ التراث السعودي ونقدّم تجارب ثقافية أصيلة في الرياض وجدة وما بعدها."
              : "The Kingdom's leading Ramadan, National Day, and Eid event organizer — preserving Saudi heritage and delivering authentic cultural experiences across Riyadh, Jeddah, and beyond."
          }
          backgroundImage="/services/premium_cultural_event_hero.webp"
          imageAlt="Luxury Saudi cultural event and celebration at night with traditional Majlis"
          badge={isAr ? "الفعاليات الثقافية | التراث السعودي" : "Cultural Events | التراث السعودي"}
          enableParallax
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "الفعاليات الثقافية" : "Cultural Events" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#celebration-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "خطّط لاحتفالك" : "Plan Your Celebration"}
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? "تحدّث إلى فريق الفعاليات" : "Talk to Our Events Team"}
            </a>
          </div>
        </div>

        {/* E-E-A-T & Cultural Credentials */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-12">
              <div className="flex items-center gap-10">
                <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm tracking-widest">{isAr ? "خبرة تراثية عميقة" : "Deep Heritage Expertise"}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{isAr ? "حساسية ثقافية وإقليمية" : "Regional Cultural Sensitivity"}</p>
                </div>
              </div>
              <div className="flex gap-10 grayscale opacity-40  font-bold text-xs tracking-widest">
                <span>RIYADH SEASON</span>
                <span>NATIONAL DAY</span>
                <span>FOUNDING DAY</span>
              </div>
              <div className="text-sm text-gray-500 font-light ">
                {isAr ? "«برامج اليوم الوطني ويوم التأسيس بمعايير ثقافية ولوجستية دقيقة.»" : "\"National Day and Founding Day programming delivered to rigorous cultural and logistical standards.\""}
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/majlis_gathering_people.webp')" }} aria-label="Cultural event visual showcase">
          <div aria-hidden className="absolute inset-0 bg-slate-900/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Cultural Heritage</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Saudi Tradition</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Cultural Heritage</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Saudi Tradition</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Cultural Heritage</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Saudi Tradition</span>
            </div>
          </div>
        </section>

        {/* Featured Occasions */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-24">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                {isAr ? "منظِّم التراث الأول في السعودية" : "Saudi Arabia's Premier Heritage Organizer"}
              </span>
              <h2 className="text-3xl md:text-4xl font-sans text-slate-900 mb-6 font-bold">
                {isAr ? "نرتقي بالفعاليات الثقافية" : "Elevating Cultural Events"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "في السعودية" : "in Saudi Arabia"}</span>
              </h2>
              <p className="text-gray-500 max-w-3xl mx-auto text-sm leading-relaxed mb-8">
                {isAr ? (
                  <>
                    بصفتنا شركة إدارة فعاليات ثقافية متكاملة، نقدّم خدمات شاملة للمهرجانات الدينية والاحتفالات العامة والأعياد الوطنية. من <Link href={`${arHref}/services/destination-events`} className="text-[var(--primary)] hover:underline font-semibold">تفعيلات العلا الوجهاتية</Link> الآسرة إلى توافقات <Link href={`${arHref}/portfolio/vision-2030`} className="text-[var(--primary)] hover:underline font-semibold">رؤية 2030</Link> الوطنية، يضمن فريقنا أن تكرّم كل مناسبة تراثنا السعودي بأصالة.
                  </>
                ) : (
                  <>
                    As a fully integrated cultural event management company, we provide end-to-end services for religious festivals, public celebrations, and national holidays. From breathtaking <Link href="/services/destination-events" className="text-[var(--primary)] hover:underline font-semibold">AlUla destination activations</Link> to <Link href="/portfolio/vision-2030" className="text-[var(--primary)] hover:underline font-semibold">Vision 2030</Link> national alignments, our team ensures every occasion authentically honors our Saudi heritage.
                  </>
                )}
              </p>
              <div className="w-24 h-px bg-[var(--primary-dark)]/30 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {(isAr
                ? [
                { icon: Moon, title: "فعاليات رمضان", desc: "تفعيلات راقية للشهر الفضيل. متخصصون في إفطارات وسحور الشركات باحترام عميق للمناسبات الإسلامية الموسمية.", linkText: "أعمال رمضان" },
                { icon: Flag, title: "اليوم الوطني (23 سبتمبر)", desc: "تخطيط احتفالات اليوم الوطني المؤثّرة وتفعيلات الإجازات في المملكة. من الألعاب النارية الكبرى إلى مهرجانات التراث المجتمعية.", linkText: "تجربة اليوم الوطني" },
                { icon: Gift, title: "عيد الفطر والأضحى", desc: "إدارة شاملة للاحتفالات الدينية في المملكة. نحفظ بهجة العيدين بفعاليات فاخرة للشركات والعائلات.", linkText: "إدارة العيد" },
                { icon: Landmark, title: "يوم التأسيس (22 فبراير)", desc: "تكريم جذور المملكة في يوم التأسيس بمعارض تقليدية وفعاليات تراثية سعودية.", linkText: "تراث يوم التأسيس" },
                { icon: Star, title: "موسم الحج والعمرة", desc: "دعم الضيافة والتجمعات للعائلات وكبار الضيوف خلال موسم سفر الحج والعمرة في السعودية — فعاليات ترحيب، وضيافة مجالس، ولوجستيات الضيوف.", linkText: "ضيافة موسمية" },
                { icon: Award, title: "موسم الرياض", desc: "المساهمة في أكثر مواسم الترفيه طموحًا بالمملكة بتخطيط احتفالات سنوية فريدة وتنفيذ متقن.", linkText: "تفعيلات الموسم" },
                  ]
                : [
                {
                  icon: Moon,
                  title: "Ramadan Events",
                  desc: "Exquisite activations for the holy month. Specialized in corporate iftars and suhoors with deep respect for Islamic seasonal events.",
                  linkText: "Ramadan Portfolio"
                },
                {
                  icon: Flag,
                  title: "National Day (Sep 23)",
                  desc: "Planning high-impact National Day (اليوم الوطني) celebrations and holiday activation KSA. From grand fireworks to community heritage festivals.",
                  linkText: "National Day Experience"
                },
                {
                  icon: Gift,
                  title: "Eid Al-Fitr & Al-Adha",
                  desc: "Comprehensive religious celebration management KSA. Preserving the joy of both Eids with luxury corporate and family events.",
                  linkText: "Eid Management"
                },
                {
                  icon: Landmark,
                  title: "Founding Day (Feb 22)",
                  desc: "Honoring the Kingdom&apos;s roots on يوم التأسيس with traditional exhibitions and Saudi heritage events.",
                  linkText: "Founding Day Heritage"
                },
                {
                  icon: Star,
                  title: "Hajj & Umrah Season",
                  desc: "Hospitality and gathering support for families and VIP guests during the Hajj and Umrah travel season in Saudi Arabia — welcome events, majlis hospitality, and guest logistics.",
                  linkText: "Seasonal Hospitality"
                },
                {
                  icon: Award,
                  title: "Riyadh Season",
                  desc: "Contributing to the Kingdom&apos;s most ambitious entertainment season with unique annual celebration planning and flawless execution.",
                  linkText: "Season Activations"
                },
              ]).map((item: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 group"
                >
                  <div className="w-16 h-16 bg-gold-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--primary-dark)] transition-colors">
                    <item.icon size={28} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-slate-900 mb-8">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">{item.desc}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] border-b border-gold-200 pb-1">{item.linkText}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-32 bg-white relative border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-slate-900">{isAr ? <>موارد <br/><span className="text-[var(--primary)]">التراث</span></> : <>Heritage <br/><span className="text-[var(--primary)]">Resources</span></>}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{isAr ? "رؤى خبيرة لتخطيط فعاليات ذات دلالة ثقافية في عموم المملكة." : "Expert insights for planning culturally significant events across the Kingdom."}</p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-bold text-sm">{isAr ? "صالح الحميد" : "Saleh Al-Humaid"}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isAr ? "مستشار الشؤون الثقافية" : "Cultural Affairs Advisor"}</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {(isAr
                  ? [
                  { title: "دليل كامل لتفعيلات فعاليات رمضان في السعودية", desc: "تعمّق في تصميم المجالس والضيافة التقليدية والتفاعل الأخلاقي خلال الشهر الفضيل." },
                  { title: "تخطيط فعاليات اليوم الوطني السعودي 2025", desc: "الاستعداد لأكبر احتفال في المملكة بهوية واسعة النطاق وثيمات وطنية." },
                  { title: "دليل احتفالات العيد للشركات في المملكة", desc: "كيفية استضافة تجمّعات عيد شاملة واحتفالية لبيئات الشركات المتنوعة." },
                  { title: "تقويم الفعاليات الموسمية في السعودية 2025", desc: "تتبّع تحوّل المملكة عبر موسم الرياض والمحطات الدينية والأعياد الوطنية." },
                    ]
                  : [
                  { title: "Complete guide to Ramadan event activations in Saudi Arabia", desc: "A deep dive into Majlis design, traditional catering, and ethical engagement during the holy month." },
                  { title: "Saudi National Day event planning 2025", desc: "Preparing for the Kingdom&apos;s biggest celebration with grand-scale branding and patriotic themes." },
                  { title: "Corporate Eid celebration guide KSA", desc: "How to host inclusive and festive Eid gatherings for diverse corporate environments." },
                  { title: "Seasonal event calendar Saudi Arabia 2025", desc: "Tracking the Kingdom&apos;s transformation through Riyadh Season, religious milestones, and national days." }
                ]).map((post: any, idx: number) => (
                  <div key={idx} className="p-8 bg-white rounded-2xl hover:bg-gold-50 transition-colors cursor-pointer group">
                    <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Arabic Heritage Content Section */}
        <section className="py-32 bg-emerald-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/services/gala_decor_saudi.webp"
                  alt="احتفالات اليوم الوطني السعودي وفعاليات رمضان - تجهيز طاولة ضيافة فاخرة بطابع سعودي"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-10">
                <h2 className="text-2xl md:text-4xl font-sans leading-tight font-bold">
                  الاحتفاء بـ <br/><span className="text-[var(--primary)]">الهوية السعودية</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "تنظيم فعاليات رمضان الرياض", desc: "نقدم تجارب إفطار وسحور فاخرة تجمع بين الأصالة والحداثة." },
                    { title: "احتفالات اليوم الوطني السعودي", desc: "تنظيم فعاليات وطنية كبرى تعزز روح الانتماء والفخر بالوطن." },
                    { title: "فعاليات العيد الرياض", desc: "إدارة احتفالات العيد للشركات والعائلات بأعلى معايير الرفاهية." },
                    { title: "فعاليات يوم التأسيس السعودي", desc: "تسليط الضوء على الإرث التاريخي للمملكة من خلال فعاليات تراثية مبتكرة." },
                  ].map((local: any, idx: number) => (
                    <div key={idx} className="border-e-2 border-[var(--primary)] pe-6">
                      <h4 className="text-xl font-bold mb-2">{local.title}</h4>
                      <p className="text-slate-600 text-sm font-light">{local.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD FORM / CELEBRATION ENQUIRY ── */}
        <section id="celebration-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/alula_gala_people.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "خطّط لاحتفالك" : "Plan Your Celebration"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    كرّم كل تقليد.<br />
                    <span className="text-[#C5A880]">واحتفل بأناقة.</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Honour every tradition.<br />
                    <span className="text-[#C5A880]">Celebrate in style.</span>
                  </h2>
                )}
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "من إفطارات رمضان وحفلات اليوم الوطني إلى مهرجانات يوم التأسيس — أخبرنا بمناسبتك ويعيد إليك فريقنا مفهومًا وعرضًا مبوّبًا خلال ساعتين."
                    : "From Ramadan iftars and National Day galas to Founding Day festivals — tell us your occasion and our team returns a concept and itemised quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? [
                    "برامج رمضان والعيد واليوم الوطني الأصيلة",
                    "إدارة تصاريح هيئة الترفيه وموافقات البلدية",
                    "مسرح ثقافي وإضاءة وترفيه مباشر",
                    "ضيافة ثنائية اللغة للضيوف وكبار الشخصيات",
                  ]
                    : [
                    "Authentic Ramadan, Eid & National Day programming",
                    "GEA permits & municipality approvals handled",
                    "Cultural staging, lighting & live entertainment",
                    "Bilingual hospitality for guests & dignitaries",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20plan%20a%20cultural%20or%20national%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="cultural_events_page"
                defaultEventType="Cultural / National Event"
                eyebrow={isAr ? "استفسار احتفال" : "Celebration Enquiry"}
                heading={isAr ? "خطّط لفعاليتك الثقافية" : "Plan your cultural event"}
                subheading={isAr ? "سيردّ فريق الفعاليات خلال ساعتين بمفهوم وعرض مبوّب." : "Our events team will respond within 2 hours with a concept and itemised quote."}
                submitLabel={isAr ? "اطلب عرض الفعالية" : "Request Event Proposal"}
                eventTypeOptions={[
                  "Ramadan Iftar / Suhoor",
                  "Eid Celebration",
                  "National Day / Founding Day",
                  "Cultural Festival",
                  "Government / Community Event",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-2xl md:text-3xl font-sans text-slate-900 font-bold">{isAr ? <>رؤى <span className="text-[var(--primary)]">ثقافية</span></> : <>Cultural <span className="text-[var(--primary)]">Insights</span></>}</h2>
              <p className="text-gray-500 mt-4 uppercase tracking-widest text-xs">{isAr ? "نجيب عن أسئلتك حول الفعاليات الموسمية في المملكة" : "Answering your questions about KSA Seasonal Events"}</p>
            </div>

            <div className="space-y-6">
              {(isAr
                ? [
                { q: "ما الذي يجب معرفته عن تخطيط الفعاليات خلال رمضان في السعودية؟", a: "يتطلب التخطيط فهمًا ثقافيًا عميقًا. تتحوّل أوقات الفعاليات إلى وقت متأخر من الليل (السحور)، ويبرز الديكور الضيافة التقليدية. وبصفتنا من أبرز مخطّطي فعاليات رمضان في المملكة، تصنع إدارة الفعاليات السعودية تجارب أصيلة وراقية." },
                { q: "نريد تنفيذ تفعيل إفطار رمضاني لعلامتنا في الرياض. من أين نبدأ؟", a: "ابدأ بمفهوم متناغم ثقافيًا. نساعدك على تصميم التفعيل، وتأمين مساحة مميزة في مول أو فندق، والتنفيذ بإتقان." },
                { q: "كيف ننظّم احتفال اليوم الوطني لشركتنا؟", a: "ركّز على الثيمات الوطنية، والتنسيق المبكر للقاعة، وتأمين تصاريح هيئة الترفيه اللازمة. وبصفتنا منظّم فعاليات اليوم الوطني في الرياض، نتولّى كل شيء من الديكور الأخضر إلى الترفيه التقليدي." },
                { q: "هل يمكنكم إدارة احتفالات العيد أيضًا؟", a: "نعم، نحن شركة رائدة لاحتفالات العيد في السعودية، متخصصون في التجمّعات العائلية الفاخرة الحميمة واحتفالات العيد المؤسسية الكبرى." },
                { q: "ما الذي يميّز احتفالات يوم التأسيس السعودي؟", a: "إنه وقت للاحتفاء بالتراث النجدي والإقليمي السعودي. تبرز فعالياتنا الضيافة التقليدية والحِرف والسرد التاريخي." },
                { q: "شركة فعاليات رمضان قريبة مني في السعودية", a: "تعمل إدارة الفعاليات السعودية بكثافة في عموم المملكة، وتوفّر خبرة محلية فورية لأي تفعيل علامة رمضاني راقٍ أو إفطار مؤسسي." },
                { q: "منظّم حفلات اليوم الوطني في الرياض", a: "بصفتنا منظّم حفلات اليوم الوطني الأبرز في الرياض، تتخصص إدارة الفعاليات السعودية في صناعة فعاليات وطنية واسعة النطاق ومهرجانات مجتمعية متوافقة مع رؤية 2030." },
                  ]
                : [
                { q: "What should I know about planning events during Ramadan in Saudi Arabia?", a: "Planning requires deep cultural understanding. Event timings shift to late night (Suhoor), and decor emphasizes traditional hospitality. As a top Ramadan event planner KSA, Saudi Event Management creates authentic, high-end experiences." },
                { q: "We want to do a Ramadan iftar activation for our brand in Riyadh. Where do we start?", a: "Start with a culturally resonant concept. We help you design the activation, secure premium mall or hotel space, and execute flawlessly." },
                { q: "How to organize a National Day celebration for our company?", a: "Focus on patriotic themes, early venue coordination, and secure necessary GEA permits. As your National Day event organizer Riyadh, we handle everything from green-themed decor to traditional entertainment." },
                { q: "Can you manage Eid celebrations as well?", a: "Yes, we are a leading Eid celebration company Saudi Arabia, specializing in both intimate luxury family gatherings and large-scale corporate Eid festivities." },
                { q: "What is special about Saudi Founding Day celebrations?", a: "It's a time to celebrate traditional 'Najdi' and regional Saudi heritage. Our events emphasize traditional hospitality, crafts, and historical storytelling." },
                { q: "Ramadan event company near me Saudi Arabia", a: "Saudi Event Management operates extensively across Saudi Arabia, offering immediate local expertise for any high-end Ramadan brand activation or corporate Iftar." },
                { q: "National Day party organizer Riyadh", a: "As a premier National Day party organizer Riyadh, Saudi Event Management specializes in creating large-scale patriotic events and community festivals that align with Vision 2030." }
              ]).map((faq: any, i: number) => (
                <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-8">{faq.q}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">{isAr ? "موارد الفعاليات الثقافية" : "Cultural Events Resources"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(isAr
                ? [
                { title: "مهرجانات العلا الصحراوية والتفعيلات الثقافية", slug: "alula-desert-festivals-cultural-activations", desc: "اكتشف كيف توظّف العلا تراثها الغني لاستضافة فعاليات ثقافية عالمية وفق رؤية 2030." },
                { title: "أفكار فعاليات اليوم الوطني السعودي للشركات", slug: "national-day-event-ideas-saudi-arabia-corporates", desc: "أفكار إبداعية لفعاليات الشركات في اليوم الوطني — حفلات وطنية وتفعيلات وامتثال لهيئة الترفيه." },
                { title: "دليل تنظيم فعاليات الشركات في رمضان", slug: "ramadan-event-planning-guide-saudi-arabia", desc: "دليل كامل لتخطيط إفطارات وسحور الشركات في السعودية." },
                { title: "رؤية 2030 تعيد تعريف مشهد الفعاليات في السعودية", slug: "vision-2030-redefining-saudi-event-landscape", desc: "من نيوم إلى هيئة الترفيه، اكتشف كيف تصنع رؤية 2030 تجارب ثقافية تحويلية." },
                { title: "دليل فعاليات العلا: مرايا والحِجر والصحراء", slug: "alula-events-guide-maraya-hegra-desert", desc: "الدليل الأشمل لتخطيط الفعاليات في العلا — الوصول إلى مرايا، وفعاليات الحِجر التراثية، وتصاريح الهيئة الملكية للعلا." },
                  ]
                : [
                { title: "AlUla Desert Festivals & Cultural Activations", slug: "alula-desert-festivals-cultural-activations", desc: "Discover how AlUla is leveraging its rich heritage to host world-class cultural events under Vision 2030." },
                { title: "Saudi National Day Event Ideas for Corporates", slug: "national-day-event-ideas-saudi-arabia-corporates", desc: "Creative corporate event ideas for Saudi National Day — patriotic galas, themed activations and GEA compliance." },
                { title: "Corporate Ramadan Event Planning Guide", slug: "ramadan-event-planning-guide-saudi-arabia", desc: "Complete guide to planning corporate iftar and suhoor events in Saudi Arabia." },
                { title: "Vision 2030 Redefining Saudi Arabia's Event Landscape", slug: "vision-2030-redefining-saudi-event-landscape", desc: "From NEOM to GEA, discover how Vision 2030 is creating transformative cultural experiences." },
                { title: "AlUla Events Guide: Maraya, Hegra & Desert Planning", slug: "alula-events-guide-maraya-hegra-desert", desc: "The definitive guide to planning events in AlUla — Maraya access, Hegra heritage events, and RCU permits." },
              ]).map((post) => (
                <Link
                  key={post.slug}
                  href={`${arHref}/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">{isAr ? "رؤية ثقافية" : "Cultural Insight"}</span>
                  <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "اقرأ المقال" : "Read Article"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? "اعتبارات واقعية" : "Real-World Considerations"}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{isAr ? <>تحديات الفعاليات الثقافية — <span className="text-[var(--primary)]">نحلّها بالخبرة</span></> : <>Cultural event challenges — <span className="text-[var(--primary)]">solved with experience</span></>}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? "تحمل الفعاليات الموسمية والثقافية جداول ضيّقة وتقاليد عميقة. وإليك كيف يتعامل فريقنا مع أكثر الاعتبارات التي يطرحها العملاء." : "Seasonal and cultural events carry tight timelines and deep traditions. Here is how our team handles the considerations clients raise most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? [
                { c: "جداول رمضان والمواسم الضيّقة", s: "تُحجز قاعات الإفطار والسحور بسرعة. نثبّت المواعيد والضيافة مبكرًا حتى لا يُحرم تفعيلك الرمضاني من أفضل المساحات." },
                { c: "الأصالة عبر المناطق (نجدي مقابل حجازي)", s: "تُصمّم البرامج والديكور والضيافة وفق التراث المحلي — تقاليد المجلس النجدي في الرياض، والعادات الحجازية في جدة — لا قالب عام أبدًا." },
                { c: "تصاريح هيئة الترفيه والترفيه الموسمي", s: "تحتاج تفعيلات اليوم الوطني ويوم التأسيس وموسم الرياض إلى موافقات هيئة الترفيه والبلدية ضمن جداول ضيّقة، نتولّاها داخليًا." },
                { c: "جمهور عائلي ومؤسسي وعام معًا", s: "يُخطَّط تدفّق الحشود، والمناطق المنفصلة حيث يلزم، والبرامج المناسبة للعائلة بحيث يشعر كل جمهور بالترحيب والأمان." },
                  ]
                : [
                { c: "Compressed Ramadan & seasonal lead times", s: "Iftar and Suhoor venues book out fast. We lock dates and catering early so your Ramadan activation isn't squeezed out of the best spaces." },
                { c: "Authenticity across regions (Najdi vs Hejazi)", s: "Programming, décor, and hospitality are tailored to local heritage — Najdi majlis traditions in Riyadh, Hejazi customs in Jeddah — never a generic template." },
                { c: "GEA & seasonal entertainment permits", s: "National Day, Founding Day, and Riyadh Season activations need GEA and municipality approvals on tight timelines, all handled in-house." },
                { c: "Family, corporate & public audiences together", s: "Crowd flow, segregated areas where required, and family-appropriate programming are planned so every audience feels welcome and safe." },
              ]).map((item) => (
                <div key={item.c} className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{isAr ? "التحدّي" : "Challenge"}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-1 mb-3">{item.c}</h3>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">{isAr ? "الفعاليات الثقافية — مشاريع مختارة" : "Cultural Events — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "مجلس الرياض النخبوي", slug: "riyadh-elite-majlis", desc: "تجمّع مجلس نجدي تقليدي بضيافة أصيلة وتنسيق تراثي." },
                { title: "فعالية المدينة الروحانية", slug: "madinah-spiritual-event", desc: "تجمّع ديني واسع النطاق ومحترم بإدارة حشود وبروتوكول دقيقة." },
                { title: "عرض رؤية 2030", slug: "vision-2030", desc: "تفعيل ثقافي بطابع وطني متوافق مع سرد رؤية 2030." },
                  ]
                : [
                { title: "Riyadh Elite Majlis", slug: "riyadh-elite-majlis", desc: "A traditional Najdi majlis gathering with authentic hospitality and heritage styling." },
                { title: "Madinah Spiritual Event", slug: "madinah-spiritual-event", desc: "A respectful, large-scale religious gathering with careful crowd and protocol management." },
                { title: "Vision 2030 Showcase", slug: "vision-2030", desc: "A national-themed cultural activation aligned with Vision 2030 storytelling." },
              ]).map((p) => (
                <Link key={p.slug} href={`${arHref}/portfolio/${p.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "عرض المشروع" : "View Project"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-8">
              <div>
                <h3 className="text-slate-900 font-bold text-lg">{isAr ? "تخطّط لفعالية ثقافية أو موسمية؟" : "Planning a cultural or seasonal event?"}</h3>
                <p className="text-gray-500 text-sm mt-1">{isAr ? "احجز استشارة مجانية أو تحدّث إلى فريق الفعاليات الثقافية — نردّ عادةً خلال ساعتين." : "Book a free consultation or speak with our cultural events team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? "احجز استشارة مجانية" : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? "تواصل معنا" : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-gray-500 text-sm mt-6">تصفّح <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو استكشف <Link href={`${arHref}/services/destination-events`} className="text-[var(--primary)] font-semibold hover:underline">فعاليات الوجهات</Link>.</p>
            ) : (
              <p className="text-gray-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore <Link href="/services/destination-events" className="text-[var(--primary)] font-semibold hover:underline">destination events</Link>.</p>
            )}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? "عرض كل الخدمات" : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(isAr
                ? [
                { title: "حفلات الزفاف الفاخرة", slug: "weddings", desc: "احتفالات اجتماعية مخصّصة تشمل المراسم السعودية التقليدية." },
                { title: "فعاليات الشركات", slug: "corporate-events", desc: "حفلات اليوم الوطني المؤسسية ومبادرات فعاليات رؤية 2030." },
                { title: "فعاليات الوجهات", slug: "destination-events", desc: "فعاليات وجهاتية تراثية في العلا والدرعية وعموم المملكة." },
                { title: "الفعاليات الفاخرة وكبار الشخصيات", slug: "luxury-vip-events", desc: "احتفالات ثقافية خاصة لكبار الثروات والعائلة المالكة." },
                  ]
                : [
                { title: "Luxury Weddings", slug: "weddings", desc: "Bespoke social celebrations including traditional Saudi ceremonies." },
                { title: "Corporate Events", slug: "corporate-events", desc: "National Day corporate galas and Vision 2030 event initiatives." },
                { title: "Destination Events", slug: "destination-events", desc: "AlUla, Diriyah, and heritage destination events across the Kingdom." },
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Private HNWI and royal family cultural celebrations." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{rel.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "اعرف المزيد" : "Learn More"} <ChevronRight size={12} /></span>
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
