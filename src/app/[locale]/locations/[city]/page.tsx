import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InternalPageHero from "@/components/InternalPageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building, Calendar, ArrowRight } from "lucide-react";

// City-specific hero images
const CITY_IMAGES: Record<string, string> = {
  neom:    "/neom_summit_people.webp",
  khobar:  "/alkhobar_corporate_people.webp",
  makkah:  "/majlis_gathering_people.webp",
  madinah: "/gallery_garden_party.webp",
  taif:    "/gallery_destination_wedding.webp",
  abha:    "/alula_gala_people.webp",
};
const DEFAULT_CITY_IMAGE = "/riyadh_summit_people.webp";

// City-specific hero videos (image used as poster while video loads)
const CITY_VIDEOS: Record<string, string> = {
  makkah: "/makkah.mp4",
};

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

  const cityKey   = params.city.toLowerCase();
  const heroImage = CITY_IMAGES[cityKey] ?? DEFAULT_CITY_IMAGE;
  const heroVideo = CITY_VIDEOS[cityKey];

  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title={`Event Management in ${cityData.name}`}
        subtitle={cityData.description}
        backgroundImage={heroImage}
        backgroundVideo={heroVideo}
        imageAlt={`Event management in ${cityData.name}, ${cityData.region}, Saudi Arabia`}
        badge={cityData.region}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: cityData.name },
        ]}
        minHeight="large"
      />

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

      {/* Local Entity Extraction Block (LLM Answer Engine Optimization) */}
      <section className="py-24 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Entity Architecture: Saudi Event Management in {cityData.name}</h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p><strong>Geographic Domain:</strong> {cityData.name}, {cityData.region}, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> As a leading luxury event management agency, our local operations in {cityData.name} encompass end-to-end production, including {cityData.specialty.toLowerCase()}, corporate summits, and high-net-worth VIP weddings.</p>
              <p><strong>Local Infrastructure:</strong> Our strong relationships with premium venues, local artisan vendors, and government authorities in {cityData.name} allow us to secure necessary GEA permits and execute flawless logistics aligned with Saudi Vision 2030 standards.</p>
            </div>
            
            {/* Semantic Cross-Linking for Service Matrix */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Available Services in {cityData.name}:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Corporate Events", slug: "corporate-event-management" },
                  { name: "Luxury Weddings", slug: "luxury-wedding-planning" },
                  { name: "Exhibitions", slug: "exhibition-management" },
                  { name: "Conferences", slug: "conference-planning" },
                  { name: "VIP Events", slug: "vip-event-planning" }
                ].map((svc) => (
                  <Link 
                    key={svc.slug} 
                    href={`/locations/${params.city.toLowerCase()}/${svc.slug}`}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
