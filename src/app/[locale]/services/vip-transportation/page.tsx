"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import { PlaneTakeoff, ShieldCheck, Car, Users, Route, Sparkles, ChevronRight, Phone, CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const services = [
  {
    icon: PlaneTakeoff,
    title: "Airport & Hotel Transfers",
    desc: "Meet-and-greet service, flight tracking, and prompt, professional transfers to hotels and venues for arriving guests and delegates.",
  },
  {
    icon: ShieldCheck,
    title: "VIP Executive Transportation",
    desc: "Armored and secure vehicle options with discreet, professional drivers experienced in VIP and dignitary handling.",
  },
  {
    icon: Car,
    title: "Luxury Vehicle Hire with Chauffeurs",
    desc: "Limousines, premium SUVs, and executive sedans with professional chauffeurs, for weddings, galas, and corporate summits.",
  },
  {
    icon: Users,
    title: "Group & Delegate Transportation",
    desc: "Large-vehicle fleet coordination for conference delegates and wedding guest logistics, scaled to your headcount.",
  },
  {
    icon: Sparkles,
    title: "Specialty & Occasion Vehicles",
    desc: "Golf buggies for venue transfers and vintage or ceremonial vehicles for wedding entrances, coordinated with your event's programme.",
  },
  {
    icon: Route,
    title: "Fleet Coordination & Route Planning",
    desc: "Coordinated scheduling across multiple vehicles and pickup points, with route planning for a seamless, on-time guest experience.",
  },
];

const servicesAr = [
  { title: "استقبال المطارات والفنادق", desc: "خدمة استقبال، وتتبّع رحلات الطيران، ونقل سريع واحترافي إلى الفنادق وأماكن الفعالية للضيوف والمندوبين القادمين." },
  { title: "نقل تنفيذي لكبار الشخصيات", desc: "خيارات مركبات مدرَّعة وآمنة مع سائقين محترفين وذوي خبرة في التعامل مع كبار الشخصيات والضيوف الرسميين." },
  { title: "تأجير مركبات فاخرة بسائقين", desc: "ليموزين، وسيارات دفع رباعي فاخرة، وسيدان تنفيذية بسائقين محترفين، لحفلات الزفاف والحفلات الفاخرة وقمم الشركات." },
  { title: "نقل جماعي للمندوبين", desc: "تنسيق أسطول مركبات كبيرة لمندوبي المؤتمرات ولوجستيات ضيوف حفلات الزفاف، بحسب عدد الضيوف." },
  { title: "مركبات خاصة ومناسباتية", desc: "عربات جولف للتنقل داخل الموقع، ومركبات كلاسيكية أو احتفالية لدخول العروسين، بالتنسيق مع برنامج فعاليتك." },
  { title: "تنسيق الأسطول وتخطيط المسارات", desc: "جدولة منسّقة عبر مركبات ونقاط استقبال متعددة، مع تخطيط مسارات لتجربة ضيوف سلسة وفي الموعد." },
];

const faqs = [
  {
    q: "Do you provide VIP airport transfers for event guests in Saudi Arabia?",
    a: "Yes. We coordinate meet-and-greet airport transfers with flight tracking for VIP guests, delegates, and wedding parties across Riyadh, Jeddah, and other Saudi cities.",
  },
  {
    q: "Can you arrange armored vehicles for high-profile guests?",
    a: "Yes. For dignitary or high-profile guest transport, we coordinate armored and secure vehicle options with experienced, discreet drivers.",
  },
  {
    q: "Do you handle group transportation for conference delegates?",
    a: "Yes. We coordinate large-vehicle fleets and route planning for conference delegate transport, scaled from small executive groups to hundreds of attendees.",
  },
  {
    q: "Can you provide vintage or ceremonial cars for a wedding entrance?",
    a: "Yes. We coordinate specialty and vintage vehicles for wedding entrances and grand arrivals, alongside standard luxury chauffeur fleets.",
  },
  {
    q: "How far in advance should I book event transportation?",
    a: "We recommend confirming transportation bookings at least 3-4 weeks before your event, and earlier during peak wedding and conference seasons to secure the best fleet availability.",
  },
  {
    q: "VIP transportation service near me Saudi Arabia",
    a: "Saudi Event Management coordinates VIP and luxury event transportation across Riyadh, Jeddah, and the Eastern Province through a vetted fleet partner network.",
  },
];

