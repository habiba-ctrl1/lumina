import Navbar from "@/components/Navbar";
import { hreflangAlternates } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceLeadForm from "@/components/ServiceLeadForm";
import Link from "next/link";
import { Star, Crown, Gem, MapPin, Music, Shield, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  const path = `${base}${locale === "en" ? "" : "/ar"}/services/luxury-vip-events`;
  return {
    title: isAr
      ? { absolute: "إدارة فعاليات كبار الشخصيات في السعودية | فعاليات خاصة ومؤسسية | إدارة الفعاليات السعودية" }
      : "VIP Event Management Saudi Arabia | Private & Corporate Events",
    description: isAr
      ? "إدارة فعاليات كبار الشخصيات وخدمات الكونسيرج الخاصة في الرياض وجدة والعلا. نتخصص في الحفلات الخاصة وفعاليات العائلة المالكة والوفود الحكومية وفعاليات الصحراء واليخوت المخصّصة."
      : "VIP event management and private concierge services in Riyadh, Jeddah, and AlUla. We specialise in private parties, royal family events, government delegations, and bespoke desert and yacht events.",
    keywords: [
      "VIP event planning Saudi Arabia",
      "Luxury events Riyadh",
      "Private party planner Jeddah",
      "Royal family event management KSA",
      "HNWI event concierge Saudi Arabia",
      "Luxury yacht events Red Sea",
      "Exclusive launch events KSA",
      "AlUla private event planner",
      "فعاليات كبار الشخصيات السعودية",
    ],
    alternates: {
      canonical: path,
      languages: hreflangAlternates("/services/luxury-vip-events"),
    },
    openGraph: {
      title: isAr
        ? "إدارة فعاليات كبار الشخصيات في السعودية | إدارة الفعاليات السعودية"
        : "VIP Event Management Saudi Arabia | Saudi Event Management",
      description: isAr
        ? "إدارة متحفّظة لفعاليات كبار الشخصيات للعائلات المالكة والوفود الحكومية والعملاء من القطاع الخاص في عموم السعودية."
        : "Discreet VIP event management for royal families, government delegations, and private clients across Saudi Arabia.",
      url: path,
      images: [{ url: "/services/luxury_vip_majlis.webp", width: 1200, height: 630, alt: "VIP and private event management Saudi Arabia" }],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Luxury VIP Event Experiences Saudi Arabia",
      "description":
        "Exclusive luxury event planning and VIP concierge services for royal families, HNWIs, and diplomatic guests across Riyadh, Jeddah, AlUla, and the Red Sea.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "image": "https://www.saudieventmanagement.com/services/gallery_charity_gala.webp",
        "address": { "@type": "PostalAddress", "addressLocality": "Riyadh", "addressCountry": "SA" },
        "telephone": "+966539388072",
      },
      "areaServed": ["Riyadh", "Jeddah", "AlUla", "Red Sea", "NEOM", "Saudi Arabia"],
      "serviceType": "Luxury Event Management",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you ensure confidentiality for VIP and Royal family events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous background vetting and digital security training. We implement stringent access controls, encrypted communications, and secure perimeter management to ensure absolute privacy for all VIP and royal family events.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you arrange private concerts with international artists in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Through our global talent agency networks, we negotiate and manage private appearances by A-list international musicians, speakers, and performers. We handle all technical riders, artist hospitality, private aviation, and production requirements.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you provide close protection and security for VIP events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We co-ordinate with top-tier private security firms and government protocol offices to provide seamless close-protection, secure perimeter management, motorcade co-ordination, and discreet crowd management for HNWI and diplomatic events.",
          },
        },
        {
          "@type": "Question",
          "name": "What venues do you use for luxury VIP events in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We secure exclusive access to Saudi Arabia's most prestigious private venues — including the Ritz-Carlton Riyadh (used for high-level state events), Four Seasons Riyadh, Rosewood Jeddah, the Maraya concert hall in AlUla, and bespoke private estates and desert locations across the Kingdom.",
          },
        },
        {
          "@type": "Question",
          "name": "Can you organise ultra-luxury desert experiences in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AlUla is one of our signature destinations for luxury events. We design bespoke glamping experiences, private desert dinners beneath the stars, heritage site activations, and high-end corporate retreats — all in collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact protocols.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you offer event planning for HNWI private residences?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Saudi Event Management regularly plans and executes private events at royal palaces, luxury residential compounds, and private estates. We bring our full production capability — catering, staging, entertainment, floral, and decor — directly to the client's private property.",
          },
        },
        {
          "@type": "Question",
          "name": "What is the most exclusive experience you can offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our most exclusive offerings include private concerts with international artists at custom-built stages in AlUla's Hejaz mountains, superyacht events along the Red Sea, and invitation-only brand unveilings with bespoke 360° LED immersive environments — all managed with absolute discretion.",
          },
        },
        {
          "@type": "Question",
          "name": "luxury event planner near me Riyadh",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is based in Riyadh with a dedicated luxury events division. We are the premier luxury event planner for high-profile clients across the capital, offering white-glove service from initial consultation to on-day execution.",
          },
        },
        {
          "@type": "Question",
          "name": "VIP concierge service Saudi Arabia",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our VIP concierge services cover every detail — private chef arrangements, luxury fleet transportation, helicopter transfers, hotel suite buyouts, bespoke gifting, and 24/7 dedicated event manager support for every VIP guest.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Luxury & VIP Events", "item": "https://saudieventmanagement.com/services/luxury-vip-events" },
      ],
    },
  ],
};

