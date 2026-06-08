import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: 'Frequently Asked Questions | Saudi Event Management',
  description: 'Get answers to common questions about luxury event planning in Saudi Arabia. Learn about pricing, booking, logistics, and services from Saudi Event Management.',
  keywords: [
    "Event Management FAQ Saudi Arabia",
    "How much does event planning cost in KSA",
    "Wedding planner questions Riyadh",
    "Corporate event booking Saudi Arabia",
    "Saudi Event Management FAQ"
  ],
  alternates: { canonical: 'https://saudieventmanagement.com/faq' },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does luxury event planning cost in Saudi Arabia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Luxury event planning in Saudi Arabia typically ranges from SAR 75,000 for boutique corporate events to several million riyals for grand royal weddings. Saudi Event Management provides tailored proposals based on your specific requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What cities does Saudi Event Management serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We operate across Riyadh, Jeddah, Dammam, AlUla, NEOM, Makkah, Madinah, Taif, Al Khobar, and Abha — covering the entire Kingdom of Saudi Arabia."
          }
        },
        {
          "@type": "Question",
          "name": "Do you handle government and Vision 2030 events?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Saudi Event Management has deep experience with government events, GEA-permitted activations, and Saudi Vision 2030 initiatives. We work with government ministries and major corporations."
          }
        },
        {
          "@type": "Question",
          "name": "How far in advance should I book an event planner?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For luxury weddings and large-scale corporate events, we recommend booking at least 6 to 12 months in advance. However, our rapid-deployment team can also manage urgent events with shorter timelines."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://saudieventmanagement.com/faq" }
      ]
    }
  ]
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      
      {/* Page Header with H1 */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-neutral-900 text-center px-6">
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-neutral-500 mb-6">
          <a href="/" className="hover:text-neutral-300 transition-colors">Home</a>
          <span className="text-neutral-700 select-none">/</span>
          <span className="text-neutral-300">FAQ</span>
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5" style={{ letterSpacing: "-0.03em" }}>
          Frequently Asked <span className="text-emerald-400">Questions</span>
        </h1>
        <p className="text-neutral-400 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto">
          Everything you need to know about luxury event planning in Saudi Arabia — from pricing and booking to logistics and cultural protocol.
        </p>
      </section>
      
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
