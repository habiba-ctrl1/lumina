"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import { DoorOpen, KeyRound, Accessibility, Sparkles, ClipboardList, Users, ChevronRight, Phone, CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const services = [
  {
    icon: Users,
    title: "Uniformed Valet Staff",
    desc: "Professionally trained, uniformed valet teams for weddings, galas, and corporate events, coordinated to match your venue's scale and guest flow.",
  },
  {
    icon: DoorOpen,
    title: "Guest Arrival & Departure Management",
    desc: "Personalized greetings, door service, and priority parking for VIP guests, setting the tone from the very first moment of arrival.",
  },
  {
    icon: KeyRound,
    title: "Secure Key & Vehicle Management",
    desc: "Secure key handling and an efficient vehicle retrieval system, so guests never wait longer than necessary at departure.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Support",
    desc: "Wheelchair assistance and mobility support for guests at arrival and departure, coordinated as part of your event's guest-care plan.",
  },
  {
    icon: Sparkles,
    title: "Vehicle Care Add-Ons",
    desc: "Optional car washing, detailing, and touch-up services available during longer events, arranged through our coordinated partner network.",
  },
  {
    icon: ClipboardList,
    title: "Valet Logistics Planning",
    desc: "Parking-zone layout, traffic-flow planning, and staffing coordination for high-volume guest arrivals at weddings, galas, and summits.",
  },
];

const servicesAr = [
  { title: "طاقم فاليه موحّد الزي", desc: "فرق فاليه مدرَّبة موحّدة الزي لحفلات الزفاف والحفلات الفاخرة وفعاليات الشركات، تُنسَّق بما يناسب حجم موقعك وتدفّق الضيوف." },
  { title: "إدارة وصول ومغادرة الضيوف", desc: "استقبال شخصي، وخدمة فتح الأبواب، وأولوية الوقوف لضيوف كبار الشخصيات، لضبط الانطباع الأول منذ اللحظة الأولى." },
  { title: "إدارة آمنة للمفاتيح والمركبات", desc: "تعامل آمن مع المفاتيح ونظام استرجاع مركبات فعّال، بحيث لا ينتظر الضيوف أطول مما يلزم عند المغادرة." },
  { title: "دعم ذوي الإعاقة وكبار السن", desc: "مساعدة بالكراسي المتحركة ودعم التنقّل للضيوف عند الوصول والمغادرة، ضمن خطة رعاية الضيوف لفعاليتك." },
  { title: "خدمات عناية إضافية بالمركبات", desc: "خدمات اختيارية لغسيل السيارات والتلميع واللمسات النهائية أثناء الفعاليات الطويلة، تُرتَّب عبر شبكة شركائنا المنسّقة." },
  { title: "تخطيط لوجستيات الفاليه", desc: "تخطيط مناطق الوقوف، وتدفّق الحركة، وتنسيق الطاقم لاستيعاب أعداد كبيرة من الضيوف في حفلات الزفاف والحفلات الفاخرة والقمم." },
];

const faqs = [
  {
    q: "Do you provide valet parking for weddings in Saudi Arabia?",
    a: "Yes. We coordinate uniformed valet teams for weddings across Riyadh, Jeddah, and other Saudi cities, scaled to your venue's guest count and parking layout.",
  },
  {
    q: "Can valet staff assist elderly guests or guests with disabilities?",
    a: "Yes. Our coordinated valet teams provide wheelchair assistance and mobility support for guests at both arrival and departure.",
  },
  {
    q: "How does key and vehicle security work with valet parking?",
    a: "Valet teams use a secure key management and vehicle retrieval system, so guest vehicles are tracked and returned efficiently without unnecessary waiting.",
  },
  {
    q: "Do you offer valet parking for large corporate events and summits?",
    a: "Yes. We plan parking-zone layout, traffic flow, and staffing levels for high-volume events, from corporate galas to multi-day summits.",
  },
  {
    q: "How far in advance should I book valet parking for my event?",
    a: "We recommend confirming valet staffing at least 2-3 weeks before your event, and earlier during peak wedding and Riyadh Season periods.",
  },
  {
    q: "valet parking service near me Saudi Arabia",
    a: "Saudi Event Management coordinates event valet parking across Riyadh, Jeddah, and the Eastern Province through a vetted, uniformed valet partner network.",
  },
];

