import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Map, Tent, Anchor, Mountain, Palmtree, Compass } from "lucide-react";

export const metadata = {
  title: 'Destination Events Saudi Arabia | AlUla, NEOM, Red Sea',
  description: 'Plan breathtaking destination events in Saudi Arabia. From desert glamping in AlUla to luxury yacht events in the Red Sea and exclusive retreats in NEOM.',
  keywords: 'Destination events Saudi Arabia, AlUla event planning, NEOM event management, Red Sea destination events, desert safari events KSA, Diriyah heritage events',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Destination Events Saudi Arabia",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management"
      },
      "areaServed": ["AlUla", "NEOM", "Red Sea", "Diriyah"],
      "description": "Breathtaking destination events across Saudi Arabia's most iconic landscapes, from AlUla's deserts to the Red Sea coast."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you handle travel logistics for destination events in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer complete end-to-end logistics including charter flights, VIP ground transportation, and luxury accommodation buyouts at resorts in AlUla, NEOM, and the Red Sea."
          }
        },
        {
          "@type": "Question",
          "name": "Can you build event infrastructure in remote desert locations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our production team specializes in remote event logistics, bringing in climate-controlled structural tents, power generation, and luxury amenities to pristine desert environments while ensuring zero environmental impact."
          }
        },
        {
          "@type": "Question",
          "name": "How far in advance should we plan a destination event in AlUla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For major events and weddings in AlUla, we recommend starting the planning process 6 to 12 months in advance to secure the best dates at high-demand luxury resorts and heritage venues."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Destination Events", "item": "https://saudieventmanagement.com/services/destination-events" }
      ]
    }
  ]
};

export default function DestinationEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-sand-50 text-ink-950 overflow-hidden pt-20">
        <Navbar darkHero={false} />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hero_bg.webp" 
              alt="Destination Events Saudi Arabia" 
              width={1920}
              height={1080}
              className="w-full h-full object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-gold-400 text-xs uppercase tracking-[0.4em] font-bold mb-8 block">
              Iconic Locations
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-8 leading-tight font-bold">
              Destination Events <br/><span className="text-gold-400 italic">Saudi Arabia</span>
            </h1>
            <p className="text-sand-100 text-lg md:text-xl mb-8 leading-relaxed font-light">
              <strong className="text-white">Saudi Event Management</strong> is a specialist in <strong className="text-white">destination event planning</strong> across the Kingdom&apos;s most breathtaking landscapes. We execute seamless logistics and breathtaking designs for <strong className="text-white">desert events in AlUla, coastal retreats at the Red Sea, and futuristic summits in NEOM</strong>.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg"
            >
              Explore Destinations
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-display text-ink-950 mb-8">Extraordinary <span className="text-gold-600 italic">Settings</span></h2>
            <div className="w-16 h-px bg-gold-500/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Mountain, title: "AlUla Events", desc: "Breathtaking events set against the majestic sandstone mountains and ancient heritage sites of AlUla." },
              { icon: Compass, title: "NEOM Summits", desc: "Cutting-edge event planning in the futuristic landscape of NEOM, perfect for tech summits and visionary corporate retreats." },
              { icon: Anchor, title: "Red Sea Coastal", desc: "Exclusive beachfront galas and luxury yacht events along the pristine waters of the Saudi Red Sea coast." },
              { icon: Map, title: "Diriyah Heritage", desc: "Immersive cultural events in the historic mud-brick city of Diriyah, blending Saudi tradition with modern luxury." },
              { icon: Tent, title: "Desert Glamping", desc: "Bespoke desert safari and luxury glamping experiences, complete with traditional dining and stargazing." },
              { icon: Palmtree, title: "Jeddah Waterfront", desc: "High-end corporate and social events taking advantage of the vibrant Jeddah Corniche and waterfront venues." },
            ].map((service: any, i: number) => (
              <div key={i} className="bg-white border border-slate-200 p-8 rounded-sm hover:border-gold-400/50 hover:shadow-xl transition-all duration-500 group">
                <service.icon size={32} className="text-gold-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-ink-950 mb-6 uppercase tracking-wider">{service.title}</h3>
                <p className="text-slate-600 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-ink-950 mb-6">Destination Events <span className="text-gold-600 italic">FAQ</span></h2>
              <div className="w-12 h-px bg-gold-500/50 mx-auto" />
            </div>
            <div className="space-y-8">
              {[
                { q: "Do you handle travel logistics for destination events in Saudi Arabia?", a: "Yes, we offer complete end-to-end logistics including charter flights, VIP ground transportation, and luxury accommodation buyouts at resorts in AlUla, NEOM, and the Red Sea." },
                { q: "Can you build event infrastructure in remote desert locations?", a: "Absolutely. Our production team specializes in remote event logistics, bringing in climate-controlled structural tents, power generation, and luxury amenities to pristine desert environments while ensuring zero environmental impact." },
                { q: "How far in advance should we plan a destination event in AlUla?", a: "For major events and weddings in AlUla, we recommend starting the planning process 6 to 12 months in advance to secure the best dates at high-demand luxury resorts and heritage venues." }
              ].map((faq: any, i: number) => (
                <div key={i} className="bg-slate-50 p-8 border border-slate-200 rounded-sm">
                  <h3 className="text-lg font-medium text-ink-950 mb-3">{faq.q}</h3>
                  <p className="text-slate-600 font-light text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
