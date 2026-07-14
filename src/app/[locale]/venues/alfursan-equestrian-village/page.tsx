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
  MapPin, Users, Music, Armchair,
  Tent, TreePine, Shield, ArrowRight,
  Building2, Fence, MountainSnow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AlFursan Equestrian Village — Venue Portfolio | SEM",
  description:
    "Explore AlFursan Equestrian Village, a premier heritage destination and equestrian hub in AlUla.",
  alternates: {
    canonical: "https://saudieventmanagement.com/venues/alfursan-equestrian-village",
  },
  openGraph: {
    title: "AlFursan Equestrian Village — Venue Portfolio",
    description: "Discover AlFursan Equestrian Village in AlUla — a world-class destination honouring cultural heritage and equestrian excellence.",
    url: "https://saudieventmanagement.com/venues/alfursan-equestrian-village",
    siteName: "Saudi Event Management",
    images: [
      {
        url: "https://saudieventmanagement.com/venues/alfursan_p2_1.jpeg",
        width: 1200,
        height: 630,
        alt: "AlFursan Equestrian Village Landscape",
      },
    ],
    locale: "en_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlFursan Equestrian Village — Venue Portfolio",
    description: "Discover AlFursan Equestrian Village in AlUla — a world-class destination honouring cultural heritage and equestrian excellence.",
    images: ["https://saudieventmanagement.com/venues/alfursan_p2_1.jpeg"],
  },
  robots: { index: false, follow: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristAttraction",
      "name": "AlFursan Equestrian Village",
      "description": "A distinctive destination honouring AlUla's cultural heritage and natural beauty — blending equestrian tradition with world-class facilities.",
      "image": "https://saudieventmanagement.com/venues/alfursan_p2_1.jpeg",
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
      "name": "AlFursan Equestrian Village",
      "description": "Premium event destination featuring the Endurance Terrace, Polo Grandstand, and exclusive heritage lounges in AlUla.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "AlUla",
        "addressRegion": "Al Madinah Province",
        "addressCountry": "SA"
      }
    }
  ]
};

// ─── Facility data — capacity shown only when confirmed. ───
const facilities = [
  { name: "Endurance Terrace", cap: "1,000 guests", icon: Tent, desc: "An inviting space with natural wooden flooring. Shaded and suitable for air conditioning. Space available for stage construction." },
  { name: "Polo Grandstand", cap: "1,000 guests", icon: MountainSnow, desc: "Seating area offering captivating views. Suitable for concerts and show events. The polo field accommodates stage performances." },
  { name: "Shuwayma Lounge", cap: "70 guests", icon: Armchair, desc: "High-quality furniture adorned with traditional decorative lights and carpets. Equipped with a large screen." },
  { name: "Dahma Lounge", cap: "100 guests", icon: Armchair, desc: "Comfortable seating with traditional decor showcasing AlUla's colour themes. Includes large screen." },
  { name: "Saqlawiya Lounge", cap: "100 guests", icon: Armchair, desc: "Traditional heritage lights and carpets. Flexible furniture arrangements for bespoke corporate setups." },
  { name: "Kahilah Lounge", cap: "100 guests", icon: Armchair, desc: "Features two large screens for presentations. Adorned with heritage carpets and inspired decor." },
  { name: "Obaya Lounge", cap: "120 guests", icon: Armchair, desc: "The largest VIP lounge, featuring two large screens, premium furniture, and traditional elements." },
  { name: "Indoor Gathering Area", cap: undefined, icon: Building2, desc: "Flexible space for intimate celebrations. Can operate independently or combine with main lounges for larger functions." },
  { name: "Polo Field", cap: undefined, icon: Fence, desc: "Professional polo field adaptable for stage performances, utilizing strict protections to preserve the sports flooring." },
  { name: "Horse Tracks & Stables", cap: undefined, icon: TreePine, desc: "Operational equestrian infrastructure supporting training and events, forming the core of this equestrian hub." },
];

