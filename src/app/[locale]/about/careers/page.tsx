import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { Briefcase, Send } from "lucide-react";

export const metadata = {
  title: 'Careers | Saudi Event Management Jobs',
  description: 'Join Saudi Event Management, the leading luxury event production company in Saudi Arabia. We are hiring event planners, producers, and operational experts in Riyadh.',
  keywords: 'Event management jobs Saudi Arabia, Careers in event planning Riyadh, Hiring event producers KSA, Saudi Event Management jobs',
  alternates: { canonical: 'https://saudieventmanagement.com/about/careers' },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Careers at Saudi Event Management",
      "description": "Job opportunities and careers at Saudi Event Management.",
      "url": "https://saudieventmanagement.com/about/careers"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" },
        { "@type": "ListItem", "position": 3, "name": "Careers", "item": "https://saudieventmanagement.com/about/careers" }
      ]
    }
  ]
};

export default function CareersPage() {
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
              Join Our Team
            </span>
          </div>
          <h1 className="font-semibold text-neutral-900 text-4xl md:text-5xl lg:text-6xl mb-6" style={{ letterSpacing: "-0.025em" }}>
            Build the <span className="text-[var(--primary)]">Future</span> of Events
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-2xl mx-auto">
            We are always looking for visionary planners, rigorous producers, and creative minds to join our rapidly growing operations across Saudi Arabia.
          </p>
        </div>
      </div>

      {/* Culture & Hiring Block */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Briefcase className="text-[var(--primary)] mx-auto mb-6" size={40} />
          <h2 className="text-3xl font-semibold mb-6">Open Positions</h2>
          <p className="text-neutral-500 leading-relaxed mb-10">
            As we scale alongside Saudi Vision 2030, our demand for elite talent is constant. If you have experience in luxury event production, high-end hospitality, or corporate event logistics, we want to hear from you.
          </p>
          
          <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl text-start">
            <h3 className="text-xl font-semibold mb-2">Spontaneous Application</h3>
            <p className="text-sm text-neutral-500 mb-6">Location: Riyadh, Jeddah, or Remote (KSA)</p>
            <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
              Submit your resume and portfolio to our executive HR team. We review all applications and will contact you when a suitable position aligns with your expertise.
            </p>
            <a 
              href="mailto:careers@saudieventmanagement.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              Email Resume <Send size={14} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
