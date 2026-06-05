import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Frequently asked questions about our event management services.',
  alternates: { canonical: 'https://saudieventmanagement.com/faq' },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <ScrollProgress />
      <Navbar />
      
      {/* Spacer for navbar */}
      <div className="pt-24 md:pt-32" />
      
      <FAQ />
      
      {/* Descriptive SEO Section */}
      <section className="py-24 md:py-32 relative max-w-4xl mx-auto px-6 text-center border-t border-neutral-100 mt-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.025em" }}>
          Expert <span className="text-[var(--primary)]">Event Solutions</span>
        </h2>
        <div className="max-w-none text-neutral-500 leading-relaxed space-y-6 text-[15px] text-justify sm:text-center">
          <p>
            At Saudi Event Management, our FAQ is designed to provide clarity on the meticulous planning and design we bring to every luxury event. We understand that high-stakes event planning in the Kingdom requires more than just logistics; it requires a deep understanding of essential cultural details, government protocols, and the highest standards of hospitality. Whether you are planning a grand royal wedding in Riyadh or a corporate summit in NEOM, our team is equipped to handle the complexities of large-scale productions, always aiming for seamless execution.
          </p>
          <p>
            Our operational presence across Jeddah, AlUla, and Dammam allows us to leverage local expertise and elite vendor networks to deliver breathtaking experiences. We prioritize transparency and discretion, ensuring that every detail — from NDAs to logistical permits — is managed with professional integrity. Explore our comprehensive services and discover how we can transform your vision into a cultural masterpiece aligned with Saudi Vision 2030.
          </p>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
