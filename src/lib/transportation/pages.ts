// Content for the /transportation service pages (Phase 4).
//
// Honesty rules baked into this file:
//  • No page states that a route, city or vehicle is guaranteed; availability is
//    always "confirmed in your quotation".
//  • No durations, fees, permit eligibility or fleet-ownership claims.
//  • Cross-border pages are enquiry-only (see ROUTE_ELIGIBILITY in config.ts).
//  • `indexable: false` keeps a page out of search and the sitemap until a
//    human confirms real supply for it (Jeddah, today).

export interface Faq { q: string; a: string }
export interface Section { h2: string; paragraphs?: string[]; bullets?: string[] }
export interface RelatedLink { label: string; href: string; desc: string }

export interface TransportPage {
  path: string; // e.g. /transportation/vip-chauffeur/riyadh
  title: string; // <title>, unique
  description: string; // meta description, unique
  h1: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  /** Short factual "at a glance" box: label → value. */
  glance: [string, string][];
  sections: Section[];
  faqs: Faq[];
  related: RelatedLink[];
  quote: { label: string; query: Record<string, string> };
  breadcrumbs: { name: string; href?: string }[];
  indexable: boolean;
  serviceName: string;
  areaServed: string;
}

const IMG = {
  arrival: "/services/transport/vip-chauffeur-arrival-riyadh-exhibition-centre.webp",
  hotel: "/services/transport/chauffeur-hotel-arrival-riyadh-evening.webp",
  sedan: "/services/transport/luxury-sedan-rear-cabin.webp",
  vans: "/services/transport/vip-van-fleet-lineup.webp",
  shuttle: "/services/transport/delegate-shuttle-riyadh-convention-centre.webp",
};

const T = { name: "Transportation", href: "/transportation" };

