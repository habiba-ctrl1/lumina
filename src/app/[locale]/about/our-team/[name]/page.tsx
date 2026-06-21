import type { Metadata } from "next";
import { hreflangAlternates } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Award, MapPin, BookOpen } from "lucide-react";

// ─── Expert Author Profiles ───────────────────────────────────────────────────
// These profiles serve as EEAT trust signals, enabling author attribution
// on blog posts and service pages.
// ─────────────────────────────────────────────────────────────────────────────

const TEAM_PROFILES: Record<
  string,
  {
    name: string;
    nameAr: string;
    slug: string;
    role: string;
    roleAr: string;
    location: string;
    locationAr: string;
    yearsExperience: number;
    specialisms: string[];
    specialismsAr: string[];
    credentials: string[];
    bio: string[];
    bioAr: string[];
    publications: { title: string; href: string }[];
    services: { name: string; href: string }[];
    image: string;
  }
> = {
  "habiba-asghar": {
    name: "Habiba Asghar",
    nameAr: "حبيبة أصغر",
    slug: "habiba-asghar",
    role: "Founder & CEO",
    roleAr: "المؤسِّسة والرئيسة التنفيذية",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    yearsExperience: 18,
    specialisms: [
      "Luxury Event Strategy",
      "Corporate Event Management",
      "MICE Tourism KSA",
      "VIP Protocol Management",
      "Vision 2030 Events Alignment",
    ],
    specialismsAr: [
      "استراتيجية الفعاليات الفاخرة",
      "إدارة فعاليات الشركات",
      "سياحة الاجتماعات والمؤتمرات في المملكة",
      "إدارة بروتوكول كبار الشخصيات",
      "مواءمة فعاليات رؤية 2030",
    ],
    credentials: [
      "IAPCO Member (International Association of Professional Congress Organizers)",
      "Certified Meeting Professional (CMP)",
      "GEA Licensed Event Organizer",
      "ISO 9001 Lead Auditor — Event Production",
      "MBA, International Business",
    ],
    bio: [
      "Habiba Asghar is the Founder and CEO of Saudi Event Management — the Kingdom's leading luxury and corporate event management firm. With 18 years of experience spanning government, corporate, and royal family events across Saudi Arabia and the GCC, Habiba has established herself as one of the most respected voices in the region's events industry.",
      "Under her leadership, Saudi Event Management has grown from a boutique wedding planning operation into a full-service event management powerhouse managing 200+ events annually across Riyadh, Jeddah, Dammam, AlUla, and NEOM — including National Day galas, Riyadh Season activations, royal weddings, and international MICE conferences.",
      "Habiba is a frequent speaker at Saudi MICE industry forums and has contributed extensively to the GEA's development of event quality standards under Vision 2030. She holds an MBA in International Business and is an active member of IAPCO, Saudi Arabia's foremost professional body for conference organizers.",
      "Her philosophy: every event is a story. The best events don't just happen — they are authored, from the first guest arrival to the final farewell.",
    ],
    bioAr: [
      "حبيبة أصغر هي المؤسِّسة والرئيسة التنفيذية لإدارة الفعاليات السعودية — الشركة الرائدة في المملكة في مجال إدارة الفعاليات الفاخرة وفعاليات الشركات. وبخبرة تمتد 18 عاماً تشمل الفعاليات الحكومية والمؤسسية وفعاليات العائلات المالكة في المملكة العربية السعودية ودول الخليج، رسّخت حبيبة مكانتها كواحدة من أكثر الأصوات احتراماً في قطاع الفعاليات بالمنطقة.",
      "تحت قيادتها، تطوّرت إدارة الفعاليات السعودية من شركة متخصصة في تخطيط حفلات الزفاف إلى مؤسسة متكاملة الخدمات تدير أكثر من 200 فعالية سنوياً في الرياض وجدة والدمام والعُلا ونيوم — بما في ذلك حفلات اليوم الوطني، وتفعيلات موسم الرياض، وحفلات الزفاف الملكية، والمؤتمرات الدولية لسياحة الاجتماعات.",
      "حبيبة متحدثة دائمة في منتديات قطاع سياحة الاجتماعات والمؤتمرات السعودي، وقد ساهمت بشكل واسع في تطوير الهيئة العامة للترفيه لمعايير جودة الفعاليات ضمن رؤية 2030. وهي حاصلة على ماجستير في إدارة الأعمال الدولية، وعضو نشط في الرابطة الدولية لمنظّمي المؤتمرات المحترفين (IAPCO)، أبرز هيئة مهنية لمنظّمي المؤتمرات في المملكة.",
      "فلسفتها: كل فعالية قصة. أفضل الفعاليات لا تحدث صدفة — بل تُؤلَّف، من لحظة وصول أول ضيف وحتى الوداع الأخير.",
    ],
    publications: [
      { title: "How Much Does a Luxury Wedding Cost in Saudi Arabia? (2026 Guide)", href: "/blog/luxury-wedding-cost-saudi-arabia-guide" },
      { title: "MICE Tourism Saudi Arabia 2026: The Complete Industry Guide", href: "/blog/mice-tourism-saudi-arabia-complete-guide-2026" },
      { title: "The State of the MICE Industry in Saudi Arabia 2026", href: "/blog/state-of-mice-industry-saudi-arabia-2026" },
    ],
    services: [
      { name: "Corporate Events", href: "/services/corporate-events" },
      { name: "Luxury Weddings", href: "/services/weddings" },
      { name: "Conference Management", href: "/services/conferences" },
      { name: "Luxury VIP Events", href: "/services/luxury-vip-events" },
    ],
    image: "/gallery_charity_gala.webp",
  },
  "fahad-al-sulaiman": {
    name: "Fahad Al-Sulaiman",
    nameAr: "فهد السليمان",
    slug: "fahad-al-sulaiman",
    role: "Director of Event Production",
    roleAr: "مدير إنتاج الفعاليات",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    yearsExperience: 15,
    specialisms: [
      "AV Production & Sound Engineering",
      "Stage Design & Fabrication",
      "LED & Projection Technology",
      "Outdoor & Heritage Site Events",
      "National Day & Riyadh Season Productions",
    ],
    specialismsAr: [
      "الإنتاج الصوتي والمرئي والهندسة الصوتية",
      "تصميم وتصنيع المسارح",
      "تقنيات شاشات LED والإسقاط الضوئي",
      "الفعاليات الخارجية وفعاليات المواقع التراثية",
      "إنتاجات اليوم الوطني وموسم الرياض",
    ],
    credentials: [
      "ISO 9001 Certified Production Manager",
      "L-Acoustics Certified System Engineer",
      "GrandMA3 Certified Lighting Programmer",
      "GEA Technical Production License",
      "NEBOSH Health & Safety Certificate",
    ],
    bio: [
      "Fahad Al-Sulaiman is Saudi Event Management's Director of Event Production — the technical mind behind the company's most ambitious and complex productions across Saudi Arabia. With 15 years of hands-on experience in AV engineering, stage fabrication, and large-scale event production, Fahad has delivered technical excellence for National Day galas, Riyadh Season activations, and destination events at AlUla and NEOM.",
      "Fahad's technical expertise spans the full event production spectrum — from concert-grade L-Acoustics line array systems and Robe intelligent lighting to custom stage fabrications and immersive projection mapping on Saudi heritage sites. He is an L-Acoustics Certified System Engineer and holds a GrandMA3 programming certification for intelligent lighting design.",
      "Under Fahad's leadership, Saudi Event Management's production team has become one of the most technically sophisticated in the Kingdom — operating an ISO 9001-certified production workflow and maintaining an in-house inventory of premium AV, staging, and lighting equipment.",
      "His approach: invisible technical excellence. The best production is the one guests never notice — because everything just works, perfectly, every time.",
    ],
    bioAr: [
      "فهد السليمان هو مدير إنتاج الفعاليات في إدارة الفعاليات السعودية — العقل التقني وراء أكثر إنتاجات الشركة طموحاً وتعقيداً في جميع أنحاء المملكة. وبخبرة عملية تمتد 15 عاماً في الهندسة الصوتية والمرئية، وتصنيع المسارح، وإنتاج الفعاليات واسعة النطاق، قدّم فهد تميّزاً تقنياً لحفلات اليوم الوطني، وتفعيلات موسم الرياض، وفعاليات الوجهات في العُلا ونيوم.",
      "تمتد خبرة فهد التقنية لتشمل طيف إنتاج الفعاليات بالكامل — من أنظمة الصوت الاحترافية بمستوى الحفلات الموسيقية وإضاءة Robe الذكية إلى تصنيع المسارح المخصّصة وعرض الإسقاط الضوئي الغامر على المواقع التراثية السعودية. وهو مهندس أنظمة معتمد من L-Acoustics ويحمل شهادة برمجة GrandMA3 لتصميم الإضاءة الذكية.",
      "تحت قيادة فهد، أصبح فريق الإنتاج في إدارة الفعاليات السعودية واحداً من أكثر الفرق تطوراً تقنياً في المملكة — يعمل وفق سير عمل إنتاجي معتمد بمعيار ISO 9001 ويحتفظ بمخزون داخلي من معدّات الصوت والمرئيات والمسارح والإضاءة المتميّزة.",
      "نهجه: التميّز التقني الخفي. أفضل إنتاج هو الذي لا يلاحظه الضيوف أبداً — لأن كل شيء يعمل ببساطة، بإتقان، في كل مرة.",
    ],
    publications: [
      { title: "Best Corporate Event Venues in Riyadh 2026: The Complete Guide", href: "/blog/best-corporate-event-venues-riyadh-2026" },
      { title: "Event Production Cost Guide Saudi Arabia 2026: AV, Stage & Lighting", href: "/blog/event-production-cost-guide-saudi-arabia-2026" },
      { title: "How to Get a GEA Event Permit in Saudi Arabia: Complete 2026 Guide", href: "/blog/gea-event-permit-guide-saudi-arabia" },
    ],
    services: [
      { name: "Event Production", href: "/services/event-production" },
      { name: "Production Venues", href: "/services/production-venues" },
      { name: "Conference Management", href: "/services/conferences" },
      { name: "Exhibitions", href: "/services/exhibitions" },
    ],
    image: "/gallery_vip_party.webp",
  },
  "nadia-al-rashidi": {
    name: "Dr. Nadia Al-Rashidi",
    nameAr: "د. نادية الراشدي",
    slug: "nadia-al-rashidi",
    role: "Head of Wedding & Social Events",
    roleAr: "رئيسة قسم حفلات الزفاف والفعاليات الاجتماعية",
    location: "Jeddah, Saudi Arabia",
    locationAr: "جدة، المملكة العربية السعودية",
    yearsExperience: 12,
    specialisms: [
      "Luxury Wedding Design",
      "Nikah Ceremony Coordination",
      "Floral Architecture & Decor",
      "VIP Bridal Concierge",
      "Destination Wedding Planning (AlUla, Red Sea)",
    ],
    specialismsAr: [
      "تصميم حفلات الزفاف الفاخرة",
      "تنسيق مراسم عقد القران",
      "الهندسة الزهرية والديكور",
      "خدمة العرائس من كبار الشخصيات",
      "تخطيط زفاف الوجهات (العُلا، البحر الأحمر)",
    ],
    credentials: [
      "Certified Wedding & Event Designer (CWED)",
      "Florist & Floral Design Diploma — Paris",
      "GEA Licensed Event Organizer",
      "PhD Candidate, Cultural Studies (Hejazi Heritage)",
      "Member, Middle East Wedding Planners Association",
    ],
    bio: [
      "Dr. Nadia Al-Rashidi is Saudi Event Management's Head of Wedding & Social Events — an internationally trained wedding designer and bridal consultant who has planned and produced over 350 luxury weddings across Saudi Arabia, from intimate Nikah ceremonies to grand royal celebrations.",
      "Based in Jeddah, Nadia brings a distinctive Hejazi cultural sensibility to her work — deeply informed by the region's rich wedding traditions, its unique relationship with Red Sea aesthetics, and the sophisticated expectations of Jeddah's cosmopolitan high society. Her weddings are widely recognized for their extraordinary floral architecture, immersive theatrical design, and meticulous attention to cultural authenticity.",
      "Nadia trained in floral design in Paris before returning to Saudi Arabia to specialize in luxury wedding production. She is currently completing a PhD in Cultural Studies focused on the preservation of Hejazi wedding traditions in the context of Saudi Arabia's rapid social modernization.",
      "Her philosophy: a wedding is not an event, it is a portrait. Every detail — from the scent in the air to the angle of the Kosha lights — should reflect the singular personality of the people at its centre.",
    ],
    bioAr: [
      "الدكتورة نادية الراشدي هي رئيسة قسم حفلات الزفاف والفعاليات الاجتماعية في إدارة الفعاليات السعودية — مصمّمة زفاف ومستشارة عرائس مدرَّبة دولياً، خطّطت ونفّذت أكثر من 350 حفل زفاف فاخر في جميع أنحاء المملكة العربية السعودية، من مراسم عقد القران الحميمة إلى الاحتفالات الملكية الكبرى.",
      "تتّخذ نادية من جدة مقراً لها، وتضفي على عملها حسّاً ثقافياً حجازياً مميّزاً — مستلهَماً من تقاليد الزفاف الغنية في المنطقة، وعلاقتها الفريدة بجماليات البحر الأحمر، والتوقعات الراقية لمجتمع جدة العالمي. وتشتهر حفلاتها بهندستها الزهرية الاستثنائية، وتصميمها المسرحي الغامر، واهتمامها الدقيق بالأصالة الثقافية.",
      "تدرّبت نادية على تصميم الزهور في باريس قبل أن تعود إلى المملكة العربية السعودية للتخصص في إنتاج حفلات الزفاف الفاخرة. وهي تُكمل حالياً درجة الدكتوراه في الدراسات الثقافية تركّز على الحفاظ على تقاليد الزفاف الحجازية في سياق التحديث الاجتماعي السريع في المملكة.",
      "فلسفتها: الزفاف ليس فعالية، بل لوحة فنية. كل تفصيلة — من العطر في الهواء إلى زاوية إضاءة الكوشة — يجب أن تعكس الشخصية الفريدة لمن هم في قلبها.",
    ],
    publications: [
      { title: "Best Wedding Venues in Jeddah 2026: Red Sea Romance Guide", href: "/blog/best-wedding-venues-jeddah-2026" },
      { title: "Why Saudi Arabia is the New Global Destination for Luxury Weddings", href: "/blog/destination-wedding-planning-guide" },
    ],
    services: [
      { name: "Luxury Weddings", href: "/services/weddings" },
      { name: "Destination Events", href: "/services/destination-events" },
      { name: "Luxury VIP Events", href: "/services/luxury-vip-events" },
      { name: "Cultural Events", href: "/services/cultural-events" },
    ],
    image: "/wedding.webp",
  },
  "khalid-al-zahrani": {
    name: "Khalid Al-Zahrani",
    nameAr: "خالد الزهراني",
    slug: "khalid-al-zahrani",
    role: "Director of Destination & Cultural Events",
    roleAr: "مدير فعاليات الوجهات والفعاليات الثقافية",
    location: "AlUla, Saudi Arabia",
    locationAr: "العُلا، المملكة العربية السعودية",
    yearsExperience: 14,
    specialisms: [
      "AlUla Heritage Event Planning",
      "Desert Destination Events",
      "Cultural & Religious Event Management",
      "RCU & DGDA Permit Management",
      "Ramadan & National Day Events",
    ],
    specialismsAr: [
      "تخطيط فعاليات تراث العُلا",
      "فعاليات الوجهات الصحراوية",
      "إدارة الفعاليات الثقافية والدينية",
      "إدارة تصاريح الهيئة الملكية للعُلا وهيئة الدرعية",
      "فعاليات رمضان واليوم الوطني",
    ],
    credentials: [
      "RCU Preferred Event Partner — AlUla",
      "DGDA Approved Event Organizer — Diriyah",
      "GEA Licensed Cultural Event Organizer",
      "BA Cultural Heritage Management",
      "Red Sea Global Approved Event Partner",
    ],
    bio: [
      "Khalid Al-Zahrani is Saudi Event Management's Director of Destination & Cultural Events — the company's foremost specialist in heritage site event planning, desert destination logistics, and Saudi cultural event management. Based primarily in AlUla, Khalid manages the company's most complex and prestige-critical projects: private concerts at Maraya, heritage dinners at Hegra, and exclusive events within NEOM's development landscape.",
      "With 14 years of experience in Saudi Arabia's emerging destination event sector, Khalid has built unique relationships with the Royal Commission for AlUla (RCU), the Diriyah Gate Development Authority (DGDA), and NEOM's hospitality division — enabling Saudi Event Management to facilitate access to venues and sites that are unavailable to most event planners.",
      "Khalid is also the company's leading expert on Saudi cultural and religious events — managing National Day galas, Ramadan corporate iftars, Founding Day celebrations, and Riyadh Season activations with a deep understanding of the cultural sensitivity, GEA compliance, and logistical precision these events require.",
      "His philosophy: Saudi Arabia's landscapes are the world's most extraordinary event canvases. Our role is to use them respectfully, creatively, and unforgettably.",
    ],
    bioAr: [
      "خالد الزهراني هو مدير فعاليات الوجهات والفعاليات الثقافية في إدارة الفعاليات السعودية — المتخصص الأبرز في الشركة في تخطيط فعاليات المواقع التراثية، ولوجستيات فعاليات الوجهات الصحراوية، وإدارة الفعاليات الثقافية السعودية. ويتّخذ من العُلا مقراً رئيسياً له، حيث يدير أكثر مشاريع الشركة تعقيداً وأهمية: حفلات خاصة في مرايا، وعشاءات تراثية في الحِجر، وفعاليات حصرية ضمن مشهد نيوم العمراني.",
      "وبخبرة تمتد 14 عاماً في قطاع فعاليات الوجهات الناشئ في المملكة، بنى خالد علاقات فريدة مع الهيئة الملكية لمحافظة العُلا، وهيئة تطوير بوابة الدرعية، وقسم الضيافة في نيوم — ما يمكّن إدارة الفعاليات السعودية من تسهيل الوصول إلى قاعات ومواقع غير متاحة لمعظم منظّمي الفعاليات.",
      "خالد أيضاً هو الخبير الأول في الشركة في الفعاليات الثقافية والدينية السعودية — يدير حفلات اليوم الوطني، وإفطارات رمضان للشركات، واحتفالات يوم التأسيس، وتفعيلات موسم الرياض بفهم عميق للحساسية الثقافية، والامتثال للهيئة العامة للترفيه، والدقة اللوجستية التي تتطلبها هذه الفعاليات.",
      "فلسفته: مناظر المملكة العربية السعودية الطبيعية هي أكثر لوحات الفعاليات إبهاراً في العالم. ودورنا أن نستخدمها باحترام وإبداع وبطريقة لا تُنسى.",
    ],
    publications: [
      { title: "AlUla Events Guide 2026: Maraya, Hegra & Desert Experience Planning", href: "/blog/alula-events-guide-maraya-hegra-desert" },
      { title: "Corporate Ramadan Event Planning Guide Saudi Arabia 2026", href: "/blog/ramadan-event-planning-guide-saudi-arabia" },
      { title: "Saudi National Day Event Ideas for Corporates: September 23 Planning Guide", href: "/blog/national-day-event-ideas-saudi-arabia-corporates" },
    ],
    services: [
      { name: "Destination Events", href: "/services/destination-events" },
      { name: "Cultural Events", href: "/services/cultural-events" },
      { name: "Luxury VIP Events", href: "/services/luxury-vip-events" },
      { name: "Event Production", href: "/services/event-production" },
    ],
    image: "/alula_gala_people.webp",
  },
};

