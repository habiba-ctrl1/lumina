import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getLocale } from "next-intl/server";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import PartnerNetworkGallery from "@/components/PartnerNetworkGallery";
import {
  Zap, Music, Monitor, Camera, Layers, PenTool,
  Cpu, Lightbulb, ChevronRight, Award, CheckCircle2, Phone,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/event-production`;

  return {
    title: isAr
      ? { absolute: "شركة إنتاج فعاليات في السعودية | المسرح والصوت والإضاءة بالرياض | إدارة الفعاليات السعودية" }
      : "Event Production Company Saudi Arabia | Stage, Sound & Lighting Riyadh",
    description: isAr
      ? "شركة رائدة في الإنتاج الفعّالياتي بالسعودية. تصنيع مسارح مخصّصة، وهندسة صوت بجودة الحفلات، وتصميم إضاءة ذكية، وشاشات LED والعرض الضوئي للفعاليات المؤسسية والفاخرة في الرياض وجدة."
      : "Premier event production company in Saudi Arabia. Custom stage fabrication, concert-grade sound engineering, intelligent lighting design, LED & projection mapping for corporate and luxury events in Riyadh & Jeddah.",
    keywords: [
      "Event production company Saudi Arabia",
      "Stage design Riyadh",
      "AV production KSA",
      "Sound system rental Riyadh",
      "LED projection mapping Saudi Arabia",
      "Lighting design events Riyadh",
      "Event production Jeddah",
      "إنتاج فعاليات الرياض",
      "شركة إنتاج أحداث السعودية",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates("/services/event-production"),
    },
    openGraph: {
      title: isAr
        ? "شركة إنتاج فعاليات في السعودية | إدارة الفعاليات السعودية"
        : "Event Production Company Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "تصميم مسارح مخصّص، وصوت وصورة بجودة الحفلات، وإضاءة ذكية، وعرض ضوئي غامر للفعاليات في عموم السعودية."
        : "Custom stage design, concert-grade AV, intelligent lighting, and immersive projection mapping for events across Saudi Arabia.",
      url: canonicalUrl,
      images: [{ url: "/services/event_production_stage_riyadh.webp", width: 1200, height: 630, alt: "Event production company Saudi Arabia — concert-grade stage, LED wall and lighting at a Riyadh event" }],
    },
  };
}

const services = [
  {
    icon: Layers,
    title: "Stage Design & Fabrication",
    desc: "Custom architectural stage builds from 10m to 100m wide — bespoke structures, multi-level platforms, and scenic set fabrication using structural steel, acrylic, and timber.",
  },
  {
    icon: Lightbulb,
    title: "Intelligent Lighting Design",
    desc: "Dynamic RGBW moving-head fixtures, atmospheric haze, architectural wash, gobo projection, and pixel-mapped LED strips creating immersive environments at any scale.",
  },
  {
    icon: Music,
    title: "Concert-Grade Sound Engineering",
    desc: "Line-array speaker systems, RF wireless management, acoustic room tuning, in-ear monitor systems, and professional FOH and monitor mixing for flawless clarity.",
  },
  {
    icon: Monitor,
    title: "LED & Projection Mapping",
    desc: "Ultra-high-resolution LED walls, curved and cylindrical LED installations, 3D architectural projection mapping, and real-time generative content for immersive experiences.",
  },
  {
    icon: Zap,
    title: "Power & Structural Rigging",
    desc: "Site-rated generator supply, clean power distribution systems, certified structural rigging, point load calculations, and roof truss engineering.",
  },
  {
    icon: Camera,
    title: "Live Content & Broadcasting",
    desc: "Multi-camera live switching, broadcast-quality graphics playback, real-time video compositing, IMAG screens, and simultaneous streaming infrastructure.",
  },
  {
    icon: PenTool,
    title: "Themed Environment Design",
    desc: "Custom scenic elements, bespoke floral installations, branded experiential design, entrance activation builds, and full-scale themed decor concepts.",
  },
  {
    icon: Cpu,
    title: "Specialist Crew & Management",
    desc: "Expert on-site technical directors, stage managers, riggers, AV operators, lighting programmers, and RF coordinators — certified and experienced in KSA environments.",
  },
];

const priceGuide = [
  { category: "AV Production (full-day event)", from: "SAR 18,000", inclusions: "Sound, screens, lighting, 2 techs" },
  { category: "Stage Design & Build", from: "SAR 35,000", inclusions: "3D render, fabrication, install, strike" },
  { category: "LED Wall Rental", from: "SAR 12,000", inclusions: "P2.6 pixel pitch, rigging, operator" },
  { category: "Projection Mapping", from: "SAR 25,000", inclusions: "Content creation, mapping, show operation" },
  { category: "Lighting Design Package", from: "SAR 15,000", inclusions: "Intelligent fixtures, programmer, dimmer racks" },
  { category: "Live Broadcast Setup", from: "SAR 20,000", inclusions: "Cameras, vision mixer, graphics, stream" },
];

const resources = [
  {
    title: "Event Production Cost Guide Saudi Arabia 2026",
    desc: "Transparent pricing for AV systems, stage design, LED walls, lighting rigs, and projection mapping.",
    href: "/blog/event-production-cost-guide-saudi-arabia-2026",
  },
  {
    title: "Best Corporate Event Venues in Riyadh 2026",
    desc: "KAFD Conference Center, Ritz-Carlton, and Four Seasons compared for AV specs and booking timelines.",
    href: "/blog/best-corporate-event-venues-riyadh-2026",
  },
  {
    title: "2026 Event Decor Trends Redefining Saudi Arabia",
    desc: "Futuristic minimalism, cultural fusion, and immersive 360° environments dominating the Saudi market.",
    href: "/blog/2026-exceptional-event-decor-trends-saudi-arabia",
  },
  {
    title: "The Future of Event Production in Saudi Arabia",
    desc: "How cutting-edge technology and sustainable practices are transforming event production under Vision 2030.",
    href: "/blog/future-event-production-saudi-arabia-technology-sustainability",
  },
];

const faqs = [
  {
    q: "What is event production?",
    a: "Event production encompasses all the technical elements that bring an event to life: stage design, sound engineering, lighting, visual displays (LED and projection), structural rigging, power supply, and live broadcasting. Saudi Event Management provides all disciplines in-house for seamless co-ordination.",
  },
  {
    q: "How much does event production cost in Saudi Arabia?",
    a: "Event production costs in Saudi Arabia vary significantly by scale and complexity. A single-day corporate event AV package starts from around SAR 18,000. A full-scale stage fabrication and production for a 1,000-person gala or concert may range from SAR 150,000 to SAR 500,000+. Contact us for a detailed itemised quote.",
  },
  {
    q: "Can you provide sound systems for outdoor events in Saudi Arabia?",
    a: "Yes. We supply weather-rated line-array systems, delay towers, and subwoofer arrays designed for outdoor environments, including desert locations in AlUla and beachfront venues along the Red Sea. All systems include on-site sound engineers and RF co-ordination.",
  },
  {
    q: "Can you handle projection mapping at AlUla or Diriyah heritage sites?",
    a: "Yes. Saudi Event Management has delivered projection mapping activations at heritage venues. We work closely with Royal Commission for AlUla (RCU) and Diriyah Gate Development Authority (DGDA) for site permissions and zero-impact production protocols.",
  },
  {
    q: "Do you work on National Day and Riyadh Season shows?",
    a: "Yes. We coordinate stage fabrication, LED walls, intelligent lighting, and full AV production for National Day (September 23) and Riyadh Season-scale public events and brand activations.",
  },
  {
    q: "What is the largest stage you have built in Saudi Arabia?",
    a: "Our largest stage builds have included main stages spanning 60 metres wide for concert-scale productions. Our fabrication team uses certified structural steel and provides full engineering drawings and load calculations for venue approval.",
  },
  {
    q: "event production company near me Riyadh",
    a: "Saudi Event Management's production warehouse and team are based in Riyadh, making us the ideal choice for any event production requirement in the capital — from a corporate theatre setup to a concert-scale festival production.",
  },
  {
    q: "sound system rental Riyadh",
    a: "We provide concert-grade sound system rental in Riyadh including line-array systems (L-Acoustics, d&b audiotechnik), wireless microphone packages, in-ear monitor systems, and full AV operator support for events of any size.",
  },
  {
    q: "How far in advance should I book an event production company?",
    a: "For complex productions with custom stage builds, we recommend 8–12 weeks' lead time minimum. For standard AV packages, 3–4 weeks is usually sufficient. For large-scale concerts or National Day activations, 3–6 months is ideal to allow for design, permitting, and fabrication.",
  },
];

/* ─── Arabic body content (long-form). Parallel to the English arrays; `faqs`
       itself stays untouched so the FAQ schema below is unchanged. ─── */
const servicesAr = [
  { title: "تصميم وتصنيع المسارح", desc: "بناء مسارح معمارية مخصّصة من 10 إلى 100 متر عرضًا — هياكل مخصّصة، ومنصّات متعددة المستويات، وتصنيع ديكورات مشهدية بالفولاذ الإنشائي والأكريليك والخشب." },
  { title: "تصميم الإضاءة الذكية", desc: "إضاءة متحركة RGBW ديناميكية، وضباب أجواء، وغسيل معماري، وإسقاط gobo، وشرائط LED مُخطّطة بالبكسل لبيئات غامرة بأي حجم." },
  { title: "هندسة الصوت بجودة الحفلات", desc: "أنظمة سماعات لاين-أراي، وإدارة لاسلكية RF، وضبط صوتي للقاعات، وأنظمة مراقبة داخل الأذن، وخلط احترافي للصوت الأمامي والمراقبة لوضوح لا تشوبه شائبة." },
  { title: "شاشات LED وإسقاط الصور", desc: "جدران LED فائقة الدقة، وتركيبات LED منحنية وأسطوانية، وإسقاط ثلاثي الأبعاد على الأبنية، ومحتوى توليدي لحظي لتجارب غامرة." },
  { title: "الطاقة والتركيب الإنشائي", desc: "إمداد مولّدات مناسب للموقع، وأنظمة توزيع طاقة نظيفة، وتركيب إنشائي معتمد، وحسابات أحمال النقاط، وهندسة جمالونات الأسقف." },
  { title: "المحتوى المباشر والبث", desc: "تبديل مباشر متعدد الكاميرات، وتشغيل رسوميات بجودة البث، وتركيب فيديو لحظي، وشاشات IMAG، وبنية بث متزامن." },
  { title: "تصميم البيئات المُسرحة", desc: "عناصر مشهدية مخصّصة، وتركيبات أزهار مخصّصة، وتصميم تجريبي يحمل هوية العلامة، وبناء تفعيلات المداخل، ومفاهيم ديكور مُسرحة كاملة." },
  { title: "الطاقم المتخصص والإدارة", desc: "مديرون فنيون ميدانيون، ومديرو مسرح، وفنيو تركيب، ومشغّلو صوت وصورة، ومبرمجو إضاءة، ومنسّقو RF — معتمدون وذوو خبرة في بيئات المملكة." },
];

const priceGuideAr = [
  { category: "إنتاج صوت وصورة (فعالية ليوم كامل)", inclusions: "صوت، شاشات، إضاءة، فنيان" },
  { category: "تصميم وبناء المسرح", inclusions: "تصميم ثلاثي الأبعاد، تصنيع، تركيب، فك" },
  { category: "تأجير جدار LED", inclusions: "كثافة بكسل P2.6، تركيب، مشغّل" },
  { category: "إسقاط الصور على المباني", inclusions: "إنشاء محتوى، إسقاط، تشغيل العرض" },
  { category: "باقة تصميم الإضاءة", inclusions: "إضاءة ذكية، مبرمج، وحدات تعتيم" },
  { category: "إعداد بث مباشر", inclusions: "كاميرات، مازج فيديو، رسوميات، بث" },
];

const resourcesAr = [
  { title: "دليل تكاليف الإنتاج الفعّالياتي في السعودية 2026", desc: "تسعير شفّاف لأنظمة الصوت والصورة وتصميم المسرح وجدران LED ومعدات الإضاءة وإسقاط الصور." },
  { title: "أفضل قاعات فعاليات الشركات في الرياض 2026", desc: "مقارنة بين مركز الملك عبدالله المالي وريتز كارلتون وفورسيزونز من حيث مواصفات الصوت والصورة وجداول الحجز." },
  { title: "اتجاهات ديكور الفعاليات 2026 التي تعيد تعريف السعودية", desc: "البساطة المستقبلية، والمزج الثقافي، والبيئات الغامرة 360° المهيمنة على السوق السعودي." },
  { title: "مستقبل الإنتاج الفعّالياتي في السعودية", desc: "كيف تحوّل التقنية المتقدمة والممارسات المستدامة الإنتاج الفعّالياتي وفق رؤية 2030." },
];

const faqsAr = [
  { q: "ما هو الإنتاج الفعّالياتي؟", a: "يشمل الإنتاج الفعّالياتي جميع العناصر التقنية التي تُحيي الفعالية: تصميم المسرح، وهندسة الصوت، والإضاءة، والعروض المرئية (LED والإسقاط)، والتركيب الإنشائي، وإمداد الطاقة، والبث المباشر. وتقدّم إدارة الفعاليات السعودية كل التخصصات داخليًا لتنسيق سلس." },
  { q: "كم تبلغ تكلفة الإنتاج الفعّالياتي في السعودية؟", a: "تتفاوت تكاليف الإنتاج الفعّالياتي في السعودية كثيرًا حسب الحجم والتعقيد. تبدأ باقة الصوت والصورة لفعالية شركات ليوم واحد من نحو 18,000 ريال. أما تصنيع مسرح وإنتاج متكامل لحفل أو حفلة موسيقية بـ 1000 شخص فقد يتراوح من 150,000 إلى أكثر من 500,000 ريال. تواصل معنا لعرض مفصّل." },
  { q: "هل توفّرون أنظمة صوت للفعاليات الخارجية في السعودية؟", a: "نعم. نوفّر أنظمة لاين-أراي مقاومة للطقس، وأبراج تأخير، ومصفوفات مضخّمات صوت مصمّمة للبيئات الخارجية، بما في ذلك مواقع الصحراء في العلا والقاعات الشاطئية على البحر الأحمر. وتشمل جميع الأنظمة مهندسي صوت ميدانيين وتنسيق RF." },
  { q: "هل يمكنكم تنفيذ إسقاط الصور في مواقع العلا أو الدرعية التراثية؟", a: "نعم. نفّذت إدارة الفعاليات السعودية تفعيلات إسقاط صور في مواقع تراثية. ونعمل عن قرب مع الهيئة الملكية للعلا وهيئة تطوير بوابة الدرعية لتصاريح المواقع وبروتوكولات إنتاج دون أثر." },
  { q: "هل تعملون في عروض اليوم الوطني وموسم الرياض؟", a: "نعم. ننسّق تصنيع المسارح وجدران LED والإضاءة الذكية والإنتاج الصوتي والمرئي المتكامل لفعاليات بحجم اليوم الوطني (23 سبتمبر) وموسم الرياض وتفعيلات العلامات الكبرى." },
  { q: "ما أكبر مسرح بنيتموه في السعودية؟", a: "شملت أكبر مسارحنا منصّات رئيسية بعرض 60 مترًا لإنتاجات بحجم الحفلات الموسيقية. ويستخدم فريق التصنيع لدينا فولاذًا إنشائيًا معتمدًا ويوفّر رسومات هندسية كاملة وحسابات أحمال لموافقة القاعة." },
  { q: "شركة إنتاج فعاليات قريبة مني في الرياض", a: "يقع مستودع وفريق الإنتاج لدى إدارة الفعاليات السعودية في الرياض، ما يجعلنا الخيار الأمثل لأي متطلب إنتاج فعاليات في العاصمة — من إعداد مسرح مؤسسي إلى إنتاج مهرجان بحجم الحفلات." },
  { q: "تأجير أنظمة صوت في الرياض", a: "نوفّر تأجير أنظمة صوت بجودة الحفلات في الرياض تشمل أنظمة لاين-أراي (L-Acoustics وd&b audiotechnik)، وحزم ميكروفونات لاسلكية، وأنظمة مراقبة داخل الأذن، ودعم مشغّلي صوت وصورة لفعاليات بأي حجم." },
  { q: "قبل كم من الوقت يجب أن أحجز شركة إنتاج فعاليات؟", a: "للإنتاجات المعقّدة ببناء مسارح مخصّصة، نوصي بمهلة 8 إلى 12 أسبوعًا على الأقل. ولباقات الصوت والصورة القياسية، عادةً 3 إلى 4 أسابيع تكفي. أما الحفلات الكبرى أو تفعيلات اليوم الوطني، فمن 3 إلى 6 أشهر مثالية لإتاحة وقت للتصميم والتصاريح والتصنيع." },
];

const challengesAr = [
  { c: "حدود الطاقة والتركيب في القاعة", s: "المسوحات الميدانية، وطاقة المولّدات، والتركيب المعتمد تضمن ألّا تحدّ القيود الكهربائية والإنشائية للقاعة من العرض الذي صمّمته." },
  { c: "نوافذ الإدخال والتبديل الضيّقة", s: "المسرح المعياري، وضفائر الكابلات المُعلَّمة، وفريق مُدرَّب بجدول استدعاء تتيح لنا البناء والاختبار والفك ضمن نوافذ القاعة المحددة." },
  { c: "الموثوقية للحظات المباشرة بلا إعادة", s: "صوت احتياطي، وخوادم وسائط احتياطية، ومعدات بديلة جاهزة تحمي الكلمات الرئيسية وإطلاق المنتجات والبث المباشر من نقاط فشل مفردة." },
  { c: "الطموح الإبداعي مقابل الميزانية والفيزياء", s: "يصمّم فريقنا نماذج أولية ويهندس القيمة بحيث تكون اللحظة المبهرة قابلة للتحقيق وضمن الميزانية وآمنة التنفيذ." },
];

/* Section-level Arabic copy. */
const cAr = {
  ctaQuote: "احصل على عرض إنتاج",
  ctaTalk: "تحدّث إلى منتج",
  credISO: "+20 مورد معتمد",
  credISOsub: "شبكة إنتاج تقني موثقة",
  credQuote: "شريك تقني — تفعيلات موسم الرياض",
  servLabel: "الإنتاج التقني الرائد في السعودية",
  servH2a: "قدرات الإنتاج",
  servH2b: "الداخلية",
  servPpre: "بصفتنا شريكًا تقنيًا رئيسيًا لفعاليات ",
  servLinkVision: "رؤية 2030",
  servPmid: "، نحتفظ بكل تخصص تقني تحت سقف واحد — من تصنيع المسارح الإنشائي إلى البث المباشر بجودة احترافية. وسواء بدعم ",
  servLinkConf: "المؤتمرات الكبرى في الرياض",
  servPmid2: " أو تنفيذ إعدادات صوت وصورة معقّدة لـ",
  servLinkDest: "مهرجانات الصحراء النائية في العلا",
  servPpost: "، نضمن تنفيذًا لا تشوبه شائبة.",
  priceLabel: "تسعير شفّاف",
  priceH2a: "دليل",
  priceH2b: "الاستثمار",
  priceSub: "أسعار إنتاج إرشادية لعام 2026 — السعودية",
  thService: "الخدمة",
  thFrom: "يبدأ من",
  thIncl: "أهم ما يشمله",
  priceFoot: "يعتمد السعر النهائي على الحجم والقاعة والمواصفات التقنية. اطلب عرضًا مفصّلًا أدناه.",
  formEyebrow: "احصل على عرض إنتاج",
  formH2a: "أخبرنا بما تبنيه.",
  formH2b: "ونحن نهندسه.",
  formP: "أرسل لنا ملخّص فعاليتك ويعيد إليك مديرنا الفني متطلبات تقنية مفصّلة وعرضًا مُبوّبًا — مسرح، وصوت، وإضاءة، وLED، وطاقة، وطاقم، كلّها مملوكة داخليًا.",
  formBullets: [
    "تصميم مسرح ثلاثي الأبعاد مجاني مع كل عرض",
    "تركيب معتمد وحسابات أحمال إنشائية",
    "مخزون L-Acoustics وRobe بجودة الحفلات",
    "مدير فني ميداني وطاقم كامل مشمولان",
  ],
  formWhatsapp: "أو راسلنا عبر واتساب",
  khLabel: "مركز المعرفة",
  khH2a: "مركز معرفة",
  khH2b: "الإنتاج",
  khP: "أدلّة تقنية لمنتجي الفعاليات ومشغّلي القاعات وفرق العلامات الذين يخطّطون لفعاليات في المملكة.",
  khViewAll: "عرض كل المقالات",
  khAuthorTitle: "رئيس الإنتاج التقني",
  faqH2a: "الأسئلة الشائعة",
  faqH2b: "للإنتاج الفعّالياتي",
  faqSub: "أسئلة تقنية يجيب عنها خبراء الإنتاج لدينا",
  chLabel: "إنتاج واقعي",
  chH2a: "تحديات الإنتاج — ",
  chH2b: "نحلّها بالخبرة",
  chP: "لا يترك الإنتاج المباشر مجالًا للخطأ. وإليك كيف يخطّط فريقنا التقني لتفادي أهم نقاط الفشل.",
  challengeLabel: "التحدّي",
  featTitle: "الإنتاج في الميدان — مشاريع مختارة",
  viewProject: "عرض المشروع",
  ctaH3: "تخطّط لإنتاج؟",
  ctaP: "احجز استشارة مجانية أو تحدّث إلى فريق الإنتاج لدينا — نردّ عادةً خلال ساعتين.",
  ctaConsult: "احجز استشارة مجانية",
  ctaContact: "تواصل معنا",
  relTitle: "خدمات ذات صلة",
  relViewAll: "عرض كل الخدمات",
  learnMore: "اعرف المزيد",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Event Production Company Saudi Arabia",
      "description":
        "Bespoke event production services including custom stage fabrication, concert-grade sound systems, intelligent lighting design, and 360° LED projection mapping across Saudi Arabia.",
      "provider": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "url": "https://saudieventmanagement.com",
      },
      "areaServed": ["Riyadh", "Jeddah", "Dammam", "AlUla", "Saudi Arabia"],
      "serviceType": "Event Production",
      "url": "https://saudieventmanagement.com/services/event-production",
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
      "name": "How to book event production services in Saudi Arabia",
      "step": [
        { "@type": "HowToStep", "text": "Define your event scale, expected guest count, venue, and key technical requirements." },
        { "@type": "HowToStep", "text": "Share your event brief with Saudi Event Management for a technical rider and itemised quote." },
        { "@type": "HowToStep", "text": "Approve 3D stage renders and technical drawings. Confirm rigging loads with the venue." },
        { "@type": "HowToStep", "text": "Our fabrication team begins stage construction. AV equipment is pre-rigged and tested in our warehouse." },
        { "@type": "HowToStep", "text": "On-site build, full technical rehearsal, show day execution, and post-event de-rig." },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Event Production", "item": "https://saudieventmanagement.com/services/event-production" },
      ],
    },
  ],
};

export default async function EventProductionPage() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white overflow-hidden">
        <ScrollProgress />
        <WhatsAppButton />
        <Navbar />

        <InternalPageHero
          title={isAr ? "خدمات الإنتاج الفعّالياتي" : "Event Production Services"}
          titleHighlight={isAr ? "في السعودية" : "Saudi Arabia"}
          subtitle={
            isAr
              ? "قوة تقنية متكاملة لتصنيع المسارح المخصّصة، وأنظمة الصوت بجودة الحفلات، والعرض الضوئي على شاشات LED، وإنتاجات عروض اليوم الوطني — نحوّل أي قاعة إلى تجربة استثنائية."
              : "Technical powerhouse for custom stage fabrication, concert-grade sound systems, LED projection mapping, and National Day show productions — transforming any venue into an extraordinary experience."
          }
          backgroundImage="/services/event_production_stage_riyadh.webp"
          imageAlt="Event production company Saudi Arabia — concert-grade stage, LED video wall and lighting rig at a Riyadh event"
          enableParallax
          badge={isAr ? "الإنتاج الفعّالياتي" : "Event Production"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "الإنتاج الفعّالياتي" : "Event Production" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "60m", label: "Largest Stage Built" },
            { value: "4K", label: "LED & Projection Mapping" },
            { value: "20+", label: "Vetted Vendors" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-[var(--primary)] text-white font-semibold uppercase tracking-widest hover:bg-[var(--primary-dark)] transition-all shadow-[0_4px_14px_rgba(13,107,78,0.25)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? cAr.ctaQuote : "Get a Production Quote"}
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? cAr.ctaTalk : "Talk to a Producer"}
            </a>
          </div>
        </div>

        {/* ── Credentials Bar ── */}
        <section className="py-9 border-b border-neutral-200/80 bg-neutral-50/70">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Award className="text-[var(--primary)]" size={22} />
                </div>
                <div>
                  <p className="text-neutral-900 font-bold text-sm tracking-wide">{isAr ? cAr.credISO : "20+ Vetted Vendors"}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{isAr ? cAr.credISOsub : "Technical Production Network"}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-neutral-200 hidden md:block" />
              <div className="flex gap-8 text-[11px] font-bold tracking-widest text-neutral-400">
                <span>L-ACOUSTICS</span>
                <span>ROBE LIGHTING</span>
                <span>SAMSUNG LED</span>
              </div>
              <div className="text-xs text-neutral-500 font-medium tracking-wide italic">
                {isAr ? `«${cAr.credQuote}»` : "\"Technical Partner — Riyadh Season Activations\""}
              </div>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/riyadh_summit_people.webp')" }} aria-label="Event production showcase">
          <div aria-hidden className="absolute inset-0 bg-neutral-900/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Technical Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #10b981' }}>Stage Engineering</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Technical Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #10b981' }}>Stage Engineering</span>
              <span className="text-white text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Technical Excellence</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #10b981' }}>Stage Engineering</span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                {isAr ? cAr.servLabel : "Saudi Arabia's Leading Technical Production"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? cAr.servH2a : "In-House Production"} <span className="text-[var(--primary)]">{isAr ? cAr.servH2b : "Capabilities"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
                {isAr ? (
                  <>
                    {cAr.servPpre}<Link href={`${arHref}/portfolio/vision-2030`} className="text-[var(--primary)] hover:underline font-semibold">{cAr.servLinkVision}</Link>{cAr.servPmid}<Link href={`${arHref}/services/conferences`} className="text-[var(--primary)] hover:underline font-semibold">{cAr.servLinkConf}</Link>{cAr.servPmid2}<Link href={`${arHref}/services/destination-events`} className="text-[var(--primary)] hover:underline font-semibold">{cAr.servLinkDest}</Link>{cAr.servPpost}
                  </>
                ) : (
                  <>
                    As a premier technical partner for <Link href="/portfolio/vision-2030" className="text-[var(--primary)] hover:underline font-semibold">Vision 2030</Link> events, we maintain every technical discipline under one roof — from structural stage fabrication to broadcast-grade live streaming. Whether supporting <Link href="/services/conferences" className="text-[var(--primary)] hover:underline font-semibold">large-scale conferences in Riyadh</Link> or executing complex AV setups for <Link href="/services/destination-events" className="text-[var(--primary)] hover:underline font-semibold">remote desert festivals in AlUla</Link>, we guarantee flawless execution.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200/80 p-7 rounded-2xl hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all group"
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

        {/* ── Price Guide ── */}
        <section className="py-24 md:py-28 bg-neutral-50/70 border-y border-neutral-200/70">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <span className="section-label justify-center mb-4 flex">
                <span className="w-5 h-0.5 rounded-full bg-[var(--primary)] opacity-50 inline-block mr-1" />
                {isAr ? cAr.priceLabel : "Transparent Pricing"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? cAr.priceH2a : "Investment"} <span className="text-[var(--primary)]">{isAr ? cAr.priceH2b : "guide"}</span>
              </h2>
              <p className="text-neutral-500 mt-3 text-xs uppercase tracking-widest">
                {isAr ? cAr.priceSub : "Indicative 2026 production rates — Saudi Arabia"}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.05)]">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200/80">
                  <tr>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left">{isAr ? cAr.thService : "Service"}</th>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left">{isAr ? cAr.thFrom : "Starting From"}</th>
                    <th className="px-6 py-5 text-[var(--primary)] uppercase tracking-widest text-xs font-bold text-left hidden md:table-cell">{isAr ? cAr.thIncl : "Key Inclusions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {priceGuide.map((row, i) => (
                    <tr key={i} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="px-6 py-5 text-neutral-900 font-semibold text-sm">{isAr ? priceGuideAr[i].category : row.category}</td>
                      <td className="px-6 py-5 text-[var(--primary)] font-bold text-sm">{row.from}</td>
                      <td className="px-6 py-5 text-neutral-500 text-xs hidden md:table-cell">{isAr ? priceGuideAr[i].inclusions : row.inclusions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-neutral-400 text-xs mt-5">
              {isAr ? cAr.priceFoot : "Final pricing depends on scale, venue, and technical specification. Request an itemised quote below."}
            </p>
          </div>
        </section>

        {/* ── PARTNER PRODUCTION GALLERY ── */}
        <PartnerNetworkGallery
          isAr={isAr}
          eyebrow="Real Production Builds"
          eyebrowAr="أعمال إنتاج حقيقية"
          heading={<>Stage &amp; Production Work <span className="text-[var(--primary)]">from Our Partner Network</span></>}
          headingAr={<>أعمال المسرح والإنتاج <span className="text-[var(--primary)]">من شبكة شركائنا</span></>}
          subheading="Large-scale stage builds, live performance production, and indoor arena fit-outs delivered through SEM's vetted production partner network across the Gulf region."
          subheadingAr="إنشاءات مسرحية كبيرة الحجم، وإنتاج عروض حية، وتجهيزات صالات داخلية تم تنفيذها عبر شبكة شركاء الإنتاج المعتمدين لدى SEM في منطقة الخليج."
          images={[
            {
              src: "/services/partner-network/event-production-company-saudi-arabia-1.webp",
              alt: "Large-scale outdoor concert stage production with lighting rig for a national celebration",
              altAr: "إنتاج مسرح حفلات خارجي كبير الحجم مع منظومة إضاءة لاحتفال وطني",
            },
            {
              src: "/services/partner-network/event-production-company-saudi-arabia-2.webp",
              alt: "Live cultural stage performance production for a national day celebration",
              altAr: "إنتاج عرض مسرحي ثقافي حي لاحتفال باليوم الوطني",
            },
            {
              src: "/services/partner-network/event-production-company-saudi-arabia-3.webp",
              alt: "Large-format indoor event production with turf flooring and LED screen build",
              altAr: "إنتاج فعالية داخلية واسعة النطاق مع أرضية عشبية وشاشة LED",
            },
          ]}
        />

        {/* ── LEAD FORM / QUOTE ── */}
        <section id="quote" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_corporate_gala.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,61,44,0.92) 0%, rgba(6,78,59,0.85) 55%, rgba(13,107,78,0.92) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C5A880]">
                  <span className="w-6 h-px bg-[#C5A880]" /> {isAr ? cAr.formEyebrow : "Get a Production Quote"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {cAr.formH2a}<br />
                    <span className="text-[#C5A880]">{cAr.formH2b}</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Tell us what you&apos;re<br />
                    <span className="text-[#C5A880]">building. We&apos;ll engineer it.</span>
                  </h2>
                )}
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {isAr
                    ? cAr.formP
                    : "Send us your event brief and our technical director returns a detailed rider and itemised quote — stage, sound, lighting, LED, power, and crew, all owned in-house."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? cAr.formBullets
                    : [
                    "Free 3D stage render with every proposal",
                    "Certified rigging & structural load calculations",
                    "Concert-grade L-Acoustics & Robe inventory",
                    "On-site technical director & full crew included",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-[#C5A880] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20a%20production%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
                >
                  <Phone size={15} /> {isAr ? cAr.formWhatsapp : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="event_production_page"
                defaultEventType="Event Production / Technical"
                eyebrow={isAr ? "عرض إنتاج" : "Production Quote"}
                heading={isAr ? "اطلب عرض إنتاج" : "Request a production quote"}
                subheading={isAr ? "سيردّ مديرنا الفني خلال ساعتين بمتطلبات تقنية وعرض مُبوّب." : "Our technical director will respond within 2 hours with a rider and itemised quote."}
                submitLabel={isAr ? "أرسل طلب العرض" : "Request My Quote"}
                eventTypeOptions={[
                  "Stage Design & Fabrication",
                  "Sound / AV Production",
                  "Lighting Design",
                  "LED Wall / Projection Mapping",
                  "Live Broadcast / Streaming",
                  "Full Turnkey Production",
                  "Concert / Festival",
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
                  {isAr ? cAr.khLabel : "Knowledge Hub"}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {isAr ? cAr.khH2a : "Production"} <br />
                  <span className="text-[var(--primary)]">{isAr ? cAr.khH2b : "knowledge hub"}</span>
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {isAr ? cAr.khP : "Technical guides for event producers, venue operators, and brand teams planning events in the Kingdom."}
                </p>
                <Link href={`${arHref}/blog`} className="inline-block text-[var(--primary)] text-xs font-bold uppercase tracking-widest border-b border-[var(--primary)] pb-1">
                  {isAr ? cAr.khViewAll : "View All Articles"}
                </Link>
                <div className="pt-6 border-t border-neutral-200/80">
                  <p className="text-neutral-900 font-bold text-sm">{isAr ? "فهد السليمان" : "Fahad Al-Sulaiman"}</p>
                  <p className="text-neutral-400 text-[10px] uppercase tracking-widest">{isAr ? cAr.khAuthorTitle : "Head of Technical Production"}</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={`${arHref}${r.href}`}
                    className="p-6 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl hover:border-[var(--primary)]/30 hover:shadow-[0_8px_30px_rgba(13,107,78,0.07)] transition-all cursor-pointer group block"
                  >
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {isAr ? resourcesAr[i].title : r.title}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{isAr ? resourcesAr[i].desc : r.desc}</p>
                  </Link>
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
                  التميز في <br />
                  <span className="text-[var(--primary)]">الإنتاج التقني</span>
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  نُعدّ إدارة الفعاليات السعودية من الشركات الرائدة في{" "}
                  <strong className="text-neutral-900">إنتاج الفعاليات التقني في المملكة العربية السعودية</strong>. نقدم خدمات
                  تصميم وتركيب المسارح، وهندسة الصوت عالي الجودة، والإضاءة الاحترافية، وإسقاط الصور
                  على الأبنية، لكل أنواع الفعاليات من المؤتمرات الحكومية إلى الحفلات الموسيقية
                  الكبرى.
                </p>
                <div className="space-y-3">
                  {[
                    { ar: "شركة إنتاج صوت وصورة الرياض", en: "AV Production Company Riyadh" },
                    { ar: "تصميم مسارح الفعاليات السعودية", en: "Stage Design Saudi Arabia" },
                    { ar: "تأجير إضاءة فعاليات جدة", en: "Event Lighting Rental Jeddah" },
                    { ar: "إسقاط الصور على المباني KSA", en: "Projection Mapping KSA" },
                  ].map((item) => (
                    <div key={item.en} className="flex items-center gap-3 border-b border-emerald-100 pb-3">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                      <span className="text-[var(--primary)] font-bold text-sm">{item.ar}</span>
                      <span className="text-neutral-400 text-xs">— {item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                <Image
                  src="/services/riyadh_summit_people.webp"
                  alt="شركة إنتاج فعاليات السعودية - تصميم مسارح وإنتاج صوت وصورة وشاشات LED"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? cAr.faqH2a : "Event production"} <span className="text-[var(--primary)]">{isAr ? cAr.faqH2b : "FAQ"}</span>
              </h2>
              <p className="text-neutral-500 mt-3 text-xs uppercase tracking-widest">
                {isAr ? cAr.faqSub : "Technical questions answered by our production experts"}
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
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? cAr.chLabel : "Real-World Production"}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{isAr ? cAr.chH2a : "Production challenges — "}<span className="text-[var(--primary)]">{isAr ? cAr.chH2b : "solved with experience"}</span></h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? cAr.chP : "Live production leaves no room for error. Here is how our technical team plans around the failure points that matter most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? challengesAr
                : [
                { c: "Venue power & rigging limits", s: "Site surveys, generator power, and certified rigging ensure a venue's electrical and structural limits never cap the show you have designed." },
                { c: "Tight load-in & changeover windows", s: "Modular staging, labelled cable looms, and a rehearsed crew call sheet let us build, test, and strike inside fixed venue windows." },
                { c: "Reliability for live, one-take moments", s: "Redundant audio, backup media servers, and spare kit on standby protect keynotes, product reveals, and live broadcasts from single points of failure." },
                { c: "Creative ambition vs. budget & physics", s: "Our designers prototype and value-engineer concepts so the wow moment is achievable, on-budget, and safe to deliver." },
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
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? cAr.featTitle : "Production In Action — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "القمة التقنية العالمية", slug: "global-tech-summit", desc: "صوت وصورة للمسرح الرئيسي، وجدران LED، وتبديل مباشر متعدد الكاميرات لمؤتمر تقني كبير." },
                { title: "مهرجان العلا الصحراوي", slug: "alula-desert-festival", desc: "مسرح وطاقة وإضاءة خارج الشبكة لمهرجان تراثي صحراوي واسع النطاق." },
                { title: "قمة الرياض الحكومية", slug: "riyadh-government-summit", desc: "إنتاج بجودة البث وتصميم مسرح لقمة على مستوى وزاري." },
                  ]
                : [
                { title: "Global Tech Summit", slug: "global-tech-summit", desc: "Main-stage AV, LED walls, and multi-camera live switching for a major technology conference." },
                { title: "AlUla Desert Festival", slug: "alula-desert-festival", desc: "Off-grid staging, power, and lighting for a large-scale desert heritage festival." },
                { title: "Riyadh Government Summit", slug: "riyadh-government-summit", desc: "Broadcast-grade production and stage design for a ministerial-level summit." },
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
                <h3 className="text-neutral-900 font-bold text-lg">{isAr ? cAr.ctaH3 : "Planning a production?"}</h3>
                <p className="text-neutral-500 text-sm mt-1">{isAr ? cAr.ctaP : "Book a free consultation or speak with our production team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? cAr.ctaConsult : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? cAr.ctaContact : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-neutral-500 text-sm mt-6">تصفّح <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو شاهد <Link href={`${arHref}/services/production-venues`} className="text-[var(--primary)] font-semibold hover:underline">خدمات وقاعات الفعاليات</Link>.</p>
            ) : (
              <p className="text-neutral-500 text-sm mt-6">Browse our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or see our <Link href="/services/production-venues" className="text-[var(--primary)] font-semibold hover:underline">event services & venues</Link>.</p>
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
                { title: "فعاليات الشركات", slug: "corporate-events", desc: "تخطيط متكامل لفعاليات الشركات مع فريق الإنتاج لدينا مدمجًا." },
                { title: "إدارة المؤتمرات", slug: "conferences", desc: "خدمات منظِّم مؤتمرات تدمج قسم الإنتاج الصوتي والمرئي لدينا لتنفيذ سلس." },
                { title: "خدمات وقاعات الفعاليات", slug: "production-venues", desc: "اختيار القاعات والتموين والديكور وإدارة الضيافة المتكاملة." },
                  ]
                : [
                { title: "Corporate Events", slug: "corporate-events", desc: "End-to-end corporate event planning with our production team embedded." },
                { title: "Conference Management", slug: "conferences", desc: "PCO services integrating our AV production division for seamless delivery." },
                { title: "Event Services & Venues", slug: "production-venues", desc: "Venue sourcing, catering, decoration, and full hospitality management." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(13,107,78,0.08)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
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

        <Footer />
      </main>
    </>
  );
}
