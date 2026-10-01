import type { ServiceCategory } from "./types";

export const ledScreens: ServiceCategory = {
  slug: "led-screens",
  source: "led_screens_page",
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
  en: {
    name: "LED Screens",
    hero: {
      badge: "LED Screens & Visual Displays · Riyadh",
      title: "LED Screen Solutions",
      highlight: "in Riyadh",
      subtitle:
        "Tell us your venue, indoor or outdoor setting, approximate screen size and what you need to show. SEM coordinates suitable Saudi-based LED and production partners and requests options for your event.",
      image: "/services/gallery_corporate_gala.webp",
      imageAlt: "Wide LED video wall behind a conference stage with a speaker at the lectern and a seated audience in Riyadh",
    },
    snapshot: [
      { label: "Service type", value: "Technical production" },
      { label: "Best for", value: "Conferences · Galas · Exhibitions" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Specification-based" },
    ],
    answer: {
      question: "How do I rent an LED screen for an event in Riyadh?",
      answer:
        "Share your venue, indoor or outdoor setting, approximate screen size or wall dimensions, event date and content type. SEM — an event-services coordination platform — matches the requirement with suitable Saudi-based LED and production partners, requests options including installation, operation and dismantling, and presents them in one quotation. The selected partner supplies and operates the screens.",
    },
    intro: [
      "An LED wall is often the visual centre of a stage, conference or exhibition stand — and one of the easiest items to get wrong. Screen size, pixel pitch, brightness, power and rigging all depend on the venue and on how far your audience sits from the screen.",
      "SEM does not own LED inventory. We qualify your requirement, then request options from Saudi-based LED and event production partners, so the specification you are quoted matches the room, the content and the budget.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "LED requirements are matched to partners on venue, size and technical needs:",
      items: [
        { icon: "monitor", title: "Indoor LED walls", desc: "Modular walls for ballrooms, halls and stages, specified for the room and viewing distance." },
        { icon: "sun", title: "Outdoor LED screens", desc: "Higher-brightness panels for daylight and outdoor venues, with weather and structure planned." },
        { icon: "layers", title: "Stage & side screens", desc: "Main stage walls plus side or IMAG screens so the back of the room can see the speaker." },
        { icon: "play", title: "Content playback", desc: "Media servers or playback laptops, switching and a technician to run content on cue." },
        { icon: "wrench", title: "Structure & rigging", desc: "Ground-stack frames, truss or flown rigging, as appropriate and approved by the venue." },
        { icon: "truck", title: "Install & dismantle", desc: "Delivery, build, testing and de-rig scheduled around venue access windows." },
      ],
    },
    subServices: {
      heading: "LED screen solutions",
      lead: "One enquiry covers all of these. Tell us how the screen will be used and SEM requests the right specification.",
      items: [
        { title: "Stage LED Screens", desc: "Backdrops and side screens integrated with stage, lighting and sound.", useCase: "Galas, concerts, award nights", image: "/services/event_production_stage_riyadh.webp", imageAlt: "Curved LED stage wall with lighting truss above an auditorium stage", href: "/services/event-production" },
        { title: "LED Backdrops", desc: "Branded stage backdrops that frame speakers and panels.", useCase: "Summits, launches, panels", image: "/services/premium_corporate_summit_hero.webp", imageAlt: "LED stage backdrop behind a panel discussion at a corporate summit" },
        { title: "Exhibition LED Screens", desc: "Stand screens and video walls built into exhibition stands.", useCase: "Trade shows, product showcases", icon: "building", href: "/services/exhibitions" },
        { icon: "monitor", title: "LED Video Walls", desc: "Modular walls built to the size your stage or room needs." },
        { icon: "layers", title: "Indoor LED Screens", desc: "Finer pixel pitch for close viewing in halls and ballrooms." },
        { icon: "sun", title: "Outdoor LED Screens", desc: "Brighter panels for outdoor events and daylight use." },
        { icon: "users", title: "Conference LED Screens", desc: "Presentation and speaker-support screens sized for delegates.", href: "/services/conferences" },
        { icon: "zap", title: "Large-Format LED", desc: "Big-format walls for large audiences and outdoor gatherings." },
        { icon: "sparkles", title: "Curved & Creative LED", desc: "Curved, column or shaped layouts where partner inventory allows." },
        { icon: "play", title: "Digital Display Solutions", desc: "Smaller screens for registration, wayfinding and sponsor loops." },
      ],
    },
    flow: {
      heading: "How an LED requirement becomes a specification",
      lead: "The partner's recommendation follows these five inputs.",
      steps: [
        { label: "Event type", detail: "Presentation, show or exhibition" },
        { label: "Audience size", detail: "How many need to see clearly" },
        { label: "Venue", detail: "Indoor/outdoor, rigging, power" },
        { label: "Viewing distance", detail: "Sets pixel pitch and size" },
        { label: "Screen solution", detail: "Size, pitch, structure, operator" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Conferences & summits", desc: "Speaker visibility, slides and live camera feeds.", href: "/services/conferences" },
        { title: "Corporate galas & awards", desc: "Backdrops, nominee videos, sponsor branding.", href: "/services/corporate-events" },
        { title: "Exhibitions & trade shows", desc: "Stand screens that draw visitors.", href: "/services/exhibitions" },
        { title: "Weddings", desc: "Stage backdrops and live feeds to separate halls.", href: "/services/weddings" },
        { title: "Product launches", desc: "Reveal moments and outdoor activations." },
        { title: "Concerts & entertainment", desc: "Stage visuals and audience screens.", href: "/services/entertainment" },
      ],
    },
    process: {
      heading: "How LED screen coordination works",
      items: [
        { title: "Share your requirement", desc: "Venue, indoor/outdoor, approximate size, date and content." },
        { title: "Technical qualification", desc: "Viewing distance, stage layout, power, access and build time." },
        { title: "Partner matching", desc: "Suitable Saudi-based LED partners available on your date." },
        { title: "Options & quotation", desc: "Screens, structure, technician, install and dismantle in one quote." },
        { title: "Build, show & de-rig", desc: "Timings coordinated with partner and venue through to de-rig." },
      ],
    },
    quoteFactors: {
      heading: "What affects LED screen rental pricing?",
      lead: "LED pricing depends on specification and logistics, not a single per-screen rate:",
      items: [
        { title: "Screen size", desc: "Total wall area in square metres is the main driver." },
        { title: "Pixel pitch", desc: "Finer pitch for close viewing costs more than coarser outdoor pitch." },
        { title: "Indoor or outdoor", desc: "Outdoor screens need higher brightness and weather-ready structure." },
        { title: "Structure & rigging", desc: "Ground-stack, truss or flown builds differ in equipment and labour." },
        { title: "Content & operation", desc: "Playback, switching, camera feeds and an operator during the show." },
        { title: "Hire duration", desc: "Build day, show days and de-rig time all count." },
        { title: "Power & access", desc: "Generator needs, loading access and venue build windows." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for an LED quote?",
      items: [
        "Venue name and hall, or outdoor site",
        "Indoor or outdoor",
        "Approximate screen size, or stage width",
        "Audience size and seating distance",
        "Event date, build time and show hours",
        "Content type: slides, video, live camera",
        "Whether you need an operator during the event",
        "Any stage, lighting or sound also required",
      ],
    },
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
        { title: "Venue approval", desc: "Rigging, power and load-in are checked against venue rules before confirmation." },
        { title: "Content testing", desc: "Ask for content to be tested on the screen during build, before doors open." },
        { title: "On-site technician", desc: "For live events, confirm a technician stays for the full show." },
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
      image: "/services/premium_conference_management_hero.webp",
      alt: "Conference auditorium with large LED screens either side of the stage and a full delegate audience",
      caption: "Representative setup — main and side LED screens for a large conference",
    },
    riyadh: {
      heading: "LED screens for Riyadh venues",
      paragraphs: [
        "Riyadh's hotel ballrooms, conference centres and exhibition halls each have their own rules on rigging points, power and build windows — and outdoor sites add heat and daylight to the brief. These are the details SEM checks before options are requested.",
        "LED screens are rarely booked alone. SEM can coordinate stage, lighting and sound with the same production partners so the setup works as one system.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Event production cost guide", href: "/blog/event-production-cost-guide-saudi-arabia-2026" },
      ],
    },
    faqs: [
      { q: "Does SEM own the LED screens?", a: "No. SEM is a coordination platform. LED screens are supplied, installed and operated by Saudi-based LED and event production partners selected for your event. SEM handles the enquiry, options, quotation and coordination." },
      { q: "How big should my LED screen be?", a: "It depends on the room, stage width and how far the furthest guests sit. Share your venue and audience size and SEM will request a specification that suits the space." },
      { q: "What pixel pitch do I need?", a: "Closer viewing needs a finer pixel pitch; distant or outdoor viewing can use a coarser one. A common rule of thumb is that the minimum comfortable viewing distance in metres is roughly the pixel pitch in millimetres. The partner confirms the right pitch for your room." },
      { q: "Can LED screens be used outdoors in Riyadh?", a: "Yes, with outdoor-rated, higher-brightness panels and a suitable structure. Heat, wind, power and the event time of day are factored into the specification." },
      { q: "Is installation and dismantling included?", a: "Quotations normally cover delivery, installation, testing and dismantling. Each quotation states exactly what is included." },
      { q: "Can someone operate the content during the event?", a: "Yes, where required. Ask for a technician or operator for playback and switching — it is listed in the quotation." },
      { q: "How much does LED screen rental cost in Riyadh?", a: "Cost depends on size, pixel pitch, indoor or outdoor use, structure, operation and hire duration. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
      { q: "Can you also arrange stage, sound and lighting?", a: "Yes. SEM can coordinate LED screens with staging, sound and lighting under one enquiry so the production works together." },
    ],
    related: [
      { title: "Sound & Audio", href: "/services/sound-audio", desc: "Speakers, microphones and audio engineers.", image: "/services/event_production_stage_riyadh.webp" },
      { title: "Event Lighting", href: "/services/event-lighting", desc: "Stage, ambient and architectural lighting.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage, rigging and full technical production.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "Exhibitions", href: "/services/exhibitions", desc: "Stand builds with integrated screens." },
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
        "Curved / Creative LED",
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
  },
};
