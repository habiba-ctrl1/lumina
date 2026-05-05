import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Terms of Service | Lumina Events',
  description: 'Terms of service for Lumina Event Management website and services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-6">Terms of Service</h1>
          <div className="prose prose-invert prose-gold max-w-none text-gray-300">
            <p className="mb-4">Last updated: May 2026</p>
            <p className="mb-4">
              Welcome to Lumina Event Management. By accessing our website and utilizing our services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-4">Service Agreement</h2>
            <p className="mb-4">
              Our luxury event management services are provided subject to a formal contract that will be drafted and signed upon agreement of event details, budget, and scope of work.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, graphics, logos, and images, is the property of Lumina Event Management and protected by intellectual property laws.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
