import Navbar from "@/components/Navbar";
import CaseStudySchema from "@/components/CaseStudySchema";
import { caseStudyMetadata } from "@/lib/case-studies";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Crown, Star, Music } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return caseStudyMetadata("grand-wedding-ceremony", locale);
}

export default function GrandWeddingCeremony() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="grand-wedding-ceremony" />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('/wedding_hall_grand_entrance.webp')" }}>
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold"
          >
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/5 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            Royal Wedding Ceremony
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            Grand <span className="text-[var(--primary)]">Wedding Ceremony</span>
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">
            A full-scale traditional Saudi wedding for 600+ guests — from the ceremonial Zaffa procession to the grand ballroom reveal, every detail orchestrated with royal precision.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-white border border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Users, label: "Guests", val: "600+" },
            { icon: Crown, label: "Commission", val: "Private Royal" },
            { icon: Music, label: "Zaffa", val: "Live Ensemble" },
            { icon: Star, label: "Protocol", val: "VIP Entrance" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-base leading-relaxed space-y-24">

        {/* Concept */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src="/gallery_wedding_reception.webp" alt="Grand ballroom wedding setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
              The <span className="text-[var(--primary)]">Tradition</span>
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
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight">
            Royal <span className="text-[var(--primary)]">Production</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Ceremonial Zaffa", desc: "A 24-piece live Zaffa ensemble with Saudi drummers, swordsmen, and fragrance bearers led the groom's procession." },
              { title: "Floral Architecture", desc: "40,000 white roses woven into custom arches, table centrepieces, and a 10-metre ceremonial aisle canopy." },
              { title: "VIP Guest Management", desc: "A dedicated concierge for each VIP family, managing seating, dietary requirements, and private family suites." },
              { title: "Film & Photography", desc: "A four-team cinematic crew documenting every ceremony in parallel — one per venue zone — for a full 4K wedding film." },
            ].map((item, i) => (
              <div key={i} className="flex gap-10 p-8 bg-white rounded-3xl border border-neutral-200/80 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] transition-colors">
                  <CheckCircle2 size={24} className="text-[var(--primary)] group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-neutral-900 text-xs font-bold uppercase tracking-widest mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-neutral-900 text-white p-12 md:p-24 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src="/wedding_hall_grand_entrance.webp" alt="Grand wedding" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              The <span className="text-[var(--primary)]">Legacy</span>
            </h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The family described the event as "a memory that will live for generations." The ceremonial film was later screened at a private family reunion of over 200 members. Saudi Event Management was retained immediately for the next family occasion.
            </p>
            <div className="inline-block px-8 py-4 border border-[var(--primary)]/30 rounded-full">
              <span className="text-[var(--primary)] text-xs font-bold uppercase tracking-[0.3em]">Traditional VIP Entrance Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/weddings" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Luxury Wedding Planning
            </Link>
            <Link href="/services/royal-weddings" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Royal Weddings &amp; Ceremonies
            </Link>
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/locations/riyadh" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Weddings in Riyadh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">
          Plan Your <span className="text-[var(--primary)]">Grand Celebration</span>
        </h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-[var(--primary)] text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-all rounded-xl shadow-2xl text-xs"
        >
          Explore Wedding Services
        </Link>
      </section>

      <CaseStudyCTA slug="grand-wedding-ceremony" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
