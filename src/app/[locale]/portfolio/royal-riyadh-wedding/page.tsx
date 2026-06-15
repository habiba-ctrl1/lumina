import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Calendar, MapPin } from "lucide-react";

const BASE = "https://saudieventmanagement.com";
const OG_IMAGE = `${BASE}/royal_wedding_saudi.webp`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = `${BASE}${isAr ? "/ar" : ""}/portfolio/royal-riyadh-wedding`;

  // The root layout applies a `%s | Saudi Event Management` title template, so
  // the page title must NOT include the brand (the template adds it). The OG/
  // Twitter titles are standalone, so they get the brand appended explicitly.
  const title = isAr
    ? "حفل زفاف ملكي في الرياض — دراسة حالة فاخرة في الدرعية"
    : "Royal Riyadh Wedding Case Study — Luxury Wedding Planning in Diriyah";
  const socialTitle = `${title} | Saudi Event Management`;
  const description = isAr
    ? "كيف نظمت إدارة الفعاليات السعودية حفل زفاف ملكي فاخر لأكثر من 1200 ضيف على مدى 3 أيام في الدرعية التاريخية بالرياض — يجمع بين التراث والفخامة العصرية."
    : "An inside look into how Saudi Event Management orchestrated a magnificent royal wedding for 1,200+ guests over 3 days in historic Diriyah, Riyadh — blending Saudi tradition with modern luxury.";

  return {
    title,
    description,
    keywords: isAr
      ? ["زفاف ملكي الرياض", "تنظيم حفلات الزفاف الفاخرة", "حفل زفاف الدرعية", "دراسة حالة فعالية"]
      : [
          "Royal wedding Riyadh",
          "Luxury wedding planning Diriyah",
          "Saudi royal wedding case study",
          "Luxury event management Saudi Arabia",
        ],
    alternates: {
      canonical,
      languages: hreflangAlternates("/portfolio/royal-riyadh-wedding"),
    },
    openGraph: {
      type: "article",
      title: socialTitle,
      description,
      url: canonical,
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Royal wedding in Diriyah, Riyadh by Saudi Event Management" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured data — Article + Breadcrumb, locale-aware
// ─────────────────────────────────────────────────────────────────────────────
function buildJsonLd(locale: string) {
  const isAr = locale === "ar";
  const prefix = isAr ? "/ar" : "";
  const url = `${BASE}${prefix}/portfolio/royal-riyadh-wedding`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: isAr ? "حفل زفاف ملكي في الرياض — دراسة حالة" : "The Royal Riyadh Wedding — Case Study",
        description: isAr
          ? "دراسة حالة لحفل زفاف ملكي فاخر لأكثر من 1200 ضيف على مدى 3 أيام في الدرعية، الرياض."
          : "A case study of a luxury royal wedding for 1,200+ guests over 3 days in Diriyah, Riyadh.",
        image: OG_IMAGE,
        inLanguage: isAr ? "ar" : "en",
        author: { "@type": "Organization", name: "Saudi Event Management" },
        publisher: {
          "@type": "Organization",
          name: "Saudi Event Management",
          logo: { "@type": "ImageObject", url: `${BASE}/logo.webp` },
        },
        mainEntityOfPage: url,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: `${BASE}${prefix}` },
          { "@type": "ListItem", position: 2, name: isAr ? "أعمالنا" : "Portfolio", item: `${BASE}${prefix}/portfolio` },
          { "@type": "ListItem", position: 3, name: isAr ? "حفل زفاف ملكي في الرياض" : "Royal Riyadh Wedding", item: url },
        ],
      },
    ],
  };
}

export default async function RoyalRiyadhWeddingCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const jsonLd = buildJsonLd(locale);
  // Prefix internal links with /ar on the Arabic route
  const lp = (path: string) => `${isAr ? "/ar" : ""}${path}`;

  const c = {
    backToPortfolio: isAr ? "العودة إلى الأعمال" : "Back to Portfolio",
    caseStudy: isAr ? "دراسة حالة" : "Case Study",
    heroTitlePre: isAr ? "حفل الزفاف الملكي في " : "The Royal ",
    heroTitleHi: isAr ? "الرياض" : "Riyadh Wedding",
    stats: [
      { icon: MapPin, label: isAr ? "الموقع" : "Location", val: isAr ? "الدرعية، الرياض" : "Diriyah, Riyadh" },
      { icon: Users, label: isAr ? "الضيوف" : "Guests", val: isAr ? "+1,200" : "1,200+" },
      { icon: Calendar, label: isAr ? "المدة" : "Duration", val: isAr ? "3 أيام" : "3 Days" },
      { icon: CheckCircle2, label: isAr ? "الخدمات" : "Services", val: isAr ? "إنتاج كامل" : "Full Production" },
    ],
    challengePre: isAr ? "" : "The ",
    challengeHi: isAr ? "التحدي" : "Challenge",
    challengeP1: isAr
      ? "رغب عملاؤنا الكرام في احتفال يكرّم التقاليد السعودية العريقة مع إدخال عناصر تصميم طليعية. وتطلّب حجم الفعالية الهائل — استضافة أكثر من 1,200 من كبار الضيوف والشخصيات المرموقة وأفراد العائلات الملكية على مدى ثلاثة أيام في الدرعية التاريخية — تخطيطاً لوجستياً دقيقاً وتنفيذاً لا تشوبه شائبة وسرية مطلقة."
      : <>Our esteemed clients desired a celebration that honored deep-rooted Saudi traditions while introducing avant-garde design elements. The sheer scale of the event—hosting over 1,200 VIP guests, dignitaries, and royalty over a three-day period in <Link href={lp("/locations/riyadh")} className="text-[var(--primary)] underline underline-offset-2 hover:text-white transition-colors">historical Diriyah, Riyadh</Link>—required meticulous logistical planning, flawless execution, and absolute discretion.</>,
    challengeP2: isAr
      ? "كان التحدي الأكبر هو تحويل مساحة صحراوية خام إلى واحة خلابة مكيّفة بالكامل ضمن جدول بناء صارم مدته 14 يوماً، مع ضمان عدم الإخلال بالموقع التراثي المحيط."
      : "The primary challenge was transforming a raw desert expanse into a breathtaking, climate-controlled oasis within a rigorous 14-day build schedule, ensuring no disruption to the surrounding heritage site.",
    challengeP3: isAr
      ? "أضافت حساسية الموقع — الواقع على مقربة من حي الطريف المدرج ضمن قائمة اليونسكو للتراث العالمي — طبقة من التعقيد. فكل عنصر إنشائي وكل وحدة إضاءة وكل مسار وصول للضيوف تطلّب موافقات دقيقة من الجهات المعنية، وتنسيقاً مع بروتوكولات الأمن الملكي، والتزاماً صارماً بمعايير الحفاظ على التراث."
      : <>The site's sensitivity—adjacent to the <Link href={lp("/blog/diriyah-gate-event-venues-corporate")} className="text-[var(--primary)] underline underline-offset-2 hover:text-white transition-colors">UNESCO-listed At-Turaif district</Link>—added a further layer of complexity. Every structural element, lighting rig, and guest-access route required careful approvals, coordination with royal security protocols, and strict adherence to heritage-preservation standards.</>,
    approachPre: isAr ? "" : "Our ",
    approachHi: isAr ? "النهج" : "Approach",
    approachP1: isAr
      ? "بدأنا بدراسة هندسية وثقافية متكاملة للموقع، ووضعنا نموذجاً ثلاثي الأبعاد للفعالية بالكامل قبل أن يصل أي طاقم إلى الأرض. أتاح لنا هذا التخطيط المسبق محاكاة تدفّق الضيوف، وأحمال التكييف، وزوايا الإضاءة، وخطوط رؤية الكاميرات — ما قلّص هامش الخطأ في الموقع إلى أدنى حد ضمن نافذة البناء الضيقة."
      : "We began with an integrated engineering and cultural study of the site, modelling the entire event in 3D before a single crew member arrived on the ground. This pre-visualisation let us simulate guest flow, cooling loads, lighting angles, and camera sightlines—reducing on-site margin for error to a minimum within the tight build window.",
    approachP2: isAr
      ? "على مدار 14 يوماً، عمل الفريق على ثلاث ورديات متواصلة، مع تنسيق أكثر من 30 مورّداً متخصصاً تحت إدارة مركزية واحدة. وأعطينا الأولوية للسرية المطلقة في كل مرحلة، من اتفاقيات عدم الإفصاح مع الموردين إلى بروتوكولات دخول مخصصة، بما يليق بمكانة الضيوف ويحفظ خصوصية العائلة المضيفة."
      : <>Over 14 days, the team worked across three continuous shifts, orchestrating <Link href={lp("/vendors")} className="text-[var(--primary)] underline underline-offset-2 hover:text-white transition-colors">30+ specialist vendors</Link> under a single point of command. We prioritised absolute discretion at every stage—from vendor NDAs to bespoke access protocols—befitting the stature of the guests and protecting the host family's privacy.</>,
    solutionP2: isAr
      ? "في قلب التصميم، جمعت الخيمة الزجاجية بين الهندسة العصرية والزخارف النجدية الأصيلة، فيما غذّى نظام تكييف صامت بقدرة عالية البيئة الداخلية للحفاظ على حرارة مثالية رغم حرارة الصحراء. وكمّلت الإضاءة الحركية والإنتاج الصوتي والبصري تجربة غامرة تتبدّل مع مراحل الاحتفال الثلاثة."
      : "At the heart of the design, the glass marquee married contemporary engineering with authentic Najdi motifs, while a high-capacity silent climate system kept the interior at a perfect temperature despite the desert heat. Kinetic lighting and a full audio-visual production completed an immersive experience that evolved across the celebration's three acts.",
    solutionPre: isAr ? "" : "The ",
    solutionHi: isAr ? "الحل" : "Solution",
    solutionP: isAr
      ? "نشرت إدارة الفعاليات السعودية فريقاً من 400 متخصص، بينهم مصممو أزهار عالميون ومهندسو إضاءة وخبراء ضيافة. وصمّمنا خيمة زجاجية مخصصة بمساحة 5,000 متر مربع تتيح إطلالات بانورامية على العمارة النجدية مع الحفاظ على بيئة داخلية مثالية."
      : <>Saudi Event Management deployed a team of 400 specialists, including international floral designers, <Link href={lp("/services/event-production")} className="text-[var(--primary)] underline underline-offset-2 hover:text-white transition-colors">lighting architects and production engineers</Link>, and hospitality experts. We engineered a custom 5,000-square-meter glass marquee that provided panoramic views of the Najdi architecture while maintaining a pristine interior environment.</>,
    solutionList: isAr
      ? ["إنشاء خيمة زجاجية مخصصة", "أكثر من 100,000 زهرة نادرة مستوردة", "تركيب إضاءة حركية", "شراكات طهي حائزة على نجمة ميشلان"]
      : ["Custom glass marquee construction", "Over 100,000 imported exotic florals", "Kinetic lighting installation", "Michelin-star culinary partnerships"],
    solutionImgAlt: isAr
      ? "الخيمة الزجاجية المخصصة وتنسيق الأزهار والإضاءة الحركية في حفل الزفاف الملكي بالدرعية"
      : "Custom glass marquee, floral staging and kinetic lighting at the Diriyah royal wedding",
    resultPre: isAr ? "" : "The ",
    resultHi: isAr ? "النتيجة" : "Result",
    resultP: isAr
      ? "اعتُبرت الفعالية تحفة من الفخامة العصرية، وأرست معياراً جديداً لحفلات زفاف النخبة في المملكة. كان رضا الضيوف غير مسبوق، وترك الدمج السلس بين التقنية والتقاليد انطباعاً لا يُنسى."
      : <>The event was widely regarded as a masterpiece of modern luxury, setting a new benchmark for <Link href={lp("/blog/crafting-unforgettable-royal-weddings-saudi-arabia")} className="text-[var(--primary)] underline underline-offset-2 hover:text-white transition-colors">high-society weddings in Saudi Arabia</Link>. Guest satisfaction was unprecedented, and the seamless integration of technology and tradition left a lasting impression.</>,
    resultP2: isAr
      ? "سُلّم الموقع التراثي إلى حالته الأصلية تماماً خلال 72 ساعة من ختام الاحتفال، دون أي أثر دائم على محيطه. ورسّخت هذه الفعالية مكانة إدارة الفعاليات السعودية كشريك موثوق للمناسبات رفيعة المستوى التي لا تحتمل أدنى خطأ، وأثمرت عن علاقات طويلة الأمد وإحالات حصرية ضمن أرقى الأوساط في المملكة."
      : "The heritage site was returned to its original condition within 72 hours of the celebration's close, leaving no lasting footprint on its surroundings. The project cemented Saudi Event Management's standing as a trusted partner for high-stakes occasions that allow no margin for error—yielding lasting relationships and discreet referrals within the Kingdom's most exclusive circles.",
    metricsPre: isAr ? "بـ" : "By the ",
    metricsHi: isAr ? "الأرقام" : "Numbers",
    metrics: isAr
      ? [
          { value: "+1,200", label: "ضيف من كبار الشخصيات" },
          { value: "400", label: "متخصص في الموقع" },
          { value: "14", label: "يوماً للبناء" },
          { value: "5,000 م²", label: "خيمة زجاجية مخصصة" },
          { value: "+100,000", label: "زهرة مستوردة" },
          { value: "+30", label: "مورّداً تحت إدارة واحدة" },
        ]
      : [
          { value: "1,200+", label: "VIP guests hosted" },
          { value: "400", label: "specialists on site" },
          { value: "14", label: "day build schedule" },
          { value: "5,000 m²", label: "custom glass marquee" },
          { value: "100,000+", label: "imported florals" },
          { value: "30+", label: "vendors, one command" },
        ],
    galleryPre: isAr ? "" : "Event ",
    galleryHi: isAr ? "معرض الصور" : "Gallery",
    gallery: [
      { src: "/wedding_hall_grand_entrance.webp", alt: isAr ? "المدخل الكبير لقاعة الزفاف الملكي" : "Grand entrance of the royal wedding hall" },
      { src: "/luxury_wedding_table_setting.webp", alt: isAr ? "تنسيق طاولات المأدبة الفاخرة" : "Luxury banquet table setting" },
      { src: "/luxury_wedding_couple_guests.webp", alt: isAr ? "العروسان مع الضيوف خلال الاحتفال" : "The couple celebrating with guests" },
      { src: "/riyadh_luxury_reception_people.webp", alt: isAr ? "قاعة الاستقبال الفاخرة في الرياض" : "Luxury reception hall in Riyadh" },
      { src: "/royal_wedding_saudi.webp", alt: isAr ? "منصة الزفاف الملكي المضاءة" : "Illuminated royal wedding stage" },
      { src: "/real_wedding.webp", alt: isAr ? "لحظات من مراسم الزفاف" : "Moments from the wedding ceremony" },
    ],
    moreProjectsPre: isAr ? "استكشف أعمالاً " : "Explore More ",
    moreProjectsHi: isAr ? "أخرى" : "Projects",
    moreProjects: [
      { href: lp("/portfolio/riyadh-luxury-soiree"), title: isAr ? "سهرة الرياض الفاخرة" : "Riyadh Luxury Soirée", meta: isAr ? "الرياض" : "Riyadh" },
      { href: lp("/portfolio/jeddah-beach-wedding"), title: isAr ? "زفاف شاطئ جدة" : "Jeddah Beach Wedding", meta: isAr ? "جدة" : "Jeddah" },
      { href: lp("/portfolio/alula-desert-festival"), title: isAr ? "مهرجان العلا الصحراوي" : "AlUla Desert Festival", meta: isAr ? "العلا" : "AlUla" },
    ],
    testimonial: isAr
      ? "«لم تكتفِ إدارة الفعاليات السعودية بتنظيم حفل زفاف؛ بل صنعت إرثاً. إن اهتمامهم بالتفاصيل وسعيهم الدؤوب نحو الكمال مكّنانا من أن نكون حاضرين تماماً في أهم لحظة في حياتنا.»"
      : "“Saudi Event Management did not just plan a wedding; they crafted a legacy. Their attention to detail and unwavering pursuit of perfection allowed us to be fully present in the most important moment of our lives.”",
    testimonialBy: isAr ? "— العروس والعريس" : "— The Bride & Groom",
    relatedServices: isAr ? "خدمات ذات صلة" : "Related Services",
    links: [
      { href: lp("/services/weddings"), label: isAr ? "تخطيط حفلات الزفاف الفاخرة" : "Luxury Wedding Planning" },
      { href: lp("/services/royal-weddings"), label: isAr ? "حفلات الزفاف الملكية" : "Royal Weddings & Ceremonies" },
      { href: lp("/services/luxury-vip-events"), label: isAr ? "فعاليات كبار الشخصيات الفاخرة" : "Luxury & VIP Events" },
      { href: lp("/locations/riyadh"), label: isAr ? "فعاليات في الرياض" : "Events in Riyadh" },
    ],
    ctaPre: isAr ? "تخيّل " : "Envision Your ",
    ctaHi: isAr ? "تحفتك" : "Masterpiece",
    bookConsultation: isAr ? "احجز استشارة" : "Book a Consultation",
  };

  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale={locale} />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/gallery_wedding_reception.webp"
            alt={isAr ? "حفل زفاف ملكي في الرياض" : "Royal Riyadh Wedding"}
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653] via-[#1e2653]/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href={lp("/portfolio")} className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-medium">
            <ArrowLeft size={16} className="me-2" /> {c.backToPortfolio}
          </Link>
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/20">
            {c.caseStudy}
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
            {c.heroTitlePre}<span className="text-[var(--primary)] font-bold">{c.heroTitleHi}</span>
          </h1>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white/5 border-y border-white/10 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {c.stats.map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-slate-300 mb-1">{stat.label}</div>
              <div className="text-lg font-sans font-bold text-white">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 font-light text-lg leading-relaxed space-y-16">
        
        {/* The Challenge */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">{c.challengePre}<span className="text-[var(--primary)]">{c.challengeHi}</span></h2>
          <p className="mb-8">{c.challengeP1}</p>
          <p className="mb-8">{c.challengeP2}</p>
          <p>{c.challengeP3}</p>
        </div>

        {/* Our Approach */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">{c.approachPre}<span className="text-[var(--primary)]">{c.approachHi}</span></h2>
          <p className="mb-8">{c.approachP1}</p>
          <p>{c.approachP2}</p>
        </div>

        {/* The Solution */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">{c.solutionPre}<span className="text-[var(--primary)]">{c.solutionHi}</span></h2>
            <p className="mb-8">{c.solutionP}</p>
            <p className="mb-8">{c.solutionP2}</p>
            <ul className="space-y-3 mt-6">
              {c.solutionList.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image src="/wedding_stage_backdrop_decor.webp" alt={c.solutionImgAlt} width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Result */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">{c.resultPre}<span className="text-[var(--primary)]">{c.resultHi}</span></h2>
          <p className="mb-8">{c.resultP}</p>
          <p className="mb-8">{c.resultP2}</p>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center relative">
            <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e2653] px-4 text-[var(--primary)] text-4xl font-serif">&quot;</div>
            <p className="text-xl md:text-2xl font-sans font-bold text-white mb-8 leading-snug">{c.testimonial}</p>
            <div className="text-[var(--primary)] font-medium uppercase tracking-widest text-sm">{c.testimonialBy}</div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-12 text-center">{c.metricsPre}<span className="text-[var(--primary)]">{c.metricsHi}</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
            {c.metrics.map((m: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-sans font-bold text-[var(--primary)] mb-2">{m.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-300 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-12 text-center">{c.galleryPre}<span className="text-[var(--primary)]">{c.galleryHi}</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {c.gallery.map((img: any, i: number) => (
            <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-sm font-bold text-white/60 mb-8 uppercase tracking-widest">{c.relatedServices}</h3>
          <div className="flex flex-wrap gap-4">
            {c.links.map((link: any, i: number) => (
              <Link key={i} href={link.href} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Explore More Projects */}
          <h3 className="text-sm font-bold text-white/60 mt-16 mb-8 uppercase tracking-widest">{c.moreProjectsPre}<span className="text-[var(--primary)]">{c.moreProjectsHi}</span></h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {c.moreProjects.map((p: any, i: number) => (
              <Link key={i} href={p.href} className="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--primary)] transition-colors">
                <div className="text-xs uppercase tracking-widest text-[var(--primary)] mb-2">{p.meta}</div>
                <div className="text-white font-sans font-bold text-lg group-hover:text-[var(--primary)] transition-colors">{p.title}</div>
                <span className="inline-flex items-center gap-1 text-white/60 text-xs mt-4 group-hover:text-white transition-colors">
                  {c.caseStudy} <ArrowLeft size={12} className="rotate-180 rtl:rotate-0" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white/5 text-center">
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">{c.ctaPre}<span className="text-[var(--primary)]">{c.ctaHi}</span></h3>
        <Link
          href={lp("/contact")}
          className="inline-block px-10 py-4 bg-[var(--primary)] text-[#1e2653] font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          {c.bookConsultation}
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
