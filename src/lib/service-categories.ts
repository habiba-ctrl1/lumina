// Main commercial service-category pages (/services/<slug>) rendered by the
// shared ServiceCategoryPage template. One entry = one authoritative page.
//
// Content rules (founder-approved, 2026-10):
//  • SEM is a remote coordination platform — partners deliver. Never claim SEM
//    owns equipment, warehouses, fleets, staff, or a Saudi office.
//  • No invented prices, capacities, brands, reviews, partnerships or statistics.
//  • Never name vendors publicly — the backend manages vendors, the page sells the service.
//  • Sub-services live as sections here; separate micro-pages only with
//    search-demand + vendor + conversion evidence (see Phase 5 plan).
import type { ServiceLeadField } from "@/components/ServiceLeadForm";

export interface TitledItem {
  title: string;
  desc: string;
}

export interface LinkItem {
  title: string;
  href: string;
  desc: string;
}

export interface ServiceCategory {
  slug: string;
  /** CRM source tag sent with every enquiry from this page. */
  source: string;
  /** Short service name (breadcrumbs, schema name). */
  name: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImageAlt: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  /** Concise, quotable definition for search/AI answers. */
  answer: { question: string; answer: string };
  intro: string[];
  scope: { heading: string; lead: string; items: TitledItem[] };
  subServices: { heading: string; lead: string; items: TitledItem[] };
  eventTypes: { heading: string; items: (TitledItem & { href?: string })[] };
  process: TitledItem[];
  quoteFactors: { heading: string; lead: string; items: TitledItem[] };
  clientChecklist: string[];
  coordination: { heading: string; paragraphs: string[] };
  quality: { heading: string; items: TitledItem[] };
  useCases: { heading: string; items: TitledItem[] };
  feature: { image: string; alt: string; caption: string };
  riyadh: { heading: string; paragraphs: string[]; links: { label: string; href: string }[] };
  faqs: { q: string; a: string }[];
  related: LinkItem[];
  form: {
    heading: string;
    subheading: string;
    submitLabel: string;
    serviceOptions: string[];
    eventTypeOptions: string[];
    guestCountLabel?: string;
    messagePlaceholder: string;
    fields: ServiceLeadField[];
    whatsappText: string;
  };
}

/* ───────────────────────────── EVENT CATERING ───────────────────────────── */

