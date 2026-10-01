import type { ServiceCategory } from "./types";

// Metadata for this route lives in app/[locale]/services/vip-transportation/layout.tsx
// (indexed EN + AR) — intentionally not duplicated here.
const fields = [
  { name: "pickup", label: "Pickup location", type: "text" as const, placeholder: "e.g. King Khalid International Airport, hotel name" },
  { name: "destination", label: "Destination", type: "text" as const, placeholder: "e.g. event venue, hotel" },
  { name: "passengers", label: "Passengers", type: "select" as const, options: ["1–3", "4–10", "11–30", "31–100", "100+"] },
  { name: "vehicle", label: "Vehicle preference", type: "select" as const, options: ["Luxury sedan", "Luxury SUV", "Van / minibus", "Coach / bus", "Armored / secure vehicle", "Mixed fleet", "Not sure"] },
  { name: "trips", label: "Trip type", type: "select" as const, options: ["One-way", "Return", "Multiple transfers / full day", "Multi-day programme"] },
];

const serviceOptions = ["VIP Airport Transfer", "Executive Event Transportation", "Corporate Delegate Transportation", "Wedding Guest Transportation", "Chauffeur Service", "Group / Multi-Vehicle Transport", "Event Shuttle", "Armored / Secure Transport", "Not sure — please advise"];
const eventTypeOptions = ["Corporate Event", "Conference / Exhibition", "Wedding", "VIP / Government Visit", "Gala / Awards", "Private Event", "Other"];

