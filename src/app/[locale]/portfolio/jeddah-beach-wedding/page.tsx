import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Waves, Users, Sunset, Heart } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("jeddah-beach-wedding", locale);
}

export default async function JeddahBeachWedding() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="jeddah-beach-wedding" />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/jeddah_beach_wedding_setup.webp')" }}>
          
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
            {isAr ? "دراسة حالة" : "Luxury Wedding"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "زفاف جدة على الشاطئ" : <>Jeddah <span className="text-[var(--primary)]">Seaside Wedding</span></>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
            {isAr
              ? "مراسم ساحلية خلّابة على البحر الأحمر تمزج رومانسية الساحل بإنتاج فاخر عالمي المستوى — 450 ضيفًا، وخلفية أفق لا نهائي."
              : "A breathtaking Red Sea coastal ceremony blending the romance of the Arabian Gulf with world-class luxury production — 450 guests, infinite horizon backdrop."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Users, label: "الضيوف", val: "450" },
            { icon: Waves, label: "الموقع", val: "ساحل البحر الأحمر" },
            { icon: Sunset, label: "المدة", val: "فعالية بثلاثة أيام" },
            { icon: Heart, label: "الثيمة", val: "فخامة ساحلية" },
              ]
            : [
            { icon: Users, label: "Guests", val: "450" },
            { icon: Waves, label: "Setting", val: "Red Sea Coast" },
            { icon: Sunset, label: "Duration", val: "3-Day Event" },
            { icon: Heart, label: "Theme", val: "Coastal Luxury" },
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
              <Image src="/gallery_wedding_reception.webp" alt="Beachfront wedding setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
              {isAr ? "الرؤية" : <>The <span className="text-[var(--primary)]">Vision</span></>}
            </h2>
            <p className="mb-8">
              {isAr
                ? "وصل تكليف العائلة برؤية واحدة: زفاف يبدو طبيعيًا كنسيم البحر وفخمًا كأي قاعة قصر. اختارت إدارة الفعاليات السعودية عقارًا خاصًا حصريًا على الشاطئ شمال كورنيش جدة، ثم هندست تحويلًا كاملًا — أجنحة مؤقتة، وتركيبات أزهار عائمة، ونظام صوت يتحرّك مع الريح."
                : "The family commission arrived with a singular vision: a wedding that felt as natural as the sea breeze yet as opulent as any palace ballroom. Saudi Event Management sourced an exclusive private beachfront estate north of Jeddah's Corniche, then engineered a complete transformation — temporary pavilions, floating floral installations, and a sound system that moved with the wind."}
            </p>
            <p>
              {isAr
                ? "صُمّم كل عنصر ليختفي عند الشروق، دون ترك أثر على الشاطئ البكر — التزام بالاستدامة كان محوريًا في طلب العائلة."
                : "Every element was designed to disappear at sunrise, leaving no trace on the pristine shoreline — a sustainability commitment that was central to the family's brief."}
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight">
            {isAr ? <>تفاصيل <span className="text-[var(--primary)]">مصنوعة بإتقان</span></> : <>Crafted <span className="text-[var(--primary)]">Details</span></>}
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {(isAr
              ? [
              { title: "قوس أزهار عائم", desc: "قوس بطول 14 مترًا من الأوركيد الأبيض والياسمين السعودي معلّق فوق ممر المراسم، مثبّت في المياه الضحلة." },
              { title: "مطبخ ساحلي", desc: "قائمة مأكولات بحرية من البحر الأحمر صمّمها طاهٍ حائز على نجمة ميشلان، قُدّمت تحت خيمة مطرّزة يدويًا خصيصًا." },
              { title: "احتياطي للطقس", desc: "نظام مظلّات معياري يُنشَر في أقل من 40 دقيقة ضمن سير الفعالية بلا أخطاء رغم رياح ساحلية غير متوقّعة." },
              { title: "توثيق سينمائي", desc: "فريق تصوير بطائرات تحت الماء وجوية التقط منظورات مرّة في العمر للمراسم." },
                ]
              : [
              { title: "Floating Floral Arch", desc: "A 14-metre arch of white orchids and Saudi jasmine suspended over the ceremony aisle, anchored in the shallows." },
              { title: "Coastal Gastronomy", desc: "A Red Sea seafood menu curated by a Michelin-recognised chef, served under a custom hand-embroidered tent." },
              { title: "Weather Contingency", desc: "A modular shelter system deployable in under 40 minutes ensured the event ran flawlessly despite an unexpected coastal wind." },
              { title: "Cinematic Documentation", desc: "An underwater drone and aerial cinematography team captured once-in-a-lifetime perspectives of the ceremony." },
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
            <Image src="/jeddah_beach_wedding_setup.webp" alt="Seaside wedding" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              {isAr ? "الذكرى" : <>The <span className="text-[var(--primary)]">Memory</span></>}
            </h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {isAr
                ? "وصفت العائلة الاحتفال بثلاثة أيام بأنه «أجمل فعالية حضرناها على الإطلاق». وتلقّى كل ضيف تذكارًا ساحليًا مصنوعًا يدويًا، وشُورِك الفيلم الوثائقي منذ ذلك الحين بشكل خاص بين أكثر من 2,000 من معارف العائلة."
                : "The three-day celebration was described by the family as \"the most beautiful event we have ever attended.\" Every guest received a hand-crafted coastal keepsake, and the video documentary has since been shared privately among over 2,000 family connections."}
            </p>
            <div className="inline-block px-8 py-4 border border-[var(--primary)]/30 rounded-full">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.3em]">{isAr ? "إنتاج ساحلي فاخر على البحر الأحمر" : "Luxury Red Sea Coastal Production"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/weddings`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "تخطيط الزفاف الفاخر" : "Luxury Wedding Planning"}
            </Link>
            <Link href={`${arHref}/services/destination-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة فعاليات الوجهات" : "Destination Event Management"}
            </Link>
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
            <Link href={`${arHref}/locations/jeddah`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الأعراس في جدة" : "Weddings in Jeddah"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
          {isAr ? <>خطّط لـ<span className="text-[var(--primary)]">زفاف أحلامك</span></> : <>Plan Your <span className="text-[var(--primary)]">Dream Wedding</span></>}
        </h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "استكشف خدمات الزفاف" : "Explore Wedding Services"}
        </Link>
      </section>

      <CaseStudyCTA slug="jeddah-beach-wedding" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