const crossBorder: TransportPage = {
  path: "/transportation/cross-border-transfers",
  title: "Private Cross-Border Transfers from Saudi Arabia | Saudi Event Management",
  description:
    "Enquire about pre-arranged private road transfers between Saudi Arabia and Bahrain, the UAE, Qatar, Kuwait and Jordan. Each route is reviewed for feasibility before a quotation.",
  h1: "Private Cross-Border Transfers from Saudi Arabia",
  eyebrow: "Cross-border transfers",
  image: IMG.sedan,
  imageAlt: "Rear cabin of a luxury executive sedan",
  intro:
    "We coordinate pre-arranged private road journeys between Saudi Arabia and neighbouring Gulf countries and Jordan. Every cross-border request is handled as an enquiry: we review whether the route can be supported, what permits, vehicle and documents apply, and only then send a written quotation.",
  glance: [
    ["Service", "Pre-arranged private transfer, one-way or return"],
    ["Who it's for", "Executives, delegations, hotel and corporate guests, travel managers"],
    ["Status of every route", "Enquiry only — feasibility reviewed per request"],
    ["Pricing", "Written quotation after review; no published fares"],
    ["Not offered", "Shared seats, on-demand ride-hailing, guaranteed border times"],
  ],
  sections: [
    {
      h2: "How cross-border requests work",
      paragraphs: [
        "A cross-border journey involves two countries' rules, so we do not treat any route as automatically available. You send the route, date, passengers, luggage and vehicle preference. We then check feasibility with our transport partners, including the operator arrangement for the route and the vehicle class that can be used.",
        "If the route can be supported you receive a written quotation stating the vehicle class, inclusions, exclusions, validity and terms. If it cannot, we tell you plainly and, where useful, suggest an alternative such as a different pickup point or a flight with a chauffeur at each end.",
      ],
    },
    {
      h2: "Countries we take enquiries for",
      bullets: [
        "Bahrain — Eastern Province and Riyadh pickups, via the King Fahd Causeway corridor",
        "United Arab Emirates — long overland journeys, often compared with flying",
        "Qatar",
        "Kuwait",
        "Jordan",
      ],
      paragraphs: [
        "This list shows where we are willing to review a request. It is not a statement that each route is currently operated. No cross-border route is marked operationally verified on this site; that status is only applied after an authorised operator arrangement is confirmed.",
      ],
    },
    {
      h2: "What affects the quotation",
      bullets: [
        "Distance, border crossing arrangements and the direction of travel",
        "Vehicle class and number of vehicles",
        "Waiting time, multiple stops and return legs",
        "Date and time, including public holidays and peak periods",
        "Operator and permit arrangements required for the route",
      ],
    },
    {
      h2: "What to prepare",
      paragraphs: [
        "Passport validity, visa requirements and any vehicle or insurance documents depend on the passengers' nationalities, the route and the operator. We tell you which documents apply to your journey once the route is reviewed, and we send a reminder before travel. Please do not assume that a submitted enquiry gives any right to cross a border.",
      ],
    },
    {
      h2: "Private, not shared",
      paragraphs: [
        "These are private transfers for your party only. They are planned in advance with a stated pickup and drop-off, which is what makes them suitable for corporate and executive travel rather than budget transport.",
      ],
    },
  ],
  faqs: [
    { q: "Is my route available?", a: "We can only tell you after a feasibility review. Submit the route, date and passenger details and we will confirm whether it can be supported before we quote." },
    { q: "Do you publish prices for cross-border transfers?", a: "No. Price depends on route, vehicle class, waiting time and date. You receive a written quotation after the route is reviewed." },
    { q: "How long does the journey take?", a: "It depends on the route, traffic and border processing, which we cannot guarantee. We discuss realistic timing for your specific journey when we respond." },
    { q: "Which documents will I need?", a: "Passport and visa requirements vary by nationality and route. We advise what applies once the route is reviewed. You remain responsible for holding valid travel documents." },
    { q: "Can I book a one-way journey?", a: "Yes, one-way and return journeys can both be requested. Return legs and waiting time are priced in the quotation." },
    { q: "What if the route cannot be supported?", a: "We will say so and, where helpful, suggest an alternative arrangement. Nothing is booked until you accept a written quotation." },
  ],
  related: [
    { label: "VIP chauffeur in Saudi Arabia", href: "/transportation/vip-chauffeur", desc: "Chauffeured travel within the Kingdom." },
    { label: "Vehicle classes", href: "/transportation/luxury-vehicles", desc: "Sedans, SUVs, vans and group vehicles." },
    { label: "Request a quote", href: "/transportation/request-a-quote?service=cross_border", desc: "Send your route for review." },
  ],
  quote: { label: "Request a cross-border quote", query: { service: "cross_border", oc: "SA", dc: "BH" } },
  breadcrumbs: [{ name: "Home", href: "/" }, T, { name: "Cross-border transfers" }],
  indexable: true,
  serviceName: "Private cross-border transfer coordination",
  areaServed: "Saudi Arabia and neighbouring countries (enquiry only)",
};

