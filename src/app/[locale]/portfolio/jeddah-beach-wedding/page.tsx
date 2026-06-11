import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Waves, Users, Sunset, Heart } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: "Jeddah Seaside Wedding Case Study | Saudi Event Management",
    description: "Luxury coastal wedding production on the Red Sea in Jeddah — 450 guests, bespoke beachfront design, and full-service luxury coordination by Saudi Event Management.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/jeddah-beach-wedding`,
      languages: { "en-US": `${base}/portfolio/jeddah-beach-wedding`, "ar-SA": `${base}/ar/portfolio/jeddah-beach-wedding` },
    },
  };
}

export default function JeddahBeachWedding() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/jeddah_beach_wedding_setup.webp"
            alt="Jeddah Seaside Wedding"
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
            Luxury Wedding
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Jeddah <span className="text-primary">Seaside Wedding</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
            A breathtaking Red Sea coastal ceremony blending the romance of the Arabian Gulf with world-class luxury production — 450 guests, infinite horizon backdrop.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Users, label: "Guests", val: "450" },
            { icon: Waves, label: "Setting", val: "Red Sea Coast" },
            { icon: Sunset, label: "Duration", val: "3-Day Event" },
            { icon: Heart, label: "Theme", val: "Coastal Luxury" },
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
              <Image src="/gallery_wedding_reception.webp" alt="Beachfront wedding setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
              The <span className="text-primary">Vision</span>
            </h2>
            <p className="mb-8">
              The family commission arrived with a singular vision: a wedding that felt as natural as the sea breeze yet as opulent as any palace ballroom. Saudi Event Management sourced an exclusive private beachfront estate north of Jeddah's Corniche, then engineered a complete transformation — temporary pavilions, floating floral installations, and a sound system that moved with the wind.
            </p>
            <p>
              Every element was designed to disappear at sunrise, leaving no trace on the pristine shoreline — a sustainability commitment that was central to the family's brief.
            </p>
          </div>
        </div>

        {/* Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight">
            Crafted <span className="text-primary">Details</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Floating Floral Arch", desc: "A 14-metre arch of white orchids and Saudi jasmine suspended over the ceremony aisle, anchored in the shallows." },
              { title: "Coastal Gastronomy", desc: "A Red Sea seafood menu curated by a Michelin-recognised chef, served under a custom hand-embroidered tent." },
              { title: "Weather Contingency", desc: "A modular shelter system deployable in under 40 minutes ensured the event ran flawlessly despite an unexpected coastal wind." },
              { title: "Cinematic Documentation", desc: "An underwater drone and aerial cinematography team captured once-in-a-lifetime perspectives of the ceremony." },
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
            <Image src="/jeddah_beach_wedding_setup.webp" alt="Seaside wedding" width={1920} height={1080} className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">
              The <span className="text-primary">Memory</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The three-day celebration was described by the family as "the most beautiful event we have ever attended." Every guest received a hand-crafted coastal keepsake, and the video documentary has since been shared privately among over 2,000 family connections.
            </p>
            <div className="inline-block px-8 py-4 border border-primary/30 rounded-full">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Luxury Red Sea Coastal Production</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/weddings" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury Wedding Planning
            </Link>
            <Link href="/services/destination-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Destination Event Management
            </Link>
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/locations/jeddah" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Weddings in Jeddah
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">
          Plan Your <span className="text-primary">Dream Wedding</span>
        </h2>
        <Link
          href="/contact"
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