const services = [
  { icon: Crown, title: "Royal Family Events", desc: "Discreet and flawless execution of private gatherings for royal family members — complete confidentiality, military-grade security co-ordination, and protocol compliance." },
  { icon: Gem, title: "HNWI Concierge", desc: "End-to-end event concierge for High-Net-Worth Individuals: international talent booking, private chef arrangements, luxury fleet, and 24/7 dedicated manager support." },
  { icon: MapPin, title: "Yacht & Desert Experiences", desc: "Curated ultra-luxury events aboard private superyachts on the Red Sea, or bespoke glamping and stargazing dinners in AlUla's pristine desert landscape." },
  { icon: Star, title: "Exclusive Brand Launches", desc: "High-impact, invitation-only brand unveilings for luxury automotive, haute couture, fine jewellery, and prestige spirits — crafted for social and media amplification." },
  { icon: Music, title: "Private Concerts", desc: "Securing A-list international and regional artists for intimate private performances — full rider management, private aviation, stage production, and broadcast rights." },
  { icon: Shield, title: "VIP Protocol & Security", desc: "Expert diplomatic protocol management, close-protection co-ordination with certified security firms, secure transport, and perimeter access control." },
];

const geoHighlights = [
  { location: "Riyadh", desc: "Ritz-Carlton Royal Suite, Al Murabba Palace, and exclusive penthouses at Al Faisaliah Tower.", tag: "Capital VIP Events" },
  { location: "Jeddah", desc: "Superyacht charters on the Red Sea, Rosewood beachfront events, and rooftop galas above the Corniche.", tag: "Coastal Luxury" },
  { location: "AlUla", desc: "Private dinners at Maraya, desert glamping in Hegra, and bespoke experiences in the Hejaz mountains.", tag: "Heritage Destinations" },
  { location: "NEOM", desc: "Forward-thinking luxury summits and private retreats inside Saudi Arabia's $500B giga-project.", tag: "Innovation Retreats" },
];

const resources = [
  { title: "AlUla Events Guide: Maraya, Hegra & Desert Experience Planning", desc: "How to access Maraya for private events, plan Hegra heritage dinners, and navigate RCU permits.", href: "/blog/alula-events-guide-maraya-hegra-desert" },
  { title: "The Golden Thread: Weaving Luxury Lifestyle into Saudi Arabia's Top-tier Events", desc: "From bespoke concierge services to invitation-only galas — the Saudi VIP lifestyle guide.", href: "/blog/weaving-exceptional-lifestyle-saudi-arabia-top-tier-events" },
  { title: "VIP Executive Retreats in NEOM: A 2026 Guide", desc: "Strategies for hosting unforgettable VIP executive retreats in NEOM's cutting-edge developments.", href: "/blog/vip-executive-retreats-neom-2026" },
  { title: "Best Corporate Event Venues in Riyadh 2026", desc: "An exclusive guide to the Kingdom's premier venues — KAFD, Ritz-Carlton, and five-star hotel ballrooms.", href: "/blog/best-corporate-event-venues-riyadh-2026" },
];

const faqs = [
  { q: "How do you ensure confidentiality for VIP and Royal family events?", a: "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous background vetting and digital security training. We implement stringent access controls, encrypted communications, and secure perimeter management." },
  { q: "Can you arrange private concerts with international artists in Saudi Arabia?", a: "Yes. Through our global talent agency networks, we negotiate and manage private appearances by A-list international musicians and performers, handling all rider requirements, private aviation, and technical production." },
  { q: "Do you provide close protection and security for VIP events?", a: "We co-ordinate with top-tier private security firms and government protocol offices for seamless close-protection, secure perimeter management, motorcade co-ordination, and discreet crowd management." },
  { q: "What venues do you use for luxury VIP events in Saudi Arabia?", a: "We secure exclusive access to Saudi Arabia's most prestigious venues including the Ritz-Carlton Riyadh, Four Seasons, Rosewood Jeddah, Maraya Concert Hall in AlUla, and bespoke private estates across the Kingdom." },
  { q: "Can you organise ultra-luxury desert experiences in AlUla?", a: "Yes. AlUla is one of our signature VIP destinations. We design private desert dinners, glamping experiences, and heritage site activations in full collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact operations." },
  { q: "Do you offer event planning for HNWI private residences?", a: "Yes. We regularly plan and execute private events at royal palaces, luxury compounds, and private estates across the Kingdom — bringing our full production capability directly to the client's private property." },
  { q: "What is the most exclusive experience you can offer?", a: "Our most exclusive offerings include private concerts with international artists at custom-built stages in AlUla's Hejaz mountains, superyacht events along the Red Sea coastline, and invitation-only brand unveilings with bespoke 360° immersive environments." },
  { q: "luxury event planner near me Riyadh", a: "Saudi Event Management's VIP division is headquartered in Riyadh, providing white-glove event planning services for high-profile clients across the capital with immediate on-site availability." },
  { q: "VIP concierge service Saudi Arabia", a: "Our VIP concierge services cover every detail — private chef arrangements, luxury fleet transportation, helicopter transfers, hotel suite buyouts, bespoke gifting, and a 24/7 dedicated event manager for every VIP guest." },
];

