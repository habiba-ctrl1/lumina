import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin, Users, Maximize2, Music, Armchair,
  Tent, TreePine, Shield, ArrowRight, CheckCircle2,
  Building2, Landmark, Footprints, Home, Palette, ChevronRight
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
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/venues/almughayra_p2_1.jpeg"
            alt="AlMughayra Heritage Sport Village — AlUla"
            fill
            className="object-cover opacity-40 animate-in fade-in duration-[2000ms]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-neutral-900/40" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center animate-in slide-in-from-bottom-8 fade-in duration-1000">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[12px] md:text-[13px] font-medium text-neutral-400 mb-8 tracking-wide">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-neutral-600" />
            <Link href="/venues" className="hover:text-emerald-400 transition-colors">Venues</Link>
            <ChevronRight size={14} className="text-neutral-600" />
            <span className="text-amber-300">AlMughayra Heritage Sport Village</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            AlMughayra <span className="text-emerald-400">Heritage Sport Village</span>
          </h1>
          <p className="text-neutral-300 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            A world-class destination asset blending heritage and modernity — the ultimate hub for traditional sports, cultural showcases, and community engagement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
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

      {/* ── HIGHLIGHTS ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-neutral-50 border-b border-neutral-100">
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
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Premium Destination <span className="text-emerald-700">Spaces</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Royal Venue", cap: "800 guests", area: "4,500 sqm", icon: Landmark, desc: "An inviting space ideal for gatherings and ceremonies. Features high-quality furniture adorned with traditional decorations. Accommodates stage construction." },
              { name: "Heritage Village", cap: "[Pending Final Confirmation]", area: "17,500 sqm", icon: Palette, desc: "An immersive experience celebrating AlUla's cultural richness. Features traditional architecture, food outlets, and spaces for local artists." },
              { name: "8 km Competition Racetrack", cap: "Intl. Events", area: "8 km", icon: Footprints, desc: "A premier main track designed specifically for local and international camel racing competitions." },
              { name: "6 km Training Racetrack", cap: "Year-Round", area: "6 km", icon: Footprints, desc: "Available year-round for camel training and local events. Supports the development of heritage sports traditions." },
              { name: "Camel Shelters (Ezabs)", cap: "250 Shelters", area: "[Pending Final Confirmation]", icon: Home, desc: "Dedicated resting spaces for camels during events, providing essential infrastructure for the racing community." },
              { name: "Parking & Access", cap: "Ample Capacity", area: "[Pending Final Confirmation]", icon: Building2, desc: "Both the Royal Venue and Heritage Village offer ample parking and dedicated entrances ensuring seamless visitor access." },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <f.icon size={24} className="text-neutral-400" />
                  <div className="text-right flex flex-col gap-1 items-end">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      {f.cap}
                    </span>
                  </div>
                </div>
                <h4 className="text-[18px] font-medium text-neutral-900 mb-1">{f.name}</h4>
                {f.area && <span className="text-[13px] text-emerald-600 font-medium block mb-3">{f.area}</span>}
                <p className="text-neutral-500 text-[14px] leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-400 opacity-80 mb-4">Event Applications</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#ffffff' }}>
              Ideal <span className="text-amber-300">For</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Destination Weddings",
              "Gala Dinners & Awards",
              "Executive Summits",
              "Board Retreats",
              "Annual General Meetings (AGMs)",
              "Product Launches",
              "Hybrid Conferences",
              "Town Halls & All-Hands",
              "Vision 2030 Activations",
              "Corporate Retreats & Executive Off-sites",
            ].map((exp, i) => (
              <div key={i} className="flex items-center gap-4 bg-neutral-800/50 border border-neutral-700/50 rounded-xl px-6 py-4">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-neutral-200 text-[15px] font-light">{exp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Visual Documentation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Destination <span className="text-emerald-700">Gallery</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
            ].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-neutral-100">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill 
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 inset-x-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="text-white text-[14px] font-medium tracking-wide">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
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
