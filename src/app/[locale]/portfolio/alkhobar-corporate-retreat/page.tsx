import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Target, Layers, Award } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Al Khobar Corporate Retreat Case Study | Saudi Event Management",
    description: "Executive team-building retreat for a Saudi Aramco subsidiary in Al Khobar — 120 senior leaders, immersive branding, and strategic engagement managed by Saudi Event Management.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/alkhobar-corporate-retreat`,
      languages: { "en-US": `${base}/portfolio/alkhobar-corporate-retreat`, "ar-SA": `${base}/ar/portfolio/alkhobar-corporate-retreat` },
    },
  };
}

export default function AlkhobarCorporateRetreat() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"
            alt="Al Khobar Corporate Retreat"
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
            Corporate Retreat
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Al Khobar <span className="text-primary">Corporate Retreat</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
            A three-day executive retreat for 120 senior leaders of a Saudi Aramco subsidiary — purpose-built to strengthen culture, align strategy, and celebrate talent.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Users, label: "Leaders", val: "120 Executives" },
            { icon: Target, label: "Focus", val: "Team Building" },
            { icon: Layers, label: "Format", val: "3-Day Retreat" },
            { icon: Award, label: "Result", val: "Brand Activation" },
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
              <Image src="/gallery_corporate_gala.webp" alt="Corporate retreat activities" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
              The <span className="text-primary">Mandate</span>
            </h2>
            <p className="mb-8">
              Following a major corporate restructuring, the subsidiary's CHRO needed an event that would re-anchor 120 senior leaders around a unified brand vision and reset the cultural compass of the organisation. The retreat was held at a private resort on the Eastern Province coast, with a strict no-device policy during all facilitated sessions.
            </p>
            <p>
              Saudi Event Management designed a programme blending high-impact keynotes with experiential team challenges drawn from Saudi heritage — falconry strategy simulations, desert navigation challenges, and a Majlis-style leadership forum.
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight">
            Strategic <span className="text-primary">Programme</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Leadership Forum", desc: "A moderated Majlis-style dialogue between the CEO and all 120 leaders in an intimate circular setting." },
              { title: "Heritage Challenges", desc: "Falconry-based strategy sessions and coastal navigation challenges reinforcing cross-functional collaboration." },
              { title: "Brand Activation Wall", desc: "An interactive installation where each leader contributed their vision — physically assembled into a 6-metre brand mural." },
              { title: "Gala Recognition Dinner", desc: "A black-tie awards dinner celebrating top performers, with a bespoke trophy crafted from reclaimed Eastern Province materials." },
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
            <Image src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000" alt="Corporate retreat" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              The <span className="text-primary">Impact</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              A post-retreat internal survey recorded a 34-point rise in team cohesion scores. The CHRO reported that the brand activation mural now hangs in the company's Dhahran headquarters, serving as a daily reminder of the collective vision set at the retreat.
            </p>
            <div className="inline-block px-8 py-4 border border-primary/30 rounded-full">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Executive Team Building & Branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/corporate-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Corporate Event Management
            </Link>
            <Link href="/services/conferences" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Conference Management
            </Link>
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/locations/dammam" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Corporate Events in Dammam
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
          Design Your <span className="text-primary">Corporate Retreat</span>
        </h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-primary text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl shadow-2xl text-xs"
        >
          Explore Corporate Events
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
