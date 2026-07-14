import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InternalPageHero from "@/components/InternalPageHero";
import VenueExperienceGrid from "@/components/venues/VenueExperienceGrid";
import VenueJourneyTimeline from "@/components/venues/VenueJourneyTimeline";
import GalleryLightbox from "@/components/venues/GalleryLightbox";
import ParallaxImageBand from "@/components/venues/ParallaxImageBand";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin, Users, Music,
  Footprints, Home, Building2, Landmark, Palette, ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AlMughayra Heritage Sport Village — Venue Portfolio | SEM",
  description:
    "Explore AlMughayra Heritage Sport Village in AlUla — a world-class destination for traditional sports, camel racing, and cultural events.",
  alternates: {
    canonical: "https://saudieventmanagement.com/venues/almughayra-heritage-sport-village",
  },
  openGraph: {
    title: "AlMughayra Heritage Sport Village — Venue Portfolio",
    description: "A premier destination asset for traditional sports, heritage festivals, and camel racing in AlUla.",
    url: "https://saudieventmanagement.com/venues/almughayra-heritage-sport-village",
    siteName: "Saudi Event Management",
    images: [
      {
        url: "https://saudieventmanagement.com/venues/almughayra_p2_1.jpeg",
        width: 1200,
        height: 630,
        alt: "AlMughayra Heritage Sport Village",
      },
    ],
    locale: "en_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlMughayra Heritage Sport Village — Venue Portfolio",
    description: "A premier destination asset for traditional sports, heritage festivals, and camel racing in AlUla.",
    images: ["https://saudieventmanagement.com/venues/almughayra_p2_1.jpeg"],
  },
  robots: { index: false, follow: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      "name": "AlMughayra Heritage Sport Village",
      "description": "A world-class complex blending heritage and modernity, perfect for traditional sports, camel racing, and community engagement in AlUla.",
      "image": "https://saudieventmanagement.com/venues/almughayra_p2_1.jpeg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "AlUla",
        "addressRegion": "Al Madinah Province",
        "addressCountry": "SA"
      },
      "publicAccess": true
    },
    {
      "@type": "EventVenue",
      "name": "AlMughayra Heritage Sport Village",
      "description": "Premium destination featuring the Royal Venue, Heritage Village, and Camel Race Tracks in AlUla.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "AlUla",
        "addressRegion": "Al Madinah Province",
        "addressCountry": "SA"
      }
    }
  ]
};

// ─── Facility data — capacity/area shown only when confirmed. ───
const facilities = [
  { name: "Royal Venue", cap: "800 guests", area: "4,500 sqm", icon: Landmark, desc: "An inviting space ideal for gatherings and ceremonies. Features high-quality furniture adorned with traditional decorations. Accommodates stage construction." },
  { name: "Heritage Village", cap: undefined, area: "17,500 sqm", icon: Palette, desc: "An immersive experience celebrating AlUla's cultural richness. Features traditional architecture, food outlets, and spaces for local artists." },
  { name: "8 km Competition Racetrack", cap: "Intl. Events", area: "8 km", icon: Footprints, desc: "A premier main track designed specifically for local and international camel racing competitions." },
  { name: "6 km Training Racetrack", cap: "Year-Round", area: "6 km", icon: Footprints, desc: "Available year-round for camel training and local events. Supports the development of heritage sports traditions." },
  { name: "Camel Shelters (Ezabs)", cap: "250 Shelters", area: undefined, icon: Home, desc: "Dedicated resting spaces for camels during events, providing essential infrastructure for the racing community." },
  { name: "Parking & Access", cap: "Ample Capacity", area: undefined, icon: Building2, desc: "Both the Royal Venue and Heritage Village offer ample parking and dedicated entrances ensuring seamless visitor access." },
];

