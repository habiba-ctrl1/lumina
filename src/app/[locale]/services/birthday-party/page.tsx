"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import { Sparkles, Users, Camera, Utensils, Music, ClipboardList, ChevronRight, Phone, CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const services = [
  {
    icon: Sparkles,
    title: "Birthday Setup & Decor",
    desc: "Themed backdrops, balloon and floral styling, and full table and venue decor, coordinated for celebrations at home or at a private venue.",
  },
  {
    icon: Users,
    title: "Kids Entertainment & Activities",
    desc: "Costumed characters, magicians, face painting, and supervised activity stations, matched to your child's age group and party theme.",
  },
  {
    icon: Camera,
    title: "Photo Booth",
    desc: "Styled photo booth setups with props and backdrops matched to your celebration theme, for guests of every age.",
  },
  {
    icon: Utensils,
    title: "Catering & Dessert Tables",
    desc: "Finger-food menus, dessert tables, and cake coordination sourced through our catering partner network, sized to your guest count.",
  },
  {
    icon: Music,
    title: "Entertainment & Performers",
    desc: "DJs, live music, and interactive performers for older guests and family celebrations, coordinated through our entertainment partner network.",
  },
  {
    icon: ClipboardList,
    title: "Full-Service Coordination",
    desc: "One point of contact managing setup, timing, vendors, and guest flow — so you can enjoy the celebration instead of running it.",
  },
];

const servicesAr = [
  { title: "تجهيز وديكور حفلة عيد الميلاد", desc: "خلفيات مصمّمة حسب الطابع، وتنسيق بالونات وزهور، وديكور كامل للطاولات والموقع، سواء في المنزل أو في مكان خاص." },
  { title: "ترفيه وأنشطة الأطفال", desc: "شخصيات كرتونية، وسحرة، ورسم على الوجه، ومحطات أنشطة مُشرَف عليها، تُختار حسب عمر طفلك وطابع الحفلة." },
  { title: "كشك تصوير", desc: "إعداد كشك تصوير مصمَّم بإكسسوارات وخلفيات تناسب طابع احتفالك، لجميع أعمار الضيوف." },
  { title: "الضيافة وطاولات الحلويات", desc: "قوائم أطعمة خفيفة، وطاولات حلويات، وتنسيق الكيك عبر شبكة شركاء الضيافة لدينا، بما يتناسب مع عدد ضيوفك." },
  { title: "الترفيه والفنانون", desc: "منسقو حفلات (DJ)، وموسيقى حية، وفنانون تفاعليون للضيوف الأكبر سنًا والاحتفالات العائلية، بالتنسيق مع شبكة شركاء الترفيه لدينا." },
  { title: "تنسيق متكامل للحفلة", desc: "جهة تواصل واحدة تدير التجهيز والتوقيت والموردين وتدفّق الضيوف — لتستمتعوا بالاحتفال بدلًا من إدارته." },
];

const faqs = [
  {
    q: "Do you plan birthday parties for both kids and adults in Saudi Arabia?",
    a: "Yes. We coordinate birthday celebrations for all ages — from kids' themed parties with entertainers and activities to milestone adult birthdays with catering and entertainment — across Riyadh, Jeddah, and Dammam.",
  },
  {
    q: "Can you handle a birthday party at my home?",
    a: "Yes. We coordinate setup, decor, entertainment, and catering for private home celebrations as well as rented venues, matched to your space and guest count.",
  },
  {
    q: "What's included in kids entertainment?",
    a: "Depending on your child's age and theme, we coordinate costumed characters, magicians, face painting, and supervised activity stations through our entertainment partner network.",
  },
  {
    q: "How much does a birthday party cost in Saudi Arabia?",
    a: "Pricing depends on guest count, venue, and which services you need — setup only, or a fully managed celebration with entertainment and catering. Share your requirements and we'll return an itemised quote within 2 hours.",
  },
  {
    q: "How far in advance should I book a birthday party?",
    a: "We recommend booking at least 2-3 weeks ahead for a standard celebration, and 4-6 weeks ahead for weekends and school holidays when vendors are in high demand.",
  },
  {
    q: "birthday party planner near me Saudi Arabia",
    a: "Saudi Event Management coordinates birthday party planning across Riyadh, Jeddah, and the Eastern Province through a vetted network of decor, entertainment, and catering partners.",
  },
];