const chauffeur: TransportPage = {
  path: "/transportation/vip-chauffeur",
  title: "VIP Chauffeur Service in Saudi Arabia | Saudi Event Management",
  description:
    "Pre-arranged executive chauffeur service in Saudi Arabia: airport and hotel transfers, hourly and full-day hire, city-to-city journeys and delegation transport, coordinated through vetted partners.",
  h1: "VIP Chauffeur Service in Saudi Arabia",
  eyebrow: "VIP chauffeur",
  image: IMG.arrival,
  imageAlt: "Chauffeur opening the rear door of a luxury sedan outside a Riyadh exhibition centre",
  intro:
    "Saudi Event Management coordinates chauffeur-driven transport for executives, guests and delegations. We work through vetted partners rather than an owned fleet, which means one point of contact from us and vehicle availability confirmed in writing before you commit.",
  glance: [
    ["Service", "Chauffeur-driven airport, hotel, hourly, full-day and intercity journeys"],
    ["Primary area", "Riyadh"],
    ["Other cities", "Checked per enquiry (Jeddah, Makkah, Madinah, Eastern Province and others)"],
    ["Vehicles", "Executive sedans, premium SUVs, vans, group vehicles — subject to availability"],
    ["Pricing", "Written quotation; no published fares"],
  ],
  sections: [
    {
      h2: "What we arrange",
      bullets: [
        "Airport arrivals and departures, with pickup details agreed in advance",
        "Hotel, venue and meeting transfers",
        "Hourly and full-day chauffeur hire for multi-stop days",
        "City-to-city journeys within Saudi Arabia",
        "Delegation, conference and event movements with several vehicles",
      ],
    },
    {
      h2: "Where we cover",
      paragraphs: [
        "Riyadh is our primary area and the one with confirmed partner capability. Requests for other Saudi cities are welcome; we check availability for the date and location before quoting, and tell you if we cannot support it.",
      ],
    },
    {
      h2: "Choosing the vehicle",
      paragraphs: [
        "Pick the class that fits passengers and luggage: an executive sedan for one to three people, a premium SUV for more luggage or longer road journeys, a van for small delegations, or a larger group vehicle for conferences and events. Our vehicle classes page explains each in more detail. The exact vehicle is confirmed in your quotation.",
      ],
    },
    {
      h2: "What affects the quotation",
      bullets: [
        "Vehicle class and number of vehicles",
        "Journey length, waiting time and number of stops",
        "Date, time of day and peak periods",
        "Whether the journey is point-to-point, hourly or full-day",
      ],
    },
    {
      h2: "For corporate and event clients",
      paragraphs: [
        "If you are moving a team or a group, tell us the schedule and number of passengers. We plan pickups and vehicle allocation, and you get one quotation covering the programme. Event transport for conferences and weddings is also covered on our VIP event transportation page.",
      ],
    },
  ],
  faqs: [
    { q: "Do you own the vehicles?", a: "No. We coordinate through vetted transport partners and confirm the vehicle class and availability for your date in a written quotation." },
    { q: "Can I hire a chauffeur by the hour?", a: "Yes, hourly and full-day arrangements can be requested, subject to availability in the city you need." },
    { q: "Do you cover Jeddah and other cities?", a: "Requests outside Riyadh are checked per enquiry. We confirm whether we can support the date and location before quoting." },
    { q: "How do airport pickups work?", a: "You provide flight and passenger details; we agree the meeting point and arrangements in your quotation. Specific services such as meet-and-greet depend on availability." },
    { q: "How far ahead should I book?", a: "As early as you can, especially for groups and event dates. If we cannot support your date we will tell you promptly." },
    { q: "What are the cancellation and waiting-time terms?", a: "They are stated in your written quotation because they vary by journey and partner." },
  ],
  related: [
    { label: "Chauffeur in Riyadh", href: "/transportation/vip-chauffeur/riyadh", desc: "Executive transport in the capital." },
    { label: "Chauffeur in Jeddah", href: "/transportation/vip-chauffeur/jeddah", desc: "Jeddah requests, checked per enquiry." },
    { label: "Vehicle classes", href: "/transportation/luxury-vehicles", desc: "Sedans, SUVs, vans and group vehicles." },
    { label: "VIP event transportation", href: "/services/vip-transportation", desc: "Transport for conferences, weddings and events." },
  ],
  quote: { label: "Request a chauffeur quote", query: { service: "vip_chauffeur" } },
  breadcrumbs: [{ name: "Home", href: "/" }, T, { name: "VIP chauffeur" }],
  indexable: true,
  serviceName: "Executive chauffeur service coordination",
  areaServed: "Saudi Arabia",
};

