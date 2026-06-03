import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Our terms and conditions for luxury event management services.',
  alternates: { canonical: 'https://saudieventmanagement.com/terms' },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-emerald-950 overflow-hidden">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors text-sm">
            <ArrowLeft size={16} className="me-2" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert prose-gold max-w-none text-gray-300">
            <p className="mb-8">Last updated: May 2026</p>
            <p className="mb-8">
              Welcome to Saudi Event Management. By accessing our website and utilizing our services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Service Agreement</h2>
            <p className="mb-8">
              Our luxury event management services are provided subject to a formal contract that will be drafted and signed upon agreement of event details, budget, and scope of work.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Intellectual Property</h2>
            <p className="mb-8">
              All content on this website, including text, graphics, logos, and images, is the property of Saudi Event Management and protected by intellectual property laws. Unauthorized reproduction, distribution, or use of any materials without prior written consent from Saudi Event Management is strictly prohibited and may result in legal action.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Payment Terms</h2>
            <p className="mb-8">
              A non-refundable booking deposit of 30% of the total event cost is required to secure your date and initiate the planning process. The remaining balance is payable in installments as outlined in your individual service agreement, with the final payment due no later than 14 days prior to the event date. All payments are denominated in Saudi Riyals (SAR) unless otherwise specified in the contract.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Cancellation & Rescheduling</h2>
            <p className="mb-8">
              Cancellations made more than 90 days before the event date are eligible for a partial refund of 50% of payments made beyond the initial deposit. Cancellations within 90 days of the event are non-refundable. Rescheduling requests are accommodated subject to date availability and may incur additional fees to cover vendor rebooking costs and logistical adjustments.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Limitation of Liability</h2>
            <p className="mb-8">
              Saudi Event Management shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services or website. Our total liability for any claim related to our services shall not exceed the total fees paid by the client for the specific event in question. We carry comprehensive event insurance and recommend that clients obtain their own event insurance for additional protection.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Force Majeure</h2>
            <p className="mb-8">
              Neither party shall be held liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, government regulations, public health emergencies, or other unforeseen events. In such cases, Saudi Event Management will work diligently with clients to reschedule events or arrange suitable alternatives at no additional planning fees.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-8">Governing Law</h2>
            <p className="mb-8">
              These terms and conditions are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any disputes arising from these terms shall be resolved through the competent courts of Riyadh, Saudi Arabia.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
