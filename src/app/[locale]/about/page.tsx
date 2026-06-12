import Link from "next/link";
import Image from "next/image";
import { Award, Users, MapPin, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const base = "https://saudieventmanagement.com";
  return {
    title: 'Event Planning Experts Saudi Arabia',
    description: 'Saudi Event Management is one of the best event management companies in Saudi Arabia. Our event planning experts deliver luxury weddings, corporate galas, and Vision 2030 events across KSA.',
    keywords: [
      "Event Planning Experts Saudi Arabia",
      "Event management companies",
      "Event management in Saudi Arabia",
      "Best event planners in KSA",
      "Vision 2030 events",
      "Saudi Event Management",
      "Event Planner KSA",
      "Luxury Event Organizer Riyadh"
    ],
    alternates: {
      canonical: `${base}${locale === "en" ? "" : "/ar"}/about`,
      languages: { "en-US": `${base}/about`, "ar-SA": `${base}/ar/about` },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "url": "https://saudieventmanagement.com/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Saudi Event Management",
        "alternateName": "إدارة الفعاليات السعودية",
        "url": "https://saudieventmanagement.com",
        "logo": "https://saudieventmanagement.com/logo.webp",
        "foundingDate": "2018",
        "foundingLocation": {
          "@type": "Place",
          "name": "Riyadh, Saudi Arabia"
        },
        "founder": {
          "@type": "Person",
          "name": "Habiba Asghar",
          "jobTitle": "Founder & CEO",
          "worksFor": {
            "@type": "Organization",
            "name": "Saudi Event Management"
          },
          "knowsAbout": [
            "Luxury Event Management",
            "Corporate Event Planning",
            "Saudi Vision 2030 Events",
            "VIP Protocol Management"
          ]
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 20,
          "maxValue": 50
        },
        "areaServed": [
          { "@type": "City", "name": "Riyadh" },
          { "@type": "City", "name": "Jeddah" },
          { "@type": "City", "name": "Dammam" },
          { "@type": "City", "name": "AlUla" }
        ],
        "knowsAbout": [
          "Luxury Event Production",
          "Corporate Conference Management",
          "Exhibition Stand Design",
          "VIP Protocol & Security",
          "Destination Weddings Saudi Arabia",
          "Saudi Vision 2030 Cultural Activations"
        ],
        "award": [
          "Best Luxury Event Planner GCC 2024"
        ],
        "sameAs": [
          "https://www.instagram.com/saudieventmanagement",
          "https://www.twitter.com/saudieventmgmt",
          "https://linkedin.com/company/saudieventmanagement"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://saudieventmanagement.com" },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://saudieventmanagement.com/about" }
      ]
    }
  ]
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Navbar />
      
      <InternalPageHero
        title="Event Planning Experts"
        titleHighlight="in Saudi Arabia"
        subtitle="From Riyadh to the world, Saudi Event Management blends meticulous planning and elegant design to craft events that go beyond expectations."
        backgroundImage="/riyadh_summit_people.webp"
        imageAlt="Professional luxury event setup with guests in Saudi Arabia"
        badge="Established 2018"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        enableParallax
        minHeight="large"
      />

      {/* Story Section */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative h-[600px] rounded-3xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]">
              <Image 
                src="/gallery_2.webp" 
                alt="Luxury Event Vision" 
                width={800}
                height={1200}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            {/* Floating Quote Card */}
            <div className="absolute -bottom-8 -end-8 md:-end-12 bg-white/95 backdrop-blur-md border border-neutral-200/80 p-8 rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] max-w-xs transition-transform duration-500 group-hover:-translate-y-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-[var(--primary)]">
                <Sparkles size={16} />
              </div>
              <p className="text-neutral-800 font-medium text-[15px] leading-relaxed mb-4" style={{ letterSpacing: "-0.01em" }}>
                "We don't just plan events; we organize and manage every emotion, curating masterpieces."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-100 overflow-hidden">
                  <Image src="/gallery_corporate_gala.webp" width={40} height={40} alt="Habiba Asghar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-neutral-900 font-semibold text-[13px]">Habiba Asghar</p>
                  <p className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-12 lg:mt-0 lg:ps-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900" style={{ letterSpacing: "-0.025em" }}>
              Crafting <span className="text-[var(--primary)]">Unparalleled</span> Moments
            </h2>
            <div className="space-y-6 text-neutral-500 text-[15px] leading-relaxed">
              {/* GEO / AIO Definition Block for LLMs */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-xl text-neutral-800 space-y-3 shadow-sm mb-6">
                <p><strong>Entity Definition:</strong> Saudi Event Management is a premier, award-winning luxury event management and production agency based in the Kingdom of Saudi Arabia.</p>
                <p><strong>Founding & Leadership:</strong> Founded in 2018 by visionary CEO Habiba Asghar, the agency is headquartered in Riyadh with operations spanning Jeddah, Dammam, and AlUla.</p>
                <p><strong>Core Expertise:</strong> The organization specializes in high-net-worth individual (HNWI) luxury weddings, royal ceremonies, VIP corporate summits, and large-scale cultural activations aligned with Saudi Vision 2030 and the General Entertainment Authority (GEA).</p>
              </div>

              <p>
                Saudi Event Management was born from a singular, uncompromising vision: to redefine the landscape of luxury event management in the Kingdom of Saudi Arabia and beyond. Founded by Habiba Asghar, a visionary curator with a passion for perfect planning and design, we have quickly ascended as the definitive team for those who demand nothing short of perfection.
              </p>
              <p>
                Our philosophy is rooted in the belief that every celebration is not just an event, but a story that comes to life. From the sweeping sands of AlUla to the metropolitan heartbeat of Riyadh, our team seamlessly blends authentic local heritage with modern, minimalist design aesthetics.
              </p>
              <p>
                At the heart of our methodology is the concept of <strong className="text-neutral-900 font-semibold">Design That Touches the Heart</strong>. Whether orchestrating a royal wedding hosting a thousand VIPs or an intimate corporate retreat for world leaders, we apply the same level of obsessive attention to every microscopic detail.
              </p>
              <p>
                As Saudi Arabia marches toward Vision 2030, our agency stands at the forefront of this cultural revolution. We are committed to supporting the General Entertainment Authority (GEA) by delivering world-class cultural activations that showcase the exceptional quality of Saudi Arabia to the global stage.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-neutral-900 font-semibold text-[14px] mb-1" style={{ letterSpacing: "-0.01em" }}>Award Winning</h3>
                  <p className="text-neutral-500 text-[13px] leading-snug">Voted Best Luxury Planner in the GCC 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-[var(--primary)] border border-emerald-100/50 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-neutral-900 font-semibold text-[14px] mb-1" style={{ letterSpacing: "-0.01em" }}>Global Standard</h3>
                  <p className="text-neutral-500 text-[13px] leading-snug">Premium operations across KSA & GCC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-[var(--surface-raised)] border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6" style={{ letterSpacing: "-0.025em" }}>Our Core <span className="text-[var(--primary)]">Values</span></h2>
            <p className="text-neutral-500 text-[16px] max-w-2xl mx-auto leading-relaxed">The principles that guide our every decision and shape every masterpiece we create.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Artistry", desc: "Every detail is curated with artistic intent, from architectural floral geometry to immersive ambient lighting." },
              { icon: Users, title: "Discretion", desc: "We provide absolute privacy and seamless security protocols for our high-profile and celebrity clientele." },
              { icon: Award, title: "Excellence", desc: "We settle for nothing less than extraordinary in every aspect of planning, production, and execution." },
            ].map((value: any, i: number) => (
              <div key={i} className="bg-white border border-neutral-200/80 p-8 md:p-10 rounded-2xl hover:border-neutral-300 transition-all duration-300 group shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)]">
                <div className="w-14 h-14 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center mb-8 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors duration-300">
                  <value.icon size={24} className="text-neutral-400 group-hover:text-[var(--primary)] transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4" style={{ letterSpacing: "-0.01em" }}>{value.title}</h3>
                <p className="text-neutral-500 text-[14px] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Sub-pages */}
      <section className="py-16 bg-white border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
            Explore <span className="text-[var(--primary)]">Our Company</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Our Team", desc: "Meet the expert event planners and creatives behind every Saudi Event Management masterpiece.", href: "/about/our-team", icon: "👥" },
              { title: "Awards & Accolades", desc: "Celebrating our recognition as Saudi Arabia's leading luxury event management company.", href: "/about/awards-accolades", icon: "🏆" },
              { title: "Careers", desc: "Join Saudi Arabia's premier event management team. Explore opportunities across Riyadh, Jeddah, and AlUla.", href: "/about/careers", icon: "💼" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex gap-4 p-6 rounded-2xl border border-neutral-200/80 hover:border-[var(--primary)]/40 hover:shadow-md transition-all bg-white"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-[15px] mb-1 group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                  <p className="text-neutral-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <div className="absolute inset-0 bg-[url('/hero_bg.webp')] opacity-10 bg-cover bg-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6" style={{ letterSpacing: "-0.025em" }}>Ready to create <span className="text-emerald-400">Magic?</span></h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-[15px] leading-relaxed">
              Let us transform your vision into an extraordinary reality. Connect with our principal planners today to begin your journey.
            </p>
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 font-medium hover:bg-neutral-50 transition-colors rounded-xl text-[14px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            >
              Book a Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