const faqsAr = [
  { q: "هل تقدّمون استقبالًا فاخرًا من المطار لضيوف الفعالية في السعودية؟", a: "نعم. ننسّق استقبال المطارات مع تتبّع رحلات الطيران لضيوف كبار الشخصيات والمندوبين وأطراف حفلات الزفاف في الرياض وجدة وباقي مدن المملكة." },
  { q: "هل يمكنكم توفير مركبات مدرَّعة للضيوف رفيعي المستوى؟", a: "نعم. لنقل الضيوف رفيعي المستوى، ننسّق خيارات مركبات مدرَّعة وآمنة مع سائقين ذوي خبرة وحذر." },
  { q: "هل تديرون النقل الجماعي لمندوبي المؤتمرات؟", a: "نعم. ننسّق أساطيل مركبات كبيرة وتخطيط مسارات لنقل مندوبي المؤتمرات، من مجموعات تنفيذية صغيرة إلى مئات الحضور." },
  { q: "هل يمكن توفير سيارات كلاسيكية أو احتفالية لدخول العروسين؟", a: "نعم. ننسّق مركبات خاصة وكلاسيكية لدخول العروسين والوصول الكبير، إلى جانب أساطيل السائقين الفاخرة المعتادة." },
  { q: "قبل كم من الوقت يجب حجز نقل الفعالية؟", a: "نوصي بتأكيد حجوزات النقل قبل 3-4 أسابيع على الأقل من فعاليتك، وأبكر من ذلك خلال مواسم الذروة كالزفاف والمؤتمرات لضمان توفّر الأسطول." },
  { q: "خدمة نقل كبار الشخصيات قريبة مني في السعودية", a: "تنسّق إدارة الفعاليات السعودية نقل كبار الشخصيات والنقل الفاخر للفعاليات في الرياض وجدة والمنطقة الشرقية عبر شبكة شركاء أسطول معتمدة." },
];

