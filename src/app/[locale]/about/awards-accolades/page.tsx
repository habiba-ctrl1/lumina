import Navbar from "@/components/Navbar";
import { hreflangAlternates, robotsForRoute } from "@/lib/seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { ShieldCheck, ClipboardCheck, UserCheck } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const title = isAr ? 'التقدير والمعايير' : 'Recognition & Standards';
  const description = isAr
    ? 'تعرّف على معايير التحقق من الموردين وضمان الجودة التي تعتمدها إدارة الفعاليات السعودية في كل فعالية ندسّقها.'
    : 'How Saudi Event Management vets vendors and holds every event to a consistent quality standard — transparency, professionalism, and accountability across every project.';
  return {
    title,
    description,
    keywords: 'Vetted event vendor network Saudi Arabia, Event planning standards Riyadh, Trusted event coordination KSA',
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
      "name": "Recognition & Standards",
      "description": "The vendor vetting process and quality standards behind every Saudi Event Management project.",
      "url": "https://saudieventmanagement.com/about/awards-accolades"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Recognition & Standards", "item": "https://saudieventmanagement.com/about/awards-accolades" }
      ]
    }
  ]
};

const standards = [
  {
    icon: UserCheck,
    titleEn: "Personal Vendor Vetting",
    titleAr: "تحقق شخصي من كل مورد",
    bodyEn: "Every vendor in our network is personally reviewed before they're invited to join — not just listed. Quality is checked before you ever need to ask.",
    bodyAr: "يخضع كل مورد في شبكتنا لمراجعة شخصية قبل دعوته للانضمام — وليس مجرد إدراجه في قائمة. نتحقق من الجودة قبل أن تضطر لسؤالنا عنها.",
  },
  {
    icon: ClipboardCheck,
    titleEn: "A Transparent Process",
    titleAr: "عملية شفافة",
    bodyEn: "A structured, four-stage methodology — consultation, design, logistics, execution — so you always know what happens next and why.",
    bodyAr: "منهجية منظمة من أربع مراحل — الاستشارة، والتصميم، واللوجستيات، والتنفيذ — لتعرف دائماً ما الخطوة التالية ولماذا.",
  },
  {
    icon: ShieldCheck,
    titleEn: "One Accountable Point of Contact",
    titleAr: "جهة اتصال واحدة مسؤولة",
    bodyEn: "You work with one team from first inquiry to final execution — never passed between departments, never chasing an answer.",
    bodyAr: "تتعامل مع فريق واحد من أول استفسار حتى التنفيذ النهائي — دون تمريرك بين الأقسام أو انتظار الردود.",
  },
];

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
              {isAr ? "معاييرنا" : "Our Standards"}
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<>التقدير <span className="text-[var(--primary)]">والمعايير</span></>) : (<>Recognition & <span className="text-[var(--primary)]">Standards</span></>)}
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "الثقة ليست شارة نعلّقها على الجدار — بل معيار نُخضع له كل مورد وكل فعالية، من أول استشارة حتى التنفيذ النهائي."
              : "Trust isn't a badge on a wall — it's a standard we hold every vendor and every event to, from first consultation to final execution."}
          </p>
        </div>
      </div>

      {/* Standards List */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {standards.map((s, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl flex items-start gap-6">
                <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center shrink-0">
                  <s.icon className="text-[var(--primary)]" size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">{isAr ? s.titleAr : s.titleEn}</h2>
                  <p className="text-neutral-500 leading-relaxed text-sm">
                    {isAr ? s.bodyAr : s.bodyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-neutral-50 py-16 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            {isAr ? "كيف نضمن الجودة" : "How We Hold the Line on Quality"}
          </h2>
          <div className="text-neutral-600 text-[15px] leading-relaxed space-y-4">
            <p>
              {isAr
                ? "لا نعتمد على شعارات أو ألقاب لإثبات جودتنا. كل مورد ينضم إلى شبكتنا يمر بمراجعة شخصية، وكل فعالية نديرها تتبع نفس المنهجية المنظمة — بغض النظر عن الحجم أو الميزانية."
                : "We don't rely on logos or titles to prove our quality. Every vendor who joins our network goes through a personal review, and every event we coordinate follows the same structured methodology — regardless of size or budget."}
            </p>
            <p>
              {isAr
                ? "نؤمن أن كل فعالية تستحق نفس القدر من الدقة، من التصميم الأولي وحتى التنفيذ النهائي. جهة اتصال واحدة، وعملية واضحة، ومسؤولية كاملة عن كل تفصيلة."
                : "We believe every event deserves the same level of rigor, from initial concept to final execution. One point of contact, a clear process, and full accountability for every detail."}
            </p>
            <p>
              {isAr
                ? "سواء كانت فعالية شركات، أو مؤتمراً، أو معرضاً، أو حفل زفاف، فإن نفس المعايير تنطبق عبر الرياض وجدة والعلا وباقي مناطق المملكة."
                : "Whether it's a corporate event, a conference, an exhibition, or a wedding, the same standards apply across Riyadh, Jeddah, AlUla, and the rest of the Kingdom."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
