import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Target, Layers, Award } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("alkhobar-corporate-retreat", locale);
}

export default async function AlkhobarCorporateRetreat() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="alkhobar-corporate-retreat" />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/alkhobar_corporate_people.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link
            href={isAr ? "/ar/portfolio" : "/portfolio"}
            className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/5 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            {isAr ? "دراسة حالة" : "Corporate Retreat"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "ملاذ الخبر للشركات" : <>Al Khobar <span className="text-[var(--primary)]">Corporate Retreat</span></>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
            {isAr
              ? "ملاذ تنفيذي بثلاثة أيام لـ120 قائدًا من كبار قادة إحدى شركات أرامكو السعودية التابعة — صُمّم خصيصًا لتعزيز الثقافة، ومواءمة الاستراتيجية، وتكريم المواهب."
              : "A three-day executive retreat for 120 senior leaders of a Saudi Aramco subsidiary — purpose-built to strengthen culture, align strategy, and celebrate talent."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Users, label: "القادة", val: "120 تنفيذيًا" },
            { icon: Target, label: "التركيز", val: "بناء الفرق" },
            { icon: Layers, label: "الصيغة", val: "ملاذ بثلاثة أيام" },
            { icon: Award, label: "النتيجة", val: "تفعيل العلامة" },
              ]
            : [
            { icon: Users, label: "Leaders", val: "120 Executives" },
            { icon: Target, label: "Focus", val: "Team Building" },
            { icon: Layers, label: "Format", val: "3-Day Retreat" },
            { icon: Award, label: "Result", val: "Brand Activation" },
          ]).map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-base leading-relaxed space-y-24">

        {/* Concept */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src="/gallery_corporate_gala.webp" alt="Corporate retreat activities" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
              {isAr ? "التكليف" : <>The <span className="text-[var(--primary)]">Mandate</span></>}
            </h2>
            <p className="mb-8">
              {isAr
                ? "إثر إعادة هيكلة مؤسسية كبرى، احتاج مدير الموارد البشرية في الشركة التابعة فعالية تعيد ترسيخ 120 قائدًا حول رؤية علامة موحّدة وتعيد ضبط البوصلة الثقافية للمنظمة. وأُقيم الملاذ في منتجع خاص على ساحل المنطقة الشرقية، مع سياسة صارمة بمنع الأجهزة خلال كل الجلسات."
                : "Following a major corporate restructuring, the subsidiary's CHRO needed an event that would re-anchor 120 senior leaders around a unified brand vision and reset the cultural compass of the organisation. The retreat was held at a private resort on the Eastern Province coast, with a strict no-device policy during all facilitated sessions."}
            </p>
            <p>
              {isAr
                ? "صمّمت إدارة الفعاليات السعودية برنامجًا يمزج الكلمات الرئيسية عالية الأثر بتحدّيات فريق تجريبية مستوحاة من التراث السعودي — محاكاة استراتيجية بالصقارة، وتحدّيات ملاحة صحراوية، ومنتدى قيادة بأسلوب المجلس."
                : "Saudi Event Management designed a programme blending high-impact keynotes with experiential team challenges drawn from Saudi heritage — falconry strategy simulations, desert navigation challenges, and a Majlis-style leadership forum."}
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight">
            {isAr ? <>برنامج <span className="text-[var(--primary)]">استراتيجي</span></> : <>Strategic <span className="text-[var(--primary)]">Programme</span></>}
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {(isAr
              ? [
              { title: "منتدى القيادة", desc: "حوار بأسلوب المجلس يديره ميسّر بين الرئيس التنفيذي وكل القادة الـ120 في إعداد دائري حميم." },
              { title: "تحدّيات تراثية", desc: "جلسات استراتيجية قائمة على الصقارة وتحدّيات ملاحة ساحلية تعزّز التعاون بين الأقسام." },
              { title: "جدار تفعيل العلامة", desc: "تركيب تفاعلي ساهم فيه كل قائد برؤيته — جُمّعت ماديًا في جدارية علامة بطول 6 أمتار." },
              { title: "حفل عشاء تكريمي", desc: "عشاء جوائز رسمي يكرّم أفضل المؤدّين، بجائزة مخصّصة صُنعت من موادّ معاد تدويرها من المنطقة الشرقية." },
                ]
              : [
              { title: "Leadership Forum", desc: "A moderated Majlis-style dialogue between the CEO and all 120 leaders in an intimate circular setting." },
              { title: "Heritage Challenges", desc: "Falconry-based strategy sessions and coastal navigation challenges reinforcing cross-functional collaboration." },
              { title: "Brand Activation Wall", desc: "An interactive installation where each leader contributed their vision — physically assembled into a 6-metre brand mural." },
              { title: "Gala Recognition Dinner", desc: "A black-tie awards dinner celebrating top performers, with a bespoke trophy crafted from reclaimed Eastern Province materials." },
            ]).map((item, i) => (
              <div key={i} className="flex gap-10 p-8 bg-white rounded-3xl border border-neutral-200/80 hover:shadow-xl transition-all group">
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
            <Image src="/alkhobar_corporate_people.webp" alt="Corporate retreat" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              {isAr ? "الأثر" : <>The <span className="text-[var(--primary)]">Impact</span></>}
            </h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {isAr
                ? "سجّل استبيان داخلي بعد الملاذ ارتفاعًا بـ34 نقطة في درجات تماسك الفريق. وأفاد مدير الموارد البشرية بأن جدارية تفعيل العلامة تُعلَّق الآن في مقرّ الشركة بالظهران، لتكون تذكيرًا يوميًا بالرؤية الجماعية التي رُسِمت في الملاذ."
                : "A post-retreat internal survey recorded a 34-point rise in team cohesion scores. The CHRO reported that the brand activation mural now hangs in the company's Dhahran headquarters, serving as a daily reminder of the collective vision set at the retreat."}
            </p>
            <div className="inline-block px-8 py-4 border border-[var(--primary)]/30 rounded-full">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.3em]">{isAr ? "بناء الفرق التنفيذية وتفعيل العلامة" : "Executive Team Building & Branding"}</span>
            </div>
          </div>
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
            <Link href={`${arHref}/locations/dammam`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات المؤسسية في الدمام" : "Corporate Events in Dammam"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
          {isAr ? <>صمّم <span className="text-[var(--primary)]">ملاذك المؤسسي</span></> : <>Design Your <span className="text-[var(--primary)]">Corporate Retreat</span></>}
        </h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "استكشف الفعاليات المؤسسية" : "Explore Corporate Events"}
        </Link>
      </section>

      <CaseStudyCTA slug="alkhobar-corporate-retreat" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