export default function VipTransportationPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "VIP Event Transportation",
        "provider": { "@type": "Organization", "name": "Saudi Event Management" },
        "areaServed": "Saudi Arabia",
        "description": "Luxury and armored VIP transportation coordination across Saudi Arabia — airport transfers, chauffeured luxury vehicle hire, and group delegate transport for events.",
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
          { "@type": "ListItem", "position": 3, "name": "VIP Transportation", "item": "https://saudieventmanagement.com/services/vip-transportation" },
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
          title={isAr ? "النقل الفاخر" : "VIP Event"}
          titleHighlight={isAr ? "لكبار الشخصيات" : "Transportation"}
          subtitle={
            isAr
              ? "نقل فاخر ومدرَّع لضيوف الفعاليات — استقبال مطارات، وتأجير سيارات بسائقين، ونقل جماعي للمندوبين، منسّق عبر شبكة شركاء إدارة الفعاليات السعودية."
              : "Luxury and armored transportation for event guests — airport transfers, chauffeured vehicle hire, and group delegate transport, coordinated through Saudi Event Management's partner network."
          }
          backgroundImage="/services/premium_luxury_vip_hero.webp"
          imageAlt="Luxury VIP guest arrival and concierge experience at a Saudi event"
          enableParallax
          badge={isAr ? "النقل الفاخر" : "VIP Transportation"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "النقل الفاخر" : "VIP Transportation" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "24/7", label: "Fleet Coordination" },
            { value: "10+", label: "Cities Covered" },
            { value: "2 Hours", label: "Quote Response" },
          ]}
        />

        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#transport-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "اطلب عرض النقل" : "Request Transport Proposal"}
            </Link>
            <a
              href="tel:+966539388072"
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
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? "شبكة أسطول منسّقة" : "Coordinated Fleet Network"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? "فاخر، مدرَّع، وجماعي" : "Luxury, Armored & Group Transport"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>{isAr ? "الرياض" : "RIYADH"}</span>
                <span>{isAr ? "جدة" : "JEDDAH"}</span>
                <span>{isAr ? "الدمام" : "DAMMAM"}</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                {isAr ? "«وصول ومغادرة سلسة لكل ضيف»" : "\"Seamless Arrivals & Departures for Every Guest\""}
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
                {isAr ? "نقل منسّق لكل فعالية" : "Coordinated Transport for Every Event"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? "النقل الفاخر" : "VIP & Luxury"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "لكبار الشخصيات" : "Event Transportation"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    ننسّق النقل الفاخر والمدرَّع لضيوف{" "}
                    <Link href={`${arHref}/services/luxury-vip-events`} className="text-[var(--primary)] hover:underline font-semibold">الفعاليات الفاخرة</Link>
                    {" "}و{" "}
                    <Link href={`${arHref}/services/conferences`} className="text-[var(--primary)] hover:underline font-semibold">المؤتمرات</Link>
                    {" "}عبر شبكة أسطول معتمدة، من استقبال المطار إلى المغادرة.
                  </>
                ) : (
                  <>
                    We coordinate luxury and armored transportation for{" "}
                    <Link href="/services/luxury-vip-events" className="text-[var(--primary)] hover:underline font-semibold">VIP events</Link>
                    {" "}and{" "}
                    <Link href="/services/conferences" className="text-[var(--primary)] hover:underline font-semibold">conferences</Link>
                    {" "}through a vetted fleet network, from airport pickup to final departure.
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

        {/* ── LEAD FORM / TRANSPORT ENQUIRY ── */}
        <section id="transport-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_2.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "استفسار عن النقل" : "Transport Enquiry"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {isAr ? (
                    <>وصول ومغادرة <br /><span className="text-[#C5A880]">بلا احتكاك.</span></>
                  ) : (
                    <>Frictionless arrivals <br /><span className="text-[#C5A880]">and departures.</span></>
                  )}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "شاركنا عدد ضيوفك ومتطلبات النقل، ويعيد فريقنا خيارات أسطول وعرض أسعار خلال ساعتين."
                    : "Share your guest count and transport requirements, and our team returns fleet options and a quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? ["استقبال مطارات مع تتبّع الرحلات", "خيارات مركبات مدرَّعة وآمنة", "أساطيل جماعية للمندوبين", "تنسيق مسارات متعددة النقاط"]
                    : ["Airport transfers with flight tracking", "Armored & secure vehicle options", "Group fleets for delegates", "Multi-point route coordination"]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20a%20quote%20for%20VIP%20event%20transportation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="vip_transportation_page"
                defaultEventType="VIP Transportation"
                eyebrow={isAr ? "استفسار عن النقل" : "Transport Enquiry"}
                heading={isAr ? "احجز نقل فعاليتك" : "Book transportation for your event"}
                subheading={isAr ? "سيردّ فريقنا خلال ساعتين بخيارات أسطول وعرض أسعار." : "Our team will respond within 2 hours with fleet options and a quote."}
                submitLabel={isAr ? "اطلب عرض النقل" : "Request Transport Proposal"}
                eventTypeOptions={[
                  "Airport / Hotel Transfer",
                  "VIP Executive Transport",
                  "Wedding Guest Transport",
                  "Conference Delegate Transport",
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
                {isAr ? "أسئلة" : "VIP Transportation"} <span className="text-[var(--primary)]">{isAr ? "شائعة" : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-xs uppercase tracking-widest">
                {isAr ? "كل ما تحتاج معرفته عن نقل ضيوف الفعاليات في السعودية" : "Everything you need to know about event guest transport in Saudi Arabia"}
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
                  { title: "خدمة صف السيارات (فاليه)", slug: "valet-parking", desc: "طاقم فاليه محترف لتجربة وصول ومغادرة سلسة." },
                  { title: "الفعاليات الفاخرة وكبار الشخصيات", slug: "luxury-vip-events", desc: "احتفالات خاصة لكبار الثروات والعائلة المالكة." },
                  { title: "إدارة المؤتمرات", slug: "conferences", desc: "منظِّم مؤتمرات احترافي لقمم الأعمال والمندوبين." },
                  { title: "الترفيه", slug: "entertainment", desc: "فرق موسيقية وفنانون ومنسقو حفلات لكل فعالية." },
                ]
                : [
                  { title: "Valet Parking", slug: "valet-parking", desc: "Professional valet staff for a seamless arrival and departure experience." },
                  { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Private HNWI and royal family celebrations." },
                  { title: "Conference Management", slug: "conferences", desc: "Professional PCO services for summits and delegates." },
                  { title: "Entertainment", slug: "entertainment", desc: "Live bands, performers, and DJs for every event." },
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
