import type { ServiceCategory } from "./types";

// Metadata for this route lives in app/[locale]/services/entertainment/layout.tsx
// (indexed EN + AR) — intentionally not duplicated here.
const fields = [
  { name: "entType", label: "Entertainment type", type: "select" as const, options: ["Live band / musicians", "DJ", "Cultural / traditional performance", "Interactive performers", "Family / kids entertainment", "Mixed programme", "Not sure"] },
  { name: "audience", label: "Audience", type: "select" as const, options: ["Men", "Women", "Mixed", "Family / children"] },
  { name: "duration", label: "Performance duration", type: "select" as const, options: ["Under 1 hour", "1–2 hours", "2–4 hours", "Full event"] },
  { name: "sound", label: "Sound & stage available?", type: "select" as const, options: ["Yes — venue provides", "No — needs arranging", "Not sure"] },
];

const serviceOptions = ["Live Band / Musicians", "DJ", "Cultural / Traditional Saudi Entertainment", "Corporate Entertainment", "Wedding Entertainment", "Exhibition / Activation Entertainment", "Family / Kids Entertainment", "Interactive Performers", "Not sure — please advise"];
const eventTypeOptions = ["Wedding", "Corporate Gala / Awards", "Brand Activation / Launch", "Exhibition", "National Day / Cultural Event", "Family / Private Event", "Other"];