const experiences = [
  {
    category: "Heritage Sport",
    title: "Camel Trekking in the Desert",
    description: "Ride alongside the same landscape used for the AlUla Camel Cup, guided by local handlers.",
    expandedDescription: "Camel racing has shaped this stretch of desert for generations, and the same tracks used for the AlUla Camel Cup are open to guests for guided trekking. Local handlers lead small groups across the dunes at a relaxed pace — an easy way to experience the terrain that gives AlMughayra its name, before or after the event itself.",
    image: "/venues/almughayra_event_camel_rider.jpeg",
    imageAlt: "Camel rider crossing the desert near AlMughayra, AlUla",
  },
  {
    category: "Heritage & Culture",
    title: "Elephant Rock at Sunset",
    description: "A 52-metre sandstone arch, carved by wind and water — one of AlUla's most photographed landmarks.",
    expandedDescription: "Jabal Al-Fil, known to visitors as Elephant Rock, is a 52-metre sandstone arch shaped by millennia of wind and water — one of AlUla's most recognisable natural landmarks. It sits within easy reach of AlMughayra and is best visited in the late afternoon, when the low sun turns the rock deep red-gold.",
    image: "/venues/experiences/elephant-rock.jpg",
    imageAlt: "Elephant Rock (Jabal Al-Fil) at sunset, AlUla",
  },
  {
    category: "Heritage & Culture",
    title: "AlUla Old Town",
    description: "An 800-year-old mud-brick village — narrow lanes, galleries, and evening walks.",
    expandedDescription: "AlUla's Old Town is an 800-year-old mud-brick settlement, restored under RCU stewardship and now home to galleries, cafes, and small heritage sites along its original narrow lanes. An evening walk through it, once the desert heat has passed, gives guests a sense of AlUla's history that the venue's own heritage architecture only hints at.",
    image: "/venues/experiences/old-town.jpg",
    imageAlt: "AlUla Old Town heritage district",
  },
  {
    category: "Fine Dining",
    title: "Dinner in the Old Town",
    description: "Restored merchant houses now host AlUla's most distinctive dining rooms, including Joontos at Dar Tantora.",
    expandedDescription: "Several of Old Town's restored merchant houses now operate as restaurants, including Joontos at Dar Tantora, AlUla's first Old Town hotel. Dinner there seats guests inside a genuinely historic building rather than a themed one, and it makes a natural close to an event day at AlMughayra.",
    image: "/venues/experiences/joontos-dining.jpg",
    imageAlt: "Joontos restaurant at Dar Tantora, AlUla Old Town",
  },
  {
    category: "Luxury Stays",
    title: "Banyan Tree & Habitas AlUla",
    description: "Full resort buyout programs for delegations who want the whole valley to themselves.",
    expandedDescription: "Both resorts sit in the Ashar Valley and offer full buyout programs for groups who want privacy for the length of their stay. Banyan Tree leans toward classic desert luxury; Habitas has a rawer, architectural feel favoured by creative and brand-led groups. Either works as a base for a multi-day AlMughayra itinerary.",
    image: "/venues/experiences/banyan-tree1.jpeg",
    imageAlt: "Banyan Tree AlUla luxury desert resort",
  },
  {
    category: "Adventure",
    title: "Desert Dune Excursions",
    description: "UTV and buggy routes through the dunes surrounding the heritage village.",
    expandedDescription: "UTV and buggy routes run through the dune fields around the heritage village, guided and timed for the cooler parts of the day. It's the most straightforward way to give a group a genuine desert adventure without adding a full day to the itinerary.",
    image: "/venues/experiences/UTV-BUGGY-1.jpg",
    imageAlt: "Desert UTV buggy tour near AlUla",
  },
];

const journeyStops = [
  { day: "Day 1", title: "Arrival & Signature Event", description: "Delegates arrive via AlUla International Airport, transfer to AlMughayra, and the event takes centre stage in the Royal Venue." },
  { day: "Day 2", title: "Heritage & Adventure", description: "A morning at Hegra or Elephant Rock, an afternoon in the desert — dune excursions, camel trekking, or a private Old Town walk." },
  { day: "Day 3", title: "Leisure & Departure", description: "A relaxed morning at a resort of choice, a final dinner in the Old Town, and departure with a story worth retelling." },
];

