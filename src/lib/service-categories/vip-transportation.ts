import type { ServiceCategory } from "./types";

// Metadata for this route lives in app/[locale]/services/vip-transportation/layout.tsx
// (indexed EN + AR) — intentionally not duplicated here.
//
// Capability basis (2026-10): Riyadh transport partner offers airport & hotel
// transfers, meet-and-greet with flight tracking, VIP/executive service with
// secure vehicle options, limousines / SUVs / premium sedans with chauffeurs,
// group vehicles, golf buggies and vintage vehicles. No brand/model names are
// published — vehicle CATEGORIES only, always availability-dependent.

const IMG = {
  hero: "/services/transport/vip-chauffeur-arrival-riyadh-exhibition-centre.webp",
  airport: "/services/vip_airport_chauffeur_riyadh.webp",
  shuttle: "/services/transport/delegate-shuttle-riyadh-convention-centre.webp",
  hotel: "/services/transport/chauffeur-hotel-arrival-riyadh-evening.webp",
  sedanCabin: "/services/transport/luxury-sedan-rear-cabin.webp",
  vans: "/services/transport/vip-van-fleet-lineup.webp",
  wedding: "/riyadh_luxury_reception_people.webp",
  golf: "/services/valet_golf_cart_guest_mobility.webp",
};

const fields = [
  { name: "pickup", label: "Pickup location", type: "text" as const, placeholder: "e.g. King Khalid International Airport, hotel name" },
  { name: "destination", label: "Destination", type: "text" as const, placeholder: "e.g. event venue, hotel" },
  { name: "pickupTime", label: "Pickup time", type: "time" as const },
  { name: "passengers", label: "Passengers", type: "select" as const, options: ["1–3", "4–7", "8–15", "16–30", "31–100", "100+"] },
  { name: "trips", label: "Trip type", type: "select" as const, options: ["One way", "Round trip", "Hourly / event movement", "Airport transfer", "Multi-stop", "Group / shuttle"] },
  { name: "vehicle", label: "Vehicle preference", type: "select" as const, options: ["Premium sedan", "Executive SUV", "Limousine", "VIP van / people carrier", "Minibus / coach", "Mixed fleet", "Not sure"] },
  { name: "luggage", label: "Luggage", type: "select" as const, options: ["None / hand luggage", "1 bag per passenger", "2+ bags per passenger", "Not sure"] },
];

