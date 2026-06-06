import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Trophy, Building2, User, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in Riyadh',
  description: 'The premier luxury event planner in Riyadh. From royal weddings near the Kingdom Centre to exclusive corporate galas in historical Diriyah.',
  keywords: 'event management Riyadh, luxury weddings Riyadh, corporate events Riyadh, Kingdom Centre events, Diriyah event planning, Al Faisaliyah Center events',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/riyadh' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management Riyadh",
      "image": "https://saudieventmanagement.com/hero_bg.webp",
      "description": "The premier luxury event planner in Riyadh. Specializing in royal weddings, corporate galas, and VIP events across the Kingdom Centre and Diriyah.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh Province",
        "addressCountry": "SA"
      },
      "areaServed": ["Riyadh", "Diriyah", "KAFD"],
      "telephone": "+966501234567"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "Riyadh", "item": "https://saudieventmanagement.com/locations/riyadh" }
      ]
    }
  ]
};

export default function RiyadhPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Elevating Riyadh's Most"
        titleHighlight="Iconic Celebrations"
        subtitle="From the soaring heights of the Kingdom Centre to the majestic heritage of Diriyah, we curate experiences that define the Riyadh skyline."
        backgroundImage="/riyadh_summit_people.webp"
        imageAlt="Luxury event management in Riyadh Saudi Arabia — premium conference production"
        badge="The Capital of Luxury | Riyadh"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: "Riyadh" }]}
        minHeight="large"
      />
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">Request a Proposal</Link>
          <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">View Our Riyadh Work</Link>
        </div>
      </div>

      {/* City Landmarks & Expertise */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="section-label">Event Venues Riyadh</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Where Heritage Meets <span className="text-[var(--primary)] ">Modernity</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Riyadh is a city of grand contrasts. We specialize in transforming the most prestigious locations into bespoke event spaces. Whether it&apos;s a high-profile corporate summit at the <span className="text-slate-950 font-semibold">Al Faisaliyah Center</span> or a private desert oasis gala, our local expertise ensures flawless execution.
            </p>
            <ul className="space-y-4">
              {[
                "Exclusive access to Royal Palaces and Private Estates",
                "Logistics management for grand scales near King Abdullah Financial District (KAFD)",
                "Bespoke decor inspired by Najdi architecture and modern minimalism",
                "World-class catering partnerships with Riyadh's elite chefs"
              ].map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image src="/gallery_charity_gala.webp" alt="Kingdom Centre Riyadh Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display  font-light">&quot;Creating masterpieces in the heart of the Kingdom.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* Riyadh Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-y border-slate-200">
          {[
            { label: "Riyadh Events", val: "150+" },
            { label: "Elite Venues", val: "45+" },
            { label: "Expert Planners", val: "12" },
            { label: "Guest Concierge", val: "24/7" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for Riyadh */}
      <section className="py-32 bg-slate-50/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Signature Riyadh <span className="text-[var(--primary)] ">Services</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Customized event solutions for the capital&apos;s most discerning clientele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: Building2, title: "KAFD Corporate Summits", desc: "Professional management for executive conferences and brand launches in the financial district.", href: "/services/corporate-events-riyadh" },
                { icon: Trophy, title: "Diriyah Heritage Galas", desc: "Combining historical majesty with modern luxury for unforgettable evening celebrations.", href: "/services/cultural-events" },
                { icon: MapPin, title: "Private Riyadh Villas", desc: "Transforming exclusive residential estates into bespoke party venues with full concierge.", href: "/services/luxury-vip-events" }
              ].map((service: any, i: number) => (
                <Link key={i} href={service.href} className="card p-8 group hover:-translate-y-2 hover:shadow-md transition-all duration-300 block">
                  <service.icon size={28} className="text-emerald-800 mb-8" />
                  <h3 className="font-display font-medium text-lg text-slate-900 mb-8">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Local Leadership Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="section-label">Riyadh Leadership</span>
              <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">The Minds Behind <span className="text-[var(--primary)] ">The Magic</span></h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Our Riyadh team consists of local experts who understand the cultural nuances and logistical demands of the Saudi capital. Led by industry veterans, we ensure every event is a masterpiece.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { name: "Fahad Al-Saud", role: "Riyadh Managing Director", desc: "15+ years in KSA luxury events." },
                  { name: "Layla Mansour", role: "Head of Design", desc: "Specializing in Najdi-modern fusion." }
                ].map((member: any, i: number) => (
                  <div key={i} className="flex gap-10 p-5 bg-white border border-slate-300 rounded-sm shadow-2xs">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-emerald-800 shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium mb-1 font-display">{member.name}</h3>
                      <p className="text-[var(--primary)] text-[10px] uppercase tracking-wider mb-2 font-semibold">{member.role}</p>
                      <p className="text-slate-500 text-xs font-light">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image src="/gallery_wedding_reception.webp" alt="Team at work" width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image src="/gallery_corporate_gala.webp" alt="Event planning" width={600} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image src="/gallery_destination_wedding.webp" alt="Venue sourcing" width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <Image src="/wedding.webp" alt="Riyadh office" width={600} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-32 border-t border-slate-200/20 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Strategic Venue <span className="text-[var(--primary)] ">Partnerships</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Exclusive access to Riyadh&apos;s most coveted and prestigious locations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              "The Ritz-Carlton, Riyadh",
              "Four Seasons Hotel Riyadh",
              "Al Faisaliyah Hotel",
              "Diriyah Gate Development Authority",
              "Kingdom Centre Ballrooms",
              "Tuwaiq Palace",
              "Fairmont Riyadh",
              "KAFD Conference Center"
            ].map((venue: any, i: number) => (
              <div key={i} className="flex items-center gap-10 p-5 bg-white border border-slate-200 rounded-sm hover:border-[var(--primary)] hover:shadow-sm transition-all shadow-2xs">
                <CheckCircle2 size={18} className="text-emerald-800 shrink-0" />
                <span className="text-slate-800 text-sm font-medium">{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Entity Extraction Block (LLM Answer Engine Optimization) */}
      <section className="py-24 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Entity Architecture: Saudi Event Management in Riyadh</h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p><strong>Geographic Domain:</strong> Riyadh, Riyadh Province, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> As the premier luxury event management agency in the capital, our local operations in Riyadh encompass end-to-end production, including corporate summits in KAFD, royal weddings, and high-net-worth VIP protocol.</p>
              <p><strong>Local Infrastructure:</strong> Our strong relationships with premium venues like the Kingdom Centre and Diriyah Gate, combined with government authorities in Riyadh, allow us to secure necessary GEA permits and execute flawless logistics aligned with Saudi Vision 2030 standards.</p>
            </div>
            
            {/* Semantic Cross-Linking for Service Matrix */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Available Services in Riyadh:</p>
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
                    href={`/locations/riyadh/${svc.slug}`}
                    className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
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
