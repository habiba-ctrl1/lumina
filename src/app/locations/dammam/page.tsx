import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Building2, Briefcase, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: 'Luxury Event Management Dammam & Al-Khobar | Eastern Province Events',
  description: 'The premier luxury event planner in Dammam and the Eastern Province. Specializing in elite corporate galas, Aramco-tier celebrations, and grand coastal weddings.',
  keywords: 'event management Dammam, Al-Khobar events, Eastern Province weddings, Aramco events, Dhahran event planning, Gulf coastal events',
};

export default function DammamPage() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_vip_party.png" 
            alt="Luxury Event Management Dammam - Eastern Province Skyline" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2653]/80 via-[#1e2653]/60 to-[#1e2653]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-gold-500 text-xs uppercase tracking-[0.4em] font-bold mb-4 block">
            The Eastern Province Gateway to Luxury | Dammam
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans text-white mb-6 leading-tight font-bold">
            Elite Corporate & <br/><span className="hero-subtitle-shimmer font-semibold uppercase tracking-widest text-xl md:text-2xl">Coastal Celebrations</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8">
            From <span className="text-white font-medium">Aramco-tier</span> corporate summits to spectacular family weddings along the shimmering <span className="text-white font-medium">Arabian Gulf coast</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="px-10 py-4 bg-white text-[#1e2653] font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-all shadow-lg"
            >
              Request a Proposal
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* City Landmarks & Expertise */}
      <section className="py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4 block">Eastern Province Venues</span>
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-8 font-bold">Gulf Coast Sophistication, <span className="text-shimmer">Unmatched Logistics</span></h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
              Dammam and Al-Khobar represent the industrial and coastal heart of the Kingdom. We specialize in managing complex logistics for large-scale corporate events and the region&apos;s most prestigious family celebrations, ensuring every detail reflects the high standards of the Eastern Province.
            </p>
            <ul className="space-y-4">
              {[
                "Strategic partnerships with top-tier hotels in Dammam and Al-Khobar",
                "Specialized event management for major industrial and energy entities",
                "Coastal wedding specialists for Gulf waterfront celebrations",
                "Full-service logistics for cross-region VIP guest management"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Star size={16} className="text-gold-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
            <Image src="/gallery_vip_party.png" alt="Dammam Coastal Event" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="glass p-6 rounded-2xl">
                 <p className="text-white text-sm font-light ">&quot;Excellence on the Arabian Gulf.&quot;</p>
               </div>
            </div>
          </div>
        </div>

        {/* Dammam Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: "Guest Capacity", val: "100–800" },
            { label: "Peak Season", val: "Nov–Mar" },
            { label: "Corporate Galas", val: "80+" },
            { label: "Coastal Venues", val: "25+" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-sans font-bold text-white mb-2">{stat.val}</div>
              <div className="text-xs uppercase tracking-widest text-gold-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services for Dammam */}
      <section className="py-24 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">Signature Eastern <span className="hero-subtitle-shimmer">Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">Custom solutions for the region&apos;s dynamic corporate and family landscape.</p>
            <h2 className="text-2xl md:text-3xl font-sans text-white mb-6 font-bold">Signature Eastern <span className="hero-subtitle-shimmer">Services</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Custom solutions for the region&apos;s dynamic corporate and family landscape.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: Briefcase, title: "Aramco-Tier Summits", desc: "Setting the standard for executive conferences and high-profile corporate galas." },
               { icon: Building2, title: "Coastal Family Weddings", desc: "Spectacular celebrations set against the backdrop of the Arabian Gulf." },
               { icon: MapPin, title: "Dhahran Private Events", desc: "Bespoke management for exclusive private gatherings in the Dhahran community." }
             ].map((service, i) => (
               <div key={i} className="bg-[#1e2653] border border-white/10 p-10 rounded-3xl hover:border-gold-500/30 transition-all">
                 <service.icon size={32} className="text-gold-500 mb-6" />
                 <h3 className="text-xl font-sans font-bold text-white mb-4">{service.title}</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Strategic Venue Partnerships */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-sans text-white mb-6 font-bold">Eastern Province <span className="hero-subtitle-shimmer">Partnerships</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light">Exclusive access to the region&apos;s most prestigious hotels and coastal venues.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "InterContinental Dammam",
              "Hilton Al-Khobar",
              "Coral Beach Resort",
              "Sheraton Dammam",
              "Mövenpick Al Khobar",
              "Kempinski Al Othman",
              "Dhahran Expo Center",
              "Sunset Beach Resort"
            ].map((venue, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
                <span className="text-white text-sm font-light">{venue}</span>
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
