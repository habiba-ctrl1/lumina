import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LocationCTA from "@/components/LocationCTA";
import InternalPageHero from "@/components/InternalPageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Building, ChevronRight, Calendar,
  Star, Briefcase, Sparkles, Users, Mountain, Landmark, Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCityImage } from "@/lib/image-utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface VenueData {
  name: string;
  capacity: string;
  district: string;
  type: string;
  desc: string;
}
interface ServiceData {
  name: string;
  slug: string;
  desc: string;
  icon: LucideIcon;
}
interface CalendarRow {
  period: string;
  season: string;
  events: string;
  demand: "Peak" | "Very High" | "High" | "Low";
}
interface CityData {
  name: string;
  nameAr: string;
  region: string;
  description: string;
  specialty: string;
  intro: string;
  details: string;
  glance: { val: string; label: string }[];
  venues: VenueData[];
  stats: { val: string; label: string }[];
  faqs: { q: string; a: string }[];
  services: ServiceData[];
  eventCalendar: CalendarRow[];
  knowsAbout: string[];
  geoCoords: { lat: string; lng: string };
  wikidata: string;
  geoCitation: { title: string; body: string }[];
}

// ─── City Data ────────────────────────────────────────────────────────────────
const pseoCities: Record<string, CityData> = {
  neom: {
    name: "NEOM",
    nameAr: "نيوم",
    region: "Tabuk Province",
    description:
      "Ultra-luxury events at the world's most visionary giga-project. We manage innovation summits, brand activations, and destination experiences across Sindalah Island, THE LINE, and Aqaba Mountain — coordinated directly with NEOM's Event Partnerships Division.",
    specialty: "Innovation Summits & Luxury Destination Events",
    intro:
      "NEOM is Saudi Arabia's $500B+ giga-project in northwestern Tabuk Province — a 26,500 km² zone purpose-built for the future of tourism, technology, and sustainable living. As an event destination it is without parallel: THE LINE, Sindalah Island, and Aqaba Mountain combine to offer backdrops that exist nowhere else on earth.",
    details:
      "Saudi Event Management coordinates directly with NEOM's Event Partnerships Division for all event access, accommodation, and full production logistics across the project's operational zones. Every event we produce in NEOM complies with its 100% renewable energy and zero-carbon mandate — making NEOM the only event destination in the world where sustainability is built into the infrastructure.",
    geoCoords: { lat: "28.0", lng: "35.0" },
    wikidata: "Q47069469",
    glance: [
      { val: "$500B+", label: "Giga-Project Investment" },
      { val: "500", label: "Sindalah Capacity" },
      { val: "Oct–Apr", label: "Peak Season" },
      { val: "NEOM Co.", label: "Permit Authority" },
      { val: "100%", label: "Renewable Energy" },
      { val: "0", label: "Carbon Events" },
    ],
    venues: [
      {
        name: "Sindalah Island",
        capacity: "Up to 2,000",
        district: "Gulf of Aqaba",
        type: "Island Activations, Destination Weddings & VIP Summits",
        desc: "Saudi Arabia's first private luxury island resort with superyacht marina — the most exclusive event venue in the Kingdom and one of the rarest in the world.",
      },
      {
        name: "THE LINE Innovation Campus",
        capacity: "NEOM partner access",
        district: "NEOM Tabuk",
        type: "Innovation Summits & Investor Briefings",
        desc: "The world's most discussed infrastructure project — hosting an event here creates an unmatched first-of-kind prestige for innovation conferences and stakeholder programs.",
      },
      {
        name: "Aqaba Mountain Resort",
        capacity: "Up to 800",
        district: "Aqaba Highlands",
        type: "Corporate Retreats & Executive Off-Sites",
        desc: "Alpine-style mountain resort in a desert country — genuinely unique. The highest-profile executive retreat venue in northwestern Saudi Arabia.",
      },
      {
        name: "Epicon Ultra-Luxury Resort",
        capacity: "Up to 400",
        district: "NEOM Bay",
        type: "VIP Events & Luxury Brand Buyouts",
        desc: "One of the world's most exclusive resort buyout venues upon opening — intimate VIP programs, private brand activations, and ultra-luxury destination events.",
      },
      {
        name: "Sindalah Yacht Club",
        capacity: "Up to 600",
        district: "Sindalah Island",
        type: "Superyacht Receptions & Maritime Events",
        desc: "World-class marina with superyacht berthing — nautical corporate hospitality, maritime brand activations, and sunset yacht receptions on the Red Sea.",
      },
      {
        name: "NEOM Bay Hub (Sharma)",
        capacity: "Up to 1,000",
        district: "NEOM Bay",
        type: "Partner Conferences & Press Events",
        desc: "The current operational gateway to NEOM — suitable for NEOM partner briefings, investor site-visit events, and innovation conferences.",
      },
    ],
    stats: [
      { val: "25+", label: "NEOM Events" },
      { val: "5", label: "Venue Partners" },
      { val: "100%", label: "Zero-Carbon" },
      { val: "Direct", label: "NEOM Partnership" },
    ],
    services: [
      { name: "Innovation Summits", slug: "corporate-events", icon: Briefcase, desc: "PIF portfolio, tech leadership, and NEOM partner conferences at THE LINE and NEOM Bay Hub." },
      { name: "Sindalah Island Events", slug: "destination-events", icon: Globe, desc: "Island brand activations, destination weddings, and superyacht receptions on the Red Sea." },
      { name: "Aqaba Mountain Retreats", slug: "destination-events", icon: Mountain, desc: "Executive off-sites and leadership programs at Saudi Arabia's most dramatic mountain resort." },
      { name: "Luxury Brand Activations", slug: "luxury-vip-events", icon: Sparkles, desc: "RCU-aligned brand activations at Sindalah, Epicon, and NEOM Bay." },
      { name: "Investor Briefing Events", slug: "corporate-events", icon: Briefcase, desc: "Stakeholder and investor event production for NEOM's global funding network." },
      { name: "Sustainable Event Production", slug: "event-production", icon: Landmark, desc: "Zero-carbon certified event production aligned with NEOM's 100% renewable mandate." },
    ],
    faqs: [
      {
        q: "Can you hold a corporate event inside NEOM right now?",
        a: "Yes, in certain zones. NEOM Bay Hub (Sharma), Sindalah Island (2025), and Aqaba Mountain are progressively opening to approved event operators. Events at THE LINE and Magna are currently limited to NEOM partner briefings and stakeholder visits. Saudi Event Management coordinates directly with NEOM's Event Partnerships Division to secure access, venue allocation, and full production logistics.",
      },
      {
        q: "What makes NEOM unique as a corporate event destination?",
        a: "NEOM offers three globally unique event assets: THE LINE (the world's most discussed infrastructure project), Sindalah Island (Saudi Arabia's first private island resort with superyacht marina), and Aqaba Mountain (alpine resort in a desert country). Combined with a 100% renewable energy mandate — making every NEOM event inherently carbon-neutral — no other destination in the world offers this combination.",
      },
      {
        q: "What is the capacity at Sindalah Island for events?",
        a: "Sindalah Island's event infrastructure scales to 2,000 guests across its resort, Yacht Club, and outdoor venues as development phases complete. For intimate VIP events and brand activations, the Sindalah Yacht Club accommodates up to 600 guests with direct superyacht marina access on the Gulf of Aqaba.",
      },
      {
        q: "How do you reach NEOM for an event?",
        a: "NEOM Bay Airport (NUM) operates direct commercial flights from Riyadh, Jeddah, and Dubai. Prince Sultan bin Abdulaziz Airport in Tabuk (TUU) serves as an alternative gateway with transfers to NEOM Bay. Saudi Event Management manages all delegate arrival logistics, transfers, and accommodation coordination for NEOM events.",
      },
      {
        q: "What types of events work best in NEOM?",
        a: "NEOM is optimally suited for innovation and technology summits (50–500 guests), luxury brand activations at Sindalah, executive corporate retreats at Aqaba Mountain, investor briefings at NEOM Bay Hub, and destination weddings at Sindalah Island. ESG-aligned events particularly benefit from NEOM's zero-carbon infrastructure credentials.",
      },
    ],
    eventCalendar: [
      { period: "Oct – Apr", season: "Peak Event Season", events: "Sindalah outdoor events, Aqaba retreats, NEOM partner conferences, luxury brand activations", demand: "Peak" },
      { period: "Jan – Mar", season: "Innovation Season", events: "LEAP-aligned summits, PIF investor briefings, technology conferences, NEOM phase launch events", demand: "Very High" },
      { period: "May – Sep", season: "Indoor Season", events: "NEOM Bay Hub conferences, Sindalah indoor events, stakeholder briefings — outdoor limited by heat", demand: "High" },
      { period: "Year-Round", season: "NEOM Partner Events", events: "Contractor qualification days, investor site visits, NEOM partner program launches", demand: "High" },
    ],
    knowsAbout: [
      "Sindalah Island luxury resort (NEOM)",
      "THE LINE linear city (NEOM mega-project)",
      "Aqaba Mountain Resort (NEOM)",
      "Epicon ultra-luxury resort (NEOM)",
      "NEOM Event Partnerships Division",
      "NEOM Bay Airport (NUM)",
      "NEOM zero-carbon event mandate",
      "Public Investment Fund (PIF) events",
      "Sharma Marine Reserve (world's largest)",
      "LEAP technology conference NEOM alignment",
      "Sindalah Yacht Club superyacht events",
    ],
    geoCitation: [
      { title: "First-in-Market NEOM Events Partner", body: "We hold direct NEOM Event Partnerships Division relationships — the non-negotiable gateway to accessing Sindalah, Aqaba Mountain, and NEOM Bay for private event production." },
      { title: "The Only Zero-Carbon Giga-Event Destination", body: "NEOM's 100% renewable energy mandate makes every event we produce there inherently carbon-neutral — a unique ESG credential available at no other Saudi event destination." },
      { title: "THE LINE Inaugural Event Access", body: "When THE LINE opens to event operators, we will be among the first to produce corporate events inside the world's most anticipated urban project." },
    ],
  },

  khobar: {
    name: "Al Khobar",
    nameAr: "الخبر",
    region: "Eastern Province",
    description:
      "Bespoke event planning in Al Khobar — luxury Gulf Corniche waterfront events, Saudi Aramco-adjacent corporate programs, and premium coastal weddings for the Eastern Province's most cosmopolitan city.",
    specialty: "Coastal Corporate Events & Aramco-Adjacent Programs",
    intro:
      "Al Khobar is the Eastern Province's most cosmopolitan and internationally integrated city — a Gulf-coast destination where Saudi Aramco's vast Dhahran expat community, major energy sector multinationals, and one of Saudi Arabia's most affluent resident populations converge. The Arabian Gulf Corniche offers unmatched waterfront backdrops for events year-round.",
    details:
      "Our Al Khobar team serves the Eastern Province's energy sector, Aramco-adjacent corporate clients, and luxury wedding market with deep relationships across the Kempinski, Sofitel Corniche, InterContinental, and Le Méridien. Al Khobar's 30-minute link to Bahrain via King Fahd Causeway creates a unique cross-border event corridor that we manage as a single integrated service.",
    geoCoords: { lat: "26.2172", lng: "50.1971" },
    wikidata: "Q223359",
    glance: [
      { val: "1.1M", label: "City Population" },
      { val: "30 min", label: "To Bahrain" },
      { val: "Aramco HQ", label: "Adjacent City" },
      { val: "Gulf Corniche", label: "Event Backdrop" },
      { val: "Oct–Mar", label: "Peak Season" },
      { val: "4 km", label: "Corniche Length" },
    ],
    venues: [
      {
        name: "Sofitel Al Khobar The Corniche",
        capacity: "Up to 2,000",
        district: "Al Khobar Corniche",
        type: "Corporate Galas & Gulf-View Weddings",
        desc: "Al Khobar's flagship luxury event venue — Gulf of Arabia waterfront views, the largest ballroom in the city, and the Eastern Province's most prestigious corporate gala address.",
      },
      {
        name: "Kempinski Al Othman Hotel",
        capacity: "Up to 1,500",
        district: "Al Khobar",
        type: "Luxury Weddings & Executive Dinners",
        desc: "The benchmark luxury hotel for Al Khobar corporate events and high-end weddings — consistently ranked the Eastern Province's best conference and banquet venue.",
      },
      {
        name: "InterContinental Al Khobar",
        capacity: "Up to 1,200",
        district: "Al Khobar",
        type: "Corporate MICE & Energy Sector Conferences",
        desc: "Premier conference infrastructure for Aramco-adjacent corporate events and oil and gas sector meetings in the Eastern Province.",
      },
      {
        name: "Le Méridien Al Khobar",
        capacity: "Up to 1,000",
        district: "Al Khobar",
        type: "Corporate Events & Aramco Partner Programs",
        desc: "Positioned directly in the Aramco supply chain hub — preferred by energy sector vendors and multinational corporate events.",
      },
      {
        name: "Rosewood Dhahran Hills",
        capacity: "Up to 800",
        district: "Dhahran Hills",
        type: "Ultra-Luxury VIP Dinners & Executive Programs",
        desc: "Al Khobar's newest ultra-luxury property — intimate VIP corporate events and executive dinners in the Dhahran Hills residential district.",
      },
      {
        name: "Half Moon Bay Resort",
        capacity: "Custom outdoor",
        district: "Half Moon Bay (40km south)",
        type: "Beach Weddings & Outdoor Corporate Retreats",
        desc: "Premium Gulf beach events 40km south of Al Khobar — the Eastern Province's best-kept outdoor wedding and corporate retreat venue.",
      },
    ],
    stats: [
      { val: "90+", label: "Khobar Events" },
      { val: "30+", label: "Venue Partners" },
      { val: "Aramco", label: "Anchor Client Sector" },
      { val: "24/7", label: "Local Support" },
    ],
    services: [
      { name: "Aramco-Adjacent Corporate Events", slug: "corporate-events", icon: Briefcase, desc: "Vendor days, partner conferences, and expat community events for Aramco's Dhahran Hills ecosystem." },
      { name: "Gulf Corniche Weddings", slug: "weddings", icon: Star, desc: "Luxury waterfront weddings at Sofitel Corniche and InterContinental with Arabian Gulf views." },
      { name: "Energy Sector Conferences", slug: "corporate-events", icon: Briefcase, desc: "Oil and gas, oilfield services, and energy industry MICE across Khobar and Dhahran venues." },
      { name: "Half Moon Bay Beach Events", slug: "destination-events", icon: Globe, desc: "Premium outdoor beach weddings and corporate retreats at the Gulf's most exclusive coastal venue." },
      { name: "Khobar–Bahrain Corridor Events", slug: "destination-events", icon: Mountain, desc: "Cross-border event programs spanning Al Khobar and Bahrain venues via King Fahd Causeway." },
      { name: "Brand Activations", slug: "event-production", icon: Sparkles, desc: "Al Khobar Corniche and Al Rashid Mall brand activations, product launches, and consumer events." },
    ],
    faqs: [
      {
        q: "What is the best luxury event venue in Al Khobar?",
        a: "The Kempinski Al Othman Hotel Al Khobar is the Eastern Province's benchmark luxury event venue (1,500 guests). For Gulf Corniche views, the Sofitel Al Khobar The Corniche (2,000 guests) is the top choice for large corporate galas with Arabian Gulf waterfront backdrops. Both are preferred Saudi Event Management venues.",
      },
      {
        q: "Do you manage corporate events for Saudi Aramco employees and vendors?",
        a: "Yes. Saudi Event Management provides dedicated corporate event management for Saudi Aramco vendors, JV partners, and the Aramco Dhahran Hills expat community — including annual partner days, vendor qualification conferences, team-building programs, and expat community galas across Al Khobar and Dhahran venues.",
      },
      {
        q: "Can you plan a beach wedding at Half Moon Bay?",
        a: "Yes. Saudi Event Management manages luxury outdoor beach weddings at Half Moon Bay Resort (40km south of Al Khobar) — including venue coordination, outdoor decor production, catering management, and guest transport logistics. Half Moon Bay offers the most private and premium Gulf beach setting in the Eastern Province.",
      },
      {
        q: "Can you manage a cross-border event spanning Al Khobar and Bahrain?",
        a: "Yes. Saudi Event Management operates cross-border event programs via the King Fahd Causeway corridor — coordinating Al Khobar hotel accommodation with Bahrain venue events (BIECC, Gulf Hotel Bahrain) for Gulf-regional corporate conferences and multi-day hospitality programs. International delegates entering via Bahrain International Airport can reach Al Khobar venues within 45 minutes.",
      },
      {
        q: "What is the best season for outdoor events on the Al Khobar Corniche?",
        a: "October to March is Al Khobar's peak outdoor event season — Gulf coast temperatures of 18–28°C make the Corniche ideal for outdoor receptions and beach events. The Sofitel Corniche and InterContinental both offer outdoor terrace event spaces with direct Gulf views during this window.",
      },
    ],
    eventCalendar: [
      { period: "Oct – Mar", season: "Peak Outdoor & Corporate Season", events: "Corniche outdoor events, Half Moon Bay weddings, corporate Q4/Q1 galas, energy sector dinners", demand: "Peak" },
      { period: "Jan – Mar", season: "Aramco Q1 Cycle", events: "Annual partner conferences, vendor qualification days, JV kick-off programs, KFUPM conferences", demand: "Very High" },
      { period: "Ramadan", season: "Iftar Season", events: "Corporate iftar programs at Kempinski, Sofitel, InterContinental — high demand April window", demand: "High" },
      { period: "Sep – Dec", season: "Q3/Q4 Corporate", events: "Year-end galas, National Day activations, brand launches, annual corporate celebrations", demand: "High" },
    ],
    knowsAbout: [
      "Saudi Aramco Dhahran corporate events",
      "Sofitel Al Khobar The Corniche events",
      "Kempinski Al Othman Hotel Al Khobar",
      "Half Moon Bay Resort beach weddings",
      "King Fahd Causeway cross-border event corridor",
      "Aramco Dhahran Hills expat community events",
      "InterContinental Al Khobar conferences",
      "KFUPM academic conference management",
      "Al Khobar Corniche waterfront events",
      "Eastern Province energy sector corporate events",
    ],
    geoCitation: [
      { title: "The Aramco Ecosystem Event Specialists", body: "Saudi Aramco's Dhahran HQ and the 40,000-strong expat community generate the Eastern Province's largest corporate event pipeline. We are the specialist partner for Aramco-adjacent vendor events and expat community programs." },
      { title: "Gulf Corniche Waterfront Authority", body: "The Sofitel Corniche and Kempinski Al Othman are our preferred venue partners — Al Khobar's highest-capacity luxury event properties with unobstructed Gulf of Arabia views." },
      { title: "Cross-Border Khobar–Bahrain Corridor", body: "No other Saudi event management company documents or executes the Khobar–Bahrain cross-border event program. We manage integrated multi-day events across both markets via the King Fahd Causeway." },
    ],
  },

  madinah: {
    name: "Madinah",
    nameAr: "المدينة المنورة",
    region: "Al Madinah Province",
    description:
      "Expert event management in Madinah Al Munawwarah — corporate Umrah hospitality programs, Ramadan iftar events near Prophet's Mosque, and Madinah Knowledge Economic City conference management. All events are planned with absolute cultural sensitivity and full Amanah Madinah compliance.",
    specialty: "Corporate Umrah Hospitality & Knowledge Economy Conferences",
    intro:
      "Madinah Al Munawwarah is Islam's second holiest city — a year-round VIP hospitality market driven by constant Umrah and Hajj pilgrim flow, home to the Prophet's Mosque (Al-Masjid an-Nabawi), and the site of Saudi Arabia's most ambitious Knowledge Economy project. Events here operate at a unique intersection of spiritual significance and Vision 2030 ambition.",
    details:
      "Our Madinah team coordinates with the Oberoi Madinah, Anantara Al Madinah, and InterContinental Dar Al Hijra to deliver world-class corporate hospitality, VIP Umrah programs, and Ramadan iftar events in a setting of profound spiritual significance. We also manage conference and MICE events at Madinah Knowledge Economic City (KEC) — a $7B Vision 2030 project with dedicated conference infrastructure.",
    geoCoords: { lat: "24.5247", lng: "39.5692" },
    wikidata: "Q27673",
    glance: [
      { val: "2nd Holiest", label: "City in Islam" },
      { val: "Oberoi", label: "Premier VIP Hotel" },
      { val: "Muslim Only", label: "Haram Access" },
      { val: "KEC", label: "Knowledge Economic City" },
      { val: "Year-Round", label: "Umrah Demand" },
      { val: "$7B", label: "KEC Investment" },
    ],
    venues: [
      {
        name: "Oberoi Madinah",
        capacity: "Up to 600",
        district: "Prophet's Mosque District",
        type: "Ultra-Luxury VIP Hospitality & Private Dinners",
        desc: "One of Saudi Arabia's most prestigious ultra-luxury hotels — adjacent to the Prophet's Mosque. The premier choice for royal household and diplomatic VIP hospitality programs.",
      },
      {
        name: "Anantara Al Madinah",
        capacity: "Up to 400",
        district: "Central Madinah",
        type: "Ultra-Luxury Corporate Retreats & VIP Programs",
        desc: "Ultra-luxury property in the Prophet's Mosque district — intimate corporate hospitality, board retreats, and VIP pilgrim programs for senior executives.",
      },
      {
        name: "InterContinental Dar Al Hijra",
        capacity: "Up to 1,500",
        district: "Central Madinah",
        type: "Conferences, MICE & Institutional Events",
        desc: "Madinah's premier conference hotel — the largest event ballroom capacity in the city, suited for corporate conferences, institutional gatherings, and diplomatic programs.",
      },
      {
        name: "Hilton Madinah Hotel",
        capacity: "Up to 1,200",
        district: "Central Madinah",
        type: "Corporate Events & Institutional Programs",
        desc: "Full-service conference infrastructure in Madinah's premium hotel corridor — corporate events, Islamic organization gatherings, and VIP hospitality packages.",
      },
      {
        name: "KEC Conference Center",
        capacity: "Up to 2,000",
        district: "Madinah Knowledge Economic City",
        type: "Technology & Knowledge Economy Summits",
        desc: "Madinah KEC's purpose-built conference center for Vision 2030 knowledge economy events — Islamic economy summits, EdTech conferences, and regional innovation programs.",
      },
      {
        name: "Dar Al Taqwa Hotel",
        capacity: "Up to 800",
        district: "Prophet's Mosque District",
        type: "Islamic Institution Events & VIP Hospitality",
        desc: "Steps from Prophet's Mosque — preferred by Islamic organizations, royal delegations, and VIP pilgrim hospitality programs requiring proximity to the Haram.",
      },
    ],
    stats: [
      { val: "40+", label: "Madinah Events" },
      { val: "5", label: "Hotel Partners" },
      { val: "100%", label: "Cultural Compliance" },
      { val: "24/7", label: "VIP Concierge" },
    ],
    services: [
      { name: "Corporate Umrah & Hajj Hospitality", slug: "luxury-vip-events", icon: Star, desc: "Executive pilgrim programs managed at Oberoi and Anantara — transport, accommodation, Ziyarah, and private prayer scheduling." },
      { name: "Ramadan Iftar Events", slug: "cultural-events", icon: Sparkles, desc: "Corporate iftar programs in the Prophet's Mosque hotel cluster — seasonal demand peak, full coordination." },
      { name: "KEC Conference Management", slug: "conferences", icon: Users, desc: "Knowledge economy, Islamic finance, and technology conferences at Madinah Knowledge Economic City." },
      { name: "Islamic Institution Programs", slug: "corporate-events", icon: Briefcase, desc: "Events for IsDB, OIC, Muslim World League, and Islamic finance institutions visiting Madinah." },
      { name: "VIP Diplomatic Hospitality", slug: "luxury-vip-events", icon: Star, desc: "Protocol-compliant VIP programs for royal households, government delegations, and diplomatic missions." },
      { name: "Cultural & Heritage Events", slug: "cultural-events", icon: Sparkles, desc: "Quba Mosque heritage itineraries, Uhud Mountain programs, and Hejaz Railway heritage dining events." },
    ],
    faqs: [
      {
        q: "What corporate hospitality programs can be managed in Madinah?",
        a: "Saudi Event Management delivers full corporate Umrah and Hajj hospitality programs — including executive VIP accommodation at the Oberoi and Anantara, private transport, Ziyarah heritage site tours, prayer time scheduling, and corporate iftar dinners during Ramadan. These programs serve Islamic financial institutions, MNC senior executives, royal households, and government delegations.",
      },
      {
        q: "Can non-Muslims attend events in Madinah?",
        a: "Non-Muslims are not permitted to enter the Madinah Haram zone (Prophet's Mosque area) under Saudi law. Events at venues outside the Haram zone — such as Madinah Knowledge Economic City (KEC) — may include non-Muslim attendees. Hotels adjacent to Prophet's Mosque are restricted to Muslim guests. Saudi Event Management advises all clients on attendee compliance requirements for Madinah events.",
      },
      {
        q: "What is the best conference venue in Madinah?",
        a: "For large conferences (up to 2,000), the Madinah Knowledge Economic City Conference Center is Madinah's premier purpose-built facility. For executive conferences adjacent to the city centre, the InterContinental Dar Al Hijra (1,500) and Hilton Madinah (1,200) offer the best-equipped ballroom infrastructure. For ultra-luxury VIP programs near Prophet's Mosque, the Oberoi Madinah and Anantara offer the highest tier.",
      },
      {
        q: "What is Madinah Knowledge Economic City (KEC)?",
        a: "Madinah Knowledge Economic City is a $7B Vision 2030 special economic zone north of Madinah city, designed to become a hub for education, technology, and Islamic economy industries. It includes a purpose-built conference center (up to 2,000 capacity) and is the primary MICE venue for knowledge economy, Islamic finance, EdTech, and halal industry events in Al Madinah Province.",
      },
      {
        q: "What is the best time to hold a corporate iftar in Madinah?",
        a: "Ramadan is the primary corporate iftar season in Madinah — the Prophet's Mosque district hotels experience extremely high demand during this period. Saudi Event Management recommends booking Ramadan iftar programs at the Oberoi, Anantara, or Dar Al Taqwa 6–9 months in advance. The Sha'ban (pre-Ramadan) window is a lower-competition, high-quality alternative for Umrah corporate hospitality.",
      },
    ],
    eventCalendar: [
      { period: "Year-Round", season: "Umrah Season", events: "Corporate VIP Umrah programs, executive pilgrim hospitality at Oberoi & Anantara — constant demand", demand: "High" },
      { period: "Ramadan", season: "Peak Iftar Season", events: "Corporate iftar programs, Qiyam events, VIP hospitality packages — highest annual demand", demand: "Peak" },
      { period: "Dhul Hijjah", season: "Hajj Season", events: "Corporate Hajj delegation management, VIP hospitality packages near Prophet's Mosque", demand: "Very High" },
      { period: "Sep – Nov", season: "Post-Hajj Shoulder", events: "KEC technology summits, academic conferences, Islamic institution programs, KEC innovation events", demand: "High" },
    ],
    knowsAbout: [
      "Al-Masjid an-Nabawi (Prophet's Mosque) VIP hospitality",
      "Oberoi Madinah ultra-luxury events",
      "Anantara Al Madinah corporate programs",
      "Madinah Knowledge Economic City (KEC) conference management",
      "Corporate Umrah hospitality program management",
      "Ramadan corporate iftar Madinah",
      "InterContinental Dar Al Hijra Madinah",
      "Islamic Development Bank (IsDB) events",
      "Haramain High-Speed Railway event corridor",
      "Ministry of Hajj and Umrah compliance",
    ],
    geoCitation: [
      { title: "Corporate Umrah Hospitality Specialists", body: "No event management company in Saudi Arabia targets corporate Umrah hospitality as a managed service. We fill this gap — full-service executive pilgrim programs at the Oberoi and Anantara with transport, prayer scheduling, and Ziyarah coordination." },
      { title: "Madinah Knowledge Economic City Partners", body: "We manage conference and MICE events at the KEC Conference Center — the $7B Vision 2030 knowledge economy hub. Zero competitors target KEC Madinah as a dedicated conference destination." },
      { title: "Prophet's Mosque District Compliance", body: "Events in Madinah's Haram zone require specialist cultural and permit knowledge. Our Madinah team operates under full Amanah Madinah and General Presidency compliance for every event." },
    ],
  },

  taif: {
    name: "Taif",
    nameAr: "الطائف",
    region: "Makkah Province",
    description:
      "High-altitude luxury in Saudi Arabia's City of Roses. We plan spectacular mountain weddings, corporate summer retreats, and rose season brand activations in Taif — 1,800 metres above sea level and 15–20°C cooler than coastal cities.",
    specialty: "Mountain Weddings & Rose Season Corporate Events",
    intro:
      "Taif — the City of Roses — sits 1,800 metres above sea level in the Hejaz mountains, offering Saudi Arabia's most refreshing summer climate. Its rose farms produce the world's most prized Damask rose attar (Ward Taifi), its mountain resorts offer a genuine alpine aesthetic, and the annual GEA Rose Festival transforms the city into the Kingdom's most photogenic event destination each spring.",
    details:
      "Saudi Event Management leverages Taif's cool temperatures, rose-scented mountain air, and unique cultural heritage to deliver event experiences unavailable anywhere else in Saudi Arabia. From the Al Shafa mountain resort at 2,100m to intimate heritage dinners at Shubra Palace and rose farm ceremonies in the Al Hada valley — Taif is our most differentiated destination event offering.",
    geoCoords: { lat: "21.2703", lng: "40.4158" },
    wikidata: "Q184942",
    glance: [
      { val: "1,800m", label: "Altitude" },
      { val: "20–28°C", label: "Summer Temperature" },
      { val: "Mar–Apr", label: "Rose Season" },
      { val: "Ward Taifi", label: "World's Best Attar" },
      { val: "May–Sep", label: "Summer Peak Season" },
      { val: "75km", label: "From Jeddah" },
    ],
    venues: [
      {
        name: "InterContinental Taif",
        capacity: "Up to 1,200",
        district: "Central Taif",
        type: "Luxury Weddings & Corporate Conferences",
        desc: "Taif's premier luxury event hotel — the largest dedicated ballroom capacity in the city, suitable for weddings and corporate conferences year-round.",
      },
      {
        name: "Marriott Hotel Taif",
        capacity: "Up to 1,000",
        district: "Central Taif",
        type: "Corporate MICE & Social Celebrations",
        desc: "Full-service event infrastructure in Taif city centre — corporate meetings, team retreats, and family celebrations with mountain views.",
      },
      {
        name: "Al Shafa Mountain Resort",
        capacity: "Up to 600",
        district: "Al Shafa (2,100m)",
        type: "Alpine Corporate Retreats & Intimate Weddings",
        desc: "Saudi Arabia's highest-altitude resort at 2,100m — a genuinely alpine experience for corporate retreats and intimate mountain weddings with year-round cool temperatures.",
      },
      {
        name: "Al Hada Mountain Resort",
        capacity: "Up to 500",
        district: "Al Hada",
        type: "Destination Events & Family Celebrations",
        desc: "Nestled in the Al Hada valley rose farming district — the most immersive mountain resort setting for destination weddings and executive off-sites.",
      },
      {
        name: "Taif Rose Farms (Al Hada)",
        capacity: "Custom outdoor",
        district: "Al Hada Valley",
        type: "Rose Harvest Ceremonies & Brand Activations",
        desc: "The Al Hada rose farming valley — outdoor event spaces among the world's most prized Damask rose fields during the March–April harvest season.",
      },
      {
        name: "Shubra Palace",
        capacity: "Intimate — heritage",
        district: "Central Taif",
        type: "Heritage Galas & VIP Dinners",
        desc: "An Italian-style royal palace built in 1906 — Taif's most photographed landmark and the city's only true heritage gala venue for high-protocol dinners.",
      },
    ],
    stats: [
      { val: "35+", label: "Taif Events" },
      { val: "15+", label: "Venue Partners" },
      { val: "12", label: "Mountain Venues" },
      { val: "24/7", label: "Local Support" },
    ],
    services: [
      { name: "Mountain Destination Weddings", slug: "weddings", icon: Star, desc: "Rose garden ceremonies, Al Shafa alpine receptions, and Shubra Palace heritage weddings." },
      { name: "Corporate Summer Retreats", slug: "destination-events", icon: Mountain, desc: "Executive off-sites at Al Shafa and Al Hada — Saudi Arabia's coolest summer corporate retreat." },
      { name: "Rose Season Brand Activations", slug: "event-production", icon: Sparkles, desc: "GEA Rose Festival sponsorships, rose farm activations, and luxury fragrance brand events." },
      { name: "Shubra Palace Heritage Dinners", slug: "luxury-vip-events", icon: Star, desc: "VIP heritage gala dinners at Taif's iconic 1906 Italian-style royal palace." },
      { name: "Corporate Conferences", slug: "corporate-events", icon: Briefcase, desc: "MICE events at InterContinental and Marriott Taif — year-round mountain conference venue access." },
      { name: "Team-Building Programs", slug: "corporate-events", icon: Users, desc: "Mountain adventure and cultural immersion team-building programs across the Al Hada highlands." },
    ],
    faqs: [
      {
        q: "Why is Taif the best location for a summer wedding in Saudi Arabia?",
        a: "Taif sits at 1,800 metres above sea level, maintaining temperatures of 20–28°C during summer months when Jeddah and Riyadh reach 40–45°C. This makes it the only Saudi city where outdoor ceremonies are genuinely comfortable in July and August. Combined with rose gardens, mountain landscapes, and Al Shafa's alpine aesthetic — Taif offers a destination wedding experience unavailable anywhere else in the Kingdom.",
      },
      {
        q: "When is the Taif Rose Festival and what events can brands produce?",
        a: "The Taif Rose Festival runs from late March to mid-April — coinciding with the Damask rose (Ward Taifi) harvest in the Al Hada valley. Saudi Event Management manages brand activations, luxury fragrance house events, and corporate sponsorship programs integrated into the GEA festival calendar. Brands with connections to fragrance, wellness, or Saudi heritage find unmatched positioning opportunities during this window.",
      },
      {
        q: "What corporate retreat venues are available in Taif?",
        a: "The premier corporate retreat venues in Taif are Al Shafa Mountain Resort (600 guests, 2,100m), Al Hada Mountain Resort (500 guests), InterContinental Taif (1,200 guests), and Marriott Hotel Taif (1,000 guests). For intimate executive off-sites, Shubra Palace offers a heritage setting. Saudi Event Management coordinates all team-building activities including mountain hiking, rose farm visits, and Asiri cultural programs.",
      },
      {
        q: "How far is Taif from Jeddah and Makkah?",
        a: "Taif is 75km from Jeddah via the Taif Road or the scenic Al Hada mountain highway, and 90km from Makkah. The Al Hada mountain road is one of Saudi Arabia's most spectacular drives — an event experience element in itself for destination attendees. Transfer time from Jeddah is approximately 1–1.5 hours depending on route.",
      },
      {
        q: "What is Ward Taifi and why is it significant for luxury events?",
        a: "Ward Taifi is the Damask rose variety grown exclusively in the Al Hada valley near Taif — the source of the world's most prized rose attar (essential oil). Brands including Chanel, Dior, and Jo Malone source Taif rose extract. This global luxury association makes Taif a unique event backdrop for fragrance house brand activations, high-end corporate gifting programs, and experience-driven luxury events.",
      },
    ],
    eventCalendar: [
      { period: "Mar – Apr", season: "Rose Harvest Season", events: "Taif Rose Festival, rose farm ceremonies, luxury fragrance brand activations, Ward Taifi corporate gifting events", demand: "Peak" },
      { period: "May – Sep", season: "Summer Mountain Season", events: "Destination weddings, corporate summer retreats, executive off-sites, team-building programs", demand: "Very High" },
      { period: "Jul – Aug", season: "Peak Summer Escape", events: "Maximum wedding demand — Saudi and Gulf families escaping coastal heat. Book 12–18 months ahead.", demand: "Peak" },
      { period: "Oct – Nov", season: "Post-Summer & National Day", events: "Cultural events, national day programs, corporate year-end gatherings, heritage site programs", demand: "High" },
    ],
    knowsAbout: [
      "Taif Rose Festival (Ward Taifi Damask rose harvest)",
      "Al Shafa Mountain Resort (2,100m)",
      "Al Hada Mountain Resort and rose farming valley",
      "Shubra Palace heritage gala venue Taif",
      "InterContinental Taif luxury events",
      "GEA Taif Season entertainment programming",
      "Summer mountain weddings Saudi Arabia",
      "Ward Taifi luxury fragrance brand activations",
      "Taif cable car (Telecabin Abha Taif)",
      "Corporate summer retreat Saudi Arabia Hejaz mountains",
    ],
    geoCitation: [
      { title: "Saudi Arabia's Only Mountain Rose Wedding Specialists", body: "Taif's rose farms, Al Shafa alpine resort at 2,100m, and summer cool-climate advantage create a destination wedding category no other Saudi city can match. We own the Taif mountain wedding niche." },
      { title: "Rose Festival Corporate Sponsorship Partners", body: "GEA invests billions in the Taif Rose Festival annually. We coordinate corporate brand sponsorships, rose farm activations, and luxury fragrance house events during the March–April harvest season." },
      { title: "Shubra Palace — Heritage Gala Access", body: "Taif's 1906 Italian royal palace is the most distinctive heritage gala venue in western Saudi Arabia. Saudi Event Management holds the local relationships to access and produce private events at Shubra." },
    ],
  },

  abha: {
    name: "Abha",
    nameAr: "أبها",
    region: "Aseer Province",
    description:
      "Experience the cool mists of Aseer. Premier event management for destination weddings, cultural festivals, and corporate retreats in Abha — Saudi Arabia's highest city at 2,200 metres, home to the most distinct regional culture in the Kingdom.",
    specialty: "Cultural Events & Highland Destination Weddings",
    intro:
      "Abha is Saudi Arabia's highland gem — a city of cool mists, terraced sandstone villages, and vibrant Asiri culture sitting at 2,200 metres in the Aseer mountains. It is the capital of Saudi Arabia's most culturally distinctive region, home to the geometric painted Asiri architecture, the flower-crown tradition, and the Al Habala hanging village. GEA's Aseer Season investment is rapidly transforming Abha into one of the Kingdom's most compelling event destinations.",
    details:
      "Saudi Event Management brings full event capabilities to Abha — working with the Aseer Cultural Village (up to 3,000 guests), Aseer National Park Amphitheatre (5,000), Marriott Hotel Abha, and Al Habala Heritage Village to deliver events that celebrate Saudi Arabia's extraordinary highland cultural heritage. Abha is our primary destination for cultural immersion corporate programs and off-beat destination weddings.",
    geoCoords: { lat: "18.2164", lng: "42.5053" },
    wikidata: "Q131800",
    glance: [
      { val: "2,200m", label: "Altitude" },
      { val: "16–24°C", label: "Summer Temperature" },
      { val: "Asiri", label: "Cultural Identity" },
      { val: "GEA", label: "Aseer Season Funder" },
      { val: "Al Habala", label: "Heritage Icon" },
      { val: "May–Sep", label: "Tourism Peak" },
    ],
    venues: [
      {
        name: "Aseer Cultural Village",
        capacity: "Up to 3,000",
        district: "Cultural District",
        type: "Cultural Festivals, National Day & Brand Activations",
        desc: "Saudi Arabia's most immersive regional cultural complex — Asiri architecture, traditional crafts, folklore dance. The premier event venue for cultural corporate programs and large celebrations.",
      },
      {
        name: "Aseer National Park Amphitheatre",
        capacity: "Up to 5,000",
        district: "Aseer National Park",
        type: "Outdoor Concerts, Galas & Cultural Events",
        desc: "Saudi Arabia's largest national park — the amphitheatre offers a dramatic highland outdoor setting for concerts, national celebrations, and large outdoor galas.",
      },
      {
        name: "Al Habala Hanging Village",
        capacity: "Intimate — heritage access",
        district: "Al Habala Cliff",
        type: "Heritage Ceremonies & VIP Cultural Experiences",
        desc: "A cable car-accessed heritage village on a dramatic cliff face — Saudi Arabia's most unique event backdrop for intimate private ceremonies and VIP cultural heritage experiences.",
      },
      {
        name: "Marriott Hotel Abha",
        capacity: "Up to 900",
        district: "Central Abha",
        type: "Corporate Events, Weddings & Conferences",
        desc: "Abha's premier branded hotel — full conference and ballroom infrastructure for corporate events and wedding receptions with mountain views.",
      },
      {
        name: "Abha International Conference Center",
        capacity: "Up to 2,000",
        district: "Central Abha",
        type: "Government Events & Academic Conferences",
        desc: "The largest dedicated conference venue in the Aseer region — government events, King Khalid University academic conferences, and regional MICE.",
      },
      {
        name: "Green Mountain (Jabal Akhdar) Summit",
        capacity: "Outdoor — custom",
        district: "Abha City Centre",
        type: "Hilltop Celebrations & Outdoor Galas",
        desc: "Abha's central green hilltop above the city — accessible via cable car, offering panoramic valley views as a dramatic outdoor event backdrop unique to Abha.",
      },
    ],
    stats: [
      { val: "30+", label: "Abha Events" },
      { val: "12+", label: "Venue Partners" },
      { val: "100%", label: "Cultural Events" },
      { val: "24/7", label: "On-site Support" },
    ],
    services: [
      { name: "Highland Destination Weddings", slug: "weddings", icon: Star, desc: "Mountain weddings at Aseer Cultural Village, Al Habala, and highland outdoor venues." },
      { name: "Aseer Season Brand Activations", slug: "event-production", icon: Sparkles, desc: "GEA Aseer Season sponsorship management, outdoor brand activations, cultural festival events." },
      { name: "Asiri Cultural Immersion Programs", slug: "cultural-events", icon: Sparkles, desc: "Corporate cultural programs featuring Asiri architecture, flower crowns, and Razeef tribal dance." },
      { name: "Al Habala Heritage Events", slug: "destination-events", icon: Mountain, desc: "Cable car-accessed heritage village ceremonies and VIP cultural experiences." },
      { name: "Corporate Mountain Retreats", slug: "destination-events", icon: Mountain, desc: "Leadership off-sites and team-building programs across Aseer National Park and mountain lodges." },
      { name: "National Day Programming", slug: "cultural-events", icon: Users, desc: "National Day cultural programs, Aseer Season entertainment events, and government ceremonies." },
    ],
    faqs: [
      {
        q: "What makes Abha unique as an event destination in Saudi Arabia?",
        a: "Abha sits at 2,200 metres — Saudi Arabia's highest major city — giving it the Kingdom's coolest temperatures and its only truly green, misty highland landscape. The Asiri cultural identity (geometric painted architecture, flower-crown tradition, Razeef tribal dance) is the most distinct in Saudi Arabia. Combined with Al Habala's cable car-accessed hanging village and GEA's massive Aseer Season investment, Abha offers a destination event experience available nowhere else in the Kingdom.",
      },
      {
        q: "Can you plan a wedding at Al Habala or the Aseer Cultural Village?",
        a: "Yes. Al Habala — the heritage hanging village accessible only by cable car — is available for intimate private ceremonies through coordinated access. Aseer Cultural Village accommodates larger wedding receptions (up to 3,000 guests) with full Asiri cultural entertainment, traditional architecture backdrops, and folkloric Razeef performances. Saudi Event Management holds the local relationships to access both venues.",
      },
      {
        q: "What is the GEA Aseer Season and how can brands participate?",
        a: "The GEA Aseer Season is Saudi Arabia's highland entertainment season running May–September, featuring concerts, cultural festivals, adventure experiences, and heritage programs in and around Abha. Saudi Event Management coordinates corporate brand activations, sponsorship event programs, and on-ground event production for brands activating within the Aseer Season calendar. GEA permits and SECB compliance are managed as part of the full-service offering.",
      },
      {
        q: "What Asiri cultural elements can be incorporated into a corporate event?",
        a: "Aseer has the most distinct regional culture in Saudi Arabia — unique elements include the Asiri flower-crown headdress (worn by men), geometric painted mud-brick architecture, the Razeef tribal sword dance performance, traditional Asiri cuisine, and handwoven textiles. Saudi Event Management integrates these into corporate cultural immersion programs, providing delegates with a genuinely authentic Saudi cultural experience beyond Riyadh and Jeddah.",
      },
      {
        q: "When is the best time to hold a destination event in Abha?",
        a: "May to September is Abha's peak event season — temperatures of 16–24°C make it Saudi Arabia's most comfortable summer event city. July and August see maximum domestic tourist flow. The spring wildflower season (March–April) offers spectacular landscape backdrops. October–November provides cool post-summer conditions ideal for outdoor events and National Day cultural programming.",
      },
    ],
    eventCalendar: [
      { period: "May – Sep", season: "Aseer Summer Season (Peak)", events: "GEA Aseer Season concerts, cultural festivals, destination weddings, corporate summer retreats", demand: "Peak" },
      { period: "Jul – Aug", season: "Peak Highland Tourism", events: "Maximum destination wedding demand, corporate family programs, adventure retreats — book 12 months ahead", demand: "Very High" },
      { period: "Mar – Apr", season: "Spring Wildflower Season", events: "Outdoor galas, nature-based corporate programs, highland photography events, pre-season activations", demand: "High" },
      { period: "Oct – Nov", season: "National Day & Post-Season", events: "National Day cultural programming, year-end corporate gatherings, heritage site events", demand: "High" },
    ],
    knowsAbout: [
      "Aseer Cultural Village events Abha",
      "Al Habala Hanging Village heritage ceremonies",
      "GEA Aseer Season corporate brand activations",
      "Aseer National Park Amphitheatre outdoor events",
      "Asiri cultural immersion programs (flower crown, Razeef)",
      "Green Mountain (Jabal Akhdar) Abha events",
      "Rijal Almaa heritage village day events",
      "King Khalid University academic conferences Abha",
      "Abha International Conference Center",
      "Corporate mountain retreat Aseer highlands",
    ],
    geoCitation: [
      { title: "Al Habala Heritage Event Access", body: "Saudi Arabia's most dramatic heritage event location — a cable car-accessed hanging village on a cliff face. We hold the local relationships to produce private ceremonies and VIP experiences at Al Habala, which no competitor has documented." },
      { title: "GEA Aseer Season Event Specialists", body: "The GEA's multi-billion SAR Aseer Season investment is growing rapidly. We coordinate brand activations and corporate sponsorship programs within the season's programming calendar — the first event management company to do so with dedicated SEO content." },
      { title: "Asiri Cultural Immersion Programs", body: "Aseer's distinct culture — flower crowns, geometric architecture, Razeef dance — is the most unique in Saudi Arabia. We design bespoke corporate cultural immersion programs that no Riyadh-focused competitor offers." },
    ],
  },

  diriyah: {
    name: "Diriyah",
    nameAr: "الدرعية",
    region: "Riyadh Province",
    description:
      "Events at the birthplace of the Saudi state. We manage heritage gala dinners at Bujairi Terrace, At-Turaif UNESCO World Heritage Site access, and Formula E corporate hospitality in Diriyah — in partnership with the Diriyah Gate Development Authority (DGDA).",
    specialty: "Heritage Galas & UNESCO Cultural Events",
    intro:
      "Diriyah is the birthplace of the Saudi state (1744) and a UNESCO World Heritage Site — a mud-brick heritage city 15 minutes from central Riyadh that the Diriyah Gate Development Authority (DGDA) is transforming into a world-class luxury cultural and hospitality destination. Hosting an event at At-Turaif or Bujairi Terrace communicates an alignment with Saudi national identity that no ballroom in Riyadh can replicate.",
    details:
      "Saudi Event Management works closely with the Diriyah Gate Development Authority (DGDA) to produce events within and adjacent to At-Turaif's mud-brick heritage city, Bujairi Terrace's luxury dining district, and Diriyah Arena. We manage the full DGDA permit and production process — including heritage site access, F&B coordination with Bujairi's restaurant network, and Formula E corporate hospitality suite management.",
    geoCoords: { lat: "24.7388", lng: "46.5704" },
    wikidata: "Q917945",
    glance: [
      { val: "UNESCO", label: "Heritage Site (2010)" },
      { val: "15 min", label: "From Riyadh Center" },
      { val: "1744", label: "Saudi State Founded" },
      { val: "DGDA", label: "Permit Authority" },
      { val: "18,000", label: "Arena Capacity" },
      { val: "Formula E", label: "Annual Grand Prix" },
    ],
    venues: [
      {
        name: "Bujairi Terrace",
        capacity: "Up to 1,000 (outdoor)",
        district: "Bujairi Village",
        type: "Corporate Galas, Outdoor Dinners & Brand Activations",
        desc: "Saudi Arabia's most prestigious outdoor heritage dining district — 7+ luxury restaurants in a restored mud-brick village setting. The premier outdoor corporate gala venue in Riyadh.",
      },
      {
        name: "At-Turaif UNESCO Heritage Site",
        capacity: "DGDA-controlled access",
        district: "At-Turaif District",
        type: "VIP Heritage Dinners & Diplomatic Events",
        desc: "18th-century mud-brick capital of the first Saudi state — a UNESCO World Heritage Site since 2010. Hosting an event within At-Turaif is the highest prestige statement in Saudi corporate events.",
      },
      {
        name: "Diriyah Arena",
        capacity: "Up to 18,000",
        district: "Diriyah",
        type: "Large Corporate Galas, Concerts & National Events",
        desc: "Diriyah's major indoor arena — hosts Formula E, concerts, and large-scale brand activations within the heritage development zone.",
      },
      {
        name: "Wadi Hanifah Amphitheatre",
        capacity: "Up to 3,000",
        district: "Wadi Hanifah Valley",
        type: "Cultural Events, Outdoor Concerts & Evening Galas",
        desc: "An outdoor amphitheatre in the palm-lined Wadi Hanifah valley below Diriyah — the most atmospheric outdoor event space in the Riyadh region.",
      },
      {
        name: "Diriyah Biennale Pavilions",
        capacity: "Up to 2,000",
        district: "Diriyah",
        type: "Cultural Brand Events & Art Exhibitions",
        desc: "Purpose-built pavilions for the Islamic Arts Biennale — corporate co-event and sponsorship programming in one of the art world's most internationally covered events.",
      },
      {
        name: "Samhan Cultural District",
        capacity: "Up to 1,500",
        district: "Diriyah",
        type: "Cultural Programs & Luxury Hospitality",
        desc: "A new cultural and hospitality district within the Diriyah development — growing event infrastructure adjacent to the UNESCO heritage zone.",
      },
    ],
    stats: [
      { val: "60+", label: "Diriyah Events" },
      { val: "DGDA", label: "Preferred Partner" },
      { val: "UNESCO", label: "Heritage Access" },
      { val: "24/7", label: "VIP Concierge" },
    ],
    services: [
      { name: "At-Turaif Heritage Galas", slug: "luxury-vip-events", icon: Star, desc: "DGDA-permitted VIP dinners and diplomatic events within the UNESCO heritage site." },
      { name: "Bujairi Terrace Corporate Dinners", slug: "corporate-events", icon: Briefcase, desc: "Corporate gala dinners at Diriyah's luxury outdoor heritage dining district." },
      { name: "Formula E Hospitality Suites", slug: "luxury-vip-events", icon: Star, desc: "Corporate hospitality suite management at the Diriyah Grand Prix Formula E race weekend." },
      { name: "Diriyah Biennale Co-Events", slug: "cultural-events", icon: Sparkles, desc: "Islamic Arts Biennale corporate sponsorship and co-event production at the pavilions." },
      { name: "Diriyah Arena Productions", slug: "event-production", icon: Landmark, desc: "Large-scale corporate galas, concerts, and brand activations at Diriyah Arena." },
      { name: "Brand Activations", slug: "event-production", icon: Sparkles, desc: "Luxury brand activations using Najdi mud-brick heritage architecture as backdrop." },
    ],
    faqs: [
      {
        q: "Can you hold a corporate event at At-Turaif UNESCO World Heritage Site?",
        a: "Yes, with DGDA-managed access permits. At-Turaif is available for carefully managed private corporate events, VIP dinners, and diplomatic gatherings through the Diriyah Gate Development Authority's event licensing process. Saudi Event Management holds preferred DGDA partner status and manages the full permit and production process for At-Turaif heritage events.",
      },
      {
        q: "What makes Diriyah the most prestigious corporate event location near Riyadh?",
        a: "Diriyah is the birthplace of the Saudi state (1744) and a UNESCO World Heritage Site — the only corporate event destination in Saudi Arabia combining UNESCO heritage status, historic royal significance, modern luxury F&B (Bujairi Terrace), a major arena (Diriyah Arena), and annual Formula E motorsport. No venue in Riyadh offers an equivalent prestige narrative.",
      },
      {
        q: "How do you get event permits for Diriyah venues?",
        a: "All Diriyah events are governed by the Diriyah Gate Development Authority (DGDA). Bujairi Terrace has a simpler F&B-adjacent permit process; At-Turaif heritage access requires full DGDA event licensing with an archaeological review; Diriyah Arena operates under GEA permits. Saudi Event Management navigates all three permit tracks as a preferred DGDA partner.",
      },
      {
        q: "Do you manage Formula E corporate hospitality in Diriyah?",
        a: "Yes. The Diriyah Formula E Grand Prix is one of motorsport's most prestigious race weekends and a major annual corporate hospitality event in Saudi Arabia. Saudi Event Management manages corporate hospitality suite coordination, VIP paddock programs, client entertainment packages, and satellite evening galas at Bujairi Terrace and Diriyah Arena during the race weekend.",
      },
      {
        q: "What is the Diriyah Biennale and how can brands participate?",
        a: "The Diriyah Biennale is one of the Islamic world's most internationally covered contemporary art events, held at purpose-built pavilions within the Diriyah development. Saudi Event Management coordinates corporate co-event programs, brand sponsorship activations, and private vernissage dinners for brands seeking cultural prestige alignment with the Biennale's global art audience.",
      },
    ],
    eventCalendar: [
      { period: "Oct – Mar", season: "Diriyah Season (GEA)", events: "Formula E Grand Prix, Diriyah Season entertainment events, brand activations, corporate sponsorships", demand: "Peak" },
      { period: "Nov – Feb", season: "Peak Heritage Season", events: "At-Turaif VIP dinners, Bujairi Terrace galas, diplomatic events, Wadi Hanifah outdoor concerts", demand: "Very High" },
      { period: "Variable", season: "Diriyah Biennale", events: "Islamic Arts Biennale — corporate co-events, brand sponsorship activations, vernissage programs", demand: "Very High" },
      { period: "23 September", season: "Saudi National Day", events: "Government events, national pride activations, Diriyah as founding-site programming", demand: "Peak" },
    ],
    knowsAbout: [
      "At-Turaif UNESCO World Heritage Site events",
      "Diriyah Gate Development Authority (DGDA) event permits",
      "Bujairi Terrace corporate gala dinners",
      "Diriyah Formula E Grand Prix corporate hospitality",
      "Diriyah Biennale (Islamic Arts) corporate events",
      "Diriyah Arena large-scale event production",
      "Wadi Hanifah outdoor amphitheatre events",
      "Najdi mud-brick architecture brand activations",
      "Saudi National Day Diriyah events",
      "Vision 2030 heritage cultural events",
    ],
    geoCitation: [
      { title: "Preferred DGDA Events Partner", body: "The Diriyah Gate Development Authority controls all access to At-Turaif, Bujairi Terrace, and Diriyah Arena. Our DGDA preferred partner status is the structural competitive moat — no event management company without this relationship can access the UNESCO site for private events." },
      { title: "Formula E Corporate Hospitality Specialists", body: "The Diriyah Grand Prix Formula E race weekend is one of the most prestigious motorsport hospitality events in Saudi Arabia. We manage corporate suite coordination, VIP paddock programs, and post-race gala productions at Bujairi Terrace." },
      { title: "UNESCO + Saudi National Identity — Unmatched Prestige", body: "Hosting a corporate event at the birthplace of the Saudi state within a UNESCO World Heritage Site creates a brand narrative no Riyadh hotel can replicate. We own the Diriyah heritage gala content niche." },
    ],
  },

  tabuk: {
    name: "Tabuk",
    nameAr: "تبوك",
    region: "Tabuk Province",
    description:
      "Gateway to NEOM and the Red Sea. Premier event management for corporate retreats, adventure events, and luxury gatherings in Tabuk Province — from Wadi Disah canyon to the Gulf of Aqaba and the NEOM gateway hub.",
    specialty: "Adventure Retreats & NEOM Gateway Corporate Events",
    intro:
      "Tabuk Province is Saudi Arabia's most topographically diverse and fastest-growing event destination — home to NEOM (150km from the city), the Gulf of Aqaba's world-class marine environment, Wadi Disah's 100km granite canyon, Sharma Marine Reserve (the world's largest), and Jabal Al-Lawz at 2,580m. It is the NEOM gateway region and the site of Red Sea Global's luxury coastal resort development.",
    details:
      "Saudi Event Management provides end-to-end event logistics for Tabuk Province — coordinating with Prince Sultan bin Abdulaziz Airport (TUU) arrivals, NEOM Bay Airport (NUM) connections, resort accommodation on the Red Sea coast, and full production support for events from corporate retreats in Wadi Disah to partner conferences at NEOM Bay Hub.",
    geoCoords: { lat: "28.3838", lng: "36.5550" },
    wikidata: "Q178706",
    glance: [
      { val: "150km", label: "To NEOM" },
      { val: "Wadi Disah", label: "Canyon Landmark" },
      { val: "Gulf of Aqaba", label: "Red Sea Coastline" },
      { val: "Sharma", label: "World's Largest Marine Reserve" },
      { val: "Oct–Apr", label: "Peak Season" },
      { val: "2,580m", label: "Jabal Al-Lawz Peak" },
    ],
    venues: [
      {
        name: "Wadi Disah Canyon Camp",
        capacity: "Custom outdoor",
        district: "Wadi Disah (100km SE of Tabuk)",
        type: "Adventure Retreats & Luxury Desert Events",
        desc: "A 100km granite canyon with a perennial freshwater stream — Saudi Arabia's most dramatic natural outdoor event space and one of the world's most spectacular corporate retreat settings.",
      },
      {
        name: "NEOM Bay Hub (Sharma)",
        capacity: "Up to 1,000",
        district: "NEOM Bay",
        type: "NEOM Partner Conferences & Innovation Events",
        desc: "The operational gateway to NEOM — suited for NEOM partner briefings, investor site-visit events, and innovation conferences accessible via NEOM Bay Airport (NUM).",
      },
      {
        name: "Gulf of Aqaba Coastal Venues (Haql)",
        capacity: "Custom outdoor",
        district: "Haql coastline",
        type: "Sunset Galas & Red Sea Yacht Events",
        desc: "Saudi Arabia's most pristine Red Sea marine environment — yacht-based receptions, sunset coastal galas, and eco-luxury brand activations on the Gulf of Aqaba.",
      },
      {
        name: "Tabuk Hilton Hotel",
        capacity: "Up to 800",
        district: "Central Tabuk",
        type: "Corporate Events & Government Conferences",
        desc: "Tabuk city's premier branded hotel — the primary accommodation and event hub for NEOM-adjacent corporate programs using Tabuk as a gateway city.",
      },
      {
        name: "Tabuk Convention Center",
        capacity: "Up to 1,500",
        district: "Central Tabuk",
        type: "Government Events & Regional Conferences",
        desc: "Tabuk's largest dedicated conference venue — government summits, regional MICE, and NEOM supply chain corporate events.",
      },
      {
        name: "Sharma Marine Reserve Visitor Hub",
        capacity: "Intimate",
        district: "Sharma Coast",
        type: "Eco-Luxury Activations & Marine Events",
        desc: "The world's largest protected marine conservation area — eco-luxury brand activations, marine conservation events, and sustainability-focused corporate programs.",
      },
    ],
    stats: [
      { val: "20+", label: "Tabuk Events" },
      { val: "8+", label: "Venue Partners" },
      { val: "NEOM", label: "Gateway Region" },
      { val: "24/7", label: "On-site Support" },
    ],
    services: [
      { name: "NEOM-Adjacent Corporate Events", slug: "corporate-events", icon: Briefcase, desc: "Contractor briefings, partner qualifications, and investor events with NEOM Bay Hub access." },
      { name: "Wadi Disah Adventure Retreats", slug: "destination-events", icon: Mountain, desc: "Luxury desert camp corporate retreats and adventure leadership programs in Wadi Disah canyon." },
      { name: "Red Sea Coastal Events", slug: "destination-events", icon: Globe, desc: "Gulf of Aqaba yacht receptions, sunset galas, and eco-luxury brand activations at Sharma." },
      { name: "Eco-Luxury Brand Activations", slug: "event-production", icon: Sparkles, desc: "Sustainability-aligned brand events at Sharma Marine Reserve and Red Sea Global venues." },
      { name: "NEOM Logistics & Accommodation Events", slug: "corporate-events", icon: Users, desc: "Full event logistics using Tabuk city as the NEOM supply base — accommodation, transfers, production." },
      { name: "Adventure Team-Building", slug: "destination-events", icon: Mountain, desc: "Outdoor team-building programs in Wadi Disah, Jabal Al-Lawz, and the Red Sea highlands." },
    ],
    faqs: [
      {
        q: "Can you hold a corporate retreat in Wadi Disah canyon?",
        a: "Yes. Wadi Disah is a 100km granite canyon with a perennial freshwater stream — one of Saudi Arabia's most dramatic natural settings. Saudi Event Management coordinates exclusive desert camp corporate retreats, adventure leadership programs, and private outdoor galas in Wadi Disah, managing all transport logistics from Tabuk city (~100km), equipment, catering, and safety infrastructure.",
      },
      {
        q: "What corporate events are generated by NEOM in Tabuk Province?",
        a: "NEOM's $500B+ development phase creates a sustained Tabuk event pipeline: contractor qualification days, vendor partner briefings, investor site visits, innovation conferences at NEOM Bay Hub, and executive accommodation events in Tabuk city. Saudi Event Management coordinates full-service corporate event logistics for NEOM-adjacent programs — including Tabuk Airport arrivals, transfers to NEOM Bay, and on-site event production.",
      },
      {
        q: "What Red Sea event experiences are available in Tabuk Province?",
        a: "Tabuk Province's Gulf of Aqaba coastline hosts Saudi Arabia's most pristine Red Sea marine environment — including Sharma Marine Reserve (world's largest protected marine area). Corporate experiences include sunset yacht receptions, eco-luxury brand activations at Sharma, snorkeling/diving team-building programs, and coastal gala dinners at Haql waterfront. Red Sea Global's luxury resort development adds permanent event infrastructure to the Tabuk coast from 2025 onwards.",
      },
      {
        q: "How do you travel to Tabuk Province for an event?",
        a: "Prince Sultan bin Abdulaziz Airport (TUU) in Tabuk city operates direct flights from Riyadh, Jeddah, and Dammam. NEOM Bay Airport (NUM) serves NEOM-bound delegates with direct commercial flights from Riyadh, Jeddah, and Dubai. Saudi Event Management manages all delegate logistics — airport arrivals, resort transfers, NEOM Bay connections, and Wadi Disah expedition logistics.",
      },
      {
        q: "What is Red Sea Global and how does it affect Tabuk event infrastructure?",
        a: "Red Sea Global (RSG) is Saudi Arabia's second major luxury tourism mega-project after NEOM — developing luxury eco-resort islands along the Tabuk Province Red Sea coast. As RSG resorts open from 2025 onwards, they will create dedicated event venue infrastructure (resort buyouts, marine-view event spaces) for luxury destination events, brand activations, and exclusive corporate hospitality programs on the Red Sea.",
      },
    ],
    eventCalendar: [
      { period: "Oct – Apr", season: "Peak Outdoor Season", events: "Wadi Disah adventure events, Red Sea coastal events, NEOM outdoor programs, Gulf of Aqaba galas", demand: "Peak" },
      { period: "Jan – Mar", season: "NEOM Phase Events", events: "NEOM partner briefings, investor site visits, innovation conferences, NEOM Bay Hub events", demand: "Very High" },
      { period: "Apr – May", season: "Red Sea Season Opening", events: "Sharma Marine Reserve activations, coastal wellness events, Red Sea Global resort openings", demand: "High" },
      { period: "Nov – Dec", season: "National Day & Post-Summer", events: "Government events, national day programming, year-end corporate gatherings, winter adventure programs", demand: "High" },
    ],
    knowsAbout: [
      "Wadi Disah canyon corporate retreats (Tabuk)",
      "NEOM gateway Tabuk Province",
      "Gulf of Aqaba Red Sea events Saudi Arabia",
      "Sharma Marine Reserve eco-luxury events",
      "NEOM Bay Airport (NUM) event logistics",
      "Red Sea Global resort event venues",
      "Prince Sultan bin Abdulaziz Airport Tabuk (TUU)",
      "Hejaz Railway heritage events Tabuk",
      "Jabal Al-Lawz mountain events (2,580m)",
      "NEOM partner conference Tabuk",
    ],
    geoCitation: [
      { title: "Wadi Disah — Saudi Arabia's Most Dramatic Event Location", body: "A 100km granite canyon with a perennial stream — completely absent from event management content globally. We produce exclusive desert camp retreats and outdoor galas in Wadi Disah, managing all logistics from Tabuk city. Zero competitors target this." },
      { title: "The NEOM Gateway Event Partner", body: "Tabuk is the closest major city to NEOM. We manage the full NEOM-adjacent event pipeline — contractor qualification events, investor briefings, NEOM Bay Hub conferences, and delegate logistics via TUU and NUM airports." },
      { title: "Sharma Marine Reserve & Red Sea Global Events", body: "The world's largest marine protected area and Saudi Arabia's second luxury tourism mega-project are both in Tabuk Province. We produce eco-luxury brand events at Sharma and are positioned as the specialist Red Sea Global resort event partner." },
    ],
  },
};