/* ─── Arabic body content (long-form). Parallel to the English arrays above. ─── */
const servicesAr = [
  { title: "فعاليات العائلة المالكة", desc: "تنفيذ متحفّظ ولا تشوبه شائبة للتجمّعات الخاصة لأفراد العائلة المالكة — سرية تامة، وتنسيق أمني بدقة عالية، والتزام بالبروتوكول." },
  { title: "كونسيرج كبار الثروات", desc: "كونسيرج فعاليات متكامل لكبار الثروات: حجز مواهب عالمية، وترتيبات طهاة خاصين، وأسطول فاخر، ودعم مدير مخصّص على مدار الساعة." },
  { title: "تجارب اليخوت والصحراء", desc: "فعاليات فائقة الفخامة على متن يخوت خاصة في البحر الأحمر، أو تخييم فاخر وعشاء تحت النجوم في صحراء العلا البكر." },
  { title: "إطلاقات العلامات الحصرية", desc: "كشف علامات بالدعوة فقط ومؤثّر للسيارات الفاخرة والأزياء الراقية والمجوهرات والمشروبات الفاخرة — مصمّم للتضخيم الاجتماعي والإعلامي." },
  { title: "الحفلات الموسيقية الخاصة", desc: "تأمين نجوم عالميين وإقليميين من الصف الأول لعروض خاصة حميمة — إدارة كاملة للمتطلبات، وطيران خاص، وإنتاج مسرح، وحقوق بث." },
  { title: "بروتوكول وأمن كبار الشخصيات", desc: "إدارة بروتوكول دبلوماسي خبيرة، وتنسيق حماية مباشرة مع شركات أمن معتمدة، ونقل آمن، والتحكم بالدخول للمحيط." },
];

const geoHighlightsAr = [
  { location: "الرياض", tag: "فعاليات كبار الشخصيات في العاصمة", desc: "الجناح الملكي في ريتز كارلتون، وقصر المربع، وأجنحة حصرية في برج الفيصلية." },
  { location: "جدة", tag: "الفخامة الساحلية", desc: "استئجار يخوت فاخرة في البحر الأحمر، وفعاليات روزوود على الشاطئ، وحفلات على أسطح الكورنيش." },
  { location: "العلا", tag: "وجهات تراثية", desc: "عشاء خاص في مرايا، وتخييم فاخر في الحِجر، وتجارب مخصّصة في جبال الحجاز." },
  { location: "نيوم", tag: "ملتقيات الابتكار", desc: "قمم فاخرة استشرافية وملتقيات خاصة داخل المشروع العملاق بقيمة 500 مليار دولار في السعودية." },
];

const resourcesAr = [
  { title: "دليل فعاليات العلا: مرايا والحِجر وتخطيط تجارب الصحراء", desc: "كيفية الوصول إلى مرايا للفعاليات الخاصة، وتخطيط عشاء الحِجر التراثي، والتعامل مع تصاريح الهيئة الملكية للعلا." },
  { title: "الخيط الذهبي: نسج نمط الحياة الفاخر في أرقى فعاليات السعودية", desc: "من خدمات الكونسيرج المخصّصة إلى الحفلات بالدعوة فقط — دليل نمط حياة كبار الشخصيات في السعودية." },
  { title: "ملتقيات كبار التنفيذيين في نيوم: دليل 2026", desc: "استراتيجيات لاستضافة ملتقيات تنفيذية لا تُنسى في مشاريع نيوم المتطوّرة." },
  { title: "أفضل قاعات فعاليات الشركات في الرياض 2026", desc: "دليل حصري لأبرز قاعات المملكة — مركز الملك عبدالله المالي وريتز كارلتون وقاعات فنادق الخمس نجوم." },
];

