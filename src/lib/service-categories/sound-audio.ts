import type { ServiceCategory } from "./types";

export const soundAudio: ServiceCategory = {
  slug: "sound-audio",
  source: "sound_audio_page",
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
  en: {
    name: "Sound & Audio",
    hero: {
      badge: "Sound & Audio · Riyadh",
      title: "Event Sound & Audio",
      highlight: "Solutions in Riyadh",
      subtitle:
        "Tell us your venue, guest count, event date and audio requirements — speech, music or both. SEM coordinates suitable Saudi-based event production partners and requests sound options for your event.",
      image: "/services/event_production_stage_riyadh.webp",
      imageAlt: "Event stage with hanging line-array speakers, lighting truss and an engineer at an audio mixing desk in a Riyadh auditorium",
    },
    snapshot: [
      { label: "Service type", value: "Technical production" },
      { label: "Best for", value: "Conferences · Weddings · Live shows" },
      { label: "Location", value: "Riyadh & major Saudi cities" },
      { label: "Quote", value: "Requirement-based" },
    ],
    answer: {
      question: "How do I arrange a sound system for an event in Riyadh?",
      answer:
        "Tell SEM the venue, indoor or outdoor setting, guest count, event date and whether the audio is for speech, music or both, plus how many microphones you need. SEM — an event-services coordination platform — matches the brief with suitable Saudi-based audio and production partners, requests options including speakers, microphones, mixing and a technician, and presents them in one quotation. The selected partner supplies, sets up and runs the system.",
    },
    intro: [
      "Guests forgive a lot at an event, but not sound they cannot hear. A system that works for a background playlist will not carry a keynote across a ballroom, and a conference setup will not do justice to a live band.",
      "SEM does not own audio equipment. We qualify what your event actually needs — speech clarity, music, microphones, monitoring — and request options from Saudi-based audio and production partners, with a technician wherever the setup calls for one.",
    ],
    capabilities: {
      heading: "What SEM can coordinate",
      lead: "Audio requirements are matched to partners on venue, audience and programme:",
      items: [
        { icon: "speaker", title: "PA & speaker systems", desc: "Speaker systems sized to the room or outdoor area, from compact setups to line arrays." },
        { icon: "mic", title: "Microphones", desc: "Wireless handheld, lapel and headset microphones, lectern and table mics for panels." },
        { icon: "sliders", title: "Mixing & playback", desc: "Mixing desk, walk-in music and video audio, and feeds to cameras or streams." },
        { icon: "headphones", title: "Stage monitoring", desc: "Monitor speakers or in-ear systems so presenters and performers hear themselves." },
        { icon: "users", title: "Sound technician", desc: "An audio engineer to set up, sound-check and run the system during the event." },
        { icon: "truck", title: "Setup & dismantle", desc: "Delivery, installation and sound check before doors, then de-rig after the event." },
      ],
    },
    subServices: {
      heading: "Sound & audio solutions",
      lead: "One enquiry covers all of these. Tell us how the event runs and SEM requests the right setup.",
      items: [
        { title: "Conference Audio", desc: "Clear speech reinforcement, panel microphones and recording feeds.", useCase: "Keynotes, panels, Q&A", image: "/services/premium_conference_management_hero.webp", imageAlt: "Large conference hall with a speaker on stage and full delegate seating", href: "/services/conferences" },
        { title: "Wedding & Live Music Audio", desc: "Reception audio, entrances and live performers with monitoring.", useCase: "Weddings, gala entertainment", image: "/services/live_band_musicians_saudi.webp", imageAlt: "Oud, violin and keyboard trio performing on a stage with speakers and floor monitors", href: "/services/entertainment" },
        { title: "Line Array Systems", desc: "Flown or stacked arrays for large rooms and outdoor audiences.", useCase: "Large galas, concerts, outdoor events", image: "/services/event_production_stage_riyadh.webp", imageAlt: "Line-array speakers flown beside an auditorium stage" },
        { icon: "speaker", title: "Sound System Rental", desc: "Complete event PA systems with setup and technician." },
        { icon: "radio", title: "Speaker Systems", desc: "Speakers for background music, announcements or extra zones." },
        { icon: "mic", title: "Wireless Microphones", desc: "Multi-channel handheld, lapel and headset systems." },
        { icon: "users", title: "Conference Microphones", desc: "Lectern and table microphones for panels and boardrooms." },
        { icon: "headphones", title: "Stage Audio", desc: "Front-of-house and monitoring for stage programmes." },
        { icon: "building", title: "Exhibition Audio", desc: "Stand presentations at controlled sound levels.", href: "/services/exhibitions" },
        { icon: "wrench", title: "Technical Audio Support", desc: "Engineers for setup, sound check and show operation." },
      ],
    },
    flow: {
      heading: "How a sound requirement becomes a setup",
      lead: "The partner sizes the system from these five inputs.",
      steps: [
        { label: "Audience", detail: "Guest count and seating layout" },
        { label: "Venue", detail: "Room size, indoor or outdoor" },
        { label: "Speech / music", detail: "Clarity vs. full-range sound" },
        { label: "Microphones", detail: "Number and type of channels" },
        { label: "Speaker setup", detail: "Coverage, monitors, technician" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "Conferences & seminars", desc: "Keynotes, panels, Q&A and recording.", href: "/services/conferences" },
        { title: "Corporate galas & awards", desc: "Speeches and music in one programme.", href: "/services/corporate-events" },
        { title: "Weddings", desc: "Reception audio, entrances and each hall.", href: "/services/weddings" },
        { title: "Live entertainment", desc: "Bands, DJs and performers on stage.", href: "/services/entertainment" },
        { title: "Exhibitions", desc: "Stand presentations and demonstrations.", href: "/services/exhibitions" },
        { title: "Cultural & seasonal events", desc: "Outdoor gatherings and celebrations.", href: "/services/cultural-events" },
      ],
    },
    process: {
      heading: "How sound system coordination works",
      items: [
        { title: "Share your requirement", desc: "Venue, guest count, date, speech/music and microphones." },
        { title: "Audio qualification", desc: "Room size, indoor/outdoor, programme, power and performers." },
        { title: "Partner matching", desc: "Suitable Saudi-based audio partners for your date." },
        { title: "Options & quotation", desc: "Equipment, technician, setup, sound check and de-rig." },
        { title: "Sound check & event", desc: "Setup times and sound check coordinated before doors." },
      ],
    },
    quoteFactors: {
      heading: "What affects sound system pricing?",
      lead: "Audio cost depends on the room, the programme and how long the system is needed:",
      items: [
        { title: "Venue size & guest count", desc: "Bigger rooms and audiences need more coverage." },
        { title: "Indoor or outdoor", desc: "Outdoor sound needs more power and coverage, with no walls to help." },
        { title: "Speech, music or both", desc: "Live music and DJs need fuller systems than speech-only events." },
        { title: "Number of microphones", desc: "Each wireless channel, lapel or panel mic adds to the setup." },
        { title: "Stage & monitoring", desc: "Performers and presenters may need monitor speakers." },
        { title: "Technician time", desc: "Setup, sound check, show hours and de-rig." },
        { title: "Duration & access", desc: "Multi-day events, venue access windows and power." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a sound quote?",
      items: [
        "Venue name, hall, or outdoor site",
        "Indoor or outdoor",
        "Guest count",
        "Speech, music, or both",
        "Number and type of microphones",
        "Stage programme: speakers, panel, band or DJ",
        "Event date and running times",
        "Whether you need recording or a streaming feed",
      ],
    },
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
        { title: "Setup listed in writing", desc: "Speakers, microphones, monitoring and technician time are in the quotation." },
        { title: "Sound check before doors", desc: "Build in time for a proper sound check with presenters or performers." },
        { title: "Spare microphones", desc: "For panels and Q&A, ask for spare mics and batteries to be included." },
        { title: "Venue sound rules", desc: "Volume limits or in-house AV requirements are checked before confirmation." },
      ],
    },
    useCases: {
      heading: "Typical sound requests",
      items: [
        { title: "Conference with panel", desc: "Speech system, lectern mic, four panel mics and two roaming Q&A mics with a technician." },
        { title: "Gala dinner", desc: "Speeches, award walk-up music and a dinner playlist, with a technician on the night." },
        { title: "Wedding reception", desc: "Entrance music and DJ audio, with sound planned for each hall." },
        { title: "Outdoor gathering", desc: "A system with outdoor coverage, power planning and weather considerations." },
      ],
    },
    feature: {
      image: "/services/live_band_musicians_saudi.webp",
      alt: "Live oud, violin and keyboard trio performing on a stage with floor monitors at an evening event",
      caption: "Representative setup — live music with stage monitoring",
    },
    riyadh: {
      heading: "Event audio for Riyadh venues",
      paragraphs: [
        "In Riyadh, many hotel ballrooms and conference centres have in-house AV teams or approved suppliers, while private halls and outdoor venues usually need audio brought in. SEM checks venue rules first so options are realistic.",
        "Audio is usually part of a wider production. SEM can coordinate sound together with LED screens, lighting and staging so one partner team runs the technical side.",
      ],
      links: [
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
        { label: "Event production in Riyadh", href: "/services/event-production-riyadh" },
      ],
    },
    faqs: [
      { q: "Does SEM own the sound equipment?", a: "No. SEM is a coordination platform. Sound systems are supplied, set up and operated by Saudi-based event production partners selected for your event. SEM manages the enquiry, options, quotation and coordination." },
      { q: "What size sound system do I need?", a: "It depends on the venue, guest count, indoor or outdoor setting and whether you need speech, music or both. Share these details and SEM will request a setup that fits." },
      { q: "Is a sound technician included?", a: "For most events a technician is recommended and can be included. The quotation shows technician hours for setup, sound check and the event." },
      { q: "Can I rent only microphones or speakers?", a: "Yes, where a partner offers it. Smaller requests such as extra microphones or speakers for an existing setup can be checked." },
      { q: "Do you provide audio for weddings?", a: "Yes. SEM can coordinate wedding audio for receptions, entrances and DJ or live music, including separate halls where needed." },
      { q: "When is a line array needed?", a: "Line arrays are typically used for larger rooms, long throw distances and outdoor audiences where conventional speakers can't cover evenly. The partner recommends the system type for your venue." },
      { q: "How much does a sound system cost for an event in Riyadh?", a: "Cost depends on the venue, guest count, setup, microphones, technician time and duration. SEM does not publish fixed prices; you receive a specific quotation once the requirement is confirmed." },
      { q: "Can you also arrange a DJ or live band?", a: "Yes. SEM coordinates entertainment as well, so performers and their audio requirements can be planned together." },
    ],
    related: [
      { title: "LED Screens", href: "/services/led-screens", desc: "LED walls and stage screens.", image: "/services/gallery_corporate_gala.webp" },
      { title: "Event Lighting", href: "/services/event-lighting", desc: "Stage, ambient and decorative lighting.", image: "/riyadh_luxury_reception_people.webp" },
      { title: "Event Production & Staging", href: "/services/event-production", desc: "Stage, rigging and technical production.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "Entertainment", href: "/services/entertainment", desc: "DJs, live bands and performers.", image: "/services/live_band_musicians_saudi.webp" },
    ],
    form: {
      heading: "Request sound system options",
      subheading: "Share the venue and programme. SEM reviews the audio brief, checks suitable partners and comes back with options and next steps.",
      submitLabel: "Get Sound Options",
      serviceOptions: [
        "Full Sound System (PA)",
        "Line Array System",
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
        { name: "performance", label: "DJ or live performance?", type: "select", options: ["DJ", "Live band / musicians", "Both", "No"], showFor: ["Full Sound System (PA)", "Line Array System", "Wedding Sound", "DJ / Live Performance Audio", "Sound + LED, Lighting & Stage", "Not sure — please advise"] },
      ],
      whatsappText: "Hi SEM, I need a sound system for an event in Riyadh.",
    },
  },
};
