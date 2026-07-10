import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin, Users, Music, Armchair,
  Tent, TreePine, Shield, ArrowRight, CheckCircle2,
  Building2, Fence, MountainSnow, ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "AlFursan Equestrian Village — Venue Portfolio | SEM",
  description:
    "Explore AlFursan Equestrian Village, a premier heritage destination and equestrian hub in AlUla.",
  alternates: {
    canonical: "https://draft.sem.sa/venues/alfursan-equestrian-village",
  },
  openGraph: {
    title: "AlFursan Equestrian Village — Venue Portfolio",
    description: "Discover AlFursan Equestrian Village in AlUla — a world-class destination honouring cultural heritage and equestrian excellence.",
    url: "https://draft.sem.sa/venues/alfursan-equestrian-village",
    siteName: "Saudi Event Management",
    images: [
      {
        url: "https://draft.sem.sa/venues/alfursan_p2_1.jpeg",
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
    images: ["https://draft.sem.sa/venues/alfursan_p2_1.jpeg"],
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
      "image": "https://draft.sem.sa/venues/alfursan_p2_1.jpeg",
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
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/venues/alfursan_p2_1.jpeg"
            alt="AlFursan Equestrian Village — AlUla"
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
            <span className="text-amber-300">AlFursan Equestrian Village</span>
          </nav>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            AlFursan <span className="text-emerald-400">Equestrian Village</span>
          </h1>
          <p className="text-neutral-300 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            A world-class destination asset honouring AlUla&apos;s cultural heritage — blending premier equestrian tradition with exceptional landscape infrastructure.
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
      <section className="py-24 md:py-32 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-700 opacity-80 mb-4">Infrastructure</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Premium Destination <span className="text-emerald-700">Spaces</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Endurance Terrace", cap: "1,000 guests", icon: Tent, desc: "An inviting space with natural wooden flooring. Shaded and suitable for air conditioning. Space available for stage construction." },
              { name: "Polo Grandstand", cap: "1,000 guests", icon: MountainSnow, desc: "Seating area offering captivating views. Suitable for concerts and show events. The polo field accommodates stage performances." },
              { name: "Shuwayma Lounge", cap: "70 guests", icon: Armchair, desc: "High-quality furniture adorned with traditional decorative lights and carpets. Equipped with a large screen." },
              { name: "Dahma Lounge", cap: "100 guests", icon: Armchair, desc: "Comfortable seating with traditional decor showcasing AlUla's colour themes. Includes large screen." },
              { name: "Saqlawiya Lounge", cap: "100 guests", icon: Armchair, desc: "Traditional heritage lights and carpets. Flexible furniture arrangements for bespoke corporate setups." },
              { name: "Kahilah Lounge", cap: "100 guests", icon: Armchair, desc: "Features two large screens for presentations. Adorned with heritage carpets and inspired decor." },
              { name: "Obaya Lounge", cap: "120 guests", icon: Armchair, desc: "The largest VIP lounge, featuring two large screens, premium furniture, and traditional elements." },
              { name: "Indoor Gathering Area", cap: "[Pending Final Confirmation]", icon: Building2, desc: "Flexible space for intimate celebrations. Can operate independently or combine with main lounges for larger functions." },
              { name: "Polo Field", cap: "[Pending Final Confirmation]", icon: Fence, desc: "Professional polo field adaptable for stage performances, utilizing strict protections to preserve the sports flooring." },
              { name: "Horse Tracks & Stables", cap: "[Pending Final Confirmation]", icon: TreePine, desc: "Operational equestrian infrastructure supporting training and events, forming the core of this equestrian hub." },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-lg transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <f.icon size={24} className="text-neutral-400" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                    {f.cap}
                  </span>
                </div>
                <h4 className="text-[18px] font-medium text-neutral-900 mb-3">{f.name}</h4>
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
            <span className="block text-[12px] font-bold tracking-widest uppercase text-emerald-400 opacity-80 mb-4">Event Types</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: '#ffffff' }}>
              What You Can <span className="text-amber-300">Host</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Concerts & live performances",
              "Corporate gatherings & ceremonies",
              "Community engagement events",
              "Equestrian activities & shows",
              "Training sessions & presentations",
              "Intimate celebrations & parties",
              "Cultural heritage experiences",
              "Show events with panoramic AlUla views",
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
              { src: "/venues/alfursan_p2_1.jpeg", alt: "AlFursan Village — Desert Landscape Architecture" },
              { src: "/venues/alfursan_event_1.png", alt: "Desert Polo Match at Sunset" },
              { src: "/venues/alfursan_p4_3.jpeg", alt: "Endurance Terrace Setup" },
              { src: "/venues/alfursan_event_2.png", alt: "Evening Hospitality Event" },
              { src: "/venues/alfursan_p7_6.jpeg", alt: "Polo Grandstand Infrastructure" },
              { src: "/venues/alfursan_event_3.png", alt: "Spectators at the Equestrian Grandstand" },
              { src: "/venues/alfursan_p10_9.jpeg", alt: "Premium Lounge Presentation Setup" },
              { src: "/venues/alfursan_p13_12.jpeg", alt: "Heritage Lounge Interior Details" },
              { src: "/venues/alfursan_p15_14.jpeg", alt: "Indoor Gathering Area Architecture" },
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
