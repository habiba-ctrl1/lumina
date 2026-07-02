import Navbar from "@/components/Navbar";
import { hreflangAlternates, robotsForRoute } from "@/lib/seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { Briefcase, Send } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const title = isAr ? 'الوظائف وفرص العمل في إدارة الفعاليات' : 'Careers & Job Opportunities';
  const description = isAr
    ? 'انضم إلى إدارة الفعاليات السعودية، الشركة الرائدة في إنتاج الفعاليات الفاخرة في المملكة العربية السعودية. نوظّف مخططي فعاليات ومنتجين وخبراء عمليات في الرياض.'
    : 'Join Saudi Event Management, the leading luxury event production company in Saudi Arabia. We are hiring event planners, producers, and operational experts in Riyadh.';
  return {
    title,
    description,
    keywords: 'Event management jobs Saudi Arabia, Careers in event planning Riyadh, Hiring event producers KSA, Saudi Event Management jobs',
    robots: robotsForRoute(locale, "/about/careers"),
    openGraph: { title, description },
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/about/careers`,
      languages: hreflangAlternates("/about/careers"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Careers at Saudi Event Management",
      "description": "Job opportunities and careers at Saudi Event Management.",
      "url": "https://saudieventmanagement.com/about/careers"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Careers", "item": "https://saudieventmanagement.com/about/careers" }
      ]
    }
  ]
};

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isAr ? "انضم إلى فريقنا" : "Join Our Team"}
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<>اصنع <span className="text-[var(--primary)]">مستقبل</span> الفعاليات</>) : (<>Build the <span className="text-[var(--primary)]">Future</span> of Events</>)}
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "نبحث دائماً عن مخططين أصحاب رؤية، ومنتجين دقيقين، وعقول مبدعة للانضمام إلى عملياتنا سريعة النمو في جميع أنحاء المملكة العربية السعودية."
              : "We are always looking for visionary planners, rigorous producers, and creative minds to join our rapidly growing operations across Saudi Arabia."}
          </p>
        </div>
      </div>

      {/* Culture & Hiring Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Briefcase className="text-[var(--primary)] mx-auto mb-6" size={40} />
          <h2 className="text-3xl font-semibold mb-6">{isAr ? "الوظائف الشاغرة" : "Open Positions"}</h2>
          <p className="text-neutral-500 leading-relaxed mb-10">
            {isAr
              ? "مع توسّعنا جنباً إلى جنب مع رؤية السعودية 2030، يظل طلبنا على المواهب المتميّزة مستمراً. إذا كانت لديك خبرة في إنتاج الفعاليات الفاخرة، أو الضيافة الراقية، أو لوجستيات فعاليات الشركات، فنحن نتطلّع لسماع صوتك."
              : "As we scale alongside Saudi Vision 2030, our demand for elite talent is constant. If you have experience in luxury event production, high-end hospitality, or corporate event logistics, we want to hear from you."}
          </p>

          <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl text-start">
            <h3 className="text-xl font-semibold mb-2">{isAr ? "طلب توظيف تلقائي" : "Spontaneous Application"}</h3>
            <p className="text-sm text-neutral-500 mb-6">{isAr ? "الموقع: الرياض، أو جدة، أو عن بُعد (داخل المملكة)" : "Location: Riyadh, Jeddah, or Remote (KSA)"}</p>
            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
              {isAr
                ? "أرسل سيرتك الذاتية وأعمالك إلى فريق الموارد البشرية التنفيذي لدينا. نراجع جميع الطلبات وسنتواصل معك عند توفّر منصب مناسب يتوافق مع خبرتك."
                : "Submit your resume and portfolio to our executive HR team. We review all applications and will contact you when a suitable position aligns with your expertise."}
            </p>
            <a
              href="mailto:careers@saudieventmanagement.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              {isAr ? "أرسل سيرتك الذاتية" : "Email Resume"} <Send size={14} className="rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-neutral-50 py-16 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4 text-center md:text-left">
            {isAr ? "لماذا الانضمام إلى فريق إدارة الفعاليات السعودية؟" : "Why Join Saudi Event Management?"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed space-y-4">
            <p>
              {isAr
                ? "في إدارة الفعاليات السعودية، نحن لا نكتفي بتقديم وظائف؛ بل نبني مسارات مهنية طموحة في واحد من أسرع القطاعات نمواً وتأثيراً في المملكة العربية السعودية. بفضل مشاريعنا الرائدة التي تشمل تنظيم المؤتمرات الدولية، وتخطيط حفلات الزفاف الملكية، وإدارة الفعاليات الحكومية، نوفر لخبراء ومحترفي الفعاليات بيئة عمل مليئة بالتحديات والفرص الاستثنائية التي تساهم في تطوير مهاراتهم."
                : "At Saudi Event Management, we do not just offer jobs; we build ambitious career paths in one of the fastest-growing and most impactful sectors in Saudi Arabia. Thanks to our pioneering projects—ranging from organizing international conferences and planning royal weddings to managing large-scale government events—we provide event professionals with a dynamic work environment full of exceptional challenges and opportunities for skill development."}
            </p>
            <p>
              {isAr
                ? "بينما نمضي قدماً لتحقيق أهداف رؤية السعودية 2030، يركز التزامنا على تمكين المواهب المحلية واستقطاب الخبرات العالمية. سواء كنت تعمل كمنسق للفعاليات، أو مدير إنتاج وتقنيات صوتية ومرئية، أو خبير في بروتوكول كبار الشخصيات، فإن دورك معنا سيكون محورياً في خلق تجارب فاخرة ولا تُنسى لعملائنا وضيوفهم المرموقين."
                : "As we move forward to achieve the ambitious goals of Saudi Vision 2030, our commitment focuses on empowering local talent while attracting world-class expertise. Whether you work as an event coordinator, an AV production manager, or a VIP protocol specialist, your role with us will be central to creating luxurious and unforgettable experiences for our clients and their distinguished guests."}
            </p>
            <p>
              {isAr
                ? "نحن نؤمن بأهمية العمل الجماعي، الإبداع، والابتكار. انضم إلينا لتكون جزءاً من فريق يصنع المستقبل ويترك بصمة واضحة في قطاع الفعاليات في كل من الرياض، جدة، العلا، وجميع مناطق المملكة. نحن نقدم برامج تدريبية متطورة، وبيئة عمل محفزة تكافئ التميز."
                : "We strongly believe in the importance of teamwork, creativity, and constant innovation. Join us to be part of a team that shapes the future and leaves a lasting mark on the events sector across Riyadh, Jeddah, AlUla, and the entire Kingdom. We offer advanced training programs, competitive benefits, and a stimulating work environment that rewards excellence."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