const faqsAr = [
  { q: "كيف تضمنون السرية لفعاليات كبار الشخصيات والعائلة المالكة؟", a: "نعمل بموجب اتفاقيات عدم إفصاح صارمة (NDA). ويخضع طاقمنا النخبوي لفحص خلفية دقيق وتدريب على الأمن الرقمي. ونطبّق ضوابط دخول صارمة، واتصالات مشفّرة، وإدارة محيط آمن." },
  { q: "هل يمكنكم تنظيم حفلات موسيقية خاصة مع فنانين عالميين في السعودية؟", a: "نعم. عبر شبكات وكالات المواهب العالمية لدينا، نتفاوض وندير ظهورات خاصة لموسيقيين وفنانين عالميين من الصف الأول، ونتولّى كل المتطلبات والطيران الخاص والإنتاج التقني." },
  { q: "هل توفّرون حماية مباشرة وأمنًا لفعاليات كبار الشخصيات؟", a: "ننسّق مع كبرى شركات الأمن الخاص ومكاتب البروتوكول الحكومية لحماية مباشرة سلسة، وإدارة محيط آمن، وتنسيق المواكب، وإدارة حشود متحفّظة." },
  { q: "ما القاعات التي تستخدمونها لفعاليات كبار الشخصيات الفاخرة في السعودية؟", a: "نؤمّن وصولًا حصريًا لأرقى قاعات السعودية بما فيها ريتز كارلتون الرياض، وفورسيزونز، وروزوود جدة، وقاعة مرايا في العلا، وعقارات خاصة مخصّصة في عموم المملكة." },
  { q: "هل يمكنكم تنظيم تجارب صحراوية فائقة الفخامة في العلا؟", a: "نعم. العلا من وجهاتنا المميزة لكبار الشخصيات. نصمّم عشاءً صحراويًا خاصًا، وتجارب تخييم فاخر، وتفعيلات في المواقع التراثية بالتعاون الكامل مع الهيئة الملكية للعلا للوصول إلى المواقع وعمليات دون أثر." },
  { q: "هل تقدّمون تخطيط فعاليات للإقامات الخاصة لكبار الثروات؟", a: "نعم. ننظّم وننفّذ بانتظام فعاليات خاصة في القصور الملكية والمجمّعات الفاخرة والعقارات الخاصة في عموم المملكة — ننقل قدرتنا الإنتاجية الكاملة مباشرة إلى عقار العميل الخاص." },
  { q: "ما أكثر تجربة حصرية يمكنكم تقديمها؟", a: "تشمل أكثر عروضنا حصرية حفلات موسيقية خاصة مع فنانين عالميين على مسارح مخصّصة في جبال حجاز العلا، وفعاليات يخوت على ساحل البحر الأحمر، وكشف علامات بالدعوة فقط ببيئات غامرة 360°." },
  { q: "مخطط فعاليات فاخرة قريب مني في الرياض", a: "يقع قسم كبار الشخصيات لدى إدارة الفعاليات السعودية في الرياض، ويوفّر خدمات تخطيط فعاليات راقية للعملاء البارزين في عموم العاصمة بتوفّر ميداني فوري." },
  { q: "خدمة كونسيرج كبار الشخصيات في السعودية", a: "تغطّي خدمات الكونسيرج لدينا كل تفصيل — ترتيبات طهاة خاصين، ونقل بأسطول فاخر، وتنقّلات بطائرات هليكوبتر، وحجز أجنحة فندقية كاملة، وهدايا مخصّصة، ومدير فعالية مخصّص على مدار الساعة لكل ضيف." },
];

const challengesAr = [
  { c: "الخصوصية والتحفّظ المطلق", s: "اتفاقيات عدم إفصاح صارمة، وطاقم موثوق، وإعلام مُتحكَّم به، وقوائم ضيوف على أساس الحاجة للمعرفة تحمي العملاء البارزين قبل الفعالية وأثناءها وبعدها." },
  { c: "تنسيق الأمن والحماية المباشرة", s: "ننسّق مع الأمن الخاص والجهات بشأن المواكب والتحكم بالدخول والمحيط الآمن — دون أن يشعر الضيوف بأنهم تحت الرقابة." },
  { c: "الطلبات المخصّصة اللحظية", s: "كونسيرج مخصّص وشبكة موردين عميقة تجعل الطلبات النادرة — فنانون خاصون، ولوجستيات استئجار، ومستلزمات نادرة — تتحقق بهدوء وسرعة." },
  { c: "تنفيذ مثالي دون بروفة", s: "مخطّطون كبار وخطط بديلة مدمجة تعني أن الفعالية الخاصة لمرة واحدة تسير بإتقان من المرة الأولى، لأنه لا توجد إعادة." },
];

