import Navbar from "@/components/Navbar";
import CaseStudySchema from "@/components/CaseStudySchema";
import { hreflangAlternates } from "@/lib/seo";
import Footer from "@/components/Footer";
import CaseStudyCTA from "@/components/CaseStudyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Moon, Star, MapPin, Users } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Makkah VIP Retreat Case Study',
    description: 'Bespoke event management for spiritual and high-profile retreats in the Holy City of Makkah.',
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/portfolio/makkah-vip-retreat`,
      languages: hreflangAlternates("/portfolio/makkah-vip-retreat"),
    },
  };
}

export default function MakkahVipRetreat() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />
      <CaseStudySchema slug="makkah-vip-retreat" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/portfolio/makkah-vip-retreat.webp"
            alt="Makkah VIP Retreat — private luxury retreat event management in Makkah, Saudi Arabia"
            fill
            sizes="100vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-neutral-900 transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-neutral-900 text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block bg-[var(--primary)]/10 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-[var(--primary)]/20">
            Private Spiritual Retreat
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-neutral-900 mb-8 leading-tight uppercase tracking-tight">
            Makkah <span className="text-[var(--primary)] ">VIP Retreat</span>
          </h1>
          <p className="text-neutral-500 text-lg font-light max-w-2xl mx-auto">A sanctuary of serenity and absolute luxury for distinguished guests during the holy month.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white border-y border-neutral-200/80 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: Moon, label: "Duration", val: "10 Days" },
            { icon: Star, label: "Service", val: "Ultra-Luxury" },
            { icon: Users, label: "Guests", val: "VIP Delegation" },
            { icon: MapPin, label: "Venue", val: "Exclusive Villa" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-neutral-900 uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-neutral-600 font-light text-base leading-relaxed space-y-24">
        
        {/* The Brief */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">The <span className="text-[var(--primary)] ">Vision</span></h2>
            <p className="mb-8">
              Our client required a completely private, highly secure, and spiritually resonant environment for a high-profile delegation visiting Makkah. The objective was to blend the sanctity of the location with the world-class hospitality and logistical precision of a five-star international retreat.
            </p>
            <p>
              Every detail, from the scent of the linens to the timing of the private transport, had to be orchestrated with surgical precision to allow guests to focus entirely on their spiritual journey.
            </p>
          </div>
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_1.webp" alt="Makkah Retreat Interior" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Execution */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-10 uppercase tracking-tight text-center">Masterful <span className="text-[var(--primary)] ">Execution</span></h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Privacy & Security", desc: "Implemented a multi-tier security protocol with discreet personnel and advanced surveillance." },
              { title: "Bespoke Dining", desc: "Private chefs providing customized menu rotations focusing on local heritage and international nutrition." },
              { title: "Logistical Flow", desc: "Seamless private transport to and from the Haram with zero-wait protocols." }
            ].map((item: any, i: number) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-200/80">
                <h3 className="text-neutral-900 text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[var(--primary)]" /> {item.title}
                </h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-neutral-900 text-white p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 end-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-sans font-bold mb-8 uppercase tracking-tight">The <span className="text-[var(--primary)] ">Result</span></h2>
            <p className="text-neutral-300 text-lg mb-12 max-w-3xl font-light">
              The retreat was described by the delegation as the most seamless and spiritually enriching experience they had encountered. Saudi Event Management handled every complexity, allowing the guests to experience Makkah with unprecedented peace and luxury.
            </p>
            <div className="flex items-center gap-10 border-t border-white/10 pt-10">
              <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                <Star className="text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest ">"Unmatched attention to detail in the holiest of cities."</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">— Chief of Protocol</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-xs font-bold text-neutral-500 mb-6 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Luxury &amp; VIP Events
            </Link>
            <Link href="/services/cultural-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Cultural &amp; Heritage Events
            </Link>
            <Link href="/services/destination-events" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Destination Event Management
            </Link>
            <Link href="/locations/makkah" className="px-5 py-2.5 bg-white border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-700 hover:border-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors">
              Events in Holy Cities
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-8 uppercase tracking-tight">Plan Your <span className="text-[var(--primary)] ">Elite Experience</span></h2>
        <Link
          href="/contact"
          className="inline-block px-12 py-6 bg-neutral-900 text-white font-bold uppercase tracking-[0.2em] hover:bg-[var(--primary)] transition-all rounded-xl shadow-2xl text-xs"
        >
          Request Private Consultation
        </Link>
      </section>

      <CaseStudyCTA slug="makkah-vip-retreat" />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