const faqsAr = [
  { q: "هل تقدّمون خدمة فاليه لحفلات الزفاف في السعودية؟", a: "نعم. ننسّق فرق فاليه موحّدة الزي لحفلات الزفاف في الرياض وجدة وباقي مدن المملكة، بما يتناسب مع عدد ضيوف موقعك ومخطط الوقوف." },
  { q: "هل يمكن لطاقم الفاليه مساعدة كبار السن أو ذوي الإعاقة؟", a: "نعم. توفّر فرق الفاليه المنسّقة لدينا مساعدة بالكراسي المتحركة ودعم التنقّل للضيوف عند الوصول والمغادرة." },
  { q: "كيف تُدار سلامة المفاتيح والمركبات مع خدمة الفاليه؟", a: "تستخدم فرق الفاليه نظامًا آمنًا لإدارة المفاتيح واسترجاع المركبات، بحيث تُتَبَّع مركبات الضيوف وتُعاد بكفاءة دون انتظار غير ضروري." },
  { q: "هل تقدّمون فاليه لفعاليات الشركات الكبرى والقمم؟", a: "نعم. نخطّط تصميم مناطق الوقوف وتدفّق الحركة ومستويات التوظيف للفعاليات عالية الحجم، من حفلات الشركات إلى القمم متعددة الأيام." },
  { q: "قبل كم من الوقت يجب حجز خدمة الفاليه لفعاليتي؟", a: "نوصي بتأكيد طاقم الفاليه قبل 2-3 أسابيع على الأقل من فعاليتك، وأبكر من ذلك خلال مواسم الذروة كالزفاف وموسم الرياض." },
  { q: "خدمة فاليه قريبة مني في السعودية", a: "تنسّق إدارة الفعاليات السعودية خدمة فاليه الفعاليات في الرياض وجدة والمنطقة الشرقية عبر شبكة شركاء فاليه موحّدة الزي ومعتمدة." },
];

