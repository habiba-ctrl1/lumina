import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, CheckCircle2, Building2 } from "lucide-react";

// Programmatic city + service matrix
const cities: Record<string, { name: string; region: string }> = {
  riyadh: { name: "Riyadh", region: "Riyadh Province" },
  jeddah: { name: "Jeddah", region: "Makkah Province" },
  dammam: { name: "Dammam", region: "Eastern Province" },
  alula: { name: "AlUla", region: "Al Madinah Province" },
  neom: { name: "NEOM", region: "Tabuk Province" },
  khobar: { name: "Al Khobar", region: "Eastern Province" },
  makkah: { name: "Makkah", region: "Makkah Province" },
  madinah: { name: "Madinah", region: "Al Madinah Province" },
  taif: { name: "Taif", region: "Makkah Province" },
  abha: { name: "Abha", region: "Aseer Province" },
};

const services: Record<string, { name: string; description: string; features: string[] }> = {
  "corporate-event-management": {
    name: "Corporate Event Management",
    description: "End-to-end corporate event planning, including executive summits, AGMs, board retreats, and brand activations.",
    features: ["Executive Summits & AGMs", "Team Building Events", "Corporate Galas", "Product Launches", "Conference Management"]
  },
  "luxury-wedding-planning": {
    name: "Luxury Wedding Planning",
    description: "Bespoke luxury wedding production from intimate ceremonies to grand royal celebrations with full vendor coordination.",
    features: ["Royal Wedding Production", "Kosha & Stage Design", "Zaffah Coordination", "Floral Architecture", "VIP Guest Management"]
  },
  "exhibition-management": {
    name: "Exhibition Management",
    description: "Full-scale exhibition booth design, stand building, and trade show management for international and local brands.",
    features: ["Booth Design & Build", "B2B Matchmaking", "Lead Capture Technology", "Venue Logistics", "International Expo Planning"]
  },
  "conference-planning": {
    name: "Conference Planning",
    description: "Professional conference organization with AV production, speaker management, and delegate coordination.",
    features: ["Speaker Management", "AV Production", "Delegate Registration", "Hybrid Event Technology", "Protocol Services"]
  },
  "vip-event-planning": {
    name: "VIP Event Planning",
    description: "Ultra-luxury VIP experiences including private concerts, yacht events, and exclusive brand launches with complete confidentiality.",
    features: ["Private Concerts", "Yacht & Desert Events", "Close Protection Security", "HNWI Concierge", "NDA-Protected Planning"]
  },
};

interface PageProps {
  params: Promise<{ locale: string; city: string; service: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { city, service } = await params;
  const cityData = cities[city];
  const serviceData = services[service];
  if (!cityData || !serviceData) return {};

  return {
    title: `${serviceData.name} in ${cityData.name} | Saudi Event Management`,
    description: `Saudi Event Management provides premium ${serviceData.name.toLowerCase()} in ${cityData.name}, ${cityData.region}. ${serviceData.description}`,
    keywords: `${serviceData.name} ${cityData.name}, event management ${cityData.name}, ${serviceData.name} Saudi Arabia, Saudi Event Management ${cityData.name}`,
    alternates: { canonical: `https://saudieventmanagement.com/locations/${city}/${service}` },
  };
}

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const city of Object.keys(cities)) {
    for (const service of Object.keys(services)) {
      params.push({ city, service });
    }
  }
  return params;
}

export default async function CityServicePage({ params }: PageProps) {
  const { city, service } = await params;
  const cityData = cities[city];
  const serviceData = services[service];

  if (!cityData || !serviceData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": `${serviceData.name} in ${cityData.name}`,
        "description": serviceData.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": `Saudi Event Management ${cityData.name}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": cityData.name,
            "addressRegion": cityData.region,
            "addressCountry": "SA"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": cityData.name
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
          { "@type": "ListItem", "position": 3, "name": cityData.name, "item": `https://saudieventmanagement.com/locations/${city}` },
          { "@type": "ListItem", "position": 4, "name": serviceData.name, "item": `https://saudieventmanagement.com/locations/${city}/${service}` }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar darkHero={false} />

      {/* Hero */}
      <section className="bg-ink-950 py-28 md:py-36 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-ink-950/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full mb-8">
            <MapPin size={16} className="text-gold-400" />
            <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">{cityData.region}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tight">
            {serviceData.name} <br/> in <span className="text-gold-400">{cityData.name}</span>
          </h1>
          <p className="text-sand-300 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed mb-10">
            <strong className="text-white">Saudi Event Management</strong> delivers premium {serviceData.name.toLowerCase()} in {cityData.name}, {cityData.region}. {serviceData.description}
          </p>
          <Link href="/#contact" className="inline-flex px-8 py-4 bg-gold-500 text-ink-950 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm">
            Plan Your {cityData.name} Event
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ink-950 mb-4 uppercase tracking-tight">
            What We <span className="text-gold-600">Deliver</span>
          </h2>
          <div className="w-12 h-1 bg-gold-400 mx-auto mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Our {cityData.name}-based team brings local expertise and global standards to every {serviceData.name.toLowerCase()} project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-200 rounded-sm hover:border-gold-400/50 transition-all">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-ink-950 text-sm mb-1">{feature}</h3>
                <p className="text-slate-500 text-xs">Professional {feature.toLowerCase()} services tailored for {cityData.name}.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEO Definition Block */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <Building2 className="text-gold-500 shrink-0 mt-1" size={28} />
            <div>
              <h2 className="text-xl font-display font-bold text-ink-950 mb-4 uppercase tracking-tight">
                Why Choose Saudi Event Management for {serviceData.name} in {cityData.name}?
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4">
                <p>
                  Saudi Event Management is the trusted partner for {serviceData.name.toLowerCase()} in {cityData.name}, {cityData.region}. Our dedicated regional team combines deep local knowledge with world-class production standards to deliver events that exceed expectations.
                </p>
                <p>
                  As Saudi Arabia evolves under Vision 2030, {cityData.name} is becoming a premier destination for elite gatherings. We leverage our extensive network of local venues, premium vendors, and government relationships to ensure seamless execution for every client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Linking CTA */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl font-display font-bold text-ink-950 mb-8 uppercase tracking-tight">
          Explore More <span className="text-gold-600">Services</span> in {cityData.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(services)
            .filter(([key]) => key !== service)
            .slice(0, 3)
            .map(([key, svc]) => (
              <Link
                key={key}
                href={`/locations/${city}/${key}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-sm text-sm font-semibold text-ink-950 hover:border-gold-400 hover:text-gold-600 transition-all"
              >
                {svc.name} <ArrowRight size={14} />
              </Link>
            ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
