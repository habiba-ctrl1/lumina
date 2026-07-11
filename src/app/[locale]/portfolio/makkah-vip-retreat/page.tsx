import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Moon, Star, MapPin, Users } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("makkah-vip-retreat", locale);
}

export default async function MakkahVipRetreat() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="makkah-vip-retreat" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/portfolio/makkah-vip-retreat.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href={isAr ? "/ar/portfolio" : "/portfolio"} className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> {isAr ? "العودة إلى الأعمال" : "Back to Portfolio"}
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/10 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            {isAr ? "دراسة حالة" : "Private Spiritual Retreat"}
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            {isAr ? "ملاذ كبار الشخصيات في مكة" : <>Makkah <span className="text-[var(--primary)] ">VIP Retreat</span></>}
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">{isAr ? "ملاذ من السكينة والفخامة المطلقة لضيوف مرموقين خلال الشهر الفضيل." : "A sanctuary of serenity and absolute luxury for distinguished guests during the holy month."}</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border-y border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {(isAr
            ? [
            { icon: Moon, label: "المدة", val: "10 أيام" },
            { icon: Star, label: "الخدمة", val: "فاخرة للغاية" },
            { icon: Users, label: "الضيوف", val: "وفد كبار شخصيات" },
            { icon: MapPin, label: "القاعة", val: "فيلا حصرية" },
              ]
            : [
            { icon: Moon, label: "Duration", val: "10 Days" },
            { icon: Star, label: "Service", val: "Ultra-Luxury" },
            { icon: Users, label: "Guests", val: "VIP Delegation" },
            { icon: MapPin, label: "Venue", val: "Exclusive Villa" }
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
        
        {/* The Brief */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? "الرؤية" : <>The <span className="text-[var(--primary)] ">Vision</span></>}</h2>
            <p className="mb-8">
              {isAr
                ? "احتاج عميلنا بيئة خاصة تمامًا، وعالية الأمان، وذات حضور روحاني لوفد رفيع المستوى يزور مكة المكرمة. وكان الهدف مزج قدسية المكان بالضيافة العالمية والدقّة اللوجستية لملاذ دولي بخمس نجوم."
                : "Our client required a completely private, highly secure, and spiritually resonant environment for a high-profile delegation visiting Makkah. The objective was to blend the sanctity of the location with the world-class hospitality and logistical precision of a five-star international retreat."}
            </p>
            <p>
              {isAr
                ? "كل تفصيل، من عبير المفارش إلى توقيت النقل الخاص، وجب تنسيقه بدقّة جراحية كي يتفرّغ الضيوف تمامًا لرحلتهم الروحانية."
                : "Every detail, from the scent of the linens to the timing of the private transport, had to be orchestrated with surgical precision to allow guests to focus entirely on their spiritual journey."}
            </p>
          </div>
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_1.webp" alt="Makkah Retreat Interior" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight text-center">{isAr ? "تنفيذ بارع" : <>Masterful <span className="text-[var(--primary)] ">Execution</span></>}</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {(isAr
              ? [
              { title: "الخصوصية والأمن", desc: "بروتوكول أمني متعدد المستويات بأفراد متحفّظين ومراقبة متقدّمة." },
              { title: "ضيافة طعام مخصّصة", desc: "طهاة خاصون يقدّمون قوائم متجدّدة مخصّصة تركّز على التراث المحلي والتغذية العالمية." },
              { title: "انسياب لوجستي", desc: "نقل خاص سلس من وإلى الحرم ببروتوكولات بلا انتظار." },
                ]
              : [
              { title: "Privacy & Security", desc: "Implemented a multi-tier security protocol with discreet personnel and advanced surveillance." },
              { title: "Bespoke Dining", desc: "Private chefs providing customized menu rotations focusing on local heritage and international nutrition." },
              { title: "Logistical Flow", desc: "Seamless private transport to and from the Haram with zero-wait protocols." }
            ]).map((item: any, i: number) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-200/80">
                <h3 className="text-neutral-900 text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--primary)]" /> {item.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-neutral-900 text-white p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 end-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-8 uppercase tracking-tight">{isAr ? "النتيجة" : <>The <span className="text-[var(--primary)] ">Result</span></>}</h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl font-light">
              {isAr
                ? "يُصمَّم ملاذ بهذا المستوى ليكون التجربة الأكثر سلاسة وإثراءً روحانيًا لأي وفد. وتتولى إدارة الفعاليات السعودية كل تعقيد، بما يتيح للضيوف اختبار مكة بسلام وفخامة لا مساومة فيهما."
                : "A retreat at this level is designed to be the most seamless and spiritually enriching experience a delegation could ask for. Saudi Event Management is built to handle every complexity, so guests can experience Makkah with complete peace and uncompromising luxury."}
            </p>
            <div className="flex items-center gap-10 border-t border-white/10 pt-10">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                <Star className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest ">{isAr ? "«اهتمام بالتفاصيل لا يُضاهى في أقدس المدن.»" : "\"Unmatched attention to detail in the holiest of cities.\""}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{isAr ? "— معيارنا لملاذات كبار الشخصيات في مكة" : "— Our Standard for VIP Retreats in Makkah"}</p>
              </div>
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
            <Link href={`${arHref}/services/cultural-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات الثقافية والتراثية" : "Cultural & Heritage Events"}
            </Link>
            <Link href={`${arHref}/services/destination-events`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "إدارة فعاليات الوجهات" : "Destination Event Management"}
            </Link>
            <Link href={`${arHref}/locations/makkah`} className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              {isAr ? "الفعاليات في المدن المقدّسة" : "Events in Holy Cities"}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">{isAr ? <>خطّط لـ<span className="text-[var(--primary)] ">تجربتك النخبوية</span></> : <>Plan Your <span className="text-[var(--primary)] ">Elite Experience</span></>}</h2>
        <Link
          href={`${arHref}/contact`}
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          {isAr ? "اطلب استشارة خاصة" : "Request Private Consultation"}
        </Link>
      </section>

      <CaseStudyCTA slug="makkah-vip-retreat" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
