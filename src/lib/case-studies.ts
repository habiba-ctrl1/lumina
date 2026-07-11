// Single source of truth for portfolio case studies — powers the per-page
// structured data (CaseStudySchema), the related-projects / conversion block
// (CaseStudyCTA), and per-page metadata (caseStudyMetadata).

import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";

const BASE = "https://saudieventmanagement.com";

export type CaseStudy = {
  slug: string;
  name: string;
  description: string;
  category: string;
  location: string;
  image: string;
  /** Arabic translations for /ar rendering + metadata. */
  ar: {
    name: string;
    description: string;
    category: string;
    location: string;
  };
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "royal-riyadh-wedding": {
    slug: "royal-riyadh-wedding",
    name: "Riyadh Royal-Style Palace Wedding",
    description:
      "A concept for an 800-guest royal-style wedding in Riyadh, illustrating a bespoke architectural desert-oasis build, full VIP protocol, and end-to-end luxury production.",
    category: "Luxury Weddings",
    location: "Riyadh",
    image: "/royal_wedding_saudi.webp",
    ar: {
      name: "زفاف بروتوكول ملكي في الرياض",
      description: "تصوّر لزفاف بأسلوب ملكي لـ 800 ضيف في الرياض، يوضّح بناء واحة صحراوية معمارية مخصصة، وبروتوكول كامل لكبار الشخصيات، وإنتاج فاخر من البداية إلى النهاية.",
      category: "حفلات الزفاف الفاخرة",
      location: "الرياض",
    },
  },
  "makkah-vip-retreat": {
    slug: "makkah-vip-retreat",
    name: "Makkah VIP Retreat",
    description:
      "A 10-day ultra-luxury private retreat in Makkah with multi-tier security, bespoke private dining, and zero-wait Haram transport logistics for a high-profile VIP delegation.",
    category: "VIP & Private Events",
    location: "Makkah",
    image: "/portfolio/makkah-vip-retreat.webp",
    ar: {
      name: "ملاذ كبار الشخصيات في مكة",
      description: "ملاذ خاص فائق الفخامة لمدة 10 أيام في مكة المكرمة مع أمن متعدد المستويات، وضيافة طعام خاصة، وتنقّلات سلسة إلى الحرم لوفد رفيع المستوى.",
      category: "فعاليات كبار الشخصيات والخاصة",
      location: "مكة المكرمة",
    },
  },
  "madinah-spiritual-event": {
    slug: "madinah-spiritual-event",
    name: "Madinah Spiritual Event",
    description:
      "A dignified spiritual gathering in Madinah Al-Munawwarah, designed around tranquility, prayer-time flow, and traditional craftsmanship with discreet five-star hospitality.",
    category: "Cultural & Spiritual Events",
    location: "Madinah",
    image: "/portfolio/madinah-spiritual.webp",
    ar: {
      name: "فعالية روحانية في المدينة",
      description: "تجمّع روحاني راقٍ في المدينة المنورة، مصمَّم حول السكينة وانسيابية أوقات الصلاة والحِرف التقليدية مع ضيافة خمس نجوم بتحفّظ تام.",
      category: "الفعاليات الثقافية والروحانية",
      location: "المدينة المنورة",
    },
  },
  "alula-desert-festival": {
    slug: "alula-desert-festival",
    name: "AlUla Desert Festival",
    description:
      "A heritage desert festival production in AlUla's Ashar Valley blending Nabataean landscapes with contemporary staging, lighting, and seated-audience experience.",
    category: "Cultural Events",
    location: "AlUla",
    image: "/portfolio/alula-festival.webp",
    ar: {
      name: "مهرجان العُلا الصحراوي",
      description: "إنتاج مهرجان تراثي صحراوي في وادي أشار بالعُلا يمزج المناظر النبطية مع المسرح المعاصر والإضاءة وتجربة الجمهور.",
      category: "الفعاليات الثقافية",
      location: "العُلا",
    },
  },
  "dammam-corporate-seminar": {
    slug: "dammam-corporate-seminar",
    name: "Dammam Corporate Seminar",
    description:
      "An energy-sector corporate seminar in Dammam / Al-Khobar with full conference production, delegate management, and networking program on the Arabian Gulf coast.",
    category: "Corporate Events",
    location: "Dammam",
    image: "/portfolio/dammam-seminar.webp",
    ar: {
      name: "ندوة الدمام للشركات",
      description: "ندوة شركات لقطاع الطاقة في الدمام والخبر مع إنتاج مؤتمرات كامل وإدارة الوفود وبرنامج تواصل على ساحل الخليج العربي.",
      category: "فعاليات الشركات",
      location: "الدمام",
    },
  },
  "executive-summit-jeddah": {
    slug: "executive-summit-jeddah",
    name: "Jeddah Executive Summit",
    description:
      "A 300-guest high-security diplomatic corporate summit at a prominent Jeddah venue, with protocol management, stage production, and Red Sea hospitality.",
    category: "Corporate Events",
    location: "Jeddah",
    image: "/portfolio/jeddah-summit.webp",
    ar: {
      name: "قمة جدة التنفيذية",
      description: "قمة شركات دبلوماسية عالية الأمان لـ 300 ضيف في مكان مرموق بجدة، مع إدارة البروتوكول وإنتاج المسرح وضيافة على البحر الأحمر.",
      category: "فعاليات الشركات",
      location: "جدة",
    },
  },
  "global-tech-summit": {
    slug: "global-tech-summit",
    name: "Global Tech Summit",
    description:
      "A large-scale technology conference in Riyadh with an LED keynote stage, immersive production, and full delegate and speaker management.",
    category: "Conferences & Summits",
    location: "Riyadh",
    image: "/portfolio/tech-summit.webp",
    ar: {
      name: "القمة التقنية العالمية",
      description: "مؤتمر تقني واسع النطاق في الرياض مع منصة عرض LED وإنتاج غامر وإدارة كاملة للوفود والمتحدثين.",
      category: "المؤتمرات والقمم",
      location: "الرياض",
    },
  },
  "neom-future-summit": {
    slug: "neom-future-summit",
    name: "NEOM Future Summit",
    description:
      "A 250-VIP zero-waste luxury conference production for a leading Saudi giga-project, delivered inside NEOM's contemporary venue infrastructure.",
    category: "Conferences & Summits",
    location: "NEOM",
    image: "/portfolio/neom-summit.webp",
    ar: {
      name: "قمة نيوم للمستقبل",
      description: "إنتاج مؤتمر فاخر خالٍ من النفايات لـ 250 من كبار الشخصيات لأحد المشاريع العملاقة السعودية الرائدة، داخل بنية نيوم العصرية.",
      category: "المؤتمرات والقمم",
      location: "نيوم",
    },
  },
  "riyadh-elite-majlis": {
    slug: "riyadh-elite-majlis",
    name: "Riyadh Elite Majlis",
    description:
      "An opulent traditional Saudi majlis gathering in Riyadh with Najdi-inspired décor, gold-and-cream seating, and refined VIP hospitality.",
    category: "VIP & Private Events",
    location: "Riyadh",
    image: "/portfolio/riyadh-majlis.webp",
    ar: {
      name: "مجلس الرياض النخبوي",
      description: "مجلس سعودي تقليدي فاخر في الرياض بديكور نجدي، وجلسات ذهبية وكريمية اللون، وضيافة راقية لكبار الشخصيات.",
      category: "فعاليات كبار الشخصيات والخاصة",
      location: "الرياض",
    },
  },
  "riyadh-luxury-soiree": {
    slug: "riyadh-luxury-soiree",
    name: "Riyadh Luxury Soirée",
    description:
      "A glamorous evening luxury soirée in Riyadh featuring candle-lit tablescapes, floral architecture, and full event production for a sophisticated guest list.",
    category: "Luxury Events",
    location: "Riyadh",
    image: "/portfolio/riyadh-soiree.webp",
    ar: {
      name: "أمسية الرياض الفاخرة",
      description: "أمسية فاخرة ساحرة في الرياض تتميّز بطاولات مضاءة بالشموع، وتصميم زهري معماري، وإنتاج فعاليات كامل لقائمة ضيوف راقية.",
      category: "الفعاليات الفاخرة",
      location: "الرياض",
    },
  },
  "alkhobar-corporate-retreat": {
    slug: "alkhobar-corporate-retreat",
    name: "Al Khobar Corporate Retreat",
    description:
      "A 120-delegate executive team-building and branding retreat in the Eastern Province, with full logistics, facilitation, and corporate hospitality.",
    category: "Corporate Events",
    location: "Al Khobar",
    image: "/alkhobar_corporate_people.webp",
    ar: {
      name: "ملاذ الخبر للشركات",
      description: "ملاذ تنفيذي لبناء الفرق والعلامة التجارية لـ 120 مندوبًا في المنطقة الشرقية، مع لوجستيات كاملة وتيسير وضيافة شركات.",
      category: "فعاليات الشركات",
      location: "الخبر",
    },
  },
  "grand-wedding-ceremony": {
    slug: "grand-wedding-ceremony",
    name: "Grand Wedding Ceremony",
    description:
      "A 600+ guest grand wedding in Riyadh with traditional VIP entrance protocol, bespoke staging, floral architecture, and full production.",
    category: "Luxury Weddings",
    location: "Riyadh",
    image: "/wedding_hall_grand_entrance.webp",
    ar: {
      name: "حفل زفاف فخم",
      description: "حفل زفاف فخم لأكثر من 600 ضيف في الرياض مع بروتوكول دخول تقليدي لكبار الشخصيات، ومسرح مخصص، وتصميم زهري، وإنتاج كامل.",
      category: "حفلات الزفاف الفاخرة",
      location: "الرياض",
    },
  },
  "jeddah-beach-wedding": {
    slug: "jeddah-beach-wedding",
    name: "Jeddah Seaside Wedding",
    description:
      "A 450-guest luxury Red Sea coastal wedding production on the Jeddah seafront, with waterfront staging, lighting, and bespoke design.",
    category: "Luxury Weddings",
    location: "Jeddah",
    image: "/jeddah_beach_wedding_setup.webp",
    ar: {
      name: "زفاف جدة على الشاطئ",
      description: "إنتاج زفاف فاخر على ساحل البحر الأحمر لـ 450 ضيفًا على واجهة جدة البحرية، مع مسرح على الواجهة وإضاءة وتصميم مخصص.",
      category: "حفلات الزفاف الفاخرة",
      location: "جدة",
    },
  },
  "riyadh-government-summit": {
    slug: "riyadh-government-summit",
    name: "Riyadh Government Summit",
    description:
      "A 1,200+ delegate government summit in Riyadh with immersive multi-screen production, protocol management, and high-security delegate operations.",
    category: "Conferences & Summits",
    location: "Riyadh",
    image: "/riyadh_summit_people.webp",
    ar: {
      name: "قمة الرياض الحكومية",
      description: "قمة حكومية لأكثر من 1200 مندوب في الرياض مع إنتاج متعدد الشاشات غامر، وإدارة البروتوكول، وعمليات وفود عالية الأمان.",
      category: "المؤتمرات والقمم",
      location: "الرياض",
    },
  },
};

