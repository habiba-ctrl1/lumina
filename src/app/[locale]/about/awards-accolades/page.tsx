import Navbar from "@/components/Navbar";
import { hreflangAlternates, robotsForRoute } from "@/lib/seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { Award, Star } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const title = isAr ? 'الجوائز والتكريمات' : 'Awards & Accolades';
  const description = isAr
    ? 'تعرّف على الجوائز والتكريم الذي نالته إدارة الفعاليات السعودية، بما في ذلك جائزة أفضل منظّم فعاليات فاخرة في الخليج 2024.'
    : 'Discover the awards and industry recognition earned by Saudi Event Management, including Best Luxury Event Planner GCC 2024.';
  return {
    title,
    description,
    keywords: 'Award winning event planner Saudi Arabia, Best event management company Riyadh, Luxury event awards KSA',
    robots: robotsForRoute(locale, "/about/awards-accolades"),
    openGraph: { title, description },
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/about/awards-accolades`,
      languages: hreflangAlternates("/about/awards-accolades"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Awards and Accolades",
      "description": "Awards and industry recognition for Saudi Event Management.",
      "url": "https://saudieventmanagement.com/about/awards-accolades"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Awards", "item": "https://saudieventmanagement.com/about/awards-accolades" }
      ]
    }
  ]
};

export default async function AwardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              {isAr ? "تقدير القطاع" : "Industry Recognition"}
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<>الجوائز <span className="text-[var(--primary)]">والتكريمات</span></>) : (<>Awards & <span className="text-[var(--primary)]">Accolades</span></>)}
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "لقد رسّخ التزامنا بالتنفيذ المتقن والتصميم الفاخر مكانتنا كأبرز وكالة لإدارة الفعاليات في المملكة."
              : "Our commitment to flawless execution and luxury design has positioned us as the premier event management agency in the Kingdom."}
          </p>
        </div>
      </div>

      {/* Awards List */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            
            <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl flex items-start gap-6">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center shrink-0">
                <Award className="text-[var(--primary)]" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">{isAr ? "أفضل منظّم فعاليات فاخرة في الخليج" : "Best Luxury Event Planner GCC"}</h2>
                <p className="text-[var(--primary)] font-medium text-sm mb-4">2024</p>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {isAr
                    ? "مُنحت تقديراً للتميّز في إدارة حفلات الزفاف الوجهات فائقة الفخامة والفعاليات الملكية رفيعة المستوى في منطقة الخليج، إذ أرست معايير جديدة في البروتوكول والجماليات."
                    : "Awarded for excellence in managing ultra-luxury destination weddings and high-profile royal events across the Gulf region, setting new benchmarks in protocol and aesthetics."}
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl flex items-start gap-6">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center shrink-0">
                <Star className="text-[var(--primary)]" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">{isAr ? "جائزة التميّز في إنتاج فعاليات الشركات" : "Corporate Production Excellence Award"}</h2>
                <p className="text-[var(--primary)] font-medium text-sm mb-4">2023</p>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {isAr
                    ? "مُنحت تقديراً للتنفيذ التقني المتقن، وتركيب الأنظمة الصوتية والمرئية، وإدارة البروتوكول خلال القمم الدولية الكبرى التي أُقيمت في الرياض."
                    : "Recognized for flawless technical execution, AV rigging, and protocol management during major international summits held in Riyadh."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-neutral-50 py-16 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "التميز في التخطيط والتنفيذ" : "Excellence in Event Planning and Execution"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed space-y-4">
            <p>
              {isAr
                ? "على مدار السنوات الماضية، أثبتت إدارة الفعاليات السعودية قدرتها الاستثنائية على تصميم وتنفيذ فعاليات تتجاوز المعايير العالمية. حصولنا على هذه الجوائز المرموقة ليس سوى انعكاس لالتزامنا الراسخ بالجودة، والابتكار، وتقديم خدمات ترقى إلى مستوى تطلعات عملائنا من الشخصيات المرموقة والشركات الكبرى."
                : "Over the years, Saudi Event Management has proven its exceptional ability to design and execute events that transcend global standards. Winning these prestigious awards is a reflection of our unwavering commitment to quality, innovation, and delivering services that meet the high expectations of our distinguished clients and major corporate partners."}
            </p>
            <p>
              {isAr
                ? "نحن نؤمن بأن كل فعالية هي لوحة فنية تحتاج إلى اهتمام دقيق بكل تفصيلة، بدءاً من التصميم الأولي وحتى التنفيذ النهائي. فريقنا المتمرس من مصممي الفعاليات والمخططين الاستراتيجيين يعمل بشغف لضمان تجربة لا تُنسى تعكس التراث السعودي الأصيل برؤية عصرية متوافقة مع رؤية السعودية 2030."
                : "We believe that every event is a masterpiece requiring meticulous attention to every detail, from initial concept to final execution. Our experienced team of event designers and strategic planners work passionately to ensure an unforgettable experience that reflects authentic Saudi heritage with a modern vision, aligned perfectly with Saudi Vision 2030."}
            </p>
            <p>
              {isAr
                ? "إن تكريمنا في قطاع إدارة الفعاليات الفاخرة، سواء في تنظيم المؤتمرات، أو حفلات الزفاف الملكية، أو المعارض الدولية، يدفعنا للاستمرار في تقديم الأفضل وتوسيع آفاق الإبداع في كل مشروع نتولى إدارته في الرياض، وجدة، والعلا، ومختلف مناطق المملكة."
                : "Our recognition in the luxury event management sector—whether in organizing corporate conferences, royal weddings, or international exhibitions—drives us to continue delivering the best and expanding the horizons of creativity in every project we manage across Riyadh, Jeddah, AlUla, and throughout the Kingdom."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
