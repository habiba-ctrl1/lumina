import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { hreflangAlternates } from "@/lib/seo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import {
  Mic, Users, Monitor, Headphones, Video,
  ClipboardList, Shield, ChevronRight, Award, Phone, CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/conferences`;

  return {
    title: isAr
      ? {
          absolute:
            "إدارة المؤتمرات في الرياض | تنظيم القمم والمؤتمرات في السعودية | إدارة الفعاليات السعودية",
        }
      : "Conference Management Services Riyadh | B2B Summit Planning Saudi Arabia",
    description: isAr
      ? "شركة متخصصة في إدارة المؤتمرات بالرياض والسعودية: قمم الأعمال، المؤتمرات العلمية، الفعاليات الهجينة، إدارة المتحدثين، وإنتاج المسرح والتقنيات الصوتية والمرئية لـ 50 إلى 5000 مندوب. منظِّم مؤتمرات احترافي (PCO)."
      : "Expert conference management company in Riyadh, Saudi Arabia. We handle B2B summits, scientific conferences, hybrid events, speaker management, and stage production for 50–5,000 delegates.",
    keywords: [
      "Conference management Riyadh",
      "Conference organizer Saudi Arabia",
      "B2B summit planning KSA",
      "Hybrid conference services Saudi Arabia",
      "PCO services Riyadh",
      "Speaker management Saudi Arabia",
      "Scientific conference organizer KSA",
      "إدارة مؤتمرات الرياض",
      "تنظيم مؤتمرات السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/conferences"),
    },
    openGraph: {
      title: isAr
        ? "إدارة المؤتمرات في الرياض | إدارة الفعاليات السعودية"
        : "Conference Management Services Riyadh | Saudi Event Management",
      description: isAr
        ? "إدارة مؤتمرات رائدة في الرياض وعموم السعودية — قمم الأعمال، البث الهجين، بروتوكول كبار الشخصيات، وإنتاج صوتي ومرئي متكامل."
        : "Premier conference management in Riyadh and across Saudi Arabia — B2B summits, hybrid streaming, VIP protocol, and full AV production.",
      url: canonicalUrl,
      images: [{ url: "/services/gallery_2.webp", width: 1200, height: 630, alt: "Conference Management Riyadh" }],
    },
  };
}

const services = [
  {
    icon: ClipboardList,
    title: "B2B Summit Planning",
    desc: "End-to-end management for ministerial-level and commercial summits — agenda design, delegate acquisition, registration systems, and on-site logistics at KAFD and KAICC.",
  },
  {
    icon: Mic,
    title: "Stage & AV Production",
    desc: "Concert-grade line-array sound, high-resolution LED walls, multi-camera live switching, and intelligent lighting for audiences of 50 to 5,000+ delegates.",
  },
  {
    icon: Users,
    title: "Speaker Management",
    desc: "International and regional speaker sourcing, green room coordination, technical rider fulfillment, rehearsal scheduling, and on-day handler support.",
  },
  {
    icon: Monitor,
    title: "Hybrid & Live Streaming",
    desc: "Seamless hybrid event production with multi-platform live streaming, real-time polling, virtual networking rooms, and on-demand content archives.",
  },
  {
    icon: Headphones,
    title: "Simultaneous Translation",
    desc: "ISO-standard simultaneous interpretation booths for Arabic-English and multilingual sessions, serving diplomatic and international delegations.",
  },
  {
    icon: ClipboardList,
    title: "Delegate Registration",
    desc: "Custom-branded delegate portals, RFID badge printing, access-controlled session ticketing, and real-time attendance analytics dashboards.",
  },
  {
    icon: Shield,
    title: "VIP & Diplomatic Protocol",
    desc: "Motorcade coordination, close-protection liaison, secure perimeter management, and Ministry-level dignitary reception with full protocol briefings.",
  },
  {
    icon: Video,
    title: "Post-Conference Media",
    desc: "Cinematic highlight reels, verbatim transcription, press release distribution, social media content packages, and executive summary reports.",
  },
];

const resources = [
  {
    title: "Top conference venues in Riyadh: KAFD, KAICC, and Al Faisaliah compared",
    desc: "An expert breakdown of the Kingdom's premier conference spaces, capacities, and AV capabilities.",
  },
  {
    title: "Hybrid conference technology guide for Saudi Arabia 2025",
    desc: "Choosing the right streaming platform, translation tech, and delegate management system.",
  },
  {
    title: "Conference cost breakdown: What does event management cost in KSA?",
    desc: "Transparent pricing analysis for PCO services, AV production, and venue rental across Riyadh.",
  },
  {
    title: "How to secure GEA permits for conferences in Saudi Arabia",
    desc: "Step-by-step guide to regulatory compliance, speaker visa facilitation, and security clearances.",
  },
];

const faqs = [
  {
    q: "What is included in professional conference management?",
    a: "Professional conference management (PCO services) covers venue sourcing and negotiation, registration system setup, speaker coordination, AV production, simultaneous translation, VIP protocol management, on-site staffing, catering coordination, and post-event reporting. Saudi Event Management provides all of these under one roof.",
  },
  {
    q: "What are the best conference venues in Riyadh?",
    a: "The top conference venues in Riyadh include the King Abdullah Financial District (KAFD) Conference Center — ideal for large ministerial summits — the King Abdul Aziz International Conference Center (KAICC), Al Faisaliah Hotel, Ritz-Carlton Riyadh, and JW Marriott Hotel Riyadh. We hold preferred partnerships with all major venues.",
  },
  {
    q: "How much does conference management cost in Saudi Arabia?",
    a: "Conference management costs in Saudi Arabia start from approximately SAR 55,000 for a single-day summit for 100 delegates and scale significantly for multi-day events with international speakers and hybrid broadcasting. Contact us for a bespoke proposal tailored to your delegate count and technical requirements.",
  },
  {
    q: "Can you manage hybrid and virtual conferences in Saudi Arabia?",
    a: "Yes. Saudi Event Management deploys professional broadcast-grade hybrid conference solutions including multi-camera production, enterprise streaming platforms (Zoom Webinar, Hopin, custom RTMP), simultaneous translation feeds, and interactive delegate features for both in-room and online participants.",
  },
  {
    q: "How many delegates can you manage at one conference?",
    a: "We have experience managing conferences from 50 to over 5,000 delegates. Our delegate management systems are scalable, and we have executed government-level summits with multiple breakout tracks and VIP ministerial streams running simultaneously.",
  },
  {
    q: "Do you provide simultaneous translation at conferences?",
    a: "Yes. We provide ISO-standard simultaneous interpretation booths with professional interpreter teams for Arabic-English, French, Mandarin, and other languages. We also offer RSI (Remote Simultaneous Interpretation) for hybrid events.",
  },
  {
    q: "What AV setup do I need for a 1,000-person conference in Riyadh?",
    a: "A 1,000-person conference typically requires a main line-array sound system, dual LED confidence monitors, a central projection or ultra-wide LED wall, 3–5 camera positions for live switching, lavalier and podium microphones, wireless audience response systems, and a dedicated technical director. Our AV team will design a full technical rider for your venue.",
  },
  {
    q: "conference organizer near me Riyadh",
    a: "Saudi Event Management is headquartered in Riyadh with a full-time conference production team on call. We provide on-site walkthroughs, venue inspections, and rapid response logistics for any conference requirement across the capital.",
  },
  {
    q: "best conference management company Saudi Arabia",
    a: "Saudi Event Management is widely regarded as one of the best conference management companies in Saudi Arabia, having organized events for Saudi Aramco, HRDF, SABIC, and multiple ministerial bodies. Our IAPCO-aligned methodologies and ISO-certified AV partners ensure world-class execution.",
  },
  {
    q: "How early should I book a conference organizer in Riyadh?",
    a: "For a conference of 200+ delegates with international speakers, we recommend engaging a PCO at least 4–6 months in advance. This allows time for venue negotiation, GEA permitting, speaker visa facilitation, and the build-out of registration systems and event branding.",
  },
];

/* ─── Arabic body content (phase 1b). Parallel to the English arrays above;
       `faqs` itself stays untouched so the FAQ schema below is unchanged. ─── */
const servicesAr = [
  { title: "تخطيط قمم الأعمال (B2B)", desc: "إدارة متكاملة للقمم الوزارية والتجارية — تصميم الأجندة، واستقطاب المندوبين، وأنظمة التسجيل، واللوجستيات الميدانية في مركز الملك عبدالله المالي ومركز الملك عبدالعزيز للمؤتمرات." },
  { title: "إنتاج المسرح والصوت والصورة", desc: "صوت لاين-أراي بجودة الحفلات، وشاشات LED عالية الدقة، وتبديل مباشر متعدد الكاميرات، وإضاءة ذكية لجماهير من 50 إلى أكثر من 5000 مندوب." },
  { title: "إدارة المتحدثين", desc: "استقطاب متحدثين دوليين وإقليميين، وتنسيق غرف الاستعداد، وتلبية المتطلبات التقنية، وجدولة البروفات، ودعم ميداني يوم الفعالية." },
  { title: "الفعاليات الهجينة والبث المباشر", desc: "إنتاج فعاليات هجينة سلس ببث مباشر متعدد المنصات، وتصويت فوري، وغرف تواصل افتراضية، وأرشيف محتوى عند الطلب." },
  { title: "الترجمة الفورية", desc: "كبائن ترجمة فورية بمعايير ISO للجلسات العربية-الإنجليزية ومتعددة اللغات، لخدمة الوفود الدبلوماسية والدولية." },
  { title: "تسجيل المندوبين", desc: "بوابات مندوبين بهوية مخصصة، وطباعة بطاقات RFID، وتذاكر جلسات بتحكم بالدخول، ولوحات تحليلات حضور لحظية." },
  { title: "بروتوكول كبار الشخصيات والدبلوماسيين", desc: "تنسيق المواكب، والتنسيق مع الحماية المباشرة، وإدارة المحيط الآمن، واستقبال كبار الشخصيات على المستوى الوزاري بإحاطات بروتوكولية كاملة." },
  { title: "إعلام ما بعد المؤتمر", desc: "أفلام مختصرة سينمائية، وتفريغ نصي حرفي، وتوزيع البيانات الصحفية، وحزم محتوى للتواصل الاجتماعي، وتقارير تنفيذية موجزة." },
];

const resourcesAr = [
  { title: "أفضل قاعات المؤتمرات في الرياض: مقارنة بين KAFD وKAICC والفيصلية", desc: "تحليل خبير لأبرز قاعات المؤتمرات في المملكة وسعاتها وقدراتها الصوتية والمرئية." },
  { title: "دليل تقنيات المؤتمرات الهجينة في السعودية 2025", desc: "اختيار منصة البث المناسبة وتقنية الترجمة ونظام إدارة المندوبين." },
  { title: "تفصيل تكاليف المؤتمرات: كم تبلغ تكلفة إدارة الفعاليات في المملكة؟", desc: "تحليل أسعار شفّاف لخدمات منظِّم المؤتمرات والإنتاج الصوتي والمرئي وإيجار القاعات في الرياض." },
  { title: "كيفية استخراج تصاريح هيئة الترفيه للمؤتمرات في السعودية", desc: "دليل خطوة بخطوة للامتثال التنظيمي وتسهيل تأشيرات المتحدثين والتصاريح الأمنية." },
];

const faqsAr = [
  { q: "ما الذي تشمله إدارة المؤتمرات الاحترافية؟", a: "تشمل إدارة المؤتمرات الاحترافية (خدمات PCO) اختيار القاعة والتفاوض عليها، وإعداد نظام التسجيل، وتنسيق المتحدثين، والإنتاج الصوتي والمرئي، والترجمة الفورية، وإدارة بروتوكول كبار الشخصيات، والتوظيف الميداني، وتنسيق الضيافة، وتقارير ما بعد الفعالية. وتقدّم إدارة الفعاليات السعودية كل ذلك تحت سقف واحد." },
  { q: "ما أفضل قاعات المؤتمرات في الرياض؟", a: "تشمل أبرز قاعات المؤتمرات في الرياض مركز مؤتمرات الملك عبدالله المالي (KAFD) — الأنسب للقمم الوزارية الكبرى — ومركز الملك عبدالعزيز الدولي للمؤتمرات (KAICC)، وفندق الفيصلية، وريتز كارلتون الرياض، وجي دبليو ماريوت الرياض. ولدينا شراكات مفضّلة مع جميع القاعات الكبرى." },
  { q: "كم تبلغ تكلفة إدارة المؤتمرات في السعودية؟", a: "تبدأ تكلفة إدارة المؤتمرات في السعودية من نحو 55,000 ريال لقمة ليوم واحد بـ 100 مندوب، وترتفع بشكل كبير للفعاليات متعددة الأيام بمتحدثين دوليين وبث هجين. تواصل معنا لعرض مخصّص يناسب عدد مندوبيك ومتطلباتك التقنية." },
  { q: "هل يمكنكم إدارة المؤتمرات الهجينة والافتراضية في السعودية؟", a: "نعم. تقدّم إدارة الفعاليات السعودية حلول مؤتمرات هجينة بجودة بثّ احترافية تشمل إنتاجًا متعدد الكاميرات، ومنصات بث مؤسسية (Zoom Webinar وHopin وRTMP مخصص)، وتغذية ترجمة فورية، وميزات تفاعلية للمشاركين داخل القاعة وعبر الإنترنت." },
  { q: "كم عدد المندوبين الذين يمكنكم إدارتهم في مؤتمر واحد؟", a: "لدينا خبرة في إدارة مؤتمرات من 50 إلى أكثر من 5000 مندوب. أنظمتنا لإدارة المندوبين قابلة للتوسّع، وقد نفّذنا قممًا حكومية بمسارات فرعية متعددة ومسارات وزارية لكبار الشخصيات تعمل في آنٍ واحد." },
  { q: "هل توفّرون ترجمة فورية في المؤتمرات؟", a: "نعم. نوفّر كبائن ترجمة فورية بمعايير ISO مع فرق مترجمين محترفين للعربية-الإنجليزية والفرنسية والصينية وغيرها. كما نوفّر الترجمة الفورية عن بُعد (RSI) للفعاليات الهجينة." },
  { q: "ما إعداد الصوت والصورة الذي أحتاجه لمؤتمر بـ 1000 شخص في الرياض؟", a: "يتطلب مؤتمر بـ 1000 شخص عادةً نظام صوت لاين-أراي رئيسيًا، وشاشتي مراقبة LED للمتحدث، وشاشة عرض مركزية أو شاشة LED فائقة العرض، و3 إلى 5 مواقع كاميرات للتبديل المباشر، وميكروفونات لاسلكية ومنصة، وأنظمة استجابة جمهور لاسلكية، ومديرًا تقنيًا متفرّغًا. وسيصمّم فريقنا متطلبات تقنية كاملة لقاعتك." },
  { q: "منظّم مؤتمرات قريب مني في الرياض", a: "تتخذ إدارة الفعاليات السعودية من الرياض مقرًا لها مع فريق إنتاج مؤتمرات متفرّغ تحت الطلب. نوفّر جولات ميدانية ومعاينات للقاعات ولوجستيات استجابة سريعة لأي متطلب مؤتمر في العاصمة." },
  { q: "أفضل شركة لإدارة المؤتمرات في السعودية", a: "تُعدّ إدارة الفعاليات السعودية من أفضل شركات إدارة المؤتمرات في السعودية، إذ نظّمت فعاليات لأرامكو السعودية وصندوق تنمية الموارد البشرية وسابك وعدة جهات وزارية. وتضمن منهجياتنا المتوائمة مع IAPCO وشركاؤنا في الصوت والصورة المعتمدون من ISO تنفيذًا بمستوى عالمي." },
  { q: "قبل كم من الوقت يجب أن أحجز منظّم مؤتمرات في الرياض؟", a: "لمؤتمر يضم أكثر من 200 مندوب بمتحدثين دوليين، نوصي بالتعاقد مع منظّم مؤتمرات احترافي قبل 4 إلى 6 أشهر على الأقل. يتيح ذلك وقتًا للتفاوض على القاعة، وتصاريح هيئة الترفيه، وتسهيل تأشيرات المتحدثين، وبناء أنظمة التسجيل وهوية الفعالية." },
];

const conferenceChallengesAr = [
  { c: "جدولة المسارات المتعددة وتدفّق المندوبين", s: "تُدمج الجلسات المتوازية واستراحات التواصل وأوقات الصلاة في أجندة رئيسية واحدة مع إرشاد واضح للاتجاهات، فيعرف جمهور يتجاوز 1000 مندوب أين يكون دائمًا." },
  { c: "الترجمة الفورية العربية-الإنجليزية", s: "كبائن مترجمين بمعايير ISO، ومترجمون متخصصون موثوقون، وتغذية صوتية مُختبرة تتيح للمندوبين وكبار الشخصيات ثنائيي اللغة متابعة كل جلسة دون تأخير." },
  { c: "لوجستيات المتحدثين وبروتوكول كبار الشخصيات", s: "حقائب إحاطة، وجدولة غرف الاستعداد، ومواعيد بروفات، وبروتوكول كبار الشخصيات يبقي الوزراء والمتحدثين الرئيسيين والمحاورين في الوقت وعلى الرسالة." },
  { c: "المشاركة الهجينة وعن بُعد", s: "بث بجودة احترافية، وأسئلة مباشرة، وأرشيف عند الطلب يوسّع الوصول إلى المندوبين حول العالم دون المساس بتجربة الحضور داخل القاعة." },
];

const cAr = {
  servLabel: "منظِّم المؤتمرات الاحترافي الأول في السعودية",
  servH2a: "نرتقي بإدارة المؤتمرات",
  servH2b: "في السعودية",
  servPpre: "بصفتنا منظِّم مؤتمرات احترافيًا (PCO) متكامل الخدمات، نقدّم إدارة شاملة للقمم الحكومية والمؤتمرات التجارية. من اختيار القاعات في ",
  servPmid: " إلى التوافق مع ",
  servPpost: "، يضمن فريقنا لكل مندوب تجربة تشغيلية بمستوى عالمي.",
  servLinkRiyadh: "مركز الملك عبدالله المالي بالرياض",
  servLinkVision: "رؤية 2030",
  formEyebrow: "اطلب عرض منظِّم مؤتمرات",
  formH2a: "خطّط لقمة بلا أخطاء.",
  formH2b: "من 50 إلى أكثر من 5000 مندوب.",
  formP: "شاركنا عدد المندوبين والتواريخ والأهداف، ويعيد إليك فريق المؤتمرات قائمة قاعات وخطة تقنية وعرض سعر مفصّلًا خلال ساعتين.",
  formBullets: [
    "اختيار القاعات في مركز الملك عبدالله المالي ومركز الملك عبدالعزيز والفيصلية",
    "تسجيل المندوبين وإصدار البطاقات والتحليلات",
    "بث هجين وترجمة فورية",
    "بروتوكول كبار الشخصيات والوزاري والدبلوماسي",
  ],
  formWhatsapp: "أو راسلنا عبر واتساب",
  resLabel: "معرفة المؤتمرات",
  resH2a: "موارد",
  resH2b: "التخطيط",
  resP: "موارد متخصصة للتنقّل في مشهد المؤتمرات والقمم بالمملكة.",
  resViewAll: "عرض كل المقالات",
  faqH2a: "الأسئلة الشائعة",
  faqH2b: "لإدارة المؤتمرات",
  faqP: "كل ما تحتاج معرفته عن تنظيم مؤتمر في السعودية",
  chLabel: "اعتبارات واقعية",
  chH2a: "تحديات المؤتمرات — ",
  chH2b: "نحلّها بالخبرة",
  chP: "تثير المؤتمرات الكبرى في السعودية تحدّيات تشغيلية متوقّعة. وإليك كيف يخطّط فريق منظِّم المؤتمرات لدينا لتجاوز أكثرها تكرارًا لدى المنظّمين.",
  challengeLabel: "التحدّي",
  featTitle: "المؤتمرات والقمم — مشاريع مختارة",
  viewProject: "عرض المشروع",
  ctaH3: "تخطّط لمؤتمر أو قمة؟",
  ctaP: "احجز استشارة مجانية أو تحدّث إلى فريق منظِّم المؤتمرات لدينا — نردّ عادةً خلال ساعتين.",
  ctaConsult: "احجز استشارة مجانية",
  ctaContact: "تواصل معنا",
  relTitle: "خدمات ذات صلة",
  relViewAll: "عرض كل الخدمات",
  learnMore: "اعرف المزيد",
  byCityTitle: "إدارة المؤتمرات حسب المدينة",
  byCityP: "خدمات منظِّم المؤتمرات وإدارة المؤتمرات في كبرى مدن المؤتمرات بالسعودية.",
  insightsTitle: "موارد تخطيط المؤتمرات",
  industryInsight: "رؤية قطاعية",
  readArticle: "اقرأ المقال",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Conference Management Services Riyadh",
      "description":
        "End-to-end conference management services in Riyadh, Saudi Arabia — B2B summits, PCO services, hybrid streaming, speaker management, and VIP protocol.",
      "provider": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com",
      },
      "areaServed": ["Riyadh", "Jeddah", "Dammam", "Saudi Arabia"],
      "serviceType": "Conference Management",
      "url": "https://saudieventmanagement.com/services/conferences",
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@type": "HowTo",
      "name": "How to organise a conference in Saudi Arabia",
      "step": [
        { "@type": "HowToStep", "text": "Define objectives, delegate profile, and budget range for your KSA conference." },
        { "@type": "HowToStep", "text": "Select and book a venue (KAFD, KAICC, or hotel conference centre) 4–6 months in advance." },
        { "@type": "HowToStep", "text": "Engage Saudi Event Management as your PCO for permit applications, speaker management, and AV production." },
        { "@type": "HowToStep", "text": "Launch delegate registration portal and build event agenda with simultaneous translation if required." },
        { "@type": "HowToStep", "text": "Execute the event with our on-site team and capture post-event media for distribution." },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Conference Management", "item": "https://saudieventmanagement.com/services/conferences" },
      ],
    },
    {
      "@type": "Organization",
      "name": "Saudi Event Management — Conference Division",
      "description": "IAPCO-aligned professional conference organiser (PCO) for government, corporate, and scientific summits in Saudi Arabia.",
      "memberOf": { "@type": "Organization", "name": "GEA Certified Event Organizers" },
    },
  ],
};

export default async function ConferencesPage() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <ScrollProgress />
        <WhatsAppButton />
        <Navbar />

        <InternalPageHero
          title={isAr ? "إدارة المؤتمرات" : "Conference Management"}
          titleHighlight={isAr ? "في السعودية" : "Saudi Arabia"}
          subtitle={
            isAr
              ? "منظِّم مؤتمرات احترافي (PCO) رائد في السعودية — قمم حكومية ومؤتمرات أعمال ومؤتمرات علمية لجهات تشمل أرامكو السعودية وصندوق تنمية الموارد البشرية وسابك."
              : "Leading Professional Conference Organiser (PCO) in Saudi Arabia — government summits, B2B conferences, and scientific congresses for entities including Saudi Aramco, HRDF, and SABIC."
          }
          backgroundImage="/services/premium_conference_management_hero.webp"
          imageAlt="Large-scale international conference in Saudi Arabia with massive LED stage"
          enableParallax
          badge={isAr ? "المؤتمرات والقمم" : "Conferences & Summits"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "المؤتمرات" : "Conferences" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "200+", label: "Conferences Delivered" },
            { value: "50K+", label: "Delegates Managed" },
            { value: "IAPCO", label: "Aligned PCO Standards" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pco-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              Request a PCO Proposal
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> Speak to a Conference Director
            </a>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={22} />
                </div>
                <div>
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">IAPCO-Aligned PCO</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Best-Practice Conference Standards</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>SAUDI ARAMCO</span>
                <span>HRDF</span>
                <span>SABIC</span>
                <span>KAFD</span>
              </div>
              <div className="text-xs text-[var(--primary)] font-bold tracking-wide uppercase">
                &quot;Trusted PCO for Vision 2030 Summits&quot;
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/exhibition_hall_riyadh.webp')" }} aria-label="Conference visual showcase">
          <div aria-hidden className="absolute inset-0 bg-slate-900/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Conference Mastery</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Conference Mastery</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Conference Mastery</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px white' }}>Vision 2030</span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                {isAr ? cAr.servLabel : "Saudi Arabia's Premier PCO"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? cAr.servH2a : "Elevating Conference Management"} <br className="hidden md:block" />
                <span className="text-[var(--primary)]">{isAr ? cAr.servH2b : "in Saudi Arabia"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    {cAr.servPpre}
                    <Link href={`${arHref}/locations/riyadh`} className="text-[var(--primary)] hover:underline font-semibold">{cAr.servLinkRiyadh}</Link>
                    {cAr.servPmid}
                    <Link href={`${arHref}/portfolio/vision-2030`} className="text-[var(--primary)] hover:underline font-semibold">{cAr.servLinkVision}</Link>
                    {cAr.servPpost}
                  </>
                ) : (
                  <>
                    As a fully integrated Professional Conference Organiser (PCO), we provide end-to-end management for government summits and commercial congresses. From venue sourcing at <Link href="/locations/riyadh" className="text-[var(--primary)] hover:underline font-semibold">Riyadh&apos;s KAFD</Link> to <Link href="/portfolio/vision-2030" className="text-[var(--primary)] hover:underline font-semibold">Vision 2030</Link> alignments, our team ensures every delegate experiences world-class operational excellence.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200/80 p-7 rounded-2xl hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-[var(--primary)] transition-colors">
                    <s.icon size={22} className="text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{isAr ? servicesAr[i].title : s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? servicesAr[i].desc : s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD FORM / PCO ENQUIRY ── */}
        <section id="pco-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_2.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? cAr.formEyebrow : "Request a PCO Proposal"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {cAr.formH2a}<br />
                    <span className="text-[#C5A880]">{cAr.formH2b}</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Plan a flawless summit.<br />
                    <span className="text-[#C5A880]">From 50 to 5,000+ delegates.</span>
                  </h2>
                )}
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? cAr.formP
                    : "Share your delegate count, dates, and objectives. Our conference team returns a venue shortlist, technical plan, and an itemised PCO quote within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? cAr.formBullets
                    : [
                    "Venue sourcing at KAFD, KAICC & Al Faisaliah",
                    "Delegate registration, badging & analytics",
                    "Hybrid streaming & simultaneous translation",
                    "VIP, ministerial & diplomatic protocol",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20organise%20a%20conference%20in%20Saudi%20Arabia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? cAr.formWhatsapp : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="conferences_page"
                defaultEventType="Corporate Summit / Conference"
                eyebrow={isAr ? "استفسار مؤتمر" : "Conference Enquiry"}
                heading={isAr ? "خطّط لمؤتمرك أو قمتك" : "Plan your conference or summit"}
                subheading={isAr ? "سيردّ فريق منظِّم المؤتمرات خلال ساعتين بقائمة قاعات وعرض سعر مفصّل." : "Our PCO team will respond within 2 hours with a venue shortlist and an itemised quote."}
                submitLabel={isAr ? "اطلب عرض المؤتمر" : "Request Conference Proposal"}
                eventTypeOptions={[
                  "B2B / Commercial Summit",
                  "Government / Ministerial Conference",
                  "Scientific / Medical Congress",
                  "Hybrid / Virtual Conference",
                  "Awards & Gala Conference",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-24 md:py-28 bg-white border-b border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <span className="section-label">
                  <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                  {isAr ? cAr.resLabel : "Conference Intelligence"}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {isAr ? cAr.resH2a : "Planning"} <br />
                  <span className="text-[var(--primary)]">{isAr ? cAr.resH2b : "resources"}</span>
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {isAr ? cAr.resP : "Expert resources for navigating the conference and summit landscape in the Kingdom."}
                </p>
                <Link href={`${arHref}/blog`} className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">
                  {isAr ? cAr.resViewAll : "View All Articles"}
                </Link>
                <div className="pt-6 border-t border-neutral-200">
                  <p className="text-neutral-900 font-bold text-sm">{isAr ? "د. نادية الراشدي" : "Dr. Nadia Al-Rashidi"}</p>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-widest">{isAr ? "مديرة استراتيجية المؤتمرات" : "Conference Strategy Director"}</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((r, i) => (
                  <div
                    key={i}
                    className="p-6 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl hover:border-[var(--primary)]/30 hover:shadow-[0_8px_30px_rgba(13,107,78,0.07)] transition-all cursor-pointer group"
                  >
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {isAr ? resourcesAr[i].title : r.title}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{isAr ? resourcesAr[i].desc : r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-24 md:py-28 bg-[var(--surface-tinted)] border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-900">
                  الريادة في <br />
                  <span className="text-[var(--primary)]">إدارة المؤتمرات</span>
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  تُعدّ إدارة الفعاليات السعودية من أبرز{" "}
                  <strong className="text-neutral-900">شركات إدارة المؤتمرات في الرياض</strong>، حيث نقدم حلولاً شاملة
                  لتنظيم المؤتمرات الحكومية والتجارية والعلمية. نتولى جميع جوانب التخطيط من
                  إدارة المتحدثين وأنظمة التسجيل إلى الإنتاج التقني المتكامل.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  {[
                    { label: "مؤتمرات منفذة", value: "200+" },
                    { label: "مندوب مُدار", value: "50K+" },
                    { label: "سنوات خبرة", value: "15+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-[var(--primary)]">{stat.value}</p>
                      <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { ar: "إدارة مؤتمرات الرياض", en: "Conference Management Riyadh" },
                  { ar: "تنظيم مؤتمرات جدة", en: "Conference Organizer Jeddah" },
                  { ar: "مؤتمرات الأعمال السعودية", en: "B2B Summits KSA" },
                  { ar: "خدمات المؤتمرات الهجينة", en: "Hybrid Conference Services" },
                ].map((item) => (
                  <div key={item.en} className="bg-white border border-neutral-200/80 rounded-xl p-5">
                    <p className="text-[var(--primary)] font-bold text-sm mb-1">{item.ar}</p>
                    <p className="text-neutral-500 text-xs">{item.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? cAr.faqH2a : "Conference management"} <span className="text-[var(--primary)]">{isAr ? cAr.faqH2b : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-xs uppercase tracking-widest">
                {isAr ? cAr.faqP : "Everything you need to know about organising a conference in Saudi Arabia"}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-neutral-50/80 border border-neutral-200/80 p-7 rounded-2xl">
                  <h3 className="text-base font-bold text-neutral-900 mb-3">{isAr ? faqsAr[i].q : faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? faqsAr[i].a : faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? cAr.chLabel : "Real-World Considerations"}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{isAr ? cAr.chH2a : "Conference challenges — "}<span className="text-[var(--primary)]">{isAr ? cAr.chH2b : "solved with experience"}</span></h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? cAr.chP : "Large-scale conferences in Saudi Arabia raise predictable operational risks. Here is how our PCO team plans around the ones organisers ask about most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? conferenceChallengesAr
                : [
                { c: "Multi-track scheduling & delegate flow", s: "Parallel sessions, networking breaks, and prayer times are sequenced into one master agenda with clear wayfinding, so a 1,000+ delegate audience always knows where to be." },
                { c: "Simultaneous Arabic–English interpretation", s: "ISO-standard interpreter booths, vetted subject-matter interpreters, and tested audio feeds let bilingual delegates and dignitaries follow every session without lag." },
                { c: "Speaker & VIP protocol logistics", s: "Briefing packs, green-room scheduling, rehearsal slots, and dignitary protocol keep ministers, keynote speakers, and panelists on time and on message." },
                { c: "Hybrid & remote participation", s: "Broadcast-grade streaming, live Q&A, and on-demand archives extend reach to global delegates without compromising the in-room experience." },
              ]).map((item) => (
                <div key={item.c} className="bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{isAr ? cAr.challengeLabel : "Challenge"}</span>
                  <h3 className="font-bold text-neutral-900 text-base mt-1 mb-3">{item.c}</h3>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-neutral-600 text-sm leading-relaxed">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? cAr.featTitle : "Conferences & Summits — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "قمة التقنية العالمية", slug: "global-tech-summit", desc: "مؤتمر تقني على مدى أيام بإنتاج مسرح رئيسي وبث هجين وإدارة مندوبين." },
                { title: "قمة جدة التنفيذية", slug: "executive-summit-jeddah", desc: "قمة لكبار التنفيذيين على البحر الأحمر بخدمات منظِّم مؤتمرات متكاملة وبروتوكول كبار الشخصيات." },
                { title: "قمة الرياض الحكومية", slug: "riyadh-government-summit", desc: "قمة على مستوى وزاري بترجمة فورية وبروتوكول حكومي." },
                  ]
                : [
                { title: "Global Tech Summit", slug: "global-tech-summit", desc: "A multi-day technology conference with main-stage production, hybrid streaming, and delegate management." },
                { title: "Executive Summit Jeddah", slug: "executive-summit-jeddah", desc: "A senior executive summit by the Red Sea with full PCO services and VIP protocol." },
                { title: "Riyadh Government Summit", slug: "riyadh-government-summit", desc: "A ministerial-level summit with simultaneous interpretation and government protocol." },
              ]).map((p) => (
                <Link key={p.slug} href={`${arHref}/portfolio/${p.slug}`} className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
                  <h4 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? cAr.viewProject : "View Project"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-neutral-200/80 rounded-2xl p-8">
              <div>
                <h3 className="text-neutral-900 font-bold text-lg">{isAr ? cAr.ctaH3 : "Planning a conference or summit?"}</h3>
                <p className="text-neutral-500 text-sm mt-1">{isAr ? cAr.ctaP : "Book a free consultation or speak with our PCO team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? cAr.ctaConsult : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? cAr.ctaContact : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-neutral-500 text-sm mt-6">تصفّح <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو استكشف <Link href={`${arHref}/services/corporate-events`} className="text-[var(--primary)] font-semibold hover:underline">إدارة فعاليات الشركات</Link>.</p>
            ) : (
              <p className="text-neutral-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore <Link href="/services/corporate-events" className="text-[var(--primary)] font-semibold hover:underline">corporate event management</Link>.</p>
            )}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">{isAr ? cAr.relTitle : "Related Services"}</h2>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? cAr.relViewAll : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isAr
                ? [
                { title: "فعاليات الشركات", slug: "corporate-events", desc: "الجمعيات العمومية وحفلات العشاء والملتقيات التنفيذية للشركات السعودية." },
                { title: "المعارض والمعارض التجارية", slug: "exhibitions", desc: "تصميم الأجنحة وبناء المنصات وإدارة المعارض التجارية بالكامل." },
                { title: "الإنتاج الفعّالياتي", slug: "event-production", desc: "مسرح وصوت وصورة وإضاءة وإنتاج تقني لأي حجم." },
                  ]
                : [
                { title: "Corporate Events", slug: "corporate-events", desc: "AGMs, gala dinners, and executive retreats for Saudi corporates." },
                { title: "Exhibitions & Trade Shows", slug: "exhibitions", desc: "Booth design, stand building, and full trade show management." },
                { title: "Event Production", slug: "event-production", desc: "Stage, AV, lighting, and technical production for any scale." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                    {isAr ? cAr.learnMore : "Learn More"} <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conference Locations ── */}
        <section className="py-16 bg-white border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">{isAr ? cAr.byCityTitle : "Conference Management by City"}</h2>
            <p className="text-neutral-400 text-xs mb-8">{isAr ? cAr.byCityP : "PCO services and conference management across Saudi Arabia's major convention cities."}</p>
            <div className="flex flex-wrap gap-3">
              {(isAr
                ? [
                { name: "إدارة المؤتمرات في الرياض", href: "/locations/riyadh" },
                { name: "إدارة المؤتمرات في جدة", href: "/locations/jeddah" },
                { name: "إدارة المؤتمرات في الدمام", href: "/locations/dammam" },
                  ]
                : [
                { name: "Conference Management Riyadh", href: "/locations/riyadh" },
                { name: "Conference Management Jeddah", href: "/locations/jeddah" },
                { name: "Conference Management Dammam", href: "/locations/dammam" },
              ]).map((loc) => (
                <Link
                  key={loc.href}
                  href={`${arHref}${loc.href}`}
                  className="px-5 py-2.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conference Insights ── */}
        <section className="py-20 bg-neutral-50/70 border-t border-neutral-200/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-sm font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? cAr.insightsTitle : "Conference Planning Resources"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", slug: "mice-tourism-saudi-arabia-complete-guide-2026", desc: "Everything you need to know about Saudi Arabia's booming MICE industry — market size, key venues, and Vision 2030 strategy." },
                { title: "State of the MICE Industry in Saudi Arabia 2026", slug: "state-of-mice-industry-saudi-arabia-2026", desc: "Exclusive analysis of the MICE sector — explosive growth metrics, super-venues, and sustainability requirements." },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`${arHref}/blog/${post.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <span className="text-[var(--primary)] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">{isAr ? cAr.industryInsight : "Industry Insight"}</span>
                  <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3 line-clamp-2">{post.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                    {isAr ? cAr.readArticle : "Read Article"} <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