export const vipTransportation: ServiceCategory = {
  slug: "vip-transportation",
  source: "vip_transportation_page",
  serviceType: "VIP Event Transportation",
  en: {
    name: "VIP Transportation",
    hero: {
      badge: "VIP & Event Transportation · Riyadh",
      title: "VIP Event Transportation",
      highlight: "in Riyadh",
      subtitle:
        "Airport transfers, chauffeured luxury vehicles and delegate transport for weddings, conferences and corporate events. Share pickup points, dates and passenger numbers — SEM coordinates a suitable Saudi-based transport partner.",
      image: "/services/vip_airport_chauffeur_riyadh.webp",
      imageAlt: "Uniformed chauffeur opening a black luxury SUV door for a guest outside a hotel entrance in the evening",
    },
    snapshot: [
      { label: "Service type", value: "Chauffeured transport" },
      { label: "Best for", value: "VIP guests · Delegates · Weddings" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Itinerary-based" },
    ],
    answer: {
      question: "How does VIP event transportation work in Riyadh?",
      answer:
        "VIP event transportation covers chauffeured vehicles for guests, speakers and delegates — airport transfers, venue runs, multi-vehicle convoys and shuttles timed to your event programme. With SEM, you share pickup points, destinations, dates, passenger numbers and vehicle preferences; SEM coordinates a suitable Saudi-based transport partner, confirms vehicles and drivers, and presents one quotation. The partner provides the vehicles and chauffeurs.",
    },
    intro: [
      "For VIP guests and delegates, transport is part of the event. A missed airport pickup or a late convoy is noticed far more than a beautiful stage.",
      "SEM does not own vehicles. We plan the movement — who travels where, when and in what — and coordinate an established Saudi-based transport partner with the right vehicles and chauffeurs for your dates.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Transport plans are built around your guests and your run-of-show:",
      items: [
        { icon: "plane", title: "Airport & hotel transfers", desc: "Meet-and-greet, flight tracking and transfers to hotels and venues." },
        { icon: "shield", title: "VIP & secure transport", desc: "Discreet chauffeurs and secure or armored vehicle options for high-profile guests." },
        { icon: "car", title: "Luxury chauffeured vehicles", desc: "Premium sedans, SUVs and limousines with professional chauffeurs." },
        { icon: "users", title: "Group & delegate transport", desc: "Vans, minibuses and coaches for delegations and wedding guests." },
        { icon: "route", title: "Itinerary & route planning", desc: "Pickup points, timings and vehicle assignments planned around your programme." },
        { icon: "sparkles", title: "Occasion vehicles", desc: "Golf carts for venue transfers and ceremonial or vintage cars where available." },
      ],
    },
    subServices: {
      heading: "Transportation services",
      lead: "One enquiry covers all of these. Share your guest movements and SEM coordinates the right fleet.",
      items: [
        { title: "VIP Airport Transfers", desc: "Meet-and-greet with flight tracking for arriving guests and speakers.", useCase: "Delegations, speakers, VIP guests", image: "/services/vip_airport_chauffeur_riyadh.webp", imageAlt: "Chauffeur assisting a guest into an SUV at a hotel entrance" },
        { title: "Wedding Guest Transportation", desc: "Bridal-party cars, family transfers and guest shuttles.", useCase: "Weddings, engagements", image: "/riyadh_luxury_reception_people.webp", imageAlt: "Hotel ballroom prepared for a wedding reception", href: "/services/weddings" },
        { title: "Venue Transfers & Golf Carts", desc: "Short transfers between parking, hotels and venue entrances.", useCase: "Large venues, resorts", image: "/services/valet_golf_cart_guest_mobility.webp", imageAlt: "Golf cart carrying a guest to a venue entrance at dusk", href: "/services/valet-parking" },
        { icon: "building", title: "Executive Event Transportation", desc: "Leadership and client movement for corporate events.", href: "/services/corporate-events" },
        { icon: "users", title: "Corporate Delegate Transportation", desc: "Hotel-to-venue runs timed to the conference agenda.", href: "/services/conferences" },
        { icon: "crown", title: "VIP Guest Transfers", desc: "Discreet, protocol-aware movement for high-profile guests." },
        { icon: "car", title: "Chauffeur Service Coordination", desc: "Dedicated chauffeurs for the day or the full programme." },
        { icon: "car", title: "Luxury SUV Transfers", desc: "Premium SUVs for VIPs and small groups." },
        { icon: "car", title: "Luxury Sedan Transfers", desc: "Executive sedans for individual guests and speakers." },
        { icon: "truck", title: "Group / Multi-Vehicle Transport", desc: "Convoys and mixed fleets for delegations." },
        { icon: "route", title: "Event Shuttle Coordination", desc: "Scheduled shuttles between hotels and venues." },
        { icon: "map", title: "Point-to-Point Event Transfers", desc: "Single trips between any two locations for your event." },
      ],
    },
    flow: {
      heading: "How a transport plan is built",
      lead: "Fleet and scheduling follow these five inputs.",
      steps: [
        { label: "Passengers", detail: "Who travels and how many" },
        { label: "Pickups & destinations", detail: "Airport, hotels, venues" },
        { label: "Timings", detail: "Flights, sessions, departures" },
        { label: "Vehicle choice", detail: "Sedan, SUV, van, coach" },
        { label: "Fleet schedule", detail: "Vehicles, chauffeurs, routes" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Corporate events", desc: "Executives, clients and guests.", href: "/services/corporate-events" },
        { title: "Conferences", desc: "Delegates and speakers.", href: "/services/conferences" },
        { title: "Exhibitions", desc: "Stand teams, sponsors and VIP visitors.", href: "/services/exhibitions" },
        { title: "Weddings", desc: "Bridal party and family transfers.", href: "/services/weddings" },
        { title: "VIP & government guests", desc: "Discreet, protocol-aware movement." },
        { title: "Groups & delegations", desc: "Multi-vehicle convoys and shuttles." },
      ],
    },
    process: {
      heading: "How VIP transportation coordination works",
      items: [
        { title: "Share the itinerary", desc: "Pickups, destinations, dates, times and passenger numbers." },
        { title: "Plan the movement", desc: "Vehicle types, convoy needs, flight details and buffers." },
        { title: "Partner matching", desc: "A suitable Saudi-based transport partner for your dates." },
        { title: "Quotation & confirmation", desc: "Vehicles, chauffeurs and schedule in one quotation." },
        { title: "Day-of coordination", desc: "SEM stays your point of contact while transfers run." },
      ],
    },
    quoteFactors: {
      heading: "What affects VIP transportation pricing?",
      lead: "Transport pricing follows the itinerary and fleet:",
      items: [
        { title: "Vehicle type", desc: "Sedans, SUVs, limousines, vans and coaches differ in rate." },
        { title: "Number of vehicles", desc: "Convoys and mixed fleets for larger groups." },
        { title: "Duration", desc: "Single transfers vs. full-day or multi-day disposal." },
        { title: "Distance & routes", desc: "Airport runs, inter-city trips and multiple stops." },
        { title: "Security requirements", desc: "Secure or armored vehicles and protocol needs." },
        { title: "Timing", desc: "Late-night arrivals, peak seasons and short notice." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a transport quote?",
      items: [
        "Pickup locations (airport, hotels)",
        "Destinations and venue",
        "Dates and times, including flight details",
        "Number of passengers",
        "Vehicle preference",
        "One-way, return or full-day use",
        "Any VIP or security requirements",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. Vehicles and chauffeurs are provided by an established Saudi-based transport partner selected for your event — SEM does not own a fleet.",
        "SEM plans the movement with you, confirms vehicles and schedules with the partner, presents one quotation and stays your point of contact. Availability and pricing depend on dates, vehicles and itinerary, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "Schedule in writing", desc: "Vehicles, chauffeurs, pickup times and routes are listed in the quotation." },
        { title: "Flight tracking", desc: "Airport pickups are tracked against actual landing times." },
        { title: "Buffers built in", desc: "Riyadh traffic and session timings are allowed for in the plan." },
        { title: "Single contact", desc: "One coordination point for changes on the day." },
      ],
    },
    useCases: {
      heading: "Typical transportation requests",
      items: [
        { title: "Conference delegation", desc: "Airport pickups over two days, then hotel-to-venue shuttles each morning." },
        { title: "VIP speaker", desc: "A dedicated SUV and chauffeur for the speaker's full programme." },
        { title: "Wedding family transfers", desc: "Luxury cars for the bridal party plus a guest shuttle from the hotel." },
        { title: "Corporate gala", desc: "Executive sedans for leadership and a coach for staff." },
      ],
    },
    feature: {
      image: "/services/valet_golf_cart_guest_mobility.webp",
      alt: "Golf cart moving a guest from parking to a lit venue entrance at dusk",
      caption: "Representative setup — short-distance guest transfer at a large venue",
    },
    riyadh: {
      heading: "Event transportation across Riyadh",
      paragraphs: [
        "Riyadh is a city of long distances between the airport, hotels and venues, and traffic peaks around working hours. Good event transport plans include realistic buffers and pickup windows — which SEM confirms with the partner before quoting.",
        "Transportation pairs naturally with valet parking at the venue and with conference or exhibition schedules.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Valet parking", href: "/services/valet-parking" },
      ],
    },
    faqs: [
      { q: "Do you provide VIP airport transfers for event guests in Riyadh?", a: "Yes. SEM coordinates meet-and-greet airport transfers with flight tracking for VIP guests, speakers, delegates and wedding parties." },
      { q: "Does SEM own the vehicles?", a: "No. Vehicles and chauffeurs are provided by an established Saudi-based transport partner. SEM coordinates the itinerary, booking and communication." },
      { q: "Can you arrange armored or secure vehicles?", a: "Secure and armored vehicle options can be requested for high-profile guests, subject to partner availability. Include it in your enquiry." },
      { q: "Do you handle group transportation for conference delegates?", a: "Yes. SEM coordinates vans, minibuses and coaches with route planning, from small executive groups to large delegations." },
      { q: "Can transport be planned around our event itinerary?", a: "Yes. Pickup points, timings and vehicle assignments are planned around your run-of-show — arrivals, sessions, offsite dinners and departures." },
      { q: "Can vintage or ceremonial cars be arranged for a wedding?", a: "Where available through the partner, specialty and ceremonial vehicles can be included alongside standard luxury cars." },
      { q: "How much does VIP transportation cost in Riyadh?", a: "Pricing depends on vehicle type, number of vehicles, duration, distance and security needs. SEM does not publish fixed prices; you receive a specific quotation once the itinerary is confirmed." },
      { q: "How far in advance should event transportation be booked?", a: "We recommend 3–4 weeks ahead, and earlier in peak wedding and conference seasons to secure preferred vehicles." },
    ],
    related: [
      { title: "Valet Parking", href: "/services/valet-parking", desc: "Guest arrival and parking at the venue.", image: "/services/valet_golf_cart_guest_mobility.webp" },
      { title: "Corporate Events", href: "/services/corporate-events", desc: "Galas, launches and company events.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "Conferences", href: "/services/conferences", desc: "Conference coordination in Saudi Arabia.", image: "/services/premium_conference_management_hero.webp" },
      { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and coordination.", image: "/riyadh_luxury_reception_people.webp" },
    ],
    form: {
      heading: "Request a transport quote",
      subheading: "Share the itinerary and passengers. SEM checks availability with a suitable transport partner and comes back with vehicles, schedule and a quote.",
      submitLabel: "Request Transport Quote",
      serviceOptions,
      eventTypeOptions,
      guestCountLabel: "Total Guests",
      messagePlaceholder: "Flight numbers, pickup times, number of trips, VIP or security needs...",
      fields,
      whatsappText: "Hi SEM, I need VIP transportation for an event in Riyadh.",
    },
  },
  ar: {
    name: "النقل الفاخر لكبار الشخصيات",
    hero: {
      badge: "نقل كبار الشخصيات والفعاليات · الرياض",
      title: "نقل كبار الشخصيات للفعاليات",
      highlight: "في الرياض",
      subtitle:
        "استقبال من المطار، ومركبات فاخرة بسائق، ونقل للمندوبين في حفلات الزفاف والمؤتمرات وفعاليات الشركات. شاركنا نقاط الاستقبال والتواريخ وعدد الركاب — وتنسّق إدارة الفعاليات السعودية مع شريك نقل سعودي مناسب.",
      image: "/services/vip_airport_chauffeur_riyadh.webp",
      imageAlt: "سائق بالزي الرسمي يفتح باب سيارة دفع رباعي فاخرة لضيفة أمام مدخل فندق مساءً",
    },
    snapshot: [
      { label: "نوع الخدمة", value: "نقل بسائق" },
      { label: "الأنسب لـ", value: "كبار الشخصيات · المندوبون · الأعراس" },
      { label: "الموقع", value: "الرياض والمدن الرئيسية" },
      { label: "عرض السعر", value: "حسب البرنامج" },
    ],
    answer: {
      question: "كيف يعمل نقل كبار الشخصيات للفعاليات في الرياض؟",
      answer:
        "يشمل نقل كبار الشخصيات للفعاليات مركبات بسائق للضيوف والمتحدثين والمندوبين — استقبال المطار، والتنقل بين القاعات، والمواكب متعددة المركبات، والحافلات المجدولة حسب برنامج الفعالية. مع إدارة الفعاليات السعودية، تشاركنا نقاط الاستقبال والوجهات والتواريخ وعدد الركاب ونوع المركبة المفضّل؛ فننسّق مع شريك نقل سعودي مناسب، ونؤكد المركبات والسائقين، ونقدّم عرض سعر واحدًا. ويوفّر الشريك المركبات والسائقين.",
    },
    intro: [
      "بالنسبة لكبار الشخصيات والمندوبين، النقل جزء من الفعالية. استقبال فائت في المطار أو موكب متأخر يُلاحَظ أكثر بكثير من مسرح جميل.",
      "لا تمتلك إدارة الفعاليات السعودية مركبات؛ بل نخطّط الحركة — من يسافر، وإلى أين، ومتى، وبأي مركبة — وننسّق مع شريك نقل سعودي معتمد لديه المركبات والسائقون المناسبون لتواريخك.",
    ],
    capabilities: {
      heading: "ما يمكننا تنسيقه",
      lead: "تُبنى خطط النقل حول ضيوفك وبرنامج فعاليتك:",
      items: [
        { icon: "plane", title: "استقبال المطارات والفنادق", desc: "استقبال شخصي، وتتبّع الرحلات، والنقل إلى الفنادق والقاعات." },
        { icon: "shield", title: "نقل آمن لكبار الشخصيات", desc: "سائقون متكتّمون وخيارات مركبات آمنة أو مدرّعة للضيوف رفيعي المستوى." },
        { icon: "car", title: "مركبات فاخرة بسائق", desc: "سيدان فاخرة، ودفع رباعي، وليموزين مع سائقين محترفين." },
        { icon: "users", title: "نقل جماعي للمندوبين", desc: "فانات وحافلات صغيرة وكبيرة للوفود وضيوف الأعراس." },
        { icon: "route", title: "تخطيط البرنامج والمسارات", desc: "نقاط الاستقبال والأوقات وتوزيع المركبات وفق برنامجك." },
        { icon: "sparkles", title: "مركبات المناسبات", desc: "عربات جولف للتنقل داخل الموقع، وسيارات احتفالية أو كلاسيكية حين تتوفّر." },
      ],
    },
    subServices: {
      heading: "خدمات النقل",
      lead: "طلب واحد يشمل كل ذلك. شاركنا تحركات ضيوفك وننسّق الأسطول المناسب.",
      items: [
        { title: "استقبال كبار الشخصيات من المطار", desc: "استقبال شخصي مع تتبّع الرحلات للضيوف والمتحدثين.", useCase: "الوفود والمتحدثون وكبار الضيوف", image: "/services/vip_airport_chauffeur_riyadh.webp", imageAlt: "سائق يساعد ضيفة على ركوب سيارة عند مدخل فندق" },
        { title: "نقل ضيوف حفلات الزفاف", desc: "سيارات موكب العروسين، ونقل العائلات، وحافلات الضيوف.", useCase: "الأعراس والخطوبة", image: "/riyadh_luxury_reception_people.webp", imageAlt: "قاعة فندقية مجهّزة لحفل زفاف", href: "/services/weddings" },
        { title: "التنقل داخل الموقع وعربات الجولف", desc: "تنقلات قصيرة بين المواقف والفنادق ومداخل القاعات.", useCase: "المواقع الكبيرة والمنتجعات", image: "/services/valet_golf_cart_guest_mobility.webp", imageAlt: "عربة جولف تقل ضيفة إلى مدخل القاعة", href: "/services/valet-parking" },
        { icon: "building", title: "نقل تنفيذي للفعاليات", desc: "تنقّل القيادات والعملاء في فعاليات الشركات.", href: "/services/corporate-events" },
        { icon: "users", title: "نقل مندوبي الشركات", desc: "رحلات من الفندق إلى القاعة وفق جدول المؤتمر.", href: "/services/conferences" },
        { icon: "crown", title: "نقل كبار الضيوف", desc: "تنقّل متكتّم يراعي البروتوكول للضيوف رفيعي المستوى." },
        { icon: "car", title: "تنسيق خدمة السائق", desc: "سائق مخصّص ليوم كامل أو للبرنامج بأكمله." },
        { icon: "car", title: "نقل بسيارات دفع رباعي فاخرة", desc: "دفع رباعي فاخر لكبار الشخصيات والمجموعات الصغيرة." },
        { icon: "car", title: "نقل بسيارات سيدان فاخرة", desc: "سيدان تنفيذية للضيوف والمتحدثين." },
        { icon: "truck", title: "نقل جماعي متعدد المركبات", desc: "مواكب وأساطيل مختلطة للوفود." },
        { icon: "route", title: "تنسيق حافلات الفعالية", desc: "حافلات مجدولة بين الفنادق والقاعات." },
        { icon: "map", title: "نقل من نقطة إلى نقطة", desc: "رحلات مفردة بين أي موقعين لفعاليتك." },
      ],
    },
    flow: {
      heading: "كيف تُبنى خطة النقل",
      lead: "يتحدد الأسطول والجدولة بهذه المدخلات الخمسة.",
      steps: [
        { label: "الركاب", detail: "من يسافر وكم عددهم" },
        { label: "نقاط الاستقبال والوجهات", detail: "المطار والفنادق والقاعات" },
        { label: "الأوقات", detail: "الرحلات والجلسات والمغادرة" },
        { label: "نوع المركبة", detail: "سيدان، دفع رباعي، فان، حافلة" },
        { label: "جدول الأسطول", detail: "المركبات والسائقون والمسارات" },
      ],
    },
    idealFor: {
      heading: "الأنسب لـ",
      items: [
        { title: "فعاليات الشركات", desc: "التنفيذيون والعملاء والضيوف.", href: "/services/corporate-events" },
        { title: "المؤتمرات", desc: "المندوبون والمتحدثون.", href: "/services/conferences" },
        { title: "المعارض", desc: "فرق الأجنحة والرعاة وكبار الزوّار.", href: "/services/exhibitions" },
        { title: "حفلات الزفاف", desc: "موكب العروسين ونقل العائلات.", href: "/services/weddings" },
        { title: "كبار الشخصيات والضيوف الرسميون", desc: "تنقّل متكتّم يراعي البروتوكول." },
        { title: "المجموعات والوفود", desc: "مواكب متعددة المركبات وحافلات." },
      ],
    },
    process: {
      heading: "كيف يعمل تنسيق النقل",
      items: [
        { title: "شارك البرنامج", desc: "نقاط الاستقبال، والوجهات، والتواريخ، والأوقات، وعدد الركاب." },
        { title: "تخطيط الحركة", desc: "أنواع المركبات، والمواكب، وتفاصيل الرحلات، والهوامش الزمنية." },
        { title: "اختيار الشريك", desc: "شريك نقل سعودي مناسب ومتاح في تواريخك." },
        { title: "عرض السعر والتأكيد", desc: "المركبات والسائقون والجدول في عرض سعر واحد." },
        { title: "التنسيق يوم الفعالية", desc: "نبقى نقطة تواصلك أثناء تنفيذ التنقلات." },
      ],
    },
    quoteFactors: {
      heading: "ما الذي يؤثر على سعر نقل كبار الشخصيات؟",
      lead: "يتحدد السعر بحسب البرنامج والأسطول:",
      items: [
        { title: "نوع المركبة", desc: "تختلف الأسعار بين السيدان والدفع الرباعي والليموزين والفانات والحافلات." },
        { title: "عدد المركبات", desc: "المواكب والأساطيل المختلطة للمجموعات الكبيرة." },
        { title: "المدة", desc: "تنقلات مفردة أو استخدام ليوم كامل أو عدة أيام." },
        { title: "المسافات والمسارات", desc: "رحلات المطار والتنقل بين المدن والمحطات المتعددة." },
        { title: "متطلبات الأمان", desc: "مركبات آمنة أو مدرّعة ومتطلبات البروتوكول." },
        { title: "التوقيت", desc: "الوصول المتأخر ليلًا، ومواسم الذروة، والطلبات العاجلة." },
      ],
    },
    clientChecklist: {
      heading: "ما المعلومات المطلوبة لعرض سعر النقل؟",
      items: [
        "نقاط الاستقبال (المطار، الفنادق)",
        "الوجهات والقاعة",
        "التواريخ والأوقات، بما فيها تفاصيل الرحلات",
        "عدد الركاب",
        "نوع المركبة المفضّل",
        "ذهاب فقط، أو ذهاب وعودة، أو استخدام ليوم كامل",
        "أي متطلبات لكبار الشخصيات أو الأمان",
      ],
    },
    coordination: {
      heading: "كيف يعمل التنسيق مع الشركاء",
      paragraphs: [
        "إدارة الفعاليات السعودية منصة تنسيق عن بُعد. يوفّر المركبات والسائقين شريك نقل سعودي معتمد يُختار لفعاليتك — ولا نمتلك أسطولًا.",
        "نخطّط الحركة معك، ونؤكد المركبات والجداول مع الشريك، ونقدّم عرض سعر واحدًا، ونبقى نقطة تواصلك. يعتمد التوفّر والسعر على التواريخ والمركبات والبرنامج، ويُؤكَّدان كتابيًا قبل الحجز.",
      ],
    },
    quality: {
      heading: "اعتبارات الجودة والتحكم",
      items: [
        { title: "الجدول موثّق كتابيًا", desc: "المركبات والسائقون وأوقات الاستقبال والمسارات مذكورة في عرض السعر." },
        { title: "تتبّع الرحلات", desc: "يُتابَع استقبال المطار وفق موعد الهبوط الفعلي." },
        { title: "هوامش زمنية", desc: "تُراعى حركة المرور في الرياض وأوقات الجلسات في الخطة." },
        { title: "نقطة تواصل واحدة", desc: "جهة تنسيق واحدة لأي تغييرات يوم الفعالية." },
      ],
    },
    useCases: {
      heading: "طلبات نقل نموذجية",
      items: [
        { title: "وفد مؤتمر", desc: "استقبال من المطار على مدى يومين، ثم حافلات صباحية من الفندق إلى القاعة." },
        { title: "متحدث من كبار الشخصيات", desc: "سيارة دفع رباعي وسائق مخصّص طوال برنامج المتحدث." },
        { title: "نقل عائلة العروسين", desc: "سيارات فاخرة لموكب العروسين وحافلة للضيوف من الفندق." },
        { title: "حفل شركة", desc: "سيدان تنفيذية للقيادات وحافلة للموظفين." },
      ],
    },
    feature: {
      image: "/services/valet_golf_cart_guest_mobility.webp",
      alt: "عربة جولف تنقل ضيفة من الموقف إلى مدخل قاعة مضاءة عند الغروب",
      caption: "إعداد نموذجي — تنقّل قصير للضيوف في موقع كبير",
    },
    riyadh: {
      heading: "نقل الفعاليات في أنحاء الرياض",
      paragraphs: [
        "الرياض مدينة مسافات طويلة بين المطار والفنادق والقاعات، وتزدحم حركتها في أوقات الدوام. خطط النقل الجيدة تتضمن هوامش واقعية ونوافذ استقبال مناسبة — ونؤكدها مع الشريك قبل التسعير.",
        "يتكامل النقل مع خدمة الفاليه عند القاعة ومع جداول المؤتمرات والمعارض.",
      ],
      links: [
        { label: "جميع خدمات الفعاليات في الرياض", href: "/locations/riyadh" },
        { label: "خدمة الفاليه", href: "/services/valet-parking" },
      ],
    },
    faqs: [
      { q: "هل تقدّمون استقبالًا لكبار الشخصيات من المطار في الرياض؟", a: "نعم. ننسّق استقبالًا شخصيًا من المطار مع تتبّع الرحلات لكبار الضيوف والمتحدثين والمندوبين وأطراف حفلات الزفاف." },
      { q: "هل تمتلك إدارة الفعاليات السعودية المركبات؟", a: "لا. يوفّر المركبات والسائقين شريك نقل سعودي معتمد، ونتولى نحن تنسيق البرنامج والحجز والتواصل." },
      { q: "هل يمكن توفير مركبات مدرّعة أو آمنة؟", a: "يمكن طلب خيارات مركبات آمنة ومدرّعة للضيوف رفيعي المستوى حسب توفّرها لدى الشريك. اذكر ذلك في طلبك." },
      { q: "هل تتولّون النقل الجماعي لمندوبي المؤتمرات؟", a: "نعم. ننسّق فانات وحافلات صغيرة وكبيرة مع تخطيط المسارات، من مجموعات تنفيذية صغيرة إلى وفود كبيرة." },
      { q: "هل يمكن تخطيط النقل حسب برنامج الفعالية؟", a: "نعم. تُخطَّط نقاط الاستقبال والأوقات وتوزيع المركبات وفق برنامجك — الوصول، والجلسات، والعشاء الخارجي، والمغادرة." },
      { q: "هل يمكن توفير سيارات كلاسيكية أو احتفالية للزفاف؟", a: "حين تتوفّر لدى الشريك، يمكن إضافة مركبات خاصة واحتفالية إلى جانب السيارات الفاخرة المعتادة." },
      { q: "كم تكلفة نقل كبار الشخصيات في الرياض؟", a: "يعتمد السعر على نوع المركبة وعددها والمدة والمسافة ومتطلبات الأمان. لا ننشر أسعارًا ثابتة؛ ستحصل على عرض سعر محدد بعد تأكيد البرنامج." },
      { q: "قبل كم من الوقت يجب حجز النقل؟", a: "نوصي بالحجز قبل 3-4 أسابيع، وأبكر خلال مواسم الأعراس والمؤتمرات لضمان المركبات المفضّلة." },
    ],
    related: [
      { title: "خدمة الفاليه", href: "/services/valet-parking", desc: "استقبال الضيوف والوقوف عند القاعة.", image: "/services/valet_golf_cart_guest_mobility.webp" },
      { title: "فعاليات الشركات", href: "/services/corporate-events", desc: "حفلات وإطلاقات وفعاليات الشركات.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "المؤتمرات", href: "/services/conferences", desc: "تنسيق المؤتمرات في السعودية.", image: "/services/premium_conference_management_hero.webp" },
      { title: "حفلات الزفاف", href: "/services/weddings", desc: "تخطيط وتنسيق الأعراس.", image: "/riyadh_luxury_reception_people.webp" },
    ],
    form: {
      heading: "اطلب عرض سعر للنقل",
      subheading: "شاركنا البرنامج وعدد الركاب، ونتحقق من التوفّر مع شريك نقل مناسب ونعود إليك بالمركبات والجدول وعرض السعر.",
      submitLabel: "اطلب عرض النقل",
      serviceOptions,
      serviceOptionLabels: ["استقبال كبار الشخصيات من المطار", "نقل تنفيذي للفعاليات", "نقل مندوبي الشركات", "نقل ضيوف الزفاف", "خدمة سائق", "نقل جماعي متعدد المركبات", "حافلات الفعالية", "نقل آمن / مدرّع", "لست متأكدًا — أرجو النصيحة"],
      eventTypeOptions,
      eventTypeOptionLabels: ["فعالية شركة", "مؤتمر / معرض", "زفاف", "زيارة كبار شخصيات / رسمية", "حفل / جوائز", "مناسبة خاصة", "أخرى"],
      guestCountLabel: "إجمالي الضيوف",
      messageLabel: "متطلبات إضافية",
      messagePlaceholder: "أرقام الرحلات، أوقات الاستقبال، عدد التنقلات، متطلبات كبار الشخصيات أو الأمان...",
      fields: [
        { ...fields[0], displayLabel: "نقطة الاستقبال", placeholder: "مثل: مطار الملك خالد الدولي، اسم الفندق" },
        { ...fields[1], displayLabel: "الوجهة", placeholder: "مثل: قاعة الفعالية، الفندق" },
        { ...fields[2], displayLabel: "عدد الركاب" },
        { ...fields[3], displayLabel: "نوع المركبة المفضّل", optionLabels: ["سيدان فاخرة", "دفع رباعي فاخر", "فان / حافلة صغيرة", "حافلة كبيرة", "مركبة مدرّعة / آمنة", "أسطول مختلط", "غير متأكد"] },
        { ...fields[4], displayLabel: "نوع الرحلة", optionLabels: ["ذهاب فقط", "ذهاب وعودة", "تنقلات متعددة / يوم كامل", "برنامج لعدة أيام"] },
      ],
      whatsappText: "مرحبًا، أحتاج نقلًا لكبار الشخصيات لفعالية في الرياض.",
    },
  },
};