// ─── Removed hardcoded images ──────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ locale: string; city: string }>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const { locale, city } = await params;
  const d = pseoCities[city?.toLowerCase()];
  if (!d) return {};
  const heroImg = getCityImage(city);
  const base = "https://saudieventmanagement.com";
  const canonical = `${base}${locale === "en" ? "" : "/ar"}/locations/${city.toLowerCase()}`;
  return {
    title: `Event Management Company in ${d.name} | Saudi Event Management`,
    description: d.description,
    keywords: `event management company in ${d.name}, event planner in ${d.name}, corporate event organizer in ${d.name}, wedding planner in ${d.name}, ${d.nameAr}, Saudi Event Management`,
    alternates: {
      canonical,
      languages: {
        "en-US": `${base}/locations/${city.toLowerCase()}`,
        "ar-SA": `${base}/ar/locations/${city.toLowerCase()}`,
      },
    },
    openGraph: {
      title: `Event Management in ${d.name} | Saudi Event Management`,
      description: d.description,
      url: canonical,
      siteName: "Saudi Event Management",
      images: [{ url: `https://saudieventmanagement.com${heroImg}`, width: 1200, height: 630, alt: `Event management in ${d.name}, Saudi Arabia` }],
      locale: "en_SA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Event Management in ${d.name} | Saudi Event Management`,
      description: d.description,
      images: [`https://saudieventmanagement.com${heroImg}`],
    },
  };
}

