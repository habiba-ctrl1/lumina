import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

const BASE = "https://saudieventmanagement.com";

// ─────────────────────────────────────────────────────────────────────────────
// Locale-aware metadata — h1 and meta title must both carry the brand keywords
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "الأسئلة الشائعة — تنظيم الفعاليات في السعودية | إدارة الفعاليات السعودية"
      : "Event Management FAQ — Saudi Arabia | Saudi Event Management",
    description: isAr
      ? "اعثر على إجابات لأسئلتك حول تخطيط الفعاليات الفاخرة في المملكة العربية السعودية. تعرف على الأسعار والحجز والخدمات مع إدارة الفعاليات السعودية."
      : "Get answers to common questions about luxury event planning in Saudi Arabia. Learn about pricing, booking, logistics, and services from Saudi Event Management.",
    keywords: isAr
      ? ["أسئلة تنظيم الفعاليات", "تنظيم حفلات الزفاف الرياض", "تكلفة تنظيم الفعاليات السعودية"]
      : [
          "Event Management FAQ Saudi Arabia",
          "How much does event planning cost in KSA",
          "Wedding planner questions Riyadh",
          "Corporate event booking Saudi Arabia",
          "Saudi Event Management FAQ",
        ],
    alternates: {
      canonical: `${BASE}${locale === "en" ? "" : "/ar"}/faq`,
      languages: {
        en: `${BASE}/faq`,
        ar: `${BASE}/ar/faq`,
        "x-default": `${BASE}/faq`,
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured data
// ─────────────────────────────────────────────────────────────────────────────
const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does luxury event planning cost in Saudi Arabia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Luxury event planning in Saudi Arabia typically ranges from SAR 75,000 for boutique corporate events to several million riyals for grand royal weddings. Saudi Event Management provides tailored proposals based on your specific requirements.",
          },
        },
        {
          "@type": "Question",
          name: "What cities does Saudi Event Management serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We operate across Riyadh, Jeddah, Dammam, AlUla, NEOM, Makkah, Madinah, Taif, Al Khobar, and Abha — covering the entire Kingdom of Saudi Arabia.",
          },
        },
        {
          "@type": "Question",
          name: "Do you handle government and Vision 2030 events?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Saudi Event Management has deep experience with government events, GEA-permitted activations, and Saudi Vision 2030 initiatives. We work with government ministries and major corporations.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance should I book an event planner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For luxury weddings and large-scale corporate events, we recommend booking at least 6 to 12 months in advance. However, our rapid-deployment team can also manage urgent events with shorter timelines.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",  item: BASE },
        { "@type": "ListItem", position: 2, name: "FAQ",   item: `${BASE}/faq` },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollProgress />
      <Navbar locale={locale} />

      {/* ── Page hero with the primary H1 ─────────────────────────────────── */}
      <section
        className="pt-32 md:pt-40 pb-14 md:pb-18 bg-neutral-900 text-center px-6"
        aria-labelledby="faq-page-heading"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-neutral-500 mb-6"
        >
          <a href={isAr ? "/ar" : "/"} className="hover:text-neutral-300 transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </a>
          <span className="text-neutral-700 select-none" aria-hidden="true">/</span>
          <span className="text-neutral-300" aria-current="page">
            {isAr ? "الأسئلة الشائعة" : "FAQ"}
          </span>
        </nav>

        {/*
          H1 — must be keyword-rich, unique, and match the <title> tag closely.
          Both EN and AR versions are rendered on their respective locale routes.
        */}
        <h1
          id="faq-page-heading"
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {isAr ? (
            <>
              الأسئلة الشائعة —{" "}
              <span className="text-emerald-400">تنظيم الفعاليات في السعودية</span>
            </>
          ) : (
            <>
              Event Management FAQ —{" "}
              <span className="text-emerald-400">Saudi Arabia</span>
            </>
          )}
        </h1>

        <p className="text-neutral-400 text-[15px] md:text-[16px] leading-relaxed max-w-2xl mx-auto">
          {isAr
            ? "كل ما تحتاج معرفته حول تخطيط الفعاليات الفاخرة في المملكة العربية السعودية — من الأسعار والحجز إلى اللوجستيات والبروتوكول الثقافي."
            : "Everything you need to know about luxury event planning in Saudi Arabia — from pricing and booking to logistics and cultural protocol."}
        </p>
      </section>

      {/*
        FAQ accordion — showHeader=false because the page h1 above already
        serves as the section title; rendering the component's own heading too
        would produce a duplicate visual title and confuse crawlers.
      */}
      <FAQ showHeader={false} />

      {/* ── SEO content block ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8 text-center"
            style={{ letterSpacing: "-0.025em" }}
          >
            {isAr ? (
              <>حلول الفعاليات <span className="text-[var(--primary)]">الاحترافية</span></>
            ) : (
              <>Expert <span className="text-[var(--primary)]">Event Solutions</span></>
            )}
          </h2>
          <div className="text-neutral-500 leading-relaxed space-y-6 text-[15px] text-justify sm:text-center max-w-3xl mx-auto">
            {isAr ? (
              <>
                <p>
                  تقدم إدارة الفعاليات السعودية الوضوح الكامل حول تخطيط وتصميم كل فعالية فاخرة. ندرك أن التخطيط للفعاليات رفيعة المستوى في المملكة يتطلب أكثر من مجرد لوجستيات؛ يتطلب فهماً عميقاً للتفاصيل الثقافية والبروتوكولات الحكومية وأعلى معايير الضيافة.
                </p>
                <p>
                  سواء كنت تخطط لحفل زفاف ملكي في الرياض أو قمة شركات في نيوم، فإن فريقنا مجهز للتعامل مع تعقيدات الإنتاجات الضخمة، دائماً بهدف التنفيذ السلس المتوافق مع رؤية السعودية 2030.
                </p>
              </>
            ) : (
              <>
                <p>
                  At Saudi Event Management, our FAQ is designed to provide clarity on the meticulous planning and design we bring to every luxury event. We understand that high-stakes event planning in the Kingdom requires more than just logistics; it requires a deep understanding of essential cultural details, government protocols, and the highest standards of hospitality.
                </p>
                <p>
                  Our operational presence across Jeddah, AlUla, and Dammam allows us to leverage local expertise and elite vendor networks to deliver breathtaking experiences. We prioritize transparency and discretion, ensuring that every detail — from NDAs to logistical permits — is managed with professional integrity, aligned with Saudi Vision 2030.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
