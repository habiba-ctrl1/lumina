import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Image from "next/image";
import Link from "next/link";
import { Map, Tent, Anchor, Mountain, Compass, Trees, ChevronRight, Phone, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/services/destination-events`;
  return {
    title: isAr
      ? { absolute: "فعاليات الوجهات في السعودية | العلا ونيوم والبحر الأحمر والدرعية | إدارة الفعاليات السعودية" }
      : "Destination Events Saudi Arabia | AlUla, NEOM, Red Sea & Diriyah",
    description: isAr
      ? "خطّط لفعاليات وجهات آسرة في السعودية. من التخييم الفاخر وتجارب التراث العريق في العلا، إلى فعاليات اليخوت الفاخرة على البحر الأحمر والقمم المستقبلية في نيوم."
      : "Plan breathtaking destination events in Saudi Arabia. From desert glamping and ancient heritage experiences in AlUla, to luxury yacht events on the Red Sea and futuristic summits in NEOM.",
    keywords: [
      "Destination events Saudi Arabia",
      "AlUla event planning",
      "NEOM event management",
      "Red Sea destination events",
      "Desert safari events KSA",
      "Diriyah heritage events",
      "Luxury glamping Saudi Arabia",
      "Corporate retreat AlUla",
      "فعاليات وجهة السعودية",
      "تنظيم فعاليات العُلا",
    ],
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/services/destination-events"),
    },
    openGraph: {
      title: isAr
        ? "فعاليات الوجهات في السعودية | العلا ونيوم والبحر الأحمر"
        : "Destination Events Saudi Arabia | AlUla, NEOM & Red Sea",
      description: isAr
        ? "فعاليات وجهات آسرة عبر أبرز معالم السعودية — العلا ونيوم والبحر الأحمر والدرعية."
        : "Breathtaking destination events across Saudi Arabia's most iconic landscapes — AlUla, NEOM, Red Sea, and Diriyah.",
      url: path,
      images: [{ url: "/services/hero_bg.webp", width: 1200, height: 630, alt: "Destination Events Saudi Arabia" }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Destination Events Saudi Arabia",
      "description":
        "Breathtaking destination event planning across Saudi Arabia's most iconic landscapes — AlUla's ancient heritage, NEOM's futuristic skyline, Red Sea coastal retreats, and Diriyah's mud-brick heritage city.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
      },
      "areaServed": ["AlUla", "NEOM", "Red Sea", "Diriyah", "Jeddah Waterfront", "Saudi Arabia"],
      "serviceType": "Destination Event Management",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you handle travel logistics for destination events in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide complete end-to-end destination event logistics including charter flights, VIP ground transportation, luxury accommodation buyouts, resort co-ordination, and on-the-ground support teams at all remote locations including AlUla, NEOM, and Red Sea resorts.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you build event infrastructure in remote desert locations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our production team specialises in remote event logistics, bringing climate-controlled structural tents, generator power, lighting rigs, catering facilities, and luxury amenities to pristine desert environments while ensuring zero environmental impact and full compliance with RCU or heritage authority regulations.",
          },
        },
        {
          "@type": "Question",
          "name": "How far in advance should we plan a destination event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For major events and weddings in AlUla, we recommend starting planning 6 to 12 months in advance. High-demand periods at luxury resorts (particularly winter months October–March) book quickly, and Royal Commission for AlUla (RCU) site access permits require lead time.",
          },
        },
        {
          "@type": "Question",
          "name": "What are the most scenic event venues in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AlUla's most spectacular event venues include the Maraya concert hall — the world's largest mirrored building, set among ancient Hejaz mountains — the Hegra UNESCO heritage site, Dadan archaeological ruins, and bespoke desert wadi settings. Saudi Event Management holds preferred access to all premium AlUla venues through our RCU partner status.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you organise events at NEOM for international delegates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Saudi Event Management manages corporate retreats, innovation summits, and exclusive brand experiences within the NEOM development. We handle all permitting, delegate travel, accommodation, and on-site logistics for this futuristic destination.",
          },
        },
        {
          "@type": "Question",
          "name": "How do you manage logistics for remote desert events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We deploy a dedicated remote logistics team that manages all production delivery, power generation, water supply, climate control, waste management, and on-site catering. Our teams have executed events in AlUla, Tabuk, and the Empty Quarter with full luxury standards maintained throughout.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the cost of a destination wedding or event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Destination events in AlUla typically start from SAR 250,000 for an intimate gathering and can exceed SAR 2,000,000 for large-scale productions incorporating custom infrastructure, international talent, and luxury resort accommodation buyouts. Contact us for a tailored proposal.",
          },
        },
        {
          "@type": "Question",
          "name": "destination event planner near me Saudi Arabia",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is headquartered in Riyadh with dedicated destination event teams operating year-round across AlUla, NEOM, the Red Sea coast, and Diriyah. We are Saudi Arabia's most experienced destination event management company.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Destination Events", "item": "https://saudieventmanagement.com/services/destination-events" },
      ],
    },
  ],
};

const services = [
  { icon: Mountain, title: "AlUla Events", desc: "Breathtaking events set against the majestic sandstone mountains and ancient Nabataean heritage sites of AlUla — from Maraya to private Hegra dinners." },
  { icon: Compass, title: "NEOM Summits", desc: "Cutting-edge event planning in the futuristic landscape of NEOM — perfect for technology summits, innovation retreats, and visionary corporate gatherings." },
  { icon: Anchor, title: "Red Sea Coastal", desc: "Exclusive beachfront galas, luxury superyacht events, and coastal retreats along the pristine emerald waters of the Saudi Red Sea coast." },
  { icon: Map, title: "Diriyah Heritage", desc: "Immersive cultural events in the historic mud-brick city of Diriyah — blending UNESCO World Heritage authenticity with modern luxury production." },
  { icon: Tent, title: "Desert Glamping", desc: "Bespoke luxury glamping in the Arabian desert — climate-controlled tents, stargazing dinners, falconry, camel rides, and traditional Saudi hospitality." },
  { icon: Trees, title: "Jeddah Waterfront", desc: "High-end corporate and social events on the Jeddah Corniche — rooftop galas, beachfront dinners, and exclusive waterfront venue sourcing." },
];

const destinations = [
  {
    name: "AlUla",
    arabic: "العُلا",
    image: "/services/hero_bg.webp",
    highlight: "Maraya Hall & Hegra UNESCO Site",
    tags: ["Heritage Events", "Desert Glamping", "Luxury Weddings"],
    desc: "Saudi Arabia's most spectacular destination — 200,000-year-old landscape, ancient Nabataean cities, and the world-famous Maraya mirrored concert hall.",
  },
  {
    name: "NEOM",
    arabic: "نيوم",
    image: "/services/gallery_corporate_gala.webp",
    highlight: "The Line & Sindalah Island",
    tags: ["Innovation Summits", "Corporate Retreats", "Brand Activations"],
    desc: "The $500B giga-project offering unparalleled backdrop for forward-thinking corporate events, technology conferences, and visionary brand experiences.",
  },
  {
    name: "Red Sea",
    arabic: "البحر الأحمر",
    image: "/services/gallery_wedding_reception.webp",
    highlight: "Yacht Charters & Coastal Resorts",
    tags: ["Yacht Events", "Beachfront Galas", "Coastal Retreats"],
    desc: "Pristine turquoise waters, untouched coral reefs, and world-class beach resorts — perfect for luxury yacht events and exclusive coastal celebrations.",
  },
  {
    name: "Diriyah",
    arabic: "الدرعية",
    image: "/services/private_party.webp",
    highlight: "At-Turaif UNESCO District",
    tags: ["Heritage Events", "National Day", "Cultural Activations"],
    desc: "The birthplace of the Kingdom — UNESCO-listed mud-brick architecture providing an authentically Saudi backdrop for cultural events and immersive heritage experiences.",
  },
];

const resources = [
  { title: "AlUla Events Guide: Maraya, Hegra & Desert Experience Planning", desc: "Everything you need to know to plan a flawless event in Saudi Arabia's most spectacular destination.", href: "/blog/alula-events-guide-maraya-hegra-desert" },
  { title: "VIP Executive Retreats in NEOM: A 2026 Guide", desc: "Navigating permits, accommodation, and production logistics inside Saudi Arabia's giga-project.", href: "/blog/vip-executive-retreats-neom-2026" },
  { title: "Event Production Cost Guide Saudi Arabia 2026", desc: "Transparent breakdown of transport, infrastructure, accommodation, and production costs.", href: "/blog/event-production-cost-guide-saudi-arabia-2026" },
  { title: "Destination Weddings in AlUla & The Red Sea", desc: "Crafting breathtaking desert ceremonies and Red Sea beachfront weddings in Saudi Arabia.", href: "/blog/destination-weddings-alula-red-sea" },
];

/* ─── Arabic body content (long-form). Parallel to the English arrays above. ─── */
const servicesAr = [
  { title: "فعاليات العلا", desc: "فعاليات آسرة على خلفية جبال العلا الرملية المهيبة ومواقع الحِجر النبطية التراثية — من مرايا إلى عشاء الحِجر الخاص." },
  { title: "قمم نيوم", desc: "تخطيط فعاليات متطور في مشهد نيوم المستقبلي — مثالي لقمم التقنية وملتقيات الابتكار والتجمّعات المؤسسية الاستشرافية." },
  { title: "ساحل البحر الأحمر", desc: "حفلات شاطئية حصرية، وفعاليات يخوت فاخرة، وملتقيات ساحلية على مياه البحر الأحمر الزمردية البكر." },
  { title: "تراث الدرعية", desc: "فعاليات ثقافية غامرة في مدينة الدرعية الطينية التاريخية — تمزج أصالة التراث العالمي لليونسكو بالإنتاج الفاخر العصري." },
  { title: "التخييم الصحراوي الفاخر", desc: "تخييم فاخر مخصّص في الصحراء العربية — خيام مكيّفة، وعشاء تحت النجوم، وصقارة، وركوب الجمال، وضيافة سعودية أصيلة." },
  { title: "واجهة جدة البحرية", desc: "فعاليات مؤسسية واجتماعية راقية على كورنيش جدة — حفلات على الأسطح، وعشاء على الشاطئ، واختيار قاعات حصرية على الواجهة البحرية." },
];

const destinationsAr = [
  { name: "العُلا", highlight: "قاعة مرايا وموقع الحِجر العالمي", desc: "أبهى وجهات السعودية — مشهد عمره 200 ألف عام، ومدن نبطية قديمة، وقاعة مرايا المرآتية الشهيرة عالميًا.", tags: ["فعاليات تراثية", "تخييم فاخر", "حفلات زفاف فاخرة"] },
  { name: "نيوم", highlight: "ذا لاين وجزيرة سندالة", desc: "المشروع العملاق بقيمة 500 مليار دولار يقدّم خلفية لا تُضاهى للفعاليات المؤسسية الاستشرافية ومؤتمرات التقنية وتجارب العلامات.", tags: ["قمم الابتكار", "ملتقيات الشركات", "تفعيلات العلامات"] },
  { name: "البحر الأحمر", highlight: "استئجار اليخوت والمنتجعات الساحلية", desc: "مياه فيروزية بكر، وشعاب مرجانية، ومنتجعات شاطئية عالمية — مثالية لفعاليات اليخوت الفاخرة والاحتفالات الساحلية الحصرية.", tags: ["فعاليات اليخوت", "حفلات شاطئية", "ملتقيات ساحلية"] },
  { name: "الدرعية", highlight: "حي الطريف العالمي", desc: "مهد المملكة — عمارة طينية مدرجة في اليونسكو تقدّم خلفية سعودية أصيلة للفعاليات الثقافية وتجارب التراث الغامرة.", tags: ["فعاليات تراثية", "اليوم الوطني", "تفعيلات ثقافية"] },
];

const resourcesAr = [
  { title: "دليل فعاليات العلا: مرايا والحِجر وتخطيط تجارب الصحراء", desc: "كل ما تحتاجه لتخطيط فعالية متقنة في أبهى وجهات السعودية." },
  { title: "ملتقيات كبار التنفيذيين في نيوم: دليل 2026", desc: "التعامل مع التصاريح والإقامة ولوجستيات الإنتاج داخل المشروع العملاق في السعودية." },
  { title: "دليل تكاليف الإنتاج الفعّالياتي في السعودية 2026", desc: "تفصيل شفّاف لتكاليف النقل والبنية التحتية والإقامة والإنتاج." },
  { title: "حفلات الزفاف في العلا والبحر الأحمر", desc: "تصميم مراسم صحراوية آسرة وأعراس على شواطئ البحر الأحمر في السعودية." },
];

const faqsAr = [
  { q: "هل تتولّون لوجستيات السفر لفعاليات الوجهات في السعودية؟", a: "نعم. نوفّر لوجستيات وجهات متكاملة تشمل رحلات خاصة، ونقل أرضي لكبار الشخصيات، وحجز إقامة فاخرة كاملة، وفرق دعم ميدانية في كل المواقع النائية بما فيها العلا ونيوم ومنتجعات البحر الأحمر." },
  { q: "هل يمكنكم بناء بنية تحتية للفعاليات في مواقع صحراوية نائية؟", a: "بالتأكيد. يتخصص فريق الإنتاج لدينا في لوجستيات الفعاليات النائية — نوفّر خيامًا إنشائية مكيّفة، وطاقة مولّدات، وإضاءة، ومرافق ضيافة، ووسائل راحة فاخرة في بيئات صحراوية بكر دون أثر بيئي." },
  { q: "قبل كم من الوقت يجب التخطيط لفعالية وجهة في العلا؟", a: "للفعاليات الكبرى والأعراس في العلا، نوصي ببدء التخطيط قبل 6 إلى 12 شهرًا. تُحجز مواسم الذروة في المنتجعات الفاخرة بسرعة، وتتطلب تصاريح الوصول إلى مواقع الهيئة الملكية للعلا مهلة كبيرة." },
  { q: "ما أكثر قاعات الفعاليات إبهارًا في العلا؟", a: "تشمل أبهى قاعات العلا قاعة مرايا (أكبر مبنى مرآتي في العالم)، وموقع الحِجر التراثي العالمي، وأطلال دادان الأثرية، ومواقع الوديان الصحراوية الخاصة. ولدينا وصول مفضّل عبر شراكتنا مع الهيئة الملكية للعلا." },
  { q: "هل يمكنكم تنظيم فعاليات في نيوم للمندوبين الدوليين؟", a: "نعم. تدير إدارة الفعاليات السعودية ملتقيات الشركات وقمم الابتكار وتجارب العلامات داخل مشروع نيوم، وتتولّى كل التصاريح وسفر المندوبين والإقامة واللوجستيات الميدانية." },
  { q: "كيف تديرون لوجستيات الفعاليات الصحراوية النائية؟", a: "يدير فريق اللوجستيات النائية لدينا كل تسليم الإنتاج، وتوليد الطاقة، وإمداد المياه، والتكييف، وإدارة النفايات، والضيافة. وقد نفّذنا فعاليات في العلا وتبوك والربع الخالي بمعايير فخامة كاملة طوال الوقت." },
  { q: "كم تكلفة فعالية وجهة في العلا؟", a: "تبدأ فعاليات الوجهات في العلا من 250,000 ريال للتجمّعات الحميمة وقد تتجاوز 2,000,000 ريال للإنتاجات الكبرى ببنية تحتية مخصّصة ونجوم عالميين وحجز إقامة منتجعات فاخرة كاملة. تواصل معنا لعرض مخصّص." },
  { q: "مخطط فعاليات وجهات قريب مني في السعودية", a: "تتخذ إدارة الفعاليات السعودية من الرياض مقرًا لها مع فرق فعاليات وجهات مخصّصة تعمل على مدار العام في العلا ونيوم وساحل البحر الأحمر والدرعية — أكثر شركات فعاليات الوجهات خبرة في السعودية." },
];

const challengesAr = [
  { c: "لوجستيات المواقع النائية ووصول الضيوف", s: "تُنسّق الرحلات الخاصة والتنقّلات البرية وحجوزات المنتجعات في العلا ونيوم من البداية للنهاية ليصل الضيوف بسلاسة وفي الموعد." },
  { c: "تصاريح الهيئة الملكية للعلا والمواقع التراثية", s: "تتطلب الفعاليات في الحِجر ودادان والمواقع المحمية موافقات الهيئة الملكية للعلا وبروتوكولات دون أثر، نديرها مباشرة." },
  { c: "الطاقة والتكييف والبنية خارج الشبكة", s: "مولّدات صامتة، وتكييف، وبنية تحتية تُبنى من الصفر تجلب موثوقية الخمس نجوم إلى الصحراء والساحل." },
  { c: "راحة الضيوف في البيئات القاسية", s: "إدارة الحرارة، والظل، والترطيب، وخطط الطوارئ الجوية تبقي الضيوف مرتاحين عبر أيام الصحراء الحارة ولياليها الباردة." },
];

const cAr = {
  ctaExplore: "استكشف الوجهات",
  ctaSiteVisit: "خطّط لزيارة موقع",
  showEyebrow: "فعاليات الوجهات الأولى في السعودية",
  showH2a: "إعدادات",
  showH2b: "استثنائية",
  showPpre: "بصفتنا الشركة الرائدة في إدارة فعاليات الوجهات بالمملكة، نحوّل المناظر النائية إلى قاعات آسرة. من ",
  showLinkAlula: "التخييم الفاخر في العلا",
  showPmid: " و",
  showLinkVip: "تجارب يخوت البحر الأحمر لكبار الشخصيات",
  showPmid2: "، إلى تنفيذ قمم مؤسسية استشرافية لـ",
  showLinkVision: "رؤية 2030",
  showPpost: " في نيوم — نقدّم إنتاجًا بخمس نجوم حيث لا يرى الآخرون سوى تحديات لوجستية.",
  servH2a: "ما الذي",
  servH2b: "نقدّمه",
  khH3a: "دليل تخطيط",
  khH3b: "الوجهات",
  khP: "معرفة خبيرة لتخطيط فعاليات استثنائية في أبرز مواقع السعودية الأيقونية.",
  khViewAll: "عرض كل الأدلّة",
  khAuthorTitle: "رئيس فعاليات الوجهات",
  formEyebrow: "ابدأ فعالية وجهتك",
  formH2a: "فعاليات استثنائية في",
  formH2b: "عجائب المملكة.",
  formP: "أخبرنا بوجهة أحلامك — العلا أو نيوم أو البحر الأحمر أو الدرعية — ويعيد إليك فريقنا مفهومًا وخطة لوجستية وعرضًا مخصّصًا خلال ساعتين.",
  formBullets: [
    "وصول حصري إلى قاعات العلا ونيوم والبحر الأحمر",
    "لوجستيات سفر وإقامة متكاملة للضيوف",
    "تصاريح الهيئة الملكية للعلا ونيوم والبنية التحتية الميدانية",
    "إنتاج مخصّص في مواقع الصحراء والساحل النائية",
  ],
  formWhatsapp: "أو راسلنا عبر واتساب",
  formPropEyebrow: "استفسار وجهة",
  formPropHeading: "خطّط لفعالية وجهتك",
  formPropSub: "سيردّ فريق الوجهات خلال ساعتين بمفهوم وخطة لوجستية.",
  formPropSubmit: "اطلب عرض الوجهة",
  faqH2a: "الأسئلة الشائعة",
  faqH2b: "لفعاليات الوجهات",
  chLabel: "اعتبارات واقعية",
  chH2a: "تحديات الوجهات — ",
  chH2b: "تُحلّ في الميدان",
  chP: "تكافئ الفعاليات في العلا ونيوم والبحر الأحمر الطموح لكنها تعاقب ضعف اللوجستيات. وإليك كيف يقدّم فريقنا معايير الخمس نجوم بعيدًا عن المدينة.",
  challengeLabel: "التحدّي",
  featTitle: "فعاليات الوجهات — مشاريع مختارة",
  viewProject: "عرض المشروع",
  ctaH3: "تخطّط لفعالية وجهة؟",
  ctaP: "احجز استشارة مجانية أو تحدّث إلى فريق الوجهات لدينا — نردّ عادةً خلال ساعتين.",
  ctaConsult: "احجز استشارة مجانية",
  ctaContact: "تواصل معنا",
  relTitle: "خدمات ذات صلة",
  relViewAll: "عرض كل الخدمات",
  learnMore: "اعرف المزيد",
};

export default async function DestinationEventsPage() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-sand-50 text-ink-950 overflow-hidden pt-20">
        <Navbar darkHero={false} />

        <InternalPageHero
          title={isAr ? "تخطيط فعاليات الوجهات" : "Destination Event Planning"}
          titleHighlight={isAr ? "في السعودية" : "in Saudi Arabia"}
          subtitle={
            isAr
              ? "إدارة متخصصة لفعاليات الوجهات عبر أبهى مناظر المملكة — العلا ونيوم والبحر الأحمر والدرعية — بلوجستيات سلسة وتجارب استثنائية."
              : "Specialist destination event management across the Kingdom's most breathtaking landscapes — AlUla, NEOM, the Red Sea, and Diriyah — with seamless logistics and extraordinary experiences."
          }
          backgroundImage="/services/premium_destination_event_hero.webp"
          imageAlt="Luxury destination event in AlUla Saudi Arabia with desert mountains and dining setup"
          enableParallax
          badge={isAr ? "فعاليات الوجهات" : "Destination Events"}
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "فعاليات الوجهات" : "Destination Events" },
          ]}
          minHeight="large"
        />
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#destination-enquiry"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-[0_4px_14px_rgba(197,168,128,0.35)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? cAr.ctaExplore : "Explore Destinations"}
            </Link>
            <a
              href="tel:+966539388072"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-300 text-ink-900 font-semibold uppercase tracking-widest hover:border-gold-500 hover:text-gold-700 transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? cAr.ctaSiteVisit : "Plan a Site Visit"}
            </a>
          </div>
        </div>

        {/* ── EEAT Credentials ── */}
        <section className="py-10 bg-ink-900 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <span className="text-white text-xs font-bold tracking-widest">RCU PARTNER — AlUla</span>
              <span className="text-white text-xs font-bold tracking-widest">DGDA — DIRIYAH</span>
              <span className="text-white text-xs font-bold tracking-widest">RED SEA PROJECT</span>
              <span className="text-white text-xs font-bold tracking-widest">NEOM APPROVED</span>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/hero_bg.webp')" }} aria-label="Destination event visual showcase">
          <div aria-hidden className="absolute inset-0 bg-[#0B0C10]/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-sand-50 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Extraordinary Journeys</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #d97706' }}>Kingdom Destinations</span>
              <span className="text-sand-50 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Extraordinary Journeys</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #d97706' }}>Kingdom Destinations</span>
              <span className="text-sand-50 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Extraordinary Journeys</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #d97706' }}>Kingdom Destinations</span>
            </div>
          </div>
        </section>

        {/* ── Destination Showcase ── */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-600 mb-4 uppercase">
                <span className="w-5 h-px bg-gold-500" /> {isAr ? cAr.showEyebrow : "Saudi Arabia's Premier Destination Events"}
              </span>
              <h2 className="text-3xl md:text-5xl font-display text-ink-950 mb-6">
                {isAr ? cAr.showH2a : "Extraordinary"} <span className="text-gold-600 italic">{isAr ? cAr.showH2b : "Settings"}</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                {isAr ? (
                  <>
                    {cAr.showPpre}<Link href={`${arHref}/locations/alula`} className="text-gold-600 hover:underline font-semibold">{cAr.showLinkAlula}</Link>{cAr.showPmid}<Link href={`${arHref}/services/luxury-vip-events`} className="text-gold-600 hover:underline font-semibold">{cAr.showLinkVip}</Link>{cAr.showPmid2}<Link href={`${arHref}/portfolio/vision-2030`} className="text-gold-600 hover:underline font-semibold">{cAr.showLinkVision}</Link>{cAr.showPpost}
                  </>
                ) : (
                  <>
                    As the Kingdom&apos;s leading destination event management company, we transform remote landscapes into breathtaking venues. From <Link href="/locations/alula" className="text-gold-600 hover:underline font-semibold">desert glamping in AlUla</Link> and <Link href="/services/luxury-vip-events" className="text-gold-600 hover:underline font-semibold">VIP Red Sea yacht experiences</Link>, to executing visionary <Link href="/portfolio/vision-2030" className="text-gold-600 hover:underline font-semibold">Vision 2030</Link> corporate summits in NEOM — we deliver five-star production where others see only logistical challenges.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destinations.map((dest, i) => (
                <div key={i} className="group border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={`${dest.name} destination events Saudi Arabia`}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-xl">{isAr ? destinationsAr[i].name : dest.name}</h3>
                      <span className="text-gold-400 text-xs">{isAr ? "" : dest.arabic}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-3">{isAr ? destinationsAr[i].highlight : dest.highlight}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{isAr ? destinationsAr[i].desc : dest.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? destinationsAr[i].tags : dest.tags).map((tag) => (
                        <span key={tag} className="text-[10px] bg-gold-50 text-gold-700 px-3 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-32 bg-sand-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-display text-ink-950 mb-4">
                {isAr ? cAr.servH2a : "What We"} <span className="text-gold-600 italic">{isAr ? cAr.servH2b : "Deliver"}</span>
              </h2>
              <div className="w-16 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 p-8 rounded-sm hover:border-gold-400/50 hover:shadow-xl transition-all duration-500 group"
                >
                  <s.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-display text-ink-950 mb-4 uppercase tracking-wider">{isAr ? servicesAr[i].title : s.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{isAr ? servicesAr[i].desc : s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Topical Authority Section ── */}
        <section className="py-32 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-display font-bold text-ink-950">
                  {isAr ? cAr.khH3a : "Destination"} <br />
                  <span className="text-gold-600 italic">{isAr ? cAr.khH3b : "Planning Guide"}</span>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {isAr ? cAr.khP : "Expert knowledge for planning extraordinary events at Saudi Arabia's most iconic locations."}
                </p>
                <Link href={`${arHref}/blog`} className="inline-block text-gold-600 text-xs font-bold uppercase tracking-widest border-b border-gold-600 pb-1">
                  {isAr ? cAr.khViewAll : "View All Guides"}
                </Link>
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-ink-950 font-bold text-sm">{isAr ? "خالد الزهراني" : "Khalid Al-Zahrani"}</p>
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest">{isAr ? cAr.khAuthorTitle : "Head of Destination Events"}</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={`${arHref}${r.href}`}
                    className="p-6 bg-sand-50 border border-slate-200 rounded-sm hover:bg-gold-50 transition-colors cursor-pointer group block"
                  >
                    <h4 className="text-ink-950 font-bold text-sm mb-3 group-hover:text-gold-600 transition-colors">{isAr ? resourcesAr[i].title : r.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{isAr ? resourcesAr[i].desc : r.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Arabic Section ── */}
        <section className="py-32 bg-ink-950 text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">
                  فعاليات في <br />
                  <span className="text-gold-400 italic">قلب المملكة</span>
                </h2>
                <p className="text-sand-400 text-lg leading-relaxed">
                  نتخصص في تنظيم{" "}
                  <strong className="text-white">فعاليات وجهة في المملكة العربية السعودية</strong>{" "}
                  بأجمل المواقع الطبيعية والتراثية. من أبهى وجهاتنا: منطقة{" "}
                  <strong className="text-white">العُلا</strong> بتراثها النبطي،
                  ومشروع <strong className="text-white">نيوم</strong> المستقبلي،
                  وشواطئ <strong className="text-white">البحر الأحمر</strong>،
                  وأحياء <strong className="text-white">الدرعية</strong> التراثية.
                </p>
                <div className="space-y-3">
                  {[
                    { ar: "تنظيم فعاليات العُلا السعودية", en: "AlUla Event Planning KSA" },
                    { ar: "فعاليات نيوم والمشاريع الكبرى", en: "NEOM & Giga-Project Events" },
                    { ar: "فعاليات شاطئية البحر الأحمر", en: "Red Sea Coastal Events" },
                    { ar: "فعاليات التراث الدرعية", en: "Diriyah Heritage Events" },
                  ].map((item) => (
                    <div key={item.en} className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                      <span className="text-gold-400 font-bold text-sm">{item.ar}</span>
                      <span className="text-sand-600 text-xs">— {item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/services/gala_decor_saudi.webp"
                  alt="فعاليات الوجهات في السعودية - تجهيز عشاء فاخر بطابع سعودي في العُلا والبحر الأحمر"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── LEAD FORM / DESTINATION ENQUIRY ── */}
        <section id="destination-enquiry" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/gallery_wedding_reception.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,12,16,0.95) 0%, rgba(24,25,32,0.92) 55%, rgba(11,12,16,0.95) 100%)" }} />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase text-gold-400">
                  <span className="w-6 h-px bg-gold-400" /> {isAr ? cAr.formEyebrow : "Begin Your Destination Event"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {cAr.formH2a}<br />
                    <span className="text-gold-400">{cAr.formH2b}</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Extraordinary events in<br />
                    <span className="text-gold-400">the Kingdom&apos;s wonders.</span>
                  </h2>
                )}
                <p className="text-white/65 text-base leading-relaxed max-w-md">
                  {isAr
                    ? cAr.formP
                    : "Tell us your dream destination — AlUla, NEOM, the Red Sea or Diriyah — and our team returns a concept, logistics plan, and tailored proposal within two hours."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? cAr.formBullets
                    : [
                    "Exclusive access to AlUla, NEOM & Red Sea venues",
                    "End-to-end guest travel & accommodation logistics",
                    "RCU & RCN permits and on-site infrastructure",
                    "Bespoke production in remote desert & coastal sites",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-gold-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/966539388072?text=Hi%20Saudi%20Event%20Management!%20I%27d%20like%20to%20plan%20a%20destination%20event%20in%20Saudi%20Arabia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold border-b border-white/30 pb-1 hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  <Phone size={15} /> {isAr ? cAr.formWhatsapp : "Or message us on WhatsApp"}
                </a>
              </div>
              <ServiceLeadForm
                source="destination_events_page"
                defaultEventType="Destination Event"
                eyebrow={isAr ? cAr.formPropEyebrow : "Destination Enquiry"}
                heading={isAr ? cAr.formPropHeading : "Plan your destination event"}
                subheading={isAr ? cAr.formPropSub : "Our destination team will respond within 2 hours with a concept and logistics plan."}
                submitLabel={isAr ? cAr.formPropSubmit : "Request Destination Proposal"}
                eventTypeOptions={[
                  "AlUla Event",
                  "NEOM Summit / Retreat",
                  "Red Sea Coastal Event",
                  "Diriyah Heritage Event",
                  "Desert Glamping / Wedding",
                  "Other",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-32 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-ink-950 mb-4">
                {isAr ? cAr.faqH2a : "Destination Events"} <span className="text-gold-600 italic">{isAr ? cAr.faqH2b : "FAQ"}</span>
              </h2>
              <div className="w-12 h-px bg-gold-500/50 mx-auto" />
            </div>
            <div className="space-y-6">
              {(isAr
                ? faqsAr
                : [
                { q: "Do you handle travel logistics for destination events in Saudi Arabia?", a: "Yes. We provide complete end-to-end destination event logistics including charter flights, VIP ground transportation, luxury accommodation buyouts, and on-the-ground support teams at all remote locations including AlUla, NEOM, and Red Sea resorts." },
                { q: "Can you build event infrastructure in remote desert locations?", a: "Absolutely. Our production team specialises in remote event logistics — bringing climate-controlled structural tents, generator power, lighting, catering facilities, and luxury amenities to pristine desert environments with zero environmental impact." },
                { q: "How far in advance should we plan a destination event in AlUla?", a: "For major events and weddings in AlUla, we recommend starting planning 6 to 12 months in advance. High-demand seasons at luxury resorts book quickly, and RCU site access permits require considerable lead time." },
                { q: "What are the most scenic event venues in AlUla?", a: "AlUla's most spectacular venues include the Maraya concert hall (world's largest mirrored building), the Hegra UNESCO heritage site, Dadan archaeological ruins, and private desert wadi settings. We hold preferred access through our RCU partner status." },
                { q: "Can you organise events at NEOM for international delegates?", a: "Yes. Saudi Event Management manages corporate retreats, innovation summits, and brand experiences within the NEOM development, handling all permitting, delegate travel, accommodation, and on-site logistics." },
                { q: "How do you manage logistics for remote desert events?", a: "Our remote logistics team manages all production delivery, power generation, water supply, climate control, waste management, and catering. We have executed events in AlUla, Tabuk, and the Empty Quarter with full luxury standards maintained throughout." },
                { q: "What is the cost of a destination event in AlUla?", a: "Destination events in AlUla start from SAR 250,000 for intimate gatherings and can exceed SAR 2,000,000 for large-scale productions with custom infrastructure, international talent, and luxury resort accommodation buyouts. Contact us for a tailored proposal." },
                { q: "destination event planner near me Saudi Arabia", a: "Saudi Event Management is headquartered in Riyadh with dedicated destination event teams operating year-round across AlUla, NEOM, the Red Sea coast, and Diriyah — Saudi Arabia's most experienced destination event management company." },
              ]).map((faq, i) => (
                <div key={i} className="bg-slate-50 p-8 border border-slate-200 rounded-sm">
                  <h3 className="text-lg font-medium text-ink-950 mb-3">{faq.q}</h3>
                  <p className="text-slate-600 font-light text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON CHALLENGES & SOLUTIONS ── */}
        <section className="py-24 md:py-28 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="text-[var(--primary)] text-xs uppercase tracking-widest font-bold mb-4 block">{isAr ? cAr.chLabel : "Real-World Considerations"}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-ink-950">{isAr ? cAr.chH2a : "Destination challenges — "}<span className="text-[var(--primary)]">{isAr ? cAr.chH2b : "solved on the ground"}</span></h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? cAr.chP : "Events in AlUla, NEOM, and the Red Sea reward ambition but punish poor logistics. Here is how our team delivers five-star standards far from the city."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? challengesAr
                : [
                { c: "Remote-site logistics & guest access", s: "Charter flights, road transfers, and resort buyouts in AlUla and NEOM are coordinated end-to-end so guests arrive effortlessly and on schedule." },
                { c: "RCU & heritage-site permits", s: "Events at Hegra, Dadan, and other protected sites require Royal Commission for AlUla approvals and zero-impact protocols, which we manage directly." },
                { c: "Power, climate & off-grid infrastructure", s: "Silent generators, climate control, and built-from-scratch infrastructure bring five-star reliability to the desert and coastline." },
                { c: "Guest comfort in extreme environments", s: "Heat management, shade, hydration, and weather contingencies keep guests comfortable across hot desert days and cool nights." },
              ]).map((item) => (
                <div key={item.c} className="bg-sand-50 border border-slate-200 rounded-2xl p-7">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{isAr ? cAr.challengeLabel : "Challenge"}</span>
                  <h3 className="font-bold text-ink-950 text-base mt-1 mb-3">{item.c}</h3>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <p className="text-gray-600 text-sm leading-relaxed">{item.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PROJECTS & CONSULTATION ── */}
        <section className="py-20 bg-sand-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h3 className="text-lg font-bold text-ink-950 mb-8 uppercase tracking-widest">{isAr ? cAr.featTitle : "Destination Events — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "مهرجان العلا الصحراوي", slug: "alula-desert-festival", desc: "مهرجان صحراوي واسع النطاق بلوجستيات ومسرح وإنتاج متوافق مع الهيئة الملكية للعلا." },
                { title: "قمة نيوم للمستقبل", slug: "neom-future-summit", desc: "قمة مؤسسية استشرافية مُستضافة داخل مشروع نيوم." },
                { title: "ملاذ كبار الشخصيات في مكة", slug: "makkah-vip-retreat", desc: "ملاذ مخصّص لكبار الشخصيات بسفر وإقامة وضيافة متكاملة." },
                  ]
                : [
                { title: "AlUla Desert Festival", slug: "alula-desert-festival", desc: "A large-scale desert festival with full logistics, staging, and RCU-compliant production." },
                { title: "NEOM Future Summit", slug: "neom-future-summit", desc: "A forward-looking corporate summit hosted inside the NEOM development." },
                { title: "Makkah VIP Retreat", slug: "makkah-vip-retreat", desc: "A bespoke VIP retreat with end-to-end travel, accommodation, and hosting." },
              ]).map((p) => (
                <Link key={p.slug} href={`${arHref}/portfolio/${p.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                  <h4 className="text-ink-950 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">{p.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">{isAr ? cAr.viewProject : "View Project"} <ChevronRight size={12} /></span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-8">
              <div>
                <h3 className="text-ink-950 font-bold text-lg">{isAr ? cAr.ctaH3 : "Planning a destination event?"}</h3>
                <p className="text-gray-500 text-sm mt-1">{isAr ? cAr.ctaP : "Book a free consultation or speak with our destination team — we typically reply within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? cAr.ctaConsult : "Book a Free Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? cAr.ctaContact : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-gray-500 text-sm mt-6">شاهد <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو استكشف فعاليات <Link href={`${arHref}/locations/alula`} className="text-[var(--primary)] font-semibold hover:underline">العلا</Link>.</p>
            ) : (
              <p className="text-gray-500 text-sm mt-6">See our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or explore events in <Link href="/locations/alula" className="text-[var(--primary)] font-semibold hover:underline">AlUla</Link>.</p>
            )}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-sand-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-ink-950 uppercase tracking-widest">{isAr ? cAr.relTitle : "Related Services"}</h3>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? cAr.relViewAll : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isAr
                ? [
                { title: "الفعاليات الفاخرة وكبار الشخصيات", slug: "luxury-vip-events", desc: "فعاليات العائلة المالكة، وكونسيرج كبار الثروات، وتجارب خاصة فائقة الفخامة." },
                { title: "حفلات الزفاف الفاخرة", slug: "weddings", desc: "حفلات زفاف في العلا ونيوم والبحر الأحمر بدعم تخطيط متكامل." },
                { title: "الإنتاج الفعّالياتي", slug: "event-production", desc: "مسرح وصوت وصورة وإضاءة مخصّصة للفعاليات النائية والوجهاتية." },
                  ]
                : [
                { title: "Luxury & VIP Events", slug: "luxury-vip-events", desc: "Royal family events, HNWI concierge, and ultra-luxury private experiences." },
                { title: "Luxury Weddings", slug: "weddings", desc: "Destination weddings at AlUla, NEOM, and the Red Sea with full planning support." },
                { title: "Event Production", slug: "event-production", desc: "Custom stage, AV, and lighting production for remote and destination events." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-sm p-6 hover:border-gold-400/50 hover:shadow-md transition-all"
                >
                  <h4 className="text-ink-950 font-bold mb-2 group-hover:text-gold-600 transition-colors">{rel.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-600 text-xs font-bold flex items-center gap-1">
                    {isAr ? cAr.learnMore : "Learn More"} <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
