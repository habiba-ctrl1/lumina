import type { ServiceCategory } from "./types";

// Metadata for this route lives in app/[locale]/services/valet-parking/layout.tsx
// (indexed EN + AR) — intentionally not duplicated here.
const fields = [
  { name: "vehicles", label: "Expected vehicles", displayLabel: "Expected vehicles", type: "select" as const, options: ["Under 50", "50–150", "150–300", "300+", "Not sure"] },
  { name: "duration", label: "Event duration", displayLabel: "Event duration", type: "select" as const, options: ["Up to 3 hours", "3–6 hours", "Full day", "Multi-day"] },
  { name: "vip", label: "VIP arrivals?", displayLabel: "VIP arrivals?", type: "select" as const, options: ["Yes", "No", "Not sure"] },
  { name: "parking", label: "Parking available", displayLabel: "Parking available", type: "select" as const, options: ["Venue car park", "Nearby / overflow lot", "Street / limited", "Not sure"] },
  { name: "addOns", label: "Add-ons of interest", displayLabel: "Add-ons of interest", type: "text" as const, placeholder: "e.g. golf carts, wheelchair assistance" },
];

const serviceOptions = ["Wedding Valet", "Corporate Event Valet", "Gala / VIP Valet", "Conference / Exhibition Valet", "Hotel / Venue Event Valet", "Private Event Valet", "Not sure — please advise"];
const eventTypeOptions = ["Wedding", "Corporate Event / Gala", "Conference / Exhibition", "Hotel Event", "Private Event", "VIP Event", "Other"];

