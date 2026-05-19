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
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Strategic Partnerships" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
        </div>
        
        <div className="container-luxury relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">
              Collaborative Excellence
            </span>
            <h1 className="font-display font-medium text-slate-900 mb-8 leading-[1.2] tracking-tight text-3xl md:text-4xl">
              Defining the Future of <br/>
              <span className="text-shimmer italic">Events Together.</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base mb-12 max-w-2xl leading-relaxed">
              Saudi Event Management builds lasting alliances with visionaries, creators, and world-class service providers to deliver the extraordinary.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/partners/become-one" 
                className="btn-primary flex items-center gap-2 hover:scale-105 transition-all shadow-sm"
              >
                Become a Partner <ArrowRight size={16} />
              </Link>
              <Link 
                href="/#contact" 
                className="btn-outline flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                Inquire Directly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 bg-slate-100/50 border-t border-b border-slate-200/50 relative">
        <div className="container-luxury">
          <div className="text-center mb-24">
            <h2 className="font-display font-medium text-slate-900 mb-6 uppercase tracking-tight text-2xl md:text-3xl">Partnership <span className="text-shimmer italic">Ecosystem</span></h2>
            <div className="w-12 h-px bg-gold-400 mx-auto mb-8 opacity-65" />
            <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">We offer multiple engagement levels tailored to your expertise and strategic goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div key={i} className="card p-8 group hover:-translate-y-2 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-sm mb-8 group-hover:bg-emerald-800 transition-colors duration-300 border border-slate-200">
                  <tier.icon size={24} className="text-emerald-800 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display font-medium text-lg text-slate-900 mb-4 uppercase tracking-tight">{tier.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{tier.desc}</p>
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      <div className="w-1 h-1 bg-emerald-800 rounded-full" />
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
      <section className="py-24 overflow-hidden bg-slate-50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50/20 rounded-full blur-3xl" />
              <h2 className="font-display font-medium text-slate-900 mb-8 uppercase tracking-tight leading-tight text-2xl md:text-3xl">
                Aligned with <br/>
                <span className="text-shimmer italic">Vision 2030</span>
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm">
                As Saudi Arabia transforms into a global hub for tourism and entertainment, we are at the forefront of this evolution. Our partners benefit from our deep integration with national initiatives and GIGA projects.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Empowering Local Talent", val: "70%" },
                  { title: "National Event Contribution", val: "150+" },
                  { title: "Strategic Government Alliances", val: "12+" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-700">{stat.title}</span>
                    <span className="text-xl font-display font-medium text-emerald-800">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-slate-200 shadow-md">
              <Image 
                src="/gallery_1.webp" 
                alt="Saudi Vision 2030 Events" 
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <Handshake size={48} className="text-white mb-6" />
                <p className="text-white text-2xl font-display font-light leading-tight">
                  "Together, we are not just planning events; we are building the legacy of a nation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-950 text-white text-center relative overflow-hidden border-t border-emerald-900 shadow-xl">
        <div className="absolute inset-0 opacity-[0.22] bg-[url('/hero_bg.webp')] bg-cover bg-center" />
        <div className="container-luxury relative z-10">
          <h2 className="font-display font-medium mb-8 uppercase tracking-tight text-2xl md:text-3xl">Ready to <span className="text-shimmer italic">Join Us?</span></h2>
          <p className="text-slate-200 max-w-2xl mx-auto mb-12 text-sm leading-relaxed font-light">
            Whether you are a global brand or a specialized local vendor, we want to hear from you.
          </p>
          <Link 
            href="/partners/become-one" 
            className="btn-primary hover:scale-105 transition-all font-semibold tracking-widest text-xs px-10 py-4 shadow-md bg-gold-400 text-slate-900 hover:bg-gold-500 rounded-sm"
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
