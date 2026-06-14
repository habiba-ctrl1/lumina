import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Users, Calendar, MapPin } from "lucide-react";

const BASE = "https://saudieventmanagement.com";
const OG_IMAGE = `${BASE}/royal_wedding_saudi.webp`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const canonical = `${BASE}${isAr ? "/ar" : ""}/portfolio/royal-riyadh-wedding`;

  const title = isAr
    ? "حفل زفاف ملكي في الرياض — دراسة حالة | إدارة الفعاليات السعودية"
    : "Royal Riyadh Wedding Case Study — Luxury Wedding Planning in Diriyah | Saudi Event Management";
  const description = isAr
    ? "كيف نظمت إدارة الفعاليات السعودية حفل زفاف ملكي فاخر لأكثر من 1200 ضيف على مدى 3 أيام في الدرعية التاريخية بالرياض — يجمع بين التراث والفخامة العصرية."
    : "An inside look into how Saudi Event Management orchestrated a magnificent royal wedding for 1,200+ guests over 3 days in historic Diriyah, Riyadh — blending Saudi tradition with modern luxury.";

  return {
    title,
    description,
    keywords: isAr
      ? ["زفاف ملكي الرياض", "تنظيم حفلات الزفاف الفاخرة", "حفل زفاف الدرعية", "دراسة حالة فعالية"]
      : [
          "Royal wedding Riyadh",
          "Luxury wedding planning Diriyah",
          "Saudi royal wedding case study",
          "Luxury event management Saudi Arabia",
        ],
    alternates: {
      canonical,
      languages: {
        "en-US": `${BASE}/portfolio/royal-riyadh-wedding`,
        "ar-SA": `${BASE}/ar/portfolio/royal-riyadh-wedding`,
        "x-default": `${BASE}/portfolio/royal-riyadh-wedding`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Royal wedding in Diriyah, Riyadh by Saudi Event Management" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured data — Article + Breadcrumb, locale-aware
// ─────────────────────────────────────────────────────────────────────────────
function buildJsonLd(locale: string) {
  const isAr = locale === "ar";
  const prefix = isAr ? "/ar" : "";
  const url = `${BASE}${prefix}/portfolio/royal-riyadh-wedding`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: isAr ? "حفل زفاف ملكي في الرياض — دراسة حالة" : "The Royal Riyadh Wedding — Case Study",
        description: isAr
          ? "دراسة حالة لحفل زفاف ملكي فاخر لأكثر من 1200 ضيف على مدى 3 أيام في الدرعية، الرياض."
          : "A case study of a luxury royal wedding for 1,200+ guests over 3 days in Diriyah, Riyadh.",
        image: OG_IMAGE,
        inLanguage: isAr ? "ar" : "en",
        author: { "@type": "Organization", name: "Saudi Event Management" },
        publisher: {
          "@type": "Organization",
          name: "Saudi Event Management",
          logo: { "@type": "ImageObject", url: `${BASE}/logo.webp` },
        },
        mainEntityOfPage: url,
        url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Home", item: `${BASE}${prefix}` },
          { "@type": "ListItem", position: 2, name: isAr ? "أعمالنا" : "Portfolio", item: `${BASE}${prefix}/portfolio` },
          { "@type": "ListItem", position: 3, name: isAr ? "حفل زفاف ملكي في الرياض" : "Royal Riyadh Wedding", item: url },
        ],
      },
    ],
  };
}

