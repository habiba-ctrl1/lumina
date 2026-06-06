import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Building2, Briefcase, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in Dammam',
  description: 'Premier event management in Dammam and the Eastern Province. Specializing in high-profile corporate galas, industrial summits, and elite social gatherings.',
  keywords: 'event management Dammam, Dammam corporate events, luxury weddings Dammam, Eastern Province event planning',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/dammam' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management Dammam",
      "image": "https://saudieventmanagement.com/gallery_vip_party.webp",
      "description": "Premier event management in Dammam and the Eastern Province. Specializing in high-profile corporate galas and industrial summits.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dammam",
        "addressRegion": "Eastern Province",
        "addressCountry": "SA"
      },
      "areaServed": ["Dammam", "Al-Khobar", "Dhahran"],
      "telephone": "+966501234567"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "Dammam", "item": "https://saudieventmanagement.com/locations/dammam" }
      ]
    }
  ]
};

export default function DammamPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_vip_party.webp" 
            alt="Luxury Event Management Dammam - Eastern Province Skyline" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="section-label">
            The Eastern Province Gateway to Luxury | Dammam
          </span>
          <h1 className="font-display font-medium text-slate-900 mb-8 leading-tight text-3xl md:text-5xl">
            Elite Corporate & <br/><span className="text-[var(--primary)]  font-semibold">Coastal Celebrations</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            From <span className="text-slate-900 font-semibold">Aramco-tier</span> corporate summits to spectacular family weddings along the shimmering <span className="text-slate-900 font-semibold">Arabian Gulf coast</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link
              href="/#contact"
              className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
            >
              Request a Proposal
            </Link>
            <Link
              href="/portfolio"
              className="btn-outline hover:scale-105 transition-all rounded-sm"
            >
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="section-label">Eastern Province Venues</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Gulf Coast Sophistication, <span className="text-[var(--primary)] ">Unmatched Logistics</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Dammam and Al-Khobar represent the industrial and coastal heart of the Kingdom. We specialize in managing complex logistics for large-scale corporate events and the region&apos;s most prestigious family celebrations, ensuring every detail reflects the high standards of the Eastern Province.
            </p>
            <ul className="space-y-4">
              {[
                "Strategic partnerships with top-tier hotels in Dammam and Al-Khobar",
                "Specialized event management for major industrial and energy entities",
                "Coastal wedding specialists for Gulf waterfront celebrations",
                "Full-service logistics for cross-region VIP guest management"
              ].map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image src="/gallery_vip_party.webp" alt="Dammam Coastal Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display  font-light">&quot;Excellence on the Arabian Gulf.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* Dammam Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-y border-slate-200">
          {[
            { label: "Guest Capacity", val: "100–800" },
            { label: "Peak Season", val: "Nov–Mar" },
            { label: "Corporate Galas", val: "80+" },
            { label: "Coastal Venues", val: "25+" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for Dammam */}
      <section className="py-32 bg-slate-50/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Signature Eastern <span className="text-[var(--primary)] ">Services</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Custom solutions for the region&apos;s dynamic corporate and family landscape.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { icon: Briefcase, title: "Aramco-Tier Summits", desc: "Setting the standard for executive conferences and high-profile corporate galas." },
               { icon: Building2, title: "Coastal Family Weddings", desc: "Spectacular celebrations set against the backdrop of the Arabian Gulf." },
               { icon: MapPin, title: "Dhahran Private Events", desc: "Bespoke management for exclusive private gatherings in the Dhahran community." }
             ].map((service: any, i: number) => (
               <div key={i} className="card p-8 group hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                 <service.icon size={28} className="text-emerald-800 mb-8" />
                 <h3 className="font-display font-medium text-lg text-slate-900 mb-8">{service.title}</h3>
                 <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-32 border-t border-slate-200/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Eastern Province <span className="text-[var(--primary)] ">Partnerships</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Exclusive access to the region&apos;s most prestigious hotels and coastal venues.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              "InterContinental Dammam",
              "Hilton Al-Khobar",
              "Coral Beach Resort",
              "Sheraton Dammam",
              "Mövenpick Al Khobar",
              "Kempinski Al Othman",
              "Dhahran Expo Center",
              "Sunset Beach Resort"
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Entity Architecture: Saudi Event Management in Dammam</h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p><strong>Geographic Domain:</strong> Dammam & Eastern Province, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> Catering to the Kingdom's industrial heartland, our Dammam and Al-Khobar operations specialize in large-scale corporate summits, energy sector galas, and luxurious coastal weddings along the Arabian Gulf.</p>
              <p><strong>Local Infrastructure:</strong> Our deep partnerships with elite corporate venues, such as Dhahran Expo and premium waterfront resorts, allow us to manage complex logistical operations seamlessly in accordance with Saudi Vision 2030 standards.</p>
            </div>
            
            {/* Semantic Cross-Linking for Service Matrix */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Available Services in Dammam:</p>
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
                    href={`/locations/dammam/${svc.slug}`}
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