const faqsAr = [
  { q: "هل تنظّمون حفلات أعياد ميلاد للأطفال والكبار في السعودية؟", a: "نعم. ننسّق احتفالات أعياد الميلاد لجميع الأعمار — من حفلات الأطفال المصمَّمة بفنانين وأنشطة، إلى أعياد ميلاد الكبار المميزة بضيافة وترفيه — في الرياض وجدة والدمام." },
  { q: "هل يمكنكم تنظيم حفلة عيد ميلاد في منزلي؟", a: "نعم. ننسّق التجهيز والديكور والترفيه والضيافة لاحتفالات المنازل الخاصة وكذلك الأماكن المستأجرة، بما يناسب مساحتك وعدد ضيوفك." },
  { q: "ما الذي يشمله ترفيه الأطفال؟", a: "حسب عمر طفلك وطابع الحفلة، ننسّق شخصيات كرتونية، وسحرة، ورسمًا على الوجه، ومحطات أنشطة مُشرَف عليها عبر شبكة شركاء الترفيه لدينا." },
  { q: "كم تبلغ تكلفة حفلة عيد الميلاد في السعودية؟", a: "تعتمد التكلفة على عدد الضيوف والموقع والخدمات المطلوبة — تجهيز فقط، أو احتفال متكامل بالترفيه والضيافة. شاركنا متطلباتك وسنعيد إليك عرض سعر مفصّلًا خلال ساعتين." },
  { q: "قبل كم من الوقت يجب حجز حفلة عيد الميلاد؟", a: "نوصي بالحجز قبل 2-3 أسابيع على الأقل لاحتفال عادي، وقبل 4-6 أسابيع لعطلات نهاية الأسبوع والإجازات المدرسية حين يزداد الطلب على الموردين." },
  { q: "منظّم حفلات أعياد ميلاد قريب مني في السعودية", a: "تنسّق إدارة الفعاليات السعودية تنظيم حفلات أعياد الميلاد في الرياض وجدة والمنطقة الشرقية عبر شبكة شركاء معتمدة في الديكور والترفيه والضيافة." },
];

