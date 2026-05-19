import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Building2, Users, MapPin, Target, Briefcase, Calendar } from "lucide-react";

export const metadata = {
  title: 'Corporate Event Management Saudi Arabia',
  description: 'Top-tier corporate event management in Saudi Arabia. We organize business conferences, AGM planning, team building, and corporate gala dinners in Riyadh & Jeddah.',
  keywords: 'corporate event management Saudi Arabia, شركة إدارة فعاليات الشركات, event company Riyadh, corporate events Jeddah KSA, business conference organizer Saudi Arabia, AGM planning Riyadh, team building events KSA, corporate gala dinner Saudi Arabia, seminar organizer Riyadh',
};

// Schema.org Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management Corporate Events",
      "image": "https://www.saudieventmanagement.com/corporate.webp",
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
            "text": "The cost of a corporate event in Saudi Arabia varies widely based on scale, venue, and requirements. Saudi Event Management offers bespoke packages starting from SAR 75,000 for premium summits."
          }
        },
        {
          "@type": "Question",
          "name": "Which event management companies operate in Riyadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Several premier event management companies operate in Riyadh, with Saudi Event Management leading the luxury and corporate sector, specializing in exclusive business gatherings and Vision 2030 initiatives."
          }
        },
        {
          "@type": "Question",
          "name": "Who organizes corporate conferences in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is a top-tier corporate conference organizer in Saudi Arabia. We handle end-to-end planning, from GEA permitting and VIP logistics to state-of-the-art AV execution for entities like SABIC and NEOM."
          }
        },
        {
          "@type": "Question",
          "name": "What are the top conference venues in Riyadh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The top conference venues in Riyadh include the King Abdullah Financial District (KAFD) Conference Center, The Ritz-Carlton Riyadh, and the Al Faisaliah Hotel, all of which Saudi Event Management partners with for elite corporate summits."
          }
        },
        {
          "@type": "Question",
          "name": "find a corporate event company near me in Riyadh",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management is centrally located in Riyadh. We are the premier choice when you need to find a corporate event company near me in Riyadh for high-level business gatherings."
          }
        },
        {
          "@type": "Question",
          "name": "who does business events in Saudi Arabia",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Saudi Event Management does business events in Saudi Arabia, from intimate company functions and board retreats to large-scale enterprise events and professional conferences."
          }
        },
        {
          "@type": "Question",
          "name": "best conference organizer Jeddah",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As the best conference organizer Jeddah has to offer, Saudi Event Management provides end-to-end management for executive summits, ensuring flawless execution by the Red Sea."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://saudieventmanagement.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Corporate Events", "item": "https://saudieventmanagement.com/services/corporate-events" }
      ]
    },
    {
      "@type": "Organization",
      "name": "Saudi Event Management Corporate Events",
      "description": "Aligning with Saudi Vision 2030 and the General Entertainment Authority (GEA) for world-class summits.",
      "memberOf": {
        "@type": "Organization",
        "name": "Ministry of Culture Partners"
      }
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
      <main className="min-h-screen bg-emerald-950 overflow-hidden pt-20">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/corporate.webp" 
              alt="Corporate event management Saudi Arabia - Business conference" 
              width={1920}
              height={1080}
              className="w-full h-full object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/60 to-emerald-950" />
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
              إدارة فعاليات الشركات | Corporate Excellence
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans text-white mb-6 leading-tight font-bold">
              Corporate Event Management <br/><span className="text-shimmer font-bold">Saudi Arabia</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
              The premier partner for <strong className="text-white">NEOM Corporate</strong>, <strong className="text-white">SABIC</strong>, and <strong className="text-white">Saudi Aramco</strong>. Elevating every <strong className="text-white">business gathering</strong>, <strong className="text-white">company function</strong>, and <strong className="text-white">enterprise event</strong> at <strong className="text-white">KAFD</strong> to world-class standards.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gold-500 text-emerald-900 font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20"
            >
              Consult Our Experts
            </Link>
          </div>
        </section>

        {/* E-E-A-T Signals & Certifications */}
        <section className="py-12 border-y border-white/5 bg-emerald-900/30">
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
              <div className="text-sm text-gray-400 font-light ">
                &quot;Trusted by HRDF and major Saudi Vision 2030 initiatives for over 12 years.&quot;
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">Our Corporate <span className="text-shimmer font-bold">Services</span></h2>
            <div className="w-16 h-px bg-gold-500/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: "Professional Conferences", desc: "Expert professional conference organizer for Saudi Aramco and SABIC level summits. We handle end-to-end logistics and VIP attendee management." },
              { icon: Target, title: "Executive Summits", desc: "Flawless executive summit and AGM planning at King Abdullah Financial District (KAFD), ensuring regulatory compliance and secure voting systems." },
              { icon: Users, title: "Board Retreats KSA", desc: "Curated board retreat KSA and team building for HRDF and government entities, designed to foster leadership and elite team cohesion across the Kingdom." },
              { icon: Briefcase, title: "Corporate Gala Dinners", desc: "Spectacular gala dinners for enterprise events and Vision 2030 initiatives, featuring world-class catering and luxury venue sourcing." },
              { icon: Calendar, title: "Seminar Organizer Riyadh", desc: "Professional seminar organization with state-of-the-art AV setups, hybrid broadcasting, and flawless execution." },
              { icon: MapPin, title: "Vision 2030 Events", desc: "Aligning your corporate narrative with Saudi Vision 2030 trends through high-impact public relations and strategic event planning." },
            ].map((service, i) => (
              <div key={i} className="bg-emerald-900 border border-white/5 p-8 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group">
                <service.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-sans font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Topical Authority Content Section */}
        <section className="py-24 bg-emerald-900 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-6">
                <h3 className="text-2xl font-sans font-bold text-white">Business <br/><span className="text-gold-500">Intelligence</span></h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Insights from our Event Director on navigating the complex landscape of corporate gatherings in the Kingdom.</p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white font-bold text-sm">Omar Al-Farsi</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">CEO & Executive Event Director</p>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Industry awards & rankings: Saudi Event Management named top event company", desc: "Recognized for excellence in corporate event management across Riyadh and Jeddah." },
                  { title: "Partnership announcements with Saudi entities", desc: "Strategic alignments with the GEA, Ministry of Culture, and Vision 2030 initiatives." },
                  { title: "Detailed behind-the-scenes case studies", desc: "An exclusive look at how we execute flawless executive summits at KAFD." },
                  { title: "Comparison: corporate event venues in KSA", desc: "Evaluating the best business centers, luxury hotels, and convention halls for your next summit." }
                ].map((post, idx) => (
                  <div key={idx} className="p-6 bg-emerald-950 rounded-2xl hover:bg-gold-500/5 transition-colors cursor-pointer group">
                    <h4 className="text-white font-bold text-sm mb-3 group-hover:text-gold-500 transition-colors">{post.title}</h4>
                    <p className="text-gray-500 text-[11px] font-light leading-relaxed">{post.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <section className="py-24 bg-emerald-900/50 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-sans text-white mb-6 font-bold">Frequently Asked <span className="text-gold-500">Questions</span></h2>
              <div className="w-16 h-px bg-gold-500/50 mx-auto" />
            </div>

            <div className="space-y-6">
              {[
                { q: "Which event management companies operate in Riyadh?", a: "Saudi Event Management is a leading corporate and luxury event management company operating in Riyadh, specializing in high-impact business gatherings and exclusive galas." },
                { q: "Who organizes corporate conferences in Saudi Arabia?", a: "Saudi Event Management acts as a premier professional conference organizer (PCO) across Saudi Arabia, managing everything from GEA permits to VIP logistics for large-scale corporate summits." },
                { q: "What are the top conference venues in Riyadh?", a: "Top venues include the KAFD Conference Center, The Ritz-Carlton, and Al Faisaliah. We help organizations select and secure the most prestigious venues for their events." },
                { q: "How much does a corporate event cost in Saudi Arabia?", a: "The cost of corporate event planning varies widely based on scale, venue, and requirements. Saudi Event Management offers bespoke packages starting from SAR 75,000 for premium summits." },
                { q: "find a corporate event company near me in Riyadh", a: "Saudi Event Management is centrally located in Riyadh, providing immediate, high-end support for any local enterprise event or professional conference." },
                { q: "who does business events in Saudi Arabia", a: "Saudi Event Management does business events in Saudi Arabia, mastering everything from an intimate company function to a massive executive summit." },
                { q: "best conference organizer Jeddah", a: "Saudi Event Management is widely regarded as the best conference organizer Jeddah, utilizing premium Red Sea venues to host spectacular business gatherings and board retreats." }
              ].map((faq, i) => (
                <div key={i} className="bg-emerald-900 border border-white/5 p-6 rounded-2xl">
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