export default async function RoyalRiyadhWeddingCaseStudy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const jsonLd = buildJsonLd(locale);

  return (
    <main className="min-h-screen bg-[#1e2653] overflow-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery_wedding_reception.webp" 
            alt="Royal Riyadh Wedding" 
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e2653] via-[#1e2653]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
          <Link href="/portfolio" className="inline-flex items-center text-[var(--primary)] hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-medium">
            <ArrowLeft size={16} className="me-2" /> Back to Portfolio
          </Link>
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold mb-8 block bg-white/10 backdrop-blur-md inline-block px-4 py-2 rounded-full border border-white/20">
            Case Study
          </span>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
            The Royal <span className="text-[var(--primary)] font-bold">Riyadh Wedding</span>
          </h1>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 bg-white/5 border-y border-white/10 relative z-20 -mt-10 mx-4 md:mx-auto max-w-6xl rounded-3xl backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8">
          {[
            { icon: MapPin, label: "Location", val: "Diriyah, Riyadh" },
            { icon: Users, label: "Guests", val: "1,200+" },
            { icon: Calendar, label: "Duration", val: "3 Days" },
            { icon: CheckCircle2, label: "Services", val: "Full Production" }
          ].map((stat: any, i: number) => (
            <div key={i} className="text-center">
              <stat.icon size={24} className="text-[var(--primary)] mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-slate-300 mb-1">{stat.label}</div>
              <div className="text-lg font-sans font-bold text-white">{stat.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300 font-light text-lg leading-relaxed space-y-16">
        
        {/* The Challenge */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">The <span className="text-[var(--primary)]">Challenge</span></h2>
          <p className="mb-8">
            Our esteemed clients desired a celebration that honored deep-rooted Saudi traditions while introducing avant-garde design elements. The sheer scale of the event—hosting over 1,200 VIP guests, dignitaries, and royalty over a three-day period in historical Diriyah—required meticulous logistical planning, flawless execution, and absolute discretion.
          </p>
          <p>
            The primary challenge was transforming a raw desert expanse into a breathtaking, climate-controlled oasis within a rigorous 14-day build schedule, ensuring no disruption to the surrounding heritage site.
          </p>
        </div>

        {/* The Solution */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">The <span className="text-[var(--primary)]">Solution</span></h2>
            <p className="mb-8">
              Saudi Event Management deployed a team of 400 specialists, including international floral designers, lighting architects, and hospitality experts. We engineered a custom 5,000-square-meter glass marquee that provided panoramic views of the Najdi architecture while maintaining a pristine interior environment.
            </p>
            <ul className="space-y-3 mt-6">
              {[
                "Custom glass marquee construction",
                "Over 100,000 imported exotic florals",
                "Kinetic lighting installation",
                "Michelin-star culinary partnerships"
              ].map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={18} className="text-[var(--primary)] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image src="/wedding_stage_backdrop_decor.webp" alt="Custom glass marquee, floral staging and kinetic lighting at the Diriyah royal wedding" width={800} height={800} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The Result */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">The <span className="text-[var(--primary)]">Result</span></h2>
          <p className="mb-8">
            The event was widely regarded as a masterpiece of modern luxury, setting a new benchmark for high-society weddings in the Kingdom. Guest satisfaction was unprecedented, and the seamless integration of technology and tradition left a lasting impression.
          </p>
          
          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center relative">
            <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1e2653] px-4 text-[var(--primary)] text-4xl font-serif">&quot;</div>
            <p className="text-xl md:text-2xl font-sans font-bold text-white mb-8 leading-snug">
              &quot;Saudi Event Management did not just plan a wedding; they crafted a legacy. Their attention to detail and unwavering pursuit of perfection allowed us to be fully present in the most important moment of our lives.&quot;
            </p>
            <div className="text-[var(--primary)] font-medium uppercase tracking-widest text-sm">— The Bride & Groom</div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-sm font-bold text-white/60 mb-8 uppercase tracking-widest">Related Services</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/services/weddings" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
              Luxury Wedding Planning
            </Link>
            <Link href="/services/royal-weddings" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
              Royal Weddings & Ceremonies
            </Link>
            <Link href="/services/luxury-vip-events" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
              Luxury & VIP Events
            </Link>
            <Link href="/locations/riyadh" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
              Events in Riyadh
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white/5 text-center">
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-8">Envision Your <span className="text-[var(--primary)]">Masterpiece</span></h3>
        <Link
          href="/contact"
          className="inline-block px-10 py-4 bg-[var(--primary)] text-[#1e2653] font-bold uppercase tracking-widest hover:bg-white transition-colors"
        >
          Book a Consultation
        </Link>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
