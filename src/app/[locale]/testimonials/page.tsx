import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import Link from "next/link";
import { ArrowRight, Star, Quote, Shield } from "lucide-react";

export const metadata = {
  title: 'Client Testimonials & Reviews | Saudi Event Management',
  description: 'Read verified reviews and testimonials from clients who trusted Saudi Event Management for luxury weddings, corporate events, and VIP experiences across Riyadh and Jeddah.',
  keywords: [
    "Saudi Event Management Reviews",
    "Event Planner Testimonials KSA",
    "Best Event Company Reviews Riyadh",
    "Luxury Wedding Reviews Saudi Arabia"
  ],
  alternates: { canonical: 'https://saudieventmanagement.com/testimonials' },
};

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Saudi Event Management",
      "url": "https://saudieventmanagement.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "184",
        "reviewCount": "184"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Al Faisal Group" },
          "reviewBody": "Saudi Event Management orchestrated our 500-guest corporate gala flawlessly. Every detail from VIP protocol to the AV production was executed with military precision."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "Princess Noura Foundation" },
          "reviewBody": "The level of discretion and artistry for our private charity event was unmatched. Truly the best event planners in Saudi Arabia."
        },
        {
          "@type": "Review",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "author": { "@type": "Person", "name": "SABIC Executive Events" },
          "reviewBody": "From initial concept to on-ground execution at KAFD, their corporate event team is the most professional in the Kingdom."
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "Testimonials", "item": "https://saudieventmanagement.com/testimonials" }
      ]
    }
  ]
};

const caseStudyReviews = [
  {
    quote: "Saudi Event Management orchestrated our 500-guest corporate gala flawlessly. Every detail from VIP protocol to the AV production was executed with military precision.",
    author: "Al Faisal Group",
    role: "VP of Corporate Affairs",
    event: "Annual Corporate Gala, Riyadh",
    rating: 5
  },
  {
    quote: "The level of discretion and artistry for our private charity event was unmatched. Truly the best event planners in Saudi Arabia.",
    author: "Princess Noura Foundation",
    role: "Director of Events",
    event: "Private Charity Gala, Jeddah",
    rating: 5
  },
  {
    quote: "From initial concept to on-ground execution at KAFD, their corporate event team is the most professional in the Kingdom.",
    author: "SABIC Executive Events",
    role: "Head of Communications",
    event: "Executive Summit, KAFD",
    rating: 5
  },
  {
    quote: "Our AlUla destination wedding was a dream come true. The way they handled the desert logistics and luxury staging was beyond our expectations.",
    author: "Al-Rashid Family",
    role: "Private Client",
    event: "Destination Wedding, AlUla",
    rating: 5
  },
  {
    quote: "We partnered with Saudi Event Management for our product launch during Riyadh Season. The ROI from media coverage alone justified our investment three times over.",
    author: "Luxury Automotive Brand",
    role: "Regional Marketing Director",
    event: "Product Launch, Riyadh Season",
    rating: 5
  },
  {
    quote: "Exceptional attention to cultural protocol and international hospitality standards. They bridged Saudi traditions with global expectations seamlessly.",
    author: "International Trade Council",
    role: "Head of KSA Operations",
    event: "Diplomatic Reception, Jeddah",
    rating: 5
  }
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-6 bg-[var(--surface-raised)] border-b border-neutral-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex flex-col items-center gap-4 mb-6">
            <span className="section-label bg-white border border-neutral-200/80">
              <span className="w-6 h-0.5 rounded-full bg-[var(--primary)] opacity-40" />
              Verified Client Feedback
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>
            What Our <span className="text-[var(--primary)]">Clients</span> Say
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] md:text-lg leading-relaxed">
            Trusted by royal families, Fortune 500 companies, and government entities across Saudi Arabia for exceptional event management.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Star size={16} className="text-[var(--primary)] fill-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Shield size={16} className="text-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">184+ Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200/80 rounded-xl shadow-sm">
              <Quote size={16} className="text-[var(--primary)]" />
              <span className="text-[13px] font-semibold text-neutral-900">100% Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Case Study Reviews */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Client <span className="text-[var(--primary)]">Success Stories</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-[15px] leading-relaxed">
              Every review represents a milestone event we are proud to have delivered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudyReviews.map((review, i) => (
              <div key={i} className="bg-neutral-50 border border-neutral-200/80 p-8 rounded-3xl hover:border-neutral-300 transition-all duration-300 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-[var(--primary)] fill-[var(--primary)]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-700 text-[15px] leading-relaxed mb-8 flex-1 italic">
                  &quot;{review.quote}&quot;
                </p>

                {/* Event Badge */}
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-[11px] text-emerald-700 font-semibold mb-6 self-start">
                  {review.event}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-200/80">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500">
                    <Quote size={14} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-neutral-900">{review.author}</p>
                    <p className="text-[12px] text-neutral-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Testimonials Carousel */}
      <section className="py-24 md:py-32 px-6 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.025em" }}>
              Live <span className="text-[var(--primary)]">Feedback</span>
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to Become Our Next <span className="text-emerald-400">Success Story?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Join 500+ clients who trust Saudi Event Management for their most important occasions.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              Start Planning Your Event
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
