import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, CheckCircle2, Building2, ChevronRight } from "lucide-react";
import { getCityServiceImage } from "@/lib/image-utils";

// ─── City Matrix ──────────────────────────────────────────────────────────────
const cities: Record<
  string,
  { name: string; nameAr: string; region: string }
> = {
  riyadh:  { name: "Riyadh",    nameAr: "الرياض",           region: "Riyadh Province"      },
  jeddah:  { name: "Jeddah",    nameAr: "جدة",               region: "Makkah Province"      },
  dammam:  { name: "Dammam",    nameAr: "الدمام",            region: "Eastern Province"     },
  alula:   { name: "AlUla",     nameAr: "العُلا",            region: "Al Madinah Province"  },
  neom:    { name: "NEOM",      nameAr: "نيوم",              region: "Tabuk Province"       },
  khobar:  { name: "Al Khobar", nameAr: "الخبر",             region: "Eastern Province"     },
  makkah:  { name: "Makkah",    nameAr: "مكة المكرمة",       region: "Makkah Province"      },
  madinah: { name: "Madinah",   nameAr: "المدينة المنورة",   region: "Al Madinah Province"  },
  taif:    { name: "Taif",      nameAr: "الطائف",            region: "Makkah Province"      },
  abha:    { name: "Abha",      nameAr: "أبها",              region: "Aseer Province"       },
  diriyah: { name: "Diriyah",   nameAr: "الدرعية",           region: "Riyadh Province"      },
  tabuk:   { name: "Tabuk",     nameAr: "تبوك",              region: "Tabuk Province"       },
};

