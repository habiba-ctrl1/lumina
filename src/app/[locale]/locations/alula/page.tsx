import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Trophy, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in AlUla',
  description: 'Experience the magic of AlUla with Saudi Event Management. From ancient Hegra backdrops to ultra-luxury desert resorts, we curate breathtaking destination weddings.',
  keywords: 'event management AlUla, destination weddings AlUla, Hegra events, Banyan Tree AlUla weddings, Habitas AlUla events, Saudi desert luxury events',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/alula' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management AlUla",
      "image": "https://saudieventmanagement.com/gallery_destination_wedding.webp",
      "description": "Experience the magic of AlUla with Saudi Event Management. From ancient Hegra backdrops to ultra-luxury desert resorts.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "AlUla",
        "addressRegion": "Al Madinah Province",
        "addressCountry": "SA"
      },
      "areaServed": ["AlUla", "Hegra", "Ashar Valley"],
      "telephone": "+966501234567"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "AlUla", "item": "https://saudieventmanagement.com/locations/alula" }
      ]
    }
  ]
};

export default function AlUlaPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Unforgettable"
        titleHighlight="Intimate Celebrations"
        subtitle="Amidst ancient UNESCO heritage and ultra-luxury desert resorts, we weave stories that echo through time in Saudi Arabia's most breathtaking destination."
        backgroundImage="/alula_gala_people.webp"
        imageAlt="Guests in formal wear at a heritage gala event in AlUla Saudi Arabia"
        badge="Saudi Arabia's Breathtaking Destination | AlUla"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: "AlUla" }]}
        minHeight="large"
      />
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">Request a Proposal</Link>
          <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">View Destination Work
            </Link>
          </div>
        </div>

      {/* City Landmarks & Expertise */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="section-label">Exclusive Venues AlUla</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Ancient Landscapes, <span className="text-[var(--primary)] ">Modern Luxury</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              AlUla is a living museum of human history. We specialize in creating high-end destination weddings that respect the sanctity of the landscape while providing the pinnacle of luxury service. From the sandstone canyons to the mirrored walls of Maraya, your event will be legendary.
            </p>
            <ul className="space-y-4">
              {[
                "Bespoke setups at Banyan Tree and Habitas AlUla",
                "Historical backdrops near Hegra for exclusive gatherings",
                "Sustainable event logistics for desert environments",
                "Luxury guest concierge for international destination travelers"
              ].map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image src="/gallery_destination_wedding.webp" alt="AlUla Desert Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display  font-light">&quot;Where history meets the future of luxury.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* AlUla Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-y border-slate-200">
          {[
            { label: "Guest Capacity", val: "50–300" },
            { label: "Peak Season", val: "Nov–Apr" },
            { label: "Elite Resorts", val: "5+" },
            { label: "Event Style", val: "Intimate" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for AlUla */}
      <section className="py-32 bg-slate-50/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl">Signature AlUla <span className="text-[var(--primary)] ">Experiences</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Tailored solutions for the world&apos;s most ambitious destination events.</p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { icon: Sparkles, title: "Hegra Heritage Weddings", desc: "Unprecedented access to ancient heritage sites for your ceremony backdrop.", href: "/services/destination-events" },
               { icon: Trophy, title: "Desert Resort Takeovers", desc: "Full buyout management for resorts like Habitas or Banyan Tree for your guests.", href: "/services/luxury-vip-events" },
               { icon: MapPin, title: "AlUla Event Production", desc: "Immersive staging and technical design set deep within the hidden canyons.", href: "/services/event-production-alula" }
             ].map((service: any, i: number) => (
               <Link key={i} href={service.href} className="card p-8 group hover:-translate-y-2 hover:shadow-md transition-all duration-300 block border border-transparent hover:border-emerald-500">
                 <service.icon size={28} className="text-emerald-800 mb-8" />
                 <h3 className="font-display font-medium text-lg text-slate-900 mb-8">{service.title}</h3>
                 <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-32 border-t border-slate-200/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">AlUla Venue <span className="text-[var(--primary)] ">Network</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">We maintain direct relationships with AlUla&apos;s most exclusive management entities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              "Banyan Tree AlUla",
              "Habitas AlUla",
              "Shaden Resort",
              "Maraya Concert Hall",
              "Hegra Heritage Site",
              "Old Town AlUla",
              "Ashar Valley Resorts",
              "Cloud7 Residence"
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Entity Architecture: Saudi Event Management in AlUla</h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p><strong>Geographic Domain:</strong> AlUla, Al Madinah Province, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> Specializing in intimate, ultra-luxury destination events, our AlUla division masters the complex logistics of desert environments. We curate high-end weddings, boutique corporate retreats, and heritage site activations.</p>
              <p><strong>Local Infrastructure:</strong> Due to AlUla's UNESCO-protected status, our extensive experience with the Royal Commission for AlUla (RCU) ensures all permits, environmental compliance, and premium venue sourcing (such as Maraya and Hegra) are handled seamlessly.</p>
            </div>
            
            {/* Semantic Cross-Linking for Service Matrix */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Available Services in AlUla:</p>
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
                    href={`/locations/alula/${svc.slug}`}
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
