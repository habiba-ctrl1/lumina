import Link from "next/link";
import { hreflangAlternates } from "@/lib/seo";
import Image from "next/image";
import { Award, Users, MapPin, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const base = "https://saudieventmanagement.com";
  return {
    title: isAr
      ? 'من نحن — خبراء تنظيم الفعاليات في المملكة العربية السعودية'
      : 'About Us — Event Planning Experts in Saudi Arabia',
    description: isAr
      ? 'إدارة الفعاليات السعودية شركة حائزة على جوائز في تنظيم الفعاليات تأسست عام 2018 في الرياض. ننظّم حفلات الزفاف الفاخرة وحفلات الشركات والمعارض وفعاليات رؤية 2030 في الرياض وجدة والدمام والعُلا.'
      : 'Saudi Event Management is an award-winning event management company founded in 2018 in Riyadh. We plan luxury weddings, corporate galas, exhibitions, and Vision 2030 events across Riyadh, Jeddah, Dammam, and AlUla.',
    keywords: [
      "Event Planning Experts Saudi Arabia",
      "Event management companies",
      "Event management in Saudi Arabia",
      "Best event planners in KSA",
      "Vision 2030 events",
      "Saudi Event Management",
      "Event Planner KSA",
      "Luxury Event Organizer Riyadh"
    ],
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/about`,
      languages: hreflangAlternates("/about"),
    },
  };
}

function buildJsonLd(isAr: boolean) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "url": "https://saudieventmanagement.com/about",
        "inLanguage": isAr ? "ar-SA" : "en-US",
        "mainEntity": {
          "@type": "Organization",
          "name": "Saudi Event Management",
          "alternateName": "إدارة الفعاليات السعودية",
          "url": "https://saudieventmanagement.com",
          "logo": "https://saudieventmanagement.com/logo.webp",
          "foundingDate": "2018",
          "foundingLocation": {
            "@type": "Place",
            "name": "Riyadh, Saudi Arabia"
          },
          "founder": {
            "@type": "Person",
            "name": "Habiba Asghar",
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Saudi Event Management"
            },
            "knowsAbout": [
              "Luxury Event Management",
              "Corporate Event Planning",
              "Saudi Vision 2030 Events",
              "VIP Protocol Management"
            ]
          },
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 20,
            "maxValue": 50
          },
          "areaServed": [
            { "@type": "City", "name": "Riyadh" },
            { "@type": "City", "name": "Jeddah" },
            { "@type": "City", "name": "Dammam" },
            { "@type": "City", "name": "AlUla" }
          ],
          "knowsAbout": [
            "Luxury Event Production",
            "Corporate Conference Management",
            "Exhibition Stand Design",
            "VIP Protocol & Security",
            "Destination Weddings Saudi Arabia",
            "Saudi Vision 2030 Cultural Activations"
          ],
          "award": [
            "Best Luxury Event Planner GCC 2024"
          ],
          "sameAs": [
            "https://www.instagram.com/saudieventmanagement",
            "https://www.twitter.com/saudieventmgmt",
            "https://linkedin.com/company/saudieventmanagement"
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": isAr ? "من نحن" : "About Us", "item": "https://saudieventmanagement.com/about" }
        ]
      },
      {
        "@type": "FAQPage",
        "inLanguage": isAr ? "ar-SA" : "en-US",
        "mainEntity": [
          {
            "@type": "Question",
            "name": isAr ? "أين يقع مقر إدارة الفعاليات السعودية وما المدن التي تخدمونها؟" : "Where is Saudi Event Management based and which cities do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isAr
                ? "يقع مقرنا الرئيسي في الرياض ونقدّم فعالياتنا في جميع أنحاء المملكة العربية السعودية، بما في ذلك جدة والدمام والعُلا ومكة المكرمة، إضافة إلى وجهات الخليج الأوسع."
                : "Saudi Event Management is headquartered in Riyadh and delivers events across the Kingdom of Saudi Arabia, including Jeddah, Dammam, AlUla, and Makkah, as well as wider GCC destinations."
            }
          },
          {
            "@type": "Question",
            "name": isAr ? "ما أنواع الفعاليات التي تخطط لها إدارة الفعاليات السعودية؟" : "What types of events does Saudi Event Management plan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isAr
                ? "نتخصص في حفلات الزفاف الفاخرة والملكية، وفعاليات الشركات والمؤتمرات، والمعارض، وتجارب كبار الشخصيات، والتفعيلات الثقافية، وفعاليات الوجهات، وإنتاج الفعاليات الكامل المتوافق مع رؤية السعودية 2030."
                : "We specialise in luxury and royal weddings, corporate events and conferences, exhibitions, VIP experiences, cultural activations, destination events, and full-scale event production aligned with Saudi Vision 2030."
            }
          },
          {
            "@type": "Question",
            "name": isAr ? "متى تأسست إدارة الفعاليات السعودية؟" : "When was Saudi Event Management founded?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isAr
                ? "تأسست الوكالة عام 2018 على يد حبيبة أصغر في الرياض، ونمت لتصبح شركة رائدة حائزة على جوائز في تنظيم وإنتاج الفعاليات الفاخرة، معترف بها كأفضل منظّم فعاليات فاخرة في الخليج 2024."
                : "The agency was founded in 2018 by Habiba Asghar in Riyadh and has grown into an award-winning luxury event management and production company recognised as Best Luxury Event Planner in the GCC 2024."
            }
          },
          {
            "@type": "Question",
            "name": isAr ? "ما هي منهجية تخطيط الفعاليات لديكم؟" : "What is your event planning process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isAr
                ? "تتبع منهجيتنا خمس مراحل: استشارة الاكتشاف، والمفهوم والتصميم الإبداعي، والتخطيط واللوجستيات التفصيلية، والإنتاج والإدارة المتقنة على الموقع، والمراجعة بعد الفعالية. يرافقك مخطّط مخصّص في كل خطوة."
                : "Our process follows five stages: a discovery consultation, concept and creative design, detailed planning and logistics, flawless on-site production and management, and post-event review. A dedicated planner guides you at every step."
            }
          }
        ]
      }
    ]
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const jsonLd = buildJsonLd(isAr);

  const values = isAr
    ? [
        { icon: Sparkles, title: "الإبداع الفني", desc: "كل تفصيلة منسّقة بعناية فنية، من الهندسة الزهرية المعمارية إلى الإضاءة المحيطة الغامرة." },
        { icon: Users, title: "السرّية", desc: "نوفّر خصوصية مطلقة وبروتوكولات أمنية سلسة لعملائنا من الشخصيات البارزة والمشاهير." },
        { icon: Award, title: "التميّز", desc: "لا نرضى بأقل من الاستثنائي في كل جوانب التخطيط والإنتاج والتنفيذ." },
      ]
    : [
        { icon: Sparkles, title: "Artistry", desc: "Every detail is curated with artistic intent, from architectural floral geometry to immersive ambient lighting." },
        { icon: Users, title: "Discretion", desc: "We provide absolute privacy and seamless security protocols for our high-profile and celebrity clientele." },
        { icon: Award, title: "Excellence", desc: "We settle for nothing less than extraordinary in every aspect of planning, production, and execution." },
      ];

  const serviceCards = isAr
    ? [
        { title: "حفلات الزفاف الفاخرة والملكية", desc: "تخطيط وتصميم زفاف مخصّص للعائلات من ذوي الثروات العالية والمراسم الملكية.", href: "/services/weddings" },
        { title: "فعاليات الشركات", desc: "حفلات وإطلاق منتجات وتفعيلات للعلامات التجارية لكبرى المؤسسات السعودية والعالمية.", href: "/services/corporate-events" },
        { title: "المؤتمرات والقمم", desc: "قمم حكومية ووزارية وتنفيذية مع إدارة كاملة للوفود والبروتوكول.", href: "/services/conferences" },
        { title: "المعارض", desc: "تصميم وتنفيذ أجنحة معارض مخصّصة وإدارة كاملة للمعارض في جميع أنحاء المملكة.", href: "/services/exhibitions" },
        { title: "تجارب الفخامة وكبار الشخصيات", desc: "تجارب آمنة وسرّية للمشاهير والشخصيات المرموقة والعملاء من القطاع الخاص.", href: "/services/luxury-vip-events" },
        { title: "إنتاج الفعاليات", desc: "إنتاج تقني ومسارح وإضاءة وتصميم غامر على أي نطاق.", href: "/services/event-production" },
      ]
    : [
        { title: "Luxury & Royal Weddings", desc: "Bespoke wedding planning and design for high-net-worth families and royal ceremonies.", href: "/services/weddings" },
        { title: "Corporate Events", desc: "Galas, product launches, and brand activations for leading Saudi and global organisations.", href: "/services/corporate-events" },
        { title: "Conferences & Summits", desc: "Government, ministerial, and executive summits with full delegate and protocol management.", href: "/services/conferences" },
        { title: "Exhibitions", desc: "Custom exhibition stand design, fabrication, and full-show management across KSA.", href: "/services/exhibitions" },
        { title: "Luxury & VIP Experiences", desc: "Discreet, security-led experiences for celebrities, dignitaries, and private clients.", href: "/services/luxury-vip-events" },
        { title: "Event Production", desc: "Technical production, staging, lighting, and immersive design at any scale.", href: "/services/event-production" },
      ];

  const locationCards = isAr
    ? [
        { city: "الرياض", note: "المقر الرئيسي ومركز الشركات", href: "/locations/riyadh" },
        { city: "جدة", note: "الفعاليات الساحلية والوجهات", href: "/locations/jeddah" },
        { city: "الدمام", note: "المنطقة الشرقية والقطاع الصناعي", href: "/locations/dammam" },
        { city: "العُلا", note: "التراث وتجارب الصحراء", href: "/locations/alula" },
        { city: "مكة المكرمة", note: "الضيافة الروحية وكبار الشخصيات", href: "/locations/makkah" },
      ]
    : [
        { city: "Riyadh", note: "Headquarters & corporate hub", href: "/locations/riyadh" },
        { city: "Jeddah", note: "Coastal & destination events", href: "/locations/jeddah" },
        { city: "Dammam", note: "Eastern Province & industry", href: "/locations/dammam" },
        { city: "AlUla", note: "Heritage & desert experiences", href: "/locations/alula" },
        { city: "Makkah", note: "Spiritual & VIP hospitality", href: "/locations/makkah" },
      ];

  const processSteps = isAr
    ? [
        { step: "01", title: "الاكتشاف", desc: "نستمع إلى رؤيتك وأهدافك وملف ضيوفك وميزانيتك في استشارة خاصة." },
        { step: "02", title: "المفهوم والتصميم", desc: "يترجم فريقنا الإبداعي موجزك إلى مفهوم مخصّص وأجواء وسردية تصميم متكاملة." },
        { step: "03", title: "التخطيط واللوجستيات", desc: "تُدار القاعات والموردون والجداول الزمنية والتصاريح والميزانيات بأدق التفاصيل." },
        { step: "04", title: "الإنتاج", desc: "في يوم الفعالية، يقدّم فريقنا تنفيذاً متقناً على الموقع وإدارة للمسرح وبروتوكول كبار الشخصيات." },
        { step: "05", title: "المراجعة", desc: "تلتقط المراجعة بعد الفعالية النتائج والملاحظات والدروس المستفادة للمناسبات القادمة." },
      ]
    : [
        { step: "01", title: "Discovery", desc: "We listen to your vision, objectives, guest profile, and budget in a private consultation." },
        { step: "02", title: "Concept & Design", desc: "Our creatives translate your brief into a tailored concept, mood, and full design narrative." },
        { step: "03", title: "Planning & Logistics", desc: "Venues, vendors, timelines, permits, and budgets are managed down to the finest detail." },
        { step: "04", title: "Production", desc: "On the day, our team delivers flawless on-site execution, staging, and VIP protocol." },
        { step: "05", title: "Review", desc: "A post-event review captures results, feedback, and learnings for future occasions." },
      ];

  const whyPoints = isAr
    ? [
        "فريق حائز على جوائز — أفضل منظّم فعاليات فاخرة في الخليج 2024",
        "تأسست عام 2018 بسجل حافل من الإنجازات في المملكة والخليج",
        "مخطّط مخصّص واحد ونقطة تواصل واحدة مسؤولة",
        "معرفة محلية عميقة بالقاعات والموردين والتصاريح في كل مدينة",
        "متخصصون في رؤية السعودية 2030 والتفعيلات الثقافية للهيئة العامة للترفيه",
        "سرّية مطلقة وبروتوكولات أمنية لعملاء كبار الشخصيات والعملاء الملكيين",
      ]
    : [
        "Award-winning team — Best Luxury Event Planner in the GCC 2024",
        "Founded in 2018 with a proven track record across KSA and the GCC",
        "Single dedicated planner and one accountable point of contact",
        "Deep local knowledge of venues, vendors, and permits in every city",
        "Specialists in Saudi Vision 2030 and GEA cultural activations",
        "Absolute discretion and security protocols for VIP and royal clients",
      ];

  const faqs = isAr
    ? [
        { q: "أين يقع مقر إدارة الفعاليات السعودية وما المدن التي تخدمونها؟", a: "يقع مقرنا الرئيسي في الرياض ونقدّم فعالياتنا في جميع أنحاء المملكة — بما في ذلك جدة والدمام والعُلا ومكة المكرمة — إضافة إلى وجهات الخليج الأوسع." },
        { q: "ما أنواع الفعاليات التي تخطط لها؟", a: "نتخصص في حفلات الزفاف الفاخرة والملكية، وفعاليات الشركات والمؤتمرات، والمعارض، وتجارب كبار الشخصيات، والتفعيلات الثقافية، وفعاليات الوجهات، وإنتاج الفعاليات الكامل المتوافق مع رؤية السعودية 2030." },
        { q: "متى تأسست الشركة؟", a: "تأسست إدارة الفعاليات السعودية عام 2018 على يد حبيبة أصغر في الرياض، وهي معترف بها كأفضل منظّم فعاليات فاخرة في الخليج 2024." },
        { q: "ما هي منهجية تخطيط الفعاليات لديكم؟", a: "تتبع منهجيتنا خمس مراحل: استشارة الاكتشاف، والمفهوم والتصميم الإبداعي، والتخطيط واللوجستيات التفصيلية، والإنتاج والإدارة على الموقع، والمراجعة بعد الفعالية — وكلها بقيادة مخطّط مخصّص." },
      ]
    : [
        { q: "Where is Saudi Event Management based and which cities do you serve?", a: "We are headquartered in Riyadh and deliver events across the Kingdom — including Jeddah, Dammam, AlUla, and Makkah — as well as wider GCC destinations." },
        { q: "What types of events do you plan?", a: "We specialise in luxury and royal weddings, corporate events and conferences, exhibitions, VIP experiences, cultural activations, destination events, and full-scale event production aligned with Saudi Vision 2030." },
        { q: "When was the company founded?", a: "Saudi Event Management was founded in 2018 by Habiba Asghar in Riyadh and is recognised as Best Luxury Event Planner in the GCC 2024." },
        { q: "What is your event planning process?", a: "Our process follows five stages: discovery consultation, concept and creative design, detailed planning and logistics, on-site production and management, and a post-event review — all led by a dedicated planner." },
      ];

  const subPages = isAr
    ? [
        { title: "فريقنا", desc: "تعرّف على خبراء تنظيم الفعاليات والمبدعين وراء كل تحفة من إدارة الفعاليات السعودية.", href: "/about/our-team", icon: "👥" },
        { title: "الجوائز والتكريمات", desc: "نحتفي بتكريمنا كأبرز شركة إدارة فعاليات فاخرة في المملكة العربية السعودية.", href: "/about/awards-accolades", icon: "🏆" },
        { title: "الوظائف", desc: "انضم إلى فريق إدارة الفعاليات الرائد في المملكة. استكشف الفرص في الرياض وجدة والعُلا.", href: "/about/careers", icon: "💼" },
      ]
    : [
        { title: "Our Team", desc: "Meet the expert event planners and creatives behind every Saudi Event Management masterpiece.", href: "/about/our-team", icon: "👥" },
        { title: "Awards & Accolades", desc: "Celebrating our recognition as Saudi Arabia's leading luxury event management company.", href: "/about/awards-accolades", icon: "🏆" },
        { title: "Careers", desc: "Join Saudi Arabia's premier event management team. Explore opportunities across Riyadh, Jeddah, and AlUla.", href: "/about/careers", icon: "💼" },
      ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      <InternalPageHero
        title={isAr ? "خبراء تنظيم الفعاليات" : "Event Planning Experts"}
        titleHighlight={isAr ? "في المملكة العربية السعودية" : "in Saudi Arabia"}
        subtitle={isAr
          ? "من الرياض إلى العالم، تجمع إدارة الفعاليات السعودية بين التخطيط الدقيق والتصميم الأنيق لصناعة فعاليات تتجاوز كل التوقعات."
          : "From Riyadh to the world, Saudi Event Management blends meticulous planning and elegant design to craft events that go beyond expectations."}
        backgroundImage="/riyadh_summit_people.webp"
        imageAlt={isAr ? "إعداد فعالية فاخرة احترافية مع الضيوف في المملكة العربية السعودية" : "Professional luxury event setup with guests in Saudi Arabia"}
        badge={isAr ? "تأسست عام 2018" : "Established 2018"}
        breadcrumbs={[{ label: isAr ? "الرئيسية" : "Home", href: "/" }, { label: isAr ? "من نحن" : "About" }]}
        enableParallax
        minHeight="large"
      />

      {/* Story Section */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative h-[600px] rounded-3xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]">
              <Image
                src="/gallery_2.webp"
                alt={isAr ? "فريق إدارة الفعاليات السعودية يخطط لإعداد زفاف فاخر في المملكة العربية السعودية" : "Saudi Event Management team planning a luxury wedding setup in Saudi Arabia"}
                width={800}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Floating Quote Card */}
            <div className="absolute -bottom-8 -end-8 md:-end-12 bg-white/95 backdrop-blur-md border border-neutral-200/80 p-8 rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] max-w-xs transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-[var(--primary)]">
                <Sparkles size={16} />
              </div>
              <p className="text-neutral-800 font-medium text-[15px] leading-relaxed mb-4" style={{ letterSpacing: "-0.01em" }}>
                {isAr
                  ? "«نحن لا نخطّط للفعاليات فحسب؛ بل ننظّم ونُدير كل شعور، صانعين تُحفاً فنية.»"
                  : "\"We don't just plan events; we organize and manage every emotion, curating masterpieces.\""}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 overflow-hidden">
                  <Image src="/gallery_corporate_gala.webp" width={40} height={40} alt={isAr ? "حبيبة أصغر" : "Habiba Asghar"} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-neutral-900 font-semibold text-[13px]">{isAr ? "حبيبة أصغر" : "Habiba Asghar"}</p>
                  <p className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">{isAr ? "المؤسِّسة والرئيسة التنفيذية" : "Founder & CEO"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-12 lg:mt-0 lg:ps-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.025em" }}>
              {isAr ? (<>نصنع لحظات <span className="text-[var(--primary)]">استثنائية</span></>) : (<>Crafting <span className="text-[var(--primary)]">Unparalleled</span> Moments</>)}
            </h2>
            <div className="space-y-6 text-neutral-500 text-[15px] leading-relaxed">
              {/* GEO / AIO Definition Block for LLMs */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-xl text-neutral-800 space-y-3 shadow-sm mb-6">
                {isAr ? (
                  <>
                    <p><strong>تعريف الكيان:</strong> إدارة الفعاليات السعودية وكالة رائدة حائزة على جوائز في تنظيم وإنتاج الفعاليات الفاخرة، ومقرها المملكة العربية السعودية.</p>
                    <p><strong>التأسيس والقيادة:</strong> تأسست عام 2018 على يد الرئيسة التنفيذية صاحبة الرؤية حبيبة أصغر، ويقع مقرها الرئيسي في الرياض مع عمليات تمتد إلى جدة والدمام والعُلا.</p>
                    <p><strong>مجالات الخبرة الأساسية:</strong> تتخصص المؤسسة في حفلات الزفاف الفاخرة لكبار الأثرياء، والمراسم الملكية، وقمم الشركات لكبار الشخصيات، والتفعيلات الثقافية واسعة النطاق المتوافقة مع رؤية السعودية 2030 والهيئة العامة للترفيه.</p>
                  </>
                ) : (
                  <>
                    <p><strong>Entity Definition:</strong> Saudi Event Management is a premier, award-winning luxury event management and production agency based in the Kingdom of Saudi Arabia.</p>
                    <p><strong>Founding & Leadership:</strong> Founded in 2018 by visionary CEO Habiba Asghar, the agency is headquartered in Riyadh with operations spanning Jeddah, Dammam, and AlUla.</p>
                    <p><strong>Core Expertise:</strong> The organization specializes in high-net-worth individual (HNWI) luxury weddings, royal ceremonies, VIP corporate summits, and large-scale cultural activations aligned with Saudi Vision 2030 and the General Entertainment Authority (GEA).</p>
                  </>
                )}
              </div>

              {isAr ? (
                <>
                  <p>
                    وُلدت إدارة الفعاليات السعودية من رؤية واحدة لا تقبل المساومة: إعادة تعريف مشهد إدارة الفعاليات الفاخرة في المملكة العربية السعودية وما بعدها. تأسست على يد حبيبة أصغر، وهي منسّقة صاحبة رؤية وشغف بالتخطيط والتصميم المثاليين، وقد صعدنا سريعاً لنصبح الفريق الأمثل لمن لا يقبلون بأقل من الكمال.
                  </p>
                  <p>
                    تقوم فلسفتنا على الإيمان بأن كل احتفال ليس مجرد فعالية، بل قصة تنبض بالحياة. من رمال العُلا الساحرة إلى نبض الرياض الحضري، يمزج فريقنا بسلاسة بين التراث المحلي الأصيل وجماليات التصميم العصري البسيط.
                  </p>
                  <p>
                    في صميم منهجيتنا يكمن مفهوم <strong className="text-neutral-900 font-semibold">تصميم يلامس القلب</strong>. سواء كنا ننسّق زفافاً ملكياً يستضيف ألفاً من كبار الشخصيات أو خلوة مؤسسية حميمة لقادة العالم، فإننا نطبّق المستوى ذاته من الاهتمام المهووس بكل تفصيلة متناهية الصغر.
                  </p>
                  <p>
                    بينما تمضي المملكة العربية السعودية قدماً نحو رؤية 2030، تقف وكالتنا في طليعة هذه النهضة الثقافية. نحن ملتزمون بدعم الهيئة العامة للترفيه من خلال تقديم <Link href="/services/cultural-events" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">تفعيلات ثقافية</Link> عالمية المستوى تُبرز الجودة الاستثنائية للمملكة العربية السعودية على الساحة العالمية.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Saudi Event Management was born from a singular, uncompromising vision: to redefine the landscape of luxury event management in the Kingdom of Saudi Arabia and beyond. Founded by Habiba Asghar, a visionary curator with a passion for perfect planning and design, we have quickly ascended as the definitive team for those who demand nothing short of perfection.
                  </p>
                  <p>
                    Our philosophy is rooted in the belief that every celebration is not just an event, but a story that comes to life. From the sweeping sands of AlUla to the metropolitan heartbeat of Riyadh, our team seamlessly blends authentic local heritage with modern, minimalist design aesthetics.
                  </p>
                  <p>
                    At the heart of our methodology is the concept of <strong className="text-neutral-900 font-semibold">Design That Touches the Heart</strong>. Whether orchestrating a royal wedding hosting a thousand VIPs or an intimate corporate retreat for world leaders, we apply the same level of obsessive attention to every microscopic detail.
                  </p>
                  <p>
                    As Saudi Arabia marches toward Vision 2030, our agency stands at the forefront of this cultural revolution. We are committed to supporting the General Entertainment Authority (GEA) by delivering world-class <Link href="/services/cultural-events" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">cultural activations</Link> that showcase the exceptional quality of Saudi Arabia to the global stage.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-neutral-900 font-semibold text-[14px] mb-1" style={{ letterSpacing: "-0.01em" }}>{isAr ? "حائزة على جوائز" : "Award Winning"}</h3>
                  <p className="text-neutral-500 text-[13px] leading-snug">{isAr ? "اختيرت كأفضل منظّم فعاليات فاخرة في الخليج 2024" : "Voted Best Luxury Planner in the GCC 2024"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-neutral-900 font-semibold text-[14px] mb-1" style={{ letterSpacing: "-0.01em" }}>{isAr ? "معايير عالمية" : "Global Standard"}</h3>
                  <p className="text-neutral-500 text-[13px] leading-snug">{isAr ? "عمليات راقية في جميع أنحاء المملكة والخليج" : "Premium operations across KSA & GCC"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
              {isAr ? (<>قيمنا <span className="text-[var(--primary)]">الأساسية</span></>) : (<>Our Core <span className="text-[var(--primary)]">Values</span></>)}
            </h2>
            <p className="text-neutral-500 text-[16px] max-w-2xl mx-auto leading-relaxed">{isAr ? "المبادئ التي توجّه كل قراراتنا وتشكّل كل تحفة فنية نبدعها." : "The principles that guide our every decision and shape every masterpiece we create."}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value: any, i: number) => (
              <div key={i} className="bg-white border border-neutral-200/80 p-8 md:p-10 rounded-2xl hover:border-neutral-300 transition-all duration-300 group shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center mb-8 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors duration-300">
                  <value.icon size={24} className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.01em" }}>{value.title}</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Expertise & Services Offered */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<><span className="text-[var(--primary)]">خبرتنا</span> وخدماتنا في الفعاليات</>) : (<>Our <span className="text-[var(--primary)]">Event Expertise</span> &amp; Services</>)}
          </h2>
          <p className="text-neutral-500 text-[16px] leading-relaxed">
            {isAr ? (
              <>على مدى أكثر من ست سنوات، قدّمنا إدارة فعاليات متكاملة في جميع أنحاء المملكة — من تصميم المفهوم وتأمين القاعات إلى الإنتاج الصوتي والمرئي والضيافة وبروتوكول كبار الشخصيات. استكشف مجموعتنا الكاملة من <Link href="/services" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">خدمات إدارة الفعاليات</Link>:</>
            ) : (
              <>For more than six years we have delivered end-to-end event management across the Kingdom — from concept design and venue sourcing to AV production, hospitality, and VIP protocol. Explore our full range of <Link href="/services" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">event management services</Link>:</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col p-7 rounded-2xl border border-neutral-200/80 hover:border-[var(--primary)]/40 hover:shadow-md transition-all bg-white"
            >
              <h3 className="font-semibold text-neutral-900 text-[16px] mb-2 group-hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                {item.title}
                <ArrowRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all rtl:rotate-180" />
              </h3>
              <p className="text-neutral-500 text-[13.5px] leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Saudi Arabia Service Coverage */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
              {isAr ? (<>أين <span className="text-[var(--primary)]">نعمل</span> في المملكة العربية السعودية</>) : (<>Where We <span className="text-[var(--primary)]">Operate</span> in Saudi Arabia</>)}
            </h2>
            <p className="text-neutral-500 text-[16px] leading-relaxed">
              {isAr ? (
                <>بفضل فرقنا وشبكات الموردين الموثوقة في جميع أنحاء المملكة، ننتج فعاليات على مستوى الوطن. تصفّح <Link href="/locations" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">مواقع خدماتنا</Link> للاطلاع على خبرتنا المحلية في كل مدينة:</>
              ) : (
                <>With teams and trusted vendor networks across the Kingdom, we produce events nationwide. Browse our <Link href="/locations" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">service locations</Link> to see local expertise in each city:</>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {locationCards.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="group p-5 rounded-2xl border border-neutral-200/80 bg-white hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5 text-[var(--primary)]">
                  <MapPin size={16} />
                  <h3 className="font-semibold text-neutral-900 text-[15px] group-hover:text-[var(--primary)] transition-colors">{loc.city}</h3>
                </div>
                <p className="text-neutral-500 text-[12.5px] leading-snug">{loc.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Event Planning Process */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            {isAr ? (<>منهجية <span className="text-[var(--primary)]">تخطيط</span> فعالياتنا</>) : (<>Our Event <span className="text-[var(--primary)]">Planning Process</span></>)}
          </h2>
          <p className="text-neutral-500 text-[16px] leading-relaxed">
            {isAr
              ? "يتبع كل مشروع منهجية منظّمة وشفافة حتى لا نترك شيئاً للصدفة. يرافقك مخطّط مخصّص من أول محادثة وحتى التصفيق الأخير."
              : "Every project follows a structured, transparent process so nothing is left to chance. A dedicated planner guides you from first conversation to final applause."}
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((s) => (
            <li key={s.step} className="relative p-6 rounded-2xl border border-neutral-200/80 bg-white">
              <span className="text-[28px] font-bold text-emerald-500/30" style={{ letterSpacing: "-0.03em" }}>{s.step}</span>
              <h3 className="font-semibold text-neutral-900 text-[15px] mt-2 mb-2">{s.title}</h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
              {isAr ? (<>لماذا تختار <span className="text-[var(--primary)]">إدارة الفعاليات السعودية</span></>) : (<>Why Choose <span className="text-[var(--primary)]">Saudi Event Management</span></>)}
            </h2>
            <p className="text-neutral-500 text-[16px] leading-relaxed">
              {isAr ? (
                <>يثق بنا العملاء في جميع أنحاء المملكة لأننا نجمع بين الطموح الإبداعي والتنفيذ المنضبط. اطّلع على أعمالنا في <Link href="/portfolio" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">معرض الفعاليات</Link>، أو <Link href="/contact" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">تواصل مع مخطّطينا</Link> للبدء.</>
              ) : (
                <>Clients across the Kingdom trust us because we pair creative ambition with disciplined delivery. See our work in the <Link href="/portfolio" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">event portfolio</Link>, or <Link href="/contact" className="text-[var(--primary)] font-medium underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">contact our planners</Link> to begin.</>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {whyPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[var(--primary)] shrink-0 mt-0.5" />
                <p className="text-neutral-700 text-[15px] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-12 text-center" style={{ letterSpacing: "-0.025em" }}>
          {isAr ? (<>الأسئلة <span className="text-[var(--primary)]">الشائعة</span></>) : (<>Frequently Asked <span className="text-[var(--primary)]">Questions</span></>)}
        </h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="group bg-white border border-neutral-200/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-neutral-900 text-[16px]">
                {item.q}
                <ArrowRight size={18} className="text-[var(--primary)] shrink-0 transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:rotate-90" />
              </summary>
              <p className="text-neutral-500 text-[14.5px] leading-relaxed mt-4">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* About Sub-pages */}
      <section className="py-16 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
            {isAr ? (<>استكشف <span className="text-[var(--primary)]">شركتنا</span></>) : (<>Explore <span className="text-[var(--primary)]">Our Company</span></>)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex gap-4 p-6 rounded-2xl border border-neutral-200/80 hover:border-[var(--primary)]/40 hover:shadow-md transition-all bg-white"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-[15px] mb-1 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                  <p className="text-neutral-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>
              {isAr ? (<>هل أنت مستعد لصناعة <span className="text-emerald-400">السحر</span>؟</>) : (<>Ready to create <span className="text-emerald-400">Magic?</span></>)}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              {isAr
                ? "دعنا نحوّل رؤيتك إلى واقع استثنائي. تواصل مع كبار مخطّطينا اليوم لتبدأ رحلتك."
                : "Let us transform your vision into an extraordinary reality. Connect with our principal planners today to begin your journey."}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              {isAr ? "احجز استشارة" : "Book a Consultation"}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