const riyadh: TransportPage = {
  path: "/transportation/vip-chauffeur/riyadh",
  title: "VIP Chauffeur Service in Riyadh | Airport & Executive Transfers | Saudi Event Management",
  description:
    "Executive chauffeur service in Riyadh: airport and hotel transfers, business-district meetings, conferences and hourly hire, coordinated through vetted partners with a written quotation.",
  h1: "VIP Chauffeur Service in Riyadh",
  eyebrow: "VIP chauffeur · Riyadh",
  image: IMG.hotel,
  imageAlt: "Chauffeur greeting a guest at a Riyadh hotel entrance in the evening",
  intro:
    "Riyadh is where our transport partner capability is confirmed. We coordinate chauffeur-driven journeys for business travellers, hotel guests, conference delegates and visiting delegations, from a single airport transfer to a multi-day programme.",
  glance: [
    ["Service", "Airport, hotel, business-district, hourly and full-day chauffeur journeys"],
    ["Area", "Riyadh and surrounding areas; intercity on request"],
    ["Vehicles", "Executive sedans, premium SUVs, vans, group vehicles — subject to availability"],
    ["Pricing", "Written quotation; no published fares"],
  ],
  sections: [
    {
      h2: "Airport arrivals and departures",
      paragraphs: [
        "Tell us the airport, terminal, flight details and number of passengers and bags. We agree the pickup arrangement and vehicle class in your quotation. Arrangements such as flight tracking and meet-and-greet are offered through our partner where available and are stated in the quotation if included.",
      ],
    },
    {
      h2: "Business travel in the city",
      paragraphs: [
        "Executives often need several meetings across different districts in one day. Hourly or full-day hire with a fixed itinerary keeps the vehicle with you between stops. Share your meeting locations and times and we plan the day with sensible buffers.",
      ],
    },
    {
      h2: "Hotels, conferences and exhibitions",
      paragraphs: [
        "For events we coordinate pickups from hotels and the airport to the venue, with extra vehicles as numbers grow. Our VIP event transportation page covers delegate shuttles and wedding guest transport in more depth.",
      ],
    },
    {
      h2: "Intercity journeys from Riyadh",
      paragraphs: [
        "Longer road journeys from Riyadh to other Saudi cities, and cross-border enquiries, are reviewed per request. Add the destination and date in the form and we confirm what can be supported.",
      ],
    },
    {
      h2: "What to include in your request",
      bullets: [
        "Pickup point (airport terminal, hotel or address) and destination",
        "Date, pickup time and whether the schedule is flexible",
        "Passengers, luggage and any accessibility needs",
        "Vehicle class, or ask us to recommend one",
        "Company name if you need a formal quotation or invoice",
      ],
    },
  ],
  faqs: [
    { q: "Can you arrange a chauffeur in Riyadh at short notice?", a: "We will always tell you honestly whether your date and time can be supported. Short-notice requests depend on partner availability, so send the details as early as possible." },
    { q: "Which vehicles can I request in Riyadh?", a: "Executive sedans, premium SUVs, vans and larger group vehicles, subject to availability. We do not guarantee a specific make or model unless confirmed in your quotation." },
    { q: "Can you handle a multi-day business visit?", a: "Yes. Share the daily schedule and we quote the programme as a whole, including airport transfers at each end." },
    { q: "Can I get a formal quotation or invoice for my company?", a: "Tick the formal quotation option in the form and tell us your company details and any procurement requirements. We confirm what documents we can provide in the quotation." },
    { q: "Do you provide transport for conference delegates?", a: "Yes, as a coordinated programme with several vehicles. See our VIP event transportation page, and include delegate numbers and schedule in your request." },
  ],
  related: [
    { label: "VIP chauffeur in Saudi Arabia", href: "/transportation/vip-chauffeur", desc: "All Saudi chauffeur services." },
    { label: "VIP event transportation", href: "/services/vip-transportation", desc: "Conferences, weddings and delegate shuttles." },
    { label: "Vehicle classes", href: "/transportation/luxury-vehicles", desc: "Choose the right class." },
    { label: "Cross-border transfers", href: "/transportation/cross-border-transfers", desc: "Journeys beyond the Kingdom (enquiry only)." },
  ],
  quote: { label: "Request a Riyadh chauffeur quote", query: { service: "vip_chauffeur", oc: "SA", ocity: "Riyadh", dc: "SA", dcity: "Riyadh" } },
  breadcrumbs: [{ name: "Home", href: "/" }, T, { name: "VIP chauffeur", href: "/transportation/vip-chauffeur" }, { name: "Riyadh" }],
  indexable: true,
  serviceName: "Chauffeur service coordination in Riyadh",
  areaServed: "Riyadh, Saudi Arabia",
};

