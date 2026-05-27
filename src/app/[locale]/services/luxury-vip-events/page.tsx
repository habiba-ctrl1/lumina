import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Star, Crown, Gem, MapPin, Music, Shield } from "lucide-react";

export const metadata = {
  title: 'Luxury & VIP Event Experiences Saudi Arabia',
  description: 'Exclusive luxury event planning and VIP concierge services in Riyadh, Jeddah, and AlUla. We specialize in private parties, royal family events, and HNWI experiences.',
  keywords: 'VIP event planning Saudi Arabia, luxury events Riyadh, private party planner Jeddah, royal family event management, luxury yacht events Red Sea, exclusive launch events KSA',
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Luxury & VIP Event Experiences",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Saudi Event Management",
        "image": "https://www.saudieventmanagement.com/gallery_charity_gala.webp"
      },
      "areaServed": ["Riyadh", "Jeddah", "AlUla", "Red Sea"],
      "description": "Exclusive luxury event planning and VIP concierge services specializing in private parties, royal events, and HNWI experiences."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do you ensure confidentiality for VIP and Royal family events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous vetting, and we implement stringent access controls and digital security measures to ensure absolute privacy for our VIP clients."
          }
        },
        {
          "@type": "Question",
          "name": "Can you arrange private concerts with international artists in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through our global talent agency networks, we broker and manage private appearances by A-list international musicians, speakers, and performers, handling all rider requirements, private aviation, and technical production."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide close protection and security for VIP events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We coordinate with top-tier private security firms and government protocols to provide seamless close protection, secure perimeters, and discreet crowd management for all HNWI and diplomatic events."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Luxury & VIP Events", "item": "https://saudieventmanagement.com/services/luxury-vip-events" }
      ]
    }
  ]
};

export default function LuxuryVIPEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-ink-950 overflow-hidden pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/gallery_charity_gala.webp" 
              alt="Luxury VIP Events Saudi Arabia" 
              width={1920}
              height={1080}
              className="w-full h-full object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-gold-400 text-xs uppercase tracking-[0.4em] font-bold mb-8 block">
              Luxury & VIP Experiences
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-8 leading-tight font-bold">
              Exclusive VIP Events <br/><span className="text-gold-400 italic">Saudi Arabia</span>
            </h1>
            <p className="text-sand-300 text-lg md:text-xl mb-8 leading-relaxed font-light">
              <strong className="text-white">Saudi Event Management</strong> is the leading <strong className="text-white">luxury event planner</strong> for <strong className="text-white">VIPs, Royal Families, and High-Net-Worth Individuals (HNWI)</strong> in <strong className="text-white">Saudi Arabia</strong>. We design strictly confidential, ultra-luxury experiences including <strong className="text-white">private concerts, yacht parties, and exclusive launches</strong>.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-400 text-ink-950 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all shadow-lg"
            >
              Request Private Consultation
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-display text-white mb-8">Bespoke <span className="text-gold-400 italic">Experiences</span></h2>
            <div className="w-16 h-px bg-gold-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Crown, title: "Royal Family Events", desc: "Discreet and flawless execution of private gatherings and celebrations for royal family members, ensuring complete confidentiality." },
              { icon: Gem, title: "HNWI Concierge", desc: "End-to-end event concierge services for High-Net-Worth Individuals, managing everything from international talent booking to security." },
              { icon: MapPin, title: "Luxury Yacht & Desert", desc: "Curated ultra-luxury experiences aboard private yachts on the Red Sea or bespoke glamping in the pristine deserts of AlUla." },
              { icon: Star, title: "Exclusive Launches", desc: "High-impact, invite-only brand launches for luxury automotive, haute couture, and premium jewelry brands." },
              { icon: Music, title: "Private Concerts", desc: "Securing A-list international and regional artists for intimate, private performances with world-class technical production." },
              { icon: Shield, title: "VIP Protocol & Security", desc: "Expert management of diplomatic protocols, close-protection security coordination, and secure transportation." },
            ].map((service, i) => (
              <div key={i} className="bg-ink-900/50 border border-white/5 p-8 rounded-sm hover:border-gold-400/30 transition-all duration-500 group">
                <service.icon size={32} className="text-gold-400 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-6 uppercase tracking-wider">{service.title}</h3>
                <p className="text-sand-400 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-ink-900 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-display text-white mb-6">VIP Events <span className="text-gold-400 italic">FAQ</span></h2>
              <div className="w-12 h-px bg-gold-400/50 mx-auto" />
            </div>
            <div className="space-y-8">
              {[
                { q: "How do you ensure confidentiality for VIP and Royal family events?", a: "We operate under strict Non-Disclosure Agreements (NDAs). Our elite staff undergoes rigorous vetting, and we implement stringent access controls and digital security measures to ensure absolute privacy for our VIP clients." },
                { q: "Can you arrange private concerts with international artists in Saudi Arabia?", a: "Yes, through our global talent agency networks, we broker and manage private appearances by A-list international musicians, speakers, and performers, handling all rider requirements, private aviation, and technical production." },
                { q: "Do you provide close protection and security for VIP events?", a: "We coordinate with top-tier private security firms and government protocols to provide seamless close protection, secure perimeters, and discreet crowd management for all HNWI and diplomatic events." }
              ].map((faq, i) => (
                <div key={i} className="bg-ink-950 p-8 border border-white/5 rounded-sm">
                  <h3 className="text-lg font-medium text-white mb-3">{faq.q}</h3>
                  <p className="text-sand-400 font-light text-sm">{faq.a}</p>
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
