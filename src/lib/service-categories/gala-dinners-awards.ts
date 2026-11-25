import type { ServiceCategory } from "./types";

// Built from GSC demand (Aug–Nov 2026): ~15 "gala dinner / awards ceremony
// company / production" query variants with 4K+ impressions and 0 clicks,
// previously served only by a planning blog post.
export const galaDinnersAwards: ServiceCategory = {
  slug: "gala-dinners-awards",
  source: "gala_awards_page",
  serviceType: "Gala Dinner and Awards Ceremony Event Management",
  meta: {
    title: "Gala Dinner & Awards Ceremony Event Company in Riyadh | SEM",
    description:
      "Plan a corporate gala dinner or awards ceremony in Riyadh or Jeddah. Venue, stage and AV production, catering, trophies, hosts and guest arrival coordinated through vetted Saudi partners. Request a proposal.",
    keywords: [
      "gala dinner event company",
      "awards ceremony event company Saudi Arabia",
      "gala dinner event production Riyadh",
      "awards dinner event planner",
      "corporate gala dinner Riyadh",
      "award ceremony organisers Saudi Arabia",
      "حفل عشاء رسمي الرياض",
      "تنظيم حفلات توزيع الجوائز",
    ],
    ogImageAlt: "Formal gala dinner table with white and gold florals, candles and gold tableware in a ballroom",
  },
  en: {
    name: "Gala Dinners & Awards Ceremonies",
    hero: {
      badge: "Gala Dinners & Awards · Riyadh & Jeddah",
      title: "Gala Dinner & Awards Ceremony",
      highlight: "Event Production",
      subtitle:
        "Annual dinners, awards nights, recognition ceremonies and client galas. Share your date, guest count and programme — SEM coordinates the venue, stage, AV, catering, trophies and guest arrival through vetted Saudi event partners, under one point of contact.",
      image: "/services/gala_decor_saudi.webp",
      imageAlt: "Gala dinner table with a white and gold floral centrepiece, candles, crystal glassware and gold cutlery in a chandelier-lit ballroom",
    },
    snapshot: [
      { label: "Service type", value: "Gala & awards coordination" },
      { label: "Best for", value: "Corporate · Government · Associations" },
      { label: "Location", value: "Riyadh, Jeddah & major Saudi cities" },
      { label: "Quote", value: "Requirement-based" },
    ],
    answer: {
      question: "What does a gala dinner and awards ceremony company do?",
      answer:
        "A gala dinner and awards ceremony company plans and runs the whole evening: venue sourcing, seating layout, stage and AV production, the awards run-of-show, presenter and script, trophies, catering, décor, photography and guest arrival. With SEM, you share the date, city, guest count and programme; SEM matches each element to suitable Saudi-based partners, combines their options into one proposal and remains your single point of contact through the event.",
    },
    intro: [
      "A gala dinner or awards ceremony is two events at once: a formal dinner that has to run on time, and a stage show where every name, walk-up and photo moment matters. Most problems come from the hand-offs between venue, AV, catering and the people running the stage.",
      "SEM does not own a stage, kitchen or crew. We qualify your brief properly, request options from partners whose capability and availability suit your date, and coordinate them against one run-of-show, so you deal with one contact instead of six suppliers.",
    ],
    capabilities: {
      heading: "What SEM can coordinate for your gala or awards night",
      lead: "Every element is matched to partners on capability, venue and date. Typical scope includes:",
      items: [
        { icon: "building", title: "Venue sourcing", desc: "Hotel ballrooms, conference venues and outdoor or heritage sites that fit your guest count, seating style and stage size." },
        { icon: "layers", title: "Stage & set", desc: "Stage builds, backdrops, walk-up ramps and award podiums, including accessible stage access where needed." },
        { icon: "monitor", title: "AV & screens", desc: "LED walls, sound, wireless microphones, lighting and playback for nominee films and award stings." },
        { icon: "clipboard", title: "Run-of-show & stage management", desc: "Minute-by-minute programme, award order, cue sheets, rehearsal and a stage manager on the night." },
        { icon: "star", title: "Trophies & certificates", desc: "Award shields, trophies and certificates produced to your approved names and categories." },
        { icon: "utensils", title: "Gala catering", desc: "Plated or buffet dinners with service timed around the award segments." },
        { icon: "mic", title: "Host & presenters", desc: "Arabic, English or bilingual hosts, subject to availability, with the script prepared in advance." },
        { icon: "car", title: "Guest arrival", desc: "Valet parking, VIP transfers and reception for guests of honour." },
      ],
    },
    subServices: {
      heading: "Gala and awards formats we coordinate",
      lead: "One enquiry covers all of these. Tell us which fits, or let us recommend a format from your brief.",
      items: [
        { title: "Corporate Annual Gala Dinners", desc: "End-of-year dinners and leadership addresses with a formal seated dinner.", useCase: "Company year-end, milestone celebrations", image: "/services/saudi_gala_table_alcohol_free.webp", imageAlt: "Formal gala table with gold-rimmed tableware, crystal glasses and a white floral centrepiece", href: "/services/corporate-events" },
        { title: "Employee Awards & Recognition Nights", desc: "Long-service, excellence and team awards with a clear walk-up and photo flow.", useCase: "HR recognition programmes", image: "/services/gallery_corporate_gala.webp", imageAlt: "Seated audience facing a lit conference stage with a large LED screen" },
        { title: "Industry & Association Awards", desc: "Multi-category ceremonies with nominee films, judges and media coverage.", useCase: "Associations, sector awards", image: "/services/event_production_stage_riyadh.webp", imageAlt: "Event stage with line-array speakers, lighting truss and a mixing desk" },
        { title: "Client & Partner Appreciation Galas", desc: "Hosted dinners for key clients, partners or sponsors with a short stage programme.", useCase: "Business development, sponsor thank-yous", image: "/riyadh_luxury_reception_people.webp", imageAlt: "Hotel ballroom set for a seated banquet with chandeliers and a decorated stage", href: "/services/luxury-vip-events" },
        { icon: "crown", title: "Government & Institutional Ceremonies", desc: "Formal recognition events with protocol, seating hierarchy and VIP arrival planning." },
        { icon: "users", title: "Charity & Fundraising Dinners", desc: "Dinners with donor recognition and a run-of-show built around the appeal." },
        { icon: "accessibility", title: "Inclusive & Accessible Ceremonies", desc: "Step-free stages, accessible seating, sign-language interpretation and assistance planned from the start." },
        { icon: "calendar", title: "National Day & Seasonal Galas", desc: "Celebration dinners timed to national and seasonal occasions." },
      ],
    },
    flow: {
      heading: "How a gala brief becomes a proposal",
      lead: "These details decide almost everything about a gala or awards proposal.",
      steps: [
        { label: "Date & city", detail: "Sets venue and partner availability" },
        { label: "Guest count", detail: "Drives venue size, catering and staffing" },
        { label: "Award programme", detail: "Number of awards, categories, walk-ups" },
        { label: "Production level", detail: "Stage, LED, lighting and films" },
        { label: "Guest experience", detail: "Arrival, VIPs, hospitality, photos" },
      ],
    },
    idealFor: {
      heading: "Ideal for",
      items: [
        { title: "HR & internal communications teams", desc: "Annual awards and recognition nights.", href: "/services/corporate-events" },
        { title: "Marketing & partnerships teams", desc: "Client, partner and sponsor appreciation dinners." },
        { title: "Associations & federations", desc: "Sector awards with multiple categories and nominees." },
        { title: "Government & semi-government entities", desc: "Formal ceremonies with protocol and VIP guests." },
        { title: "Event agencies", desc: "Overflow production or local coordination support." },
        { title: "Conference organisers", desc: "Closing gala dinners for multi-day programmes.", href: "/services/conferences" },
      ],
    },
    process: {
      heading: "How gala and awards coordination works",
      items: [
        { title: "Share your brief", desc: "Date, city, guest count, number of awards and the feel you want, by form or WhatsApp." },
        { title: "We qualify the details", desc: "Programme length, VIPs, accessibility, branding and what is already booked." },
        { title: "Partner matching", desc: "Venue, production, catering and trophy partners with availability for your date." },
        { title: "One proposal", desc: "Concept, draft run-of-show, layout and itemised quotation in one SEM proposal." },
        { title: "Rehearse & deliver", desc: "Final scripts, cue sheets and rehearsal, with partners coordinated on the night." },
      ],
    },
    quoteFactors: {
      heading: "What affects gala dinner and awards ceremony pricing?",
      lead: "There is no honest fixed price for a gala or awards night. These factors move the cost most:",
      items: [
        { title: "Guest count & seating", desc: "Round tables, theatre or cabaret seating change venue size, catering and staffing." },
        { title: "Venue", desc: "Hotel packages, venue hire and whether external suppliers are allowed." },
        { title: "Stage & AV level", desc: "Stage size, LED walls, lighting design and video production." },
        { title: "Number of awards", desc: "More categories mean more trophies, films, walk-ups and programme time." },
        { title: "Catering format", desc: "Plated dinners need more service staff than buffets." },
        { title: "Guest logistics", desc: "Flights, hotels, transfers and valet for invited guests." },
        { title: "Date & season", desc: "Year-end, Ramadan and peak seasons affect availability." },
      ],
    },
    clientChecklist: {
      heading: "What information is needed for a gala or awards proposal?",
      items: [
        "Event date (or a range) and city",
        "Expected guest count, including VIPs",
        "Number of awards or honourees",
        "Venue, if already booked",
        "Preferred seating style",
        "Required services: stage, AV, catering, trophies, host, photography, transport",
        "Accessibility or protocol requirements",
        "Budget range, if you have one",
        "Proposal deadline and decision date",
      ],
    },
    coordination: {
      heading: "How partner coordination works",
      paragraphs: [
        "SEM operates as a remote coordination platform. We do not own venues, stages, AV equipment, kitchens or crews; each element of your gala is delivered by Saudi-based partners selected for your event.",
        "Our role is to qualify your brief, request suitable options, present them in one proposal and keep every partner working to the same run-of-show. Availability and pricing depend on the selected partners, date and venue, and are confirmed in writing before you book.",
      ],
    },
    quality: {
      heading: "Quality and control considerations",
      items: [
        { title: "One run-of-show", desc: "Every partner works from the same timed programme and cue sheet." },
        { title: "Names checked twice", desc: "Honouree names, titles and award order are proofed before trophies and screens are produced." },
        { title: "Rehearsal on site", desc: "Walk-ups, microphones, screens and lighting cues are rehearsed before doors open." },
        { title: "Clear written scope", desc: "Inclusions, quantities and timings are captured in the quotation." },
      ],
    },
    useCases: {
      heading: "Typical gala and awards requests",
      items: [
        { title: "Company year-end awards dinner", desc: "A 150–300 guest seated dinner with 10–20 award categories and a short leadership address." },
        { title: "Association awards night", desc: "Multi-category awards with nominee films, judges' remarks and media photography." },
        { title: "Recognition ceremony with travelling guests", desc: "Honourees flying in from other cities, with hotel, transfers and an accessible stage." },
        { title: "Client appreciation gala", desc: "A hosted dinner with live entertainment and a brief thank-you programme." },
      ],
    },
    feature: {
      image: "/riyadh_luxury_reception_people.webp",
      alt: "Hotel ballroom set for a seated banquet with chandeliers, dressed tables and a decorated stage",
      caption: "Representative setup: seated gala dinner in a hotel ballroom",
    },
    riyadh: {
      heading: "Gala dinners and awards ceremonies in Riyadh and Jeddah",
      paragraphs: [
        "Most gala and awards enquiries SEM handles are for Riyadh hotel ballrooms and conference venues, with Jeddah close behind. Hotel venues often bundle catering and restrict outside suppliers, so the venue's supplier policy is one of the first things we check.",
        "If your ceremony needs guests to travel in, SEM can also coordinate transfers, valet parking and VIP arrivals under the same enquiry.",
      ],
      links: [
        { label: "Gala dinner & awards planning guide", href: "/blog/gala-dinner-awards-ceremony-planning-saudi-arabia" },
        { label: "Corporate event venues in Riyadh", href: "/blog/best-corporate-event-venues-riyadh-2026" },
        { label: "All event services in Riyadh", href: "/locations/riyadh" },
      ],
    },
    faqs: [
      { q: "Does SEM run the gala itself?", a: "SEM is a coordination platform. Venue, production, catering and other elements are delivered by Saudi-based partners selected for your event. SEM manages the brief, partner options, one combined proposal and communication through to the event." },
      { q: "How much does a gala dinner or awards ceremony cost in Riyadh?", a: "It depends on guest count, venue, stage and AV level, number of awards, catering format and guest logistics. SEM does not publish fixed prices because they change per venue, partner and date; you receive an itemised proposal once your requirements are confirmed." },
      { q: "How early should we start planning?", a: "As early as possible. Popular Riyadh ballrooms and year-end dates book well ahead, and trophies and nominee films need production time. Short-notice requests can be checked, but options may be limited." },
      { q: "Can you produce trophies and nominee videos?", a: "Yes, through production partners. Trophies, certificates and award films are produced to your approved names, categories and branding, with names proofed before production." },
      { q: "Can the ceremony be bilingual?", a: "Yes. Hosts, scripts, screens and printed material can be prepared in Arabic, English or both, subject to host availability." },
      { q: "Can you make the ceremony accessible for guests with disabilities?", a: "Yes. Step-free stage access, accessible seating, sign-language interpretation and assistance can be included in the brief and planned with the venue and partners." },
      { q: "Do you handle travel and hotels for honourees?", a: "SEM can coordinate transfers, valet and VIP arrivals, and request travel and hotel options where they are part of the brief." },
      { q: "Can we use our own venue?", a: "Yes. If you have already booked a venue, SEM checks its supplier and production rules and plans the rest of the evening around it." },
    ],
    related: [
      { title: "Corporate Events", href: "/services/corporate-events", desc: "Conferences, launches and company events.", image: "/services/premium_corporate_summit_hero.webp" },
      { title: "Event Catering", href: "/services/event-catering", desc: "Plated and buffet dinners for galas.", image: "/services/saudi_gala_table_alcohol_free.webp" },
      { title: "LED Screens", href: "/services/led-screens", desc: "Stage screens for award films and stings.", image: "/services/gallery_corporate_gala.webp" },
      { title: "Valet Parking", href: "/services/valet-parking", desc: "Smooth arrivals for gala guests.", image: "/services/valet_golf_cart_guest_mobility.webp" },
    ],
    form: {
      heading: "Request a gala or awards proposal",
      subheading: "Share your event details. SEM reviews the brief, checks suitable partners for your date and comes back with options and next steps.",
      submitLabel: "Request a Proposal",
      serviceOptions: [
        "Full gala / awards ceremony coordination",
        "Venue sourcing",
        "Stage, AV & production",
        "Catering",
        "Trophies & certificates",
        "Host / presenter",
        "Photography & video",
        "Guest arrival & transport",
        "Not sure — please advise",
      ],
      eventTypeOptions: ["Corporate Gala Dinner", "Employee Awards / Recognition", "Industry / Association Awards", "Client / Partner Appreciation", "Government / Institutional Ceremony", "Charity / Fundraising Dinner", "Other"],
      guestCountLabel: "Guest Count",
      messagePlaceholder: "Programme length, VIP guests, branding, accessibility needs, anything already booked...",
      fields: [
        { name: "awardsCount", label: "Number of awards / honourees", type: "select", options: ["None (dinner only)", "1–10", "11–25", "26–50", "50+", "Not sure yet"] },
        { name: "venueStatus", label: "Venue", type: "select", options: ["Already booked", "Need venue options", "Not sure yet"] },
        { name: "seating", label: "Seating style", type: "select", options: ["Round tables (banquet)", "Theatre", "Cabaret", "Not sure"] },
        { name: "language", label: "Programme language", type: "select", options: ["Arabic", "English", "Bilingual"] },
        { name: "deadline", label: "Proposal deadline", type: "text", placeholder: "e.g. 10 December" },
      ],
      whatsappText: "Hi SEM, I'd like a proposal for a gala dinner / awards ceremony.",
    },
  },
};
