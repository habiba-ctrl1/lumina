import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Award, Target, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Strategic Partnerships',
  description: "Join Saudi Arabia's premier event management network. We collaborate with world-class brands and suppliers to deliver extraordinary luxury experiences.",
  alternates: { canonical: 'https://saudieventmanagement.com/partners' },
};

export default function PartnersPage() {
  const tiers = [
    {
      title: "Strategic Partners",
      desc: "High-level collaboration for GIGA projects and national celebrations. We work with government entities and major corporations to shape the future of events in KSA.",
      icon: Award,
      features: ["Joint Venture Opportunities", "National Visibility", "Priority Planning"]
    },
    {
      title: "Elite Suppliers",
      desc: "For the finest service providers in catering, decor, and technology. Our elite vendor network is the backbone of our luxury masterpieces.",
      icon: Target,
      features: ["Access to Royal Events", "Global Quality Standards", "Seamless Logistics"]
    },
    {
      title: "Cultural Collaborators",
      desc: "Bringing Saudi heritage to life. We partner with local artisans and cultural experts to ensure authenticity in every activation.",
      icon: Users,
      features: ["Heritage Preservation", "Authentic Experiences", "Local Talent Growth"]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Strategic Partnerships" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary text-xs uppercase tracking-[0.5em] font-bold mb-6 block">
              Collaborative Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-bold text-black mb-8 leading-[1.1]">
              Defining the Future of <br/>
              <span className="text-primary italic">Events Together.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-light mb-12 max-w-2xl leading-relaxed">
              Saudi Event Management builds lasting alliances with visionaries, creators, and world-class service providers to deliver the extraordinary.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/partners/become-one" 
                className="bg-black text-white px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl flex items-center gap-3"
              >
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link 
                href="/#contact" 
                className="bg-white border border-gray-200 text-black px-10 py-5 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:border-black transition-all"
              >
                Inquire Directly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-32 bg-gray-50/50">
        <div className="container-luxury">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 uppercase tracking-tight">Partnership <span className="text-primary">Ecosystem</span></h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8" />
            <p className="text-gray-500 max-w-2xl mx-auto font-light">We offer multiple engagement levels tailored to your expertise and strategic goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-500">
                  <tier.icon size={32} className="text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-widest">{tier.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">{tier.desc}</p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-black/60">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2030 Alignment */}
      <section className="py-32 overflow-hidden">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 uppercase tracking-tight leading-tight">
                Aligned with <br/>
                <span className="text-primary italic">Vision 2030</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed font-light">
                As Saudi Arabia transforms into a global hub for tourism and entertainment, we are at the forefront of this evolution. Our partners benefit from our deep integration with national initiatives and GIGA projects.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Empowering Local Talent", val: "70%" },
                  { title: "National Event Contribution", val: "150+" },
                  { title: "Strategic Government Alliances", val: "12+" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-black">{stat.title}</span>
                    <span className="text-xl font-serif font-bold text-primary">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/gallery_1.webp" 
                alt="Saudi Vision 2030 Events" 
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <Handshake size={48} className="text-white mb-6" />
                <p className="text-white text-2xl font-sans font-medium leading-tight">
                  "Together, we are not just planning events; we are building the legacy of a nation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/hero_bg.webp" alt="Background" width={1920} height={600} className="w-full h-full object-cover" />
        </div>
        <div className="container-luxury relative z-10">
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-8 uppercase tracking-tight">Ready to <span className="text-primary">Join Us?</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 font-light">
            Whether you are a global brand or a specialized local vendor, we want to hear from you.
          </p>
          <Link 
            href="/partners/become-one" 
            className="inline-block bg-primary text-white px-12 py-6 rounded-xl text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            Start Your Application
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