const experiences = [
  { category: "Equestrian", title: "Horseback Riding Across the Canyon", description: "Guided rides through the sandstone terrain surrounding AlFursan, for riders of every level.", image: "/venues/experiences/horse-riding1.jpeg", imageAlt: "Horseback riders crossing the AlUla canyon near AlFursan" },
  { category: "Heritage & Culture", title: "Elephant Rock at Sunset", description: "A 52-metre sandstone arch, carved by wind and water — one of AlUla's most photographed landmarks.", image: "/venues/experiences/elephant-rock.jpg", imageAlt: "Elephant Rock (Jabal Al-Fil) at sunset, AlUla" },
  { category: "Heritage & Culture", title: "AlUla Old Town", description: "An 800-year-old mud-brick village — narrow lanes, galleries, and evening walks.", image: "/venues/experiences/old-town.jpg", imageAlt: "AlUla Old Town heritage district" },
  { category: "Fine Dining", title: "Dinner in the Old Town", description: "Restored merchant houses now host AlUla's most distinctive dining rooms, including Joontos at Dar Tantora.", image: "/venues/experiences/joontos-dining.jpg", imageAlt: "Joontos restaurant at Dar Tantora, AlUla Old Town" },
  { category: "Luxury Stays", title: "Banyan Tree & Habitas AlUla", description: "Full resort buyout programs for delegations who want the whole valley to themselves.", image: "/venues/experiences/banyan-tree2.avif", imageAlt: "Banyan Tree AlUla luxury desert resort" },
  { category: "Adventure", title: "Desert Dune Excursions", description: "UTV and buggy routes through the dunes surrounding the equestrian village.", image: "/venues/experiences/UTV-BUGGY-2.jpg", imageAlt: "Desert UTV buggy tour near AlUla" },
];

const journeyStops = [
  { day: "Day 1", title: "Arrival & Signature Event", description: "Delegates arrive via AlUla International Airport, transfer to AlFursan, and the event takes centre stage on the Polo Grandstand or Endurance Terrace." },
  { day: "Day 2", title: "Heritage & Adventure", description: "A morning at Hegra or Elephant Rock, an afternoon in the saddle — canyon rides, desert excursions, or a private Old Town walk." },
  { day: "Day 3", title: "Leisure & Departure", description: "A relaxed morning at a resort of choice, a final dinner in the Old Town, and departure with a story worth retelling." },
];

const galleryImages = [
  { src: "/venues/alfursan_p6_5.jpeg", alt: "AlFursan Village — Desert Setting" },
  { src: "/venues/alfursan_event_polo.jpg", alt: "Desert Polo Match at AlUla" },
  { src: "/venues/alfursan_p9_8.jpeg", alt: "Polo Field & Grandstand" },
  { src: "/venues/alfursan_event_action.jpeg", alt: "Polo Players in Action" },
  { src: "/venues/alfursan_p4_3.jpeg", alt: "Endurance Terrace Setup" },
  { src: "/venues/alfursan_p5_4.jpeg", alt: "Event Hospitality Under the Stars" },
  { src: "/venues/alfursan_event_hospitality.jpeg", alt: "VIP Hospitality Area" },
  { src: "/venues/alfursan_p10_9.jpeg", alt: "Guest Lounge Interior" },
  { src: "/venues/alfursan_p7_6.jpeg", alt: "Polo Grandstand Infrastructure" },
  { src: "/venues/alfursan_p8_7.jpeg", alt: "Equestrian Grounds & Canyon Backdrop" },
  { src: "/venues/alfursan_event_aerial.jpeg", alt: "Equestrian Village Aerial View" },
  { src: "/venues/alfursan_p12_11.jpeg", alt: "Briefing Session in the Lounge" },
  { src: "/venues/alfursan_p13_12.jpeg", alt: "Auditorium Seating Setup" },
  { src: "/venues/alfursan_grandstand.png", alt: "Polo Grandstand with Spectators" },
  { src: "/venues/experiences/horse-riding.jpeg", alt: "Guests riding at AlFursan Equestrian Village" },
  { src: "/venues/experiences/horse-riding3.jpg", alt: "Horseback riding session at AlFursan, AlUla" },
];

