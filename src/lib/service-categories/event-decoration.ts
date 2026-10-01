import type { ServiceCategory } from "./types";

export const eventDecoration: ServiceCategory = {
  slug: "event-decoration",
  source: "event_decoration_page",
  serviceType: "Event Decoration & Styling Coordination",
  meta: {
    title: "Event Decoration Riyadh | Wedding, Corporate & Stage Décor and Furniture | SEM",
    description:
      "Wedding décor, stage backdrops, floral styling, table styling and event furniture in Riyadh. Share your venue, theme and guest count — SEM coordinates suitable Saudi-based décor and styling partners.",
    keywords: [
      "event decoration Riyadh",
      "wedding decoration Riyadh",
      "stage decoration Riyadh",
      "event furniture rental Riyadh",
      "floral styling events Riyadh",
      "corporate event decor Saudi Arabia",
      "تنسيق وتزيين الحفلات الرياض",
    ],
    ogImageAlt: "Styled outdoor event lounge with sofas, floral arrangements, lanterns and decorative wall lighting",
  },
  en: {
    name: "Event Decoration",
    hero: {
      badge: "Event Décor & Styling · Riyadh",
      title: "Event Decoration & Styling",
      highlight: "in Riyadh",
      subtitle:
        "Tell us your venue, theme, colours and guest count. SEM coordinates suitable Saudi-based décor, floral and furniture partners and requests styling options for your wedding, corporate or private event.",
      image: "/saudi_event_decor_2026.webp",
      imageAlt: "Styled event lounge with cream sofas, floral arrangements, lanterns and patterned wall lighting at dusk",
    },
    snapshot: [
      { label: "Service type", value: "Décor & styling" },
      { label: "Best for", value: "Weddings · Corporate · Private" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Design & guest-count based" },
    ],
    answer: {
      question: "What does event decoration in Riyadh include?",
      answer:
        "Event decoration covers the visual design of your event: stage and backdrop décor, floral styling, table styling, entrance décor, themed elements and event furniture such as lounges and seating. With SEM, you share the venue, theme, colours and guest count; SEM requests concepts and pricing from suitable Saudi-based décor and styling partners and presents them in one quotation. The selected partner produces, installs and removes the décor.",
    },
    intro: [
      "Décor is what guests photograph and remember — and it has to work with the venue, the lighting and the guest flow, not just look good on a mood board.",
      "SEM does not run a décor workshop or furniture warehouse. We qualify your theme, venue and scale, then request concepts from Saudi-based décor, floral and furniture partners whose style and availability suit your date.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Décor requests are matched to partners on style, scale and venue:",
      items: [
        { icon: "frame", title: "Stage & backdrops", desc: "Kosha and stage designs, branded backdrops and photo walls." },
        { icon: "flower", title: "Floral styling", desc: "Centrepieces, arches, aisle and stage florals in your palette." },
        { icon: "utensils", title: "Table styling", desc: "Linens, charger plates, centrepieces and place settings." },
        { icon: "door", title: "Entrance décor", desc: "Welcome arches, walkways and arrival styling." },
        { icon: "sofa", title: "Event furniture", desc: "Lounges, majlis seating, tables, chairs and VIP furniture where partners supply them." },
        { icon: "truck", title: "Install & removal", desc: "Build and strike scheduled around venue access windows." },
      ],
    },
    subServices: {
      heading: "Décor & styling services",
      lead: "One enquiry covers all of these. Share your theme and references and SEM requests matching concepts.",
      items: [
        { title: "Wedding Decoration", desc: "Kosha stages, aisles, florals and reception styling.", useCase: "Receptions, engagements, henna nights", image: "/riyadh_luxury_reception_people.webp", imageAlt: "Ballroom wedding stage with floral arches, gold seating and dressed banquet tables", href: "/services/weddings" },
        { title: "Floral Styling", desc: "Fresh and premium floral arrangements for tables and stages.", useCase: "Weddings, galas, VIP dinners", image: "/services/gala_decor_saudi.webp", imageAlt: "Gold urn with white roses, lilies and hydrangea on a candlelit dinner table" },
        { title: "Table Styling", desc: "Linens, chargers, centrepieces and place settings.", useCase: "Seated dinners and receptions", image: "/services/luxury_wedding_table_setting.webp", imageAlt: "Round table set with gold charger plates, folded napkins and a rose centrepiece" },
        { title: "Majlis & Lounge Styling", desc: "Majlis seating, lounges and VIP areas styled for hospitality.", useCase: "VIP receptions, Ramadan, Eid", image: "/services/vip_private_event_saudi.webp", imageAlt: "Majlis lounge with cream sofas, floral arrangements and Arabic coffee service" },
        { icon: "building", title: "Corporate Decoration", desc: "Brand-led styling for galas, launches and conferences.", href: "/services/corporate-events" },
        { icon: "frame", title: "Stage Decoration & Backdrops", desc: "Backdrops, photo walls and stage dressing.", href: "/services/event-production" },
        { icon: "door", title: "Entrance Decoration", desc: "Arrival arches, walkways and welcome areas." },
        { icon: "crown", title: "Luxury Event Styling", desc: "Full-room concepts for high-end events.", href: "/services/luxury-vip-events" },
        { icon: "palette", title: "Themed Event Décor", desc: "National Day, Ramadan, cultural and custom themes.", href: "/services/cultural-events" },
        { icon: "sofa", title: "Event Furniture", desc: "Lounge sets, tables, chairs, podiums and registration counters on request." },
      ],
    },
    flow: {
      heading: "How a décor brief becomes a concept",
      lead: "Partners shape the concept from these five inputs.",
      steps: [
        { label: "Event type", detail: "Wedding, gala, launch or private" },
        { label: "Venue", detail: "Size, existing finishes, access" },
        { label: "Theme & colours", detail: "Mood board and references" },
        { label: "Guest count", detail: "Tables, seating and scale" },
        { label: "Concept & quote", detail: "Elements, florals, furniture" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Weddings & engagements", desc: "Stages, florals and reception styling.", href: "/services/weddings" },
        { title: "Corporate galas", desc: "Brand-led room and stage styling.", href: "/services/corporate-events" },
        { title: "Product launches", desc: "Reveal stages and photo moments." },
        { title: "VIP & majlis events", desc: "Lounge and hospitality styling.", href: "/services/luxury-vip-events" },
        { title: "Cultural & seasonal events", desc: "Ramadan, Eid and National Day themes.", href: "/services/cultural-events" },
        { title: "Private celebrations", desc: "Birthdays and family gatherings.", href: "/services/birthday-party" },
      ],
    },
    process: {
      heading: "How décor coordination works",
      items: [
        { title: "Share your theme", desc: "Venue, date, guest count, colours and reference images." },
        { title: "Brief qualification", desc: "Venue rules, access times and what's already in the room." },
        { title: "Partner matching", desc: "Décor and floral partners whose style fits your brief." },
        { title: "Concepts & quotation", desc: "Concepts with itemised elements in one SEM quotation." },
        { title: "Install & strike", desc: "Build and removal coordinated with the venue." },
      ],
    },
    quoteFactors: {
      heading: "What affects event decoration pricing?",
      lead: "Décor cost depends on design and scale:",
      items: [
        { title: "Scale & guest count", desc: "Number of tables, seating areas and room size." },
        { title: "Florals", desc: "Fresh vs. premium artificial, varieties and volume." },
        { title: "Stage & backdrop", desc: "Size, custom fabrication and finishes." },
        { title: "Furniture", desc: "Lounge sets, VIP seating and specialty pieces." },
        { title: "Custom elements", desc: "Branded, printed or built-to-order pieces." },
        { title: "Install time", desc: "Venue access windows and overnight builds." },
        { title: "Date & season", desc: "Peak wedding seasons affect availability." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a décor quote?",
      items: [
        "Event type and date",
        "Venue name and hall",
        "Guest count and table layout",
        "Theme, colours and reference images",
        "Areas to style: stage, entrance, tables, lounge",
        "Furniture needs, if any",
        "Venue access and build times",
        "Budget range, if you have one",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. We do not own décor stock, florals or furniture; décor is designed, produced, installed and removed by Saudi-based décor, floral and furniture partners selected for your event.",
        "SEM qualifies the brief, requests concepts, presents them in one quotation and keeps communication in one place. Availability and pricing depend on the partner, date, venue and final design, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "Itemised concept", desc: "Each element — florals, backdrop, furniture — is listed in the quotation." },
        { title: "Venue rules", desc: "Fixings, open flames and access times are checked with the venue." },
        { title: "Lighting fit", desc: "Décor is planned with lighting so it reads as intended." },
        { title: "Strike time", desc: "Removal is scheduled so venue handback is on time." },
      ],
    },
    useCases: {
      heading: "Typical décor requests",
      items: [
        { title: "Wedding reception", desc: "A floral kosha stage, entrance arch and styled tables for each hall." },
        { title: "Corporate gala", desc: "Brand-colour table styling, a stage backdrop and a photo wall." },
        { title: "VIP majlis evening", desc: "Lounge seating, florals and Arabic coffee styling." },
        { title: "Themed celebration", desc: "Ramadan or National Day décor for an office or venue." },
      ],
    },
    feature: {
      image: "/services/vip_private_event_saudi.webp",
      alt: "Majlis-style lounge with cream sofas, large floral arrangements and a host serving Arabic coffee",
      caption: "Representative setup — majlis lounge and floral styling",
    },
    riyadh: {
      heading: "Event décor across Riyadh",
      paragraphs: [
        "Riyadh décor briefs range from hotel ballroom weddings to corporate galas and private majlis evenings. Venue access times and fixing rules differ widely, so SEM checks them before concepts are requested.",
        "Décor is best planned with lighting and the stage. SEM can coordinate both, plus catering and entertainment, under one enquiry.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "2026 event décor trends", href: "/blog/2026-exceptional-event-decor-trends-saudi-arabia" },
      ],
    },
    faqs: [
      { q: "Does SEM make the décor itself?", a: "No. SEM is a coordination platform. Décor, florals and furniture are produced and installed by Saudi-based partners selected for your event. SEM manages the brief, concepts, quotation and coordination." },
      { q: "Can you provide event furniture as well?", a: "Yes, where décor and furniture partners supply it — lounge sets, majlis seating, tables, chairs, podiums and registration counters can be included in the same enquiry." },
      { q: "Can décor match our wedding or brand colours?", a: "Yes. Share colours and reference images and partners propose concepts in that palette." },
      { q: "Do you offer fresh flowers?", a: "Fresh and premium artificial florals are both possible depending on the partner, season and budget. The quotation states which is used." },
      { q: "How much does event decoration cost in Riyadh?", a: "Cost depends on scale, florals, stage and backdrop design, furniture and install time. SEM does not publish fixed prices; you receive a specific quotation once the concept is agreed." },
      { q: "How early should décor be booked?", a: "As early as possible for weddings and peak seasons, so partners have time for concepts, sourcing and any custom builds." },
      { q: "Can décor be combined with lighting and catering?", a: "Yes. SEM can coordinate décor with lighting, staging, catering and entertainment in one enquiry." },
    ],
    related: [
      { title: "Event Lighting", href: "/services/event-lighting", desc: "Lighting that brings décor to life.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "Event Catering", href: "/services/event-catering", desc: "Catering for styled dinners and receptions.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "Weddings", href: "/services/weddings", desc: "Wedding planning and coordination.", image: "/services/luxury_wedding_table_setting.webp" },
      { title: "Entertainment", href: "/services/entertainment", desc: "Live music and performers.", image: "/services/live_band_musicians_saudi.webp" },
    ],
    form: {
      heading: "Request décor options",
      subheading: "Share your venue, theme and guest count. SEM reviews the brief, checks suitable partners and comes back with concepts and next steps.",
      submitLabel: "Get Décor Options",
      serviceOptions: [
        "Wedding Decoration",
        "Corporate Decoration",
        "Stage Decoration / Backdrop",
        "Floral Styling",
        "Table Styling",
        "Entrance Decoration",
        "Majlis / Lounge Styling",
        "Event Furniture",
        "Themed Event Décor",
        "Not sure — please advise",
      ],
      eventTypeOptions: ["Wedding / Engagement", "Corporate Gala / Awards", "Product Launch", "VIP / Majlis Event", "Cultural / Seasonal Event", "Private Celebration", "Other"],
      guestCountLabel: "Guest Count",
      messagePlaceholder: "Theme, colours, areas to style, links to reference images, venue rules you know of...",
      fields: [
        { name: "theme", label: "Theme / colours", type: "text", placeholder: "e.g. ivory & gold, brand colours" },
        { name: "areas", label: "Areas to style", type: "select", options: ["Full venue", "Stage / backdrop only", "Tables only", "Entrance only", "Lounge / majlis", "Not sure"] },
        { name: "florals", label: "Florals", type: "select", options: ["Fresh flowers", "Premium artificial", "Either", "No florals"] },
        { name: "furniture", label: "Furniture needed?", type: "select", options: ["Yes — lounges / majlis", "Yes — tables & chairs", "Both", "No"] },
      ],
      whatsappText: "Hi SEM, I'd like décor options for an event in Riyadh.",
    },
  },
};