export const entertainment: ServiceCategory = {
  slug: "entertainment",
  source: "entertainment_page",
  serviceType: "Event Entertainment",
  en: {
    name: "Entertainment",
    hero: {
      badge: "Event Entertainment · Riyadh",
      title: "Event Entertainment",
      highlight: "in Riyadh",
      subtitle:
        "Live bands, DJs, cultural performances and interactive acts for weddings, galas and brand events. Tell us your date, audience and the mood you want — SEM coordinates suitable performers through Saudi-based entertainment partners.",
      image: "/services/live_band_musicians_saudi.webp",
      imageAlt: "Oud, violin and keyboard trio performing live on a stage at an evening event in a decorated hall",
    },
    snapshot: [
      { label: "Service type", value: "Talent & performance" },
      { label: "Best for", value: "Weddings · Galas · Activations" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Date & performer-based" },
    ],
    answer: {
      question: "How do I book entertainment for an event in Riyadh?",
      answer:
        "Share your event date, venue, audience, programme timing and the kind of entertainment you want — live music, a DJ, cultural performers or interactive acts. SEM, an event-services coordination platform, checks availability with suitable Saudi-based entertainment partners, presents performer options and pricing in one quotation, and coordinates technical needs such as sound and stage. Availability always depends on the date, performer type and venue.",
    },
    intro: [
      "Entertainment sets the energy of an event — and it is the service most affected by the calendar. Popular performers book out early around wedding season, Riyadh Season and national holidays.",
      "SEM does not manage artists directly. We qualify your audience, venue and programme, then request options from Saudi-based entertainment partners and coordinate the technical rider with your sound and stage setup.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Entertainment is matched to your audience, venue and programme:",
      items: [
        { icon: "music", title: "Live music", desc: "Instrumentalists, vocalists and bands — Arabic, Western or mixed repertoire." },
        { icon: "disc", title: "DJs & MCs", desc: "DJs and hosts for weddings, corporate parties and activations." },
        { icon: "star", title: "Cultural performances", desc: "Traditional Saudi performances for national and cultural occasions." },
        { icon: "sparkles", title: "Interactive acts", desc: "Roaming performers and interactive concepts suited to your theme." },
        { icon: "users", title: "Family entertainment", desc: "Programming for family days, kids' events and mixed audiences." },
        { icon: "sliders", title: "Technical coordination", desc: "Sound, stage and run-of-show coordinated with performers' requirements." },
      ],
    },
    subServices: {
      heading: "Entertainment options",
      lead: "One enquiry covers all of these. Availability depends on the date, performer type and venue.",
      items: [
        { title: "Live Bands & Musicians", desc: "Oud, violin, keyboard, vocalists and full bands.", useCase: "Weddings, galas, dinners", image: "/services/live_band_musicians_saudi.webp", imageAlt: "Trio of musicians performing on oud, violin and keyboard" },
        { title: "Stage Shows & Concerts", desc: "Performers and acts for larger stage programmes.", useCase: "Activations, national celebrations", image: "/services/event_production_stage_riyadh.webp", imageAlt: "Auditorium stage with LED wall and lighting for a show", href: "/services/event-production" },
        { icon: "disc", title: "DJs", desc: "Wedding, corporate and activation DJs with suitable audio." },
        { icon: "star", title: "Cultural Performances", desc: "Performances for National Day and cultural events.", href: "/services/cultural-events" },
        { icon: "crown", title: "Traditional Saudi Entertainment", desc: "Heritage-inspired performances for Saudi occasions." },
        { icon: "building", title: "Corporate Entertainment", desc: "Gala acts, award-night music and team events.", href: "/services/corporate-events" },
        { icon: "flower", title: "Wedding Entertainment", desc: "Entrance music, live performers and DJs.", href: "/services/weddings" },
        { icon: "sparkles", title: "Exhibition Entertainment", desc: "Stand activations that draw visitors.", href: "/services/exhibitions" },
        { icon: "users", title: "Family Entertainment", desc: "Family days and children's programming.", href: "/services/birthday-party" },
        { icon: "zap", title: "Interactive Performances", desc: "Roaming and interactive acts for guest engagement." },
      ],
    },
    flow: {
      heading: "How an entertainment brief becomes a booking",
      lead: "Options depend on these five inputs.",
      steps: [
        { label: "Event & date", detail: "Availability starts here" },
        { label: "Audience", detail: "Men, women, mixed or family" },
        { label: "Mood & format", detail: "Ambient, feature or high-energy" },
        { label: "Venue & tech", detail: "Stage, sound, power" },
        { label: "Performer options", detail: "Shortlist and quotation" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Weddings", desc: "Entrances, receptions and celebrations.", href: "/services/weddings" },
        { title: "Corporate galas", desc: "Arrivals, dinner and award moments.", href: "/services/corporate-events" },
        { title: "Brand activations", desc: "Crowd-drawing performances." },
        { title: "National & cultural events", desc: "National Day and seasonal programming.", href: "/services/cultural-events" },
        { title: "Exhibitions", desc: "Stand entertainment.", href: "/services/exhibitions" },
        { title: "Family events", desc: "Mixed-age audiences.", href: "/services/birthday-party" },
      ],
    },
    process: {
      heading: "How entertainment coordination works",
      items: [
        { title: "Share the brief", desc: "Date, venue, audience, timing and preferred style." },
        { title: "Check availability", desc: "SEM checks suitable performers with partners for your date." },
        { title: "Options & quotation", desc: "Performer options, durations and technical needs in one quote." },
        { title: "Confirm & schedule", desc: "Run-of-show timings and the technical rider confirmed." },
        { title: "Event-day coordination", desc: "Arrivals, sound check and performance cues coordinated." },
      ],
    },
    quoteFactors: {
      heading: "What affects entertainment pricing?",
      lead: "Entertainment fees vary widely by performer and date:",
      items: [
        { title: "Performer type", desc: "Solo artists, bands, DJs and groups differ greatly." },
        { title: "Performance length", desc: "Number of sets and total time on stage." },
        { title: "Date & season", desc: "Weekends, wedding season and Riyadh Season affect fees and availability." },
        { title: "Technical rider", desc: "Sound, stage, lighting and backline requirements." },
        { title: "Travel & logistics", desc: "Performers travelling from outside Riyadh." },
        { title: "Exclusivity", desc: "Specific named performers vs. a recommended shortlist." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for an entertainment quote?",
      items: [
        "Event type, date and venue",
        "Audience: men, women, mixed or family",
        "Preferred style: live music, DJ, cultural, interactive",
        "Performance timing and duration",
        "Whether sound and stage are already arranged",
        "Any specific performer in mind",
        "Budget range, if you have one",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. Performers are booked through Saudi-based entertainment partners selected for your event — SEM does not employ or manage artists directly.",
        "SEM qualifies the brief, checks availability, presents options in one quotation and coordinates the technical needs with your production team. Availability and pricing depend on the date, performer and venue, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "Confirmed line-up", desc: "Performers, set times and durations are listed in the quotation." },
        { title: "Cultural fit", desc: "Repertoire and format are matched to your audience and occasion." },
        { title: "Technical rider", desc: "Sound and stage needs are shared with the production team in advance." },
        { title: "Sound check", desc: "Time for a sound check is built into the schedule." },
      ],
    },
    useCases: {
      heading: "Typical entertainment requests",
      items: [
        { title: "Wedding reception", desc: "Live oud and violin during dinner, then a DJ for the celebration." },
        { title: "Corporate gala", desc: "Ambient music on arrival and a feature performance between award segments." },
        { title: "National Day event", desc: "Traditional performances for an office or community celebration." },
        { title: "Brand activation", desc: "Interactive performers drawing visitors to a stand or pop-up." },
      ],
    },
    feature: {
      image: "/services/event_production_stage_riyadh.webp",
      alt: "Auditorium stage with LED wall, lighting truss and an audio mixing desk ready for a live show",
      caption: "Representative setup — stage show with production support",
    },
    riyadh: {
      heading: "Event entertainment across Riyadh",
      paragraphs: [
        "Riyadh's entertainment calendar is busy — Riyadh Season, National Day and wedding season all compete for the same performers. Enquiring early gives you the widest choice.",
        "Entertainment works best planned with sound, lighting and staging. SEM can coordinate all of them under one enquiry.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Sound & audio", href: "/services/sound-audio" },
      ],
    },
    faqs: [
      { q: "Do you provide live entertainment for weddings in Riyadh?", a: "Yes. SEM coordinates live musicians, DJs and performers for weddings, matched to your audience and cultural requirements." },
      { q: "Who provides the performers?", a: "Performers are booked through Saudi-based entertainment partners. SEM coordinates availability, the quotation and the technical needs." },
      { q: "Can you arrange traditional Saudi performances?", a: "Yes, for National Day, cultural events and celebrations, subject to performer availability on your date." },
      { q: "Can you book entertainment for corporate events and activations?", a: "Yes — from ambient live music at galas to interactive performers for brand activations and exhibitions." },
      { q: "Do you coordinate sound and stage with the entertainment?", a: "Yes. SEM shares the performers' technical rider with the sound and production team so sound checks and stage needs are covered." },
      { q: "How much does event entertainment cost in Riyadh?", a: "It depends on performer type, performance length, date, technical rider and travel. SEM does not publish fixed prices; you receive a specific quotation once availability is confirmed." },
      { q: "How far in advance should entertainment be booked?", a: "At least 4–6 weeks ahead, and 2–3 months ahead for peak wedding season and Riyadh Season." },
    ],
    related: [
      { title: "Sound & Audio", href: "/services/sound-audio", desc: "Audio for performers and DJs.", image: "/services/event_production_stage_riyadh.webp" },
      { title: "Event Lighting", href: "/services/event-lighting", desc: "Show and stage lighting.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "Event Catering", href: "/services/event-catering", desc: "Catering for galas and receptions.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and coordination.", image: "/services/luxury_wedding_table_setting.webp" },
    ],
    form: {
      heading: "Check entertainment availability",
      subheading: "Share the date, audience and style. SEM checks suitable performers with partners and comes back with options and next steps.",
      submitLabel: "Check Availability",
      serviceOptions,
      eventTypeOptions,
      guestCountLabel: "Guest Count",
      messagePlaceholder: "Programme timing, preferred style or performers, cultural requirements, venue sound/stage details...",
      fields,
      whatsappText: "Hi SEM, I'd like to check entertainment availability for an event in Riyadh.",
    },
  },
  ar: {
    name: "الترفيه",
    hero: {
      badge: "ترفيه الفعاليات · الرياض",
      title: "ترفيه الفعاليات",
      highlight: "في الرياض",
      subtitle:
        "فرق موسيقية حية، ومنسقو حفلات، وعروض ثقافية، وفقرات تفاعلية لحفلات الزفاف والحفلات الفاخرة وفعاليات العلامات التجارية. أخبرنا بالتاريخ والجمهور والأجواء المطلوبة — وتنسّق إدارة الفعاليات السعودية فنانين مناسبين عبر شركاء ترفيه في المملكة.",
      image: "/services/live_band_musicians_saudi.webp",
      imageAlt: "ثلاثي موسيقي يعزف العود والكمان والكيبورد على مسرح في أمسية بقاعة مزيّنة",
    },
    snapshot: [
      { label: "نوع الخدمة", value: "مواهب وعروض" },
      { label: "الأنسب لـ", value: "الأعراس · الحفلات · التفعيلات" },
      { label: "الموقع", value: "الرياض والمدن الرئيسية" },
      { label: "عرض السعر", value: "حسب التاريخ والفنان" },
    ],
    answer: {
      question: "كيف أحجز ترفيهًا لفعالية في الرياض؟",
      answer:
        "شاركنا تاريخ الفعالية والموقع والجمهور وتوقيت البرنامج ونوع الترفيه المطلوب — موسيقى حية، أو منسق حفلات، أو عروض ثقافية، أو فقرات تفاعلية. تتحقق إدارة الفعاليات السعودية، بصفتها منصة لتنسيق خدمات الفعاليات، من التوفّر لدى شركاء ترفيه مناسبين في المملكة، وتقدّم خيارات الفنانين والأسعار في عرض سعر واحد، وتنسّق المتطلبات التقنية كالصوت والمسرح. ويعتمد التوفّر دائمًا على التاريخ ونوع الفنان والموقع.",
    },
    intro: [
      "الترفيه يحدد طاقة الفعالية — وهو أكثر الخدمات تأثرًا بالتقويم؛ إذ يُحجز الفنانون المطلوبون مبكرًا في مواسم الأعراس وموسم الرياض والأعياد الوطنية.",
      "لا ندير الفنانين مباشرة؛ بل ندرس جمهورك وموقعك وبرنامجك، ثم نطلب خيارات من شركاء ترفيه في المملكة، وننسّق متطلباتهم التقنية مع إعدادات الصوت والمسرح.",
    ],
    capabilities: {
      heading: "ما يمكننا تنسيقه",
      lead: "يُطابَق الترفيه مع جمهورك وموقعك وبرنامجك:",
      items: [
        { icon: "music", title: "موسيقى حية", desc: "عازفون ومطربون وفرق — بأداء عربي أو غربي أو مختلط." },
        { icon: "disc", title: "منسقو حفلات ومقدّمون", desc: "منسقو حفلات ومقدّمون للأعراس وحفلات الشركات والتفعيلات." },
        { icon: "star", title: "عروض ثقافية", desc: "عروض سعودية تقليدية للمناسبات الوطنية والثقافية." },
        { icon: "sparkles", title: "فقرات تفاعلية", desc: "فنانون متجولون ومفاهيم تفاعلية تناسب طابع فعاليتك." },
        { icon: "users", title: "ترفيه عائلي", desc: "برامج لأيام العائلات وفعاليات الأطفال والجمهور المختلط." },
        { icon: "sliders", title: "تنسيق تقني", desc: "الصوت والمسرح وبرنامج الحفل بالتنسيق مع متطلبات الفنانين." },
      ],
    },
    subServices: {
      heading: "خيارات الترفيه",
      lead: "طلب واحد يشمل كل ذلك. يعتمد التوفّر على التاريخ ونوع الفنان والموقع.",
      items: [
        { title: "فرق وموسيقيون أحياء", desc: "عود وكمان وكيبورد ومطربون وفرق كاملة.", useCase: "الأعراس والحفلات والعشاء", image: "/services/live_band_musicians_saudi.webp", imageAlt: "ثلاثي موسيقي يعزف العود والكمان والكيبورد" },
        { title: "عروض مسرحية وحفلات", desc: "فنانون وفقرات لبرامج المسرح الكبيرة.", useCase: "التفعيلات والاحتفالات الوطنية", image: "/services/event_production_stage_riyadh.webp", imageAlt: "مسرح بشاشة LED وإضاءة لعرض حي", href: "/services/event-production" },
        { icon: "disc", title: "منسقو حفلات (DJ)", desc: "للأعراس والشركات والتفعيلات مع صوت مناسب." },
        { icon: "star", title: "عروض ثقافية", desc: "عروض لليوم الوطني والفعاليات الثقافية.", href: "/services/cultural-events" },
        { icon: "crown", title: "ترفيه سعودي تقليدي", desc: "عروض مستوحاة من التراث للمناسبات السعودية." },
        { icon: "building", title: "ترفيه الشركات", desc: "فقرات للحفلات وموسيقى ليالي الجوائز وفعاليات الفرق.", href: "/services/corporate-events" },
        { icon: "flower", title: "ترفيه الأعراس", desc: "موسيقى الدخول وفنانون أحياء ومنسقو حفلات.", href: "/services/weddings" },
        { icon: "sparkles", title: "ترفيه المعارض", desc: "تفعيلات للأجنحة تجذب الزوّار.", href: "/services/exhibitions" },
        { icon: "users", title: "ترفيه عائلي", desc: "أيام العائلات وبرامج الأطفال.", href: "/services/birthday-party" },
        { icon: "zap", title: "عروض تفاعلية", desc: "فقرات متجولة وتفاعلية لإشراك الضيوف." },
      ],
    },
    flow: {
      heading: "كيف يتحول طلب الترفيه إلى حجز",
      lead: "تعتمد الخيارات على هذه المدخلات الخمسة.",
      steps: [
        { label: "الفعالية والتاريخ", detail: "التوفّر يبدأ من هنا" },
        { label: "الجمهور", detail: "رجال، نساء، مختلط أو عائلي" },
        { label: "الأجواء والصيغة", detail: "هادئ، فقرة مميّزة أو حماسي" },
        { label: "الموقع والتقنيات", detail: "المسرح والصوت والكهرباء" },
        { label: "خيارات الفنانين", detail: "قائمة مختصرة وعرض سعر" },
      ],
    },
    idealFor: {
      heading: "الأنسب لـ",
      items: [
        { title: "حفلات الزفاف", desc: "الدخول والاستقبال والاحتفال.", href: "/services/weddings" },
        { title: "حفلات الشركات", desc: "الاستقبال والعشاء ولحظات الجوائز.", href: "/services/corporate-events" },
        { title: "تفعيلات العلامات التجارية", desc: "عروض تجذب الجمهور." },
        { title: "الفعاليات الوطنية والثقافية", desc: "برامج اليوم الوطني والمواسم.", href: "/services/cultural-events" },
        { title: "المعارض", desc: "ترفيه الأجنحة.", href: "/services/exhibitions" },
        { title: "الفعاليات العائلية", desc: "جمهور من مختلف الأعمار.", href: "/services/birthday-party" },
      ],
    },
    process: {
      heading: "كيف يعمل تنسيق الترفيه",
      items: [
        { title: "شارك طلبك", desc: "التاريخ والموقع والجمهور والتوقيت والأسلوب المفضّل." },
        { title: "التحقق من التوفّر", desc: "نتحقق من الفنانين المناسبين لدى الشركاء في تاريخك." },
        { title: "الخيارات وعرض السعر", desc: "خيارات الفنانين والمدد والمتطلبات التقنية في عرض واحد." },
        { title: "التأكيد والجدولة", desc: "تأكيد أوقات البرنامج والمتطلبات التقنية." },
        { title: "التنسيق يوم الفعالية", desc: "تنسيق الوصول وفحص الصوت وتوقيت الفقرات." },
      ],
    },
    quoteFactors: {
      heading: "ما الذي يؤثر على سعر الترفيه؟",
      lead: "تختلف أجور الترفيه كثيرًا بحسب الفنان والتاريخ:",
      items: [
        { title: "نوع الفنان", desc: "يختلف الفنان المنفرد عن الفرقة ومنسق الحفلات والمجموعات." },
        { title: "مدة الأداء", desc: "عدد الفقرات والوقت الإجمالي على المسرح." },
        { title: "التاريخ والموسم", desc: "عطلات نهاية الأسبوع وموسم الأعراس وموسم الرياض تؤثر على الأجور والتوفّر." },
        { title: "المتطلبات التقنية", desc: "الصوت والمسرح والإضاءة والمعدات." },
        { title: "السفر واللوجستيات", desc: "الفنانون القادمون من خارج الرياض." },
        { title: "الحصرية", desc: "فنان محدد بالاسم أو قائمة مقترحة." },
      ],
    },
    clientChecklist: {
      heading: "ما المعلومات المطلوبة لعرض سعر الترفيه؟",
      items: [
        "نوع الفعالية والتاريخ والموقع",
        "الجمهور: رجال، نساء، مختلط أو عائلي",
        "الأسلوب المفضّل: موسيقى حية، DJ، ثقافي، تفاعلي",
        "توقيت الأداء ومدته",
        "هل الصوت والمسرح مُرتّبان مسبقًا",
        "أي فنان محدد في ذهنك",
        "نطاق الميزانية إن وُجد",
      ],
    },
    coordination: {
      heading: "كيف يعمل التنسيق مع الشركاء",
      paragraphs: [
        "إدارة الفعاليات السعودية منصة تنسيق عن بُعد. يُحجز الفنانون عبر شركاء ترفيه في المملكة يُختارون لفعاليتك — ولا نوظّف الفنانين أو نديرهم مباشرة.",
        "ندرس طلبك، ونتحقق من التوفّر، ونقدّم الخيارات في عرض سعر واحد، وننسّق المتطلبات التقنية مع فريق الإنتاج. يعتمد التوفّر والسعر على التاريخ والفنان والموقع، ويُؤكَّدان كتابيًا قبل الحجز.",
      ],
    },
    quality: {
      heading: "اعتبارات الجودة والتحكم",
      items: [
        { title: "برنامج مؤكد", desc: "الفنانون وأوقات الفقرات ومددها مذكورة في عرض السعر." },
        { title: "الملاءمة الثقافية", desc: "يُطابَق الأداء والصيغة مع جمهورك ومناسبتك." },
        { title: "المتطلبات التقنية", desc: "تُرسَل احتياجات الصوت والمسرح لفريق الإنتاج مسبقًا." },
        { title: "فحص الصوت", desc: "يُخصَّص وقت لفحص الصوت ضمن الجدول." },
      ],
    },
    useCases: {
      heading: "طلبات ترفيه نموذجية",
      items: [
        { title: "حفل زفاف", desc: "عود وكمان مباشران أثناء العشاء، ثم منسق حفلات للاحتفال." },
        { title: "حفل شركة", desc: "موسيقى هادئة عند الوصول وفقرة مميّزة بين أجزاء توزيع الجوائز." },
        { title: "فعالية اليوم الوطني", desc: "عروض تقليدية لاحتفال في مكتب أو مجتمع." },
        { title: "تفعيل علامة تجارية", desc: "فنانون تفاعليون يجذبون الزوّار إلى جناح أو متجر مؤقت." },
      ],
    },
    feature: {
      image: "/services/event_production_stage_riyadh.webp",
      alt: "مسرح بقاعة مع شاشة LED وإضاءة وطاولة مزج صوت جاهزة لعرض حي",
      caption: "إعداد نموذجي — عرض مسرحي مع دعم إنتاجي",
    },
    riyadh: {
      heading: "ترفيه الفعاليات في أنحاء الرياض",
      paragraphs: [
        "تقويم الترفيه في الرياض مزدحم — موسم الرياض واليوم الوطني وموسم الأعراس تتنافس على نفس الفنانين. الاستفسار المبكر يمنحك أوسع الخيارات.",
        "يكون الترفيه في أفضل حالاته عند تخطيطه مع الصوت والإضاءة والمسرح، ويمكننا تنسيقها جميعًا في طلب واحد.",
      ],
      links: [
        { label: "جميع خدمات الفعاليات في الرياض", href: "/locations/riyadh" },
        { label: "الصوت والأنظمة الصوتية", href: "/services/sound-audio" },
      ],
    },
    faqs: [
      { q: "هل تقدّمون ترفيهًا حيًا لحفلات الزفاف في الرياض؟", a: "نعم. ننسّق موسيقيين أحياء ومنسقي حفلات وفنانين لحفلات الزفاف بما يناسب جمهورك ومتطلباتك الثقافية." },
      { q: "من يوفّر الفنانين؟", a: "يُحجز الفنانون عبر شركاء ترفيه في المملكة، ونتولى تنسيق التوفّر وعرض السعر والمتطلبات التقنية." },
      { q: "هل يمكن ترتيب عروض سعودية تقليدية؟", a: "نعم، لليوم الوطني والفعاليات الثقافية والاحتفالات، حسب توفّر الفنانين في تاريخك." },
      { q: "هل تحجزون ترفيهًا لفعاليات الشركات والتفعيلات؟", a: "نعم — من الموسيقى الحية الهادئة في الحفلات إلى الفنانين التفاعليين في التفعيلات والمعارض." },
      { q: "هل تنسّقون الصوت والمسرح مع الترفيه؟", a: "نعم. نشارك المتطلبات التقنية للفنانين مع فريق الصوت والإنتاج لتغطية فحص الصوت واحتياجات المسرح." },
      { q: "كم تكلفة ترفيه الفعاليات في الرياض؟", a: "يعتمد على نوع الفنان ومدة الأداء والتاريخ والمتطلبات التقنية والسفر. لا ننشر أسعارًا ثابتة؛ ستحصل على عرض سعر محدد بعد تأكيد التوفّر." },
      { q: "قبل كم من الوقت يجب حجز الترفيه؟", a: "قبل 4-6 أسابيع على الأقل، وقبل 2-3 أشهر في موسم الأعراس وموسم الرياض." },
    ],
    related: [
      { title: "الصوت والأنظمة الصوتية", href: "/services/sound-audio", desc: "صوت للفنانين ومنسقي الحفلات.", image: "/services/event_production_stage_riyadh.webp" },
      { title: "إضاءة الفعاليات", href: "/services/event-lighting", desc: "إضاءة العروض والمسرح.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "تموين الفعاليات", href: "/services/event-catering", desc: "ضيافة للحفلات والاستقبالات.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "حفلات الزفاف", href: "/services/weddings", desc: "تخطيط وتنسيق الأعراس.", image: "/services/luxury_wedding_table_setting.webp" },
    ],
    form: {
      heading: "تحقّق من توفّر الترفيه",
      subheading: "شاركنا التاريخ والجمهور والأسلوب، ونتحقق من الفنانين المناسبين لدى الشركاء ونعود إليك بالخيارات والخطوات التالية.",
      submitLabel: "تحقّق من التوفّر",
      serviceOptions,
      serviceOptionLabels: ["فرقة / موسيقيون أحياء", "منسق حفلات (DJ)", "ترفيه ثقافي / سعودي تقليدي", "ترفيه الشركات", "ترفيه الأعراس", "ترفيه المعارض / التفعيلات", "ترفيه عائلي / للأطفال", "فنانون تفاعليون", "لست متأكدًا — أرجو النصيحة"],
      eventTypeOptions,
      eventTypeOptionLabels: ["زفاف", "حفل شركة / جوائز", "تفعيل / إطلاق", "معرض", "يوم وطني / فعالية ثقافية", "فعالية عائلية / خاصة", "أخرى"],
      guestCountLabel: "عدد الضيوف",
      messageLabel: "متطلبات إضافية",
      messagePlaceholder: "توقيت البرنامج، الأسلوب أو الفنانون المفضّلون، المتطلبات الثقافية، تفاصيل الصوت والمسرح...",
      fields: [
        { ...fields[0], displayLabel: "نوع الترفيه", optionLabels: ["فرقة / موسيقيون أحياء", "منسق حفلات", "عرض ثقافي / تقليدي", "فنانون تفاعليون", "ترفيه عائلي / للأطفال", "برنامج مختلط", "غير متأكد"] },
        { ...fields[1], displayLabel: "الجمهور", optionLabels: ["رجال", "نساء", "مختلط", "عائلي / أطفال"] },
        { ...fields[2], displayLabel: "مدة الأداء", optionLabels: ["أقل من ساعة", "1–2 ساعة", "2–4 ساعات", "طوال الفعالية"] },
        { ...fields[3], displayLabel: "هل الصوت والمسرح متوفران؟", optionLabels: ["نعم — يوفّرها الموقع", "لا — تحتاج ترتيبًا", "غير متأكد"] },
      ],
      whatsappText: "مرحبًا، أرغب في التحقق من توفّر الترفيه لفعالية في الرياض.",
    },
  },
};