export default function BirthdayPartyPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": "Birthday Party Planning",
        "provider": { "@type": "Organization", "name": "Saudi Event Management" },
        "areaServed": "Saudi Arabia",
        "description": "Managed birthday party planning across Saudi Arabia — setup and decor, kids entertainment and activities, photo booth, and catering for celebrations of every age.",
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
          { "@type": "ListItem", "position": 3, "name": "Birthday Party", "item": "https://saudieventmanagement.com/services/birthday-party" },
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
          title={isAr ? "تنظيم حفلات" : "Birthday Party"}
          titleHighlight={isAr ? "أعياد الميلاد" : "Planning in Saudi Arabia"}
          subtitle={
            isAr
              ? "تجهيز وديكور، وترفيه وأنشطة للأطفال، وكشك تصوير، وضيافة — احتفال متكامل منسّق عبر شبكة شركاء إدارة الفعاليات السعودية، للأطفال والكبار."
              : "Setup and decor, kids entertainment and activities, photo booth, and catering — one managed celebration coordinated through Saudi Event Management's partner network, for kids and adults alike."
          }
          backgroundImage="/services/private_party.webp"
          imageAlt="Elegant birthday celebration setup with styled decor at a private Saudi venue"
          enableParallax
          badge={isAr ? "حفلة عيد ميلاد" : "Birthday Party"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "حفلات أعياد الميلاد" : "Birthday Party" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "All Ages", label: "Celebrations Covered" },
            { value: "10+", label: "Cities Covered" },
            { value: "2 Hours", label: "Quote Response" },
          ]}
        />

        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#birthday-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "اطلب عرض الحفلة" : "Request a Party Quote"}
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
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? "شبكة شركاء منسّقة" : "Coordinated Partner Network"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? "ديكور، ترفيه، وضيافة" : "Decor, Entertainment & Catering"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>{isAr ? "الرياض" : "RIYADH"}</span>
                <span>{isAr ? "جدة" : "JEDDAH"}</span>
                <span>{isAr ? "الدمام" : "DAMMAM"}</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                {isAr ? "«احتفال واحد، جهة تنسيق واحدة»" : "\"One Celebration, One Point of Coordination\""}
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
                {isAr ? "احتفال متكامل من البداية للنهاية" : "A Fully Managed Celebration, Start to Finish"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? "حفلات أعياد الميلاد" : "Birthday Party Planning"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? "في السعودية" : "in Saudi Arabia"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    من تجهيز بسيط إلى احتفال متكامل، ننسّق كل عنصر عبر شبكة شركاء معتمدة — بما يشمل{" "}
                    <Link href={`${arHref}/services/entertainment`} className="text-[var(--primary)] hover:underline font-semibold">الترفيه</Link>
                    {" "}و{" "}
                    <Link href={`${arHref}/services/valet-parking`} className="text-[var(--primary)] hover:underline font-semibold">خدمة الفاليه</Link>
                    {" "}للاحتفالات الكبيرة في المنازل أو الأماكن الخاصة.
                  </>
                ) : (
                  <>
                    From simple decor to a fully managed celebration, we coordinate every element through a vetted partner network — including{" "}
                    <Link href="/services/entertainment" className="text-[var(--primary)] hover:underline font-semibold">entertainment</Link>
                    {" "}and{" "}
                    <Link href="/services/valet-parking" className="text-[var(--primary)] hover:underline font-semibold">valet parking</Link>
                    {" "}for larger home or private-venue celebrations.
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

        {/* ── LEAD FORM / BIRTHDAY ENQUIRY ── */}
        <section id="birthday-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gala_decor_saudi.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "استفسار عن الحفلة" : "Birthday Enquiry"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {isAr ? (
                    <>احتفال يستحقّه <br /><span className="text-[#C5A880]">طفلك — أو أنت.</span></>
                  ) : (
                    <>A celebration worth <br /><span className="text-[#C5A880]">remembering.</span></>
                  )}
                </h2>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "شاركنا عمر المحتفَل به وعدد الضيوف والخدمات المطلوبة، ويعيد فريقنا خطة حفلة وعرض أسعار خلال ساعتين."
                    : "Share the celebrant's age, your guest count, and the services you need, and our team returns a party plan and quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? ["تجهيز وديكور مصمَّم حسب الطابع", "ترفيه وأنشطة للأطفال", "كشك تصوير وضيافة", "تنسيق كامل من جهة واحدة"]
                    : ["Themed setup & decor", "Kids entertainment & activities", "Photo booth & catering", "Fully coordinated by one team"]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20a%20quote%20for%20a%20birthday%20party."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="birthday_party_page"
                defaultEventType="Birthday Party"
                eyebrow={isAr ? "استفسار عن الحفلة" : "Birthday Enquiry"}
                heading={isAr ? "احجز حفلة عيد ميلادك" : "Book your birthday celebration"}
                subheading={isAr ? "سيردّ فريقنا خلال ساعتين بخطة حفلة وعرض أسعار." : "Our team will respond within 2 hours with a party plan and quote."}
                submitLabel={isAr ? "اطلب عرض الحفلة" : "Request a Party Quote"}
                eventTypeOptions={[
                  "Kids Birthday Party",
                  "Adult Birthday Celebration",
                  "Milestone Birthday",
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
                {isAr ? "أسئلة" : "Birthday Party"} <span className="text-[var(--primary)]">{isAr ? "شائعة" : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-xs uppercase tracking-widest">
                {isAr ? "كل ما تحتاج معرفته عن تنظيم حفلات أعياد الميلاد في السعودية" : "Everything you need to know about birthday party planning in Saudi Arabia"}
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
                  { title: "الترفيه", slug: "entertainment", desc: "فرق موسيقية وفنانون ومنسقو حفلات لكل فعالية." },
                  { title: "خدمة صف السيارات (فاليه)", slug: "valet-parking", desc: "طاقم فاليه محترف لتجربة وصول ومغادرة سلسة." },
                  { title: "الفعاليات الفاخرة وكبار الشخصيات", slug: "luxury-vip-events", desc: "احتفالات خاصة مصمَّمة بسرية وتميّز تام." },
                  { title: "الإنتاج الفعّالياتي", slug: "event-production", desc: "مسرح وصوت وإضاءة وديكور لأي حجم احتفال." },
                ]
                : [
                  { title: "Entertainment", slug: "entertainment", desc: "Live bands, performers, and DJs for every event." },
                  { title: "Valet Parking", slug: "valet-parking", desc: "Professional valet staff for a seamless arrival and departure experience." },
                  { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Private celebrations designed with total discretion and polish." },
                  { title: "Event Production", slug: "event-production", desc: "Stage, sound, lighting, and decor for any celebration scale." },
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