// ─── Service Matrix ───────────────────────────────────────────────────────────
const services: Record<
  string,
  {
    name: string;
    parentSlug: string;
    description: string;
    features: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  "corporate-event-management": {
    name: "Corporate Event Management",
    parentSlug: "corporate-events",
    description:
      "End-to-end corporate event planning, including executive summits, AGMs, board retreats, and brand activations.",
    features: [
      "Executive Summits & AGMs",
      "Team Building Events",
      "Corporate Galas & Award Dinners",
      "Product Launches & Brand Activations",
      "Conference Management & PCO Services",
      "VIP Delegate Protocol & Hospitality",
    ],
    faqs: [
      {
        q: "What corporate event management services do you offer?",
        a: "Saudi Event Management provides full-service corporate event management including AGMs, executive summits, gala dinners, product launches, team building, and award ceremonies — all with complete logistics, AV production, and VIP protocol management.",
      },
      {
        q: "How far in advance should I book corporate event management?",
        a: "For large-scale corporate events and galas, we recommend booking 3–6 months in advance. For government-aligned events or those requiring GEA entertainment permits, allow 6–9 months for full compliance planning.",
      },
      {
        q: "Do you have a corporate event organizer in my city?",
        a: "Saudi Event Management operates across all major Saudi cities with dedicated regional teams in Riyadh, Jeddah, Dammam, and AlUla — providing immediate, on-the-ground support for any corporate event requirement.",
      },
    ],
  },
  "luxury-wedding-planning": {
    name: "Luxury Wedding Planning",
    parentSlug: "weddings",
    description:
      "Bespoke luxury wedding production from intimate ceremonies to grand royal celebrations with full vendor coordination.",
    features: [
      "Royal Wedding Production & Kosha Design",
      "Nikah Ceremony Coordination",
      "Zaffa Entertainment & Choreography",
      "Bespoke Floral Architecture",
      "Luxury Catering & Menu Curation",
      "Full Bridal Concierge & VIP Guest Management",
    ],
    faqs: [
      {
        q: "What luxury wedding planning services do you provide?",
        a: "Saudi Event Management delivers complete luxury wedding planning — from initial concept and venue sourcing to on-day management. Services include Kosha design, Nikah ceremony coordination, Zaffa entertainment, floral architecture, catering, and full VIP guest management.",
      },
      {
        q: "How much does a luxury wedding cost in Saudi Arabia?",
        a: "Luxury weddings in Saudi Arabia typically range from SAR 150,000 to SAR 2,000,000+ depending on guest count, venue, and production level. Our senior consultants provide bespoke proposals tailored to your exact vision and requirements.",
      },
      {
        q: "Can I meet a wedding planner in person before booking?",
        a: "Yes. Saudi Event Management has dedicated bridal consultants in Riyadh, Jeddah, and Dammam available for in-person consultations, venue tours, and bespoke wedding planning from concept through to your perfect day.",
      },
    ],
  },
  "exhibition-management": {
    name: "Exhibition Management",
    parentSlug: "exhibitions",
    description:
      "Full-scale exhibition booth design, stand building, and trade show management for international and local brands.",
    features: [
      "Custom Booth Design & Stand Fabrication",
      "B2B Matchmaking & Lead Capture",
      "International Exhibitor Services",
      "Trade Show Logistics & Freight",
      "Interactive Display Technology",
      "Post-Show Analytics & Reporting",
    ],
    faqs: [
      {
        q: "What exhibition management services do you offer?",
        a: "Saudi Event Management provides complete exhibition management — booth concept design, custom stand fabrication, exhibitor logistics, B2B matchmaking facilitation, interactive display technology, and full post-show reporting.",
      },
      {
        q: "Can you build custom exhibition stands in Saudi Arabia?",
        a: "Yes. Our in-house design and fabrication team builds fully custom exhibition stands for trade shows across Saudi Arabia, including at RICEC Riyadh, RECC, and the Jeddah Center for Forums and Events.",
      },
      {
        q: "Do you have exhibition specialists in my city?",
        a: "Saudi Event Management has exhibition specialists across Riyadh, Jeddah, and Dammam providing rapid-response booth design, stand building, and full trade show management for any exhibition venue in Saudi Arabia.",
      },
    ],
  },
  "conference-planning": {
    name: "Conference Planning",
    parentSlug: "conferences",
    description:
      "Professional conference organization with AV production, speaker management, and delegate coordination.",
    features: [
      "Speaker Management & Keynote Logistics",
      "AV Production & Hybrid Streaming",
      "Delegate Registration Systems",
      "Simultaneous Arabic-English Interpretation",
      "VIP Protocol & Dignitary Management",
      "Post-Conference Media Distribution",
    ],
    faqs: [
      {
        q: "What conference planning services do you provide?",
        a: "Saudi Event Management delivers full PCO (Professional Conference Organizer) services — speaker management, delegate registration, AV production, hybrid streaming, simultaneous translation, VIP protocol, and complete on-day management.",
      },
      {
        q: "Do you offer hybrid conference management?",
        a: "Yes. Our technical production team provides complete hybrid conference solutions including professional broadcast-quality streaming, interactive audience engagement platforms, and multilingual interpretation for remote delegates.",
      },
      {
        q: "Do you provide a local conference organizer in Saudi cities?",
        a: "Saudi Event Management is a leading professional conference organizer in Saudi Arabia with dedicated teams in Riyadh, Jeddah, and Dammam providing full-service PCO management for any conference scale.",
      },
    ],
  },
  "vip-event-planning": {
    name: "VIP Event Planning",
    parentSlug: "luxury-vip-events",
    description:
      "Ultra-luxury VIP experiences including private concerts, yacht events, and exclusive brand launches with complete confidentiality.",
    features: [
      "Private Concert & Performance Management",
      "Yacht & Desert VIP Events",
      "Close Protection & Security Coordination",
      "HNWI & Royal Family Concierge",
      "NDA-Protected Planning Process",
      "24/7 Dedicated Event Director",
    ],
    faqs: [
      {
        q: "What VIP event planning services do you offer?",
        a: "Saudi Event Management's VIP division provides ultra-discreet luxury event planning for royal families, HNWIs, and diplomatic guests — including private concerts, yacht events, exclusive dinners, and bespoke cultural experiences planned under strict NDA.",
      },
      {
        q: "Do you provide security for VIP events?",
        a: "Yes. We coordinate close-protection security with licensed Saudi security firms for all high-profile VIP events, managing secure perimeters, guest screening, and emergency protocols in collaboration with relevant authorities.",
      },
      {
        q: "How do I arrange a private VIP event consultation?",
        a: "Saudi Event Management's VIP division operates with complete discretion across Riyadh, Jeddah, AlUla, and NEOM — providing private consultation and bespoke planning for the Kingdom's most exclusive events.",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ locale: string; city: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; city: string; service: string }[] = [];
  const locales = ["en", "ar"];
  for (const locale of locales) {
    for (const city of Object.keys(cities)) {
      for (const service of Object.keys(services)) {
        params.push({ locale, city, service });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, city, service } = await params;
  const cityData = cities[city];
  const serviceData = services[service];
  if (!cityData || !serviceData) return {};

  const canonicalUrl = `https://saudieventmanagement.com${locale === "en" ? "" : "/ar"}/locations/${city}/${service}`;
  return {
    title: `${serviceData.name} in ${cityData.name} | Saudi Event Management`,
    description: `Saudi Event Management delivers premium ${serviceData.name.toLowerCase()} in ${cityData.name}, ${cityData.region}. ${serviceData.description}`,
    keywords: [
      `${serviceData.name} ${cityData.name}`,
      `event management ${cityData.name}`,
      `${serviceData.name} Saudi Arabia`,
      `${cityData.nameAr}`,
      "Saudi Event Management",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "ar-SA": `https://saudieventmanagement.com/ar/locations/${city}/${service}`,
      },
    },
    openGraph: {
      title: `${serviceData.name} in ${cityData.name} | Saudi Event Management`,
      description: `Premium ${serviceData.name.toLowerCase()} in ${cityData.name}. ${serviceData.description}`,
      url: canonicalUrl,
      images: [{ url: getCityServiceImage(city, service), width: 1200, height: 630, alt: `${serviceData.name} ${cityData.name} Saudi Arabia` }],
    },
  };
}

export default async function CityServicePage({ params }: PageProps) {
  const { city, service } = await params;
  const cityData = cities[city];
  const serviceData = services[service];

  if (!cityData || !serviceData) notFound();

  const canonicalUrl = `https://saudieventmanagement.com/locations/${city}/${service}`;

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
            "addressCountry": "SA",
          },
          "telephone": "+966501234567",
        },
        "areaServed": { "@type": "City", "name": cityData.name },
        "url": canonicalUrl,
      },
      {
        "@type": "FAQPage",
        "mainEntity": serviceData.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",      "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
          { "@type": "ListItem", "position": 3, "name": cityData.name, "item": `https://saudieventmanagement.com/locations/${city}` },
          { "@type": "ListItem", "position": 4, "name": serviceData.name, "item": canonicalUrl },
        ],
      },
    ],
  };

  const relatedServices = Object.entries(services)
    .filter(([key]) => key !== service)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar darkHero={true} />

      {/* Hero */}
      <section className="bg-ink-950 py-20 md:py-28 md:py-36 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${getCityServiceImage(city, service)}')` }}
        />
        <div className="absolute inset-0 bg-ink-950/70" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full mb-8">
            <MapPin size={14} className="text-gold-400" />
            <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">
              {cityData.nameAr} • {cityData.region}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {serviceData.name} <br /> in{" "}
            <span className="text-gold-400">{cityData.name}</span>
          </h1>
          <p className="text-sand-300 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed mb-10">
            <strong className="text-white">Saudi Event Management</strong> delivers premium{" "}
            {serviceData.name.toLowerCase()} in {cityData.name}, {cityData.region}.{" "}
            {serviceData.description}
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-gold-500 text-neutral-900 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm"
          >
            Plan Your {cityData.name} Event
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-[var(--surface-raised)] border-b border-neutral-200/80 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/locations" className="hover:text-neutral-900 transition-colors">Locations</Link>
          <ChevronRight size={10} />
          <Link href={`/locations/${city}`} className="hover:text-neutral-900 transition-colors">{cityData.name}</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-900 font-medium">{serviceData.name}</span>
        </div>
      </nav>

      {/* Features */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-4">
            What We Deliver in <span className="text-[var(--primary)]">{cityData.name}</span>
          </h2>
          <div className="w-10 h-1 bg-gold-400 mx-auto mb-5" />
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Our {cityData.name}-based team brings local expertise and global production standards to every{" "}
            {serviceData.name.toLowerCase()} project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceData.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 bg-[var(--surface-raised)] border border-neutral-200/80 rounded-2xl hover:border-[var(--primary)]/30 transition-all"
            >
              <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1">{feature}</h3>
                <p className="text-neutral-500 text-xs">
                  Professional {feature.toLowerCase()} tailored for {cityData.name}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEO Definition Block */}
      <section className="py-20 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-5">
            <Building2 className="text-gold-500 shrink-0 mt-1" size={26} />
            <div>
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 uppercase tracking-tight">
                Why Choose Us for {serviceData.name} in {cityData.name}?
              </h2>
              <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  Saudi Event Management is the trusted partner for {serviceData.name.toLowerCase()} in{" "}
                  {cityData.name}, {cityData.region}. Our dedicated regional team combines deep local knowledge with world-class production standards.
                </p>
                <p>
                  As Saudi Arabia evolves under Vision 2030, {cityData.name} is emerging as a premier destination for elite gatherings. We leverage our extensive network of local venues, premium vendors, and government relationships to ensure seamless execution for every client.
                </p>
                <p>
                  Explore all{" "}
                  <Link href={`/locations/${city}`} className="text-[var(--primary)] underline underline-offset-4 font-medium">
                    event management services in {cityData.name}
                  </Link>
                  , or{" "}
                  <Link href="/contact" className="text-[var(--primary)] underline underline-offset-4 font-medium">contact our team</Link>{" "}
                  and{" "}
                  <Link href="/consultation" className="text-[var(--primary)] underline underline-offset-4 font-medium">book a free consultation</Link>{" "}
                  to start planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white border-t border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-10 uppercase tracking-wide">
            {serviceData.name} in {cityData.name} — FAQ
          </h2>
          <div className="space-y-5">
            {serviceData.faqs.map((faq, i) => (
              <div key={i} className="bg-[var(--surface-raised)] border border-neutral-200/80 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-3 text-sm">{faq.q}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-neutral-900 mb-8 uppercase tracking-widest">
            More Services in {cityData.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedServices.map(([key, svc]) => (
              <Link
                key={key}
                href={`/locations/${city}/${key}`}
                className="group bg-white border border-neutral-200/80 rounded-xl p-6 hover:border-[var(--primary)]/40 hover:shadow-md transition-all"
              >
                <h4 className="text-neutral-900 font-bold text-sm mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {svc.name}
                </h4>
                <p className="text-neutral-500 text-xs mb-4 leading-relaxed">{svc.description}</p>
                <span className="text-[var(--primary)] text-xs font-bold flex items-center gap-1">
                  Explore <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-200/80 flex items-center gap-4">
            <Link
              href={`/locations/${city}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> All {cityData.name} services
            </Link>
            <Link
              href={`/services/${serviceData.parentSlug}`}
              className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
            >
              {serviceData.name} overview <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
