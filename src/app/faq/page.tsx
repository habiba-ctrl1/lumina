import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently asked questions about our event management services.',
  alternates: { canonical: 'https://saudieventmanagement.com/faq' },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden pt-20">
      <Navbar />
      <FAQ />
      
      {/* Descriptive SEO Section */}
      <section className="py-24 relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-sans text-slate-900 mb-8 font-bold uppercase tracking-tight">
          Expert <span className="text-primary font-bold">Event Solutions</span>
        </h2>
        <div className="max-w-none text-slate-600 font-light leading-relaxed space-y-6 text-sm">
          <p>
            At Saudi Event Management, our FAQ is designed to provide clarity on the architectural precision we bring to every luxury event. We understand that high-stakes event planning in the Kingdom requires more than just logistics; it requires a deep understanding of cultural nuances, government protocols, and the highest standards of hospitality. Whether you are planning a grand royal wedding in Riyadh or a corporate summit in NEOM, our team is equipped to handle the complexities of large-scale productions with a &quot;zero-failure&quot; mindset.
          </p>
          <p>
            Our operational presence across Jeddah, AlUla, and Dammam allows us to leverage local expertise and elite vendor networks to deliver seamless experiences. We prioritize transparency and discretion, ensuring that every detail — from NDAs to logistical permits — is managed with professional integrity. Explore our comprehensive services and discover how we can transform your vision into a cultural masterpiece aligned with Saudi Vision 2030.
          </p>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
