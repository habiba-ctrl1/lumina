import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { Award, Star } from "lucide-react";

export const metadata = {
  title: 'Awards & Accolades | Saudi Event Management',
  description: 'Discover the awards and industry recognition earned by Saudi Event Management, including Best Luxury Event Planner GCC 2024.',
  keywords: 'Award winning event planner Saudi Arabia, Best event management company Riyadh, Luxury event awards KSA',
  alternates: { canonical: 'https://saudieventmanagement.com/about/awards-accolades' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Awards and Accolades",
      "description": "Awards and industry recognition for Saudi Event Management.",
      "url": "https://saudieventmanagement.com/about/awards-accolades"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Awards", "item": "https://saudieventmanagement.com/about/awards-accolades" }
      ]
    }
  ]
};

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-[var(--surface-raised)] border-b border-neutral-200/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Industry Recognition
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            Awards & <span className="text-[var(--primary)]">Accolades</span>
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Our commitment to flawless execution and luxury design has positioned us as the premier event management agency in the Kingdom.
          </p>
        </div>
      </div>

      {/* Awards List */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            
            <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl flex items-start gap-6">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center shrink-0">
                <Award className="text-[var(--primary)]" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Best Luxury Event Planner GCC</h2>
                <p className="text-[var(--primary)] font-medium text-sm mb-4">2024</p>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  Awarded for excellence in managing ultra-luxury destination weddings and high-profile royal events across the Gulf region, setting new benchmarks in protocol and aesthetics.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl flex items-start gap-6">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center shrink-0">
                <Star className="text-[var(--primary)]" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Corporate Production Excellence Award</h2>
                <p className="text-[var(--primary)] font-medium text-sm mb-4">2023</p>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  Recognized for flawless technical execution, AV rigging, and protocol management during major international summits held in Riyadh.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
