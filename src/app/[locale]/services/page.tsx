import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

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
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden">
      <ScrollProgress />
      <Navbar />
      
      {/* ── Page Header (H1) ── */}
      <section className="bg-[var(--surface-raised)] pt-32 pb-24 md:pt-48 md:pb-32 border-b border-neutral-200/80 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Our Expertise
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            Event Management <br /> <span className="text-[var(--primary)]">Services</span> in Saudi Arabia
          </h1>
          <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From high-stakes corporate summits to breathtaking luxury weddings, discover our comprehensive suite of elite event management capabilities.
          </p>
        </div>
      </section>

      <Services />
      
      {/* Descriptive SEO Section */}
      <section className="py-24 md:py-32 relative max-w-4xl mx-auto px-6 text-center border-t border-neutral-100">
        <h2 className="font-semibold text-neutral-900 mb-8 text-2xl md:text-3xl" style={{ letterSpacing: "-0.025em" }}>
          Smart Event Planning & <span className="text-[var(--primary)]">Luxury Capabilities</span>
        </h2>
        <div className="prose prose-slate max-w-none text-neutral-500 text-[15px] leading-relaxed space-y-6">
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
