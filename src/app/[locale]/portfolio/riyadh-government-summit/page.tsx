import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mic, Users, Monitor, Shield } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Riyadh Government Summit Case Study | Saudi Event Management",
    description: "Large-scale government summit in Riyadh for 1,200+ delegates — immersive multi-screen production, VIP protocol, and end-to-end technical management by Saudi Event Management.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/riyadh-government-summit`,
      languages: { "en-US": `${base}/portfolio/riyadh-government-summit`, "ar-SA": `${base}/ar/portfolio/riyadh-government-summit` },
    },
  };
}

export default function RiyadhGovernmentSummit() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/riyadh_summit_people.webp"
            alt="Riyadh Government Summit"
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
            Government Conference
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Riyadh <span className="text-primary">Government Summit</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
            A high-stakes ministerial conference uniting 1,200+ delegates under one immersive production framework — broadcast-quality staging, real-time translation, and seamless VIP protocol.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Users, label: "Delegates", val: "1,200+" },
            { icon: Monitor, label: "Production", val: "Multi-Screen" },
            { icon: Mic, label: "Speakers", val: "40 Ministers" },
            { icon: Shield, label: "Security", val: "VIP Protocol" },
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
              <Image src="/gallery_corporate_gala.webp" alt="Summit production setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
              The <span className="text-primary">Brief</span>
            </h2>
            <p className="mb-8">
              A premier government ministry commissioned Saudi Event Management to deliver a national-level summit at KAFD, Riyadh, with a mandate for broadcast-quality production. Over 40 senior officials and 1,200 delegates required seamless logistics, simultaneous Arabic-English translation, and a visual identity befitting the Kingdom's Vision 2030 agenda.
            </p>
            <p>
              The challenge was uniting three breakout halls and one plenary arena under a single integrated AV network — live-switched in real time — while maintaining a blackout protocol for classified sessions.
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight">
            Precision <span className="text-primary">Execution</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "LED Volume Stage", desc: "A 24-metre curved LED wall created a seamless panoramic backdrop across the plenary hall." },
              { title: "Real-Time Translation", desc: "Simultaneous Arabic–English interpretation booths serving all 1,200 delegate seats." },
              { title: "VIP Motorcade Coordination", desc: "A dedicated protocol team managed dignitary arrivals and departures with zero media exposure." },
              { title: "Broadcast & Streaming", desc: "A live production crew of 30 managed multi-camera feeds distributed to overflow rooms and a secured live stream." },
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
            <Image src="/riyadh_summit_people.webp" alt="Summit" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              The <span className="text-primary">Outcome</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The summit concluded with four ministerial declarations signed on-stage and drew positive coverage across regional media. Zero technical incidents were recorded across 14 hours of live production.
            </p>
            <div className="inline-block px-8 py-4 border border-primary/30 rounded-full">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Zero-Incident Large-Scale Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
          Plan Your <span className="text-primary">Next Summit</span>
        </h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-primary text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl shadow-2xl text-xs"
        >
          Request a Conference Proposal
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
