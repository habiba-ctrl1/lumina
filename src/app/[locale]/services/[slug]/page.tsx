import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { notFound } from "next/navigation";

// This is our PSEO Database / Matrix
const PSEO_DATA: Record<string, any> = {
  "corporate-events-riyadh": {
    city: "Riyadh",
    service: "Corporate Events",
    titleTag: "Corporate Event Management Company in Riyadh | Saudi Event Management",
    metaDescription: "Riyadh's premier corporate event management company. From executive summits at KAFD to large-scale galas, we deliver flawless business events.",
    h1: "Corporate Event Management Company in Riyadh",
    h2: "Elevating Business Events in the Capital",
    heroImage: "/gallery_corporate_gala.webp",
    schemaDescription: "Professional corporate event management in Riyadh. Includes conferences, galas, product launches, and VIP corporate gatherings.",
    bulletPoints: [
      "Executive conferences and board summits in Riyadh",
      "KAFD corporate events and brand launches",
      "Annual gala dinners and award ceremonies",
      "Government and semi-government functions",
      "VIP hospitality and diplomatic protocol"
    ],
    introduction: "Saudi Event Management is Riyadh's leading corporate event planner. Operating from the heart of the capital, we provide high-end production and logistics for the Kingdom's most important business gatherings.",
    details: "Whether hosting an international summit at The Ritz-Carlton Riyadh or an exclusive board retreat, our local expertise ensures absolute perfection and alignment with Vision 2030."
  },
  "luxury-weddings-jeddah": {
    city: "Jeddah",
    service: "Luxury Weddings",
    titleTag: "Luxury Wedding Planner in Jeddah | Saudi Event Management",
    metaDescription: "The most exclusive luxury wedding planner in Jeddah. We specialize in breathtaking seaside weddings, Red Sea resort ceremonies, and traditional royal events.",
    h1: "Luxury Wedding Planner in Jeddah",
    h2: "Breathtaking Red Sea Celebrations",
    heroImage: "/gallery_destination_wedding.webp",
    schemaDescription: "Bespoke luxury wedding planning in Jeddah. Specialists in beachfront weddings, royal ceremonies, and high-end VIP receptions.",
    bulletPoints: [
      "Red Sea beachfront wedding ceremonies",
      "Royal and traditional Nikah celebrations",
      "Exclusive venue sourcing (Park Hyatt, Waldorf Astoria)",
      "Custom floral design and luxury decor",
      "Complete bridal concierge and VIP guest management"
    ],
    introduction: "As the definitive luxury wedding planner in Jeddah, Saudi Event Management transforms seaside dreams into breathtaking realities. Our events are renowned for their elegance, privacy, and impeccable design.",
    details: "We leverage our exclusive partnerships with Jeddah's finest coastal venues and five-star hotels to deliver weddings that are as spectacular as the Red Sea horizon."
  },
  "event-production-alula": {
    city: "AlUla",
    service: "Event Production",
    titleTag: "Event Production & Design in AlUla | Saudi Event Management",
    metaDescription: "World-class event production and technical design in AlUla. We provide staging, AV, and logistical mastery for desert events and heritage sites.",
    h1: "Event Production Services in AlUla",
    h2: "Technical Mastery in the Desert",
    heroImage: "/gallery_charity_gala.webp",
    schemaDescription: "High-end event production, AV, lighting, and staging services for luxury events and festivals in AlUla, Saudi Arabia.",
    bulletPoints: [
      "Architectural lighting for heritage sites",
      "Custom stage design for desert landscapes",
      "State-of-the-art AV and sound engineering",
      "Power generation and remote logistics",
      "Eco-friendly and sustainable production practices"
    ],
    introduction: "Executing events in AlUla requires unprecedented logistical and technical expertise. Saudi Event Management provides complete event production services tailored for this unique, UNESCO-protected landscape.",
    details: "From immersive light shows illuminating ancient sandstone to complex stage builds for private concerts, our production team handles the extraordinary demands of desert environments."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = PSEO_DATA[resolvedParams.slug];
  if (!data) return {};

  const canonicalUrl = `https://saudieventmanagement.com/services/${resolvedParams.slug}`;

  return {
    title: data.titleTag,
    description: data.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PseoServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = PSEO_DATA[resolvedParams.slug];
  
  if (!data) {
    notFound();
  }

  const canonicalUrl = `https://saudieventmanagement.com/services/${resolvedParams.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.service} in ${data.city}`,
    description: data.schemaDescription,
    provider: {
      "@type": "Organization",
      name: "Saudi Event Management",
      url: "https://saudieventmanagement.com",
    },
    areaServed: {
      "@type": "City",
      name: data.city,
    },
    serviceType: data.service,
    url: canonicalUrl,
  };

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <WhatsAppButton />
      <Navbar darkHero={true} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-slate-200">
        <Image
          src={data.heroImage}
          alt={`${data.service} in ${data.city}`}
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/40 to-ink-950/90" />
        <div className="relative z-10 container-luxury text-center px-4">
          <span className="text-gold-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-8 block">
            {data.city} • {data.service}
          </span>
          <h1 className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl mb-8 uppercase tracking-tight max-w-4xl mx-auto leading-tight">
            {data.h1}
          </h1>
          <p className="text-sand-300 text-[14px] md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            <strong className="text-white">Saudi Event Management</strong> is the leading provider of <strong className="text-white">{data.service}</strong> in <strong className="text-white">{data.city}, Saudi Arabia</strong>. 
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="container-luxury max-w-4xl relative z-10 px-4">
          <h2 className="font-display font-bold text-ink-950 text-2xl md:text-3xl mb-8 uppercase tracking-tight">
            {data.h2}
          </h2>
          <div className="prose max-w-none text-slate-600 font-light text-base leading-relaxed space-y-6">
            <p>{data.introduction}</p>
            <p>{data.details}</p>
          </div>

          {/* What We Offer */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="font-display font-bold text-ink-950 text-xl md:text-2xl mb-8 uppercase tracking-tight">
              Our Signature Expertise in {data.city}:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 text-slate-600 font-light text-[15px]">
              {data.bulletPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold-500 mt-1 font-bold">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-slate-200 flex justify-center">
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-gold-400 text-ink-950 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-gold-500 transition-colors shadow-lg"
            >
              Consult Our {data.city} Experts
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
