import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { cookies } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";

const SERVICE = {
  slug: "event-production-saudi-arabia",
  titleTag: "Event Production Company in Saudi Arabia | Saudi Event Management",
  metaDescription:
    "Top event production company in Saudi Arabia. We provide sound system rentals, custom stage design, lighting production, and AV installation.",
  h1: "Event Production Company in Saudi Arabia",
  h2: "High-End Stage, Lighting & Sound Production",
  canonicalUrl: "https://saudieventmanagement.com/services/event-production-saudi-arabia",
  heroImage: "/gallery_vip_party.webp",
  heroImageAlt:
    "Event production stage lighting and AV system setup Saudi Arabia",
  schemaServiceName: "Event Production in Saudi Arabia",
  schemaDescription:
    "Bespoke event production services including custom stage fabrication, high-performance sound setups, and grand venue mapping.",
  bulletPoints: [
    "Custom stage fabrication and design",
    "High-performance sound and acoustics",
    "Intellectual lighting design and lasers",
    "LED screens and projection mapping KSA",
    "Structural engineering and safety audits",
    "On-site AV team and technician support"
  ],
  introduction: "We are a technical powerhouse, recognized as a leading event production company in Saudi Arabia for premium experiential setups.",
  details: "Our technicians use state-of-the-art acoustics, high-resolution LED layouts, projection mapping, and intelligent lighting designs to transform venues."
};

export const metadata: Metadata = {
  title: SERVICE.titleTag,
  description: SERVICE.metaDescription,
  alternates: {
    canonical: SERVICE.canonicalUrl,
    languages: {
      "en-US": SERVICE.canonicalUrl,
      "ar-SA": `https://saudieventmanagement.com/ar/services/${SERVICE.slug}`,
    },
  },
  openGraph: {
    title: SERVICE.titleTag,
    description: SERVICE.metaDescription,
    url: SERVICE.canonicalUrl,
    images: [
      {
        url: SERVICE.heroImage,
        width: 1200,
        height: 630,
        alt: SERVICE.heroImageAlt,
      },
    ],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: SERVICE.schemaServiceName,
  description: SERVICE.schemaDescription,
  provider: {
    "@type": "Organization",
    name: "Saudi Event Management",
    url: "https://saudieventmanagement.com",
  },
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia",
  },
  serviceType: "Event Management",
  url: SERVICE.canonicalUrl,
};

export default async function ServicePage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dict = await getDictionary(locale as "en" | "ar");

  return (
    <main className="min-h-screen bg-ink-950 text-sand-100">
      <ScrollProgress />
      <WhatsAppButton />
      <Navbar dict={dict.nav} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-ink-600">
        <Image
          src={SERVICE.heroImage}
          alt={SERVICE.heroImageAlt}
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/60 to-ink-950" />
        <div className="relative z-10 container-luxury text-center">
          <span className="section-label mb-8 block">Services</span>
          <h1 className="font-display font-medium text-sand-50 text-3xl md:text-5xl lg:text-6xl mb-8 uppercase tracking-tight max-w-4xl mx-auto leading-tight">
            {SERVICE.h1}
          </h1>
          <p className="text-sand-400 text-[14px] md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Delivering world-class event production across Riyadh, Jeddah, and the entire Kingdom of Saudi Arabia.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container-luxury max-w-4xl relative z-10">
          <h2 className="font-display font-medium text-sand-50 text-2xl md:text-3xl mb-8 uppercase tracking-tight">
            {SERVICE.h2}
          </h2>
          <div className="prose prose-invert max-w-none text-sand-300 font-light text-[15px] leading-relaxed space-y-6">
            <p>{SERVICE.introduction}</p>
            <p>{SERVICE.details}</p>
          </div>

          {/* What We Offer */}
          <div className="mt-16 pt-16 border-t border-ink-600">
            <h3 className="font-display font-medium text-sand-50 text-xl md:text-2xl mb-8 uppercase tracking-tight">
              Our Service Offerings Include:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sand-300 font-light text-[14px]">
              {SERVICE.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-gold-400 mt-1">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-ink-600 flex justify-center">
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gold-400 text-ink-950 font-medium uppercase tracking-[0.2em] text-[11px] rounded-sm hover:bg-gold-300 transition-colors shadow-lg"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
