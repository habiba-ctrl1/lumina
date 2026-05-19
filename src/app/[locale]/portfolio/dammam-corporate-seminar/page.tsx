import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Briefcase, BarChart, ShieldCheck, Factory } from "lucide-react";

export const metadata = {
  title: 'Dammam Corporate Seminar',
  description: 'Executing a massive industrial and corporate seminar in Dammam, the heart of Saudi industry, by Saudi Event Management.',
  alternates: { canonical: 'https://saudieventmanagement.com/portfolio/dammam-corporate-seminar' },
};

export default function DammamCorporateSeminar() {
  return (
    <main className="min-h-screen bg-white overflow-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Dammam Corporate Seminar" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
            <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block bg-white/10 backdrop-blur-md inline-block px-6 py-2 rounded-full border border-white/20">
            Industrial & Energy Sector
          </span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 leading-tight uppercase tracking-tight">
            Dammam <span className="text-primary italic">Corporate</span> Seminar
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">Connecting global energy giants in the heart of the Eastern Province. A masterpiece of logistical and industrial coordination.</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white border-y border-gray-100 relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl rounded-[3rem] shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {[
            { icon: Factory, label: "Focus", val: "Energy Sector" },
            { icon: Briefcase, label: "Guests", val: "800+ Executives" },
            { icon: BarChart, label: "Engagement", val: "High Impact" },
            { icon: ShieldCheck, label: "Protocol", val: "Strict Safety" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">{stat.label}</div>
              <div className="text-sm font-sans font-bold text-black uppercase">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 font-light text-base leading-relaxed space-y-24">
        
        {/* Industrial Precision */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Industrial <span className="text-primary italic">Precision</span></h2>
            <p className="mb-6">
              Dammam is the industrial powerhouse of the Kingdom. For this corporate seminar, we were required to deliver an event that reflected the efficiency and scale of the energy sector. This involved managing large-scale attendance, complex AV requirements for technical presentations, and high-security protocol for international stakeholders.
            </p>
            <p>
              We transformed a blank-slate exhibition hall into a futuristic seminar environment, featuring tiered seating for 800 guests and 4k resolution screens that spanned the entire width of the venue.
            </p>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/gallery_corporate_gala.webp" alt="Industrial Seminar Stage" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Operational Excellence */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Flow Management", desc: "Coordinated shuttle systems and registration for hundreds of guests arriving from multiple international flights." },
            { title: "Technical Integration", desc: "Live translation services for 6 languages and instant polling technology for real-time audience engagement." },
            { title: "Catering Logsitics", desc: "High-volume, high-quality catering that met strict dietary and timing requirements of the energy industry." },
            { title: "Post-Event Reporting", desc: "Detailed engagement analytics and feedback reports delivered to the client within 24 hours." }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 flex gap-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-black text-[10px] font-bold uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="bg-primary text-white p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8 uppercase tracking-tight">Fueling <span className="italic">Connections</span></h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            The seminar was hailed as the premier networking event for the region's energy sector. Our ability to handle industrial-scale requirements with boutique-level attention to detail was cited as the key differentiator.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-black mb-8 uppercase tracking-tight">Scale Your <span className="text-primary italic">Industrial Presence</span></h2>
        <Link 
          href="/#contact" 
          className="inline-block px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all rounded-xl shadow-2xl text-xs"
        >
          Contact Our Industrial Events Team
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
