import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-charcoal-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-display text-white mb-6">Privacy Policy</h1>
        <div className="prose prose-invert prose-gold max-w-none text-gray-300">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
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
  );
}
