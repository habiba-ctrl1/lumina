import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Trophy, Building2, User, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Events in Riyadh',
  description: 'The premier luxury event planner in Riyadh. From royal weddings near the Kingdom Centre to exclusive corporate galas in historical Diriyah.',
  keywords: 'event management Riyadh, luxury weddings Riyadh, corporate events Riyadh, Kingdom Centre events, Diriyah event planning, Al Faisaliyah Center events',
  alternates: { canonical: 'https://saudieventmanagement.com/locations/riyadh' },
};

export default function RiyadhPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Luxury Event Management Riyadh - Kingdom Centre Skyline" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-10 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/60 to-slate-50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="section-label">
            The Capital of Luxury | Riyadh
          </span>
          <h1 className="font-display font-medium text-slate-900 mb-6 leading-tight text-3xl md:text-5xl">
            Elevating Riyadh&apos;s Most <br/><span className="text-shimmer italic font-semibold">Iconic Celebrations</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            From the soaring heights of the <span className="text-slate-900 font-semibold">Kingdom Centre</span> to the majestic heritage of <span className="text-slate-900 font-semibold">Diriyah</span>, we curate experiences that define the Riyadh skyline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="btn-primary hover:scale-105 transition-all shadow-sm rounded-sm"
            >
              Request a Proposal
            </Link>
            <Link
              href="/portfolio"
              className="btn-outline hover:scale-105 transition-all rounded-sm"
            >
              View Our Riyadh Work
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="section-label">Event Venues Riyadh</span>
            <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">Where Heritage Meets <span className="text-shimmer italic">Modernity</span></h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8">
              Riyadh is a city of grand contrasts. We specialize in transforming the most prestigious locations into bespoke event spaces. Whether it&apos;s a high-profile corporate summit at the <span className="text-slate-950 font-semibold">Al Faisaliyah Center</span> or a private desert oasis gala, our local expertise ensures flawless execution.
            </p>
            <ul className="space-y-4">
              {[
                "Exclusive access to Royal Palaces and Private Estates",
                "Logistics management for grand scales near King Abdullah Financial District (KAFD)",
                "Bespoke decor inspired by Najdi architecture and modern minimalism",
                "World-class catering partnerships with Riyadh's elite chefs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200/80 shadow-md">
            <Image src="/gallery_charity_gala.webp" alt="Kingdom Centre Riyadh Event" width={800} height={1000} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-sm">
                 <p className="text-white text-sm font-display italic font-light">&quot;Creating masterpieces in the heart of the Kingdom.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* Riyadh Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-200/80">
          {[
            { label: "Riyadh Events", val: "150+" },
            { label: "Elite Venues", val: "45+" },
            { label: "Expert Planners", val: "12" },
            { label: "Guest Concierge", val: "24/7" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for Riyadh */}
      <section className="py-24 bg-slate-100/50 border-t border-b border-slate-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-6 text-2xl md:text-3xl font-bold">Signature Riyadh <span className="text-shimmer italic">Services</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Customized event solutions for the capital&apos;s most discerning clientele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Building2, title: "KAFD Corporate Summits", desc: "Professional management for executive conferences and brand launches in the financial district." },
                { icon: Trophy, title: "Diriyah Heritage Galas", desc: "Combining historical majesty with modern luxury for unforgettable evening celebrations." },
                { icon: MapPin, title: "Private Riyadh Villas", desc: "Transforming exclusive residential estates into bespoke party venues with full concierge." }
              ].map((service, i) => (
                <div key={i} className="card p-8 group hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                  <service.icon size={28} className="text-emerald-800 mb-6" />
                  <h3 className="font-display font-medium text-lg text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Local Leadership Section */}
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="section-label">Riyadh Leadership</span>
              <h2 className="font-display font-medium text-slate-900 mb-8 text-2xl md:text-3xl font-bold">The Minds Behind <span className="text-shimmer italic">The Magic</span></h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                Our Riyadh team consists of local experts who understand the cultural nuances and logistical demands of the Saudi capital. Led by industry veterans, we ensure every event is a masterpiece.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: "Fahad Al-Saud", role: "Riyadh Managing Director", desc: "15+ years in KSA luxury events." },
                  { name: "Layla Mansour", role: "Head of Design", desc: "Specializing in Najdi-modern fusion." }
                ].map((member, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-sm shadow-2xs">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-200/80 rounded-full flex items-center justify-center text-emerald-800 shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-medium mb-1 font-display">{member.name}</h3>
                      <p className="text-gold-400 text-[10px] uppercase tracking-wider mb-2 font-semibold">{member.role}</p>
                      <p className="text-slate-500 text-xs font-light">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200/80 shadow-sm">
                  <Image src="/gallery_wedding_reception.webp" alt="Team at work" width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200/80 shadow-sm">
                  <Image src="/gallery_corporate_gala.webp" alt="Event planning" width={600} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 relative rounded-sm overflow-hidden border border-slate-200/80 shadow-sm">
                  <Image src="/gallery_destination_wedding.webp" alt="Venue sourcing" width={600} height={400} className="w-full h-full object-cover" />
                </div>
                <div className="h-64 relative rounded-sm overflow-hidden border border-slate-200/80 shadow-sm">
                  <Image src="/wedding.webp" alt="Riyadh office" width={600} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-24 border-t border-slate-200/20 bg-slate-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-medium text-slate-900 mb-6 text-2xl md:text-3xl font-bold">Strategic Venue <span className="text-shimmer italic">Partnerships</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm">Exclusive access to Riyadh&apos;s most coveted and prestigious locations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "The Ritz-Carlton, Riyadh",
              "Four Seasons Hotel Riyadh",
              "Al Faisaliyah Hotel",
              "Diriyah Gate Development Authority",
              "Kingdom Centre Ballrooms",
              "Tuwaiq Palace",
              "Fairmont Riyadh",
              "KAFD Conference Center"
            ].map((venue, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-slate-200/80 rounded-sm hover:border-gold-400 hover:shadow-sm transition-all shadow-2xs">
                <CheckCircle2 size={18} className="text-emerald-800 shrink-0" />
                <span className="text-slate-800 text-sm font-medium">{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