const cAr = {
  ctaConsult: "اطلب استشارة خاصة",
  ctaWhatsapp: "واتساب متحفّظ",
  servEyebrow: "قسم كبار الشخصيات",
  servH2a: "نصمّم تجارب",
  servH2b: "حصرية لكبار الشخصيات",
  servPpre: "بصفتنا منظِّم فعاليات كبار الشخصيات وخدمة الكونسيرج الفاخرة الأولى في السعودية، نقدّم تخطيطًا متحفّظًا وراقيًا لأكثر عملاء المملكة تميّزًا. من التجمّعات الملكية الخاصة و",
  servLinkDest: "ملتقيات الصحراء في العلا",
  servPmid: " إلى تأمين قاعات حصرية في ",
  servLinkRiyadh: "الحي الدبلوماسي بالرياض",
  servPpost: "، كل تفصيل مُتوقَّع، وكل سرّ محفوظ بدقة.",
  geoEyebrow: "أين نُبدع",
  geoH2a: "وجهات",
  geoH2b: "أيقونية",
  geoP: "كل موقع في المملكة يقدّم لوحة فريدة لتجارب فائقة الفخامة.",
  formEyebrow: "بالدعوة · خاص تمامًا",
  formH2a: "ابدأ محادثة",
  formH2b: "سرّية.",
  formP: "شاركنا بعض التفاصيل المتحفّظة وسيتواصل معك مدير قسم كبار الشخصيات شخصيًا خلال ساعتين. كل استفسار محمي باتفاقية عدم إفصاح من أول تواصل.",
  formBullets: [
    "محمي باتفاقية عدم إفصاح من أول رسالة",
    "مدير فعاليات كبار شخصيات مخصّص على مدار الساعة",
    "وصول حصري إلى مرايا وريتز كارلتون والعقارات الخاصة",
    "نجوم الصف الأول، وطيران خاص، وحماية مباشرة",
  ],
  teamName: "فريق شؤون البروتوكول",
  teamSub: "قسم الفعاليات الدبلوماسية وكبار الشخصيات",
  formPropEyebrow: "استفسار خاص",
  formPropHeading: "اطلب استشارة خاصة",
  formPropSub: "سرّي ومتحفّظ. سيردّ مدير قسم كبار الشخصيات شخصيًا خلال ساعتين.",
  formPropSubmit: "اطلب استشارة خاصة",
  khEyebrow: "معرفة داخلية",
  khH2a: "موارد تخطيط",
  khH2b: "كبار الشخصيات",
  khP: "معرفة داخلية لأكثر عملاء فعاليات المملكة تميّزًا.",
  khViewAll: "عرض كل الأدلّة",
  faqH2a: "الأسئلة الشائعة",
  faqH2b: "لفعاليات كبار الشخصيات",
  chLabel: "اعتبارات واقعية",
  chH2a: "تحديات فعاليات كبار الشخصيات — ",
  chH2b: "تُدار بتحفّظ",
  chP: "الفعاليات الخاصة للعائلات المالكة وكبار الثروات تتطلب معيارًا مختلفًا. وإليك كيف يدير فريقنا الاعتبارات الأهم.",
  challengeLabel: "التحدّي",
  featTitle: "فعاليات خاصة — مشاريع مختارة",
  viewProject: "عرض المشروع",
  ctaH3: "تخطّط لفعالية خاصة لكبار الشخصيات؟",
  ctaP: "رتّب استشارة سرّية أو تحدّث إلى فريق الفعاليات الخاصة — نردّ بتحفّظ خلال ساعتين.",
  ctaConsult2: "استشارة خاصة",
  ctaContact: "تواصل معنا",
  relTitle: "خدمات ذات صلة",
  relViewAll: "عرض كل الخدمات",
  learnMore: "اعرف المزيد",
};

