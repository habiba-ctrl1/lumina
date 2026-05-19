import Link from "next/link";
import Image from "next/image";
import { Award, Users, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'About The Elite Collective',
  description: 'Discover the legacy of Saudi Event Management, a premier luxury event management company crafting extraordinary experiences in KSA and beyond.',
  alternates: { canonical: 'https://saudieventmanagement.com/about' },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.webp" 
            alt="Luxury Event Backdrop" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-slate-50/50 to-slate-50" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="text-gold-600 text-xs uppercase tracking-[0.5em] font-semibold mb-4 block">
            Established 2018
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-medium text-slate-900 mb-6 leading-tight uppercase">
            Curators of <span className="text-shimmer italic font-semibold">Extraordinary</span> <br /> Moments
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            From Riyadh to the world, Saudi Event Management blends architectural precision with raw emotion to craft events that defy expectation.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-[600px] rounded-sm overflow-hidden border border-slate-200/80 shadow-md">
              <Image 
                src="/gallery_2.webp" 
                alt="Luxury Event Vision" 
                width={800}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border border-gold-500/30 p-8 rounded-sm shadow-xl max-w-xs">
              <p className="text-gold-600 font-display text-base mb-2 italic font-semibold">&quot;We don&apos;t just plan events; we orchestrate emotions.&quot;</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">— Habiba Asghar, Founder</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-900 leading-tight uppercase">Crafting Unparalleled Moments</h2>
            <div className="space-y-6 text-slate-600 font-light leading-relaxed text-sm text-justify">
              <p>
                Saudi Event Management was born from a singular, uncompromising vision: to redefine the landscape of luxury event management in the Kingdom of Saudi Arabia and beyond. Founded by Habiba Asghar, a visionary curator with an obsession for architectural precision and emotional resonance, we have quickly ascended as the definitive team for those who demand nothing short of perfection.
              </p>
              <p>
                Our philosophy is rooted in the belief that every celebration is not just an event, but a living narrative—a masterpiece in motion. We don&apos;t simply plan; we orchestrate. From the sweeping sands of AlUla to the metropolitan heartbeat of Riyadh, our team blends local heritage with global avant-garde aesthetics. 
              </p>
              <p>
                At the heart of the &apos;Saudi Event Management Philosophy&apos; is the concept of <strong className="text-slate-900 font-semibold">Architectural Emotion</strong>. We believe that space, light, and geometry must work in absolute harmony with the human experience. Whether it&apos;s a royal wedding hosting a thousand dignitaries or an intimate corporate retreat for world leaders, we apply the same level of rigorous detail, ensuring that every touchpoint tells a story of elegance and legacy.
              </p>
              <p>
                As Saudi Arabia marches toward Vision 2030, our agency stands at the forefront of this cultural revolution. We are committed to supporting the General Entertainment Authority (GEA) by delivering world-class cultural activations that showcase the Kingdom&apos;s sophistication to the global stage. Our mission is to transform fleeting moments into timeless legacies that echo through generations.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-sm text-gold-600 border border-slate-200/80 shadow-sm">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-xs uppercase tracking-wider mb-1">Award Winning</h3>
                  <p className="text-slate-500 text-[10px]">Voted Best Luxury Planner 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-sm text-gold-600 border border-slate-200/80 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-xs uppercase tracking-wider mb-1">Global Presence</h3>
                  <p className="text-slate-500 text-[10px]">Operations in KSA, UAE, & PK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white relative border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-900 mb-6 uppercase tracking-tight">Our Core Values</h2>
            <div className="w-16 h-px bg-gold-400/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Artistry", desc: "Every detail is curated with artistic intent, from floral geometry to ambient lighting." },
              { icon: Users, title: "Discretion", desc: "We provide absolute privacy for our high-profile and celebrity clientele." },
              { icon: Award, title: "Excellence", desc: "We settle for nothing less than extraordinary in every aspect of execution." },
            ].map((value, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/60 p-8 rounded-sm hover:border-gold-400 transition-all duration-500 group hover:shadow-md">
                <value.icon size={32} className="text-gold-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-display font-medium text-slate-900 mb-4 uppercase">{value.title}</h3>
                <p className="text-slate-600 text-xs font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="bg-emerald-950 border border-emerald-900 rounded-sm p-12 md:p-20 text-center relative overflow-hidden max-w-7xl mx-auto shadow-xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-[0.22] bg-cover bg-center" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-6 uppercase tracking-tight">Ready to create Magic?</h2>
            <p className="text-slate-200 max-w-2xl mx-auto mb-10 text-sm font-light">
              Let us transform your vision into an extraordinary reality. Connect with our principal planners today.
            </p>
            <Link 
              href="/#contact" 
              className="inline-block px-10 py-4 bg-gold-400 text-emerald-950 font-bold uppercase tracking-wider hover:bg-gold-500 transition-colors rounded-sm text-xs shadow-md"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
