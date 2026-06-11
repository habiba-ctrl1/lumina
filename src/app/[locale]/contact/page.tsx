import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Mail, Phone, Clock, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import InternalPageHero from "@/components/InternalPageHero";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import ContactForm from "./ContactForm";

interface PageProps {
  params: Promise<{ locale: string }>;
}

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
          url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000",
          width: 1200,
          height: 630,
          alt: "Contact Saudi Event Management — Curators of Extraordinary Events",
        },
      ],
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "en" | "ar");
  const isAr = locale === "ar";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://saudieventmanagement.com/#organization",
    "name": "Saudi Event Management",
    "image": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000",
    "telephone": "+966501234567",
    "email": "infosaudieventmanagement@gmail.com",
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

  const content = {
    heroLabel: isAr ? "ابدأ إرثك اليوم" : "Start Your Legacy Today",
    heroTitle: isAr ? "دعنا ننحت" : "Contact Event Management",
    heroTitleHighlight: isAr ? "تحفتك الفنية" : "Company Saudi Arabia",
    heroSubtitle: isAr
      ? "تواصل مع كبار مخططينا ومنسقينا لتجسيد رؤيتك الاستثنائية إلى واقع ملموس يعبر عن الفخامة والتميز."
      : "Connect with our principal planners and curators to bring your extraordinary event vision to life in absolute elegance.",
    whatsappTitle: isAr ? "استجابة فورية" : "Instant Response",
    whatsappSub: isAr ? "الكونسيرج عبر الواتساب" : "WhatsApp Concierge",
    whatsappDesc: isAr
      ? "تواصل مباشرة مع مديري التخطيط للحصول على خدمة كبار الشخصيات الراقية والمباشرة."
      : "Connect directly with our planning directors for an immediate white-glove event booking experience.",
    directTitle: isAr ? "اتصال مباشر" : "Direct Contact",
    emailLabel: isAr ? "بريدنا الإلكتروني" : "Email Us",
    callLabel: isAr ? "اتصل بنا" : "Call Us",
    hoursLabel: isAr ? "ساعات العمل" : "Operating Hours",
    hoursValue: isAr
      ? "يومياً: 9:00 صباحاً - 10:00 مساءً (بتوقيت المملكة العربية السعودية)"
      : "Daily: 9:00 AM - 10:00 PM (KSA Time)",
    officesTitle: isAr ? "مكاتبنا الإقليمية" : "Regional Offices",
    riyadhTitle: isAr ? "المقر الرئيسي - الرياض" : "Riyadh Headquarters",
    riyadhAddress: isAr ? "حي العليا، الرياض، المملكة العربية السعودية" : "Olaya District, Riyadh, Kingdom of Saudi Arabia",
    jeddahTitle: isAr ? "فرع جدة" : "Jeddah Branch",
    jeddahAddress: isAr ? "طريق الملك عبدالعزيز، جدة، المملكة العربية السعودية" : "King Abdulaziz Road, Jeddah, KSA",
    alulaTitle: isAr ? "جناح العلا" : "AlUla Pavilion",
    alulaAddress: isAr ? "وادي عشار، العلا، المملكة العربية السعودية" : "Ashar Valley, AlUla, KSA",
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-neutral-900 overflow-hidden relative border-t border-neutral-100">
      <ScrollProgress />
      <WhatsAppButton />
      <Navbar locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <InternalPageHero
        title={content.heroTitle}
        titleHighlight={content.heroTitleHighlight}
        subtitle={content.heroSubtitle}
        backgroundImage="/corporate.webp"
        imageAlt="Elegant guests at a luxury event consultation in Saudi Arabia"
        badge={content.heroLabel}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        minHeight="standard"
      />

      {/* ── Contact Body ── */}
      <section className="relative z-10 py-16 pb-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Suite */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* WhatsApp Concierge Badge */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8 hover:border-[#25D366] transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_-4px_rgba(37,211,102,0.15)] group">
              <span className="text-[12px] font-semibold text-[#25D366] tracking-wider block mb-2">{content.whatsappTitle}</span>
              <h3 className="font-semibold text-neutral-900 text-xl mb-3" style={{ letterSpacing: "-0.01em" }}>
                {content.whatsappSub}
              </h3>
              <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">
                {content.whatsappDesc}
              </p>
              <a
                href="https://wa.me/966501234567?text=Hi%20Saudi%20Event%20Management!%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-4 rounded-xl shadow-[0_2px_8px_rgba(37,211,102,0.2)] transition-all text-[14px] font-medium"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  <span>Start Live Chat</span>
                </div>
                <span>→</span>
              </a>
            </div>

            {/* Direct Information */}
            <div className="space-y-8 bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <h3 className="font-semibold text-neutral-900 text-lg border-b border-neutral-100 pb-4 flex items-center gap-2" style={{ letterSpacing: "-0.01em" }}>
                <Sparkles size={18} className="text-[var(--primary)]" />
                <span>{content.directTitle}</span>
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center shrink-0 text-[var(--primary)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[12px] text-neutral-500 font-medium mb-1">{content.emailLabel}</span>
                    <a href="mailto:infosaudieventmanagement@gmail.com" className="text-neutral-900 text-[14px] hover:text-[var(--primary)] transition-colors font-semibold">
                      infosaudieventmanagement@gmail.com
                    </a>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center shrink-0 text-[var(--primary)]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[12px] text-neutral-500 font-medium mb-1">{content.callLabel}</span>
                    <a href="tel:+966501234567" className="text-neutral-900 text-[14px] hover:text-[var(--primary)] transition-colors font-semibold">
                      +966 50 123 4567
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center shrink-0 text-[var(--primary)]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="block text-[12px] text-neutral-500 font-medium mb-1">{content.hoursLabel}</span>
                    <span className="text-neutral-700 text-[14px] font-medium leading-relaxed block">
                      {content.hoursValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="space-y-6 bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <h3 className="font-semibold text-neutral-900 text-lg pb-4 border-b border-neutral-100 flex items-center gap-2" style={{ letterSpacing: "-0.01em" }}>
                <MapPin size={18} className="text-[var(--primary)]" />
                <span>{content.officesTitle}</span>
              </h3>

              <div className="space-y-6">
                <div className="relative ps-4 border-s-2 border-emerald-100 hover:border-[var(--primary)] transition-colors">
                  <span className="block text-[14px] font-semibold text-neutral-900 mb-1">{content.riyadhTitle}</span>
                  <span className="block text-neutral-500 text-[13px] leading-relaxed">{content.riyadhAddress}</span>
                </div>
                <div className="relative ps-4 border-s-2 border-emerald-100 hover:border-[var(--primary)] transition-colors">
                  <span className="block text-[14px] font-semibold text-neutral-900 mb-1">{content.jeddahTitle}</span>
                  <span className="block text-neutral-500 text-[13px] leading-relaxed">{content.jeddahAddress}</span>
                </div>
                <div className="relative ps-4 border-s-2 border-emerald-100 hover:border-[var(--primary)] transition-colors">
                  <span className="block text-[14px] font-semibold text-neutral-900 mb-1">{content.alulaTitle}</span>
                  <span className="block text-neutral-500 text-[13px] leading-relaxed">{content.alulaAddress}</span>
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