const galleryImages = [
  { src: "/venues/almughayra_p5_4.jpeg", alt: "Royal Venue — Guest Lounge" },
  { src: "/venues/ai-generated/almughayra_camel_race.png", alt: "Camel Racing in the Desert" },
  { src: "/venues/almughayra_p6_5.jpeg", alt: "AlUla Camel Cup — Hospitality Lounge" },
  { src: "/venues/almughayra_event_race.jpeg", alt: "Camel Race Competition Track" },
  { src: "/venues/almughayra_p4_3.jpeg", alt: "Royal Venue Structure" },
  { src: "/venues/almughayra_event_camel_rider.jpeg", alt: "Camel Rider in AlUla Desert" },
  { src: "/venues/almughayra_p9_8.jpeg", alt: "Heritage Village at Dusk" },
  { src: "/venues/almughayra_event_night.webp", alt: "Night Light Show on Desert Cliffs" },
  { src: "/venues/almughayra_p10_9.jpeg", alt: "Aerial View of the Village Complex" },
  { src: "/venues/almughayra_p8_7.jpeg", alt: "Heritage Village Architecture" },
  { src: "/venues/almughayra_event_trophy.jpeg", alt: "Camel Cup Trophy Ceremony" },
  { src: "/venues/almughayra_p7_6.jpeg", alt: "Guest Reception & Lounge" },
  { src: "/venues/almughayra_p12_11.jpeg", alt: "Aerial View of Competition Racetrack" },
  { src: "/venues/almughayra_p13_12.jpeg", alt: "Aerial View of Training Racetrack" },
  { src: "/venues/extracted/almughayra_aerial_dusk.jpg", alt: "Aerial view of Heritage Village at dusk with mountain backdrop" },
  { src: "/venues/extracted/almughayra_aerial_racetrack.jpg", alt: "Aerial view of the camel racetrack and desert landscape" },
  { src: "/venues/extracted/almughayra_royal_stage_guests.jpg", alt: "Guests in the Royal Stage lounge during the AlUla Camel Cup" },
  { src: "/venues/extracted/almughayra_camel_cup_lounge.jpg", alt: "AlUla Camel Cup hospitality lounge inside the Royal Stage" },
];

