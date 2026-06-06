import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { Shield, CheckCircle2, BookOpen, Users, Award, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy & Standards of Excellence | Saudi Event Management",
  description: "Learn about Saudi Event Management's commitment to quality, transparency, and editorial integrity. Our standards ensure every event and piece of content meets the highest benchmarks.",
  alternates: { canonical: "https://saudieventmanagement.com/editorial-policy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Editorial Policy & Standards of Excellence",
  "description": "Saudi Event Management's commitment to quality, transparency, and editorial integrity.",
  "url": "https://saudieventmanagement.com/editorial-policy",
  "publisher": {
    "@type": "Organization",
    "name": "Saudi Event Management",
    "url": "https://saudieventmanagement.com"
  }
};

const policies = [
  {
    icon: Shield,
    title: "Quality Assurance",
    content: "Every event produced by Saudi Event Management undergoes a rigorous multi-phase quality assurance process. From concept design through to on-ground execution, our internal review board ensures that every detail meets our luxury standards. We maintain ISO-aligned operational procedures across all our service verticals."
  },
  {
    icon: CheckCircle2,
    title: "Vendor Verification",
    content: "All vendors and partners in the Saudi Event Management network are thoroughly vetted. We verify business credentials, insurance coverage, past performance records, and on-site capabilities. Our Elite Supplier tier requires a minimum of 3 years of proven experience in KSA luxury events."
  },
  {
    icon: BookOpen,
    title: "Content Accuracy",
    content: "All content published on our website, including blog articles, glossary entries, and service descriptions, is reviewed by our editorial team for factual accuracy and relevance. We cite authoritative sources, including the General Entertainment Authority (GEA), Saudi Tourism Authority, and Vision 2030 official documentation."
  },
  {
    icon: Users,
    title: "Client Testimonials",
    content: "Every testimonial and review featured on our platform is from a verified client engagement. We do not publish fabricated or solicited reviews. All feedback is collected post-event through our structured client satisfaction process and shared with explicit consent."
  },
  {
    icon: Award,
    title: "Industry Credentials",
    content: "Saudi Event Management maintains active memberships and certifications with recognized industry bodies. Our team members hold professional certifications in event management, project management (PMP), and hospitality management from accredited institutions."
  },
  {
    icon: Eye,
    title: "Transparency & Privacy",
    content: "We are committed to full transparency in our pricing, processes, and partnerships. Client data is protected under our strict privacy policy in compliance with Saudi Arabia's Personal Data Protection Law (PDPL). We never share client information with unauthorized third parties."
  }
];

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Trust & Integrity
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            Editorial <span className="text-[var(--primary)]">Policy</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] md:text-lg leading-relaxed">
            Our unwavering commitment to quality, transparency, and professional excellence in everything we produce and publish.
          </p>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200/80 p-8 rounded-3xl hover:border-neutral-300 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 bg-white border border-neutral-100 flex items-center justify-center rounded-xl mb-6 text-[var(--primary)]">
                  <policy.icon size={24} />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.01em" }}>
                  {policy.title}
                </h2>
                <p className="text-neutral-500 text-[14px] leading-relaxed">
                  {policy.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-24 md:py-32 px-6 bg-[var(--surface-raised)] border-t border-neutral-200/80">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.025em" }}>
            Our <span className="text-[var(--primary)]">Commitment</span>
          </h2>
          <div className="prose prose-neutral max-w-none text-neutral-500 text-[15px] leading-relaxed space-y-6">
            <p>
              Saudi Event Management is built on a foundation of trust. As one of Saudi Arabia&apos;s leading event management companies, we understand that our reputation is our most valuable asset. Every interaction, every event, and every piece of content we produce is held to the highest professional standard.
            </p>
            <p>
              We actively support Saudi Arabia&apos;s Vision 2030 goals by empowering local talent, supporting Saudi artisans and suppliers, and creating world-class experiences that showcase the Kingdom&apos;s cultural richness to the global stage.
            </p>
            <p>
              If you have any questions about our policies or wish to report any concern, please contact our compliance team at <strong className="text-neutral-900">compliance@saudieventmanagement.com</strong>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