export const valetParking: ServiceCategory = {
  slug: "valet-parking",
  source: "valet_parking_page",
  serviceType: "Event Valet Parking",
  en: {
    name: "Valet Parking",
    hero: {
      badge: "Valet Parking & Guest Arrival · Riyadh",
      title: "Event Valet Parking",
      highlight: "in Riyadh",
      subtitle:
        "Uniformed valet teams, secure key handling and smooth guest arrivals for weddings, galas and corporate events. Tell us your venue, guest count and arrival window — SEM coordinates a suitable Saudi-based valet partner.",
      image: "/services/valet_golf_cart_guest_mobility.webp",
      imageAlt: "Golf cart driver transferring a guest from the parking area to a lit venue entrance at dusk",
    },
    snapshot: [
      { label: "Service type", value: "Guest arrival & parking" },
      { label: "Best for", value: "Weddings · Galas · VIP" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Guest-flow based" },
    ],
    answer: {
      question: "How does event valet parking work in Riyadh?",
      answer:
        "Event valet parking means uniformed staff receive guests' cars at the entrance, park them securely and return them at departure, so guests arrive and leave without searching for parking. With SEM, you share the venue, date, guest count, expected vehicles and arrival window; SEM coordinates a suitable Saudi-based valet partner, confirms staffing and the parking plan, and keeps one point of contact through to the event.",
    },
    intro: [
      "Arrival is the first thing guests experience and departure is the last. A slow queue at the gate or a long wait for cars undoes a lot of good work inside the venue.",
      "SEM does not employ valet staff directly. We qualify your guest flow — vehicles, arrival window, parking space, VIPs — and coordinate an established Saudi-based valet partner whose team size and setup suit your event.",
    ],
    capabilities: {
      heading: "What the valet service covers",
      lead: "Each valet plan is built around your venue and guest flow:",
      items: [
        { icon: "door", title: "Guest arrival management", desc: "Greeting, door service and a clear drop-off point so arrivals keep moving." },
        { icon: "users", title: "Uniformed valet teams", desc: "Professional, uniformed staff sized to your expected vehicles and arrival peak." },
        { icon: "key", title: "Secure key handling", desc: "Ticketed key management and a controlled retrieval process." },
        { icon: "crown", title: "VIP arrival support", desc: "Priority parking, a dedicated valet point and discreet handling for VIPs." },
        { icon: "route", title: "Parking flow coordination", desc: "Drop-off zones, parking areas and traffic flow planned with the venue." },
        { icon: "clock", title: "Departure management", desc: "Staffing for the departure peak so guests aren't left waiting." },
      ],
    },
    subServices: {
      heading: "Valet services by event type",
      lead: "One enquiry covers all of these. Tell us the event and SEM coordinates the right valet setup.",
      items: [
        { title: "Wedding Valet", desc: "Smooth arrivals for families and guests, with separate entrances where needed.", useCase: "Receptions, engagements", image: "/riyadh_luxury_reception_people.webp", imageAlt: "Hotel ballroom prepared for a wedding reception", href: "/services/weddings" },
        { title: "VIP & Gala Valet", desc: "Priority parking, a dedicated counter and discreet VIP handling.", useCase: "Galas, award nights, VIP dinners", image: "/services/vip_airport_chauffeur_riyadh.webp", imageAlt: "Chauffeur holding a car door open for a guest at a hotel entrance", href: "/services/vip-transportation" },
        { title: "Golf-Cart Guest Mobility", desc: "Golf carts to move guests from distant parking to the entrance.", useCase: "Large venues, outdoor sites", image: "/services/valet_golf_cart_guest_mobility.webp", imageAlt: "Golf cart carrying a guest to a venue entrance at dusk" },
        { icon: "building", title: "Corporate Event Valet", desc: "Peak-arrival staffing for galas, launches and summits.", href: "/services/corporate-events" },
        { icon: "users", title: "Conference & Exhibition Valet", desc: "High-throughput delegate and visitor parking.", href: "/services/conferences" },
        { icon: "building", title: "Hotel & Venue Event Valet", desc: "Event valet integrated with the property's own arrival flow." },
        { icon: "star", title: "Private Event Valet", desc: "Valet for private homes, farms and family gatherings." },
        { icon: "accessibility", title: "Accessibility Assistance", desc: "Wheelchair and mobility support at arrival and departure." },
        { icon: "sparkles", title: "Premium Add-ons", desc: "Luggage help, umbrella service and car care where the partner offers them." },
      ],
    },
    flow: {
      heading: "How a valet plan is sized",
      lead: "Staffing and layout follow these five inputs.",
      steps: [
        { label: "Guest count", detail: "Total attendees" },
        { label: "Expected vehicles", detail: "Self-drive vs. driven guests" },
        { label: "Arrival window", detail: "How tightly guests arrive" },
        { label: "Valet staffing", detail: "Team size for peak flow" },
        { label: "Parking flow", detail: "Drop-off, parking, retrieval" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Weddings", desc: "Family and guest arrivals.", href: "/services/weddings" },
        { title: "Corporate events", desc: "Galas, launches, summits.", href: "/services/corporate-events" },
        { title: "Gala dinners", desc: "Formal arrivals and departures." },
        { title: "Hotel events", desc: "Event peaks beyond hotel capacity." },
        { title: "Private events", desc: "Homes, farms and private venues." },
        { title: "VIP events", desc: "Priority and discreet handling.", href: "/services/luxury-vip-events" },
        { title: "Exhibitions", desc: "Visitor and exhibitor parking.", href: "/services/exhibitions" },
      ],
    },
    process: {
      heading: "How the valet service works",
      items: [
        { title: "Share event details", desc: "Venue, date, guest count and expected vehicles." },
        { title: "Confirm guest flow", desc: "Arrival window, parking space, VIPs and departure peak." },
        { title: "SEM coordinates a provider", desc: "A suitable Saudi-based valet partner for your date." },
        { title: "Requirements confirmed", desc: "Staffing, layout, add-ons and timings in writing." },
        { title: "Execution coordinated", desc: "SEM stays your point of contact on the day." },
      ],
    },
    quoteFactors: {
      heading: "What affects valet parking pricing?",
      lead: "Valet pricing follows staffing and logistics:",
      items: [
        { title: "Expected vehicles", desc: "The main driver of team size." },
        { title: "Arrival peak", desc: "Tight arrival windows need more staff at once." },
        { title: "Event duration", desc: "Hours on site, including departure." },
        { title: "Parking distance", desc: "Remote lots may need runners or golf carts." },
        { title: "VIP requirements", desc: "Dedicated counters and priority handling." },
        { title: "Add-ons", desc: "Golf carts, accessibility support, umbrellas, car care." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a valet quote?",
      items: [
        "Venue name and address",
        "Event date and start/end times",
        "Guest count",
        "Estimated number of vehicles",
        "Available parking (venue car park, overflow lot)",
        "Number of VIP arrivals",
        "Any add-ons: golf carts, accessibility support",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. Valet staff and equipment are provided by an established Saudi-based valet partner selected for your event — SEM does not employ the valet team directly.",
        "SEM qualifies your guest flow, confirms staffing and the parking plan with the partner, presents one quotation and stays your point of contact. Availability and pricing depend on the date, venue and requirements, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "Staffing in writing", desc: "Team size, hours and add-ons are listed in the quotation." },
        { title: "Venue coordination", desc: "Drop-off zones and parking areas are agreed with the venue in advance." },
        { title: "Key control", desc: "Ticketed key handling and a controlled retrieval point." },
        { title: "Departure planning", desc: "Staffing is planned for the departure peak, not just arrivals." },
      ],
    },
    useCases: {
      heading: "Typical valet requests",
      items: [
        { title: "Hotel wedding reception", desc: "A valet team and dedicated family entrance for an evening reception." },
        { title: "Corporate gala", desc: "Peak-arrival staffing for a 7–8 pm arrival window with VIP priority parking." },
        { title: "Private farm event", desc: "Golf carts moving guests from a field car park to the venue." },
        { title: "Two-day exhibition", desc: "Visitor parking flow across show days with fixed operating hours." },
      ],
    },
    feature: {
      image: "/services/vip_airport_chauffeur_riyadh.webp",
      alt: "Chauffeur in uniform opening an SUV door for a guest outside a hotel entrance in the evening",
      caption: "Representative setup — attended guest arrival at a hotel entrance",
    },
    riyadh: {
      heading: "Event valet across Riyadh",
      paragraphs: [
        "Riyadh events are car-led: most guests drive or are driven, and arrival peaks for weddings and galas are tight. Hotel ballrooms, private halls and farm venues each need a different parking plan — which is why SEM confirms the parking layout with the venue before staffing is quoted.",
        "Valet pairs naturally with VIP transportation for guests who shouldn't drive themselves, and with catering and entertainment for the event inside.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "VIP transportation", href: "/services/vip-transportation" },
      ],
    },
    faqs: [
      { q: "Do you provide valet parking for weddings in Riyadh?", a: "Yes. SEM coordinates uniformed valet teams for weddings, scaled to the venue's guest count and parking layout, including separate entrances where needed." },
      { q: "Who provides the valet staff?", a: "Valet staff are provided by an established Saudi-based valet partner selected for your event. SEM coordinates the booking, requirements and communication." },
      { q: "How many valet staff do I need?", a: "It depends on expected vehicles, how tightly guests arrive and parking distance. Share these details and the partner proposes a team size for your peak." },
      { q: "How is key and vehicle security handled?", a: "Valet teams use ticketed key management and a controlled retrieval process so vehicles are tracked and returned efficiently." },
      { q: "Can valet staff assist elderly guests or guests with disabilities?", a: "Yes. Wheelchair and mobility assistance at arrival and departure can be included." },
      { q: "Can golf carts be arranged for large venues?", a: "Yes, golf carts can be included to move guests between distant parking areas and the entrance." },
      { q: "How much does event valet cost in Riyadh?", a: "Pricing depends on vehicles, arrival peak, duration, parking distance and add-ons. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
      { q: "How far in advance should valet be booked?", a: "We recommend at least 2–3 weeks ahead, and earlier for peak wedding season and Riyadh Season." },
    ],
    related: [
      { title: "VIP Transportation", href: "/services/vip-transportation", desc: "Chauffeured transfers for VIP guests.", image: "/services/vip_airport_chauffeur_riyadh.webp" },
      { title: "Event Catering", href: "/services/event-catering", desc: "Catering for weddings and galas.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and coordination.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "Corporate Events", href: "/services/corporate-events", desc: "Galas, launches and company events.", image: "/services/premium_corporate_summit_hero.webp" },
    ],
    form: {
      heading: "Request a valet quote",
      subheading: "Share your venue and guest flow. SEM confirms availability with a suitable valet partner and comes back with a staffing plan and quote.",
      submitLabel: "Request Valet Quote",
      serviceOptions,
      eventTypeOptions,
      guestCountLabel: "Guest Count",
      messagePlaceholder: "Arrival window, separate entrances, VIP details, anything the venue has told you about parking...",
      fields,
      whatsappText: "Hi SEM, I'd like a quote for event valet parking in Riyadh.",
    },
  },
  ar: {
    name: "خدمة الفاليه",
    hero: {
      badge: "الفاليه واستقبال الضيوف · الرياض",
      title: "خدمة فاليه الفعاليات",
      highlight: "في الرياض",
      subtitle:
        "فرق فاليه موحّدة الزي، وإدارة آمنة للمفاتيح، ووصول سلس للضيوف في حفلات الزفاف والحفلات الفاخرة وفعاليات الشركات. شاركنا الموقع وعدد الضيوف ووقت الوصول — وتنسّق إدارة الفعاليات السعودية مع شريك فاليه مناسب في المملكة.",
      image: "/services/valet_golf_cart_guest_mobility.webp",
      imageAlt: "عربة جولف تنقل ضيفة من موقف السيارات إلى مدخل قاعة مضاءة عند الغروب",
    },
    snapshot: [
      { label: "نوع الخدمة", value: "استقبال الضيوف والوقوف" },
      { label: "الأنسب لـ", value: "الأعراس · الحفلات · كبار الشخصيات" },
      { label: "الموقع", value: "الرياض والمدن الرئيسية" },
      { label: "عرض السعر", value: "حسب تدفّق الضيوف" },
    ],
    answer: {
      question: "كيف تعمل خدمة فاليه الفعاليات في الرياض؟",
      answer:
        "خدمة الفاليه تعني أن طاقمًا موحّد الزي يستلم سيارات الضيوف عند المدخل، ويوقفها بأمان، ويعيدها عند المغادرة، فيصل الضيوف ويغادرون دون البحث عن موقف. مع إدارة الفعاليات السعودية، تشاركنا الموقع والتاريخ وعدد الضيوف والمركبات المتوقعة ووقت الوصول؛ فننسّق مع شريك فاليه مناسب في المملكة، ونؤكد عدد الطاقم وخطة الوقوف، ونبقى نقطة تواصلك حتى يوم الفعالية.",
    },
    intro: [
      "الوصول هو أول ما يعيشه الضيف، والمغادرة آخر ما يتذكره. طابور بطيء عند البوابة أو انتظار طويل للسيارة يُفسد الكثير مما بُذل داخل القاعة.",
      "لا توظّف إدارة الفعاليات السعودية طاقم الفاليه مباشرة؛ بل ندرس تدفّق ضيوفك — المركبات، ووقت الوصول، ومساحة الوقوف، وكبار الشخصيات — وننسّق مع شريك فاليه سعودي معتمد يناسب حجم فريقه وتجهيزاته فعاليتك.",
    ],
    capabilities: {
      heading: "ما تشمله خدمة الفاليه",
      lead: "تُبنى كل خطة فاليه حول موقعك وتدفّق ضيوفك:",
      items: [
        { icon: "door", title: "إدارة وصول الضيوف", desc: "استقبال، وفتح الأبواب، ونقطة إنزال واضحة لاستمرار حركة الوصول." },
        { icon: "users", title: "فرق فاليه موحّدة الزي", desc: "طاقم محترف بحجم يناسب عدد المركبات وذروة الوصول." },
        { icon: "key", title: "إدارة آمنة للمفاتيح", desc: "نظام تذاكر للمفاتيح وآلية استرجاع منظّمة." },
        { icon: "crown", title: "دعم وصول كبار الشخصيات", desc: "أولوية وقوف، ونقطة فاليه مخصّصة، وتعامل متكتّم." },
        { icon: "route", title: "تنظيم تدفّق الوقوف", desc: "مناطق الإنزال والوقوف وحركة المرور بالتنسيق مع الموقع." },
        { icon: "clock", title: "إدارة المغادرة", desc: "طاقم كافٍ لذروة المغادرة حتى لا ينتظر الضيوف." },
      ],
    },
    subServices: {
      heading: "خدمات الفاليه حسب نوع الفعالية",
      lead: "طلب واحد يشمل كل ذلك. أخبرنا بنوع الفعالية وننسّق الإعداد المناسب.",
      items: [
        { title: "فاليه حفلات الزفاف", desc: "وصول سلس للعائلات والضيوف، مع مداخل منفصلة عند الحاجة.", useCase: "حفلات الاستقبال والخطوبة", image: "/riyadh_luxury_reception_people.webp", imageAlt: "قاعة فندقية مجهّزة لحفل زفاف", href: "/services/weddings" },
        { title: "فاليه الحفلات وكبار الشخصيات", desc: "أولوية وقوف، وكاونتر مخصّص، وتعامل متكتّم مع كبار الشخصيات.", useCase: "الحفلات الفاخرة وليالي الجوائز", image: "/services/vip_airport_chauffeur_riyadh.webp", imageAlt: "سائق يفتح باب السيارة لضيفة عند مدخل فندق", href: "/services/vip-transportation" },
        { title: "عربات الجولف لتنقّل الضيوف", desc: "عربات جولف لنقل الضيوف من المواقف البعيدة إلى المدخل.", useCase: "المواقع الكبيرة والخارجية", image: "/services/valet_golf_cart_guest_mobility.webp", imageAlt: "عربة جولف تقل ضيفة إلى مدخل القاعة" },
        { icon: "building", title: "فاليه فعاليات الشركات", desc: "طاقم لذروة الوصول في الحفلات والإطلاقات والقمم.", href: "/services/corporate-events" },
        { icon: "users", title: "فاليه المؤتمرات والمعارض", desc: "إدارة وقوف عالية السعة للمندوبين والزوّار.", href: "/services/conferences" },
        { icon: "building", title: "فاليه الفنادق والقاعات", desc: "فاليه للفعالية مندمج مع تدفّق وصول الموقع." },
        { icon: "star", title: "فاليه المناسبات الخاصة", desc: "للمنازل والمزارع والتجمعات العائلية." },
        { icon: "accessibility", title: "مساعدة ذوي الاحتياجات", desc: "كراسي متحركة ودعم التنقّل عند الوصول والمغادرة." },
        { icon: "sparkles", title: "خدمات إضافية متميّزة", desc: "مساعدة بالأمتعة، ومظلات، وعناية بالسيارات حين يوفّرها الشريك." },
      ],
    },
    flow: {
      heading: "كيف يُحدَّد حجم خطة الفاليه",
      lead: "يُبنى الطاقم والتخطيط على هذه المدخلات الخمسة.",
      steps: [
        { label: "عدد الضيوف", detail: "إجمالي الحضور" },
        { label: "المركبات المتوقعة", detail: "من يقود ومن يُقاد" },
        { label: "نافذة الوصول", detail: "مدى تزامن وصول الضيوف" },
        { label: "طاقم الفاليه", detail: "حجم الفريق لساعة الذروة" },
        { label: "تدفّق الوقوف", detail: "إنزال، وقوف، استرجاع" },
      ],
    },
    idealFor: {
      heading: "الأنسب لـ",
      items: [
        { title: "حفلات الزفاف", desc: "وصول العائلات والضيوف.", href: "/services/weddings" },
        { title: "فعاليات الشركات", desc: "الحفلات والإطلاقات والقمم.", href: "/services/corporate-events" },
        { title: "حفلات العشاء الرسمية", desc: "وصول ومغادرة منظّمان." },
        { title: "فعاليات الفنادق", desc: "ذروة تفوق طاقة الفندق." },
        { title: "المناسبات الخاصة", desc: "المنازل والمزارع والمواقع الخاصة." },
        { title: "فعاليات كبار الشخصيات", desc: "أولوية وتعامل متكتّم.", href: "/services/luxury-vip-events" },
        { title: "المعارض", desc: "وقوف الزوّار والعارضين.", href: "/services/exhibitions" },
      ],
    },
    process: {
      heading: "كيف تعمل الخدمة",
      items: [
        { title: "شارك تفاصيل الفعالية", desc: "الموقع، والتاريخ، وعدد الضيوف، والمركبات المتوقعة." },
        { title: "تأكيد تدفّق الضيوف", desc: "وقت الوصول، ومساحة الوقوف، وكبار الشخصيات، وذروة المغادرة." },
        { title: "التنسيق مع مزوّد مناسب", desc: "شريك فاليه سعودي مناسب ومتاح في تاريخك." },
        { title: "تأكيد المتطلبات", desc: "الطاقم والتخطيط والإضافات والأوقات كتابيًا." },
        { title: "تنسيق التنفيذ", desc: "نبقى نقطة تواصلك يوم الفعالية." },
      ],
    },
    quoteFactors: {
      heading: "ما الذي يؤثر على سعر خدمة الفاليه؟",
      lead: "يتحدد السعر بحسب الطاقم واللوجستيات:",
      items: [
        { title: "عدد المركبات", desc: "العامل الأساسي لحجم الفريق." },
        { title: "ذروة الوصول", desc: "النوافذ الضيقة تحتاج طاقمًا أكبر في وقت واحد." },
        { title: "مدة الفعالية", desc: "ساعات العمل بما فيها المغادرة." },
        { title: "بُعد المواقف", desc: "المواقف البعيدة قد تحتاج عدّائين أو عربات جولف." },
        { title: "متطلبات كبار الشخصيات", desc: "كاونترات مخصّصة وتعامل بأولوية." },
        { title: "الإضافات", desc: "عربات جولف، ودعم ذوي الاحتياجات، ومظلات، وعناية بالسيارات." },
      ],
    },
    clientChecklist: {
      heading: "ما المعلومات المطلوبة لعرض سعر الفاليه؟",
      items: [
        "اسم الموقع وعنوانه",
        "تاريخ الفعالية ووقت البداية والنهاية",
        "عدد الضيوف",
        "العدد التقريبي للمركبات",
        "المواقف المتاحة (موقف القاعة، موقف إضافي)",
        "عدد كبار الشخصيات",
        "أي إضافات: عربات جولف، دعم ذوي الاحتياجات",
      ],
    },
    coordination: {
      heading: "كيف يعمل التنسيق مع الشركاء",
      paragraphs: [
        "إدارة الفعاليات السعودية منصة تنسيق عن بُعد. يوفّر طاقم الفاليه وتجهيزاته شريك فاليه سعودي معتمد يُختار لفعاليتك — ولا نوظّف فريق الفاليه مباشرة.",
        "نحن ندرس تدفّق ضيوفك، ونؤكد الطاقم وخطة الوقوف مع الشريك، ونقدّم عرض سعر واحدًا، ونبقى نقطة تواصلك. يعتمد التوفّر والسعر على التاريخ والموقع والمتطلبات، ويُؤكَّدان كتابيًا قبل الحجز.",
      ],
    },
    quality: {
      heading: "اعتبارات الجودة والتحكم",
      items: [
        { title: "الطاقم موثّق كتابيًا", desc: "حجم الفريق والساعات والإضافات مذكورة في عرض السعر." },
        { title: "التنسيق مع الموقع", desc: "مناطق الإنزال والوقوف متفق عليها مع الموقع مسبقًا." },
        { title: "التحكم بالمفاتيح", desc: "مفاتيح بنظام التذاكر ونقطة استرجاع منظّمة." },
        { title: "تخطيط المغادرة", desc: "الطاقم مخطّط لذروة المغادرة لا الوصول فقط." },
      ],
    },
    useCases: {
      heading: "طلبات فاليه نموذجية",
      items: [
        { title: "حفل زفاف في فندق", desc: "فريق فاليه ومدخل مخصّص للعائلة لحفل مسائي." },
        { title: "حفل شركة", desc: "طاقم لذروة وصول بين 7 و8 مساءً مع أولوية لكبار الشخصيات." },
        { title: "مناسبة في مزرعة خاصة", desc: "عربات جولف تنقل الضيوف من الموقف إلى مكان الحفل." },
        { title: "معرض لمدة يومين", desc: "تنظيم وقوف الزوّار طوال أيام العرض بساعات تشغيل محددة." },
      ],
    },
    feature: {
      image: "/services/vip_airport_chauffeur_riyadh.webp",
      alt: "سائق بالزي الرسمي يفتح باب سيارة لضيفة أمام مدخل فندق مساءً",
      caption: "إعداد نموذجي — استقبال الضيوف عند مدخل فندق",
    },
    riyadh: {
      heading: "خدمة الفاليه في أنحاء الرياض",
      paragraphs: [
        "الفعاليات في الرياض تعتمد على السيارات: معظم الضيوف يقودون أو يُقادون، وذروة الوصول في الأعراس والحفلات ضيقة. لكل قاعة فندقية أو قاعة خاصة أو مزرعة خطة وقوف مختلفة — ولهذا نؤكد مخطط الوقوف مع الموقع قبل تسعير الطاقم.",
        "تتكامل خدمة الفاليه مع النقل الفاخر لكبار الشخصيات، ومع الضيافة والترفيه داخل الفعالية.",
      ],
      links: [
        { label: "جميع خدمات الفعاليات في الرياض", href: "/locations/riyadh" },
        { label: "النقل الفاخر لكبار الشخصيات", href: "/services/vip-transportation" },
      ],
    },
    faqs: [
      { q: "هل تقدّمون خدمة فاليه لحفلات الزفاف في الرياض؟", a: "نعم. ننسّق فرق فاليه موحّدة الزي لحفلات الزفاف بحسب عدد الضيوف ومخطط الوقوف، مع مداخل منفصلة عند الحاجة." },
      { q: "من يوفّر طاقم الفاليه؟", a: "يوفّر الطاقم شريك فاليه سعودي معتمد يُختار لفعاليتك، وتتولى إدارة الفعاليات السعودية تنسيق الحجز والمتطلبات والتواصل." },
      { q: "كم عدد أفراد الفاليه الذي أحتاجه؟", a: "يعتمد على عدد المركبات ومدى تزامن الوصول وبُعد المواقف. شاركنا هذه التفاصيل ويقترح الشريك حجم الفريق المناسب للذروة." },
      { q: "كيف تُدار سلامة المفاتيح والمركبات؟", a: "تستخدم فرق الفاليه نظام تذاكر للمفاتيح وآلية استرجاع منظّمة لتتبّع المركبات وإعادتها بكفاءة." },
      { q: "هل يمكن مساعدة كبار السن وذوي الاحتياجات؟", a: "نعم. يمكن إضافة المساعدة بالكراسي المتحركة ودعم التنقّل عند الوصول والمغادرة." },
      { q: "هل يمكن توفير عربات جولف للمواقع الكبيرة؟", a: "نعم، يمكن إضافة عربات جولف لنقل الضيوف بين المواقف البعيدة والمدخل." },
      { q: "كم تكلفة خدمة الفاليه للفعاليات في الرياض؟", a: "يعتمد السعر على عدد المركبات وذروة الوصول والمدة وبُعد المواقف والإضافات. لا ننشر أسعارًا ثابتة؛ ستحصل على عرض سعر محدد بعد تأكيد المتطلبات." },
      { q: "قبل كم من الوقت يجب حجز الفاليه؟", a: "نوصي بالحجز قبل 2-3 أسابيع على الأقل، وأبكر خلال مواسم الأعراس وموسم الرياض." },
    ],
    related: [
      { title: "النقل الفاخر لكبار الشخصيات", href: "/services/vip-transportation", desc: "نقل بسائق لضيوف كبار الشخصيات.", image: "/services/vip_airport_chauffeur_riyadh.webp" },
      { title: "تموين الفعاليات", href: "/services/event-catering", desc: "ضيافة للأعراس والحفلات.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "حفلات الزفاف", href: "/services/weddings", desc: "تخطيط وتنسيق الأعراس.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "فعاليات الشركات", href: "/services/corporate-events", desc: "حفلات وإطلاقات وفعاليات الشركات.", image: "/services/premium_corporate_summit_hero.webp" },
    ],
    form: {
      heading: "اطلب عرض سعر للفاليه",
      subheading: "شاركنا الموقع وتدفّق الضيوف، ونؤكد التوفّر مع شريك فاليه مناسب ونعود إليك بخطة الطاقم وعرض السعر.",
      submitLabel: "اطلب عرض الفاليه",
      serviceOptions,
      serviceOptionLabels: ["فاليه حفلات الزفاف", "فاليه فعاليات الشركات", "فاليه الحفلات وكبار الشخصيات", "فاليه المؤتمرات والمعارض", "فاليه الفنادق والقاعات", "فاليه المناسبات الخاصة", "لست متأكدًا — أرجو النصيحة"],
      eventTypeOptions,
      eventTypeOptionLabels: ["زفاف", "فعالية شركة / حفل", "مؤتمر / معرض", "فعالية فندقية", "مناسبة خاصة", "فعالية كبار الشخصيات", "أخرى"],
      guestCountLabel: "عدد الضيوف",
      messageLabel: "متطلبات إضافية",
      messagePlaceholder: "وقت الوصول، المداخل المنفصلة، تفاصيل كبار الشخصيات، أي معلومات من الموقع عن المواقف...",
      fields: [
        { ...fields[0], displayLabel: "المركبات المتوقعة", optionLabels: ["أقل من 50", "50–150", "150–300", "أكثر من 300", "غير متأكد"] },
        { ...fields[1], displayLabel: "مدة الفعالية", optionLabels: ["حتى 3 ساعات", "3–6 ساعات", "يوم كامل", "عدة أيام"] },
        { ...fields[2], displayLabel: "وصول كبار الشخصيات؟", optionLabels: ["نعم", "لا", "غير متأكد"] },
        { ...fields[3], displayLabel: "المواقف المتاحة", optionLabels: ["موقف القاعة", "موقف قريب / إضافي", "مواقف محدودة", "غير متأكد"] },
        { ...fields[4], displayLabel: "إضافات مطلوبة", placeholder: "مثل: عربات جولف، كراسي متحركة" },
      ],
      whatsappText: "مرحبًا، أرغب في عرض سعر لخدمة فاليه لفعالية في الرياض.",
    },
  },
};