export default function AlMughayraPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Navbar />

      {/* ── DRAFT BANNER ──────────────────────────────────────────────── */}
      <div className="fixed top-0 inset-x-0 z-[200] bg-amber-500 text-white text-center text-[12px] sm:text-[13px] font-bold tracking-widest uppercase py-2 shadow-md">
        DRAFT — Internal Proposal
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <InternalPageHero
        title="AlMughayra"
        titleHighlight="Heritage Sport Village"
        subtitle="A world-class destination asset blending heritage and modernity — the ultimate hub for traditional sports, cultural showcases, and community engagement."
        backgroundImage="/venues/almughayra_p2_1.jpeg"
        imageAlt="AlMughayra Heritage Sport Village — AlUla"
        badge="AlUla, Saudi Arabia"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: "AlMughayra Heritage Sport Village" },
        ]}
        enableParallax
        minHeight="large"
      />

      <div className="bg-white border-b border-neutral-100 py-6 flex justify-center">
        <Link
          href="/contact"
          className="px-8 py-4 text-white text-[14px] font-medium rounded-xl transition-all flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #044b36 0%, #0d6b4e 100%)",
            boxShadow: "0 4px 16px rgba(13, 107, 78, 0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
          }}
        >
          Request a Quote <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── POSITIONING STATEMENT ────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 px-6 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/venues/almughayra_event_night.webp')" }}
      >
        <div className="absolute inset-0 bg-neutral-950/80" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-emerald-500/60 mx-auto mb-8" />
          <p className="text-white text-xl md:text-3xl font-light leading-snug tracking-tight">
            Your guests won&apos;t just attend an event. They&apos;ll fall in love with a destination —{" "}
            <span className="text-emerald-400 font-medium">starting at AlMughayra.</span>
          </p>
          <div className="w-10 h-px bg-emerald-500/60 mx-auto mt-8" />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Destination Heritage</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Where Tradition Meets <span className="text-emerald-700">World-Class Facilities</span></h2>
          </div>
          <div className="space-y-6 text-neutral-600 text-[16px] md:text-[18px] leading-relaxed text-center font-light">
            <p>
              Discover AlMughayra Heritage Sport Village (HSV), a premier destination for traditional sports like camel racing and falconry, located 40 km southeast of AlUla city centre.
            </p>
            <p>
              This complex seamlessly blends heritage and modernity, making it the perfect hub for sports, global events, and community engagement in a breathtaking desert landscape.
            </p>
            <p>
              The asset features a Royal Venue with premium indoor seating, a sprawling Heritage Village, and professional Camel race tracks designed for international competitions.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY ALULA ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <ParallaxImageBand
            src="/alula_maraya_hegra_guide.webp"
            alt="AlUla heritage landscape — Maraya Concert Hall and Hegra UNESCO site"
            className="aspect-[4/5] rounded-2xl order-2 lg:order-1 shadow-lg"
          />
          <div className="order-1 lg:order-2">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Beyond the Venue</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-6">
              A Destination Your Guests <span className="text-emerald-700">Will Remember</span>
            </h2>
            <div className="space-y-5 text-neutral-600 text-[15px] md:text-[16px] leading-relaxed font-light">
              <p>
                An event venue in AlUla comes with something no hotel ballroom can offer: a 200,000-year-old sandstone landscape managed as a single protected destination by the Royal Commission for AlUla, home to Hegra — Saudi Arabia&apos;s first UNESCO World Heritage Site. It is this combination of ancient heritage, desert scale, and five-star infrastructure that makes AlUla event planning a category of its own.
              </p>
              <p>
                Bringing an international delegation to AlMughayra is a different decision than booking a conference hall in Riyadh or Jeddah. It gives a corporate event, gala, or destination wedding a setting guests will still be describing long after the agenda ends — and a reason for the trip to become a multi-day AlUla itinerary rather than a single afternoon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Strategic Assets</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Destination <span className="text-emerald-700">Highlights</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MapPin, label: "Spectacular Location", desc: "Located in a breathtaking desert landscape southeast of AlUla city centre." },
              { icon: Users, label: "Royal Venue Capacity", desc: "800-seat premium indoor venue with dedicated facilities and heritage styling." },
              { icon: Palette, label: "Immersive Heritage Village", desc: "17,500 square meters dedicated to cultural richness and traditional architecture." },
              { icon: Footprints, label: "International Race Tracks", desc: "Featuring an 8 km competition track and a 6 km training track for camel sports." },
              { icon: Home, label: "Camel Shelters", desc: "250 dedicated resting and accommodation spaces supporting local and global events." },
              { icon: Music, label: "Stage & Event Capabilities", desc: "Space available for constructing stages in front of the Royal platform for major concerts." },
            ].map((h, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-12 h-12 bg-emerald-100/50 flex items-center justify-center rounded-full shrink-0 group-hover:bg-emerald-100 transition-colors duration-500">
                  <h.icon size={20} className="text-emerald-800" />
                </div>
                <div>
                  <h4 className="text-[17px] font-medium text-neutral-900 mb-2">{h.label}</h4>
                  <p className="text-neutral-500 text-[15px] leading-relaxed font-light">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Premium Destination <span className="text-emerald-700">Spaces</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <f.icon size={24} className="text-neutral-400" />
                  {f.cap && (
                    <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      {f.cap}
                    </span>
                  )}
                </div>
                <h4 className="text-[18px] font-medium text-neutral-900 mb-1">{f.name}</h4>
                {f.area && <span className="text-[13px] text-emerald-600 font-medium block mb-3">{f.area}</span>}
                <p className="text-neutral-500 text-[14px] leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE BREAK ───────────────────────────────────── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <ParallaxImageBand
          src="/venues/almughayra_p9_8.jpeg"
          alt="Heritage Village at dusk, AlMughayra, AlUla"
          className="w-full h-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 p-8 md:p-16 text-center pointer-events-none">
          <span className="text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-3 block">Beyond the Agenda</span>
          <p className="text-white text-xl md:text-2xl font-light max-w-xl mx-auto">The desert doesn&apos;t close when the ceremony ends.</p>
        </div>
      </section>

      {/* ── SIGNATURE EVENTS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Core Scope</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Signature <span className="text-emerald-700">Heritage Events</span></h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto text-[15px]">
              AlMughayra Heritage Sport Village is the premier destination for preserving and celebrating traditional Saudi sporting customs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">AlUla Camel Cup</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                Often referred to as the &ldquo;Pinnacle of Camel Racing,&rdquo; this major event features elite camel racing and high-stakes competitions.
              </p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">AlUla Falcon Cup</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                A prestigious traditional falconry championship honoring the deep-rooted Bedouin heritage of hunting and training.
              </p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Immersive Cultural Festivals</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                Multi-sensory journeys offering storytelling, artisan crafts, traditional music, and authentic Saudi hospitality experiences.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-10 border-t border-neutral-100">
            {[
              "Heritage Brand Activations",
              "Cultural Festivals & National Day Programming",
              "Executive Desert Majlis Evenings",
              "Vision 2030 Heritage Sport Campaigns",
            ].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 text-[13px] font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ALULA EXPERIENCE ─────────────────────────────────────── */}
      <VenueExperienceGrid
        eyebrow="Before & After the Event"
        heading={<>The AlUla <span className="text-emerald-700">Experience</span></>}
        intro="A one-day event at AlMughayra sits inside a much larger destination. Here is what your guests can build a multi-day itinerary around."
        items={experiences}
      />

      {/* ── SUGGESTED JOURNEY ─────────────────────────────────────────── */}
      <VenueJourneyTimeline
        eyebrow="Planning the Trip"
        heading={<>A Suggested <span className="text-emerald-700">Multi-Day Journey</span></>}
        intro="Most international delegations extend their stay beyond the event itself. Here is one way the days can come together."
        stops={journeyStops}
      />

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Visual Documentation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Destination <span className="text-emerald-700">Gallery</span></h2>
          </div>
          <GalleryLightbox images={galleryImages} />
          <p className="text-center text-neutral-400 text-[13px] mt-10 italic">
            Venue infrastructure and event imagery displayed for proposal review.
          </p>
        </div>
      </section>

      {/* ── INQUIRY ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-neutral-50">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-4xl mx-auto shadow-xl">
          <div className="absolute inset-0 opacity-10">
             <Image src="/venues/almughayra_p4_3.jpeg" alt="Background Texture" fill className="object-cover grayscale" />
          </div>
          <div className="relative z-10">
            <h2 className="font-semibold mb-6 text-3xl md:text-4xl tracking-tight" style={{ color: '#ffffff' }}>
              Engage with <span className="text-emerald-400">AlMughayra</span>
            </h2>
            <p className="text-neutral-300 max-w-2xl mx-auto mb-10 text-[16px] leading-relaxed font-light">
              Submit your destination inquiry through Saudi Event Management. We facilitate planning seamlessly with destination management to secure this premier asset.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="px-10 py-4 text-white text-[15px] font-medium rounded-xl transition-all inline-flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, #044b36 0%, #0d6b4e 100%)",
                  boxShadow: "0 4px 16px rgba(13, 107, 78, 0.28), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
              >
                Request Proposal <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERNAL PROPOSAL NOTICE ──────────────────────────────────── */}
      <div className="bg-neutral-900 border-t border-neutral-800 px-6 py-12 text-center">
        <h4 className="text-emerald-500 text-[12px] font-bold tracking-[0.15em] uppercase mb-3">
          Proposal Information
        </h4>
        <p className="text-neutral-400 text-[13px] max-w-3xl mx-auto font-light leading-relaxed">
          This venue is showcased on Saudi Event Management as an internal proposal. Content displayed on this page is subject to final approval by all stakeholders and periodic updates.
        </p>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