// ─── Demand badge helper ──────────────────────────────────────────────────────
const demandClass = (d: string) =>
  d === "Peak" ? "bg-red-50 text-red-700 border-red-200"
  : d === "Very High" ? "bg-orange-50 text-orange-700 border-orange-200"
  : d === "Low" ? "bg-[var(--surface-raised)] text-neutral-500 border-neutral-200/80"
  : "bg-emerald-50 text-[var(--primary)] border-emerald-200";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DynamicLocationPage({ params }: PageProps) {
  const { city } = await params;
  const cityKey = city?.toLowerCase();
  const d = pseoCities[cityKey];
  if (!d) notFound();

  const canonicalUrl = `https://saudieventmanagement.com/locations/${cityKey}`;
  const heroImage = getCityImage(cityKey);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EventPlanner"],
        "@id": `${canonicalUrl}#business`,
        "name": `Saudi Event Management — ${d.name}`,
        "description": d.description,
        "image": `https://saudieventmanagement.com${heroImage}`,
        "url": canonicalUrl,
        "telephone": "+966501234567",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": d.name,
          "addressRegion": d.region,
          "addressCountry": "SA",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": d.geoCoords.lat,
          "longitude": d.geoCoords.lng,
        },
        "areaServed": { "@type": "City", "name": d.name },
        "sameAs": [`https://www.wikidata.org/wiki/${d.wikidata}`],
        "knowsAbout": d.knowsAbout,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${d.name} Event Management Services`,
          "itemListElement": d.services.map((s) => ({
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": s.name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": d.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "Place",
        "@id": `${canonicalUrl}#place`,
        "name": d.name,
        "geo": { "@type": "GeoCoordinates", "latitude": d.geoCoords.lat, "longitude": d.geoCoords.lng },
        "containsPlace": d.venues.map((v) => ({
          "@type": "EventVenue",
          "name": v.name,
          "description": v.desc,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
          { "@type": "ListItem", "position": 3, "name": d.name, "item": canonicalUrl },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <InternalPageHero
        title={`Event Management in ${d.name}`}
        subtitle={d.description}
        backgroundImage={heroImage}
        imageAlt={`Event management in ${d.name}, ${d.region}, Saudi Arabia`}
        badge={`${d.region} · ${d.nameAr}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: d.name },
        ]}
        minHeight="large"
      />

      {/* CTA bar */}
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">Request a Proposal</Link>
          <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">View Our Work</Link>
        </div>
      </div>

      {/* At-a-Glance Strip */}
      <section className="py-12 bg-[var(--surface-raised)] border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {d.glance.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-lg md:text-xl font-display font-semibold text-neutral-900">{item.val}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-label">Our Expertise in {d.name}</span>
            <h2 className="font-display font-bold text-neutral-900 mb-6 text-2xl md:text-3xl mt-4">{d.specialty}</h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-5">{d.intro}</p>
            <p className="text-neutral-600 text-sm leading-relaxed mb-8">{d.details}</p>
            <div className="grid grid-cols-2 gap-4">
              {d.stats.map((s, i) => (
                <div key={i} className="text-center p-5 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-sm">
                  <div className="text-2xl font-display font-bold text-neutral-900 mb-1">{s.val}</div>
                  <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-6">Services in {d.name}</h3>
            <div className="space-y-3">
              {d.services.map((svc, i) => (
                <Link
                  key={i}
                  href={`/services/${svc.slug}`}
                  className="group flex items-start gap-4 p-4 bg-white border border-neutral-200/80 rounded-sm hover:border-emerald-400 hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-all">
                    <svc.icon size={16} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-neutral-900 group-hover:text-[var(--primary)] transition-colors mb-0.5">{svc.name}</span>
                    <span className="block text-xs text-neutral-500 leading-relaxed">{svc.desc}</span>
                  </div>
                  <ChevronRight size={14} className="text-neutral-300 group-hover:text-emerald-500 shrink-0 mt-1 ms-auto transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationCTA city={d.name} />

      {/* Venue Cards */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Venue Network</span>
            <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
              Premier Venues in <span className="text-[var(--primary)]">{d.name}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {d.venues.map((v, i) => (
              <div key={i} className="flex flex-col p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-[var(--primary)]/30 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-neutral-900 text-sm leading-snug pe-2">{v.name}</h3>
                  <span className="text-xs bg-emerald-50 text-[var(--primary)] border border-emerald-200 px-2 py-1 rounded-sm font-medium whitespace-nowrap shrink-0">{v.capacity}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={11} className="text-neutral-400" />
                  <span className="text-xs text-neutral-400">{v.district}</span>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed flex-1">{v.desc}</p>
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide">{v.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label">Planning Your Event</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            {d.name} Event <span className="text-[var(--primary)]">Season Calendar</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {d.eventCalendar.map((row, i) => (
            <div key={i} className="flex gap-4 p-6 bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:border-[var(--primary)]/30 transition-all">
              <Calendar size={20} className="text-[var(--primary)] mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-display font-semibold text-neutral-900 text-sm">{row.period}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${demandClass(row.demand)}`}>
                    {row.demand} Demand
                  </span>
                </div>
                <p className="text-xs font-semibold text-neutral-600 mb-1">{row.season}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{row.events}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEO Citation Block */}
      <section className="py-20 md:py-20 md:py-28 bg-[var(--surface-raised)] border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">{d.name} Event Authority</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4 mb-12">
            Why Saudi Event Management in <span className="text-[var(--primary)]">{d.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {d.geoCitation.map((card, i) => (
              <div key={i} className="p-7 bg-white border border-neutral-200/80 rounded-2xl shadow-sm">
                <h3 className="font-display font-semibold text-neutral-900 text-sm mb-3">{card.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">Common Questions</span>
          <h2 className="font-display font-medium text-neutral-900 text-2xl md:text-3xl mt-4">
            Event Management in {d.name} — <span className="text-[var(--primary)]">FAQ</span>
          </h2>
        </div>
        <div className="space-y-4">
          {d.faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-200/80 rounded-2xl overflow-hidden">
              <div className="p-6">
                <h3 className="font-display font-semibold text-neutral-900 text-sm mb-3">{faq.q}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entity Architecture Block */}
      <section className="py-20 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <div className="flex items-start gap-4 mb-6">
              <Building className="text-[var(--primary)] shrink-0 mt-1" size={24} />
              <h2 className="text-xl font-semibold text-neutral-900">
                Event Management in {d.name} ({d.nameAr}), Saudi Arabia
              </h2>
            </div>
            <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                <strong>Saudi Event Management</strong> is the specialist event management company for {d.name} ({d.nameAr}), {d.region}, Kingdom of Saudi Arabia. We deliver {d.specialty.toLowerCase()} — serving corporate, luxury, and government event clients across {d.name} and the broader {d.region}.
              </p>
              <p>
                Our {d.name} team holds preferred relationships with the city&apos;s premier venues, local vendors, and governing authorities — ensuring GEA-compliant execution fully aligned with Saudi Vision 2030&apos;s event industry transformation goals.
              </p>
              <p>
                Looking for an event management company in {d.name}?{" "}
                <Link href="/contact" className="text-[var(--primary)] underline underline-offset-4 font-medium">Contact our team</Link>,{" "}
                <Link href="/consultation" className="text-[var(--primary)] underline underline-offset-4 font-medium">book a free consultation</Link>, or browse our{" "}
                <Link href="/portfolio" className="text-[var(--primary)] underline underline-offset-4 font-medium">event portfolio</Link>.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest">Services in {d.name}:</p>
              <div className="flex flex-wrap gap-3">
                {d.services.map((svc) => (
                  <Link key={svc.slug + svc.name} href={`/services/${svc.slug}`}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                    {svc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-city links */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Also serving</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Riyadh",    href: "/locations/riyadh"  },
              { name: "Jeddah",    href: "/locations/jeddah"  },
              { name: "Dammam",    href: "/locations/dammam"  },
              { name: "AlUla",     href: "/locations/alula"   },
              { name: "Makkah",    href: "/locations/makkah"  },
              { name: "NEOM",      href: "/locations/neom"    },
              { name: "Diriyah",   href: "/locations/diriyah" },
            ]
              .filter((c) => c.name.toLowerCase() !== d.name.toLowerCase())
              .slice(0, 5)
              .map((c) => (
                <Link key={c.href} href={c.href}
                  className="inline-flex items-center gap-1 px-5 py-2 bg-white border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
                  <MapPin size={10} /> {c.name}
                </Link>
              ))}
            <Link href="/locations"
              className="inline-flex items-center gap-1 px-5 py-2 bg-white border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              All Locations <ChevronRight size={10} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
