import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { Crown, Heart, Sparkles, Flower2, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  return {
    title: isAr
      ? { absolute: "مخطّطو حفلات الزفاف الفاخرة في السعودية | الأعراس الملكية | إدارة الفعاليات السعودية" }
      : 'Luxury Wedding Planners Saudi Arabia | Royal Weddings',
    description: isAr
      ? "تصمّم إدارة الفعاليات السعودية أرقى حفلات الزفاف الفاخرة والمراسم الملكية في الرياض وجدة والعلا — خدمات عرائس كاملة لكبار الشخصيات وتصميم كوشة استثنائي."
      : 'Saudi Event Management crafts the most exclusive luxury weddings and royal ceremonies in Riyadh, Jeddah, and AlUla. Complete VIP bridal services and kosha design.',
    keywords: 'Luxury wedding planners Riyadh, Royal weddings Saudi Arabia, VIP wedding organizer KSA, Kosha design Riyadh, Destination weddings AlUla',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/luxury-weddings`,
      languages: hreflangAlternates("/portfolio/luxury-weddings"),
    },
  };
}

// Single source of truth — powers both the visible case-study grid and the
// JSON-LD ItemList so structured data always matches the page.
const caseStudies = [
  {
    title: "Royal Wedding", loc: "Riyadh", img: "/gallery_2.webp", slug: "royal-riyadh-wedding",
    brief: "An 800-guest royal wedding with a bespoke desert-oasis build and full VIP protocol.",
    alt: "Luxury royal wedding kosha and floral stage design at a grand Riyadh wedding hall in Saudi Arabia",
  },
  {
    title: "Luxury Soiree", loc: "Riyadh", img: "/gallery_destination_wedding.webp", slug: "riyadh-luxury-soiree",
    brief: "An intimate high-society soiree with immersive lighting and curated floral architecture.",
    alt: "Elegant luxury wedding soiree table setting and ambient lighting in Riyadh Saudi Arabia",
  },
  {
    title: "Seaside Wedding", loc: "Jeddah", img: "/jeddah_beach_wedding_setup.webp", slug: "jeddah-beach-wedding",
    brief: "A 450-guest Red Sea coastal wedding production on the Jeddah seafront.",
    alt: "Luxurious seaside wedding setup with floral arch on the Red Sea coast in Jeddah Saudi Arabia",
  },
  {
    title: "Grand Ceremony", loc: "Riyadh", img: "/wedding_hall_grand_entrance.webp", slug: "grand-wedding-ceremony",
    brief: "A 600+ guest grand wedding with a traditional zaffah entrance and full production.",
    alt: "Grand traditional wedding entrance with VIP guests in a luxury Riyadh wedding hall Saudi Arabia",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Luxury Wedding Portfolio",
      "description": "Showcase of elite royal weddings and VIP luxury ceremonies produced by Saudi Event Management across Riyadh, Jeddah, and AlUla.",
      "url": "https://saudieventmanagement.com/portfolio/luxury-weddings",
      "inLanguage": "en-US",
      "isPartOf": { "@id": "https://saudieventmanagement.com/#website" },
      "about": { "@id": "https://saudieventmanagement.com/#organization" },
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": caseStudies.length,
        "itemListElement": caseStudies.map((c, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://saudieventmanagement.com/portfolio/${c.slug}`,
          "item": {
            "@type": "CreativeWork",
            "name": `${c.title} — ${c.loc}`,
            "about": "Luxury Wedding",
            "description": c.brief,
            "locationCreated": { "@type": "Place", "name": `${c.loc}, Saudi Arabia` },
            "creator": { "@id": "https://saudieventmanagement.com/#organization" }
          }
        }))
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Luxury Weddings", "item": "https://saudieventmanagement.com/portfolio/luxury-weddings" }
      ]
    }
  ]
};

