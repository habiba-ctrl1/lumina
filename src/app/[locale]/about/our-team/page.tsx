import Navbar from "@/components/Navbar";
import { hreflangAlternates, robotsForRoute } from "@/lib/seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const title = isAr ? 'فريقنا التنفيذي' : 'Our Executive Team';
  const description = isAr
    ? 'تعرّف على فريق القيادة التنفيذية في إدارة الفعاليات السعودية بقيادة المؤسِّسة والرئيسة التنفيذية حبيبة أصغر. خبراء في تخطيط الفعاليات الفاخرة في جميع أنحاء المملكة العربية السعودية.'
    : 'Meet the executive leadership team at Saudi Event Management, led by Founder & CEO Habiba Asghar. Experts in luxury event planning across Saudi Arabia.';
  return {
    title,
    description,
    keywords: 'Event management experts Riyadh, Habiba Asghar Saudi Event Management, Luxury event planners KSA, Executive event team',
    robots: robotsForRoute(locale, "/about/our-team"),
    openGraph: { title, description },
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/about/our-team`,
      languages: hreflangAlternates("/about/our-team"),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Habiba Asghar",
        "jobTitle": "Founder & CEO",
        "worksFor": {
          "@type": "Organization",
          "name": "Saudi Event Management"
        },
        "knowsAbout": ["Luxury Event Production", "Corporate Event Management", "VIP Protocol", "Wedding Planning"],
        "description": "Habiba Asghar is the Founder and CEO of Saudi Event Management, leading a team of experts to deliver unparalleled luxury events across the Kingdom of Saudi Arabia."
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Our Team", "item": "https://saudieventmanagement.com/about/our-team" }
      ]
    }
  ]
};

export default async function OurTeamPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isAr ? "القيادة التنفيذية" : "Executive Leadership"}
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<>مهندسو <span className="text-[var(--primary)]">الفخامة</span></>) : (<>The <span className="text-[var(--primary)]">Architects</span> of Luxury</>)}
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "تعرّف على أصحاب الرؤية والمنتجين وخبراء العمليات وراء أرقى فعاليات المملكة العربية السعودية."
              : "Meet the visionaries, producers, and operational experts behind Saudi Arabia's most prestigious events."}
          </p>
        </div>
      </div>

      {/* CEO Profile Section (GEO / NLP Target) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3">
              <div className="rounded-3xl overflow-hidden border border-neutral-200/80 shadow-lg relative aspect-[3/4]">
                <Image src="/gallery_corporate_gala.webp" alt={isAr ? "حبيبة أصغر - الرئيسة التنفيذية" : "Habiba Asghar - CEO"} fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-semibold mb-2">{isAr ? "حبيبة أصغر" : "Habiba Asghar"}</h2>
              <p className="text-[var(--primary)] uppercase tracking-wider font-semibold text-sm mb-6">{isAr ? "المؤسِّسة والرئيسة التنفيذية" : "Founder & CEO"}</p>

              <div className="prose prose-slate max-w-none text-neutral-500 leading-relaxed space-y-6">
                {isAr ? (
                  <>
                    <p>
                      بصفتها المؤسِّسة والرئيسة التنفيذية لإدارة الفعاليات السعودية، ارتقت حبيبة أصغر بمعايير إنتاج الفعاليات الفاخرة في المملكة بشكل جوهري. وبخبرة تتجاوز عقداً من الزمن في الفعاليات عالية المخاطر، تقود فريقاً من الخبراء الدوليين المكرّسين لتحويل رؤى العملاء المعقّدة إلى واقع لا تشوبه شائبة.
                    </p>
                    <p>
                      تمتد خبرتها لتشمل حفلات الزفاف الملكية، وقمم الشركات لكبار التنفيذيين، والتفعيلات الثقافية الضخمة المتوافقة مع رؤية السعودية 2030. وتشتهر حبيبة باهتمامها الذي لا يقبل المساومة بالتفاصيل، وقدرتها على الدمج السلس بين بروتوكول كبار الشخصيات رفيع المستوى والتصميم الجمالي الآسر.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      As the Founder and CEO of Saudi Event Management, Habiba Asghar has fundamentally elevated the standard of luxury event production in the Kingdom. With over a decade of high-stakes event experience, she leads a team of international experts dedicated to translating complex client visions into flawless realities.
                    </p>
                    <p>
                      Her expertise spans royal weddings, C-suite corporate summits, and massive cultural activations aligned with Saudi Vision 2030. Habiba is known for her uncompromising attention to detail and her ability to seamlessly integrate high-level VIP protocol with breathtaking aesthetic design.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-neutral-50 py-16 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "الخبرة والاحترافية وراء كل فعالية ناجحة" : "The Expertise and Professionalism Behind Every Successful Event"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed space-y-4">
            <p>
              {isAr
                ? "يضم فريق إدارة الفعاليات السعودية نخبة من أبرز العقول الاستراتيجية والإبداعية في مجال تنظيم الفعاليات على مستوى منطقة الشرق الأوسط. نحن نؤمن بأن نجاح أي مشروع يعتمد بشكل أساسي على شغف وكفاءة الأفراد الذين يقفون وراءه، ولذلك حرصنا على بناء فريق متكامل يجمع بين الفهم العميق للثقافة السعودية الأصيلة والخبرة العالمية في تطبيق أحدث المعايير الدولية."
                : "The Saudi Event Management team comprises some of the most prominent strategic and creative minds in the event planning industry across the Middle East. We believe that the success of any project depends fundamentally on the passion and competence of the individuals behind it, which is why we have built an integrated team combining a deep understanding of authentic Saudi culture with global expertise in applying the latest international standards."}
            </p>
            <p>
              {isAr
                ? "بقيادة المديرة التنفيذية حبيبة أصغر، يعمل فريقنا بتناغم تام لتنفيذ مشاريع تتنوع بين المؤتمرات الحكومية رفيعة المستوى، وحفلات الزفاف الفاخرة، والمعارض الدولية في الرياض وجدة والعلا. يضم الفريق خبراء في البروتوكول، ومهندسين متخصصين في تقنيات الصوت والإضاءة، ومصممين فنيين يكرسون جهودهم لضمان تجربة سلسة، آمنة، ومثالية لكل ضيف."
                : "Led by CEO Habiba Asghar, our team works in perfect harmony to execute projects ranging from high-level government conferences and luxury weddings to international exhibitions in Riyadh, Jeddah, and AlUla. The team includes protocol experts, specialized AV engineers, and artistic designers dedicated to ensuring a seamless, secure, and flawless experience for every guest."}
            </p>
            <p>
              {isAr
                ? "نحن نلتزم بالارتقاء بقطاع الفعاليات في المملكة، مستلهمين أهداف رؤية السعودية 2030 لتحويل كل حدث إلى منصة للإبداع والابتكار. عندما تختار إدارة الفعاليات السعودية، فإنك تعتمد على شركاء استراتيجيين يضعون نجاحك في صميم أولوياتهم، لضمان ترك انطباع دائم يفوق التوقعات."
                : "We are committed to elevating the events sector in the Kingdom, inspired by the goals of Saudi Vision 2030 to transform every event into a platform for creativity and innovation. When you choose Saudi Event Management, you are relying on strategic partners who place your success at the core of their priorities, ensuring a lasting impression that exceeds all expectations."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