export default function ValetParkingPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Event Valet Parking",
        "provider": { "@type": "Organization", "name": "Saudi Event Management" },
        "areaServed": "Saudi Arabia",
        "description": "Professional event valet parking coordination across Saudi Arabia — uniformed staff, secure key management, and accessibility support for weddings and corporate events.",
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
          { "@type": "ListItem", "position": 3, "name": "Valet Parking", "item": "https://saudieventmanagement.com/services/valet-parking" },
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
          title={isAr ? "خدمة صف السيارات" : "Event Valet"}
          titleHighlight={isAr ? "(فاليه) للفعاليات" : "Parking"}
          subtitle={
            isAr
              ? "طاقم فاليه محترف موحّد الزي لحفلات الزفاف وفعاليات الشركات — استقبال شخصي، وإدارة مفاتيح آمنة، ودعم ذوي الإعاقة، عبر شبكة شركاء إدارة الفعاليات السعودية."
              : "Professional, uniformed valet teams for weddings and corporate events — personalized greetings, secure key management, and accessibility support, coordinated through Saudi Event Management's partner network."
          }
          backgroundImage="/services/wedding_hall_grand_entrance.webp"
          imageAlt="Grand guest entrance and arrival experience at a Saudi event venue"
          enableParallax
          badge={isAr ? "خدمة الفاليه" : "Valet Parking"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "خدمة الفاليه" : "Valet Parking" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "100%", label: "Uniformed Staff" },
            { value: "10+", label: "Cities Covered" },
            { value: "2 Hours", label: "Quote Response" },
          ]}
        />

        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#valet-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "اطلب عرض الفاليه" : "Request Valet Proposal"}
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
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? "طاقم فاليه منسّق" : "Coordinated Valet Teams"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? "محترف، موحّد الزي، وآمن" : "Professional, Uniformed & Secure"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>{isAr ? "الرياض" : "RIYADH"}</span>
                <span>{isAr ? "جدة" : "JEDDAH"}</span>
                <span>{isAr ? "الدمام" : "DAMMAM"}</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                {isAr ? "«أول وآخر انطباع لضيوفك»" : "\"Your Guests' First & Last Impression\""}
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
                {isAr ? "فاليه منسّق لكل فعالية" : "Coordinated Valet for Every Event"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? "خدمة الفاليه" : "Event Valet"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "للفعاليات" : "Parking Services"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    ننسّق طاقم فاليه محترفًا لحفلات{" "}
                    <Link href={`${arHref}/services/weddings`} className="text-[var(--primary)] hover:underline font-semibold">الزفاف</Link>
                    {" "}و{" "}
                    <Link href={`${arHref}/services/corporate-events`} className="text-[var(--primary)] hover:underline font-semibold">فعاليات الشركات</Link>
                    {" "}— لضمان تجربة وصول ومغادرة سلسة لكل ضيف، مهما كان حجم الفعالية.
                  </>
                ) : (
                  <>
                    We coordinate professional valet teams for{" "}
                    <Link href="/services/weddings" className="text-[var(--primary)] hover:underline font-semibold">weddings</Link>
                    {" "}and{" "}
                    <Link href="/services/corporate-events" className="text-[var(--primary)] hover:underline font-semibold">corporate events</Link>
                    {" "}— ensuring a seamless arrival and departure experience for every guest, at any scale.
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

        {/* ── LEAD FORM / VALET ENQUIRY ── */}
        <section id="valet-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/wedding_stage_backdrop_decor.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "استفسار عن الفاليه" : "Valet Enquiry"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {isAr ? (
                    <>انطباع أول <br /><span className="text-[#C5A880]">لا يُنسى.</span></>
                  ) : (
                    <>A first impression <br /><span className="text-[#C5A880]">that lasts.</span></>
                  )}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "شاركنا موقعك وعدد ضيوفك، ويعيد فريقنا خطة فاليه وعرض أسعار خلال ساعتين."
                    : "Share your venue and guest count, and our team returns a valet staffing plan and quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? ["طاقم موحّد الزي ومحترف", "إدارة مفاتيح آمنة", "دعم ذوي الإعاقة وكبار السن", "تخطيط لوجستي لمناطق الوقوف"]
                    : ["Uniformed, professional staff", "Secure key management", "Accessibility support", "Parking-zone logistics planning"]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20a%20quote%20for%20event%20valet%20parking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="valet_parking_page"
                defaultEventType="Valet Parking"
                eyebrow={isAr ? "استفسار عن الفاليه" : "Valet Enquiry"}
                heading={isAr ? "احجز فاليه فعاليتك" : "Book valet for your event"}
                subheading={isAr ? "سيردّ فريقنا خلال ساعتين بخطة فاليه وعرض أسعار." : "Our team will respond within 2 hours with a valet staffing plan and quote."}
                submitLabel={isAr ? "اطلب عرض الفاليه" : "Request Valet Proposal"}
                eventTypeOptions={[
                  "Wedding Valet",
                  "Corporate Event Valet",
                  "Large-Scale Event Valet",
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
                {isAr ? "أسئلة" : "Valet Parking"} <span className="text-[var(--primary)]">{isAr ? "شائعة" : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-xs uppercase tracking-widest">
                {isAr ? "كل ما تحتاج معرفته عن خدمة الفاليه للفعاليات في السعودية" : "Everything you need to know about event valet parking in Saudi Arabia"}
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
                  { title: "النقل الفاخر لكبار الشخصيات", slug: "vip-transportation", desc: "نقل تنفيذي فاخر ومدرَّع لضيوف الفعاليات." },
                  { title: "حفلات الزفاف الفاخرة", slug: "weddings", desc: "احتفالات اجتماعية مخصّصة تشمل المراسم السعودية." },
                  { title: "فعاليات الشركات", slug: "corporate-events", desc: "حفلات الشركات وحفلات الجوائز وإطلاق المنتجات." },
                  { title: "الترفيه", slug: "entertainment", desc: "فرق موسيقية وفنانون ومنسقو حفلات لكل فعالية." },
                ]
                : [
                  { title: "VIP Transportation", slug: "vip-transportation", desc: "Luxury and armored executive transport for event guests." },
                  { title: "Luxury Weddings", slug: "weddings", desc: "Bespoke social celebrations including traditional Saudi ceremonies." },
                  { title: "Corporate Events", slug: "corporate-events", desc: "Corporate galas, award ceremonies, and product launches." },
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