const jeddah: TransportPage = {
  path: "/transportation/vip-chauffeur/jeddah",
  title: "Chauffeur Service Enquiries in Jeddah | Saudi Event Management",
  description:
    "Request a chauffeur-driven transfer in Jeddah, including Jeddah Airport and Jeddah to Makkah journeys. Availability is checked per enquiry before a written quotation.",
  h1: "Chauffeur Service Enquiries in Jeddah",
  eyebrow: "VIP chauffeur · Jeddah",
  image: IMG.sedan,
  imageAlt: "Rear cabin of a luxury executive sedan",
  intro:
    "We take chauffeur enquiries for Jeddah, but we are upfront that our confirmed partner capability is in Riyadh. For Jeddah we check availability for your date and route before quoting, and we will tell you if we cannot support it.",
  glance: [
    ["Status", "Enquiry-based; availability checked per request"],
    ["Typical requests", "Jeddah Airport transfers, hotel transfers, Jeddah to Makkah and Madinah journeys"],
    ["Vehicles", "Requested by class, subject to availability"],
    ["Pricing", "Written quotation only if we can support the journey"],
  ],
  sections: [
    {
      h2: "What you can ask for",
      bullets: [
        "Jeddah Airport arrivals and departures",
        "Hotel and venue transfers within Jeddah",
        "Private journeys between Jeddah and Makkah or Madinah",
        "Corporate and delegation movements during events",
      ],
    },
    {
      h2: "How we handle Jeddah requests",
      paragraphs: [
        "Because Jeddah is checked per request, the process is simple: send the date, pickup, destination and passenger numbers. We confirm whether a suitable vehicle and driver can be arranged. If yes, you receive a written quotation. If not, we say so rather than leave you waiting.",
      ],
    },
    {
      h2: "Journeys to Makkah and Madinah",
      paragraphs: [
        "Private road journeys from Jeddah to Makkah or Madinah can be requested for hotel and airport connections. We do not offer or imply any special access to restricted areas, and any permissions that apply to a journey remain a matter for the passengers and the relevant authorities.",
      ],
    },
    {
      h2: "Before you travel",
      paragraphs: [
        "Include flight details for airport pickups, the hotel name for transfers, the number of passengers and bags, and any family or accessibility needs so we can propose a suitable vehicle class.",
      ],
    },
  ],
  faqs: [
    { q: "Do you have a confirmed chauffeur partner in Jeddah?", a: "Our confirmed capability is in Riyadh. Jeddah requests are checked individually before we quote, and we will tell you if we cannot support yours." },
    { q: "Can you arrange Jeddah Airport pickups?", a: "You can request them. We confirm availability for your date and flight details before sending a quotation." },
    { q: "Can you take me from Jeddah to Makkah?", a: "You can request a private journey. We confirm whether it can be supported; we do not claim any special access or permits." },
    { q: "Do you publish prices?", a: "No. A written quotation is sent only after we confirm the journey can be supported." },
  ],
  related: [
    { label: "VIP chauffeur in Saudi Arabia", href: "/transportation/vip-chauffeur", desc: "All Saudi chauffeur services." },
    { label: "Chauffeur in Riyadh", href: "/transportation/vip-chauffeur/riyadh", desc: "Our primary service area." },
    { label: "Vehicle classes", href: "/transportation/luxury-vehicles", desc: "Choose the right class." },
  ],
  quote: { label: "Send a Jeddah enquiry", query: { service: "vip_chauffeur", oc: "SA", ocity: "Jeddah", dc: "SA" } },
  breadcrumbs: [{ name: "Home", href: "/" }, T, { name: "VIP chauffeur", href: "/transportation/vip-chauffeur" }, { name: "Jeddah" }],
  // Keep out of search and the sitemap until a Jeddah partner is confirmed.
  indexable: false,
  serviceName: "Chauffeur enquiry coordination in Jeddah",
  areaServed: "Jeddah, Saudi Arabia",
};

