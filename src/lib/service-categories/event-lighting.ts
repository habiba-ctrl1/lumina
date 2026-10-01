import type { ServiceCategory } from "./types";

export const eventLighting: ServiceCategory = {
  slug: "event-lighting",
  source: "event_lighting_page",
  serviceType: "Event Lighting Coordination",
  meta: {
    title: "Event Lighting Rental Riyadh | Stage, Wedding & Corporate Lighting | SEM",
    description:
      "Stage lighting, ambient uplighting and decorative lighting for events in Riyadh. Share your venue, event type and look — SEM coordinates suitable Saudi-based lighting and production partners.",
    keywords: [
      "event lighting Riyadh",
      "stage lighting rental Riyadh",
      "wedding lighting Riyadh",
      "corporate event lighting Saudi Arabia",
      "moving head lights rental Riyadh",
      "outdoor event lighting Riyadh",
      "إضاءة الحفلات الرياض",
    ],
    ogImageAlt: "Hotel ballroom with warm stage lighting, chandeliers and a decorated stage",
  },
  en: {
    name: "Event Lighting",
    hero: {
      badge: "Event Lighting · Riyadh",
      title: "Event Lighting",
      highlight: "in Riyadh",
      subtitle:
        "Tell us your venue, event type, stage plan and the atmosphere you want. SEM coordinates suitable Saudi-based lighting and production partners and requests lighting options for your event.",
      image: "/riyadh_luxury_reception_people.webp",
      imageAlt: "Hotel ballroom with warm uplighting, crystal chandeliers and a lit floral stage set for a wedding reception",
    },
    snapshot: [
      { label: "Service type", value: "Technical production" },
      { label: "Best for", value: "Weddings · Galas · Stages" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Design & venue-based" },
    ],
    answer: {
      question: "What does event lighting in Riyadh include?",
      answer:
        "Event lighting covers stage lighting for presenters and performers, ambient and architectural lighting that sets the room's mood, decorative lighting, and the control and technicians that run it. With SEM, you share your venue, event type, stage plan and desired look; SEM requests options from suitable Saudi-based lighting and production partners and presents them in one quotation. The selected partner supplies, rigs and operates the lighting.",
    },
    intro: [
      "Lighting decides how a room feels before anyone speaks. The same ballroom can read as a corporate conference, an awards night or a wedding reception depending on colour, intensity and where the light falls.",
      "SEM does not own lighting equipment. We qualify the look and the technical constraints — rigging points, power, stage layout, camera needs — and request options from Saudi-based lighting and production partners whose kit and crew fit your date.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Lighting requirements are matched to partners on venue, stage and the look you want:",
      items: [
        { icon: "spotlight", title: "Stage lighting", desc: "Front light, wash and effects so presenters and performers are clearly lit." },
        { icon: "lightbulb", title: "Ambient & uplighting", desc: "Colour washes on walls and features to set the room's mood." },
        { icon: "building", title: "Architectural lighting", desc: "Façade, column and feature lighting for venues and entrances." },
        { icon: "sparkles", title: "Decorative lighting", desc: "Festoon, candle-effect and themed lighting that works with décor." },
        { icon: "sliders", title: "Lighting control", desc: "Console, programming and an operator to run cues during the show." },
        { icon: "wrench", title: "Rigging & power", desc: "Truss, stands and power distribution approved by the venue." },
      ],
    },
    subServices: {
      heading: "Event lighting solutions",
      lead: "One enquiry covers all of these. Describe the event and the look, and SEM requests a suitable lighting plan.",
      items: [
        { title: "Stage Lighting", desc: "Wash, spot and effect lighting for stage programmes.", useCase: "Conferences, concerts, award shows", image: "/services/event_production_stage_riyadh.webp", imageAlt: "Lighting truss with spotlights and beams over an auditorium stage", href: "/services/event-production" },
        { title: "Wedding Lighting", desc: "Warm uplighting, stage glow and décor lighting for receptions.", useCase: "Receptions, kosha stages, entrances", image: "/riyadh_luxury_reception_people.webp", imageAlt: "Ballroom wedding stage lit with warm light under chandeliers", href: "/services/weddings" },
        { title: "Corporate Event Lighting", desc: "Brand-colour washes and clean stage light for camera.", useCase: "Galas, launches, summits", image: "/services/gallery_corporate_gala.webp", imageAlt: "Conference stage lit with overhead spotlights in front of an LED wall", href: "/services/corporate-events" },
        { icon: "lightbulb", title: "Ambient Lighting", desc: "Room-wide colour and mood lighting." },
        { icon: "building", title: "Architectural Lighting", desc: "Façades, columns and venue features." },
        { icon: "zap", title: "Moving Heads", desc: "Programmable beams and effects for shows and reveals." },
        { icon: "spotlight", title: "Spotlights & Follow Spots", desc: "Key light for speakers, award moments and entrances." },
        { icon: "sparkles", title: "Decorative Lighting", desc: "Festoon, candle-effect and themed fixtures." },
        { icon: "building", title: "Exhibition Lighting", desc: "Stand and product lighting for show floors.", href: "/services/exhibitions" },
        { icon: "sun", title: "Outdoor Event Lighting", desc: "Garden, courtyard and outdoor venue lighting with weather planning." },
      ],
    },
    flow: {
      heading: "How a lighting brief becomes a lighting plan",
      lead: "Partners design lighting from these five inputs.",
      steps: [
        { label: "Event type", detail: "Conference, gala, wedding or show" },
        { label: "Venue", detail: "Ceiling height, rigging, power" },
        { label: "Stage plan", detail: "Size, layout, presenters or acts" },
        { label: "Look & branding", detail: "Colours, mood, camera needs" },
        { label: "Lighting plan", detail: "Fixtures, control, operator" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Weddings", desc: "Reception rooms, stages and entrances.", href: "/services/weddings" },
        { title: "Corporate galas & awards", desc: "Brand colours and award-moment lighting.", href: "/services/corporate-events" },
        { title: "Conferences", desc: "Clean stage light for speakers and cameras.", href: "/services/conferences" },
        { title: "Concerts & entertainment", desc: "Show lighting for performers.", href: "/services/entertainment" },
        { title: "Exhibitions", desc: "Stand and product lighting.", href: "/services/exhibitions" },
        { title: "Outdoor & cultural events", desc: "Gardens, courtyards and heritage venues.", href: "/services/cultural-events" },
      ],
    },
    process: {
      heading: "How event lighting coordination works",
      items: [
        { title: "Share the look", desc: "Venue, event type, stage plan, colours and references." },
        { title: "Technical check", desc: "Rigging points, ceiling height, power and build time." },
        { title: "Partner matching", desc: "Suitable Saudi-based lighting partners for your date." },
        { title: "Options & quotation", desc: "Fixtures, control, crew, install and de-rig in one quote." },
        { title: "Focus & show", desc: "Focus and cue programming coordinated before doors open." },
      ],
    },
    quoteFactors: {
      heading: "What affects event lighting pricing?",
      lead: "Lighting cost follows the design and the venue more than a fixed rate:",
      items: [
        { title: "Room & stage size", desc: "Larger spaces need more fixtures and power." },
        { title: "Fixture types", desc: "Moving heads and effects cost more than static washes." },
        { title: "Rigging", desc: "Truss and flown rigs add equipment and labour." },
        { title: "Control & programming", desc: "Cue programming and a show operator." },
        { title: "Indoor or outdoor", desc: "Outdoor lighting needs weather-rated kit and power planning." },
        { title: "Duration", desc: "Build, rehearsal, show days and de-rig." },
        { title: "Integration", desc: "Coordination with LED, staging and décor teams." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a lighting quote?",
      items: [
        "Venue name and hall, or outdoor site",
        "Event type and date",
        "Stage size and layout, if known",
        "The mood or colours you want (references help)",
        "Whether the event will be filmed or streamed",
        "Build time and show hours",
        "Any LED, sound or décor also required",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM is a remote coordination platform. We do not own lighting fixtures, truss or consoles; lighting is supplied, rigged and operated by Saudi-based lighting and event production partners selected for your event.",
        "SEM qualifies the brief, requests suitable options, presents them in one quotation and keeps communication in one place. Availability and pricing depend on the partner, date, venue and final design, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "Design in writing", desc: "Fixture list, rigging, control and crew are listed in the quotation." },
        { title: "Venue approval", desc: "Rigging points and power are checked against venue rules." },
        { title: "Focus time", desc: "Allow time to focus and program cues before guests arrive." },
        { title: "Camera-friendly light", desc: "If filming, confirm the stage is lit for cameras, not just the room." },
      ],
    },
    useCases: {
      heading: "Typical lighting requests",
      items: [
        { title: "Wedding reception", desc: "Warm uplighting around the hall, a lit stage and soft entrance lighting." },
        { title: "Awards night", desc: "Brand-colour washes, follow spots for winners and effect moments." },
        { title: "Conference stage", desc: "Even front light for speakers plus a clean wash for camera." },
        { title: "Outdoor evening event", desc: "Festoon and architectural lighting for a garden or courtyard." },
      ],
    },
    feature: {
      image: "/saudi_event_decor_2026.webp",
      alt: "Outdoor lounge at a heritage venue with warm architectural wall lighting, chandeliers and lanterns at dusk",
      caption: "Representative setup — architectural and ambient lighting at an outdoor venue",
    },
    riyadh: {
      heading: "Event lighting for Riyadh venues",
      paragraphs: [
        "Riyadh hotel ballrooms usually have fixed rigging points and in-house power rules, while outdoor and heritage venues need weather-rated fixtures and generator planning. SEM checks these constraints before requesting options.",
        "Lighting works best planned alongside the stage, LED screens and décor. SEM can coordinate all of them in one enquiry.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Event production in Riyadh", href: "/services/event-production-riyadh" },
      ],
    },
    faqs: [
      { q: "Does SEM own the lighting equipment?", a: "No. SEM is a coordination platform. Lighting is supplied, rigged and operated by Saudi-based lighting and production partners selected for your event. SEM handles the enquiry, options, quotation and coordination." },
      { q: "What is the difference between stage lighting and ambient lighting?", a: "Stage lighting lights people and performances so they can be seen and filmed. Ambient lighting colours and shapes the room itself to set the mood. Most events need a balance of both." },
      { q: "Do I need moving head lights?", a: "Moving heads suit shows, concerts, award reveals and dance floors. Speech-led events usually need well-focused front light more than effects. The partner recommends what fits your programme." },
      { q: "Can lighting be matched to our brand colours?", a: "Yes. Colour-mixing fixtures can be programmed to brand colours for washes and stage looks. Share brand references in your enquiry." },
      { q: "Is a lighting operator included?", a: "For events with cues — walk-ups, award moments, performances — an operator is recommended and listed in the quotation." },
      { q: "How much does event lighting cost in Riyadh?", a: "Cost depends on room size, fixture types, rigging, control, duration and whether the event is indoors or outdoors. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
      { q: "Can lighting be combined with décor and staging?", a: "Yes. SEM can coordinate lighting with stage, LED screens, sound and décor so the look is designed as one." },
    ],
    related: [
      { title: "LED Screens", href: "/services/led-screens", desc: "LED walls and stage screens.", image: "/services/gallery_corporate_gala.webp" },
      { title: "Sound & Audio", href: "/services/sound-audio", desc: "Speakers, microphones and engineers.", image: "/services/event_production_stage_riyadh.webp" },
      { title: "Event Decoration", href: "/services/event-decoration", desc: "Stage décor, florals and styling.", image: "/saudi_event_decor_2026.webp" },
      { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage, rigging and technical production.", image: "/services/premium_corporate_summit_hero.webp" },
    ],
    form: {
      heading: "Request lighting options",
      subheading: "Share the venue, event and the look you want. SEM reviews the brief, checks suitable partners and comes back with options and next steps.",
      submitLabel: "Get Lighting Options",
      serviceOptions: [
        "Stage Lighting",
        "Wedding Lighting",
        "Corporate Event Lighting",
        "Ambient / Uplighting",
        "Architectural Lighting",
        "Decorative Lighting",
        "Outdoor Event Lighting",
        "Lighting + LED, Sound & Stage",
        "Not sure — please advise",
      ],
      eventTypeOptions: ["Wedding", "Corporate Gala / Awards", "Conference / Seminar", "Concert / Entertainment", "Exhibition", "Outdoor / Cultural Event", "Other"],
      guestCountLabel: "Guest Count",
      messagePlaceholder: "Describe the look and mood, brand colours, stage layout, filming plans, venue rules you know of...",
      fields: [
        { name: "setting", label: "Indoor or outdoor", type: "select", options: ["Indoor", "Outdoor", "Both"] },
        { name: "stage", label: "Stage involved?", type: "select", options: ["Yes", "No", "Not sure"] },
        { name: "look", label: "Desired look", type: "text", placeholder: "e.g. warm gold, brand blue, dramatic show" },
        { name: "filming", label: "Filmed or streamed?", type: "select", options: ["Yes", "No", "Not sure"] },
        { name: "operator", label: "Operator during event?", type: "select", options: ["Yes", "No", "Not sure"] },
      ],
      whatsappText: "Hi SEM, I need event lighting for an event in Riyadh.",
    },
  },
};
