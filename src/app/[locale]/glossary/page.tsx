import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Saudi Event Industry Glossary | MICE, GEA, Wedding & Production Terms',
    description: 'The definitive A-Z glossary of luxury event management, MICE, technical production, and cultural terminology in Saudi Arabia — with links to related services.',
    keywords: [
      'Saudi event glossary',
      'MICE terminology Saudi Arabia',
      'GEA permit meaning',
      'PCO event management definition',
      'Zaffah meaning Saudi wedding',
      'event production terms KSA',
      'Nikah ceremony definition',
      'Majlis event setup',
      'hybrid event meaning',
      'Vision 2030 events glossary',
    ],
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/glossary`,
      languages: { 'en-US': `${base}/glossary`, 'ar-SA': `${base}/ar/glossary` },
    },
  };
}

interface GlossaryTerm {
  term: string;
  termAr?: string;
  definition: string;
  relatedService?: { label: string; href: string };
}

const glossaryTerms: GlossaryTerm[] = [
  // ── Core Industry ──────────────────────────────────────────────────────────
  {
    term: "MICE",
    definition: "An acronym for Meetings, Incentives, Conferences, and Exhibitions. A specialized niche of group tourism dedicated to planning, booking, and facilitating conferences, seminars, and other events. Saudi Arabia is rapidly becoming a top-20 global MICE hub under Vision 2030, with the sector projected to generate SAR 55B annually by 2030.",
    relatedService: { label: "Conference Management", href: "/services/conferences" },
  },
  {
    term: "PCO (Professional Conference Organizer)",
    definition: "A specialist company or individual that provides comprehensive conference management services on behalf of an organization. PCO services include venue sourcing, speaker management, delegate registration, AV production, and on-site management. Saudi Event Management is an IAPCO-aligned PCO serving all major Saudi cities.",
    relatedService: { label: "Conference Management", href: "/services/conferences" },
  },
  {
    term: "GEA (General Entertainment Authority)",
    termAr: "هيئة الترفيه",
    definition: "The government body in Saudi Arabia responsible for the development and regulation of the entertainment sector, established in 2016 under Vision 2030. Event organizers must obtain GEA permits to host public events with live entertainment, concerts, and festivals in the Kingdom. Permit processing typically takes 4–8 weeks.",
    relatedService: { label: "Cultural Events", href: "/services/cultural-events" },
  },
  {
    term: "RCU (Royal Commission for AlUla)",
    definition: "The government authority responsible for the development, conservation, and tourism management of AlUla — Saudi Arabia's UNESCO World Heritage destination. All events held at AlUla heritage sites, Maraya, and protected landscapes require RCU event permits. Saudi Event Management holds preferred vendor status with the RCU.",
    relatedService: { label: "Destination Events", href: "/services/destination-events" },
  },
  {
    term: "DGDA (Diriyah Gate Development Authority)",
    definition: "The government authority responsible for developing Diriyah as a cultural, heritage, and tourism destination — transforming the birthplace of the Saudi state into a world-class visitor hub. DGDA manages event access to Diriyah's At-Turaif UNESCO World Heritage Site and Bujairi Terrace.",
    relatedService: { label: "Cultural Events", href: "/services/cultural-events" },
  },
  {
    term: "Vision 2030",
    definition: "Saudi Arabia's national transformation plan launched in 2016 by Crown Prince Mohammed bin Salman, designed to diversify the economy beyond oil. For the events industry, Vision 2030 has driven the creation of the GEA, massive entertainment investment (Riyadh Season, Saudi Seasons), MICE tourism growth, and the opening of world-class destinations including AlUla, NEOM, and the Red Sea Project.",
    relatedService: { label: "Corporate Events", href: "/services/corporate-events" },
  },
  // ── Wedding & Cultural ─────────────────────────────────────────────────────
  {
    term: "Zaffah (الزفة)",
    termAr: "الزفة",
    definition: "The traditional musical procession of the bride and groom in an Arab wedding. In Saudi luxury weddings, the Zaffah often features renowned regional singers, specialized lighting choreography, synchronized fireworks, and grand theatrical entrances designed to create an unforgettable first impression.",
    relatedService: { label: "Luxury Weddings", href: "/services/weddings" },
  },
  {
    term: "Kosha (الكوشة)",
    termAr: "الكوشة",
    definition: "The elevated seating area or stage where the bride and groom sit during a Saudi wedding reception. In modern luxury Saudi weddings, the Kosha is often a multi-million riyal architectural structure featuring immersive floral ceilings, custom LED screens, and bespoke scenic elements that serve as the visual centerpiece of the event.",
    relatedService: { label: "Luxury Weddings", href: "/services/weddings" },
  },
  {
    term: "Nikah Ceremony",
    termAr: "النكاح",
    definition: "The Islamic marriage contract ceremony, representing the formal and legally binding component of a Muslim wedding. In Saudi Arabia, the Nikah is typically a separate, often same-sex gathering presided over by a Ma'azoun (licensed marriage officiant). Saudi Event Management coordinates full Nikah ceremony production including venue, catering, and logistics for both the men's and women's celebrations.",
    relatedService: { label: "Luxury Weddings", href: "/services/weddings" },
  },
  {
    term: "Walima (الوليمة)",
    termAr: "الوليمة",
    definition: "The celebratory feast held by a groom following a wedding, traditionally taking place the day after the wedding night. In Saudi culture, the Walima is a significant social occasion that may be hosted at a hotel venue or private estate. Saudi Event Management plans and manages both the wedding and Walima events.",
    relatedService: { label: "Luxury Weddings", href: "/services/weddings" },
  },
  {
    term: "Majlis (مجلس)",
    termAr: "مجلس",
    definition: "A traditional Arabian sitting or gathering room — a formal reception space where guests are welcomed, served Arabic coffee (gahwa) and dates, and engaged in conversation. In event planning, a Majlis-style setup is commonly used for Ramadan iftar events, royal receptions, and VIP hospitality areas at major Saudi events.",
    relatedService: { label: "Cultural Events", href: "/services/cultural-events" },
  },
  {
    term: "Ardah (العرضة)",
    termAr: "العرضة السعودية",
    definition: "The Saudi traditional sword dance — a UNESCO-recognized Intangible Cultural Heritage performance featuring synchronized sword-bearing men dancing to traditional drums and poetry. The Ardah is performed at national celebrations, royal events, and major national day galas, and is one of the most powerful cultural entertainment choices for Saudi corporate events.",
    relatedService: { label: "Cultural Events", href: "/services/cultural-events" },
  },
  // ── Production & Technical ─────────────────────────────────────────────────
  {
    term: "Riyadh Season",
    definition: "An annual state-funded entertainment festival that runs from October to March, part of the larger Saudi Seasons initiative managed by the General Entertainment Authority. It is the largest event season in the Arab world, generating billions in revenue and creating extraordinary demand for professional event production, AV, and logistics services.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "Projection Mapping",
    definition: "A spatial augmented reality technique that projects video content onto three-dimensional surfaces — buildings, rock formations, or stage structures — to create immersive visual experiences. Used prominently at Saudi destination events: projecting content onto AlUla's sandstone mountains, the Maraya mirrored facade, and heritage buildings at Diriyah.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "LED Wall (Fine Pitch)",
    definition: "A modular display system made of interlocking LED panels, used as a large-format screen or stage backdrop at events. Fine-pitch LED walls (P2.6–P3.9mm pixel pitch) produce broadcast-quality images visible in ambient light conditions. The standard display technology for corporate events, conferences, and galas across Saudi Arabia.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "Hybrid Event",
    definition: "An event format that combines an in-person audience with a simultaneous virtual audience participating via live streaming technology. Hybrid events became standard practice across Saudi MICE events post-2020, requiring professional broadcast infrastructure, interactive engagement platforms, and dedicated hybrid event management protocols.",
    relatedService: { label: "Conference Management", href: "/services/conferences" },
  },
  {
    term: "Rigging",
    definition: "The specialized equipment and certified techniques used to safely suspend lighting fixtures, audio speakers, LED screens, and scenic elements above an event space using truss structures and motor systems. Rigging must be designed by a licensed structural engineer in Saudi Arabia and comply with GEA safety regulations for public events.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "Truss",
    definition: "A framework of aluminum or steel box beams connected by diagonal bracing, used in event production to support lighting rigs, LED screens, audio speaker arrays, and scenic elements. Heavy-duty ground-support truss systems are the structural skeleton of corporate stages, wedding structures, and concert rigs across Saudi Arabia.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "B2B Matchmaking",
    definition: "A structured networking process at corporate conferences and exhibitions where businesses are paired with potential partners or clients based on pre-stated business objectives. Facilitated through AI-driven event apps and dedicated meeting rooms, B2B matchmaking is a core feature of major Saudi trade shows and MICE events.",
    relatedService: { label: "Exhibitions & Trade Shows", href: "/services/exhibitions" },
  },
  {
    term: "Line Array",
    definition: "A professional sound reinforcement system in which multiple speaker cabinets are rigged vertically and angled to distribute audio evenly across large audiences. Brands such as L-Acoustics and d&b audiotechnik are the industry-standard line array systems used by Saudi Event Management for concerts, galas, and large conference productions.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "Rider",
    definition: "A contractual addendum set by a performing artist specifying their technical, hospitality, and logistical requirements for a performance. Technical riders cover sound and lighting specifications; hospitality riders cover catering, accommodation, and security requirements. In Saudi VIP events, international artists regularly present complex riders that the event management team must fulfill.",
    relatedService: { label: "Luxury & VIP Events", href: "/services/luxury-vip-events" },
  },
  {
    term: "Destination Event",
    definition: "An event deliberately held in a geographically significant or exceptional location to leverage the destination's prestige, scenery, or cultural significance as part of the event experience. Saudi Arabia's premier destination event locations are AlUla (UNESCO heritage), NEOM (futuristic giga-project), the Red Sea coast, and Diriyah (birthplace of the Saudi state).",
    relatedService: { label: "Destination Events", href: "/services/destination-events" },
  },
  {
    term: "Incentive Travel",
    definition: "A performance-based reward programme in which high-achieving employees or clients are offered an exclusive travel and event experience as recognition. Saudi Arabia is an increasingly popular incentive travel destination, with AlUla heritage experiences, Red Sea yacht events, and luxury resort buyouts at Habitas AlUla and Banyan Tree AlUla.",
    relatedService: { label: "Luxury & VIP Events", href: "/services/luxury-vip-events" },
  },
  {
    term: "Stage Plot",
    definition: "A technical diagram provided to the event production team showing the precise layout of stage elements — speaker positions, instrument placements, microphone stands, risers, and monitor positions — required by a performer. Saudi Event Management's technical directors review all stage plots to ensure seamless integration with venue acoustics and sight-lines.",
    relatedService: { label: "Event Production", href: "/services/event-production" },
  },
  {
    term: "IAPCO (International Association of Professional Congress Organizers)",
    definition: "The globally recognized quality standard for Professional Conference Organizers (PCOs). IAPCO-aligned companies demonstrate excellence in conference planning standards, ethics, and operational capability. Saudi Event Management operates in alignment with IAPCO standards, serving as a trusted PCO for government entities, international associations, and major corporations across Saudi Arabia.",
    relatedService: { label: "Conference Management", href: "/services/conferences" },
  },
  {
    term: "Bleisure",
    definition: "A portmanteau of 'business' and 'leisure' — the trend of combining business travel with leisure activities before, during, or after a professional event. Saudi Arabia's expanding destination portfolio (AlUla, Red Sea, Diriyah) has accelerated bleisure tourism significantly, with MICE visitors extending conference trips to experience the Kingdom's world-class heritage and luxury sites.",
    relatedService: { label: "Destination Events", href: "/services/destination-events" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://saudieventmanagement.com/glossary",
      "name": "Saudi Event Industry Glossary & Terminology",
      "description": "The definitive A-Z glossary of luxury event management, MICE, technical production, and cultural terminology in Saudi Arabia.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
          { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://saudieventmanagement.com/glossary" },
        ],
      },
    },
    {
      "@type": "DefinedTermSet",
      "@id": "https://saudieventmanagement.com/glossary#termset",
      "name": "Saudi Event Management Glossary",
      "description": "Definitions of event management, MICE, production, and cultural terms used in the Saudi Arabia events industry.",
      "hasDefinedTerm": glossaryTerms.map((item) => ({
        "@type": "DefinedTerm",
        "name": item.term,
        "description": item.definition,
        "inDefinedTermSet": "https://saudieventmanagement.com/glossary#termset",
      })),
    },
  ],
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
        <Navbar darkHero={false} />

        {/* Header Section */}
        <section className="bg-ink-950 py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-30 bg-cover bg-center" />
          <div className="absolute inset-0 bg-ink-950/60" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full mb-8">
              <BookOpen size={16} className="text-gold-400" />
              <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Knowledge Base</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">
              Saudi Event <span className="text-gold-400">Glossary</span>
            </h1>
            <p className="text-sand-300 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
              Master the language of luxury event planning, technical production, and the rapidly expanding MICE industry in the Kingdom of Saudi Arabia.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <div className="bg-white border-b border-slate-200 py-5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 text-center">
            <div><span className="font-bold text-slate-900 text-xl">{glossaryTerms.length}</span><p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Terms Defined</p></div>
            <div><span className="font-bold text-slate-900 text-xl">5</span><p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Categories</p></div>
            <div><span className="font-bold text-slate-900 text-xl">EN + AR</span><p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">Bilingual</p></div>
          </div>
        </div>

        {/* Dictionary Grid */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryTerms.map((item, index) => (
              <div key={index} className="bg-white p-8 border border-slate-200 rounded-sm shadow-sm hover:shadow-md hover:border-gold-400/50 transition-all flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-lg font-display font-bold text-ink-950 leading-tight">{item.term}</h2>
                  {item.termAr && (
                    <span className="text-slate-400 text-sm font-light shrink-0" dir="rtl">{item.termAr}</span>
                  )}
                </div>
                <div className="w-8 h-px bg-gold-400 mb-4" />
                <p className="text-slate-600 text-sm leading-relaxed font-light flex-1">{item.definition}</p>
                {item.relatedService && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link
                      href={item.relatedService.href}
                      className="inline-flex items-center gap-1.5 text-[var(--primary)] text-xs font-bold hover:underline"
                    >
                      → Related: {item.relatedService.label}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display font-bold text-ink-950 mb-6 text-2xl md:text-3xl uppercase tracking-tight">
              Speak to the <span className="text-gold-600">Experts</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base mb-10">
              Need a team that understands the complex logistics and technical requirements of a world-class event?
            </p>
            <Link href="/contact" className="inline-flex px-8 py-4 bg-ink-950 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-ink-950 transition-all duration-300">
              Contact Saudi Event Management
            </Link>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
}