export default async function LuxuryVIPEventsPage() {
  const isAr = (await getLocale()) === "ar";
  const arHref = isAr ? "/ar" : "";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white overflow-hidden">
        <Navbar />

        <InternalPageHero
          title={isAr ? "إدارة فعاليات كبار الشخصيات والخاصة" : "VIP & Private Event Management"}
          titleHighlight={isAr ? "في السعودية" : "Saudi Arabia"}
          subtitle={
            isAr
              ? "فريق متخصص في إدارة فعاليات كبار الشخصيات للعائلات المالكة والوفود الحكومية والعملاء الخاصين — تجارب متحفّظة وراقية من الحفلات الخاصة وفعاليات اليخوت إلى تجمّعات الصحراء المخصّصة في العلا."
              : "A specialist VIP event management team for royal families, government delegations, and private clients — discreet, white-glove experiences from private concerts and yacht events to bespoke desert gatherings in AlUla."
          }
          backgroundImage="/services/premium_luxury_vip_hero.webp"
          imageAlt="Exclusive luxury private VIP event in Saudi Arabia at night"
          badge={isAr ? "فعاليات كبار الشخصيات والخاصة" : "VIP & Private Events"}
          enableParallax
          breadcrumbs={[
            { label: isAr ? "الرئيسية" : "Home", href: arHref || "/" },
            { label: isAr ? "الخدمات" : "Services", href: `${arHref}/services` },
            { label: isAr ? "فعاليات كبار الشخصيات" : "Luxury VIP Events" },
          ]}
          minHeight="large"
          trustElements={[
            { value: "100%", label: "Confidential · NDA Protected" },
            { value: "24/7", label: "Dedicated VIP Concierge" },
            { value: "A-List", label: "International Talent Access" },
          ]}
        />

        {/* ── CTA BAR ── */}
        <div className="bg-white border-b border-neutral-200/80 py-6">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#private-consultation"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-gold-700 text-white font-semibold uppercase tracking-widest hover:bg-gold-800 transition-all shadow-[0_4px_14px_rgba(127,102,66,0.3)] rounded-xl text-[13px] w-full sm:w-auto"
            >
              {isAr ? cAr.ctaConsult : "Request Private Consultation"}
            </Link>
            <a
              href="https://wa.me/966539388072?text=Hi%2C%20I%27d%20like%20a%20private%20VIP%20event%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-neutral-200 text-neutral-700 font-semibold uppercase tracking-widest hover:border-gold-700 hover:text-gold-700 transition-all text-[13px] rounded-xl w-full sm:w-auto"
            >
              <Phone size={15} /> {isAr ? cAr.ctaWhatsapp : "Discreet WhatsApp"}
            </a>
          </div>
        </div>

        {/* ── Credentials Bar ── */}
        <section className="py-9 border-b border-neutral-200/80 bg-[var(--surface-warm)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[11px] font-bold tracking-[0.18em] text-neutral-400">
              <span className="hover:text-gold-700 transition-colors">RITZ-CARLTON</span>
              <span className="hover:text-gold-700 transition-colors">FOUR SEASONS</span>
              <span className="hover:text-gold-700 transition-colors">ROSEWOOD JEDDAH</span>
              <span className="hover:text-gold-700 transition-colors">MARAYA — ALULA</span>
              <span className="hover:text-gold-700 transition-colors">RCU PARTNER</span>
            </div>
          </div>
        </section>

        {/* ── PREMIUM PARALLAX STATEMENT BAND ── */}
        <section className="relative isolate bg-fixed bg-cover bg-center py-24 overflow-hidden" style={{ backgroundImage: "url('/services/gallery_charity_gala.webp')" }} aria-label="Luxury event visual showcase">
          <div aria-hidden className="absolute inset-0 bg-[#131310]/80" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="flex animate-marquee-slow whitespace-nowrap opacity-30 select-none">
              <span className="text-gold-300 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Absolute Discretion</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #fcd34d' }}>Bespoke Luxury</span>
              <span className="text-gold-300 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Absolute Discretion</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #fcd34d' }}>Bespoke Luxury</span>
              <span className="text-gold-300 text-7xl md:text-9xl font-black uppercase tracking-widest mx-8">Absolute Discretion</span>
              <span className="text-transparent text-7xl md:text-9xl font-black uppercase tracking-widest mx-8" style={{ WebkitTextStroke: '2px #fcd34d' }}>Bespoke Luxury</span>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="py-24 md:py-28 bg-white bg-glow-top">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700 mb-4">
                <span className="w-5 h-px bg-gold-400" /> {isAr ? cAr.servEyebrow : "The VIP Division"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {isAr ? cAr.servH2a : "Curating Bespoke"} <br className="hidden md:block" />
                <span className="text-gold-700">{isAr ? cAr.servH2b : "VIP Experiences"}</span>
              </h2>
              <p className="text-neutral-500 max-w-3xl mx-auto text-sm leading-relaxed">
                {isAr ? (
                  <>
                    {cAr.servPpre}<Link href={`${arHref}/services/destination-events`} className="text-gold-700 hover:underline font-semibold">{cAr.servLinkDest}</Link>{cAr.servPmid}<Link href={`${arHref}/locations/riyadh`} className="text-gold-700 hover:underline font-semibold">{cAr.servLinkRiyadh}</Link>{cAr.servPpost}
                  </>
                ) : (
                  <>
                    As Saudi Arabia&apos;s premier luxury concierge and VIP event planner, we deliver discreet, white-glove planning for the Kingdom&apos;s most discerning clients. From private royal gatherings and <Link href="/services/destination-events" className="text-gold-700 hover:underline font-semibold">desert retreats in AlUla</Link> to securing exclusive venues in <Link href="/locations/riyadh" className="text-gold-700 hover:underline font-semibold">Riyadh&apos;s Diplomatic Quarter</Link>, every detail is anticipated, and every confidence is strictly kept.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200/80 p-8 rounded-2xl hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.18)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center mb-5 group-hover:bg-gold-700 transition-colors">
                    <s.icon size={22} className="text-gold-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{isAr ? servicesAr[i].title : s.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{isAr ? servicesAr[i].desc : s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GEO Highlights ── */}
        <section className="py-24 md:py-28 bg-[var(--surface-warm)] border-y border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700 mb-4">
                <span className="w-5 h-px bg-gold-400" /> {isAr ? cAr.geoEyebrow : "Where We Create"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? cAr.geoH2a : "Iconic"} <span className="text-gold-700">{isAr ? cAr.geoH2b : "destinations"}</span>
              </h2>
              <p className="text-neutral-500 mt-4 text-sm max-w-2xl mx-auto">
                {isAr ? cAr.geoP : "Each location in the Kingdom presents a unique canvas for ultra-luxury experiences."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {geoHighlights.map((geo, i) => (
                <div key={i} className="bg-white border border-neutral-200/80 rounded-2xl p-7 hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all">
                  <span className="text-[10px] text-gold-700 uppercase tracking-widest font-bold block mb-3">{isAr ? geoHighlightsAr[i].tag : geo.tag}</span>
                  <h3 className="text-neutral-900 font-bold text-lg mb-3">{isAr ? geoHighlightsAr[i].location : geo.location}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{isAr ? geoHighlightsAr[i].desc : geo.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRIVATE CONSULTATION / LEAD FORM (exclusive obsidian band) ── */}
        <section id="private-consultation" className="py-24 md:py-28 relative overflow-hidden bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/services/luxury_vip_majlis.webp')" }}>
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(19,19,16,0.95) 0%, rgba(28,26,20,0.92) 55%, rgba(42,37,26,0.95) 100%)" }} />
          <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-gold-400/[0.04] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-white space-y-7">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gold-300">
                  <span className="w-6 h-px bg-gold-400" /> {isAr ? cAr.formEyebrow : "By Invitation · Strictly Private"}
                </span>
                {isAr ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    {cAr.formH2a}<br />
                    <span className="text-gold-300">{cAr.formH2b}</span>
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                    Begin a confidential<br />
                    <span className="text-gold-300">conversation.</span>
                  </h2>
                )}
                <p className="text-white/65 text-base leading-relaxed max-w-md">
                  {isAr
                    ? cAr.formP
                    : "Share a few discreet details and the Director of our VIP Division will personally reach out within two hours. Every enquiry is protected under NDA from first contact."}
                </p>
                <ul className="space-y-3.5 pt-2">
                  {(isAr
                    ? cAr.formBullets
                    : [
                    "NDA-protected from the very first message",
                    "Dedicated 24/7 VIP event director",
                    "Exclusive access to Maraya, Ritz-Carlton & private estates",
                    "A-list talent, private aviation & close protection",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/85 text-sm">
                      <CheckCircle2 size={18} className="text-gold-300 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white font-bold text-sm">{isAr ? cAr.teamName : "H.H. Protocol Affairs Team"}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{isAr ? cAr.teamSub : "Diplomatic & VIP Events Division"}</p>
                </div>
              </div>
              <ServiceLeadForm
                source="luxury_vip_events_page"
                defaultEventType="Luxury & VIP Event"
                eyebrow={isAr ? cAr.formPropEyebrow : "Private Enquiry"}
                heading={isAr ? cAr.formPropHeading : "Request a private consultation"}
                subheading={isAr ? cAr.formPropSub : "Confidential and discreet. The Director of our VIP Division will respond personally within 2 hours."}
                submitLabel={isAr ? cAr.formPropSubmit : "Request Private Consultation"}
                eventTypeOptions={[
                  "Royal Family Event",
                  "HNWI Private Celebration",
                  "Private Concert",
                  "Yacht / Desert Experience",
                  "Exclusive Brand Launch",
                  "Diplomatic / Protocol Event",
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
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-wider text-gold-700">
                  <span className="w-5 h-px bg-gold-400" /> {isAr ? cAr.khEyebrow : "Insider Knowledge"}
                </span>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {isAr ? cAr.khH2a : "VIP planning"} <br />
                  <span className="text-gold-700">{isAr ? cAr.khH2b : "resources"}</span>
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {isAr ? cAr.khP : "Insider knowledge for the Kingdom's most discerning event clients."}
                </p>
                <Link href={`${arHref}/blog`} className="inline-block text-gold-700 text-xs font-bold uppercase tracking-widest border-b border-gold-400 pb-1">
                  {isAr ? cAr.khViewAll : "View All Guides"}
                </Link>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((r, i) => (
                  <Link
                    key={i}
                    href={`${arHref}${r.href}`}
                    className="p-6 bg-[var(--surface-warm)] border border-gold-200/50 rounded-2xl hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all cursor-pointer group block"
                  >
                    <h3 className="text-neutral-900 font-bold text-sm mb-3 group-hover:text-gold-700 transition-colors">
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
        <section className="py-24 md:py-28 bg-[var(--surface-warm)] border-b border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-16">
              تجارب <span className="text-gold-700">لا تُنسى</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { ar: "مخطط فعاليات كبار الشخصيات الرياض", en: "VIP Event Planner Riyadh", desc: "خدمات تنظيم فعاليات خاصة بأعلى معايير الفخامة والخصوصية في العاصمة." },
                { ar: "فعاليات فاخرة العُلا والبحر الأحمر", en: "Luxury Events AlUla & Red Sea", desc: "تجارب فريدة من نوعها في أجمل وجهات المملكة الطبيعية والتراثية." },
                { ar: "خدمة كونسيرج خاصة السعودية", en: "Private Concierge Service KSA", desc: "رعاية شاملة لكل تفصيل في حفلاتكم الخاصة بسرية ودقة مطلقة." },
              ].map((item) => (
                <div key={item.en} className="bg-white border border-neutral-200/80 rounded-2xl p-8 hover:border-gold-400 transition-all">
                  <h3 className="text-gold-700 font-bold text-xl mb-3">{item.ar}</h3>
                  <p className="text-neutral-400 text-xs mb-4">{item.en}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                {isAr ? cAr.faqH2a : "VIP events"} <span className="text-gold-700">{isAr ? cAr.faqH2b : "FAQ"}</span>
              </h2>
              <div className="w-12 h-px bg-gold-400 mx-auto mt-4" />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[var(--surface-warm)] border border-gold-200/50 p-7 rounded-2xl">
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
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{isAr ? cAr.chH2a : "VIP event challenges — "}<span className="text-[var(--primary)]">{isAr ? cAr.chH2b : "handled with discretion"}</span></h2>
              <p className="text-neutral-500 mt-4 max-w-2xl mx-auto text-sm">{isAr ? cAr.chP : "Private events for royal families and high-net-worth clients demand a different standard. Here is how our team manages the considerations that matter most."}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isAr
                ? challengesAr
                : [
                { c: "Absolute privacy & discretion", s: "Strict NDAs, vetted crew, controlled media, and need-to-know guest lists protect high-profile clients before, during, and after the event." },
                { c: "Security & close-protection coordination", s: "We liaise with private security and authorities on motorcades, access control, and secure perimeters — without making guests feel policed." },
                { c: "Last-minute, bespoke requests", s: "A dedicated concierge and a deep vendor network make rare requests — private performers, charter logistics, rare provisions — happen quietly and quickly." },
                { c: "Flawless, no-rehearsal execution", s: "Senior planners and built-in contingencies mean a one-off private event runs perfectly the first time, because there is no second take." },
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
            <h3 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">{isAr ? cAr.featTitle : "Private Events — Featured Projects"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {(isAr
                ? [
                { title: "أمسية الرياض الفاخرة", slug: "riyadh-luxury-soiree", desc: "أمسية خاصة بالدعوة فقط بتنسيق مخصّص وسرية تامة." },
                { title: "ملاذ كبار الشخصيات في مكة", slug: "makkah-vip-retreat", desc: "ملاذ متحفّظ لكبار الشخصيات بضيافة كونسيرج وتنسيق حماية مباشرة." },
                { title: "مجلس الرياض النخبوي", slug: "riyadh-elite-majlis", desc: "مجلس حصري يمزج الضيافة التقليدية برقي الفعاليات الخاصة." },
                  ]
                : [
                { title: "Riyadh Luxury Soirée", slug: "riyadh-luxury-soiree", desc: "An invitation-only private soirée with bespoke styling and complete discretion." },
                { title: "Makkah VIP Retreat", slug: "makkah-vip-retreat", desc: "A discreet VIP retreat with concierge hospitality and close-protection coordination." },
                { title: "Riyadh Elite Majlis", slug: "riyadh-elite-majlis", desc: "An exclusive majlis gathering blending traditional hospitality with private-event polish." },
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
                <h3 className="text-neutral-900 font-bold text-lg">{isAr ? cAr.ctaH3 : "Planning a private VIP event?"}</h3>
                <p className="text-neutral-500 text-sm mt-1">{isAr ? cAr.ctaP : "Arrange a confidential consultation or speak with our private events team — we reply discreetly within two hours."}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`${arHref}/consultation`} className="px-6 py-3 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--primary-dark)] transition-colors">{isAr ? cAr.ctaConsult2 : "Private Consultation"}</Link>
                <Link href={`${arHref}/contact`} className="px-6 py-3 border border-neutral-200 text-neutral-700 text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">{isAr ? cAr.ctaContact : "Contact Us"}</Link>
              </div>
            </div>
            {isAr ? (
              <p className="text-neutral-500 text-sm mt-6">استكشف <Link href={`${arHref}/portfolio`} className="text-[var(--primary)] font-semibold hover:underline">أعمالنا الكاملة</Link>، واطّلع على <Link href={`${arHref}/testimonials`} className="text-[var(--primary)] font-semibold hover:underline">آراء العملاء</Link>، أو اكتشف خدمة <Link href={`${arHref}/services/destination-events`} className="text-[var(--primary)] font-semibold hover:underline">فعاليات الوجهات</Link>.</p>
            ) : (
              <p className="text-neutral-500 text-sm mt-6">Explore our full <Link href="/portfolio" className="text-[var(--primary)] font-semibold hover:underline">event portfolio</Link>, read <Link href="/testimonials" className="text-[var(--primary)] font-semibold hover:underline">client testimonials</Link>, or discover our <Link href="/services/destination-events" className="text-[var(--primary)] font-semibold hover:underline">destination events</Link> service.</p>
            )}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-[var(--surface-warm)] border-t border-gold-200/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-widest">{isAr ? cAr.relTitle : "Related Services"}</h2>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? cAr.relViewAll : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isAr
                ? [
                { title: "فعاليات الوجهات", slug: "destination-events", desc: "العلا ونيوم وساحل البحر الأحمر — مواقع آسرة لفعاليات استثنائية." },
                { title: "حفلات الزفاف الفاخرة", slug: "weddings", desc: "أعراس ملكية واحتفالات اجتماعية مخصّصة في أرقى قاعات السعودية." },
                { title: "فعاليات الشركات", slug: "corporate-events", desc: "ملتقيات تنفيذية وفعاليات مجالس إدارة رفيعة بإدارة بروتوكول كبار الشخصيات الكاملة." },
                  ]
                : [
                { title: "Destination Events", slug: "destination-events", desc: "AlUla, NEOM, Red Sea coastal — breathtaking locations for extraordinary events." },
                { title: "Luxury Weddings", slug: "weddings", desc: "Royal weddings and bespoke social celebrations at Saudi Arabia's finest venues." },
                { title: "Corporate Events", slug: "corporate-events", desc: "Executive retreats and high-level board events with full VIP protocol management." },
              ]).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-white border border-neutral-200/80 rounded-2xl p-6 hover:border-gold-400 hover:shadow-[0_8px_30px_rgba(197,168,128,0.15)] transition-all"
                >
                  <h3 className="text-neutral-900 font-bold mb-2 group-hover:text-gold-700 transition-colors">{rel.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-3">{rel.desc}</p>
                  <span className="text-gold-700 text-xs font-bold flex items-center gap-1">
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
