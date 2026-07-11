import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Users, Coffee, Home } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("riyadh-elite-majlis", locale);
}

export default async function RiyadhEliteMajlis() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="riyadh-elite-majlis" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/riyadh-majlis.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href={isAr ? "/ar/portfolio" : "/portfolio"} className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/5 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            {isAr ? "دراسة حالة" : "Corporate Cultural Engagement"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "مجلس الرياض النخبوي" : <>Riyadh <span className="text-[var(--primary)] ">Elite Majlis</span></>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">{isAr ? "حيث يلتقي التراث بقاعة الاجتماعات. بيئة حصرية للتواصل عالي الأهمية والتبادل الثقافي." : "Where tradition meets the boardroom. An exclusive environment for high-stakes networking and cultural exchange."}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Home, label: "الموقع", val: "قصر خاص" },
            { icon: Users, label: "السعة", val: "50 من كبار الشخصيات" },
            { icon: Coffee, label: "التموين", val: "مزيج تراثي" },
            { icon: Shield, label: "الخصوصية", val: "تعتيم تام" },
              ]
            : [
            { icon: Home, label: "Setting", val: "Private Palace" },
            { icon: Users, label: "Capacity", val: "50 VVIPs" },
            { icon: Coffee, label: "Catering", val: "Heritage Fusion" },
            { icon: Shield, label: "Privacy", val: "Total Blackout" }
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
        
        {/* The Concept */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src="/gallery_corporate_gala.webp" alt="Majlis Setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? "المفهوم" : <>The <span className="text-[var(--primary)] ">Concept</span></>}</h2>
            <p className="mb-8">
              {isAr
                ? "المجلس هو نبض الحياة الاجتماعية والسياسية السعودية. ويُحدِّث هذا التصوّر تجربة المجلس لتجمّع من الرؤساء التنفيذيين الدوليين وكبار الشخصيات المحلية — والهدف هو الحفاظ على دفء الضيافة السعودية الأصيل مع توفير البنية التحتية للنقاشات المؤسسية رفيعة المستوى."
                : "The Majlis is the heartbeat of Saudi social and political life. This concept modernizes the Majlis experience for a gathering of international CEOs and prominent local dignitaries — the goal is to maintain the authentic warmth of Saudi hospitality while providing the infrastructure for high-level corporate discussions."}
            </p>
            <p>
              {isAr
                ? "صمّمنا مجلسًا معياريًا مبنيًا خصيصًا يمكن نشره في حديقة خاصة، بتصميمات داخلية متحكّم بمناخها وتقنية متحفّظة مدمجة للعروض."
                : "We designed a custom-built modular Majlis that could be deployed in a private garden, featuring climate-controlled interiors and integrated discreet technology for presentations."}
            </p>
          </div>
        </div>

        {/* The Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight">{isAr ? <>تفاصيل <span className="text-[var(--primary)] ">لا تشوبها شائبة</span></> : <>Impeccable <span className="text-[var(--primary)] ">Detail</span></>}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {(isAr
              ? [
              { title: "مفروشات مخصّصة", desc: "زخارف نسيج السدو المصنوعة يدويًا مدمجة في مقاعد عصرية مريحة." },
              { title: "هوية حسّية", desc: "عطر مخصّص من العود وورد الطائف صُمّم خصيصًا لتلك الأمسية." },
              { title: "رحلة طهي", desc: "قائمة تذوّق من 12 طبقًا تعيد ابتكار النكهات السعودية التقليدية لذائقة عالمية." },
              { title: "تكامل تقني", desc: "شاشات LED مخفيّة وصوت موجّه حافظا على جمالية المساحة." },
                ]
              : [
              { title: "Custom Furnishings", desc: "Hand-crafted Sadu weaving patterns integrated into ergonomic modern seating." },
              { title: "Sensory Branding", desc: "A custom-curated fragrance of Oud and Taif Rose designed specifically for the evening." },
              { title: "Gastronomic Journey", desc: "A 12-course tasting menu reinventing traditional Saudi flavors for a global palate." },
              { title: "Tech Integration", desc: "Hidden LED screens and directional audio that preserved the aesthetic of the space." }
            ]).map((item: any, i: number) => (
              <div key={i} className="flex gap-10 p-8 bg-white rounded-3xl border border-neutral-200/80 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] transition-colors">
                  <CheckCircle2 size={24} className="text-[var(--primary)] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-neutral-900 text-xs font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-neutral-900 text-white p-12 md:p-24 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src="/portfolio/riyadh-majlis.webp" alt="Pattern" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">{isAr ? "الإرث" : <>The <span className="text-[var(--primary)] ">Legacy</span></>}</h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {isAr
                ? "تُصمَّم فعالية من هذا النوع لتكون المحفّز المثالي للمفاوضات عالية الثقة والشراكات العابرة للحدود — فأجواء المجلس النخبوي المريحة والمهنية في آنٍ مصمَّمة خصيصًا لتمنح كبار الضيوف الراحة بينما تُنجَز الأعمال."
                : "A gathering of this kind is designed to be the perfect catalyst for high-trust negotiations and cross-border partnerships — the relaxed yet professional atmosphere of the Elite Majlis format is built specifically to put high-level guests at ease while the business at hand gets done."}
            </p>
            <div className="inline-block px-8 py-4 border border-[var(--primary)]/30 rounded-full">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.3em]">{isAr ? "التميّز في الدبلوماسية الثقافية" : "Excellence in Cultural Diplomacy"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
            <Link href={`${arHref}/services/corporate-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة الفعاليات المؤسسية" : "Corporate Event Management"}
            </Link>
            <Link href={`${arHref}/services/cultural-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الثقافية والتراثية" : "Cultural & Heritage Events"}
            </Link>
            <Link href={`${arHref}/locations/riyadh`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الحصرية في الرياض" : "Exclusive Events in Riyadh"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? <>استضف <span className="text-[var(--primary)] ">تجمّعك المميّز</span></> : <>Host Your <span className="text-[var(--primary)] ">Signature Gathering</span></>}</h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "استفسر عن خدمات المجلس" : "Inquire About Majlis Services"}
        </Link>
      </section>

      <CaseStudyCTA slug="riyadh-elite-majlis" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
