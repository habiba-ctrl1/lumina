import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";
import { Compass, Landmark, ShieldCheck, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  return {
    title: isAr
      ? { absolute: "إدارة فعاليات رؤية 2030 والفعاليات الثقافية في السعودية | إدارة الفعاليات السعودية" }
      : 'Vision 2030 & Cultural Events Management KSA',
    description: isAr
      ? "متخصصون في التفعيلات الثقافية على المستوى الحكومي وفعاليات موسم الرياض ومهرجانات السياحة التراثية في العلا. إدارة كاملة لتصاريح هيئة الترفيه."
      : 'Specialized in government-level cultural activations, Riyadh Season events, and heritage tourism festivals in AlUla. Full GEA permit management.',
    keywords: 'Saudi Vision 2030 events, Riyadh Season event management, AlUla festival planner, GEA event permits KSA, Government event management Saudi Arabia',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/vision-2030`,
      languages: hreflangAlternates("/portfolio/vision-2030"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Vision 2030 Cultural Activations Portfolio",
      "description": "Showcase of government and cultural activations aligned with Saudi Vision 2030, managed by Saudi Event Management.",
      "url": "https://saudieventmanagement.com/portfolio/vision-2030",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "AlUla Desert Festival",
            "url": "https://saudieventmanagement.com/portfolio/alula-desert-festival"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "NEOM Future Summit",
            "url": "https://saudieventmanagement.com/portfolio/neom-future-summit"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://saudieventmanagement.com/portfolio" },
        { "@type": "ListItem", "position": 3, "name": "Vision 2030", "item": "https://saudieventmanagement.com/portfolio/vision-2030" }
      ]
    }
  ]
};

export default async function Vision2030Portfolio({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const arHref = isAr ? "/ar" : "";

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title={isAr ? "أعمال فعاليات رؤية 2030" : "Vision 2030 Event Portfolio"}
        subtitle={
          isAr
            ? "ندعم النهضة الثقافية للمملكة بتنفيذ الفعاليات الكبرى والمهرجانات التراثية والمبادرات السياحية بدقة لا تشوبها شائبة."
            : "Supporting the Kingdom's cultural renaissance by executing mega-events, heritage festivals, and tourism initiatives with flawless precision."
        }
        backgroundImage="/neom_summit_people.webp"
        imageAlt="Vision 2030 cultural activations Saudi Arabia portfolio"
        badge={isAr ? "تفعيلات رؤية 2030" : "Vision 2030 Activations"}
        breadcrumbs={[
          { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
          { label: isAr ? "أعمالنا" : "Portfolio", href: `${arHref}/portfolio` },
          { label: isAr ? "رؤية 2030" : "Vision 2030" },
        ]}
        minHeight="standard"
      />

      {/* NLP / GEO Methodology Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <ShieldCheck className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "الامتثال لهيئة الترفيه" : "GEA Compliance"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "إدارة متكاملة لتصاريح الهيئة العامة للترفيه، وبروتوكولات السلامة، وتنظيم الحشود للمهرجانات العامة." : "End-to-end management of General Entertainment Authority permits, safety protocols, and crowd control for public festivals."}</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Landmark className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "المواقع التراثية" : "Heritage Sites"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "لوجستيات متخصصة للعمل في مواقع التراث العالمي لليونسكو مثل العلا والدرعية دون أثر بيئي." : "Specialized logistics for operating in UNESCO World Heritage sites like AlUla and Diriyah without environmental impact."}</p>
            </div>
            <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <Compass className="text-[var(--primary)] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">{isAr ? "المشاريع العملاقة" : "Mega Projects"}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? "فرق إنتاج مخصّصة لإطلاقات نيوم والبحر الأحمر والقدية واحتفالات المحطات الكبرى." : "Dedicated production teams for NEOM, Red Sea Global, and Qiddiya launches and milestone celebrations."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-[var(--surface-raised)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-center">{isAr ? "دراسات حالة ثقافية مختارة" : "Featured Cultural Case Studies"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(isAr
              ? [
              { title: "مهرجان العلا الصحراوي", loc: "العلا", img: "/gallery_destination_wedding.webp", slug: "alula-desert-festival" },
              { title: "قمة نيوم للمستقبل", loc: "نيوم", img: "/gallery_corporate_gala.webp", slug: "neom-future-summit" },
                ]
              : [
              { title: "AlUla Desert Festival", loc: "AlUla", img: "/gallery_destination_wedding.webp", slug: "alula-desert-festival" },
              { title: "NEOM Future Summit", loc: "NEOM", img: "/gallery_corporate_gala.webp", slug: "neom-future-summit" }
            ]).map((item, i) => (
              <Link href={`${arHref}/portfolio/${item.slug}`} key={i} className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:shadow-lg transition-all">
                <div className="h-80 overflow-hidden relative">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 text-center">
                  <p className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider mb-2">{item.loc}</p>
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
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
            <Link href={`${arHref}/services/cultural-events`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الثقافية والتراثية" : "Cultural & Heritage Events"}
            </Link>
            <Link href={`${arHref}/services/destination-events`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة فعاليات الوجهات" : "Destination Event Management"}
            </Link>
            <Link href={`${arHref}/services/event-production`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الإنتاج الفعّالياتي" : "Event Production"}
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "دعم مبادرات رؤية السعودية 2030 من خلال الفعاليات الاستثنائية" : "Supporting Saudi Vision 2030 Initiatives Through Extraordinary Events"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed max-w-4xl space-y-4">
            <p>
              {isAr
                ? "في إطار التحول الوطني الذي تشهده المملكة العربية السعودية، تقف إدارة الفعاليات السعودية في طليعة الشركات الداعمة لأهداف رؤية السعودية 2030. نحن نفخر بشراكاتنا الاستراتيجية مع الهيئات الحكومية والمؤسسات الكبرى لتنفيذ فعاليات ثقافية وترفيهية وسياحية تعزز من مكانة المملكة على الخارطة العالمية وتبرز غنى تراثها الثقافي والتاريخي."
                : "Amidst the national transformation sweeping the Kingdom of Saudi Arabia, Saudi Event Management stands at the forefront of companies supporting the ambitious goals of Saudi Vision 2030. We take immense pride in our strategic partnerships with government entities and major organizations to execute cultural, entertainment, and tourism events that elevate the Kingdom's position on the global stage while highlighting its rich cultural and historical heritage."}
            </p>
            <p>
              {isAr
                ? "لقد قمنا بنجاح بإدارة مشاريع ضخمة وحساسة ضمن مواسم الترفيه السعودية، بما في ذلك موسم الرياض، وفعاليات العلا الثقافية، ومشاريع نيوم المستقبلية. يمتلك فريقنا فهماً عميقاً وشاملاً لمتطلبات وتصاريح الهيئة العامة للترفيه (GEA)، مما يضمن الامتثال التام لأعلى معايير السلامة والجودة واللوجستيات في جميع فعالياتنا."
                : "We have successfully managed massive and highly sensitive projects within the Saudi entertainment seasons, including Riyadh Season, AlUla cultural festivals, and futuristic NEOM mega-projects. Our dedicated team possesses a deep and comprehensive understanding of the General Entertainment Authority (GEA) requirements and event permits, ensuring absolute compliance with the highest standards of safety, quality, and logistics across all our activations."}
            </p>
            <p>
              {isAr
                ? "سواء كان الحدث إطلاق مشروع عملاق، أو مهرجان تراثي في قلب المواقع التاريخية، أو قمة تكنولوجية تستشرف المستقبل، فإننا نلتزم بتقديم تجارب غامرة تدفع عجلة التنمية وتلهم الأجيال القادمة. نحن نؤمن بأن كل فعالية هي خطوة نحو بناء مستقبل مشرق، ونسعى دائماً لترك إرث يعكس طموحات القيادة الرشيدة للمملكة."
                : "Whether the event is a mega-project launch, a heritage festival in the heart of historical UNESCO sites, or a technology summit looking toward the future, we are committed to delivering immersive experiences that drive development and inspire future generations. We believe that every event is a step toward building a brighter future, and we consistently strive to leave a legacy that reflects the visionary ambitions of the Kingdom's leadership."}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/neom_summit_people.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>{isAr ? <>هل أنت مستعدّ لصناعة <span className="text-emerald-400">المستقبل؟</span></> : <>Ready to Define the <span className="text-emerald-400">Future?</span></>}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              {isAr ? "نتشارك مع الجهات الحكومية والعلامات العالمية لتنفيذ أكثر مشاريع رؤية 2030 طموحًا." : "We partner with government bodies and global brands to execute Vision 2030's most ambitious projects."}
            </p>
            <Link
              href={`${arHref}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] group"
            >
              {isAr ? "استشر فريقنا" : "Consult with Our Team"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
