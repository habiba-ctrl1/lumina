import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building, Calendar, ArrowRight } from "lucide-react";

// Tier 2 Programmatic Cities Data
const pseoCities: Record<string, { name: string, region: string, description: string, specialty: string }> = {
  neom: {
    name: "NEOM",
    region: "Tabuk Province",
    description: "The future of luxury events. We provide hyper-futuristic, sustainable event management solutions for corporate summits and elite gatherings in NEOM.",
    specialty: "Sustainable & Tech-Forward Events",
  },
  khobar: {
    name: "Al Khobar",
    region: "Eastern Province",
    description: "Bespoke event planning in Al Khobar, specializing in luxury waterfront weddings and high-profile corporate galas on the Arabian Gulf.",
    specialty: "Coastal Weddings & Corporate Galas",
  },
  makkah: {
    name: "Makkah",
    region: "Makkah Province",
    description: "Respectful, culturally-aligned, and meticulously planned hospitality and logistical events in the holy city of Makkah.",
    specialty: "VIP Hospitality & Protocol Events",
  },
  madinah: {
    name: "Madinah",
    region: "Al Madinah Province",
    description: "Expert event management in Madinah, focusing on seamless execution for exhibitions, corporate hospitality, and private family events.",
    specialty: "Cultural Exhibitions & Family Events",
  },
  taif: {
    name: "Taif",
    region: "Makkah Province",
    description: "High-altitude luxury. We design spectacular summer weddings and corporate retreats amidst the mountain roses of Taif.",
    specialty: "Mountain Retreats & Summer Weddings",
  },
  abha: {
    name: "Abha",
    region: "Aseer Province",
    description: "Experience the cool breezes of Aseer. Premier event management for destination weddings and cultural festivals in Abha.",
    specialty: "Cultural Festivals & Destination Weddings",
  }
};

export async function generateMetadata({ params }: { params: { city: string } }) {
  const cityData = pseoCities[params.city.toLowerCase()];
  if (!cityData) return {};

  return {
    title: `Luxury Event Management in ${cityData.name} | Saudi Event Management`,
    description: cityData.description,
    keywords: `event management ${cityData.name}, luxury events ${cityData.name}, corporate events ${cityData.name}, wedding planner ${cityData.name}, Saudi Event Management`,
    alternates: { canonical: `https://saudieventmanagement.com/locations/${params.city.toLowerCase()}` },
  };
}

export default function DynamicLocationPage({ params }: { params: { city: string } }) {
  const cityData = pseoCities[params.city.toLowerCase()];
  
  if (!cityData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventOrganizer",
    "name": `Saudi Event Management ${cityData.name}`,
    "description": cityData.description,
    "areaServed": {
      "@type": "City",
      "name": cityData.name,
      "containedInPlace": {
        "@type": "State",
        "name": cityData.region
      }
    },
    "url": `https://saudieventmanagement.com/locations/${params.city.toLowerCase()}`
  };

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar darkHero={false} />

      {/* Hero Section */}
      <section className="bg-ink-950 py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-30 bg-cover bg-center" />
        <div className="absolute inset-0 bg-ink-950/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full mb-8">
            <MapPin size={16} className="text-gold-400" />
            <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">{cityData.region}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight">
            Event Management in <span className="text-gold-400">{cityData.name}</span>
          </h1>
          <p className="text-sand-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10">
            {cityData.description}
          </p>
          <Link href="/contact" className="inline-flex px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm">
            Plan Your Event in {cityData.name}
          </Link>
        </div>
      </section>

      {/* Specialty Section */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-ink-950 mb-6 uppercase tracking-tight">
              Our Expertise in <span className="text-gold-600">{cityData.name}</span>
            </h2>
            <div className="w-12 h-1 bg-gold-400 mb-8" />
            <p className="text-slate-600 mb-6 leading-relaxed">
              As Saudi Arabia expands its economic and tourism footprint under Vision 2030, {cityData.name} is rapidly emerging as a critical hub for high-profile gatherings. We bring our world-class event production standards directly to the {cityData.region}.
            </p>
            <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex items-start gap-4">
              <Building className="text-gold-500 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-ink-950 mb-2 uppercase tracking-wide text-sm">Regional Specialty</h3>
                <p className="text-slate-600 text-sm">{cityData.specialty}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-200 aspect-square rounded-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-ink-950/10 flex items-center justify-center">
              <Calendar className="text-white/50 w-32 h-32" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
