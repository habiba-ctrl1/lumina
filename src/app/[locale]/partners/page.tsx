import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Award, Target, Users, ArrowRight } from "lucide-react";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Strategic Partnerships',
    description: "Join Saudi Arabia's premier event management network. We collaborate with world-class brands and suppliers to deliver extraordinary luxury experiences.",
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/partners`,
      languages: { "en-US": `${base}/partners`, "ar-SA": `${base}/ar/partners` },
    },
  };
}

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
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col justify-center items-center overflow-hidden bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Strategic Partnerships" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-10"
            priority
          />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Collaborative Excellence
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl" style={{ letterSpacing: "-0.025em" }}>
            Defining the Future of <br/>
            <span className="text-[var(--primary)]">Events Together.</span>
          </h1>
          <p className="text-neutral-500 text-[16px] md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Saudi Event Management builds lasting alliances with visionaries, creators, and world-class service providers to deliver the extraordinary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/partners/become-one" 
              className="px-8 py-4 bg-[var(--primary)] text-white text-[14px] font-medium rounded-xl hover:bg-[var(--primary-dark)] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] flex items-center gap-2"
            >
              Become a Partner <ArrowRight size={16} />
            </Link>
            <Link 
              href="/#contact" 
              className="px-8 py-4 bg-white text-neutral-900 text-[14px] font-medium rounded-xl border border-neutral-200/80 hover:bg-neutral-50 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              Inquire Directly
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-semibold text-neutral-900 mb-6 text-3xl md:text-4xl" style={{ letterSpacing: "-0.025em" }}>
              Partnership <span className="text-[var(--primary)]">Ecosystem</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] leading-relaxed">We offer multiple engagement levels tailored to your expertise and strategic goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier: any, i: number) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200/80 p-8 md:p-10 rounded-3xl hover:border-neutral-300 transition-all duration-300 group shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 bg-white border border-neutral-100 flex items-center justify-center rounded-xl mb-8 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors duration-300">
                  <tier.icon size={24} className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-xl text-neutral-900 mb-4" style={{ letterSpacing: "-0.01em" }}>{tier.title}</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">{tier.desc}</p>
                <ul className="space-y-4 mb-4">
                  {tier.features.map((feature: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-[13px] font-medium text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full" />
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
      <section className="py-24 md:py-32 overflow-hidden bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-10 -start-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="font-semibold text-neutral-900 mb-6 leading-tight text-3xl md:text-4xl" style={{ letterSpacing: "-0.025em" }}>
                Aligned with <br/>
                <span className="text-[var(--primary)]">Vision 2030</span>
              </h2>
              <p className="text-neutral-500 mb-10 leading-relaxed text-[15px]">
                As Saudi Arabia transforms into a global hub for tourism and entertainment, we are at the forefront of this evolution. Our partners benefit from our deep integration with national initiatives and GIGA projects.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Empowering Local Talent", val: "70%" },
                  { title: "National Event Contribution", val: "150+" },
                  { title: "Strategic Government Alliances", val: "12+" }
                ].map((stat: any, i: number) => (
                  <div key={i} className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
                    <span className="text-[13px] font-medium text-neutral-600">{stat.title}</span>
                    <span className="text-2xl font-semibold text-[var(--primary)]" style={{ letterSpacing: "-0.02em" }}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <Image 
                src="/gallery_1.webp" 
                alt="Saudi Vision 2030 Events" 
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/40 to-transparent opacity-90" />
              <div className="absolute bottom-10 start-10 end-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                  <Handshake size={24} className="text-white" />
                </div>
                <p className="text-white text-xl md:text-2xl font-medium leading-tight" style={{ letterSpacing: "-0.01em" }}>
                  "Together, we are not just planning events; we are building the legacy of a nation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-neutral-100">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('/hero_bg.webp')] bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="font-semibold mb-6 text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.025em" }}>Ready to <span className="text-emerald-400">Join Us?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Whether you are a global brand or a specialized local vendor, we want to hear from you.
            </p>
            <Link 
              href="/partners/become-one" 
              className="inline-block px-8 py-4 bg-white text-neutral-900 text-[14px] font-medium rounded-xl hover:bg-neutral-50 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
