import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Our Services',
  description: 'Explore our luxury event management services in KSA and Pakistan.',
  alternates: { canonical: 'https://saudieventmanagement.com/services' },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />
      <Services />
      
      {/* Descriptive SEO Section */}
      <section className="py-24 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-display font-medium text-slate-900 mb-8 uppercase tracking-tight text-2xl md:text-3xl">
          Strategic Event Management & <span className="text-shimmer italic">Luxury Planning Capabilities</span>
        </h2>
        <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6 font-light">
          <p>
            At Saudi Event Management, our services are defined by a commitment to architectural precision and emotional resonance. We do not simply manage events; we architect experiences that leave a lasting impact on your guests and stakeholders. Our comprehensive suite of services covers every aspect of event management, from initial site inspections and venue procurement in major Saudi cities like Riyadh and Jeddah to the final logistical load-out. We operate with a &quot;zero-failure&quot; mindset, ensuring that every AV cue is perfect, every guest interaction is seamless, and every cultural detail is respected.
          </p>
          <p>
            Our expertise spans multiple sectors, including high-stakes corporate summits, spectacular royal weddings, and large-scale cultural activations aligned with Saudi Vision 2030. We understand the complexities of the Saudi market, including regulatory permits, government protocols, and the nuances of high-net-worth hospitality. By choosing Saudi Event Management, you are partnering with an elite collective of event professionals dedicated to pushing the boundaries of what is possible in the Kingdom&apos;s event landscape. Our holistic approach ensures that your event goals are not just met, but exceeded with uncompromising quality.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
