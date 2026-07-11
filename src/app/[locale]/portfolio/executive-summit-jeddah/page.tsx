import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Building, Ship, Anchor, Waves } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("executive-summit-jeddah", locale);
}

export default async function ExecutiveSummitJeddah() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="executive-summit-jeddah" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-blue-50">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/jeddah-summit.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href={isAr ? "/ar/portfolio" : "/portfolio"} className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-white/50 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            {isAr ? "دراسة حالة" : "Coastal Corporate Strategy"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "قمة جدة التنفيذية" : <>Executive <span className="text-[var(--primary)] ">Summit</span> Jeddah</>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">{isAr ? "مزج التراث البحري للبحر الأحمر بمستقبل الصناعة السعودية. تجمّع نخبوي على حافة العالم." : "Blending the maritime heritage of the Red Sea with the future of Saudi industry. An elite gathering at the edge of the world."}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Ship, label: "القاعة", val: "نادي يخوت خاص" },
            { icon: Building, label: "النطاق", val: "حصري لكبار التنفيذيين" },
            { icon: Waves, label: "الموقع", val: "واجهة البحر الأحمر" },
            { icon: Anchor, label: "الثيمة", val: "المستقبل البحري" },
              ]
            : [
            { icon: Ship, label: "Venue", val: "Private Yacht Club" },
            { icon: Building, label: "Scale", val: "C-Suite Exclusive" },
            { icon: Waves, label: "Setting", val: "Red Sea Front" },
            { icon: Anchor, label: "Theme", val: "Maritime Future" }
          ]).map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-base leading-relaxed space-y-24">
        
        {/* Coastal Elegance */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_2.webp" alt="Jeddah Coastal Event" width={800} height={800} className="w-full h-full object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? "أناقة ساحلية" : <>Coastal <span className="text-[var(--primary)] ">Elegance</span></>}</h2>
            <p className="mb-8">
              {isAr
                ? "لقمة جدة التنفيذية، صمّمنا بيئة استثمرت علاقة المدينة الفريدة بالبحر الأحمر. وكان التحدّي خلق مساحة تبدو رحبة وملهمة، لكنها آمنة وخاصة بما يكفي لنقاشات السياسات الحساسة."
                : "For the Jeddah Executive Summit, we curated an environment that leveraged the city's unique relationship with the Red Sea. The challenge was to create a space that felt expansive and inspiring, yet secure and private enough for sensitive policy discussions."}
            </p>
            <p>
              {isAr
                ? "صمّمنا جناحًا زجاجيًا مبنيًا خصيصًا على حافة الماء، أتاح للغروب أن يكون خلفية للحفل الختامي دون أي مساومة على الخصوصية الصوتية أو التحكّم في المناخ."
                : "We designed a custom-built glass pavilion on the water's edge, allowing the sunset to serve as the backdrop for the closing gala without compromising on acoustic privacy or climate control."}
            </p>
          </div>
        </div>

        {/* Operational Pillars */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-12 uppercase tracking-tight text-center">{isAr ? "ركائز القمة" : <>Summit <span className="text-[var(--primary)] ">Pillars</span></>}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {(isAr
              ? [
              { title: "كونسيرج فائق العناية", desc: "إدارة سفر وإقامة متكاملة للرؤساء التنفيذيين الدوليين، بما يشمل التعامل مع صالات الطائرات الخاصة." },
              { title: "بيئة مخصّصة", desc: "أثاث مصمّم خصيصًا بموادّ مستدامة عكست أنظمة الشعاب المرجانية في البحر الأحمر." },
              { title: "تميّز أمني", desc: "شبكة أمن «خفيّة» وسلسة حمت كبار الشخصيات مع الحفاظ على أجواء مريحة." },
                ]
              : [
              { title: "White-Glove Concierge", desc: "End-to-end travel and stay management for international CEOs, including private jet terminal handling." },
              { title: "Bespoke Environment", desc: "Custom-designed furniture using sustainable materials that reflected the Red Sea's coral ecosystems." },
              { title: "Security Excellence", desc: "A seamless, 'invisible' security net that protected VIPs while maintaining a relaxed atmosphere." }
            ]).map((item: any, i: number) => (
              <div key={i} className="p-10 bg-white rounded-3xl border border-neutral-200/80 hover:border-[var(--primary)]/40 transition-all group">
                <h3 className="text-neutral-900 text-xs font-bold uppercase tracking-widest mb-8 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-neutral-900 text-white p-12 md:p-24 rounded-3xl text-center">
          <p className="text-xl md:text-3xl font-sans font-light  mb-10 leading-relaxed">
            {isAr
              ? "«ينبغي أن تكون قمة جدة التنفيذية درسًا في التوازن — دقّة احترافية تُقدَّم بروح ملاذ ساحلي.»"
              : "\"An executive summit in Jeddah should be a masterclass in balance — professional precision delivered with the soul of a coastal retreat.\""}
          </p>
          <div className="w-12 h-px bg-[var(--primary)] mx-auto mb-8" />
          <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.4em]">{isAr ? "— معيارنا للقمم التنفيذية الساحلية" : "— Our Standard for Coastal Executive Summits"}</p>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/corporate-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة الفعاليات المؤسسية" : "Corporate Event Management"}
            </Link>
            <Link href={`${arHref}/services/conferences`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة المؤتمرات" : "Conference Management"}
            </Link>
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
            <Link href={`${arHref}/locations/jeddah`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات المؤسسية في جدة" : "Corporate Events in Jeddah"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? <>ارفع <span className="text-[var(--primary)] ">صوت مؤسستك</span></> : <>Elevate Your <span className="text-[var(--primary)] ">Corporate Voice</span></>}</h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "تعاون مع فريقنا المؤسسي" : "Partner with Our Corporate Team"}
        </Link>
      </section>

      <CaseStudyCTA slug="executive-summit-jeddah" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
