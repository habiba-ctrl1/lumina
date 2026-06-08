import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InternalPageHero from "@/components/InternalPageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building, CheckCircle2, ChevronRight } from "lucide-react";

// ─── City Data ────────────────────────────────────────────────────────────────
const pseoCities: Record<
  string,
  {
    name: string;
    nameAr: string;
    region: string;
    description: string;
    specialty: string;
    intro: string;
    details: string;
    venues: string[];
    stats: { val: string; label: string }[];
    faqs: { q: string; a: string }[];
    services: { name: string; slug: string }[];
  }
> = {
  neom: {
    name: "NEOM",
    nameAr: "نيوم",
    region: "Tabuk Province",
    description:
      "The future of luxury events. We provide hyper-futuristic, sustainable event management solutions for corporate summits and elite gatherings in NEOM.",
    specialty: "Sustainable & Tech-Forward Events",
    intro:
      "NEOM is Saudi Arabia's most visionary event destination — a $500B giga-project offering unprecedented backdrops for innovation summits, luxury brand events, and exclusive corporate retreats.",
    details:
      "Saudi Event Management works directly with NEOM's event partnerships division to facilitate access, accommodation, and full production logistics across THE LINE, Sindalah Island, and AQABA. Every event we produce in NEOM is aligned with the project's zero-carbon sustainability mandate.",
    venues: [
      "Sindalah Island Resort (NEOM)",
      "THE LINE Innovation Campus",
      "AQABA Mountain Resort",
      "NEOM Bay Airport Lounge",
      "Epicon Luxury Resort",
    ],
    stats: [
      { val: "25+", label: "NEOM Events" },
      { val: "5", label: "Resort Partners" },
      { val: "100%", label: "Sustainable Production" },
      { val: "24/7", label: "On-site Support" },
    ],
    faqs: [
      {
        q: "Can you host a corporate summit inside NEOM?",
        a: "Yes. Saudi Event Management manages corporate summits and innovation conferences inside the NEOM development, coordinating directly with NEOM's hospitality and events division for access permits, accommodation, and production logistics.",
      },
      {
        q: "What types of events are suited to NEOM?",
        a: "NEOM is ideal for innovation summits, technology conferences, luxury brand activations, corporate retreats at Sindalah Island, and exclusive investor stakeholder gatherings. The futuristic landscape creates powerful brand associations.",
      },
      {
        q: "event management company near me NEOM",
        a: "Saudi Event Management is one of the most experienced event planning companies operating within the NEOM development, with established access agreements and preferred vendor relationships across the project.",
      },
    ],
    services: [
      { name: "Destination Events", slug: "destination-events" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
      { name: "Event Production", slug: "event-production" },
    ],
  },
  khobar: {
    name: "Al Khobar",
    nameAr: "الخبر",
    region: "Eastern Province",
    description:
      "Bespoke event planning in Al Khobar, specializing in luxury waterfront weddings and high-profile corporate galas on the Arabian Gulf.",
    specialty: "Coastal Weddings & Corporate Galas",
    intro:
      "Al Khobar is the Eastern Province's premier lifestyle and business destination — a cosmopolitan Gulf-coast city offering spectacular waterfront venues for weddings, corporate galas, and international exhibitions.",
    details:
      "Our Khobar team serves the Eastern Province's major commercial and energy sector clients, with deep relationships across the city's luxury hotels and waterfront venues. We coordinate seamlessly across the Dammam-Khobar-Dhahran metropolitan corridor.",
    venues: [
      "InterContinental Al Khobar",
      "Sofitel Al Khobar The Corniche",
      "Le Méridien Al Khobar",
      "Al Khobar Corniche Waterfront",
      "Rosewood Hotel Dhahran Hills",
    ],
    stats: [
      { val: "90+", label: "Khobar Events" },
      { val: "30+", label: "Venue Partners" },
      { val: "15+", label: "Years Regional" },
      { val: "24/7", label: "Local Support" },
    ],
    faqs: [
      {
        q: "What are the best event venues in Al Khobar?",
        a: "Al Khobar's top event venues include the InterContinental Hotel Al Khobar, Sofitel Al Khobar The Corniche, and Le Méridien Al Khobar — all offering Arabian Gulf waterfront views. Saudi Event Management holds preferred access to all major Khobar venues.",
      },
      {
        q: "Do you manage weddings in Al Khobar?",
        a: "Yes. Saudi Event Management provides full luxury wedding planning services in Al Khobar, including venue sourcing on the Gulf Corniche, bespoke decor, Zaffa coordination, and VIP guest management.",
      },
      {
        q: "event company near me Al Khobar",
        a: "Saudi Event Management has a dedicated Eastern Province team based in the Dammam-Khobar corridor, providing same-day consultation and full event management across Al Khobar and Dhahran.",
      },
    ],
    services: [
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Luxury Weddings", slug: "weddings" },
      { name: "Conference Management", slug: "conferences" },
      { name: "Exhibitions", slug: "exhibitions" },
    ],
  },
  makkah: {
    name: "Makkah",
    nameAr: "مكة المكرمة",
    region: "Makkah Province",
    description:
      "Respectful, culturally-aligned, and meticulously planned hospitality and logistical events in the holy city of Makkah.",
    specialty: "VIP Hospitality & Religious Protocol Events",
    intro:
      "Makkah holds the highest cultural and spiritual significance in the Islamic world. Saudi Event Management plans and manages culturally respectful VIP hospitality events, exclusive iftar gatherings, and high-protocol religious hospitality programs in the holy city.",
    details:
      "Our Makkah operations team works within the city's strict cultural and logistical guidelines, coordinating with Makkah's premier luxury hotels adjacent to the Grand Mosque. All events are planned with deep respect for the sanctity of the location and the requirements of international VIP pilgrims.",
    venues: [
      "Raffles Makkah Palace",
      "Fairmont Makkah Clock Royal Tower",
      "Hilton Suites Makkah",
      "Mövenpick Hotel & Residences Makkah",
      "Swissôtel Al Maqam Makkah",
    ],
    stats: [
      { val: "50+", label: "Makkah Events" },
      { val: "5", label: "Luxury Partners" },
      { val: "100%", label: "Cultural Compliance" },
      { val: "24/7", label: "VIP Concierge" },
    ],
    faqs: [
      {
        q: "What types of events can be held in Makkah?",
        a: "In Makkah, Saudi Event Management specialises in VIP Hajj and Umrah hospitality packages, exclusive Ramadan iftar events, high-protocol corporate dinners for Islamic finance and halal industry stakeholders, and private family gatherings during the holy months.",
      },
      {
        q: "Which hotels in Makkah are best for VIP events?",
        a: "The premier VIP event hotels in Makkah include the Raffles Makkah Palace and the Fairmont Makkah Clock Royal Tower, both offering direct Grand Mosque views with dedicated VIP hospitality floors and private event salons.",
      },
      {
        q: "VIP event planner near me Makkah",
        a: "Saudi Event Management has a culturally trained Makkah hospitality team providing discreet, protocol-compliant VIP event planning for dignitaries, royal families, and high-net-worth individuals visiting the holy city.",
      },
    ],
    services: [
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
      { name: "Cultural & Religious Events", slug: "cultural-events" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Destination Events", slug: "destination-events" },
    ],
  },
  madinah: {
    name: "Madinah",
    nameAr: "المدينة المنورة",
    region: "Al Madinah Province",
    description:
      "Expert event management in Madinah, focusing on seamless execution for exhibitions, corporate hospitality, and private family events.",
    specialty: "Cultural Exhibitions & Spiritual Hospitality",
    intro:
      "Madinah, one of Islam's most sacred cities, is a growing destination for spiritual tourism events, interfaith hospitality conferences, and exclusive VIP pilgrim experiences. Saudi Event Management plans events in Madinah with the highest levels of cultural sensitivity and operational precision.",
    details:
      "Our Madinah team coordinates with the city's international-standard luxury hotels — including the Anantara and Oberoi — to deliver world-class hospitality events in a setting of profound spiritual significance. All events fully comply with Madinah's cultural and religious protocols.",
    venues: [
      "Anantara Al Jabal Al Akhdar Resort",
      "Oberoi Madinah",
      "Dar Al Taqwa Hotel",
      "Movenpick Hotel Madinah",
      "InterContinental Dar Al Hijra Madinah",
    ],
    stats: [
      { val: "40+", label: "Madinah Events" },
      { val: "5", label: "Hotel Partners" },
      { val: "100%", label: "Cultural Compliance" },
      { val: "24/7", label: "VIP Concierge" },
    ],
    faqs: [
      {
        q: "Can you plan a corporate iftar event in Madinah?",
        a: "Yes. Saudi Event Management plans exclusive corporate iftar and suhoor events in Madinah during Ramadan, sourcing private dining rooms at the Anantara and Oberoi hotels and coordinating halal catering, cultural entertainment, and VIP protocol.",
      },
      {
        q: "What event venues are available in Madinah?",
        a: "The best event venues in Madinah include the Anantara Al Jabal Al Akhdar, the Oberoi Madinah, and the InterContinental Dar Al Hijra — all offering private function rooms with views of the Prophet's Mosque district.",
      },
      {
        q: "event management company near me Madinah",
        a: "Saudi Event Management provides full-service event planning in Madinah for corporate hospitality, VIP pilgrim experiences, and private family gatherings — all planned with deep cultural sensitivity and operational precision.",
      },
    ],
    services: [
      { name: "Cultural & Religious Events", slug: "cultural-events" },
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Conference Management", slug: "conferences" },
    ],
  },
  taif: {
    name: "Taif",
    nameAr: "الطائف",
    region: "Makkah Province",
    description:
      "High-altitude luxury. We design spectacular summer weddings and corporate retreats amidst the mountain roses of Taif.",
    specialty: "Mountain Retreats & Summer Weddings",
    intro:
      "Taif — the City of Roses — sits 1,800 metres above sea level in the Hejaz mountains, offering Saudi Arabia's most refreshing summer climate. It is an increasingly sought-after destination for mountain weddings, private retreats, and annual corporate summer gatherings.",
    details:
      "Saudi Event Management leverages Taif's rose-scented ambiance and cooler temperatures to deliver unique event experiences that contrast beautifully with Saudi Arabia's desert landscape. From rose garden ceremonies to mountain-view corporate dinners, Taif offers genuine luxury in a naturally spectacular setting.",
    venues: [
      "InterContinental Taif",
      "Marriott Hotel Taif",
      "Al Shafa Mountain Resort",
      "Taif Rose Farm (Al Hada)",
      "Shubra Palace Heritage Site",
    ],
    stats: [
      { val: "35+", label: "Taif Events" },
      { val: "15+", label: "Venue Partners" },
      { val: "12", label: "Mountain Venues" },
      { val: "24/7", label: "Local Support" },
    ],
    faqs: [
      {
        q: "Why choose Taif for a destination wedding?",
        a: "Taif offers a unique combination of cool mountain air, rose gardens, and stunning Hejaz mountain scenery — making it an extraordinary alternative to Saudi Arabia's desert destinations. Weddings in Taif are particularly popular in summer when temperatures are 10–15°C cooler than the lowlands.",
      },
      {
        q: "What corporate events work well in Taif?",
        a: "Taif is ideal for annual corporate retreats, executive strategy sessions, team building programmes, and incentive trips. The mountain setting reduces digital distraction and promotes deep engagement among executives.",
      },
      {
        q: "event planner near me Taif",
        a: "Saudi Event Management has a dedicated Taif operations team providing event planning support across the city's mountain venues, rose farms, and heritage sites, with full logistics management for groups travelling from Jeddah and Riyadh.",
      },
    ],
    services: [
      { name: "Destination Events", slug: "destination-events" },
      { name: "Luxury Weddings", slug: "weddings" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
    ],
  },
  abha: {
    name: "Abha",
    nameAr: "أبها",
    region: "Aseer Province",
    description:
      "Experience the cool breezes of Aseer. Premier event management for destination weddings and cultural festivals in Abha.",
    specialty: "Cultural Festivals & Destination Weddings",
    intro:
      "Abha is Saudi Arabia's highland gem — a city of cool mists, terraced villages, and vibrant Asiri culture sitting at 2,200 metres in the Aseer mountains. It is an outstanding destination for cultural events, destination weddings, and immersive corporate retreats.",
    details:
      "Saudi Event Management brings its full suite of luxury event capabilities to Abha, working with the city's growing portfolio of mountain hotels and the Aseer Cultural Village to deliver events that celebrate Saudi Arabia's extraordinary regional cultural diversity.",
    venues: [
      "Aseer National Park Amphitheatre",
      "Aseer Cultural Village",
      "Marriott Hotel Abha",
      "Sahab Hotel Abha",
      "Al Habala Heritage Village",
    ],
    stats: [
      { val: "30+", label: "Abha Events" },
      { val: "12+", label: "Venue Partners" },
      { val: "100%", label: "Cultural Events" },
      { val: "24/7", label: "On-site Support" },
    ],
    faqs: [
      {
        q: "What makes Abha unique for events?",
        a: "Abha offers Saudi Arabia's most dramatic highland setting — misty mountains, terraced gardens, and vibrant Asiri folk culture. It is ideal for cultural festivals, outdoor destination weddings, and corporate retreats that prioritise natural beauty and authentic Saudi heritage.",
      },
      {
        q: "What cultural events can be planned in Abha?",
        a: "Abha is home to the annual Aseer Season, traditional Asiri folk music and dance performances, and heritage village experiences. Saudi Event Management plans corporate cultural immersion programmes, national day events, and private cultural celebrations in Abha throughout the year.",
      },
      {
        q: "destination event planner near me Abha",
        a: "Saudi Event Management has an Abha operations team providing end-to-end destination event planning across the Aseer region, coordinating flights, mountain accommodation, traditional entertainment, and local cultural permits.",
      },
    ],
    services: [
      { name: "Cultural & Religious Events", slug: "cultural-events" },
      { name: "Destination Events", slug: "destination-events" },
      { name: "Luxury Weddings", slug: "weddings" },
      { name: "Corporate Events", slug: "corporate-events" },
    ],
  },
  diriyah: {
    name: "Diriyah",
    nameAr: "الدرعية",
    region: "Riyadh Province",
    description:
      "Events in the birthplace of the Saudi state. Heritage gala dinners, culture-forward corporate events, and VIP experiences at At-Turaif UNESCO World Heritage Site.",
    specialty: "Heritage Galas & Cultural Corporate Events",
    intro:
      "Diriyah is the birthplace of the Saudi state and one of the world's most evocative heritage destinations — a UNESCO World Heritage Site being transformed into a world-class cultural and hospitality hub just 15 minutes from central Riyadh.",
    details:
      "Saudi Event Management works closely with the Diriyah Gate Development Authority (DGDA) to produce extraordinary events within and around At-Turaif's mud-brick heritage city and the Bujairi Terrace dining district. Diriyah events carry unmatched prestige and national cultural significance.",
    venues: [
      "Bujairi Terrace Diriyah",
      "At-Turaif UNESCO World Heritage Site",
      "Diriyah Biennale Pavilions",
      "Wadi Hanifah Outdoor Amphitheatre",
      "Diriyah Arena (upcoming)",
    ],
    stats: [
      { val: "60+", label: "Diriyah Events" },
      { val: "DGDA", label: "Preferred Partner" },
      { val: "UNESCO", label: "Heritage Access" },
      { val: "24/7", label: "VIP Concierge" },
    ],
    faqs: [
      {
        q: "Can you host a corporate gala in Diriyah?",
        a: "Yes. Saudi Event Management produces exclusive corporate gala dinners and heritage-themed events at Diriyah's Bujairi Terrace and At-Turaif, working in partnership with the Diriyah Gate Development Authority (DGDA) for site permits and access.",
      },
      {
        q: "What makes Diriyah ideal for a corporate event?",
        a: "Diriyah offers an unparalleled sense of historical prestige — hosting a corporate event at the birthplace of the Saudi state creates a powerful brand narrative. The mud-brick architecture, UNESCO status, and proximity to central Riyadh make it uniquely compelling for high-profile events.",
      },
      {
        q: "heritage event planner near me Diriyah",
        a: "Saudi Event Management is Diriyah's preferred event planning partner, with established DGDA relationships and a track record of producing prestigious galas, cultural events, and brand activations at this extraordinary heritage destination.",
      },
    ],
    services: [
      { name: "Cultural & Religious Events", slug: "cultural-events" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
      { name: "Destination Events", slug: "destination-events" },
    ],
  },
  tabuk: {
    name: "Tabuk",
    nameAr: "تبوك",
    region: "Tabuk Province",
    description:
      "Gateway to NEOM and the Red Sea. Premier event management for corporate retreats, adventure events, and luxury gatherings in Tabuk Province.",
    specialty: "Adventure Retreats & NEOM Gateway Events",
    intro:
      "Tabuk Province is one of Saudi Arabia's most exciting emerging event destinations — home to NEOM, Sharma Aquarium, and some of the Kingdom's most spectacular Red Sea coastal scenery. It is rapidly becoming a major hub for innovation conferences and outdoor luxury events.",
    details:
      "Saudi Event Management provides end-to-end event logistics for Tabuk, including airport arrivals at Prince Sultan bin Abdulaziz Airport, resort accommodation across the Red Sea coast, and full production support for events ranging from corporate retreats to large-scale outdoor experiences.",
    venues: [
      "Sharma Aquarium (Red Sea)",
      "NEOM Bay Airport Events Hub",
      "Ayla Hotels Tabuk",
      "Wadi Disah Canyon Camp",
      "Sindalah Island (NEOM Tabuk)",
    ],
    stats: [
      { val: "20+", label: "Tabuk Events" },
      { val: "8+", label: "Venue Partners" },
      { val: "NEOM", label: "Gateway Region" },
      { val: "24/7", label: "On-site Support" },
    ],
    faqs: [
      {
        q: "Why is Tabuk emerging as an event destination?",
        a: "Tabuk Province hosts the NEOM mega-project and some of Saudi Arabia's most spectacular Red Sea coastline. The combination of futuristic infrastructure (NEOM), natural beauty (Wadi Disah), and growing luxury resort capacity makes Tabuk an increasingly compelling event destination.",
      },
      {
        q: "What corporate events work in Tabuk?",
        a: "Tabuk is suited to innovation conferences leveraging NEOM proximity, outdoor adventure corporate retreats in Wadi Disah canyon, coastal team building on the Red Sea, and exclusive stakeholder events at emerging Red Sea resorts.",
      },
      {
        q: "event management near me Tabuk",
        a: "Saudi Event Management provides event planning services across Tabuk Province — from central Tabuk city to NEOM and the Red Sea coast — with dedicated logistics management for remote and coastal venue events.",
      },
    ],
    services: [
      { name: "Destination Events", slug: "destination-events" },
      { name: "Corporate Events", slug: "corporate-events" },
      { name: "Luxury VIP Events", slug: "luxury-vip-events" },
      { name: "Event Production", slug: "event-production" },
    ],
  },
};

// ─── City hero images ─────────────────────────────────────────────────────────
const CITY_IMAGES: Record<string, string> = {
  neom: "/neom_summit_people.webp",
  khobar: "/alkhobar_corporate_people.webp",
  makkah: "/majlis_gathering_people.webp",
  madinah: "/gallery_garden_party.webp",
  taif: "/gallery_destination_wedding.webp",
  abha: "/alula_gala_people.webp",
  diriyah: "/gallery_charity_gala.webp",
  tabuk: "/hero_bg.webp",
};
const DEFAULT_IMAGE = "/riyadh_summit_people.webp";
const CITY_VIDEOS: Record<string, string> = { makkah: "/makkah.mp4" };

// ─── Params type ──────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ locale: string; city: string }>;
}



export async function generateMetadata({ params }: PageProps) {
  const { city } = await params;
  const d = pseoCities[city?.toLowerCase()];
  if (!d) return {};
  return {
    title: `Event Management in ${d.name} | Saudi Event Management`,
    description: d.description,
    keywords: `event management ${d.name}, luxury events ${d.name}, corporate events ${d.name}, wedding planner ${d.name}, ${d.nameAr}, Saudi Event Management`,
    alternates: {
      canonical: `https://saudieventmanagement.com/locations/${city.toLowerCase()}`,
      languages: {
        "en-US": `https://saudieventmanagement.com/locations/${city.toLowerCase()}`,
        "ar-SA": `https://saudieventmanagement.com/ar/locations/${city.toLowerCase()}`,
      },
    },
    openGraph: {
      title: `Event Management in ${d.name} | Saudi Event Management`,
      description: d.description,
      url: `https://saudieventmanagement.com/locations/${city.toLowerCase()}`,
      images: [{ url: CITY_IMAGES[city.toLowerCase()] ?? DEFAULT_IMAGE, width: 1200, height: 630, alt: `Event management ${d.name} Saudi Arabia` }],
    },
  };
}

export default async function DynamicLocationPage({ params }: PageProps) {
  const { city } = await params;
  const cityKey = city?.toLowerCase();
  const d = pseoCities[cityKey];
  if (!d) notFound();

  const canonicalUrl = `https://saudieventmanagement.com/locations/${cityKey}`;
  const heroImage = CITY_IMAGES[cityKey] ?? DEFAULT_IMAGE;
  const heroVideo = CITY_VIDEOS[cityKey];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EventPlanner"],
        "name": `Saudi Event Management — ${d.name}`,
        "description": d.description,
        "areaServed": { "@type": "City", "name": d.name },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": d.name,
          "addressRegion": d.region,
          "addressCountry": "SA",
        },
        "telephone": "+966501234567",
        "url": canonicalUrl,
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
    <main className="min-h-screen bg-white overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <InternalPageHero
        title={`Event Management in ${d.name}`}
        subtitle={d.description}
        backgroundImage={heroImage}
        backgroundVideo={heroVideo}
        imageAlt={`Event management in ${d.name}, ${d.region}, Saudi Arabia`}
        badge={`${d.region} • ${d.nameAr}`}
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

      {/* Stats */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {d.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-1">{s.val}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro content */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-label">Our Expertise in {d.name}</span>
            <h2 className="font-display font-bold text-slate-900 mb-6 text-2xl md:text-3xl mt-4">
              {d.specialty}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">{d.intro}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{d.details}</p>
          </div>

          {/* Venue Partnerships */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
              Preferred Venues in {d.name}
            </h3>
            <ul className="space-y-3">
              {d.venues.map((v, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-sm hover:border-[var(--primary)]/30 transition-all">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AI Entity Block */}
      <section className="py-20 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <div className="flex items-start gap-4 mb-6">
              <Building className="text-gold-500 shrink-0 mt-1" size={24} />
              <h2 className="text-xl font-semibold text-neutral-900">
                Entity Architecture: Saudi Event Management in {d.name}
              </h2>
            </div>
            <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p><strong>Geographic Domain:</strong> {d.name} ({d.nameAr}), {d.region}, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> Saudi Event Management delivers end-to-end event management in {d.name} — specialising in {d.specialty.toLowerCase()}, corporate summits, and high-net-worth VIP experiences.</p>
              <p><strong>Local Infrastructure:</strong> Our {d.name} team holds preferred relationships with the city's premier venues, local vendors, and government authorities — ensuring GEA-compliant execution aligned with Vision 2030's event industry goals.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest">Services Available in {d.name}:</p>
              <div className="flex flex-wrap gap-3">
                {d.services.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-10 uppercase tracking-wide">
            Event Management in {d.name} — FAQ
          </h2>
          <div className="space-y-5">
            {d.faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-city links */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Also serving
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Riyadh", href: "/locations/riyadh" },
              { name: "Jeddah", href: "/locations/jeddah" },
              { name: "Dammam", href: "/locations/dammam" },
              { name: "AlUla", href: "/locations/alula" },
              { name: "NEOM", href: "/locations/neom" },
              { name: "Al Khobar", href: "/locations/khobar" },
              { name: "Diriyah", href: "/locations/diriyah" },
            ]
              .filter((c) => c.name.toLowerCase() !== d.name.toLowerCase())
              .slice(0, 5)
              .map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center gap-1 px-5 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  <MapPin size={10} /> {c.name}
                </Link>
              ))}
            <Link
              href="/locations"
              className="inline-flex items-center gap-1 px-5 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
            >
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
