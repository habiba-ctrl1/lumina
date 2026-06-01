import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

import IslamicPattern from "@/components/IslamicPattern";

export const metadata = {
  title: 'Event Management Services Saudi Arabia',
  description: 'Explore our full range of event management services in Saudi Arabia including corporate event planning, exhibition management, event production services, and conference management in Riyadh.',
  keywords: [
    "Event Management Services Saudi Arabia",
    "Corporate event planning Saudi Arabia",
    "Exhibition management company",
    "Event production services",
    "Conference management Riyadh"
  ],
  alternates: { canonical: 'https://saudieventmanagement.com/services' },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden pt-20 relative">
      <Navbar />
      
      {/* ── Page Header (H1) ── */}
      <section className="bg-sand-50 pt-24 pb-16 border-b border-slate-100 relative overflow-hidden">
        <IslamicPattern opacity={0.04} className="text-gold-900" />
        
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <h1 className="font-display font-bold text-slate-900 text-3xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight">
            Event Management <span className="text-[var(--emerald)]">Services</span> in Saudi Arabia
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From high-stakes corporate summits to breathtaking luxury weddings, discover our comprehensive suite of event management capabilities.
          </p>
        </div>
      </section>

      <Services />
      
      {/* Descriptive SEO Section */}
      <section className="py-32 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-slate-900 mb-8 uppercase tracking-tight text-2xl md:text-3xl">
          Smart Event Planning & <span className="text-[var(--primary)] font-bold">Luxury Planning Capabilities</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6">
          <p>
            At Saudi Event Management, our event management services are defined by a commitment to perfect planning and design that makes people feel special. We do not simply manage events; we create experiences that leave a lasting impact on your guests and stakeholders. Our comprehensive suite of services covers every aspect of event management, from initial site inspections and finding and booking the right venue in major Saudi cities like Riyadh and Jeddah to the final planning and coordination. We aim for perfection without mistakes, ensuring that every sound and light detail is perfect, every guest interaction is seamless, and every cultural detail is respected.
          </p>
          <p>
            Our expertise spans multiple sectors, including high-stakes corporate event planning, spectacular royal weddings, and large-scale cultural events and activities aligned with Saudi Vision 2030. We understand the complexities of the Saudi market, including regulatory permits, government protocols, and the small, important details of luxury service for VIP guests. By choosing Saudi Event Management, you are partnering with a top-level team of event professionals dedicated to pushing the boundaries of what is possible in the Kingdom&apos;s event landscape. Our complete, all-in-one approach ensures that your event goals are not just met, but exceeded with uncompromising quality.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