export default async function LuxuryWeddingsPortfolio({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const arHref = isAr ? "/ar" : "";

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title={isAr ? "أعمال الأعراس الملكية" : "Royal Wedding Portfolio"}
        subtitle={
          isAr
            ? "ننسّق أبهى حفلات الزفاف في المملكة، بمزج هندسة الأزهار الآسرة مع سرية مطلقة وتنفيذ لا تشوبه شائبة."
            : "We orchestrate the Kingdom's most magnificent weddings, blending breathtaking floral architecture with absolute discretion and flawless execution."
        }
        backgroundImage="/luxury_wedding_couple_guests.webp"
        imageAlt="Luxury royal weddings Saudi Arabia portfolio"
        badge={isAr ? "أعمال حفلات الزفاف الفاخرة" : "Luxury Weddings Portfolio"}
        breadcrumbs={[
          { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
          { label: isAr ? "أعمالنا" : "Portfolio", href: `${arHref}/portfolio` },
          { label: isAr ? "حفلات الزفاف الفاخرة" : "Luxury Weddings" },
        ]}
        enableParallax
        minHeight="standard"
      />

      {/* Introduction — overview, entities & high-value internal links */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <span className="section-label mb-5">
            <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
            {isAr ? "حفلات الزفاف الفاخرة" : "Luxury Weddings"}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mt-5 mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? <>أبهى <span className="text-[var(--primary)]">حفلات الزفاف</span> في المملكة</> : <>The Kingdom&apos;s Most <span className="text-[var(--primary)]">Magnificent Weddings</span></>}
          </h2>
          <div className="space-y-5 text-neutral-600 text-[16px] leading-relaxed">
            {isAr ? (
              <>
                <p>
                  إدارة الفعاليات السعودية مخطّط حفلات زفاف فاخرة يُنتج المراسم الملكية واحتفالات كبار الثروات في عموم المملكة — من القاعات الكبرى في <Link href={`${arHref}/locations/riyadh`} className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">الرياض</Link> والقاعات المطلّة على البحر في <Link href={`${arHref}/locations/jeddah`} className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">جدة</Link> إلى حفلات الزفاف في صحارى <Link href={`${arHref}/locations/alula`} className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">العلا</Link>.
                </p>
                <p>
                  كل زفاف يُنفَّذ بالكامل: تصميم الكوشة والمسرح، وهندسة الأزهار، وتصميم الزفّة، والإضاءة، وتنسيق الضيافة، وبروتوكول كبار الشخصيات — كل ذلك بسرية مطلقة. أتخطّط لزفافك؟ اطّلع على <Link href={`${arHref}/blog/exceptional-wedding-cost-saudi-arabia-guide`} className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">دليل تكاليف حفلات الزفاف الفاخرة في السعودية</Link> قبل أن تبدأ.
                </p>
              </>
            ) : (
              <>
                <p>
                  Saudi Event Management is a luxury wedding planner producing royal ceremonies and high-net-worth celebrations across the Kingdom — from grand ballrooms in <Link href="/locations/riyadh" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">Riyadh</Link> and seafront venues in <Link href="/locations/jeddah" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">Jeddah</Link> to destination weddings in the deserts of <Link href="/locations/alula" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">AlUla</Link>.
                </p>
                <p>
                  Every wedding is delivered end-to-end: kosha and stage design, floral architecture, zaffah choreography, lighting, catering coordination, and VIP protocol — all with absolute discretion. Planning yours? Read our <Link href="/blog/exceptional-wedding-cost-saudi-arabia-guide" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">guide to luxury wedding costs in Saudi Arabia</Link> before you begin.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* NLP / GEO Methodology Block */}
      <section className="py-20 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-12 text-center" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? <>كيف نُنتج <span className="text-[var(--primary)]">الأعراس الملكية</span></> : <>How We Produce <span className="text-[var(--primary)]">Royal Weddings</span></>}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Crown className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "البروتوكول الملكي" : "Royal Protocol"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "خصوصية مطلقة، وتصاريح أمنية عالية، وإدارة بروتوكول سلسة لأفراد العائلة المالكة وكبار الشخصيات." : "Absolute privacy, high-security clearance, and seamless protocol management for royal family members and VVIP guests."}</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Flower2 className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "تصميم الكوشة" : "Kosha Design"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "بناء مسرح معماري وتنسيقات أزهار من السقف إلى الأرض بإبداع مصممين عالميين." : "Architectural stage building and ceiling-to-floor floral installations crafted by world-renowned designers."}</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Sparkles className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "تصميم الزفّة" : "Zaffah Choreography"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "تنسيق دخول مهيب بأبرز فنّاني المنطقة وإضاءة محيطة متناغمة." : "Orchestration of grand entrances featuring top-tier regional performers and synchronized ambient lighting."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center" style={{ letterSpacing: "-0.025em" }}>{isAr ? "دراسات حالة مختارة للأعراس" : "Featured Wedding Case Studies"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((item, i) => (
              <Link href={`${arHref}/portfolio/${item.slug}`} key={i} className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:shadow-lg hover:border-[var(--primary)]/40 transition-all" aria-label={`View case study: ${item.title} in ${item.loc}`}>
                <div className="h-72 overflow-hidden relative">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">{item.loc}, {isAr ? "السعودية" : "Saudi Arabia"}</p>
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-[14px] leading-relaxed mb-4">{item.brief}</p>
                  <span className="inline-flex items-center gap-1.5 text-[var(--primary)] text-[13px] font-semibold">
                    {isAr ? "عرض دراسة الحالة" : "View case study"}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/weddings`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "تنظيم حفلات الزفاف الفاخرة" : "Luxury Wedding Planning"}
            </Link>
            <Link href={`${arHref}/services/royal-weddings`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الأعراس الملكية والمراسم" : "Royal Weddings & Ceremonies"}
            </Link>
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "التخطيط لحفلات الزفاف الملكية في السعودية" : "Planning Royal Weddings in Saudi Arabia"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed max-w-4xl space-y-4">
            <p>
              {isAr
                ? "تتخصص إدارة الفعاليات السعودية في تحويل الأحلام إلى حقيقة من خلال تنظيم حفلات زفاف فاخرة وملكية في أرقى المواقع في المملكة. نحن نقدم خدمات تصميم حفلات الزفاف بالكامل، بدءاً من ابتكار مفهوم الكوشة الفريد، وتنسيق الأزهار، وتصميم الإضاءة الاحترافية، وحتى إدارة بروتوكولات كبار الشخصيات والضيوف."
                : "Saudi Event Management specializes in turning dreams into reality by organizing luxury and royal weddings at the most prestigious venues across the Kingdom. We provide comprehensive wedding design services, from creating unique kosha concepts and exquisite floral arrangements to professional lighting design and VIP guest protocol management."}
            </p>
            <p>
              {isAr
                ? "سواء كنت تخطط لإقامة حفل زفاف أسطوري في إحدى قاعات الرياض الكبرى، أو حفل زفاف على شواطئ جدة الساحرة، أو تجربة زفاف استثنائية في صحراء العلا، فإن خبرائنا يضمنون لك تجربة لا تشوبها شائبة. نحن ندرك أهمية الخصوصية التامة والاهتمام بأدق التفاصيل في حفلات الزفاف الملكية، ولهذا نتعاون مع نخبة من المصممين والموردين لضمان أعلى مستويات الفخامة."
                : "Whether you are planning a legendary wedding in one of Riyadh's grand ballrooms, a glamorous beachfront celebration in Jeddah, or an extraordinary destination wedding in the sweeping deserts of AlUla, our experts guarantee a flawless experience. We understand the paramount importance of absolute privacy and meticulous attention to detail in royal weddings, which is why we collaborate with elite designers and premium vendors to ensure unparalleled luxury."}
            </p>
            <p>
              {isAr
                ? "دائمًا ما نبقى على اطلاع بأحدث اتجاهات حفلات الزفاف العالمية، مع الحفاظ على اللمسة الثقافية السعودية الأصيلة. التزامنا بالتفوق جعلنا الوجهة الأولى للباحثين عن الرقي والتميز في عالم تنظيم حفلات الزفاف، حيث نعكس في كل فعالية قيم رؤية السعودية 2030."
                : "We stay consistently updated with the latest global wedding trends while preserving the authentic Saudi cultural touch. Our unwavering commitment to excellence has made us the ultimate destination for those seeking sophistication and distinction in the world of wedding planning, reflecting the ambitious values of Saudi Vision 2030 in every celebration we curate."}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/gallery_destination_wedding.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>{isAr ? <>هل أنت مستعدّ لتخطيط <span className="text-emerald-400">زفافك الملكي؟</span></> : <>Ready to Plan Your <span className="text-emerald-400">Royal Wedding?</span></>}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              {isAr ? "تحدّث مع كبار استشاريي العرائس لدينا لتصميم احتفال مهيب." : "Speak with our senior bridal consultants to design a magnificent celebration."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${arHref}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] group"
              >
                {isAr ? "احجز استشارة العرائس" : "Book Your Bridal Consultation"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              </Link>
              <a
                href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%20would%20like%20to%20plan%20a%20luxury%20wedding."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] text-white font-medium hover:bg-[#1fb855] transition-colors rounded-xl text-[14px] shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
                aria-label="Chat with Saudi Event Management on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {isAr ? "راسلنا على واتساب" : "WhatsApp Us"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
