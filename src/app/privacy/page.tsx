import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: 'Privacy Policy | Lumina Events',
  description: 'Privacy policy for Lumina Event Management website and services.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-charcoal-900 overflow-hidden">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-6">Privacy Policy</h1>
          <div className="prose prose-invert prose-gold max-w-none text-gray-300">
            <p className="mb-4">Last updated: May 2026</p>
            <p className="mb-4">
              At Lumina Event Management, we take your privacy seriously. This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-4">Information Collection</h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when you fill out contact forms, including your name, email address, phone number, and event details.
            </p>
            <h2 className="text-2xl text-gold-500 mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              The information we collect is used solely to communicate with you regarding your event inquiries and to provide our luxury event management services.
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
