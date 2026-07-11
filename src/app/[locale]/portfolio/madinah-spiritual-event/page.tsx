import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Heart, Moon, Users, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("madinah-spiritual-event", locale);
}

export default async function MadinahSpiritualEvent() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="madinah-spiritual-event" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/madinah-spiritual.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href={isAr ? "/ar/portfolio" : "/portfolio"} className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/10 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            {isAr ? "دراسة حالة" : "Reverence & Grace"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "فعالية روحانية في المدينة" : <>Madinah <span className="text-[var(--primary)] ">Spiritual</span> Event</>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">{isAr ? "صناعة لحظات من السكينة العميقة في مدينة الرسول. احتفاء بالإيمان والتراث وضيافة لا تُضاهى." : "Crafting moments of profound peace in the City of the Prophet. A celebration of faith, heritage, and unparalleled hospitality."}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Moon, label: "الثيمة", val: "سكينة روحانية" },
            { icon: Users, label: "الحضور", val: "دولي" },
            { icon: Heart, label: "التجربة", val: "شخصية عميقة" },
            { icon: MapPin, label: "الموقع", val: "المدينة المنوّرة" },
              ]
            : [
            { icon: Moon, label: "Theme", val: "Spiritual Peace" },
            { icon: Users, label: "Attendees", val: "International" },
            { icon: Heart, label: "Experience", val: "Deeply Personal" },
            { icon: MapPin, label: "Location", val: "Madinah Al-Munawwarah" }
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
        
        {/* The Essence */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-200/80">
            <Image src="/gallery_charity_gala.webp" alt="Madinah Event Ambience" width={800} height={800} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? "الجوهر" : <>The <span className="text-[var(--primary)] ">Essence</span></>}</h2>
            <p className="mb-8">
              {isAr
                ? "تتطلّب المدينة المنوّرة نهجًا فريدًا في إدارة الفعاليات — نهجًا يقدّم الطمأنينة والاحترام والانسياب السلس. ويتمحور هذا التصوّر حول تجمّع روحاني مصمَّم ليبدو امتدادًا لسكينة المدينة المقدّسة الفطرية."
                : "Madinah demands a unique approach to event management—one that prioritizes tranquility, respect, and effortless flow. This concept is built around a spiritual gathering designed to feel like an extension of the holy city's innate serenity."}
            </p>
            <p>
              {isAr
                ? "وظّفنا إضاءة ناعمة محيطة، وموادّ طبيعية، وزخارف معمارية تقليدية لخلق ملاذ يتأمّل فيه الضيوف ويتواصلون براحة مطلقة."
                : "We utilized soft, ambient lighting, natural materials, and traditional architectural motifs to create a sanctuary where guests could reflect and connect in absolute comfort."}
            </p>
          </div>
        </div>

        {/* Pillars of Peace */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-12 uppercase tracking-tight">{isAr ? <>ركائز <span className="text-[var(--primary)] ">السكينة</span></> : <>Pillars of <span className="text-[var(--primary)] ">Peace</span></>}</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {(isAr
              ? [
              { title: "تصميم الأجواء", desc: "استخدام كتم الصوت وتنسيق العطور لخلق بيئة تبدو منفصلة عن العالم الخارجي." },
              { title: "سرد ثقافي", desc: "دمج الحرف التقليدية للمدينة المنوّرة في كل نقطة تماس، من الدعوات إلى الأثاث." },
              { title: "انسياب سلس", desc: "تخطيط لوجستي احترم أوقات الصلاة وأنماط حركة المدينة الفريدة." },
              { title: "خدمة شخصية", desc: "نسبة طاقم عالية إلى الضيوف تضمن تلبية احتياجات كل فرد بحصافة ولطف." },
                ]
              : [
              { title: "Atmospheric Design", desc: "Using acoustic dampening and scent curation to create an environment that felt separate from the outside world." },
              { title: "Cultural Narrative", desc: "Integrating traditional Madinah craftsmanship into every touchpoint, from the invitations to the furniture." },
              { title: "Seamless Flow", desc: "Logistical planning that respected prayer times and the city's unique movement patterns." },
              { title: "Personalized Service", desc: "A high staff-to-guest ratio ensuring every individual's needs were met with discretion and grace." }
            ]).map((item: any, i: number) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-neutral-200/80 hover:bg-white hover:shadow-lg transition-all">
                <h4 className="text-neutral-900 text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--primary)]" /> {item.title}
                </h4>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-neutral-900 text-white p-12 md:p-24 rounded-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">{isAr ? <>أثر <span className="text-[var(--primary)] ">عميق</span></> : <>A <span className="text-[var(--primary)] ">Profound</span> Impact</>}</h2>
          <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {isAr
              ? "تُصمَّم فعالية بهذا المستوى لتكون «تجربة محوّلة» لكل حاضر. والقدرة على التعامل مع تعقيدات المدينة مع الحفاظ على إحساس عميق بالخشوع والفخامة هي المعيار الذي نلتزم به في كل فعالية روحانية."
              : "A gathering at this level is designed to be a transformative experience for every attendee. Handling the complexities of the city while maintaining a profound sense of reverence and luxury is the benchmark we hold ourselves to for every spiritual event."}
          </p>
          <div className="inline-block px-8 py-4 bg-white/5 rounded-full border border-white/10">
            <span className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.4em]">{isAr ? "التميّز في الضيافة الروحانية" : "Excellence in Spiritual Hospitality"}</span>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
          <div className="flex flex-wrap gap-4">
            <Link href={`${arHref}/services/cultural-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الثقافية والتراثية" : "Cultural & Heritage Events"}
            </Link>
            <Link href={`${arHref}/services/destination-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة فعاليات الوجهات" : "Destination Event Management"}
            </Link>
            <Link href={`${arHref}/services/luxury-vip-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الفاخرة وكبار الشخصيات" : "Luxury & VIP Events"}
            </Link>
            <Link href={`${arHref}/locations/makkah`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات في المدن المقدّسة" : "Events in Holy Cities"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-white">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? <>استضف <span className="text-[var(--primary)] ">تجمّعًا روحانيًا</span></> : <>Host a <span className="text-[var(--primary)] ">Soulful Gathering</span></>}</h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "استفسر عن خدمات المدينة" : "Inquire About Madinah Services"}
        </Link>
      </section>

      <CaseStudyCTA slug="madinah-spiritual-event" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
