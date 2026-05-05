import Link from "next/link";
import Image from "next/image";
import { Award, Users, MapPin, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'About Lumina | The Elite Collective',
  description: 'Discover the legacy of Lumina Events, a premier luxury event management company crafting extraordinary experiences in KSA and beyond.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_bg.png" 
            alt="Luxury Event Backdrop" 
            fill 
            className="object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/60 via-charcoal-900/40 to-charcoal-900" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="text-gold-500 text-xs uppercase tracking-[0.5em] font-bold mb-4 block">
            Established 2018
          </span>
          <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
            Curators of <span className="hero-subtitle-shimmer italic font-semibold">Extraordinary</span> <br /> Moments
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            From Riyadh to the world, Lumina Events blends architectural precision with raw emotion to craft events that defy expectation.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gold-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-[600px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <Image 
                src="/founder.png" 
                alt="Our Founder" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white border border-gold-500/30 p-8 rounded-2xl shadow-xl max-w-xs">
              <p className="text-gold-600 font-display text-xl mb-2 font-medium italic">"We don't just plan events; we orchestrate emotions."</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">— Habiba, Founder</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-display text-white leading-tight">Crafting <span className="italic text-gold-500 font-semibold">Unparalleled</span> Moments</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                Lumina was born from a singular vision: to redefine the landscape of luxury event management in the Middle East and beyond. 
                With a focus on Riyadh, Dubai, and Islamabad, we have become the go-to collective for those who demand nothing short of perfection.
              </p>
              <p>
                Our philosophy is rooted in the belief that every celebration is a unique narrative. 
                Whether it's a royal wedding under the desert stars or a high-stakes corporate gala, 
                we bring a level of meticulous detail and artistic flair that is unmatched in the industry.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-charcoal-800 rounded-xl text-gold-500 border border-white/10">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Award Winning</h4>
                  <p className="text-gray-500 text-xs">Voted Best Luxury Planner 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-charcoal-800 rounded-xl text-gold-500 border border-white/10">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Global Presence</h4>
                  <p className="text-gray-500 text-xs">Operations in KSA, UAE, & PK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-charcoal-950 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Our Core <span className="text-gold-500 italic font-semibold">Values</span></h2>
            <div className="w-16 h-px bg-gold-500/50 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Artistry", desc: "Every detail is curated with artistic intent, from floral geometry to ambient lighting." },
              { icon: Users, title: "Discretion", desc: "We provide absolute privacy for our high-profile and celebrity clientele." },
              { icon: Award, title: "Excellence", desc: "We settle for nothing less than extraordinary in every aspect of execution." },
            ].map((value, i) => (
              <div key={i} className="bg-charcoal-900 border border-white/10 p-8 rounded-3xl hover:border-gold-500/30 transition-all duration-500 group hover:shadow-xl">
                <value.icon size={32} className="text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-white mb-4 font-semibold">{value.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="bg-charcoal-950 border border-white/5 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Ready to create <span className="text-gold-500 italic">Magic?</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 font-light">
              Let us transform your vision into an extraordinary reality. Connect with our principal planners today.
            </p>
            <Link 
              href="/#contact" 
              className="inline-block px-10 py-4 bg-gold-500 text-charcoal-900 font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
