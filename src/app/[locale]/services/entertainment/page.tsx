"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import Image from "next/image";
import { Music, Users, Disc3, Sparkles, Mic2, Radio, ChevronRight, Phone, CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const services = [
  {
    icon: Music,
    title: "Live Musical Performances",
    desc: "Eastern and Western instrumentalists, vocalists, and full live bands for weddings, galas, and cultural celebrations, sourced through our coordinated talent partner network.",
  },
  {
    icon: Sparkles,
    title: "Specialty & Interactive Acts",
    desc: "Performers, dancers, and interactive entertainment concepts tailored to your event theme — from elegant ambient acts to high-energy stage shows.",
  },
  {
    icon: Disc3,
    title: "DJ & Sound Entertainment",
    desc: "Professional DJs and MC talent for weddings, corporate parties, and brand activations, coordinated with our AV and sound production teams.",
  },
  {
    icon: Users,
    title: "Family & Community Entertainment",
    desc: "Family-friendly entertainment programming for corporate family days, National Day festivals, and community cultural activations.",
  },
  {
    icon: Mic2,
    title: "Talent Sourcing & Booking",
    desc: "Access to a coordinated network of vetted regional performers and musical talent, matched to your event's audience, budget, and cultural requirements.",
  },
  {
    icon: Radio,
    title: "On-Site Entertainment Production",
    desc: "Stage integration, sound checks, and technical coordination between performers and our event production team, ensuring a seamless live show.",
  },
  {
    icon: Music,
    title: "Musicians & Live Bands",
    desc: "Solo instrumentalists, vocalists, and full live bands — Oud, violin, keyboard, and more — trained and matched through our musical talent partner network for weddings, galas, and cultural events.",
  },
];

const servicesAr = [
  { title: "عروض موسيقية حية", desc: "عازفون ومطربون شرقيون وغربيون، وفرق موسيقية كاملة لحفلات الزفاف والحفلات الفاخرة والاحتفالات الثقافية، عبر شبكة شركاء المواهب المنسّقة لدينا." },
  { title: "فقرات متخصصة وتفاعلية", desc: "فنانون وراقصون ومفاهيم ترفيه تفاعلية مصمّمة حسب طابع فعاليتك — من الفقرات الهادئة الأنيقة إلى العروض المسرحية عالية الطاقة." },
  { title: "منسقو حفلات والصوت", desc: "منسقو حفلات (DJ) ومقدّمو حفلات محترفون لحفلات الزفاف وحفلات الشركات والتفعيلات التجارية، بالتنسيق مع فرق الصوت والصورة لدينا." },
  { title: "ترفيه عائلي ومجتمعي", desc: "برامج ترفيه مناسبة للعائلات في أيام عائلات الشركات، ومهرجانات اليوم الوطني، والتفعيلات الثقافية المجتمعية." },
  { title: "استقطاب وحجز المواهب", desc: "وصول إلى شبكة منسّقة من الفنانين الإقليميين المعتمدين والمواهب الموسيقية، تُطابَق حسب جمهور فعاليتك وميزانيتك ومتطلباتها الثقافية." },
  { title: "إنتاج ترفيهي ميداني", desc: "دمج المسرح، وفحوصات الصوت، والتنسيق التقني بين الفنانين وفريق إنتاج الفعاليات لدينا، لضمان عرض حي سلس." },
  { title: "الموسيقيون والفرق الحية", desc: "عازفون منفردون، ومطربون، وفرق موسيقية كاملة — عود وكمان وبيانو وغيرها — مدرَّبون ومُطابَقون عبر شبكة شركاء المواهب الموسيقية لدينا لحفلات الزفاف والحفلات الفاخرة والفعاليات الثقافية." },
];

const faqs = [
  {
    q: "Do you provide live entertainment for weddings in Saudi Arabia?",
    a: "Yes. We coordinate live musical performances, interactive acts, and DJ entertainment for weddings across Riyadh, Jeddah, and the wider Kingdom, matched to your event's cultural and guest requirements.",
  },
  {
    q: "Can you book performers for corporate events and brand activations?",
    a: "Yes. We source and coordinate entertainment talent for corporate galas, product launches, and brand activations — from ambient live music to high-energy interactive shows.",
  },
  {
    q: "What entertainment options are available for family-friendly events?",
    a: "We coordinate family-appropriate entertainment programming for corporate family days, National Day festivals, and community celebrations, suitable for mixed-age audiences.",
  },
  {
    q: "How far in advance should I book entertainment for my event?",
    a: "We recommend confirming entertainment bookings at least 4-6 weeks before your event, and 2-3 months ahead during peak wedding and Riyadh Season periods.",
  },
  {
    q: "Can you provide entertainment for a gala dinner or awards ceremony?",
    a: "Yes. For gala dinners and awards ceremonies we coordinate ambient live music during arrivals and dining, feature performances between segments, and DJ or house-band talent for the celebration — all timed to the run-of-show.",
  },
  {
    q: "Do you coordinate sound and stage production with the entertainment?",
    a: "Yes. Our entertainment bookings are coordinated directly with our AV and event production teams, so sound checks, stage integration, and technical riders are handled end-to-end.",
  },
  {
    q: "event entertainment company near me Saudi Arabia",
    a: "Saudi Event Management coordinates event entertainment across Riyadh, Jeddah, and the Eastern Province through a vetted partner network of musicians, performers, and DJs.",
  },
];

const faqsAr = [
  { q: "هل تقدّمون ترفيهًا حيًا لحفلات الزفاف في السعودية؟", a: "نعم. ننسّق العروض الموسيقية الحية والفقرات التفاعلية وترفيه الـ DJ لحفلات الزفاف في الرياض وجدة وعموم المملكة، بما يتناسب مع المتطلبات الثقافية لفعاليتك وضيوفك." },
  { q: "هل يمكنكم حجز فنانين لفعاليات الشركات والتفعيلات التجارية؟", a: "نعم. نستقطب وننسّق مواهب الترفيه لحفلات الشركات وإطلاق المنتجات والتفعيلات التجارية — من الموسيقى الهادئة إلى العروض التفاعلية عالية الطاقة." },
  { q: "ما خيارات الترفيه المتاحة للفعاليات المناسبة للعائلات؟", a: "ننسّق برامج ترفيه مناسبة للعائلات في أيام عائلات الشركات ومهرجانات اليوم الوطني والاحتفالات المجتمعية، تناسب الجمهور المختلط الأعمار." },
  { q: "قبل كم من الوقت يجب حجز الترفيه لفعاليتي؟", a: "نوصي بتأكيد حجوزات الترفيه قبل 4-6 أسابيع على الأقل من فعاليتك، وقبل 2-3 أشهر خلال مواسم الذروة كالزفاف وموسم الرياض." },
  { q: "هل يمكنكم توفير ترفيه لحفل عشاء أو حفل جوائز؟", a: "نعم. لحفلات العشاء والجوائز ننسّق موسيقى حية هادئة أثناء الاستقبال والعشاء، وفقرات مميّزة بين الأجزاء، ومنسق حفلات أو فرقة للاحتفال — كلها متزامنة مع برنامج الحفل." },
  { q: "هل تنسّقون الصوت والمسرح مع الفقرات الترفيهية؟", a: "نعم. تُنسَّق حجوزات الترفيه مباشرة مع فرق الصوت والصورة وإنتاج الفعاليات لدينا، بحيث تُدار فحوصات الصوت ودمج المسرح والمتطلبات التقنية من البداية للنهاية." },
  { q: "شركة ترفيه فعاليات قريبة مني في السعودية", a: "تنسّق إدارة الفعاليات السعودية ترفيه الفعاليات في الرياض وجدة والمنطقة الشرقية عبر شبكة شركاء معتمدة من الموسيقيين والفنانين ومنسقي الحفلات." },
];

export default function EntertainmentPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Event Entertainment",
        "provider": { "@type": "Organization", "name": "Saudi Event Management" },
        "areaServed": "Saudi Arabia",
        "description": "Event entertainment coordination across Saudi Arabia — live bands, interactive performers, DJs, and family entertainment for weddings, corporate events, and cultural celebrations.",
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": "Entertainment", "item": "https://saudieventmanagement.com/services/entertainment" },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white text-neutral-900">
        <WhatsAppButton />
        <Navbar />

        <InternalPageHero
          title={isAr ? "ترفيه الفعاليات" : "Event Entertainment"}
          titleHighlight={isAr ? "في السعودية" : "in Saudi Arabia"}
          subtitle={
            isAr
              ? "فرق موسيقية شرقية وغربية، وفنانون تفاعليون، ومنسقو حفلات، وترفيه عائلي — منسّق عبر شبكة شركاء إدارة الفعاليات السعودية لكل نوع فعالية."
              : "Eastern & Western live bands, interactive performers, DJs, and family entertainment — coordinated through Saudi Event Management's partner network for every kind of event."
          }
          backgroundImage="/services/event_production_stage_riyadh.webp"
          imageAlt="Live stage entertainment production with lighting and sound at a Saudi event"
          enableParallax
          badge={isAr ? "الترفيه" : "Entertainment"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "الترفيه" : "Entertainment" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "10+", label: "Cities Covered" },
            { value: "100%", label: "Vetted Talent" },
            { value: "2 Hours", label: "Quote Response" },
          ]}
        />

        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#entertainment-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "اطلب عرض الترفيه" : "Request Entertainment Proposal"}
            </Link>
            <a
              href="https://wa.me/966539388072" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? "تحدّث إلى فريق الفعاليات" : "Speak to Our Events Team"}
            </a>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={22} />
                </div>
                <div>
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? "شبكة مواهب منسّقة" : "Coordinated Talent Network"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? "موسيقى، فقرات، ومنسقو حفلات" : "Music, Acts & DJ Talent"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>{isAr ? "الرياض" : "RIYADH"}</span>
                <span>{isAr ? "جدة" : "JEDDAH"}</span>
                <span>{isAr ? "الدمام" : "DAMMAM"}</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                {isAr ? "«ترفيه منسّق لكل نوع فعالية»" : "\"Coordinated Entertainment for Every Event Type\""}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                {isAr ? "ترفيه منسّق لكل فعالية" : "Coordinated Entertainment for Every Event"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? "ترفيه فعاليات" : "Event Entertainment"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "في السعودية" : "in Saudi Arabia"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    ننسّق ترفيه الفعاليات عبر شبكة شركاء معتمدة من الموسيقيين والفنانين ومنسقي الحفلات، لِيلائم كل فقرة طابع فعاليتك — من{" "}
                    <Link href={`${arHref}/services/weddings`} className="text-[var(--primary)] hover:underline font-semibold">حفلات الزفاف</Link>
                    {" "}إلى{" "}
                    <Link href={`${arHref}/services/corporate-events`} className="text-[var(--primary)] hover:underline font-semibold">فعاليات الشركات</Link>
                    {"، و"}
                    <Link href={`${arHref}/blog/gala-dinner-awards-ceremony-planning-saudi-arabia`} className="text-[var(--primary)] hover:underline font-semibold">حفلات العشاء والجوائز</Link>
                    {"، و"}
                    <Link href={`${arHref}/services/cultural-events`} className="text-[var(--primary)] hover:underline font-semibold">احتفالات اليوم الوطني</Link>.
                  </>
                ) : (
                  <>
                    We coordinate event entertainment through a vetted network of musicians, performers, and DJs, matching every act to your event's tone — from{" "}
                    <Link href="/services/weddings" className="text-[var(--primary)] hover:underline font-semibold">weddings</Link>
                    {" "}to{" "}
                    <Link href="/services/corporate-events" className="text-[var(--primary)] hover:underline font-semibold">corporate events</Link>
                    {", "}
                    <Link href="/blog/gala-dinner-awards-ceremony-planning-saudi-arabia" className="text-[var(--primary)] hover:underline font-semibold">gala dinners &amp; awards</Link>
                    {", and "}
                    <Link href="/services/cultural-events" className="text-[var(--primary)] hover:underline font-semibold">National Day celebrations</Link>.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08 }}
                  className="bg-white border border-neutral-200/80 p-7 rounded-2xl hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors">
                    <s.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{isAr ? servicesAr[i].title : s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? servicesAr[i].desc : s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Photo: Musicians & Live Bands ── */}
        <section className="pb-24 md:pb-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-200/80">
              <Image
                src="/services/live_band_musicians_saudi.webp"
                alt={isAr ? "فرقة موسيقية حية تعزف عود وكمان وبيانو في فعالية سعودية" : "Live musical trio performing oud, violin, and keyboard at a Saudi event"}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-neutral-400 text-[11px] uppercase tracking-widest mt-4">
              {isAr ? "موسيقيون وفرق حية عبر شبكة شركائنا" : "Musicians & Live Bands Through Our Partner Network"}
            </p>
          </div>
        </section>

        {/* ── LEAD FORM / ENTERTAINMENT ENQUIRY ── */}
        <section id="entertainment-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_corporate_gala.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "استفسار عن الترفيه" : "Entertainment Enquiry"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {isAr ? (
                    <>اجعل فعاليتك <br /><span className="text-[#C5A880]">لا تُنسى.</span></>
                  ) : (
                    <>Make your event <br /><span className="text-[#C5A880]">unforgettable.</span></>
                  )}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "شاركنا نوع فعاليتك وجمهورك المستهدف، ويعيد فريقنا اقتراح ترفيه مناسب وعرض أسعار خلال ساعتين."
                    : "Share your event type and audience, and our team returns matched entertainment options and a quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? ["فرق موسيقية شرقية وغربية", "فقرات تفاعلية ومنسقو حفلات (DJ)", "ترفيه عائلي ومجتمعي", "تنسيق كامل مع فرق الصوت والمسرح"]
                    : ["Eastern & Western live bands", "Interactive acts & DJ talent", "Family & community entertainment", "Fully coordinated with sound & stage teams"]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20book%20entertainment%20for%20my%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="entertainment_page"
                defaultEventType="Entertainment / Live Performance"
                eyebrow={isAr ? "استفسار عن الترفيه" : "Entertainment Enquiry"}
                heading={isAr ? "احجز ترفيه فعاليتك" : "Book entertainment for your event"}
                subheading={isAr ? "سيردّ فريقنا خلال ساعتين بخيارات ترفيه مناسبة وعرض أسعار." : "Our team will respond within 2 hours with matched entertainment options and a quote."}
                submitLabel={isAr ? "اطلب عرض الترفيه" : "Request Entertainment Proposal"}
                eventTypeOptions={[
                  "Wedding Entertainment",
                  "Corporate Entertainment",
                  "DJ / Sound",
                  "Family & Community Event",
                  "Cultural Celebration",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? "أسئلة" : "Entertainment"} <span className="text-[var(--primary)]">{isAr ? "شائعة" : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-xs uppercase tracking-widest">
                {isAr ? "كل ما تحتاج معرفته عن ترفيه الفعاليات في السعودية" : "Everything you need to know about event entertainment in Saudi Arabia"}
              </p>
            </div>
            <div className="space-y-6">
              {(isAr ? faqsAr : faqs).map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-neutral-200/80">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{faq.q}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-neutral-50/60 border-t border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? "عرض كل الخدمات" : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {(isAr
                ? [
                  { title: "حفلات الزفاف الفاخرة", slug: "weddings", desc: "احتفالات اجتماعية مخصّصة تشمل المراسم السعودية التقليدية." },
                  { title: "فعاليات الشركات", slug: "corporate-events", desc: "حفلات الشركات وحفلات الجوائز وإطلاق المنتجات." },
                  { title: "النقل الفاخر لكبار الشخصيات", slug: "vip-transportation", desc: "نقل تنفيذي فاخر ومدرَّع لضيوف الفعاليات." },
                  { title: "خدمة صف السيارات (فاليه)", slug: "valet-parking", desc: "طاقم فاليه محترف لتجربة وصول ومغادرة سلسة." },
                ]
                : [
                  { title: "Luxury Weddings", slug: "weddings", desc: "Bespoke social celebrations including traditional Saudi ceremonies." },
                  { title: "Corporate Events", slug: "corporate-events", desc: "Corporate galas, award ceremonies, and product launches." },
                  { title: "VIP Transportation", slug: "vip-transportation", desc: "Luxury and armored executive transport for event guests." },
                  { title: "Valet Parking", slug: "valet-parking", desc: "Professional valet staff for a seamless arrival and departure experience." },
                ]
              ).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <h4 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{rel.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? "اعرف المزيد" : "Learn More"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
