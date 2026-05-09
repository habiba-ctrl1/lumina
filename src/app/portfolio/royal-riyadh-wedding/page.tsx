import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: 'Royal Riyadh Wedding Case Study | Saudi Event Management',
  description: 'An inside look into how Saudi Event Management orchestrated a magnificent Royal Wedding in Riyadh, blending tradition with modern luxury.',
};

export default function RoyalRiyadhWeddingCaseStudy() {
  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_wedding_reception.png" 
            alt="Royal Riyadh Wedding" 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653] via-[#1e2653]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-gold-500 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-medium">
            <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-4 block bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/20">
            Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 leading-tight">
            The Royal <span className="text-shimmer font-bold">Riyadh Wedding</span>
          </h1>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white/5 border-y border-white/10 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { icon: MapPin, label: "Location", val: "Diriyah, Riyadh" },
            { icon: Users, label: "Guests", val: "1,200+" },
            { icon: Calendar, label: "Duration", val: "3 Days" },
            { icon: CheckCircle2, label: "Services", val: "Full Production" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-gold-500 mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">{stat.label}</div>
              <div className="text-lg font-sans font-bold text-white">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 font-light text-lg leading-relaxed space-y-16">
        
        {/* The Challenge */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6">The <span className="text-gold-500">Challenge</span></h2>
          <p className="mb-4">
            Our esteemed clients desired a celebration that honored deep-rooted Saudi traditions while introducing avant-garde design elements. The sheer scale of the event—hosting over 1,200 VIP guests, dignitaries, and royalty over a three-day period in historical Diriyah—required meticulous logistical planning, flawless execution, and absolute discretion.
          </p>
          <p>
            The primary challenge was transforming a raw desert expanse into a breathtaking, climate-controlled oasis within a rigorous 14-day build schedule, ensuring no disruption to the surrounding heritage site.
          </p>
        </div>

        {/* The Solution */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6">The <span className="text-gold-500">Solution</span></h2>
            <p className="mb-4">
              Saudi Event Management deployed a team of 400 specialists, including international floral designers, lighting architects, and hospitality experts. We engineered a custom 5,000-square-meter glass marquee that provided panoramic views of the Najdi architecture while maintaining a pristine interior environment.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "Custom glass marquee construction",
                "Over 100,000 imported exotic florals",
                "Kinetic lighting installation",
                "Michelin-star culinary partnerships"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-gold-500 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image src="/locations/riyadh-hero.jpg" alt="Construction and Details" fill className="object-cover" />
          </div>
        </div>

        {/* The Result */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6">The <span className="text-gold-500">Result</span></h2>
          <p className="mb-8">
            The event was widely regarded as a masterpiece of modern luxury, setting a new benchmark for high-society weddings in the Kingdom. Guest satisfaction was unprecedented, and the seamless integration of technology and tradition left a lasting impression.
          </p>
          
          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e2653] px-4 text-gold-500 text-4xl font-serif">&quot;</div>
            <p className="text-xl md:text-2xl font-sans font-bold text-white mb-6 leading-snug">
              &quot;Saudi Event Management did not just plan a wedding; they crafted a legacy. Their attention to detail and unwavering pursuit of perfection allowed us to be fully present in the most important moment of our lives.&quot;
            </p>
            <div className="text-gold-500 font-medium uppercase tracking-widest text-sm">— The Bride & Groom</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white/5 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-6">Envision Your <span className="text-gold-500">Masterpiece</span></h2>
        <Link 
          href="/#contact" 
          className="inline-block px-10 py-4 bg-gold-500 text-[#1e2653] font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          Book a Consultation
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
