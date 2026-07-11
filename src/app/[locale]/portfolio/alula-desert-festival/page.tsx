import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Tent, Sun, Camera, Wind } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("alula-desert-festival", locale);
}

export default async function AlUlaDesertFestival() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="alula-desert-festival" />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/alula-festival.webp')" }}>
          
          <div className="absolute inset-0 bg-neutral-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link href={isAr ? "/ar/portfolio" : "/portfolio"} className="inline-flex items-center text-white hover:text-[var(--primary)] transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-8 py-3 rounded-full border border-white/20">
            {isAr ? "دراسة حالة" : "National Cultural Activation"}
          </span>
          <h1 className="text-5xl md:text-8xl font-sans font-bold text-white mb-8 leading-tight uppercase tracking-tighter">
            {isAr ? "مهرجان العُلا الصحراوي" : <>AlUla <span className="text-[var(--primary)] ">Desert</span> Festival</>}
          </h1>
          <p className="text-neutral-200 text-xl font-light max-w-2xl mx-auto leading-relaxed">{isAr ? "مزج التاريخ القديم بإنتاج طليعي في قلب الصحراء السعودية." : "Harmonizing ancient history with avant-garde production in the heart of the Saudi desert."}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border-y border-neutral-200/80 relative z-20 -mt-24 mx-4 md:mx-auto max-w-6xl rounded-[4rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8 md:px-16">
          {(isAr
            ? [
            { icon: Tent, label: "الحجم", val: "+5,000 يوميًا" },
            { icon: Sun, label: "الطاقة", val: "طاقة شمسية" },
            { icon: Camera, label: "الأثر", val: "تغطية عالمية" },
            { icon: Wind, label: "البيئة", val: "صديق للبيئة" },
              ]
            : [
            { icon: Tent, label: "Scale", val: "5,000+ Daily" },
            { icon: Sun, label: "Climate", val: "Solar Powered" },
            { icon: Camera, label: "Impact", val: "Global Press" },
            { icon: Wind, label: "Nature", val: "Eco-Conscious" }
          ]).map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={32} className="text-[var(--primary)] mx-auto mb-8" />
              <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-2 font-bold">{stat.label}</div>
              <div className="text-base font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-lg leading-relaxed space-y-32">
        
        {/* The Challenge */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? <>الطموح</> : <>The <span className="text-[var(--primary)] ">Ambition</span></>}</h2>
            <p className="mb-8">
              {isAr
                ? "العلا مكان ذو أهمية جيولوجية وتاريخية هائلة. ويتمحور هذا التصوّر حول مهرجان يحتفي بهذا التراث دون ترك أثر على البيئة. ويستلزم إنتاج بهذا الحجم نشر بنية تحتية كبيرة — مسارح، ومقاعد، ومراكز تموين، وإضاءة — في موقع صحراوي نائٍ بمرافق قائمة محدودة."
                : "AlUla is a place of immense geological and historical significance. This concept is built around a festival that celebrates this heritage without leaving a trace on the environment. A production at this scale calls for the deployment of significant infrastructure—stages, seating, catering hubs, and lighting—in a remote desert location with limited existing facilities."}
            </p>
            <p>
              {isAr
                ? "عملنا عن قرب مع علماء الآثار والبيئة لضمان وضع كل نقطة تثبيت وخط طاقة بعناية مطلقة تجاه المشهد الطبيعي."
                : "We worked closely with archaeologists and environmentalists to ensure that every anchor point and power line was placed with absolute care for the landscape."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                <Image src="/gallery_charity_gala.webp" alt="Festival Detail 1" width={400} height={500} className="w-full h-full object-cover" />
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg">
                <Image src="/gallery_corporate_gala.webp" alt="Festival Detail 2" width={400} height={400} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="pt-12">
              <div className="relative aspect-[3/5] rounded-3xl overflow-hidden shadow-lg">
                <Image src="/portfolio/alula-festival.webp" alt="Festival Detail 3" width={400} height={600} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* The Execution */}
        <div className="bg-white rounded-[4rem] p-12 md:p-24 border border-neutral-200/80">
          <h2 className="text-3xl font-sans font-bold text-neutral-900 mb-16 uppercase tracking-tight text-center">{isAr ? "الإتقان التشغيلي" : <>Operational <span className="text-[var(--primary)] ">Mastery</span></>}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {(isAr
              ? [
              { title: "عمارة حركية", desc: "مسارح عكست تكوينات صخور العلا الطبيعية، باستخدام موادّ عاكسة للاندماج مع الأفق." },
              { title: "طاقة خارج الشبكة", desc: "شبكة طاقة مستدامة 100% مدعومة بمزرعة شمسية مؤقتة ومولّدات هيدروجين." },
              { title: "سرد غامر", desc: "استخدام الإسقاط الضوئي على المنحدرات القديمة لرواية قصة طريق البخور لجمهور عالمي." },
                ]
              : [
              { title: "Kinetic Architecture", desc: "Stages that mirrored the natural rock formations of AlUla, using reflective materials to blend into the horizon." },
              { title: "Off-Grid Power", desc: "A 100% sustainable energy grid powered by a temporary solar farm and hydrogen generators." },
              { title: "Immersive Narrative", desc: "Using projection mapping on ancient cliffs to tell the story of the Incense Route to a global audience." }
            ]).map((item: any, i: number) => (
              <div key={i} className="text-center space-y-6">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-[var(--primary)] font-bold text-xl">{i+1}</span>
                </div>
                <h3 className="text-neutral-900 text-sm font-bold uppercase tracking-widest">{item.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-4xl mx-auto text-center ">
          <p className="text-2xl md:text-4xl font-sans text-neutral-900 mb-10 leading-snug">
            {isAr
              ? "«هذا ما نسعى إلى تحقيقه في كل إنتاج ثقافي: جسر بين الماضي القديم ومستقبل مستدام.»"
              : "\"This is what we aim to build with every cultural production: a bridge between the ancient past and a sustainable future.\""}
          </p>
          <div className="text-[var(--primary)] font-bold uppercase tracking-[0.4em] text-xs">{isAr ? "— نهجنا في مواقع التراث الثقافي" : "— Our Approach to Cultural Heritage Sites"}</div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/destination-events`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة فعاليات الوجهات" : "Destination Event Management"}
            </Link>
            <Link href={`${arHref}/services/cultural-events`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الثقافية والتراثية" : "Cultural & Heritage Events"}
            </Link>
            <Link href={`${arHref}/services/event-production`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الإنتاج الفعّالياتي" : "Event Production"}
            </Link>
            <Link href={`${arHref}/locations/alula`} className="px-5 py-2.5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "فعاليات في العلا" : "Events in AlUla"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-neutral-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/portfolio/alula-festival.webp" alt="Desert" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-10 uppercase tracking-tight">{isAr ? <>تصدّر <span className="text-[var(--primary)] ">الموجة الثقافية</span></> : <>Lead the <span className="text-[var(--primary)] ">Cultural Wave</span></>}</h2>
          <Link
            href={`${arHref}/contact`}
            className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
          >
            {isAr ? "ابدأ مشروعًا ثقافيًا" : "Start a Cultural Project"}
          </Link>
        </div>
      </section>

      <CaseStudyCTA slug="alula-desert-festival" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