/** Full per-page metadata (title, description, keywords, canonical, hreflang,
 *  OpenGraph + Twitter with the project image) for a case-study page. */
export function caseStudyMetadata(slug: string, locale: string): Metadata {
  const cs = CASE_STUDIES[slug];
  const isAr = locale === "ar";
  const path = `/portfolio/${slug}`;
  const url = `${BASE}${isAr ? "/ar" : ""}${path}`;
  const img = `${BASE}${cs.image}`;

  const name = isAr ? cs.ar.name : cs.name;
  const description = isAr ? cs.ar.description : cs.description;
  const category = isAr ? cs.ar.category : cs.category;
  const location = isAr ? cs.ar.location : cs.location;
  const title = isAr
    ? `${name} — إدارة الفعاليات في ${location}`
    : `${name} — Event Management in ${location}`;
  const keywords = isAr
    ? `${name}، ${category} ${location}، إدارة فعاليات ${location} السعودية، أعمال شركة إدارة الفعاليات السعودية`
    : `${name}, ${category} ${location}, event management ${location} Saudi Arabia, Saudi Event Management portfolio`;
  const alt = isAr
    ? `${name} — ${category} في ${location}، المملكة العربية السعودية`
    : `${name} — ${category} in ${location}, Saudi Arabia`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url, languages: hreflangAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: img, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img],
    },
  };
}

/** Up to `count` other case studies, preferring the same category. */
export function relatedCaseStudies(slug: string, count = 3): CaseStudy[] {
  const current = CASE_STUDIES[slug];
  const others = Object.values(CASE_STUDIES).filter((c) => c.slug !== slug);
  if (!current) return others.slice(0, count);
  const sameCat = others.filter((c) => c.category === current.category);
  const rest = others.filter((c) => c.category !== current.category);
  return [...sameCat, ...rest].slice(0, count);
}
