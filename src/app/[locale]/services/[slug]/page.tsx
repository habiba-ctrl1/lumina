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
      { q: "Which event management companies operate in Riyadh?", a: "Saudi Event Management is the leading corporate event management company in Riyadh, serving Saudi Aramco, HRDF, SABIC, and major government entities with over 15 years of local operational experience." },
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
    metaDescription: `${s} في ${data.cityAr} مع إدارة الفعاليات السعودية — خبرة تتجاوز 15 عامًا في التخطيط والتنفيذ الاحترافي بمعايير عالمية. اطلب عرضك المجاني خلال 24 ساعة.`,
  };
}

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
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/services" className="hover:text-slate-900 transition-colors">Services</Link>
            <ChevronRight size={10} />
            <Link href={`/services/${data.parentSlug}`} className="hover:text-slate-900 transition-colors">{data.service}</Link>
            <ChevronRight size={10} />
            <span className="text-slate-900 font-medium">{data.city}</span>
          </div>
        </nav>

        {/* ── Content Section ── */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
              {data.h2}
            </h2>
            <div className="prose max-w-none text-slate-600 text-base leading-relaxed space-y-5">
              <p>{data.intro}</p>
              <p>{data.details}</p>
            </div>

            {/* What We Offer */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8">
                Our {data.service} Expertise in {data.city}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.bulletPoints.map((point, i) => (
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
                Plan Your {data.service} in {data.city}
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Get a bespoke proposal from our {data.city} team — no obligation, no one-size-fits-all packages.
              </p>
              <a
                href="https://wa.me/966539388072"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-sm hover:bg-[var(--primary-dark)] transition-colors shadow-md"
              >
                Get a Free Consultation
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">
              {data.service} in {data.city} — FAQ
            </h2>
            <div className="space-y-5">
              {data.faqs.map((faq, i) => (
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
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">Related Services</h3>
              <Link href="/services" className="text-[var(--primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:underline">View all services <ChevronRight size={12} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[var(--primary)]/30 hover:shadow-md transition-all"
                >
                  <h4 className="text-slate-900 font-bold mb-2 text-sm group-hover:text-[var(--primary)] transition-colors">
                    {rel.title}
                  </h4>
                  <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1 mt-3">
                    Learn More <ChevronRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-200">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors"
              >
                <ChevronRight size={14} className="rotate-180" />
                View all services
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