const eventCatering: ServiceCategory = {
  slug: "event-catering",
  source: "event_catering_page",
  name: "Event Catering",
  serviceType: "Event Catering",
  meta: {
    title: "Event Catering in Riyadh | Corporate, Wedding & Private Event Catering | SEM",
    description:
      "Request event catering options in Riyadh for corporate events, weddings, conferences and private gatherings. Share your guest count, date and service style — SEM coordinates suitable Saudi-based caterers.",
    keywords: [
      "event catering Riyadh",
      "corporate event catering Riyadh",
      "wedding catering Riyadh",
      "conference catering Saudi Arabia",
      "canapé and reception catering Riyadh",
      "buffet catering for events Riyadh",
      "تموين حفلات الرياض",
    ],
    ogImageAlt: "Formal event dinner table with gold-rimmed tableware, floral centrepiece and candles",
  },
  hero: {
    badge: "Event Catering · Riyadh",
    title: "Event Catering",
    highlight: "in Riyadh",
    subtitle:
      "Tell us your guest count, event date, venue and preferred service style. SEM coordinates suitable Saudi-based catering partners and brings you options that fit your event — corporate, wedding or private.",
    image: "/services/saudi_gala_table_alcohol_free.webp",
    imageAlt: "Formal event dinner table set with gold-rimmed plates, crystal glasses and a white floral centrepiece in a Riyadh ballroom",
  },
  answer: {
    question: "How does event catering work with Saudi Event Management?",
    answer:
      "SEM is an event-services coordination platform. You share your event type, date, venue, guest count and catering format; SEM matches the brief with suitable Riyadh-based catering partners, requests options and pricing, and presents them to you in one quotation. The selected caterer prepares and serves the food, while SEM stays your single point of contact through to the event.",
  },
  intro: [
    "Catering is usually the largest single line in an event budget and the part guests remember most. The right choice depends less on a menu brochure and more on the details of your event: how many guests, how long they stay, whether they are seated or moving, and what the venue allows.",
    "SEM does not run a kitchen. Instead, we qualify your requirements properly and request options from catering partners in Riyadh whose format, capacity and availability suit your date — so you compare relevant proposals rather than generic price lists.",
  ],
  scope: {
    heading: "What SEM can coordinate",
    lead: "Every enquiry is matched to partners based on format, guest count and date. Typical catering requirements we coordinate include:",
    items: [
      { title: "Menu options & tastings", desc: "Menu proposals aligned to your event type and guest profile, with tastings arranged where the caterer offers them for the booking size." },
      { title: "Service format", desc: "Plated, buffet, family-style, canapé reception or coffee breaks — selected around your run-of-show and venue layout." },
      { title: "Service staff", desc: "Waiters, buffet attendants and beverage staff where the catering partner supplies them as part of the package." },
      { title: "Beverage & hospitality stations", desc: "Arabic coffee and dates, tea service, mocktail and juice stations, and refreshment points for long-format events." },
      { title: "Setup & equipment from the caterer", desc: "Buffet stations, chafing equipment, crockery and cutlery as supplied by the caterer, plus coordination with the venue's own kitchen rules." },
      { title: "Dietary requirements", desc: "Halal is the standard in Saudi Arabia; vegetarian, allergy-aware and other dietary needs are flagged to the caterer at the request stage." },
    ],
  },
  subServices: {
    heading: "Catering formats we request quotes for",
    lead: "One enquiry covers all of these — tell us which fits your event, or let us recommend a format based on your brief.",
    items: [
      { title: "Corporate Event Catering", desc: "Working lunches, launch receptions, gala dinners and staff events where timing and presentation matter." },
      { title: "Conference Catering", desc: "Coffee breaks, networking lunches and delegate refreshments timed around the session agenda." },
      { title: "Wedding Catering", desc: "Seated dinners or buffets for wedding receptions, including separate service planning for men's and women's halls where needed." },
      { title: "Private Event Catering", desc: "Family gatherings, majlis evenings, birthdays and home events with a smaller, more personal service." },
      { title: "VIP & Executive Catering", desc: "Discreet, higher-touch service for VIP guests, board dinners and hosted delegations." },
      { title: "Buffet Catering", desc: "Flexible buffet formats for larger guest counts and events with staggered arrival times." },
      { title: "Canapés & Reception Catering", desc: "Passed canapés, finger food and drinks receptions for openings, launches and networking events." },
      { title: "Exhibition Catering", desc: "Stand hospitality and visitor refreshments over multi-day exhibition schedules." },
      { title: "Outdoor Event Catering", desc: "Catering for gardens, courtyards and outdoor venues, where power, water access and heat need planning." },
    ],
  },
  eventTypes: {
    heading: "Event types we coordinate catering for",
    items: [
      { title: "Corporate events & gala dinners", desc: "Annual dinners, award nights, client receptions and team celebrations.", href: "/services/corporate-events" },
      { title: "Conferences & seminars", desc: "Multi-session days needing breaks, lunch and hospitality on schedule.", href: "/services/conferences" },
      { title: "Weddings & engagements", desc: "Receptions where guest experience, presentation and timing are critical.", href: "/services/weddings" },
      { title: "Exhibitions & trade shows", desc: "Stand hospitality and team meals across show days.", href: "/services/exhibitions" },
      { title: "Office openings & launches", desc: "Reception-style catering for openings, launches and brand moments." },
      { title: "Private & family gatherings", desc: "Majlis evenings, Eid gatherings, birthdays and home events.", href: "/services/birthday-party" },
    ],
  },
  process: [
    { title: "Share your brief", desc: "Use the form or WhatsApp to send your event type, date, venue, guest count and preferred catering format." },
    { title: "We qualify the details", desc: "SEM checks anything that affects the quote — service duration, venue kitchen access, staffing and dietary needs." },
    { title: "Partner matching", desc: "We approach suitable Riyadh-based catering partners whose format and availability fit your date." },
    { title: "Options & quotation", desc: "You receive menu and service options in one SEM quotation, so you are comparing like with like." },
    { title: "Confirm & coordinate", desc: "Once you confirm, SEM coordinates the final menu, timings and logistics between you, the caterer and the venue." },
  ],
  quoteFactors: {
    heading: "What affects a catering quotation",
    lead: "There is no honest fixed price for event catering — these factors change the cost most:",
    items: [
      { title: "Guest count", desc: "The main driver of food quantity, staffing and equipment." },
      { title: "Service style", desc: "Plated service typically needs more staff than a buffet; canapés depend on pieces per guest." },
      { title: "Menu selection", desc: "Ingredients, number of courses and any premium items." },
      { title: "Service duration", desc: "A two-hour reception and an all-day conference are very different briefs." },
      { title: "Venue conditions", desc: "Kitchen access, outdoor setup, loading access and venue catering rules." },
      { title: "Staffing & equipment", desc: "Waiters, attendants, stations, crockery and any hire items needed." },
      { title: "Date & season", desc: "Weekends, Ramadan and peak wedding and event seasons affect availability." },
    ],
  },
  clientChecklist: [
    "Event type and date",
    "Venue name or area in Riyadh",
    "Expected guest count (a range is fine)",
    "Preferred format: plated, buffet, canapés or breaks",
    "Event timings and service duration",
    "Dietary requirements or restrictions",
    "Whether service staff are needed",
    "Budget range, if you have one",
  ],
  coordination: {
    heading: "How partner coordination works",
    paragraphs: [
      "SEM operates as a remote coordination platform. We do not own kitchens, equipment or service staff; catering is prepared and served by Saudi-based catering partners selected for your event.",
      "Our role is to qualify your brief, request suitable options, present them clearly, and keep communication in one place. Availability and pricing depend on the selected caterer, date, venue and final menu, and are confirmed in writing before you book.",
    ],
  },
  quality: {
    heading: "Quality and control considerations",
    items: [
      { title: "Clear written scope", desc: "Menu, quantities, staffing and timings are captured in the quotation so everyone is working from the same brief." },
      { title: "Venue compatibility", desc: "We check the venue's catering rules and kitchen access before options are presented, not after." },
      { title: "Dietary handling", desc: "Allergies and dietary needs are passed to the caterer in writing at the request stage." },
      { title: "Tastings where offered", desc: "For larger bookings, ask whether a tasting can be arranged before final menu sign-off." },
    ],
  },
  useCases: {
    heading: "Typical catering requests",
    items: [
      { title: "Corporate office opening", desc: "A canapé and mocktail reception for invited guests, with service staff for a two-to-three-hour window." },
      { title: "One-day conference", desc: "Arrival coffee, two breaks and a networking lunch, timed to the agenda." },
      { title: "Wedding reception", desc: "A seated or buffet dinner with service planned separately for each hall where required." },
      { title: "Majlis or family gathering", desc: "Arabic coffee, dates and a home-style buffet for an evening gathering." },
    ],
  },
  feature: {
    image: "/services/luxury_wedding_table_setting.webp",
    alt: "Round wedding reception table set with gold charger plates, folded napkins and a rose centrepiece for a seated dinner",
    caption: "Seated dinners, buffets and receptions — format chosen around your event",
  },
  riyadh: {
    heading: "Event catering across Riyadh",
    paragraphs: [
      "Most catering enquiries SEM handles are for Riyadh: hotel ballrooms and conference venues, private halls, offices, and outdoor venues on the city's edges. Hotel venues often require in-house catering, while private halls and outdoor sites usually allow external caterers — one of the first things we check.",
      "If your event also needs production, entertainment or guest arrival services, SEM can coordinate them under the same enquiry.",
    ],
    links: [
      { label: "Event services in Riyadh", href: "/locations/riyadh" },
      { label: "Corporate event venues in Riyadh", href: "/blog/best-corporate-event-venues-riyadh-2026" },
    ],
  },
  faqs: [
    { q: "Does SEM prepare the food itself?", a: "No. SEM is a coordination platform. Food is prepared and served by Saudi-based catering partners selected for your event. SEM manages the enquiry, options, quotation and communication." },
    { q: "Is the catering halal?", a: "Halal is the standard for catering in Saudi Arabia. If you have additional dietary requirements, include them in your enquiry so they are passed to the caterer at the request stage." },
    { q: "How much does event catering cost in Riyadh?", a: "It depends on guest count, menu, service style, duration, staffing and venue conditions. SEM does not publish fixed prices because they change per caterer and date; you receive a specific quotation once your requirements are confirmed." },
    { q: "Can you arrange catering at a hotel venue?", a: "Many hotels require their in-house catering. SEM checks the venue's policy first; where external catering is allowed, we can request options from suitable partners." },
    { q: "Can service staff be included?", a: "Yes, where the catering partner supplies waiters, buffet attendants or beverage staff as part of the package. Staffing levels are shown in the quotation." },
    { q: "What is the minimum guest count?", a: "Minimums vary by caterer and format. Share your expected guest count and SEM will tell you which options are realistic." },
    { q: "How early should I enquire?", a: "As early as possible, especially for weekends, Ramadan and peak event seasons. Short-notice requests can be checked, but options may be limited." },
    { q: "Can catering be combined with other event services?", a: "Yes. SEM can coordinate catering alongside event production, sound, LED screens, entertainment and valet parking in one enquiry." },
  ],
  related: [
    { title: "Corporate Events", href: "/services/corporate-events", desc: "Gala dinners, launches and company events." },
    { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and reception coordination." },
    { title: "Conferences", href: "/services/conferences", desc: "Conference coordination and delegate hospitality." },
    { title: "Entertainment", href: "/services/entertainment", desc: "Live music, performers and DJs." },
    { title: "Valet Parking", href: "/services/valet-parking", desc: "Guest arrival and parking management." },
    { title: "Sound & Audio", href: "/services/sound-audio", desc: "Speech and music audio for your event." },
  ],
  form: {
    heading: "Request catering options",
    subheading: "Share your event details. SEM reviews the brief, checks suitable catering partners and comes back with options and next steps.",
    submitLabel: "Request Catering Options",
    serviceOptions: [
      "Corporate Event Catering",
      "Conference Catering",
      "Wedding Catering",
      "Private Event Catering",
      "VIP / Executive Catering",
      "Canapés & Reception",
      "Exhibition Catering",
      "Outdoor Event Catering",
      "Not sure — please advise",
    ],
    eventTypeOptions: ["Corporate Event", "Conference / Seminar", "Wedding / Engagement", "Exhibition", "Office Opening / Launch", "Private / Family Gathering", "Other"],
    guestCountLabel: "Guest Count",
    messagePlaceholder: "Event timings, menu preferences, venue catering rules you know of, anything else we should pass to the caterer...",
    fields: [
      { name: "serviceStyle", label: "Meal / service style", type: "select", options: ["Plated / seated", "Buffet", "Canapés / finger food", "Coffee breaks & refreshments", "Mixed / not sure"] },
      { name: "duration", label: "Service duration", type: "select", options: ["Up to 2 hours", "2–4 hours", "Half day", "Full day", "Multi-day"] },
      { name: "dietary", label: "Dietary requirements", type: "text", placeholder: "e.g. vegetarian options, nut allergy" },
      { name: "staff", label: "Service staff needed?", type: "select", options: ["Yes", "No", "Not sure"] },
      { name: "venueKitchen", label: "Venue type", type: "select", options: ["Hotel / venue with in-house catering", "Private hall", "Office / corporate premises", "Outdoor venue", "Private residence", "Not confirmed yet"] },
    ],
    whatsappText: "Hi SEM, I'd like catering options for an event in Riyadh.",
  },
};

/* ────────────────────────────── LED SCREENS ─────────────────────────────── */

const ledScreens: ServiceCategory = {
  slug: "led-screens",
  source: "led_screens_page",
  name: "LED Screens",
  serviceType: "LED Screen Rental Coordination",
  meta: {
    title: "LED Screen Rental Riyadh | LED Walls for Events, Stages & Exhibitions | SEM",
    description:
      "Need an LED screen or LED wall for an event in Riyadh? Share your venue, indoor/outdoor setting, approximate size and content — SEM coordinates suitable Saudi-based LED and production partners.",
    keywords: [
      "LED screen rental Riyadh",
      "LED wall rental Riyadh",
      "event LED screens Saudi Arabia",
      "outdoor LED screen rental Riyadh",
      "stage LED screen Riyadh",
      "exhibition LED wall Riyadh",
      "تأجير شاشات LED الرياض",
    ],
    ogImageAlt: "Large LED video wall behind a conference stage with seated audience",
  },
  hero: {
    badge: "LED Screens & Visual Displays · Riyadh",
    title: "LED Screens & LED Walls",
    highlight: "for Events in Riyadh",
    subtitle:
      "Tell us your venue, indoor or outdoor setting, approximate screen size and what you need to show. SEM coordinates suitable Saudi-based LED and production partners and requests options for your event.",
    image: "/services/gallery_corporate_gala.webp",
    imageAlt: "Wide LED video wall behind a conference stage with a speaker at the lectern and a seated audience in Riyadh",
  },
  answer: {
    question: "How do I rent an LED screen for an event in Riyadh?",
    answer:
      "Share your venue, indoor or outdoor setting, approximate screen size or wall dimensions, event date and content type. SEM — an event-services coordination platform — matches the requirement with suitable Saudi-based LED and production partners, requests options including installation, operation and dismantling, and presents them to you in one quotation. The selected partner supplies and operates the screens.",
  },
  intro: [
    "An LED wall is often the visual centre of a stage, conference or exhibition stand — and also one of the easiest items to get wrong. Screen size, pixel pitch, brightness, power and rigging all depend on the venue and on how far your audience sits from the screen.",
    "SEM does not own LED inventory. We qualify your requirement, then request options from Saudi-based LED and event production partners, so the specification you are quoted matches the room, the content and the budget.",
  ],
  scope: {
    heading: "What SEM can coordinate",
    lead: "LED requirements are matched to partners based on venue, size and technical needs. Typical scope includes:",
    items: [
      { title: "Indoor LED walls", desc: "Modular LED walls for ballrooms, conference halls and stages, specified for the room and viewing distance." },
      { title: "Outdoor LED screens", desc: "Higher-brightness screens for daylight and outdoor venues, with weather and structure considerations." },
      { title: "Stage backdrops & side screens", desc: "Main stage walls plus side or IMAG screens so the back of the room can see the speaker." },
      { title: "Content playback & switching", desc: "Media servers or playback laptops, video switching and a technician to run content on cue, where included by the partner." },
      { title: "Structure & rigging", desc: "Ground-stack frames, truss or flown rigging, as appropriate for the venue and approved by it." },
      { title: "Installation & dismantling", desc: "Delivery, build, testing and de-rig scheduled around the venue's access windows." },
    ],
  },
  subServices: {
    heading: "LED services covered on this page",
    lead: "One enquiry covers all of these. Tell us how the screen will be used and SEM requests the right specification.",
    items: [
      { title: "LED Screen Rental", desc: "Single screens for presentations, sponsor loops and announcements." },
      { title: "LED Wall Rental", desc: "Larger modular walls built to the size your stage or room needs." },
      { title: "Indoor LED Screens", desc: "Finer pixel pitch for close viewing in halls and ballrooms." },
      { title: "Outdoor LED Screens", desc: "Brighter panels for outdoor events, activations and daylight use." },
      { title: "Stage LED Screens", desc: "Backdrops and side screens integrated with stage, lighting and sound." },
      { title: "Exhibition LED Screens", desc: "Stand screens and video walls for trade shows and exhibitions." },
      { title: "Conference LED Screens", desc: "Presentation and speaker-support screens sized for delegate seating." },
      { title: "Corporate Event LED Screens", desc: "Gala, awards and launch visuals with content run on cue." },
      { title: "Large-Format LED Displays", desc: "Big-format walls for large audiences and outdoor gatherings." },
    ],
  },
  eventTypes: {
    heading: "Where LED screens are typically used",
    items: [
      { title: "Conferences & summits", desc: "Speaker visibility, presentations and live camera feeds.", href: "/services/conferences" },
      { title: "Corporate galas & awards", desc: "Stage backdrops, nominee videos and sponsor branding.", href: "/services/corporate-events" },
      { title: "Exhibitions & trade shows", desc: "Stand screens that draw visitors and show product content.", href: "/services/exhibitions" },
      { title: "Weddings", desc: "Stage backdrops, live feeds to separate halls and visual themes.", href: "/services/weddings" },
      { title: "Product launches & activations", desc: "Reveal moments, brand content and outdoor activations." },
      { title: "Concerts & entertainment", desc: "Stage visuals and audience screens for live performances.", href: "/services/entertainment" },
    ],
  },
  process: [
    { title: "Share your requirement", desc: "Venue, indoor/outdoor, approximate size, event date and what the screen needs to show." },
    { title: "Technical qualification", desc: "SEM checks viewing distance, stage layout, power availability, access and build time." },
    { title: "Partner matching", desc: "We request options from suitable Saudi-based LED and production partners with availability for your date." },
    { title: "Options & quotation", desc: "You receive a clear quotation covering screens, structure, technician, installation and dismantling." },
    { title: "Build, show & de-rig", desc: "After confirmation, SEM coordinates timings with the partner and venue through to dismantling." },
  ],
  quoteFactors: {
    heading: "What affects an LED screen quotation",
    lead: "LED pricing depends on specification and logistics, not a single per-screen rate:",
    items: [
      { title: "Screen size", desc: "Total wall area in square metres is the main driver." },
      { title: "Pixel pitch", desc: "Finer pitch (for close viewing) costs more than coarser outdoor pitch." },
      { title: "Indoor or outdoor", desc: "Outdoor screens need higher brightness and weather-ready structure." },
      { title: "Structure & rigging", desc: "Ground-stack, truss or flown builds differ in equipment and labour." },
      { title: "Content & operation", desc: "Playback, switching, camera feeds and an operator during the show." },
      { title: "Hire duration", desc: "Build day, show days and de-rig time all count." },
      { title: "Power & access", desc: "Generator needs, loading access and venue build windows." },
    ],
  },
  clientChecklist: [
    "Venue name and hall, or outdoor site",
    "Indoor or outdoor",
    "Approximate screen size, or stage width",
    "Audience size and seating distance",
    "Event date, build time and show hours",
    "Content type: slides, video, live camera",
    "Whether you need an operator during the event",
    "Any stage, lighting or sound also required",
  ],
  coordination: {
    heading: "How partner coordination works",
    paragraphs: [
      "SEM is a remote coordination platform. We do not own LED panels, rigging or warehouses; screens are supplied, installed and operated by Saudi-based LED and event production partners selected for your event.",
      "SEM qualifies the technical brief, requests suitable options, presents them in one quotation and keeps communication in one place. Availability and pricing depend on the partner, date, venue and final specification, and are confirmed in writing before you book.",
    ],
  },
  quality: {
    heading: "Quality and control considerations",
    items: [
      { title: "Specification in writing", desc: "Screen size, pitch, structure, operator and timings are listed in the quotation." },
      { title: "Venue approval", desc: "Rigging, power and load-in are checked against the venue's rules before confirmation." },
      { title: "Content testing", desc: "Ask for content to be tested on the screen during build, before doors open." },
      { title: "On-site technician", desc: "For live events, confirm whether a technician stays for the full show." },
    ],
  },
  useCases: {
    heading: "Typical LED screen requests",
    items: [
      { title: "Conference stage", desc: "A central LED wall for slides with two side screens for a large delegate room." },
      { title: "Awards night backdrop", desc: "A full-width stage wall running nominee videos and branded loops on cue." },
      { title: "Exhibition stand", desc: "A video wall integrated into a stand build for product content across show days." },
      { title: "Outdoor activation", desc: "A high-brightness screen for a daytime or evening outdoor brand event." },
    ],
  },
  feature: {
    image: "/services/premium_corporate_summit_hero.webp",
    alt: "LED stage backdrop at a corporate summit with lounge seating for guests",
    caption: "LED backdrops sized to the stage and the room",
  },
  riyadh: {
    heading: "LED screens for Riyadh venues",
    paragraphs: [
      "Riyadh's hotel ballrooms, conference centres and exhibition halls each have their own rules on rigging points, power and build windows — and outdoor sites add heat and daylight to the brief. These are the details SEM checks before options are requested.",
      "LED screens are rarely booked alone. SEM can coordinate stage, lighting and sound with the same production partners so the setup works as one system.",
    ],
    links: [
      { label: "Event services in Riyadh", href: "/locations/riyadh" },
      { label: "Event production cost guide", href: "/blog/event-production-cost-guide-saudi-arabia-2026" },
    ],
  },
  faqs: [
    { q: "Does SEM own the LED screens?", a: "No. SEM is a coordination platform. LED screens are supplied, installed and operated by Saudi-based LED and event production partners selected for your event. SEM handles the enquiry, options, quotation and coordination." },
    { q: "How big should my LED screen be?", a: "It depends on the room, stage width and how far the furthest guests sit. Share your venue and audience size and SEM will request a specification that suits the space." },
    { q: "What pixel pitch do I need?", a: "Closer viewing needs a finer pixel pitch; distant or outdoor viewing can use a coarser one. A common rule of thumb is that the minimum comfortable viewing distance in metres is roughly the pixel pitch in millimetres. The partner confirms the right pitch for your room." },
    { q: "Can LED screens be used outdoors in Riyadh?", a: "Yes, with outdoor-rated, higher-brightness panels and a suitable structure. Heat, wind, power and the event time of day are all factored into the specification." },
    { q: "Is installation and dismantling included?", a: "Quotations normally cover delivery, installation, testing and dismantling. Each quotation states exactly what is included." },
    { q: "Can someone operate the content during the event?", a: "Yes, where required. Ask for a technician or operator for playback and switching during your show — it is listed in the quotation." },
    { q: "How much does LED screen rental cost in Riyadh?", a: "Cost depends on size, pixel pitch, indoor or outdoor use, structure, operation and hire duration. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
    { q: "Can you also arrange stage, sound and lighting?", a: "Yes. SEM can coordinate LED screens with staging, sound and lighting under one enquiry so the production works together." },
  ],
  related: [
    { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage, rigging and full technical production." },
    { title: "Sound & Audio", href: "/services/sound-audio", desc: "Speech and music audio for your event." },
    { title: "Exhibitions", href: "/services/exhibitions", desc: "Exhibition and stand coordination." },
    { title: "Conferences", href: "/services/conferences", desc: "Conference coordination in Saudi Arabia." },
    { title: "Corporate Events", href: "/services/corporate-events", desc: "Galas, awards and launches." },
    { title: "Event Catering", href: "/services/event-catering", desc: "Corporate, wedding and private catering." },
  ],
  form: {
    heading: "Request LED screen options",
    subheading: "Share the venue and screen requirement. SEM reviews the technical brief, checks suitable partners and comes back with options and next steps.",
    submitLabel: "Get LED Screen Options",
    serviceOptions: [
      "LED Screen / LED Wall Rental",
      "Indoor LED Screen",
      "Outdoor LED Screen",
      "Stage LED Backdrop",
      "Exhibition LED Screen",
      "LED + Stage, Sound & Lighting",
      "Not sure — please advise",
    ],
    eventTypeOptions: ["Conference / Seminar", "Corporate Gala / Awards", "Exhibition / Trade Show", "Product Launch / Activation", "Wedding", "Concert / Entertainment", "Other"],
    guestCountLabel: "Audience Size",
    messagePlaceholder: "Stage layout, content you'll show, build/show timings, anything the venue has told you about rigging or power...",
    fields: [
      { name: "setting", label: "Indoor or outdoor", type: "select", options: ["Indoor", "Outdoor", "Both"] },
      { name: "screenSize", label: "Approximate screen size", type: "text", placeholder: "e.g. 6m × 3m, or 'full stage width'" },
      { name: "placement", label: "Screen placement", type: "select", options: ["Main stage backdrop", "Side / IMAG screens", "Exhibition stand", "Standalone screen", "Not sure"] },
      { name: "content", label: "Content type", type: "select", options: ["Slides / presentations", "Video playback", "Live camera feed", "Mixed", "Not sure"] },
      { name: "operator", label: "Operator during event?", type: "select", options: ["Yes", "No", "Not sure"] },
    ],
    whatsappText: "Hi SEM, I need LED screen options for an event in Riyadh.",
  },
};

/* ───────────────────────────── SOUND & AUDIO ────────────────────────────── */

const soundAudio: ServiceCategory = {
  slug: "sound-audio",
  source: "sound_audio_page",
  name: "Sound & Audio",
  serviceType: "Event Sound System Coordination",
  meta: {
    title: "Event Sound System Rental Riyadh | Conference, Wedding & Stage Audio | SEM",
    description:
      "Sound system, speakers and microphones for events in Riyadh. Tell SEM your venue, guest count and whether it's speech, music or both — we coordinate suitable Saudi-based audio partners and technicians.",
    keywords: [
      "sound system rental Riyadh",
      "event sound system Riyadh",
      "speaker rental Riyadh",
      "microphone rental Riyadh",
      "conference audio Riyadh",
      "wedding sound system Riyadh",
      "تأجير نظام صوت الرياض",
    ],
    ogImageAlt: "Event stage with line-array speakers, lighting truss and an audio mixing desk",
  },
  hero: {
    badge: "Sound & Audio · Riyadh",
    title: "Event Sound & Audio",
    highlight: "Solutions in Riyadh",
    subtitle:
      "Tell us your venue, guest count, event date and audio requirements — speech, music or both. SEM coordinates suitable Saudi-based event production partners and requests sound options for your event.",
    image: "/services/event_production_stage_riyadh.webp",
    imageAlt: "Event stage with hanging line-array speakers, lighting truss and an engineer at an audio mixing desk in a Riyadh auditorium",
  },
  answer: {
    question: "How do I arrange a sound system for an event in Riyadh?",
    answer:
      "Tell SEM the venue, indoor or outdoor setting, guest count, event date and whether the audio is for speech, music or both, plus how many microphones you need. SEM — an event-services coordination platform — matches the brief with suitable Saudi-based audio and production partners, requests options including speakers, microphones, mixing and a technician, and presents them in one quotation. The selected partner supplies, sets up and runs the system.",
  },
  intro: [
    "Guests forgive a lot at an event, but not sound they cannot hear. A system that works for a background playlist will not carry a keynote across a ballroom, and a conference setup will not do justice to a live band.",
    "SEM does not own audio equipment. We qualify what your event actually needs — speech clarity, music, microphones, monitoring — and request options from Saudi-based audio and production partners, with a technician wherever the setup calls for one.",
  ],
  scope: {
    heading: "What SEM can coordinate",
    lead: "Audio requirements are matched to partners based on venue, audience and programme. Typical scope includes:",
    items: [
      { title: "PA & speaker systems", desc: "Speaker systems sized to the room or outdoor area, from compact setups to larger arrays." },
      { title: "Microphones", desc: "Wireless handheld, lapel and headset microphones, lectern and table microphones for panels." },
      { title: "Mixing & playback", desc: "Mixing desk, playback for walk-in music and video audio, and audio feeds to cameras or streams." },
      { title: "Stage monitoring", desc: "Monitor speakers or in-ear systems so presenters and performers can hear themselves." },
      { title: "Sound technician", desc: "An audio engineer to set up, sound-check and run the system during the event." },
      { title: "Setup, testing & dismantling", desc: "Delivery, installation and sound check before doors, then de-rig after the event." },
    ],
  },
  subServices: {
    heading: "Audio services covered on this page",
    lead: "One enquiry covers all of these. Tell us how the event runs and SEM requests the right setup.",
    items: [
      { title: "Sound System Rental", desc: "Complete event PA systems with setup and technician." },
      { title: "Speaker Rental", desc: "Speakers for background music, announcements or additional zones." },
      { title: "Microphone Rental", desc: "Handheld, lapel, headset and lectern microphones." },
      { title: "Wireless Microphone Systems", desc: "Multi-channel wireless setups for panels and presenters." },
      { title: "Conference Audio", desc: "Clear speech reinforcement, panel microphones and recording feeds." },
      { title: "Stage Audio", desc: "Front-of-house and monitoring for stage programmes." },
      { title: "Corporate Event Sound", desc: "Galas, awards and launches mixing speeches with music." },
      { title: "Wedding Sound", desc: "Audio for receptions, zaffa entrances and separate halls." },
      { title: "Exhibition Audio", desc: "Stand audio, presentation microphones and controlled sound levels." },
      { title: "DJ & Performance Audio", desc: "Systems for DJs and live performers, with monitoring." },
    ],
  },
  eventTypes: {
    heading: "Events we coordinate audio for",
    items: [
      { title: "Conferences & seminars", desc: "Keynotes, panels, Q&A microphones and recording feeds.", href: "/services/conferences" },
      { title: "Corporate galas & awards", desc: "Speeches, award announcements and music in one programme.", href: "/services/corporate-events" },
      { title: "Weddings", desc: "Reception audio, entrances and music for each hall.", href: "/services/weddings" },
      { title: "Live entertainment", desc: "Bands, DJs and performers needing stage and monitor audio.", href: "/services/entertainment" },
      { title: "Exhibitions", desc: "Stand presentations and demonstration audio.", href: "/services/exhibitions" },
      { title: "Cultural & seasonal events", desc: "Outdoor gatherings and community celebrations.", href: "/services/cultural-events" },
    ],
  },
  process: [
    { title: "Share your requirement", desc: "Venue, guest count, date, speech/music/both and number of microphones." },
    { title: "Audio qualification", desc: "SEM checks room size, indoor/outdoor, stage programme, power and any performers." },
    { title: "Partner matching", desc: "We request options from suitable Saudi-based audio and production partners for your date." },
    { title: "Options & quotation", desc: "You receive a quotation covering equipment, technician, setup, sound check and dismantling." },
    { title: "Sound check & event", desc: "After confirmation, SEM coordinates setup times and the sound check before doors open." },
  ],
  quoteFactors: {
    heading: "What affects a sound system quotation",
    lead: "Audio cost depends on the room, the programme and how long the system is needed:",
    items: [
      { title: "Venue size & guest count", desc: "Bigger rooms and audiences need more coverage." },
      { title: "Indoor or outdoor", desc: "Outdoor sound needs more power and coverage, with no walls to help." },
      { title: "Speech, music or both", desc: "Live music and DJs need fuller systems than speech-only events." },
      { title: "Number of microphones", desc: "Each wireless channel, lapel or panel microphone adds to the setup." },
      { title: "Stage & monitoring", desc: "Performers and presenters on stage may need monitor speakers." },
      { title: "Technician time", desc: "Setup, sound check, show hours and de-rig." },
      { title: "Duration & access", desc: "Multi-day events, venue access windows and power arrangements." },
    ],
  },
  clientChecklist: [
    "Venue name, hall, or outdoor site",
    "Indoor or outdoor",
    "Guest count",
    "Speech, music, or both",
    "Number and type of microphones",
    "Stage programme: speakers, panel, band or DJ",
    "Event date and running times",
    "Whether you need recording or a feed for streaming",
  ],
  coordination: {
    heading: "How partner coordination works",
    paragraphs: [
      "SEM operates as a remote coordination platform. We do not own speakers, microphones or mixing desks; audio is supplied, installed and operated by Saudi-based event production partners selected for your event.",
      "We qualify the brief, request suitable options, present them clearly in one quotation and keep communication in one place. Availability and pricing depend on the partner, date, venue and final setup, and are confirmed in writing before you book.",
    ],
  },
  quality: {
    heading: "Quality and control considerations",
    items: [
      { title: "Setup listed in writing", desc: "Speakers, microphones, monitoring and technician time are shown in the quotation." },
      { title: "Sound check before doors", desc: "Build in time for a proper sound check with presenters or performers." },
      { title: "Spare microphones", desc: "For panels and Q&A, ask for spare microphones and batteries to be included." },
      { title: "Venue sound rules", desc: "Some venues have volume limits or in-house AV requirements — checked before confirmation." },
    ],
  },
  useCases: {
    heading: "Typical sound requests",
    items: [
      { title: "Conference with panel", desc: "Speech system, lectern microphone, four panel microphones and two roaming Q&A microphones with a technician." },
      { title: "Gala dinner", desc: "Speeches, award walk-up music and a dinner playlist, with a technician on the night." },
      { title: "Wedding reception", desc: "Entrance music and DJ audio, with sound planned for each hall." },
      { title: "Outdoor gathering", desc: "A system with outdoor coverage, power planning and weather considerations." },
    ],
  },
  feature: {
    image: "/services/live_band_musicians_saudi.webp",
    alt: "Live oud, violin and keyboard trio performing on a stage with floor monitors at an evening event",
    caption: "Speech, music or both — the setup follows the programme",
  },
  riyadh: {
    heading: "Event audio for Riyadh venues",
    paragraphs: [
      "In Riyadh, many hotel ballrooms and conference centres have in-house AV teams or approved suppliers, while private halls and outdoor venues usually need audio brought in. SEM checks venue rules first so options are realistic.",
      "Audio is usually part of a wider production. SEM can coordinate sound together with LED screens, lighting and staging so one partner team runs the technical side.",
    ],
    links: [
      { label: "Event services in Riyadh", href: "/locations/riyadh" },
      { label: "Event production in Riyadh", href: "/services/event-production-riyadh" },
    ],
  },
  faqs: [
    { q: "Does SEM own the sound equipment?", a: "No. SEM is a coordination platform. Sound systems are supplied, set up and operated by Saudi-based event production partners selected for your event. SEM manages the enquiry, options, quotation and coordination." },
    { q: "What size sound system do I need?", a: "It depends on the venue, guest count, indoor or outdoor setting and whether you need speech, music or both. Share these details and SEM will request a setup that fits." },
    { q: "Is a sound technician included?", a: "For most events a technician is recommended and can be included. The quotation shows technician hours for setup, sound check and the event." },
    { q: "Can I rent only microphones or speakers?", a: "Yes, where a partner offers it. Smaller requests such as extra microphones or speakers for an existing setup can be checked." },
    { q: "Do you provide audio for weddings?", a: "Yes. SEM can coordinate wedding audio for receptions, entrances and DJ or live music, including separate halls where needed." },
    { q: "Can sound be arranged for outdoor events?", a: "Yes. Outdoor events need more coverage and power planning; include the site, guest count and event time in your enquiry." },
    { q: "How much does a sound system cost for an event in Riyadh?", a: "Cost depends on the venue, guest count, setup, microphones, technician time and duration. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
    { q: "Can you also arrange a DJ or live band?", a: "Yes. SEM coordinates entertainment as well, so performers and their audio requirements can be planned together." },
  ],
  related: [
    { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage, rigging and full technical production." },
    { title: "LED Screens", href: "/services/led-screens", desc: "LED walls and screens for stages and exhibitions." },
    { title: "Entertainment", href: "/services/entertainment", desc: "DJs, live bands and performers." },
    { title: "Conferences", href: "/services/conferences", desc: "Conference coordination in Saudi Arabia." },
    { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and reception coordination." },
    { title: "Event Catering", href: "/services/event-catering", desc: "Corporate, wedding and private catering." },
  ],
  form: {
    heading: "Request sound system options",
    subheading: "Share the venue and programme. SEM reviews the audio brief, checks suitable partners and comes back with options and next steps.",
    submitLabel: "Get Sound Options",
    serviceOptions: [
      "Full Sound System (PA)",
      "Microphones Only",
      "Speakers Only",
      "Conference Audio",
      "Wedding Sound",
      "DJ / Live Performance Audio",
      "Sound + LED, Lighting & Stage",
      "Not sure — please advise",
    ],
    eventTypeOptions: ["Conference / Seminar", "Corporate Gala / Awards", "Wedding", "Concert / Live Entertainment", "Exhibition", "Outdoor / Community Event", "Other"],
    guestCountLabel: "Guest Count",
    messagePlaceholder: "Programme outline, number of speakers or performers, venue AV rules you know of, timings...",
    fields: [
      { name: "setting", label: "Indoor or outdoor", type: "select", options: ["Indoor", "Outdoor", "Both"] },
      { name: "audioUse", label: "Speech, music or both", type: "select", options: ["Speech", "Music", "Both"] },
      { name: "mics", label: "Microphones required", type: "select", options: ["None", "1–2", "3–5", "6–10", "More than 10", "Not sure"] },
      { name: "stage", label: "Stage programme?", type: "select", options: ["Yes — presenters/panel", "Yes — performers", "No stage", "Not sure"] },
      { name: "performance", label: "DJ or live performance?", type: "select", options: ["DJ", "Live band / musicians", "Both", "No"], showFor: ["Full Sound System (PA)", "Wedding Sound", "DJ / Live Performance Audio", "Sound + LED, Lighting & Stage", "Not sure — please advise"] },
    ],
    whatsappText: "Hi SEM, I need a sound system for an event in Riyadh.",
  },
};

export const SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  [eventCatering.slug]: eventCatering,
  [ledScreens.slug]: ledScreens,
  [soundAudio.slug]: soundAudio,
};

export function getServiceCategory(slug: string): ServiceCategory {
  const c = SERVICE_CATEGORIES[slug];
  if (!c) throw new Error(`Unknown service category: ${slug}`);
  return c;
}