const serviceOptions = ["VIP Airport Transfer", "Airport-to-Hotel Transfer", "Hotel-to-Venue Transfer", "Executive Event Transportation", "Corporate Delegate Transportation", "Conference / Exhibition Transportation", "Wedding Guest Transportation", "Gala / VIP Dinner Transportation", "Chauffeur Service (hourly / full day)", "Group / Multi-Vehicle Transport", "Event Shuttle", "Intercity Event Transportation", "Not sure — please advise"];
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
        "Airport transfers, chauffeured luxury vehicles and delegate transport for weddings, conferences and corporate events. Share pickup points, dates and passenger numbers — SEM coordinates a suitable Saudi-based transport partner around your programme.",
      image: IMG.hero,
      imageAlt: "Chauffeur holding the rear door of a black luxury sedan outside a Riyadh exhibition centre at dusk, with the city skyline behind",
    },
    snapshot: [
      { label: "Service type", value: "Chauffeured event transport" },
      { label: "Vehicles", value: "Sedans · SUVs · Vans · Coaches" },
      { label: "Trip types", value: "Airport · Hourly · Shuttle" },
      { label: "Quote", value: "Itinerary-based" },
    ],
    answer: {
      question: "What is included in VIP event transportation?",
      answer:
        "VIP event transportation covers chauffeured vehicles for guests, speakers and delegates — airport meet-and-greet transfers, hotel-to-venue runs, hourly chauffeur service, multi-vehicle convoys and scheduled shuttles timed to your event programme. With SEM, you share pickup points, destinations, dates, passenger numbers and vehicle preferences; SEM coordinates a suitable Saudi-based transport partner, confirms vehicles and drivers, and presents one quotation. The partner provides the vehicles and chauffeurs.",
    },
    intro: [
      "For VIP guests and delegates, transport is part of the event. A missed airport pickup or a late convoy is noticed far more than a beautiful stage — and Riyadh's distances between the airport, hotels and venues leave little room for error.",
      "SEM does not own vehicles. We plan the movement — who travels where, when and in what — and coordinate an established Saudi-based transport partner with suitable vehicles and chauffeurs for your dates. Transport can also be coordinated together with valet parking at the venue, so arrivals are handled from airport to entrance.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Transport plans are built around your guests and your run-of-show:",
      items: [
        { icon: "plane", title: "Airport & hotel transfers", desc: "Meet-and-greet, flight tracking and transfers to hotels, residences and venues." },
        { icon: "shield", title: "VIP & secure transport", desc: "Discreet chauffeurs and secure vehicle options for high-profile guests, subject to availability." },
        { icon: "car", title: "Luxury chauffeured vehicles", desc: "Premium sedans, executive SUVs and limousines with professional chauffeurs." },
        { icon: "users", title: "Group & delegate transport", desc: "VIP vans, minibuses and coaches for delegations and wedding guests." },
        { icon: "route", title: "Itinerary & route planning", desc: "Pickup points, timings and vehicle assignments planned around your programme." },
        { icon: "sparkles", title: "Occasion vehicles", desc: "Golf buggies for venue transfers and ceremonial or vintage cars where available." },
      ],
    },
    subServices: {
      heading: "Event transportation services",
      lead: "One enquiry covers all of these. Share your guest movements and SEM coordinates the right vehicles.",
      items: [
        { title: "VIP Airport Transfers", desc: "Meet-and-greet with flight tracking for arriving guests, speakers and families.", useCase: "Delegations, speakers, VIP guests", image: IMG.airport, imageAlt: "Chauffeur holding an SUV door for a guest at a hotel entrance in the evening" },
        { title: "Conference & Exhibition Transportation", desc: "Delegate shuttles and exhibitor transfers between hotels and the venue.", useCase: "Conferences, trade shows, forums", image: IMG.shuttle, imageAlt: "Delegates boarding a minibus outside a Riyadh convention centre while an SUV waits", href: "/services/conferences" },
        { title: "Gala & VIP Dinner Transportation", desc: "Coordinated arrivals and departures for evening galas and VIP dinners.", useCase: "Award nights, hosted dinners", image: IMG.hotel, imageAlt: "Chauffeur in white gloves opening a luxury sedan door at an illuminated hotel entrance at night", href: "/services/corporate-events" },
        { title: "Wedding Guest Transportation", desc: "Bridal-party cars, family transfers and guest shuttles from hotels.", useCase: "Weddings, engagements", image: IMG.wedding, imageAlt: "Hotel ballroom prepared for a wedding reception", href: "/services/weddings" },
        { icon: "plane", title: "Airport-to-Hotel Transfers", desc: "Arrival transfers with luggage handled, timed to landing." },
        { icon: "building", title: "Hotel-to-Venue Transfers", desc: "Scheduled runs between guest hotels and the event venue." },
        { icon: "crown", title: "Executive Event Transportation", desc: "Leadership and client movement on event days." },
        { icon: "users", title: "Corporate Delegate Transportation", desc: "Group movement timed to the agenda.", href: "/services/conferences" },
        { icon: "star", title: "VIP Guest Transfers", desc: "Discreet, protocol-aware movement for high-profile guests." },
        { icon: "car", title: "Chauffeur Service Coordination", desc: "A dedicated chauffeur by the hour, day or programme." },
        { icon: "car", title: "Luxury Sedan Transportation", desc: "Premium sedans for individual guests and speakers." },
        { icon: "car", title: "Luxury SUV Transportation", desc: "Executive SUVs for VIPs and small groups." },
        { icon: "truck", title: "Multi-Vehicle / Group Transportation", desc: "Convoys and mixed fleets for delegations." },
        { icon: "route", title: "Event Shuttle Coordination", desc: "Scheduled loops between hotels, venues and parking." },
        { icon: "map", title: "Point-to-Point Event Transfers", desc: "Single trips between any two event locations." },
        { icon: "clipboard", title: "Business Meeting Transportation", desc: "Transfers between meetings, offices and hotels." },
        { icon: "route", title: "Executive Road Transfers", desc: "Chauffeured road travel for executives outside the city." },
        { icon: "map", title: "Intercity Event Transportation", desc: "Road transfers between Saudi cities, subject to availability." },
        { icon: "users", title: "Private Family Event Transportation", desc: "Family transfers for private celebrations." },
        { icon: "clock", title: "Special Arrival / Departure Coordination", desc: "Timed entrances, convoys and coordinated departures." },
      ],
    },
    eventIntents: {
      heading: "Transportation for every type of event",
      lead: "The same service solves different problems depending on the event. Choose an event type to see what's typically coordinated.",
      items: [
        { id: "wedding", title: "Weddings", image: IMG.wedding, imageAlt: "Wedding reception ballroom", points: ["Bride and groom transportation", "VIP family transfers", "Guest transfers from hotels", "Hotel-to-venue runs", "Airport arrivals for out-of-town family", "Group shuttles", "Luxury vehicle coordination", "Departure coordination at the end of the night"], links: [{ label: "Wedding planning", href: "/services/weddings" }, { label: "Wedding valet parking", href: "/services/valet-parking" }, { label: "Wedding décor", href: "/services/event-decoration" }] },
        { id: "corporate", title: "Corporate", image: IMG.hotel, imageAlt: "Chauffeur at a hotel entrance at night", points: ["Executive transportation", "Delegate transfers", "Airport pickups", "Hotel transfers", "Transfers between meetings", "Executive road travel", "Multi-vehicle coordination"], links: [{ label: "Corporate events", href: "/services/corporate-events" }, { label: "Event valet for corporate guests", href: "/services/valet-parking" }] },
        { id: "conference", title: "Conferences", image: IMG.shuttle, imageAlt: "Delegates boarding a shuttle at a convention centre", points: ["Speaker transfers", "Delegate transfers", "Hotel shuttles", "Airport coordination", "Venue transfers", "VIP guest movement"], links: [{ label: "Conference coordination", href: "/services/conferences" }, { label: "Sound & audio for conferences", href: "/services/sound-audio" }] },
        { id: "exhibition", title: "Exhibitions", image: IMG.shuttle, imageAlt: "Exhibitor team boarding a minibus outside an exhibition centre", points: ["Exhibitor team transfers", "Executive guest transport", "Hotel ↔ venue runs", "Airport arrivals", "Scheduled shuttle coordination"], links: [{ label: "Exhibition stands", href: "/services/exhibitions" }, { label: "LED screens for stands", href: "/services/led-screens" }] },
        { id: "gala", title: "Gala / VIP", image: IMG.airport, imageAlt: "Chauffeur opening an SUV door for a guest", points: ["VIP arrival sequencing", "Executive vehicles", "Hotel transfers", "Coordinated guest movement", "Departure management"], links: [{ label: "Luxury & VIP events", href: "/services/luxury-vip-events" }, { label: "VIP valet arrival", href: "/services/valet-parking" }] },
        { id: "private", title: "Private / Family", image: IMG.golf, imageAlt: "Golf cart moving a guest to a venue entrance", points: ["Family guest transfers", "Airport transportation", "Hotel transfers", "Movement between private venues"], links: [{ label: "Private celebrations", href: "/services/birthday-party" }, { label: "Event catering", href: "/services/event-catering" }] },
      ],
    },
    journeys: {
      heading: "From the airport to the last guest home",
      lead: "Most transport plans follow one of these journeys. Each step links to the service that covers it — and SEM can coordinate the whole chain in one enquiry.",
      flows: [
        {
          title: "Wedding day",
          steps: [
            { label: "Airport / Hotel", note: "Family arrivals", href: "/services/vip-transportation#options" },
            { label: "VIP Family", note: "Dedicated cars" },
            { label: "Bride & Groom", note: "Ceremonial arrival" },
            { label: "Guest Transport", note: "Hotel shuttles" },
            { label: "Venue Arrival", note: "Entrance coordination", href: "/services/weddings" },
            { label: "Valet", note: "Self-driving guests", href: "/services/valet-parking" },
            { label: "Event", note: "Décor, catering, music", href: "/services/event-decoration" },
            { label: "Departure", note: "Timed car returns" },
          ],
        },
        {
          title: "Corporate event mobility",
          steps: [
            { label: "Airport", note: "Meet-and-greet" },
            { label: "Hotel", note: "Check-in transfers" },
            { label: "Meeting", note: "Executive transfers", href: "/services/corporate-events" },
            { label: "Conference", note: "Delegate shuttles", href: "/services/conferences" },
            { label: "Venue", note: "Stage & AV ready", href: "/services/event-production" },
            { label: "VIP Guest", note: "Priority arrival", href: "/services/valet-parking" },
            { label: "Return Transfer", note: "Hotel or airport" },
          ],
        },
      ],
    },
    options: {
      heading: "Vehicle options",
      lead: "Vehicle categories that can be requested through SEM's transport partners. Exact models are confirmed in your quotation.",
      note: "Available subject to date, location and partner availability. Images show representative vehicle types, not a guaranteed specific vehicle.",
      items: [
        { title: "Premium Sedan", desc: "Executive sedans for individual guests, speakers and executives.", suits: "Airport transfers, VIP guests", image: IMG.sedanCabin, imageAlt: "Rear cabin of a luxury sedan with leather seats and ambient lighting" },
        { title: "VIP Van / People Carrier", desc: "Premium vans for families and small delegations travelling together.", suits: "Families, executive teams", image: IMG.vans, imageAlt: "Three black premium passenger vans parked in a row" },
        { title: "Executive SUV", desc: "Spacious SUVs for VIPs, small groups and extra luggage.", suits: "VIPs, airport runs with luggage", icon: "car" },
        { title: "Limousine", desc: "Limousines for weddings and ceremonial arrivals.", suits: "Weddings, gala arrivals", icon: "crown" },
        { title: "Minibus & Coach", desc: "Group vehicles for delegate and guest shuttles.", suits: "Conferences, weddings, exhibitions", icon: "truck" },
        { title: "Secure Vehicles", desc: "Secure or armored options for high-profile guests.", suits: "VIP and protocol movements", icon: "shield" },
        { title: "Golf Buggies", desc: "Short transfers across large venues and parking areas.", suits: "Resorts, large venues", icon: "route" },
        { title: "Vintage & Ceremonial", desc: "Classic or ceremonial cars for special entrances.", suits: "Wedding entrances", icon: "sparkles" },
      ],
    },
    builder: true,
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
        { title: "Luxury & VIP events", desc: "Discreet, protocol-aware movement.", href: "/services/luxury-vip-events" },
        { title: "Riyadh events", desc: "All event services in the capital.", href: "/locations/riyadh" },
      ],
    },
    process: {
      heading: "How event transportation coordination works",
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
      lead: "Pricing depends on date, route, vehicle type, duration, number of vehicles and availability:",
      items: [
        { title: "Vehicle type", desc: "Sedans, SUVs, limousines, vans and coaches differ in rate." },
        { title: "Number of vehicles", desc: "Convoys and mixed fleets for larger groups." },
        { title: "Duration", desc: "Single transfers vs. hourly, full-day or multi-day use." },
        { title: "Route & distance", desc: "Airport runs, intercity trips and multiple stops." },
        { title: "Timing", desc: "Late-night arrivals, peak seasons and short notice." },
        { title: "Security requirements", desc: "Secure vehicles and protocol needs." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a transportation quote?",
      items: [
        "City, pickup locations and destinations",
        "Event date and pickup times (flight numbers if known)",
        "Number of passengers and luggage",
        "Trip type: one way, round trip, hourly, multi-stop or shuttle",
        "Vehicle preference, if any",
        "Event type and any VIP or security needs",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. Vehicles and chauffeurs are provided by an established Saudi-based transport partner selected for your event — SEM does not own a fleet or employ drivers.",
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
      image: IMG.hotel,
      alt: "Chauffeur in white gloves holding a luxury sedan door at an illuminated hotel entrance at night",
      caption: "Representative setup — chauffeured hotel arrival for an evening event",
    },
    riyadh: {
      heading: "Event transportation across Riyadh",
      paragraphs: [
        "Riyadh is a city of long distances between King Khalid International Airport, hotel districts and event venues, and traffic peaks around working hours. Good event transport plans include realistic buffers and pickup windows — which SEM confirms with the partner before quoting.",
        "Outside Riyadh, transport for Jeddah, Dammam and other cities can be checked per enquiry, subject to partner availability. Transportation pairs naturally with valet parking at the venue and with conference or exhibition schedules.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Event valet parking", href: "/services/valet-parking" },
      ],
    },
    faqs: [
      { q: "Do you provide VIP airport transfers for event guests in Riyadh?", a: "Yes. SEM coordinates meet-and-greet airport transfers with flight tracking for VIP guests, speakers, delegates and wedding parties." },
      { q: "Does SEM own the vehicles?", a: "No. Vehicles and chauffeurs are provided by an established Saudi-based transport partner. SEM coordinates the itinerary, booking and communication." },
      { q: "Can SEM arrange transportation for weddings?", a: "Yes — bridal-party cars, VIP family transfers, guest shuttles from hotels and coordinated departures, planned around the wedding timeline." },
      { q: "Can VIP transportation be coordinated with valet parking?", a: "Yes. SEM can coordinate chauffeured arrivals for VIP guests and a valet team for self-driving guests at the same venue, so the whole arrival is planned together." },
      { q: "How does event transportation coordination work?", a: "You share the itinerary — pickups, destinations, times and passengers. SEM plans vehicles and timings, confirms them with a suitable partner, sends one quotation, and stays your point of contact on the day." },
      { q: "What information do you need for a transportation quote?", a: "City, pickup points and destinations, date and times, number of passengers and luggage, trip type and any vehicle preference or VIP requirements." },
      { q: "Can you arrange armored or secure vehicles?", a: "Secure vehicle options can be requested for high-profile guests, subject to partner availability. Include it in your enquiry." },
      { q: "Do you handle group transportation for conference delegates?", a: "Yes. SEM coordinates VIP vans, minibuses and coaches with route planning, from small executive groups to large delegations." },
      { q: "Is transportation available outside Riyadh?", a: "Requests for Jeddah, Dammam and other Saudi cities can be checked per enquiry. Availability depends on date, location and partner capacity." },
      { q: "How much does VIP transportation cost in Riyadh?", a: "Pricing depends on vehicle type, number of vehicles, duration, route and security needs. SEM does not publish fixed prices; you receive a specific quotation once the itinerary is confirmed." },
    ],
    related: [
      { title: "Valet Parking", href: "/services/valet-parking", desc: "Event valet parking coordination at the venue.", image: IMG.golf },
      { title: "Corporate Events", href: "/services/corporate-events", desc: "Galas, launches and company events.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "Conferences", href: "/services/conferences", desc: "Conference coordination in Saudi Arabia.", image: "/services/premium_conference_management_hero.webp" },
      { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and coordination.", image: IMG.wedding },
    ],
    form: {
      heading: "Request a transport quote",
      subheading: "Share the itinerary and passengers. SEM checks availability with a suitable transport partner and comes back with vehicles, schedule and a quote.",
      submitLabel: "Request Transport Quote",
      serviceOptions,
      eventTypeOptions,
      guestCountLabel: "Total Guests",
      messagePlaceholder: "Flight numbers, number of trips, VIP or security needs, anything else about the programme...",
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
        "استقبال من المطار، ومركبات فاخرة بسائق، ونقل للمندوبين في حفلات الزفاف والمؤتمرات وفعاليات الشركات. شاركنا نقاط الاستقبال والتواريخ وعدد الركاب — وتنسّق إدارة الفعاليات السعودية مع شريك نقل سعودي مناسب وفق برنامجك.",
      image: IMG.hero,
      imageAlt: "سائق يمسك باب سيارة سيدان فاخرة سوداء أمام مركز معارض في الرياض عند الغروب مع أفق المدينة",
    },
    snapshot: [
      { label: "نوع الخدمة", value: "نقل فعاليات بسائق" },
      { label: "المركبات", value: "سيدان · دفع رباعي · فان · حافلات" },
      { label: "أنواع الرحلات", value: "مطار · بالساعة · حافلات" },
      { label: "عرض السعر", value: "حسب البرنامج" },
    ],
    answer: {
      question: "ماذا يشمل نقل كبار الشخصيات للفعاليات؟",
      answer:
        "يشمل نقل كبار الشخصيات للفعاليات مركبات بسائق للضيوف والمتحدثين والمندوبين — استقبال المطار، والتنقل بين الفنادق والقاعات، وخدمة السائق بالساعة، والمواكب متعددة المركبات، والحافلات المجدولة حسب برنامج الفعالية. مع إدارة الفعاليات السعودية، تشاركنا نقاط الاستقبال والوجهات والتواريخ وعدد الركاب ونوع المركبة المفضّل؛ فننسّق مع شريك نقل سعودي مناسب، ونؤكد المركبات والسائقين، ونقدّم عرض سعر واحدًا. ويوفّر الشريك المركبات والسائقين.",
    },
    intro: [
      "بالنسبة لكبار الشخصيات والمندوبين، النقل جزء من الفعالية. استقبال فائت في المطار أو موكب متأخر يُلاحَظ أكثر بكثير من مسرح جميل — والمسافات في الرياض بين المطار والفنادق والقاعات لا تترك مجالًا للخطأ.",
      "لا تمتلك إدارة الفعاليات السعودية مركبات؛ بل نخطّط الحركة — من يسافر، وإلى أين، ومتى، وبأي مركبة — وننسّق مع شريك نقل سعودي معتمد لديه المركبات والسائقون المناسبون لتواريخك. ويمكن تنسيق النقل مع خدمة الفاليه عند القاعة، ليُدار الوصول من المطار حتى المدخل.",
    ],
    capabilities: {
      heading: "ما يمكننا تنسيقه",
      lead: "تُبنى خطط النقل حول ضيوفك وبرنامج فعاليتك:",
      items: [
        { icon: "plane", title: "استقبال المطارات والفنادق", desc: "استقبال شخصي، وتتبّع الرحلات، والنقل إلى الفنادق والمساكن والقاعات." },
        { icon: "shield", title: "نقل آمن لكبار الشخصيات", desc: "سائقون متكتّمون وخيارات مركبات آمنة للضيوف رفيعي المستوى، حسب التوفّر." },
        { icon: "car", title: "مركبات فاخرة بسائق", desc: "سيدان فاخرة، ودفع رباعي تنفيذي، وليموزين مع سائقين محترفين." },
        { icon: "users", title: "نقل جماعي للمندوبين", desc: "فانات فاخرة وحافلات صغيرة وكبيرة للوفود وضيوف الأعراس." },
        { icon: "route", title: "تخطيط البرنامج والمسارات", desc: "نقاط الاستقبال والأوقات وتوزيع المركبات وفق برنامجك." },
        { icon: "sparkles", title: "مركبات المناسبات", desc: "عربات جولف للتنقل داخل الموقع، وسيارات احتفالية أو كلاسيكية حين تتوفّر." },
      ],
    },
    subServices: {
      heading: "خدمات نقل الفعاليات",
      lead: "طلب واحد يشمل كل ذلك. شاركنا تحركات ضيوفك وننسّق المركبات المناسبة.",
      items: [
        { title: "استقبال كبار الشخصيات من المطار", desc: "استقبال شخصي مع تتبّع الرحلات للضيوف والمتحدثين والعائلات.", useCase: "الوفود والمتحدثون وكبار الضيوف", image: IMG.airport, imageAlt: "سائق يمسك باب سيارة دفع رباعي لضيفة عند مدخل فندق مساءً" },
        { title: "نقل المؤتمرات والمعارض", desc: "حافلات للمندوبين وتنقلات العارضين بين الفنادق والقاعة.", useCase: "المؤتمرات والمعارض والمنتديات", image: IMG.shuttle, imageAlt: "مندوبون يصعدون إلى حافلة صغيرة أمام مركز مؤتمرات في الرياض", href: "/services/conferences" },
        { title: "نقل الحفلات وعشاء كبار الشخصيات", desc: "وصول ومغادرة منسّقان للحفلات المسائية وعشاء كبار الشخصيات.", useCase: "ليالي الجوائز والعشاء الرسمي", image: IMG.hotel, imageAlt: "سائق بقفازات بيضاء يفتح باب سيارة فاخرة أمام مدخل فندق مضاء ليلًا", href: "/services/corporate-events" },
        { title: "نقل ضيوف حفلات الزفاف", desc: "سيارات موكب العروسين، ونقل العائلات، وحافلات الضيوف من الفنادق.", useCase: "الأعراس والخطوبة", image: IMG.wedding, imageAlt: "قاعة فندقية مجهّزة لحفل زفاف", href: "/services/weddings" },
        { icon: "plane", title: "النقل من المطار إلى الفندق", desc: "تنقلات الوصول مع الأمتعة، متزامنة مع موعد الهبوط." },
        { icon: "building", title: "النقل من الفندق إلى القاعة", desc: "رحلات مجدولة بين فنادق الضيوف وموقع الفعالية." },
        { icon: "crown", title: "نقل تنفيذي للفعاليات", desc: "تنقّل القيادات والعملاء في أيام الفعاليات." },
        { icon: "users", title: "نقل مندوبي الشركات", desc: "تنقّل المجموعات وفق جدول الأعمال.", href: "/services/conferences" },
        { icon: "star", title: "نقل كبار الضيوف", desc: "تنقّل متكتّم يراعي البروتوكول للضيوف رفيعي المستوى." },
        { icon: "car", title: "تنسيق خدمة السائق", desc: "سائق مخصّص بالساعة أو اليوم أو للبرنامج كاملًا." },
        { icon: "car", title: "نقل بسيارات سيدان فاخرة", desc: "سيدان فاخرة للضيوف والمتحدثين." },
        { icon: "car", title: "نقل بسيارات دفع رباعي فاخرة", desc: "دفع رباعي تنفيذي لكبار الشخصيات والمجموعات الصغيرة." },
        { icon: "truck", title: "نقل جماعي متعدد المركبات", desc: "مواكب وأساطيل مختلطة للوفود." },
        { icon: "route", title: "تنسيق حافلات الفعالية", desc: "رحلات مجدولة بين الفنادق والقاعات والمواقف." },
        { icon: "map", title: "نقل من نقطة إلى نقطة", desc: "رحلات مفردة بين أي موقعين للفعالية." },
        { icon: "clipboard", title: "النقل لاجتماعات الأعمال", desc: "تنقلات بين الاجتماعات والمكاتب والفنادق." },
        { icon: "route", title: "تنقلات برية تنفيذية", desc: "سفر بري بسائق للتنفيذيين خارج المدينة." },
        { icon: "map", title: "النقل بين المدن للفعاليات", desc: "تنقلات برية بين مدن المملكة، حسب التوفّر." },
        { icon: "users", title: "نقل المناسبات العائلية الخاصة", desc: "تنقلات العائلات للاحتفالات الخاصة." },
        { icon: "clock", title: "تنسيق وصول ومغادرة خاصين", desc: "دخول متزامن ومواكب ومغادرة منسّقة." },
      ],
    },
    eventIntents: {
      heading: "نقل لكل نوع من الفعاليات",
      lead: "الخدمة نفسها تحل مشكلات مختلفة بحسب الفعالية. اختر نوع الفعالية لترى ما يُنسَّق عادةً.",
      items: [
        { id: "wedding", title: "الأعراس", image: IMG.wedding, imageAlt: "قاعة استقبال زفاف", points: ["نقل العروسين", "نقل عائلات كبار الشخصيات", "نقل الضيوف من الفنادق", "رحلات من الفندق إلى القاعة", "استقبال العائلات القادمة من خارج المدينة", "حافلات جماعية", "تنسيق المركبات الفاخرة", "تنسيق المغادرة في نهاية الحفل"], links: [{ label: "تخطيط الأعراس", href: "/services/weddings" }, { label: "فاليه حفلات الزفاف", href: "/services/valet-parking" }, { label: "ديكور الأعراس", href: "/services/event-decoration" }] },
        { id: "corporate", title: "الشركات", image: IMG.hotel, imageAlt: "سائق عند مدخل فندق ليلًا", points: ["نقل تنفيذي", "تنقلات المندوبين", "استقبال المطار", "تنقلات الفنادق", "تنقلات بين الاجتماعات", "سفر بري تنفيذي", "تنسيق متعدد المركبات"], links: [{ label: "فعاليات الشركات", href: "/services/corporate-events" }, { label: "فاليه لضيوف الشركات", href: "/services/valet-parking" }] },
        { id: "conference", title: "المؤتمرات", image: IMG.shuttle, imageAlt: "مندوبون يصعدون إلى حافلة أمام مركز مؤتمرات", points: ["نقل المتحدثين", "نقل المندوبين", "حافلات الفنادق", "تنسيق المطار", "التنقل إلى القاعة", "تنقّل كبار الضيوف"], links: [{ label: "تنسيق المؤتمرات", href: "/services/conferences" }, { label: "الصوت للمؤتمرات", href: "/services/sound-audio" }] },
        { id: "exhibition", title: "المعارض", image: IMG.shuttle, imageAlt: "فريق عارض يصعد إلى حافلة أمام مركز معارض", points: ["تنقلات فرق العارضين", "نقل كبار الضيوف", "رحلات بين الفندق والقاعة", "استقبال المطار", "تنسيق حافلات مجدولة"], links: [{ label: "أجنحة المعارض", href: "/services/exhibitions" }, { label: "شاشات LED للأجنحة", href: "/services/led-screens" }] },
        { id: "gala", title: "الحفلات / كبار الشخصيات", image: IMG.airport, imageAlt: "سائق يفتح باب سيارة لضيفة", points: ["ترتيب وصول كبار الشخصيات", "مركبات تنفيذية", "تنقلات الفنادق", "تنسيق حركة الضيوف", "إدارة المغادرة"], links: [{ label: "فعاليات كبار الشخصيات", href: "/services/luxury-vip-events" }, { label: "وصول كبار الشخصيات بالفاليه", href: "/services/valet-parking" }] },
        { id: "private", title: "خاصة / عائلية", image: IMG.golf, imageAlt: "عربة جولف تنقل ضيفة إلى مدخل القاعة", points: ["نقل ضيوف العائلة", "النقل من المطار", "تنقلات الفنادق", "التنقل بين المواقع الخاصة"], links: [{ label: "الاحتفالات الخاصة", href: "/services/birthday-party" }, { label: "تموين الفعاليات", href: "/services/event-catering" }] },
      ],
    },
    journeys: {
      heading: "من المطار حتى عودة آخر ضيف",
      lead: "معظم خطط النقل تتبع إحدى هاتين الرحلتين. كل خطوة ترتبط بالخدمة التي تغطيها — ويمكننا تنسيق السلسلة كاملة في طلب واحد.",
      flows: [
        {
          title: "يوم الزفاف",
          steps: [
            { label: "المطار / الفندق", note: "وصول العائلات", href: "/services/vip-transportation#options" },
            { label: "عائلات كبار الشخصيات", note: "سيارات مخصّصة" },
            { label: "العروسان", note: "وصول احتفالي" },
            { label: "نقل الضيوف", note: "حافلات من الفنادق" },
            { label: "الوصول إلى القاعة", note: "تنسيق المدخل", href: "/services/weddings" },
            { label: "الفاليه", note: "للضيوف القادمين بسياراتهم", href: "/services/valet-parking" },
            { label: "الحفل", note: "ديكور وضيافة وموسيقى", href: "/services/event-decoration" },
            { label: "المغادرة", note: "إعادة السيارات في وقتها" },
          ],
        },
        {
          title: "تنقّل فعاليات الشركات",
          steps: [
            { label: "المطار", note: "استقبال شخصي" },
            { label: "الفندق", note: "تنقلات تسجيل الدخول" },
            { label: "الاجتماع", note: "تنقلات تنفيذية", href: "/services/corporate-events" },
            { label: "المؤتمر", note: "حافلات المندوبين", href: "/services/conferences" },
            { label: "القاعة", note: "المسرح والتقنيات جاهزة", href: "/services/event-production" },
            { label: "كبار الضيوف", note: "وصول بأولوية", href: "/services/valet-parking" },
            { label: "رحلة العودة", note: "إلى الفندق أو المطار" },
          ],
        },
      ],
    },
    options: {
      heading: "خيارات المركبات",
      lead: "فئات المركبات التي يمكن طلبها عبر شركاء النقل. يُؤكَّد الطراز الفعلي في عرض السعر.",
      note: "متاحة حسب التاريخ والموقع وتوفّر الشريك. الصور تمثّل أنواع المركبات ولا تضمن مركبة بعينها.",
      items: [
        { title: "سيدان فاخرة", desc: "سيدان تنفيذية للضيوف والمتحدثين والتنفيذيين.", suits: "استقبال المطار وكبار الضيوف", image: IMG.sedanCabin, imageAlt: "المقصورة الخلفية لسيارة سيدان فاخرة بمقاعد جلدية وإضاءة داخلية" },
        { title: "فان فاخر / مركبة عائلية", desc: "فانات فاخرة للعائلات والوفود الصغيرة.", suits: "العائلات وفرق التنفيذيين", image: IMG.vans, imageAlt: "ثلاث فانات ركاب فاخرة سوداء متوقفة في صف" },
        { title: "دفع رباعي تنفيذي", desc: "سيارات واسعة لكبار الشخصيات والمجموعات الصغيرة والأمتعة.", suits: "كبار الشخصيات ورحلات المطار", icon: "car" },
        { title: "ليموزين", desc: "ليموزين للأعراس والوصول الاحتفالي.", suits: "الأعراس ووصول الحفلات", icon: "crown" },
        { title: "حافلات صغيرة وكبيرة", desc: "مركبات جماعية لحافلات المندوبين والضيوف.", suits: "المؤتمرات والأعراس والمعارض", icon: "truck" },
        { title: "مركبات آمنة", desc: "خيارات آمنة أو مدرّعة للضيوف رفيعي المستوى.", suits: "تنقلات كبار الشخصيات والبروتوكول", icon: "shield" },
        { title: "عربات جولف", desc: "تنقلات قصيرة داخل المواقع الكبيرة والمواقف.", suits: "المنتجعات والمواقع الكبيرة", icon: "route" },
        { title: "سيارات كلاسيكية واحتفالية", desc: "سيارات كلاسيكية أو احتفالية للدخول المميّز.", suits: "دخول العروسين", icon: "sparkles" },
      ],
    },
    builder: true,
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
        { title: "فعاليات كبار الشخصيات", desc: "تنقّل متكتّم يراعي البروتوكول.", href: "/services/luxury-vip-events" },
        { title: "فعاليات الرياض", desc: "جميع خدمات الفعاليات في العاصمة.", href: "/locations/riyadh" },
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
      lead: "يعتمد السعر على التاريخ والمسار ونوع المركبة والمدة وعدد المركبات والتوفّر:",
      items: [
        { title: "نوع المركبة", desc: "تختلف الأسعار بين السيدان والدفع الرباعي والليموزين والفانات والحافلات." },
        { title: "عدد المركبات", desc: "المواكب والأساطيل المختلطة للمجموعات الكبيرة." },
        { title: "المدة", desc: "تنقلات مفردة أو استخدام بالساعة أو ليوم كامل أو عدة أيام." },
        { title: "المسار والمسافة", desc: "رحلات المطار والتنقل بين المدن والمحطات المتعددة." },
        { title: "التوقيت", desc: "الوصول المتأخر ليلًا، ومواسم الذروة، والطلبات العاجلة." },
        { title: "متطلبات الأمان", desc: "مركبات آمنة ومتطلبات البروتوكول." },
      ],
    },
    clientChecklist: {
      heading: "ما المعلومات المطلوبة لعرض سعر النقل؟",
      items: [
        "المدينة ونقاط الاستقبال والوجهات",
        "تاريخ الفعالية وأوقات الاستقبال (وأرقام الرحلات إن وُجدت)",
        "عدد الركاب والأمتعة",
        "نوع الرحلة: ذهاب، ذهاب وعودة، بالساعة، محطات متعددة أو حافلات",
        "نوع المركبة المفضّل إن وُجد",
        "نوع الفعالية وأي متطلبات لكبار الشخصيات أو الأمان",
      ],
    },
    coordination: {
      heading: "كيف يعمل التنسيق مع الشركاء",
      paragraphs: [
        "إدارة الفعاليات السعودية منصة تنسيق عن بُعد. يوفّر المركبات والسائقين شريك نقل سعودي معتمد يُختار لفعاليتك — ولا نمتلك أسطولًا ولا نوظّف سائقين.",
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
      image: IMG.hotel,
      alt: "سائق بقفازات بيضاء يمسك باب سيارة سيدان فاخرة أمام مدخل فندق مضاء ليلًا",
      caption: "إعداد نموذجي — وصول بسائق إلى فندق لفعالية مسائية",
    },
    riyadh: {
      heading: "نقل الفعاليات في أنحاء الرياض",
      paragraphs: [
        "الرياض مدينة مسافات طويلة بين مطار الملك خالد الدولي ومناطق الفنادق وقاعات الفعاليات، وتزدحم حركتها في أوقات الدوام. خطط النقل الجيدة تتضمن هوامش واقعية ونوافذ استقبال مناسبة — ونؤكدها مع الشريك قبل التسعير.",
        "خارج الرياض، يمكن التحقق من النقل في جدة والدمام والمدن الأخرى لكل طلب على حدة، حسب توفّر الشركاء. ويتكامل النقل مع خدمة الفاليه عند القاعة ومع جداول المؤتمرات والمعارض.",
      ],
      links: [
        { label: "جميع خدمات الفعاليات في الرياض", href: "/locations/riyadh" },
        { label: "فاليه الفعاليات", href: "/services/valet-parking" },
      ],
    },
    faqs: [
      { q: "هل تقدّمون استقبالًا لكبار الشخصيات من المطار في الرياض؟", a: "نعم. ننسّق استقبالًا شخصيًا من المطار مع تتبّع الرحلات لكبار الضيوف والمتحدثين والمندوبين وأطراف حفلات الزفاف." },
      { q: "هل تمتلك إدارة الفعاليات السعودية المركبات؟", a: "لا. يوفّر المركبات والسائقين شريك نقل سعودي معتمد، ونتولى نحن تنسيق البرنامج والحجز والتواصل." },
      { q: "هل يمكنكم ترتيب النقل لحفلات الزفاف؟", a: "نعم — سيارات موكب العروسين، ونقل عائلات كبار الشخصيات، وحافلات الضيوف من الفنادق، ومغادرة منسّقة وفق برنامج الحفل." },
      { q: "هل يمكن تنسيق نقل كبار الشخصيات مع خدمة الفاليه؟", a: "نعم. يمكننا تنسيق وصول كبار الضيوف بسائق، وفريق فاليه للضيوف القادمين بسياراتهم في القاعة نفسها، ليُخطَّط الوصول كاملًا معًا." },
      { q: "كيف يعمل تنسيق نقل الفعاليات؟", a: "تشاركنا البرنامج — نقاط الاستقبال والوجهات والأوقات والركاب. نخطّط المركبات والأوقات، ونؤكدها مع شريك مناسب، ونرسل عرض سعر واحدًا، ونبقى نقطة تواصلك يوم الفعالية." },
      { q: "ما المعلومات المطلوبة لعرض سعر النقل؟", a: "المدينة ونقاط الاستقبال والوجهات، والتاريخ والأوقات، وعدد الركاب والأمتعة، ونوع الرحلة، وأي تفضيل للمركبة أو متطلبات لكبار الشخصيات." },
      { q: "هل يمكن توفير مركبات مدرّعة أو آمنة؟", a: "يمكن طلب خيارات مركبات آمنة للضيوف رفيعي المستوى حسب توفّرها لدى الشريك. اذكر ذلك في طلبك." },
      { q: "هل تتولّون النقل الجماعي لمندوبي المؤتمرات؟", a: "نعم. ننسّق فانات فاخرة وحافلات صغيرة وكبيرة مع تخطيط المسارات، من مجموعات تنفيذية صغيرة إلى وفود كبيرة." },
      { q: "هل يتوفّر النقل خارج الرياض؟", a: "يمكن التحقق من طلبات جدة والدمام والمدن السعودية الأخرى لكل طلب على حدة. يعتمد التوفّر على التاريخ والموقع وقدرة الشريك." },
      { q: "كم تكلفة نقل كبار الشخصيات في الرياض؟", a: "يعتمد السعر على نوع المركبة وعددها والمدة والمسار ومتطلبات الأمان. لا ننشر أسعارًا ثابتة؛ ستحصل على عرض سعر محدد بعد تأكيد البرنامج." },
    ],
    related: [
      { title: "خدمة الفاليه", href: "/services/valet-parking", desc: "تنسيق فاليه الفعاليات عند القاعة.", image: IMG.golf },
      { title: "فعاليات الشركات", href: "/services/corporate-events", desc: "حفلات وإطلاقات وفعاليات الشركات.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "المؤتمرات", href: "/services/conferences", desc: "تنسيق المؤتمرات في السعودية.", image: "/services/premium_conference_management_hero.webp" },
      { title: "حفلات الزفاف", href: "/services/weddings", desc: "تخطيط وتنسيق الأعراس.", image: IMG.wedding },
    ],
    form: {
      heading: "اطلب عرض سعر للنقل",
      subheading: "شاركنا البرنامج وعدد الركاب، ونتحقق من التوفّر مع شريك نقل مناسب ونعود إليك بالمركبات والجدول وعرض السعر.",
      submitLabel: "اطلب عرض النقل",
      serviceOptions,
      serviceOptionLabels: ["استقبال كبار الشخصيات من المطار", "من المطار إلى الفندق", "من الفندق إلى القاعة", "نقل تنفيذي للفعاليات", "نقل مندوبي الشركات", "نقل المؤتمرات / المعارض", "نقل ضيوف الزفاف", "نقل الحفلات / عشاء كبار الشخصيات", "خدمة سائق (بالساعة / يوم كامل)", "نقل جماعي متعدد المركبات", "حافلات الفعالية", "النقل بين المدن", "لست متأكدًا — أرجو النصيحة"],
      eventTypeOptions,
      eventTypeOptionLabels: ["فعالية شركة", "مؤتمر / معرض", "زفاف", "زيارة كبار شخصيات / رسمية", "حفل / جوائز", "مناسبة خاصة", "أخرى"],
      guestCountLabel: "إجمالي الضيوف",
      messageLabel: "متطلبات إضافية",
      messagePlaceholder: "أرقام الرحلات، عدد التنقلات، متطلبات كبار الشخصيات أو الأمان، أي تفاصيل أخرى عن البرنامج...",
      fields: [
        { ...fields[0], displayLabel: "نقطة الاستقبال", placeholder: "مثل: مطار الملك خالد الدولي، اسم الفندق" },
        { ...fields[1], displayLabel: "الوجهة", placeholder: "مثل: قاعة الفعالية، الفندق" },
        { ...fields[2], displayLabel: "وقت الاستقبال" },
        { ...fields[3], displayLabel: "عدد الركاب" },
        { ...fields[4], displayLabel: "نوع الرحلة", optionLabels: ["ذهاب فقط", "ذهاب وعودة", "بالساعة / تنقّل الفعالية", "استقبال مطار", "محطات متعددة", "جماعي / حافلات"] },
        { ...fields[5], displayLabel: "نوع المركبة المفضّل", optionLabels: ["سيدان فاخرة", "دفع رباعي تنفيذي", "ليموزين", "فان فاخر / مركبة عائلية", "حافلة صغيرة / كبيرة", "أسطول مختلط", "غير متأكد"] },
        { ...fields[6], displayLabel: "الأمتعة", optionLabels: ["لا يوجد / حقائب يد", "حقيبة لكل راكب", "حقيبتان أو أكثر لكل راكب", "غير متأكد"] },
      ],
      whatsappText: "مرحبًا، أحتاج نقلًا لكبار الشخصيات لفعالية في الرياض.",
    },
  },
};