// Arabic labels for the related-service links (keyed by canonical href).
const SERVICE_NAMES_AR: Record<string, string> = {
  "/services/corporate-events": "فعاليات الشركات",
  "/services/weddings": "حفلات الزفاف الفاخرة",
  "/services/conferences": "إدارة المؤتمرات",
  "/services/luxury-vip-events": "فعاليات كبار الشخصيات الفاخرة",
  "/services/event-production": "إنتاج الفعاليات",
  "/services/production-venues": "قاعات الإنتاج",
  "/services/exhibitions": "المعارض",
  "/services/destination-events": "فعاليات الوجهات",
  "/services/cultural-events": "الفعاليات الثقافية",
};

interface PageProps {
  params: Promise<{ locale: string; name: string }>;
}

/**
 * Canonical (locale-agnostic) slugs of every team-member detail page.
 * Single source of truth — reused by `generateStaticParams` here and by the XML
 * sitemap (so new profiles appear in both without a second edit).
 */
export const teamMemberSlugs = Object.keys(TEAM_PROFILES);

export async function generateStaticParams() {
  return teamMemberSlugs.flatMap((name) => [
    { locale: "en", name },
    { locale: "ar", name },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, name } = await params;
  const profile = TEAM_PROFILES[name];
  if (!profile) return {};

  const isAr = locale === "ar";
  const dName = isAr ? profile.nameAr : profile.name;
  const dRole = isAr ? profile.roleAr : profile.role;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/about/our-team/${name}`;
  return {
    title: `${dName} — ${dRole} | ${isAr ? "إدارة الفعاليات السعودية" : "Saudi Event Management"}`,
    description: isAr
      ? `${dName} هي/هو ${dRole} في إدارة الفعاليات السعودية بخبرة ${profile.yearsExperience} عاماً في ${profile.specialismsAr.slice(0, 3).join("، ")}.`
      : `${profile.name} is ${profile.role} at Saudi Event Management with ${profile.yearsExperience} years of experience in ${profile.specialisms.slice(0, 3).join(", ")}.`,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates(`/about/our-team/${name}`),
    },
    openGraph: {
      title: `${dName} — ${dRole}`,
      description: isAr ? profile.bioAr[0] : profile.bio[0],
      url: canonicalUrl,
      images: [{ url: profile.image, width: 1200, height: 630, alt: `${dName} — ${dRole} at Saudi Event Management` }],
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { locale, name } = await params;
  const profile = TEAM_PROFILES[name];
  if (!profile) notFound();

  const isAr = locale === "ar";
  const dName = isAr ? profile.nameAr : profile.name;
  const dRole = isAr ? profile.roleAr : profile.role;
  const dLocation = isAr ? profile.locationAr : profile.location;
  const dBio = isAr ? profile.bioAr : profile.bio;
  const dSpecialisms = isAr ? profile.specialismsAr : profile.specialisms;
  const dFirstName = isAr ? profile.nameAr.replace(/^د\.\s*/, "").split(" ")[0] : profile.name.split(" ")[0];

  const canonicalUrl = `https://saudieventmanagement.com/about/our-team/${name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": canonicalUrl,
        "name": profile.name,
        "jobTitle": profile.role,
        "worksFor": {
          "@type": "Organization",
          "name": "Saudi Event Management",
          "url": "https://saudieventmanagement.com",
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": profile.location.split(",")[0],
          "addressCountry": "SA",
        },
        "knowsAbout": profile.specialisms,
        "description": dBio[0],
        "inLanguage": isAr ? "ar-SA" : "en-US",
        "url": canonicalUrl,
        "image": `https://saudieventmanagement.com${profile.image}`,
        "hasCredential": profile.credentials.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          "name": c,
        })),
        "author": profile.publications.map((p) => ({
          "@type": "Article",
          "name": p.title,
          "url": `https://saudieventmanagement.com${p.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
          { "@type": "ListItem", "position": 3, "name": "Our Team", "item": "https://saudieventmanagement.com/about/our-team" },
          { "@type": "ListItem", "position": 4, "name": profile.name, "item": canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white text-slate-800">
        <WhatsAppButton />
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-10 flex-wrap">
              <Link href="/" className="hover:text-slate-700 transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <Link href="/about" className="hover:text-slate-700 transition-colors">{isAr ? "من نحن" : "About"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <Link href="/about/our-team" className="hover:text-slate-700 transition-colors">{isAr ? "فريقنا" : "Our Team"}</Link>
              <ChevronRight size={10} className="rtl:rotate-180" />
              <span className="text-slate-900">{dName}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Profile card */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-[3/4] relative bg-slate-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${profile.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-white font-bold text-lg leading-tight">{dName}</p>
                      <p className="text-gold-400 text-xs font-semibold mt-1">{dRole}</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <MapPin size={12} className="shrink-0" />
                      <span>{dLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Award size={12} className="shrink-0" />
                      <span>{isAr ? `${profile.yearsExperience} عاماً من الخبرة` : `${profile.yearsExperience} years experience`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs" dir={isAr ? "ltr" : "rtl"}>
                      <span className="font-medium text-slate-700">{isAr ? profile.name : profile.nameAr}</span>
                      <span className="text-slate-400">•</span>
                      <span>{isAr ? profile.role : profile.roleAr}</span>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">{isAr ? "المؤهلات" : "Credentials"}</h3>
                  <ul className="space-y-2">
                    {profile.credentials.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-xs leading-relaxed">
                        <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bio */}
              <div className="lg:col-span-2">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--primary)]">{isAr ? "ملف الخبير" : "Expert Profile"}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                  {dName}
                </h1>
                <p className="text-slate-500 text-base mb-8">{dRole}{isAr ? "، إدارة الفعاليات السعودية" : ", Saudi Event Management"}</p>

                <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
                  {dBio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Specialisms */}
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-5">{isAr ? "مجالات الخبرة" : "Areas of Expertise"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {dSpecialisms.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-5">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.services.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                      >
                        <ChevronRight size={12} className="shrink-0 text-[var(--primary)] rtl:rotate-180" />
                        {isAr ? (SERVICE_NAMES_AR[svc.href] ?? svc.name) : svc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        {profile.publications.length > 0 && (
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={20} className="text-[var(--primary)]" />
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest">
                  {isAr ? `مقالات بقلم ${dFirstName}` : `Articles by ${dFirstName}`}
                </h2>
              </div>
              <div className="space-y-4">
                {profile.publications.map((pub, i) => (
                  <Link
                    key={i}
                    href={pub.href}
                    className="group flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
                  >
                    <ChevronRight size={16} className="text-[var(--primary)] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-slate-900 text-sm font-medium group-hover:text-[var(--primary)] transition-colors">
                      {pub.title}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[var(--primary)] text-sm font-bold mt-2 hover:underline"
                >
                  {isAr ? "عرض جميع المقالات" : "View all articles"} <ChevronRight size={14} className="rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Team CTA */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-slate-500 text-sm mb-1">{isAr ? `هل أنت مستعد للعمل مع ${dFirstName}؟` : `Ready to work with ${dFirstName}?`}</p>
              <p className="text-slate-900 font-bold">{isAr ? "احصل على عرض فعالية مخصّص لمشروعك." : "Get a bespoke event proposal for your project."}</p>
            </div>
            <div className="flex gap-4">
              <Link href="/contact" className="btn-primary rounded-sm shrink-0">{isAr ? "اطلب عرضاً" : "Request Proposal"}</Link>
              <Link href="/about/our-team" className="btn-outline rounded-sm shrink-0">{isAr ? "تعرّف على الفريق" : "Meet the Team"}</Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
