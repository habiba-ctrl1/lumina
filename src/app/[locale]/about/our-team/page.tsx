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
  const title = isAr ? 'فريقنا' : 'Our Team';
  const description = isAr
    ? 'تعرّف على مؤسِّسة إدارة الفعاليات السعودية حبيبة أصغر، وشبكة شركاء التنفيذ ذوي الخبرة الذين تتعاون معهم لتخطيط الفعاليات الفاخرة في جميع أنحاء المملكة العربية السعودية.'
    : 'Meet Saudi Event Management founder Habiba Asghar and the network of experienced delivery partners she works with to plan luxury events across Saudi Arabia.';
  return {
    title,
    description,
    keywords: 'Habiba Asghar Saudi Event Management, Luxury event planning KSA, Saudi event partner network',
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
        "description": "Habiba Asghar is the Founder of Saudi Event Management, an event coordination and vendor-sourcing platform connecting clients with a curated network of experienced delivery partners across Saudi Arabia."
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
              ? "تعرّفوا على المؤسِّسة وشبكة شركاء التنفيذ ذوي الخبرة الذين نتعاون معهم لتقديم فعاليات راقية في جميع أنحاء المملكة العربية السعودية."
              : "Meet the founder and the network of experienced delivery partners we work with to bring premium events to life across Saudi Arabia."}
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
                      حبيبة أصغر هي مؤسِّسة إدارة الفعاليات السعودية — منصة لتنسيق الفعاليات وتوفير الموردين تربط العملاء بشبكة مختارة من شركاء التنفيذ ذوي الخبرة في جميع أنحاء المملكة.
                    </p>
                    <p>
                      تشرف حبيبة شخصياً على عملية توثيق الموردين ومطابقة كل عميل بالشريك المتخصص المناسب لفعاليته — من حفلات الزفاف الفاخرة إلى قمم الشركات والتفعيلات الثقافية المتوافقة مع رؤية السعودية 2030.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Habiba Asghar is the Founder of Saudi Event Management — an event coordination and vendor-sourcing platform connecting clients with a curated network of experienced delivery partners across Saudi Arabia.
                    </p>
                    <p>
                      Habiba personally oversees the vendor vetting process and matches each client with the right specialist partner for their event — from luxury weddings to corporate summits and cultural activations aligned with Saudi Vision 2030.
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
            {isAr ? "شبكة الشركاء وراء كل فعالية" : "The Partner Network Behind Every Event"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed space-y-4">
            <p>
              {isAr
                ? "إدارة الفعاليات السعودية منصة يقودها مؤسِّسة واحدة تعمل مع شبكة مختارة من شركاء التنفيذ ذوي الخبرة في قطاع تنظيم الفعاليات بالمملكة. نؤمن بأن نجاح أي مشروع يعتمد على اختيار الشريك المناسب لكل احتياج، ولهذا نحرص على بناء شبكة تجمع بين الفهم العميق للثقافة السعودية الأصيلة والمعايير الدولية في التنفيذ."
                : "Saudi Event Management is a founder-led platform working with a curated network of experienced delivery partners across the Kingdom's event industry. We believe project success depends on matching each need with the right specialist partner, which is why we've built a network that combines a deep understanding of authentic Saudi culture with international delivery standards."}
            </p>
            <p>
              {isAr
                ? "بقيادة المؤسِّسة حبيبة أصغر، نقوم بمطابقة كل مشروع بالشركاء المناسبين — سواء لمؤتمرات الشركات، أو حفلات الزفاف الفاخرة، أو المعارض في الرياض وجدة والعلا. تشمل شبكتنا خبراء في البروتوكول، ومتخصصين في تقنيات الصوت والإضاءة، ومصممين، جميعهم مُختارون بعناية لضمان تجربة سلسة وآمنة لكل ضيف."
                : "Led by founder Habiba Asghar, we match each project with the right partners — whether for corporate conferences, luxury weddings, or exhibitions in Riyadh, Jeddah, and AlUla. Our network includes protocol specialists, AV and lighting professionals, and designers, each carefully vetted to help ensure a seamless, secure experience for every guest."}
            </p>
            <p>
              {isAr
                ? "نحن نلتزم بالارتقاء بقطاع الفعاليات في المملكة، مستلهمين أهداف رؤية السعودية 2030 لتحويل كل حدث إلى منصة للإبداع والابتكار. عندما تختار إدارة الفعاليات السعودية، فإنك تعتمد على منسّق يضع نجاحك في صميم أولوياته، ويعمل مع شركاء موثوقين لضمان ترك انطباع دائم يفوق التوقعات."
                : "We are committed to elevating the events sector in the Kingdom, inspired by the goals of Saudi Vision 2030 to transform every event into a platform for creativity and innovation. When you choose Saudi Event Management, you are relying on a coordinator who places your success at the core of their priorities, working with trusted partners to help ensure a lasting impression that exceeds expectations."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