export default function AlFursanPage() {
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
        title="AlFursan"
        titleHighlight="Equestrian Village"
        subtitle="A world-class destination asset honouring AlUla's cultural heritage — blending premier equestrian tradition with exceptional landscape infrastructure."
        backgroundImage="/venues/alfursan_p2_1.jpeg"
        imageAlt="AlFursan Equestrian Village — AlUla"
        badge="AlUla, Saudi Arabia"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: "AlFursan Equestrian Village" },
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
        style={{ backgroundImage: "url('/venues/alfursan_p5_4.jpeg')" }}
      >
        <div className="absolute inset-0 bg-neutral-950/80" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-emerald-500/60 mx-auto mb-8" />
          <p className="text-white text-xl md:text-3xl font-light leading-snug tracking-tight">
            Your guests won&apos;t just attend an event. They&apos;ll fall in love with a destination —{" "}
            <span className="text-emerald-400 font-medium">starting at AlFursan.</span>
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
              Where Heritage Meets <span className="text-emerald-700">Equestrian Excellence</span></h2>
          </div>
          <div className="space-y-6 text-neutral-600 text-[16px] md:text-[18px] leading-relaxed text-center font-light">
            <p>
              AlFursan Equestrian Village seeks to offer visitors a distinctive and immersive experience, all while honouring the local environment and safeguarding cultural heritage.
            </p>
            <p>
              The primary objective is to enhance the lives of AlUla&apos;s residents and the visitors who come to appreciate its rich history, natural beauty, art, and vibrant spirit.
            </p>
            <p>
              Currently, the Village features operational facilities, with plans for further development to establish it as a central hub for equestrian sports and community involvement in the near future.
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
                Bringing an international delegation to AlFursan is a different decision than booking a conference hall in Riyadh or Jeddah. It gives a corporate event, gala, or equestrian showcase a setting guests will still be describing long after the agenda ends — and a reason for the trip to become a multi-day AlUla itinerary rather than a single afternoon.
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
              { icon: MapPin, label: "Located in AlUla", desc: "Set within the heritage landscape of AlUla." },
              { icon: Users, label: "Grand Scale Capacities", desc: "Endurance Terrace and Polo Grandstand each accommodating 1,000 guests." },
              { icon: Armchair, label: "Premium Heritage Lounges", desc: "Five distinct, exquisitely designed indoor spaces." },
              { icon: MountainSnow, label: "Captivating Views", desc: "Stunning panoramic vistas of the surrounding desert ecology." },
              { icon: Shield, label: "Heritage Preservation", desc: "Sustainable operations honouring local environment and cultural integrity." },
              { icon: Music, label: "Stage-Ready Capabilities", desc: "Multiple integrated areas supporting stage construction for major performances." },
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
                <h4 className="text-[18px] font-medium text-neutral-900 mb-3">{f.name}</h4>
                <p className="text-neutral-500 text-[14px] leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE BREAK ───────────────────────────────────── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <ParallaxImageBand
          src="/venues/alfursan_p8_7.jpeg"
          alt="Equestrian grounds and canyon backdrop at AlFursan, AlUla"
          className="w-full h-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 p-8 md:p-16 text-center pointer-events-none">
          <span className="text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-3 block">Beyond the Agenda</span>
          <p className="text-white text-xl md:text-2xl font-light max-w-xl mx-auto">The ride doesn&apos;t end when the event does.</p>
        </div>
      </section>

      {/* ── SIGNATURE EVENTS ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Core Scope</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Signature <span className="text-emerald-700">Sporting Events</span></h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto text-[15px]">
              AlFursan Equestrian Village is purpose-built to host the world&apos;s most prestigious equestrian competitions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">AlUla Desert Polo</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                An exclusive equestrian sporting event drawing professional polo players, patrons, and royalty to the desert circuit.
              </p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">AlFursan Endurance AlUla</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                A premier two-day endurance event drawing hundreds of elite riders from around the globe to navigate the desert terrain.
              </p>
            </div>
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Heritage Sports</h3>
              <p className="text-neutral-600 text-[14px] leading-relaxed">
                Regular hosts for world-class traditional competitions, including the Tent Pegging World Championship and the Horseback Archery World Cup.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-10 border-t border-neutral-100">
            {[
              "Executive Polo Days",
              "Equestrian Sporting Hospitality",
              "Desert Retreats & Off-Sites",
              "Heritage Sport Sponsorship Activations",
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
        intro="A one-day event at AlFursan sits inside a much larger destination. Here is what your guests can build a multi-day itinerary around."
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
             <Image src="/venues/alfursan_p7_6.jpeg" alt="Background Texture" fill className="object-cover grayscale" />
          </div>
          <div className="relative z-10">
            <h2 className="font-semibold mb-6 text-3xl md:text-4xl tracking-tight" style={{ color: '#ffffff' }}>
              Engage with <span className="text-emerald-400">AlFursan</span>
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
