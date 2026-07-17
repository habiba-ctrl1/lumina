import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PartnerOnboardingForm from "@/components/PartnerOnboardingForm";
import { Handshake, ShieldCheck, Clock } from "lucide-react";

// Private portal page — vendors receive this link directly on WhatsApp/email.
// Deliberately noindex: it's an operations tool, not SEO content.
export const metadata: Metadata = {
  title: "Partner Onboarding | Saudi Event Management",
  description:
    "Join the Saudi Event Management partner network. Complete your partner profile to start receiving project opportunities across Saudi Arabia.",
  robots: { index: false, follow: false },
};

export default function PartnerOnboardingPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-neutral-200 rounded-full mb-5">
            <Handshake size={13} className="text-[var(--primary)]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
              SEM Partner Network
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">
            Become a Saudi Event Management Partner
          </h1>
          <p className="text-[15px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Complete your partner profile below — it takes about 5 minutes. Only a few
            fields are required, and you can always share documents and photos later
            on WhatsApp.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
            <span className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500">
              <Clock size={13} className="text-[var(--primary)]" /> ~5 minutes
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500">
              <ShieldCheck size={13} className="text-[var(--primary)]" /> Your contact
              details stay private — never published
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <PartnerOnboardingForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
