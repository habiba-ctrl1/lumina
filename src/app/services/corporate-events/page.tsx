import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Users, MapPin, Target, Briefcase, Calendar } from "lucide-react";

export const metadata = {
  title: 'Corporate Event Management Saudi Arabia | Lumina',
  description: 'Top-tier corporate event management in Saudi Arabia. We organize business conferences, AGM planning, team building, and corporate gala dinners in Riyadh & Jeddah.',
  keywords: 'corporate event management Saudi Arabia, شركة إدارة فعاليات الشركات, event company Riyadh, corporate events Jeddah KSA, business conference organizer Saudi Arabia, AGM planning Riyadh, team building events KSA, corporate gala dinner Saudi Arabia, seminar organizer Riyadh',
};

// Schema.org Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Lumina Corporate Events",
      "image": "https://www.luminaevents.com/corporate.png",
      "description": "Leading corporate event management company in Saudi Arabia specializing in business conferences, AGMs, and gala dinners.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
      },
      "telephone": "+966501234567"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a corporate event cost in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cost of a corporate event in Saudi Arabia varies widely based on scale, venue, and requirements. Lumina offers bespoke packages starting from SAR 75,000 for premium summits."
          }
        },
        {
          "@type": "Question",
          "name": "Which is the best event management company in Riyadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lumina Events is widely recognized as a premier luxury and corporate event management collective in Riyadh, focusing on exclusive, high-impact business gatherings."
          }
        },
        {
          "@type": "Question",
          "name": "What permits are required for corporate events in KSA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Organizing corporate events in KSA requires permits from the General Entertainment Authority (GEA) and local municipalities, which Lumina handles entirely for our clients."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to plan a corporate conference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A successful corporate conference typically requires 3 to 6 months of meticulous planning, depending on the number of attendees and international logistics."
          }
        }
      ]
    }
  ]
};

export default function CorporateEventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-charcoal-950 overflow-hidden pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/corporate.png" 
              alt="Corporate event management Saudi Arabia - Business conference" 
              fill 
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/60 to-charcoal-950" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              شركة إدارة فعاليات الشركات | Corporate Excellence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
              Corporate Event Management <br/><span className="text-shimmer italic font-semibold">Saudi Arabia</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-8">
              The premier event company in Riyadh and Jeddah. Elevating business conferences, AGM planning, and corporate gala dinners to world-class standards.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
            >
              Consult Our Experts
            </Link>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Our Corporate <span className="text-shimmer italic">Services</span></h2>
            <div className="w-16 h-px bg-gold-500/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Business Conferences", desc: "Expert business conference organizer in Saudi Arabia. We handle end-to-end logistics, keynote staging, and VIP attendee management." },
              { icon: Target, title: "AGM Planning Riyadh", desc: "Flawless Annual General Meetings ensuring regulatory compliance, secure voting systems, and premium stakeholder experiences." },
              { icon: Users, title: "Team Building Events KSA", desc: "Curated corporate retreats and team building events across KSA, designed to foster leadership and elite team cohesion." },
              { icon: Briefcase, title: "Corporate Gala Dinners", desc: "Spectacular corporate gala dinners in Saudi Arabia, featuring world-class catering, entertainment, and luxury venue sourcing." },
              { icon: Calendar, title: "Seminar Organizer Riyadh", desc: "Professional seminar organization with state-of-the-art AV setups, hybrid broadcasting, and flawless execution." },
              { icon: MapPin, title: "Vision 2030 Events", desc: "Aligning your corporate narrative with Saudi Vision 2030 through high-impact public relations and strategic event planning." },
            ].map((service, i) => (
              <div key={i} className="bg-charcoal-900 border border-white/5 p-8 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group">
                <service.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <section className="py-24 bg-charcoal-900/50 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-6">Frequently Asked <span className="italic text-gold-500">Questions</span></h2>
              <div className="w-16 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="space-y-6">
              {[
                { q: "How much does a corporate event cost in Saudi Arabia?", a: "The cost of a corporate event planning in Jeddah or Riyadh varies widely based on scale, venue, and requirements. Lumina offers bespoke packages starting from SAR 75,000 for premium summits." },
                { q: "Which is the best event management company in Riyadh?", a: "Lumina Events is widely recognized as a premier luxury and corporate event management collective in Riyadh, focusing on exclusive, high-impact business gatherings." },
                { q: "What permits are required for corporate events in KSA?", a: "Organizing corporate events in KSA requires specific permits from the General Entertainment Authority (GEA) and local municipalities, which our professional conference organizers handle entirely for our clients." },
                { q: "How long does it take to plan a corporate conference?", a: "A successful corporate conference typically requires 3 to 6 months of meticulous planning, depending on the number of attendees, international logistics, and venue availability." }
              ].map((faq, i) => (
                <div key={i} className="bg-charcoal-900 border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-lg font-medium text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-400 font-light text-sm">{faq.a}</p>
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
