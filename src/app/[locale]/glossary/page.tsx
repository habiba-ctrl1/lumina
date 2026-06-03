import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: 'Saudi Event Industry Glossary & Terminology',
  description: 'The definitive glossary of luxury event management, technical production, and cultural terminology in Saudi Arabia. Master the language of the MICE industry.',
  keywords: 'Saudi event glossary, MICE terminology, GEA permits, Zaffah meaning, event production terms KSA',
  alternates: { canonical: 'https://saudieventmanagement.com/glossary' },
};

const glossaryTerms = [
  {
    term: "MICE",
    definition: "An acronym for Meetings, Incentives, Conferences, and Exhibitions. A specialized niche of group tourism dedicated to planning, booking, and facilitating conferences, seminars, and other events. Saudi Arabia is rapidly becoming a global MICE hub under Vision 2030."
  },
  {
    term: "GEA (General Entertainment Authority)",
    definition: "The government body in Saudi Arabia responsible for the development and regulation of the entertainment sector. Event organizers must obtain GEA permits to host public events, concerts, and festivals in the Kingdom."
  },
  {
    term: "Zaffah (الزفة)",
    definition: "The traditional musical procession of the bride and groom in an Arab wedding. In Saudi luxury weddings, the Zaffah often features renowned regional singers, specialized lighting choreography, and grand entrances."
  },
  {
    term: "Kosha (الكوشة)",
    definition: "The elevated seating area or stage where the bride and groom sit during a wedding reception. In modern Saudi weddings, the Kosha is often a multi-million riyal architectural structure featuring immersive floral designs and LED screens."
  },
  {
    term: "Riyadh Season",
    definition: "An annual state-funded entertainment and sports festival part of the larger Saudi Seasons initiative. It runs from October to March and features massive international events, creating high demand for technical event production."
  },
  {
    term: "Projection Mapping",
    definition: "A projection technology used to turn objects, often irregularly shaped, into a display surface for video projection. Widely used in Saudi destination events (e.g., projecting onto the mountains of AlUla) to create immersive environments without altering heritage sites."
  },
  {
    term: "Rigging",
    definition: "The specialized equipment and techniques used to safely suspend lighting, audio, video, and scenic elements above an event space. Crucial for the large-scale structural builds typical of Saudi VIP events."
  },
  {
    term: "Truss",
    definition: "A framework, typically consisting of aluminum beams, used in event production to support lighting, screens, and audio equipment. Heavy-duty trussing is the skeleton of high-end corporate stages and wedding structures."
  },
  {
    term: "B2B Matchmaking",
    definition: "A structured networking process at corporate conferences where businesses are paired together based on mutual interests. Often facilitated by AI-driven event apps during major Saudi exhibitions."
  },
  {
    term: "Rider",
    definition: "A list of requests or demands set by a performer as criteria for a performance. In VIP events, international artists often have extensive technical and hospitality riders that the event management team must fulfill."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://saudieventmanagement.com/glossary",
      "name": "Saudi Event Industry Glossary & Terminology",
      "description": "The definitive glossary of event management terminology in Saudi Arabia."
    },
    ...glossaryTerms.map((item: any) => ({
      "@type": "DefinedTerm",
      "name": item.term,
      "description": item.definition,
      "inDefinedTermSet": "https://saudieventmanagement.com/glossary"
    }))
  ]
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

        {/* Dictionary Grid */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {glossaryTerms.map((item: any, index: number) => (
              <div key={index} className="bg-white p-8 border border-slate-200 rounded-sm shadow-sm hover:shadow-md hover:border-gold-400/50 transition-all">
                <h2 className="text-xl font-display font-bold text-ink-950 mb-4">{item.term}</h2>
                <div className="w-8 h-px bg-gold-400 mb-4" />
                <p className="text-slate-600 text-sm leading-relaxed font-light">{item.definition}</p>
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