const vehicles: TransportPage = {
  path: "/transportation/luxury-vehicles",
  title: "Executive Vehicle Classes for Chauffeur & Private Transfers | Saudi Event Management",
  description:
    "Executive sedans, premium SUVs, premium vans and group vehicles for chauffeur and private transfer requests in Saudi Arabia. See which class suits your passengers and luggage.",
  h1: "Executive Vehicle Classes for Chauffeur and Private Transfers",
  eyebrow: "Vehicle classes",
  image: IMG.vans,
  imageAlt: "Line-up of premium passenger vans",
  intro:
    "You request a vehicle class; we confirm the exact vehicle, passenger capacity and luggage allowance in your written quotation. Vehicles are provided by our transport partners and are subject to availability. We do not claim to own a fleet, and we do not publish brand or model guarantees.",
  glance: [
    ["How it works", "Choose a class, or ask us to recommend one"],
    ["Confirmation", "Exact vehicle named in the quotation"],
    ["Availability", "Subject to date, city and partner capacity"],
    ["Brand or model", "Requests noted; only confirmed ones are stated in a quotation"],
  ],
  sections: [
    {
      h2: "Executive sedan",
      paragraphs: [
        "Best for one to three passengers: executive airport transfers, meeting-to-meeting travel and board-level arrivals. Luggage space is limited, so tell us how many bags are travelling.",
      ],
    },
    {
      h2: "Premium SUV",
      paragraphs: [
        "Suited to small groups, families and longer road journeys where there is more luggage or you want extra space. A common choice for intercity transfers.",
      ],
    },
    {
      h2: "Premium van or people carrier",
      paragraphs: [
        "For delegations and groups travelling together, usually around four to seven passengers, with room for luggage. Useful when you want everyone in one vehicle.",
      ],
    },
    {
      h2: "Minibus and group vehicles",
      paragraphs: [
        "For conferences, event shuttles and larger guest movements. We plan routes and timings with you and confirm the vehicle size for your headcount in the quotation.",
      ],
    },
    {
      h2: "How to choose",
      bullets: [
        "Count passengers and bags first, then choose the smallest class that is comfortable",
        "Allow extra space for long journeys or if luggage is bulky",
        "For several vehicles, tell us whether they should travel together or on separate schedules",
        "If you are unsure, select 'Recommend a suitable vehicle' in the form",
      ],
    },
    {
      h2: "If you request a specific make or model",
      paragraphs: [
        "Tell us in the form's notes or select 'This class only'. We pass the request to our partners and tell you what can be confirmed. If an equivalent vehicle is acceptable, say so, since it widens what we can offer for your date.",
      ],
    },
  ],
  faqs: [
    { q: "Can I request a specific make or model?", a: "You can note it. We confirm in the quotation only what a partner can provide for your date, and offer an equivalent if you allow it." },
    { q: "Do you own these vehicles?", a: "No. Vehicles are provided through vetted transport partners, subject to availability." },
    { q: "How many passengers fit in each class?", a: "Typical ranges are on this page, but the exact capacity and luggage allowance are confirmed for the vehicle named in your quotation." },
    { q: "Can I book several vehicles?", a: "Yes. Select more than one class in the form or describe the group in the notes, and we quote the combination." },
  ],
  related: [
    { label: "VIP chauffeur in Saudi Arabia", href: "/transportation/vip-chauffeur", desc: "Chauffeured journeys in the Kingdom." },
    { label: "Cross-border transfers", href: "/transportation/cross-border-transfers", desc: "Journeys beyond the Kingdom (enquiry only)." },
    { label: "Request a quote", href: "/transportation/request-a-quote", desc: "Tell us about your journey." },
  ],
  quote: { label: "Request a quote for your vehicle class", query: {} },
  breadcrumbs: [{ name: "Home", href: "/" }, T, { name: "Vehicle classes" }],
  indexable: true,
  serviceName: "Executive vehicle class coordination",
  areaServed: "Saudi Arabia",
};

export const TRANSPORT_PAGES: Record<string, TransportPage> = {
  "cross-border-transfers": crossBorder,
  "vip-chauffeur": chauffeur,
  "vip-chauffeur/riyadh": riyadh,
  "vip-chauffeur/jeddah": jeddah,
  "luxury-vehicles": vehicles,
};

export const INDEXABLE_TRANSPORT_PATHS = Object.values(TRANSPORT_PAGES)
  .filter((p) => p.indexable)
  .map((p) => p.path);
