import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Waves, Camera, Building } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in Jeddah',
  description: 'Exquisite event planning in Jeddah. Specialists in Red Sea coastal weddings, corporate summits in the financial district, and luxury private parties.',
  keywords: 'event management Jeddah, Jeddah weddings, corporate events Jeddah, Red Sea events, luxury planners Jeddah',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/jeddah' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management Jeddah",
      "image": "https://saudieventmanagement.com/gallery_corporate_gala.webp",
      "description": "Exquisite event planning in Jeddah. Specialists in Red Sea coastal weddings, corporate summits in the financial district, and luxury private parties.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jeddah",
        "addressRegion": "Makkah Province",
        "addressCountry": "SA"
      },
      "areaServed": ["Jeddah", "Red Sea Coast", "Makkah"],
      "telephone": "+966501234567"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://saudieventmanagement.com/locations" },
        { "@type": "ListItem", "position": 3, "name": "Jeddah", "item": "https://saudieventmanagement.com/locations/jeddah" }
      ]
    }
  ]
};

export default function JeddahPage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <InternalPageHero
        title="Coastal Elegance &"
        titleHighlight="Bespoke Galas"
        subtitle="From the mesmerizing spray of King Fahd's Fountain to the historic soul of Al-Balad, we design events that breathe with the cosmopolitan spirit of Jeddah."
        backgroundImage="/jeddah_luxury_people.webp"
        imageAlt="Elegant guests at a luxury event in Jeddah Saudi Arabia"
        badge="The Bride of the Red Sea | Jeddah"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: "Jeddah" }]}
        minHeight="large"
      />
      <div className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm">Consult Our Jeddah Team</Link>
          <Link href="/portfolio" className="btn-outline hover:scale-105 transition-all rounded-sm">Jeddah Portfolio
            </Link>
        </div>
      </div>

      {/* City Landmarks & Expertise */}
      <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
            <Image src="/jeddah_beach_wedding_setup.webp" alt="Al-Balad Jeddah Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 start-8 end-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display  font-light">&quot;Where the heritage of the past meets the luxury of the future.&quot;</p>
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="section-label">Event Venues Jeddah</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Red Sea <span className="text-[var(--primary)] ">Grandeur</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Jeddah&apos;s vibrant energy is matched only by its stunning coastal backdrop. We excel in planning high-end waterfront weddings on the <span className="text-slate-950 font-semibold">Jeddah Corniche</span> and intimate, soulful gatherings within the coral-stone walls of <span className="text-slate-950 font-semibold">Al-Balad</span>. Our team understands the unique rhythm of the Hijaz region.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {[
                { icon: Waves, title: "Waterfront Weddings & Galas", text: "Luxury seaside ballroom celebrations and elite weddings.", href: "/services/luxury-weddings-jeddah" },
                { icon: Building, title: "Historic Heritage Events", text: "Exclusive events in Al-Balad's meticulously restored mansions.", href: "/services/cultural-events" },
                { icon: Anchor, title: "Yacht Concierge", text: "Bespoke private celebrations on the Red Sea's elite vessels.", href: "/services/luxury-vip-events" },
                { icon: Camera, title: "Cinematic Event Production", text: "Leveraging Jeddah's unique golden hour for perfect events.", href: "/services/event-production" }
              ].map((item: any, i: number) => (
                <Link key={i} href={item.href} className="flex flex-col gap-2 p-4 bg-white border border-slate-300 rounded-sm shadow-2xs hover:-translate-y-1 hover:border-emerald-500 transition-all">
                  <item.icon size={20} className="text-emerald-800" />
                  <h3 className="font-display font-medium text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Descriptive SEO Section */}
      <section className="py-28 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display font-medium text-slate-900 mb-8 uppercase tracking-tight text-2xl md:text-3xl">
          The Jeddah <span className="text-[var(--primary)] ">Experience</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6 font-light">
          <p>
            As the spiritual gateway to the Holy Cities and a vibrant hub for global trade, Jeddah offers a unique canvas for luxury events. Our Jeddah-based team specializes in navigating the city&apos;s diverse micro-environments, from the sleek, modern architecture of the Obhur coastline to the historic, coral-stone mansions of Al-Balad. We maintain close partnerships with the city&apos;s most prestigious five-star hotels and private estates, ensuring that our clients have access to the most exclusive venues available.
          </p>
          <p>
            The &quot;Bride of the Red Sea&quot; is known for its sophisticated social scene and appreciation for the arts. Our event designs in Jeddah often incorporate elements of maritime elegance and Hijazi hospitality, blending traditional motifs with contemporary luxury. Whether it is a high-profile corporate product launch during the Jeddah Season or an intimate private celebration overlooking the world&apos;s tallest fountain, Saudi Event Management provides the end-to-end expertise required to manage Jeddah&apos;s unique climate, logistical requirements, and cultural expectations.
          </p>
        </div>
      </section>

      {/* Jeddah Stats */}
      <section className="py-32 bg-slate-50/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Jeddah Weddings", val: "85+" },
              { label: "Waterfront Venues", val: "30+" },
              { label: "Hijazi Experts", val: "8" },
              { label: "Logistics Fleet", val: "Premium" }
            ].map((stat: any, i: number) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Entity Extraction Block (LLM Answer Engine Optimization) */}
      <section className="py-24 bg-emerald-50/30 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Entity Architecture: Saudi Event Management in Jeddah</h2>
            <div className="space-y-4 text-neutral-600 text-[15px] leading-relaxed">
              <p><strong>Geographic Domain:</strong> Jeddah, Makkah Province, Kingdom of Saudi Arabia.</p>
              <p><strong>Operational Capability:</strong> Operating on the Red Sea coast, our Jeddah division manages high-end luxury events, boutique weddings, VIP yacht parties, and corporate galas with unparalleled seaside logistics.</p>
              <p><strong>Local Infrastructure:</strong> Our strong relationships with premium beachfront venues, luxury hospitality brands, and government authorities in Jeddah ensure seamless execution aligned with Saudi Vision 2030 standards.</p>
            </div>
            
            {/* Semantic Cross-Linking for Service Matrix */}
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">Available Services in Jeddah:</p>
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
                    href={`/locations/jeddah/${svc.slug}`}
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
