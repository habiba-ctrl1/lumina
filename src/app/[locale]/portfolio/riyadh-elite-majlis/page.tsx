import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Shield, Users, Coffee, Home } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Riyadh Elite Majlis Case Study',
    description: 'Exquisite Majlis gathering in Riyadh, showcasing Najdi heritage with ultra-modern luxury.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/riyadh-elite-majlis`,
      languages: { "en-US": `${base}/portfolio/riyadh-elite-majlis`, "ar-SA": `${base}/ar/portfolio/riyadh-elite-majlis` },
    },
  };
}

export default function RiyadhEliteMajlis() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Riyadh Elite Majlis" 
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white to-white" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-primary hover:text-black transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-black text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-primary/5 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-primary/20">
            Corporate Cultural Engagement
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-black mb-8 leading-tight uppercase tracking-tight">
            Riyadh <span className="text-primary ">Elite Majlis</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">Where tradition meets the boardroom. An exclusive environment for high-stakes networking and cultural exchange.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 md:py-20 bg-white border border-slate-200 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Home, label: "Setting", val: "Private Palace" },
            { icon: Users, label: "Capacity", val: "50 VVIPs" },
            { icon: Coffee, label: "Catering", val: "Heritage Fusion" },
            { icon: Shield, label: "Privacy", val: "Total Blackout" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-black uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 font-light text-base leading-relaxed space-y-24">
        
        {/* The Concept */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src="/gallery_corporate_gala.webp" alt="Majlis Setup" width={600} height={800} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">The <span className="text-primary ">Concept</span></h2>
            <p className="mb-8">
              The Majlis is the heartbeat of Saudi social and political life. For this project, we were tasked with modernizing the Majlis experience for a group of international CEOs and local ministers. The goal was to maintain the authentic warmth of Saudi hospitality while providing the infrastructure for high-level corporate discussions.
            </p>
            <p>
              We designed a custom-built modular Majlis that could be deployed in a private garden, featuring climate-controlled interiors and integrated discreet technology for presentations.
            </p>
          </div>
        </div>

        {/* The Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-10 uppercase tracking-tight">Impeccable <span className="text-primary ">Detail</span></h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Custom Furnishings", desc: "Hand-crafted Sadu weaving patterns integrated into ergonomic modern seating." },
              { title: "Sensory Branding", desc: "A custom-curated fragrance of Oud and Taif Rose designed specifically for the evening." },
              { title: "Gastronomic Journey", desc: "A 12-course tasting menu reinventing traditional Saudi flavors for a global palate." },
              { title: "Tech Integration", desc: "Hidden LED screens and directional audio that preserved the aesthetic of the space." }
            ].map((item: any, i: number) => (
              <div key={i} className="flex gap-10 p-8 bg-white rounded-3xl border border-slate-200 hover:bg-white hover:shadow-xl transition-all group">
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
        <div className="bg-gray-900 text-white p-12 md:p-24 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src="/hero_bg.webp" alt="Pattern" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-10 uppercase tracking-tight">The <span className="text-primary ">Legacy</span></h2>
            <p className="text-slate-600 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The event resulted in three major cross-border partnerships being signed on-site. The relaxed yet professional atmosphere of the Elite Majlis provided the perfect catalyst for high-trust negotiations.
            </p>
            <div className="inline-block px-8 py-4 border border-primary/30 rounded-full">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Excellence in Cultural Diplomacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/services/corporate-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Corporate Event Management
            </Link>
            <Link href="/services/cultural-events" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Cultural &amp; Heritage Events
            </Link>
            <Link href="/locations/riyadh" className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors">
              Exclusive Events in Riyadh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center bg-[var(--surface-raised)] border-t border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Host Your <span className="text-primary ">Signature Gathering</span></h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-primary text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all rounded-xl shadow-2xl text-xs"
        >
          Inquire About Majlis Services
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
