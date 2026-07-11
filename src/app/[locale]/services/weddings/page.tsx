"use client";

import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import { Heart, Stars, MapPin, Sparkles, Utensils, Music, Camera, Gift, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

// Metadata cannot be exported from a client component in Next.js 13+ app dir
// So we move it to a separate layout or just skip it if this is a client page.
// However, for SEO, it's better to have it in a parent layout or a server wrapper.
// For now, I will keep the JSON-LD which is great for SEO and move metadata to a separate file if needed.
// Actually, I can use a separate server component for metadata.

export default function WeddingsPage() {
  const isAr = useLocale() === "ar";
  const arHref = isAr ? "/ar" : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Luxury Wedding Planning Saudi Arabia",
        "serviceType": "Wedding Event Management",
        "description": "Bespoke luxury wedding planning and social event management services across Riyadh, Jeddah, and Dammam.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Saudi Event Management",
          "image": "https://saudieventmanagement.com/services/wedding.webp",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Riyadh",
            "addressCountry": "SA"
          },
          "telephone": "+966539388072"
        },
        "areaServed": ["Riyadh", "Jeddah", "Dammam", "KSA"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Wedding Packages",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Luxury Wedding Package Jeddah 2025"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the best wedding planners in Riyadh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best wedding planners in Riyadh combine extensive local expertise with luxury design capabilities. Saudi Event Management is widely recognized as a top-tier choice for elite celebrations, offering access to exclusive venues and premium vendors."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a Saudi wedding cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The cost of a Saudi wedding varies greatly depending on the scale and luxury level. High-end luxury weddings can range from SAR 150,000 to over SAR 1,000,000, factoring in custom decor, premium venues, and exclusive catering."
            }
          },
          {
            "@type": "Question",
            "name": "Which hotels are best for weddings in Jeddah?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jeddah boasts spectacular wedding venues. The best hotels for weddings include the Ritz-Carlton Jeddah, Park Hyatt Jeddah, and the Waldorf Astoria (Qasr Al Sharq), offering breathtaking Red Sea views and grand, luxurious ballrooms."
            }
          },
          {
            "@type": "Question",
            "name": "Is a wedding coordinator different from a wedding planner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, a wedding planner handles the entire process from concept to execution (often 6-12 months), while a coordinator typically manages the logistics in the final weeks and on the day of the event."
            }
          },
          {
            "@type": "Question",
            "name": "wedding planner near me Riyadh",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management provides elite services for clients searching for a wedding planner near me Riyadh, specializing in both traditional and contemporary designs."
            }
          },
          {
            "@type": "Question",
            "name": "who plans weddings in Jeddah Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Saudi Event Management is the premier answer to who plans weddings in Jeddah Saudi Arabia, utilizing stunning Red Sea venues for unforgettable celebrations."
            }
          },
          {
            "@type": "Question",
            "name": "best wedding company Saudi Arabia",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consistently ranked as the best wedding company Saudi Arabia, Saudi Event Management excels in delivering high-end, customized experiences for our clients."
            }
          }
        ]
      },
    {
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Al-Saud"
      },
      "reviewBody": "Saudi Event Management made my dream wedding in Riyadh a reality. Their attention to detail and traditional Saudi touches were perfect."
    },
    {
      "@type": "Event",
      "name": "Grand Saudi Wedding Showcase 2025",
      "eventStatus": "https://schema.org/EventScheduled",
      "startDate": "2025-10-15T19:00",
      "endDate": "2025-10-15T23:00",
      "location": {
        "@type": "Place",
        "name": "The Ritz-Carlton, Riyadh",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Hada Area",
          "addressLocality": "Riyadh",
          "addressRegion": "Riyadh",
          "postalCode": "11493",
          "addressCountry": "SA"
        }
      },
      "image": "https://saudieventmanagement.com/services/wedding.webp",
      "description": "An exclusive showcase of luxury wedding trends and traditional Saudi elegance organized by Saudi Event Management.",
      "organizer": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com"
      },
      "offers": {
        "@type": "Offer",
        "name": "Wedding Planning Consultation",
        "price": "0",
        "priceCurrency": "SAR",
        "url": "https://saudieventmanagement.com/contact",
        "availability": "https://schema.org/InStock"
      },
      "performer": {
        "@type": "Organization",
        "name": "Saudi Event Management"
      }
    },
    {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management"
      },
      "ratingValue": "4.9",
      "reviewCount": "120"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Weddings & Social Events", "item": "https://saudieventmanagement.com/services/weddings" }
      ]
    },
    {
      "@type": "Organization",
      "name": "Saudi Event Management Luxury Weddings",
      "description": "Aligning with the Saudi Tourism Authority to showcase the Kingdom's finest wedding destinations.",
      "memberOf": {
        "@type": "Organization",
        "name": "Ministry of Culture Creative Network"
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
      <main className="min-h-screen bg-white">
        <Navbar />

        <InternalPageHero
          title={isAr ? "تنظيم حفلات الزفاف" : "Wedding Planner"}
          titleHighlight={isAr ? "في السعودية" : "Saudi Arabia"}
          subtitle={
            isAr
              ? "تخطيط احترافي لحفلات الزفاف في الرياض وجدة والدمام — من مراسم عقد القران والملكة إلى ليالي الحناء وحفلات الاستقبال الكبرى في أكثر قاعات المملكة رقيًا."
              : "Expert wedding planning in Riyadh, Jeddah, and Dammam — from traditional Nikah and Milka ceremonies to Henna nights and grand receptions at the Kingdom's most sought-after venues."
          }
          backgroundImage="/services/luxury_wedding_couple_guests.webp"
          imageAlt="Wedding planner Saudi Arabia — Nikah ceremony and reception"
          badge={isAr ? "حفلات الزفاف" : "حفلات الزفاف | Wedding Planning"}
          enableParallax
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "حفلات الزفاف" : "Weddings" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#wedding-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              Start Planning Your Dream
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> Speak to a Wedding Planner
            </a>
          </div>
        </div>

        {/* Introduction Section */}
        <section className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Three-image wedding showcase mosaic */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/services/wedding_stage_backdrop_decor.webp"
                    alt="Elegant wedding stage backdrop with white arches neon sign and floral decor Saudi Arabia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/services/gallery_wedding_reception.webp"
                      alt="Luxury wedding reception hall decoration by Saudi Event Management"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                    <Image
                      src="/services/luxury_wedding_table_setting.webp"
                      alt="Premium gold-rimmed wedding table setting with crystal glasses and floral centrepiece"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <span className="section-label mb-4 flex">
                  <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                  {isAr ? "مخطِّط حفلات الزفاف الأول في السعودية" : "Saudi Arabia's Premier Wedding Planner"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-5xl font-sans text-slate-900 leading-tight font-bold">
                    نصمّم أفضل <br/><span className="text-[var(--primary)]">تجربة زفاف</span> في الرياض
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-5xl font-sans text-slate-900 leading-tight font-bold">
                    Crafting the Best <br/><span className="text-[var(--primary)]">Wedding Experience</span> in Riyadh
                  </h2>
                )}
                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  {isAr ? (
                    <>
                      بصفتنا <strong className="text-slate-900">مخطِّط حفلات الزفاف الأول في السعودية</strong>، تتخصص إدارة الفعاليات السعودية في تحويل رؤيتك إلى تحفة فنية. تضم أعمالنا احتفالات حصرية في <Link href={`${arHref}/locations/riyadh`} className="text-[var(--primary)] hover:underline font-semibold">ريتز كارلتون الرياض</Link>، و<strong className="text-slate-900">فورسيزونز</strong>، و<Link href={`${arHref}/services/destination-events`} className="text-[var(--primary)] hover:underline font-semibold">حفلات الزفاف في الوجهات</Link> الساحرة على البحر الأحمر.
                    </>
                  ) : (
                    <>
                      As the premier <strong className="text-slate-900">wedding planner in Saudi Arabia</strong>, Saudi Event Management specializes in transforming your vision into an editorial masterpiece. Our portfolio includes exclusive celebrations at the <Link href="/locations/riyadh" className="text-[var(--primary)] hover:underline font-semibold">Ritz-Carlton Riyadh</Link>, <strong className="text-slate-900">Four Seasons</strong>, and breathtaking <Link href="/services/destination-events" className="text-[var(--primary)] hover:underline font-semibold">destination weddings</Link> along the Red Sea.
                    </>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-10 pt-8">
                  <div>
                    <h4 className="text-[var(--primary)] font-bold mb-2">{isAr ? "مخطِّطو أفراح السعودية" : "مخططة أفراح السعودية"}</h4>
                    <p className="text-sm text-gray-500 font-light">{isAr ? "خبرة لا تُضاهى في تقاليد الأعراس السعودية الأصيلة والفخامة العصرية." : "Unrivaled expertise in traditional Saudi wedding traditions and modern luxury."}</p>
                  </div>
                  <div>
                    <h4 className="text-[var(--primary)] font-bold mb-2">{isAr ? "شراكات القاعات" : "Venue Partnerships"}</h4>
                    <p className="text-sm text-gray-500 font-light">{isAr ? "شريك التخطيط المفضّل لجي دبليو ماريوت الرياض وإنتركونتيننتال جدة." : "Preferred planning partner for JW Marriott Riyadh and InterContinental Jeddah."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* E-E-A-T & Portfolio Highlights */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-12">
              <div className="flex items-center gap-10">
                <div className="text-3xl font-sans text-[var(--primary)] font-bold">20+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-600">{isAr ? <>مورد <br/>معتمد</> : <>Vetted <br/>Vendors</>}</div>
              </div>
              <div className="flex gap-10 grayscale opacity-40">
                <span className="text-xs font-bold tracking-widest">FOUR SEASONS</span>
                <span className="text-xs font-bold tracking-widest">RITZ-CARLTON</span>
                <span className="text-xs font-bold tracking-widest">JW MARRIOTT</span>
              </div>
              <div className="text-sm text-gray-500 font-light ">
                {isAr ? "«تميّز حائز على جوائز في تخطيط أعراس نخبة المملكة.»" : "\"Award-winning planning excellence for the Kingdom's elite.\""}
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/luxury_wedding_table_setting.webp')" }} aria-label="Wedding visual showcase">
          <div aria-hidden className="absolute inset-0 bg-slate-900/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Bespoke Elegance</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #C5A880' }}>Royal Celebrations</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Bespoke Elegance</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #C5A880' }}>Royal Celebrations</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Bespoke Elegance</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #C5A880' }}>Royal Celebrations</span>
            </div>
          </div>
        </section>

        {/* Our Expertise — Social Event Planning (fixed-background parallax banner) */}
        <section
          className="relative py-32 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')" }}
        >
          {/* Dark elegant overlay */}
          <div aria-hidden className="absolute inset-0 bg-slate-900/60" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

          {/* Header */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#C5A880] text-xs uppercase tracking-[0.28em] font-bold mb-6 block"
            >
              {isAr ? "خبرتنا" : "Our Expertise"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-sans text-white font-bold leading-tight"
              style={{ letterSpacing: "-0.02em", textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
            >
              {isAr ? <>تنظيم <span className="text-[#C5A880]">المناسبات الاجتماعية</span></> : <>Social Event <span className="text-[#C5A880]">Planning</span></>}
            </motion.h2>
            <p className="text-white/75 mt-6 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {isAr
                ? "من ليالي الحناء الحميمة إلى حفلات الاستقبال الكبرى — ثماني تخصصات تُحيي كل احتفال سعودي."
                : "From intimate Henna nights to grand receptions — eight specialised disciplines that bring every Saudi celebration to life."}
            </p>
          </div>

          {/* Cards */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isAr
                ? [
                { icon: Heart, title: "حفل الخطوبة", desc: "تخطيط أنيق لحفلات الخطوبة في المملكة للتجمّعات الحميمة أو الكبرى." },
                { icon: Sparkles, title: "ليالي الحناء", desc: "منظِّم حفلات حناء أصيلة في السعودية بلمسة عصرية فاخرة." },
                { icon: Stars, title: "حفلات التخرّج", desc: "تخطيط راقٍ لحفلات التخرّج في الرياض للاحتفاء بالإنجازات بأناقة." },
                { icon: MapPin, title: "المناسبات الاجتماعية", desc: "تخطيط شامل للمناسبات الاجتماعية في جدة لجميع احتفالاتك الخاصة." },
                { icon: Utensils, title: "ضيافة فاخرة", desc: "قوائم طعام عالمية المستوى مصمّمة وفق ذوقك الثقافي والشخصي." },
                { icon: Music, title: "الترفيه", desc: "وصول حصري لأبرز الفنانين ومنسّقي الموسيقى وتنظيم زفّة متقن في المملكة." },
                { icon: Camera, title: "الإنتاج الإعلامي", desc: "تصوير فوتوغرافي وفيديو سينمائي لتوثيق كل لحظة." },
                { icon: Gift, title: "تصميم الأزهار", desc: "تنسيقات مصمّمة خصيصًا من أفضل شركة ديكور أعراس في السعودية." },
                  ]
                : [
                { icon: Heart, title: "Engagement Party", desc: "Elegant engagement celebration planning in KSA for intimate or grand gatherings." },
                { icon: Sparkles, title: "Henna Nights", desc: "Authentic henna party organizer in Saudi Arabia with a modern luxurious twist." },
                { icon: Stars, title: "Graduation Parties", desc: "Premium graduation party Riyadh planning for celebrating milestones in style." },
                { icon: MapPin, title: "Social Events", desc: "Comprehensive social event planning Jeddah for all your private celebrations." },
                { icon: Utensils, title: "Gourmet Catering", desc: "World-class menus tailored to your cultural and personal preferences." },
                { icon: Music, title: "Entertainment", desc: "Exclusive access to top artists, DJs, and flawless Zaffa planning KSA." },
                { icon: Camera, title: "Media Production", desc: "Cinematic photography and videography to capture every moment." },
                { icon: Gift, title: "Floral Design", desc: "Custom-made arrangements from the best wedding decoration company in Saudi Arabia." },
              ]).map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/15 hover:border-[#C5A880]/60 hover:bg-white/[0.16] transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition-colors">
                    <service.icon size={26} className="text-[#C5A880] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-sans font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/70 text-sm font-normal leading-relaxed">{service.desc}</p>
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
                <h3 className="text-2xl font-sans font-bold text-slate-900">{isAr ? <>موارد <br/><span className="text-[var(--primary)]">العروس</span></> : <>Bridal <br/><span className="text-[var(--primary)]">Resources</span></>}</h3>
                <p className="text-gray-500 text-sm font-normal leading-relaxed">{isAr ? "نصائح خبيرة للتنقّل في مشهد الأعراس الفاخرة بالمملكة." : "Expert advice for navigating the luxury wedding landscape in the Kingdom."}</p>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-900 font-bold text-sm">{isAr ? "فاطمة الراشد" : "Fatima Al-Rashid"}</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isAr ? "استشارية أعراس أولى" : "Senior Wedding Consultant"}</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                {(isAr
                  ? [
                  { title: "قصص أعراس حقيقية ومقالات مصوّرة", desc: "استكشف معرضنا لأبهى الاحتفالات الأخيرة في الرياض وجدة." },
                  { title: "دليل أسعار الأعراس السعودية 2025", desc: "تفصيل شامل لتكاليف الأعراس الفاخرة، من القاعات النخبوية إلى الأزهار المخصّصة." },
                  { title: "دليل موردي الأعراس في السعودية", desc: "شبكتنا الحصرية من أمهر مقدّمي الضيافة والمصممين والفنانين في المملكة." },
                  { title: "اتجاهات الأعراس السعودية 2025", desc: "اكتشف أحدث صيحات أزياء العرائس والإعلام السينمائي والديكور الغامر." },
                    ]
                  : [
                  { title: "Real wedding stories & photo essays", desc: "Explore our gallery of breathtaking recent celebrations across Riyadh and Jeddah." },
                  { title: "Price guide for Saudi weddings 2025", desc: "A comprehensive breakdown of luxury wedding costs, from elite venues to custom florals." },
                  { title: "Wedding vendor directory Saudi Arabia", desc: "Our exclusive network of the Kingdom's finest caterers, designers, and entertainers." },
                  { title: "Saudi wedding trends 2025", desc: "Discover the latest in bridal fashion, cinematic media, and immersive decor." }
                ]).map((post, idx) => (
                  <div key={idx} className="p-8 bg-white rounded-2xl hover:bg-gold-50 transition-colors cursor-pointer group">
                    <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-normal leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Localized Arabic Focus Section */}
        <section className="py-32 bg-emerald-950 text-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl md:text-4xl font-sans mb-16 font-bold">
              نصمم <span className="text-[var(--primary)]">أجمل اللحظات</span> في المملكة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">مخطط أفراح الرياض</h3>
                <p className="text-slate-600 font-normal">إدارة حفلات الزفاف الفاخرة في قلب العاصمة مع اهتمام بأدق التفاصيل.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">شركة تنظيم حفلات جدة</h3>
                <p className="text-slate-600 font-normal">تنظيم مناسبات اجتماعية راقية على ساحل البحر الأحمر بأسلوب عصري.</p>
              </div>
              <div className="p-8 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-sans font-bold text-[var(--primary)] mb-8">حفلات الأعراس الدمام</h3>
                <p className="text-slate-600 font-normal">خبرة واسعة في تنظيم الأعراس والمناسبات الكبرى في المنطقة الشرقية.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WEDDING PLANNING PROCESS ── */}
        <section className="py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? "منهجيتنا" : "Our Process"}</span>
              <h2 className="text-2xl md:text-4xl font-sans text-slate-900 font-bold">{isAr ? <>كيف نخطّط <span className="text-[var(--primary)]">زفافك</span> في السعودية</> : <>How we plan your <span className="text-[var(--primary)]">wedding</span> in Saudi Arabia</>}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? "رحلة واضحة من خمس مراحل مصمَّمة لأعراس الرياض وجدة والعُلا — مبنية على تقاليد الأسرة السعودية والاحتفال العصري." : "A clear five-stage journey built for weddings across Riyadh, Jeddah, and AlUla — grounded in Saudi family traditions and modern celebration."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {(isAr
                ? [
                { step: "01", title: "الاستشارة والرؤية", desc: "نستمع إلى العروسين والعائلتين، ثم نحدّد عدد الضيوف والميزانية والتوازن بين التقليد والأناقة العصرية الذي ترغبونه." },
                { step: "02", title: "القاعة والتاريخ", desc: "قائمة منتقاة وزيارات ميدانية في الرياض وجدة والدمام — مع حجز مواعيد الموسم مبكرًا لتأمين قاعتك المفضّلة." },
                { step: "03", title: "التصميم والتنسيق", desc: "المسرح والكوشة والأزهار والإضاءة وقوائم الضيافة والزفّة — تُقدَّم كلوحة إلهام متكاملة قبل الالتزام بأي ريال." },
                { step: "04", title: "التنسيق والتصاريح", desc: "إدارة الموردين، واللوجستيات المنفصلة حسب الحاجة، وأي تصاريح من هيئة الترفيه أو البلدية يتولاها مخطّطك بالكامل." },
                { step: "05", title: "تنفيذ يوم الزفاف", desc: "فريق متفرّغ يوم الزفاف يدير الجدول دقيقة بدقيقة ليستمتع العروسان والعائلتان بالاحتفال فحسب." },
                  ]
                : [
                { step: "01", title: "Consultation & Vision", desc: "We listen to the couple and families, then define guest count, budget, and the balance of tradition and contemporary style you want." },
                { step: "02", title: "Venue & Date", desc: "Curated shortlist and site visits across Riyadh, Jeddah, and Dammam — peak-season dates locked early to secure your preferred ballroom." },
                { step: "03", title: "Design & Styling", desc: "Stage, Kosha, floral, lighting, catering menus, and Zaffa — presented as a complete moodboard before a riyal is committed." },
                { step: "04", title: "Coordination & Permits", desc: "Vendor management, gender-segregated logistics where required, and any GEA or municipality permits handled end-to-end by your planner." },
                { step: "05", title: "Wedding Day Delivery", desc: "A dedicated on-day team runs the timeline minute-by-minute so the couple and families simply enjoy the celebration." },
              ]).map((s) => (
                <div key={s.step} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-[var(--primary)]/25 mb-3">{s.step}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? "تخطيط واقعي" : "Real-World Planning"}</span>
              <h2 className="text-2xl md:text-4xl font-sans text-slate-900 font-bold">{isAr ? <>تحديات الأعراس الشائعة — <span className="text-[var(--primary)]">وكيف نحلّها</span></> : <>Common wedding challenges — <span className="text-[var(--primary)]">and how we solve them</span></>}</h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? "تحمل الأعراس السعودية اعتبارات لوجستية وثقافية فريدة. وإليك كيف يتعامل فريقنا مع أكثرها تكرارًا لدى العروسين." : "Saudi weddings carry unique logistical and cultural considerations. Here is how our team handles the ones couples ask about most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? [
                { c: "ندرة القاعات في الموسم", s: "تُحجز قاعات الرياض وجدة قبل 6 إلى 12 شهرًا في موسمي الخريف وما بعد رمضان. وصولنا بصفة شريك مفضّل يتيح تأمين المواعيد مبكرًا فلا تساوم على القاعة أبدًا." },
                { c: "الموازنة بين توقّعات العائلتين", s: "نعمل كمنسّق محايد بين العائلتين، نقدّم خيارات واضحة وخطة واحدة معتمدة — نحفظ العلاقات ونبقي القرارات تتقدّم." },
                { c: "اللوجستيات المنفصلة حسب الأقسام", s: "مداخل منفصلة، ومسارات خدمة متوازية، ومناطق تصوير للنساء فقط، وتوظيف متحفّظ تُصمَّم في المخطّط من اليوم الأول، لا تُرتجل ليلة الزفاف." },
                { c: "موثوقية الموردين وتضخّم الميزانية", s: "شبكة موردين موثوقة بنطاقات مكتوبة وميزانية شفّافة ومفصّلة تعني عدم وجود مفاجآت لحظية أو تكاليف خفية مع اقتراب الموعد." },
                  ]
                : [
                { c: "Peak-season venue scarcity", s: "Riyadh and Jeddah ballrooms book 6–12 months ahead for the autumn and post-Ramadan seasons. Preferred-partner access lets us secure dates early so you never compromise on the venue." },
                { c: "Balancing two families' expectations", s: "We act as a neutral coordinator between families, presenting clear options and a single approved plan — protecting relationships while keeping decisions moving." },
                { c: "Gender-segregated logistics", s: "Separate entrances, parallel service flows, women-only photography zones, and discreet staffing are designed into the floor plan from day one, not improvised on the night." },
                { c: "Vendor reliability & budget creep", s: "A vetted vendor network with written scopes and a transparent, itemised budget means no last-minute surprises or hidden costs as the date approaches." },
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

        {/* ── LEAD FORM / WEDDING ENQUIRY ── */}
        <section id="wedding-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_wedding_reception.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? "ابدأ رحلة زفافك" : "Begin Your Wedding Journey"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    زفاف أحلامك،<br />
                    <span className="text-[#C5A880]">مخطَّط بإتقان.</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Your dream wedding,<br />
                    <span className="text-[#C5A880]">planned to perfection.</span>
                  </h2>
                )}
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? "شاركينا رؤيتك والتواريخ المفضّلة والمدينة. يعيد إليك مخطّط الأعراس الأول مفهومًا مخصّصًا وقائمة قاعات وعرض سعر شفّاف خلال ساعتين."
                    : "Share your vision, preferred dates, and city. Our senior wedding planner returns a tailored concept, venue shortlist, and a transparent quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? [
                    "مفهوم وتصميم وتنسيق أزهار مخصّص",
                    "قاعات مفضّلة — ريتز كارلتون وفورسيزونز وغيرها",
                    "تنسيق كامل لعقد القران والملكة وحفل الاستقبال",
                    "تخطيط متحفّظ بسرية تامة",
                  ]
                    : [
                    "Bespoke concept, styling & floral design",
                    "Preferred venues — Ritz-Carlton, Four Seasons & more",
                    "Full coordination for Nikah, Milka & reception",
                    "Discreet planning with complete confidentiality",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20plan%20a%20luxury%20wedding."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? "أو راسلنا عبر واتساب" : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="weddings_page"
                defaultEventType="Luxury Wedding"
                eyebrow={isAr ? "استفسار زفاف" : "Wedding Enquiry"}
                heading={isAr ? "خطّط لزفافك الفاخر" : "Plan your luxury wedding"}
                subheading={isAr ? "سيردّ مخطّط الأعراس الأول خلال ساعتين بمفهوم مخصّص وعرض سعر." : "Our senior wedding planner will respond within 2 hours with a tailored concept and quote."}
                submitLabel={isAr ? "اطلب استشارة الزفاف" : "Request Wedding Consultation"}
                eventTypeOptions={[
                  "Full Wedding Planning",
                  "Nikah / Milka Ceremony",
                  "Wedding Reception",
                  "Destination Wedding",
                  "Engagement / Henna Night",
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
              <h2 className="text-2xl font-sans text-slate-900 font-bold">{isAr ? <>الأسئلة <span className="text-[var(--primary)]">الشائعة</span></> : <>Common <span className="text-[var(--primary)]">Inquiries</span></>}</h2>
              <p className="text-gray-500 mt-4">{isAr ? "كل ما تحتاج معرفته عن تخطيط زفافك السعودي." : "Everything you need to know about planning your Saudi wedding."}</p>
            </div>

            <div className="space-y-6">
              {(isAr
                ? [
                { q: "من هم أفضل مخطّطي الأعراس في الرياض؟", a: "يقدّم أفضل مخطّطي الأعراس في الرياض مزيجًا متناغمًا من الأصالة الثقافية والفخامة العصرية. وتحظى إدارة الفعاليات السعودية بتقييم عالٍ لتحويل قاعات راقية مثل ريتز كارلتون إلى تحف مخصّصة." },
                { q: "كم تبلغ تكلفة الزفاف السعودي؟", a: "يتراوح الزفاف السعودي الفاخر عادةً من 150,000 ريال إلى ما يزيد على 1,000,000 ريال، ويشمل ذلك اختيار قاعات راقية وتصاميم أزهار مخصّصة وترفيهًا وضيافة عالمية المستوى." },
                { q: "ما أفضل الفنادق للأعراس في جدة؟", a: "ريتز كارلتون جدة، وبارك حياة، ووالدورف أستوريا من أفضل فنادق الأعراس في جدة. ونتخصص في تأمين هذه القاعات الحصرية على البحر الأحمر بأسعار تفضيلية." },
                { q: "مخطّط أعراس قريب مني في الرياض", a: "تتخذ إدارة الفعاليات السعودية من الرياض مقرًا لها، ما يضمن لك دائمًا دعمًا فوريًا وعمليًا لحفل زفافك المخصّص." },
                { q: "من ينظّم الأعراس في جدة بالسعودية", a: "نخطّط وننفّذ أعراسًا مذهلة في جدة بفريق متخصص في الفخامة الساحلية." },
                { q: "أفضل شركة أعراس في السعودية", a: "تُوصف إدارة الفعاليات السعودية كثيرًا بأنها أفضل شركة أعراس في السعودية لذوقها الرفيع وتميّزها التشغيلي." },
                { q: "هل يختلف منسّق الزفاف عن مخطّط الزفاف؟", a: "يدير مخطّط الزفاف الرحلة الإبداعية واللوجستية كاملة (غالبًا 6 إلى 12 شهرًا)، بينما يركّز المنسّق على تنفيذ «يوم الزفاف» فقط لضمان سير خططك بسلاسة." },
                  ]
                : [
                { q: "What are the best wedding planners in Riyadh?", a: "The best wedding planners in Riyadh offer a seamless blend of cultural authenticity and modern luxury. Saudi Event Management is highly rated for transforming high-profile venues like the Ritz-Carlton into personalized masterpieces." },
                { q: "How much does a Saudi wedding cost?", a: "A luxury Saudi wedding typically ranges from SAR 150,000 to upwards of SAR 1,000,000. This includes premium venue sourcing, custom floral designs, and world-class entertainment and catering." },
                { q: "Which hotels are best for weddings in Jeddah?", a: "The Ritz-Carlton Jeddah, Park Hyatt, and Waldorf Astoria are among the best hotels for weddings in Jeddah. We specialize in securing these exclusive Red Sea venues with preferred rates." },
                { q: "wedding planner near me Riyadh", a: "Saudi Event Management is strategically based in Riyadh, ensuring you always have immediate, hands-on support for your personalized wedding event." },
                { q: "who plans weddings in Jeddah Saudi Arabia", a: "We proudly plan and execute breathtaking weddings in Jeddah, providing a dedicated team of coastal luxury specialists." },
                { q: "best wedding company Saudi Arabia", a: "Known for our impeccable taste and operational excellence, Saudi Event Management is frequently called the best wedding company Saudi Arabia." },
                { q: "Is a wedding coordinator different from a wedding planner?", a: "A wedding planner manages the entire creative and logistical journey (often 6-12 months), while a coordinator focuses purely on the 'day-of' execution to ensure your plans run flawlessly." }
              ]).map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
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
                { title: "الأعراس الملكية", slug: "royal-weddings", desc: "عقد القران والوليمة والزفّة وليلة الحناء — تميّز مراسمي للعائلات السعودية المرموقة." },
                { title: "فعاليات الوجهات", slug: "destination-events", desc: "حفلات زفاف في العُلا ونيوم وساحل البحر الأحمر." },
                { title: "الفعاليات الفاخرة وكبار الشخصيات", slug: "luxury-vip-events", desc: "تجارب فعاليات ملكية وكبار الثروات بسرية مطلقة." },
                { title: "الإنتاج الفعّالياتي", slug: "event-production", desc: "مسرح وصوت وصورة وإضاءة وإنتاج أزهار لأي حجم زفاف." },
                  ]
                : [
                { title: "Royal Weddings", slug: "royal-weddings", desc: "Nikah, Walima, Zaffa, and Laylat al-Henna — ceremonial excellence for distinguished Saudi families." },
                { title: "Destination Events", slug: "destination-events", desc: "Destination weddings in AlUla, NEOM, and the Red Sea coast." },
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Royal and HNWI event experiences with absolute discretion." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and floral production for any wedding scale." },
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

        {/* ── FEATURED WEDDING PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">{isAr ? "أعراس مختارة من أعمالنا" : "Featured Weddings From Our Portfolio"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "زفاف الرياض الملكي", slug: "royal-riyadh-wedding", desc: "زفاف مراسمي متعدد الأيام لعائلة رياضية مرموقة — عقد قران وزفّة وحفل وليمة كبير." },
                { title: "زفاف شاطئ جدة", slug: "jeddah-beach-wedding", desc: "احتفال على واجهة البحر الأحمر يمزج التنسيق الساحلي بالضيافة الحجازية الأصيلة." },
                { title: "حفل زفاف كبير", slug: "grand-wedding-ceremony", desc: "زفاف قاعة متكامل بكوشة مخصّصة وتصميم أزهار وإنتاج إعلامي سينمائي." },
                  ]
                : [
                { title: "Royal Riyadh Wedding", slug: "royal-riyadh-wedding", desc: "A multi-day ceremonial wedding for a distinguished Riyadh family — Nikah, Zaffa, and a grand Walima reception." },
                { title: "Jeddah Beach Wedding", slug: "jeddah-beach-wedding", desc: "A Red Sea waterfront celebration blending coastal styling with traditional Hejazi hospitality." },
                { title: "Grand Wedding Ceremony", slug: "grand-wedding-ceremony", desc: "A full-scale ballroom wedding with bespoke Kosha, floral design, and cinematic media production." },
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
                <h3 className="text-slate-900 font-bold text-lg">{isAr ? "مستعدّ لبدء التخطيط؟" : "Ready to start planning?"}</h3>
                <p className="text-gray-500 text-sm mt-1">{isAr ? "احجز استشارة مجانية أو تحدّث مباشرة مع فريق الأعراس — نردّ عادةً خلال ساعتين." : "Book a free consultation or speak directly with our wedding team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? "احجز استشارة مجانية" : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? "تواصل معنا" : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-gray-500 text-sm mt-6">تصفّح <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو استكشف خدمة <Link href={`${arHref}/services/royal-weddings`} className="text-[var(--primary)] font-semibold hover:underline">تخطيط الأعراس الملكية</Link>.</p>
            ) : (
              <p className="text-gray-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore our <Link href="/services/royal-weddings" className="text-[var(--primary)] font-semibold hover:underline">royal wedding planning</Link> service.</p>
            )}
          </div>
        </section>

        {/* ── Wedding Planning Locations ── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-widest">{isAr ? "أين ننظّم الأعراس" : "Where We Plan Weddings"}</h3>
            <p className="text-gray-500 text-sm mb-8">{isAr ? "خدمات تنظيم أعراس فاخرة متوفّرة في أبرز وجهات السعودية." : "Luxury wedding planning services available across Saudi Arabia's premier destinations."}</p>
            <div className="flex flex-wrap gap-3">
              {(isAr
                ? [
                { name: "مخطّط أعراس الرياض", href: "/locations/riyadh" },
                { name: "مخطّط أعراس جدة", href: "/locations/jeddah" },
                { name: "مخطّط أعراس الدمام", href: "/locations/dammam" },
                { name: "أعراس الوجهات في العُلا", href: "/locations/alula" },
                { name: "أعراس مكة", href: "/locations/makkah" },
                  ]
                : [
                { name: "Wedding Planner Riyadh", href: "/locations/riyadh" },
                { name: "Wedding Planner Jeddah", href: "/locations/jeddah" },
                { name: "Wedding Planner Dammam", href: "/locations/dammam" },
                { name: "Destination Weddings AlUla", href: "/locations/alula" },
                { name: "Weddings Makkah", href: "/locations/makkah" },
              ]).map((loc) => (
                <Link
                  key={loc.href}
                  href={`${arHref}${loc.href}`}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── From Our Blog ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest">{isAr ? "موارد تخطيط الأعراس" : "Wedding Planning Resources"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "How Much Does a Wedding Cost in Saudi Arabia? (2026 Guide)", slug: "exceptional-wedding-cost-saudi-arabia-guide", desc: "A comprehensive data-driven cost breakdown comparing Riyadh vs AlUla luxury weddings." },
                { title: "Why Saudi Arabia is the New Global Destination for Weddings", slug: "destination-wedding-planning-guide", desc: "From AlUla to NEOM, discover why Vision 2030 has transformed Saudi Arabia into the ultimate wedding destination." },
                { title: "Destination Weddings in AlUla & The Red Sea", slug: "destination-weddings-alula-red-sea", desc: "Crafting breathtaking desert ceremonies and Red Sea beachfront weddings in Saudi Arabia." },
                { title: "Best Wedding Venues in Jeddah 2026", slug: "best-wedding-venues-jeddah-2026", desc: "The complete guide to Jeddah's best wedding venues — waterfront ceremony spaces and exceptional hotel ballrooms." },
                { title: "Crafting Unforgettable Royal Weddings in Saudi Arabia", slug: "crafting-unforgettable-royal-weddings-saudi-arabia", desc: "Explore the essence of a royal Saudi wedding and how Vision 2030 is shaping grand celebrations." },
                { title: "2026 Event Color Trends: The Defining Palette", slug: "trending-colors-2026-event-palette", desc: "Discover the stunning color trends dominating events in 2026 — from AlUla sands to Red Sea blues." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`${arHref}/blog/${post.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">{isAr ? "دليل الأعراس" : "Wedding Guide"}</span>
                  <h4 className="text-slate-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
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
