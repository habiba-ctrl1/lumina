import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Crown, Star, Music } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Grand Wedding Ceremony Case Study | Saudi Event Management",
    description: "Traditional Saudi grand wedding ceremony for 600+ guests — VIP Zaffa entrance protocol, palatial ballroom production, and full-service luxury coordination by Saudi Event Management.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/grand-wedding-ceremony`,
      languages: { "en-US": `${base}/portfolio/grand-wedding-ceremony`, "ar-SA": `${base}/ar/portfolio/grand-wedding-ceremony` },
    },
  };
}

export default function GrandWeddingCeremony() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/wedding_hall_grand_entrance.webp"
            alt="Grand Wedding Ceremony"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-primary hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-black text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-primary/5 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-primary/20">
            Royal Wedding Ceremony
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Grand <span className="text-primary">Wedding Ceremony</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
            A full-scale traditional Saudi wedding for 600+ guests — from the ceremonial Zaffa procession to the grand ballroom reveal, every detail orchestrated with royal precision.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Users, label: "Guests", val: "600+" },
            { icon: Crown, label: "Commission", val: "Private Royal" },
            { icon: Music, label: "Zaffa", val: "Live Ensemble" },
            { icon: Star, label: "Protocol", val: "VIP Entrance" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-black uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 font-light text-base leading-relaxed space-y-24">

        {/* Concept */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src="/gallery_wedding_reception.webp" alt="Grand ballroom wedding setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
              The <span className="text-primary">Tradition</span>
            </h2>
            <p className="mb-8">
              A prominent royal family commissioned Saudi Event Management to produce a multi-day wedding that honoured the full richness of Saudi ceremonial traditions — from the Milkah signing to the grand mixed reception — while meeting the expectations of international guests unfamiliar with local customs.
            </p>
            <p>
              The venue was a premier Riyadh ballroom transformed over five days into a palace of white marble, gold lanterns, and 40,000 individually-placed white roses. A dedicated cultural liaison team guided each international guest through every ceremony element.
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight">
            Royal <span className="text-primary">Production</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Ceremonial Zaffa", desc: "A 24-piece live Zaffa ensemble with Saudi drummers, swordsmen, and fragrance bearers led the groom's procession." },
              { title: "Floral Architecture", desc: "40,000 white roses woven into custom arches, table centrepieces, and a 10-metre ceremonial aisle canopy." },
              { title: "VIP Guest Management", desc: "A dedicated concierge for each VIP family, managing seating, dietary requirements, and private family suites." },
              { title: "Film & Photography", desc: "A four-team cinematic crew documenting every ceremony in parallel — one per venue zone — for a full 4K wedding film." },
            ].map((item, i) => (
              <div key={i} className="flex gap-10 p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                  <CheckCircle2 size={24} className="text-primary group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-black text-xs font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-gray-900 text-white p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src="/wedding_hall_grand_entrance.webp" alt="Grand wedding" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              The <span className="text-primary">Legacy</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The family described the event as "a memory that will live for generations." The ceremonial film was later screened at a private family reunion of over 200 members. Saudi Event Management was retained immediately for the next family occasion.
            </p>
            <div className="inline-block px-8 py-4 border border-primary/30 rounded-full">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Traditional VIP Entrance Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
          Plan Your <span className="text-primary">Grand Celebration</span>
        </h2>
        <Link
          href="/services/weddings"
          className="inline-block px-12 py-6 bg-primary text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl shadow-2xl text-xs"
        >
          Explore Wedding Services
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
