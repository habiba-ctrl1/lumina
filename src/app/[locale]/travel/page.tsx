import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import {
  Car, Compass, Mountain, Heart, Route, PlaneTakeoff,
  ShieldCheck, ChevronRight, Phone, CheckCircle2, MessageSquare, BadgeCheck,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/travel`;
  return {
    title: isAr
      ? { absolute: "سياحة فاخرة وجولات خاصة في السعودية | سيارات VIP وجولات العُلا | إدارة الفعاليات السعودية" }
      : "Luxury Travel & Private Tours in Saudi Arabia | VIP Cars, AlUla Tours & Honeymoons",
    description: isAr
      ? "سياحة فاخرة منسّقة عبر السعودية — سيارات VIP بسائق، وجولات العُلا الخاصة ليوم كامل، ورحلات متعددة المدن، وباقات شهر العسل. تنسّق إدارة الفعاليات السعودية رحلتك عبر شبكة شركاء معتمدة."
      : "Coordinated luxury travel across Saudi Arabia — VIP chauffeur-driven cars, private full-day AlUla tours, multi-city journeys, and honeymoon experiences. SEM Travel coordinates your trip through a vetted partner network.",
    keywords: [
      "Luxury travel Saudi Arabia",
      "Private tours Saudi Arabia",
      "VIP car hire Saudi Arabia",
      "AlUla tours",
      "AlUla private tour",
      "Chauffeur hire Saudi Arabia",
      "Honeymoon in Saudi Arabia",
      "Multi-city Saudi Arabia tour",
      "سياحة فاخرة السعودية",
      "جولات العلا الخاصة",
    ],
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/travel"),
    },
    openGraph: {
      title: isAr
        ? "سياحة فاخرة وجولات خاصة في السعودية | سيارات VIP وجولات العُلا"
        : "Luxury Travel & Private Tours in Saudi Arabia | VIP Cars & AlUla Tours",
      description: isAr
        ? "سيارات VIP بسائق، وجولات العُلا الخاصة، ورحلات متعددة المدن، وباقات شهر العسل عبر المملكة — تنسيق كامل من إدارة الفعاليات السعودية."
        : "VIP chauffeur cars, private AlUla tours, multi-city journeys, and honeymoon travel across the Kingdom — fully coordinated by SEM Travel.",
      url: path,
      images: [{ url: "/services/premium_destination_event_hero.webp", width: 1200, height: 630, alt: "Luxury private travel in AlUla, Saudi Arabia" }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "SEM Travel — Luxury Travel & Private Tours in Saudi Arabia",
      "description":
        "Coordinated luxury travel across Saudi Arabia — VIP chauffeur-driven car hire, private full-day tours led by AlUla, multi-city journeys, honeymoon experiences, and airport transfers for travellers.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
      },
      "areaServed": ["AlUla", "Riyadh", "Jeddah", "Diriyah", "NEOM", "Red Sea", "Saudi Arabia"],
      "serviceType": "Luxury Travel & Private Tours",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you arrange private full-day tours with a VIP car and driver in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. SEM Travel coordinates private full-day tours with a chauffeur-driven luxury car across the Kingdom — AlUla, Riyadh, Jeddah, Diriyah and more — through a vetted travel and fleet partner network. Your itinerary, vehicle class, and pace are tailored to you.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you plan a private AlUla tour for travellers, not just events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. AlUla is our flagship travel destination. We arrange private AlUla experiences for leisure travellers — Hegra and Old Town visits, Elephant Rock, viewpoints, and desert experiences — with a private guide and VIP car, plus overnight stays if you are travelling further across the Kingdom.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you offer VIP car hire with a chauffeur for tourists?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We coordinate luxury car and chauffeur hire for travellers — by the hour, by the day, or for a full itinerary — including airport pickups and intercity transfers. Vehicles range from executive sedans to premium SUVs with professional, English-speaking drivers.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you arrange a multi-city trip across Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We build multi-city and intercity journeys — for example Riyadh, AlUla and Jeddah in one seamless trip — with private ground transport, accommodation, and daily tours coordinated end-to-end so you travel on one confirmed plan.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you plan honeymoon travel in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We design private honeymoon and couples' itineraries — AlUla desert stays, scenic drives, and romantic experiences — with a chauffeured car and curated stays, tailored to your dates and budget.",
          },
        },
        {
          "@type": "Question",
          "name": "How does SEM Travel work — do you operate the cars and tours yourselves?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SEM Travel coordinates your trip through a vetted network of licensed Saudi travel, tour, and chauffeur partners. You deal with one point of contact for the whole itinerary, we handle the coordination, and you receive one clear proposal — typically within two hours.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Travel", "item": "https://saudieventmanagement.com/travel" },
      ],
    },
  ],
};

/* ── Travel services (leisure/tourist intent — deliberately distinct from event pages) ── */
const services = [
  { icon: Mountain, title: "AlUla Private Tours", desc: "Our flagship destination. Private, guided AlUla experiences — Hegra, Old Town, Elephant Rock, and desert viewpoints — with a VIP car and optional overnight stays.", href: "#travel-enquiry", flagship: true },
  { icon: Car, title: "VIP Car & Chauffeur Hire", desc: "Chauffeur-driven luxury sedans and SUVs for travellers — by the hour, the day, or a full itinerary, with professional English-speaking drivers.", href: "#travel-enquiry" },
  { icon: Compass, title: "Full-Day Private Tours", desc: "Tailored day tours across Riyadh, Jeddah, Diriyah and beyond — your pace, your interests, a private guide and car throughout.", href: "#travel-enquiry" },
  { icon: Route, title: "Multi-City Journeys", desc: "Seamless intercity travel — Riyadh, AlUla and Jeddah on one confirmed plan, with private transport, stays, and daily tours coordinated end-to-end.", href: "#travel-enquiry" },
  { icon: Heart, title: "Honeymoon & Couples Travel", desc: "Private honeymoon itineraries led by AlUla — desert stays, scenic drives, and romantic experiences with a chauffeured car and curated stays.", href: "#travel-enquiry" },
  { icon: PlaneTakeoff, title: "Airport & Intercity Transfers", desc: "Meet-and-greet airport pickups and comfortable intercity transfers for travellers, with flight tracking and door-to-door service.", href: "#travel-enquiry" },
];

const servicesAr = [
  { title: "جولات العُلا الخاصة", desc: "وجهتنا الأبرز. تجارب العُلا الخاصة بمرشد — الحِجر، والبلدة القديمة، وجبل الفيل، ومطلات الصحراء — بسيارة VIP وإقامة اختيارية." },
  { title: "تأجير سيارات VIP بسائق", desc: "سيارات سيدان ودفع رباعي فاخرة بسائق للمسافرين — بالساعة أو اليوم أو لبرنامج كامل، بسائقين محترفين يتحدثون الإنجليزية." },
  { title: "جولات خاصة ليوم كامل", desc: "جولات يومية مخصّصة في الرياض وجدة والدرعية وأكثر — بإيقاعك واهتماماتك، مع مرشد وسيارة خاصة طوال الوقت." },
  { title: "رحلات متعددة المدن", desc: "تنقّل سلس بين المدن — الرياض والعُلا وجدة في خطة واحدة، بنقل خاص وإقامة وجولات يومية منسّقة بالكامل." },
  { title: "شهر العسل ورحلات الأزواج", desc: "برامج شهر عسل خاصة تقودها العُلا — إقامات صحراوية، ودروب خلابة، وتجارب رومانسية بسيارة بسائق وإقامات مختارة." },
  { title: "استقبال المطارات والتنقّل بين المدن", desc: "استقبال من المطار وتنقّل مريح بين المدن للمسافرين، مع تتبّع الرحلات وخدمة من الباب إلى الباب." },
];

/* ── Destinations (AlUla leads) ── */
const destinations = [
  { name: "AlUla", arabic: "العُلا", image: "/services/alula_gala_people.webp", tag: "Flagship", desc: "Hegra's Nabataean tombs, Old Town, Elephant Rock, and vast desert vistas — Saudi Arabia's most breathtaking private-tour destination.", href: "#travel-enquiry", big: true },
  { name: "Riyadh", arabic: "الرياض", image: "/services/vip_airport_chauffeur_riyadh.webp", tag: "City & Diriyah", desc: "Diriyah's UNESCO heritage, Edge of the World day trips, and the capital's landmarks — with a private car and guide.", href: "#travel-enquiry" },
  { name: "Jeddah", arabic: "جدة", image: "/services/jeddah_luxury_people.webp", tag: "Coast & Old Town", desc: "Al-Balad's historic quarter, the Corniche, and Red Sea gateways — an easy, chauffeur-driven day out.", href: "#travel-enquiry" },
  { name: "NEOM & Beyond", arabic: "نيوم وأبعد", image: "/services/neom_summit_people.webp", tag: "On Request", desc: "For travellers heading further — the north-west, the Red Sea coast, and NEOM — arranged as part of a bespoke multi-city plan.", href: "#travel-enquiry" },
];

const destinationsAr = [
  { name: "العُلا", tag: "الوجهة الأبرز", desc: "مقابر الحِجر النبطية، والبلدة القديمة، وجبل الفيل، ومناظر صحراوية شاسعة — أبهى وجهات الجولات الخاصة في السعودية." },
  { name: "الرياض", tag: "المدينة والدرعية", desc: "تراث الدرعية العالمي، ورحلات حافة العالم، ومعالم العاصمة — بسيارة خاصة ومرشد." },
  { name: "جدة", tag: "الساحل والبلد", desc: "حي البلد التاريخي، والكورنيش، وبوابات البحر الأحمر — نزهة مريحة بسائق خاص." },
  { name: "نيوم وأبعد", tag: "عند الطلب", desc: "للمسافرين إلى أبعد — الشمال الغربي، وساحل البحر الأحمر، ونيوم — ضمن خطة متعددة المدن مخصّصة." },
];

/* ── How it works ── */
const steps = [
  { icon: MessageSquare, title: "Tell us your trip", desc: "Share your dates, cities, and what you'd love to see — AlUla, a city tour, a honeymoon, or a full multi-city journey." },
  { icon: BadgeCheck, title: "We match a vetted partner", desc: "SEM Travel coordinates the right licensed tour, guide, and chauffeur partners for your itinerary and vehicle class." },
  { icon: Route, title: "One clear proposal", desc: "You receive a single, tailored itinerary and quote — usually within two hours — with everything confirmed under one plan." },
  { icon: ShieldCheck, title: "On-trip support", desc: "One point of contact throughout your trip, so any change on the road is handled quickly and discreetly." },
];

const stepsAr = [
  { title: "أخبرنا برحلتك", desc: "شاركنا تواريخك ومدنك وما تودّ رؤيته — العُلا، أو جولة مدينة، أو شهر عسل، أو رحلة كاملة متعددة المدن." },
  { title: "ننسّق شريكًا معتمدًا", desc: "تنسّق إدارة الفعاليات السعودية شركاء الجولات والإرشاد والسائقين المرخّصين المناسبين لبرنامجك وفئة سيارتك." },
  { title: "عرض واحد واضح", desc: "تستلم برنامجًا وعرض أسعار مخصّصًا واحدًا — عادةً خلال ساعتين — بكل شيء مؤكّد ضمن خطة واحدة." },
  { title: "دعم أثناء الرحلة", desc: "نقطة تواصل واحدة طوال رحلتك، ليُعالَج أي تغيير على الطريق بسرعة وتكتّم." },
];

const faqs = [
  { q: "Do you arrange private full-day tours with a VIP car and driver in Saudi Arabia?", a: "Yes. SEM Travel coordinates private full-day tours with a chauffeur-driven luxury car across the Kingdom — AlUla, Riyadh, Jeddah, Diriyah and more — through a vetted travel and fleet partner network. Your itinerary, vehicle class, and pace are tailored to you." },
  { q: "Can you plan a private AlUla tour for travellers, not just events?", a: "Absolutely. AlUla is our flagship travel destination. We arrange private AlUla experiences for leisure travellers — Hegra and Old Town visits, Elephant Rock, viewpoints, and desert experiences — with a private guide and VIP car, plus overnight stays if you are travelling further across the Kingdom." },
  { q: "Do you offer VIP car hire with a chauffeur for tourists?", a: "Yes. We coordinate luxury car and chauffeur hire for travellers — by the hour, by the day, or for a full itinerary — including airport pickups and intercity transfers. Vehicles range from executive sedans to premium SUVs with professional, English-speaking drivers." },
  { q: "Can you arrange a multi-city trip across Saudi Arabia?", a: "Yes. We build multi-city and intercity journeys — for example Riyadh, AlUla and Jeddah in one seamless trip — with private ground transport, accommodation, and daily tours coordinated end-to-end so you travel on one confirmed plan." },
  { q: "Do you plan honeymoon travel in Saudi Arabia?", a: "Yes. We design private honeymoon and couples' itineraries — AlUla desert stays, scenic drives, and romantic experiences — with a chauffeured car and curated stays, tailored to your dates and budget." },
  { q: "How does SEM Travel work — do you operate the cars and tours yourselves?", a: "SEM Travel coordinates your trip through a vetted network of licensed Saudi travel, tour, and chauffeur partners. You deal with one point of contact for the whole itinerary, we handle the coordination, and you receive one clear proposal — typically within two hours." },
];

export default async function TravelHubPage() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-sand-50 text-ink-950 overflow-hidden pt-20">
        <Navbar darkHero={false} />

        <InternalPageHero
          title={isAr ? "سياحة فاخرة وجولات خاصة" : "Luxury Travel & Private Tours"}
          titleColor="#ffffff"
          titleHighlight={isAr ? "في السعودية" : "in Saudi Arabia"}
          subtitle={
            isAr
              ? "سيارات VIP بسائق، وجولات العُلا الخاصة، ورحلات متعددة المدن، وباقات شهر العسل عبر المملكة — تنسّق إدارة الفعاليات السعودية رحلتك بالكامل عبر شبكة شركاء معتمدة."
              : "VIP chauffeur-driven cars, private AlUla tours, multi-city journeys, and honeymoon travel across the Kingdom — SEM Travel coordinates your entire trip through a vetted partner network."
          }
          backgroundImage="/services/premium_destination_event_hero.webp"
          imageAlt="Luxury private travel experience in AlUla, Saudi Arabia"
          enableParallax
          badge={isAr ? "سيم ترافل" : "SEM Travel"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "السفر" : "Travel" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "AlUla", label: "Flagship Destination" },
            { value: "10+", label: "Cities & Destinations" },
            { value: "2 Hours", label: "Itinerary & Quote" },
          ]}
        />

        {/* ── CTA bar ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#travel-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-[0_4px_14px_rgba(197,168,128,0.35)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? "خطّط رحلتي" : "Plan My Trip"}
            </Link>
            <a
              href="https://wa.me/966539388072?text=Hi%20SEM%20Travel!%20I%27d%20like%20to%20plan%20a%20private%20trip%20in%20Saudi%20Arabia."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-300 text-ink-900 font-semibold uppercase tracking-widest hover:border-gold-500 hover:text-gold-700 transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? "تحدّث إلينا عبر واتساب" : "Talk to Us on WhatsApp"}
            </a>
          </div>
        </div>

        {/* ── Intro / authority ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-600 mb-4 uppercase">
              <span className="w-5 h-px bg-gold-500" /> {isAr ? "سيم ترافل — سياحة منسّقة عبر المملكة" : "SEM Travel — Coordinated Journeys Across the Kingdom"}
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-ink-950 mb-6">
              {isAr ? "رحلة واحدة، " : "One trip, "}
              <span className="text-gold-600 italic">{isAr ? "جهة تواصل واحدة." : "one point of contact."}</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {isAr ? (
                <>تخطّط للسفر إلى السعودية أو داخلها؟ تنسّق <strong className="text-ink-900">إدارة الفعاليات السعودية</strong> سياحتك الفاخرة عبر شبكة من شركاء الجولات والسائقين المرخّصين — من <Link href="#travel-enquiry" className="text-gold-600 hover:underline font-semibold">جولات العُلا الخاصة</Link> إلى السيارات بسائق والرحلات متعددة المدن. أنت تتعامل مع فريق واحد، ونحن نتولّى التنسيق، وتستلم عرضًا واضحًا واحدًا.</>
              ) : (
                <>Planning a trip to or around Saudi Arabia? <strong className="text-ink-900">SEM Travel</strong> coordinates your luxury travel through a network of licensed tour and chauffeur partners — from <Link href="#travel-enquiry" className="text-gold-600 hover:underline font-semibold">private AlUla tours</Link> to VIP car hire and multi-city journeys. You deal with one team, we handle the coordination, and you receive one clear proposal.</>
              )}
            </p>
          </div>
        </section>

        {/* ── Travel services grid ── */}
        <section className="py-8 pb-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-display text-ink-950 mb-4">
                {isAr ? "كيف " : "How you can "}<span className="text-gold-600 italic">{isAr ? "نأخذك للسفر" : "travel with us"}</span>
              </h2>
              <div className="w-16 h-px bg-gold-500/50 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className={`group block bg-white border p-8 rounded-sm transition-all duration-500 hover:shadow-xl ${s.flagship ? "border-gold-400/70 ring-1 ring-gold-400/30" : "border-slate-200 hover:border-gold-400/50"}`}
                >
                  {s.flagship && (
                    <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-widest bg-gold-50 text-gold-700 px-3 py-1 rounded-full">
                      {isAr ? "الأبرز" : "Flagship"}
                    </span>
                  )}
                  <s.icon size={30} className="text-gold-500 mb-5 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-display text-ink-950 mb-3 uppercase tracking-wider">{isAr ? servicesAr[i].title : s.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed mb-4">{isAr ? servicesAr[i].desc : s.desc}</p>
                  <span className="text-gold-600 text-xs font-bold flex items-center gap-1">{isAr ? "اعرف المزيد" : "Explore"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Destinations (AlUla leads) ── */}
        <section className="py-28 bg-sand-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-600 mb-4 uppercase">
                <span className="w-5 h-px bg-gold-500" /> {isAr ? "وجهات مختارة" : "Where We Take You"}
              </span>
              <h2 className="text-3xl md:text-5xl font-display text-ink-950">
                {isAr ? "المملكة، " : "The Kingdom, "}<span className="text-gold-600 italic">{isAr ? "بخصوصية تامة" : "privately"}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destinations.map((dest, i) => (
                <Link
                  key={i}
                  href={dest.href}
                  className={`group border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 bg-white ${dest.big ? "md:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden ${dest.big ? "h-64 md:h-80" : "h-52"}`}>
                    <Image
                      src={dest.image}
                      alt={`${dest.name} private travel and tours, Saudi Arabia`}
                      width={dest.big ? 1200 : 600}
                      height={dest.big ? 500 : 300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">{isAr ? destinationsAr[i].tag : dest.tag}</span>
                      <h3 className="font-bold text-2xl mt-1"><span className="text-white">{isAr ? destinationsAr[i].name : dest.name}</span></h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{isAr ? destinationsAr[i].desc : dest.desc}</p>
                    <span className="text-gold-600 text-xs font-bold flex items-center gap-1">{isAr ? "استكشف الوجهة" : "Explore destination"} <ChevronRight size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-600 mb-4 uppercase">
                <span className="w-5 h-px bg-gold-500" /> {isAr ? "كيف يعمل" : "How It Works"}
              </span>
              <h2 className="text-2xl md:text-4xl font-display text-ink-950">
                {isAr ? "من فكرة الرحلة " : "From trip idea "}<span className="text-gold-600 italic">{isAr ? "إلى خطة مؤكّدة" : "to a confirmed plan"}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative bg-sand-50 border border-slate-200 rounded-2xl p-7">
                  <span className="absolute top-5 right-5 text-4xl font-display text-gold-200 select-none">{i + 1}</span>
                  <step.icon size={26} className="text-gold-500 mb-5" />
                  <h3 className="font-bold text-ink-950 text-base mb-2">{isAr ? stepsAr[i].title : step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{isAr ? stepsAr[i].desc : step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why SEM Travel ── */}
        <section className="py-24 bg-ink-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl order-2 lg:order-1">
                <Image
                  src="/services/vip_airport_chauffeur_riyadh.webp"
                  alt="Chauffeur-driven VIP car for a traveller in Saudi Arabia"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-7 order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-gold-400">
                  <span className="w-6 h-px bg-gold-400" /> {isAr ? "لماذا سيم ترافل" : "Why SEM Travel"}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                  <span className="text-white">{isAr ? "خبرة تنسيق، " : "Coordination you can "}</span><span className="text-gold-400 italic">{isAr ? "تثق بها" : "rely on"}</span>
                </h2>
                <ul className="space-y-4">
                  {(isAr
                    ? [
                      { t: "شبكة شركاء معتمدة", d: "شركاء جولات وسائقون مرخّصون تم فحصهم — لا مفاجآت على الطريق." },
                      { t: "جهة تواصل واحدة", d: "فريق واحد يدير برنامجك كاملًا من أول رسالة حتى العودة." },
                      { t: "ثنائي اللغة", d: "خدمة بالعربية والإنجليزية، وسائقون يتحدثون الإنجليزية." },
                      { t: "عرض واحد واضح", d: "برنامج وسعر شفّاف واحد — عادةً خلال ساعتين." },
                    ]
                    : [
                      { t: "Vetted partner network", d: "Licensed, screened tour and chauffeur partners — no surprises on the road." },
                      { t: "One point of contact", d: "A single team manages your whole itinerary, from first message to your return." },
                      { t: "Bilingual service", d: "Service in Arabic and English, with English-speaking drivers." },
                      { t: "One clear proposal", d: "A single, transparent itinerary and price — usually within two hours." },
                    ]
                  ).map((item) => (
                    <li key={item.t} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-gold-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-sm">{item.t}</p>
                        <p className="text-sand-400 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD FORM / TRAVEL ENQUIRY ── */}
        <section id="travel-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/hero_bg.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,12,16,0.95) 0%, rgba(24,25,32,0.92) 55%, rgba(11,12,16,0.95) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-gold-400">
                  <span className="w-6 h-px bg-gold-400" /> {isAr ? "استفسار عن رحلة" : "Travel Enquiry"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ letterSpacing: "-0.02em", color: "#ffffff" }}>
                  {isAr ? (<>لنصمّم <br /><span className="text-gold-400">رحلتك المثالية.</span></>) : (<>Let&apos;s design <br /><span className="text-gold-400">your perfect trip.</span></>)}
                </h2>
                <p className="text-white/65 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "أخبرنا بمدنك وتواريخك وما تودّ رؤيته، ويعيد إليك فريقنا برنامجًا وعرض أسعار خلال ساعتين."
                    : "Tell us your cities, dates, and what you'd love to see, and our team returns an itinerary and quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? ["جولات العُلا الخاصة وتجارب الصحراء", "سيارات VIP بسائق للمسافرين", "رحلات متعددة المدن عبر المملكة", "باقات شهر العسل والأزواج"]
                    : ["Private AlUla tours & desert experiences", "VIP chauffeur cars for travellers", "Multi-city journeys across the Kingdom", "Honeymoon & couples packages"]
                  ).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-gold-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20SEM%20Travel!%20I%27d%20like%20to%20plan%20a%20private%20trip%20in%20Saudi%20Arabia."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="travel_hub"
                defaultEventType="Luxury Travel / Private Tour"
                eyebrow={isAr ? "استفسار عن رحلة" : "Travel Enquiry"}
                heading={isAr ? "خطّط رحلتك في السعودية" : "Plan your Saudi Arabia trip"}
                subheading={isAr ? "سيردّ فريقنا خلال ساعتين ببرنامج وعرض أسعار مخصّص." : "Our team will respond within 2 hours with a tailored itinerary and quote."}
                submitLabel={isAr ? "اطلب برنامج الرحلة" : "Request My Itinerary"}
                eventTypeLabel={isAr ? "نوع الرحلة" : "Trip Type"}
                companyLabel={isAr ? "الجنسية / بلد الإقامة (اختياري)" : "Nationality / Country (optional)"}
                guestCountLabel={isAr ? "عدد المسافرين" : "Travellers"}
                guestCountPlaceholder={isAr ? "مثال: 2" : "e.g. 2"}
                dateLabel={isAr ? "تواريخ السفر" : "Travel Dates"}
                messageLabel={isAr ? "تفاصيل الرحلة" : "Trip Details"}
                messagePlaceholder={isAr ? "أخبرنا بمدنك، وتواريخ السفر، وما تودّ رؤيته أو تجربته..." : "Tell us your cities, travel dates, and what you'd love to see or experience..."}
                eventTypeOptions={[
                  "AlUla Private Tour",
                  "VIP Car & Chauffeur Hire",
                  "Full-Day Private Tour",
                  "Multi-City Saudi Trip",
                  "Honeymoon / Couples Travel",
                  "Airport Transfer",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-28 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-ink-950 mb-4">
                {isAr ? "أسئلة السفر " : "Travel "}<span className="text-gold-600 italic">{isAr ? "الشائعة" : "FAQ"}</span>
              </h2>
              <div className="w-12 h-px bg-gold-500/50 mx-auto" />
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 p-8 border border-slate-200 rounded-sm">
                  <h3 className="text-lg font-medium text-ink-950 mb-3">{faq.q}</h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related (cross-link to event verticals — distinct intent) ── */}
        <section className="py-20 bg-sand-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-ink-950 uppercase tracking-widest">{isAr ? "قد يهمّك أيضًا" : "You May Also Need"}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isAr
                ? [
                  { title: "استكشف العُلا", slug: "/locations/alula", desc: "دليل الوجهة الكامل للعُلا — المعالم والتجارب والتخطيط." },
                  { title: "فعاليات الوجهات", slug: "/services/destination-events", desc: "تنظّم فعالية أو زفافًا في العُلا أو نيوم؟ هذا هو القسم المناسب." },
                  { title: "نقل الفعاليات لكبار الشخصيات", slug: "/services/vip-transportation", desc: "نقل ضيوف الفعاليات والمندوبين والأعراس — لوجستيات فعالية لا سياحة." },
                ]
                : [
                  { title: "Explore AlUla", slug: "/locations/alula", desc: "The full AlUla destination guide — landmarks, experiences, and planning." },
                  { title: "Destination Events", slug: "/services/destination-events", desc: "Hosting an event or wedding in AlUla or NEOM? That's this section." },
                  { title: "VIP Event Transportation", slug: "/services/vip-transportation", desc: "Guest, delegate, and wedding transport — event logistics, not leisure travel." },
                ]
              ).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-sm p-6 hover:border-gold-400/50 hover:shadow-md transition-all"
                >
                  <h4 className="text-ink-950 font-bold mb-2 group-hover:text-gold-600 transition-colors">{rel.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-600 text-xs font-bold flex items-center gap-1">{isAr ? "اعرف المزيد" : "Learn More"} <ChevronRight size={12} /></span>
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
