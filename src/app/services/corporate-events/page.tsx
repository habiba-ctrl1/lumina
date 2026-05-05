import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
              إدارة فعاليات الشركات | Corporate Excellence
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight">
              Corporate Event Management <br/><span className="text-shimmer italic font-semibold">Saudi Arabia</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-8">
              The premier partner for <strong className="text-white">NEOM Corporate</strong>, <strong className="text-white">SABIC</strong>, and <strong className="text-white">Saudi Aramco</strong>. Elevating business at <strong className="text-white">KAFD</strong> to world-class standards.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
            >
              Consult Our Experts
            </Link>
          </div>
        </section>

        {/* E-E-A-T Signals & Certifications */}
        <section className="py-12 border-y border-white/5 bg-charcoal-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="text-center">
                <span className="text-white font-bold block text-lg tracking-widest">IAPCO</span>
                <span className="text-[10px] text-gray-500 uppercase">Certified Member</span>
              </div>
              <div className="text-center">
                <span className="text-white font-bold block text-lg tracking-widest">MPI</span>
                <span className="text-[10px] text-gray-500 uppercase">Professional Planners</span>
              </div>
              <div className="h-8 w-px bg-white/10 hidden md:block" />
              <div className="text-sm text-gray-400 font-light italic">
                "Trusted by HRDF and major Saudi Vision 2030 initiatives for over 12 years."
              </div>
            </div>
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
              { icon: Building2, title: "Business Conferences", desc: "Expert business conference organizer for Saudi Aramco and SABIC level summits. We handle end-to-end logistics and VIP attendee management." },
              { icon: Target, title: "AGM Planning Riyadh", desc: "Flawless Annual General Meetings at King Abdullah Financial District (KAFD), ensuring regulatory compliance and secure voting systems." },
              { icon: Users, title: "Team Building Events KSA", desc: "Curated retreats for HRDF and government entities, designed to foster leadership and elite team cohesion across the Kingdom." },
              { icon: Briefcase, title: "Corporate Gala Dinners", desc: "Spectacular gala dinners for NEOM and Saudi Vision 2030 initiatives, featuring world-class catering and luxury venue sourcing." },
              { icon: Calendar, title: "Seminar Organizer Riyadh", desc: "Professional seminar organization with state-of-the-art AV setups, hybrid broadcasting, and flawless execution." },
              { icon: MapPin, title: "Vision 2030 Events", desc: "Aligning your corporate narrative with Saudi Vision 2030 trends through high-impact public relations and strategic event planning." },
            ].map((service, i) => (
              <div key={i} className="bg-charcoal-900 border border-white/5 p-8 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group">
                <service.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-24 bg-charcoal-900 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-display text-white">Business <br/><span className="text-gold-500 italic">Intelligence</span></h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Insights from our Event Director on navigating the complex landscape of corporate gatherings in the Kingdom.</p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">Omar Al-Farsi</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">CEO & Executive Event Director</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Complete guide: corporate events in Saudi Arabia 2025", desc: "A comprehensive analysis of venue trends, GEA regulations, and tech integration for the upcoming year." },
                  { title: "Corporate event etiquette in KSA — cultural considerations", desc: "Mastering the nuances of local protocol, Majlis hosting, and VIP hospitality for international delegates." },
                  { title: "ROI measurement for corporate events Saudi Arabia", desc: "Data-driven strategies to quantify the impact of business summits and stakeholder engagements." },
                  { title: "Vision 2030 and business event trends in KSA", desc: "How the Kingdom's transformation is reshaping the MICE industry and executive networking." }
                ].map((post, idx) => (
                  <div key={idx} className="p-6 bg-charcoal-950 rounded-2xl hover:bg-gold-500/5 transition-colors cursor-pointer group">
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-gold-500 transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
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
                { q: "Which is the best event management company in Riyadh?", a: "Lumina Events is widely recognized as a premier luxury and corporate event management collective in Riyadh, focusing on exclusive, high-impact business gatherings for entities like KAFD and SABIC." },
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
