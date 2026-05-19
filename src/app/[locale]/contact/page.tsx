import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Mail, Phone, Clock, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import ContactForm from "./ContactForm";

// ─────────────────────────────────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ locale: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic SEO Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr 
    ? "تواصل معنا | شركة تنظيم فعاليات في السعودية | Saudi Event Management" 
    : "Contact Event Management Company Saudi Arabia";
  const description = isAr
    ? "تواصل مع شركة تنظيم الفعاليات الرائدة في المملكة العربية السعودية. احجز استشارتك لتنظيم حفلات الزفاف الفاخرة، الفعاليات الحكومية، والمؤتمرات الكبرى في الرياض وجدة والعلا."
    : "Connect with Saudi Arabia's premier event management agency. Book your elite consultation for royal weddings, corporate summits, and exhibitions across Riyadh, Jeddah, and AlUla.";

  return {
    title,
    description,
    keywords: isAr 
      ? ["تواصل معنا", "تنظيم فعاليات السعودية"] 
      : ["Contact Event Management Company Saudi Arabia", "Saudi Event Management", "Event Planner KSA"],
    alternates: {
      canonical: `https://saudieventmanagement.com/${locale === "en" ? "" : "ar/"}contact`,
      languages: {
        "en-US": "https://saudieventmanagement.com/contact",
        "ar-SA": "https://saudieventmanagement.com/ar/contact",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://saudieventmanagement.com/${locale === "en" ? "" : "ar/"}contact`,
      images: [
        {
          url: "/hero_bg.webp",
          width: 1200,
          height: 630,
          alt: "Contact Saudi Event Management — Curators of Extraordinary Events",
        },
      ],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "ar");
  const isAr = locale === "ar";

  // Page-level Schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://saudieventmanagement.com/#organization",
    "name": "Saudi Event Management",
    "image": "https://saudieventmanagement.com/hero_bg.webp",
    "telephone": "+966501234567",
    "email": "hello@saudieventmanagement.com",
    "url": "https://saudieventmanagement.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Olaya District",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province",
      "postalCode": "12211",
      "addressCountry": "SA",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966501234567",
      "contactType": "customer service",
      "areaServed": "SA",
      "availableLanguage": ["Arabic", "English"],
    },
  };

  // Localized Content Map
  const content = {
    heroLabel: isAr ? "ابدأ إرثك اليوم" : "START YOUR LEGACY TODAY",
    heroTitle: isAr ? "دعنا ننحت" : "CONTACT EVENT MANAGEMENT",
    heroTitleHighlight: isAr ? "تحفتك الفنية" : "COMPANY SAUDI ARABIA",
    heroSubtitle: isAr
      ? "تواصل مع كبار مخططينا ومنسقينا لتجسيد رؤيتك الاستثنائية إلى واقع ملموس يعبر عن الفخامة والتميز."
      : "Connect with our principal planners and curators to bring your extraordinary event vision to life in absolute elegance.",
    whatsappTitle: isAr ? "استجابة فورية" : "INSTANT RESPONSE",
    whatsappSub: isAr ? "الكونسيرج عبر الواتساب" : "WHATSAPP CONCIERGE",
    whatsappDesc: isAr
      ? "تواصل مباشرة مع مديري التخطيط للحصول على خدمة كبار الشخصيات الراقية والمباشرة."
      : "Connect directly with our planning directors for an immediate white-glove event booking experience.",
    directTitle: isAr ? "اتصال مباشر" : "DIRECT CONTACT",
    emailLabel: isAr ? "بريدنا الإلكتروني" : "EMAIL US",
    callLabel: isAr ? "اتصل بنا" : "CALL US",
    hoursLabel: isAr ? "ساعات العمل" : "OPERATING HOURS",
    hoursValue: isAr
      ? "يومياً: 9:00 صباحاً - 10:00 مساءً (بتوقيت المملكة العربية السعودية)"
      : "Daily: 9:00 AM - 10:00 PM (KSA Time)",
    officesTitle: isAr ? "مكاتبنا الإقليمية" : "REGIONAL OFFICES",
    riyadhTitle: isAr ? "المقر الرئيسي - الرياض" : "RIYADH HEADQUARTERS",
    riyadhAddress: isAr ? "حي العليا، الرياض، المملكة العربية السعودية" : "Olaya District, Riyadh, Kingdom of Saudi Arabia",
    jeddahTitle: isAr ? "فرع جدة" : "JEDDAH BRANCH",
    jeddahAddress: isAr ? "طريق الملك عبدالعزيز، جدة، المملكة العربية السعودية" : "King Abdulaziz Road, Jeddah, KSA",
    alulaTitle: isAr ? "جناح العلا" : "ALULA PAVILION",
    alulaAddress: isAr ? "وادي عشار، العلا، المملكة العربية السعودية" : "Ashar Valley, AlUla, KSA",
  };

  return (
    <main className="min-h-screen bg-ink-950 text-sand-100 overflow-hidden relative">
      <ScrollProgress />
      <WhatsAppButton />
      <Navbar dict={dict.nav} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* ── Background Aesthetics ── */}
      <div className="absolute top-0 left-0 w-full h-[65vh] pointer-events-none overflow-hidden z-0">
        <Image
          src="/hero_bg.webp"
          alt="Luxury Backdrop"
          fill
          priority
          className="object-cover opacity-[0.12] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/60 to-ink-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      {/* ── Hero Header ── */}
      <section className="relative z-10 pt-36 md:pt-44 pb-12 text-center container-luxury">
        <span className="text-gold-400 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-4 block animate-fade-in">
          {content.heroLabel}
        </span>
        <h1 className="font-display font-medium text-sand-50 text-3xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight leading-tight max-w-4xl mx-auto">
          {content.heroTitle} <span className="text-shimmer italic font-semibold">{content.heroTitleHighlight}</span>
        </h1>
        <p className="text-sand-400 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
          {content.heroSubtitle}
        </p>
      </section>

      {/* ── Contact Body ── */}
      <section className="relative z-10 py-16 pb-28 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Suite */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* WhatsApp Concierge Badge */}
            <div className="bg-ink-900/40 border border-ink-600 rounded-xl p-6 md:p-8 hover:border-gold-400/30 transition-all duration-300 shadow-xl group">
              <span className="text-[9px] font-bold text-[#25D366] uppercase tracking-widest block mb-2">{content.whatsappTitle}</span>
              <h3 className="font-display font-medium text-sand-50 text-lg uppercase tracking-tight mb-3">
                {content.whatsappSub}
              </h3>
              <p className="text-sand-400 text-[12px] leading-relaxed mb-6 font-light">
                {content.whatsappDesc}
              </p>
              <a
                href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-4.5 rounded-lg shadow-xl shadow-green-500/10 hover:shadow-green-500/25 transition-all text-xs font-bold uppercase tracking-wider"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} />
                  <span>Start Live Chat</span>
                </div>
                <span className="text-[10px] opacity-75">→</span>
              </a>
            </div>

            {/* Direct Information */}
            <div className="space-y-6">
              <h3 className="font-display font-medium text-sand-50 text-base uppercase tracking-wider border-b border-ink-600 pb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-gold-400" />
                <span>{content.directTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ink-900 border border-ink-600 rounded-md flex items-center justify-center shrink-0 text-gold-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-sand-500 font-bold uppercase tracking-widest mb-1">{content.emailLabel}</span>
                    <a href="mailto:hello@saudieventmanagement.com" className="text-sand-200 text-[13px] hover:text-gold-400 transition-colors font-medium">
                      hello@saudieventmanagement.com
                    </a>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ink-900 border border-ink-600 rounded-md flex items-center justify-center shrink-0 text-gold-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-sand-500 font-bold uppercase tracking-widest mb-1">{content.callLabel}</span>
                    <a href="tel:+966501234567" className="text-sand-200 text-[13px] hover:text-gold-400 transition-colors font-medium">
                      +966 50 123 4567
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-ink-900 border border-ink-600 rounded-md flex items-center justify-center shrink-0 text-gold-400">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] text-sand-500 font-bold uppercase tracking-widest mb-1">{content.hoursLabel}</span>
                    <span className="text-sand-200 text-[13px] font-medium leading-relaxed block">
                      {content.hoursValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="space-y-6 pt-4">
              <h3 className="font-display font-medium text-sand-50 text-base uppercase tracking-wider border-b border-ink-600 pb-3 flex items-center gap-2">
                <MapPin size={14} className="text-gold-400" />
                <span>{content.officesTitle}</span>
              </h3>

              <div className="space-y-6">
                {/* Riyadh */}
                <div className="relative pl-6 border-l-2 border-gold-400/20 hover:border-gold-400 transition-colors">
                  <span className="block text-[11px] font-bold text-sand-100 uppercase tracking-widest mb-1">{content.riyadhTitle}</span>
                  <span className="block text-sand-400 text-[12px] font-light leading-relaxed">{content.riyadhAddress}</span>
                </div>

                {/* Jeddah */}
                <div className="relative pl-6 border-l-2 border-gold-400/20 hover:border-gold-400 transition-colors">
                  <span className="block text-[11px] font-bold text-sand-100 uppercase tracking-widest mb-1">{content.jeddahTitle}</span>
                  <span className="block text-sand-400 text-[12px] font-light leading-relaxed">{content.jeddahAddress}</span>
                </div>

                {/* AlUla */}
                <div className="relative pl-6 border-l-2 border-gold-400/20 hover:border-gold-400 transition-colors">
                  <span className="block text-[11px] font-bold text-sand-100 uppercase tracking-widest mb-1">{content.alulaTitle}</span>
                  <span className="block text-sand-400 text-[12px] font-light leading-relaxed">{content.alulaAddress}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
