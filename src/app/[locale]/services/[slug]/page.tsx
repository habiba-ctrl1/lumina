import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, CheckCircle } from "lucide-react";

// ─── PSEO Data Matrix ─────────────────────────────────────────────────────────
// Each entry covers a Service × City combination optimised for local search,
// AI citation, and voice search ("near me" / city-specific) intent.
// ─────────────────────────────────────────────────────────────────────────────

const PSEO_DATA: Record<
  string,
  {
    city: string;
    cityAr: string;
    service: string;
    parentSlug: string;
    titleTag: string;
    metaDescription: string;
    h1: string;
    h2: string;
    heroImage: string;
    heroImageAlt: string;
    schemaDescription: string;
    intro: string;
    details: string;
    bulletPoints: string[];
    faqs: { q: string; a: string }[];
    relatedServices: { title: string; slug: string }[];
  }
> = {
  // ── Corporate Events ──────────────────────────────────────────────────────
  "corporate-events-riyadh": {
    city: "Riyadh",
    cityAr: "الرياض",
    service: "Corporate Events",
    parentSlug: "corporate-events",
    titleTag: "Corporate Event Management Company in Riyadh | Saudi Event Management",
    metaDescription: "Riyadh's premier corporate event management company. Executive summits at KAFD, gala dinners, AGMs, and board retreats — flawlessly executed by Saudi Event Management.",
    h1: "Corporate Event Management in Riyadh",
    h2: "Elevating Business Events in the Capital",
    heroImage: "/services/riyadh_summit_people.webp",
    heroImageAlt: "Corporate event management company Riyadh Saudi Arabia",
    schemaDescription: "Professional corporate event management in Riyadh covering conferences, galas, AGMs, and executive summits at KAFD and Ritz-Carlton.",
    intro: "Saudi Event Management is Riyadh's leading corporate event planner, managing high-stakes summits, gala dinners, and board-level retreats across the capital's premier venues.",
    details: "From the King Abdullah Financial District (KAFD) Conference Center to the Ritz-Carlton Riyadh, our local expertise ensures absolute precision, GEA compliance, and alignment with Vision 2030 corporate objectives.",
    bulletPoints: [
      "Executive conferences and AGMs at KAFD & KAICC",
      "Annual gala dinners and award ceremonies",
      "Board retreats and C-suite strategy sessions",
      "Government and semi-government functions",
      "VIP hospitality and diplomatic protocol management",
      "Hybrid conference streaming and translation services",
    ],
    faqs: [
      { q: "Which event management companies operate in Riyadh?", a: "Saudi Event Management is the leading corporate event management company in Riyadh, serving Saudi Aramco, HRDF, SABIC, and major government entities through a locally coordinated vendor network." },
      { q: "What are the best corporate event venues in Riyadh?", a: "The top corporate event venues in Riyadh include the KAFD Conference Center, KAICC, Ritz-Carlton, JW Marriott, and Al Faisaliah Hotel. We hold preferred partnerships with all major Riyadh venues." },
      { q: "corporate event company near me Riyadh", a: "Saudi Event Management is headquartered in Riyadh with a full-time team available for rapid on-site consultation and same-day event logistics support across the capital." },
    ],
    relatedServices: [
      { title: "Conference Management", slug: "conferences" },
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
      { title: "Event Production", slug: "event-production" },
    ],
  },
  "corporate-events-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Corporate Events",
    parentSlug: "corporate-events",
    titleTag: "Corporate Event Planning Company in Jeddah | Saudi Event Management",
    metaDescription: "Leading corporate event planning company in Jeddah. Business conferences, executive galas, and product launches at Red Sea luxury venues — managed by Saudi Event Management.",
    h1: "Corporate Event Planning in Jeddah",
    h2: "World-Class Business Events by the Red Sea",
    heroImage: "/services/jeddah_luxury_people.webp",
    heroImageAlt: "Corporate event management company Jeddah Red Sea Saudi Arabia",
    schemaDescription: "Premier corporate event management in Jeddah including business conferences, gala dinners, and executive summits at Jeddah's top luxury venues.",
    intro: "Saudi Event Management delivers world-class corporate events in Jeddah, leveraging the city's cosmopolitan energy and spectacular Red Sea venue portfolio for unforgettable business gatherings.",
    details: "From executive boardroom dinners at the Rosewood Jeddah to large-scale corporate galas at the Ritz-Carlton, our Jeddah-based team ensures flawless execution every time.",
    bulletPoints: [
      "Executive summits and C-suite conferences in Jeddah",
      "Corporate galas at Rosewood, Ritz-Carlton, and Waldorf Astoria",
      "Red Sea waterfront corporate events and retreats",
      "Product launch events and brand activations Jeddah",
      "Team building experiences along the Jeddah Corniche",
      "GEA-compliant entertainment and hospitality management",
    ],
    faqs: [
      { q: "What are the best corporate event venues in Jeddah?", a: "Top venues in Jeddah include the Rosewood Jeddah, Ritz-Carlton Jeddah, Waldorf Astoria (Qasr Al Sharq), InterContinental Jeddah, and the Jeddah Center for Forums and Events. We secure preferred access to all of these." },
      { q: "Who organizes corporate conferences in Jeddah?", a: "Saudi Event Management is a premier corporate conference organizer in Jeddah, providing end-to-end PCO services, AV production, speaker management, and GEA permit processing for the city's major business events." },
      { q: "business event organizer near me Jeddah", a: "Saudi Event Management has a dedicated Jeddah operations team providing on-the-ground support for all corporate events across the city, from initial venue walk-throughs to post-event reporting." },
    ],
    relatedServices: [
      { title: "Conference Management", slug: "conferences" },
      { title: "Luxury Weddings", slug: "weddings" },
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
    ],
  },
  "corporate-events-dammam": {
    city: "Dammam",
    cityAr: "الدمام",
    service: "Corporate Events",
    parentSlug: "corporate-events",
    titleTag: "Corporate Event Management in Dammam | Saudi Event Management",
    metaDescription: "Corporate event planning company in Dammam and the Eastern Province. Business conferences, galas, and AGMs managed with precision by Saudi Event Management.",
    h1: "Corporate Event Management in Dammam",
    h2: "Premier Business Events in the Eastern Province",
    heroImage: "/services/alkhobar_corporate_people.webp",
    heroImageAlt: "Corporate event management Dammam Eastern Province Saudi Arabia",
    schemaDescription: "Professional corporate event management in Dammam covering Eastern Province business conferences, oil and gas sector events, and executive galas.",
    intro: "Saudi Event Management brings its full corporate event expertise to Dammam and the Eastern Province, serving the region's vibrant energy sector, logistics, and commercial business community.",
    details: "With deep relationships across Dammam's luxury venue landscape — including Intercontinental Al Khobar and Marriott Dammam — we deliver flawless corporate events for the Eastern Province's most demanding clients.",
    bulletPoints: [
      "Oil and gas sector conference management in Dammam",
      "Eastern Province business galas and award ceremonies",
      "AGMs and shareholder meetings for regional corporates",
      "Team building and corporate retreats Eastern Province",
      "Saudi Aramco and SABIC aligned event management",
      "Cross-regional logistics (Dammam–Khobar–Dhahran corridor)",
    ],
    faqs: [
      { q: "What corporate event venues exist in Dammam?", a: "Dammam's top corporate event venues include the Intercontinental Hotel Al Khobar, Four Points by Sheraton Dammam, Marriott Hotel Dammam, and the Dammam Chamber of Commerce. Saudi Event Management holds preferred access to all major venues." },
      { q: "Do you manage corporate events for Saudi Aramco?", a: "Yes. Saudi Event Management has extensive experience managing corporate events aligned with Saudi Aramco's operational standards, including executive summits, training conferences, and corporate celebration events in the Eastern Province." },
      { q: "corporate event company near me Dammam", a: "Saudi Event Management provides rapid-response corporate event support across Dammam, Khobar, and Dhahran — with a dedicated Eastern Province project team." },
    ],
    relatedServices: [
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Conference Management", slug: "conferences" },
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
    ],
  },

  // ── Luxury Weddings ───────────────────────────────────────────────────────
  "luxury-weddings-riyadh": {
    city: "Riyadh",
    cityAr: "الرياض",
    service: "Luxury Weddings",
    parentSlug: "weddings",
    titleTag: "Luxury Wedding Planner Riyadh | Best Wedding Company Saudi Arabia",
    metaDescription: "Riyadh's premier luxury wedding planner. Bespoke royal weddings, traditional Nikah ceremonies, and VIP receptions at the Ritz-Carlton and Four Seasons — by Saudi Event Management.",
    h1: "Luxury Wedding Planner in Riyadh",
    h2: "Crafting Unforgettable Celebrations in the Capital",
    heroImage: "/services/wedding_hall_grand_entrance.webp",
    heroImageAlt: "Luxury wedding planner Riyadh Saudi Arabia Ritz-Carlton",
    schemaDescription: "Bespoke luxury wedding planning in Riyadh specialising in royal ceremonies, traditional Nikah celebrations, and high-end VIP receptions.",
    intro: "Saudi Event Management is Riyadh's most trusted luxury wedding planner, designing extraordinary celebrations at the Kingdom's finest venues with uncompromising attention to every detail.",
    details: "From intimate private dinners to grand weddings at the Ritz-Carlton Riyadh hosting 1,500 guests, our senior consultants and creative directors bring your vision to life with Saudi authenticity and global luxury standards.",
    bulletPoints: [
      "Royal and high-society wedding planning Riyadh",
      "Traditional Nikah ceremony management",
      "Venue sourcing — Ritz-Carlton, Four Seasons, JW Marriott Riyadh",
      "Custom floral design and luxury decor",
      "Zaffa and entertainment management",
      "Complete bridal concierge and VIP guest management",
    ],
    faqs: [
      { q: "Who are the best wedding planners in Riyadh?", a: "Saudi Event Management is consistently ranked among the best wedding planners in Riyadh, known for precision planning, cultural authenticity, and exclusive access to premiere venues like the Ritz-Carlton and Four Seasons." },
      { q: "How much does a luxury wedding cost in Riyadh?", a: "Luxury weddings in Riyadh typically range from SAR 150,000 to SAR 1,500,000 depending on the venue, guest count, and production level. Our consultants provide bespoke proposals tailored to your vision and budget." },
      { q: "wedding planner near me Riyadh", a: "Saudi Event Management is based in Riyadh with a dedicated bridal team offering in-person consultations, venue tours, and personalised wedding planning services across the capital." },
    ],
    relatedServices: [
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Cultural & Religious Events", slug: "cultural-events" },
      { title: "Destination Events", slug: "destination-events" },
    ],
  },
  "luxury-weddings-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Luxury Weddings",
    parentSlug: "weddings",
    titleTag: "Luxury Wedding Planner in Jeddah | Saudi Event Management",
    metaDescription: "The most exclusive luxury wedding planner in Jeddah. Beachfront ceremonies, Red Sea resort weddings, and traditional royal events — managed by Saudi Event Management.",
    h1: "Luxury Wedding Planner in Jeddah",
    h2: "Breathtaking Red Sea Celebrations",
    heroImage: "/services/jeddah_beach_wedding_setup.webp",
    heroImageAlt: "Luxury wedding planner Jeddah Red Sea Saudi Arabia",
    schemaDescription: "Bespoke luxury wedding planning in Jeddah specialising in Red Sea beachfront weddings, royal ceremonies, and high-end VIP receptions.",
    intro: "Saudi Event Management transforms Jeddah's spectacular Red Sea settings into extraordinary wedding experiences. Our seaside weddings are renowned for their elegance, privacy, and cinematic beauty.",
    details: "We leverage exclusive partnerships with Jeddah's finest coastal venues — including the Waldorf Astoria (Qasr Al Sharq), Park Hyatt, and Rosewood Jeddah — to deliver weddings as breathtaking as the Red Sea horizon.",
    bulletPoints: [
      "Red Sea beachfront wedding ceremonies",
      "Venue sourcing — Waldorf Astoria, Rosewood, Park Hyatt Jeddah",
      "Royal and traditional Nikah celebrations",
      "Custom floral design and luxury waterfront decor",
      "Complete bridal concierge and VIP guest management",
      "Entertainment, Zaffa, and media production",
    ],
    faqs: [
      { q: "Which hotels are best for weddings in Jeddah?", a: "The best hotels for weddings in Jeddah include the Waldorf Astoria (Qasr Al Sharq) for its Red Sea views, Park Hyatt Jeddah for its contemporary elegance, and the Ritz-Carlton Jeddah for grandeur and scale." },
      { q: "How do I find a wedding planner in Jeddah?", a: "Saudi Event Management is Jeddah's premier luxury wedding planning company, with a dedicated bridal team offering personalised consultations, venue tours, and end-to-end planning services from concept to celebration." },
      { q: "wedding planner near me Jeddah", a: "Saudi Event Management has a dedicated Jeddah bridal team providing in-person consultations and on-site management across all of Jeddah's major wedding venues." },
    ],
    relatedServices: [
      { title: "Destination Events", slug: "destination-events" },
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Cultural & Religious Events", slug: "cultural-events" },
    ],
  },
  "luxury-weddings-dammam": {
    city: "Dammam",
    cityAr: "الدمام",
    service: "Luxury Weddings",
    parentSlug: "weddings",
    titleTag: "Luxury Wedding Planner in Dammam | Saudi Event Management",
    metaDescription: "Premier luxury wedding planner in Dammam and the Eastern Province. Bespoke weddings, traditional ceremonies, and high-end receptions — by Saudi Event Management.",
    h1: "Luxury Wedding Planner in Dammam",
    h2: "Elegant Weddings in the Eastern Province",
    heroImage: "/services/luxury_wedding_couple_guests.webp",
    heroImageAlt: "Luxury wedding planner Dammam Eastern Province Saudi Arabia",
    schemaDescription: "Premium luxury wedding planning in Dammam covering traditional Saudi ceremonies, VIP receptions, and grand celebrations across the Eastern Province.",
    intro: "Saudi Event Management brings five-star wedding planning excellence to Dammam and the Eastern Province, delivering bespoke celebrations that blend traditional Saudi hospitality with contemporary luxury.",
    details: "Our Eastern Province bridal team has deep relationships with the region's premier venues, caterers, and entertainment providers — ensuring every detail of your Dammam wedding is perfectly orchestrated.",
    bulletPoints: [
      "Traditional and royal wedding planning in Dammam",
      "VIP venue sourcing across Eastern Province",
      "Nikah ceremony and reception coordination",
      "Custom decor, floral, and entertainment",
      "Luxury catering and five-star service",
      "Photography, videography, and media production",
    ],
    faqs: [
      { q: "Are there luxury wedding planners in Dammam?", a: "Yes. Saudi Event Management provides full luxury wedding planning services in Dammam, with a dedicated Eastern Province team offering personalised, end-to-end management for all wedding sizes and styles." },
      { q: "What wedding venues are available in Dammam?", a: "Dammam's top wedding venues include the Intercontinental Hotel Al Khobar, Marriott Hotel Dammam, and a number of exclusive private ballrooms. We source and secure the ideal venue based on your guest count and style preferences." },
      { q: "wedding planner near me Dammam", a: "Saudi Event Management has an Eastern Province-based team providing immediate, local support for wedding planning in Dammam, Khobar, and Dhahran." },
    ],
    relatedServices: [
      { title: "Luxury Weddings", slug: "weddings" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Cultural & Religious Events", slug: "cultural-events" },
    ],
  },

  // ── Exhibitions ───────────────────────────────────────────────────────────
  "exhibitions-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Exhibitions & Trade Shows",
    parentSlug: "exhibitions",
    titleTag: "Exhibition Management Company in Jeddah | Trade Show Organizer KSA",
    metaDescription: "Premier exhibition management company in Jeddah. Trade show organizing, expo booth design, and stand building for B2B expos at Jeddah Center for Forums and Events.",
    h1: "Exhibition Management Company in Jeddah",
    h2: "Trade Show Excellence on the Red Sea",
    heroImage: "/services/jeddah_luxury_people.webp",
    heroImageAlt: "Exhibition management company Jeddah trade show Saudi Arabia",
    schemaDescription: "Expert exhibition management in Jeddah covering trade show organization, booth design, and B2B expo logistics at Jeddah Center for Forums and Events.",
    intro: "Saudi Event Management provides premier exhibition management services in Jeddah, connecting international brands with Saudi markets through expertly produced trade shows at the Jeddah Center for Forums and Events.",
    details: "Our Jeddah exhibition team offers end-to-end services — from booth concept design to GEA permit processing and B2B matchmaking — ensuring your brand commands attention on Jeddah's vibrant commercial stage.",
    bulletPoints: [
      "Trade show management at Jeddah Center for Forums and Events",
      "Custom expo booth design and stand building Jeddah",
      "B2B matchmaking and exhibitor services",
      "International brand entry and market access support",
      "Product showcase and commercial display events",
      "Post-event lead management and reporting",
    ],
    faqs: [
      { q: "What exhibition venues are available in Jeddah?", a: "Jeddah's primary exhibition venue is the Jeddah Center for Forums and Events (JCFE). Saudi Event Management holds preferred organizer status at this venue, providing expedited space bookings and logistics support." },
      { q: "Who manages trade shows in Jeddah?", a: "Saudi Event Management is a leading trade show organizer in Jeddah, providing end-to-end exhibition management for both domestic and international exhibitors across all industry sectors." },
      { q: "expo booth builder near me Jeddah", a: "Our Jeddah-based exhibition team provides rapid on-site booth design consultation, construction, and branding services for any trade show or commercial display event in the city." },
    ],
    relatedServices: [
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Conference Management", slug: "conferences" },
    ],
  },
  "exhibitions-dammam": {
    city: "Dammam",
    cityAr: "الدمام",
    service: "Exhibitions & Trade Shows",
    parentSlug: "exhibitions",
    titleTag: "Exhibition Management in Dammam | Trade Show Organizer Eastern Province",
    metaDescription: "Expert exhibition management and trade show organizing in Dammam and the Eastern Province. Booth design, stand building, and B2B expo logistics by Saudi Event Management.",
    h1: "Exhibition Management in Dammam & Eastern Province",
    h2: "Trade Show Excellence in Saudi Arabia's Energy Capital",
    heroImage: "/services/alkhobar_corporate_people.webp",
    heroImageAlt: "Exhibition management Dammam Eastern Province Saudi Arabia",
    schemaDescription: "Professional exhibition management in Dammam for oil and gas, industrial, and commercial trade shows in the Eastern Province.",
    intro: "Saudi Event Management brings world-class exhibition management to Dammam's energy-sector rich commercial landscape, connecting global brands with the Eastern Province's high-value business community.",
    details: "Dammam hosts critical industry trade shows for the oil and gas, petrochemicals, and industrial sectors. Our specialist team navigates the unique requirements of technical exhibitions and VIP government delegations in this pivotal market.",
    bulletPoints: [
      "Oil and gas sector trade show management Dammam",
      "Technical industrial exhibition booth design",
      "Eastern Province B2B expo and product launches",
      "Saudi Aramco and SABIC aligned exhibition services",
      "Delegate management and VIP hospitality",
      "Post-show analytics and lead conversion support",
    ],
    faqs: [
      { q: "What trade show venues exist in Dammam?", a: "Dammam's key exhibition venues include the Chamber of Commerce and Industry building and several large-scale hotel convention spaces. Saudi Event Management also facilitates custom outdoor exhibition builds for the Eastern Province." },
      { q: "Do you manage oil and gas trade shows in Saudi Arabia?", a: "Yes. Saudi Event Management has extensive experience organizing and participating in oil and gas sector exhibitions, including AlShargiyah expos, coordinating between global industry players and the Saudi Aramco/SABIC supply chain ecosystem." },
      { q: "exhibition company near me Dammam", a: "Our Eastern Province team is based in the Dammam-Khobar corridor, providing immediate local support for all exhibition and trade show requirements across the region." },
    ],
    relatedServices: [
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Conference Management", slug: "conferences" },
    ],
  },

  // ── Conference Management ─────────────────────────────────────────────────
  "conference-management-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Conference Management",
    parentSlug: "conferences",
    titleTag: "Conference Management Services in Jeddah | B2B Summit Organizer KSA",
    metaDescription: "Expert conference management in Jeddah, Saudi Arabia. B2B summits, hybrid conferences, speaker management, and full PCO services at Jeddah's top venues.",
    h1: "Conference Management Services in Jeddah",
    h2: "World-Class Conferences by the Red Sea",
    heroImage: "/services/jeddah_luxury_people.webp",
    heroImageAlt: "Conference management services Jeddah Saudi Arabia",
    schemaDescription: "End-to-end conference management in Jeddah — B2B summits, hybrid streaming, VIP protocol, and full AV production.",
    intro: "Saudi Event Management delivers expert conference management in Jeddah, producing impactful summits and professional gatherings at the city's premier venues by the Red Sea.",
    details: "From Jeddah Chamber conferences to international healthcare and trade summits, our PCO team handles everything — venue negotiation, speaker logistics, GEA permits, AV production, and delegate management.",
    bulletPoints: [
      "B2B summits at Jeddah Center for Forums and Events",
      "PCO services and delegate registration systems",
      "Speaker management and green room coordination",
      "Hybrid streaming and simultaneous translation",
      "VIP protocol and dignitary reception",
      "Post-conference media and press distribution",
    ],
    faqs: [
      { q: "What are the best conference venues in Jeddah?", a: "Top conference venues in Jeddah include the Jeddah Center for Forums and Events, Rosewood Jeddah, Ritz-Carlton Jeddah, and the Jeddah Hilton. We negotiate preferred rates and technical specifications at all venues." },
      { q: "Who organizes conferences in Jeddah?", a: "Saudi Event Management is a leading conference organizer in Jeddah, serving international delegates, government entities, and commercial organizations with full PCO services." },
      { q: "conference organizer near me Jeddah", a: "Our Jeddah team provides immediate, on-the-ground conference management support — from venue inspections to on-day technical management and VIP reception." },
    ],
    relatedServices: [
      { title: "Conference Management", slug: "conferences" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Exhibitions & Trade Shows", slug: "exhibitions" },
    ],
  },
  "conference-management-dammam": {
    city: "Dammam",
    cityAr: "الدمام",
    service: "Conference Management",
    parentSlug: "conferences",
    titleTag: "Conference Management in Dammam | Eastern Province Summit Organizer",
    metaDescription: "Professional conference management in Dammam and the Eastern Province. Business summits, oil and gas sector conferences, and hybrid event management by Saudi Event Management.",
    h1: "Conference Management in Dammam",
    h2: "Professional Summits for the Eastern Province",
    heroImage: "/services/alkhobar_corporate_people.webp",
    heroImageAlt: "Conference management Dammam Eastern Province Saudi Arabia",
    schemaDescription: "Full-service conference management in Dammam for oil and gas, industrial, and commercial summits in the Eastern Province.",
    intro: "Saudi Event Management provides end-to-end conference management in Dammam, serving the Eastern Province's vibrant energy, industrial, and commercial sectors with precision and professionalism.",
    details: "Our Dammam conference team manages everything from multi-day technical symposiums aligned with Saudi Aramco's operational requirements to regional chamber of commerce summits — delivering seamless execution with full technical support.",
    bulletPoints: [
      "Oil and gas technical conferences in Dammam",
      "Chamber of Commerce summits and business forums",
      "Hybrid streaming and remote delegate management",
      "Simultaneous Arabic-English interpretation",
      "VIP government delegation protocol",
      "Venue sourcing across Dammam-Khobar corridor",
    ],
    faqs: [
      { q: "Who manages conferences in Dammam?", a: "Saudi Event Management provides full PCO and conference management services in Dammam, with a specialist team experienced in technical industry conferences for the oil and gas sector." },
      { q: "Are there conference venues in Dammam?", a: "Yes. Key conference venues in Dammam include the Intercontinental Hotel Al Khobar Grand Ballroom, Marriott Dammam, and the Dammam Chamber of Commerce. Our team secures and manages these venues for all conference requirements." },
      { q: "conference management near me Dammam", a: "Saudi Event Management has an on-the-ground team in the Eastern Province providing full-service conference management from initial planning through to post-event reporting." },
    ],
    relatedServices: [
      { title: "Conference Management", slug: "conferences" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Event Production", slug: "event-production" },
    ],
  },

  // ── Event Production ──────────────────────────────────────────────────────
  "event-production-riyadh": {
    city: "Riyadh",
    cityAr: "الرياض",
    service: "Event Production",
    parentSlug: "event-production",
    titleTag: "Event Production Company in Riyadh | Stage, AV & Lighting Saudi Arabia",
    metaDescription: "Premier event production company in Riyadh. Custom stage design, concert-grade sound systems, intelligent lighting, and LED projection mapping for corporate and luxury events.",
    h1: "Event Production Company in Riyadh",
    h2: "Technical Excellence for the Kingdom's Capital",
    heroImage: "/services/riyadh_summit_people.webp",
    heroImageAlt: "Event production company Riyadh stage AV lighting Saudi Arabia",
    schemaDescription: "Full-scale event production in Riyadh — stage fabrication, AV systems, intelligent lighting, and LED projection mapping for any event scale.",
    intro: "Saudi Event Management is Riyadh's leading event production company, delivering concert-grade AV systems, custom stage fabrications, and intelligent lighting for the capital's most demanding events.",
    details: "From National Day show productions and Riyadh Season activations to intimate board dinners at the Ritz-Carlton, our Riyadh-based production team provides ISO-certified technical excellence for every brief.",
    bulletPoints: [
      "Custom stage design and fabrication Riyadh",
      "Concert-grade sound engineering (L-Acoustics, d&b)",
      "Intelligent lighting and architectural wash",
      "LED walls and projection mapping",
      "Riyadh Season and National Day productions",
      "On-site AV crew and technical directors",
    ],
    faqs: [
      { q: "Which event production companies operate in Riyadh?", a: "Saudi Event Management is one of Riyadh's leading event production companies, with a full in-house production warehouse, certified technical crew, and proven track record on National Day and Riyadh Season productions." },
      { q: "How much does AV production cost in Riyadh?", a: "AV production costs in Riyadh start from SAR 18,000 for a full-day corporate event package. Stage fabrication, LED walls, and projection mapping are priced separately based on scale and complexity." },
      { q: "event production company near me Riyadh", a: "Our production warehouse and team are based in Riyadh, making us the most accessible event production company for any capital event requirement — from same-week AV packages to large-scale concert productions." },
    ],
    relatedServices: [
      { title: "Event Production", slug: "event-production" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Conference Management", slug: "conferences" },
    ],
  },
  "event-production-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Event Production",
    parentSlug: "event-production",
    titleTag: "Event Production Company in Jeddah | AV & Stage Design Red Sea",
    metaDescription: "Leading event production company in Jeddah. Custom stage design, professional sound systems, lighting, and LED production for corporate and luxury events along the Red Sea.",
    h1: "Event Production Company in Jeddah",
    h2: "Spectacular Coastal Productions",
    heroImage: "/services/jeddah_luxury_people.webp",
    heroImageAlt: "Event production company Jeddah AV stage lighting Red Sea",
    schemaDescription: "High-end event production in Jeddah — custom stage builds, concert AV, intelligent lighting, and outdoor coastal event production.",
    intro: "Saudi Event Management's Jeddah production team delivers spectacular technical productions for Red Sea galas, corporate summits, and private events at the city's finest venues.",
    details: "From outdoor beachfront stage builds along the Jeddah Corniche to sophisticated ballroom AV setups at the Waldorf Astoria, our production team combines technical precision with creative vision.",
    bulletPoints: [
      "Outdoor coastal stage builds Jeddah Corniche",
      "Ballroom AV production at Waldorf Astoria & Rosewood",
      "Concert-grade sound systems Jeddah",
      "Intelligent lighting and scenic design",
      "LED screens and projection for indoor/outdoor events",
      "Full technical crew and on-day management",
    ],
    faqs: [
      { q: "Do you provide outdoor event production in Jeddah?", a: "Yes. Saudi Event Management specialises in outdoor event production along the Jeddah Corniche and Red Sea coast — including weather-resistant stage builds, outdoor PA systems, and power generation for beachfront events." },
      { q: "sound system rental near me Jeddah", a: "We provide concert-grade sound system rentals in Jeddah including line-array systems, wireless microphone packages, and full AV operator support for events of any size and location." },
      { q: "event production company near me Jeddah", a: "Saudi Event Management has a Jeddah operations team providing rapid-response event production support across the city, from same-week AV packages to full-scale stage builds." },
    ],
    relatedServices: [
      { title: "Event Production", slug: "event-production" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Luxury Weddings", slug: "weddings" },
    ],
  },
  "event-production-alula": {
    city: "AlUla",
    cityAr: "العُلا",
    service: "Event Production",
    parentSlug: "event-production",
    titleTag: "Event Production & Design in AlUla | Saudi Event Management",
    metaDescription: "World-class event production and technical design in AlUla. Custom staging, AV, lighting, and remote logistics for desert heritage events — by Saudi Event Management.",
    h1: "Event Production Services in AlUla",
    h2: "Technical Mastery in the Desert",
    heroImage: "/services/alula_gala_people.webp",
    heroImageAlt: "Event production services AlUla desert heritage Saudi Arabia",
    schemaDescription: "High-end event production, AV, lighting, and staging services for luxury events and festivals at AlUla's desert heritage sites.",
    intro: "Executing events in AlUla demands unprecedented technical and logistical expertise. Saudi Event Management provides complete production services tailored to this unique UNESCO-protected landscape.",
    details: "From immersive light shows illuminating ancient Nabataean sandstone at Hegra to custom concert stages built at Maraya, our production team masters the extraordinary demands of desert heritage environments with full RCU compliance.",
    bulletPoints: [
      "Architectural projection mapping on AlUla heritage sites",
      "Custom desert stage design and fabrication",
      "Concert-grade sound for outdoor desert environments",
      "Power generation and remote logistics infrastructure",
      "Zero-impact production with full RCU compliance",
      "Climate-controlled technical environments",
    ],
    faqs: [
      { q: "Can you do projection mapping at AlUla heritage sites?", a: "Yes. Saudi Event Management has delivered projection mapping activations at AlUla's sandstone formations and heritage buildings, working in collaboration with the Royal Commission for AlUla (RCU) for site access and zero-impact production protocols." },
      { q: "How do you manage power supply for events in AlUla?", a: "We deploy industrial generator systems with clean power conditioning, ensuring stable, quiet power for all AV and lighting equipment in remote desert locations — including battery backup and silent generator options for noise-sensitive heritage sites." },
      { q: "event production company AlUla Saudi Arabia", a: "Saudi Event Management is AlUla's most experienced event production partner, with a track record of delivering world-class productions for private concerts, brand activations, and heritage site events." },
    ],
    relatedServices: [
      { title: "Destination Events", slug: "destination-events" },
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Event Production", slug: "event-production" },
    ],
  },

  // ── Cultural Events ───────────────────────────────────────────────────────
  "cultural-events-riyadh": {
    city: "Riyadh",
    cityAr: "الرياض",
    service: "Cultural & Seasonal Events",
    parentSlug: "cultural-events",
    titleTag: "Cultural Event Management Riyadh | Ramadan, National Day & Eid KSA",
    metaDescription: "Expert cultural event management in Riyadh. Ramadan iftar activations, Saudi National Day galas, Founding Day celebrations, Eid events, and Riyadh Season activations.",
    h1: "Cultural & Seasonal Event Management in Riyadh",
    h2: "Celebrating Saudi Heritage in the Capital",
    heroImage: "/services/majlis_gathering_people.webp",
    heroImageAlt: "Cultural event management Riyadh Ramadan National Day Saudi Arabia",
    schemaDescription: "Authentic cultural and religious event management in Riyadh — Ramadan activations, National Day galas, Founding Day, and Riyadh Season events.",
    intro: "Saudi Event Management is Riyadh's leading cultural event organiser, delivering authentic, high-impact celebrations that honour the Kingdom's rich heritage and seasonal traditions throughout the year.",
    details: "From grand National Day (September 23) galas at AlMurabba Palace to intimate corporate Ramadan iftars at the Ritz-Carlton, our cultural events team brings deep contextual knowledge and operational excellence to every occasion.",
    bulletPoints: [
      "Ramadan corporate iftar and suhoor activations Riyadh",
      "National Day gala planning September 23",
      "Founding Day (February 22) heritage events",
      "Eid Al-Fitr and Al-Adha corporate celebrations",
      "Riyadh Season brand activations and GEA events",
      "Traditional Saudi entertainment and cultural performances",
    ],
    faqs: [
      { q: "Who organizes National Day events in Riyadh?", a: "Saudi Event Management is a premier National Day event organizer in Riyadh, managing large-scale patriotic galas, community festivals, and corporate celebrations for the September 23 national holiday." },
      { q: "How early should I book a Ramadan event organizer in Riyadh?", a: "We recommend booking at least 2–3 months before Ramadan begins. Popular venues in Riyadh book out quickly for corporate iftar events, and early booking ensures access to the best spaces and catering teams." },
      { q: "cultural event company near me Riyadh", a: "Saudi Event Management's cultural events division is Riyadh-based, offering immediate consultation and on-the-ground planning support for any cultural or seasonal celebration in the capital." },
    ],
    relatedServices: [
      { title: "Cultural & Religious Events", slug: "cultural-events" },
      { title: "Corporate Events", slug: "corporate-events" },
      { title: "Luxury Weddings", slug: "weddings" },
    ],
  },
  "cultural-events-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Cultural & Seasonal Events",
    parentSlug: "cultural-events",
    titleTag: "Cultural Event Planning in Jeddah | Ramadan, Eid & National Day KSA",
    metaDescription: "Authentic cultural and religious event management in Jeddah. Ramadan iftars, National Day celebrations, Eid parties, and seasonal activations along the Red Sea.",
    h1: "Cultural & Seasonal Event Planning in Jeddah",
    h2: "Honouring Tradition on the Red Sea Coast",
    heroImage: "/services/majlis_gathering_people.webp",
    heroImageAlt: "Cultural event planning Jeddah Ramadan National Day Saudi Arabia",
    schemaDescription: "Expert cultural and religious event planning in Jeddah covering Ramadan, National Day, Founding Day, and Eid celebrations.",
    intro: "Saudi Event Management brings Jeddah's cosmopolitan spirit and deep Hejazi cultural traditions together in extraordinary seasonal celebrations, from waterfront Ramadan activations to National Day galas.",
    details: "Jeddah's unique Hejazi cultural identity makes it a special canvas for cultural events. Our team understands the city's distinct traditions, preferred venues, and the expectations of both local families and international residents.",
    bulletPoints: [
      "Waterfront Ramadan iftar and suhoor events Jeddah Corniche",
      "National Day celebrations and corporate galas Jeddah",
      "Eid Al-Fitr and Al-Adha family and corporate events",
      "Hejazi traditional entertainment and cultural programs",
      "Brand activations during GEA-approved cultural seasons",
      "Heritage-themed events at Jeddah's historic Al-Balad district",
    ],
    faqs: [
      { q: "How do I organize a Ramadan iftar event in Jeddah?", a: "The first step is securing a venue — waterfront locations and hotel venues book quickly. Saudi Event Management provides full-service Ramadan iftar event planning in Jeddah, from Majlis-style setup design to catering and traditional entertainment." },
      { q: "Who plans National Day events in Jeddah?", a: "Saudi Event Management is an experienced National Day event organizer in Jeddah, creating patriotic celebrations, corporate galas, and community events to mark the September 23 national holiday." },
      { q: "Ramadan event company near me Jeddah", a: "Our Jeddah-based cultural events team provides immediate support for Ramadan activations, corporate iftars, and brand events during the holy month across all major Jeddah venues." },
    ],
    relatedServices: [
      { title: "Cultural & Religious Events", slug: "cultural-events" },
      { title: "Luxury Weddings", slug: "weddings" },
      { title: "Destination Events", slug: "destination-events" },
    ],
  },

  // ── VIP Events ────────────────────────────────────────────────────────────
  "vip-events-jeddah": {
    city: "Jeddah",
    cityAr: "جدة",
    service: "Luxury & VIP Events",
    parentSlug: "luxury-vip-events",
    titleTag: "Luxury VIP Event Planner in Jeddah | Private & HNWI Experiences",
    metaDescription: "Exclusive luxury event planning in Jeddah for VIPs, royal families, and HNWIs. Private yacht events, Red Sea galas, and bespoke experiences by Saudi Event Management.",
    h1: "Luxury VIP Events in Jeddah",
    h2: "Ultra-Exclusive Red Sea Experiences",
    heroImage: "/services/jeddah_luxury_people.webp",
    heroImageAlt: "Luxury VIP event planner Jeddah Red Sea Saudi Arabia",
    schemaDescription: "Exclusive luxury and VIP event management in Jeddah — private yacht events, royal galas, HNWI concierge, and ultra-luxury Red Sea experiences.",
    intro: "Saudi Event Management's luxury division delivers the most exclusive private events on Jeddah's Red Sea coast — from superyacht parties to invitation-only brand launches at the Waldorf Astoria.",
    details: "Jeddah's unique combination of cosmopolitan sophistication and Red Sea luxury creates unparalleled opportunities for ultra-private VIP events. Our Jeddah luxury team operates with complete discretion and white-glove precision.",
    bulletPoints: [
      "Private superyacht events on the Red Sea",
      "Exclusive beach galas and waterfront dining experiences",
      "Royal family event management Jeddah",
      "HNWI concierge and private party planning",
      "Invitation-only brand launches at luxury Jeddah venues",
      "Close-protection and VIP security coordination",
    ],
    faqs: [
      { q: "Can you arrange private yacht events in Jeddah?", a: "Yes. Saudi Event Management manages exclusive superyacht events along the Jeddah Red Sea coast, including private dining, entertainment, and luxury concierge services aboard chartered vessels." },
      { q: "Who are the luxury event planners in Jeddah?", a: "Saudi Event Management is Jeddah's premier luxury event planner, serving royal families, senior executives, and high-net-worth individuals with strictly confidential, ultra-luxury event experiences." },
      { q: "luxury event planner near me Jeddah", a: "Our Jeddah luxury events team is available for private consultations, providing complete discretion and white-glove service planning for all high-profile events along the Red Sea coast." },
    ],
    relatedServices: [
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Destination Events", slug: "destination-events" },
      { title: "Luxury Weddings", slug: "weddings" },
    ],
  },
  "vip-events-alula": {
    city: "AlUla",
    cityAr: "العُلا",
    service: "Luxury & VIP Events",
    parentSlug: "luxury-vip-events",
    titleTag: "Luxury VIP Events in AlUla | Private Desert Experiences Saudi Arabia",
    metaDescription: "Ultra-luxury VIP event planning in AlUla. Private concerts at Maraya, desert glamping, heritage site dinners, and bespoke experiences in Saudi Arabia's most spectacular destination.",
    h1: "Luxury VIP Events in AlUla",
    h2: "Extraordinary Experiences in the Ancient Desert",
    heroImage: "/services/alula_gala_people.webp",
    heroImageAlt: "Luxury VIP events AlUla desert heritage Saudi Arabia Maraya",
    schemaDescription: "Ultra-luxury VIP events in AlUla — private concerts at Maraya, desert glamping, Hegra heritage dinners, and bespoke experiences in the Hejaz mountains.",
    intro: "AlUla is Saudi Arabia's most extraordinary canvas for ultra-luxury VIP events. Saudi Event Management creates once-in-a-lifetime experiences amid ancient Nabataean cities, towering sandstone mountains, and the iconic Maraya concert hall.",
    details: "Our AlUla luxury team works in close collaboration with the Royal Commission for AlUla (RCU), ensuring your private event integrates seamlessly with the landscape while meeting all heritage conservation requirements.",
    bulletPoints: [
      "Private concerts at Maraya concert hall AlUla",
      "Exclusive dinner events at Hegra UNESCO heritage site",
      "Desert glamping with stargazing and traditional entertainment",
      "Dadan archaeological site private events",
      "Helicopter arrivals and charter flight logistics",
      "Full RCU-compliant zero-impact event production",
    ],
    faqs: [
      { q: "Can I host a private event at Maraya concert hall in AlUla?", a: "Yes. Saudi Event Management has experience securing private event access to the Maraya concert hall for invitation-only concerts, brand events, and ultra-luxury gatherings. We manage all RCU permitting and venue logistics." },
      { q: "What is the most exclusive event experience in Saudi Arabia?", a: "A private dinner at Hegra's ancient Nabataean tombs, illuminated by custom lighting and surrounded by AlUla's breathtaking sandstone mountains, is widely regarded as one of the most exclusive event experiences in the world." },
      { q: "VIP event planner near me AlUla", a: "Saudi Event Management is AlUla's most experienced luxury event planning partner, with a dedicated local team and preferred access to all major venues, heritage sites, and resort properties in the region." },
    ],
    relatedServices: [
      { title: "Destination Events", slug: "destination-events" },
      { title: "Event Production", slug: "event-production" },
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
    ],
  },

  // ── Destination Events ────────────────────────────────────────────────────
  "destination-events-alula": {
    city: "AlUla",
    cityAr: "العُلا",
    service: "Destination Events",
    parentSlug: "destination-events",
    titleTag: "Destination Events in AlUla | Desert & Heritage Event Planning KSA",
    metaDescription: "Breathtaking destination event planning in AlUla. Desert glamping, heritage site events, Maraya concerts, and corporate retreats in Saudi Arabia's most spectacular landscape.",
    h1: "Destination Events in AlUla, Saudi Arabia",
    h2: "Ancient Landscapes, Modern Luxury",
    heroImage: "/services/alula_gala_people.webp",
    heroImageAlt: "Destination events AlUla desert heritage Saudi Arabia Maraya",
    schemaDescription: "Specialist destination event planning in AlUla — corporate retreats, heritage site activations, desert glamping, and private concerts at Maraya.",
    intro: "AlUla is Saudi Arabia's crown jewel for destination events — a 200,000-year-old landscape offering UNESCO heritage sites, the iconic Maraya concert hall, and limitless desert horizons for extraordinary events.",
    details: "Saudi Event Management is the preferred destination event planning partner in AlUla, providing full logistics management, RCU permit facilitation, and production services for all event types in this unique environment.",
    bulletPoints: [
      "Corporate retreats and incentive trips in AlUla",
      "Heritage site event activations (Hegra, Dadan, Jabal Ikmah)",
      "Desert glamping and luxury overnight experiences",
      "Private concerts at Maraya concert hall",
      "Team building in AlUla's canyon landscape",
      "Full RCU permit processing and compliance management",
    ],
    faqs: [
      { q: "Why choose AlUla for a destination event?", a: "AlUla offers a combination found nowhere else — UNESCO World Heritage sites, the world-famous Maraya mirrored hall, dramatic sandstone mountain scenery, and a rapidly developing luxury resort infrastructure — creating an unmatchable setting for extraordinary events." },
      { q: "What logistics does AlUla destination event planning involve?", a: "AlUla destination events require charter flight or luxury road transfer arrangements, resort accommodation buyouts (Habitas AlUla, Banyan Tree), RCU site access permits, remote production logistics, and dedicated on-the-ground management teams." },
      { q: "destination event planner AlUla Saudi Arabia", a: "Saudi Event Management is AlUla's most experienced destination event planning company, with preferred access to all major venues, heritage sites, and resort properties in the region." },
    ],
    relatedServices: [
      { title: "Destination Events", slug: "destination-events" },
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Event Production", slug: "event-production" },
    ],
  },
  "destination-events-neom": {
    city: "NEOM",
    cityAr: "نيوم",
    service: "Destination Events",
    parentSlug: "destination-events",
    titleTag: "Destination Events in NEOM | Innovation Summits & Corporate Retreats KSA",
    metaDescription: "Cutting-edge destination event planning in NEOM. Innovation summits, corporate retreats, and brand activations inside Saudi Arabia's $500B giga-project.",
    h1: "Destination Events in NEOM, Saudi Arabia",
    h2: "The Future of Events in a Futuristic Landscape",
    heroImage: "/services/neom_summit_people.webp",
    heroImageAlt: "Destination events NEOM innovation summit Saudi Arabia",
    schemaDescription: "Specialist destination event planning in NEOM — innovation summits, technology conferences, corporate retreats, and brand activations in the giga-project.",
    intro: "NEOM represents an entirely new category of event destination — a $500B smart city development offering a futuristic backdrop unlike anywhere else on earth for visionary corporate and brand events.",
    details: "Saudi Event Management manages end-to-end logistics for events within the NEOM development, including NEOM's THE LINE, Sindalah island luxury resort, and AQABA. We navigate all project access requirements and co-ordinate with NEOM's event partnerships team.",
    bulletPoints: [
      "Innovation summits and technology conference management",
      "Corporate retreats at Sindalah Island NEOM",
      "Brand activations and experiential marketing in NEOM",
      "VIP delegation tours and stakeholder events",
      "Full logistics management (travel, accommodation, production)",
      "NEOM access permitting and event partnership facilitation",
    ],
    faqs: [
      { q: "Can you host a corporate event inside NEOM?", a: "Yes. Saudi Event Management manages corporate events inside the NEOM development, working directly with NEOM's event partnerships and hospitality teams to secure access, accommodation, and production logistics." },
      { q: "What types of events suit NEOM?", a: "NEOM is ideal for innovation summits, technology conferences, luxury brand activations, corporate retreats, and exclusive investor/stakeholder events. The futuristic, unprecedented landscape creates powerful brand associations for forward-thinking organisations." },
      { q: "destination event planner NEOM Saudi Arabia", a: "Saudi Event Management is among the most experienced destination event planners for NEOM, with established relationships with the project's hospitality and events division." },
    ],
    relatedServices: [
      { title: "Destination Events", slug: "destination-events" },
      { title: "Luxury & VIP Events", slug: "luxury-vip-events" },
      { title: "Conference Management", slug: "conferences" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────

/* ─── Arabic SEO-critical layer (phase 2). Service names keyed by parentSlug;
       title/H1/description are templated with the entry's `cityAr`, so all 20
       city×service pages localize without per-entry edits. Body stays English. ─── */
const SERVICE_AR: Record<string, string> = {
  "corporate-events": "إدارة فعاليات الشركات",
  "weddings": "تنظيم حفلات الزفاف الفاخرة",
  "exhibitions": "إدارة المعارض",
  "conferences": "إدارة المؤتمرات",
  "event-production": "الإنتاج الفعّالياتي",
  "cultural-events": "الفعاليات الثقافية والموسمية",
  "luxury-vip-events": "إدارة الفعاليات الفاخرة وكبار الشخصيات",
  "destination-events": "تخطيط فعاليات الوجهات",
};

function arText(data: { parentSlug: string; cityAr: string }) {
  const s = SERVICE_AR[data.parentSlug] ?? "إدارة الفعاليات";
  return {
    serviceAr: s,
    h1: `${s} في ${data.cityAr}`,
    titleTag: `${s} في ${data.cityAr} | إدارة الفعاليات السعودية`,
    metaDescription: `${s} في ${data.cityAr} مع إدارة الفعاليات السعودية — تخطيط وتنفيذ احترافي عبر شبكة موردين معتمدين بمعايير عالمية. اطلب عرضك المجاني خلال 24 ساعة.`,
  };
}

/* Arabic display titles for the related-services cards, keyed by service slug. */
const RELATED_TITLE_AR: Record<string, string> = {
  "corporate-events": "الفعاليات المؤسسية",
  "weddings": "حفلات الزفاف الفاخرة",
  "conferences": "إدارة المؤتمرات",
  "exhibitions": "المعارض والمعارض التجارية",
  "event-production": "الإنتاج الفعّالياتي",
  "cultural-events": "الفعاليات الثقافية والدينية",
  "luxury-vip-events": "الفعاليات الفاخرة وكبار الشخصيات",
  "destination-events": "فعاليات الوجهات",
};

/* ─── Arabic long-form body, keyed by slug. Mirrors the English intro / details /
       bulletPoints / faqs for each PSEO page. English PSEO_DATA stays untouched;
       the component picks this when locale is `ar`. ─── */
const PSEO_AR: Record<
  string,
  { intro: string; details: string; bulletPoints: string[]; faqs: { q: string; a: string }[] }
> = {
  "corporate-events-riyadh": {
    intro: "إدارة الفعاليات السعودية هي المنظّم الرائد للفعاليات المؤسسية في الرياض، تدير القمم عالية الأهمية، وحفلات العشاء، والملتقيات على مستوى مجلس الإدارة عبر أرقى قاعات العاصمة.",
    details: "من مركز كافد للمؤتمرات في مركز الملك عبدالله المالي إلى الريتز كارلتون الرياض، تضمن خبرتنا المحلية دقّة مطلقة، وامتثالًا للهيئة العامة للترفيه، وتوافقًا مع أهداف رؤية 2030 المؤسسية.",
    bulletPoints: [
      "مؤتمرات تنفيذية وجمعيات عمومية في كافد ومركز الملك عبدالعزيز للمؤتمرات",
      "حفلات عشاء سنوية وحفلات جوائز",
      "ملتقيات مجلس الإدارة وجلسات استراتيجية لكبار التنفيذيين",
      "فعاليات حكومية وشبه حكومية",
      "ضيافة كبار الشخصيات وإدارة البروتوكول الدبلوماسي",
      "بث مؤتمرات هجين وخدمات ترجمة",
    ],
    faqs: [
      { q: "ما شركات إدارة الفعاليات العاملة في الرياض؟", a: "إدارة الفعاليات السعودية هي الشركة الرائدة في إدارة الفعاليات المؤسسية بالرياض، تخدم أرامكو السعودية وصندوق تنمية الموارد البشرية وسابك وكبرى الجهات الحكومية من خلال شبكة تنسيق محلية معتمدة." },
      { q: "ما أفضل قاعات الفعاليات المؤسسية في الرياض؟", a: "تشمل أفضل قاعات الفعاليات المؤسسية في الرياض مركز كافد للمؤتمرات، ومركز الملك عبدالعزيز للمؤتمرات، والريتز كارلتون، وجي دبليو ماريوت، وفندق الفيصلية. ونحتفظ بشراكات مفضّلة مع كل قاعات الرياض الكبرى." },
      { q: "شركة فعاليات مؤسسية قريبة مني في الرياض", a: "مقرّ إدارة الفعاليات السعودية في الرياض بفريق متفرّغ متاح للاستشارة الميدانية السريعة ودعم لوجستيات الفعاليات في اليوم نفسه عبر العاصمة." },
    ],
  },
  "corporate-events-jeddah": {
    intro: "تقدّم إدارة الفعاليات السعودية فعاليات مؤسسية عالمية المستوى في جدة، مستثمرةً طاقة المدينة الكوزموبوليتانية ومجموعة قاعاتها المذهلة على البحر الأحمر لتجمّعات أعمال لا تُنسى.",
    details: "من عشاء مجلس الإدارة التنفيذي في روزوود جدة إلى الحفلات المؤسسية الكبرى في الريتز كارلتون، يضمن فريقنا في جدة تنفيذًا بلا أخطاء في كل مرة.",
    bulletPoints: [
      "قمم تنفيذية ومؤتمرات لكبار التنفيذيين في جدة",
      "حفلات مؤسسية في روزوود والريتز كارلتون ووالدورف أستوريا",
      "فعاليات وملتقيات مؤسسية على واجهة البحر الأحمر",
      "فعاليات إطلاق منتجات وتفعيلات علامات في جدة",
      "تجارب بناء فرق على كورنيش جدة",
      "إدارة ترفيه وضيافة متوافقة مع الهيئة العامة للترفيه",
    ],
    faqs: [
      { q: "ما أفضل قاعات الفعاليات المؤسسية في جدة؟", a: "تشمل أبرز قاعات جدة روزوود جدة، والريتز كارلتون جدة، ووالدورف أستوريا (قصر الشرق)، وإنتركونتيننتال جدة، ومركز جدة للمنتديات والفعاليات. ونؤمّن وصولًا مفضّلًا لها جميعًا." },
      { q: "من ينظّم المؤتمرات المؤسسية في جدة؟", a: "إدارة الفعاليات السعودية منظّم مؤتمرات مؤسسية رائد في جدة، يقدّم خدمات منظّم مؤتمرات احترافي متكاملة، وإنتاج صوت وصورة، وإدارة متحدثين، ومعالجة تصاريح الهيئة العامة للترفيه لأبرز فعاليات أعمال المدينة." },
      { q: "منظّم فعاليات أعمال قريب مني في جدة", a: "لدى إدارة الفعاليات السعودية فريق عمليات مخصّص في جدة يقدّم دعمًا ميدانيًا لكل الفعاليات المؤسسية عبر المدينة، من جولات القاعات الأولى إلى التقارير بعد الفعالية." },
    ],
  },
  "corporate-events-dammam": {
    intro: "تجلب إدارة الفعاليات السعودية خبرتها الكاملة في الفعاليات المؤسسية إلى الدمام والمنطقة الشرقية، خدمةً لقطاع الطاقة النابض في المنطقة واللوجستيات ومجتمع الأعمال التجاري.",
    details: "بعلاقات عميقة عبر مشهد قاعات الدمام الفاخرة — بما يشمل إنتركونتيننتال الخبر وماريوت الدمام — ننفّذ فعاليات مؤسسية بلا أخطاء لأكثر عملاء المنطقة الشرقية تطلّبًا.",
    bulletPoints: [
      "إدارة مؤتمرات قطاع النفط والغاز في الدمام",
      "حفلات أعمال وحفلات جوائز في المنطقة الشرقية",
      "جمعيات عمومية واجتماعات مساهمين للمؤسسات الإقليمية",
      "بناء فرق وملتقيات مؤسسية في المنطقة الشرقية",
      "إدارة فعاليات متوافقة مع أرامكو السعودية وسابك",
      "لوجستيات عبر الممر الدمام–الخبر–الظهران",
    ],
    faqs: [
      { q: "ما قاعات الفعاليات المؤسسية الموجودة في الدمام؟", a: "تشمل أبرز قاعات الدمام إنتركونتيننتال الخبر، وفور بوينتس باي شيراتون الدمام، وماريوت الدمام، وغرفة الدمام التجارية. وتحتفظ إدارة الفعاليات السعودية بوصول مفضّل لكل القاعات الكبرى." },
      { q: "هل تديرون فعاليات مؤسسية لأرامكو السعودية؟", a: "نعم. لدى إدارة الفعاليات السعودية خبرة واسعة في إدارة فعاليات مؤسسية متوافقة مع معايير أرامكو السعودية التشغيلية، تشمل القمم التنفيذية، ومؤتمرات التدريب، وفعاليات الاحتفال المؤسسي في المنطقة الشرقية." },
      { q: "شركة فعاليات مؤسسية قريبة مني في الدمام", a: "تقدّم إدارة الفعاليات السعودية دعمًا سريع الاستجابة للفعاليات المؤسسية عبر الدمام والخبر والظهران — بفريق مشاريع مخصّص للمنطقة الشرقية." },
    ],
  },
  "luxury-weddings-riyadh": {
    intro: "إدارة الفعاليات السعودية هي مخطّط الزفاف الفاخر الأكثر ثقةً في الرياض، تصمّم احتفالات استثنائية في أرقى قاعات المملكة باهتمام لا يساوم بكل تفصيل.",
    details: "من حفلات العشاء الخاصة الحميمة إلى الأعراس الكبرى في الريتز كارلتون الرياض التي تستضيف 1,500 ضيف، يحيي كبار مستشارينا ومديرونا الإبداعيون رؤيتك بأصالة سعودية ومعايير فخامة عالمية.",
    bulletPoints: [
      "تخطيط أعراس ملكية وراقية في الرياض",
      "إدارة مراسم عقد القران التقليدية",
      "اختيار القاعات — الريتز كارلتون وفورسيزونز وجي دبليو ماريوت الرياض",
      "تصميم أزهار مخصّص وديكور فاخر",
      "إدارة الزفّة والترفيه",
      "كونسيرج عروس متكامل وإدارة ضيوف كبار الشخصيات",
    ],
    faqs: [
      { q: "من أفضل منظّمي الزفاف في الرياض؟", a: "تُصنَّف إدارة الفعاليات السعودية باستمرار بين أفضل منظّمي الزفاف في الرياض، معروفةً بدقّة التخطيط، والأصالة الثقافية، والوصول الحصري لقاعات نخبوية كالريتز كارلتون وفورسيزونز." },
      { q: "كم تكلفة زفاف فاخر في الرياض؟", a: "تتراوح الأعراس الفاخرة في الرياض عادةً بين 150,000 و1,500,000 ريال حسب القاعة وعدد الضيوف ومستوى الإنتاج. ويقدّم مستشارونا عروضًا مخصّصة مصمّمة لرؤيتك وميزانيتك." },
      { q: "منظّم زفاف قريب مني في الرياض", a: "مقرّ إدارة الفعاليات السعودية في الرياض بفريق عروس مخصّص يقدّم استشارات حضورية، وجولات قاعات، وخدمات تخطيط زفاف شخصية عبر العاصمة." },
    ],
  },
  "luxury-weddings-jeddah": {
    intro: "تحوّل إدارة الفعاليات السعودية مواقع جدة المذهلة على البحر الأحمر إلى تجارب زفاف استثنائية. وأعراسنا على شاطئ البحر مشهورة بأناقتها وخصوصيتها وجمالها السينمائي.",
    details: "نستثمر شراكات حصرية مع أرقى قاعات جدة الساحلية — بما يشمل والدورف أستوريا (قصر الشرق)، وبارك حياة، وروزوود جدة — لتقديم أعراس تخطف الأنفاس كأفق البحر الأحمر.",
    bulletPoints: [
      "مراسم زفاف على شاطئ البحر الأحمر",
      "اختيار القاعات — والدورف أستوريا وروزوود وبارك حياة جدة",
      "احتفالات عقد قران ملكية وتقليدية",
      "تصميم أزهار مخصّص وديكور فاخر على الواجهة البحرية",
      "كونسيرج عروس متكامل وإدارة ضيوف كبار الشخصيات",
      "ترفيه وزفّة وإنتاج إعلامي",
    ],
    faqs: [
      { q: "ما أفضل فنادق الزفاف في جدة؟", a: "تشمل أفضل فنادق الزفاف في جدة والدورف أستوريا (قصر الشرق) لإطلالاته على البحر الأحمر، وبارك حياة جدة لأناقته المعاصرة، والريتز كارلتون جدة للفخامة والضخامة." },
      { q: "كيف أجد منظّم زفاف في جدة؟", a: "إدارة الفعاليات السعودية هي شركة تخطيط الزفاف الفاخر الأولى في جدة، بفريق عروس مخصّص يقدّم استشارات شخصية، وجولات قاعات، وخدمات تخطيط متكاملة من الفكرة إلى الاحتفال." },
      { q: "منظّم زفاف قريب مني في جدة", a: "لدى إدارة الفعاليات السعودية فريق عروس مخصّص في جدة يقدّم استشارات حضورية وإدارة ميدانية عبر كل قاعات الزفاف الكبرى في جدة." },
    ],
  },
  "luxury-weddings-dammam": {
    intro: "تجلب إدارة الفعاليات السعودية تميّز تخطيط الزفاف بخمس نجوم إلى الدمام والمنطقة الشرقية، بتقديم احتفالات مخصّصة تمزج الضيافة السعودية التقليدية بالفخامة المعاصرة.",
    details: "لفريق العروس لدينا في المنطقة الشرقية علاقات عميقة مع أرقى قاعات المنطقة ومقدّمي التموين والترفيه — ما يضمن تنسيق كل تفصيل في زفافك بالدمام بإتقان.",
    bulletPoints: [
      "تخطيط أعراس تقليدية وملكية في الدمام",
      "اختيار قاعات كبار الشخصيات عبر المنطقة الشرقية",
      "تنسيق مراسم عقد القران والاستقبال",
      "ديكور وأزهار وترفيه مخصّص",
      "تموين فاخر وخدمة بخمس نجوم",
      "تصوير فوتوغرافي وفيديو وإنتاج إعلامي",
    ],
    faqs: [
      { q: "هل يوجد منظّمو زفاف فاخر في الدمام؟", a: "نعم. تقدّم إدارة الفعاليات السعودية خدمات تخطيط زفاف فاخر متكاملة في الدمام، بفريق مخصّص للمنطقة الشرقية يقدّم إدارة شخصية شاملة لكل أحجام وأنماط الأعراس." },
      { q: "ما قاعات الزفاف المتاحة في الدمام؟", a: "تشمل أبرز قاعات الزفاف في الدمام إنتركونتيننتال الخبر، وماريوت الدمام، وعددًا من القاعات الخاصة الحصرية. ونختار ونؤمّن القاعة المثالية حسب عدد ضيوفك وتفضيلات نمطك." },
      { q: "منظّم زفاف قريب مني في الدمام", a: "لدى إدارة الفعاليات السعودية فريق مقرّه المنطقة الشرقية يقدّم دعمًا محليًا فوريًا لتخطيط الزفاف في الدمام والخبر والظهران." },
    ],
  },
  "exhibitions-jeddah": {
    intro: "تقدّم إدارة الفعاليات السعودية خدمات إدارة معارض رائدة في جدة، تربط العلامات الدولية بالأسواق السعودية عبر معارض تجارية مُنتجة باحتراف في مركز جدة للمنتديات والفعاليات.",
    details: "يقدّم فريق معارضنا في جدة خدمات متكاملة — من تصميم مفهوم الجناح إلى معالجة تصاريح الهيئة العامة للترفيه والتوفيق بين الشركات — لتضمن أن تستحوذ علامتك على الانتباه على مسرح جدة التجاري النابض.",
    bulletPoints: [
      "إدارة معارض تجارية في مركز جدة للمنتديات والفعاليات",
      "تصميم أجنحة معارض مخصّصة وبناء أكشاك في جدة",
      "توفيق بين الشركات وخدمات العارضين",
      "دعم دخول العلامات الدولية والوصول إلى السوق",
      "فعاليات عرض منتجات وعروض تجارية",
      "إدارة العملاء المحتملين والتقارير بعد الفعالية",
    ],
    faqs: [
      { q: "ما قاعات المعارض المتاحة في جدة؟", a: "القاعة الرئيسية للمعارض في جدة هي مركز جدة للمنتديات والفعاليات. وتحتفظ إدارة الفعاليات السعودية بمكانة منظّم مفضّل في هذه القاعة، ما يوفّر حجوزات مساحة سريعة ودعمًا لوجستيًا." },
      { q: "من يدير المعارض التجارية في جدة؟", a: "إدارة الفعاليات السعودية منظّم معارض تجارية رائد في جدة، يقدّم إدارة معارض متكاملة للعارضين المحليين والدوليين عبر كل قطاعات الصناعة." },
      { q: "باني أجنحة معارض قريب مني في جدة", a: "يقدّم فريق معارضنا في جدة استشارة تصميم أجنحة سريعة في الموقع، وبناءً، وخدمات هوية لأي معرض تجاري أو فعالية عرض تجاري في المدينة." },
    ],
  },
  "exhibitions-dammam": {
    intro: "تجلب إدارة الفعاليات السعودية إدارة معارض عالمية المستوى إلى مشهد الدمام التجاري الغني بقطاع الطاقة، تربط العلامات العالمية بمجتمع أعمال المنطقة الشرقية عالي القيمة.",
    details: "تستضيف الدمام معارض تجارية حيوية لقطاعات النفط والغاز والبتروكيماويات والصناعة. ويتنقّل فريقنا المتخصص بين المتطلبات الفريدة للمعارض التقنية ووفود كبار الشخصيات الحكومية في هذا السوق المحوري.",
    bulletPoints: [
      "إدارة معارض قطاع النفط والغاز في الدمام",
      "تصميم أجنحة معارض صناعية تقنية",
      "معارض الأعمال وإطلاق المنتجات في المنطقة الشرقية",
      "خدمات معارض متوافقة مع أرامكو السعودية وسابك",
      "إدارة المندوبين وضيافة كبار الشخصيات",
      "تحليلات بعد المعرض ودعم تحويل العملاء",
    ],
    faqs: [
      { q: "ما قاعات المعارض الموجودة في الدمام؟", a: "تشمل قاعات المعارض الرئيسية في الدمام مبنى غرفة التجارة والصناعة وعددًا من مساحات مؤتمرات الفنادق الكبرى. وتسهّل إدارة الفعاليات السعودية أيضًا بناء معارض خارجية مخصّصة للمنطقة الشرقية." },
      { q: "هل تديرون معارض النفط والغاز في السعودية؟", a: "نعم. لدى إدارة الفعاليات السعودية خبرة واسعة في تنظيم معارض قطاع النفط والغاز والمشاركة فيها، بما يشمل معارض الشرقية، والتنسيق بين اللاعبين العالميين ومنظومة سلسلة توريد أرامكو السعودية/سابك." },
      { q: "شركة معارض قريبة مني في الدمام", a: "فريقنا في المنطقة الشرقية مقرّه ممر الدمام–الخبر، يقدّم دعمًا محليًا فوريًا لكل متطلبات المعارض والعروض التجارية عبر المنطقة." },
    ],
  },
  "conference-management-jeddah": {
    intro: "تقدّم إدارة الفعاليات السعودية إدارة مؤتمرات خبيرة في جدة، تنتج قممًا مؤثّرة وتجمّعات مهنية في أرقى قاعات المدينة على البحر الأحمر.",
    details: "من مؤتمرات غرفة جدة إلى قمم الرعاية الصحية والتجارة الدولية، يتولّى فريق منظّم المؤتمرات الاحترافي لدينا كل شيء — التفاوض على القاعة، ولوجستيات المتحدثين، وتصاريح الهيئة العامة للترفيه، وإنتاج الصوت والصورة، وإدارة المندوبين.",
    bulletPoints: [
      "قمم الأعمال في مركز جدة للمنتديات والفعاليات",
      "خدمات منظّم مؤتمرات احترافي وأنظمة تسجيل المندوبين",
      "إدارة المتحدثين وتنسيق غرف الاستعداد",
      "بث هجين وترجمة فورية",
      "بروتوكول كبار الشخصيات واستقبال الشخصيات المهمة",
      "إعلام بعد المؤتمر وتوزيع صحفي",
    ],
    faqs: [
      { q: "ما أفضل قاعات المؤتمرات في جدة؟", a: "تشمل أبرز قاعات المؤتمرات في جدة مركز جدة للمنتديات والفعاليات، وروزوود جدة، والريتز كارلتون جدة، وهيلتون جدة. ونتفاوض على أسعار ومواصفات تقنية مفضّلة في كل القاعات." },
      { q: "من ينظّم المؤتمرات في جدة؟", a: "إدارة الفعاليات السعودية منظّم مؤتمرات رائد في جدة، يخدم المندوبين الدوليين والجهات الحكومية والمنظمات التجارية بخدمات منظّم مؤتمرات احترافي متكاملة." },
      { q: "منظّم مؤتمرات قريب مني في جدة", a: "يقدّم فريقنا في جدة دعمًا ميدانيًا فوريًا لإدارة المؤتمرات — من معاينة القاعات إلى الإدارة التقنية في اليوم واستقبال كبار الشخصيات." },
    ],
  },
  "conference-management-dammam": {
    intro: "تقدّم إدارة الفعاليات السعودية إدارة مؤتمرات متكاملة في الدمام، تخدم قطاعات الطاقة والصناعة والتجارة النابضة في المنطقة الشرقية بدقّة واحترافية.",
    details: "يدير فريق مؤتمراتنا في الدمام كل شيء من الندوات التقنية متعددة الأيام المتوافقة مع متطلبات أرامكو السعودية التشغيلية إلى قمم غرف التجارة الإقليمية — بتنفيذ سلس ودعم تقني كامل.",
    bulletPoints: [
      "مؤتمرات تقنية للنفط والغاز في الدمام",
      "قمم غرف التجارة ومنتديات الأعمال",
      "بث هجين وإدارة مندوبين عن بُعد",
      "ترجمة فورية عربية-إنجليزية",
      "بروتوكول وفود حكومية من كبار الشخصيات",
      "اختيار القاعات عبر ممر الدمام–الخبر",
    ],
    faqs: [
      { q: "من يدير المؤتمرات في الدمام؟", a: "تقدّم إدارة الفعاليات السعودية خدمات منظّم مؤتمرات احترافي وإدارة مؤتمرات متكاملة في الدمام، بفريق متخصص خبير في المؤتمرات الصناعية التقنية لقطاع النفط والغاز." },
      { q: "هل توجد قاعات مؤتمرات في الدمام؟", a: "نعم. تشمل أبرز قاعات المؤتمرات في الدمام القاعة الكبرى في إنتركونتيننتال الخبر، وماريوت الدمام، وغرفة الدمام التجارية. ويؤمّن فريقنا هذه القاعات ويديرها لكل متطلبات المؤتمرات." },
      { q: "إدارة مؤتمرات قريبة مني في الدمام", a: "لدى إدارة الفعاليات السعودية فريق ميداني في المنطقة الشرقية يقدّم إدارة مؤتمرات متكاملة من التخطيط الأولي إلى التقارير بعد الفعالية." },
    ],
  },
  "event-production-riyadh": {
    intro: "إدارة الفعاليات السعودية هي شركة الإنتاج الفعّالياتي الرائدة في الرياض، تقدّم أنظمة صوت وصورة بجودة الحفلات، وبناءات مسرح مخصّصة، وإضاءة ذكية لأكثر فعاليات العاصمة تطلّبًا.",
    details: "من إنتاج عروض اليوم الوطني وتفعيلات موسم الرياض إلى عشاء مجلس الإدارة الحميم في الريتز كارلتون، يقدّم فريق إنتاجنا في الرياض تميّزًا تقنيًا معتمدًا من ISO لكل مشروع.",
    bulletPoints: [
      "تصميم وتصنيع مسارح مخصّصة في الرياض",
      "هندسة صوت بجودة الحفلات (L-Acoustics، d&b)",
      "إضاءة ذكية وإضاءة معمارية",
      "شاشات LED وإسقاط ضوئي",
      "إنتاجات موسم الرياض واليوم الوطني",
      "طاقم صوت وصورة ميداني ومديرون تقنيون",
    ],
    faqs: [
      { q: "ما شركات الإنتاج الفعّالياتي العاملة في الرياض؟", a: "إدارة الفعاليات السعودية من شركات الإنتاج الفعّالياتي الرائدة في الرياض، بمستودع إنتاج داخلي متكامل، وطاقم تقني معتمد، وسجل أعمال مثبت في إنتاجات اليوم الوطني وموسم الرياض." },
      { q: "كم تكلفة إنتاج الصوت والصورة في الرياض؟", a: "تبدأ تكاليف إنتاج الصوت والصورة في الرياض من 18,000 ريال لحزمة فعالية مؤسسية ليوم كامل. ويُسعّر تصنيع المسرح وشاشات LED والإسقاط الضوئي بشكل منفصل حسب الحجم والتعقيد." },
      { q: "شركة إنتاج فعاليات قريبة مني في الرياض", a: "مستودع إنتاجنا وفريقنا في الرياض، ما يجعلنا شركة الإنتاج الفعّالياتي الأكثر قربًا لأي متطلب فعالية في العاصمة — من حزم الصوت والصورة في الأسبوع نفسه إلى إنتاجات الحفلات الكبرى." },
    ],
  },
  "event-production-jeddah": {
    intro: "يقدّم فريق الإنتاج في جدة لدى إدارة الفعاليات السعودية إنتاجات تقنية مبهرة لحفلات البحر الأحمر، والقمم المؤسسية، والفعاليات الخاصة في أرقى قاعات المدينة.",
    details: "من بناءات المسرح الخارجية على شاطئ كورنيش جدة إلى إعدادات الصوت والصورة المتطوّرة في قاعات والدورف أستوريا، يجمع فريق إنتاجنا الدقّة التقنية بالرؤية الإبداعية.",
    bulletPoints: [
      "بناءات مسرح ساحلية خارجية على كورنيش جدة",
      "إنتاج صوت وصورة للقاعات في والدورف أستوريا وروزوود",
      "أنظمة صوت بجودة الحفلات في جدة",
      "إضاءة ذكية وتصميم مشهدي",
      "شاشات LED وإسقاط للفعاليات الداخلية والخارجية",
      "طاقم تقني كامل وإدارة في اليوم",
    ],
    faqs: [
      { q: "هل تقدّمون إنتاج فعاليات خارجية في جدة؟", a: "نعم. تتخصّص إدارة الفعاليات السعودية في الإنتاج الفعّالياتي الخارجي على كورنيش جدة وساحل البحر الأحمر — بما يشمل بناءات مسرح مقاومة للطقس، وأنظمة صوت خارجية، وتوليد طاقة للفعاليات الشاطئية." },
      { q: "تأجير نظام صوت قريب مني في جدة", a: "نقدّم تأجير أنظمة صوت بجودة الحفلات في جدة تشمل أنظمة لاين-أراي، وحزم ميكروفونات لاسلكية، ودعم مشغّل صوت وصورة كاملًا لفعاليات أي حجم وموقع." },
      { q: "شركة إنتاج فعاليات قريبة مني في جدة", a: "لدى إدارة الفعاليات السعودية فريق عمليات في جدة يقدّم دعم إنتاج فعاليات سريع الاستجابة عبر المدينة، من حزم الصوت والصورة في الأسبوع نفسه إلى بناءات المسرح الكاملة." },
    ],
  },
  "event-production-alula": {
    intro: "تنفيذ الفعاليات في العلا يتطلّب خبرة تقنية ولوجستية غير مسبوقة. وتقدّم إدارة الفعاليات السعودية خدمات إنتاج متكاملة مصمّمة لهذا المشهد الفريد المحمي من اليونسكو.",
    details: "من عروض الضوء الغامرة التي تُضيء الحجر الرملي النبطي القديم في الحِجر إلى مسارح الحفلات المخصّصة المبنية في مرايا، يتقن فريق إنتاجنا المتطلبات الاستثنائية لبيئات التراث الصحراوي بامتثال كامل للهيئة الملكية للعلا.",
    bulletPoints: [
      "إسقاط ضوئي معماري على مواقع العلا التراثية",
      "تصميم وتصنيع مسارح صحراوية مخصّصة",
      "صوت بجودة الحفلات للبيئات الصحراوية الخارجية",
      "توليد طاقة وبنية تحتية لوجستية نائية",
      "إنتاج بأثر صفري بامتثال كامل للهيئة الملكية للعلا",
      "بيئات تقنية متحكّم بمناخها",
    ],
    faqs: [
      { q: "هل يمكنكم الإسقاط الضوئي في مواقع العلا التراثية؟", a: "نعم. نفّذت إدارة الفعاليات السعودية تفعيلات إسقاط ضوئي على تكوينات العلا الرملية ومبانيها التراثية، بالتعاون مع الهيئة الملكية لمحافظة العلا لوصول الموقع وبروتوكولات الإنتاج بأثر صفري." },
      { q: "كيف تديرون إمداد الطاقة للفعاليات في العلا؟", a: "ننشر أنظمة مولّدات صناعية بتكييف طاقة نظيف، لضمان طاقة مستقرة وهادئة لكل معدات الصوت والصورة والإضاءة في المواقع الصحراوية النائية — بما يشمل بطاريات احتياطية ومولّدات صامتة للمواقع التراثية الحساسة للضوضاء." },
      { q: "شركة إنتاج فعاليات في العلا بالسعودية", a: "إدارة الفعاليات السعودية هي شريك الإنتاج الفعّالياتي الأكثر خبرة في العلا، بسجل أعمال في تقديم إنتاجات عالمية المستوى للحفلات الخاصة وتفعيلات العلامات وفعاليات المواقع التراثية." },
    ],
  },
  "cultural-events-riyadh": {
    intro: "إدارة الفعاليات السعودية هي المنظّم الرائد للفعاليات الثقافية في الرياض، تقدّم احتفالات أصيلة عالية الأثر تكرّم تراث المملكة الغني وتقاليدها الموسمية طوال العام.",
    details: "من حفلات اليوم الوطني (23 سبتمبر) الكبرى في قصر المربع إلى إفطارات رمضان المؤسسية الحميمة في الريتز كارلتون، يجلب فريق فعالياتنا الثقافية معرفة سياقية عميقة وتميّزًا تشغيليًا لكل مناسبة.",
    bulletPoints: [
      "تفعيلات إفطار وسحور رمضان المؤسسية في الرياض",
      "تخطيط حفلات اليوم الوطني في 23 سبتمبر",
      "فعاليات يوم التأسيس التراثية (22 فبراير)",
      "احتفالات عيد الفطر والأضحى المؤسسية",
      "تفعيلات علامات موسم الرياض وفعاليات الهيئة العامة للترفيه",
      "ترفيه سعودي تقليدي وعروض ثقافية",
    ],
    faqs: [
      { q: "من ينظّم فعاليات اليوم الوطني في الرياض؟", a: "إدارة الفعاليات السعودية منظّم رائد لفعاليات اليوم الوطني في الرياض، يدير الحفلات الوطنية الكبرى، والمهرجانات المجتمعية، والاحتفالات المؤسسية للعطلة الوطنية في 23 سبتمبر." },
      { q: "كم مبكرًا يجب حجز منظّم فعاليات رمضان في الرياض؟", a: "نوصي بالحجز قبل شهرين إلى ثلاثة أشهر على الأقل من بداية رمضان. فالقاعات الشهيرة في الرياض تُحجز بسرعة لفعاليات الإفطار المؤسسية، والحجز المبكر يضمن الوصول لأفضل المساحات وفرق التموين." },
      { q: "شركة فعاليات ثقافية قريبة مني في الرياض", a: "قسم الفعاليات الثقافية في إدارة الفعاليات السعودية مقرّه الرياض، يقدّم استشارة فورية ودعم تخطيط ميداني لأي احتفال ثقافي أو موسمي في العاصمة." },
    ],
  },
  "cultural-events-jeddah": {
    intro: "تجمع إدارة الفعاليات السعودية بين روح جدة الكوزموبوليتانية وتقاليدها الحجازية العريقة في احتفالات موسمية استثنائية، من تفعيلات رمضان على الواجهة البحرية إلى حفلات اليوم الوطني.",
    details: "هوية جدة الحجازية الفريدة تجعلها لوحة خاصة للفعاليات الثقافية. ويفهم فريقنا تقاليد المدينة المميّزة، وقاعاتها المفضّلة، وتوقعات العائلات المحلية والمقيمين الدوليين معًا.",
    bulletPoints: [
      "فعاليات إفطار وسحور رمضان على كورنيش جدة",
      "احتفالات اليوم الوطني والحفلات المؤسسية في جدة",
      "فعاليات عيد الفطر والأضحى العائلية والمؤسسية",
      "ترفيه حجازي تقليدي وبرامج ثقافية",
      "تفعيلات علامات خلال المواسم الثقافية المعتمدة من الهيئة العامة للترفيه",
      "فعاليات بثيمات تراثية في حي البلد التاريخي بجدة",
    ],
    faqs: [
      { q: "كيف أنظّم فعالية إفطار رمضاني في جدة؟", a: "الخطوة الأولى تأمين قاعة — فالمواقع على الواجهة البحرية وقاعات الفنادق تُحجز بسرعة. وتقدّم إدارة الفعاليات السعودية تخطيط فعاليات إفطار رمضان متكاملًا في جدة، من تصميم الإعداد بأسلوب المجلس إلى التموين والترفيه التقليدي." },
      { q: "من يخطّط فعاليات اليوم الوطني في جدة؟", a: "إدارة الفعاليات السعودية منظّم خبير لفعاليات اليوم الوطني في جدة، يصنع احتفالات وطنية، وحفلات مؤسسية، وفعاليات مجتمعية لإحياء العطلة الوطنية في 23 سبتمبر." },
      { q: "شركة فعاليات رمضان قريبة مني في جدة", a: "يقدّم فريق فعالياتنا الثقافية في جدة دعمًا فوريًا لتفعيلات رمضان والإفطارات المؤسسية وفعاليات العلامات خلال الشهر الكريم عبر كل قاعات جدة الكبرى." },
    ],
  },
  "vip-events-jeddah": {
    intro: "يقدّم قسم الفخامة في إدارة الفعاليات السعودية أكثر الفعاليات الخاصة حصرية على ساحل جدة بالبحر الأحمر — من حفلات اليخوت الفائقة إلى إطلاق العلامات بالدعوة فقط في والدورف أستوريا.",
    details: "مزيج جدة الفريد من التطوّر الكوزموبوليتاني وفخامة البحر الأحمر يخلق فرصًا لا تُضاهى لفعاليات كبار الشخصيات الخاصة للغاية. ويعمل فريق الفخامة لدينا في جدة بحصافة تامة ودقّة فائقة العناية.",
    bulletPoints: [
      "فعاليات يخوت فاخرة خاصة على البحر الأحمر",
      "حفلات شاطئية حصرية وتجارب طعام على الواجهة البحرية",
      "إدارة فعاليات العائلات الملكية في جدة",
      "كونسيرج كبار الأثرياء وتخطيط حفلات خاصة",
      "إطلاق علامات بالدعوة فقط في قاعات جدة الفاخرة",
      "تنسيق حماية قريبة وأمن كبار الشخصيات",
    ],
    faqs: [
      { q: "هل يمكنكم ترتيب فعاليات يخوت خاصة في جدة؟", a: "نعم. تدير إدارة الفعاليات السعودية فعاليات يخوت فاخرة حصرية على ساحل جدة بالبحر الأحمر، تشمل العشاء الخاص، والترفيه، وخدمات كونسيرج فاخرة على متن سفن مستأجرة." },
      { q: "من هم منظّمو الفعاليات الفاخرة في جدة؟", a: "إدارة الفعاليات السعودية هي منظّم الفعاليات الفاخرة الأول في جدة، يخدم العائلات الملكية وكبار التنفيذيين وكبار الأثرياء بتجارب فعاليات فاخرة للغاية وسرّية تمامًا." },
      { q: "منظّم فعاليات فاخرة قريب مني في جدة", a: "فريق الفعاليات الفاخرة لدينا في جدة متاح للاستشارات الخاصة، يقدّم حصافة تامة وتخطيط خدمة فائقة العناية لكل الفعاليات رفيعة المستوى على ساحل البحر الأحمر." },
    ],
  },
  "vip-events-alula": {
    intro: "العلا هي أكثر لوحات السعودية استثنائية لفعاليات كبار الشخصيات الفاخرة للغاية. وتخلق إدارة الفعاليات السعودية تجارب مرّة في العمر وسط مدن نبطية قديمة، وجبال رملية شاهقة، وقاعة مرايا الأيقونية.",
    details: "يعمل فريق الفخامة لدينا في العلا بتعاون وثيق مع الهيئة الملكية لمحافظة العلا، لضمان اندماج فعاليتك الخاصة بسلاسة مع المشهد مع استيفاء كل متطلبات حفظ التراث.",
    bulletPoints: [
      "حفلات خاصة في قاعة مرايا بالعلا",
      "فعاليات عشاء حصرية في موقع الحِجر التراثي لليونسكو",
      "تخييم فاخر مع مراقبة النجوم والترفيه التقليدي",
      "فعاليات خاصة في موقع دادان الأثري",
      "وصول بالمروحيات ولوجستيات رحلات مستأجرة",
      "إنتاج فعاليات بأثر صفري بامتثال كامل للهيئة الملكية للعلا",
    ],
    faqs: [
      { q: "هل يمكنني استضافة فعالية خاصة في قاعة مرايا بالعلا؟", a: "نعم. لدى إدارة الفعاليات السعودية خبرة في تأمين وصول الفعاليات الخاصة إلى قاعة مرايا للحفلات بالدعوة فقط، وفعاليات العلامات، والتجمّعات الفاخرة للغاية. ونحن ندير كل تصاريح الهيئة الملكية ولوجستيات القاعة." },
      { q: "ما أكثر تجربة فعالية حصرية في السعودية؟", a: "عشاء خاص في مقابر الحِجر النبطية القديمة، مضاءً بإضاءة مخصّصة ومحاطًا بجبال العلا الرملية الخلّابة، يُعدّ على نطاق واسع من أكثر تجارب الفعاليات حصرية في العالم." },
      { q: "منظّم فعاليات كبار شخصيات قريب مني في العلا", a: "إدارة الفعاليات السعودية هي شريك تخطيط الفعاليات الفاخرة الأكثر خبرة في العلا، بفريق محلي مخصّص ووصول مفضّل لكل القاعات والمواقع التراثية والمنتجعات الكبرى في المنطقة." },
    ],
  },
  "destination-events-alula": {
    intro: "العلا هي جوهرة تاج السعودية لفعاليات الوجهات — مشهد عمره 200,000 عام يقدّم مواقع تراث عالمي لليونسكو، وقاعة مرايا الأيقونية، وآفاقًا صحراوية لا حدود لها لفعاليات استثنائية.",
    details: "إدارة الفعاليات السعودية هي شريك تخطيط فعاليات الوجهات المفضّل في العلا، تقدّم إدارة لوجستيات متكاملة، وتسهيل تصاريح الهيئة الملكية للعلا، وخدمات إنتاج لكل أنواع الفعاليات في هذه البيئة الفريدة.",
    bulletPoints: [
      "ملتقيات مؤسسية ورحلات حوافز في العلا",
      "تفعيلات فعاليات المواقع التراثية (الحِجر، دادان، جبل عكمة)",
      "تخييم فاخر وتجارب مبيت فاخرة",
      "حفلات خاصة في قاعة مرايا",
      "بناء فرق في مشهد أودية العلا",
      "معالجة تصاريح الهيئة الملكية للعلا وإدارة الامتثال بالكامل",
    ],
    faqs: [
      { q: "لماذا تختار العلا لفعالية وجهة؟", a: "تقدّم العلا مزيجًا لا يوجد في أي مكان آخر — مواقع تراث عالمي لليونسكو، وقاعة مرايا المكسوّة بالمرايا الشهيرة عالميًا، ومشاهد جبال رملية درامية، وبنية تحتية منتجعات فاخرة سريعة التطوّر — ما يخلق موقعًا لا يُضاهى لفعاليات استثنائية." },
      { q: "ما اللوجستيات التي يتضمّنها تخطيط فعاليات الوجهة في العلا؟", a: "تتطلّب فعاليات الوجهة في العلا ترتيبات رحلات مستأجرة أو نقل بري فاخر، واستحواذ إقامة المنتجعات (حبيتاس العلا، بانيان تري)، وتصاريح وصول الموقع من الهيئة الملكية، ولوجستيات إنتاج نائية، وفرق إدارة ميدانية مخصّصة." },
      { q: "منظّم فعاليات وجهة في العلا بالسعودية", a: "إدارة الفعاليات السعودية هي شركة تخطيط فعاليات الوجهة الأكثر خبرة في العلا، بوصول مفضّل لكل القاعات والمواقع التراثية والمنتجعات الكبرى في المنطقة." },
    ],
  },
  "destination-events-neom": {
    intro: "تمثّل نيوم فئة جديدة تمامًا من وجهات الفعاليات — مدينة ذكية بقيمة 500 مليار دولار تقدّم خلفية مستقبلية لا مثيل لها على الأرض لفعاليات مؤسسية وعلامات ذات رؤية.",
    details: "تدير إدارة الفعاليات السعودية لوجستيات متكاملة للفعاليات داخل مشروع نيوم، بما يشمل ذا لاين، ومنتجع جزيرة سندالة الفاخر، والعقبة. ونتنقّل بين كل متطلبات الوصول إلى المشروع وننسّق مع فريق شراكات الفعاليات في نيوم.",
    bulletPoints: [
      "إدارة قمم الابتكار ومؤتمرات التقنية",
      "ملتقيات مؤسسية في جزيرة سندالة بنيوم",
      "تفعيلات علامات وتسويق تجريبي في نيوم",
      "جولات وفود كبار الشخصيات وفعاليات أصحاب المصلحة",
      "إدارة لوجستيات متكاملة (السفر، والإقامة، والإنتاج)",
      "تصاريح الوصول إلى نيوم وتسهيل شراكات الفعاليات",
    ],
    faqs: [
      { q: "هل يمكنكم استضافة فعالية مؤسسية داخل نيوم؟", a: "نعم. تدير إدارة الفعاليات السعودية فعاليات مؤسسية داخل مشروع نيوم، بالعمل مباشرةً مع فرق شراكات الفعاليات والضيافة في نيوم لتأمين الوصول والإقامة ولوجستيات الإنتاج." },
      { q: "ما أنواع الفعاليات التي تناسب نيوم؟", a: "نيوم مثالية لقمم الابتكار، ومؤتمرات التقنية، وتفعيلات العلامات الفاخرة، والملتقيات المؤسسية، وفعاليات المستثمرين/أصحاب المصلحة الحصرية. والمشهد المستقبلي غير المسبوق يخلق ارتباطات علامة قوية للمؤسسات ذات التفكير المستقبلي." },
      { q: "منظّم فعاليات وجهة في نيوم بالسعودية", a: "إدارة الفعاليات السعودية من أكثر منظّمي فعاليات الوجهة خبرة في نيوم، بعلاقات راسخة مع قسم الضيافة والفعاليات في المشروع." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(PSEO_DATA).flatMap((slug) => [
    { locale: "en", slug },
    { locale: "ar", slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = PSEO_DATA[slug];
  if (!data) return {};

  const isAr = locale === "ar";
  const ar = arText(data);
  // AR title already carries the Arabic brand, so use `absolute` to bypass the
  // layout's "%s | Saudi Event Management" template (avoids a doubled brand).
  const title = isAr ? { absolute: ar.titleTag } : data.titleTag;
  const ogTitle = isAr ? ar.titleTag : data.titleTag;
  const description = isAr ? ar.metaDescription : data.metaDescription;
  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      images: [{ url: data.heroImage, width: 1200, height: 630, alt: data.heroImageAlt }],
    },
  };
}

export default async function PseoServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data = PSEO_DATA[slug];

  if (!data) notFound();

  const isAr = locale === "ar";
  const ar = arText(data);
  const arHref = isAr ? "/ar" : "";
  const arBody = isAr ? PSEO_AR[slug] : undefined;
  const relTitle = (rel: { title: string; slug: string }) =>
    isAr ? RELATED_TITLE_AR[rel.slug] ?? rel.title : rel.title;

  const canonicalUrl = `https://saudieventmanagement.com/services/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${data.service} in ${data.city}`,
        "description": data.schemaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Saudi Event Management",
          "url": "https://saudieventmanagement.com",
        },
        "areaServed": { "@type": "City", "name": data.city },
        "serviceType": data.service,
        "url": canonicalUrl,
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
          { "@type": "ListItem", "position": 3, "name": data.service, "item": `https://saudieventmanagement.com/services/${data.parentSlug}` },
          { "@type": "ListItem", "position": 4, "name": `${data.service} in ${data.city}`, "item": canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-slate-800">
        <WhatsAppButton />
        <Navbar darkHero={true} />

        {/* ── Hero ── */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt}
            fill
            priority
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/50 to-ink-950/90" />
          <div className="relative z-10 container-luxury text-center px-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin size={14} className="text-gold-400" />
              <span className="text-gold-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                {isAr ? `${data.cityAr} • ${ar.serviceAr}` : `${data.city} (${data.cityAr}) • ${data.service}`}
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight max-w-4xl mx-auto">
              {isAr ? ar.h1 : data.h1}
            </h1>
            <p className="text-sand-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              {isAr ? (
                <>
                  <strong className="text-white">إدارة الفعاليات السعودية</strong> — المتخصص الأول في{" "}
                  <strong className="text-white">{ar.serviceAr}</strong> في{" "}
                  <strong className="text-white">{data.cityAr}، المملكة العربية السعودية</strong>.
                </>
              ) : (
                <>
                  <strong className="text-white">Saudi Event Management</strong> — the leading{" "}
                  <strong className="text-white">{data.service}</strong> specialist in{" "}
                  <strong className="text-white">{data.city}, Saudi Arabia</strong>.
                </>
              )}
            </p>
            <a
              href="https://wa.me/966539388072"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg"
            >
              {isAr ? `استشر خبراءنا في ${data.cityAr}` : `Consult Our ${data.city} Experts`}
            </a>
          </div>
        </section>

        {/* ── Breadcrumb ── */}
        <nav className="bg-slate-50 border-b border-slate-200 py-3 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <Link href={arHref || "/"} className="hover:text-slate-900 transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
            <ChevronRight size={10} />
            <Link href={`${arHref}/services`} className="hover:text-slate-900 transition-colors">{isAr ? "الخدمات" : "Services"}</Link>
            <ChevronRight size={10} />
            <Link href={`${arHref}/services/${data.parentSlug}`} className="hover:text-slate-900 transition-colors">{isAr ? ar.serviceAr : data.service}</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900 font-medium">{isAr ? data.cityAr : data.city}</span>
          </div>
        </nav>

        {/* ── Content Section ── */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              {isAr ? `${ar.serviceAr} في ${data.cityAr}` : data.h2}
            </h2>
            <div className="prose max-w-none text-slate-600 text-base leading-relaxed space-y-5">
              <p>{arBody?.intro ?? data.intro}</p>
              <p>{arBody?.details ?? data.details}</p>
            </div>

            {/* What We Offer */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">
                {isAr ? `خبرتنا في ${ar.serviceAr} في ${data.cityAr}` : `Our ${data.service} Expertise in ${data.city}`}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(arBody?.bulletPoints ?? data.bulletPoints).map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                    <CheckCircle size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-16 pt-12 border-t border-slate-200 bg-slate-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {isAr ? `خطّط لـ${ar.serviceAr} في ${data.cityAr}` : `Plan Your ${data.service} in ${data.city}`}
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                {isAr
                  ? `احصل على عرض مخصّص من فريقنا في ${data.cityAr} — دون التزام، ولا باقات جاهزة بمقاس واحد.`
                  : `Get a bespoke proposal from our ${data.city} team — no obligation, no one-size-fits-all packages.`}
              </p>
              <a
                href="https://wa.me/966539388072"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-sm hover:bg-[var(--primary-dark)] transition-colors shadow-md"
              >
                {isAr ? "احصل على استشارة مجانية" : "Get a Free Consultation"}
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">
              {isAr ? `${ar.serviceAr} في ${data.cityAr} — الأسئلة الشائعة` : `${data.service} in ${data.city} — FAQ`}
            </h2>
            <div className="space-y-5">
              {(arBody?.faqs ?? data.faqs).map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 text-base">{faq.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Services ── */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">{isAr ? "خدمات ذات صلة" : "Related Services"}</h3>
              <Link href={`${arHref}/services`} className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">{isAr ? "كل الخدمات" : "View all services"} <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`${arHref}/services/${rel.slug}`}
                  className="group bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">
                    {relTitle(rel)}
                  </h4>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 mt-3">
                    {isAr ? "اعرف المزيد" : "Learn More"} <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200">
              <Link
                href={`${arHref}/services`}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors"
              >
                <ChevronRight size={14} className="rotate-180" />
                {isAr ? "كل الخدمات" : "View all services"}
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
