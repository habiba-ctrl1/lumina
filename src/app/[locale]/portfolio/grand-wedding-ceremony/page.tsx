import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Crown, Star, Music } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("grand-wedding-ceremony", locale);
}

export default async function GrandWeddingCeremony() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="grand-wedding-ceremony" />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/wedding_hall_grand_entrance.webp')" }}>
          
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
            {isAr ? "دراسة حالة" : "Royal Wedding Ceremony"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "حفل زفاف فخم" : <>Grand <span className="text-[var(--primary)]">Wedding Ceremony</span></>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
            {isAr
              ? "زفاف سعودي تقليدي متكامل لأكثر من 600 ضيف — من موكب الزفّة الاحتفالي إلى الكشف الكبير في القاعة، كل تفصيل نُسّق بدقّة ملكية."
              : "A full-scale traditional Saudi wedding for 600+ guests — from the ceremonial Zaffa procession to the grand ballroom reveal, every detail orchestrated with royal precision."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Users, label: "الضيوف", val: "+600" },
            { icon: Crown, label: "الطراز", val: "بأسلوب ملكي" },
            { icon: Music, label: "الزفّة", val: "فرقة حية" },
            { icon: Star, label: "البروتوكول", val: "دخول كبار الشخصيات" },
              ]
            : [
            { icon: Users, label: "Guests", val: "600+" },
            { icon: Crown, label: "Style", val: "Royal-Style" },
            { icon: Music, label: "Zaffa", val: "Live Ensemble" },
            { icon: Star, label: "Protocol", val: "VIP Entrance" },
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
              <Image src="/gallery_wedding_reception.webp" alt="Grand ballroom wedding setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
              {isAr ? "التقاليد" : <>The <span className="text-[var(--primary)]">Tradition</span></>}
            </h2>
            <p className="mb-8">
              {isAr
                ? "يتصوّر هذا المفهوم إنتاج زفاف متعدد الأيام بأسلوب ملكي يكرّم ثراء التقاليد الاحتفالية السعودية كاملًا — من توقيع الملكة إلى الاستقبال الكبير المختلط — مع تلبية توقعات الضيوف الدوليين غير المعتادين على العادات المحلية."
                : "This concept envisions a multi-day royal-style wedding production that honours the full richness of Saudi ceremonial traditions — from the Milkah signing to the grand mixed reception — while meeting the expectations of international guests unfamiliar with local customs."}
            </p>
            <p>
              {isAr
                ? "كانت القاعة من أرقى قاعات الرياض، حُوِّلت على مدى خمسة أيام إلى قصر من الرخام الأبيض، والفوانيس الذهبية، و40,000 وردة بيضاء وُضعت واحدة واحدة. ووجّه فريق تواصل ثقافي مخصّص كل ضيف دولي عبر كل عنصر من المراسم."
                : "The venue was a premier Riyadh ballroom transformed over five days into a palace of white marble, gold lanterns, and 40,000 individually-placed white roses. A dedicated cultural liaison team guided each international guest through every ceremony element."}
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight">
            {isAr ? <>إنتاج <span className="text-[var(--primary)]">ملكي</span></> : <>Royal <span className="text-[var(--primary)]">Production</span></>}
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {(isAr
              ? [
              { title: "زفّة احتفالية", desc: "فرقة زفّة حية من 24 عضوًا بطبّالين سعوديين وحاملي سيوف وحاملي عطور قادت موكب العريس." },
              { title: "عمارة الأزهار", desc: "40,000 وردة بيضاء نُسجت في أقواس مخصّصة، وقطع مركزية للطاولات، ومظلّة ممر احتفالي بطول 10 أمتار." },
              { title: "إدارة ضيوف كبار الشخصيات", desc: "كونسيرج مخصّص لكل عائلة من كبار الشخصيات، يدير الجلوس والمتطلبات الغذائية والأجنحة العائلية الخاصة." },
              { title: "فيلم وتصوير", desc: "طاقم سينمائي من أربعة فرق يوثّق كل مراسم على التوازي — واحد لكل منطقة في القاعة — لفيلم زفاف كامل بدقة 4K." },
                ]
              : [
              { title: "Ceremonial Zaffa", desc: "A 24-piece live Zaffa ensemble with Saudi drummers, swordsmen, and fragrance bearers led the groom's procession." },
              { title: "Floral Architecture", desc: "40,000 white roses woven into custom arches, table centrepieces, and a 10-metre ceremonial aisle canopy." },
              { title: "VIP Guest Management", desc: "A dedicated concierge for each VIP family, managing seating, dietary requirements, and private family suites." },
              { title: "Film & Photography", desc: "A four-team cinematic crew documenting every ceremony in parallel — one per venue zone — for a full 4K wedding film." },
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
            <Image src="/wedding_hall_grand_entrance.webp" alt="Grand wedding" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              {isAr ? "الإرث" : <>The <span className="text-[var(--primary)]">Legacy</span></>}
            </h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              {isAr
                ? "تُصمَّم مناسبة بهذا المستوى لتكون «ذكرى تعيش لأجيال» — من نوع الأفلام الاحتفالية التي تستحق العرض مجددًا في تجمّعات العائلة القادمة، ومن نوع التجارب التي تجعل عملاءنا يعودون إلينا في المناسبة العائلية التالية."
                : "A wedding at this level is designed to be a memory that lives for generations — the kind of ceremonial film worth screening again at future family gatherings, and the kind of experience that has clients returning to us for the next family occasion."}
            </p>
            <div className="inline-block px-8 py-4 border border-[var(--primary)]/30 rounded-full">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.3em]">{isAr ? "بروتوكول دخول كبار الشخصيات التقليدي" : "Traditional VIP Entrance Protocol"}</span>
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
            <Link href={`${arHref}/services/royal-weddings`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الأعراس الملكية والمراسم" : "Royal Weddings & Ceremonies"}
            </Link>
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
            <Link href={`${arHref}/locations/riyadh`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الأعراس في الرياض" : "Weddings in Riyadh"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
          {isAr ? <>خطّط لـ<span className="text-[var(--primary)]">احتفالك الكبير</span></> : <>Plan Your <span className="text-[var(--primary)]">Grand Celebration</span></>}
        </h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "استكشف خدمات الزفاف" : "Explore Wedding Services"}
        </Link>
      </section>

      <CaseStudyCTA slug="grand-wedding-ceremony" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
